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
  
/**
 * Standard module method: init
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.init = function() {

}

/**
 * Standard module method: addAnnotation
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.addAnnotation = function(annotation) {
    
}

/**
 * Standard module method: addHandler
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.addHandler = function(type, handler) {
    
}

/**
 * Standard module method: addPlugin
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.addPlugin = function(plugin) {
    
}

/**
 * Standard module method: annotatesItem
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.annotatesItem = function(item) {
    
}

/**
 * Standard module method: getActiveSelector
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.getActiveSelector = function(item_url) {

}

/**
 * Standard module method: getAnnotations
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.getAnnotations = function(opt_item_url) {
    
}

/**
 * Standard module method: getAvailableSelectors
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.getAvailableSelectors = function(item_url) {

}

/**
 * Standard module method: highlightAnnotation
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.highlightAnnotation = function(annotation) {

}

/**
 * Standard module method: makeAnnotatable
 */
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

/**
 * Standard module method: removeAnnotation
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.removeAnnotation = function(annotation) {

}

/**
 * Standard module method: setActiveSelector
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.setActiveSelector = function(item_url, selector) {

}

/**
 * Standard module method: setSelectionEnabled
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.setSelectionEnabled = function(enabled) {

}

/**
 * Standard module method: supports
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.supports = function(item) {
  return (item instanceof OpenLayers.Map);
}
