
var confirmnumber;

window.addEventListener('load',() => { // javascript 에서 html 로부터 온 get 값을 받게하기위해서 

    const params = (new URL(document.location)).searchParams;
    const number = params.get('number'); //물건 고유의 값 
    const shipping = params.get('shipping'); //물건 고유의 값 

    confirmnumber = number;

    document.getElementById("dfdfd").innerHTML += confirmnumber;
    console.log(number);
    console.log(shipping);

    const url = 'shippingstatus.php?number='+number;

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.response);
                var data = xhr.response;

                console.log(data); 
        
                console.log(typeof data);
        
                data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기
        
                console.log(data);
                var table = document.getElementById("mainlist");

                row = '<div class="picture" id="picture"><h3 style="text-decoration: underline;">주문 상세</h3><table id="' + number+'"></table></div><h3 style="text-decoration: underline;">받는사람 정보</h3><div class="information" id="information"><table class="customers" id="table' + number+'"></table></div>'
                table.innerHTML += row;

                 
         var table = document.getElementById(number);
 
         for (var i = 0; i < data.length; i++) {
             
            var row = '<tr><td><img src="/6Listpage/image/' + data[i]['image']+'" width="70px" height="70px"></td><td><span style="text-align: center; margin-left: 100px;">' + data[i]['title']+'</span></td><td><span>| ' + data[i]['price'] * data[i]['qty']+'원 (' + data[i]['qty']+'개)</span></td></tr>';
             table.innerHTML += row;
 
         }



            } else {
                console.error(xhr.responseText);

            }

            shipdfping(shipping, number);
            status(number);

        }
    }
    xhr.open('POST', url,true)
    xhr.send()
})

function status(number){
        
    const url = 'shippinginfo.php?number='+number;

    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        console.log(data); // 표 형태로 나오는것
        // data = JSON.parse(data); var table = document.getElementById('listtable');
        // table.innerHTML = Array.isArray(data);

        console.log(typeof data);
        var table = document.getElementById('status');

        // console.log(result)
        data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기

        console.log(data);
        var shippingstatus = data[0]['shippingstatus']; //배송상황 

        if(shippingstatus == "prepared"){
            var row = '<h2 style="color: rgb(122, 184, 28);">상품준비중</h2>'; 
        }else if(shippingstatus == "shipping"){
            var row = '<h2 style="color: blue">배송중</h2>'; 

        }else if(shippingstatus == "finished"){
            var row = '<h2 style="color: red">배송완료</h2>'; 

        }
        
        table.innerHTML += row;


    };

    xhr.open('get', url)
    xhr.send()
}


function shipdfping(shipping, number){

    console.log(shipping);
    console.log(number);

    
    const url = 'shippingnum.php?number='+shipping;

    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        console.log(data); // 표 형태로 나오는것
        // data = JSON.parse(data); var table = document.getElementById('listtable');
        // table.innerHTML = Array.isArray(data);

        console.log(typeof data);

        // console.log(result)
        data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기

        console.log(data);

        var table = document.getElementById('table'+number);

        var row = '<tr><td>받으시는 분</td><td>' + data[0]['receiver']+'</td></tr><tr><td>주소</td><td>' + data[0]['address_num']+'/' + data[0]['address']+'/' + data[0]['address_specific']+'</td></tr><tr><td>휴대전화</td><td>' + data[0]['phone']+'</td></tr><tr><td>이메일</td><td>' + data[0]['email']+'</td></tr><tr><td>배송메시지</td><td>' + data[0]['msg']+'</td></tr><tr><td>결제수단</td><td>카드결제</td></tr>';
        table.innerHTML += row;



    };

    xhr.open('get', url)
    xhr.send()
}

function change(status){
    console.log(confirmnumber);
    console.log(status);

    var r = confirm("배송상태를 변경하시겠습니까?") // alert ! 

    if(r==true){  // 추가원한다면 

    }else{ //추가원하지 않는다면 
        return;

    }

    const url = 'changeshipping.php?number='+confirmnumber+'&status='+status;

    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        console.log(data); // 표 형태로 나오는것
        // data = JSON.parse(data); var table = document.getElementById('listtable');
        // table.innerHTML = Array.isArray(data);

        var shippingstatus = status; //배송상황 

        if(shippingstatus == "prepared"){
            var row = '<h2 style="color: rgb(122, 184, 28);">상품준비중</h2>'; 
        }else if(shippingstatus == "shipping"){
            var row = '<h2 style="color: blue">배송중</h2>'; 

        }else if(shippingstatus == "finished"){
            var row = '<h2 style="color: red">배송완료</h2>'; 

        }
        document.getElementById('status').innerHTML = "";

        var table = document.getElementById('status');
        table.innerHTML += row;


    };

    xhr.open('get', url)
    xhr.send()
}