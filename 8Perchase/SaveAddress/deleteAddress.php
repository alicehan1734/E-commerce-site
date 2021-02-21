<?php

$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "Directoryshop";

$number = $_GET['number']; // 장바구니에 있는 번호 

$conn = new mysqli($host, $username, $rootpassword, $dbname);

$sql = "DELETE FROM address WHERE number = '$number'"; // 선택구문삭제하기

if($conn->query($sql)){

    echo "ok";
}else{
        echo "error:". $sql ."<br>". $conn->error;

}
        $conn->close();

?>