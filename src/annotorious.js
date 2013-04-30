goog.provide('annotorious');

goog.require('goog.array');
goog.require('annotorious.dom');

/**
 * The main entrypoint to the application. The Annotorious class is instantiated exactly once,
 * and added to the global window object as 'window.anno'. It exposes the external JavaScript API
 * and internally manages the 'modules'. (Each module is responsible for one particular media
 * type - image, OpenLayers, etc.)  
 * @constructor
 */
annotorious.Annotorious = function() {
  /** @private **/
  this._modules = [ new annotorious.modules.image.ImageModule() ];
  
  if (annotorious.modules.openlayers)
    this._modules.push(new annotorious.modules.openlayers.OpenLayersModule());
  
  /** @private **/
  this._plugins = [];

  var self = this;
  annotorious.dom.addOnLoadHandler(function() { 
    goog.array.forEach(self._modules, function(module) {
      module.init();
    });

    goog.array.forEach(self._plugins, function(plugin) {
      if (plugin.initPlugin)
        plugin.initPlugin(self);
        
      goog.array.forEach(self._modules, function(module) {
        module.addPlugin(plugin);
      });
    });
  });
}

/**
 * Returns the module that is in charge of handling the item with the specified
 * URL or null, if no responsible module is found.
 * @param {string} item_src the URL of the annotatable item 
 * @return {object | null}
 * @private
 */
annotorious.Annotorious.prototype._getModuleForItemSrc = function(item_src) {
  return goog.array.find(this._modules, function(module) {
    return module.annotatesItem(item_src);
  });
}

/**
 * Adds an annotation to an item on the page.
 * @param {Annotation} annotation the annotation
 * @param {Annotation} opt_replace optionally, an existing annotation to replace
 */
