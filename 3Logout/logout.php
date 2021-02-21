<?php 
header("Content-Type:text/html;  charset=UTF-8"); 
session_start();
session_destroy();

header("Location:/1mainpage/mainpage2.html");
echo '<script>alert("로그아웃되었습니다.")</script>';

?>
