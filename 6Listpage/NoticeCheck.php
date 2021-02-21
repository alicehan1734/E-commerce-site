<?php
session_start(); ?>
<!-- 안에 대한 내용들을 볼수있도록 하는 공간  -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>

.postbig {
    text-align: center;
width:100%;
}
  .post {
      background:#FFFFFF;
      border: 1px solid gray;
      padding: 8px;
      width : 70%;
      align: center;
      display: inline-block;

  }

h1 {
  text-align: center;
  text-transform: uppercase;
  color: #4CAF50;
}

p {
  text-indent: 50px;
  text-align: justify;
  letter-spacing: 3px;
}
.button {
  background-color: #555555;
  border: none;
  color: white;
  padding: 10px 40px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  margin-left: 100px;
  margin-bottom:30px;


}
  </style>
    </head>
    <body>

        <?php include 'header.html';?>

        <?php
        $conn = mysqli_connect("127.0.0.1", "root", "root-password", "userlogin");


    if(isset($_GET["number"])){
    $number_connect = $_GET["number"];

    $query = "SELECT * FROM notice WHERE number = '$number_connect'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_array($result);

    $administration = 'hgj'; // 관리자 계정인지 확인하기 위함 

    if($row["hide"] == 'checked'){ // 숨김 글이면 관리자 외에는 볼수 없도록 한다 .
        if((isset($_SESSION['id'])) && (isset($_SESSION['nickname'])))
        {
        
        if($_SESSION['id'] != $administration) 
        {
            print "<script language=javascript> alert('해당글은 현재 숨김글 입니다. 관리자외에 볼 수 없습니다.'); history.back(-2); </script>";
        }
    }else{
        print "<script language=javascript> alert('해당글은 현재 숨김글 입니다.'); history.back(-2); </script>";
        }
    }
  
} ?>
            <h3 align="center">N O T I C E ( 자 료 실 )</h3>
           <a href="/6Listpage/NoticeList.php?page=1"> <button class="button" >목록</button> </a>

            <div class="postbig">
            <div class="post" >

            <h1 align="center"><?php echo $row["title"];?></h1>
            <p align="center"> 공지 내용 : <?php echo $row["body"];?></p>

            <?php 
if($row["images"] == ""){

}else{
    ?> <a href="image/<?php echo $row["images"];?>"><image src="image/<?php echo $row["images"];?>" width="193" height="130"></a> 
    <?php
}
?>

</div>

            </div>


    </body>
</html>