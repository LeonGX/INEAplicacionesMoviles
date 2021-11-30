<?php
include 'db_connection.php';

$conn = openConn();


$id = intval($_POST["IdTracking"])+100;
$status = intval($_POST["package_status"])+1;
$sql_package = "UPDATE package set status=status+1 where IdPackage='" . $_POST["IdPackage"] . "';";
$update_package = mysqli_query($conn, $sql_package) or die(mysqli_error($conn));
if ($update_package) {
    $sql_trackings = "INSERT INTO trackings (IdTracking,Id_State,Id_Package,latitud,longitud) VALUES('" . $id . "','" . $status . "','" . $_POST["IdPackage"] . "','" . $_POST["latitud"] . "','" . $_POST["longitud"] . "') ;";
    $update_trackings = mysqli_query($conn, $sql_trackings) or die(mysqli_error($conn));
    if($update_trackings){
       print json_encode($update_trackings);
    }else{
        print json_encode($update_trackings);
    }
}
