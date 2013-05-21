<!DOCTYPE html>

<html lang="de">
  	<head>
  	
  		<!-- Header -->
	  	<?php include('_include/header.php'); ?>
	  	
        <!-- Stylesheets -->
        <link rel="stylesheet" href="../css/coolcarousel/carousel.css" type="text/css">   
		<script src="http://code.jquery.com/jquery-1.8.2.min.js" type="text/javascript"></script>
		<script src="../js/coolcarousel/jquery.carouFredSel-6.0.4-packed.js" type="text/javascript"></script>
        <script src="../js/coolcarousel/carousel.js" type="text/javascript"></script>
        
  	</head>
  	<body>

	  	<!-- Navigation -->
    	<?php include('_include/navigation.php'); ?>
        
		<div id="wrapper">
			<div id="carousel">
				<span class="empty"></span> <!-- trick the carousel to start 1 item to the right -->
				<img src="../img/screenshots//SeaPal-InitialPosition.jpg" alt="Map view with current position, initial view." width="580" height="435"/>
                <img src="../img/screenshots//SeaPal-Gothenborg-Menu.jpg" alt="Menu selected." width="580" height="435"/>
                <img src="../img/screenshots//SeaPal-Gothenborg-Tools.jpg" alt="Tools selected." width="580" height="435">
				<img src="../img/screenshots//SeaPal-Gothenborg-Tools.jpg" alt="Tools selected." width="580" height="435">
                <img src="../img/screenshots//SeaPal-Gothenborg-OSM.jpg" alt="Map view with OpenSeaMap showing Gothenburg." width="580" height="435">
                <img src="../img/screenshots//SeaPal-SatelliteView.jpg" alt="Satellite view" width="580" height="435"/>
                <img src="../img/screenshots//SeaPal-Satellite-Closeup.jpg" alt="Satellite view - Close-up." width="580" height="435">
                <img src="../img/screenshots//SeaPal-Southampton-OSM.jpg" alt="Map view with OpenSeaMap showing Southampton." width="580" height="435"/>
                <img src="../img/screenshots//SeaPal-Konstanz-IBN.jpg" alt="Offline map from IBN" width="580" height="435"/>
                <img src="../img/screenshots//SeaPal-POI-Search.jpg" alt="Searching for Points of Interest" width="435" height="580">
                <img src="../img/screenshots//SeaPal-POI-Harborinfo.jpg" alt="Points of Interest: Info for a Harbour" width="435" height="580">
                <span class="empty"></span> <!-- trick the carousel to end 1 item to the left -->
			</div>
		</div>
		<div id="bar">
			<a id="prev" href="#">&laquo;</a>
			<a id="next" href="#">&raquo;</a>
			<span id="title"></span>
		</div>	
  </body>
</html>