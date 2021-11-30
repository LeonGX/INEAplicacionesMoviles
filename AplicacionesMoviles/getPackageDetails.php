<?php
include 'db_connection.php';

$conn = openConn();




$sql = "SELECT*FROM package INNER JOIN states on package.status=states.idState INNER JOIN trackings on trackings.Id_Package=package.IdPackage where package.IdPackage='".$_POST["idPackage"]."' and package.status='".$_POST["status"]."'";
$result = mysqli_query($conn, $sql);
$data = array();
foreach ($result as $row) {
    $data[] = $row;
}
print json_encode($data);
