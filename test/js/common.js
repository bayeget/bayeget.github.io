
	
$(function() {
	$("[href=#]").click(function(event){
        event.preventDefault();
    });
	/* Меню */
	$( ".nav-menu-icon" ).click(function() {

	  	if ($(".nav-main-menu").hasClass('active-menu')) {
	  		$(".nav-main-menu").removeClass("active-menu")
	  		$(this).removeClass("active-menu-icon")

	  	}
	  	else {
	  		$(".nav-main-menu").addClass("active-menu")
	  		$(this).addClass("active-menu-icon")
	  	}

	});

	/*  swiper */

	var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      	pagination: '.swiper-pagination',
      	paginationClickable: true,
        direction: 'vertical',
        mousewheelControl: true,
        speed: 1000,
        loop: true
    });

	/*isotope */

    var $grid = $('.grid').isotope({
	  // options
	  percentPosition: true,
	  itemSelector: '.grid-item',
	  masonry: {
	    columnWidth: '.grid-sizer'
	  }
	});
	$('.filter-button-group').on( 'click', 'button', function() {
	  var filterValue = $(this).attr('data-filter');
	  $grid.isotope({ filter: filterValue });
	});  
		/* fade meny*/
	var tempScrollTop = 0;
	var currentScrollTop = 0;
        
	jQuery(window).scroll(function(){
		if ( jQuery(document).scrollTop() > 200 ){
			currentScrollTop = jQuery(window).scrollTop();

			if (tempScrollTop < currentScrollTop ){
				jQuery('.header').fadeOut('fast');
			}
			//scrolling down
			else if (tempScrollTop > currentScrollTop ){
				jQuery('.header').fadeIn('fast');
			}
			//scrolling up
			tempScrollTop = currentScrollTop;
		}
      
    });
    var screen_width = jQuery(window).width();
    
	jQuery( document ).ready(function() {
		if(screen_width > 768) {
		    jQuery('#scrollup').click( function(){
		        jQuery('html, body').animate({scrollTop: 0},500);
		        return false;
		    });

		    jQuery(window).scroll(function(){
		        if ( jQuery(document).scrollTop() > 200 ) {
		            jQuery('#scrollup').fadeIn('fast');
		        } else {
		            jQuery('#scrollup').fadeOut('fast');
		        }
		    });
		};
	});
	/* animated */
	$('.fadeinan').click(function() {
	    $('body').addClass('animated zoomOut');
	});

	if(jQuery(".animsition").length){
	   jQuery(".animsition").animsition({
		inClass               :   'zoom-in-sm',
		outClass              :   'zoom-out-sm',
		inDuration            :    800,
		outDuration           :    800,
		linkElement           :   '.animsition-link',
		   // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
		loading               :    true,
		loadingParentElement  :   'body', 
		loadingClass          :   'animsition-loading',
		unSupportCss          : [ 'animation-duration',
								  '-webkit-animation-duration',
								  '-o-animation-duration'
								],
		overlay               :   false,

		overlayClass          :   'animsition-overlay-slide',
		overlayParentElement  :   'body'
	  });
	}
	
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

});


