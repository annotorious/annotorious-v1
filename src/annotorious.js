goog.provide('annotorious');

goog.require('goog.array');
goog.require('annotorious.dom');

/**
 * The Annotorious object is the main application entrypoint. It exposes the 
 * Annotorious JavaScript API through the global 'anno' object. Internally, it
 * manages a set of 'modules'. Each module is responsible for one particular
 * media type (image, deepzoom, ...).  
 * @constructor
 */
annotorious.Annotorious = function() {
  /** @private **/
  this._modules = [ new annotorious.modules.image.ImageModule() ];
  
  /** @private **/
  this._plugins = [];

  var self = this;
  annotorious.dom.addOnLoadHandler(function() { self._init(); });
}

/**
 * @private
 */
annotorious.Annotorious.prototype._init = function() {
  var self = this;

  goog.array.forEach(this._modules, function(module) {
    module.init();
  });

  goog.array.forEach(this._plugins, function(plugin) {
    plugin.initPlugin(self);
  });
}

annotorious.Annotorious.prototype.addHandler = function(type, handler) {
  goog.array.forEach(this._modules, function(module) {
    module.addHandler(type, handler);
  });
}

annotorious.Annotorious.prototype['addPlugin'] = function(pluginName, opt_config_options) {
  this._plugins.push(new annotorious.plugin[pluginName](opt_config_options));
}

annotorious.Annotorious.prototype['addAnnotation'] = function(src, annotation) {
  // TODO implement
}

annotorious.Annotorious.prototype['removeAnnotation'] = function(src, annotation) {
  // TODO implement
}

window['anno'] = new annotorious.Annotorious();
