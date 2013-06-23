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

public class Trip extends Controller {
  
  public static Result insert() {
    DynamicForm data = form().bindFromRequest();
    Connection conn = DB.getConnection();
	Statement query;            
    ResultSet result;
    ObjectNode respJSON = Json.newObject();
    int nextId = 0;
	int bnr = 0;
	String bnrAsString = session().get("bnr");
	if(bnrAsString != null)
		bnr = Integer.parseInt(bnrAsString);

    try {
	      query = conn.createStatement();

        query.execute("INSERT INTO seapal.tripinfo (bnr, titel, von, nach, lastZoom, lastLat, lastLng) VALUES ("
				+ bnr + ","
                + "'" + data.get("titel") + "',"
                + "'" + data.get("von") + "',"
				+ "'" + data.get("nach") + "',"
				+ "'" + data.get("lastZoom") + "',"
				+ "'" + data.get("lastLat") + "',"
                + "'" + data.get("lastLng") + "');");

         result = query.executeQuery("SHOW TABLE STATUS FROM seapal LIKE 'tripinfo'");
         if (result.next()) {
             nextId = result.getInt("Auto_increment");
         }
         conn.close();

         respJSON.put("tnr", "" + (nextId - 1));

    } catch (Exception e) {
        respJSON.put("tnr", "Error: " + e);
    }

    return ok(respJSON);
  }
  
  public static Result delete(int tnr) {

    Connection conn = DB.getConnection();
		Statement query;            
    ResultSet result;
    ObjectNode respJSON = Json.newObject();
  
    try {
	      query = conn.createStatement();
        query.execute("DELETE FROM seapal.tripinfo WHERE tnr = " + tnr);

        conn.close();

        respJSON.put("tnr", "ok");

    } catch (Exception e) {
        respJSON.put("tnr", "Error: " + e);
    }
  
    return ok(respJSON);
  }
  
