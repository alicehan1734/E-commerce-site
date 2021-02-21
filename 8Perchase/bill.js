var pocketarray; // 장바구니 array 값 

window.addEventListener('load',() => { // javascript 에서 html 로부터 온 get 값을 받게하기위해서 

    const params = (new URL(document.location)).searchParams;
    const myJSON = params.get('myJSON'); //물건 고유의 값 

    pocketarray = myJSON;

    url = "bill.php?myJSON=" + myJSON;

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
        console.log(data.length);

        var table = document.getElementById("tbody"); //테이블 밑의 body 에서 리스트 넣기 (안되고있는 상황 )

        var totalnumber = 0 ;
var shippingfee = 3000;

        for (var i = 0; i < data.length ; i++ ) {
            var row = table.insertRow(0); // row 확인하기
            var cell0 = row.insertCell(0); // 체크박스
            var cell1 = row.insertCell(1); // 이미지
            var cell2 = row.insertCell(2); // 주문상품정보
            var cell3 = row.insertCell(3); // 수량
            cell0.innerHTML = '<img width="50px" height="50px" src="/6Listpage/image/'+data[i]['image']+'">'; 
            cell1.innerHTML = '<a href=/6Listpage/MainProduct.html?number='+data[i]['productnumber']+'>'+data[i]['title']+'물품명</a><span>('+data[i]['color']+' - '+data[i]['type']+' )</span>'; 
            cell2.innerHTML = '<text id="'+data[i]['number']+'_qty">'+data[i]['qty']+'</text>'; // 수량을 넣는다.
            cell3.innerHTML = '<text value="'+data[i]['price']*data[i]['qty']+'">'+data[i]['price']*data[i]['qty']+'원</text>';
           
            console.log(data[i]['productnumber']);
            totalnumber = totalnumber + (data[i]['price']*data[i]['qty']);
            // pocketarray.push(data[i]['number']); // 장바구니에 리스트 넘버값 넣기 

        }

        if(totalnumber>=30000){
            shippingfee = 0; // 배송비 0원 

        }

        var  totalfee = totalnumber + shippingfee;
        document.getElementById('amount').innerHTML = totalnumber +"원"; 
        document.getElementById('shippingamount').innerHTML = shippingfee+"원";
        document.getElementById('totalamount').innerHTML = totalfee+"원";

    };

    xhr.open('get', url)
    xhr.send()


})


function checksession(){
    url = "../1mainpage/mainpage2.php"; //session 확인하기 

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.response);
                console.log(typeof xhr.response);
                if (xhr.responseText.match(false)) { /*로그인 전 */

                    alert("로그인후 이용해주세요.");
                    history.back(-2);  //뒤로가기
                    return;

                } else { /*로그인 후 */

                    if(xhr.responseText.match("hj")){ //관리자 모드 

                        alert("관리자는 이용이 불가합니다. 일반계정으로 이용해주세요.");
                        history.back(-2);  //뒤로가기
                        return;

                    }else{ // 일반회원모드 
                        console.log(xhr.responseText);
                        document.getElementById("nickname").innerHTML="("+xhr.responseText+"님)"; //일반회원에 닉네임 보여주기 
                    }

                }

            } else {
                console.error(xhr.responseText); //에러 check 
            }

        }
    }
    xhr.open('get', url)
    xhr.send()
}


function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.

            } else {
                document.getElementById("sample6_detailAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}

function radiocheck(num){

    if (num=="new"){ //새로운 배송지 
        var inputs = document.getElementsByTagName('input');
        for (var i=0 ; i < inputs.length ; i++){
          if (inputs[i].type == "text"){
              inputs[i].value = "";
            }
        }
   
    }else{ //회원정보와 동일 
        url = "getpersonalinfo.php"; //session 확인하기 

        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    var data = xhr.response;
                    console.log(data); // 표 형태로 나오는것
        
                    data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기
            
                    console.log(data);
                    console.log(data.length);

            
                    for (var i = 0; i < data.length ; i++ ) {
                   
                        
                        document.getElementById("customer_name").value = data[i]['username'];
                        document.getElementById("customer_email").value = data[i]['email'];

                    }
            
                } else {
                    console.error(xhr.responseText); //에러 check 
                }
    
                
            }
        }
        xhr.open('get', url)
        xhr.send()

    }
}



function Finalorder() {
// 1. 결제 정보 저장하기
// 2. 결제 수단 확인하기 
// 3. 정보 기존에 있는건지 확인하기 

var is_empty = false; //빈값인지 
$('#shippingform').find('input[type!="hidden"]').each(function(){
    if(!$(this).val()) {

        if($(this).attr("data-name") == "배송메시지"){ //배송메시지는 필수 항목에 제외 
            
            is_empty = false;

        }else{

            is_empty = true; // 빈값이다. 
            alert($(this).attr("data-name")+ " 항목을 입력하세요."); 
            document.getElementById($(this).attr("id")).focus();
            return false; // 나가기 용 

        }
    }

});

if(!is_empty) {
    
    if(document.getElementById("card").checked ){ // 결제수단 선택되어있는지 확인하기. 

    request_price(); //부트페이 실행하기


    //결제완료된것들 새로운 db d
    }else{
        alert("4. 결제 수단을 선택해주세요.")
        
    }

}

}

function phonecheck() { // 오류남 

    // var num = $("#phone1").val(); 
    // console.log(num);

    // var phone_num = num.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3"); $("#phone1").val(phone_num);

}


