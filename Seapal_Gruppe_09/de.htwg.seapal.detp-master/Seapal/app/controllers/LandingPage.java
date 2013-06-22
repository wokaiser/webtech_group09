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

	/*public static Result insert() {
  
    DynamicForm data = form().bindFromRequest();
    Connection conn = DB.getConnection();
	Statement query;            
    ResultSet result;
    ObjectNode respJSON = Json.newObject();
    int nextId = 0;
	int bnr = 0;
	
    try {
	      query = conn.createStatement();
			
		if(session().containsValue("bnr"));
			bnr = Integer.parseInt(session().get("bnr"));
		  
        query.execute("INSERT INTO seapal.benutzer(benutzername, passwort, vorname, nachname, mail, mySession, registrierung) "
                + "VALUES(" + bnr + ","
				+ "'" + data.get("bootname") + "',"
                + "'" + data.get("registernummer") + "',"
                + "'" + data.get("segelzeichen") + "',"
                + "'" + data.get("heimathafen") + "',"
                + "'" + data.get("yachtclub") + "',"
                + "'" + data.get("eigner") + "',"
                + "'" + data.get("versicherung") + "',"
                + "'" + data.get("rufzeichen") + "',"
                + "'" + data.get("typ") + "',"
                + "'" + data.get("konstrukteur") + "',"
                + "'" + data.get("laenge") + "',"
                + "'" + data.get("breite") + "',"
                + "'" + data.get("tiefgang") + "',"
                + "'" + data.get("masthoehe") + "',"
                + "'" + data.get("verdraengung") + "',"
                + "'" + data.get("rigart") + "',"
                + "'" + data.get("baujahr") + "',"
                + "'" + data.get("motor") + "',"
                + "'" + data.get("tankgroesse") + "',"
                + "'" + data.get("wassertankgroesse") + "',"
                + "'" + data.get("abwassertankgroesse") + "',"
                + "'" + data.get("grosssegelgroesse") + "',"
                + "'" + data.get("genuagroesse") + "',"
                + "'" + data.get("spigroesse") + "');");

         result = query.executeQuery("SHOW TABLE STATUS FROM seapal LIKE 'bootinfo'");
         if (result.next()) {
             nextId = result.getInt("Auto_increment");
         }
         conn.close();

         respJSON.put("bnr", "" + (nextId - 1));

    } catch (Exception e) {
        respJSON.put("bnr", "Error: " + e);
    }

    return ok(respJSON);
  }*/
}