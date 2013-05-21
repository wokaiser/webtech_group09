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
				<img src="../img/screenshots//SeaPal-Gothenborg-Menu.jpg" alt="Lunar New Year 2012: Year of the Dragon"  />
				<img src="../img/screenshots//SeaPal-Gothenborg-Menu.jpg" alt="An 18 meter long dragon at Malang city park"  />
				<img src="../img/screenshots//SeaPal-Gothenborg-Menu.jpg" alt="Actors perform the dragon dance"  />
				<img src="../img/screenshots//SeaPal-Gothenborg-Menu.jpg" alt="Members of the chinese community in India celebrate the Chinese New Year"  />
				<img src="../img/screenshots//SeaPal-Gothenborg-Menu.jpg" alt="Woman pray at a Buddhist temple in Denpasar"  />
				<img src="../img/screenshots//SeaPal-Gothenborg-Menu.jpg" alt="A reveller writes the "Dragon" in traditional Chinese characters"  />
				<img src="../img/screenshots//SeaPal-Gothenborg-Menu.jpg" alt="Chinese living in Ukraine carry a dragon on January 22"  />
				<img src="../img/screenshots//SeaPal-Gothenborg-Menu.jpg" alt="Fireworks over Hoan Kiem Lake"  />
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
