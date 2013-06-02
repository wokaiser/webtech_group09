<?php $filename = str_replace(".php", "", basename($_SERVER["SCRIPT_NAME"])); ?>
<?php $logged_in = false;?>


<!-- Navigation -->
<div class="navbar navbar-inverse navbar-fixed-top" id="navigation">
	<div class="navbar-inner" id="navigation">
        <div class="container">
          	<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse" style="margin-top:25px; margin-right:20px;">
            	<span class="icon-bar"></span>
            	<span class="icon-bar"></span>
            	<span class="icon-bar"></span>
            </a>
            <?php if ($logged_in == true):
              echo("
                <a class='brand' href='index.php'>
                	<img src='../img/icons/seapal_normal.png' alt='Icon-Small-50' width='50' height='50' style='float: left; padding-top: 5px; padding-left: 20px'/>
                	<h2 style='float: left; padding-left:10px; margin-right:100px; font-weight: normal;''>Seapal</h2>
                </a>
              ");
            else:
              echo("
                <a class='brand' href='welcome.php'>
                  <img src='../img/icons/seapal_normal.png' alt='Icon-Small-50' width='50' height='50' style='float: left; padding-top: 5px; padding-left: 20px'/>
                  <h2 style='float: left; padding-left:10px; margin-right:100px; font-weight: normal;''>Seapal</h2>
                </a>
              ");
            endif;?>

            <div class="nav-collapse collapse">
            	<ul class="nav nav-pills" style="padding-left:0px; padding-top: 24px; font-size: 18px;">
			        <li <?php if ($filename == "index") echo("class='active'"); ?>><a href='index.php'>Home</a></li>
			        <li <?php if ($filename == "app_map") echo("class='active'"); ?>><a href='app_map.php'>App</a></li>
			        <li <?php if ($filename == "userguide") echo("class='active'"); ?>><a href='userguide.php'>User Guide</a></li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Screenshots</a>
                        <ul class="dropdown-menu">
                            <li <?php if ($filename == "screenshots_ipad") echo("class='active'"); ?>><a href='screenshots_ipad.php'>iPad</a></li>
                            <li <?php if ($filename == "screenshots_tools") echo("class='active'"); ?>><a href='screenshots_tools.php'>SeaPal Tools</a></li>
                            <li <?php if ($filename == "screenshots_inplace") echo("class='active'"); ?>><a href='screenshots_inplace.php'>SeaPal In-Place-Tools</a></li>
                            <li <?php if ($filename == "screenshots_logbook") echo("class='active'"); ?>><a href='screenshots_logbook.php'>SeaPal Logbook and Tracking</a></li>
                            <li <?php if ($filename == "screenshots_iphone") echo("class='active'"); ?>><a href='screenshots_iphone.php'>SeaPal on the iPhone</a></li>
                        </ul>
                    </li>
			        <li <?php if ($filename == "about") echo("class='active'"); ?>><a href='about.php'>About</a></li>
			        <li <?php if ($filename == "contact") echo("class='active'"); ?>><a href='contact.php'>Contact</a></li>
   

                      <?php if ($logged_in == true):
                      echo("
                      <li>
                        <a class='btn-logout' href='#'>Sign out</a>
                      </li>
                      "); 
                      else:
                        echo("
                      <li class='dropdown'>
                        <a class='dropdown-toggle btn-login' href='#' data-toggle='dropdown'>Sign In <strong class='caret'></strong></a>
                        <div class='dropdown-menu' style='padding: 15px; padding-bottom: 0px; color:#fff;'>
                            <form action='[YOUR ACTION]' method='post' accept-charset='UTF-8'>
                              <input id='user_username' style='margin-bottom: 15px;' type='text' name='user[username]' placeholder='username' size='30' />
                              <input id='user_password' style='margin-bottom: 15px;' type='password' name='user[password]' placeholder='password' size='30' />
                              <input class='btn btn-login' style='clear: left; width: 100%; height: 32px; font-size: 13px;' type='submit' name='commit' value='Sign In' />
                            </form>
                        </div>
                      </li>
                      ");
                      endif;?>

                </ul>   
		    </div>
        </div>
    </div>
</div>



<!-- Java-Script -->
<script src="../js/bootstrap/bootstrap-dropdown.js"></script>