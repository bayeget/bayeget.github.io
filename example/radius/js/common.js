$(function() {

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
	/* click header and footer*/
	$(".header").click(function(){
			$(".header").toggleClass("show-header")
			$(".header-content").toggleClass("show-header-content")
			
	})
	$(".footer-toggle").click(function(){
			$(".footer").toggleClass("show-footer")
			
	})
	


});
