
var samename; // 공통으로 사용하는 케이스의 고유번호
var samemony; // 공통으로 사용하는 케이스의 가격
var sameimage; // 공통으로 사용하는 케이스의 이미지
var sametitle; // 공통으로 사용하는 케이스의 이름

window.addEventListener('load',() => { // javascript 에서 html 로부터 온 get 값을 받게하기위해서 

    const params = (new URL(document.location)).searchParams;
    const name = params.get('number'); //물건 고유의 값 

    // document.getElementById('name').innerHTML = name;

 
    url = "MainProduct.php?number=" + name;

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        console.log(data); // 표 형태로 나오는것
    

        console.log(typeof data);

        // console.log(result)
        data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기

        console.log(data);

        samemony = data[3]; //조금있다가 써야되므로 저장하기.
        sametitle = data[7]; 
        document.getElementById("title").innerHTML = data[7]; //타이틀 
       // document.getElementById("type").value = data[1];
        document.getElementById("originalfee").innerHTML = "<del>"+data[2]+" 원</del>"; //원래 가격 
        document.getElementById("salept").innerHTML = "("+data[4]+"% 할인)"; //할인율 

        document.getElementById("saleamout").innerHTML = data[3]+" 원"; //세일된 가격 
       // CKEDITOR.instances['editor'].setData(data[6])

        console.log(data.length);

        for (var i = 8; i < data.length ; i++ ) { //이미지 

            if(i== 8){
                document.getElementById("mainimg").src = "http://192.168.233.131/6Listpage/image/"+data[i]['filnamnam'];
                sameimage = data[i]['filnamnam']; 
            }

            $('#subimage').append(
                '<img  onmouseover="imagetomain(this)" width="50px" height="50px" src="http://192.168.233.131/6Listpage/image/' + data[i]['filnamnam'] +
                '">'
            );
    
        }

        var a = data[6];
        console.log(a);
        $('#infor_Case_detail').append(
            '<div>'+a+'</div>'
        );
    };

    xhr.open('get', url)
    xhr.send()


    getthelist(name);
})

function imagetomain(sd){ // 이미지 mouseover시 메인이미지가 바껴진다.

    document.getElementById("mainimg").src = sd.src;

}


function getthelist(name){

    url = "Getlisttype.php?number=" + name;
    samename = name;

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        console.log(data); // 표 형태로 나오는것
        // data = JSON.parse(data); var table = document.getElementById('listtable');
        // table.innerHTML = Array.isArray(data);

        var text=""; // 색깔 text 중복값 선택하기
        var colortext;

        console.log(typeof data);

        // console.log(result)
        data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기

        console.log(data);

        for(var i=0; i<data.length ; i++){


            console.log(text);

            if(text.indexOf(data[i]['color']) != -1){ // 성공 / 색깔 안넣는곳 indexOf() 함수는 특정 문자의 위치값을 index로 반환하기 때문에 if 조건문에서 -1 의 값을 가지는지의 여부를 확인한다.
            

            }else{
                text = text+data[i]['color']; // 실패 / 색깔을 넣는다.

                if(data[i]['color']=='빨강'){
                colortext = 'red'; 
                }
                
                if(data[i]['color']=='주황'){
                    colortext = 'orange'; 
                    }
                    
                if(data[i]['color']=='노랑'){
                    colortext = 'yellow'; 
                    }
                    
                if(data[i]['color']=='초록'){
                    colortext = 'green'; 
                    }
                    
                if(data[i]['color']=='파랑'){
                    colortext = 'blue'; 
                    }
                    
                if(data[i]['color']=='남색'){
                    colortext = 'indigo'; 
                    }
                    
                if(data[i]['color']=='보라'){
                    colortext = 'purple'; 
                    }
                if(data[i]['color']=='검정'){
                        colortext = 'black'; 
                    }
                if(data[i]['color']=='하양'){
                        colortext = 'white'; 
                    }
                if(data[i]['color']=='투명'){
                            colortext = 'trans'; 
                    }

            console.log(colortext);

        $('#colorlist').append(
            '    <label class="'+colortext+'"><input type="radio" name="color" onclick="checklist(this)" value="'+data[i]['color']+'"><div class="layer"></div><div class="button"><span></span></div></label>'
        );


            }

        }

    };

    xhr.open('get', url)
    xhr.send()

}

function checklist(colorname){

    document.getElementById("checkcolorname").innerHTML = colorname.value;// 색깔 확인

    document.getElementById("typelist").innerHTML = "";

    url = "Getlisttype.php?number=" + samename;

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        // data = JSON.parse(data); var table = document.getElementById('listtable');
        // table.innerHTML = Array.isArray(data);
        // console.log(result)
        data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기

        $('#typelist').append(
            ' <option>---------------------------</option>'
        );

        for(var i=0; i<data.length ; i++){

            if(colorname.value.indexOf(data[i]['color']) != -1){ // 성공 / 색깔 안넣는곳 indexOf() 함수는 특정 문자의 위치값을 index로 반환하기 때문에 if 조건문에서 -1 의 값을 가지는지의 여부를 확인한다.
                console.log(data[i]['color']); // 색깔 확인
               
                $('#typelist').append(
                    '<option value="'+data[i]['casetype']+'" onclick="additems(this)">'+data[i]['color']+' - '+data[i]['casetype']+'</option>'
                );
        
            }

        }

    };

    xhr.open('get', url)
    xhr.send()
}

