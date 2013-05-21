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
                <img src="../img/screenshots//SeaPal-Longtouch.jpg" alt="A Longtouch brings up bearing and distance to that point from the current position." width="580" height="435">
                <img src="../img/screenshots//SeaPal-InPlace-Tools.jpg" alt="Another touch brings up a menu for in-place tools." width="580" height="435">
                <img src="../img/screenshots//SeaPal-Mark.jpg" alt="This allows quick creation of Marks, for example." width="580" height="435">
                <img src="../img/screenshots//SeaPal-InPlace-Tools.jpg" alt="Marks again have a context menu." width="580" height="435">
                <img src="../img/screenshots//SeaPal-Target.jpg" alt="Marks can be made the target, bearing and distance are displayed at the top." width="580" height="435">
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