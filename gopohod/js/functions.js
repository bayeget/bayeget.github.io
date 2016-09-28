(function($) {
	"use strict"

	/* ## Document Scroll - Window Scroll */
	$( document ).scroll(function()
	{
		var scroll	=	$(window).scrollTop();
		var height	=	$(window).height();
		/*** set sticky menu ***/
		if( scroll >= height )
		{
			$(".header-main").addClass("navbar-fixed-top animated fadeInDown").delay( 2000 ).fadeIn();
		}
		else if ( scroll <= height )
		{
			$(".header-main").removeClass("navbar-fixed-top animated fadeInDown");
		}
		else
		{
			$(".header-main").removeClass("navbar-fixed-top animated fadeInDown");
		}	
		if ($(this).scrollTop() >= 50)
		{
			$('#back-to-top').fadeIn(200); 
		}
		else
		{
			$('#back-to-top').fadeOut(200);
		}
	});
	/* ## Document Ready - Handler for .ready() called */
	$(document).ready(function($) {		
		/* - Scrolling Navigation */
		var scroll	=	$(window).scrollTop();
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/*** set sticky menu ***/
		if( scroll >= height -500 )
		{
			$(".header-main").addClass("navbar-fixed-top").delay( 2000 ).fadeIn();
		}
		else if ( scroll <= height )
		{
			$(".header-main").removeClass("navbar-fixed-top");
		}
		else
		{
			$(".header-main").removeClass("navbar-fixed-top");
		}		
		/* local url of page (minus any hash, but including any potential query string) */
		var url = location.href.replace(/#.*/,'');		
		/* Find all anchors */
		$("#navbar").find("a[href]").each(function(i,a) {
			var $a = $(a);
			var href = $a.attr("href");
			/* check is anchor href starts with page's URI */
			if ( href.indexOf(url+"#") == 0 ) {
				/* remove URI from href */
				href = href.replace(url,"");
				/* update anchors HREF with new one */
				$a.attr("href",href);
			}
		});		
		/* Add Easing Effect on Section Scroll */
		$(".navbar-nav > li a[href*='#']:not([href='#']), .site-logo a[href*='#']:not([href='#'])").on("click", function() {
			if ( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname ) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$("html, body").animate( { scrollTop: target.offset().top - 83 }, 1000, 'easeInOutExpo' );
					return false;
				}
			}
		});				/* Photo Slider Add class To ACtive Slide */		$("#main-carousel .carousel-inner .item:first").addClass("active");				/* Testimonials Slider Add class To ACtive Slide */		$("#main-carousel-1 .carousel-inner .item:first").addClass("active");				/* Place Slider Add class To ACtive Slide */		$("#places-section .carousel-inner .item:first").addClass("active");		
		
		$(".ow-navigation .navbar-nav li").removeClass("active");
		
		$(".ow-navigation .navbar-nav li.current-menu-item:first").addClass("active");
		
		/* - Responsive Caret */
		$(".ddl-switch").on("click", function() {
			var li = $(this).parent();
			if ( li.hasClass("ddl-active") || li.find(".ddl-active").length !== 0 || li.find(".dropdown-menu").is(":visible") ) {
				li.removeClass("ddl-active");
				li.children().find(".ddl-active").removeClass("ddl-active");
				li.children(".dropdown-menu").slideUp();
			}
			else {
				li.addClass("ddl-active");
				li.children(".dropdown-menu").slideDown();
			}
		});		
		/* - Remove p empty tag for Shortcode */
		$( "p,.breadcrumb span" ).each(function() {
			var $this = $( this );
				if( $this.html().replace(/\s|&nbsp;/g, '').length == 0) {
				$this.remove();
			}
		});
		
		var cnt = $(".breadcrumb > span:last-child > span").length;
		if(cnt == 0) {
			$(".breadcrumb > span:last-child").css("display", "none");
		}
		
		var total_img = $("article.type-post .entry-cover > a img").length;
		if(total_img == 0) {
			$("article.type-post .entry-cover .entry-meta").css("display", "none");
		}
				
		/* - Tooltip */
		$('[data-toggle="tooltip"]').tooltip();		
		/* - Photo Slider */
		var slider_count = 0;
		slider_count = $( "[id*='slider_shape-']" ).length;
		for(var i=1; i<=slider_count; i++)
		{
			$( "[id*='slider_shape-"+i+"']" ).css("clip-path","url('#slider-"+i+"')");
		}
		/* Intro Section */
		$(".intro-section .intro-shape").css('clip-path','url("#intro")');
		if($(".intro-carousel").length){
			$(".intro-carousel").owlCarousel({
				autoplay: true,
				touchDrag: true,
				mouseDrag: true,
				loop:true,
				margin:0,
				nav: true,
				dots: false,
				smartSpeed: 1000,
				responsive:{
					0:{
						items:1
					},
					560:{
						items:1
					},
					1000:{
						items:1
					},
					1200:{
						items:1
					}
				}
			})
		}		
		if( $(".intro-section").length ){
			$(".intro-section").each(function ()
			{
				var $this = $(this);
				var myVal = $(this).data("value");
				$this.appear(function()
				{		
					$(".intro-section .quotes").addClass("animated fadeInLeft");
					$(".intro-section .content").addClass("animated fadeInRight");
				});
			});
		}
		/* - About Section */
		if( $(".about-section").length ){
			$(".about-section").each(function ()
			{
				var $this = $(this);
				var myVal = $(this).data("value");
				$this.appear(function()
				{		
					$(".about-section .col-md-3").addClass("animated flip");
				});
			});
		}
		/* - Team Section */
		var team_count = 0;
		team_count = $( "[id*='team_shape-']" ).length;
		for(var i=1; i<=team_count; i++)
		{
			$( "[id*='team_shape-"+i+"']" ).css("clip-path","url('#team-"+i+"')");
		}		
		if( $(".team-section").length ){
			$(".team-section").each(function ()
			{
				var $this = $(this);
				var myVal = $(this).data("value");
				$this.appear(function()
				{		
					$(".team-section .col-md-3").addClass("animated bounceIn");
				});
			});
		}
		/* - Blog */
		var triangle_shape_count = 0;
		triangle_shape_count = $( "[id*='triangle-']" ).length;
		var ele_id = 0;
		$( "[id*='triangle-']" ).each(function () { 
				ele_id = $(this).attr('id').split("-")[1];
				$( "[id*='triangle-"+ele_id+"']" ).css("clip-path","url('#triangle_shape-"+ele_id+"')");
		});		
		if( $(".blog-section").length ){
			$(".blog-section").each(function ()
			{
				var $this = $(this);
				var myVal = $(this).data("value");
				$this.appear(function()
				{		
					$(".blog-section .col-md-4").addClass("animated fadeInUp");
				});
			});
		}		
		/* - Banner Shape */
		$(".page-banner .page-banner-shape").css("clip-path",'url("#banner-shape")');
	
		if( $(".gallery-section").length ){			
			$(".gallery-section").each(function ()
			{
				var $this = $(this);
				var myVal = $(this).data("value");
				$this.appear(function()
				{		
					$(".gallery-section .col-md-3").addClass("animated bounceIn");
				});
			});
		}
		/* -- Places Section */
		if( $("#places-section").length ){			
			if( width >= 768 )
			{
				var c_width = $("#places-section .carousel-caption").width();
				var control_width = (width - c_width) / 2;
				$(".places-section .carousel-control").css("width", control_width);
			}			
			else {
				var c_width = $("#places-section .carousel-caption").width();
				var control_width = (width) / 2;
				$(".places-section .carousel-control").css("width", control_width);
			}
		}		
		/* Cleint Section */
		if($(".client-section").length){			
			$(".client-carousel").owlCarousel({
				autoplay: true,
				touchDrag: true,
				mouseDrag: true,
				loop:true,
				margin: 30,
				nav: false,
				dots: false,
				smartSpeed: 1000,
				responsive:{
					0:{
						items:1
					},
					400:{
						items:2
					},
					560:{
						items:3
					},
					1000:{
						items:4
					},
					1200:{
						items:6
					}
				}
			})
		}
		
		/* Gallery */	
		if( $(".gallery-single").length ){			
			$(".gallery-single .img-box").magnificPopup({
				delegate: "a",
				type: "image",
				tLoading: "Loading image #%curr%...",
				mainClass: "mfp-img-mobile",
				gallery: {
					enabled: true,
					navigateByImgClick: false,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',				
				}
			});
		}
		
		/* Flicker Image Open New Tab */
		$('.widget_flicker .flickr_photos .flickr_badge_image a').attr('target', '_blank');
		
	});
	$( window ).resize(function() {		
		var width =	$(window).width();		
		var height = $(window).height();		
		if( $("#places-section").length ){			
			if( width >= 768 )
			{
				var c_width = $("#places-section .carousel-caption").width();
				var control_width = (width - c_width) / 2;
				$(".places-section .carousel-control").css("width", control_width);
			}			
			else {
				var c_width = $("#places-section .carousel-caption").width();
				var control_width = (width) / 2;
				$(".places-section .carousel-control").css("width", control_width);
			}
		}
	});

	/* ## Window Load - Handler for .load() called */
	$(window).load(function() {		
		/* - Site Loader */
		if ( !$('html').is('.ie6, .ie7, .ie8') ) {
			$("#site-loader").delay(1000).fadeOut("slow");
		}		
		else {
			$("#site-loader").css('display','none');
		}
	});		if( $('.social-share').length ) {				$('.social-share ul > li > a', this).bind('click', function(e) {			e.preventDefault();			e.stopPropagation();			var data_action = $(this).attr('data-action');			var data_title = $(this).attr('data-title');			var data_url = $(this).attr('data-url');			if( data_action == 'facebook' ) {						window.open('http://www.facebook.com/share.php?u='+encodeURIComponent(data_url)+'&title='+encodeURIComponent(data_title),'sharer','toolbar=0,status=0,width=580,height=325');			}			else if( data_action == 'google-plus' ) {				window.open('https://plus.google.com/share?url='+encodeURIComponent(data_url),'sharer','toolbar=0,status=0,width=580,height=325');			}			else if( data_action == 'twitter' ) {				window.open('http://twitter.com/intent/tweet?status='+encodeURIComponent(data_url)+'+'+encodeURIComponent(data_title),'sharer','toolbar=0,status=0,width=580,height=325');			}			else if( data_action == 'dribbble' ) {				window.open('https://dribbble.com/share?url='+encodeURIComponent(data_url),'sharer','toolbar=0,status=0,width=580,height=325');			}		});	}
})(jQuery);