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

	$route = array (
		"47.645036570200226 9.22576904296875",
		"47.640410285382224 9.244308471679688",
		"47.63023101663225 9.273147583007812",
		"47.62097541515849 9.299240112304688",
		"47.61032944737081 9.3218994140625",
		"47.59505101193037 9.352798461914062",
		"47.584399766577576 9.381637573242188",
		"47.55938397557883 9.40155029296875",
		"47.54270014279958 9.413909912109375",
		"47.52786561031842 9.442062377929688",
		"47.5325018525392 9.4757080078125",
		"47.544090665057986 9.5196533203125",
		"47.56077405523748 9.5196533203125",
		"47.58717856130284 9.513473510742188",
		"47.61356975397398 9.4976806640625",
		"47.633932798340716 9.468154907226562",
		"47.64318610543658 9.42901611328125",
		"47.64919987624857 9.385757446289062",
		"47.65151268066222 9.341812133789062",
		"47.66261271615866 9.315719604492188",
		"47.676946769584795 9.282760620117188",
		"47.68757916850813 9.25048828125",
		"47.700057915247314 9.232635498046875",
		"47.714843674212936 9.219589233398438",
		"47.72962523887892 9.20654296875",
		"47.74394088010389 9.189376831054688",
		"47.733781798258256 9.18731689453125",
		"47.72223498082051 9.193496704101562",
		"47.704678915496004 9.215469360351562",
		"47.68896584339047 9.218902587890625",
		"47.67509743551929 9.228515625",
		"47.65521295468833 9.216156005859375");

	for ($i = 0; $i < count($route); $i++) {

		$Server->wsSend($clientID, $route[$i]);
		sleep(2);
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

?>