annotorious.Annotorious.prototype.addAnnotation = function(annotation, opt_replace) {
  var module = this._getModuleForItemSrc(annotation.src);
  
  if (module)
    module.addAnnotation(annotation, opt_replace);
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
 * Adds a plugin to Annotorious.
 * @param {string} plugin_name the plugin name
 * @param {object} opt_config_options an optional object literal with plugin config options
 */
annotorious.Annotorious.prototype.addPlugin = function(plugin_name, opt_config_options) {
  try {
    this._plugins.push(new window['annotorious']['plugin'][plugin_name](opt_config_options));  
  } catch (error) {
    console.log('Could not load plugin: ' + plugin_name);
  }
}

/**
 * Disables selection functionality globally or on a specific item. If selection is disabled,
 * this implies that creation of annotations is disabled!
 * @param {string} opt_item_url the URL of a specific item on which to disable selection
 */
annotorious.Annotorious.prototype.disableSelection = function(opt_item_url) {
  if (opt_item_url) {
    var module = this._getModuleForItemSrc(opt_item_url);
    if (module)
      module.disableSelection(opt_item_url);
  } else {
    goog.array.forEach(this._modules, function(module) {
      module.disableSelection();
    });
  }
}

/**
 * Enables selection functionality globally or on a specific item. If selection is enabled,
 * this implies that creation of annotations is enabled! The (optional) argument can either 
 * be the URL of the item on which to enable selection, or an object literal with advanced
 * configuration options. This literal has the following form:
 * 
 * {
 *   ** URL of the item to enable selection for **
 *   item_url: 
 *
 *   ** Flag indicating if selection should automatically disable after onAnnotationCreate **
 *   auto_disable: {string}, 
 *
 *   ** a callback function to execute after auto-disabling **
 *   callback: {function} 
 * }
 *
 * @param {string | object} opt_url_or_param_literal the item URL or parameter literal 
 */
annotorious.Annotorious.prototype.enableSelection = function(opt_url_or_param_literal) {
  var item_url;
  if (goog.isString(opt_url_or_param_literal))
    item_url  = opt_url_or_param_literal;
  else if (goog.isObject(opt_url_or_param_literal))
    item_url = opt_url_or_param_literal.item_url;

  if (item_url) {
    var module = this._getModuleForItemSrc(item_url);
    if (module)
      module.enableSelection(opt_url_or_param_literal);
  } else {
    goog.array.forEach(this._modules, function(module) {
      module.enableSelection(opt_url_or_param_literal);
    });
  }
}

/**
 * Returns the name of the selector that is currently activated on a 
 * particular item.
 * @param {string} item_url the URL of the item to query for the active selector
 */
annotorious.Annotorious.prototype.getActiveSelector = function(item_url) {
  var module = this._getModuleForItemSrc(item_url);
  if (module)
    return module.getActiveSelector(item_url);  
}

/**
 * Returns all annotations on the annotatable item with the specified URL, or
 * all annotations on the page in case no URL is specified.
 * @param {string | undefined} opt_item_ url an item URL (optional)
 * @return {Array.<Annotation>} the annotations
 */
annotorious.Annotorious.prototype.getAnnotations = function(opt_item_url) {
  if (opt_item_url) {
    var module = this._getModuleForItemSrc(opt_item_url);
    if (module)
      return module.getAnnotations(opt_item_url);
    else
      return [];
  } else {
    var annotations = [];
    goog.array.forEach(this._modules, function(module) {
      goog.array.extend(annotations, module.getAnnotations());
    });
    return annotations;
  }
}

/**
 * Returns the list of available shape selectors for a particular item.
 * @param {string} item_url the URL of the item to query for available selectors
 * @returns {List.<string>} the list of selector names
 */
annotorious.Annotorious.prototype.getAvailableSelectors = function(item_url) {
  var module = this._getModuleForItemSrc(item_url);
  if (module)
    return module.getAvailableSelectors(item_url);  
}

/**
 * Highlights the specified annotation.
 * @param {Annotation} annotation the annotation
 */
annotorious.Annotorious.prototype.highlightAnnotation = function(annotation) {
  if (annotation) {
    var module = this._getModuleForItemSrc(annotation.src);

    if (module)
      module.highlightAnnotation(annotation);
  } else {
    goog.array.forEach(this._modules, function(module) {
      module.highlightAnnotation();
    });
  }
}

/**
 * Makes an item annotatable, if there is a module that supports the item type.
 * @param {object} item the annotatable item
 */
annotorious.Annotorious.prototype.makeAnnotatable = function(item) {
  var module = goog.array.find(this._modules, function(module) {
    return module.supports(item);
  });

  if (module)
    module.makeAnnotatable(item);
  else
    throw('Error: Annotorious does not support this media type in the current version or build configuration.');
}

/**
 * Removes all annotations. If the optional parameter opt_item_url is set,
 * only the annotations on the specified item will be removed. Otherwise all
 * annotations on all items on the page will be removed.
 * @param {string} opt_item_url the src URL of the item
 */
annotorious.Annotorious.prototype.removeAll = function(opt_item_url) {
  // TODO this could be optimized a lot by adding a .removeAll method
  // to modules and annotators!
  var self = this;
  goog.array.forEach(this.getAnnotations(opt_item_url), function(annotation) {
    self.removeAnnotation(annotation);    
  });
}

/**
 * Removes an annotation from an item on the page.
 * @param {Annotation} annotation the annotation to remove
 */
annotorious.Annotorious.prototype.removeAnnotation = function(annotation) {
  var module = this._getModuleForItemSrc(annotation.src);
  if (module)
    module.removeAnnotation(annotation);
}

/**
 * Adds a selector to a particular item.
 *
 * !! TEMPORARY !! 
 *
 * TODO selectors should be added to annotators directly, from within a plugin
 * which will make this method unecessary
 */
annotorious.Annotorious.prototype.addSelector = function(item_url, selector) {
  var module = this._getModuleForItemSrc(item_url);

  if (module)
    module.addSelector(item_url, selector);  
}

/**
 * Sets a specific selector on a particular item.
 * @param {string} item_url the URL of the item on which to set the selector
 * @param {string} selector the name of the selector to set on the item
 */
annotorious.Annotorious.prototype.setActiveSelector = function(item_url, selector) {
  var module = this._getModuleForItemSrc(item_url);
  if (module)
    module.setActiveSelector(item_url, selector);  
}

/**
 * Enables (or disables) the ability to create new annotations on an annotatable item.
 * @param {boolean} enabled if true, new annotations can be created
 */
annotorious.Annotorious.prototype.setSelectionEnabled = function(enabled) {
  goog.array.forEach(this._modules, function(module) {
    module.setSelectionEnabled(enabled);
  });
}

/** API exports **/
window['anno'] = new annotorious.Annotorious();
annotorious.Annotorious.prototype['addAnnotation'] = annotorious.Annotorious.prototype.addAnnotation;
annotorious.Annotorious.prototype['addHandler'] = annotorious.Annotorious.prototype.addHandler;
annotorious.Annotorious.prototype['addPlugin'] = annotorious.Annotorious.prototype.addPlugin;
annotorious.Annotorious.prototype['addSelector'] = annotorious.Annotorious.prototype.addSelector;
annotorious.Annotorious.prototype['disableSelection'] = annotorious.Annotorious.prototype.disableSelection;
annotorious.Annotorious.prototype['enableSelection'] = annotorious.Annotorious.prototype.enableSelection;
annotorious.Annotorious.prototype['getActiveSelector'] = annotorious.Annotorious.prototype.getActiveSelector;
annotorious.Annotorious.prototype['getAnnotations'] = annotorious.Annotorious.prototype.getAnnotations;
annotorious.Annotorious.prototype['getAvailableSelectors'] = annotorious.Annotorious.prototype.getAvailableSelectors;
annotorious.Annotorious.prototype['highlightAnnotation'] = annotorious.Annotorious.prototype.highlightAnnotation;
annotorious.Annotorious.prototype['makeAnnotatable'] = annotorious.Annotorious.prototype.makeAnnotatable;
annotorious.Annotorious.prototype['removeAll'] = annotorious.Annotorious.prototype.removeAll;
annotorious.Annotorious.prototype['removeAnnotation'] = annotorious.Annotorious.prototype.removeAnnotation;
annotorious.Annotorious.prototype['setActiveSelector'] = annotorious.Annotorious.prototype.setActiveSelector;
annotorious.Annotorious.prototype['setSelectionEnabled'] = annotorious.Annotorious.prototype.setSelectionEnabled;
