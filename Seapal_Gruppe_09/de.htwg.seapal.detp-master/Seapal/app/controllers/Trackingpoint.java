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
  
	public static Result index(int tracknr) {  
		Connection conn = DB.getConnection();
		String responseData = "";

		if(conn != null) {
			Statement query;
			ResultSet result;
			StringBuilder row;

			try {
				query = conn.createStatement();
				String sql = "SELECT * " + "FROM seapal.trackingpoint WHERE tracknr = " + tracknr;
				result = query.executeQuery(sql);

				while (result.next()) {
					row = new StringBuilder();
					
					row.append("<tr class='selectable' id='" + result.getString("trackpointnr") + "'>");
					row.append("<td>" + result.getString("marker") + "</td>");
					row.append("<td>" + result.getString("btm") + "</td>");
					row.append("<td>" + result.getString("dtm") + "</td>");
					row.append("<td>" + result.getString("sog") + "</td>");
					row.append("<td>" + result.getString("cog") + "</td>");
					row.append("<td>" + result.getString("manoever") + "</td>");
					row.append("<td>" + result.getString("vorsegel") + "</td>");
					row.append("<td>" + result.getString("wdate") + "</td>");
					row.append("<td>" + result.getString("wtime") + "</td>");
					row.append("<td>" + result.getString("motor") + "</td>");
					row.append("<td>" + result.getString("tank") + "</td>");
					row.append("<td>" + result.getString("windstaerke") + "</td>");
					row.append("<td>" + result.getString("windrichtung") + "</td>");
					row.append("<td>" + result.getString("luftdruck") + "</td>");
					row.append("<td>" + result.getString("temperatur") + "</td>");
					row.append("<td>" + result.getString("wolken") + "</td>");
					row.append("<td>" + result.getString("regen") + "</td>");
					row.append("<td>" + result.getString("wellenrichtung") + "</td>");
					row.append("<td>" + result.getString("wellenhoehe") + "</td>");
					row.append("<td style='width:30px; text-align:left;'><div class='btn-group'>");
					row.append("<a class='btn btn-small remove trackingpoint' id='" + result.getString("trackpointnr")
						+ "'><span><i class='icon-remove'></i></span></a>");
					row.append("</div></td>");
					row.append("</tr>");
					
					responseData += row.toString();
				}

			} catch (Exception e) {
			e.printStackTrace();
			}
		}
	return ok(trackingpoint.render(header.render(), header_app.render(), navigation.render("app_trackinginfo"), navigation_app.render("app_trackinginfo"), responseData));
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

	public static Result delete() {
	DynamicForm data = form().bindFromRequest();
	Connection conn = DB.getConnection();
	Statement query;            
	ResultSet result;
	ObjectNode respJSON = Json.newObject();

	try {
		query = conn.createStatement();
		query.execute("DELETE FROM seapal.trackingpoint WHERE trackpointnr = " + data.get("trackpointnr"));
		conn.close();

		respJSON.put("trackpointnr", "ok");

	} catch (Exception e) {
		respJSON.put("trackpointnr", "Error: " + e);
	}

	return ok(respJSON);
	}
	
}