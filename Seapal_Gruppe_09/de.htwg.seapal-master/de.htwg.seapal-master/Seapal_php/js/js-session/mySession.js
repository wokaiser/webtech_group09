/*define for session name*/
const SESSION = "seapalSessionApp";
const SESSION_VERSION = "1.0"

/*option types for "options" in session*/
SESSION_OPTION_TYPE = {LAYER : 0, MAP_OVERLAY : 1, FOLLOW_CURRENT_POSITION : 2};

SESSION_ROUTE_TYPE = {DEFAULT: "DEFAULT", ROUTE: "ROUTE", DISTANCE: "DISTANCE", NAVIGATION: "NAVIGATION", TRACKING: "TRACKING"};

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
                              active  : false},
                             {id      : "wl_followPosition",
                              type    : SESSION_OPTION_TYPE.FOLLOW_CURRENT_POSITION,
                              active  : false}]
    };
}

const TRIP_INFO = ["titel", "von", "nach"];

const TRIP_INFO_LOAD = ["tnr", "titel", "von", "nach", "lastZoom", "lastLat", "lastLng"];

const ROUTE_MARKER = ["name"];

const TRACKING_INFO = ["trackTitel", "skipper", "crew", "tstart", "tende", "tdauer"];

const TRACKING_INFO_LOAD = ["trackTitel", "skipper", "crew", "tstart", "tende", "tdauer", "lastZoom", "lastLat", "lastLng"];

const TRACKING_POINT = ["marker", "btm", "dtm", "sog", "cog", "manoever", "vorsegel", "wdate", "wtime", "motor", "tank", "windstaerke", "windrichtung", "luftdruck", "temperatur", "wolken", "regen", "wellenhoehe", "wellenrichtung"];

/*possible status of a map, which will be displayed in the map layer.*/
ROUTE_STATUS = {UNSAVED : "Route not saved to database.", MAP_OVERLAY : 1}

function getNewRoute()
{
    return(
    {
        type        : SESSION_ROUTE_TYPE.ROUTE,
        titel       : "",
        von         : "",
        nach        : "",
        marker      : [],
        lastLat     : null,
        lastLng     : null,
        lastZoom    : null
    });
}

function getNewRouteMarker() 
{   
    return(
    {
        name     : "",
        lat      : null,
        lng      : null
    });
}

function getNewTracking()
{
    return(
    {
        tnr         : null,
        trackTitel  : "",
        type        : SESSION_ROUTE_TYPE.TRACKING,
        skipper     : "",
        crew        : "",
        tstart      : "",
        tende       : "",
        tdauer      : "",
        marker      : [],
        lastLat     : null,
        lastLng     : null,
        lastZoom    : null
    });
}

function getNewTrackPoint() 
{   
    return(
    {
        marker          : "",
        lat             : null,
        lng             : null,
        btm             : null,
        dtm             : null,
        sog             : null,
        cog             : null,
        manoever        : "",
        vorsegel        : "",
        wdate           : "",
        wtime           : "",
        motor           : "",
        tank            : "",
        windstaerke     : "",
        windrichtung    : "",
        luftdruck       : "",
        temperatur      : "",
        wolken          : "",
        regen           : "",
        wellenhoehe     : "",
        wellenrichtung  : ""
    });
}