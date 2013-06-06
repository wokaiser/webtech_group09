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
	            <div class="appTableDiv" id="appRoutelist" align="center">
	                <table class="appTable table table-hover" id="tableLinesClickable" cellspacing="0px" cellpadding="5px">
	                    <thead>
	                        <tr>
	                            <th>Titel</th>
	                            <th>Von</th>
	                            <th>Nach</th>   
	                            <th></th>
	                        </tr>
	                    </thead>
	                    <tbody id="entries">
	                        <?php

	                        	$bnr = $_SESSION['bnr'];
	
	                        	if (array_key_exists ('bnr' , $_GET))
	                            	$bnr = urldecode($_GET['bnr']);

	                        	$sql = "SELECT * FROM ".const_mysql_trip." WHERE bnr =" . $bnr . ";";
		                        $result = mysql_query($sql, $sql_connection);
		                        if (!$result)
		                            die('Invalid query: ' . mysql_error());
	
		                        while ($row = mysql_fetch_array($result)) {
		
		                            echo("<tr class='selectable'>");
		                            echo("<td>" . $row['titel'] . "</td>");
		                            echo("<td>" . $row['von'] . "</td>");
		                            echo("<td>" . $row['nach'] . "</td>");
		                            echo("<td style='width:30px; text-align:right;'><div class='btn-group'>");
			                        echo("<a class='btn btn-small view' id='" . $row['tnr'] . "'><span><i class='icon-eye-open'></i></span></a>");
			                        echo("<a class='btn btn-small remove' id='" . $row['tnr'] . "'><span><i class='icon-remove'></i></span></a>");
			                        echo("<a href='app_tripinfo.php?tnr=" . $row['tnr'] . "' class='btn btn-small redirect' id='" . $row['tnr'] . "'><span><i class='icon-chevron-right'></i></span></a>");
			                        echo("</div></td>");
		                            echo("</tr>");
		                        }
	                        ?>
	                    </tbody>
	                </table>
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
        
        <div class="info" id="infoMessage" style="display: none;">
            <div class="infoPicture span4"></div>
            <div class="messageText span8" id="infoMessageText">Some info msg.</div>
        </div>
        
        <div class="success" id="successMessage" style="display: none;">
            <div class="successPicture span4"></div>
            <div class="messageText span8" id="successMessageText">Some success msg.</div>
        </div>
        
        <div class="warning" id="warningMessage" style="display: none;">
            <div class="warningPicture span4"></div>
            <div class="messageText span8" id="warningMessageText">Some warning msg.</div>
        </div>
        
        <div class="error" id="errorMessage" style="display: none;">
            <div class="errorPicture span4"></div>
            <div class="messageText span8" id="errorMessageText">Some error msg.</div>
        </div>

	    
	    <!-- Java-Script -->
	    <script src="../js/bootstrap/bootstrap-dropdown.js"></script>
	    <script src="../js/bootstrap/bootstrap-button.js"></script>
	    <script src="../js/bootstrap/bootstrap-modal.js"></script>
	    <script src="../js/bootstrap/bootstrap-transition.js"></script>
	    <script src="../js/bootstrap/bootstrap-collapse.js"></script>
	    <script src="../js/bootstrap/bootstrap-affix.js"></script>
        <script src="../js/messageBox/messageBox.js"></script>
	    

	    <!-- Additional Java-Script -->
        <script src="../js/js-session/json-serialization.js" type="text/javascript"></script>
	    <script src="../js/js-session/session.js" type="text/javascript"></script>
	    <script src="../js/js-session/mySession.js" type="text/javascript"></script>
	    <script src="../js/app/ajax/trip.js" type="text/javascript"></script>
	    
	</body>
<html>
