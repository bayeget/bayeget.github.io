$(function() {
	
	$("[href=#]").click(function(event){
        event.preventDefault();
    });
    $("[href=#about]").click(function(event){
    	event.preventDefault();
    	
        $("html,body").animate({scrollTop: ($(about).offset().top)}, 1000);;
    });
    $("[href=#actors]").click(function(event){
    	event.preventDefault();

        $("html,body").animate({scrollTop: ($(actors).offset().top)}, 1000);;
    });
    $("[href=#trailer]").click(function(event){
    	event.preventDefault();

        $("html,body").animate({scrollTop: ($(trailer).offset().top)}, 1000);;
    });
    $("[href=#backstage]").click(function(event){
    	event.preventDefault();

        $("html,body").animate({scrollTop: ($(backstage).offset().top)}, 1000);;
    });
    $("[href=#stills]").click(function(event){
    	event.preventDefault();

        $("html,body").animate({scrollTop: ($(stills).offset().top)}, 1000);;
    });
    $("[href=#adwards]").click(function(event){
    	event.preventDefault();

        $("html,body").animate({scrollTop: ($(adwards).offset().top)}, 1000);;
    });
    $("[href=#about_crew]").click(function(event){
    	event.preventDefault();

        $("html,body").animate({scrollTop: ($(about_crew).offset().top)}, 1000);;
    });


	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	// init Swiper
	$(document).ready(function () {
	    //initialize swiper when document ready  
	    var mySwiper = new Swiper ('.swiper-container', {
	      // Optional parameters
	      	pagination: '.swiper-pagination',
        	paginationClickable: true,
        	speed: 800,
        	autoplay: 5000,
        	autoplayStopOnLast: true,
        	effect: "fade",
        	slideToClickedSlide: true,
        	keyboardControl: true,
        	mousewheelControl: true,
        	direction: 'vertical'
	    })        
	  });
	var winHeight = $(window).height()
	$(window).scroll(function(){
		if ( $(document).scrollTop()==0 ){

			$( '#nextslide' ).click( function(){
		        /*$('html, body').animate({scrollTop: winHeight},500);
		        return false;*/
		        if ( $(".swiper-container").hasClass('display-none')) {
		        	$(".swiper-container").fadeIn('normal');
		        	$(".swiper-container").toggleClass('display-none');
		        }
		        
		        else{
		        	$(".swiper-container").fadeOut('normal');
		        	$(".swiper-container").toggleClass('display-none');
		        	
		        }
		       
		    });
		}
	})
	$('.title-bg3').change(function(){
	  alert('Элемент foo был изменен.');
	});
	$(document).ready(function () {
		if ($(".slide3").hasClass('swiper-slide-active')) {
			$(".header").fadeOut('normal')
			alert('Привет')
		}
	})
	var tempScrollTop = 0;
	var currentScrollTop = 0;
	jQuery(window).scroll(function(){
		if ( jQuery(document).scrollTop() > 880 ){
			currentScrollTop = jQuery(window).scrollTop();
			if (tempScrollTop > currentScrollTop ){
				if ( jQuery(document).scrollTop() < 880 ){
					jQuery('html, body').animate({scrollTop: 0},500);
					return false;
				}

			}
			tempScrollTop = currentScrollTop;
			 
		}
      
    });

});
