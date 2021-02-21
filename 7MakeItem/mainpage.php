<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Placeit 핸드폰케이스 쇼핑몰</title>
        <!-- 첫 메인 화면 페이지 -->

        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@1,900&display=swap"
            rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link
            href="https://fonts.googleapis.com/css2?family=Poor+Story&display=swap"
            rel="stylesheet">
        <!-- 폰트링크 첨부-->
        <link rel="stylesheet" href="mainpage.css">
        <!-- css 초기에 선언하기 위해서 -->
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
            rel="stylesheet">

    </head>

    <body>

    <?php header("Content-Type:text/html;  charset=UTF-8"); session_start(); ?>
    <?php if((!isset($_SESSION['id'])) && (!isset($_SESSION['nickname']))) {?> <!-- 세션값이 만약 없다면  -->
        <nav class="navbar">
            <!-- 메뉴에 있는 바를 알려주기위해서 -->
            <ul class="navbar_menu">
                <li>
                    <!-- 리스트 내용들이 들어가 있다 -->
                    <a href="../2Login/loginpage.html">LOGIN</a>
                </li>
                <li>
                    <a href="../4Signup/signup.html">JOIN US</a>
                </li>
            </ul>

        </nav>
    <?php }else  { if(($_SESSION['id'] == 'hgj') && ($_SESSION['nickname']=='hj')) { ?>
                <!-- 세션값이 만약 있다면 -->
                <nav class="navbar">
            <!-- 메뉴에 있는 바를 알려주기위해서 -->
            <ul class="navbar_menu">
            <li>
                    <a href="">관리자</a>
                </li>
                <li>
                    <!-- 리스트 내용들이 들어가 있다 -->
                    <a href="">MakeList</a>
                </li>
                <li>
                    <a href="../3Logout/logout.php">LOGOUT</a>
                </li>
                <li>
                    <a href="../5Notice/Notice.html">Notice</a>
                </li>
                <li>
                    <a href="">Q&A</a>
                </li>
                <li>
                    <a href="">Review</a>
                </li>
            </ul>

            <?php }else{ ?>

        <!-- 세션값이 만약 있다면 -->
        <nav class="navbar">
            <!-- 메뉴에 있는 바를 알려주기위해서 -->
            <ul class="navbar_menu">
                <li>
                    <!-- 리스트 내용들이 들어가 있다 -->
                    <a href="#"><?php echo $_SESSION['nickname'];?> 님</a>
                </li>
                <li>
                    <a href="../3Logout/logout.php">LOGOUT</a>
                </li>
                <li>
                    <a href="">CART</a>
                </li>
                <li>
                    <a href="">ORDER</a>
                </li>
                <li>
                    <a href="">MY PAGE</a>
                </li>
            </ul>

        </nav>
    <?php } }?>

        <div class="logo">
            <!-- 로고 -->
            <a href="mainpage.php">
                <img src="../logoimage/logo.png" alt="로고" width="200px"></a>
        </div>

        <div class="main_manu_bar">
            <ul class="navbar_menu_case">
                <!-- 케이스에 대한 정보들 -->

                <li>
                    <a href="">하드 케이스</a>
                </li>
                <li>
                    <a href="">젤리 케이스</a>
                </li>
                <li>
                    <a href="">투명 하드 케이스</a>
                </li>
                <li>
                    <a href="">슬라이드 케이스</a>
                </li>
                <li>
                    <a href="">아쿠아 케이스</a>
                </li>
                <li>
                    <a href="">스마트톡</a>
                </li>
                <li>
                    <div class="dropdown">

                    <a href="">자료실</a>
                    <div class="dropdown-content"  class="dropbtn">
                        <a href="#">Notice</a>
                        <a href="#">Q&A</a>
                        <a href="#">REVIEW</a>
        </div>
                    </div>

                </li>
            </ul>

        </div>

        <div class="slider">
            <div class="slides">
                <!-- 라디오 버튼으로 클릭해서 움직일수있도록-->
                <input type="radio" name="radio_btn" id="radio1">
                <input type="radio" name="radio_btn" id="radio2">
                <input type="radio" name="radio_btn" id="radio3">
                <input type="radio" name="radio_btn" id="radio4">

                <div class="slide first">
                    <!--첫번째 이미지-->
                    <label for="radio4" class="manual-btn-left"></label>
                    <img
                        src="http://deepingcase.com/web/upload/NNEditor/20201012/17dcb9293b9fec54074e81cb840f9787.jpg">
                    <label for="radio2" class="manual-btn-right"></label>
                </div>

                <div class="slide second">
                    <!--2번째 이미지-->
                    <label for="radio1" class="manual-btn-left"></label>
                    <img
                        src="http://www.deepingcase.com/web/upload/NNEditor/20200824/9d0061ac4ee999f1858499081b3a8a38.jpg">
                    <label for="radio3" class="manual-btn-right"></label>

                </div>

                <div class="slide third">
                    <!--3번째 이미지-->
                    <label for="radio2" class="manual-btn-left"></label>

                    <img
                        src="http://www.deepingcase.com/web/upload/NNEditor/20200626/f02e136ff09ae92b0ea0605e6453bb7c.jpg">
                    <label for="radio4" class="manual-btn-right"></label>

                </div>

                <div class="slide forth">
                    <!--4번째 이미지-->
                    <label for="radio3" class="manual-btn-left"></label>

                    <img
                        src="http://www.deepingcase.com/web/upload/NNEditor/20200921/03443349a0bb42d86ed1e53b738fdc31.jpg">
                    <label for="radio1" class="manual-btn-right"></label>

                </div>

                <div class="navigation-auto">
                    <!--navigation-auto start 지점-->
                    <div class="auto-btn1"></div>
                    <div class="auto-btn2"></div>
                    <div class="auto-btn3"></div>
                    <div class="auto-btn4"></div>
                </div>
                <!--navigation-auto end 지점-->
            </div>

            <!--navigation-manual start 지점-->
            <!-- <div class="naviagion-manual"> <label for="radio1"
            class="manual-btn"></label> <label for="radio2" class="manual-btn"></label>
            <label for="radio3" class="manual-btn"></label> <label for="radio4"
            class="manual-btn"></label> </div> -->
            <!--navigation-manual end 지점-->

        </div>

        <script type="text/javascript">
            var counter = 1;
            document
                .getElementById('radio' + counter)
                .checked = true;

            setInterval(function () {
                document
                    .getElementById('radio' + counter)
                    .checked = true;
                counter++;
                if (counter > 4) {
                    counter = 1;
                }
            }, 10000)
        </script>

        <div>
            <!-- 새로운 것에 대한 정보 보여주기 -->
            <h2 style="text-align: center; ">
                <span>New</span></h2>
        </div>

        <!-- 리스트 에 대한것 보여주기 -->
        <div class="list_wrap">
            <ul>
                <li class="item">
                    <div class="image">사진</div>
                    <div class="title_info">
                        <strong>제목이 들어갑니다.</strong>
                        <p>가격이 들어갑니다.</p>
                    </div>
                </li>

                <li class="item">
                    <div class="image">사진</div>
                    <div class="title_info">
                        <strong>제목이 들어갑니다.</strong>
                        <p>가격이 들어갑니다.</p>
                    </div>
                </li>

                <li class="item">
                    <div class="image">사진</div>
                    <div class="title_info">
                        <strong>제목이 들어갑니다.</strong>
                        <p>가격이 들어갑니다.</p>
                    </div>
                </li>

                <li class="item">
                    <div class="image">사진</div>
                    <div class="title_info">
                        <strong>제목이 들어갑니다.</strong>
                        <p>가격이 들어갑니다.</p>
                    </div>
                </li>

                <li class="item">
                    <div class="image">사진</div>
                    <div class="title_info">
                        <strong>제목이 들어갑니다.</strong>
                        <p>가격이 들어갑니다.</p>
                    </div>
                </li>

                <li class="item">
                    <div class="image">사진</div>
                    <div class="title_info">
                        <strong>제목이 들어갑니다.</strong>
                        <p>가격이 들어갑니다.</p>
                    </div>
                </li>

                <li class="item">
                    <div class="image">사진</div>
                    <div class="title_info">
                        <strong>제목이 들어갑니다.</strong>
                        <p>가격이 들어갑니다.</p>
                    </div>
                </li>

                <li class="item">
                    <div class="image">사진</div>
                    <div class="title_info">
                        <strong>제목이 들어갑니다.</strong>
                        <p>가격이 들어갑니다.</p>
                    </div>
                </li>

                <li class="item">
                    <div class="image">사진</div>
                    <div class="title_info">
                        <strong>제목이 들어갑니다.</strong>
                        <p>가격이 들어갑니다.</p>
                    </div>
                </li>

            </ul>

        </div>

        <footer
            style=" background-color: whitesmoke; font-family: 'Nanum Gothic', sans-serif; ">
            <!-- 하단 정보 -->

            <div
                class="information"
                style="  width: 70%;
            margin: auto;
            display: block;">
                <h3>
                    Placeit
                </h3>
                <h6>
                    TEL031-311-6577
                    <p>평일 오전 11:00 ~ 오후 4:00</p>
                    <p>점심 오후 12:30 ~ 오후 1:30</p>
                    토 / 일 / 공휴일 휴무</h6>
            </div>
        </footer>

    </body>