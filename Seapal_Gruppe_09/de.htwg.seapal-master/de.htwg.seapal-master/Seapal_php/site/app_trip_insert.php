<?php
	require_once('_include/session.php');
	include('_include/config.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    $err = array( "tnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$sql = "INSERT INTO ".const_mysql_trip." (bnr, titel, von, nach, skipper, crew, tstart, tende, tdauer, motor, tank) VALUES (
				" . $_SESSION['bnr'] . ",
				'" . $_POST['titel'] . "',
				'" . $_POST['von'] . "',
				" . $_POST['nach'] . ");";
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    $err = array( "tnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$result = mysql_query("SHOW TABLE STATUS LIKE 'tripinfo'");
	
	if (!$result) {
	    $err = array( "tnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$row = mysql_fetch_array($result);
	
	$nextId = $row['Auto_increment'];
	
	$tnr = array( "tnr" => "" . ($nextId-1) );
	
	echo json_encode($tnr);
	
	mysql_free_result($result);
	
	mysql_close($sql_connection);

?>