var routeCount = 0;
var routeArray = new Array();
var currentRoute = null;
var destinationRoute = null;
var destinationMarker = null;
var draggedMarkerIndex = null;
var selectedRouteMarker = null;
var geocoder = new google.maps.Geocoder();;
//variable to set the actual active route and marker in the session
var activeRouteInSession;
var activeRouteMarkerInSession;

var activePathOptions = {
    strokeColor: "#427F94",
    strokeOpacity: 1.0,
    strokeWeight: 3
}

var inactivePathOptions = {
    strokeColor: "#427F94",
    strokeOpacity: 0.5,
    strokeWeight: 2
}

var distanceToolOptions = {
    strokeColor: "#FDB771",
    strokeOpacity: 0.7,
    strokeWeight: 3
}

function Route(route, routeName) {
    this.route = route;
    this.markerArray = new Array();
    this.length = 0;
    
    routeCount++;
    if (routeName == null) {
        this.name = "Route " + routeCount;
    } else {
        this.name = routeName;
    }
    this.markerInfobox = null;
}


// route context menu ------------------------------------------------ //
$(function () {
    $.contextMenu({
        selector: '#routeContextMenu_active',
        callback: function (key) {
            if (key == "deleteMarker") {
                deleteRouteMarker();
            } else if (key == "addMarker") {
                var position = selectedRouteMarker.position;
                var index;
                for (var i = currentRoute.markerArray.length; i > 0; i--) {
                    if (currentRoute.markerArray[i - 1].position == position) {
                        index = i;
                        break;
                    }
                }
                addRouteMarker(position, index);
            }
        },
        items: {
            "deleteMarker": { name: "Wegpunkt l&ouml;schen", icon: "deleteMarker" },
            "addMarker": { name: "Wegpunkt hinzuf&uuml;gen", icon: "addMarker" }
        }
    });
});

$(function () {
    $.contextMenu({
        selector: '#routeContextMenu_inactive',
        callback: function (key) {
            if (key == "selectRoute") {
                if (currentRoute != null) {
                    toggleDraggable(currentRoute);
                    currentRoute.route.setOptions(inactivePathOptions);
                }
                if (currentMode == MODE.DISTANCE) {
                    stopDistanceToolMode();
                }
                currentRoute = getRouteByMarker(selectedRouteMarker);
                currentMode = MODE.ROUTE;
                currentRoute.route.setOptions(activePathOptions);
                toggleDraggable(currentRoute);
                updateRouteDistance();
                document.getElementById('routeMenuContainer').style.display = "block";
                //load the trip info from the session to the input boxes.
                for (var i in TRIP_INFO) {
                    document.getElementById(TRIP_INFO[i]).value = session.map.routes[activeRouteInSession][TRIP_INFO[i]];
                }
            }
        },
        items: {
            "selectRoute": { name: "Diese Route ausw&auml;hlen", icon: "selectRoute" }
        }
    });
});

