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
  
  public static Result delete(int tracknr) {

    Connection conn = DB.getConnection();
	Statement query;            
    ResultSet result;
    ObjectNode respJSON = Json.newObject();
  
    try {
	    query = conn.createStatement();
        query.execute("DELETE FROM seapal.tracking WHERE tracknr = " + tracknr);

        conn.close();

        respJSON.put("tracknr", "ok");

    } catch (Exception e) {
        respJSON.put("tracknr", "Error: " + e);
    }
  
    return ok(respJSON);
  }
  
  public static Result load(int tnr, int bnr) {
  
    Connection conn = DB.getConnection();
		Statement query;
	String sql = "";
    ResultSet result;
    ObjectNode respJSON = Json.newObject();

		if(conn != null)
		{
        try {
            	
	          query = conn.createStatement();
	 
			if(tnr == -1) {
				sql = "SELECT b.* FROM seapal.tripinfo a JOIN seapal.tracking b on a.tnr = b.tnr WHERE a.bnr = " + bnr;
			}
	        else {
				sql = "SELECT * FROM seapal.tracking WHERE tnr = " + tnr;
			}
			  
	        result = query.executeQuery(sql);
            java.sql.ResultSetMetaData rsmd = result.getMetaData();
            int numColumns = rsmd.getColumnCount();

            while (result.next()) {
                for (int i = 1; i < numColumns + 1; i++) {
                    String columnName = rsmd.getColumnName(i);
                    respJSON.put(columnName, result.getString(i));
                }
            }
            conn.close();

        } catch (Exception e) {
	    	   e.printStackTrace();
        }
    }
    return ok(respJSON);
  }

  public static Result show(int tnr, int bnr) {
	return index(tnr, bnr);
  }
  
  public static Result index(int tnr, int bnr) {
	    
	  String data = loadEntries(tnr, bnr);
		
	  return ok(trackinginfo.render(header.render(),
								header_app.render(),
    						    navigation.render("app_trackinginfo"), 
    						    navigation_app.render("app_trackinginfo"), 
    						    data));
  }

	public static String loadEntries(int tnr, int bnr) {
	
		Connection conn = DB.getConnection();
		
		String data = "";
		String sql = "";
	
		if(conn != null)
		{
            Statement query;
            ResultSet result;
            
            try {
            	
	            query = conn.createStatement();
	 
			if(tnr == -1) {
				sql = "SELECT b.* FROM seapal.tripinfo a JOIN seapal.tracking b on a.tnr = b.tnr WHERE a.bnr = " + bnr;
			}
	        else {
				sql = "SELECT * FROM seapal.tracking WHERE tnr = " + tnr;
			}
	        
	            result = query.executeQuery(sql);
	        
	            while (result.next()) {
              
	        		  StringBuilder row = new StringBuilder();

                row.append("<tr class='selectable' id='" + result.getString("bnr") + "'>");
                row.append("<td>" + result.getString("trackTitel") + "</td>");
                row.append("<td>" + result.getString("skipper") + "</td>");
                row.append("<td>" + result.getString("crew") + "</td>");
                row.append("<td>" + result.getString("tstart") + "</td>");
                row.append("<td>" + result.getString("tende") + "</td>");
                row.append("<td>" + result.getString("tdauer") + "</td>");
                row.append("<td style='width:30px; text-align:left;'><div class='btn-group'>");
                row.append("<a class='btn btn-small view tracking' id='" + result.getString("tracknr")
                  + "'><span><i class='icon-eye-open'></i></span></a>");
                row.append("<a class='btn btn-small remove tracking' id='" + result.getString("tracknr")
                  + "'><span><i class='icon-remove'></i></span></a>");
				row.append("<a href='/app_tracking_point?tracknr = . " + result.getString("tracknr") + "' class='btn btn-small redirect' id='" + result.getString("tracknr") + "'><span><i class='icon-chevron-right'></i></span></a>");
                row.append("</div></td>");

                row.append("</tr>");
            
		            data += row.toString();
			    }
               
	       } catch (Exception e) {
	    	   e.printStackTrace();
	       }
        }
            
        return data;
	}

  
}