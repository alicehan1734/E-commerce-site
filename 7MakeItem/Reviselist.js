window.addEventListener('load',() => { // javascript 에서 html 로부터 온 get 값을 받게하기위해서 

    const params = (new URL(document.location)).searchParams;
    const name = params.get('number'); //물건 고유의 값 

    
    url = "Reviselist.php?number=" + name;

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

        document.getElementById("casename").value = data[7];
        document.getElementById("type").value = data[1];
        document.getElementById("price").value = data[2];
        document.getElementById("saleprice").value = data[3];
        CKEDITOR.instances['editor'].setData(data[6])

        console.log(data.length);

        for (var i = 8; i < data.length ; i++ ) {
            $('#myImg').append(
                '<img id="myImagesub'+data[i]['filnamnam']+'" name="myImagesub'+data[i]['filnamnam']+'" width="100" height="100" src="http://192.168.233.131/6Listpage/image/' + data[i]['filnamnam'] +
                '">'
            );
    
        }
    };

    xhr.open('get', url)
    xhr.send()

    document.getElementById("getidh").value= name;

    firstcheckfortype();

    document
    .getElementById("checkimagedelete")
    .value = "변경x";
})

function deletelist(){ // 삭제하는 구간 

    var r = confirm("삭제 하실경우 해당데이터는 완전히 삭제됩니다. 그래도 하시겠습니까? ") // alert ! 

    if(r==true){  // 추가원한다면 
        var hay =document.getElementById("getidh").value;

        location.href="Deletelist.php?number=" + hay;
    
    return;

    }else{ //추가원하지 않는다면 
        return;

    }

}

function firstcheckfortype(){

    var hay =document.getElementById("getidh").value;

    console.log(hay);

    url = "Revisetypelist.php?number=" + hay;

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
        var table = document.getElementById("tbody"); //테이블 밑의 body 에서 리스트 넣기 (안되고있는 상황 )

        for(var i=0; i<data.length ; i++){


            var row = table.insertRow(0); // row 확인하기
            var cell0 = row.insertCell(0); // 색깔
            var cell1 = row.insertCell(1); // 기종
            var cell2 = row.insertCell(2); // 수량
            var cell3 = row.insertCell(3); // delete 버튼 넣는곳
            
            cell0.innerHTML = data[i]['color']; // 색깔을 넣는다.
            cell1.innerHTML = data[i]['casetype']; //기종을 넣는다.
            cell2.innerHTML = data[i]['qty']; // 수량을 넣는다.
            cell3.innerHTML = '<button class="deleteBtn" onclick="ondeleteRow(this)" >지우기</Button>'; // delete 버튼을 넣는다 .
        }

    };

    xhr.open('get', url)
    xhr.send()

}


