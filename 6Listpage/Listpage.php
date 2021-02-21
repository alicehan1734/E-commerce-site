<?php
include 'header.html';

    if (isset($_GET['menu']))
    {
        $menu = $_GET['menu'];
        if ($menu == '1') {
            include 'hardcase.html'; // 하드케이스 
        }
        else if ($menu == '2') {
            include './jellycase.html'; // 젤리케이스 
        }
        else if ($menu == '3') {
            include './Transparenthard.html'; //투명케이스 
        }
        else if ($menu == '4') {
            include './slidecase.html'; //슬라이드 케이스 
        }
        else if ($menu == '5') {
            include './aquacase.html'; // 아쿠아 케이스 
        }
        
        //do stuff that requires 's'
    }
    else
    {
    
    }
    




include 'footer.html';


?>