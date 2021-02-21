<?php 

$casetype = $_GET['casetype'];


$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "ItemLIst"; //물건 리스트를 넣는 공간 
$conn = new mysqli ($host, $username, $rootpassword, $dbname);

if(isset($_GET["caselength"])){ // 페이지 마다 보여주는 창 

    $page = $_GET["caselength"];
    $record_per_page = 15; // 15장씩 보여줄 예정 

    $start_from = ($page-1)*$record_per_page; // 첫 시작 페이지 시점 

    $sql = "SELECT * FROM Main WHERE type = '$casetype' ORDER BY id DESC LIMIT $start_from, $record_per_page"; // 숫자가 큰거에서 10개 만 추리기 
    $datas = array(); // e데이터 정보 
    // $image_datas = array(); // 사진 정보 
    $result = mysqli_query($conn,$sql);
    $i = 0;
    
        while($row = $result -> fetch_assoc())
        {
    
    
            $datas[] = $row; // 물건에 관한 정보가 들어있는 구간 
    
            $number = $datas[$i]['id']; // 고유의 값 들어있다. 
    
    
            $sqli = "SELECT * FROM listimage WHERE number = '$number'"; // 해당 관련있는 것의 사진 정보 추출 
            $result_1 = $conn->query($sqli);
            $row = $result_1->fetch_array(MYSQLI_ASSOC);
    
            if($result_1->num_rows > 0){
                $datas[$i]['image'] = $row['filnamnam']; // 같은 라인에 있는곳에 넣어준다. 
            }else{
            }
    
            $i++;
    
        }
    
    //    print_r($image_datas); // 이미지의 데이터 배열 
    
       echo json_encode($datas);

}else{ // 첫페이지로 보여주는 창 ( 정확히 말하면 , 전체 갯수를 알기위한 요소이다.)
    $sql = "SELECT * FROM Main WHERE type = '$casetype' ORDER BY id DESC"; // 숫자가 큰거에서 10개 만 추리기 
    $datas = array(); // e데이터 정보 
    // $image_datas = array(); // 사진 정보 
    $result = mysqli_query($conn,$sql);
    $i = 0;
    
        while($row = $result -> fetch_assoc())
        {
    
    
            $datas[] = $row; // 물건에 관한 정보가 들어있는 구간 
    
            $number = $datas[$i]['id']; // 고유의 값 들어있다. 
    
    
            $sqli = "SELECT * FROM listimage WHERE number = '$number'"; // 해당 관련있는 것의 사진 정보 추출 
            $result_1 = $conn->query($sqli);
            $row = $result_1->fetch_array(MYSQLI_ASSOC);
    
            if($result_1->num_rows > 0){
                $datas[$i]['image'] = $row['filnamnam']; // 같은 라인에 있는곳에 넣어준다. 
            }else{
            }
    
            $i++;
    
        }
    
    //    print_r($image_datas); // 이미지의 데이터 배열 
    
       echo json_encode($datas);
}


?>