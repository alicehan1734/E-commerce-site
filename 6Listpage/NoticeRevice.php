<?php
session_start(); ?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../1mainpage/mainpage.css">

        <title>Document</title>

        <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@1,900&display=swap"
            rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link
            href="https://fonts.googleapis.com/css2?family=Poor+Story&display=swap"
            rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap"
            rel="stylesheet">

            <script type="text/javascript" src="Notice.js"></script>
        <script src="../6Listpage/header.js"></script>
		<script src="http://cdn.ckeditor.com/4.11.2/standard-all/ckeditor.js"></script>
        <style>
label input[type="file"]{
    display: none;
}
input[type="button"] {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="file"] {
  background-color: #fff;
  color: black;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
input[type="submit"] {
  background-color: #fff;
  color: black;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

label{
    background-color: #fff;
  color: black;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

        </style>
    </head>
    <body>

        <?php
include '../6Listpage/header.html';
?>

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
            print "<script language=javascript> alert('해당글은 관리자외에 볼 수 없습니다.'); history.back(-2); </script>";
        }
    }else{
        print "<script language=javascript> alert('해당글은 관리자외에 볼 수 없습니다.'); history.back(-2); </script>";
        }
    }

} ?>

    <div id="wrap" style="margin-left: 50px">
    <form method="post" action="NoticeRevice_save.php" enctype="multipart/form-data">

        <h2>게시글 수정하기</h2>
        <input type="text" cols="100" name="number" value="<?php echo $row["number"];?>" style="display:none"> <!-- 번호를 넣는 구간 --> 
        <input class="btn" type="button" value="돌아가기" onclick="javascript:history.back()">
        <a href="/6Listpage/NoticeRevice_delete.php?number=<?php echo $row["number"];?>"> 게시글 삭제하기 </a>

            <input type="hidden" value="board_write" name="command">
            <table>
                <tr>
                    <th>제목 *</th>
                    <td><input type="text" cols="100" name="title" value="<?php echo $row["title"];?>"></td>
                </tr>
                <tr>
                    <th>내용 *</th>
                    <td><textarea cols="100" rows="30" name="content"><?php echo $row["body"];?></textarea></td>
                </tr>
            </table>
            <div class="preview">
            <script>
        </script>
        <label for="image"> 사진 바꾸기 <input type="file"  id="image" name ="image" onchange='showPreview(event);'/>
</label>
            <input type="checkbox" name="hit" value="checked" id="hit" <?php echo $row["hit"]?>>Hit 표시하기</input>  
            <input  type="checkbox" name="hide" value="checked" id="hide" <?php echo $row["hide"]?>>숨기기</input> 
            <input  type="submit" class="btn" value="수정하기" name="upload">

            <div class="preview">
                <h3> 선택한 사진 </h3>
                <input  type="button" onclick="javascript:preview();" value="사진 삭제하기">
            <img id="file-ip-1-preview" name="file-ip-1-preview" src="../6Listpage/image/<?php echo $row["images"];?>"alt="없음">
            <input type="text" id= "myText" name="myText" value="asd" style="display:none"> <!-- 사진이 삭제되었는지 확인하는 구간 --> 

            </div> 
        </form>
    </div>
<!-- <div class="container">
            <textarea
                name="inputArticleContents"
                id="content"
                class="ckeditor"
                rows="20"
                cols="50"></textarea>
        </div>

		<script>
	CKEDITOR.replace( 'content', {
		height: 300,
		filebrowserUploadUrl: '../6ListPage/upload.php',filebrowserUploadMethod: 'form'

	} );
  </script>
-->
    </body>
</html>