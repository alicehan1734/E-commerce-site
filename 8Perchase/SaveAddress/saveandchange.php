<?php

session_start();

if (isset ($_GET['receiver'])) { //받으시는 분 
    $receiver = $_GET['receiver'];
}
if (isset ($_GET['postnumber'])) { //주소 / 우편번호 
    $postnumber = $_GET['postnumber'];
}
if (isset ($_GET['postaddress'])) { //주소 / 주소
    $postaddress = $_GET['postaddress'];
}
if (isset ($_GET['postdetail'])) { //주소 / 상세주소 
    $postdetail = $_GET['postdetail'];
}
if (isset ($_GET['phone'])) { // 휴대전화 
    $phone = $_GET['phone'];
}
if (isset ($_GET['email'])) { //이메일 
    $email = $_GET['email'];
}
if (isset ($_GET['shipping'])) { //배송메시지 
    $shipping = $_GET['shipping'];
}
if (isset($_SESSION['id'])) { // 세션 아이디 
    $id = $_SESSION['id'];
}else{
    alert_close("로그인 후 이용 하세요."); 
    exit; 
}

$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "Directoryshop";

$conn = new mysqli($host, $username, $rootpassword, $dbname);

if($conn->connect_errno){
    die('Connect Error ('.mysqli_connect_errno().')' . mysqli_connect_error());
}
else{

$sqlite = "SELECT * FROM address WHERE receiver = '$receiver' AND address_num = '$postnumber'
 AND address = '$postaddress' AND address_specific = '$postdetail' 
 AND phone = '$phone' AND email = '$email'
 AND msg = '$shipping' AND honor = '$id'";

$result = $conn->query($sqlite);

if(!empty($result) && $result->num_rows > 0){ // 같은게 있을경우 (체크한다 )
    echo "none";

}else{
    
    $sql = "INSERT INTO address(receiver, address_num, address, address_specific, phone,email, msg , honor)
    values ('$receiver','$postnumber','$postaddress', '$postdetail','$phone','$email', '$shipping', '$id')";

if($conn->query($sql)){

echo "ok";

        $conn->close();
}else{
    echo "fail";
}

}


}
?>