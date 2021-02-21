<?php
 session_start(); 

$connect = mysqli_connect("127.0.0.1", "root", "root-password", "userlogin");
$record_per_page = 5;
$page = '';
if(isset($_GET["page"]))
{
 $page = $_GET["page"];
}
else
{
 $page = 1;
}

$start_from = ($page-1)*$record_per_page;

if((isset($_SESSION['id'])) && (isset($_SESSION['nickname'])))
{
  
  if($_SESSION['id'] == 'hgj') 
  {
    $query = "SELECT * FROM notice order by number DESC LIMIT $start_from, $record_per_page";

  }
  else{

    $query = "SELECT * FROM notice WHERE hide = 'unchecked' order by number DESC LIMIT $start_from, $record_per_page";

  }


}else{
    $query = "SELECT * FROM notice WHERE hide = 'unchecked' order by number DESC LIMIT $start_from, $record_per_page";

}

$result = mysqli_query($connect, $query);

?>

<!DOCTYPE html>
<html>
    <head>
        <title>N O T I C E ( 자 료 실 )</title>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
            <style>

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
  margin-left:50%;
}
.buttonclass{
  text-align: center;

}
  .number a{
    padding:8px 16px;
   color:#333;
   font-weight:bold;
  }

  .table {
      background:;
  }
  </style>
    </head>
    <body>

        <?php

        include 'header.html';?>

        <br/><br/>
        <div class="container">
            <h3 align="center">N O T I C E ( 자 료 실 )</h3><br/>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <tr class="table">
                        <td>제목</td>

                        <?php 
          $administration = 'hgj'; // 관리자 계정인지 확인하기 위함 

          if((isset($_SESSION['id'])) && (isset($_SESSION['nickname'])))
        {
  
         if($_SESSION['id'] == $administration) 
         {?>
                        <td>수정</td>
                        <td>나만보기 (숨기기)</td>

                    <?php
          }
            else{
           }}?>

                    </tr>
                    <?php
     while($row = mysqli_fetch_array($result))
     {
     ?>
                    <tr>

                        <td> 
                            <a href="NoticeCheck.php?number=<?php echo $row["number"];?>"> <?php echo $row["title"]; ?>
                            <?php if($row["hit"] == 'checked') 
                    {?>
                            <img src="http://img.echosting.cafe24.com/design/skin/admin/ko_KR/ico_hit.gif">
                        <?php }
                        else{

                        }?> </a>
                        </td>
                        <?php 
  $administration = 'hgj'; // 관리자 계정인지 확인하기 위함 
  
  if((isset($_SESSION['id'])) && (isset($_SESSION['nickname'])))
  {
  
  if($_SESSION['id'] == $administration) 
  {?>
                        <td>
                            <a href="NoticeRevice.php?number=<?php echo $row["number"];?>">수정하기</a>
                        </td>

                        <td>
                        <?php echo $row["hide"]; ?>
                        </td>
                    <?php
  }
  else{
  }}?>

                    </tr>
                    <?php
     }
     ?>
                </table>
                <div align="center" class="number">
                    <br/>

                    <?php
    $page_query = "SELECT * FROM notice WHERE hide = 'unchecked'  ORDER BY number DESC";
    $page_result = mysqli_query($connect, $page_query);
    $total_records = mysqli_num_rows($page_result);
    $total_pages = ceil($total_records/$record_per_page); // $total_pages 는 우리 의 현재 몇페이지가 있는지 확인해준다<</div>


    $start_loop = $page; // 현재 위치하고 있는 페이지 
    $difference = $total_pages - $page; // 1 - 3 

    if($difference <= 5)
    {
     $start_loop = $total_pages - 5;
    }

    $end_loop = $start_loop + 4;


    if($page > 1)  {
     echo "<a href='NoticeList.php?page=1'>    First   </a>";
     echo "<a href='NoticeList.php?page=".($page - 1)."'>   <<   </a>";
    }

    for($i=$start_loop; $i<=$total_pages; $i++)
    {     
      if($i > 0) {
        echo "<a href='NoticeList.php?page=".$i."'>".   $i   ."</a>";

      }
    }

    if($page <= $end_loop)
    {
     echo "<a href='NoticeList.php?page=".($page + 1)."'>   >>   </a>";
     echo "<a href='NoticeList.php?page=".$total_pages."'>   Last   </a>";
    }

    ?>
                </div>
                <br/><br/>
            </div>
        </div>
        <?php 


$administration = 'hgj'; // 관리자 계정인지 확인하기 위함 

if((isset($_SESSION['id'])) && (isset($_SESSION['nickname'])))
{

if($_SESSION['id'] == $administration) 
{?>
<div class="buttonclass">
        <a href="../6Listpage/Notice.php"> <button class="button" >새로운 공지 작성하기</button> </a>
        </div>
    <?php
}
else{
}}?>
    </body>
</html>