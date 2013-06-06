<?php
	include('_include/config.php');
    include('_include/functions.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    $err = array( "trackpointnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
    $trackpointnr = intval($_POST['trackpointnr']);
	$sql = "DELETE FROM ".const_mysql_trackingPoints." WHERE trackpointnr = " . $trackpointnr . ";";
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    $err = array( "trackpointnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$trackpointnr = array( "trackpointnr" => 'ok');
	
	echo json_encode($trackpointnr);
	
	mysql_close($sql_connection);

?>
                       
