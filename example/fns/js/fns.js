$(document).ready(function () {

    $('.header__menu a').on('click', function (e) {
        e.preventDefault();
        $('.header__menu').removeClass('header__menu--open');
        var targetSec = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(targetSec).offset().top - 65
        }, 1000);
    });

    var mainPos = $('.main').offset().top;;
    var infoPos = $('.info').offset().top;;
    var whoPos = $('.who').offset().top;;
    var faqPos = $('.faq').offset().top;;    
    var winHeight = $(window).height();
    $(window).scroll(function () {
        
        var winScrollTop = $(this).scrollTop();
        if (winScrollTop > mainPos - winHeight) {       
            $('.header__menu li').removeClass('active');     
            $('.header__menu-item--main').addClass('active');
        }
        if (winScrollTop > infoPos - winHeight) {
            $('.header__menu li').removeClass('active');
            $('.header__menu-item--info').addClass('active');
        }
        if (winScrollTop > whoPos - winHeight) {
            $('.header__menu li').removeClass('active');
            $('.header__menu-item--who').addClass('active');
        }
        if (winScrollTop > faqPos - winHeight) {
            $('.header__menu li').removeClass('active');
            $('.header__menu-item--faq').addClass('active');
        }
    });

    $('.mobile-menu').on('click', function (e) {
        $('.header__menu').toggleClass('header__menu--open');
    });
    

});