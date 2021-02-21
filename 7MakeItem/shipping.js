function start(){
    const url = 'shipping.php'

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.response);
                var data = xhr.response;
                data = JSON.parse(data); //string 으로 되어있는 배열들을 다시 array 배열로 옮기기
                var table = document.getElementById("tablehere");

                for (var i = 0; i < data.length; i++) {
                    var shippingstatus = data[i]['shippingstatus']; //배송상황 

                    if(shippingstatus == "prepared"){
                        shippingstatus = "상품준비중"
                    }else if(shippingstatus == "shipping"){
                        shippingstatus = "배송중"
                    }else if(shippingstatus == "finished"){
                        shippingstatus = "배송완료"
                    }
                    var row = '<tr><td><a href="shippingstatus.html?number=' + data[i]['number']+'&shipping=' + data[i]['shippingnum']+'">' + data[i]['number']+' </a></td><td>' + data[i]['honor']+'</td><td>' + data[i]['totalprice']+'</td><td>' + shippingstatus+'</td><td>' + data[i]['paymentdate']+'</td></tr>';
                    table.innerHTML += row;


                }

                $(document).ready( function () {
                    $('#myTable').DataTable( {
                        "language": {
                            "lengthMenu": "한페이지당 _MENU_ 줄 까지",
                            "zeroRecords": "아무것도 없습니다.",
                            "info": " _PAGE_ 페이지 부터 _PAGES_ 페이지 까지",
                            "infoEmpty": "비어있습니다.",
                            "infoFiltered": "(filtered from _MAX_ total records)"                        }
                    } );

                } );
                

            } else {
                console.error(xhr.responseText);

            }

        }
    }
    xhr.open('POST', url,true)
    xhr.send()
}

