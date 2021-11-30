<?php
include 'db_connection.php';

$conn = openConn();




$sql = "SELECT*FROM package INNER JOIN states on package.status=states.idState order by IdPackage";
$result = mysqli_query($conn, $sql);
$data = array();
foreach ($result as $row) {
    $data[] = $row;
}
print json_encode($data);
