<?php
session_start();


$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "ItemLIst";

$number = $_GET['number']; // 장바구니에 있는 번호 

$conn = new mysqli($host, $username, $rootpassword, $dbname);

$sqli = "SELECT * FROM listtype WHERE id = '$number' ";

$result = $conn->query($sqli);


if($result->num_rows > 0){
    $row = $result->fetch_array(MYSQLI_ASSOC);

$color = $row['color']; // color 
$type = $row['casetype']; // casetype
$pronum = $row['number']; //productnumber


$id = $_SESSION['id'];

$conn2 = new mysqli($host, $username, $rootpassword, "Directoryshop");

$sqlite = "SELECT * FROM directory WHERE productnumber = '$pronum' AND color = '$color' AND type = '$type' AND honor = '$id' ";

$result = $conn2->query($sqlite);

if(!empty($result) && $result->num_rows > 0){ // 같은게 있을경우 (체크한다 )
    echo "exist";
}else{
    echo "none";

}

}else{
}
?>