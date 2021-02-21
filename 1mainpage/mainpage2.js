function hoisted() {

        url = "mainpage2.php";

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

    function openPopup(url) {
        var cookiecheck = getCookie("popupYN");
        if(cookiecheck != "N"){ // cookie 가 열수 있다면 
document.getElementById("popup").style.display="block"
        }else{ // 쿠키를 열수 없다면 

        }
    }

    function  getCookie(name) {
        var cookie = document.cookie;

        console.log(cookie);

        if(document.cookie != ""){ // 쿠키가 존재 한다면 

            var cookie_array = cookie.split(";");
            console.log(cookie_array);

            for(var index in cookie_array) {
                var cookie_name = cookie_array[index].split("=");
                console.log(cookie_name);

                if(cookie_name[0] == "popupYN"){
                    return cookie_name[1];

                }
            }
        }
    }

