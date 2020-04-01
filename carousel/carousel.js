var carousel = (function () {
    //获取节点
    var box = $('#box');
    var cfg = {
        obj: null,
        json: ''
    }
    var content = ''
        + '<div class="slider" id="slider">'
        + '<div class="slide"><img src="img/b5.png" alt=""></div>'
        + '<div class="slide"><img src="img/b1.png" alt=""></div>'
        + '<div class="slide"><img src="img/b2.png" alt=""></div>'
        + '<div class="slide"><img src="img/b3.png" alt=""></div>'
        + '<div class="slide"><img src="img/b4.png" alt=""></div>'
        + '<div class="slide"><img src="img/b5.png" alt=""></div>'
        + '<div class="slide"><img src="img/b1.png" alt=""></div>'
        + '</div>'
        + '<span id="left"><</span>'
        + '<span id="right">></span>'
        + '<ul class="nav" id="navs">'
        + '<li>1</li>'
        + '<li>2</li>'
        + '<li>3</li>'
        + '<li>4</li>'
        + '<li>5</li>'
        + '</ul>';
    //添加内容
    box.html(content);
    //记录圆点
    var index = 0;
    //是否移动
    var isanimate = false;
    //定时器
    var timer;
    //获取节点
    var slider = $('#slider');
    var list = $('#navs').children();
    var left = $('#left');
    var right = $('#right');
    //添加样式
    list[0].className = 'active';
    function swiper() {
        //下一张
        function nextPage() {
            if(isanimate){
                return;
            }
            isanimate = true;
            index++;
            if (index > 5) {
                slider.css('left', -1200);
                index = 1;
            }
            slide(index);
            changeCircle();
        }
        //上一张
        function lastPage() {
            if(isanimate){
                return;
            }
            isanimate = true;
            index--;
            if (index < 0) {
                slider.css('left', -7200);
                index = 4;
            }
            slide(index);
            changeCircle();
        }
        //切换动画效果
        function slide(index) {
            index++;
            slider.stop().animate({ left: -index * 1200 }, 500,function(){
                isanimate = false;
            })
        }
        //切换圆点
        function changeCircle() {
            //console.log(list.length);
            for (var i = 0; i < list.length; i++) {
                list[i].className = '';
            }
            if (index > 4) {
                list[0].className = 'active';
            } else if (index < 0) {
                list[4].className = 'active';
            } else {
                list[index].className = 'active';
            }
        }
        //鼠标划入
        box.mouseover(function () {
            clearInterval(timer);
            left.css('opacity', 0.5);
            right.css('opacity', 0.5);
        });
        //鼠标划出
        box.mouseout(function () {
            timer = setInterval(() => {
                nextPage();
            }, 2000);
            left.css('opacity', 0);
            right.css('opacity', 0);
        });
        //点击右箭头
        right.click(function () {
            nextPage();
        });
        //点击左箭头
        left.click(function () {
            lastPage();
        });
        //点击小面圆点
        for (var i = 0; i < list.length; i++) {
            (function (j) {
                list[j].onclick = function () {
                    index = j;
                    slide(index);
                    changeCircle();
                }
            })(i)
        }
        //自动轮播
        function autoPlay() {
            timer = setInterval(() => {
                nextPage();
            }, 2000)
        }
        autoPlay();
    }
    return {
        swiper:swiper
    }
})()