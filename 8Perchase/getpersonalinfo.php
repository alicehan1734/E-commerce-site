<?php 

session_start(); 

$id = $_SESSION['id'];


$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "userlogin";


$conn = new mysqli($host, $username, $rootpassword, $dbname);
$datas = array(); // e데이터 정보 

if($conn->connect_errno){
    die('Connect Error ('.mysqli_connect_errno().')' . mysqli_connect_error());
}
else{
    $sqli = "SELECT * FROM userinfo WHERE id = '$id' ";
    $result = mysqli_query($conn,$sqli);
        
    while($row2 = $result -> fetch_assoc())
    {
        $datas[] = $row2; // 물건에 관한 정보가 들어있는 구간 
    }

}


echo json_encode($datas); // 데이터 부르기 

?>