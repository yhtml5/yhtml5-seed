/*
 * @require fn.js
 */
/***************  do  ***************/
'use strict';
$(function () {
  $('#list li').hover(function(){
      $(this).css({'box-shadow':'5px 5px 10px #555','opacity':'1'});
      $(this).find('div').fadeIn(100);
    },function(){
      $(this).css({'box-shadow':'2px 2px 5px #000','opacity':'0.9'});
        $(this).find('div').fadeOut(100)
    })
    document.getElementById('nav-index').className = 'active';
    var defaultEle = $('.navbar-default');
    defaultEle.addClass('navbar-bg');
    $(document).ready(function () {
        drawCanvasOne();
        setInterval(function () {
            drawCanvasOne()
        }, 4000);
        $('body').click(function () {
            drawCanvasOne()
        });
        initGithubCharts();
        performanceAnalysis();
        $('#fullpage').fullpage({
            navigation: true,
            resize: true,
            sectionsColor: ['#fff', '#f0f4fa', '#fff', '#fff', '#f0f4fa','#f0f4fa', '#f0f4fa', '#fff', '#fff', '#f0f4fa', '#fff', '#f0f4fa', '#f0f4fa'],
            onLeave: function (index, nextIndex, direction) {
                if ($('.navbar-toggle').attr('aria-expanded') === 'true') {
                    $('.navbar-toggle').trigger('click');
                }
                $('.dropdown-toggle').each(function () {
                    var $toggleBtn = $(this);
                    if ($toggleBtn.attr('aria-expanded') === 'true') {
                        $toggleBtn.parent().removeClass('open');
                        $toggleBtn.trigger('click');
                    }
                });
                if (nextIndex === 4) {
                    $('.section-four').find('.text-wrap').addClass('text-wrap-animate')
                        .end().find('.device-wrap').addClass('device-wrap-animate');
                }
                defaultEle.toggleClass('navbar-bg', nextIndex === 1);
            }
        });
        var container = $('.container-five');
        container.on('mouseenter', 'img', function () {
            var target = $(this);
            if (target.hasClass('cur-item')) {
                return;
            }
            var index = +target.data('index');
            container.find('.cur-item').removeClass('cur-item');
            target.addClass('cur-item');
        });
    });
});
