# contentNavigationCarousel

## Summary

jQuery plugin that takes a list of content items and generates a navigation list from content links to form the awesome power of a carousel.

## Options

Option | Description
--- | ---
autoplay | boolean; this will automatically rotate through the content list
autoplaySpeed | integer; the speed (0 - ∞ in ms) at which the autoplay will rotate through the items
mouseEvent | string; which mouse event will trigger the content switch; currently supported: hover & click
switchedSpeed | integer; the speed (0 - ∞ in ms) that it takes to switch to displaying a new contentItem
equalizeHeights | boolean; equalizes the heights of the content container and navigation list to whichever is largest

## The Markup

The markup for this component is in contentNavigationCarousel.jade.

## Implementing

###Jade

When using Jade, make sure the index.jade file has the include that references your contentNavigationCarousel.jade file. For the navigation list, the text is being created from the H2 within contentItem.

```jade
include contentNavigationCarousel
```
###CSS

Make sure to add the .css that is generated from the .scss file to the stylesheet that is associated with your website. 

###JavaScript

Make sure to add the minified version of contentNavigationCarousel.js to the javascript file that is already associated with your website. 

The example below shows the options that can be modified. Copy this function from the example/test.js file for the component that you're adding to the site. 

```javascript
$('.contentNavigationCarousel').contentNavigationCarousel({
    autoplay: true,
    autoplaySpeed: 5000,
    mouseEvent: 'hover',
    switchSpeed: 400,
    equalizeHeights: true
  });
  ```

## CSS

The CSS for this component is generated from Sass. The stylesheet can be modified to adjust the size of the carousel so that it fits within the left or right column. By default it is set to fit within the full width div. 

## Compatible With:
Chrome, FF, IE7+, Opera, Safari

#### Note 

* Widget container can have any class/id name but interior should contain a div called 'contentCollection' and inside that should be 1 to many divs or list items that have a class of 'contentItem' which contain whatever html should show up in the widget. Finally, the links that go to the content should have a class of 'contentLink'.
* If content item html contains images, make sure their dimensions are set either by css on inline img attributes. If they're not, height calculations will likely be off as they're calculated before the images are finished loading.
