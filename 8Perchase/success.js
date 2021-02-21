
window.addEventListener('load',() => { // javascript 에서 html 로부터 온 get 값을 받게하기위해서 

    const params = (new URL(document.location)).searchParams;
    const shippingnum = params.get('shippingnum'); //물건 고유의 값 


    document.getElementById("shippingnumber").innerHTML = shippingnum;
   /* url = "success.php?shippingnum=" + shippingnum;

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var data = xhr.response;
        console.log(data); // 표 형태로 나오는것
        // data = JSON.parse(data); var table = document.getElementById('listtable');
        // table.innerHTML = Array.isArray(data);

        console.log(typeof data);

        // console.log(result)
        data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기

        console.log(data[0]['number']);
    

    };

    xhr.open('get', url)
    xhr.send()*/


})
