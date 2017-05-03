$(function() {
	var screen_width = jQuery(window).width();
	$("[href=#]").click(function(event){
        event.preventDefault();
    });
	$("[href=#about]").click(function(event){
        event.preventDefault();        
        $("html,body").animate({scrollTop: ($(about).offset().top)}, 1000);;
    });
    $("[href=#graduate]").click(function(event){
        event.preventDefault();        
        $("html,body").animate({scrollTop: ($(graduate).offset().top)}, 1000);;
    });
    $("[href=#achiev]").click(function(event){
        event.preventDefault();        
        $("html,body").animate({scrollTop: ($(achiev).offset().top)}, 1000);;
    });
    $("[href=#development]").click(function(event){
        event.preventDefault();        
        $("html,body").animate({scrollTop: ($(development).offset().top)}, 1000);;
    });
    $("[href=#photogallery]").click(function(event){
        event.preventDefault();        
        $("html,body").animate({scrollTop: ($(photogallery).offset().top)}, 1000);;
    });
    $("[href=#classroom]").click(function(event){
        event.preventDefault();        
        $("html,body").animate({scrollTop: ($(classroom).offset().top)}, 1000);;
    });
	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	// header fadein-out
	jQuery(window).scroll(function(){
	    
	    if ( jQuery(document).scrollTop() > 170 ) {
	        jQuery('.header-menu-fade').fadeIn('fast');
	    } else {
	        jQuery('.header-menu-fade').fadeOut('fast');
	    }
	});
	// scrollup
	jQuery( document ).ready(function() {
		if(screen_width > 480) {
		    jQuery('#scroll-up').click( function(){
		        jQuery('html, body').animate({scrollTop: 0},500);
		        return false;
		    });
		    jQuery(window).scroll(function(){
		    	if ( jQuery(document).scrollTop() > 200 ) {
			        jQuery('#scroll-up').fadeIn('fast');
			    } else {
			        jQuery('#scroll-up').fadeOut('fast');
			    }
		    });

		};
		
	});

	// tabs click
	$(".tabs").click(function() {
		$(".tabs").removeClass('container-tabs-nav-active') 
    	$(this).toggleClass('container-tabs-nav-active')    	
    })
    $("#tabs_ege").click(function() {
		$(".tabs_ege").removeClass('hidden')  
    	$(".tabs_algebra").addClass('hidden') 
    	$(".tabs_other").addClass('hidden')   	
    })
    $("#tabs_algebra").click(function() {
		$(".tabs_ege").addClass('hidden')  
    	$(".tabs_algebra").removeClass('hidden') 
    	$(".tabs_other").addClass('hidden')      	
    })
    $("#tabs_other").click(function() {
		$(".tabs_ege").addClass('hidden')  
    	$(".tabs_algebra").addClass('hidden') 
    	$(".tabs_other").removeClass('hidden')     	
    })

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
