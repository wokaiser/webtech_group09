<?php 
	require_once('_include/session.php');
	require_once('_include/config.php');
	include('_include/functions.php');
	$sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
	$db_selected = mysql_select_db(const_mysql_db, $sql_connection);
	if (!$db_selected)
	    die('Can\'t select database : ' . mysql_error());
	?>
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
		                    	<dd><input id="new_username" style="margin-bottom: 15px" type="text" name="user[username]" placeholder="Pick a username" size="30" autofocus="autofocus" /></dd>
		                    	<dd><input id="new_email" style="margin-bottom: 15px" type="text" name="user[email]" placeholder="Your email" size="30" /></dd>
		                    	<dd><input id="new_password" style="margin-bottom: 15px" type="password" name="user[password]" placeholder="Create a password" size="30" /></dd>
		                    	<dd><input id="signup" class="btn btn-login" style="clear: left; height: 32px; font-size: 13px" type="submit" name="sign_up_submit" value="Sign up for free" /></dd>
		                    </form>                        
						</div>
					</div>
				</div>	
	    	</div>	
		</div><!-- Container -->

	    <!-- Menu Modal -->
		<div class="modal hide fade" id="messageBox">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h3 id="dialogTitle"></h3>
			</div>
			<div class="modal-body">
				<p id="dialogMessage"></p>
			</div>
			<div class="modal-footer">
				<a href="#" class="btn" data-dismiss="modal"><i class="icon-ok"></i> ok</a>
			</div>
		</div>

		<!-- Footer -->
		<?php include('_include/footer.php'); ?>

	    <!-- Java-Script -->
	    <script src="../js/bootstrap/bootstrap-button.js"></script>
	    <script src="../js/bootstrap/bootstrap-modal.js"></script>
	    <script src="../js/bootstrap/bootstrap-transition.js"></script>
	    <script src="../js/bootstrap/bootstrap-collapse.js"></script>
	    <script src="../js/bootstrap/bootstrap-affix.js"></script>
	    
	    <!-- Additional Java-Script -->
        <script src="../js/js-session/json-serialization.js" type="text/javascript"></script>
	    <script src="../js/bootstrap/holder.js"></script>
	    <script src="../js/bootstrap/prettify.js"></script>
	    <script src="../js/bootstrap/widgets.js"></script>
	    <script src="../js/app/ajax/welcome.js"></script>
  </body>
</html>