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
                <img src="../img/screenshots//SeaPal-Tracking.jpg" alt="The Tracking Tool." width="580" height="435">
                <img src="../img/screenshots//SeaPal-Boat.jpg" alt="The Logbook view with Boat info." width="580" height="435">
                <img src="../img/screenshots//SeaPal-Logbook.jpg" alt="The Logbook view for a Trip." width="580" height="435">
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