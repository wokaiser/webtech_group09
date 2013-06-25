package controllers;

import play.*;
import play.mvc.*;
import play.db.*;
import java.sql.*;
import javax.sql.*;
import play.libs.Json;
import play.data.DynamicForm;
import org.codehaus.jackson.node.ObjectNode; 
import views.html.*;
import views.html._include.*;

public class LandingPage extends Controller {
  
	public static Result index() {
		return ok(landingpage.render(header.render(),navigation.render("landingpage"), footer.render()));
	}

    public static Result checkUsername(String username) {
        Connection conn = DB.getConnection();
        Statement query;
        ResultSet result;
        ObjectNode respJSON = Json.newObject();

        if(conn != null) {
            try {                    
                query = conn.createStatement();
         
                String sql = "SELECT * FROM seapal.benutzer WHERE benutzername ='" + username + "';";
                
                result = query.executeQuery(sql);

                if(!result.next()) {
                    respJSON.put("status", "None");
                } else {
                    respJSON.put("status", "Exists");
                }
                
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
                respJSON.put("status", "Exists");
            }
        } else {
            respJSON.put("status", "Exists");
        }

        return ok(respJSON);
    }

	public static Result insert() {
  
    DynamicForm data = form().bindFromRequest();
    Connection conn = DB.getConnection();
	Statement query;            
    ResultSet result;
    ObjectNode respJSON = Json.newObject();
    int nextId = 0;
	
    try {
	    query = conn.createStatement();

        query.execute("INSERT INTO seapal.benutzer (benutzername, passwort, vorname, nachname, mail, mySession, registrierung) VALUES ("
				+ "'" + data.get("username") + "',"
                + "'" + data.get("password") + "',"
                + "'" + data.get("nachname") + "',"
                + "'" + data.get("vorname") + "',"
                + "'" + data.get("email") + "',"
                + "'" + data.get("mySession") + "',"
                + "'" + data.get("regdate") + "');");

         result = query.executeQuery("SHOW TABLE STATUS FROM seapal LIKE 'benutzer'");
         if (result.next()) {
             nextId = result.getInt("Auto_increment");
         }
         conn.close();

         respJSON.put("bnr", "" + (nextId - 1));

    } catch (Exception e) {
        respJSON.put("bnr", "Error: " + e);
    }

    return ok(respJSON);
  }
}