function addRouteMarker(position, index) {
    var path = currentRoute.route.getPath();

    var marker;
    
    if (currentMode == MODE.ROUTE) {
        marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: routeMarkerImage,
        draggable: true
        });
    } else {
        marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: distanceMarkerImage,
        draggable: true
        });
    }
      

    google.maps.event.addListener(marker, 'click', function (event) {
        selectedRouteMarker = getRouteMarker(event.latLng);
        var pixel = fromLatLngToPixel(event.latLng);
        if (getRouteByMarker(selectedRouteMarker) == currentRoute) {
            $('#routeContextMenu_active').contextMenu({ x: pixel.x, y: pixel.y });
        } else {
            $('#routeContextMenu_inactive').contextMenu({ x: pixel.x, y: pixel.y });
        }
    });

    google.maps.event.addListener(marker, 'dragstart', function (event) {
        selectedRouteMarker = getRouteMarker(event.latLng);
        var path = currentRoute.route.getPath();
        path.forEach(function (item, index) {
            if (path.getAt(index) == selectedRouteMarker.position) {
                draggedMarkerIndex = index;
            }
        });
    });

    google.maps.event.addListener(marker, 'drag', function (event) {
        var path = currentRoute.route.getPath();
        path.removeAt(draggedMarkerIndex);
        path.insertAt(draggedMarkerIndex, selectedRouteMarker.position);
        session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession].lat = selectedRouteMarker.position.lat();
        session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession].lng = selectedRouteMarker.position.lng();
        updateRouteDistance();
        
        if (currentRoute.markerArray.indexOf(selectedRouteMarker) == 0) {
        
        	if (currentMode == MODE.ROUTE) {
	        	currentRoute.markerInfobox = drawRouteInfobox(marker.position, currentRoute.name);

        	} else {
	        	currentRoute.markerInfobox = drawDistanceInfobox(marker.position);
        	}
        }
    });
    
    google.maps.event.addListener(marker, 'dragend', function (event) {
        updateRouteMenuEntries();
    });

    marker.setMap(map);

    if (index == null) {
        path.push(position);
        currentRoute.markerArray.push(marker);
        //add marker to session if not on initialization and route mode is on
        if (!onInitialize && MODE.ROUTE == currentMode) {
            var newDate = new Date();
            newMarker = getNewRouteMarker()
            newMarker.name = "Marker "+(session.map.routes[activeRouteInSession].marker.length+1)
            newMarker.lat = position.lat();
            newMarker.lng = position.lng();
            newMarker.wdate = newDate.today();
            newMarker.wtime = newDate.timeNow();
            session.map.routes[activeRouteInSession].marker.push(newMarker);
        }
    } else {
        if (index == currentRoute.markerArray.length) {
            index--;
        }

        var coords1, coords2;
        if (currentRoute.markerArray.length > 1) {
            coords1 = currentRoute.markerArray[index - 1].getPosition();
        } else {
            coords1 = currentRoute.markerArray[index].getPosition();
        }
        coords2 = currentRoute.markerArray[index].getPosition();

        var newPosition = new google.maps.LatLng((coords1.lat() + coords2.lat()) / 2, (coords1.lng() + coords2.lng()) / 2);

        path.insertAt(index, newPosition);
        marker.setPosition(newPosition);
        currentRoute.markerArray.splice(index, 0, marker);
        //add marker to session if not on initialization and route mode is on
        if (!onInitialize && MODE.ROUTE == currentMode) {
            newMarker = getNewRouteMarker();
            newMarker.lat = newPosition.lat();
            newMarker.lng = newPosition.lng();
            session.map.routes[activeRouteInSession].marker.splice(index, 0, newMarker);
        }
    }
    updateRouteMenuEntries();
    updateRouteDistance();
}

