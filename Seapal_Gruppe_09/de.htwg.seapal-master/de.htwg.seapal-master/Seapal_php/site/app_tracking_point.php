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