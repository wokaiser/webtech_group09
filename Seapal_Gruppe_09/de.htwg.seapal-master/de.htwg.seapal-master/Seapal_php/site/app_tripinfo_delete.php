<?php
	include('_include/config.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    $err = array( "wnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$sql = "DELETE FROM ".const_mysql_waypoints." WHERE wnr = " . $_POST['wnr'] . ";";
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    $err = array( "wnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
		
	$bnr = array( "wnr" => 'ok');
	
	echo json_encode($bnr);
		
	mysql_close($sql_connection);

?>