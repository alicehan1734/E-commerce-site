<?php
include 'header.html';

include 'Main.html';

    if (isset($_GET['menu']))
    {
        $menu = $_GET['menu']; //주문목록/배송조회
        if ($menu == '1') { 
            include 'order&shipping.html'; 

        }

        else if ($menu == '3') { //개인정보확인/수정 
            include 'personal.html'; 

        }
        //do stuff that requires 's'
    }


?>