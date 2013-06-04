<?php 
require_once('_include/config.php');
include('_include/functions.php');
$sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
$db_selected = mysql_select_db(const_mysql_db, $sql_connection);
if (!$db_selected)
    die('Can\'t select database : ' . mysql_error());    


$tnr = 1;
$data = array();

if ($_GET['tnr'])
    $tnr = urldecode($_GET['tnr']);

$sql = "SELECT * FROM ".const_mysql_waypoints." WHERE tnr =" . $tnr . ";";
    $result = mysql_query($sql, $sql_connection);
    if (!$result)
        die('Invalid query: ' . mysql_error());

while ($row = mysql_fetch_array($result)) {
    array_push($data, array(
        'name'     => $row['name'],
        'lat'      => floatval($row['lat']),
        'lng'      => floatval($row['lng']),
        'btm'      => $row['btm'],
        'dtm'      => $row['dtm'],
        'sog'      => $row['sog'],
        'cog'      => $row['cog'],
        'manoever' => $row['manoever'],
        'vorsegel' => $row['vorsegel'],
        'marker'   => $row['marker'],
        'wdate'    => $row['wdate'],
        'wtime'    => $row['wtime']
));
}
// Send the data.
echo json_encode($data);
?>
