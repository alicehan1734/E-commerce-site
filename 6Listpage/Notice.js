function showPreview(event) { // 화면 미리 보기 효과 
    if(event.target.files.length >0 ){
        var src = URL.createObjectURL(event.target.files[0]); // 파일 소스 확인하기 
console.log(src);
        var preview = document.getElementById("file-ip-1-preview");
        preview.src = src; //이미지 파일 소스 보여주기 
        preview.style.display = "block"; 
    }else{
        preview.src = '#'; //이미지 파일 소스 보여주기 

    }
}

function preview() { //이미지 삭제버튼시 이미지 미리보기 없애주는 효과 

    document.getElementById('file-ip-1-preview').removeAttribute('src');
    document.getElementById('myText').value = "삭제"; //php 연결시 이미지가 삭제되었다면 이미지를 안불러오기위한 설정 
}