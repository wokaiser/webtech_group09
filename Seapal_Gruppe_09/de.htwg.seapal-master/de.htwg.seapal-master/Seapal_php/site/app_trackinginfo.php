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
	            <div class="appTableDiv" align="center">
	                <table class="appTable table table-hover" cellspacing="0px" cellpadding="5px">
	                    <thead>
	                        <tr>
	                            <th>Titel</th>
	                            <th>Skipper</th>
	                            <th>Crew</th>
	                            <th>Start</th>
	                            <th>Ende</th>
	                            <th>Dauer</th>
	                            <th></th>
	                        </tr>
	                    </thead>
		                <tbody id="entries_tracking">
	
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
		                            echo("<td>" . $row['titel'] . "</td>");
		                            echo("<td>" . $row['skipper'] . "</td>");
		                            echo("<td>" . $row['crew'] . "</td>");
		                            echo("<td>" . $row['tstart'] . "</td>");
		                            echo("<td>" . $row['tende'] . "</td>");
		                            echo("<td>" . $row['tdauer'] . "</td>");
		                            echo("<td style='width:30px; text-align:right;'><div class='btn-group'>");
		                            echo("<a class='btn btn-small view tracking' id='" . $row['tracknr'] . "'><span><i class='icon-eye-open'></i></span></a>");
		                            echo("<a class='btn btn-small remove tracking' id='" . $row['tracknr'] . "'><span><i class='icon-remove'></i></span></a>");
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
        
        <div class="messageBox infoMessageBox" id="infoMessageBox" style="display: none;">
            <div class="infoMessageBoxPicture span4"></div>
            <div class="defaultMessageBoxText span8" id="infoMessageBoxText">Some info msg.</div>
        </div>
        
        <div class="messageBox successMessageBox" id="successMessageBox" style="display: none;">
            <div class="successMessageBoxPicture span4"></div>
            <div class="defaultMessageBoxText span8" id="successMessageBoxText">Some success msg.</div>
        </div>
        
        <div class="messageBox warningMessageBox" id="warningMessageBox" style="display: none;">
            <div class="warningMessageBoxPicture span4"></div>
            <div class="defaultMessageBoxText span8" id="warningMessageBoxText">Some warning msg.</div>
        </div>
        
        <div class="messageBox errorMessageBox" id="errorMessageBox" style="display: none;">
            <div class="errorMessageBoxPicture span4"></div>
            <div class="defaultMessageBoxText span8" id="errorMessageBoxText">Some error msg.</div>
        </div>
	    
	    <!-- Java-Script -->
	    <script src="../js/bootstrap/bootstrap-transition.js"></script>
	    <script src="../js/bootstrap/bootstrap-dropdown.js"></script>
	    <script src="../js/bootstrap/bootstrap-button.js"></script>
	    <script src="../js/bootstrap/bootstrap-modal.js"></script>
        <script src="../js/messageBox/messageBox.js"></script>
	    
	    <!-- Additional Java-Script -->
	   
    <?php @mysql_close($sql_connection); ?>
    <script src="../js/app/ajax/tracking.js" type="text/javascript"></script>
       
	</body>
</html>