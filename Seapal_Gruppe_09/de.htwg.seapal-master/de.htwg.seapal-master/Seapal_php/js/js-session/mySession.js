/*define for session name*/
const SESSION = "seapalSessionApp";
const SESSION_VERSION = "1.0"

/*option types for "options" in session*/
SESSION_OPTION_TYPE = {LAYER : 0, MAP_OVERLAY : 1, FOLLOW_CURRENT_POSITION : 2}

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
                              active  : true,
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
                              active  : true},
                             {id      : "wl_followPosition",
                              type    : SESSION_OPTION_TYPE.FOLLOW_CURRENT_POSITION,
                              active  : false}]
    };
}

const TRIP_INFO = ["titel", "von", "nach", "tstart", "tende", "tdauer", "skipper", "crew", "motor", "tank"];

const ROUTE_MARKER = ["name", "btm", "dtm", "sog", "cog", "manoever", "vorsegel", "wdate", "wtime"]

/*possible status of a map, which will be displayed in the map layer.*/
ROUTE_STATUS = {UNSAVED : "Route not saved to database.", MAP_OVERLAY : 1}

function getNewRoute()
{
    return(
    {
        titel       : "",
        von         : "",
        nach        : "",
        tstart      : "",
        tende       : "",
        tdauer      : "",
        skipper     : "",
        crew        : "",
        motor       : "",
        tank        : "",
        marker      : [],
        lastZoom    : 5
    });
}

function getNewRouteMarker() 
{   
    return(
    {
        name     : "Marker",
        lat      : null,
        lng      : null,
        btm      : "BTM",
        dtm      : "DTM",
        sog      : "SOG",
        cog      : "COG",
        manoever : "manoever",
        vorsegel : "vorsegel",
        marker   : "marker",
        wdate    : "wdate",
        wtime    : "wtime"
    });
}