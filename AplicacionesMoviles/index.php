<?php 
 include 'db_connection.php';

 $conn=openConn();



$sql = "SELECT*FROM users where email='".$_POST["email"]."' and password='".$_POST["password"]."'";
 if($result=$conn->query($sql)){
    closeConn($conn);
    
    echo json_encode($result->num_rows);
 }
