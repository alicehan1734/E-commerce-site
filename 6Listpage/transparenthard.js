function checkcase(name) {

    url = "Case.php?casetype=" + name;


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

        console.log(data[0]['id']);

        var pagemaximum = 15;
        var pagenumber = Math.ceil(data.length / pagemaximum); // 15페이지만 보이도록 할예정

        console.log(pagenumber);

        for(i=1; i<=pagenumber; i++ ){
            var page = '<li class="pagenumber" onclick="display('+i+')">'+i+'</li>';
            var navigationbar = document.getElementById("navigationbar");
            navigationbar.innerHTML += page;
        }


        for (var i = 0; i < pagemaximum; i++) { //리스트의 갯수
            var row = '<li class="item" width=220px ><a href="/6Listpage/MainProduct.html?number='+data[i]['id']+'"><div class="image"><image width=220p' +
                    'x height=300px src="../6Listpage/image/' + data[i]['image'] + '"></image></div' +
                    '><div class="title_info" width=220px ><strong>' + data[i]['name'] + '</strong>' +
                    '<p>판매가 - <del> ' + data[i]['price'] + ' 원</del> </p><p  style="color:red">할인판매' +
                    '가 - ' + data[i]['saleprice'] + ' 원 (' + data[i]['salept'] + ' % 할인) </p> </div' +
                    '></a></li>'

            var table = document.getElementById("listtable");
            table.innerHTML += row;
            console.log(data[i]['id']);

        }

    };

    xhr.open('get', url)
    xhr.send()
}

function display(num) {

    url = "Case.php?casetype=usa&caselength="+num;
    console.log("시작!!"); // 표 형태로 나오는것

    document.getElementById('listtable').innerHTML = "";
    document.getElementById('pagenumm').innerHTML = num+"번째 페이지";

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

        for (var i = 0; i < data.length; i++) { //리스트의 갯수
            var row = '<li class="item" width=220px ><a href="#"><div class="image"><image width=220p' +
                    'x height=300px src="../6Listpage/image/' + data[i]['image'] + '"></image></div' +
                    '><div class="title_info" width=220px ><strong>' + data[i]['name'] + '</strong>' +
                    '<p>판매가 - <del> ' + data[i]['price'] + ' 원</del> </p><p  style="color:red">할인판매' +
                    '가 - ' + data[i]['saleprice'] + ' 원 (' + data[i]['salept'] + ' % 할인) </p> </div' +
                    '></a></li>'

            var table = document.getElementById("listtable");
            table.innerHTML += row;
            console.log(data[i]['id']);

        }

    };

    xhr.open('get', url)
    xhr.send()

}