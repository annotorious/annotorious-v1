goog.provide('yuma.modules.image.ImageModule');

/**
 * The Image Module scans the page for images marked with the
 * 'annotatable' CSS class, and attaches an ImageAnnotator to
 * each one.
 */
yuma.modules.image.ImageModule = function() {
  var images = goog.dom.query('.annotatable', document);
  
  // TODO implement lazy loading
  for (var i=images.length - 1; i>-1; i--) {
    new yuma.modules.image.ImageAnnotator(images[i]);
  }
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
