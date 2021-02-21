<?php 

$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "ItemLIst"; //물건 리스트를 넣는 공간 
$conn = new mysqli ($host, $username, $rootpassword, $dbname);


$number = $_GET["number"]; // REVISE LIST 수 

$sql = "SELECT * FROM Main  WHERE id = '$number'"; // id 가 같은거 찾기 
$datas = array(); // e데이터 정보 
// $image_datas = array(); // 사진 정보 
$result = $conn->query($sql);

if($result->num_rows > 0){
    $row = $result->fetch_array(MYSQLI_ASSOC);

    array_push($datas, $row['id'], $row['type'],$row['price'],$row['saleprice'],$row['salept'], $row['date'], $row['info'],$row['name'] ); // Main 에 대한 정보 

    $sqli = "SELECT * FROM listimage WHERE number = '$number'"; // 해당 관련있는 것의 사진 정보 추출 
    $result = mysqli_query($conn,$sqli);

    while($row = $result -> fetch_assoc())
    {
        $datas[] = $row; // 물건에 관한 정보가 들어있는 구간 
    }

}else{
    return;
}

//    print_r($image_datas); // 이미지의 데이터 배열 

echo json_encode($datas); // 데이터 부르기 

?>

