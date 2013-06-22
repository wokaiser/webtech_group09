<?php
    require_once('_include/session.php');
    require_once('_include/config.php');

    if(!isset($_POST['action']))
        {
        $remember = false;

        if(isset($_POST['remember_me']))
            $remember = $_POST['remember_me'];
        
        doLogin($_POST['user_username'], $_POST['user_password'], $remember);
        }
    elseif($_POST['action'] == 'signout')
        {
        $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
        $sql = "UPDATE `benutzer` SET `mySession`='"+$_POST['mySession']+"' WHERE 'bnr'='"+$_SESSION['bnr']+"';";
        $result = mysql_query($sql, $sql_connection);
        echo json_encode(true);
        session_destroy(); // do logout
        }
    
    function doLogin($username, $pw, $remember = false)
        {
        $sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
        
        if (!mysql_select_db(const_mysql_db, $sql_connection))
            die('Error: ' . mysql_error());
        
        if(!empty($username) && !empty($pw))
            {
            
            $sql = "SELECT bnr, vorname, nachname, mail, mySession, passwort
                    FROM ".const_mysql_users."
                    WHERE benutzername = '" . mysql_real_escape_string($username) . "';";
                    
            $result = mysql_query($sql, $sql_connection);
            
            if ($result )
                {
                $row = mysql_fetch_array($result, MYSQL_ASSOC);
                
                if($row['passwort'] == $pw)
                    {
                    
                    // Create user session
                    if(session_status() == PHP_SESSION_ACTIVE)
                        {
                        $_SESSION['user'] = $username;
                        $_SESSION['timestamp'] = time();
                        $_SESSION['bnr'] = $row['bnr'];
                        }
                                            
                    // Create auto-login cookie
                    if(!empty($remember))
                        {
                        $pw_hash = $pw; // sha1($pw);
                        setcookie ('auth', 'user='.$username.'&hash='.$pw_hash, time() + (3600 * 24 * 15));
                        }
                    
                    echo json_encode($row); // result == true -> echo json
                    }
                }
            else
                die('Error: ' . mysql_error());

            mysql_free_result($result);
            }
        mysql_close($sql_connection);
        }
    
	
?>