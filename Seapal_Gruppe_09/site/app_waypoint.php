<!DOCTYPE html>

<html lang="de">
  	<head>
		<?php include('header.php');?>
  	</head>
	<body>
		<!-- Navigation -->
		<?php include('navigation.php');?>	
		
        <div class="hero-unit">
            <h1>Save your data</h1>
        </div>
        
		<!-- Container -->
		<div class="container-fluid">
			<!-- Content -->		
			<div class="span8">
            
                <div id="wegpunkt">
                    <br />
                    <h2>Wegpunkt</h2>
                    <br />
                    <div>
                        <form> 
                            <div class="row">
                                <div class="span3">	            		
                                    <div>
                                        <label >Name</label>
                                        <input  type="text" id="name"/>
                                    </div>
                                    <div>
                                        <label >Time</label>
                                        <input  type="date" id="wdate"/>
                                    </div>
                                    <div>
                                        <label >Date</label>
                                        <input  type="date" id="wtime"/>
                                    </div>
                                </div>
                                <div class="span3">
                                    <div>
                                        <label >Latitude</label>
                                        <input  type="text" id="lat"/>
                                    </div>
                                    <div>
                                        <label >Longitude</label>
                                        <input  type="text" id="lng"/>
                                    </div>
                                    <div>
                                        <label >Fahrt nach</label>
                                        <select name="fahrtziel" id="marker"></select>
                                    </div>
                                </div>
                                <div class="span3">
                                    <div>
                                        <label >COG</label>
                                        <input  type="text" id="cog"/>
                                    </div>
                                    <div>
                                        <label >SOG</label>
                                        <input  type="text" id="sog"/>
                                    </div>
                                    
                                    <div>
                                        <label >Manoever</label>
                                        <select name="manoever" id="manoever"></select>
                                    </div>                   
                                </div>
                                <div class="span3">
                                    <div>
                                        <label >BTM</label>
                                        <input  type="text" id="btm"/>
                                    </div>
                                    <div>
                                        <label >DTM</label>
                                        <input  type="text" id="dtm"/>
                                    </div>
                                    <div>
                                        <label >Vorsegel</label>
                                        <select name="vorsegel" id="vorsegel"></select>
                                    </div>
                                </div>
                            </div>      	 
                   </div>
                </div>

                <div id="appNotes">
                    <br />
                    <h2>Notes</h2>
                    <br />
                    <textarea></textarea>
                </div>
			        
                <div id="markerMap">
                        <br />
			        	<h2>Map</h2>
			            <br />
                        <img src="../img/icons/marker_map.png" id="appInfoPhoto" />
			    </div>
			    
                <div id="appPhotos">
                    <br />
                    <h2>Photos</h2>
                    <br />
				    <img src="../img/icons/no_image.jpg" id="appInfoPhoto" />
				</div>
				
                <div id="weatherData">
						<h4>Weather data</h4>
						<div>
			            	<label >Wind strength</label>
			            	<input  type="text" id="wstrength"/>
			            </div>
						<div>
			            	<label >Wind direction</label>
			            	<select  name="winddirect" id="wdir">
								<option value="north">North</option>
								<option value="northeast">Northeast</option>
								<option value="East">East</option>
								<option value="southeast">Southeast</option>
								<option value="south">South</option>
								<option value="southwest">Southwest</option>
								<option value="west">West</option>
								<option value="northwest">Northwest</option>
							</select>
			            </div>
						<div>
			            	<label >Air pressure</label>
			            	<input  type="text" id="airpess"/>
			            </div>
						<div>
			            	<label >Temperature</label>
			            	<input  type="text" id="dennisisteinspasst"/>
			            </div>
						<div>
			            	<label >Clouds</label>
			            	<input  type="text" id="clouds"/>
			            </div>
						<div>
			            	<label >Rain</label>
			            	<input  type="text" id="rain"/>
			            </div>
						<div>
			            	<label >Wave height</label>
			            	<input  type="text" id="wheight"/>
			            </div>
						<div>
			            	<label >Wave direction</label>
			            	<input  type="text" id="wdirect"/>
			            </div>
						<div>
			            	<label >Current time</label>
			            	<input  type="time" id="ctime" />
			            </div>
						<div>
			            	<label >Current date</label>
			            	<input  type="date" id="cdate"/>
			            </div>
				    </div>
			</div><!-- Content -->
            <div class="span4"><!-- Navigation -->
                <ul class="nav nav-list">
                <li class="nav-header">Seapal</li>
                <li class="divider"></li>
                <li class="active"><a href="#wegpunkt">Wegpunkt</a></li>
                <li><a href="#appNotes">Notes</a></li>
                <li><a href="#markerMap">Map</a></li>
                <li><a href="#appPhotos">Photos</a></li>
                <li><a href="#markerMap">Map</a></li>
                <li><a href="#weatherData">Weather data</a></li>
                </ul>
            </div><!-- Navigation -->
            
            
		</div><!-- Container -->
	
        <!-- Footer -->
		<footer>
			<?php include('footer.php');?>
		</footer>  
	</body>
</html>
