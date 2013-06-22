package controllers;

import play.*;
import play.mvc.*;
import play.db.*;
import play.data.*;
import java.sql.*;
import javax.sql.*;
import play.libs.Json;
import play.data.DynamicForm;
import org.codehaus.jackson.node.ObjectNode; 
import views.html.*;
import views.html._include.*;
import play.mvc.Http;

public class Session extends Controller {

	public static String getUser() {
	 return "";
	}

	public static Result login () {
		return ok(
			login.render(header.render(), navigation.render("app_trackinginfo"), footer.render())
		);
	}
	
	public static Result authenticate() {
		DynamicForm data = form().bindFromRequest();
		ObjectNode respJSON = Json.newObject();
		Connection conn = DB.getConnection();
		
			String sql = "";
	
			if(conn != null) {
				Statement query;
				ResultSet result;

				try {
					query = conn.createStatement();
					sql = "SELECT * FROM seapal.benutzer WHERE benutzername  = '" + data.get("user_username") + "'";
					result = query.executeQuery(sql);
					java.sql.ResultSetMetaData rsmd = result.getMetaData();
					int numColumns = rsmd.getColumnCount();

					String bnr = "";
					boolean pwCorrect = false;
					
					while (result.next()) {
						for (int i = 1; i < numColumns + 1; i++) {
							String columnName = rsmd.getColumnName(i);
							if(columnName.equals("passwort")) {
								if(data.get("user_password").equals(result.getString(i))) {
									pwCorrect = true;
								}
							}
							else if(columnName.equals("bnr")) {
								bnr = result.getString(i);
							}
						}
					}
					
					if(pwCorrect) {
						session("user", data.get("user_username"));
						session("bnr", bnr);
						respJSON.put("u", data.get("user_username"));
						return ok(respJSON);
					}
			   } catch (Exception e) { }
		}
		return ok();
	}
	
	public static Result unauthorised() {
		return ok(unauthorized.render(header.render(), navigation.render("app_trackinginfo"), footer.render()));
	}

	public static Result logout() {
		ObjectNode respJSON = Json.newObject();
		session("user", "");
		session("bnr", "");
		session().clear();
		respJSON.put("res", "logged_out");
		return ok(respJSON);
	}	
	
}