function addItem() { // 리스트 수량 넣는 곳

    const color = document
        .getElementById("color")
        .value; //색깔
    const typecase = document
        .getElementById("typecase")
        .value; //케이스 기종
    const caseqty = document
        .getElementById("caseqty")
        .value; // 수량

    if (!caseqty) {
        document
            .getElementById("caseqty")
            .style
            .borderColor = "red";
        return;
    } else {
        document
            .getElementById("caseqty")
            .style
            .borderColor = "#ccc";

    }

    var table = document.getElementById("tbody"); //테이블 밑의 body 에서 리스트 넣기 (안되고있는 상황 )

    for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate trough columns do something
        console.log(row.cells.item(0).innerHTML); //색깔 (innerHTML 을 해야 양쪽 <td>태그가 없어진다.)
        console.log(row.cells.item(1).innerHTML); //케이스 종류 (innerHTML 을 해야 양쪽 <td>태그가 없어진다.)

        console.log("체크1.");

        if (color ==row.cells.item(0).innerHTML) {
            console.log("체크 .");

            if (typecase == row.cells.item(1).innerHTML) { 
                var r = confirm("해당 색과 기종은 이미 등록되어있습니다. 더 추가하시겠습니까? ") // alert ! 

                if(r==true){  // 추가원한다면 
                    var x = + row.cells.item(2).innerHTML;
                    var y = + caseqty;
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
            console.log(color);
            console.log(row.cells[0]);

        }
    }



var row = table.insertRow(0); // row 확인하기
var cell0 = row.insertCell(0); // 색깔
var cell1 = row.insertCell(1); // 기종
var cell2 = row.insertCell(2); // 수량
var cell3 = row.insertCell(3); // delete 버튼 넣는곳

cell0.innerHTML = color; // 색깔을 넣는다.
cell1.innerHTML = typecase; //기종을 넣는다.
cell2.innerHTML = caseqty; // 수량을 넣는다.
cell3.innerHTML = '<button class="deleteBtn" onclick="ondeleteRow(this)" >지우기</Button>'; // delete 버튼을 넣는다 .

}

function ondeleteRow(oButton) { //table 리스트 삭제하는 구간
var num = oButton.parentNode.parentNode.rowIndex; //선택한 테이블의 row 번호 알기위한

console.log(num);
document
    .getElementById("table")
    .deleteRow(num); // table 을 기준으로 row 번호를 넣어 삭제한다.
}

function imagefun() { // 이미지 선택하는 구간

    document.getElementById("checkcheck").value = ""; //기존에 있는거 지우기 

document
    .getElementById("checkimagedelete")
    .value = "ss";

$('#myImg').empty();
i++;
var imagehere = document.getElementById("files[]");
var index = 0;

for (var i = 0; i < imagehere.files.length; i++) {
    var reader = new FileReader(); //파일 리더기 선택하기
    reader.onload = function(e) {
        $('#myImg').append(
            '<img id="myImagesub'+index+'" name="myImagesub'+index+'" width="100" height="100" src=' + e.target.result +
            ' onclick="imagedeletesingle('+index+')">'
        );
        index ++;
    }; // 해당 밑에 있는 클래스로 이동한다.
    reader.readAsDataURL(imagehere.files[i]);

}

}


function imagedelete() { // 이미지 전체삭제 
$('#myImg').empty();
document
    .getElementById("checkimagedelete")
    .value = "삭제";
}

function imagedeletesingle(index){ // 한개의 이미지 삭제 

    var r = confirm("해당 이미지를 삭제하시겠습니까? ") // alert ! 

    if(r==true){  // 추가원한다면 
        console.log(index);

        document.getElementById("checkcheck").value = document.getElementById("checkcheck").value + index +","; // 기존에 있는 것에다가 덧붙여 하기. 
    
        $("#myImagesub"+index).remove();

    }else{ //추가원하지 않는다면 
        return;

    }


}


function isInputNumber(evt) { // 숫자만 입력하도록 설정하는 구간

var char = String.fromCharCode(evt.which);

if (!(/[0-9]/.test(char))) {
    evt.preventDefault();
}
}

function submit_1() { // 리스트 저장하기전에 필수항목 채웠는지 확인하는 구간

var casename = document.getElementById("casename");
var price = document.getElementById("price");
var saleprice = document.getElementById("saleprice");

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
            .text()
    } //tableData[row]
});
console.log(TableData);

var myJSON = JSON.stringify(TableData); // array 를 string 타입으로 바꾸기
console.log(myJSON);

document
    .getElementById("listtype")
    .value = myJSON; // myJson 을 넣기

if (!casename.value) {
    casename.style.borderColor = "red";
}
if (!price.value) {
    price.style.borderColor = "red";
}
if (!saleprice.value) {
    saleprice.style.borderColor = "red";
}

if (!casename.value) {
    return alert('필수 항목을 입력하세요.');
} else if (!price.value) {
    return alert('필수 항목을 입력하세요.');
} else if (!saleprice.value) {
    return alert('필수 항목을 입력하세요.');
} else {
    document //post 방식으로 php 로 넘어간다 .
        .getElementById("form")
        .submit();
}

}
// var price = document
//.getElementById("price")
//.value; // myJson 을 넣기

//function alert(saleamount) {

//    if (saleamount <= price) {//
//        return;
 //   }

 //   alert("할인판매가가 판매가보다 큽니다. 낮거나 같은값을 넣어주세요.")

//}

function checkamouont(saleamount){
  var price = document.getElementById("price").value; // myJson 을 넣기

  price = + price;
  saleamount = + saleamount;

  
 if (saleamount <= price) {       
     return; }

 alert("할인판매가가 판매가보다 큽니다. 낮거나 같은값을 넣어주세요.")
 document.getElementById("saleprice").value = "";

}
