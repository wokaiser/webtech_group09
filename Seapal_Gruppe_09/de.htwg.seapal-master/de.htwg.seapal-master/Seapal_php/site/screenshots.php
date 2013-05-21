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
    	<div class="container">
	    	<div class="container-fluid">
		    	<div class="row-fluid">
		    	
		    		<!-- Sidebar -->
			    	<div class="span3 ">
				    	<div class="sidebar-nav">
					    	<ul class="nav nav-list bs-docs-sidenav affix" id="sidebar">
		                        <li class="sidebar"><a href="#" id="ipad">iPad</a></li>
                                <li class="sidebar"><a href="#" id="tools">SeaPal Tools</a></li>
                                <li class="sidebar"><a href="#" id="inplace">SeaPal In-Place-Tools</a></li>
                                <li class="sidebar"><a href="#" id="logbook">SeaPal Logbook and Tracking</a></li>
                                <li class="sidebar"><a href="#" id="iphone">SeaPal on the iPhone</a></li>
					        </ul>
					    </div>
					</div><!-- Sidebar -->

					<!-- Content -->
					<div class="span9">  

                        <!-- Carousel -->
                        <div id="this-carousel-id" class="carousel" style="width: 800px; max-width=800px; height: 800px; max-height: 800px;">
                            <div class="carousel-inner" id="content">
                            
                            
                            </div><!-- /.carousel-inner -->
                            <!--carousel controls-->
                            <a class="carousel-control left" href="#this-carousel-id" data-slide="prev">&lsaquo;</a>
                            <a class="carousel-control right" href="#this-carousel-id" data-slide="next">&rsaquo;</a>
                        </div><!-- carousel -->
	                </div><!-- Content -->
				</div>
			</div>	
		</div><!-- Container -->
                
        <script src="../js/jquery/jquery.js"></script>
        <script src="../js/bootstrap/bootstrap-carousel.js"></script>
        <script src="../js/bootstrap/bootstrap-transition.js"></script>
        <script type="text/javascript">
            $('.carousel').carousel({
              interval: 3000
            })
            
            $('#content').load('screenshotsContent.php #ipad');
            
            $('#ipad').click(function(){
                $('#content').load('screenshotsContent.php #ipad');
            })

            $('#tools').click(function(){
                $('#content').load('screenshotsContent.php #tools');
            })
            
            $('#inplace').click(function(){
                $('#content').load('screenshotsContent.php #inplace');
            })
            
            $('#logbook').click(function(){
                $('#content').load('screenshotsContent.php #logbook');
            })
            
            $('#iphone').click(function(){
                $('#content').load('screenshotsContent.php #iphone');
            })
        </script>
        
		<!-- Footer -->
		<?php include('_include/footer.php'); ?>
        
  </body>
</html>
