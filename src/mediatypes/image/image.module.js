goog.provide('annotorious.mediatypes.image.ImageModule');

goog.require('annotorious.mediatypes.Module');
goog.require('annotorious.mediatypes.image.ImageAnnotator');

/**
 * The Image Module implements annotation functionality for <IMG>
 * elements. On page load, it also scans the page for images marked
 * with an 'annotatable' CSS class, and makes those annotatable automatically.
 * @constructor
 * @extends annotorious.mediatypes.Module
 */
annotorious.mediatypes.image.ImageModule = function() { 
  annotorious.mediatypes.Module.call();
  this._initFields(function() {
    return goog.dom.query('img.annotatable', document);
  });
}
goog.inherits(annotorious.mediatypes.image.ImageModule, annotorious.mediatypes.Module);
  
/** @inheritDoc **/
annotorious.mediatypes.image.ImageModule.prototype.getItemURL = function(item) {
  return annotorious.mediatypes.image.ImageAnnotator.getItemURL(item);
}

/** @inheritDoc **/
annotorious.mediatypes.image.ImageModule.prototype.newAnnotator = function(item) {
  return new annotorious.mediatypes.image.ImageAnnotator(item);
}

/** @inheritDoc **/
annotorious.mediatypes.image.ImageModule.prototype.supports = function(item) {
  if (goog.dom.isElement(item))
    return (item.tagName == 'IMG');
  else
    return false;
}
