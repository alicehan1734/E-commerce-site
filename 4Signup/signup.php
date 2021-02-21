<?php 

session_start();

$id = $_POST['myid'];
$password = $_POST['mypassword'];
$name = $_POST['myname'];
$email = $_POST['myemail'];

if(!empty($id)){
if(!empty($password)){
if(!empty($name)){
if(!empty($email)){
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

    echo "중복확인버튼을 눌러주세요.";
    die();

}else{
    $sql = "INSERT INTO userinfo(id, passwd, username, email)
    values ('$id','$password','$name', '$email')";

    if($conn->query($sql)){

$_SESSION['id'] = $id;
$_SESSION['nickname'] = $name;

if(isset($_SESSION['id'])&&isset($_SESSION['nickname'])){
    header("Location:../1mainpage/mainpage2.html");
    
}else{
    echo '<script>alert("로그인 실패!!!!")</script>';

}
        
    }else{
        echo "error:". $sql ."<br>". $conn->error;
    }


    $conn->close();
}

}

}else{
    echo '<script>alert("이메일을 입력하세요.")</script>';
    die();
    
}
}else{
    echo '<script>alert("이름을 입력하세요.")</script>';
    die();
}
}else{
    echo '<script>alert("비밀번호를 입력하세요.")</script>';
    die();
}
}else{
    echo '<script>alert("아이디를 입력하세요.")</script>'; 
    die();
}

?>
