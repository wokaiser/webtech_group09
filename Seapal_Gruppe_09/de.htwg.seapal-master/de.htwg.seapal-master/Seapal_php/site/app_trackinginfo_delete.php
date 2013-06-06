<?php
	include('_include/config.php');
    include('_include/functions.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    $err = array( "tracknr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
    $tracknr = intval($_POST['tracknr']);
	$sql = "DELETE FROM ".const_mysql_tracking." WHERE tracknr = " . $tracknr . ";";
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    $err = array( "tracknr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$tracknr = array( "tracknr" => 'ok');
	
	echo json_encode($tracknr);
	
	mysql_close($sql_connection);

?>
                       
