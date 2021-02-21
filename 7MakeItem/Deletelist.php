<?php

$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "ItemLIst"; //물건 리스트를 넣는 공간 
$conn = new mysqli ($host, $username, $rootpassword, $dbname);

$number = $_GET["number"]; // REVISE LIST 수 

$sql = "DELETE FROM Main WHERE id = '$number'"; // 선택구문삭제하기

if($conn->query($sql)){
    $sql = "DELETE FROM listtype WHERE number = '$number'"; // 리스트타입 삭제하기
    $conn->query($sql);


    $sql = "DELETE FROM listimage WHERE number = '$number'"; // 이미지 삭제하기 
    $conn->query($sql);


}else{
        echo "error:". $sql ."<br>". $conn->error;

}
        $conn->close();
        print "<script language=javascript> alert('정상적으로 삭제되었습니다.'); location.replace('/7MakeItem/ManageList.html');   </script>";

?>