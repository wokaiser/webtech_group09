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
	           <h2>Trackingpoint Informationen</h2>
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
			                    <div class="control-group">
			            			<label class="control-label">DTM</label>
			            			<input class="input-medium" type="text" name="dtm" id="dtm" />
			                    </div> 
			                    <div class="control-group">
			            			<label class="control-label">SOG</label>
			            			<input class="input-medium" type="text" name="sog" id="sog" />
			                    </div>
  		            		</div>
  		            		<div class="span4">
  		            			<div class="control-group">
			            			<label class="control-label">Marker</label>
			            			<input class="input-medium" type="text" name="marker" id="marker" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">BTM</label>
			            			<input class="input-medium" type="text" name="btm" id="btm" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">COG</label>
			            			<input class="input-medium" type="text" name="cog" id="cog" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Man&ouml;ver</label>
			            			<input class="input-medium" type="text" name="manoever" id="manoever" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Vorsegel</label>
			            			<input class="input-medium" type="text" name="vorsegel" id="vorsegel" />
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Motor</label>
			            			<input class="input-medium" type="text" name="motor" id="motor" />
			                    </div>
  		            		</div>
  		            		<div class="span4">  		            			
			                    <div class="control-group">
			            			<label class="control-label">Tank</label>
			            			<input class="input-medium" type="text" name="tank" id="tank" />
			                    </div>
  		            		</div>
		            	</div>   
                        <div class="control-group">
                            <input type="reset" class="btn" id="delete" value="L&ouml;schen" class="button"/>
                            <input type="submit" class="btn" id="save_trackingpoint" name="submit_weather" value="Speichern" class="button"/>
                        </div>  
                    </form>
                </div>
	            <br />
	            <br />
	            <div class="appTableDiv" align="center">
	                <table class="appTable table table-hover" cellspacing="0px" cellpadding="5px">
	                    <thead>
	                        <tr>
	                            <th>Marker</th>
	                            <th>BTM</th>
	                            <th>DTM</th>
	                            <th>SOG</th>
	                            <th>COG</th>
	                            <th>Man&ouml;ver</th>
	                            <th>Vorsegel</th>
	                            <th>Datum</th>
	                            <th>Uhrzeit</th>
	                            <th>Motor</th>
	                            <th>Tank</th>
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
		                <tbody id="entries_trackingpoint">
	
	                        <?php
	                        	$tracknr = 0;
	
	                        	if (array_key_exists ('tracknr' , $_GET))
	                            	$tracknr = urldecode($_GET['tracknr']);

								$sql = "SELECT * FROM ".const_mysql_trackingPoints." WHERE tracknr =" . $tracknr . ";";
		                        $result = mysql_query($sql, $sql_connection);

		                        if (!$result)
		                            die('Invalid query: ' . mysql_error());
		
		                        while ($row = mysql_fetch_array($result)) {
		                        	echo("<tr class='selectable' id='" . $row['trackpointnr'] . "'>");
		                        	echo("<td>" . $row['marker'] . "</td>");
                                    echo("<td>" . $row['btm'] . "</td>");
                                    echo("<td>" . $row['dtm'] . "</td>");
                                    echo("<td>" . $row['sog'] . "</td>");
                                    echo("<td>" . $row['cog'] . "</td>");
                                    echo("<td>" . $row['manoever'] . "</td>");
                                    echo("<td>" . $row['vorsegel'] . "</td>");
                                    echo("<td>" . $row['wdate'] . "</td>");
                                    echo("<td>" . $row['wtime'] . "</td>");
                                    echo("<td>" . $row['motor'] . "</td>");
                                    echo("<td>" . $row['tank'] . "</td>");
		                            echo("<td>" . $row['windstaerke'] . "</td>");
		                            echo("<td>" . $row['windrichtung'] . "</td>");
		                            echo("<td>" . $row['luftdruck'] . "</td>");
		                            echo("<td>" . $row['temperatur'] . "</td>");
		                            echo("<td>" . $row['wolken'] . "</td>");
		                            echo("<td>" . $row['regen'] . "</td>");
		                            echo("<td>" . $row['wellenrichtung'] . "</td>");
                                    echo("<td>" . $row['wellenhoehe'] . "</td>");                                    
		                            echo("<td style='width:30px; text-align:left;'><div class='btn-group'>");
		                            echo("<a class='btn btn-small view trackingpoint' id='" . $row['trackpointnr'] . "'><span><i class='icon-eye-open'></i></span></a>");
		                            echo("<a class='btn btn-small remove trackingpoint' id='" . $row['trackpointnr'] . "'><span><i class='icon-remove'></i></span></a>");
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
        <script src="../js/app/ajax/trackingpoint.js" type="text/javascript"></script>
	   
    <?php @mysql_close($sql_connection); ?>
       
	</body>
</html>