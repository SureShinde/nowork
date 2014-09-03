jQuery(document).delegate("#tab2","click",function() {

	jQuery(".lazy").lazyload({
	    threshold : 200
	});

})