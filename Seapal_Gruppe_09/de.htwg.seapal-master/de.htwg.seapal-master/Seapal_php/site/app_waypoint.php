<?php require_once('_include/session.php'); ?>
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
		<div class="container-fluid">
			
			<!-- App Navigation -->
			<?php include('_include/navigation_app.php'); ?>
			
			<!-- Content -->		
			<div id="appWrapper" align="center">
			    <br />
			    <h2>Wegpunkt</h2>
			    <br />
			    <div class="container-fluid" align="center">
	            	<form class="form-horizontal"> 
		            	<div class="row well" style="margin-left: 15%;" align="center">
		            		<div class="span4" align="center">	            		
			            		<div class="control-group">
			            			<label class="control-label">Name</label>
			            			<input class="input-medium" type="text" id="name"/>
			            		</div>
		            		</div>
		            		<div class="span4">
		            			<div class="control-group">
			            			<label class="control-label">Latitude</label>
			            			<input class="input-medium" type="text" id="lat"/>
			            		</div>
		            		</div>
		            		<div class="span4">		            			
			            		<div class="control-group">
			            			<label class="control-label">Longitude</label>
			            			<input class="input-medium" type="text" id="lng"/>
			                    </div>			                                     
		            		</div>		            		
		            	</div>      	 
	            	</div>
	            </div>
			    <br />
			    <br />
			    <div class="container" align="center">
			    <div class="row" style="margin-left:5%;">
			        <div class="span4" id="appNotes">
			        	<h4>Notes</h4>
			            <textarea style="width:96%; height:360px;"></textarea>
			        </div>
			        <div class="span4" id="markerMap">
			        	<h4>Map</h4>
			            <img src="../img/icons/marker_map.png" id="appInfoPhoto" style="width:100%; heigt: 100%;"/>
			        </div>
			        <div class="span4" id="appPhotos">
			        	<h4>Photos</h4>
				        <img src="../img/icons/no_image.jpg" id="appInfoPhoto" style="width:100%; heigt: 100%;"/>
				    </div>
				</div>
			    </div>
			</div><!-- Content -->
			
		</div><!-- Container -->
		
		<!-- Java Script -->
		<script src="../js/bootstrap/bootstrap-transition.js"></script>
	    <script src="../js/bootstrap/bootstrap-button.js"></script>
	    <script src="../js/bootstrap/bootstrap-collapse.js"></script>
	    <script src="../js/bootstrap/bootstrap-affix.js"></script>
		
		<!-- Additional Java-Script -->
		<script src="../js/app/ajax/waypoint.js" type="text/javascript"></script>
		
	</body>
</html>