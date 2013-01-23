$(document).on('ready', function() {

	'use strict';

	$('.contentNavigationCarousel').contentNavigationCarousel({
    autoplay: true,
    autoplaySpeed: 10000,
    mouseEvent: 'hover',
    switchSpeed: 500,
    equalizeHeights: true
  });

});