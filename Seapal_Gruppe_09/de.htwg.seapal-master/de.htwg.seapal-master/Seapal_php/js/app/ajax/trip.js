$(function() {
    var routeLoad = null;
	var tnrValue = null;
    
	function addEntry(tnr, json) {
		
		var entry = "";
		
		entry += "<tr class='selectable'>";
	    entry += "<td>" + json.titel + "</td>";
	    entry += "<td>" + json.skipper + "</td>";
	    entry += "<td>" + json.tstart + "</td>";
	    entry += "<td>" + json.tende + "</td>";
	    entry += "<td>" + json.tdauer + "</td>";
	    entry += "<td>" + json.motor + "</td>";
	    entry += "<td style='width:30px; text-align:right;'><div class='btn-group'>";
		entry += "<a class='btn btn-small view' id='" + tnr + "'><span><i class='icon-eye-open'></i></span></a>";
		entry += "<a class='btn btn-small remove' id='" + tnr + "'><span><i class='icon-remove'></i></span></a>";
		entry += "<a href='app_tripinfo.php?tnr=" + tnr + "' class='btn btn-small redirect' id='" + tnr + "'><span><i class='icon-chevron-right'></i></span></a>";
		entry += "</div></td>";
	    entry += "</tr>";
	    
		$('#entries').append(entry);
	}

	$('a.view').live("click", function(event) {
        routeLoad = null;
        tnrValue = $(this).attr('id');
        //get the tripinfo json object
        $.getJSON(
            "json_app_tripinfo.php",
            { tnr: tnrValue}, function(route){
                routeLoad = route;
                jQuery.get("app_trip_load.php", {'tnr': tnrValue}, function(data) {
                    $('#titel').val(data['titel']);
                    $('#von').val(data['von']);
                    $('#nach').val(data['nach']);
                    $('#tstart').val(data['tstart']);
                    $('#tende').val(data['tende']);
                    $('#tdauer').val(data['tdauer']);
                    $('#skipper').val(data['skipper']);
                    $('#crew').val(data['crew']);
                    $('#motor').val(data['motor']);
                    $('#tank').attr('checked', data['tank']);
            
                    //add the route only to the cookie-less session if the route not already exist
                    if (!rootAlreadyInMap(routeLoad)) {
                        //create a new route
                        newRoute = getNewRoute();
                        //set the marker to the route
                        newRoute.marker = routeLoad;
                        //add the other components to the route
                        //load the trip info from to the session.
                        for (var i in TRIP_INFO) {
                            newRoute[TRIP_INFO[i]] = data[TRIP_INFO[i]];
                        }
                        //push the new Route to the routes array
                        session.map.routes.push(newRoute);
                        newRouteNotification();
                    }
            
                }, "json");
            }
        );
	});
    
    //call a function "callback" every "delay" ms and x "repetitions"
    function setIntervalX(callback, delay, repetitions) {
        var x = 0;
        var intervalID = window.setInterval(function () {

           callback();

           if (++x === repetitions) {
               window.clearInterval(intervalID);
           }
        }, delay);
    }
    
    //check if a route is already in the cookie-less session (where all routes are stored)
    function rootAlreadyInMap(route) {
        for (var i in session.map.routes){
            if (session.map.routes[i].marker.length != route.length) {
                continue;
            }
            for (var j in session.map.routes[i].marker) {
                if ((session.map.routes[i].marker[j].lat != route[j].lat)
                  ||(session.map.routes[i].marker[j].lng != route[j].lng)) {
                    break;
                }
                return true;
            }
        }
        return false;
    }

    //notify that a new route was insert to the map app.
    function newRouteNotification()
    {
        newRouteNotification.state = 0
        setIntervalX(function() {
            newRouteNotification.state++;
            if((newRouteNotification.state = newRouteNotification.state % 2) != 0) document.getElementById("button_app_map").style.background="red";
            else document.getElementById("button_app_map").style.background=null;
        }, 1000, 10);
        document.getElementById("button_app_map").style.background=null;
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
	
	$('#save').click(function(event) {
	
		event.preventDefault();
	
		var json = {
            "titel": $('#titel').val(),
            "von": $('#von').val(),
            "nach": $('#nach').val(),
	        "tstart": $('#tstart').val(),
	        "tende": $('#tende').val(),
	        "tdauer": $('#tdauer').val(),
	        "skipper": $('#skipper').val(),
	        "crew": $('#crew').val(),
	        "motor": $('#motor').val(),
	        "tank": $('#tank').val()        
	    };
        
        console.log(json);
	
	    jQuery.post("app_trip_insert.php", json, function(data) { 
	    
	    	if (data['tnr'].match(/Error/)) {
		    	
		    	$('#dialogTitle').text('Error');
		    	$('#dialogMessage').text(data['tnr'].replace(/Error: /, ""));
		    	
	    	} else {
		    	
		    	addEntry( data['tnr'], json );
	    
		    	$('#dialogTitle').text('Success');
		    	$('#dialogMessage').text("Eintrag wurde erfolgreich gespeichert.");
	    	}
	    	
	    	$('#messageBox').modal('show');
	    
	    }, "json");
		
	});
});