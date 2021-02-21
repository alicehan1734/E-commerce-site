<?php

$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "Directoryshop"; //물건 리스트를 넣는 공간 

$conn = new mysqli ($host, $username, $rootpassword, $dbname); 


$myJSON=json_decode($_GET['myJSON'], true);// 케이스 색과 타입들

$datas = array(); // e데이터 정보 

if(is_array($myJSON)){ // 리스트 저장하는 구간 

    foreach($myJSON as $row)
    {
       
        $sql = "SELECT * FROM directory WHERE number = '$row'";

        // $image_datas = array(); // 사진 정보 
        $result = mysqli_query($conn,$sql);
        
        while($row2 = $result -> fetch_assoc())
        {
            $datas[] = $row2; // 물건에 관한 정보가 들어있는 구간 
        }

    }
}else{

}
echo json_encode($datas); // 데이터 부르기 

?>