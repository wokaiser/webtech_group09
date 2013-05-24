<?php
	include('_include/config.php');
    include('_include/functions.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    $err = array( "id" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
    $id = intval($_POST['id']);
	$sql = "DELETE FROM ".const_mysql_weatherinfo." WHERE id = " . $id . ";";
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    $err = array( "id" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$id = array( "id" => 'ok');
	
	echo json_encode($id);
	
	mysql_close($sql_connection);

?>
                       
