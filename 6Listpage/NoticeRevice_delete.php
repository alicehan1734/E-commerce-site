<?php
session_start();

if(isset($_GET["number"])){
    $number_connect = $_GET["number"];
    $conn = mysqli_connect("127.0.0.1", "root", "root-password", "userlogin");

    $query = "DELETE FROM notice WHERE number = '$number_connect'";
    mysqli_query($conn,$query);

    header("Location:../6Listpage/NoticeList.php?page=1"); //초기 notice list 화면으로 돌아간다 .

} ?>