function request_price(){ //결제 api  

    BootPay.request({
        price: document.getElementById("totalamount").innerHTML, //실제 결제되는 가격
        application_id: "5fd6458e2fa5c2002f038532",
        name: 'Placeit핸드폰케이스', //결제창에서 보여질 이름
        pg: 'inicis',
        method: 'card', //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
        show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
        items: [
            {
                item_name: '나는 아이템', //상품명
                qty: 1, //수량
                unique: '123', //해당 상품을 구분짓는 primary key
                price: 1000, //상품 단가
                cat1: 'TOP', // 대표 상품의 카테고리 상, 50글자 이내
                cat2: '티셔츠', // 대표 상품의 카테고리 중, 50글자 이내
                cat3: '라운드 티', // 대표상품의 카테고리 하, 50글자 이내
            }
        ],
        user_info: {
            username: 'heeyeon',
            email: 'ammuliya@naver.com  ',
            addr: '주소',
            phone: '010-1234-4567'
        },
        order_id: '고유 order', //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
        params: {callback1: '그대로 콜백받을 변수 1', callback2: '그대로 콜백받을 변수 2', customvar1234: '변수명도 마음대로'},
        account_expire_at: '2020-10-25', // 가상계좌 입금기간 제한 ( yyyy-mm-dd 포멧으로 입력해주세요. 가상계좌만 적용됩니다. )
        extra: {
            start_at: '2019-05-10', // 정기 결제 시작일 - 시작일을 지정하지 않으면 그 날 당일로부터 결제가 가능한 Billing key 지급
            end_at: '2022-05-10', // 정기결제 만료일 -  기간 없음 - 무제한
            vbank_result: 1, // 가상계좌 사용시 사용, 가상계좌 결과창을 볼지(1), 말지(0), 미설정시 봄(1)
            quota: '0,2,3', // 결제금액이 5만원 이상시 할부개월 허용범위를 설정할 수 있음, [0(일시불), 2개월, 3개월] 허용, 미설정시 12개월까지 허용,
            theme: 'purple', // [ red, purple(기본), custom ]
            custom_background: '#00a086', // [ theme가 custom 일 때 background 색상 지정 가능 ]
            custom_font_color: '#ffffff' // [ theme가 custom 일 때 font color 색상 지정 가능 ]
        }
    }).error(function (data) {
        //결제 진행시 에러가 발생하면 수행됩니다.
        console.log(data);
    }).cancel(function (data) {
        //결제가 취소되면 수행됩니다.
        console.log(data);
    }).ready(function (data) {
        // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
        console.log(data);
    }).confirm(function (data) {
        //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
        //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
        console.log(data);
        var enable = true; // 재고 수량 관리 로직 혹은 다른 처리
        if (enable) {
            BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
        } else {
            BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
        }
    }).close(function (data) {
        // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
        console.log(data);
    }).done(function (data) {
        //결제가 정상적으로 완료되면 수행됩니다
        //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
        console.log(data);
        console.log("성공!!!");
        allinall(); //결제가 성공될시 결제정보를 저장한다. ( 부트페이 안에다가 넣을 예정) 
    });

}

function checkemail(){ //주소록 보기란 

    window.open( 

		"SaveAddress/SaveAddress.html", //새창에서 실행할 문서

		"주소록 찾기", //새창 타이틀

		"toolbar=no, width=800, height=450, top=150, left=150", //크기 및 옵션
    );
    

}

function allinall(){

    const url = 
    'checkshipping.php?receiver='+document.getElementById("customer_name").value
    +'&postnumber='+document.getElementById("sample6_postcode").value
    +'&postaddress='+document.getElementById("sample6_address").value
    +'&postdetail='+document.getElementById("sample6_detailAddress").value
    +"&phone="+document.getElementById("phone1").value
    +"&email="+document.getElementById("customer_email").value
    +"&shipping="+document.getElementById('shippingmessage').value;
    
    var shippingnumber;
    
    console.log(url);
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.response);
                console.log(typeof xhr.response)
                var data = xhr.response;
    
                data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기
    
                shippingnumber = data[0]['number'];
    
                console.log(shippingnumber); //배송지 주소번호 
                console.log(pocketarray); //징바구니 배열 
              
      
                savepayment(shippingnumber);

            
            } else {
                console.error(xhr.responseText);
    
            }
    
        }
    }
    xhr.open('get', url)
    xhr.send()
}

function savepayment(shippingnumber){

    const url = //payment에 대한 정보 저장하는 곳 
    'savepayment.php?price='+amount.innerHTML
    +'&shippingprice='+shippingamount.innerHTML
    +'&totalprice='+totalamount.innerHTML
    +'&shippingnum='+shippingnumber
    ;
        
    console.log(url);
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.response);
                console.log(typeof xhr.response)
                var data = xhr.response;
    
                data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기
    
                shippingnumber = data[0]['number']; //배송정보의 번호 

                changedirectory(shippingnumber); //장바구니의 상태 바꾸기
    
            } else {
                console.error(xhr.responseText);
    
            }
    
        }
    }
    xhr.open('get', url)
    xhr.send()

}

function changedirectory(shippingnumber){

      
    console.log(pocketarray); //징바구니 배열 
    console.log(shippingnumber); //배송저장된 주소번호 

    const url = //payment에 대한 정보 저장하는 곳 
    'changedirectory.php?pocketarray='+pocketarray
    +'&shippingnumber='+shippingnumber;
      
    console.log(url);
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
 
                location.href='success.html?shippingnum='+shippingnumber;

            } else {
                console.error(xhr.responseText);
    
            }
    
        }
    }
    xhr.open('get', url)
    xhr.send()

}