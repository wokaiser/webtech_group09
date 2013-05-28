// Php-Server JS-Code auslagern?
// andere M�glichkeit zur Routenbenennung �berlegen
// wozu lat/long anzeige? entfernen?
// openseamap fehler beheben falls m�glich
// Benutzerposition bestimmen

//for debug of cookie-less session variable
//Session.clear();

/*define for session name*/
const SESSION = "seapalSessionApp";
const SESSION_VERSION = "1.0"

/*default position of the ship*/
const CLIENT_DEFAULT_LAT = 47.65521295468833;
const CLIENT_DEFAULT_LNG = 9.2010498046875;

/*option types for "options" in session*/
SESSION_OPTION_TYPE = {LAYER : 0, MAP_OVERLAY : 1}

/*Var with the id and the link to each individual layer.*/
var LAYER = { SEAMARK: { id: 1, link: "http://tiles.openseamap.org/seamark/" }, 
                  AIR: { id: 2, link: "http://www.openportguide.org/tiles/actual/air_temperature/5/" }, 
                 WIND: { id: 3, link: "http://www.openportguide.org/tiles/actual/wind_vector/7/" } };

/*Variable to save options, even when leaving a page or reloading a page by using Cookie-less session variable*/
var session = Session.get(SESSION) 

if (typeof(session) == 'undefined' || SESSION_VERSION != session.version) {
    session = 
    {
        version     :       SESSION_VERSION,
        map         :       {lat               : 47.65521295468833,
                             lng               : 9.2010498046875,
                             zoom              : 14,
                             mapTypeId         : google.maps.MapTypeId.ROADMAP,
                             temporaryMarker   : null,
                             fixedMarker       : [],
                             routes            : []},
        options     :       [{id      : "wl_seamark",
                              active  : false,
                              type    : SESSION_OPTION_TYPE.LAYER,
                              layer   : LAYER.SEAMARK},
                             {id      : "wl_air",
                              active  : false,
                              type    : SESSION_OPTION_TYPE.LAYER,
                              layer   : LAYER.AIR},
                             {id      : "wl_wind",
                              type    : SESSION_OPTION_TYPE.LAYER,
                              layer   : LAYER.WIND,
                              active  : false},
                             {id      : "wl_mapOverlay",
                              type    : SESSION_OPTION_TYPE.MAP_OVERLAY,
                              active  : false}]
    };
}

var onInitialize;

var map = null;

var overlay = new google.maps.OverlayView();

var MODE = { DEFAULT: { value: 0, name: "default" }, ROUTE: { value: 1, name: "route" }, DISTANCE: { value: 2, name: "distance" }, NAVIGATION: { value: 3, name: "navigation" } };
var currentMode = MODE.DEFAULT;

var currentPositionMarker = null;
var followCurrentPosition = false;
var noToggleOfFollowCurrentPositionButton = false;

var temporaryMarker = null;
var temporaryMarkerInfobox = null;
var temporaryMarkerTimeout = null;

var fixedMarker = null;
var fixedMarkerInfoBox = null;
var fixedMarkerCount = 0;
var fixedMarkerArray = new Array();

var selectedMarker = null;

var currentPositionMarkerImage = new google.maps.MarkerImage('../img/icons/boat.png',
    new google.maps.Size(50, 50), //size
    new google.maps.Point(0, 0),  //origin point
    new google.maps.Point(25, 40)  //offset point
);

var temporaryMarkerImage = new google.maps.MarkerImage('../img/icons/cross_hair.png',
    new google.maps.Size(43, 43), //size
    new google.maps.Point(0, 0),  //origin point
    new google.maps.Point(22, 22)  //offset point
);

var fixedMarkerImage = new google.maps.MarkerImage('../img/icons/flag6.png',
    new google.maps.Size(40, 40), //size
    new google.maps.Point(0, 0),  //origin point
    new google.maps.Point(9, 32)  //offset point
);

