function startTracking() {

} 


function startNewTracking(position, data) {    
    addTrackingPoint(position, data);
}


function addTrackingPoint(position, data) {

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
    }
}

function SendRequest( message ) {
    Server.send( 'message', message );
}

$('#startTrackingButton').live("click", function(event) {

    /*activeRoute = session.map.routes[activeRouteInSession];
    
    startNewRoute(new google.maps.LatLng(activeRoute.marker[0].lat, activeRoute.marker[0].lng), MODE.TRACKING, activeRoute.title);
    session.map.routes[activeRouteInSession].marker[0].marker = "Marker "+(i+1);
    session.map.routes[activeRouteInSession].marker[0].wdate = new Date().today();
    session.map.routes[activeRouteInSession].marker[0].wtime = new Date().timeNow();
    //weather info boat info usw
    //....
    
    
    for (var i = 1; i < activeRoute.marker.length; i++) {
        addRouteMarker(new google.maps.LatLng(activeRoute.marker[i].lat, activeRoute.marker[i].lng), null);
        //set attributes like weather usw
        session.map.routes[activeRouteInSession].marker[i].marker = "Marker "+(i+1);
        session.map.routes[activeRouteInSession].marker[i].wdate = new Date().today();
        session.map.routes[activeRouteInSession].marker[i].wtime = new Date().timeNow();
        //weather info boat info usw
        //....
    }*/
    activeRoute = session.map.routes[activeRouteInSession].marker;
    SendRequest(JSON.stringify(activeRoute));    
});