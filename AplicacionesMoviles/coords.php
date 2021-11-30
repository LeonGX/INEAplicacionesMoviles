<?php 
 include 'db_connection.php';

 $conn=openConn();




$sql = "INSERT INTO coords (idCoords,latitude,longitude) values (NULL,'".$_POST["latitude"]."','".$_POST["longitude"]."' )";
 if($result=$conn->query($sql)){
    closeConn($conn);
    echo 'Datos guardados exitosamente';
 }
