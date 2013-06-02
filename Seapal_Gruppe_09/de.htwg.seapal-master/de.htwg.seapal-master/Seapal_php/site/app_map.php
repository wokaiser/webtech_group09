<?php require_once('_include/session.php'); ?>
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
    		<div id="routeMenuContainer">
            	<div id="routeMenu" class="well">
            		<h4>Routen Menü</h4>
	            	<div class="btn-group btn-group-vertical">
	                    <input type="button" class="btn" value="l&ouml;schen" id="deleteRouteButton" class="routeButton" onclick="javascript: deleteRoute()" />
	                    <input type="button" class="btn" value="speichern" id="saveRouteButton" class="routeButton" onclick="javascript: saveRoute()" />
	                    <input type="button" class="btn" value="beenden" id="stopRouteButton" class="routeButton" onclick="javascript: stopRouteMode()" />
	                </div>
	            	<br><br>
	                <div id="route_distance">Routen-L&auml;nge: <span id="route_distance_number"></span> m</div>
	            </div>
	        </div>
	        
	        <!-- Distance Menu -->
	        <div id="distanceToolContainer">
	            <div id="distanceToolMenu" class="well">
	            	<h4>Distanztool</h4>
	            	<input type="button" class="btn" value="beenden" id="stopDistanceToolButton" class="distanceToolbutton" onclick="javascript: stopDistanceToolMode()" />
	            	<br><br>
	            	<div id="distanceTool_distance">Distanz: <span id="distanceTool_number"></span> m</div>
	            </div>
	        </div>
	        
	         <!-- Navigation Menu -->
	        <div id="navigationContainer">
	            <div id="navigationMenu" class="well">
	            	<h4>Navigation</h4>
	            	<input type="button" class="btn" value="beenden" id="stopNavigationButton" class="distanceToolbutton" onclick="javascript: stopNavigationMode()" />
	            	<br><br>
	            	<div id="navigation_distance">Distanz: <span id="navigation_number"></span> m</div>
	            </div>
	        </div>
	        
	        <!-- Current Position -->
	        <div id="followCurrentPositionContainer">
	            <div id="followCurrentPosition_button" class="well">
	                <input type="button" class="btn" value="Eigener Position folgen" id="followCurrentPositionbutton" onclick="javascript: toggleFollowCurrentPosition()" />
	            </div>
	        </div>
	        
	        <!-- Map -->
	        <div id="appWrapper">
	            <div id="map_canvas">
                
                </div>
                
                <div id="map_overlay" style="hidden">

                </div>
            </div>
 
	        <!-- Context Menus -->
	        <div id="temporaryMarkerContextMenu"></div>
	        <div id="fixedMarkerContextMenu"></div>
	        <div id="routeContextMenu_active"></div>
	        <div id="routeContextMenu_inactive"></div>	
			<div id="chat" align="center">
                <div id="chat-area" style="height:200px; width:200px; background-color: white; overflow: auto;"></div>
			</div>
		
		</div><!-- Container -->
	    
	    <!-- Java-Script -->
	    <script src="../js/bootstrap/bootstrap-dropdown.js"></script>
	    <script src="../js/bootstrap/bootstrap-modal.js"></script>
	    <script src="../js/bootstrap/bootstrap-transition.js"></script>
	    <script src="../js/bootstrap/bootstrap-button.js"></script>
	    <script src="../js/bootstrap/bootstrap-collapse.js"></script>
	    <script src="../js/bootstrap/bootstrap-affix.js"></script>
	    
	    <!-- Additional Java-Script -->
        <script src="../js/js-session/json-serialization.js" type="text/javascript"></script>
	    <script src="../js/js-session/session.js" type="text/javascript"></script>
	    <script src="../js/js-session/mySession.js" type="text/javascript"></script>
	    <script src="../js/app/map/fancywebsocket.js" type="text/javascript" ></script>
	    <script src="../js/app/map/chat.js" type="text/javascript" ></script>
	    <script src="../js/app/map/labels.js" type="text/javascript"></script>
	    <script src="../js/app/map/map.js" type="text/javascript"></script>
	    <script src="../js/app/map/map_routes.js" type="text/javascript"></script>
	    <script src="../js/app/map/validation.js" type="text/javascript"></script>
	    <script src="../js/app/map/contextMenu.js" type="text/javascript"></script>
	    <script src="../js/app/map/TxtOverlay.js" type="text/javascript"></script>
	</body>
</html>