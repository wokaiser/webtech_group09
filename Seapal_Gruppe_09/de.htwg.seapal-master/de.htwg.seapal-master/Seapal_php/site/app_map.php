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
	  	<?php include('_include/header.php'); include('_include/header_app.php'); ?>
	  	
  	</head>
  	<body onload="initialize();">

	  	<!-- Navigation -->
    	<?php include('_include/navigation.php'); ?>

    	<!-- Container -->
    	<div class="container-fluid">
    		
    		<!-- App Navigation -->
    		<?php include('_include/navigation_app.php'); ?>
    		
    		<!-- Route Menu -->
    		<div id="routeMenuContainer" style="display: none;">
            	<div id="routeMenu" class="well">
            		<h4>Route Menu</h4>
	            	<div class="btn-group btn-group-vertical">
                        <input type='text'   class="routeInfoInput" id='titel'   placeholder='Titel' size='30' maxlength='30'/><br/>
                        <input type='text'   class="routeInfoInput" id='von'     placeholder='From Location' size='30' maxlength='60'/><br/>
                        <input type='text'   class="routeInfoInput" id='nach'    placeholder='To Location' size='30' maxlength='60'/><br/>
	                    <input type="button" class="routeInfoInput btn" value="Save Route" id="saveRouteButton" class="routeButton" onclick="javascript: saveRoute()" />
	                    <input type="button" class="routeInfoInput btn" value="Delete Route" id="deleteRouteButton" class="routeButton" onclick="javascript: deleteRoute()" />
                        <input type="button" class="routeInfoInput btn" value="Start Tracking" id="startTrackingButton" class="routeButton" onclick="javascript: startTracking()" />                        
	                    <input type="button" class="routeInfoInput btn" value="Quit Menu" id="stopRouteButton" class="routeButton" onclick="javascript: stopRouteMode()" />
	                </div>
	            	<br><br>
	                <div id="route_distance">Route lenght: <span id="route_distance_number"></span> m</div>
	            </div>
	        </div>
	        
	        <!-- Distance Menu -->
	        <div id="distanceToolContainer" style="display: none;">
	            <div id="distanceToolMenu" class="well">
	            	<h4>Distanztool</h4>
	            	<input type="button" class="btn" value="beenden" id="stopDistanceToolButton" class="distanceToolbutton" onclick="javascript: stopDistanceToolMode()" />
	            	<br><br>
	            	<div id="distanceTool_distance">Distance: <span id="distanceTool_number"></span> m</div>
	            </div>
	        </div>
	        
	         <!-- Navigation Menu -->
	        <div id="navigationContainer" style="display: none;">
	            <div id="navigationMenu" class="well">
	            	<h4>Navigation</h4>
	            	<input type="button" class="btn" value="beenden" id="stopNavigationButton" class="distanceToolbutton" onclick="javascript: stopNavigationMode()" />
	            	<br><br>
	            	<div id="navigation_distance">Distance: <span id="navigation_number"></span> m</div>
	            </div>
	        </div>
              
    		<!-- Tracking Menu -->
    		<div id="trackingMenuContainer" style="display: none;">
            	<div id="trackingMenu" class="well">
            		<h4>Tracking Menu</h4>
	            	<div class="btn-group btn-group-vertical">
                        <input type='text'   class="trackInfoInput" id='trackTitel'   placeholder='Titel' size='30' maxlength='30'/><br/>
                        <input type='text'   class="trackInfoInput" id='skipper' placeholder='Skipper' size='30' maxlength='60'/><br/>
                        <input type='text'   class="trackInfoInput" id='crew'    placeholder='Crew' size='30' maxlength='60'/><br/>
                        <input type='text'   class="trackInfoInput" id='tstart'  placeholder='Start of tracking' size='30' maxlength='60'/><br/>
                        <input type='text'   class="trackInfoInput" id='tende'   placeholder='End of tracking' size='30' maxlength='60'/><br/>
                        <input type='text'   class="trackInfoInput" id='tdauer'  placeholder='Tracking duration' size='30' maxlength='60'/><br/>
	                    <input type="button" class="trackInfoInput btn" value="Save Track" id="saveTrackButton" class="routeButton" onclick="javascript: saveTrackingRoute()" />
	                    <input type="button" class="trackInfoInput btn" value="Delete Track" id="deleteTrackButton" class="routeButton" onclick="javascript: deleteTrack()" />                      
	                    <input type="button" class="trackInfoInput btn" value="Quit Menu" id="stopTrackingButton" class="routeButton" onclick="javascript: stopTrackingMode()" />
	                </div>
	            	<br><br>
	                <div id="tracking_distance">Track lenght: <span id="tracking_number"></span> m</div>
	            </div>
	        </div>
	        
	        <!-- Map -->
	        <div id="appWrapper">
	            <div id="map_canvas">
                
                </div>
                
                <div id="map_overlay" style="display: none;">

                </div>
                
                <div id="weatherForecast_overlay" style="display: none;">

                </div>
            </div>
 
	        <!-- Context Menus -->
	        <div id="temporaryMarkerContextMenu"></div>
	        <div id="fixedMarkerContextMenu"></div>
	        <div id="routeContextMenu_active" class="routeContextMenu_active"></div>
	        <div id="routeContextMenu_inactive" class="routeContextMenu_inactive"></div>
	        <div id="trackingContextMenu_active" class="trackingContextMenu_active"></div>
	        <div id="trackingContextMenu_inactive" class="trackingContextMenu_inactive"></div>
		
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
	    <script src="../js/bootstrap/bootstrap-dropdown.js"></script>
	    <script src="../js/bootstrap/bootstrap-modal.js"></script>
	    <script src="../js/bootstrap/bootstrap-transition.js"></script>
	    <script src="../js/bootstrap/bootstrap-button.js"></script>
	    <script src="../js/bootstrap/bootstrap-collapse.js"></script>
	    <script src="../js/bootstrap/bootstrap-affix.js"></script>
        <script src="../js/messageBox/messageBox.js"></script>
	    
	    <!-- Additional Java-Script -->
	    <script src="../js/app/map/fancywebsocket.js" type="text/javascript" ></script>
	    <script src="../js/app/map/labels.js" type="text/javascript"></script>
	    <script src="../js/app/map/map.js" type="text/javascript"></script>
	    <script src="../js/app/map/map_routes.js" type="text/javascript"></script>
	    <script src="../js/app/map/tracking.js" type="text/javascript"></script>
	    <script src="../js/app/map/validation.js" type="text/javascript"></script>
	    <script src="../js/app/map/contextMenu.js" type="text/javascript"></script>
	    <script src="../js/app/map/TxtOverlay.js" type="text/javascript"></script>
	</body>
</html>