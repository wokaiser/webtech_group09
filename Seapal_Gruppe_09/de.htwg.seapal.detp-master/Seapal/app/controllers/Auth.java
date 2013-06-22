package controllers;

import play.*;
import play.mvc.*;
import play.db.*;
import play.data.*;
import java.sql.*;
import javax.sql.*;
import play.libs.Json;
import play.data.DynamicForm;
import views.html.*;
import views.html._include.*;
import play.mvc.Http;

public class Auth extends Action.Simple {
  public Result call(Http.Context ctx) throws Throwable {    
		String username = ctx.session().get("user");
		System.out.println(username);
		
		if(username == null || username.isEmpty())
			return redirect("/login");
		else
			return delegate.call(ctx);
	  
  }
}