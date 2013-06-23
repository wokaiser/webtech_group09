$(function() {
    var trackingLoad = null;
	var tracknrValue = null;
    
	$('a.view.tracking').live("click", function(event) {
        trackingLoad = null;
        tracknrValue = $(this).attr('id');      
        //get the trackinfoinfo json object
        $.getJSON(
            "/app_track_load.html",
            { tnr: tracknrValue}, function(tracking){
                trackingLoad = tracking;
                jQuery.get("/app_trackinginfo_load.html", {'tracknr': tracknrValue}, function(data) {
                    //create a new track
                    newTracking = getNewTracking();
                    //set the trackingpoints to the track
                    newTracking.marker = trackingLoad;
                    //add the tracking only to the cookie-less session if the tracking not already exist
                    if (!rootAlreadyInMap(newTracking)) {
                        //add the other components to the track
                        //load the trip info from to the session.
                        for (var i in TRACKING_INFO_LOAD) {
                            newTracking[TRACKING_INFO_LOAD[i]] = data[TRACKING_INFO_LOAD[i]];
                        }
                        //push the new track to the trackings array
                        session.map.routes.push(newTracking);
                        //the track will now be available in the map, display a message
                        displayMessageBox("successMessageBox", "The track will now be displayed in the map.", "18em", "-9em");
                    } else {
                        //the track is already in the map, display info message
                        displayMessageBox("infoMessageBox", "The track will be already displayed in the map.", "20em", "-10em");
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
	$('a.remove.tracking').live("click", function(event) {
		var buttonID = this;
	 	var id = $(this).attr('id');
		jQuery.post("/app_trackinginfo_delete.html", { "tracknr": id }, function(data) {
		 
		 	if (data['tracknr'].match(/Error/)) {
		    	
		    	$('#dialogTitle').text('Error');
		    	$('#dialogMessage').text(data['tracknr'].replace(/Error: /, ""));
		    	
	    	} else {
		    	
		    	$(buttonID).parents('tr').remove();  
	    
		    	$('#dialogTitle').text('Succes');
		    	$('#dialogMessage').text("Eintrag wurde erfolgreich gelöscht.");
	    	}
			
			$('#messageBox').modal('show');
		}, "json");
	});
});

