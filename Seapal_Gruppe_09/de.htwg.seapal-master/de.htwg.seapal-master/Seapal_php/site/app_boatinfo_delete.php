<?php
	include('_include/config.php');
    include('_include/functions.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    $err = array( "bnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$sql = "DELETE FROM ".const_mysql_boatinfo." WHERE bnr = " . $_POST['bnr'] . ";";
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    $err = array( "bnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$bnr = array( "bnr" => 'ok');
	
	echo json_encode($bnr);
	
	mysql_close($sql_connection);

?>
                       
