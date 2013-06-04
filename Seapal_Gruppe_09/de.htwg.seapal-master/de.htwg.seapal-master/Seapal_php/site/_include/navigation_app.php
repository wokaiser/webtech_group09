<?php $filename = str_replace(".php", "", basename($_SERVER["SCRIPT_NAME"])); ?>

<!-- App Navigation -->
<div class="navbar">
	<div class="navbar-inner">
		<div class="container">		
			<ul class="nav">
				<li id="button_app_map" <?php if ($filename == "app_map") echo("class='active'"); ?>><a href="app_map.php">Map</a></li>
				<li id="button_app_boatinfo" <?php if ($filename == "app_boatinfo") echo("class='active'"); ?>><a href="app_boatinfo.php">Logbuch</a></li>
				<li id="button_app_tripinfo" <?php if ($filename == "app_trip" || $filename == "app_tripinfo" || $filename == "app_waypoint" ) echo("class='active'"); ?>><a href="app_trip.php">Routen</a></li>
                <!--Drop down for weather layer selection-->
                <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" <?php if ($filename != "app_map") echo("style='display: none;'>"); ?>>Map Options<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <!--use checked in class for default checked items-->
                        <li><a id="wl_seamark" class="wl_chooser multicheck" href="#">Seamark
                            <!--If checked is in class of wl_seamark used, use icon-ok in this span class-->
                            <span class="pull-right"></span>
                        </a></li>
                
                        <li><a id="wl_air" class="wl_chooser multicheck" href="#">Air temparature
                            <span class="pull-right"></span>
                        </a></li>
                        
                        <li><a id="wl_wind" class="wl_chooser multicheck" href="#">Wind
                            <span class="pull-right"></span>
                        </a></li>
                        
                        <li><a id="wl_mapOverlay" class="wl_chooser multicheck" href="#">Weather Info
                            <span class="pull-right"></span>
                        </a></li>
                        
                        <li><a id="wl_followPosition" class="wl_chooser multicheck" href="#">Follow position
                            <span class="pull-right"></span>
                        </a></li>
                    </ul>
                </li>
			</ul>
			<ul class="navbar-form pull-right" style="list-style-type: none;">
				<li><a class="btn" id="startSimulation"><i class="icon-play"></i></a><li>
			</ul>
		</div>
	</div>
</div>

<!-- Java-Script -->
<script src="../js/bootstrap/bootstrap-dropdown.js"></script>