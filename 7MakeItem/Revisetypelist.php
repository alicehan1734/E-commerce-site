<?php


$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "ItemLIst"; //물건 리스트를 넣는 공간 
$conn = new mysqli ($host, $username, $rootpassword, $dbname);


$number = $_GET["number"]; // REVISE LIST 수 

$sql = "SELECT * FROM listtype  WHERE number = '$number'"; // id 가 같은거 찾기 
$datas = array(); // e데이터 정보 
// $image_datas = array(); // 사진 정보 
$result = mysqli_query($conn,$sql);

while($row = $result -> fetch_assoc())
{
    $datas[] = $row; // 물건에 관한 정보가 들어있는 구간 
}
echo json_encode($datas); // 데이터 부르기 
?>