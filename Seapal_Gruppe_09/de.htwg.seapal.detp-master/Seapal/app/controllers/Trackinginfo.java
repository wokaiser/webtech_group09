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

public class Trackinginfo extends Controller {
  
	public static Result insert() {
		DynamicForm data = form().bindFromRequest();
		Connection conn = DB.getConnection();
		Statement query;            
		ResultSet result;
		ObjectNode respJSON = Json.newObject();
		int nextId = 0;

		try {
			query = conn.createStatement();
			
			query.execute("INSERT INTO seapal.tracking (tnr, trackTitel, skipper, crew, tstart, tende, tdauer, lastZoom, lastLat, lastLng) VALUES (" + data.get("tnr") + ","
			+ "'" + data.get("trackTitel") + "',"
			+ "'" + data.get("skipper") + "',"
			+ "'" + data.get("crew") + "',"
			+ "'" + data.get("tstart") + "',"
			+ "'" + data.get("tende") + "',"
			+ "'" + data.get("tdauer") + "',"
			+ "'" + data.get("lastZoom") + "',"
			+ "'" + data.get("lastLat") + "',"
			+ "'" + data.get("lastLng") + "');");


			result = query.executeQuery("SHOW TABLE STATUS FROM seapal LIKE 'tracking'");
			if (result.next()) {
			nextId = result.getInt("Auto_increment");
			}
			conn.close();

			respJSON.put("tracknr", "" + (nextId - 1));
		} catch (Exception e) {
			respJSON.put("tracknr", "Error: " + e);
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
			query.execute("DELETE FROM seapal.tracking WHERE tracknr = " + data.get("tracknr"));

			conn.close();
			respJSON.put("tracknr", "ok");

		} catch (Exception e) {
			respJSON.put("tracknr", "Error: " + e);
		}

		return ok(respJSON);
	}
  
	public static Result load() {
		DynamicForm data = form().bindFromRequest();
		Connection conn = DB.getConnection();
		Statement query;            
		ResultSet result;
		ObjectNode respJSON = Json.newObject();
		int nextId = 0;

		try {
			query = conn.createStatement();		
			String sql = "SELECT * FROM seapal.tracking WHERE  tracknr = " + data.get("tracknr");		
			result = query.executeQuery(sql);

			while (result.next()) {
				respJSON.put("tracknr", Integer.toString(result.getInt("tracknr")));
				respJSON.put("tnr", Integer.toString(result.getInt("tnr")));
				respJSON.put("trackTitel", result.getString("trackTitel"));
				respJSON.put("skipper", result.getString("skipper"));
				respJSON.put("crew", result.getString("crew"));
				respJSON.put("tstart", result.getString("tstart"));
				respJSON.put("tende", result.getString("tende"));
				respJSON.put("tdauer", result.getString("tdauer"));
				respJSON.put("lastZoom", result.getFloat("lastZoom"));
				respJSON.put("lastLat", result.getFloat("lastLat"));
				respJSON.put("lastLng", result.getFloat("lastLng"));
			}
			conn.close();

		} catch (Exception e) {	}
	return ok(respJSON);
	}
  
	public static Result index() {
		String data = loadEntries();
		
		return ok(trackinginfo.render(header.render(),
								header_app.render(),
    						    navigation.render("app_trackinginfo"), 
    						    navigation_app.render("app_trackinginfo"), 
    						    data));
	}

	public static String loadEntries() {
		DynamicForm data = form().bindFromRequest();
		Connection conn = DB.getConnection();
		String returnData = "";	
		String sql = "";
		String tnrAsString = data.get("tnr");
		StringBuilder row;
		int tnr = -1;
		int bnr = 0;
        int numberInView = 1;
                
		if(tnrAsString != null && !tnrAsString.isEmpty())
			tnr = Integer.parseInt(tnrAsString);
		
		if(session().containsKey("bnr"))
			bnr = Integer.parseInt(session().get("bnr"));
			
		if(conn != null) {
            Statement query;
            ResultSet result;
            
            try {            
				query = conn.createStatement();

				if(session().containsValue("bnr"))
					bnr = Integer.parseInt(session().get("bnr"));

				if(tnr == -1) {
					sql = "SELECT b.* FROM seapal.tripinfo a JOIN seapal.tracking b on a.tnr = b.tnr WHERE a.bnr = " + bnr;
				} else {
					sql = "SELECT * FROM seapal.tracking WHERE tnr = " + tnr;
				}

				result = query.executeQuery(sql);

				while (result.next()) {
					row = new StringBuilder();

					row.append("<tr class='selectable'>");
                    row.append("<td>" + numberInView + "</td>");
					row.append("<td>" + result.getString("trackTitel") + "</td>");
					row.append("<td>" + result.getString("skipper") + "</td>");
					row.append("<td>" + result.getString("crew") + "</td>");
					row.append("<td>" + result.getString("tstart") + "</td>");
					row.append("<td>" + result.getString("tende") + "</td>");
					row.append("<td>" + result.getString("tdauer") + "</td>");
					row.append("<td style='width:30px; text-align:left;'><div class='btn-group'>");
					row.append("<a class='btn btn-small view tracking' id='" + numberInView + ":" + result.getString("tracknr")
					+ "'><span><i class='icon-eye-open'></i></span></a>");
					row.append("<a class='btn btn-small remove tracking' id='" + result.getString("tracknr")
					+ "'><span><i class='icon-remove'></i></span></a>");
					row.append("<a href='/app_tracking_point?tracknr=" + result.getString("tracknr") + "' class='btn btn-small redirect' id='" + result.getString("tracknr") + "'><span><i class='icon-chevron-right'></i></span></a>");
					row.append("</div></td>");
					row.append("</tr>");

					returnData += row.toString();
                    numberInView++;
					conn.close();
				}
			} catch (Exception e) {
			   e.printStackTrace();
			}
        }
	return returnData;
	}

  
}