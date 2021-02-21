function callFunction(int) {

    console.log(int);
    var page = document.getElementById('main_content'); //바꿀수있는 오른쪽 메인 화면 
    var header = document.getElementById('header'); //바꿀수있는 오른쪽 메인 화면 

    if(int=='1'){ //물건리스트 관리
        page.innerHTML = '<object type="text/html" data="ManageList.html" width="100%" height="1500px" ></object>'
        header.innerHTML = '물건리스트 관리';
    }
    if(int=='2'){ //믈건리스트 만들기 
        page.innerHTML = '<object type="text/html" data="CreateList.html"  width="100%" height="1500px" ></object>'
        header.innerHTML = '물건리스트 만들기 ';

    }
    if(int=='3'){ //결제관리 
        page.innerHTML = '<object type="text/html" data="shipping.html" width="100%" height="1500px"></object>'
        header.innerHTML = '주문서 보기 ';

    }
    if(int=='4'){ //운영관리(질문)
        page.innerHTML = '<object type="text/html" data="ManageList.html" width="100%" height="1500px"></object>'
        header.innerHTML = '운영관리(질문)';

    }
    if(int=='5'){ //매출관리 
        page.innerHTML = '<object type="text/html" data="ManageList.html" width="100%" height="1500px"></object>'
        header.innerHTML = '매출관리 ';

    }
}


function check(){ // 세션 확인하기 ( 관리자 인지 아닌지 )

}
