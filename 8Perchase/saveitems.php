<?php
session_start();


$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "ItemLIst";

$number = $_GET['number']; // 장바구니에 있는 번호 
$save = $_GET['save']; // 장바구니에 있는 번호 

$conn = new mysqli($host, $username, $rootpassword, $dbname);

$sqli = "SELECT * FROM listtype WHERE id = '$number' ";

$result = $conn->query($sqli);


if($result->num_rows > 0){
    $row = $result->fetch_array(MYSQLI_ASSOC);

$color = $row['color']; // color 
$type = $row['casetype']; // casetype

$conn2 = new mysqli($host, $username, $rootpassword, "Directoryshop");

$sql = "UPDATE directory SET color = '$color' , type = '$type' WHERE number = '$save';";

if (mysqli_query($conn2, $sql)) {
    //   echo "Record updated successfully";
    echo "ok";

    } else {
       echo "Error updating record: " . mysqli_error($conn2);

    }
}else{
}
?>