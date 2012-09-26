goog.provide('yuma.modules.image.ImageModule');

goog.require('goog.array');

/**
 * The Image Module scans the page for images marked with the
 * 'annotatable' CSS class, and attaches an ImageAnnotator to
 * each one.
 */
yuma.modules.image.ImageModule = function() {
  var images = goog.dom.query('img.annotatable', document);
    
  // TODO implement lazy loading
  goog.array.forEach(images, function(image, idx, array) {
    var annotator = new yuma.modules.image.ImageAnnotator(image);
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
