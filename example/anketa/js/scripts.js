
// скролл
$(".main-menu>a").click(function () {
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    var menu = $(".main-menu");
    $('html').animate({ scrollTop: destination }, 700);
    if (menu.hasClass("main-menu--open")) {
        menu.removeClass("main-menu--open")
    }
    return false;
});

$(".mobile-menu__button").click(function() {
    $('.main-menu').addClass( "main-menu--open");
})

// отлавливаем клик по чекбоксу
$('.checkbox>input').on('click', function () {
    $(this).parent().toggleClass('checkbox--active')
})

// отслеживаем изменения в инпутах. если
$('.input>input').on('change', function () {
    if ($(this).val() != '') $(this).addClass('active');
    else $(this).removeClass('active');
});
$('.input>input').on('click', function () {
    if ($(this).parent().hasClass('input--select')) {
        $('.input--select').toggleClass('input--select--open');
    }
});
$('.input__list-item').on('click', function () {
    $('.input--select>input').val($(this).text());
    if ($('.input--select>input').val() != '') $('.input--select>input').addClass('active');
    else $(this).removeClass('active');
});
// закрываем список года рождения при клике вне блока
$(document).mouseup(function (e) {
    var list = $(".input--select");
    var menu = $(".main-menu");
    if (list.hasClass('input--select--open')) {
        if (!list.is(e.target)
            && list.has(e.target).length === 0) {
            list.removeClass('input--select--open');
        }
    }
    if (menu.hasClass("main-menu--open")) {
        if (!menu.is(e.target)
            && menu.has(e.target).length === 0) {
                menu.removeClass('main-menu--open');
        }        
    }
});

// range slider 
$('.range-slider-line').on('click', function (e) {
    var pos = $(this).offset();
    var elem_left = pos.left;
    // положение курсора внутри элемента
    var Xinner = e.pageX - elem_left;
    // устанавливаем курсор
    $('.range-slider-cursor').css("left", `${Xinner - 10}px`)
    $('.range-slider-line--gray').css({ "width": `calc(100% - ${Xinner}px)`, "left": `${Xinner}px` })
})