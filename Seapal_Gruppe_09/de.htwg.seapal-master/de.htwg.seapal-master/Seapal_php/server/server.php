<?php
// prevent the server from timing out
set_time_limit(0);

// include the web sockets server script (the server is started at the far bottom of this file)
require 'class.PHPWebSocket.php';


// when a client sends data to the server
function wsOnMessage($clientID, $message, $messageLength, $binary) {
	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );

	// check if message length is 0
	if ($messageLength == 0) {
		$Server->wsClose($clientID);
		return;
	}	

	$data = json_decode($message);

	$trackingRoute = CalculateRouteSteps($data);

	for ($i = 0; $i < count($trackingRoute); $i++) {

		$Server->wsSend($clientID, $trackingRoute[$i]);
		usleep(25000);
	}
}

// when a client connects
function wsOnOpen($clientID)
{
	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );

	$Server->log( "$ip ($clientID) has connected." );

	//Send a join notice to everyone but the person who joined
	foreach ( $Server->wsClients as $id => $client )
		if ( $id != $clientID )
			$Server->wsSend($id, "Visitor $clientID ($ip) has joined the room.");
}

// when a client closes or lost connection
function wsOnClose($clientID, $status) {
	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );

	$Server->log( "$ip ($clientID) has disconnected." );

	//Send a user left notice to everyone in the room
	foreach ( $Server->wsClients as $id => $client )
		$Server->wsSend($id, "Visitor $clientID ($ip) has left the room.");
}

// start the server
$Server = new PHPWebSocket();
$Server->bind('message', 'wsOnMessage');
$Server->bind('open', 'wsOnOpen');
$Server->bind('close', 'wsOnClose');
// for other computers to connect, you will probably need to change this to your LAN IP or external IP,
// alternatively use: gethostbyaddr(gethostbyname($_SERVER['SERVER_NAME']))
$Server->wsStartServer('localhost', 9300);


/* ------------------------------------- Tracking route calculation ------------------------------------- */

/* Calculates all the steps the little ship has to pass on an route */
function CalculateRouteSteps($activeRoute) {
	$result = array();
	for($i = 0; $i < count($activeRoute); $i++) {		
    	if ($i < count($activeRoute) - 1) {

    		$actPosition = new stdClass();
			$actPosition->lat = $activeRoute[$i]->lat;
			$actPosition->lng = $activeRoute[$i]->lng;	    	

	    	$nextPosition = new stdClass();
			$nextPosition->lat = $activeRoute[$i + 1]->lat;
			$nextPosition->lng = $activeRoute[$i + 1]->lng;
	    	$steps = distance($actPosition->lat, $actPosition->lng, $nextPosition->lat, $nextPosition->lng) % 500;

	    	$result = array_merge($result, CalculateRouteStepsBetweenMarkers($actPosition, $nextPosition, $steps));
    	}
	}
	return $result;
}

/* Calculates all the steps between two route markers the little ship has to pass */
function CalculateRouteStepsBetweenMarkers($startMarker, $nextMarker, $steps) {	
	$diffLat = ($nextMarker->lat - $startMarker->lat) / $steps;
	$diffLng = ($nextMarker->lng - $startMarker->lng) / $steps;
	$tmpLat = $startMarker->lat;
	$tmpLng = $startMarker->lng;
	$tmp = array();
	for($i = 0; $i < $steps; $i++) {		
		$tmpLat += $diffLat;
		$tmpLng += $diffLng;

		$tmp[] = ($tmpLat . " " . $tmpLng);
	}
	return $tmp;
}

// Gets the distance between to lat,lng points
function distance($lat1, $lng1, $lat2, $lng2)
{
	$pi80 = M_PI / 180;
	$lat1 *= $pi80;
	$lng1 *= $pi80;
	$lat2 *= $pi80;
	$lng2 *= $pi80;
	 
	$r = 3958.75;
	$dlat = $lat2 - $lat1;
	$dlng = $lng2 - $lng1;
	$a = sin($dlat / 2) * sin($dlat / 2) + cos($lat1) * cos($lat2) * sin($dlng / 2) * sin($dlng / 2);
	$c = 2 * atan2(sqrt($a), sqrt(1 - $a));
	$km = $r * $c;
	 
	return ($km * 1609);
}

?>