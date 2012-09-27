goog.provide('yuma.modules.image.ImageModule');

goog.require('goog.array');
goog.require('goog.events');

/**
 * The Image Module scans the page for images marked with the
 * 'annotatable' CSS class, and attaches an ImageAnnotator to
 * each one.
 * @constructor
 */
yuma.modules.image.ImageModule = function() {
  this._allImages = goog.dom.query('img.annotatable', document);
  this._imagesToLoad = goog.array.clone(this._allImages);
  
  // Make images in viewport annotatable
  this._lazyLoad();
  
  // Attach a listener to make images annotatable as they scroll into view
  var self = this;
  var key = goog.events.listen(window, goog.events.EventType.SCROLL, function() {
    if (self._imagesToLoad.length > 0)
      self._lazyLoad();
    else
      goog.events.unlistenByKey(key);
  });
}

/**
 * @private
 */
yuma.modules.image.ImageModule.prototype._lazyLoad = function() {
  var self = this;
  goog.array.forEach(this._imagesToLoad, function(image, idx, array) {
    if (yuma.modules.image.isInViewport(image)) {
      new yuma.modules.image.ImageAnnotator(image);
      goog.array.remove(self._imagesToLoad, image);
    }
  });  
}

if (typeof window.onload != 'function') {
  window.onload = function() {
    new yuma.modules.image.ImageModule();
  }
} else {
  var current = window.onload;
  window.onload = function() {
    current();
    new yuma.modules.image.ImageModule();
  }
}

/**
 * Utility method to check whether a certain DOM element
 * is (partly) within the viewport.
 * Cf. http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
 *
 * TODO this should (eventually) go into a 'modules.js', namespace yuma.modules
 *
 * @param {element} element the DOM element to check for visibility
 */
yuma.modules.image.isInViewport = function(element) {
  var top = element.offsetTop;
  var left = element.offsetLeft;
  var width = element.offsetWidth;
  var height = element.offsetHeight;

  while (element.offsetParent) {
    element = element.offsetParent;
    top += element.offsetTop;
    left += element.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  ); 
}
