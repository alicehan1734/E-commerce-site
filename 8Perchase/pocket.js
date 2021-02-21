var samename; //고객님이름
var sameamount; //첫 총금액 
var array = new Array(); // 장바구니 array 값 

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
                        getlist(); // 하단의 장바구니 리스트 보여주기 
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

function getlist(){ //장바구니 리스트 가져오기 

    url = "pocket.php"; // 리스트 가져오는 php 

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        console.log(data); // 표 형태로 나오는것

        data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기

        console.log(data);
        var table = document.getElementById("tbody"); //테이블 밑의 body 에서 리스트 넣기 (안되고있는 상황 )

        if(data.length == 0){
            document.getElementById("basketempty").style.display = "block"
        }
        for(var i=0; i<data.length ; i++){

            var row = table.insertRow(0); // row 확인하기
            var cell0 = row.insertCell(0); // 체크박스
            var cell1 = row.insertCell(1); // 이미지
            var cell2 = row.insertCell(2); // 주문상품정보
            var cell3 = row.insertCell(3); // 수량
            var cell4 = row.insertCell(4); // 가격
            var cell5 = row.insertCell(5); // 삭제

            cell0.innerHTML = '<input type="checkbox" name="foo" id="button_'+data[i]['number']+'" value="'+data[i]['number']+'"onclick="firstbuttoncheck();">'; 
            cell1.innerHTML = '<img width="50px" height="50px" src="/6Listpage/image/'+data[i]['image']+'">'; 
            cell2.innerHTML = '<div class="info"><a href=/6Listpage/MainProduct.html?number='+data[i]['productnumber']+'>'+data[i]['title']+'물품명</a><span>('+data[i]['color']+' - '+data[i]['type']+' )</span><button class="buttonchange" onclick="changeporoduct(this);" value="'+data[i]['number']+'">옵션변경</button></div><div id="'+data[i]['number']+'_typelist" style="display: none;"><select id="'+data[i]['number']+'_color" name="color"><option>-선택-</option><option>---------------------------</option></select></div>'; // 수량을 넣는다.
            cell3.innerHTML = '<div class="qty"><button class="plus-btn" value="'+data[i]['number']+'" onclick="plus(this);" type="button" name="button">+</button><text id="'+data[i]['number']+'_qty">'+data[i]['qty']+'</text><button class="minus-btn" type="button" value="'+data[i]['number']+'" onclick="minus(this);" name="button">-</button></div></td>';
            cell4.innerHTML = '<text value="'+data[i]['price']*data[i]['qty']+'">'+data[i]['price']*data[i]['qty']+'원</text>';
            cell5.innerHTML = '<img src="delete.png"  onclick="trash('+data[i]['number']+');" width="30px" height="30px">';
       
            sameamount += data[i]['price']*data[i]['qty']; //최종금액 확인하기위해  (firstbuttoncheck(); 에서 쓰일 예정  )

            array.push(data[i]['number']); // 장바구니에 리스트 넘버값 넣기 

        }

        document.getElementById('button_allcheck').checked= true;
        checkboxes = document.getElementsByName('foo'); //하단의 체크하는것들 
    
        for(var i=0, n=checkboxes.length;i<n;i++) {
            checkboxes[i].checked = true; // 상단의 체크 상태에 하단의 체크들을 대입한다. 
          }

          firstbuttoncheck(); //  체크되어있는것 계산하기 

    };

    xhr.open('get', url)
    xhr.send()



}

function allcheck(source) { //allselect 상황 확인하기 
    checkboxes = document.getElementsByName('foo'); //하단의 체크하는것들 

    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked; // 상단의 체크 상태에 하단의 체크들을 대입한다. 
      }

      firstbuttoncheck(); //  체크되어있는것 계산하기 

}

function firstbuttoncheck(){ // 체크 되어있는 값들 찾기 

     
console.log(    $("input[name=foo]").length); // 전체 체크 갯수 
console.log(    $("input[name=foo]:checked").length); // 체크된것들만의 갯수 

if( $("input[name=foo]").length == $("input[name=foo]:checked").length ){ // 전체 체크되어있는지 유무 확인 
    document.getElementById('button_allcheck').checked= true; // 전체체크 할수있는 버튼 활성화 

}else{
    document.getElementById('button_allcheck').checked= false; // 전체체크 할수있는 버튼 비활성화 

}
        var checkbox = $("input[name=foo]:checked");
        var product = 0 ; // 총 상품 금액 
        var shippingfee = 3000; //배송비 
        var totalfee = 0; // 결제예상금액

        checkbox.each(function(i){

            var tr = checkbox.parent().parent().eq(i);
            var td = tr.children();
            
            var no = Number(td.eq(4).text().replace(/[^0-9]/g,"")); // 정규식으로 한글로 된것은 제외시키기 

            product = product + no;

        });

        if(product>=30000){ // 3만원 이상일때 
            shippingfee = 0; // 배송비 0원 
        }else if(product == 0 ){
            shippingfee = 0; // 배송비 0원 
        }

        totalfee = product + shippingfee;
        document.getElementById('amount').innerHTML = product +"원"; 
        document.getElementById('shippingamount').innerHTML = shippingfee+"원";
        document.getElementById('totalamount').innerHTML = totalfee+"원";

        console.log(product);

}

var samenumber; // 공통으로 사용하는 케이스의 고유번호

function changeporoduct(num){ //옵션변경하기 
    console.log(num.value);
    console.log(num);
    samenumber = num.value;
    console.log(samenumber);

    if(document.getElementById(num.value+"_typelist").style.display == "none"){
        document.getElementById(num.value+"_typelist").style.display = "block"; //옵션 변경하는것 보여주기 
        checkcolor(num.value);

    }else{
        document.getElementById(num.value+"_typelist").style.display = "none";

    }
}


