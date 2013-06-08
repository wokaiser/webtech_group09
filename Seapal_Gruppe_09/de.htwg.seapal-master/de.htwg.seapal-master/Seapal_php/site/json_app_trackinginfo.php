<?php 
require_once('_include/config.php');
include('_include/functions.php');
$sql_connection = mysql_connect(const_mysql_host, const_mysql_user, const_mysql_pw);
$db_selected = mysql_select_db(const_mysql_db, $sql_connection);
if (!$db_selected)
    die('Can\'t select database : ' . mysql_error());    


$tracknr = 1;
$data = array();

if ($_GET['tracknr'])
    $tracknr = urldecode($_GET['tracknr']);

$sql = "SELECT * FROM ".const_mysql_trackingPoints." WHERE tracknr =" . $tracknr . ";";
    $result = mysql_query($sql, $sql_connection);
    if (!$result)
        die('Invalid query: ' . mysql_error());

while ($row = mysql_fetch_array($result)) {
    array_push($data, array(
        'lat'               => floatval($row['lat']),
        'lng'               => floatval($row['lng']),
        'marker'            => $row['marker'],
        'btm'               => $row['btm'], 
        'dtm'               => $row['dtm'], 
        'sog'               => $row['sog'], 
        'cog'               => $row['cog'], 
        'manoever'          => $row['manoever'], 
        'vorsegel'          => $row['vorsegel'], 
        'wdate'             => $row['wdate'], 
        'wtime'             => $row['wtime'], 
        'motor'             => $row['motor'], 
        'tank'              => $row['tank'], 
        'windstaerke'       => $row['windstaerke'], 
        'windrichtung'      => $row['windrichtung'], 
        'luftdruck'         => $row['luftdruck'], 
        'temperatur'        => $row['temperatur'], 
        'wolken'            => $row['wolken'], 
        'regen'             => $row['regen'], 
        'wellenhoehe'       => $row['wellenhoehe'], 
        'wellenrichtung'    => $row['wellenrichtung']
));
}
// Send the data.
echo json_encode($data);
?>