//For todays date;
Date.prototype.today = function(){ 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear() 
};
//For the time now
Date.prototype.timeNow = function(){
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

// removes selected route marker
function deleteRouteMarker() {
    //delete the marker from the session
    session.map.routes[activeRouteInSession].marker.splice(activeRouteMarkerInSession, 1);
    if (0 == session.map.routes[activeRouteInSession].marker.length) {
        session.map.routes.splice(activeRouteInSession, 1);
    }
    selectedRouteMarker.setMap(null);
    
    var index = currentRoute.markerArray.indexOf(selectedRouteMarker);
    
    currentRoute.markerArray.splice(currentRoute.markerArray.indexOf(selectedRouteMarker), 1);
    var path = currentRoute.route.getPath();
    path.forEach(function (item, index) {
        if (path.getAt(index) == selectedRouteMarker.position) {
            path.removeAt(index);
        }
    });
    
    if (index == 0) {
    
    	 if (currentMode == MODE.ROUTE || currentMode == MODE.DISTANCE ) {
    	 	
    	 	if (currentRoute.markerArray.length == 0) {
    	 	
	    	 	currentRoute.markerInfobox.setMap(null);
	    	 	stopRouteMode();
	    	 	return;
	    	 	
    	 	} else {
	    	 	currentRoute.markerInfobox = drawRouteInfobox(currentRoute.markerArray[index].position, currentRoute.name);
    	 	}
	    	 
	     } else {
		     currentRoute.markerInfobox = drawDistanceInfobox(currentRoute.markerArray[index].position);
		 }
    }
    updateRouteMenuEntries();
    updateRouteDistance();
}

function updateRouteDistance() {

    currentRoute.length = 0;

    for (var i = 0; i < currentRoute.markerArray.length - 1; i++) {
        currentRoute.length += getDistance(currentRoute.markerArray[i].position, currentRoute.markerArray[i + 1].position);
    }

    if (currentMode == MODE.DISTANCE) {
        document.getElementById("distanceTool_number").innerHTML = currentRoute.length;
    } else {
        document.getElementById("route_distance_number").innerHTML = currentRoute.length;
    }
}

//function to update "von" und "nach" of route by using geolocation
function updateRouteMenuEntries() {
    //Get near locations
    var startPosition = new google.maps.LatLng(session.map.routes[activeRouteInSession].marker[0].lat, session.map.routes[activeRouteInSession].marker[0].lng);
    var startPositionString = "";

    //get the start positon
    geocoder.geocode({'latLng': startPosition}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            startPositionString = getLocationString(results);
            if (startPositionString != "") {
                $('#von').val(startPositionString);
                session.map.routes[activeRouteInSession].von = startPositionString;
            }            
        }

        //if more than one marker is set, the city of the last marker should be searched
        if (session.map.routes[activeRouteInSession].marker.length > 1) {
            var stopPosition = new google.maps.LatLng(session.map.routes[activeRouteInSession].marker[session.map.routes[activeRouteInSession].marker.length-1].lat, session.map.routes[activeRouteInSession].marker[session.map.routes[activeRouteInSession].marker.length-1].lng);
            var stopPositionString = "";
            
            //get the stop position
            geocoder.geocode({'latLng': stopPosition}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    stopPositionString = getLocationString(results);
                    if (stopPositionString != "") {
                        $('#nach').val(stopPositionString);
                        session.map.routes[activeRouteInSession].nach = stopPositionString;
                    }
                }
            });
        }
    });
}

// draw fixedMarkerInfobox 
function drawRouteInfobox(latLng, name) {

    if (currentRoute.markerInfobox != null) {
        currentRoute.markerInfobox.setMap(null);
    }

    customTxt = "<div class='markerInfoBox label label-info' id='fixedMarkerInfobox'>"
     + name + "</div>";
    return new TxtOverlay(latLng, customTxt, "coordinate_info_box", map, 40, -29);
}

// draw fixedMarkerInfobox
function drawDistanceInfobox(latLng) {

    if (currentRoute.markerInfobox != null) {
        currentRoute.markerInfobox.setMap(null);
    }

    customTxt = "<div class='markerInfoBox label label-warning' id='fixedMarkerInfobox'>Distance</div>";
    return new TxtOverlay(latLng, customTxt, "coordinate_info_box", map, 40, -29);
}

function startNewRoute(position, isDistanceToolRoute, routeName) {
    var route;
    
    if (isDistanceToolRoute) {
        route = new google.maps.Polyline(distanceToolOptions);
        if (!onInitialize) {document.getElementById('distanceToolContainer').style.display = "block";}
        currentMode = MODE.DISTANCE;
    } else {
        route = new google.maps.Polyline(activePathOptions);
        if (!onInitialize) {document.getElementById('routeMenuContainer').style.display = "block";}
        currentMode = MODE.ROUTE;
    }
    
    //check if not in initialization
    if (!onInitialize && MODE.ROUTE == currentMode) {
        //add a new route to the session
        session.map.routes.push(getNewRoute());
        //set the active route for the session access
        activeRouteInSession = session.map.routes.length - 1;
    }
    
    // delete temp marker & infobox
    if (temporaryMarker != null) { temporaryMarker.setMap(null); }
    if (temporaryMarkerInfobox != null) { temporaryMarkerInfobox.setMap(null); }
    
    // initialize new route
    currentRoute = new Route(route, routeName);
    route.setMap(map);
    
    if (!isDistanceToolRoute) {
        currentRoute.markerInfobox = drawRouteInfobox(position, currentRoute.name);
    } else {
	    currentRoute.markerInfobox = drawDistanceInfobox(position);
    }
    
    routeArray.push(currentRoute);
    addRouteMarker(position);
}

