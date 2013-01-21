goog.provide('annotorious.modules.openlayers.OpenLayersModule');

goog.require('goog.structs.Map');

/**
 * The OpenLayers Module provides annotation functionality for embedded
 * Web maps built with the OpenLayers Web mapping framework.
 * @constructor
 */
annotorious.modules.openlayers.OpenLayersModule = function() {
  /** @private **/
  this._annotators = new goog.structs.Map();
  
  /** @private **/
  this._eventHandlers = [];

  /** @private **/
  this._plugins = [];
  
  /** @private **/
  this._maps = [];
}
  
annotorious.modules.openlayers.OpenLayersModule.prototype.init = function() {

}

annotorious.modules.openlayers.OpenLayersModule.prototype.addAnnotation = function(annotation) {
    
}

annotorious.modules.openlayers.OpenLayersModule.prototype.addHandler = function(type, handler) {
    
}

annotorious.modules.openlayers.OpenLayersModule.prototype.addPlugin = function(plugin) {
    
}

annotorious.modules.openlayers.OpenLayersModule.prototype.annotatesItem = function(item) {
    
}

annotorious.modules.openlayers.OpenLayersModule.prototype.getAnnotations = function(opt_item_url) {
    
}

annotorious.modules.openlayers.OpenLayersModule.prototype.makeAnnotatable = function(item) {
  var annotator = new annotorious.modules.openlayers.OpenLayersAnnotator(item);
  
  // Attach registered handlers
  goog.array.forEach(this._eventHandlers, function(eventHandler) {
    annotator.addHandler(eventHandler.type, eventHandler.handler);
  });

  // Callback to registered plugins
  goog.array.forEach(this._plugins, function(plugin) {
    if (plugin.onInitPopup)
      plugin.onInitPopup(annotator.getPopup());

    if (plugin.onInitEditor)  
      plugin.onInitEditor(annotator.getEditor());
  });
    
  // TODO how do we identify a map in a unique way?
  this._annotators.set(map.id, annotator);
  this._maps.push(map);  
}

annotorious.modules.openlayers.OpenLayersModule.prototype.removeAnnotation = function(annotation) {

}

annotorious.modules.openlayers.OpenLayersModule.prototype.highlightAnnotation = function(annotation) {

}

/**
 * Enables (or disables) the ability to create new annotations on an annotatable image.
 * @param {boolean} enabled if <code>true</code> new annotations can be created
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.setSelectionEnabled = function(enabled) {

}

annotorious.modules.openlayers.OpenLayersModule.prototype.supports = function(item) {
  return (item instanceof OpenLayers.Map);
}
