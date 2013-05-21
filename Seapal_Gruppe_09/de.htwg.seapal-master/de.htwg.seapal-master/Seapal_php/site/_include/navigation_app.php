<?php $filename = str_replace(".php", "", basename($_SERVER["SCRIPT_NAME"])); ?>

<!-- App Navigation -->
<div class="navbar">
	<div class="navbar-inner">
		<div class="container">		
			<ul class="nav">
				<li <?php if ($filename == "app_map") echo("class='active'"); ?>><a href="app_map.php">Map</a></li>
				<li <?php if ($filename == "app_boatinfo") echo("class='active'"); ?>><a href="app_boatinfo.php">Logbuch</a></li>
				<li <?php if ($filename == "app_trip" || $filename == "app_tripinfo" || $filename == "app_waypoint" ) echo("class='active'"); ?>><a href="app_trip.php">Routen</a></li>
			</ul>
			<ul class="navbar-form pull-right" style="list-style-type: none;">
				<li><a class="btn" id="startSimulation"><i class="icon-play"></i></a><li>
			</ul>
		</div>
	</div>
</div>