function back(){  //뒤로가기 후 새로고침이 필요할때 사용한다.
    location.href = document.referrer; 
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

function save(){

    
    
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
    
  const url = 
  'saveandchange.php?receiver='+document.getElementById("customer_name").value
  +'&postnumber='+document.getElementById("sample6_postcode").value
  +'&postaddress='+document.getElementById("sample6_address").value
  +'&postdetail='+document.getElementById("sample6_detailAddress").value
  +"&phone="+document.getElementById("phone1").value
  +"&email="+document.getElementById("customer_email").value
  +"&shipping="+document.getElementById('shippingmessage').value;
  //저장하기

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.response);
                console.log(typeof xhr.response)

                if(xhr.response == "ok"){
                    alert("저장되었습니다.");
                    location.href = document.referrer; //뒤로가기 후 새로고침이 필요할때 사용한다.
                }

                if( xhr.response =="none"){
                    alert("해당배송지는 이미 등록되어있습니다.");

                }
            } else {
                console.error(xhr.responseText);

            }

        }
    }
    xhr.open('GET', url,true)
    xhr.send() 

   /* location.href=  'saveandchange.php?receiver='+document.getElementById("customer_name").value
  +'&postnumber='+document.getElementById("sample6_postcode").value
  +'&postaddress='+document.getElementById("sample6_address").value
  +'&postdetail='+document.getElementById("sample6_detailAddress").value
  +"&phone="+document.getElementById("phone1").value
  +"&email="+document.getElementById("customer_email").value
  +"&shipping="+document.getElementById('shippingmessage').value;*/

}

}