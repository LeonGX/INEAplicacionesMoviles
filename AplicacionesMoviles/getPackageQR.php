<?php
include 'db_connection.php';

$conn = openConn();



$next = intval($_POST["numberpackage"]);
$sql = "SELECT IdPackage,package.status as package_status,IdTracking,Id_State,numberpackage,state, (SELECT state from states where IdState=Id_State+1) as next from trackings inner join states on trackings.Id_State=states.IdState INNER JOIN package on package.IdPackage=trackings.Id_Package where package.IdPackage='".$_POST["numberpackage"]."' ORDER BY IdTracking DESC LIMIT 1;";
$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
$data = array();
foreach ($result as $row) {
    $data[] = $row;
}
print json_encode($data);