var routeMarkerImage = new google.maps.MarkerImage('../img/icons/flag4.png',
    new google.maps.Size(40, 40), //size
    new google.maps.Point(0, 0),  //origin point
    new google.maps.Point(7, 34)  //offset point
);

var distanceMarkerImage = new google.maps.MarkerImage('../img/icons/flag5.png',
    new google.maps.Size(40, 40), //size
    new google.maps.Point(0, 0),  //origin point
    new google.maps.Point(7, 34)  //offset point
);

var destinationMarkerImage = new google.maps.MarkerImage('../img/icons/destination.png',
    new google.maps.Size(28, 31), //size
    new google.maps.Point(0, 0),  //origin point
    new google.maps.Point(7, 9)  //offset point
);

function MarkerWithInfobox(marker, infobox, counter) {
    this.reference = marker;
    this.infobox = infobox;
    this.counter = counter;
}

// initialize map and all event listeners
function initialize() {
    //set variable to know that initialization will be done
    onInitialize = true;
    // set different map types
    var mapTypeIds = ["roadmap", "satellite", "OSM"];

    // set map Options
    var mapOptions = {
        center: new google.maps.LatLng(session.map.lat, session.map.lng),
        zoom: session.map.zoom,
        mapTypeId: session.map.mapTypeId,
        mapTypeControlOptions: {
            mapTypeIds: mapTypeIds
        },
        disableDefaultUI: true,
        mapTypeControl: true
    };

    //set route menu position
    document.getElementById('followCurrentPositionContainer').style.width = document.body.offsetWidth + "px";
    document.getElementById('routeMenuContainer').style.width = document.body.offsetWidth + "px";
    document.getElementById('routeMenuContainer').style.display = "none";
    document.getElementById('distanceToolContainer').style.width = document.body.offsetWidth + "px";
    document.getElementById('distanceToolContainer').style.display = "none";
    document.getElementById('navigationContainer').style.width = document.body.offsetWidth + "px";
    document.getElementById('navigationContainer').style.display = "none";
    document.getElementById('chat').style.display = "none";

    // initialize map
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    
    // set client position
    currentPosition = new google.maps.LatLng(CLIENT_DEFAULT_LAT, CLIENT_DEFAULT_LNG)

    var currentMarkerOptions = {
        position: currentPosition,
        map: map,
        icon: currentPositionMarkerImage
    }

    // initialize marker for current position

    currentPositionMarker = new google.maps.Marker(currentMarkerOptions);

    // set map types
    map.mapTypes.set("OSM", new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OpenStreetMap",
        maxZoom: 18
    }));

    //Initial map features
    
    
    //init map options
    for (var i in session.options) {
        InitialiseMapOtionsDropdown(session.options[i])
    }
    
    //set fixed markers, if there are some available
    for (var i = 0; i < session.map.fixedMarker.length; i++) {
        fixedMarkerCount = session.map.fixedMarker[i].fixedMarkerCount - 1;
        setTemporaryMarker(new google.maps.LatLng(session.map.fixedMarker[i].lat, session.map.fixedMarker[i].lng));
        setFixedMarker(new google.maps.LatLng(session.map.fixedMarker[i].lat, session.map.fixedMarker[i].lng));
    }
    
    //set temporary marker, if one is stored
    if (null != session.map.temporaryMarker) {
        setTemporaryMarker(new google.maps.LatLng(session.map.temporaryMarker.lat, session.map.temporaryMarker.lng));
    }
    
    //set routes
    for (i = 0; i < session.map.routes.length; i++) {
        activeRouteInSession = i;
        startNewRoute(new google.maps.LatLng(session.map.routes[i][0].lat, session.map.routes[i][0].lng));
        for (j = 1; j < session.map.routes[i].length; j++) {
            addRouteMarker(new google.maps.LatLng(session.map.routes[i][j].lat, session.map.routes[i][j].lng));
        }
        stopRouteMode();
    }
    
    //add action listener for change of map type
    google.maps.event.addListener( map, 'maptypeid_changed', function() { 
        session.map.mapTypeId = map.getMapTypeId();
    } );

    //add action listener for mapOverlay which will be refreshed if map get refreshed
    google.maps.event.addListener(map, 'idle', mapOverlay);
    
    google.maps.event.addListener(currentPositionMarker, 'position_changed', function () {
        
        if (followCurrentPosition) {
            map.setCenter(currentPositionMarker.getPosition());
        }
        
        if (currentMode == MODE.NAVIGATION) {
            updateNavigation(currentPositionMarker.position, destinationMarker.position);
        }
    });

    overlay.draw = function () { };
    overlay.setMap(map);

    //placeholder for overlay
    map.overlayMapTypes.push(null);        // Placeholder for Sites
    map.overlayMapTypes.push(null);        // Placeholder for OSM TOP + 
    
    // click on map
    google.maps.event.addListener(map, 'click', function (event) {

        // handler for default mode
        if (currentMode == MODE.DEFAULT) {
            setTemporaryMarker(event.latLng);
        } else if (currentMode == MODE.ROUTE || currentMode == MODE.DISTANCE) {
            addRouteMarker(event.latLng);
        }
    });

    google.maps.event.addListener(map, 'center_changed', function () {
        if (followCurrentPosition && !noToggleOfFollowCurrentPositionButton) {
            toggleFollowCurrentPosition();
        } else {
            noToggleOfFollowCurrentPositionButton = false;
        }
    });
    //set variable to know that initialization is done
    onInitialize = false;
}

