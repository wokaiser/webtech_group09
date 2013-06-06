<?php 
require_once('_include/session.php');
require_once('_include/config.php');
include('_include/functions.php');
$sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
$db_selected = mysql_select_db(const_mysql_db, $sql_connection);
if (!$db_selected)
    die('Can\'t select database : ' . mysql_error());    

?>
<!DOCTYPE html>

<html lang="de">
	<head>
	
		<!-- Header -->
	    <?php include('_include/header.php'); ?>
	    
	</head>
	<body>
	    
	    <!-- Navigation -->
    	<?php include('_include/navigation.php'); ?>
    	
    	<!-- Container -->	
    	<div class="container-fluid">
	    		
    		<!-- App Navigation -->
    		<?php include('_include/navigation_app.php'); ?>
    	
    		<!-- Content -->
    		<div id="appWrapper" align="center">
	            <br />
	            <h2>Boot Informationen</h2>
	            <br />
	            <div class="container-fluid">
	            	<form class="form-horizontal"> 
		            	<div class="row well" style="margin-left: 15%;">
		            		<div class="span4" align="center">	            		
			            		<div class="control-group">
			            			<label class="control-label">Bootname</label>
			            			<input class="input-medium" type="text" name="bootname" id="bootname" />
			            		</div>
			            		<div class="control-group">
			            			<label class="control-label">Baujahr</label>
			            			<input class="input-medium" type="text" name="baujahr" id="baujahr" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Konstrukteur</label>
			            			<input class="input-medium" type="text" name="konstrukteur" id="konstrukteur" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Registernummer</label>
			            			<input class="input-medium" type="text" name="registernummer" id="registernummer" />
			                    </div> 
			                    <div class="control-group">
			            			<label class="control-label">Eigner</label>
			            			<input class="input-medium" type="text" name="eigner" id="eigner" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Yachtclub</label>
			            			<input class="input-medium" type="text" name="yachtclub" id="yachtclub" />
			                    </div>        
		            		</div>
		            		<div class="span4">
		            			<div class="control-group">
			            			<label class="control-label">Typ</label>
			            			<input class="input-medium" type="text" name="typ" id="typ" />
			            		</div>
			            		<div class="control-group">
			            			<label class="control-label">Rig-Art</label>
			            			<input class="input-medium" type="text" name="rigart" id="rigart" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Rufzeichen</label>
			            			<input class="input-medium" type="text" name="rufzeichen" id="rufzeichen" />
			            		</div>
			            		<div class="control-group">
			                    	<label class="control-label">Segelzeichen</label>
			            			<input class="input-medium" type="text" name="segelzeichen" id="segelzeichen" />
			                    </div>
			                    <div class="control-group">
			                    	<label class="control-label">Versicherung</label>
			            			<input class="input-medium" type="text" name="versicherung" id="versicherung" />
			                    </div>
			                    <div class="control-group">
			                    	<label class="control-label">Heimathafen</label>
			            			<input class="input-medium" type="text" name="heimathafen" id="heimathafen" />
			                    </div>
		            		</div>
		            		<div class="span4">
		            			<div class="control-group">
			            			<label class="control-label">Breite</label>
			            			<input class="input-medium" type="text" name="breite" id="breite" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">L&auml;nge</label>
			            			<input class="input-medium" type="text" name="laenge" id="laenge" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Motor</label>
			            			<input class="input-medium" type="text" name="motor" id="motor"/>
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Tankgr&ouml;&szlig;e</label>
			            			<input class="input-medium" type="text" name="tankgroesse" id="tankgroesse" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Wassertankgr&ouml;&szlig;e</label>
			            			<input class="input-medium" type="text" name="wassertankgroesse" id="wassertankgroesse" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Abwassertankgr&ouml;&szlig;e</label>
			            			<input class="input-medium" type="text" name="abwassertankgroesse" id="abwassertankgroesse" />
			                    </div>		      
			                                          
		            		</div>
		            		<div class="span4">
		            			<div class="control-group">
			            			<label class="control-label">Tiefgang</label>
			            			<input class="input-medium" type="text" name="tiefgang" id="tiefgang" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Masth&ouml;he</label>
			            			<input class="input-medium" type="text" name="masthoehe" id="masthoehe" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Spigr&ouml;&szlig;e</label>
			            			<input class="input-medium" type="text" name="spigroesse" id="spigroesse" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Verdr&auml;ngung</label>
			            			<input class="input-medium" type="text" name="verdraengung" id="verdraengung" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Genuagr&ouml;&szlig;e</label>
			            			<input class="input-medium" type="text" name="genuagroesse" id="genuagroesse" />
			                    </div>	
			                    <div class="control-group">
			            			<label class="control-label">Gro&szlig;segelgr&ouml;&szlig;e</label>
			            			<input class="input-medium" type="text" name="grosssegelgroesse" id="grosssegelgroesse" />
			                    </div>	      
		            		</div>
                        </div>
                        <div class="control-group">
                            <input type="reset" class="btn" id="delete" value="L&ouml;schen" class="button"/>
                            <input type="submit" class="btn" id="save" name="submit" value="Speichern" class="button"/>
                        </div>  
                    </form>
	            </div>
	            <br />
	            <br />
	            <div class="appTableDiv" align="center">
	                <table class="appTable table table-hover" cellspacing="0px" cellpadding="5px">
	                    <thead>
	                        <tr>
	                            <th>Bootsname</th>
	                            <th>Bootstyp</th>
	                            <th>Konstrukteur</th>
	                            <th>Baujahr</th>
	                            <th>Heimathafen</th>
	                            <th>L&auml;nge</th>
	                            <th>Breite</th>
	                            <th>Tiefgang</th>
	                            <th>Inhaber</th>
	                            <th></th>
	                        </tr>
	                    </thead>
		                <tbody id="entries_boat">
	
	                        <?php
	                        	$bnr = $_SESSION['bnr'];
	
	                        	if (array_key_exists ('bnr' , $_GET))
	                            	$bnr = urldecode($_GET['bnr']);


		                        $sql = "SELECT * FROM ".const_mysql_boatinfo." WHERE unr =" . $bnr . ";";
		                        $result = mysql_query($sql, $sql_connection);
		                        if (!$result)
		                            die('Invalid query: ' . mysql_error());
		
		                        while ($row = mysql_fetch_array($result)) {
		                            echo("<tr class='selectable' id='" . $row['bnr'] . "'>");
		                            echo("<td>" . $row['bootname'] . "</td>");
		                            echo("<td>" . $row['typ'] . "</td>");
		                            echo("<td>" . $row['konstrukteur'] . "</td>");
		                            echo("<td>" . $row['baujahr'] . "</td>");
		                            echo("<td>" . $row['heimathafen'] . "</td>");
		                            echo("<td>" . $row['laenge'] . "</td>");
		                            echo("<td>" . $row['breite'] . "</td>");
		                            echo("<td>" . $row['tiefgang'] . "</td>");
		                            echo("<td>" . $row['eigner'] . "</td>");
		                            echo("<td style='width:30px; text-align:left;'><div class='btn-group'>");
		                            echo("<a class='btn btn-small view boat' id='" . $row['bnr'] . "'><span><i class='icon-eye-open'></i></span></a>");
		                            echo("<a class='btn btn-small remove boat' id='" . $row['bnr'] . "'><span><i class='icon-remove'></i></span></a>");
		                            echo("</div></td>");
		                            echo("</tr>");
		                        }
	                        ?>
	
	                    </tbody>
	                </table>
	                <br /><br />
	            </div>
	            <br />
	           <h2>Wetter Informationen</h2>
	            <br />
	            <div class="container-fluid">
	            	<form method="POST" class="form-horizontal"> 
                        <div class="row well" style="margin-left: 15%;">
                            <div class="span4" align="center">	            		
			            		<div class="control-group">
			            			<label class="control-label">Windst&auml;rke</label>
			            			<input class="input-medium" type="text" name="strength" id="strength" />
			            		</div>
			            		<div class="control-group">
			            			<label class="control-label">Windrichtung</label>
			            			<input class="input-medium" type="text" name="wind_direction" id="wind_direction" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Luftdruck</label>
			            			<input class="input-medium" type="text" name="airpressure" id="airpressure" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Temperatur</label>
			            			<input class="input-medium" type="text" name="temperature" id="temperature" />
			                    </div> 
			                    <div class="control-group">
			            			<label class="control-label">Wolken</label>
			            			<input class="input-medium" type="text" name="clouds" id="clouds" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Regen</label>
			            			<input class="input-medium" type="text" name="rain" id="rain" />
			                    </div>        
		            		</div>
		            		<div class="span4">
		            			<div class="control-group">
			            			<label class="control-label">Wellenh&ouml;he</label>
			            			<input class="input-medium" type="text" name="waveheight" id="waveheight" />
			            		</div>
			            		<div class="control-group">
			            			<label class="control-label">Wellenrichtung</label>
			            			<input class="input-medium" type="text" name="wave_direction" id="wave_direction" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Uhrzeit</label>
			            			<input class="input-medium" type="text" name="weather_time" id="weather_time" />
			            		</div>
			            		<div class="control-group">
			                    	<label class="control-label">Datum</label>
			            			<input class="input-medium" type="text" name="weather_date" id="weather_date" />
			                    </div>
  		            		</div>       
		            	</div>   
                        <div class="control-group">
                            <input type="reset" class="btn" id="delete" value="L&ouml;schen" class="button"/>
                            <input type="submit" class="btn" id="save_weather" name="submit_weather" value="Speichern" class="button"/>
                        </div>  
                    </form>
                </div>
	            <br />
	            <br />
	            <div class="appTableDiv" align="center">
	                <table class="appTable table table-hover" cellspacing="0px" cellpadding="5px">
	                    <thead>
	                        <tr>
	                            <th>Windst.</th>
	                            <th>Windri.</th>
	                            <th>Luftdruck</th>
	                            <th>Temp.</th>
	                            <th>Wolken</th>
	                            <th>Regen</th>
	                            <th>Wellenri.</th>
	                            <th>Wellenh&ouml;he</th>
	                            <th></th>
	                        </tr>
	                    </thead>
		                <tbody id="entries_weather">
	
	                        <?php                            
		                        $sql = "SELECT * FROM ".const_mysql_trackingPoints.";";
		                        $result = mysql_query($sql, $sql_connection);
		                        if (!$result)
		                            die('Invalid query: ' . mysql_error());
		
		                        while ($row = mysql_fetch_array($result)) {
		                        	echo("<tr class='selectable' id='" . $row['trackpointnr'] . "'>");
		                            echo("<td>" . $row['windstaerke'] . "</td>");
		                            echo("<td>" . $row['windrichtung'] . "</td>");
		                            echo("<td>" . $row['luftdruck'] . "</td>");
		                            echo("<td>" . $row['temperatur'] . "</td>");
		                            echo("<td>" . $row['wolken'] . "</td>");
		                            echo("<td>" . $row['regen'] . "</td>");
		                            echo("<td>" . $row['wellenrichtung'] . "</td>");
                                    echo("<td>" . $row['wellenhoehe'] . "</td>");
		                            echo("<td style='width:30px; text-align:left;'><div class='btn-group'>");
		                            echo("<a class='btn btn-small view weather' id='" . $row['trackpointnr'] . "'><span><i class='icon-eye-open'></i></span></a>");
		                            echo("<a class='btn btn-small remove weather' id='" . $row['trackpointnr'] . "'><span><i class='icon-remove'></i></span></a>");
		                            echo("</div></td>");
		                            echo("</tr>");
		                        }
	                        ?>
	
	                    </tbody>
	                </table>
	                <br /><br />
	            </div>
    		</div><!-- Content -->
	          
	    </div><!-- Container -->
	    
	    <!-- Menu Modal -->
		<div class="modal hide fade" id="messageBox">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h3 id="dialogTitle"></h3>
			</div>
			<div class="modal-body">
				<p id="dialogMessage"></p>
			</div>
			<div class="modal-footer">
				<a href="#" class="btn" data-dismiss="modal"><i class="icon-ok"></i> ok</a>
			</div>
		</div>
	    
	    <!-- Java-Script -->
	    <script src="../js/bootstrap/bootstrap-transition.js"></script>
	    <script src="../js/bootstrap/bootstrap-dropdown.js"></script>
	    <script src="../js/bootstrap/bootstrap-button.js"></script>
	    <script src="../js/bootstrap/bootstrap-modal.js"></script>
	    
	    <!-- Additional Java-Script -->
	    <script src="../js/app/ajax/boatinfo.js" type="text/javascript"></script>
        <script src="../js/app/ajax/weatherinfo.js" type="text/javascript"></script>
	   
    <?php @mysql_close($sql_connection); ?>
       
	</body>
</html>