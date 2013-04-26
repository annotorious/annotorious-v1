goog.provide('annotorious.modules.openlayers.OpenLayersModule');

/**
 * The OpenLayers Module provides annotation functionality for embedded
 * Web maps built with the OpenLayers Web mapping framework.
 * @constructor
 */
annotorious.modules.openlayers.OpenLayersModule = function() { 
  annotorious.modules.Module.call();  
}
goog.inherits(annotorious.modules.openlayers.OpenLayersModule, annotorious.modules.Module);

/** @inheritDoc **/
annotorious.modules.openlayers.OpenLayersModule.prototype.getItemURL = function(item) {
  // TODO implement something decent!
  return 'map://openlayers/something';
}

/** @inheritDoc **/
annotorious.modules.openlayers.OpenLayersModule.prototype.init = function() {
  this._init();
}

/** @inheritDoc **/
annotorious.modules.openlayers.OpenLayersModule.prototype.newAnnotator = function(item) {
  return new annotorious.modules.openlayers.OpenLayersAnnotator(item);
}

/** @inheritDoc **/
annotorious.modules.openlayers.OpenLayersModule.prototype.supports = function(item) {
  return (item instanceof OpenLayers.Map);
} 



