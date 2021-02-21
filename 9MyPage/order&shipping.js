
window.addEventListener('load',() => { // javascript 에서 html 로부터 온 get 값을 받게하기위해서 
    const url = 'order&shipping.php'

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
                
                var pagemaximum = 3;
                var pagenumber = Math.ceil(data.length / pagemaximum); // 5페이지만 보이도록 할예정
        
                console.log(pagenumber);

                
                for(var i=1; i<=pagenumber; i++ ){
                    var page = '<li class="pagenumber" onclick="display('+i+')">'+i+'</li>';
                    var navigationbar = document.getElementById("navigationbar");
                    navigationbar.innerHTML += page;
                }
        
                var table = document.getElementById("mainlist");

                for (var i = 0; i < pagemaximum; i++) {

                    var number = String(data[i]['number']);

                    console.log(number);
                    
                    var row = '<div style="margin-bottom: 30px; background-color: gainsboro; padding: 5px;"  ><span>주문일 (' + data[i]['paymentdate']+')</span><span style="float: right; color: blue; margin-left: 550px; cursor:pointer;" onclick="detail(' + number+');"><<</span></div><div class="box"><div style="float: left; margin-left: 100px;">';
                    table.innerHTML += row;

                    var shippingstatus = data[i]['shippingstatus']; //배송상황 
                    if(shippingstatus == "prepared"){
                        shippingstatus = "상품준비중"
                        var row = '<h3 style="color: rgb(122, 184, 28);">'+shippingstatus+'</h3>'
                    }else if(shippingstatus == "shipping"){
                        shippingstatus = "배송중"
                        var row = '<h3 style="color: blue">'+shippingstatus+'</h3>'
                    }else if(shippingstatus == "finished"){
                        shippingstatus = "배송완료"
                        var row = '<h3 style="color: red">'+shippingstatus+'</h3>'
                    }
                    table.innerHTML += row;

                    row = '<h3>총 금액 : ' + data[i]['totalprice']+' (배송비 ' + data[i]['shippingprice']+' 포함)</h3><h3>주문번호:' + data[i]['number']+' </h3></div></div>';
                    table.innerHTML += row;

                    row = '<div class="picture" id="picture"><h3 style="text-decoration: underline;">주문 상세</h3><table id="' + number+'"></table></div><h3 style="text-decoration: underline;">받는사람 정보</h3><div class="information" id="information"><table class="customers" id="table' + number+'"></table></div>'
                    table.innerHTML += row;

                    detail(number);
                    shipping(data[i]['shippingnum'], number);
                }


            } else {
                console.error(xhr.responseText);

            }

        }
    }
    xhr.open('POST', url,true)
    xhr.send()
})

function display(num){
    

    const url = 'order&shipping.php?caselength='+num;

    console.log("시작!!"); // 표 형태로 나오는것

    document.getElementById('mainlist').innerHTML = "";


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

        var table = document.getElementById("mainlist");

        for (var i = 0; i < data.length; i++) {
            var number = String(data[i]['number']);

            var row = '<div style="margin-bottom: 30px; background-color: gainsboro; padding: 5px;"  ><span>주문일 (' + data[i]['paymentdate']+')</span><span style="float: right; color: blue; margin-left: 550px;" onclick="detail(' + data[i]['number']+');"><<</span></div><div class="box"><div style="float: left; margin-left: 100px;">';
            table.innerHTML += row;

            var shippingstatus = data[i]['shippingstatus']; //배송상황 
            if(shippingstatus == "prepared"){
                shippingstatus = "상품준비중"
                var row = '<h3 style="color: rgb(122, 184, 28);">'+shippingstatus+'</h3>'
            }else if(shippingstatus == "shipping"){
                shippingstatus = "배송중"
                var row = '<h3 style="color: blue">'+shippingstatus+'</h3>'
            }else if(shippingstatus == "finished"){
                shippingstatus = "배송완료"
                var row = '<h3 style="color: red">'+shippingstatus+'</h3>'
            }
            table.innerHTML += row;

            row = '<h3>총 금액 : ' + data[i]['totalprice']+' (배송비 ' + data[i]['shippingprice']+' 포함)</h3><h3>주문번호:' + data[i]['number']+' </h3></div></div>';
            table.innerHTML += row;

            row = '<div class="picture" id="picture"><h3 style="text-decoration: underline;">주문 상세</h3><table id="' + number+'"></table></div><h3 style="text-decoration: underline;">받는사람 정보</h3><div class="information" id="information"><table class="customers" id="table' + number+'"></table></div>'
            table.innerHTML += row;

            detail(number);
            shipping(data[i]['shippingnum'], number);
        }



    };

    xhr.open('get', url)
    xhr.send()

}

function detail(number){

     console.log(number);

     const url = 'detail.php?number='+number;

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
 
         var table = document.getElementById(number);
 
         for (var i = 0; i < data.length; i++) {
             
            var row = '<tr><td><img src="/6Listpage/image/' + data[i]['image']+'" width="70px" height="70px"></td><td><span style="text-align: center; margin-left: 100px;">' + data[i]['title']+'</span></td><td><span>| ' + data[i]['price'] * data[i]['qty']+'원 (' + data[i]['qty']+'개)</span></td></tr>';
             table.innerHTML += row;
 
         }
 
 
 
     };
 
     xhr.open('get', url)
     xhr.send()
 
}

function shipping(shipping, number){

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