goog.provide('annotorious.dom');

/**
 * Utility function that computes the absolute offset
 * of a DOM element relative to the document.
 * @param {element} el the DOM element
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
 * Utility method to check whether a certain DOM element
 * is (partly) within the viewport.
 * Cf. http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
 * @param {element} element the DOM element to check for visibility
 */
annotorious.dom.isInViewport = function(element) {
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

/**
 * Utility function that adds an additional handler function
 * to window.onload, without overwriting existing ones.
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

