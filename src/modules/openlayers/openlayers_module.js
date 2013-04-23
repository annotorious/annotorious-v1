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
 * @private
 */
annotorious.modules.openlayers.OpenLayersModule.prototype._initPlugin = function(plugin, annotator) {
  if (plugin.onInitAnnotator)
    plugin.onInitAnnotator(annotator);
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
  // Basically identical to image module counterpart, sans the lazy loading
  // TODO factor out into a common base class (with lazy loading support) and inherit! 
  if (this.annotatesItem(annotation.src)) {
    var annotator = this._annotators.get(annotation.src);
    if (annotator)
      annotator.addAnnotation(annotation, opt_replace)
  }    
}

/**
 * Standard module method: addHandler
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.addHandler = function(type, handler) {
  // Basically identical to image module counterpart, sans the lazy loading
  // TODO factor out into a common base class (with lazy loading support) and inherit! 
  goog.array.forEach(this._annotators.getValues(), function(annotator, idx, array) {
    annotator.addHandler(type, handler);
  });
}

/**
 * Standard module method: addPlugin
 */
annotorious.modules.openlayers.OpenLayersModule.prototype.addPlugin = function(plugin) {
  this._plugins.push(plugin);
 
  var self = this;
  goog.array.forEach(this._annotators.getValues(), function(annotator) {
    self._initPlugin(plugin, annotator);
  });    
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
  var self = this;
  
  // Attach registered handlers
  goog.array.forEach(this._eventHandlers, function(eventHandler) {
    annotator.addHandler(eventHandler.type, eventHandler.handler);
  });

  // Callback to registered plugins
  goog.array.forEach(this._plugins, function(plugin) {
    self._initPlugin(plugin, annotator);
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
