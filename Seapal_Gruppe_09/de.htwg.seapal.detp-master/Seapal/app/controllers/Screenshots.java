package controllers;

import play.*;
import play.mvc.*;

import views.html.*;
import views.html._include.*;

public class Screenshots extends Controller {
  
	public static Result index() {
		return ok(screenshots_ipad.render(header.render(), navigation.render("screenshots_ipad"), footer.render()));
	}

	public static Result tools() {
		return ok(screenshots_tools.render(header.render(), navigation.render("screenshots_tools"), footer.render()));
	}

	public static Result inplace() {
		return ok(screenshots_inplace.render(header.render(), navigation.render("screenshots_inplace"), footer.render()));
	}

	public static Result logbook() {
		return ok(screenshots_logbook.render(header.render(), navigation.render("screenshots_logbook"), footer.render()));
	}

	public static Result iphone() {
		return ok(screenshots_iphone.render(header.render(), navigation.render("screenshots_iphone"), footer.render()));
	}	
  
  
}