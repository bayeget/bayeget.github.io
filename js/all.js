(function(cash) { "use strict";

    var screen_width = jQuery(window).width();

    if(jQuery('.admin-bar').length){
        jQuery('.menu-all-pages-container,.parent-menu,.main-logo,.mobile-icon').addClass('hasadminbar');
    }

    jQuery('.navigation li').on('click',function(){
       if(jQuery(this).hasClass('menu-item-has-children'))
       {

           if(jQuery(this).find('.dropmenu').hasClass('submenu-item-open'))
           {
               jQuery(this).find('.dropmenu').removeClass('submenu-item-open');
               jQuery(this).find('.dropmenu').hide().css({'visibility':'hidden','opacity': 0});
           }
           else{
               jQuery(this).find('.dropmenu').addClass('submenu-item-open');
               jQuery(this).find('.dropmenu').show().css({'visibility':'visible','opacity': 1});
           }


       }
    });

    jQuery("[href=#]").click(function(event){
        event.preventDefault();
    });

    jQuery('.blog-page').find('.item.post-no-image').each(function(){

            var height = jQuery(this).find('.post-text').outerHeight();

        if(height.length !== 0)
            jQuery(this).find('.post-img').height(height);
        else
            jQuery(this).find('.post-img').height(200);

        jQuery(this).find('.post-text').css('position','absolute');
    });

    jQuery('.filter-category').on('click',function(){
       var link = jQuery(this).attr('data-href');

        window.location.href = link;
    });

	jQuery('.navigation li').children('a').addClass('animsition-link');

    jQuery('.navigation').children('li').children('a').each(function(){
        var menu_a_text = jQuery(this).text();

        jQuery(this).empty();

        if(jQuery(this).siblings('.dropmenu').length !== 0)
            jQuery(this).append('<span>'+menu_a_text+'</span><div class="fa fa-angle-down"></div>');
        else
            jQuery(this).append('<span>'+menu_a_text+'</span>');
    });

	function center_bg(){
		jQuery('.center-image').each(function(){
		  var bgSrc = jQuery(this).attr('src');
		  jQuery(this).parent().css({'background-image':'url('+bgSrc+')'});
		  jQuery(this).remove();
		});
	}
	center_bg();
				 
	/***********************************/
	/*Swiper Slider*/
	/**********************************/
		
    var swipers = [];
    var winW = jQuery(window).width();
    var winH  =  jQuery(window).height();
	var xsPoint = 700, smPoint = 991, mdPoint = 1199; 
	var initIterator = 0;
				 			 
    function swiperInit(){
		
		  jQuery('.swiper-container').each(function(){								  
			var $th = jQuery(this);								  
			var index = $th.attr('id'); 
				jQuery(this).addClass('swiper-'+index + ' initialized').attr('init-attr', 'swiper-'+index);
				jQuery(this).parent().find('.pagination').addClass('pagination-'+index);
			
				var autoPlayVar = parseInt($th.attr('data-autoplay'));
				var slidesPerViewVar = $th.attr('data-slides-per-view');
			    var loopVar = parseInt($th.attr('data-loop'));
			    var mouseVar = parseInt($th.attr('data-mouse'));
			    var sliderSpeed = parseInt($th.attr('data-speed'));
			    var xsValue, smValue, mdValue, lgValue;
			    var slideMode =  $th.attr('data-mode');
			    var touchVar = parseInt($th.attr('data-touch'));
			    if(slidesPerViewVar == 'responsive'){
					 xsValue = parseInt($th.attr('data-xs-slides'));
					 smValue = parseInt($th.attr('data-sm-slides'));
					 mdValue = parseInt($th.attr('data-md-slides'));
					 lgValue = parseInt($th.attr('data-lg-slides'));
					 slidesPerViewVar = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
                } else slidesPerViewVar = parseInt(slidesPerViewVar);
				
				swipers ['swiper-'+index] = new Swiper('.swiper-'+index,{
					speed: sliderSpeed,
					loop: loopVar,
					mode: slideMode,
					resistance: false,
					grabCursor: true,
					pagination: '.pagination-'+index,
					paginationClickable: true,
					autoplay: autoPlayVar,
					autoplayDisableOnInteraction: true,
					slidesPerView: slidesPerViewVar,
					keyboardControl: true,
					simulateTouch: touchVar,
					calculateHeight: true,
					mousewheelControl: mouseVar
				});
			swipers['swiper-'+index].reInit();
		    initIterator++;
       
		});
	}
				 
	 jQuery('.slide-prev').on('click', function(){
      var arIndex = jQuery(this).closest('.arrow').find('.swiper-container').attr('init-attr');
      swipers[arIndex].swipePrev();
     });

     jQuery('.slide-next').on('click', function(){
     var arIndex = jQuery(this).closest('.arrow').find('.swiper-container').attr('init-attr');
      swipers[arIndex].swipeNext();
     });
				 
		 
	function updateSlidesPerView(xsValue, smValue, mdValue, lgValue){
         if(winW > mdPoint) return lgValue;
         else if(winW>smPoint) return mdValue;
         else if(winW>xsPoint) return smValue;
         else return xsValue;
    }			 	
				 			   
    swiperInit();
				
				 
	/***********************************/
	/*PHOTOSWIPE GALLERY*/
	/**********************************/          
                 
   var initPhotoSwipeFromDOM = function(gallerySelector) {
    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            childElements,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        // find index of clicked item
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        if(!params.hasOwnProperty('pid')) {
            return params;
        }
        params.pid = parseInt(params.pid, 10);
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            index: index,
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of docs for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
           history: false,
           focus: false 
        };
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid > 0 && hashData.gid > 0) {
        openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
    }
    };
    initPhotoSwipeFromDOM('.my-simple-gallery');			 
				 
	/***********************************/
	/*WINDOW RESIZE*/
	/**********************************/
				 
	function resizeCall() {
		winW = jQuery(window).width();
   		winH = jQuery(window).height();
         jQuery('.swiper-container[data-slides-per-view="responsive"]').each(function(){
			 var $th = jQuery(this);
			 var xsValue = parseInt($th.attr('data-xs-slides'));
			 var smValue = parseInt($th.attr('data-sm-slides'));
			 var mdValue = parseInt($th.attr('data-md-slides'));
			 var lgValue = parseInt($th.attr('data-lg-slides'));
			 var currentSwiper = swipers[jQuery(this).attr('init-attr')];
			 var newSlideNumber = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
			 currentSwiper.params.slidesPerView = newSlideNumber;
             currentSwiper.reInit();
         });
    }

    jQuery(window).resize(function(){
         resizeCall();
    });	
				 
	window.addEventListener("orientationchange", function() {
         resizeCall();
    }, false);				 
	
	 /***********************************/
	 /*Video thumbs*/
	 /**********************************/
		
        jQuery('.video-click').on( "click", function() {
			jQuery(this).find('iframe').attr('src',jQuery(this).find('.video-change').attr('href') + '&autoplay=1');
              jQuery(this).find('.video').show();
              jQuery(this).find('.img-href').hide();
			  jQuery(this).find('.play').hide();
	    });
				   
		jQuery('.video .clos').click(function(){
			jQuery('.video').fadeOut(500, function(){
				jQuery('.video iframe').attr('src','');
				jQuery('.img-href').show();
				jQuery('.play').show();
			});
	    });
	
	/***********************************/
	/*MOBILE MENU*/
	/**********************************/

    if(screen_width < 993)
    {
        jQuery('.navigation li a .fa').on('click', function(){
            var parent_li = jQuery(this).parents('li');

            if(parent_li.hasClass('menu-item-has-children'))
            {

                if(parent_li.find('.dropmenu').hasClass('submenu-item-open'))
                {
                    parent_li.find('.dropmenu').removeClass('submenu-item-open');
                    parent_li.find('.dropmenu').hide().css({'visibility':'hidden','opacity': 0});
                }
                else{
                    parent_li.find('.dropmenu').addClass('submenu-item-open');
                    parent_li.find('.dropmenu').show().css({'visibility':'visible','opacity': 1});
                }


            }

            return false;
        });
    }


	jQuery('.nav-menu-icon a').on("click", function() { 
	  if (jQuery('nav').hasClass('slide-menu')){
		  jQuery('nav').removeClass('slide-menu'); 
		  jQuery(this).removeClass('active');
	  }else {
		   jQuery('nav').addClass('slide-menu');
		  jQuery(this).addClass('active');
	  }
		return false;
	});
		 
	/***********************************/
	/*GOOGLE MAP*/
	/**********************************/
	
	function initialize(obj) {
		var lat = jQuery('#'+obj).attr("data-lat");
        var lng = jQuery('#'+obj).attr("data-lng");
		var contentString = jQuery('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = ''+jQuery('.map').attr('data-pin')+'';
		var zoomLevel = parseInt(jQuery('#'+obj).attr("data-zoom"));

		var styles = [{"stylers":[{"visibility":"on"},{"saturation":-100},{"gamma":0.54}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#4d4946"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"gamma":0.48}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"gamma":7.18}]}]
		
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
	
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		}
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);
	
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
	
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});
      
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});
	
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	
	}			 
				                   		 
	/***********************************/
	/*ANIMSITION PLUGIN FOR PAGE TRANSITION*/
	/**********************************/
				 
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
	
	/***********************************/
	/*MAGNIFIC POPUP GALLERY*/
	/**********************************/
	
	if(jQuery('.popup-gallery').length){			 
	jQuery('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small></small>';
			}
		},
		zoom: {
			enabled: true,
			duration: 300 
		}
	});
	}
				 
	if (jQuery(window).width()<992){			 
		jQuery('.navigation > ul > li > a').on('click', function(){
		   if (jQuery(this).parent().find('.dropmenu').hasClass('slidemenu')) {
			   jQuery(this).parent().find('.dropmenu').removeClass('slidemenu');
		   }else{
			   jQuery('.navigation > ul > li > a').parent().find('.dropmenu').removeClass('slidemenu');
			   jQuery(this).parent().find('.dropmenu').addClass('slidemenu');
		   }
			return false;
		});
	}
				 
	/***********************************/
	/*WINDOW LOAD*/
	/**********************************/
				 
    jQuery(window).load(function() {
		
		if(jQuery('#map-canvas-contact').length==1){
		 initialize('map-canvas-contact');}
		
		setTimeout (function() {
		   jQuery('.logo').fadeIn(500);
			jQuery('.mobile-icon').fadeIn(500);
		},1000);
		
		
	    if (jQuery('.izotope-container').length) { 
			 var $container = jQuery('.izotope-container');
              $container.isotope({
                itemSelector: '.item',
                layoutMode: 'masonry',
                masonry: {
                  columnWidth: '.grid-sizer'
                }
              });
			  jQuery('#filters').on( 'click', 'button', function() {
				jQuery('.izotope-container').each(function(){
				   jQuery(this).find('.item').removeClass('animated');
				});
				jQuery('#filters button').removeClass('active-button');
				  jQuery(this).addClass('active-button');
					 var filterValue = jQuery(this).attr('data-filter');
						$container.isotope({filter: filterValue});
              });
			
			  var $stampElem = $container.find('.stamp');
              var isStamped = false;
			
			  $container.isotope( 'stamp', $stampElem );
	
           }
	});
    /* SCROLLUP */

    jQuery( document ).ready(function() {
    jQuery('#scrollup img').mouseover( function(){
        jQuery( this ).animate({opacity: 0.65},100);
    }).mouseout( function(){
        jQuery( this ).animate({opacity: 1},100);
    }).click( function(){
        window.scroll(0 ,0); 
        return false;
    });

    jQuery(window).scroll(function(){
        if ( jQuery(document).scrollTop() > 0 ) {
            jQuery('#scrollup').fadeIn('fast');
        } else {
            jQuery('#scrollup').fadeOut('fast');
        }
    });
});
				 			 
				 
})(jQuery); 