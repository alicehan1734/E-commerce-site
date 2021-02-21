<?php

session_start();

$order_idx = date("md") . substr(time() . md5(microtime()), 0, 13);  // 20자

date_default_timezone_set('asia/seoul');
$date = date('m/d/Y h:i:s a', time());

if (isset ($_GET['price'])) { //받으시는 분 
    $price = $_GET['price'];
}
if (isset ($_GET['shippingprice'])) { //주소 / 우편번호 
    $shippingprice = $_GET['shippingprice'];
}
if (isset ($_GET['totalprice'])) { //주소 / 주소
    $totalprice = $_GET['totalprice'];
}
if (isset ($_GET['shippingnum'])) { //주소 / 상세주소 
    $shippingnum = $_GET['shippingnum'];
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

    $sql = "INSERT INTO shippingstatus
    (number,honor, price, shippingprice, totalprice, shippingnum, pricestatus, shippingstatus , paymentdate, currentdate)
    values 
    ('$order_idx', '$id','$price','$shippingprice', '$totalprice','$shippingnum','paied','prepared', '$date' , '$date')";

if($conn->query($sql)){

    //배송번호 알아내기 

    $sqlite = "SELECT number FROM shippingstatus WHERE 
    honor = '$id' AND price = '$price'
    AND shippingprice = '$shippingprice' AND totalprice = '$totalprice' 
    AND shippingnum = '$shippingnum' AND pricestatus = 'paied'
    AND shippingstatus = 'prepared' AND paymentdate = '$date'
    AND currentdate = '$date'";

   $datas = array(); // e데이터 정보 
   
   $result = mysqli_query($conn,$sqlite);
       while($row = $result -> fetch_assoc())
       {
   
   
           $datas[] = $row; // 물건에 관한 정보가 들어있는 구간 
   
       }
   
   //    print_r($image_datas); // 이미지의 데이터 배열 
   
      echo json_encode($datas);

        $conn->close();
}else{
    echo "Error: " . $sql . "<br>" . $conn->error;
}




}
?>