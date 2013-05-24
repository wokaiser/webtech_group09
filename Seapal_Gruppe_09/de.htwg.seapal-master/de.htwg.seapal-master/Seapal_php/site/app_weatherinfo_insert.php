<?php
	include('_include/config.php');
    include('_include/functions.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    die('Error: ' . mysql_error());
	}

    if(false !== strpos($_POST['weather_time'], ':'))
        $weather_date = convert_date_to_sql($_POST['weather_time']);
    
	$sql = "INSERT INTO ".const_mysql_weatherinfo." (datum, uhrzeit, windstaerke, windrichtung, luftdruck, temperatur, wolken, regen, wellenhoehe, wellenrichtung) VALUES(
			 	'" . $_POST['weather_date'] . "',
				'" . $_POST['weather_time'] . "',
				'" . $_POST['strength'] . "',
				'" . $_POST['wind_direction'] . "',
				'" . $_POST['airpressure'] . "',
				'" . $_POST['temperature'] . "',
				'" . $_POST['clouds'] . "',
				'" . $_POST['rain'] . "',
				'" . $_POST['waveheight'] . "',
				'" . $_POST['wave_direction'] . "');";
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    $err = array( "id" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$result = mysql_query("SHOW TABLE STATUS LIKE '".const_mysql_weatherinfo."'");
	
	if (!$result) {
	    $err = array( "id" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$row = mysql_fetch_array($result);
	
	$nextId = $row['Auto_increment'];		
	
	$id = array( "id" => "" . ($nextId-1) );
	
	echo json_encode($id);
	
	mysql_free_result($result);
		
	mysql_close($sql_connection);

?>