function startTracking() {
    console.log("Tracking starts.");
    startNewTracking(null, null);
    
} 


function startNewTracking(position, data) {
    
    addTrackingPoint(position, data);
    
    return;
    //save data to this new track
    for (var i in TRACKING_INFO) {
        session.map.routes[activeRouteInSession][TRACKING_INFO[i]] = data[TRACKING_INFO[i]]; 
    }
}


function addTrackingPoint(position, data) {


    return;
    //save data to this new track
    for (var i in TRACKING_POINT) {
        session.map.routes[activeRouteInSession][activeRouteMarkerInSession][TRACKING_POINT[i]] = data[TRACKING_POINT[i]]; 
    }
}