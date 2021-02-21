<?php

$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "Directoryshop";

$number = $_GET['number']; // 장바구니에 있는 번호 

$conn = new mysqli($host, $username, $rootpassword, $dbname);

$sql = "DELETE FROM directory WHERE number = '$number'"; // 리스트타입 삭제하기

if (mysqli_query($conn, $sql)) {
    //   echo "Record updated successfully";
    echo "ok";

    } else {
       echo "Error updating record: " . mysqli_error($conn);

    }

?>


