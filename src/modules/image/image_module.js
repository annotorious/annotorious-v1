goog.provide('annotorious.modules.image.ImageModule');

goog.require('goog.dom');
goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.structs.Map');

/**
 * The Image Module scans the page for images marked with an 'annotatable'
 * CSS class, and attaches an ImageAnnotator to each one.
 * @constructor
 */
annotorious.modules.image.ImageModule = function() { 
  annotorious.modules.Module.call();  
}
goog.inherits(annotorious.modules.image.ImageModule, annotorious.modules.Module);
  
/** @inheritDoc **/
annotorious.modules.image.ImageModule.prototype.getItemURL = function(item) {
  return annotorious.modules.image.ImageAnnotator.getItemURL(item);
}

/** @inheritDoc **/
annotorious.modules.image.ImageModule.prototype.init = function() {
  var annotatableImages = goog.dom.query('img.annotatable', document);
  this._init(annotatableImages);
}

/** @inheritDoc **/
annotorious.modules.image.ImageModule.prototype.newAnnotator = function(item) {
  return new annotorious.modules.image.ImageAnnotator(item);
}

/** @inheritDoc **/
annotorious.modules.image.ImageModule.prototype.supports = function(item) {
  if (goog.dom.isElement(item))
    return (item.tagName == 'IMG');
  else
    return false;
}
