<?php
session_start();

if (isset ($_POST['id'])) {
    $id = $_POST['id'];
}
if (isset ($_POST['password'])) {
    $password = $_POST['password'];
}

$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "userlogin";


$conn = new mysqli($host, $username, $rootpassword, $dbname);

if($conn->connect_errno){
    die('Connect Error ('.mysqli_connect_errno().')' . mysqli_connect_error());
}
else{
    $sqli = "SELECT * FROM userinfo WHERE id = '$id' ";
    $result = $conn->query($sqli);


if($result->num_rows > 0){
    $row = $result->fetch_array(MYSQLI_ASSOC);

    if($row['passwd'] == $password) {

        $_SESSION['id'] = $id;
        $_SESSION['nickname'] = $row["username"];
        header("Location:/1mainpage/mainpage2.html");      

    }else{
        echo '<script>alert("아이디 또는 비밀번호가 일치하지 않습니다.")</script>';
        echo "<script>location.replace('../2Login/loginpage.html')</script>";

    }

}else{
    echo '<script>alert("아이디 또는 비밀번호가 일치하지 않습니다.")</script>';
    echo "<script>location.replace('../2Login/loginpage.html')</script>";


}
}
?>