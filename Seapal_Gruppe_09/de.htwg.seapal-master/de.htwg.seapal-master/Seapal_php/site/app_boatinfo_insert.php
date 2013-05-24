<?php
	include('_include/config.php');
    $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
    $db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	
	if (!$db_selected) {
	    die('Error: ' . mysql_error());
	}
	
	$sql = "INSERT INTO ".const_mysql_boatinfo." (bootname, registernummer, segelzeichen, heimathafen, yachtclub, eigner, versicherung,
			rufzeichen, typ, konstrukteur, laenge, breite, tiefgang, masthoehe, verdraengung, rigart,	
			baujahr, motor, tankgroesse, wassertankgroesse, abwassertankgroesse, grosssegelgroesse,
			genuagroesse, spigroesse) VALUES(
			 	'" . $_POST['bootname'] . "',
				" . $_POST['registernummer'] . ",
				'" . $_POST['segelzeichen'] . "',
				'" . $_POST['heimathafen'] . "',
				'" . $_POST['yachtclub'] . "',
				'" . $_POST['eigner'] . "',
				'" . $_POST['versicherung'] . "',
				'" . $_POST['rufzeichen'] . "',
				'" . $_POST['typ'] . "',
				'" . $_POST['konstrukteur'] . "',
				" . $_POST['laenge'] . ",
				" . $_POST['breite'] . ",
				" . $_POST['tiefgang'] . ",
				" . $_POST['masthoehe'] . ",
				" . $_POST['verdraengung'] . ",
				'" . $_POST['rigart'] . "',
				" . $_POST['baujahr'] . ",
				'" . $_POST['motor'] . "',
				" . $_POST['tankgroesse'] . ",
				" . $_POST['wassertankgroesse'] . ",
				" . $_POST['abwassertankgroesse'] . ",
				" . $_POST['grosssegelgroesse'] . ",
				" . $_POST['genuagroesse'] . ",
				" . $_POST['spigroesse'] . ");";
	
	$result = mysql_query($sql, $sql_connection);
	
	if (!$result) {
	    $err = array( "bnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$result = mysql_query("SHOW TABLE STATUS LIKE 'bootinfo'");
	
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