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

    try {
	      query = conn.createStatement();

        query.execute("INSERT INTO seapal.tripinfo (titel, von, nach) VALUES ("
                + "'" + data.get("titel") + "',"
                + "'" + data.get("von") + "',"
                + "'" + data.get("nach") + "',");

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
  
  public static Result load() {
	DynamicForm data = form().bindFromRequest();
	Connection conn = DB.getConnection();
	ObjectNode respJSON = Json.newObject();
	String returnData = "";
	String tnrAsString = data.get("tnr");
	int tnr = 1;
	if(tnrAsString != null && !tnrAsString.isEmpty())
		tnr = Integer.parseInt(tnrAsString);
	Statement query;
    ResultSet result;

		if(conn != null) {
        try {
			query = conn.createStatement();
			String sql = "SELECT * FROM seapal.tripinfo WHERE tnr = " + tnr;
			result = query.executeQuery(sql);

			while (result.next()) {
				respJSON.put("0", Integer.toString(result.getInt("tnr")));
				respJSON.put("1", Integer.toString(result.getInt("bnr")));
				respJSON.put("2", result.getString("titel"));
				respJSON.put("3", result.getString("von"));
				respJSON.put("4", result.getString("nach"));
				respJSON.put("5", Float.toString(result.getFloat("lastZoom")));
				respJSON.put("6", Float.toString(result.getFloat("lastLat")));
				respJSON.put("7", Float.toString(result.getFloat("lastLng")));
				respJSON.put("tnr", Integer.toString(result.getInt("tnr")));
				respJSON.put("bnr", Integer.toString(result.getInt("bnr")));
				respJSON.put("titel", result.getString("titel"));
				respJSON.put("von", result.getString("von"));
				respJSON.put("nach", result.getString("nach"));
				respJSON.put("lastZoom", result.getFloat("lastZoom"));
				respJSON.put("lastLat", result.getFloat("lastLat"));
				respJSON.put("lastLng", result.getFloat("lastLng"));
			}
			conn.close();

        } catch (Exception e) {
	    	   e.printStackTrace();
        }
    }

    return ok(respJSON);
  }

  public static Result index() {
    Connection conn = DB.getConnection();
		
		String data = "";
    
		if(conn != null)
		{
            Statement query;
            ResultSet result;
            
            try {
            	
	            query = conn.createStatement();
	 
	            String sql = "SELECT * " + "FROM seapal.tripinfo ";
	        
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
                  + "' href='app_tripinfo.html?tnr=" + result.getString("tnr")
                  + "'><span><i class='icon-chevron-right'></i></span></a>");
                row.append("</div></td>");
                row.append("</tr>");
            
		            data += row.toString();
			    }
               
	       } catch (Exception e) {
	    	   e.printStackTrace();
	       }
    }
    return ok(trip.render(header.render(), navigation.render("app_map"), navigation_app.render("app_trip"), data));
  }
  
}