<?php 
session_start(); 

$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "Directoryshop"; //장바구니 
$conn = new mysqli ($host, $username, $rootpassword, $dbname);

$checksame = $_GET["checksame"]; // 
$number = $_GET["number"]; // 
$title = $_GET["title"]; // 
$image = $_GET["image"]; // 
$fee = $_GET["fee"]; // 
$username = $_SESSION['id'];
// $image_datas = array(); // 사진 정보 
$myJSON=json_decode($_GET["myJSON"], true);// 케이스 색과 타입들

foreach($myJSON as $row){
$sqlite = "SELECT * FROM directory WHERE type = '".$row["case"]."' AND color = '".$row["color"]."' AND productnumber='$number' AND honor ='$username';";
$result = $conn->query($sqlite);

if(!empty($result) && $result->num_rows > 0){ // 같은게 있을경우 (체크한다 )
 $finalcheck = "있다.";
}else{

}}

if(is_array($myJSON)){ // 리스트 저장하는 구간 
            
    foreach($myJSON as $row)
    {
        $sqlite = "SELECT * FROM directory WHERE type = '".$row["case"]."' AND color = '".$row["color"]."' AND productnumber='$number' AND honor ='$username'  AND status is null;";
        $result = $conn->query($sqlite);

        if(!empty($result) && $result->num_rows > 0){ // 같은게 있을경우 

            echo "same";
    if($checksame == "apply"){ //적용할 경우 (동일한 상품일 경우 기존에 있는 값과 선택한값이 더해진다. )
     
        
            $row2 = $result->fetch_array(MYSQLI_ASSOC);

            $row["qty"] = $row["qty"]+$row2['qty'];
            
            $sql = "UPDATE directory SET qty='".$row["qty"]."' WHERE type = '".$row["case"]."' AND color = '".$row["color"]."' AND productnumber='$number' AND honor ='$username';";

            if (mysqli_query($conn, $sql)) {
            //   echo "Record updated successfully";
            } else {
            //   echo "Error updating record: " . mysqli_error($conn);
            }


    }else if($checksame == "regret"){ //무시할 경우 (장바구니에 있는 값을 전에 선택한값으로 교체된다. )
    
    
        // $sql = "UPDATE directory SET qty='".$row["qty"]."' WHERE type = '".$row["case"]."' AND color = '".$row["color"]."' AND productnumber='$number' AND honor ='$username';";

// if (mysqli_query($conn, $sql)) {
//   echo "Record updated successfully";
// } else {
//   echo "Error updating record: " . mysqli_error($conn);
// }

    }else{ // 물어보기 
        echo "tell";
    }
        }else{ // 장바구니에 존재하지 않을 경우 

            if($finalcheck == "있다."){ // 초반에 한번 더 체크해준다. 

                if($checksame == "apply"){ // 설정했었는지 
                    $sqlite2 = "INSERT INTO directory(productnumber, title, type, color, qty, price, image, honor) VALUES ('$number','$title','".$row["case"]."','".$row["color"]."','".$row["qty"]."','".$row["fee"]."','$image','$username')";

                    if($conn->query($sqlite2)){ 
                        // echo "타입저장완료";
        
                    }else{
                        $statusMsg = "Sorry, there was an error uploading your file."; 
                        // echo "error:". $conn->error;
                    
                    }
                }else if($checksame == "regret"){// 설정했었는지 
                    $sqlite2 = "INSERT INTO directory(productnumber, title, type, color, qty, price, image, honor) VALUES ('$number','$title','".$row["case"]."','".$row["color"]."','".$row["qty"]."','".$row["fee"]."','$image','$username')";

                    if($conn->query($sqlite2)){ 
                        // echo "타입저장완료";
        
                    }else{
                        $statusMsg = "Sorry, there was an error uploading your file."; 
                        // echo "error:". $conn->error;
                    
                    }
                }

            }else{// 현재 전체 존재하는 장바구니가 없을경우 바로 넘어오기위함 . 
                $sqlite2 = "INSERT INTO directory(productnumber, title, type, color, qty, price, image, honor) VALUES ('$number','$title','".$row["case"]."','".$row["color"]."','".$row["qty"]."','".$row["fee"]."','$image','$username')";

                if($conn->query($sqlite2)){ 
                    // echo "타입저장완료";
    
                }else{
                    $statusMsg = "Sorry, there was an error uploading your file."; 
                    // echo "error:". $conn->error;
                
                }
            }

            
        }

    }

     print "<script language=javascript>location.replace('/8Perchase/pocket.html');</script>";

}else{

}

?>
