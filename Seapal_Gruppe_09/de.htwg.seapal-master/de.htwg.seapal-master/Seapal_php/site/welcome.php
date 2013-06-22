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
  	<body background="../img/screenshots/6nf9pniglhbor-jlbuIFc7zUw-original.JPG" text="#990000" link="#0000CC" vlink="#000066" alink="#000000">
  		<!-- Navigation -->
    	<?php include('_include/navigation.php'); ?>

        <div class="jumbotron masthead">
          <div class="container">
            <h1>Seapal</h1>
            <p>plan and track your next sea trip</p>
            <ul class="masthead-links">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" class="input-xlarge" id="new_account_user" name="new_account_user" placeholder='Username'>
                        <div class="control-group error" id="error_new_account_user" style="display: none;">
                            <span class="help-inline" id="txt_error_new_account_user">Something may have gone wrong</span>
                        </div>
                        <br/>
                        <input type="text" class="input-xlarge" id="new_account_vorname" name="new_account_pw" placeholder='First name'>
                        <div class="control-group error" id="error_new_account_vorname" style="display: none;">
                            <span class="help-inline" id="txt_error_new_account_vorname">Something may have gone wrong</span>
                        </div>
                        <br/>
                        <input type="text" class="input-xlarge" id="new_account_nachname" name="new_account_pw" placeholder='Last name'>
                        <div class="control-group error" id="error_new_account_nachname" style="display: none;">
                            <span class="help-inline" id="txt_error_new_account_nachname">Something may have gone wrong</span>
                        </div>
                        <br/>
                        <input type="text" class="input-xlarge" id="new_account_email" name="new_account_email" placeholder='Email'>
                        <div class="control-group error" id="error_new_account_email" style="display: none;">
                            <span class="help-inline" id="txt_error_new_account_email">Something may have gone wrong</span>
                        </div>
                        <br/>
                        <input type="password" class="input-xlarge" id="new_account_pw" name="new_account_pw" placeholder='Password'>
                        <div class="control-group error" id="error_new_account_pw" style="display: none;">
                            <span class="help-inline" id="txt_error_new_account_pw">Something may have gone wrong</span>
                        </div>
                    </div>
                </div>
            </ul>
            <p>
              <a class="btn btn-success btn-large" id="new_account_signup" onclick="">Sign up for free</a>
            </p>
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
        <div id="welcomePhotoLink" style="position: fixed; bottom: 0; right: 0;">
            <a style="color:black;" href="http://de.fotopedia.com/items/6nf9pniglhbor-jlbuIFc7zUw">photo by Anna Strumillo</a><br>
        </div>

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