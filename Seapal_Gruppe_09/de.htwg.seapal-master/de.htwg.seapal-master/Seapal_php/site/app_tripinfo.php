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
	            <h2>Routen Informationen</h2>
	            <br />
	            <br />
	            <br />
	            <div class="container-fluid" align="center">
	            	<form class="form-horizontal"> 
		            	<div class="row well" style="margin-left: 15%;" align="center">
		            		<div class="span4" align="center">	            		
			            		<div class="control-group">
			            			<label class="control-label">Name</label>
			            			<input class="input-medium" type="text" id="name"/>
			            		</div>
			            		<div class="control-group">
			            			<label class="control-label">Time</label>
			            			<input class="input-medium" type="date" id="wdate"/>
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Date</label>
			            			<input class="input-medium" type="date" id="wtime"/>
			                    </div>
		            		</div>
		            		<div class="span4">
		            			<div class="control-group">
			            			<label class="control-label">Latitude</label>
			            			<input class="input-medium" type="text" id="lat"/>
			            		</div>
			            		<div class="control-group">
			            			<label class="control-label">Longitude</label>
			            			<input class="input-medium" type="text" id="lng"/>
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Fahrt nach</label>
			            			<select name="fahrtziel" id="marker" style="width: 165px;"></select>
			                    </div>
		            		</div>
		            		<div class="span4">
		            			<div class="control-group">
			            			<label class="control-label">COG</label>
			            			<input class="input-medium" type="text" id="cog"/>
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">SOG</label>
			            			<input class="input-medium" type="text" id="sog"/>
			                    </div>  
			                    <div class="control-group">
			                    	<label class="control-label">Manoever</label>
			            			<select name="manoever" id="manoever" style="width: 165px;"></select>
			                    </div>                 
		            		</div>
		            		<div class="span4">
		            			<div class="control-group">
			            			<label class="control-label">BTM</label>
			            			<input class="input-medium" type="text" id="btm"/>
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">DTM</label>
			            			<input class="input-medium" type="text" id="dtm"/>
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Vorsegel</label>
			            			<select name="vorsegel" id="vorsegel" style="width: 165px;"></select>
			            		</div>
		            		</div>
		            	</div>      	 
		            	<div class="control-group">
			            	<input type="reset" class="btn" id="delete" value="L&ouml;schen" class="button"/>
			                <input type="submit" class="btn" id="save" name="submit" value="Speichern" class="button"/>
			            </div>  
	            	</div>
	            </div>
	            <div class="appTableDiv" id="tripinfo" align="center">
	                <table class="appTable table table-hover" cellspacing="0px" cellpadding="5px">
	                    <thead>
	                        <tr>
	                            <th>Name</th>
	                            <th>Breite</th>
	                            <th>Laenge</th>
	                            <th>Peilung</th>
	                            <th>Abstand</th>
	                            <th>Manoever</th>     
	                            <th></th>
	                        </tr>
	                    </thead>
	                    <tbody id="entries">
	                        <?php
	                        $tnr = 1;
	
	                        if ($_GET['tnr'])
	                            $tnr = urldecode($_GET['tnr']);
	
	                        $conn = mysql_connect("localhost", "root", "root");
	
	                        $db_selected = mysql_select_db('SeaPal', $conn);
	
	                        if (!$db_selected) {
	                            die('Can\'t use foo : ' . mysql_error());
	                        }
	
	                        $sql = "SELECT * FROM wegpunkte WHERE tnr =" . $tnr . ";";
	
	                        $result = mysql_query($sql, $conn);
	
	                        if (!$result) {
	                            die('Invalid query: ' . mysql_error());
	                        }
	
	                        while ($row = mysql_fetch_array($result)) {
	
	                            echo("<tr class='selectable'>");
	                            echo("<td><span class='wnr' style='display: none;'>" . $row['wnr'] . "</span>" . $row['name'] . "</td>");
	                            echo("<td>" . $row['lat'] . "</td>");
	                            echo("<td>" . $row['lng'] . "</td>");
	                            echo("<td>" . $row['btm'] . "</td>");
	                            echo("<td>" . $row['dtm'] . "</td>");
	                            echo("<td>" . $row['manoever'] . "</td>");
	                            echo("<td style='width:30px; text-align:right;'><div class='btn-group'>");
	                            echo("<a class='btn btn-small view' id='" . $row['wnr'] . "'><span><i class='icon-eye-open'></i></span></a>");
		                        echo("<a class='btn btn-small remove' id='" . $row['wnr'] . "'><span><i class='icon-remove'></i></span></a>");
		                        echo("<a href='app_waypoint.php?wnr=" . $row['wnr'] . "&tnr=" . $tnr . "' class='btn btn-small redirect' id='" . $row['wnr'] . "'><span><i class='icon-chevron-right'></i></span></a>");
		                        echo("</div></td>");
	                            echo("</tr>");
	                        }
	
	                        mysql_close($conn);
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
		
		<!-- Java-Script -->
	    <script src="../js/bootstrap/bootstrap-dropdown.js"></script>
	    <script src="../js/bootstrap/bootstrap-button.js"></script>
	    <script src="../js/bootstrap/bootstrap-modal.js"></script>
	    <script src="../js/bootstrap/bootstrap-transition.js"></script>
	    <script src="../js/bootstrap/bootstrap-collapse.js"></script>
		
		<!-- Additional Java-Script -->
		<script src="../js/app/ajax/tripinfo.js" type="text/javascript"></script>
		
	</body>
<html>