function checkcolor(num){
    console.log(num);

    url = "checkcolor.php?number=" + num; // num 은 현재있는 아이의 번호 ( 리스트)
    document.getElementById(num+'_color').innerHTML = "";

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

        for(var i=0; i<data.length ; i++){

                $('#'+num+'_color').append(
                    '<option value="'+data[i]['id']+'" onclick="additems('+data[i]['id']+')">'+data[i]['color']+' - '+data[i]['casetype']+'</option>'
                );
            }


    };

    xhr.open('get', url)
    xhr.send()

}

function additems(option){
    console.log(option);

    url = "checklist.php?number=" + option; // num 은 현재있는 아이의 번호 ( 리스트)

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        console.log(data); // 표 형태로 나오는것
        // data = JSON.parse(data); var table = document.getElementById('listtable');
        // table.innerHTML = Array.isArray(data);
        if(data == "exist"){
            alert("선택하신 옵션은 이미 장바구니에 있습니다. 다른 옵션을 선택해주세요.")
        }else{
            saveitems(option);

        }

    };

    xhr.open('get', url)
    xhr.send()

}

function saveitems(option){

    console.log(option);
    console.log(samenumber);

    url = "saveitems.php?number=" + option+"&save="+samenumber; // num 은 현재있는 아이의 번호 ( 리스트)

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        console.log(data); // 표 형태로 나오는것
        // data = JSON.parse(data); var table = document.getElementById('listtable');
        // table.innerHTML = Array.isArray(data);
if(data=="ok"){
    document.getElementById("tbody").innerHTML = "";
    getlist(); // 다시 업데이트 하기 

}else{
    alert("다시 한번 더 해주세요. ")


}

    };

    xhr.open('get', url)
    xhr.send()
}

function plus(num){
console.log(num.value);
console.log(document.getElementById(num.value+"_qty").innerHTML);

var sum = document.getElementById(num.value+"_qty").innerHTML;

var sum = parseInt(sum) + 1;
console.log(sum);

url = "plusqty.php?number=" + num.value+"&sum="+sum; // num 은 현재있는 아이의 번호 ( 리스트)

var xhr = new XMLHttpRequest();
xhr.onload = function () {
    var data = xhr.response;
    console.log(data); // 표 형태로 나오는것
    // data = JSON.parse(data); var table = document.getElementById('listtable');
    // table.innerHTML = Array.isArray(data);
if(data=="ok"){
document.getElementById("tbody").innerHTML = "";
getlist(); // 다시 업데이트 하기 

}else{
alert("다시 한번 더 해주세요. ")


}

};

xhr.open('get', url)
xhr.send()
}

function minus(num){
    console.log(num.value);
    

console.log(document.getElementById(num.value+"_qty").innerHTML);

var sum = document.getElementById(num.value+"_qty").innerHTML;
if(sum=="1"){
    alert("최소 수량은 1개입니다. ");
    return;
}
var sum = parseInt(sum) - 1;
console.log(sum);

url = "plusqty.php?number=" + num.value+"&sum="+sum; // num 은 현재있는 아이의 번호 ( 리스트)

var xhr = new XMLHttpRequest();
xhr.onload = function () {
    var data = xhr.response;
    console.log(data); // 표 형태로 나오는것
    // data = JSON.parse(data); var table = document.getElementById('listtable');
    // table.innerHTML = Array.isArray(data);
if(data=="ok"){
document.getElementById("tbody").innerHTML = "";
getlist(); // 다시 업데이트 하기 

}else{
alert("다시 한번 더 해주세요. ")


}

};

xhr.open('get', url)
xhr.send()
}

function trash(num){

    var r = confirm("장바구니에서 지우시겠습니까?") // alert ! 

    if(r==true){  // 추가원한다면 

    }else{ //추가원하지 않는다면 
        return;

    }

    console.log(num); // 표 형태로 나오는것
    url = "trash.php?number=" + num; // num 은 현재있는 아이의 번호 ( 리스트)

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        console.log(data); // 표 형태로 나오는것
        // data = JSON.parse(data); var table = document.getElementById('listtable');
        // table.innerHTML = Array.isArray(data);
    document.getElementById("tbody").innerHTML = "";
    getlist(); // 다시 업데이트 하기 
    

    };
    
    xhr.open('get', url)
    xhr.send()
}

function choosebuy(){
    var checkbox = $("input[name=foo]:checked");

    var choosearray = new Array(); //선택한 물품 가져오기 

    checkbox.each(function(i){

         var tr = checkbox.parent().parent().eq(i);

         console.log(i);
         console.log($(tr).index());
         console.log(array.length);
         console.log(array.length - (parseInt($(tr).index())+1));

         console.log($(tr).index());

         console.log(array[array.length - (parseInt(i)+1)]);

         console.log(array);


        choosearray.push(array[array.length - (parseInt($(tr).index())+1)]);

    });

   console.log(choosearray);

    if(choosearray == ""){
        console.log("no")
        alert("선택하신 물품이 없습니다.")
    }else{

        var myJSON = JSON.stringify(choosearray); // array 를 string 타입으로 바꾸기
        location.href="Bill.html?myJSON=" + myJSON;            

    }

}
/*
function directbuy(){
    var myJSON = JSON.stringify(array); // array 를 string 타입으로 바꾸기
    location.href="Bill.html?myJSON=" + myJSON;            
}*/