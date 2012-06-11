$(document).on('ready', function () {
	
	$('.contentNavigationCarousel').contentNavigationCarousel({
		//linkSelector: $(),
		autoPlay: true,
		autoPlaySpeed: 10000,
		mouseEvent: 'hover',
		switchSpeed: 400,
		callback: function() {}
	});

});