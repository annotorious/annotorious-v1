goog.provide('annotorious.modules.image.ImageModule');

goog.require('goog.dom');
goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.structs.Map');

/**
 * The Image Module scans the page for images marked with the
 * 'annotatable' CSS class, and attaches an ImageAnnotator to
 * each one.
 * @constructor
 */
annotorious.modules.image.ImageModule = function() { 
  annotorious.modules.Module.call();  
}
goog.inherits(annotorious.modules.image.ImageModule, annotorious.modules.Module);
  
/**
 * Standard module init() function.
 * @inheritDoc
 */
annotorious.modules.image.ImageModule.prototype.init = function() {
  // Query images marked with 'annotatable' CSS class
  var annotatableImages = goog.dom.query('img.annotatable', document);
  this._init(annotatableImages);
}

/**
 * Annotations should be bound to the URL defined in the 'data-original' attribute of
 * the image. Only if this attribute does not exist, they should be bound to the original
 * image SRC. This utility function returns the correct URL to bind to.
 * @inheritDoc
 */
annotorious.modules.image.ImageModule.prototype.getItemURL = function(item) {
  var src = item.getAttribute('data-original');
  if (src)
    return src;
  else
    return item.src;
}


/**
 * Standard module method: tests if this module is able to support annotation on the
 * specified item.
 * @param {object} item the item to test
 * @return {boolean} true if this module can provide annotation functionality for the item
 * @inheritDoc
 */
annotorious.modules.image.ImageModule.prototype.supports = function(item) {
  if (goog.dom.isElement(item))
    return (item.tagName == 'IMG');
  else
    return false;
}

annotorious.modules.image.ImageModule.prototype.newAnnotator = function(item) {
  return new annotorious.modules.image.ImageAnnotator(this, item);
}