function additems(casetype){
    console.log(casetype.value); // 색깔 확인

    var table = document.getElementById("tbody"); //테이블 밑의 body 에서 리스트 넣기 (안되고있는 상황 )

    
    for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate trough columns do something
        console.log(row.cells.item(0).innerHTML); //색깔 (innerHTML 을 해야 양쪽 <td>태그가 없어진다.)
        console.log(row.cells.item(1).innerHTML); //케이스 종류 (innerHTML 을 해야 양쪽 <td>태그가 없어진다.)

        console.log("체크1.");

        if (document.getElementById("checkcolorname").innerHTML ==row.cells.item(0).innerHTML) {
            console.log("체크 .");

            if (casetype.value == row.cells.item(1).innerHTML) { 
                var r = confirm("해당 색과 기종은 이미 등록되어있습니다. 더 추가하시겠습니까? ") // alert ! 

                if(r==true){  // 추가원한다면 
                    var x = + row.cells.item(2).innerHTML;
                    var y = + 1;
                    var z = x + y ; 
                    console.log(x);
                    console.log(y);
                    console.log(z); // 최종 더해지것 

                row.cells.item(2).innerHTML = z; // 최종 더해지는곳을 같은곳에있는곳에 넣는다. 

                return;

                }else{ //추가원하지 않는다면 
                    return;

                }
            }
        } else {

        }
    }


    var row = table.insertRow(0); // row 확인하기
    var cell0 = row.insertCell(0); // 색상
    var cell1 = row.insertCell(1); // 기종
    var cell2 = row.insertCell(2); // 상품수
    var cell3 = row.insertCell(3); // 가격
    var cell4 = row.insertCell(4); // 삭제

    cell0.innerHTML = document.getElementById("checkcolorname").innerHTML; // 색깔을 넣는다.
    cell1.innerHTML = casetype.value; //기종을 넣는다.
    cell2.innerHTML = "1"; // 수량을 넣는다.
    cell3.innerHTML = samemony;
    cell4.innerHTML = '<button class="deleteBtn" onclick="ondeleteRow(this)" >X</Button>'; // delete 버튼을 넣는다 .

}

function ondeleteRow(oButton) { //table 리스트 삭제하는 구간
    var num = oButton.parentNode.parentNode.rowIndex; //선택한 테이블의 row 번호 알기위한
    
    console.log(num);
    document
        .getElementById("table")
        .deleteRow(num); // table 을 기준으로 row 번호를 넣어 삭제한다.
    }
    

function directbuy() { //바로구매 

    checksession(); // session 체크하기 

}

function basket() { //장바구니 
    checksession(); // session 체크하기 

    var checksame;

    var TableData = new Array();
    $('#tbody tr').each(function (row, tr) {
        TableData[row] = {
            "color": $(tr)
                .find('td:eq(0)')
                .text(),
            "case": $(tr)
                .find('td:eq(1)')
                .text(),
            "qty": $(tr)
                .find('td:eq(2)')
                .text(),
            "fee": $(tr)
                .find('td:eq(3)')
                .text()
        } //tableData[row]
    });
    console.log(TableData);
    
    var myJSON = JSON.stringify(TableData); // array 를 string 타입으로 바꾸기
    console.log(myJSON);

    url = "Savebasket.php?myJSON=" + myJSON+"&number="+samename+"&title="+sametitle+"&image="+sameimage+"&fee="+samemony+"&checksame="+checksame;

    console.log(url);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        console.log(data); // 표 형태로 나오는것
        // data = JSON.parse(data); var table = document.getElementById('listtable');
        // table.innerHTML = Array.isArray(data);
        if (xhr.responseText.match("same")) {    
        console.log("같대")
        var r = confirm("장바구니에 동일한 상품이 있습니다. 장바구니에 추가하시겠습니까?") // alert ! 

        if(r==true){  // 추가원한다면 
            checksame="apply";
            location.href="Savebasket.php?myJSON=" + myJSON+"&number="+samename+"&title="+sametitle+"&image="+sameimage+"&fee="+samemony+"&checksame="+checksame;
            return;

        }else{ //추가원하지 않는다면 
            checksame="regret";
            location.href="Savebasket.php?myJSON=" + myJSON+"&number="+samename+"&title="+sametitle+"&image="+sameimage+"&fee="+samemony+"&checksame="+checksame;            
            return;

        }
        } else {
             location.href="../8Perchase/pocket.html"
        }

    };

    xhr.open('get', url)
    xhr.send()
}

function checksession(){

    var tbl = document.getElementById('tbody');
if (tbl.rows.length == 0) { // 리스트 안에 넣어두었는지 확인하기 
   // empty
   alert("필수 옵션을 선택해주세요.");
   location.href="../6Listpage/MainProduct.html?number="+samename;

   return;

}


    url = "../1mainpage/mainpage2.php"; //session 확인하기 

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.response);
                console.log(typeof xhr.response);
                if (xhr.responseText.match(false)) { /*로그인 전 */

                    alert("로그인후 이용해주세요.");
                    return;

                } else { /*로그인 후 */

                    if(xhr.responseText.match("hj")){

                        alert("관리자는 이용이 불가합니다. 일반계정으로 이용해주세요.");
                        return;

                    }else{
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