goog.provide('annotorious.modules.image.ImageModule');

/**
 * The Image Module implements annotation functionality for <IMG>
 * elements. On page load, it also scans the page for images marked
 * with an 'annotatable' CSS class, and makes those annotatable automatically.
 * @constructor
 */
annotorious.modules.image.ImageModule = function() { 
  annotorious.modules.Module.call();
  this._initFields(function() {
    return goog.dom.query('img.annotatable', document);
  });
}
goog.inherits(annotorious.modules.image.ImageModule, annotorious.modules.Module);
  
/** @inheritDoc **/
annotorious.modules.image.ImageModule.prototype.getItemURL = function(item) {
  return annotorious.modules.image.ImageAnnotator.getItemURL(item);
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
