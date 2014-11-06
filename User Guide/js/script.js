$(window).load(function() {
	$("#nav-dock a").hover(function () {
			$(this).find('span').animate({backgroundColor: 'rgb(71,220,204)', color: '#fff', paddingRight: '30px'}, {queue:false, duration:250 });
			$(this).find('div.sym').animate({top: '12px'}, {queue:false, duration:250 });
		},
		function () {
			$(this).find('span').animate({backgroundColor: 'rgba(83, 83, 83, 0)', color: '#626363', paddingRight: '20px'}, { queue:false, duration:350});
			$(this).find('div.sym').animate({top: '37px'}, {queue:false, duration:250, complete: function(){$(this).css('top', '-18px');} });
	});

	$(".post a").hover(function () {
			$(this).animate({ color: '#626363'}, {queue:false, duration:350 });
		},
		function () {
			$(this).animate({ color: '#3ca8dc'}, { queue:false, duration:450});
	});

	$("pre.html").snippet("html", {style:"whitengrey",transparent:true,showNum:false, menu:false});
		// Finds <pre> elements with the class "htmlCode"
		// and snippet highlights the HTML code within.

	$("pre.css").snippet("css",{style:"whitengrey",transparent:true,showNum:false, menu:false});
		// Finds <pre> elements with the class "styles"
		// and snippet highlights the CSS code within
		// using the "greenlcd" styling.

	$("pre.js").snippet("javascript",{style:"whitengrey",transparent:true,showNum:false, menu:false});
		// Finds <pre> elements with the class "js"
		// and snippet highlights the JAVASCRIPT code within
		// using a random style from the selection of 39
		// with a transparent background
		// without showing line numbers.

	var allPanels = $('.accordion > dd').hide();
	$('.accordion > dt > a').click(function() {
	    allPanels.slideUp();
	    $(this).parent().next().slideDown();
	    return false;
	  });
})