// temporary marker context menu ----------------------------------------- //
$(function () {
    $.contextMenu({
        selector: '#temporaryMarkerContextMenu',
        events: {
            hide: function () {
                startTimeout();
            }
        },
        callback: function (key, options) {
        
            if (key == "marker") {

                setFixedMarker(temporaryMarker.position)

            } else if (key == "startroute") {

                startNewRoute(temporaryMarker.position, false);

            } else if (key == "distance") {

                startNewRoute(temporaryMarker.position, true);

            } else if (key == "destination") {
            
            	startNewNavigation(currentPositionMarker.position, temporaryMarker.position);

            } else if (key == "delete") {
                temporaryMarker.setMap(null);
                temporaryMarkerInfobox.setMap(null);
            }
        },
        items: {
            "marker": { name: "Markierung setzen", icon: "marker" },
            "startroute": { name: "Neue Route setzen", icon: "startroute" },
            "distance": { name: "Distanz messen", icon: "distance" },
            "destination": { name: "Zum Ziel machen", icon: "destination" },
            "sep1": "---------",
            "delete": { name: "L&ouml;schen", icon: "delete" }
        }
    });
});

// fixed marker context menu ------------------------------------------------ //
$(function () {
    $.contextMenu({
        selector: '#fixedMarkerContextMenu',
        callback: function (key, options) {
            if (key == "destination") {

                startNewNavigation(currentPositionMarker.position, selectedMarker.reference.position);
            
            } else if (key == "delete") {
                selectedMarker.reference.setMap(null);
                selectedMarker.infobox.setMap(null);
                fixedMarkerArray.splice(fixedMarkerArray.indexOf(selectedMarker), 1);
                //remove marker from session
                session.map.fixedMarker.splice(getFixedMarkerIndexByCounter(selectedMarker.counter), 1);
            }
        },
        items: {
            "destination": { name: "Zum Ziel machen", icon: "destination" },
            "sep1": "---------",
            "delete": { name: "L&ouml;schen", icon: "delete" }
        }
    });
});

// helper functions --------------------------------------------------------- //

// start marker timout
function startTimeout() {

    temporaryMarkerTimeout = setTimeout(function () {
        temporaryMarker.setMap(null);
        temporaryMarkerInfobox.setMap(null);
        session.map.temporaryMarker = null;
    }, 5000);
}

