function startTracking() {
    event.preventDefault();
} 


function startNewTracking() {    
    startNewRoute(new google.maps.LatLng(activeRoute[0].lat, activeRoute[0].lng), MODE.TRACKING, activeRoute.title);
    session.map.routes[activeRouteInSession].marker[0].marker = "Marker 1";
    session.map.routes[activeRouteInSession].marker[0].wdate = new Date().today();
    session.map.routes[activeRouteInSession].marker[0].wtime = new Date().timeNow();
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
            addRouteMarker(new google.maps.LatLng(lat, lng), null);
            session.map.routes[activeRouteInSession].marker[actCount].marker = "Marker " + (actCount + 1);
            session.map.routes[activeRouteInSession].marker[actCount].wdate = new Date().today();
            session.map.routes[activeRouteInSession].marker[actCount].wtime = new Date().timeNow();
            session.map.routes[activeRouteInSession].marker[actCount].windstaerke = "Wind speed: " + data.list[0].wind.speed + " m/s";
            session.map.routes[activeRouteInSession].marker[actCount].windrichtung = "Wind direct.: " + data.list[0].wind.deg + " °";
            session.map.routes[activeRouteInSession].marker[actCount].luftdruck = "Airpressure: " + data.list[0].main.pressure + " hPa";
            session.map.routes[activeRouteInSession].marker[actCount].temperatur = "Temperature: " + convertToCelcius(data.list[0].main.temp) + " °C";
            session.map.routes[activeRouteInSession].marker[actCount].wolken = "Clouds: " + data.list[0].weather[0].main;
            session.map.routes[activeRouteInSession].marker[actCount].btm = "Bearing to Marker: 192 °";
            session.map.routes[activeRouteInSession].marker[actCount].dtm = "Destination to Marker: 120 m";
            session.map.routes[activeRouteInSession].marker[actCount].sog = "Speed over ground: 5 knts";
            session.map.routes[activeRouteInSession].marker[actCount].cog = "Course over ground: 253°";
            session.map.routes[activeRouteInSession].marker[actCount].manoever = "Manoeuver: none";
            session.map.routes[activeRouteInSession].marker[actCount].vorsegel = "Head sail: spin";
            session.map.routes[activeRouteInSession].marker[actCount].motor = "No Motor used";
            session.map.routes[activeRouteInSession].marker[actCount].tank = "73 %";
            actCount++;
        }
    });    
}

//save a route from the map to the database
function saveTrackingRoute() {
    console.log("Saving");    
    if (js_loggedin != true) {
        $('#dialogTitle').text('Access denied');
        $('#dialogMessage').text("To use this functionality you have to be signed in.");
        $('#messageBox').modal('show');
    } else {
        //save the zoom level, at which the user looked at this route.
        session.map.routes[activeRouteInSession].lastZoom = map.getZoom();
        jQuery.post("app_trackinginfo_insert.php", session.map.routes[activeRouteInSession], function(data) { 
            if (data['tracknr'].match(/Error/)) {                
                $('#dialogTitle').text('Error');
                $('#dialogMessage').text(data['tracknr'].replace(/Error: /, ""));
                $('#messageBox').modal('show');
            } else {
                activeRouteMarkerInSession = 0;
                session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession].tnr = data['tracknr'];
                //rekursive call to insert all markers of the route to the database
                jQuery.post("app_tracking_point_insert.php", session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession], tripRoutePost, "json");
            }                
        }, "json");
    }
}

//rekursive function to save all markers of one route. This function calls itself for each marker.
function tripRoutePost(data) { 
    if (data['trackpointnr'].match(/Error/)) {
        $('#dialogTitle').text('Error');
        $('#dialogMessage').text(data['trackpointnr'].replace(/Error: /, ""));
        $('#messageBox').modal('show');
    } else {
        activeRouteMarkerInSession++;
        if (activeRouteMarkerInSession < session.map.routes[activeRouteInSession].marker.length)
        {
            session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession].wnr = session.map.routes[activeRouteInSession].marker[0].tracknr;
            jQuery.post("app_tracking_point_insert.php", session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession], tripRoutePost, "json");
        } else {
            $('#dialogTitle').text('Success');
            $('#dialogMessage').text("Eintrag wurde erfolgreich gespeichert.");
            $('#messageBox').modal('show');
        }
    }
}

//For todays date;
Date.prototype.today = function(){ 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"."+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"."+ this.getFullYear() 
};
//For the time now
Date.prototype.timeNow = function(){
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

var actCount = 1;
var trCount = 0;
var activeRoute = null;
var activeRouteMarkerInSession = 0;

/* ------------------------------------- ship movement simulation ------------------------------------- */
$(function() {
    console.log('Connecting...');
    Server = new FancyWebSocket('ws://localhost:9300');
    
    // maybe useful
     $('#stopSimulation').click(function() {                 
            Server.disconnect();
    });

    //Let the user know we're connected
    Server.bind('open', function() {
        console.log( "Connected" );
    });

    //OH NO! Disconnection occurred.
    Server.bind('close', function() {
        console.log( "Disconnected" );
    });

    //Log any messages sent from server
    Server.bind('message', function( message ) {
        UpdateShipMarkerPosition( message );        
    });

    Server.connect();
});

var Server;

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
    }
}

function SendRequest( message ) {
    Server.send( 'message', message );
}

$('#startTrackingButton').live("click", function(event) {
    ResetCounter();
    activeRoute = session.map.routes[activeRouteInSession].marker;
    startNewTracking(activeRoute[0].lat, activeRoute[0].lng);

    SendRequest(JSON.stringify(activeRoute));    
});

function ResetCounter() {
    actCount = 1;
    trCount = 0;
}

function convertToCelcius(kelvin) {
    return (Math.round((kelvin - 273) * 100) / 100);
}
