<?php

session_start();
$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "Directoryshop"; //물건 리스트를 넣는 공간 

if (isset ($_GET['shippingnumber'])) { //받으시는 분 
    $shippingnumber = $_GET['shippingnumber'];
}

$conn = new mysqli ($host, $username, $rootpassword, $dbname); 

$pocketarray=json_decode($_GET['pocketarray'], true);// 케이스 색과 타입들

if(is_array($pocketarray)){ // 리스트 저장하는 구간 

    foreach($pocketarray as $row) //paid 로 set 하기 
    {
    $sqli = "UPDATE directory SET status='$shippingnumber' WHERE number='$row'"; // 해당 테이블의 아이디 값을 찾기위해서 
    $result = $conn->query($sqli);

    }
}else{

}

?>