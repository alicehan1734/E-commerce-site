function List(){

    var xhr = new XMLHttpRequest();
    xhr.open("POST","Listshow.php");
    xhr.onload = function(){
    var data = xhr.response;
    console.log(data); // 표 형태로 나오는것 
    // data = JSON.parse(data);

    // var table = document.getElementById('listtable');
    // table.innerHTML = Array.isArray(data);

    console.log(typeof data);

    // console.log(result)
    data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기 

    console.log(data); 

    console.log(data[0]['id']);

    for (var i = 0; i < 10 ; i++ ) {
        var row = '<li class="item" width=220px ><a href="/6Listpage/MainProduct.html?number='+data[i]['id']+'"><div class="image"><image width=220px height=300px src="../6Listpage/image/'+data[i]['image']+'"></image></div><div class="title_info" width=220px ><strong>'+ data[i]['name']+'</strong><p>판매가 - <del> '+data[i]['price']+' 원</del> </p>'+'<p  style="color:red">할인판매가 - '+data[i]['saleprice']+' 원 ('+data[i]['salept']+' % 할인) </p> </div></a></li>'

        var table = document.getElementById("listtable");
        table.innerHTML += row;
        console.log(data[i]['id']);

    }
    
    };

    xhr.send();

}
