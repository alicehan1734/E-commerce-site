<?php
// notice 화면 저장하는 구간 
// 업로드 버튼이 눌러질시 
    echo exec('whoami'); // 내가 누군지 확인하기 
    if(isset($_POST['upload'])){ //Notice.php 로 부터 post info 받아오기 

    $target = "image/".basename($_FILES['image']['name']); // 이미지 파일 받아온다. (이미지파일의 루트 설정 )

    $host = "127.0.0.1";
    $username = "root";
    $rootpassword = "root-password";
    $dbname = "userlogin";
    
    // 전체 받은값 가져오는 부분 
    $conn = mysqli_connect($host, $username, $rootpassword, $dbname);
    $image = $_FILES['image']['name'];
    $title = $_POST['title']; // 받은 값 가져오기 
    $content = $_POST['content']; // 받은 값 가져오기 

    if(isset($_POST['hit'])){ // hit 이미지 활성화 유무 
        $hit = $_POST['hit']; // 받은 값 가져오기 image

    }else{
        $hit = 'unchecked';
    }

    if(isset($_POST['hide'])){ //숨기기 활성화 유무 
        $hide = $_POST['hide']; // 받은 값 가져오기 

    }else{
        $hide = 'unchecked';

    }

    echo $hit; 
    echo $hide; 

    if(isset($_POST['upload'])){

        $query = "INSERT INTO notice(title,body,images,hide,hit) VALUES('$title','$content','$image','$hide','$hit' )"; // mysql 에 저장한다. 
        mysqli_query($conn,$query);

        if(move_uploaded_file($_FILES['image']['tmp_name'],$target )) { // 이미지 차일을 업로드 한다. $target 은 이미지 파일의 루트다 

        $msg = "image uploaded "; //업로드 성공 
        
        }else{
            $msg = "image uploaded bad  "; // 업로드 실패 
        }

        header("Location:../6Listpage/NoticeList.php?page=1"); //초기 notice list 화면으로 돌아간다 .

    }

}else{

}



?>
