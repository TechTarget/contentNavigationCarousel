Content Navigation Carousel microsite component

***

jQuery plugin that takes a list of content items and generates a navigation list from content links to form the awesome power of a carousel.

### Options:
* **autoplay:** boolean; this will automagically rotate through the content list
* **autoplaySpeed:** integer; the speed (0 - ∞ in ms) at which the autoplay will rotate through the items
* **mouseEvent:** string; which mouse event will trigger the content switch; currently supported: hover & click
* **switchSpeed:** integer; the speed (0 - ∞ in ms) that it takes to switch to displaying a new contentItem
* **equalizeHeights:** boolean; equalizes the heights of the content container and navigation list to whichever is largest

### Example:
  $('.contentNavigationCarousel').contentNavigationCarousel({
    autoplay: true,
    autoplaySpeed: 5000,
    mouseEvent: 'hover',
    switchSpeed: 400,
        equalizeHeights: true
  });

### Gotchas:

* Widget container can have any class/id name but interior should contain a div called 'contentCollection' and inside that should be 1 to many divs or list items that have a class of 'contentItem' which contain whatever html should show up in the widget. Finally, the links that go to the content should have a class of 'contentLink'.
* If content item html contains images, make sure their dimensions are set either by css on inline img attributes. If they're not, height calculations will likely be off as they're calculated before the images are finished loading.

### Tested in:
Chrome, FF, IE7+, Opera, Safari

### Todo:
* Add callbacks
* Animation options