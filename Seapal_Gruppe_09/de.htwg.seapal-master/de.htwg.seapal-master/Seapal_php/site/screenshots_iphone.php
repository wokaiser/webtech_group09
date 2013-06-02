<?php require_once('_include/session.php'); ?>
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
                <img src="../img/screenshots//SeaPal-iPhone-LaCoruna.jpg" alt="SeaPal on the iPhone - horizontal" width="218" height="292">
                <img src="../img/screenshots//SeaPal-iPhone-wide.jpg" alt="SeaPal on the iPhone - vertical" width="292" height="218">
                <img src="../img/screenshots//SeaPal-iPhone-Tools.jpg" alt="SeaPal on the iPhone - Tools" width="218" height="292">
                <img src="../img/screenshots//SeaPal-iPhone-Menu.jpg" alt="SeaPal on the iPhone - Tools" width="218" height="292">
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