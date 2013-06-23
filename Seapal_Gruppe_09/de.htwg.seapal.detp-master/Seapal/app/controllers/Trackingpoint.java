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

public class Trackingpoint extends Controller {
  
	public static Result insert() {
	DynamicForm data = form().bindFromRequest();
	Connection conn = DB.getConnection();
	Statement query;            
	ResultSet result;
	ObjectNode respJSON = Json.newObject();
	int nextId = 0;

	try {
		query = conn.createStatement();

		query.execute("INSERT INTO seapal.trackingPoint (tracknr, lat, lng, windstaerke, windrichtung, luftdruck, temperatur, wolken, regen, wellenhoehe, wellenrichtung, marker, btm, dtm, sog, cog, manoever, vorsegel, wdate, wtime, motor, tank) VALUES ("
		+ data.get("tracknr") + ","
		+ "'" + data.get("lat") + "',"
		+ "'" + data.get("lng") + "',"
		+ "'" + data.get("windstaerke") + "',"
		+ "'" + data.get("windrichtung") + "',"
		+ "'" + data.get("luftdruck") + "',"
		+ "'" + data.get("temperatur") + "',"
		+ "'" + data.get("wolken") + "',"
		+ "'" + data.get("regen") + "',"
		+ "'" + data.get("wellenhoehe") + "',"
		+ "'" + data.get("wellenrichtung") + "',"
		+ "'" + data.get("marker") + "',"
		+ "'" + data.get("btm") + "',"
		+ "'" + data.get("dtm") + "',"
		+ "'" + data.get("sog") + "',"
		+ "'" + data.get("cog") + "',"
		+ "'" + data.get("manoever") + "',"
		+ "'" + data.get("vorsegel") + "',"
		+ "'" + data.get("wdate") + "',"
		+ "'" + data.get("wtime") + "',"
		+ "'" + data.get("motor") + "',"
		+ "'" + data.get("tank") + "');");

		result = query.executeQuery("SHOW TABLE STATUS FROM seapal LIKE 'trackingPoint'");
		if (result.next()) {
			nextId = result.getInt("Auto_increment");
		}
		conn.close();

		respJSON.put("trackpointnr", "" + (nextId - 1));
	} catch (Exception e) {
		respJSON.put("trackpointnr", "Error: " + e);
	}

	return ok(respJSON);
	}
	
}