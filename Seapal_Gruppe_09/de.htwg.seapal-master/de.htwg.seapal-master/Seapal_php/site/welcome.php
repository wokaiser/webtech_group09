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
    	<div class="container">
	    	<div class="container-fluid">
		    	<div class="row-fluid">		    	
		    		<div class="image-style"><img src="../img/screenshots/SeaPal-Screen-Horiz01.jpg"></img></div>
		    		<div class="row-fluid" style="margin: 15px">
			    		<div class="span7">
			    			<h2>Sign up to SeaPal for free today!</h2>
			    			<p>Save your routes and access them anywhere anytime !</p>
			    		</div>
			    		<div class="span4">
		                  	<form action="[YOUR ACTION]" method="post" accept-charset="UTF-8">
		                    	<dd><input autofocus="autofocus" id="user_username" style="margin-bottom: 15px;" type="text" name="user[username]" placeholder="Pick a username" size="30" /></dd>                        	
		                    	<dd><input id="user_email" style="margin-bottom: 15px" type="text" name="user[email]" placeholder="Your email" size="30" /></dd>
		                    	<dd><input id="user_password" style="margin-bottom: 15px" type="password" name="user[password]" placeholder="Create a password" size="30" /></dd>
		                    	<dd><input class="btn btn-login" style="clear: left; height: 32px; font-size: 13px" type="submit" name="sign_up_submit" value="Sign up for free" /></dd>
		                    </form>                        
						</div>
					</div>
				</div>	
	    	</div>	
		</div><!-- Container -->

		<!-- Footer -->
		<?php include('_include/footer.php'); ?>

	    <!-- Java-Script -->
	    <script src="../js/bootstrap/bootstrap-transition.js"></script>
	    <script src="../js/bootstrap/bootstrap-button.js"></script>
	    <script src="../js/bootstrap/bootstrap-collapse.js"></script>
	    <script src="../js/bootstrap/bootstrap-affix.js"></script>
	    
	    <script src="../js/bootstrap/holder.js"></script>
	    <script src="../js/bootstrap/prettify.js"></script>
	    <script src="../js/bootstrap/widgets.js"></script>
    
  </body>
</html>