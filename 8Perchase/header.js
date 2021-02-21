function hoisted() {


    url = "header.php";

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.response);
                console.log(typeof xhr.response);
                if (xhr.responseText.match(false)) { /*로그인 전 */
                    document.querySelector("[id='2nd']").remove();
                    document.querySelector("[id='3rd']").remove();

                    console.log(xhr.responseText);

                } else { /*로그인 후 */

                    if(xhr.responseText.match("hj")){
                        document.querySelector("[id='1st']").remove();
                        document.querySelector("[id='2nd']").remove();


                        console.log(xhr.responseText);
                    }else{
                        document.querySelector("[id='1st']").remove();
                        document.querySelector("[id='3rd']").remove();

                        document.getElementById("2ndname").innerHTML = xhr.responseText+" 님";

                        console.log(xhr.responseText);
                    }


                }

            } else {
                console.error(xhr.responseText);

            }

        }
    }
    xhr.open('get', url)
    xhr.send()

}


