
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

            <script src="Notice.js"></script>
        <script src="../6Listpage/header.js"></script>
		<script src="http://cdn.ckeditor.com/4.11.2/standard-all/ckeditor.js"></script>

        <style>
.wrap{
    margin-left:50px;
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

            </style>
    </head>
    <body>

        <?php
include '../6Listpage/header.html';//초기 header 보여주기 
?>
    <div id="wrap" class="wrap">
        <h2>게시글 작성</h2>
        <input class="btn" type="button" value="돌아가기" onclick="javascript:history.back()">

        <form method="post" action="Notice_save.php" enctype="multipart/form-data">
            <input type="hidden" value="board_write" name="command">
            <table>
                <tr>
                    <th>제목</th>
                    <td><input type="text" cols="100" name="title"></td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td><textarea cols="100" rows="30" name="content"></textarea></td>
                </tr>
            </table>
            <div class="preview">
            <input type="file"  name ="image" onchange='showPreview(event);'/>
            <input type="checkbox" name="hit" value="checked" id="hit">Hit 표시하기</input>  
            <input  type="checkbox" name="hide" value="checked" id="hide" >숨기기</input> 
            <input  type="submit" class="btn" value="등록" name="upload">

            <div class="preview">
            <img id="file-ip-1-preview">
            
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