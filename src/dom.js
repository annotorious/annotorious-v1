/**
 * A collection of helper functions for general use.
 */
goog.provide('annotorious.dom');

/**
 * Computes the absolute top/left offset of a DOM element relative to the document.
 * @param {element} el the DOM element
 * @returns {object} an object containing the offset { top, left }
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
 * @param {element} el the DOM element to check for visibility
 * @returns {boolean} true if the element is within the current viewport
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
 * @param {function} fn the handler function to add
 */
annotorious.dom.addOnLoadHandler = function(fn) {
  if (typeof window.onload == 'function') {
    var current = window.onload;
    window.onload = function() {
      current();
      fn();
    }
  } else {
    window.onload = fn;
  }   
}

