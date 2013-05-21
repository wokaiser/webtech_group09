<?php

	$conn = mysql_connect("localhost", "root", "root");
	
	$db_selected = mysql_select_db('seapal', $conn);
	
	if (!$db_selected) {
	    $err = array( "bnr" => 'Error: ' . mysql_error() );
	    echo json_encode($err);
	    exit;
	}
	
	$sql = "INSERT INTO seapal.bootinfo (bootname, registernummer, segelzeichen, heimathafen, yachtclub, eigner, versicherung,
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
	
	$result = mysql_query($sql, $conn);
	
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
		
	mysql_close($conn);

?>