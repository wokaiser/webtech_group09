<?php $filename = str_replace(".php", "", basename($_SERVER["SCRIPT_NAME"])); ?>

<!-- Navigation -->
<div class="navbar navbar-inverse navbar-fixed-top" id="navigation">
	<div class="navbar-inner" id="navigation">
        <div class="container">
          	<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse" style="margin-top:25px; margin-right:20px;">
            	<span class="icon-bar"></span>
            	<span class="icon-bar"></span>
            	<span class="icon-bar"></span>
            </a>
            <a class="brand" href="index.php">
            	<img src='../img/icons/seapal_normal.png' alt='Icon-Small-50' width='50' height='50' style="float: left; padding-top: 5px; padding-left: 20px"/>
            	<h2 style="float: left; padding-left:10px; margin-right:100px; font-weight: normal;">Seapal</h2>
            </a>
            <div class="nav-collapse">
            	<ul class="nav nav-pills" style="padding-left:0px; padding-top: 24px; font-size: 18px;">
			        <li <?php if ($filename == "index") echo("class='active'"); ?>><a href='index.php'>Home</a></li>
			        <li <?php if ($filename == "app_map") echo("class='active'"); ?>><a href='app_map.php'>App</a></li>
			        <li <?php if ($filename == "userguide") echo("class='active'"); ?>><a href='userguide.php'>User Guide</a></li>
			        <li <?php if ($filename == "screenshots") echo("class='active'"); ?>><a href='screenshots.php'>Screenshots</a></li>
			        <li <?php if ($filename == "about") echo("class='active'"); ?>><a href='about.php'>About</a></li>
			        <li <?php if ($filename == "contact") echo("class='active'"); ?>><a href='contact.php'>Contact</a></li>

                    <li class="dropdown active">
                    <a class="dropdown-toggle"
                    data-toggle="dropdown"
                    href="#">
                    Dropdown
                    <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                    <li <?php if ($filename == "screenshots_ipad") echo("class='active'"); ?>><a href='screenshots_ipad.php'>iPad</a></li>
                    <li <?php if ($filename == "screenshots_tools") echo("class='active'"); ?>><a href='screenshots_tools.php'>SeaPal Tools</a></li>
                    <li <?php if ($filename == "screenshots_inplace") echo("class='active'"); ?>><a href='screenshots_inplace.php'>SeaPal In-Place-Tools</a></li>
                    <li <?php if ($filename == "screenshots_logbook") echo("class='active'"); ?>><a href='screenshots_logbook.php'>SeaPal Logbook and Tracking</a></li>
                    <li <?php if ($filename == "screenshots_iphone") echo("class='active'"); ?>><a href='screenshots_iphone.php'>SeaPal on the iPhone</a></li>
                    </ul>
                    </li>

		        </ul>
		    </div>
        </div>
    </div>
</div>