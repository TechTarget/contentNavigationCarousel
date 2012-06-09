/*!
 * Content Navigation Carousel v0.5 (http://okize.github.com/)
 * Copyright (c) 2012 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */

;(function ( $, window, undefined ) {

	'use strict';

	// the default settings
	var pluginName = 'contentNavigationCarousel';
	var document = window.document;
	var defaults = {
		autoPlay: true,
		autoPlaySpeed: 10000,
		mouseEvent: 'click',
		switchSpeed: 500,
		equalizeHeights: true
	};

	// plugin constructor
	function Plugin( element, options ) {
		this.element = element;
		this.options = $.extend( {}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype.init = function () {

		var o = this.options;
		var carousel = $(this.element);
		var contentCollection = carousel.find('.contentCollection');
		var contentCollectionHeight = 0;
		var contentItems = contentCollection.find('.contentItem');
		var contentItemHeight = 0;
		var contentItemOffset = 0;
		var contentLinks = contentItems.find('.contentLink');
		var list = $('<div class="contentNavigation" />');
		var listHeight = 0;
		var listItems;
		var listItem;
		var visibleItem = -1;
		var nextItem = 0;

		// don't show a list of just one link
		if (contentLinks.length <= 1) { return; }

		// 'hover' is a helper name, change to 'mouseenter'
		if (o.mouseEvent === 'hover') { o.mouseEvent = 'mouseenter'; }

		// get list of links from content items; adding index as data attr since it will be faster to add here rather than figure out index later
		listItems = $.map(contentLinks, function(link, i) { return '<li><a href="' + link.href + '" data-index="' + i + '">' + (link.textContent || link.innerText) + '</a></li>'; });

		// create jQ collection of of list items since we'll need it later
		listItems = $(listItems.join(''));

		// insert list into DOM
		list.append( $('<ul>').append(listItems) ).insertAfter(contentCollection);

		// get the height of content navigation
		listHeight = list.height();

		// get the height of the tallest content item
		contentCollectionHeight = Math.max.apply(null, contentItems.map(function () { return $(this).height(); }).get());

		// set the height of the content container to the tallest content item if it's overflow is hidden
		// otherwise no content will show
		if (contentCollection.css('overflow') === 'hidden') {
			contentCollection.height(contentCollectionHeight);
		}

		// equalize the heights of the collection and nav or
		// if set to false, set height of collection to tallest contant item
		if (o.equalizeHeights) {

			// is there a more clever way to write this?
			if (listHeight > contentCollectionHeight) {
				contentCollection.height(listHeight);
			} else {
				list.height(contentCollectionHeight);
			}

		}

		// set the top offsets of all the content items and
		// now that their heights are known set display to none
		contentItems.each( function(i) {

			contentItemHeight = $(this).height();
			contentItemOffset = Math.round((listHeight - contentItemHeight)/2);
			$(this).css({'display': 'none','top': contentItemOffset + 'px'});

		});

		var showContent = function (e) {

			// if mouse event is a click, prevent the browser following the href
			if (o.mouseEvent === 'click') {
				e.preventDefault();
			}

			// cache item selector
			listItem = $(this);

			// get index of current item focus
			nextItem = listItem.data('index');

			// remove active class
			// need to check entire item stack because of animation race conditions
			listItems.removeClass('active');

			// add active class to current item
			listItems.eq(nextItem).addClass('active');

			// if we're not on the active item then switch out visible content
			if (nextItem !== visibleItem) {

				contentItems.eq(visibleItem).fadeOut(o.switchSpeed/2, function() {

					contentItems.eq(nextItem).fadeIn(o.switchSpeed/2);

				});

				// update visibleItem
				visibleItem = nextItem;

			}

		};

		// attach event handler function
		listItems.on(o.mouseEvent, 'a', showContent);

		// trigger mousevent on the first link to get the ball rolling
		list.find('a').eq(0).trigger(o.mouseEvent);

	};

	// a lightweight plugin wrapper around the constructor preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	};

}(jQuery, window));