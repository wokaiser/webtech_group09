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
//define for default state of active route marker
const INACTIVE = -1;

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

var activeTrackPathOptions = {
    strokeColor: "#00B050",
    strokeOpacity: 1.0,
    strokeWeight: 1
}

var inactiveTrackPathOptions = {
    strokeColor: "#D9FF9E",
    strokeOpacity: 0.5,
    strokeWeight: 0.5
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

    if (routeName == null || routeName == "") {
        this.name = "Untitled route";
    } else {
        this.name = routeName;
    }
    this.markerInfobox = null;
}


// route context menu ------------------------------------------------ //
$(function () {
    function deleteMarkerCallback (key) {
        //return on active tracking, to avoid route manipulation
        if (!mapEnabled()) {return};    
        if (currentMode == MODE.ROUTE) {
            //set tnr back, because this map changed and is than not in the database saved
            session.map.routes[activeRouteInSession].tnr = null;
        }
        deleteRouteMarker();
    }
    
    function addMarkerCallback (key) {
        //return on active tracking, to avoid route manipulation
        if (!mapEnabled()) {return};    
        if (currentMode == MODE.ROUTE) {
            //set tnr back, because this map changed and is than not in the database saved
            session.map.routes[activeRouteInSession].tnr = null;
        }
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
    
    $.contextMenu({
        selector: MODE.ROUTE.activeContextMenu,
        build: function($trigger, e) {
            // this callback is executed every time the menu is to be shown
            // its results are destroyed every time the menu is hidden
            // e is the original contextmenu event, containing e.pageX and e.pageY (amongst other data)
            return {
                items: {
                    title           : {name: "<b>Marker "+(activeRouteMarkerInSession+1)+"</b>",  icon: "marker"},
                    separator1: "-----",
                    "deleteMarker"  : { name : "Delete waypoint", icon: "deleteMarker", callback: deleteMarkerCallback},
                    "addMarker"     : { name : "Add waypoint", icon: "addMarker", callback: addMarkerCallback},
                }
            };
        }
    });
});

// track context menu ------------------------------------------------ //
$(function () {    
    $.contextMenu({
        selector: MODE.TRACKING.activeContextMenu, 
        build: function($trigger, e) {
            // this callback is executed every time the menu is to be shown
            // its results are destroyed every time the menu is hidden
            // e is the original contextmenu event, containing e.pageX and e.pageY (amongst other data)
            return {
                items: {
                    title           : {name: "<b>Trackpoint "+(activeRouteMarkerInSession+1)+"</b>",  icon: "marker"},
                    separator1: "-----",
                    wdate           : {name: session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["wdate"]}, 
                    wtime           : {name: session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["wtime"]},                    
                    "fold1": {
                                "name": "<b>Boat info</b>", 
                                "items": {
                                    btm             : {name: "<b>BTM: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["btm"]}, 
                                    dtm             : {name: "<b>DTM: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["dtm"]}, 
                                    sog             : {name: "<b>SOG: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["sog"]},
                                    cog             : {name: "<b>COG: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["cog"]}, 
                                    manoever        : {name: "<b>Manoeuvre: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["manoever"]}, 
                                    vorsegel        : {name: "<b>For sale: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["vorsegel"]}, 
                                    motor           : {name: "<b>Engine: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["motor"]},
                                    tank            : {name: "<b>Tank: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["tank"]},
                                }
                    },
                    "fold2": {
                                "name": "<b>Weather info</b>", 
                                "items": {
                                    windstaerke     : {name: "<b>Wind: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["windstaerke"]},
                                    windrichtung    : {name: "<b>Direction: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["windrichtung"]}, 
                                    luftdruck       : {name: "<b>Air: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["luftdruck"]}, 
                                    temperatur      : {name: "<b>Temperatur: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["temperatur"]},
                                    wolken          : {name: "<b>Cloud: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["wolken"]},
                                    regen           : {name: "<b>Rain: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["regen"]},
                                    wellenhoehe     : {name: "<b>Wave height.: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["wellenhoehe"]},
                                    wellenrichtung  : {name: "<b>Wave direct: </b>"+session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession]["wellenrichtung"]}
                                  }
                    },
                }
            };
        }
    });
});


//context menu for inactive route
$(function () {
    $.contextMenu({
        selector: MODE.ROUTE.inactiveContextMenu,
        callback: function (key) {
            if (key == "selectRoute") {
                document.getElementById('routeMenuContainer').style.display = "none";
                document.getElementById('distanceToolContainer').style.display = "none";
                document.getElementById('navigationContainer').style.display = "none";
                document.getElementById('trackingMenuContainer').style.display = "none";
                if (currentRoute != null && currentMode == MODE.ROUTE) {
                    toggleDraggable(currentRoute);
                    currentRoute.route.setOptions(inactivePathOptions);
                } else if(currentRoute != null && currentMode == MODE.TRACKING) {
                    currentRoute.route.setOptions(inactiveTrackPathOptions);
                } else if(currentRoute != null && currentMode == MODE.NAVIGATION) {
                    currentRoute.route.setOptions(inactiveTrackPathOptions);
                }
                if (currentMode == MODE.DISTANCE) {
                    document.getElementById('distanceToolContainer').style.display = "block";
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
            "selectRoute": { name: "Select this route", icon: "selectRoute" }
        }
    });
});

//context menu for inactive track
$(function () {
    $.contextMenu({
        selector: MODE.TRACKING.inactiveContextMenu,
        callback: function (key) {
            if (key == "selectTrack") {
                document.getElementById('routeMenuContainer').style.display = "none";
                document.getElementById('distanceToolContainer').style.display = "none";
                document.getElementById('navigationContainer').style.display = "none";
                document.getElementById('trackingMenuContainer').style.display = "none";
                if (currentRoute != null && currentMode == MODE.ROUTE) {
                    currentRoute.route.setOptions(inactivePathOptions);
                } else if(currentRoute != null && currentMode == MODE.TRACKING) {
                    currentRoute.route.setOptions(inactiveTrackPathOptions);
                }
                currentRoute = getRouteByMarker(selectedRouteMarker);
                currentMode = MODE.TRACKING;
                currentRoute.route.setOptions(activeTrackPathOptions);
                updateRouteDistance();
                document.getElementById('trackingMenuContainer').style.display = "block";
                //load the trip info from the session to the input boxes.
                for (var i in TRACKING_INFO) {
                    document.getElementById(TRACKING_INFO[i]).value = session.map.routes[activeRouteInSession][TRACKING_INFO[i]];
                }
            }
        },
        items: {
            "selectTrack": { name: "Select this track", icon: "selectRoute" }
        }
    });
});

function addRouteMarker(position, index) {
    var path = currentRoute.route.getPath();

    var marker;
    
    if (!onInitialize && (currentMode == MODE.ROUTE || currentMode == MODE.TRACKING)) {
        //get the coordinates from the center of the map
        latLng = map.getCenter();
        session.map.routes[activeRouteInSession].lastLat = latLng.lat();
        session.map.routes[activeRouteInSession].lastLng = latLng.lng();
        //save the zoom level, at which the user looked at this route.
        session.map.routes[activeRouteInSession].lastZoom = map.getZoom();
    }
    
    if (currentMode == MODE.ROUTE) {
        marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: routeMarkerImage,
        draggable: true
        });
        //add the action listener
        google.maps.event.addListener(marker, 'click', function (event) {
            //return on active tracking, to avoid route manipulation
            if (!mapEnabled()) {return};            
            selectedRouteMarker = getRouteMarker(event.latLng);
            var pixel = fromLatLngToPixel(event.latLng);
            if (getRouteByMarker(selectedRouteMarker) == currentRoute) {
                $(MODE.ROUTE.activeContextMenu).contextMenu({ x: pixel.x, y: pixel.y });
            } else {
                $(MODE.ROUTE.inactiveContextMenu).contextMenu({ x: pixel.x, y: pixel.y });
            }
        });
    } else if (currentMode == MODE.DISTANCE) {
        marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: distanceMarkerImage,
        draggable: true
        });
        //add the action listener
        google.maps.event.addListener(marker, 'click', function (event) {
            //return on active tracking, to avoid route manipulation
            if (!mapEnabled()) {return}; 
            selectedRouteMarker = getRouteMarker(event.latLng);
            var pixel = fromLatLngToPixel(event.latLng);
            if (getRouteByMarker(selectedRouteMarker) == currentRoute) {
                $(MODE.DISTANCE.activeContextMenu).contextMenu({ x: pixel.x, y: pixel.y });
            } else {
                $(MODE.DISTANCE.inactiveContextMenu).contextMenu({ x: pixel.x, y: pixel.y });
            }
        });
    } else if (currentMode == MODE.TRACKING) {
        marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: trackingMarkerImage,
        draggable: false
        });
        //add the action listener
        google.maps.event.addListener(marker, 'click', function (event) {
            //return on active tracking, to avoid route manipulation
            if (!mapEnabled()) {return}; 
            selectedRouteMarker = getRouteMarker(event.latLng);
            var pixel = fromLatLngToPixel(event.latLng);
            if (getRouteByMarker(selectedRouteMarker) == currentRoute) {
                $(MODE.TRACKING.activeContextMenu).contextMenu({ x: pixel.x, y: pixel.y });
            } else {
                $(MODE.TRACKING.inactiveContextMenu).contextMenu({ x: pixel.x, y: pixel.y });
            }
        });
    } 

    if (currentMode != MODE.TRACKING) {
        google.maps.event.addListener(marker, 'dragstart', function (event) {
            //return on active tracking, to avoid route manipulation
            if (!mapEnabled()) {return}; 
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
            if (currentMode == MODE.ROUTE) {
                session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession].lat = selectedRouteMarker.position.lat();
                session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession].lng = selectedRouteMarker.position.lng();
            }
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
            if (currentMode == MODE.ROUTE) {
                //set tnr back, because this map changed and is than not in the database saved
                session.map.routes[activeRouteInSession].tnr = null;
            }
            updateRouteMenuEntries();
        });
    }
    marker.setMap(map);

    if (index == null) {
        path.push(position);
        currentRoute.markerArray.push(marker);
        //add marker to session if not on initialization and route mode is on
        if (!onInitialize && MODE.ROUTE == currentMode) {
            newMarker = getNewRouteMarker()
            newMarker.name = "Marker "+(session.map.routes[activeRouteInSession].marker.length+1)
            newMarker.lat = position.lat();
            newMarker.lng = position.lng();
            session.map.routes[activeRouteInSession].marker.push(newMarker);
        } else if (!onInitialize && MODE.TRACKING == currentMode) {
            newMarker = getNewTrackPoint()
            newMarker.lat = position.lat();
            newMarker.lng = position.lng();
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
            newMarker = getNewRouteMarker()
            newMarker.name = "Marker "+(session.map.routes[activeRouteInSession].marker.length+1)
            newMarker.lat = position.lat();
            newMarker.lng = position.lng();
            session.map.routes[activeRouteInSession].marker.splice(index, 0, newMarker);
        } else if (!onInitialize && MODE.TRACKING == currentMode) {
            newMarker = getNewTrackPoint()
            newMarker.lat = position.lat();
            newMarker.lng = position.lng();
            session.map.routes[activeRouteInSession].marker.splice(index, 0, newMarker);
        }
    }
    if (!onInitialize) { updateRouteMenuEntries(); }
    updateRouteDistance();
}


// removes selected route marker
function deleteRouteMarker() {
    if (currentMode == MODE.ROUTE) {
        //delete the marker from the session
        session.map.routes[activeRouteInSession].marker.splice(activeRouteMarkerInSession, 1);
        //route changed, so set tnr back
        session.map.routes[activeRouteInSession].tnr = null;
        if (0 == session.map.routes[activeRouteInSession].marker.length) {
            session.map.routes.splice(activeRouteInSession, 1);
        }
    }
    //set the active route marker to inactive
    activeRouteMarkerInSession = INACTIVE;

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
    
    	 if (currentMode == MODE.ROUTE) {
    	 	
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
    } else if (currentMode == MODE.TRACKING) {
        document.getElementById("tracking_number").innerHTML = currentRoute.length;
    } else {
        document.getElementById("route_distance_number").innerHTML = currentRoute.length;
    }
}

//function to update "von" und "nach" of route by using geolocation
function updateRouteMenuEntries() {
    //update route menu entries just in route mode
    if (currentMode != MODE.ROUTE) return;

    //get the start positon
    geocoder.geocode({'latLng': new google.maps.LatLng(session.map.routes[activeRouteInSession].marker[0].lat, session.map.routes[activeRouteInSession].marker[0].lng)}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            startPositionString = getLocationString(results);
            if (startPositionString != "") {
                $('#von').val(startPositionString);
                session.map.routes[activeRouteInSession].von = startPositionString;
            }         
        }
    });
    
    //if more than one marker is set, the city of the last marker should be searched
    if (session.map.routes[activeRouteInSession].marker.length > 1) {
        //get the stop position
        geocoder.geocode({'latLng': new google.maps.LatLng(session.map.routes[activeRouteInSession].marker[session.map.routes[activeRouteInSession].marker.length-1].lat, session.map.routes[activeRouteInSession].marker[session.map.routes[activeRouteInSession].marker.length-1].lng)}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var stopPositionString = getLocationString(results);
                if (stopPositionString != "") {
                    $('#nach').val(stopPositionString);
                    session.map.routes[activeRouteInSession].nach = stopPositionString;
                }
            }
        });
    }
}

//draw trackingInfobox
function drawTrackingInfobox(latLng, name) {

    if (currentRoute.markerInfobox != null) {
        currentRoute.markerInfobox.setMap(null);
    }

    customTxt = "<div class='markerInfoBox label label-success' id='fixedMarkerInfobox'>"
     + name + "</div>";
    return new TxtOverlay(latLng, customTxt, "coordinate_info_box", map, 40, 0);
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

function startNewRoute(position, mode, routeName) {
    var route;

    if (!onInitialize && (MODE.TRACKING == currentMode || MODE.ROUTE == currentMode)) {
        //close the actual displayed route
        stopRouteMode();
    }

    if (MODE.DISTANCE == mode) {
        route = new google.maps.Polyline(distanceToolOptions);
        if (!onInitialize) {document.getElementById('distanceToolContainer').style.display = "block";}
        currentMode = MODE.DISTANCE;
    } else if (MODE.ROUTE == mode) {
        route = new google.maps.Polyline(activePathOptions);
        if (!onInitialize) {document.getElementById('routeMenuContainer').style.display = "block";}
        currentMode = MODE.ROUTE;
    } else if (MODE.TRACKING == mode) {
        route = new google.maps.Polyline(activeTrackPathOptions);
     //   if (!onInitialize) {document.getElementById('routeMenuContainer').style.display = "block";}
        currentMode = MODE.TRACKING;
    }
    
    //check if not in initialization
    if (!onInitialize && MODE.ROUTE == currentMode) {
        //add a new route to the session
        session.map.routes.push(getNewRoute());
        //set the active route for the session access
        activeRouteInSession = session.map.routes.length - 1;
    } else if (!onInitialize && MODE.TRACKING == currentMode) {
        //add a new route to the session
        session.map.routes.push(getNewTracking());
        //set the active route for the session access
        activeRouteInSession = session.map.routes.length - 1;
    }
    
    // delete temp marker & infobox
    if (temporaryMarker != null) { temporaryMarker.setMap(null); }
    if (temporaryMarkerInfobox != null) { temporaryMarkerInfobox.setMap(null); }
    
    // initialize new route
    currentRoute = new Route(route, routeName);
    route.setMap(map);

    if (MODE.DISTANCE == mode) {
	    currentRoute.markerInfobox = drawDistanceInfobox(position);
    } else if (MODE.ROUTE == mode) {
        currentRoute.markerInfobox = drawRouteInfobox(position, currentRoute.name);
    }  else if (MODE.TRACKING == mode) {
        currentRoute.markerInfobox = drawTrackingInfobox(position, currentRoute.name);
    }
    
    routeArray.push(currentRoute);
    addRouteMarker(position);
}

function stopRouteMode() {
    //toggle draggable NOT if in tracking mode
    if (currentMode == MODE.TRACKING) {
        currentRoute.route.setOptions(inactiveTrackPathOptions);
    }  
    else {
        currentRoute.route.setOptions(inactivePathOptions);
        toggleDraggable(currentRoute);  
    }

    currentRoute = null;
    currentMode = MODE.DEFAULT;
    saveRouteInfoToSession();
    document.getElementById('routeMenuContainer').style.display = "none";
    document.getElementById('distanceToolContainer').style.display = "none";
    document.getElementById('trackingMenuContainer').style.display = "none";

    //load the default to the trip info box
    for (var i in TRIP_INFO) {
        document.getElementById(TRIP_INFO[i]).value = "";
    }
    //load the default to the trip info box
    for (var i in TRACKING_INFO) {
        document.getElementById(TRACKING_INFO[i]).value = "";
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
    document.getElementById('navigationContainer').style.display = "none";
}

function stopTrackingMode() {
    stopRouteMode();
}

function deleteTrack() {
    deleteRoute();
}

function stopDistanceToolMode() {
    deleteRoute();
}

function deleteRoute() {
    //delete from session, only if we are NOT in DISTANCE mode
    if (MODE.ROUTE == currentMode || MODE.TRACKING == currentMode) {
        //delete the route from the session
        session.map.routes.splice(activeRouteInSession, 1);
    }
    //set the active route to inactive
    activeRouteInSession = INACTIVE;
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
    if (!onInitialize && session.map.routes.length > 0 && INACTIVE != activeRouteInSession) {
        //check which mode is active
        if (currentMode == MODE.ROUTE) {
            //store the trip info to the session from the input boxes.
            for (var i in TRIP_INFO) {
                session.map.routes[activeRouteInSession][TRIP_INFO[i]] = document.getElementById(TRIP_INFO[i]).value;
            }
            //set the correct marker names, because the markers will be created on the cklick of a marker
            for (var i in session.map.routes[activeRouteInSession].marker.length) {
                session.map.routes[activeRouteInSession].marker[i] = "Marker "+i+1;
            }
        } else if (currentMode == MODE.TRACKING) {
            //store the trip info to the session from the input boxes.
            for (var i in TRACKING_INFO) {
                session.map.routes[activeRouteInSession][TRACKING_INFO[i]] = document.getElementById(TRACKING_INFO[i]).value;
            }
        }
    }
}

//save a route from the map to the database
function saveRoute() {
    saveRouteInfoToSession();
    var route_name = $('#titel').val();
    
    if (js_loggedin != true) {
        $('#dialogTitle').text('Access denied');
        $('#dialogMessage').text("To use this functionality you have to be signed in.");
        $('#messageBox').modal('show');
    } 
    //Check if a route name was insert
    else if (("" == session.map.routes[activeRouteInSession].von)
           ||("" == session.map.routes[activeRouteInSession].nach)
           ||("" == session.map.routes[activeRouteInSession].titel)){
        $('#dialogTitle').text('Error');
        $('#dialogMessage').text("Please fill in all Route Menu entries.");
        $('#messageBox').modal('show');
    }
    //check if enough markers are set
    else if (session.map.routes[activeRouteInSession].marker.length <= 1) {
        $('#dialogTitle').text('Error');
        $('#dialogMessage').text("A route should have minimum two markers.");
        $('#messageBox').modal('show');
    } else {
        disableMap();
        //save the zoom level, at which the user looked at this route.
        session.map.routes[activeRouteInSession].lastZoom = map.getZoom();
        jQuery.post("/app_trip_insert.html", {
						"titel":session.map.routes[activeRouteInSession].titel,
						"von":session.map.routes[activeRouteInSession].von,
						"nach":session.map.routes[activeRouteInSession].nach,
						"lastZoom":session.map.routes[activeRouteInSession].lastZoom,
						"lastLat":session.map.routes[activeRouteInSession].lastLat,
						"lastLng":session.map.routes[activeRouteInSession].lastLng}, function(data) { 
            if (data['tnr'].match(/Error/)) {                
                $('#dialogTitle').text('Error');
                $('#dialogMessage').text(data['tnr'].replace(/Error: /, ""));
                $('#messageBox').modal('show');
                enableMap();
            } else {
                activeRouteMarkerInSession = 0;
                session.map.routes[activeRouteInSession].tnr = data['tnr'];
                session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession].tnr = data['tnr'];
                //rekursive call to insert all markers of the route to the database
                jQuery.post("/app_tripinfo_insert.html", session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession], tripRoutePost, "json");
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
        enableMap();
    } else {
        activeRouteMarkerInSession++;
        if (activeRouteMarkerInSession < session.map.routes[activeRouteInSession].marker.length)
        {
            session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession].tnr = session.map.routes[activeRouteInSession].marker[0].tnr;
            jQuery.post("/app_tripinfo_insert.html", session.map.routes[activeRouteInSession].marker[activeRouteMarkerInSession], tripRoutePost, "json");
        } else {
            $('#dialogTitle').text('Success');
            $('#dialogMessage').text("Eintrag wurde erfolgreich gespeichert.");
            $('#messageBox').modal('show');
            enableMap();
        }
    }
}

//parse relevant info from a geo location request result.
function getLocationString(location) {
    var locationString = "";
    locationString += parseLocation(location, "locality");
    if (locationString == "") { locationString += parseLocation(location, "postal_code"); }
    if (locationString == "") { locationString += parseLocation(location, "country"); }
    return locationString;
}

function parseLocation(location, type) {
    //iterate through all location objects
    for (var l in location) {
        for (var a in location[l].types) {
            if (location[l].types[a] == type) {
                return location[l].formatted_address;
            }
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
    $('.routeInfoInput').keyup(function(e) {
        //if the titel was changed, a new route info box should be drawn.
        if ("titel" == this.id) {
            //remove the old marker info box and draw a new at the coordinates of the first route marker
            currentRoute.markerInfobox.setMap(null);
            currentRoute.name = this.value;
            currentRoute.markerInfobox = drawRouteInfobox(new google.maps.LatLng(session.map.routes[activeRouteInSession].marker[0].lat, session.map.routes[activeRouteInSession].marker[0].lng), currentRoute.name);
        }
        session.map.routes[activeRouteInSession][this.id] = this.value;
        return false;
    });
    
    /* Check for on change event for one of the track info input boxes*/
    $('.trackInfoInput').keyup(function(e) {
        //if the titel was changed, a new route info box should be drawn.
        if ("trackTitel" == this.id) {
            //remove the old marker info box and draw a new at the coordinates of the first route marker
            currentRoute.markerInfobox.setMap(null);
            currentRoute.name = this.value;
            currentRoute.markerInfobox = drawTrackingInfobox(new google.maps.LatLng(session.map.routes[activeRouteInSession].marker[0].lat, session.map.routes[activeRouteInSession].marker[0].lng), currentRoute.name);
        }
        session.map.routes[activeRouteInSession][this.id] = this.value;
        return false;
    });
});



/*functions to switch to the position of the next/prev/first/last route*/

function routeBackward(e) {
    e.preventDefault();
    var indexUpdate;
    if (activeRouteInSession == 0 && session.map.routes.length > 0) {
        indexUpdate = session.map.routes.length - 1;
    } else if (session.map.routes.length <= 0) {
        return;
    } else {
        indexUpdate = activeRouteInSession - 1;
    }
    updateMapPosition(indexUpdate);
}

function routeFastBackward(e) {
    e.preventDefault();
    if (session.map.routes.length <= 0) {

        return;
    }
    updateMapPosition(0);
}

function routeForward(e) {
    e.preventDefault();
    var indexUpdate;
    if (activeRouteInSession >= (session.map.routes.length - 1) && session.map.routes.length > 0) {
        indexUpdate = 0;
    } else if (session.map.routes.length <= 0) {
        return;
    } else {
        indexUpdate = activeRouteInSession + 1;
    }
    updateMapPosition(indexUpdate);
}

function routeFastForward(e) {
    e.preventDefault();
    if (session.map.routes.length <= 0 || activeRouteInSession > (session.map.routes.length - 1)) {
        return;
    }
    updateMapPosition((session.map.routes.length - 1));
}

function updateMapPosition(newActiveRoute) {
    if (!mapEnabled()) {
        return;
    }
    if (currentMode == MODE.DISTANCE) {
        stopDistanceToolMode();
    } else if (currentMode == MODE.ROUTE) {
        stopRouteMode();
    } else if (currentMode == MODE.TRACKING) {
        stopTrackingMode();
    }
    activeRouteInSession = newActiveRoute;
    map.setZoom(session.map.routes[activeRouteInSession].lastZoom);
    map.panTo(new google.maps.LatLng(session.map.routes[activeRouteInSession].lastLat, session.map.routes[activeRouteInSession].lastLng));
}
