<?php
	include('_include/config.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    die('Error: ' . mysql_error());
	}
	
	$sql = "SELECT * FROM ".const_mysql_trip." WHERE tnr = '" . $_GET['tnr'] . "';";
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    die('Error: ' . mysql_error());
	}
	
	$row = mysql_fetch_array($result);
	
	echo json_encode($row);
	
	mysql_free_result($result);
		
	mysql_close($sql_connection);
	
?>