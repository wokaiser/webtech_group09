$(function() {
    var trackingLoad = null;
	var tracknrValue = null;
    
	function loadEntry(id) { 
			        	
	    jQuery.get("app_trackinginfo_load.php", {'tracknr': id}, function(data) {
	        $('#skipper').val(data['skipper']);
	        $('#crew').val(data['crew']);
	        $('#tstart').val(data['tstart']);
	        $('#tende').val(data['tende']);
	        $('#tdauer').val(data['tdauer']);
	    } , "json");
	}
	
	function addEntry(tracknr, json) {
		
		var entry = ""; 
			
		entry += "<tr class='selectable' id='" + tracknr + "'>";
		entry += "<td>" + json.skipper + "</td>";
		entry += "<td>" + json.crew + "</td>";
		entry += "<td>" + json.tstart + "</td>";
		entry += "<td>" + json.tende + "</td>";
		entry += "<td>" + json.tdauer + "</td>";
        entry += "<td style='width:30px; text-align:left;'><div class='btn-group'>";
        entry += "<a class='btn btn-small view tracking' id='" + tracknr + "'><span><i class='icon-eye-open'></i></span></a>";
        entry += "<a class='btn btn-small remove trackin' id='" + tracknr + "'><span><i class='icon-remove'></i></span></a>";
        entry += "</div></td>";
        entry += "</tr>";

		$('#entries_tracking').append(entry);
	}

	$('a.view.tracking').live("click", function(event) {
        trackingLoad = null;
        tracknrValue = $(this).attr('id');      
        //get the trackinfoinfo json object
        $.getJSON(
            "json_app_trackinginfo.php",
            { tracknr: tracknrValue}, function(tracking){
                trackingLoad = tracking;
                jQuery.get("app_trackinginfo_load.php", {'tracknr': tracknrValue}, function(data) {
                    //add the tracking only to the cookie-less session if the tracking not already exist
                    if (!trackAlreadyInMap(trackingLoad)) {
                        //create a new track
                        newTracking = getNewTracking();
                        //set the trackingpoints to the track
                        newTracking.trackpoints = trackingLoad;
                        //add the other components to the track
                        //load the trip info from to the session.
                        for (var i in TRACKING_INFO) {
                            newTracking[TRACKING_INFO[i]] = data[TRACKING_INFO[i]];
                        }
                        //push the new track to the trackings array
                        session.map.trackings.push(newTracking);
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
    
    //check if a track is already in the cookie-less session (where all tracks are stored)
    function trackAlreadyInMap(tracking) {
        for (var i in session.map.trackings){
            if (session.map.trackings[i].trackpoints.length != tracking.length) {
                continue;
            }
            for (var j in session.map.trackings[i].trackpoints) {
                if ((session.map.trackings[i].trackpoints[j].lat != tracking[j].lat)
                  ||(session.map.trackings[i].trackpoints[j].lng != tracking[j].lng)) {
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
		jQuery.post("app_trackinginfo_delete.php", { "tracknr": id }, function(data) {
		 
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

	$('#save_tracking').click(function(event) {	
		event.preventDefault();

		var query = window.location.search;
		
		var tnrQuery = query.match(/tnr=\d/);
		var tnr = tnrQuery[0].replace(/tnr=/, "");
		
		var json = {
				"tnr": tnr,
	          	"skipper": $('#skipper').val(),
	          	"crew": $('#crew').val(),
	         	"tstart": $('#tstart').val(),
		        "tende": $('#tende').val(),
		        "tdauer": $('#tdauer').val(),		        
	    };

	    console.log(json);
		
		jQuery.post("app_trackinginfo_insert.php", json, function(data) { 
			
			if (data['tracknr'].match(/Error/)) {
		    	
		    	$('#dialogTitle').text('Error');
		    	$('#dialogMessage').text(data['tracknr'].replace(/Error: /, ""));
		    	
	    	} else {
		    	
		    	addEntry( data['tracknr'], json ); 
	    
		    	$('#dialogTitle').text('Success');
		    	$('#dialogMessage').text("Eintrag wurde erfolgreich gespeichert.");
	    	}
			
			$('#messageBox').modal('show');
		
		}, "json");
	
	});

});

