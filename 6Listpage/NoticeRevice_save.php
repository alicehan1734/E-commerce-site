<?php

// 업로드 버튼이 눌러질시 
    echo exec('whoami'); 
if(isset($_POST['upload'])){

    $target = "image/".basename($_FILES['image']['name']);

    $host = "127.0.0.1";
    $username = "root";
    $rootpassword = "root-password";
    $dbname = "userlogin";
    
    
    $conn = mysqli_connect($host, $username, $rootpassword, $dbname);
    $image = $_FILES['image']['name']; //사진 수정될값 
    $title = $_POST['title']; // 받은 값 가져오기 
    $content = $_POST['content']; // 받은 값 가져오기 
    $number = $_POST['number']; // 받은 값 가져오기 
    $preview = $_POST['myText']; // 받은 값 가져오기 

    echo $preview ; //사진이 삭제되었는지 확인하기 .
echo $image;

    if(isset($_POST['hit'])){
        $hit = $_POST['hit']; // 받은 값 가져오기 image

    }else{
        $hit = 'unchecked';
    }

    if(isset($_POST['hide'])){
        $hide = $_POST['hide']; // 받은 값 가져오기 

    }else{
        $hide = 'unchecked';

    }

    echo $hit; 
    echo $hide; 

    if($preview == "삭제"){
        $image = "";
    }else{
if($image == ""){
    if(isset($_POST['upload'])){

        $query = "UPDATE notice SET title = '$title',body = '$content' ,hide = '$hide',hit = '$hit' WHERE number =  '$number' ";
        mysqli_query($conn,$query);


    }
}else{
    if(isset($_POST['upload'])){

        $query = "UPDATE notice SET title = '$title',body = '$content',images = '$image' ,hide = '$hide',hit = '$hit' WHERE number =  '$number' ";
        mysqli_query($conn,$query);

        if(move_uploaded_file($_FILES['image']['tmp_name'],$target )) {

        $msg = "image uploaded ";
        
        }else{
            $msg = "image uploaded bad  ";
        }


    }
}
    }



}else{

}

header("Location:../6Listpage/NoticeList.php?page=1"); //초기 notice list 화면으로 돌아간다 .


?>
