<?php 

header("Content-Type:text/html;  charset=UTF-8"); 
session_start(); 

if((!isset($_SESSION['id'])) && (!isset($_SESSION['nickname'])))
{

    echo "false";

}else{
    echo $_SESSION['nickname'];

}

?>