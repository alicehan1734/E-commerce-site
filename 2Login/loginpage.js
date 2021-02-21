function login(){

    var password = document.getElementById("password");
    var id = document.getElementById("id");

    if(!id.value){
        return alert("아이디를 입력하세요")
    }

    if(!password.value){
        return alert("비밀번호를 입력하세요")
    }

    document
    .getElementById("form")
    .submit();

    /* 오류 뜨니 다시 해보기 !!! */
    const url = '/loginpage.php'

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.response);
                console.log(typeof xhr.response)
                if (xhr.responseText.match(true)) {
    
                    return alert("아이디 또는 비밀번호가 일치하지 않습니다.")

                } else {

                }

            } else {
                console.error(xhr.responseText);

            }

        }
    }
    xhr.open('POST', url,true)
    xhr.send()

}