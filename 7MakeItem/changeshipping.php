<?php

$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "Directoryshop";

$number = $_GET["number"];
$status = $_GET["status"];

$conn = new mysqli($host, $username, $rootpassword, $dbname);

$sql = "UPDATE shippingstatus  SET shippingstatus = '$status' WHERE number = '$number'"; // 숫자가 큰거에서 10개 만 추리기 
$result = mysqli_query($conn,$sql);

echo "good";

?>