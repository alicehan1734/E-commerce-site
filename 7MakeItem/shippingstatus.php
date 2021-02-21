<?php
session_start();

$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "Directoryshop";

$conn = new mysqli($host, $username, $rootpassword, $dbname);

    
    $number = $_GET["number"];

    $sql = "SELECT * FROM directory WHERE status = '$number' ORDER BY number DESC"; // 숫자가 큰거에서 10개 만 추리기 
        
    $datas = array(); // e데이터 정보 
    // $image_datas = array(); // 사진 정보 
    $result = mysqli_query($conn,$sql);
        while($row = $result -> fetch_assoc())
        {
    
    
            $datas[] = $row; // 물건에 관한 정보가 들어있는 구간 
    
        }
    
    //    print_r($image_datas); // 이미지의 데이터 배열 
    
       echo json_encode($datas);
 
?>