// stop marker timout
function stopTimeout() {
    clearTimeout(temporaryMarkerTimeout);
}

// draw temporaryMarkerInfobox 
function drawTemporaryMarkerInfobox(latLng) {
    customTxt = "<div class='markerInfoBox well' id='temporaryMarkerInfobox'>"
     + formatCoordinate(latLng.lat(), "lat") + " "
     + formatCoordinate(latLng.lng(), "long")
     + "</br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspDTM " + getDistance(latLng, currentPositionMarker.position) + "m</div>";
    //return new TxtOverlay(latLng, customTxt, "coordinate_info_box", map, -110, -60);
    //$('body').append("<span>" + latLng.lat() + " " + latLng.lng() + "</span><br>");
    return new TxtOverlay(latLng, customTxt, "coordinate_info_box", map, -113, -92);
}

// draw fixedMarkerInfobox 
function drawFixedMarkerInfobox(latLng, counter) {

    customTxt = "<div class='markerInfoBox label' id='fixedMarkerInfobox'>"
     + "Markierung " + (counter) + "</div>";
    return new TxtOverlay(latLng, customTxt, "coordinate_info_box", map, 40, -29);
}

function getMarkerWithInfobox(event) {

    for (var i = 0; i < fixedMarkerArray.length; i++) {
        if (fixedMarkerArray[i].reference.position == event.latLng) {
            return fixedMarkerArray[i];
        }
    }
    return null;
}

function setTemporaryMarker(position) {
    //check if not in initialization
    if (!onInitialize) {
        //save temporary marker to cookie-less session
        session.map.temporaryMarker = {lat : position.lat(), lng : position.lng()};
    }

    var temporaryMarkerOptions = {
        position: position,
        map: map,
        icon: temporaryMarkerImage,
        draggable: true
    }

    // delete temp marker & infobox
    if (temporaryMarker != null) { temporaryMarker.setMap(null); }
    if (temporaryMarkerInfobox != null) { temporaryMarkerInfobox.setMap(null); }

    stopTimeout();
    temporaryMarker = new google.maps.Marker(temporaryMarkerOptions);

    // click on marker
    google.maps.event.addListener(temporaryMarker, 'click', function (event) {
        var pixel = fromLatLngToPixel(event.latLng);
        
        if (currentMode != MODE.NAVIGATION) {
	        $('#temporaryMarkerContextMenu').contextMenu({ x: pixel.x, y: pixel.y });
        }
        
        stopTimeout();
    });

    // marker is dragged
    google.maps.event.addListener(temporaryMarker, 'drag', function (event) {
        temporaryMarkerInfobox.setMap(null);
        temporaryMarkerInfobox = drawTemporaryMarkerInfobox(event.latLng);
    });

    // marker drag start
    google.maps.event.addListener(temporaryMarker, 'dragstart', function (event) {
        stopTimeout();
    });

    // marker drag end
    google.maps.event.addListener(temporaryMarker, 'dragend', function (event) {
        session.map.temporaryMarker = {lat : event.latLng.lat(), lng : event.latLng.lng()};
        startTimeout();
    });

    startTimeout();
    temporaryMarkerInfobox = drawTemporaryMarkerInfobox(position);
}

/*helper function to get a fixed marker from the less-cookie session by the fixedMarkerCount*/
function getFixedMarkerIndexByCounter(count) {
    for (x in session.map.fixedMarker) {
        if (session.map.fixedMarker[x].fixedMarkerCount == count) {
            return x;
        }
    }
}

