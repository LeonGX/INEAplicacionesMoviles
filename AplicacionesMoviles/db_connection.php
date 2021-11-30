<?php 

function openConn(){
    $db_host='localhost';
    $db_user='root';
    $db_pass='';
    $db='status';
    $conn=new mysqli($db_host,$db_user,$db_pass,$db) or die ("Connection failed". $conn->error);

    return $conn;
}

function closeConn($conn){
    $conn->close();
}

?>