function stopRouteMode() {
   
    //Commented this section out. Because set marker is than still there but no longer accessible.
    //It should be ok to have a route with only one marker, but it should not be possible to save this route
    //(will be handled in saveRoute() function.
  //  if (currentRoute.markerArray.length == 1 && currentMode == MODE.ROUTE) {
  //      currentRoute.markerArray[0].setMap(null);
  //  } else { 
        currentRoute.route.setOptions(inactivePathOptions);
        toggleDraggable(currentRoute);  
 //   }
    
    currentRoute = null;
    currentMode = MODE.DEFAULT;
    saveRouteInfoToSession();
    document.getElementById('routeMenuContainer').style.display = "none";
    document.getElementById('distanceToolContainer').style.display = "none";

    //load the default to the trip info box
    for (var i in TRIP_INFO) {
        document.getElementById(TRIP_INFO[i]).value = "";
    }
}

function startNewNavigation(start, destination) {
	
	document.getElementById('navigationContainer').style.display = "block";
    currentMode = MODE.NAVIGATION;
	
	// delete temp marker & infobox
    if (temporaryMarker != null) { temporaryMarker.setMap(null); }
    if (temporaryMarkerInfobox != null) { temporaryMarkerInfobox.setMap(null); }
    
    var pathCoordinates = [start, destination];
    
    destinationRoute = new google.maps.Polyline({
	    path: pathCoordinates,
	    strokeColor: "#27F646",
	    strokeOpacity: 0.7,
	    strokeWeight: 3
    });
    
    destinationMarker = new google.maps.Marker({
        position: destination,
        map: map,
        icon: destinationMarkerImage,
        draggable: true
    });
    
    google.maps.event.addListener(destinationMarker, 'drag', function (event) {
        
        updateNavigation(currentPositionMarker.position, destinationMarker.position);
        
    });
    
    updateNavigationDistance(currentPositionMarker.position, destinationMarker.position);
    
    destinationMarker.setMap(map);
    destinationRoute.setMap(map);
  
}

function updateNavigation(start, destination) {

    destinationRoute.setMap(null);
        
    updateNavigationDistance(start, destination);
        
    var pathCoordinates = [start, destination];
    
    destinationRoute = new google.maps.Polyline({
        path: pathCoordinates,
        strokeColor: "#27F646",
        strokeOpacity: 0.7,
        strokeWeight: 3
    });
	    
    destinationRoute.setMap(map);
}

function updateDestinationMarker(newPosition) {

    destinationMarker.setPosition(newPosition);
 
}

function updateNavigationDistance(start, destination) {
	
	var distance = 0;

    distance = getDistance(start, destination);
   
    document.getElementById("navigation_number").innerHTML = distance;
}

function stopNavigationMode() {
	currentMode = MODE.DEFAULT;
	destinationMarker.setMap(null);
    destinationRoute.setMap(null);
    navigationRoute = null;
    document.getElementById('navigationContainer').style.display = "none";
}

function stopDistanceToolMode() {
    deleteRoute();
}

function deleteRoute() {
    //delete the route from the session
    session.map.routes.splice(activeRouteInSession, 1);
    currentRoute.route.setMap(null);
    currentRoute.markerInfobox.setMap(null);

    for (var i = 0; i < currentRoute.markerArray.length; i++) {
        currentRoute.markerArray[i].setMap(null);
    }
    routeArray.splice(routeArray.indexOf(currentRoute), 1);
    stopRouteMode();
}

//save the route info from the route-menu to the cookie-less session.
function saveRouteInfoToSession() {
    //save only if not in initialise mode
    if (!onInitialize && session.map.routes.length > 0) {
        //store the trip info to the session from the input boxes.
        for (var i in TRIP_INFO) {
            session.map.routes[activeRouteInSession][TRIP_INFO[i]] = document.getElementById(TRIP_INFO[i]).value;
        }
    }
}

