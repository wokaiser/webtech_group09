<?php 
require_once('_include/config.php');
include('_include/functions.php');
$sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
$db_selected = mysql_select_db(const_mysql_db, $sql_connection);
if (!$db_selected)
    die('Can\'t select database : ' . mysql_error());    


$username = null;
$data = array();

if ($_GET['username'])
    $username = urldecode($_GET['username']);

$sql = "SELECT * FROM ".const_mysql_users." WHERE benutzername ='" . $username . "';";
    $result = mysql_query($sql, $sql_connection);
    if (!$result)
        die('Invalid query: ' . mysql_error());

while ($row = mysql_fetch_array($result)) {
    array_push($data, array(
        'username'     => $row['benutzername']
));
}
// Send the data.
echo json_encode($data);
?>
