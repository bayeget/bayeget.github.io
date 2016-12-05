$(function() {
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
        loop: true,
        lazyLoading: true
    })        

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