function setFixedMarker(position) {
    temporaryMarker.setMap(null);
    temporaryMarkerInfobox.setMap(null);
    stopTimeout();

    fixedMarkerCount++;
    var fixedMarkerOptions = {
        position: position,
        map: map,
        title: 'Markierung ' + fixedMarkerCount,
        icon: fixedMarkerImage,
        draggable: true
    }

    fixedMarker = new google.maps.Marker(fixedMarkerOptions);

    //check if not in initialization
    if (!onInitialize) {
        session.map.fixedMarker.push({fixedMarkerCount : fixedMarkerCount, lat : position.lat(), lng : position.lng()});
    }
    
    // click on fixed marker
    google.maps.event.addListener(fixedMarker, 'click', function (event) {
        selectedMarker = getMarkerWithInfobox(event);
        var pixel = fromLatLngToPixel(event.latLng);
        
        if (currentMode != MODE.NAVIGATION) {
	        $('#fixedMarkerContextMenu').contextMenu({ x: pixel.x, y: pixel.y });
        }
    });

    // marker is dragged
    google.maps.event.addListener(fixedMarker, 'drag', function (event) {
        
        selectedMarker = getMarkerWithInfobox(event);
        selectedMarker.infobox.setMap(null);
        selectedMarker.infobox = drawFixedMarkerInfobox(event.latLng, selectedMarker.counter);
        var index = getFixedMarkerIndexByCounter(selectedMarker.counter);
        session.map.fixedMarker[index].lat = event.latLng.lat();
        session.map.fixedMarker[index].lng = event.latLng.lng(); 
    });

    fixedMarker.setMap(map);
    fixedMarkerInfoBox = drawFixedMarkerInfobox(temporaryMarker.position, fixedMarkerCount);
    fixedMarkerArray.push(new MarkerWithInfobox(fixedMarker, fixedMarkerInfoBox, fixedMarkerCount));
}

function getDistance(coord1, coord2) {
    return Math.round(google.maps.geometry.spherical.computeDistanceBetween(coord1, coord2));
}

function fromLatLngToPixel(latLng) {

    var pixel = overlay.getProjection().fromLatLngToContainerPixel(latLng);
    pixel.x += document.getElementById('map_canvas').offsetLeft;
    pixel.y += document.getElementById('map_canvas').offsetTop;
    return pixel;
}

function toggleFollowCurrentPosition() {
    followCurrentPosition = !followCurrentPosition;
    if (followCurrentPosition) {
        document.getElementById("followCurrentPositionbutton").value = "Eigener Position nicht mehr folgen";
        noToggleOfFollowCurrentPositionButton = true;
        map.setCenter(currentPositionMarker.getPosition());
    } else {
        document.getElementById("followCurrentPositionbutton").value = "Eigener Position folgen";
    }
    document.getElementById('followCurrentPositionContainer').style.width = document.body.offsetWidth + "px";
}

/*Add a map layer with a specific id. Each individual layer should have his own static id*/
function addMapLayer (id, link) {
    map.overlayMapTypes.setAt(id, new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            return link + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OpenSeaMap",
        maxZoom: 18
    }));
}

/*Remove a map layer with a specific id. Each individual layer should have his own static id*/
function RemoveMapLayer (id) {
    map.overlayMapTypes.setAt(id, null); 
}

/*function to initialise the option buttons*/
function InitialiseMapOtionsDropdown (option) {
    if (option.active) {
        $("#"+option.id).hasClass ("checked");
        $("#"+option.id).find("span").toggleClass("icon-ok");
    }
    loadSessionOption(option);
}

function toggleSessionOption(option) {
    option.active = (option.active) ? false : true;
}

/*function to save information about the given id in the session variable*/
function getSessionOption(optionId) {
    for (var i in session.options) {
        if (optionId == session.options[i].id) {
            return session.options[i];
        }
    }
    return null;
}

