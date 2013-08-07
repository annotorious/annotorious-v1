goog.provide('annotorious.mediatypes.openlayers.OpenLayersModule');

goog.require('annotorious.mediatypes.Module');
goog.require('annotorious.mediatypes.openlayers.OpenLayersAnnotator');

/**
 * The OpenLayers Module provides annotation functionality for embedded
 * Web maps built with the OpenLayers Web mapping framework.
 * @constructor
 * @extends annotorious.mediatypes.Module
 */
annotorious.mediatypes.openlayers.OpenLayersModule = function() { 
  annotorious.mediatypes.Module.call();
  this._initFields();
}
goog.inherits(annotorious.mediatypes.openlayers.OpenLayersModule, annotorious.mediatypes.Module);

/** @inheritDoc **/
annotorious.mediatypes.openlayers.OpenLayersModule.prototype.getItemURL = function(item) {
  // TODO implement something decent!
  return 'map://openlayers/something';
}

/** @inheritDoc **/
annotorious.mediatypes.openlayers.OpenLayersModule.prototype.newAnnotator = function(item) {
  return new annotorious.mediatypes.openlayers.OpenLayersAnnotator(item);
}

/** @inheritDoc **/
annotorious.mediatypes.openlayers.OpenLayersModule.prototype.supports = function(item) {
  return (item instanceof OpenLayers.Map);
} 



