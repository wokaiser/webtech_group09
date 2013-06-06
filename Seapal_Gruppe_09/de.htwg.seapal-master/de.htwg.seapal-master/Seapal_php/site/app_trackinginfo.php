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
	           	<h2>Tracking Information</h2>
	            <br />
	            <div class="container-fluid" align="center">
	            	<form class="form-horizontal"> 
		            	<div class="row well" align="center">
		            		<div class="span4">
			            		<div class="control-group">
			            			<label class="control-label">Skipper</label>
			            			<input class="input-medium" type="text" name="skipper" id="skipper" />
		            			</div>
		            		</div>
		            		<div class="span4">
			            		<div class="control-group">
			            			<label class="control-label">Crew</label>
			            			<input class="input-medium" type="text" name="crew" id="crew" />
			                    </div>
		                    </div>
		                    <div class="span4">
			                    <div class="control-group">
			            			<label class="control-label">Start</label>
			            			<input class="input-medium" type="text" name="start" id="start" />
			                    </div>
		                    </div>
		                    <div class="span4">
			                    <div class="control-group">
			            			<label class="control-label">Ende</label>
			            			<input class="input-medium" type="text" name="end" id="end" />
			                    </div>
		                    </div>
		                    <div class="span4">
			                    <div class="control-group">
			            			<label class="control-label">Dauer</label>
			            			<input class="input-medium" type="text" name="duration" id="duration" />
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
	                            <th>Skipper</th>
	                            <th>Crew</th>
	                            <th>Start</th>
	                            <th>Ende</th>
	                            <th>Dauer</th>
	                            <th></th>
	                        </tr>
	                    </thead>
		                <tbody id="entries_trackings">
	
	                        <?php
	                        	$tnr = -1;
	
	                        	if (array_key_exists ('tnr' , $_GET))
	                            	$tnr = urldecode($_GET['tnr']);

	                        	if ($tnr == -1) {
			                        $sql = "SELECT * FROM ".const_mysql_tracking.";";			                        
		                    	} else {
									$sql = "SELECT * FROM ".const_mysql_tracking." WHERE tnr =" . $tnr . ";";
		                    	}
		                    	$result = mysql_query($sql, $sql_connection);
			                        if (!$result)
			                            die('Invalid query: ' . mysql_error());
		
		                        while ($row = mysql_fetch_array($result)) {
		                        	echo("<tr class='selectable'>");
		                            echo("<td>" . $row['skipper'] . "</td>");
		                            echo("<td>" . $row['crew'] . "</td>");
		                            echo("<td>" . $row['tstart'] . "</td>");
		                            echo("<td>" . $row['tende'] . "</td>");
		                            echo("<td>" . $row['tdauer'] . "</td>");
		                            echo("<td style='width:30px; text-align:right;'><div class='btn-group'>");
		                            echo("<a class='btn btn-small view weather' id='" . $row['tracknr'] . "'><span><i class='icon-eye-open'></i></span></a>");
		                            echo("<a class='btn btn-small remove weather' id='" . $row['tracknr'] . "'><span><i class='icon-remove'></i></span></a>");
		                            echo("<a href='app_tracking_point.php?tracknr=" . $row['tracknr'] . "' class='btn btn-small redirect' id='" . $row['tracknr'] . "'><span><i class='icon-chevron-right'></i></span></a>");
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
	   
    <?php @mysql_close($sql_connection); ?>
       
	</body>
</html>