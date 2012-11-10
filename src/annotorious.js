goog.provide('annotorious');

goog.require('goog.array');
goog.require('annotorious.dom');

/**
 * The main entrypoint to the application. The Annotorious object exposes the 
 * external JavaScript API (through the global 'anno' object) and manages
 * a set of 'modules' (each module being responsible for one particular media
 * type - image, deepzoom, etc.)  
 * @constructor
 */
annotorious.Annotorious = function() {
  /** @private **/
  this._modules = [ new annotorious.modules.image.ImageModule() ];
  
  /** @private **/
  this._plugins = [];

  var self = this;
  annotorious.dom.addOnLoadHandler(function() { 
    goog.array.forEach(self._modules, function(module) {
      module.init();
    });

    goog.array.forEach(self._plugins, function(plugin) {
      plugin['initPlugin'](self);
    });
  });
}

/**
 * Adds an event handler to Annotorious.
 * @param {annotorious.event.EventType} type the event type
 * @param {function} handler the handler function
 */
annotorious.Annotorious.prototype.addHandler = function(type, handler) {
  goog.array.forEach(this._modules, function(module) {
    module.addHandler(type, handler);
  });
}

/**
 * Adds an annotation to an item on the page.
 * @param {Annotation} annotation the annotation
 */
annotorious.Annotorious.prototype.addAnnotation = function(annotation) {
  // TODO make this more efficient
  goog.array.forEach(this._modules, function(module) {
    module.addAnnotation(annotation);
  });
}

/**
 * Removes an annotation from an item on the page.
 */
annotorious.Annotorious.prototype.removeAnnotation = function(annotation) {
  // TODO make this more efficient
  goog.array.forEach(this._modules, function(module) {
    module.removeAnnotation(annotation);
  });
}

/**
 * Adds a plugin to Annotorious.
 * @param {string} pluginName the plugin name
 * @param {object} opt_config_options an optional associative array with plugin config options
 */
annotorious.Annotorious.prototype['addPlugin'] = function(pluginName, opt_config_options) {
  this._plugins.push(new window['annotorious']['plugin'][pluginName](opt_config_options));
}

window['anno'] = new annotorious.Annotorious();
annotorious.Annotorious.prototype['addAnnotation'] = annotorious.Annotorious.prototype.addAnnotation;
annotorious.Annotorious.prototype['removeAnnotation'] = annotorious.Annotorious.prototype.removeAnnotation;

window['annotorious'] = {};
window['annotorious']['plugin'] = {};

