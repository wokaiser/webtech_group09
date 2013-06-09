<?php
	include('_include/config.php');
    include('_include/functions.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    die('Error: ' . mysql_error());
	}
    
	$sql = "INSERT INTO ".const_mysql_tracking." (tnr, trackTitel, skipper, crew, tstart, tende, tdauer, lastZoom, lastLat, lastLng) VALUES (
                '" . $_POST['tnr'] . "',
				'" . $_POST['trackTitel'] . "',
				'" . $_POST['skipper'] . "',
				'" . $_POST['crew'] . "',
				'" . $_POST['tstart'] . "',
				'" . $_POST['tende'] . "',
				'" . $_POST['tdauer'] . "',
				'" . $_POST['lastZoom'] . "',
				'" . $_POST['lastLat'] . "',
				'" . $_POST['lastLng'] . "');";
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    $err = array( "tracknr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$result = mysql_query("SHOW TABLE STATUS LIKE '".const_mysql_tracking."'");
	
	if (!$result) {
	    $err = array( "tracknr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$row = mysql_fetch_array($result);
	
	$nextId = $row['Auto_increment'];		
	
	$tracknr = array( "tracknr" => "" . ($nextId-1) );
	
	echo json_encode($tracknr);
	
	mysql_free_result($result);
		
	mysql_close($sql_connection);

?>