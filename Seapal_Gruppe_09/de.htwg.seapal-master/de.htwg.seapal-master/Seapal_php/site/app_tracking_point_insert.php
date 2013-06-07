<?php
	include('_include/config.php');
    include('_include/functions.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    die('Error: ' . mysql_error());
	}
    
	$sql = "INSERT INTO ".const_mysql_trackingPoints." (tracknr, lat, lng, windstaerke, windrichtung, luftdruck, temperatur, wolken, regen, wellenhoehe, wellenrichtung, marker, btm, dtm, sog, cog, manoever, vorsegel, wdate, wtime, motor, tank) VALUES (
				'" . $_POST['tracknr'] . "',
				'" . $_POST['lat'] . "',
				'" . $_POST['lng'] . "',
				'" . $_POST['strength'] . "',
				'" . $_POST['wind_direction'] . "',
				'" . $_POST['airpressure'] . "',
				'" . $_POST['temperature'] . "',
				'" . $_POST['clouds'] . "',
				'" . $_POST['rain'] . "',
				'" . $_POST['waveheight'] . "',
				'" . $_POST['wave_direction'] . "',
				'" . $_POST['marker'] . "',
				'" . $_POST['btm'] . "',
				'" . $_POST['dtm'] . "',
				'" . $_POST['sog'] . "',
				'" . $_POST['cog'] . "',
				'" . $_POST['manoever'] . "',
				'" . $_POST['vorsegel'] . "',
				'" . $_POST['wdate'] . "',
				'" . $_POST['wtime'] . "',
				'" . $_POST['motor'] . "',
				'" . $_POST['tank'] . "');";
	
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