/**
 * A collection of helper functions for general use.
 */
goog.provide('annotorious.dom');

goog.require('goog.fx.Dragger');

/**
 * Computes the absolute top/left offset of a DOM element relative to the document.
 * @param {Element} el the DOM element
 * @return {Object} an object containing the offset { top, left }
 */
annotorious.dom.getOffset = function(el) {
  var _x = 0;
  var _y = 0;
  
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

/**
 * Checks whether a certain DOM element is (partly) within the current viewport.
 * Cf. http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
 * @param {Element} el the DOM element to check for visibility
 * @return {boolean} true if the element is within the current viewport
 */
annotorious.dom.isInViewport = function(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  ); 
}

/**
 * Adds an additional handler function to window.onload, without overwriting existing ones.
 * @param {Function} fn the handler function to add
 */
annotorious.dom.addOnLoadHandler = function(fn) {
  if (window.addEventListener)
    window.addEventListener('load', fn, false);
  else if (window.attachEvent) 
    window.attachEvent('onload', fn);
}

/**
 * Makes a DIV element resizable into horizontal direction.
 * @param {Element} div the DIV to make h-resizable
 * @param {Function=} opt_callback an optional function to be notified on resize
 */
annotorious.dom.makeHResizable = function(div, opt_callback) {
  var handle = goog.dom.createElement('div');
  goog.style.setStyle(handle, 'position', 'absolute');
  goog.style.setStyle(handle, 'top', '0px');
  goog.style.setStyle(handle, 'right', '0px');
  goog.style.setStyle(handle, 'width', '5px');
  goog.style.setStyle(handle, 'height', '100%');
  goog.style.setStyle(handle, 'cursor', 'e-resize');
  goog.dom.appendChild(div, handle);
  
  var div_border = goog.style.getBorderBox(div);
  var width_limit = goog.style.getBounds(div).width - div_border.right - div_border.left;

  var dragger = new goog.fx.Dragger(handle);  
  dragger.setLimits(new goog.math.Rect(width_limit, 0, 800, 0));
  dragger.defaultAction = function(x) {
    goog.style.setStyle(div, 'width', x + 'px');
    if (opt_callback)
      opt_callback();
  };
}

