<?php 
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
	            <h2>Routen</h2>
	            <br />
	            <div class="container-fluid">
	            	<form class="form-horizontal"> 
		            	<div class="row well" style="margin-left: 15%;">
		            		<div class="span4" align="center">	            		
			            		<div class="control-group">
			            			<label class="control-label">Titel</label>
			            			<input type="text" name="titel" id="titel"/>
			            		</div>
			            		<div class="control-group">
			            			<label class="control-label">Von</label>
			            			<input type="text" name="von" id="von"/>
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Nach</label>
			            			<input type="text" name="von" id="nach"/>
			                    </div>        
		            		</div>
		            		<div class="span4">
		            			<div class="control-group">
			            			<label class="control-label">Start</label>
			            			<input type="text" name="titel" id="tstart"/>
			            		</div>
			            		<div class="control-group">
			            			<label class="control-label">Ende</label>
			            			<input type="text" name="von" id="tende"/>
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Dauer</label>
			            			<input type="text" name="von" id="tdauer"/>
			                    </div>
		            		</div>
		            		<div class="span4">
		            			<div class="control-group">
			            			<label class="control-label">Skipper</label>
			            			<input type="text" name="von" id="skipper"/>
			                    </div>
			                    <div class="control-group">
			            			<label class="control-label">Crew</label>
			            			<textarea cols="20" rows="3" id="crew"></textarea>
			                    </div>			                            
		            		</div>
		            		<div class="span4">
		            			<div class="control-group">
			            			<label class="control-label">Motor</label>
			            			<input type="text" name="motor" id="motor"/>
			                    </div>	
			                    <div class="control-group">
			            			<label class="control-label"></label>
			            			<span>Tank gefüllt<input type="checkbox" value="false" name="tank" id="tank" style="margin-left:20px; margin-top:-5px;"/></span>
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
	            <div class="appTableDiv" id="appRoutelist" align="center">
	                <table class="appTable table table-hover" id="tableLinesClickable" cellspacing="0px" cellpadding="5px">
	                    <thead>
	                        <tr>
	                            <th>Titel</th>
	                            <th>Skipper</th>
	                            <th>Start</th>
	                            <th>Ende</th>
	                            <th>Dauer</th>
	                            <th>Motor</th>     
	                            <th></th>
	                        </tr>
	                    </thead>
	                    <tbody id="entries">
	                        <?php
	                        	$sql = "SELECT * FROM ".const_mysql_trip.";";
		                        $result = mysql_query($sql, $sql_connection);
		                        if (!$result)
		                            die('Invalid query: ' . mysql_error());
	
		                        while ($row = mysql_fetch_array($result)) {
		
		                            echo("<tr class='selectable'>");
		                            echo("<td>" . $row['titel'] . "</td>");
		                            echo("<td>" . $row['skipper'] . "</td>");
		                            echo("<td>" . $row['tstart'] . "</td>");
		                            echo("<td>" . $row['tende'] . "</td>");
		                            echo("<td>" . $row['tdauer'] . "</td>");
		                            echo("<td>" . $row['motor'] . "</td>");
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
	    
	    <!-- Java-Script -->
	    <script src="../js/bootstrap/bootstrap-dropdown.js"></script>
	    <script src="../js/bootstrap/bootstrap-button.js"></script>
	    <script src="../js/bootstrap/bootstrap-modal.js"></script>
	    <script src="../js/bootstrap/bootstrap-transition.js"></script>
	    <script src="../js/bootstrap/bootstrap-collapse.js"></script>
	    <script src="../js/bootstrap/bootstrap-affix.js"></script>
	    
	    <!-- Additional Java-Script -->
	    <script src="../js/app/ajax/trip.js" type="text/javascript"></script>
	    
	</body>
<html>
