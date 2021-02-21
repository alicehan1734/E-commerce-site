<?php
session_start();
$host = "127.0.0.1";
$username = "root";
$rootpassword = "root-password";
$dbname = "ItemLIst"; //물건 리스트를 넣는 공간 

$conn = new mysqli ($host, $username, $rootpassword, $dbname); 
$conn2 = mysqli_connect($host, $username, $rootpassword, $dbname); 

// define('UPLOAD_DIR', '../6Listpage/image/');
$checkimagedelete = $_POST['checkimagedelete']; // 이미지 삭제여부 확인 
// $image_parts = explode(";base64,", $_POST['changeimg1']);
// $image_type_aux = explode("../6Listpage/image/", $image_parts[0]);
// $file = UPLOAD_DIR . uniqid() . '.png';
// file_put_contents($file, $image_base64);
$casename = $_POST['casename']; //케이스 이름 
$type = $_POST['type']; //케이스 종류 
$price = $_POST['price']; //판매가 
$saleprice = $_POST['saleprice']; //할인 판매가 
$editor = $_POST['editor']; //글 내용 
$casename = $_POST['casename']; //글 내용 

$typelist=json_decode($_POST['listtype'], true);// 케이스 색과 타입들
// echo ($casename);
// echo($type);
// echo($price);
// echo($saleprice);
// echo($editor);

$now = new DateTime(); //시간 계산해주는거 
$time = $now->format('Y-m-d H:i:s');

// echo ($time); 

$salespercentage = 100-($saleprice/$price*100);
//echo ($salespercentage); 

$sql = "INSERT INTO Main(type, price, saleprice, salept, date , info ,name)
    values ('$type','$price','$saleprice', '$salespercentage', '$time','$editor','$casename')";

    if($conn->query($sql)){

        echo "success ";
        //물건리스트를 위한 테이블을 만들기 

        $sqli = "SELECT * FROM Main WHERE date = '$time' "; // 해당 테이블의 아이디 값을 찾기위해서 
        $result = $conn->query($sqli);
 
            if($result->num_rows > 0){
        
                $row = $result->fetch_array(MYSQLI_ASSOC);
            
                $number= $row['id']; // 해당 고유 아이디값 저장완료 (추후 이미지가 어떤 포스트의 이미지인지 선별하기 위해 만든거다. )
                if($checkimagedelete == "삭제"){

                }else{
                        $targetDir = "../6Listpage/image/"; // 이미지를 저장하는 공간 
                        $allowTypes = array('jpg','png','jpeg','gif'); //어떤 이미지가 가능한지 
        
                        $statusMsg = $errorMsg = $insertValuesSQL = $errorUpload = $errorUploadType = ''; // 에러 메세지 출력부분 
            $fileNames = array_filter($_FILES['files']['name']); //멀티플 파일들을 받아오는 구간 
        
            if(!empty($fileNames)){ 
                foreach($_FILES['files']['name'] as $key=>$val){ //파일 저장하는 구간 
                    // File upload path 
                    $fileName = basename($_FILES['files']['name'][$key]); 
                    $targetFilePath = $targetDir . $fileName; 
                     
                    echo $key;
                    echo "키값은!";

                    settype($key,"string");
                    
                    $pos = strpos($_POST['checkcheck'],$key);
                    echo $pos;

                    if($pos !== false) {
                        echo "같아요 ";

                    }else{
                        echo "달라요 ! ";

                    // Check whether file type is valid 
                    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
                    if(in_array($fileType, $allowTypes)){ 
                        // Upload file to server 
                        if(move_uploaded_file($_FILES["files"]["tmp_name"][$key], $targetFilePath)){ 
                            // Image db insert sql 
                            $insertValuesSQL .= "('$number','".$fileName."', NOW()),"; // 저장하는 디렉토리 정보들 넣는 구간 
                        }else{ 
                            $errorUpload .= $_FILES['files']['name'][$key].' | '; 
                        } 
                    }else{ 
                        $errorUploadType .= $_FILES['files']['name'][$key].' | '; 
                    } 

                    }
                    echo $_POST['checkcheck'];

                } 
                 
                if(!empty($insertValuesSQL)){ 
                    $insertValuesSQL = trim($insertValuesSQL, ','); 
                    // Insert image file name into database 
        
                    $sqlite = "INSERT INTO listimage(number, filnamnam, uploaded_on) VALUES  $insertValuesSQL"; // 파일 저장한다. 
                    
                    if($conn->query($sqlite)){ 
                        $errorUpload = !empty($errorUpload)?'Upload Error: '.trim($errorUpload, ' | '):''; 
                        $errorUploadType = !empty($errorUploadType)?'File Type Error: '.trim($errorUploadType, ' | '):''; 
                        $errorMsg = !empty($errorUpload)?'<br/>'.$errorUpload.'<br/>'.$errorUploadType:'<br/>'.$errorUploadType; 
                        $statusMsg = "Files are uploaded successfully.".$errorMsg; 
                    }else{ 
                        $statusMsg = "Sorry, there was an error uploading your file."; 
                        echo "error:". $conn->error;
        
                    } 
                } 
            }else{ 
                $statusMsg = 'Please select a file to upload.'; 
            } 
             
            // Display status message 
            echo $statusMsg; 
            
            }
            
                  
            if(is_array($typelist)){ // 리스트 저장하는 구간 
                
                foreach($typelist as $row)
                {

                    $sqlite2 = "INSERT INTO listtype(number, color, casetype, qty) VALUES ('$number','".$row["color"]."','".$row["case"]."', '".$row["qty"]."')";

                    
                    if($conn->query($sqlite2)){ 
                        echo "타입저장완료";

                    }else{
                        $statusMsg = "Sorry, there was an error uploading your file."; 
                        echo "error:". $conn->error;
        
                    }
                }
            }else{

            }
        }else{
            echo '<script>alert("저장못함 ")</script>';    
        }

        $sqli = "SELECT * FROM Main WHERE date = '$time' "; // 해당 테이블의 아이디 값을 찾기위해서 
        $result = $conn->query($sqli);
        print "<script language=javascript> alert('짝짝짝!! 정상적으로 저장되었습니다.'); history.back(-2);  </script>";
    }else{
        echo "error:". $sql ."<br>". $conn->error;
    }


?>


