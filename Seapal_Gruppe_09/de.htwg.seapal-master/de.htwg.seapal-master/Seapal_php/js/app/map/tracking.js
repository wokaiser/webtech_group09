var actCount = 0;
var trCount = 0;
var activeRoute = null;
var activeRouteMarkerInSession = 0;
var Server;
var activeTracking = false;
var startOfTrackingTime = null;

function trackingActive() {
    return activeTracking;
}

function ResetCounter() {
    actCount = 0;
    trCount = 0;
}

function convertToCelcius(kelvin) {
    return (Math.round((kelvin - 273) * 100) / 100);
}

function startNewTracking() {
    startNewRoute(new google.maps.LatLng(activeRoute.marker[0].lat, activeRoute.marker[0].lng), MODE.TRACKING, activeRoute.titel);
    //save the zoom level, at which the user looked at this route.
    session.map.routes[activeRouteInSession].lastZoom = activeRoute.lastZoom;
    session.map.routes[activeRouteInSession].lastLat = activeRoute.lastLat;
    session.map.routes[activeRouteInSession].lastLng = activeRoute.lastLng;
    session.map.routes[activeRouteInSession].tstart = new Date().today();
    session.map.routes[activeRouteInSession].trackTitel = activeRoute.titel;
    //save the tnr for the tracking, which is a foreign key pointing to the route.
    session.map.routes[activeRouteInSession].tnr = activeRoute.tnr;
    addTrackingPoint(activeRoute.marker[0].lat, activeRoute.marker[0].lng);
    //load the trip info from the session to the input boxes.
    for (var i in TRACKING_INFO) {
        document.getElementById(TRACKING_INFO[i]).value = session.map.routes[activeRouteInSession][TRACKING_INFO[i]];
    }
    //show the tracking menu
    document.getElementById('trackingMenuContainer').style.display = "block";
}


function addTrackingPoint(lat, lng) {
    var weatherCurrent = "http://openweathermap.org/data/2.1/find/city?lat="+lat+"&lon="+lng+"&cnt=1";    
    /*---------------------------------------*/
    /*           Current Weather             */
    /*---------------------------------------*/
    $.ajax(weatherCurrent, {
        crossDomain:true, 
        dataType: "jsonp", 
        success:function(data,text,xhqr){
            //if actCount is 0, we do not add a route marker, because this call comes from the startNewRoute, which already set a route marker
            if (0 < actCount) {
                addRouteMarker(new google.maps.LatLng(lat, lng), null);
            }
            session.map.routes[activeRouteInSession].marker[actCount].marker = actCount + 1;
            session.map.routes[activeRouteInSession].marker[actCount].wdate = new Date().today();
            session.map.routes[activeRouteInSession].marker[actCount].wtime = new Date().timeNow();
            session.map.routes[activeRouteInSession].marker[actCount].windstaerke = data.list[0].wind.speed + " m/s";
            session.map.routes[activeRouteInSession].marker[actCount].windrichtung = data.list[0].wind.deg + " °";
            session.map.routes[activeRouteInSession].marker[actCount].luftdruck = data.list[0].main.pressure + " hPa";
            session.map.routes[activeRouteInSession].marker[actCount].temperatur = convertToCelcius(data.list[0].main.temp) + " °C";
            session.map.routes[activeRouteInSession].marker[actCount].wolken = data.list[0].weather[0].main;
            session.map.routes[activeRouteInSession].marker[actCount].btm = "192 °";
            session.map.routes[activeRouteInSession].marker[actCount].dtm = "120 m";
            session.map.routes[activeRouteInSession].marker[actCount].sog = "5 knts";
            session.map.routes[activeRouteInSession].marker[actCount].cog = "253°";
            session.map.routes[activeRouteInSession].marker[actCount].manoever = "none";
            session.map.routes[activeRouteInSession].marker[actCount].vorsegel = "spin";
            session.map.routes[activeRouteInSession].marker[actCount].motor = "No Motor used";
            session.map.routes[activeRouteInSession].marker[actCount].tank = "73 %";
            session.map.routes[activeRouteInSession].marker[actCount].regen = "See clouds";
            session.map.routes[activeRouteInSession].marker[actCount].wellenrichtung = "121 °";
            session.map.routes[activeRouteInSession].marker[actCount].wellenhoehe = "1 m";
            //calculate the duration of the tracking
            var endOfTrackingTime = new Date().getTime() / 1000;
            var timeleft = Math.floor(endOfTrackingTime - startOfTrackingTime);
            var hour = Math.floor( timeleft / 3600 );
            var minute = Math.floor( (timeleft%3600) / 60 );
            var second = Math.floor( timeleft%60 );
            session.map.routes[activeRouteInSession].tdauer = hour+":"+minute+":"+second;
            
            //save end of tracking date
            session.map.routes[activeRouteInSession].tende = new Date().today();
            
            document.getElementById("tdauer").value = session.map.routes[activeRouteInSession]["tdauer"];
            document.getElementById("tende").value = session.map.routes[activeRouteInSession]["tende"];
            actCount++;
        }
    });    
}