function loadSessionOption(option) {
    //check if a layer should be added
    if (option.type == SESSION_OPTION_TYPE.LAYER) {
        //check if the layer should be added
        if (option.active) {
            //add layer
            addMapLayer(option.layer.id, option.layer.link);
        } else {
            RemoveMapLayer(option.layer.id);
        }
    } else if (option.type == SESSION_OPTION_TYPE.MAP_OVERLAY) {
        //check if the mapOverlay should be displayed
        if (option.active) {
            //Visible mayOverlay
            document.getElementById("map_overlay").style.visibility="visible";
            //call mapOverlay for instant refresh
            mapOverlay();
        } else {
            //Hide mayOverlay
            document.getElementById("map_overlay").style.visibility="hidden";
        }
    }
}

/*function to toggle buttons and choose weather layer*/
$(document).ready(function() {
    /* Multi select - allow multiple selections */
    /* Allow click without closing menu */
    /* Toggle checked state and icon */
    $('.multicheck').click(function(e) {
        $(this).toggleClass("checked");
        $(this).find("span").toggleClass("icon-ok");
        return false;
    });
        
    /* wl_chooser, to activate the weather layer */ 
    /* depending to the choosen weather layer    */
    $('.wl_chooser').click(function(e) {
        opt = getSessionOption(this.id);
        toggleSessionOption(opt);
        loadSessionOption(opt);
        /*store session*/
        Session.set(SESSION, session);
        return false;
    });
});

function mapOverlay() {
    latLng = map.getCenter();
    var lat = latLng.lat();
    var lng = latLng.lng();
    var weatherCurrent = "http://openweathermap.org/data/2.1/find/city?lat="+lat+"&lon="+lng+"&cnt=1";    
    var txt = "<center>";
    
    //save actual displayed position of the map in the cookie-less session
    session.map.lat = lat;
    session.map.lng = lng;
    session.map.zoom = map.getZoom();
    /*store session*/
    Session.set(SESSION, session);
    
    //return if mapOverlay is inactive
    if (!getSessionOption("wl_mapOverlay").active) return;
    
    
    /*---------------------------------------*/
    /*           Current Weather             */
    /*---------------------------------------*/
    $.ajax(weatherCurrent, {
        crossDomain:true, 
        dataType: "jsonp", 
        success:function(data,text,xhqr){
            txt = "<b>Weather Information</b>"                               + "</br>";
            txt += data.list[0].name                                         + "</br>";
            txt += "Weather          " + data.list[0].weather[0].description + "</br>";
            txt += "Wind speed       " + data.list[0].wind.speed             + "</br>";
            txt += "Humidity         " + data.list[0].main.humidity          + "</br>";
            txt += "Pressure         " + data.list[0].main.pressure          + "</br>";
            txt += "Temperature      " + data.list[0].main.temp              + "</br>";
            txt += "Min Temperature  " + data.list[0].main.temp_min          + "</br>";
            txt += "Max Temperature  " + data.list[0].main.temp_max          + "</br>";
            txt += "</center>";
        
            //build string for weather history and forecast request
            var weatherHistory  = "http://openweathermap.org/data/2.1/history/city/?id="+data.list[0].id+"&start="+data.list[0].dt+"&cnt=1";
            var weatherForecast = "http://openweathermap.org/data/2.1/forecast/city?lat="+lat+"&lon="+lng+"&cnt=1";
            
            /*---------------------------------------*/
            /*           Weather Forecast            */
            /*---------------------------------------*/
            $.ajax(weatherForecast, {
                crossDomain:true, 
                dataType: "jsonp", 
                success:function(data,text,xhqr){
                    //weather forecast data
                    
                    
                    /*---------------------------------------*/
                    /*           Weather History             */
                    /*---------------------------------------*/
                    $.ajax(weatherHistory, {
                        crossDomain:true, 
                        dataType: "jsonp", 
                        success:function(data,text,xhqr){
                            //weather history data
                            
                            
                            
                            //all weather data retrieved, set txt to map overlay
                            document.getElementById("map_overlay").innerHTML = txt;
                        }
                    });   
                }
            });
        }
    }); 
}

