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

var activeRoute = null;
var animatedRoute = null;

$('#startTrackingButton').live("click", function(event) {
    //Comented out to show example on how to use tracking functionality
    //PlayRoute();
    


    activeRoute = session.map.routes[activeRouteInSession];
    
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
    }
});

/* animates the ship following the route */
function PlayRoute() {   
	CalculateRouteSteps(); 
    PlayNextMarker();
}

/* Rekrusive funktion animating the next step on the route of the little ship */
function PlayNextMarker (i) {
    if (i == undefined) {
        i = 0;
    }
    if (i < animatedRoute.length) {
        SetNextMarker(animatedRoute[i].lat(), animatedRoute[i].lng());
        i++;
        var timeout = window.setTimeout("PlayNextMarker(" + i + ")", 50);
    }
}

/* Displays the next ship image and hides the prvious one */
function SetNextMarker(lat, lng) {
    currentPosition = new google.maps.LatLng(lat, lng);
    var nextMarkerOptions = {
        position: currentPosition,
        map: map,
        icon: currentPositionMarkerImage
    }
    currentPositionMarker.setVisible(false);
    currentPositionMarker = new google.maps.Marker(nextMarkerOptions);
}

/* Calculates all the steps the little ship has to pass on an route */
function CalculateRouteSteps() {
	animatedRoute = new Array();
	var targetLength = 0;
	for(var i = 0; i < activeRoute.length; i++) {		
    	if (i < activeRoute.length - 1) {
	    	var actPosition = new google.maps.LatLng(activeRoute[i].lat, activeRoute[i].lng);
	    	var nextPosition = new google.maps.LatLng(activeRoute[i + 1].lat, activeRoute[i + 1].lng);
	    	var distance = getDistance(actPosition, nextPosition);
	    	var steps = distance % 500;
	    	CalculateRouteStepsBetweenMarkers(actPosition, nextPosition, steps);
    	}
	}
}

/* Calculates all the steps between two route markers the little ship has to pas */
function CalculateRouteStepsBetweenMarkers(startMarker, nextMarker, steps) {
	var distance = getDistance(nextMarker, startMarker);
	var diffLat = (nextMarker.lat() - startMarker.lat()) / steps;
	var diffLng = (nextMarker.lng() - startMarker.lng()) / steps;
	var tmpLat = startMarker.lat();
	var tmpLng = startMarker.lng();
	for(var i = 0; i < steps; i++) {
		animatedRoute.push(new google.maps.LatLng(tmpLat += diffLat, tmpLng += diffLng));
	}
}