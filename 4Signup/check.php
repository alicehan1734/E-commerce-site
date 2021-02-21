<?php 

$id = $_GET['userid'];

$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "userlogin";


$conn = new mysqli ($host, $username, $rootpassword, $dbname);

if(mysqli_connect_error()){
    die('Connect Error ('.mysqli_connect_errno().')' . mysqli_connect_error());
}
else{
$sqli = "SELECT * FROM userinfo WHERE id = '$id' ";
$res = $conn->query($sqli);

if ($res->num_rows>=1) {
    echo "false";
    //echo "아이디가 중복됩니다. 다른 아이디를 입력해주세요. ";

}else{
    echo "true";
    //echo "사용가능하신 아이디입니다.";
}}
?>

