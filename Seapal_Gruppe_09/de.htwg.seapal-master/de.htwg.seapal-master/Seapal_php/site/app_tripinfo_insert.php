<?php
	include('_include/config.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    $err = array( "wnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$sql = "INSERT INTO ".const_mysql_waypoints." (tnr, name, btm, dtm, lat, lng, sog, cog, manoever, vorsegel, wdate, wtime, marker) VALUES (
				" . $_POST['tnr'] . ", 
				'" . $_POST['name'] . "',
				'" . $_POST['btm'] . "', 
				'" . $_POST['dtm'] . "',
				'" .$_POST['lat'] . "', 
				'" . $_POST['lng'] . "',
				'" . $_POST['sog'] . "', 
				'" . $_POST['cog'] . "', 
				'" . $_POST['manoever'] . "', 
				'" . $_POST['vorsegel'] . "', 
				'" . $_POST['wdate'] . "', 
				'" . $_POST['wtime'] . "', 
				'" . $_POST['marker'] . "');";
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    $err = array( "wnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$result = mysql_query("SHOW TABLE STATUS LIKE 'wegpunkte'");
	
	if (!$result) {
	    $err = array( "wnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$row = mysql_fetch_array($result);
	
	$nextId = $row['Auto_increment'];
	
	$wnr = array( "wnr" => "" . ($nextId-1) );
	
	echo json_encode($wnr);
	
	mysql_free_result($result);
	
	mysql_close($sql_connection);

?>