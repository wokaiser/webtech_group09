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

public class Tripinfo extends Controller {
  
  public static Result insert() {
  
    DynamicForm data = form().bindFromRequest();
    Connection conn = DB.getConnection();
		Statement query;            
    ResultSet result;
    ObjectNode respJSON = Json.newObject();
    int nextId = 0;

    try {
	      query = conn.createStatement();

		query.execute("INSERT INTO seapal.wegpunkte (tnr, name, lat, lng) VALUES (" + data.get("tnr") + ","
						+ "'" + data.get("lat") + "',"
						+ "'" + data.get("lng") + "');");

         result = query.executeQuery("SHOW TABLE STATUS FROM seapal LIKE 'wegpunkte'");
         if (result.next()) {
             nextId = result.getInt("Auto_increment");
         }
         conn.close();

         respJSON.put("wnr", "" + (nextId - 1));

    } catch (Exception e) {
        respJSON.put("wnr", "Error: " + e);
    }

    return ok(respJSON);
  }
  
  public static Result delete(int wnr) {

    Connection conn = DB.getConnection();
		Statement query;            
    ResultSet result;
    ObjectNode respJSON = Json.newObject();
  
    try {
	      query = conn.createStatement();
        query.execute("DELETE FROM seapal.wegpunkte WHERE wnr = " + wnr);

        conn.close();

        respJSON.put("wnr", "ok");

    } catch (Exception e) {
        respJSON.put("wnr", "Error: " + e);
    }
  
    return ok(respJSON);
  }
  
  public static Result load(int wnr) {
  
    Connection conn = DB.getConnection();
		Statement query;
    ResultSet result;
    ObjectNode respJSON = Json.newObject();

		if(conn != null)
		{
        try {
            	
            query = conn.createStatement();
	 
            String sql = "SELECT * FROM seapal.wegpunkte WHERE wnr = " + wnr;
	        
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

  public static Result index() {
		DynamicForm data = form().bindFromRequest();
		Connection conn = DB.getConnection();
		ObjectNode respJSON = Json.newObject();
		String returnData = "";
		String tnrAsString = data.get("tnr");
		int tnr = 1;
		if(tnrAsString != null && !tnrAsString.isEmpty())
			tnr = Integer.parseInt(tnrAsString);
    
		if(conn != null)
		{
            Statement query;
            ResultSet result;
            
            try {
	            query = conn.createStatement();
	            String sql = "SELECT * " + "FROM wegpunkte WHERE tnr = " + tnr;
	            result = query.executeQuery(sql);
	        
	            while (result.next()) {
					respJSON.put("name", result.getString("name"));
					respJSON.put("lat", result.getFloat("lat"));
					respJSON.put("lng", result.getFloat("lng"));
			    }
				conn.close();
               
	       } catch (Exception e) {
	    	   e.printStackTrace();
	       }
    }
    return ok(respJSON);
  }
  
}