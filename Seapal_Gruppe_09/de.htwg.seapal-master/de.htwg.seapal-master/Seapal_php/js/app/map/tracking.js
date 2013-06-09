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
    addRouteMarker(new google.maps.LatLng(lat, lng), null);
    session.map.routes[activeRouteInSession].marker[actCount].marker = "Marker "+(actCount+1);
    session.map.routes[activeRouteInSession].marker[actCount].wdate = new Date().today();
    session.map.routes[activeRouteInSession].marker[actCount].wtime = new Date().timeNow();
    actCount++;
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
        //currentPositionMarker.setPosition(new google.maps.LatLng(latLng[0], latLng[1])); //Maybe use this function, but it causes map view not movable while tracking

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

function GatherData() {

}
