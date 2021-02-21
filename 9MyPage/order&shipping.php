<?php
session_start();

$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "Directoryshop";

$id = $_SESSION['id'];

$conn = new mysqli($host, $username, $rootpassword, $dbname);

if(isset($_GET["caselength"])){ // 페이지 마다 보여주는 창 
    
    $page = $_GET["caselength"];
    $record_per_page = 3; // 15장씩 보여줄 예정 

    $start_from = ($page-1)*$record_per_page; // 첫 시작 페이지 시점 
    $sql = "SELECT * FROM shippingstatus WHERE honor = '$id' ORDER BY paymentdate DESC LIMIT $start_from, $record_per_page"; // 숫자가 큰거에서 10개 만 추리기 
        
    $datas = array(); // e데이터 정보 
    // $image_datas = array(); // 사진 정보 
    $result = mysqli_query($conn,$sql);
        while($row = $result -> fetch_assoc())
        {
    
    
            $datas[] = $row; // 물건에 관한 정보가 들어있는 구간 
    
        }
    
    //    print_r($image_datas); // 이미지의 데이터 배열 
    
       echo json_encode($datas);
    
    }else{
        $sql = "SELECT * FROM shippingstatus WHERE honor = '$id' ORDER BY paymentdate DESC"; // 숫자가 큰거에서 10개 만 추리기 
        
        $datas = array(); // e데이터 정보 
        // $image_datas = array(); // 사진 정보 
        $result = mysqli_query($conn,$sql);
            while($row = $result -> fetch_assoc())
            {
        
        
                $datas[] = $row; // 물건에 관한 정보가 들어있는 구간 
        
            }
        
        //    print_r($image_datas); // 이미지의 데이터 배열 
        
           echo json_encode($datas);
        
        
    }   
?>