  // app_trip_load.html = json_app_trackinginfo.php
	public static Result load() {
		DynamicForm data = form().bindFromRequest();
		Connection conn = DB.getConnection();
		ObjectNode respJSON = Json.newObject();
		StringBuilder response = new StringBuilder("[");
		String tnrAsString = data.get("tnr");
		int tracknr = 1;
		if(tnrAsString != null && !tnrAsString.isEmpty())
			tracknr = Integer.parseInt(tnrAsString);
		Statement query;
		ResultSet result;

		if(conn != null) {
			try {
				query = conn.createStatement();
				String sql = "SELECT * FROM seapal.trackingpoint WHERE tracknr = " + tracknr;
				result = query.executeQuery(sql);

				while (result.next()) {
					response.append("{");
					response.append("\"lat\":\"" + Float.toString(result.getFloat("lat")) + "\",");
					response.append("\"lng\":\"" + Float.toString(result.getFloat("lng")) + "\",");
					response.append("\"marker\":\"" + result.getString("marker") + "\",");
					response.append("\"btm\":\"" + result.getString("btm") + "\",");
					response.append("\"dtm\":\"" + result.getString("dtm") + "\",");
					response.append("\"sog\":\"" + result.getString("sog") + "\",");
					response.append("\"cog\":\"" + result.getString("cog") + "\",");
					response.append("\"manoever\":\"" + result.getString("manoever") + "\",");
					response.append("\"vorsegel\":\"" + result.getString("vorsegel") + "\",");
					response.append("\"wdate\":\"" + result.getString("wdate") + "\",");
					response.append("\"wtime\":\"" + result.getString("wtime") + "\",");
					response.append("\"motor\":\"" + result.getString("motor") + "\",");
					response.append("\"tank\":\"" + result.getString("tank") + "\",");
					response.append("\"windstaerke\":\"" + result.getString("windstaerke") + "\",");
					response.append("\"windrichtung\":\"" + result.getString("windrichtung") + "\",");
					response.append("\"luftdruck\":\"" + result.getString("luftdruck") + "\",");
					response.append("\"temperatur\":\"" + result.getString("temperatur") + "\",");
					response.append("\"wolken\":\"" + result.getString("wolken") + "\",");
					response.append("\"regen\":\"" + result.getString("regen") + "\",");
					response.append("\"wellenhoehe\":\"" + result.getString("wellenhoehe") + "\",");
					response.append("\"wellenrichtung\":\"" + result.getString("wellenrichtung") + "\"");
					response.append("}");
					if(!result.isLast())
						response.append(",");
				}
				conn.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		response.append("]");
		response().setContentType("application/json");
		return ok(response.toString());
	}
  

 public static Result load_tracknr() {
	DynamicForm data = form().bindFromRequest();
	Connection conn = DB.getConnection();
	StringBuilder response = new StringBuilder("");
	Statement query;
    ResultSet result;
	String sql;
	String tnrAsString = data.get("tnr");
	int tnr = 1;
	if(tnrAsString != null && !tnrAsString.isEmpty())
		tnr = Integer.parseInt(tnrAsString);

		if(conn != null) {
        try {
	/*		query = conn.createStatement();
			String sql = "SELECT * FROM seapal.tracking WHERE tnr = " + tnr;
			result = query.executeQuery(sql);
			
			if(result.next()) {
				tnr = result.getInt("tracknr");*/
				query = conn.createStatement();
				sql = "SELECT * FROM seapal.tripinfo WHERE tnr = " + tnr;
				result = query.executeQuery(sql);

					if(result.next()) {
						response.append("{");
						response.append("\"0\":\"" + Integer.toString(result.getInt("tnr")) + "\",");
						response.append("\"1\":\"" + Integer.toString(result.getInt("bnr")) + "\",");
						response.append("\"2\":\"" + result.getString("titel") + "\",");
						response.append("\"3\":\"" + result.getString("von") + "\",");
						response.append("\"4\":\"" + result.getString("nach") + "\",");
						response.append("\"5\":\"" + result.getInt("lastZoom") + "\",");
						response.append("\"6\":\"" + Float.toString(result.getFloat("lastLat")) + "\",");
						response.append("\"7\":\"" + Float.toString(result.getFloat("lastLng")) + "\",");
						response.append("\"tnr\":\"" + Integer.toString(result.getInt("tnr")) + "\",");
						response.append("\"bnr\":\"" + Integer.toString(result.getInt("bnr")) + "\",");
						response.append("\"titel\":\"" + result.getString("titel") + "\",");
						response.append("\"von\":\"" + result.getString("von") + "\",");
						response.append("\"nach\":\"" + result.getString("nach") + "\",");
						response.append("\"lastZoom\":" + result.getInt("lastZoom") + ",");
						response.append("\"lastLat\":" + result.getFloat("lastLat") + ",");
						response.append("\"lastLng\":" + result.getFloat("lastLng") + "");
						response.append("}");
					} 
		//	}
			conn.close();

        } catch (Exception e) {
	    	   e.printStackTrace();
        }
    }

	response().setContentType("application/json");
    return ok(response.toString());
  }

	public static Result index() {
		Connection conn = DB.getConnection();
		DynamicForm data = form().bindFromRequest();
		String responseData = "";
		int bnr = Integer.parseInt(session().get("bnr"));

		if(conn != null) {
			Statement query;
			ResultSet result;

			
			try {
				query = conn.createStatement();
				String sql = "SELECT * " + "FROM seapal.tripinfo WHERE bnr = " + bnr;
				result = query.executeQuery(sql);

				while (result.next()) {
					StringBuilder row = new StringBuilder();

					row.append("<tr class='selectable' id='" + result.getString("tnr") + "'>");
					row.append("<td>" + result.getString("titel") + "</td>");
					row.append("<td>" + result.getString("von") + "</td>");
					row.append("<td>" + result.getString("nach") + "</td>");
					row.append("<td style='width:30px; text-align:left;'><div class='btn-group'>");
					row.append("<a class='btn btn-small view tracking' id='" + result.getString("tnr")
						+ "'><span><i class='icon-eye-open'></i></span></a>");
					row.append("<a class='btn btn-small remove tracking' id='" + result.getString("tnr")
						+ "'><span><i class='icon-remove'></i></span></a>");
					row.append("<a class='btn btn-small redirect' id='" + result.getString("tnr")
						+ "' href='app_trackinginfo?tnr=" + result.getString("tnr")
						+ "'><span><i class='icon-chevron-right'></i></span></a>");
					row.append("</div></td>");
					row.append("</tr>");

					responseData += row.toString();
				}

			} catch (Exception e) {
			e.printStackTrace();
			}
		}
	return ok(trip.render(header.render(), navigation.render("app_map"), navigation_app.render("app_trip"), responseData));
	}

}