//save a route from the map to the database
function saveTrackingRoute() {
    if (js_loggedin != true) {
        $('#dialogTitle').text('Access denied');
        $('#dialogMessage').text("To use this functionality you have to be signed in.");
        $('#messageBox').modal('show');
    } else if (("" == session.map.routes[activeRouteInSession].trackTitel)
            ||( "" == session.map.routes[activeRouteInSession].skipper)
            ||("" == session.map.routes[activeRouteInSession].crew)
            ||("" == session.map.routes[activeRouteInSession].tstart)
            ||("" == session.map.routes[activeRouteInSession].tende)
            ||("" == session.map.routes[activeRouteInSession].tdauer)) {
        $('#dialogTitle').text('Error');
        $('#dialogMessage').text("Please fill in all Track Menu entries.");
        $('#messageBox').modal('show');
    } else {
        disableMap();
        jQuery.post("/app_trackinginfo_insert.html", 
			{
				"tnr" : session.map.routes[activeRouteInSession].tnr,
				"trackTitel" : session.map.routes[activeRouteInSession].trackTitel,
				"skipper" : session.map.routes[activeRouteInSession].skipper,
				"crew" : session.map.routes[activeRouteInSession].crew,
				"tstart" : session.map.routes[activeRouteInSession].tstart,
				"tende" : session.map.routes[activeRouteInSession].tende,
				"tdauer" : session.map.routes[activeRouteInSession].tdauer,
				"lastZoom" : session.map.routes[activeRouteInSession].lastZoom,
				"lastLat" : session.map.routes[activeRouteInSession].lastLat,
				"lastLng" : session.map.routes[activeRouteInSession].lastLng
			}, function(data) {            
            if (data['tracknr'].match(/Error/)) {                
                $('#dialogTitle').text('Error');
                $('#dialogMessage').text(data['tracknr'].replace(/Error: /, ""));
                $('#messageBox').modal('show');
                enableMap();
            } else {
                activeRouteMarkerInSession = 0;
                session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession].tracknr = data['tracknr'];
                //rekursive call to insert all markers of the route to the database
                jQuery.post("/app_tracking_point_insert.html", session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession], trackRoutePost, "json");
            }                
        }, "json");
    }
}

//rekursive function to save all markers of one route. This function calls itself for each marker.
function trackRoutePost(data) { 
    if (data['trackpointnr'].match(/Error/)) {
        $('#dialogTitle').text('Error');
        $('#dialogMessage').text(data['trackpointnr'].replace(/Error: /, ""));
        $('#messageBox').modal('show');
        enableMap();
    } else {
        activeRouteMarkerInSession++;
        if (activeRouteMarkerInSession < session.map.routes[activeRouteInSession].marker.length)
        {
            session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession].tracknr = session.map.routes[activeRouteInSession].marker[0].tracknr;
            jQuery.post("/app_tracking_point_insert.html", session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession], trackRoutePost, "json");
        } else {
            $('#dialogTitle').text('Success');
            $('#dialogMessage').text("Track successfully saved.");
            $('#messageBox').modal('show');
            enableMap();
        }
    }
}

function trackingFinished() {   
    //load the trip info from the session to the input boxes.
    for (var i in TRACKING_INFO) {
        document.getElementById(TRACKING_INFO[i]).value = session.map.routes[activeRouteInSession][TRACKING_INFO[i]];
    }

    //enable map interaction
    enableMap();
}

//For todays date;
Date.prototype.today = function(){ 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"."+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"."+ this.getFullYear() 
};
//For the time now
Date.prototype.timeNow = function(){
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};


/* ------------------------------------- ship movement simulation ------------------------------------- */
$(function() {
    Server = new FancyWebSocket('ws://localhost:9300');
    
    // maybe useful
     $('#stopSimulation').click(function() {                 
            Server.disconnect();
    });

    //Let the user know we're connected
    Server.bind('open', function() {
        //console.log( "Connected" );
    });

    //OH NO! Disconnection occurred.
    Server.bind('close', function() {
        //console.log( "Disconnected" );
    });

    //Log any messages sent from server
    Server.bind('message', function( message ) {
        //console.log("Received from server: " + message);
        if (message != "done") {
            UpdateShipMarkerPosition( message );
        } else {
            trackingFinished();
        }
    });

    Server.connect();
});

function UpdateShipMarkerPosition( message ) {
    if (!isNaN(message.split(" ")[0]) && !isNaN(message.split(" ")[1])) {
        latLng = message.split(" ");

        currentPosition = new google.maps.LatLng(latLng[0], latLng[1]);
        var nextMarkerOptions = {
            position: currentPosition,
            map: map,
            icon: currentPositionMarkerImage
        }
        currentPositionMarker.setVisible(false);
        currentPositionMarker = new google.maps.Marker(nextMarkerOptions);

        // Count here to a value and than make a new trackingPoint
        if(trCount < 100) {
            trCount++;            
        } else {
            trCount = 0;
            addTrackingPoint(currentPosition.lat(), currentPosition.lng());
        }
        if (getSessionOption("wl_followPosition").active) {
            map.panTo(currentPosition);
        }
    }
}

function SendRequest( message ) {
    Server.send( 'message', message );
}

$('#startTrackingButton').live("click", function(event) {
	event.preventDefault();
    ResetCounter();
    
    //check if the route, which should be tracked is saved to the database
    if (null == session.map.routes[activeRouteInSession].tnr) {
        $('#dialogTitle').text('Error');
        $('#dialogMessage').text("You should save your route before you start tracking.");
        $('#messageBox').modal('show'); 
        return;
    }
    //disable map interaction
    disableMap();
    //the track is already in the map, display info message
    displayMessageBox("infoMessageBox", "Tracking starts now. Context menus are temporary disabled.", "28em", "-14em");
    activeRoute = session.map.routes[activeRouteInSession];
    //get start time of tracking
    startOfTrackingTime = new Date().getTime() / 1000;
    //start tracking now
    startNewTracking();

    SendRequest(JSON.stringify(activeRoute.marker));    
});