//save a route from the map to the database
function saveRoute() {
    saveRouteInfoToSession();
    var route_name = $('#route_name').val();
    
    if (js_loggedin != true) {
        $('#dialogTitle').text('Access denied');
        $('#dialogMessage').text("To use this functionality you have to be signed in.");
        $('#messageBox').modal('show');
    } 
    //Check if a route name was insert
    else if ("" == route_name) {
        $('#dialogTitle').text('Error');
        $('#dialogMessage').text("Geben Sie den Namen der Route an.");
        $('#messageBox').modal('show');
    }
    //check if enough markers are set
    else if (session.map.routes[activeRouteInSession].marker.length <= 1) {
        $('#dialogTitle').text('Error');
        $('#dialogMessage').text("Eine Route muss mindestens 2 Marker besitzen.");
        $('#messageBox').modal('show');
    } else {
        //save the zoom level, at which the user looked at this route.
        session.map.routes[activeRouteInSession].lastZoom = map.getZoom();
        //TODO delete temporary satement
        session.map.routes[activeRouteInSession].tank = true;
        jQuery.post("app_trip_insert.php", session.map.routes[activeRouteInSession], function(data) { 
            if (data['tnr'].match(/Error/)) {                
                $('#dialogTitle').text('Error');
                $('#dialogMessage').text(data['tnr'].replace(/Error: /, ""));
                $('#messageBox').modal('show');
            } else {
                activeRouteMarkerInSession = 0;
                session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession].tnr = data['tnr'];
                //rekursive call to insert all markers of the route to the database
                jQuery.post("app_tripinfo_insert.php", session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession], tripRoutePost, "json");
            }                
        }, "json");
    }
}
    
//rekursive function to save all markers of one route. This function calls itself for each marker.
function tripRoutePost(data) { 
    if (data['wnr'].match(/Error/)) {
        $('#dialogTitle').text('Error');
        $('#dialogMessage').text(data['wnr'].replace(/Error: /, ""));
        $('#messageBox').modal('show');
    } else {
        activeRouteMarkerInSession++;
        if (activeRouteMarkerInSession < session.map.routes[activeRouteInSession].marker.length)
        {
            console.log(activeRouteMarkerInSession);
            session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession].tnr = session.map.routes[activeRouteInSession].marker[0].tnr;
            jQuery.post("app_tripinfo_insert.php", session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession], tripRoutePost, "json");
        } else {
            $('#dialogTitle').text('Success');
            $('#dialogMessage').text("Eintrag wurde erfolgreich gespeichert.");
            $('#messageBox').modal('show');
        }
    }
}

//parse relevant info from a geo location request result.
function getLocationString(location) {
    var locationString = "";
    locationString += parseLocation(location, "locality");
    if (locationString != "") {
        locationString += " ("
        locationString += parseLocation(location, "country");
        locationString += ")"
    } else {
        locationString += parseLocation(location, "country");
    }
    return locationString;
}

function parseLocation(location, type) {
    // iterate through the results to the city
    for (var i in location[0].address_components) {
        if (location[0].address_components[i].types[0] == type) {
            return location[0].address_components[i].long_name;
        }
    }
    return "";
}

function toggleDraggable(route) {

    for (var i = 0; i < route.markerArray.length; i++) {
        route.markerArray[i].setDraggable(!route.markerArray[i].getDraggable());
    }
}

function getRouteMarker(latLng) {

    for (var i = 0; i < routeArray.length; i++) {
        for (var j = 0; j < routeArray[i].markerArray.length; j++) {
            if (routeArray[i].markerArray[j].position == latLng) {
                activeRouteMarkerInSession = j;
                return routeArray[i].markerArray[j];
            }
        }
    }
    return null;
}

function getRouteByMarker(marker) {

    for (var i = 0; i < routeArray.length; i++) {
        for (var j = 0; j < routeArray[i].markerArray.length; j++) {
            if (routeArray[i].markerArray[j] == marker) {
                activeRouteInSession = i;
                return routeArray[i];
            }
        }
    }
    return null;
}

/*function to get info of a trip from the html to the cookie-less session variable*/
$(document).ready(function() {
    /* Check for on change event for one of the trip info input boxes*/
    $('.routeInfoInput').change(function(e) {
        console.log("hier");
        session.map.routes[activeRouteInSession][this.id] = this.value;
        return false;
    });
});