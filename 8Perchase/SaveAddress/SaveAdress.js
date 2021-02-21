function checkaddress(){ //처음에 주소 뿌려주는 란 
    
    const url = 'SaveAddress.php'

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.response);
                var data = xhr.response;

                
                console.log(data); // 표 형태로 나오는것
                // data = JSON.parse(data); var table = document.getElementById('listtable');
                // table.innerHTML = Array.isArray(data);
        
                console.log(typeof data);
        
                // console.log(result)
                data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기
        
                console.log(data);
                
                var pagemaximum = 5;
                var pagenumber = Math.ceil(data.length / pagemaximum); // 5페이지만 보이도록 할예정
        
                console.log(pagenumber);

                for(var i=1; i<=pagenumber; i++ ){
                    var page = '<li class="pagenumber" onclick="display('+i+')">'+i+'</li>';
                    var navigationbar = document.getElementById("navigationbar");
                    navigationbar.innerHTML += page;
                }
        

                for (var i = 0; i < pagemaximum; i++) {
                    var row = '<tr><td>' + data[i]['receiver'] + '</td><td>' + data[i]['address_num']+'/'+data[i]['address']+'/'+
                    data[i]['address_specific']+ '</' +
                            'td><td>' + data[i]['phone'] + '</td><td>' + data[i]['email'] + '</td><td>' + data[i]['msg'] + '</td><td><button onclick="apply(' + data[i]['number'] + ');" class="minibutton">적용</button> <button onclick="deleteaddress(' + data[i]['number'] + ');" class="minidelete">삭제</button></td>' +'</td></tr>';
        
                    var table = document.getElementById("customers");
                    table.innerHTML += row;
                }



            } else {
                console.error(xhr.responseText);

            }

        }
    }
    xhr.open('POST', url,true)
    xhr.send()

}

function display(num){
    
    const url = 'SaveAddress.php?caselength='+num;

    console.log("시작!!"); // 표 형태로 나오는것

    document.getElementById('customers').innerHTML = "";

    var front = '<tr><th>받으시는 분</th><th>주소 (우편번호, 주소, 상세주소)</th><th>휴대전화</th><th>이메일</th><th>배송메시지</th><th>배송지관리</th></tr>'
    var table = document.getElementById("customers");
    table.innerHTML += front;



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

        for (var i = 0; i < data.length; i++) {
            var row = '<tr><td>' + data[i]['receiver'] + '</td><td>' + data[i]['address_num']+'/'+data[i]['address']+'/'+
            data[i]['address_specific']+ '</' +
                    'td><td>' + data[i]['phone'] + '</td><td>' + data[i]['email'] + '</td><td>' + data[i]['msg'] + '</td><td><button onclick="apply(' + data[i]['number'] + ');" class="minibutton">적용</button> <button onclick="deleteaddress(' + data[i]['number'] + ');" class="minidelete">삭제</button></td>' +'</td></tr>';

            var table = document.getElementById("customers");
            table.innerHTML += row;
        }


    };

    xhr.open('get', url)
    xhr.send()

}

function createaddress(){ //주소 만드는란 
location.href="saveandchange.html" //페이지 이동 

}

function apply(number){ //주소 적용하는란 
	// window.close();
    console.log(number);

  const url = 
  'applyAddress.php?number='+number;
  //저장하기

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.response);
                console.log(typeof xhr.response)
                var data = xhr.response;

                data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기

                // 적용한 주소들 뿌리기 
                opener.document.getElementById("customer_name").value= data[0]['receiver'];
                opener.document.getElementById("sample6_postcode").value=data[0]['address_num'];
                opener.document.getElementById("sample6_address").value=data[0]['address'];
                opener.document.getElementById("sample6_detailAddress").value=data[0]['address_specific'];
                opener.document.getElementById("phone1").value=data[0]['phone'];
                opener.document.getElementById("customer_email").value=data[0]['email'];
                opener.document.getElementById("shippingmessage").value=data[0]['msg'];

                window.open('','_self').close();     


            } else {
                console.error(xhr.responseText);

            }

        }
    }
    xhr.open('GET', url,true)
    xhr.send() 

}

function deleteaddress(number){

    console.log(number);

    var r = confirm("해당 주소를 배송주소록함에서 삭제하시겠습니까?") // alert ! 

    if(r==true){  // 추가원한다면 

    }else{ //추가원하지 않는다면 
        return;
    }

  const url = 
  'deleteAddress.php?number='+number;
  //저장하기

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.response);
                console.log(typeof xhr.response)

                if(xhr.response == "ok"){
                    alert("삭제되었습니다.");
                    location.reload();
                }else{

                }

            } else {
                console.error(xhr.responseText);

            }

        }
    }
    xhr.open('GET', url,true)
    xhr.send() 

}