goog.provide('annotorious.mediatypes.openseadragon.OpenSeadragonModule');

goog.require('annotorious.mediatypes.Module');
goog.require('annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator');

/**
 * The OpenSeadragon Module provides annotation functionality for embedded
 * zoomable images displayed with the OpenSeadragon viewer.
 * @constructor
 * @extends annotorious.mediatypes.Module
 */
annotorious.mediatypes.openseadragon.OpenSeadragonModule = function() { 
  annotorious.mediatypes.Module.call();
  this._initFields();
}
goog.inherits(annotorious.mediatypes.openseadragon.OpenSeadragonModule, annotorious.mediatypes.Module);

/** @inheritDoc **/
annotorious.mediatypes.openseadragon.OpenSeadragonModule.prototype.getItemURL = function(item) {
  // TODO implement something decent!
  return 'dzi://openseadragon/something';
}

/** @inheritDoc **/
annotorious.mediatypes.openseadragon.OpenSeadragonModule.prototype.newAnnotator = function(item) {
  return new annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator(item);
}

/** @inheritDoc **/
annotorious.mediatypes.openseadragon.OpenSeadragonModule.prototype.supports = function(item) {
  // A hack to identify whether we're dealing with an OpenSeadragon viewer - any better ideas?
  if (!item.id)
    return false;
    
  if (item.id.indexOf('openseadragon') != 0)
    return false;
    
  if(!item.hasOwnProperty('drawer'))
    return false;
    
  return true;
} 



