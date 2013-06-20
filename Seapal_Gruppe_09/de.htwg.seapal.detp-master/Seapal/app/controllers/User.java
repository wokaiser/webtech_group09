package controllers;

import play.*;
import play.mvc.*;
import play.mvc.Result;
import play.db.*;
import java.sql.*;
import javax.sql.*;
import play.libs.Json;
import play.data.DynamicForm;
import org.codehaus.jackson.node.ObjectNode; 
import views.html.*;
import views.html._include.*;

public class User extends Controller {
  
	public static Result login() {
		DynamicForm data = form().bindFromRequest();
		Connection conn = DB.getConnection();
		Statement query;  
		ResultSet result;
			
		if(conn != null) {
			try {
				query = conn.createStatement();
				String user = data.get("user_username");
				String pw = data.get("user_password");
				String sql = "SELECT bnr, vorname, nachname, mail, passwort FROM seapal.benutzer WHERE benutzername = " + user;
				
				result = query.executeQuery(sql);
				if(null != result) {
					String pw_db = result.getString("password");
					if(pw.equals(pw_db)) {
						return ok(map.render(header.render(), header_app.render(), navigation.render("app_map"), navigation_app.render("app_map")));
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	return unauthorized();
	}
}