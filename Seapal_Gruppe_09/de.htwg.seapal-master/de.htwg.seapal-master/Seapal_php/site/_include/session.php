<?php
if(session_status() != PHP_SESSION_ACTIVE)
    session_start();
    
// auto-login using cookie
if(isset($_COOKIE['auth']))
    {
    include('../user.php');
    parse_str($_COOKIE['auth']);
    doLogin($user, $hash);
    }
    
if(isset($_SESSION['timestamp']) && !empty($_SESSION['timestamp']))
    {
    $logged_in = true;
    if($_SESSION['timestamp'] < (time() - 3600))
        ; // Benutzer abmelden o.ä. ...
    }
else 
    {
    $logged_in = false;
    }
    