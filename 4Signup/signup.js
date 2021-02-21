function checkid() {
    var reg = /^(?=.*?[a-z])(?=.*?[0-9]).{4,16}$/;
    var form = document.getElementById("form");

    var userid = document
        .getElementById("uid")
        .value;
    var text = document.getElementById("idchecksucess");

    if (false === reg.test(userid)) {
        text.innerHTML = "영문대소문자/숫자, 4~16자사이로 아이디를 입력해주세요.";
        text.style.color = "#ff0000"

    } else {
        url = "check.php?userid=" + userid;

        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    console.log(xhr.response);
                    console.log(typeof xhr.response)
                    if (xhr.responseText.match(true)) {
                        text.innerHTML = userid + "는 사용 가능한 아이디입니다. ";
                        text.style.color = "#065903"

                        form
                            .classList
                            .add("checkid");

                    } else {
                        text.innerHTML = userid + "는 이미 사용중인 아이디입니다. ";
                        text.style.color = "#ff0000"

                        form
                            .classList
                            .remove("checkid");
                    }

                } else {
                    console.error(xhr.responseText);

                }

            }
        }
        xhr.open('get', url)
        xhr.send()
    }

}

function checkpwd() {

    var form = document.getElementById("form");
    var password = document
        .getElementById("password")
        .value;
    var checkpassword = document
        .getElementById("checkpassword")
        .value;
    var text = document.getElementById("password_text");
    var top_password_text = document.getElementById("top_password_text");

    var num = password.search(/[0-9]/g);
    var eng = password.search(/[a-z]/ig);
    var spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (password.length < 10 || password.length > 16) {
        top_password_text.innerHTML = "10자리 ~ 16자리 이내로 입력해주세요.";
        top_password_text.style.color = "#ff0000"

    } else if (password.search(/\s/) != -1) {
        top_password_text.innerHTML = "비밀번호는 공백 없이 입력해주세요.";
        top_password_text.style.color = "#ff0000"

    } else if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) {
        top_password_text.innerHTML = "영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.";
        top_password_text.style.color = "#ff0000"

    } else {
        top_password_text.innerHTML = "비밀번호 정규식 확인완료";
        top_password_text.style.color = "#065903"

        if (password != checkpassword) {
            form
                .classList
                .add("uncheckpassword");
            form
                .classList
                .remove("checkpassword");
            text.innerHTML = "비밀번호를 다시한번 확인해주세요.";
            text.style.color = "#ff0000"

        } else {
            form
                .classList
                .add("checkpassword");
            form
                .classList
                .remove("uncheckpassword");
            text.innerHTML = "비밀번호 확인되었습니다.";
            text.style.color = "#065903"
        }

    }

}

function validation() {

    var form = document.getElementById("form");
    var email = document
        .getElementById("email")
        .value;
    var text = document.getElementById("email_text");
    var pattern = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (email.match(pattern)) {
        form
            .classList
            .add("valid");
        form
            .classList
            .remove("invalid");
        text.innerHTML = "이메일 확인완료";
        text.style.color = "#00ff00"

    } else {
        form
            .classList
            .remove("valid");
        form
            .classList
            .add("invalid");
        text.innerHTML = "올바른 이메일을 입력해주세요.";
        text.style.color = "#ff0000"
    }
}

function submit_1() {

    var id = document.getElementById("uid");
    var password = document.getElementById("password");
    var checkpassword = document.getElementById("checkpassword");
    var name = document.getElementById("name");
    var email = document.getElementById("email");

    if (!id.value) {
        return alert('아이디를 입력하세요')


    } else if (!password.value) {
        return alert('비밀번호를 입력하세요')


    } else if (!checkpassword.value) {
        return alert('비밀번호 중복확인 하세요')

    } else if (!name.value) {

        return alert('이름을 입력하세요')


    } else if (!email.value) {
        return alert('이메일을 입력하세요')


    } else {

        const div = document.querySelector('form');
        if (!div.classList.contains('valid')) {
            return alert('이메일 확인먼저하세요')
        }

        if (!div.classList.contains('checkid')) {
            return alert('아이디 중복확인을 해주세요.')
        }

        if (!div.classList.contains('checkpassword')) {
            return alert('비밀번호 확인먼저하세요')
        }

        var agreementservice = document
            .getElementById('agreementservice')
            .checked;
        var agreementinfo = document
            .getElementById('agreementinfo')
            .checked;

        if (!agreementservice) {
            return alert('이용약관 동의 해주세요.')
        }

        if (!agreementinfo) {
            return alert('개인정보 수집 동의 해주세요.')

        }

        alert('가입완료되었습니다.');
        document
            .getElementById("form")
            .submit();

    }

}

