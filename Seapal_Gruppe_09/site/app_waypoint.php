<!DOCTYPE html>

<html lang="de">
  	<head>
		<?php
			include('header.php');
		?>
  	</head>
	<body>
		
		<!-- Navigation -->
		<div>
			<div>
				<div>
					<a href="index.php">
						<img src='../img/icons/seapal_normal.png' alt='Icon-Small-50' width='50' height='50' />
						<h2>Seapal</h2>
					</a>
					<div>
						<ul>
							<li><a href='index.php'>Home</a></li>
							<li><a href='app_waypoint.php'>App</a></li>
							<li><a href='userguide.php'>User Guide</a></li>
							<li><a href='screenshots.php'>Screenshots</a></li>
							<li><a href='about.php'>About</a></li>
							<li><a href='contact.php'>Contact</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Container -->
		<div>
					
			<!-- Content -->		
			<div>
			    <br />
			    <h2>Wegpunkt</h2>
			    <br />
			    <div>
	            	<form> 
		            	<div>
		            		<div>	            		
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
		            		<div>
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
		            		<div>
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
		            		<div>
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
			    <br />
			    <br />
			    <div >
			    <div>
			        <div id="appNotes">
			        	<h4>Notes</h4>
			            <textarea></textarea>
			        </div>
			        <div id="markerMap">
			        	<h4>Map</h4>
			            <img src="../img/icons/marker_map.png" id="appInfoPhoto" />
			        </div>
			        <div id="appPhotos">
			        	<h4>Photos</h4>
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
				</div>
			    </div>
			</div><!-- Content -->
			
		</div><!-- Container -->
		
	</body>
</html>
