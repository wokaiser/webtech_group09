<?php
	include('_include/config.php');
    include('_include/functions.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    die('Error: ' . mysql_error());
	}
    
	$sql = "INSERT INTO ".const_mysql_trackingPoints." (tracknr, windstaerke, windrichtung, luftdruck, temperatur, wolken, regen, wellenhoehe, wellenrichtung) VALUES(
				'1', 
				'" . $_POST['strength'] . "',
				'" . $_POST['wind_direction'] . "',
				'" . $_POST['airpressure'] . "',
				'" . $_POST['temperature'] . "',
				'" . $_POST['clouds'] . "',
				'" . $_POST['rain'] . "',
				'" . $_POST['waveheight'] . "',
				'" . $_POST['wave_direction'] . "');"; //TODO remove '1' with current tracking nr
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    $err = array( "trackpointnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$result = mysql_query("SHOW TABLE STATUS LIKE '".const_mysql_trackingPoints."'");
	
	if (!$result) {
	    $err = array( "trackpointnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$row = mysql_fetch_array($result);
	
	$nextId = $row['Auto_increment'];		
	
	$trackpointnr = array( "trackpointnr" => "" . ($nextId-1) );
	
	echo json_encode($trackpointnr);
	
	mysql_free_result($result);
		
	mysql_close($sql_connection);

?>