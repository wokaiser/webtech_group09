$(function() {
    var routeLoad = null;
	var tnrValue = null;
    var numberInView = 0;
    
	$('a.view').live("click", function(event) {
        routeLoad = null;
        numbers = $(this).attr('id').split(":");
        numberInView = numbers[0];
        tnrValue = numbers[1];
        //get the tripinfo json object
        $.getJSON(
            "/app_tripinfo.html",
            { tnr: tnrValue}, function(route){
                routeLoad = route;
                jQuery.get("/app_trip_load.html", {'tnr': tnrValue}, function(data) {

                    //create a new route
                    newRoute = getNewRoute();
                    //set the marker to the route
                    newRoute.marker = routeLoad;
                    //add the route only to the cookie-less session if the route not already exist
                    if (!rootAlreadyInMap(newRoute)) {
                        //add the other components to the route
                        //load the trip info from to the session.
                        for (var i in TRIP_INFO_LOAD) {
                            newRoute[TRIP_INFO_LOAD[i]] = data[TRIP_INFO_LOAD[i]];
                        }

                        //push the new Route to the routes array
                        session.map.routes.push(newRoute);
                        //the route will now be available in the map, display a message
                        displayMessageBox("successMessageBox", "Route "+numberInView+" will now be displayed in the map.", "19em", "-9.5em");
                    } else {
                        //the route is already in the map, display info message
                        displayMessageBox("infoMessageBox", "Route "+numberInView+" will be already displayed in the map.", "20em", "-10em");
                    }
            
                }, "json");
            }
        );
	});
    
    //check if a route is already in the cookie-less session (where all routes are stored)
    function rootAlreadyInMap(route) {
        for (var i in session.map.routes){
            if ((session.map.routes[i].marker.length != route.marker.length)
              ||(session.map.routes[i].type != route.type)) {
                continue;
            }
            for (var j in session.map.routes[i].marker) {
                if ((session.map.routes[i].marker[j].lat != route.marker[j].lat)
                  ||(session.map.routes[i].marker[j].lng != route.marker[j].lng)) {
                    break;
                }
                return true;
            }
        }
        return false;
    }
	
	$('a.remove').live("click", function(event) {
		var buttonID = this;
	 	var tripnr = $(this).attr('id');
		jQuery.post("app_trip_delete.php", { "tnr": tripnr }, function(data) { 
		
			if (data['tnr'].match(/Error/)) {
		    	
		    	$('#dialogTitle').text('Error');
		    	$('#dialogMessage').text(data['tnr'].replace(/Error: /, ""));
		    	
	    	} else {
		    	
		    	$(buttonID).parents('tr').remove();  
	    
		    	$('#dialogTitle').text('Succes');
		    	$('#dialogMessage').text("Eintrag wurde erfolgreich gelöscht.");
	    	}
			
			$('#messageBox').modal('show');
		}, "json");		
	});
});