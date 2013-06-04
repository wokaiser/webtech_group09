<?php
	require_once('_include/session.php');
	include('_include/config.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    $err = array( "bnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$sql = "INSERT INTO ".const_mysql_users." (benutzername, passwort, vorname, nachname, mail, registrierung, geburtsdatum) VALUES (
				'" . $_POST['username'] . "',
				'" . $_POST['password'] . "',
				'',
				'',
				'" . $_POST['email'] . "',
				'" . $_POST['regdate'] . "',
				'');";
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    $err = array( "bnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$result = mysql_query("SHOW TABLE STATUS LIKE 'benutzer'");
	
	if (!$result) {
	    $err = array( "bnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$row = mysql_fetch_array($result);
	
	$nextId = $row['Auto_increment'];
	
	$bnr = array( "bnr" => "" . ($nextId-1) );
	
	echo json_encode($bnr);
	
	mysql_free_result($result);
	
	mysql_close($sql_connection);

?>