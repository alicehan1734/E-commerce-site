function checkcase() { // 케이스에 관한것

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "ManageList.php");
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

        for (var i = 0; i < data.length; i++) {
            var row = '<tr onclick="typecase(' + data[i]['id'] + ')"><td>' + data[i]['id'] +
                    '</td><td>' + data[i]['type'] + '</td><td>' + data[i]['name'] + '</td><td>' +
                    data[i]['price'] + ' 원</td><td>' + data[i]['saleprice'] + '원</td><td>' + data[i]['salept'] +
                    ' %</td><td><button class="deleteBtn" onclick="revise(' + data[i]['id'] + ')" >' +
                    '수정</Button></td></tr>';

            var table = document.getElementById("tbody");
            table.innerHTML += row;
            console.log(data[i]['id']);


        }

    };

    xhr.send();

}

function typecase(num) { // 타입에 관한것 넣어놓기

    document
        .getElementById("tocase")
        .innerHTML = ""; // 타입 테이블 없애기

    url = "checktypecase.php?casetype=" + num;

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        console.log(data); // 표 형태로 나오는것
        // data = JSON.parse(data); var table = document.getElementById('listtable');
        // table.innerHTML = Array.isArray(data);

        console.log(typeof data);

        // console.log(result)
        data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기


        console.log(data[0]['id']);

        for (var i = 0; i < data.length; i++) {
            var row = '<tr><td>' + data[i]['number'] + '</td><td>' + data[i]['color'] + '</' +
                    'td><td>' + data[i]['casetype'] + '</td><td>' + data[i]['qty'] + '</td></tr>';

            var table = document.getElementById("tocase");
            table.innerHTML += row;
            console.log(data[i]['id']);

        }

    };

    xhr.open('get', url)
    xhr.send()

}

function revise(num) {
    var r = confirm("수정하시겠습니까?");
    console.log(num);

    if (r == true) { // 추가원한다면

        location.href = "Reviselist.html?number=" + num;
        return;

    } else { //추가원하지 않는다면
        return;

    }
}