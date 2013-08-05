goog.provide('annotorious.modules.Module');

goog.require('goog.dom');
goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.structs.Map');

goog.require('annotorious.annotation.Annotation');

/**
 * A base class for Annotorious Module implementations.
 * @constructor
 */
annotorious.modules.Module = function() { }

/**
 * Initializes the module instance's fields. Note that subclasses to Module
 * MUST ensure by themselves that this method is called on initialization (i.e.
 * in their constructor)!
 * opt_preload_fn is an optional parameter: if provided, it must be a function
 * that returns a list of annotatable items. These will be put into the lazy
 * load queue and made annotatable when they appear on screen.
 * @param {Function=} opt_preload_fn a function providing a list of pre-loadable items
 * @protected
 */
annotorious.modules.Module.prototype._initFields = function(opt_preload_fn) {
  /** @private **/
  this._annotators = new goog.structs.Map();
  
  /** @private **/
  this._eventHandlers = [];

  /** @private **/
  this._plugins = []; 

  /** @private **/
  this._itemsToLoad = [];
  
  /** @private **/
  this._bufferedForAdding = [];
  
  /** @private **/
  this._bufferedForRemoval = [];

  /** @private **/
  this._cachedGlobalSettings = { hide_selection_widget: false, hide_annotations: false };

  /** @private **/
  this._cachedItemSettings = new goog.structs.Map();

  /** @private **/
  this._preLoad = opt_preload_fn;
}

/**
 * Returns the settings for the specified annotator. If there are no cached settings
 * object yet, new settings will be created (initialized with defaults).
 * @param {string} item_url the URL of the item controlled by the annotator
 * @private
 * @suppress {missingProperties}
 */
annotorious.modules.Module.prototype._getSettings = function(item_url) {
  var settings = this._cachedItemSettings(item_url);
  if (!settings) {
    settings = { hide_selection_widget: false, hide_annotations: false };
    settings.set(item_url, settings);
  }
  return settings;
}

/**
 * @private
 */
annotorious.modules.Module.prototype._initAnnotator = function(item) {
  var self = this;
  var annotator = this.newAnnotator(item);
  var item_src = this.getItemURL(item);

  // Keep track of changes
  var addedAnnotations = [];
  var removedAnnotations = [];

  // Attach handlers that are already registered
  goog.array.forEach(this._eventHandlers, function(eventHandler) {
    annotator.addHandler(eventHandler.type, eventHandler.handler);
  });

  // Callback to registered plugins
  goog.array.forEach(this._plugins, function(plugin) {
    self._initPlugin(plugin, annotator);
  });
            
  // Cross-check with annotation add/remove buffers
  goog.array.forEach(this._bufferedForAdding, function(annotation) {
    if (annotation.src == item_src) {
      annotator.addAnnotation(annotation);
      addedAnnotations.push(annotation);
    }
  });
      
  goog.array.forEach(this._bufferedForRemoval, function(annotation) {
    if (annotation.src == item_src) {
      annotator.removeAnnotation(annotation);
      removedAnnotations.push(annotation);
    }
  });

  // Apply changes
  goog.array.forEach(addedAnnotations, function(annotation) {
    goog.array.remove(self._bufferedForAdding, annotation);
  });
  
  goog.array.forEach(removedAnnotations, function(annotation) {
    goog.array.remove(self._bufferedForRemoval, annotation);
  });

  // Apply cached settings
  var settings = this._cachedItemSettings.get(item_src);
  if (settings) {
    if (settings.hide_selection_widget)
      annotator.hideSelectionWidget();

    if (settings.hide_annotations)
      annotator.hideAnnotations();

    this._cachedItemSettings.remove(item_src);
  } else {
    if (this._cachedGlobalSettings.hide_selection_widget)
      annotator.hideSelectionWidget();

    if (this._cachedGlobalSettings.hide_annotations)
      annotator.hideAnnotations();
  }
  
  // Update _annotators and _itemsToLoad lists
  this._annotators.set(item_src, annotator);
  goog.array.remove(this._itemsToLoad, item);
}

/**
 * @private
 */
annotorious.modules.Module.prototype._initPlugin = function(plugin, annotator) {
  if (plugin.onInitAnnotator)
    plugin.onInitAnnotator(annotator);
}

/**
 * @private
 */
annotorious.modules.Module.prototype._lazyLoad = function() {     
  var self = this;
  goog.array.forEach(this._itemsToLoad, function(item) {
    if (annotorious.dom.isInViewport(item)) {
      self._initAnnotator(item);
    }
  });
}

/**
 * @private
 */
annotorious.modules.Module.prototype._setAnnotationVisibility = function(opt_item_url, visibility) {
  if (opt_item_url) {
    var annotator = this._annotators.get(opt_item_url);
    if (annotator) {
      // Item URL is provided, and item is loaded - set directly
      if (visibility)
        annotator.showAnnotations();
      else 
        annotator.hideAnnotations();
    } else {
      // Item URL is provided, but item not yet loaded - cache for later
      this._getSettings(opt_item_url).hide_annotations = visibility;
    }
  } else {
    // Item URL is not provided - update all annotators...
    goog.array.forEach(this._annotators.getValues(), function(annotator) {
      if (visibility)
        annotator.showAnnotations();
      else
        annotator.hideAnnotations();
    });

    // ...cache global settings...
    this._cachedGlobalSettings.hide_annotations = visibility;

    // ...and update all cached item settings
    goog.array.forEach(this._cachedItemSettings.getValues(), function(settings) {
      settings.hide_annotations = visibility;
    });
  }
}

/**
 * @private
 */
annotorious.modules.Module.prototype._setSelectionWidgetVisibility = function(opt_item_url, visibility) {
  if (opt_item_url) {
    var annotator = this._annotators.get(opt_item_url);
    if (annotator) {
      // Item URL is provided, and item is loaded - set directly
      if (visibility)
        annotator.showSelectionWidget();
      else 
        annotator.hideSelectionWidget();
    } else {
      // Item URL is provided, but item not yet loaded - cache for later
      this._getSettings(opt_item_url).hide_selection_widget = visibility;
    }
  } else {
    // Item URL is not provided - update all annotators...
    goog.array.forEach(this._annotators.getValues(), function(annotator) {
      if (visibility)
        annotator.showSelectionWidget();
      else 
        annotator.hideSelectionWidget();
    });

    // ...cache global settings...
    this._cachedGlobalSettings.hide_selection_widget = visibility;

    // ...and update all cached item settings
    goog.array.forEach(this._cachedItemSettings.getValues(), function(settings) {
      settings.hide_selection_widget = visibility;
    });
  }
}

/**
 * 'Manually' actives the selector, bypassing the selection widget. The function can take
 * a callback function as parameter, which will be called when the selector is deactivated 
 * again.
 * @param {string | Function} opt_item_url_or_callback the URL of the item, or a callback function
 * @param {Function} opt_callback a callback function (if the first parameter was a URL)
 */
annotorious.modules.Module.prototype.activateSelector = function(opt_item_url_or_callback, opt_callback) {
  var item_url = undefined,
      callback = undefined;

  if (goog.isString(opt_item_url_or_callback)) {
    item_url = opt_item_url_or_callback;
    callback = opt_callback;
  } else if (goog.isFunction(opt_item_url_or_callback)) {
    callback = opt_item_url_or_callback;
  }

  if (item_url) {
    var annotator = this._annotators.get(item_url);
    if (annotator)
      annotator.activateSelector(callback);
  } else {
    goog.array.forEach(this._annotators.getValues(), function(annotator) {
      annotator.activateSelector(callback);
    });
  }
}

/**
 * Adds an annotation to an item managed by this module.
 * @param {annotorious.annotation.Annotation} annotation the annotation
 * @param {annotorious.annotation.Annotation} opt_replace optionally, an existing annotation to replace
 */
annotorious.modules.Module.prototype.addAnnotation = function(annotation, opt_replace) {
  if (this.annotatesItem(annotation.src)) {
    var annotator = this._annotators.get(annotation.src);
    if (annotator) {
      annotator.addAnnotation(annotation, opt_replace)
    } else {
      this._bufferedForAdding.push(annotation);
      if (opt_replace)
        goog.array.remove(this._bufferedForAdding, opt_replace);
    }
  }
}

/**
 * Adds a lifecycle event handler to this module.
 * @param {annotorious.events.EventType} type the event type
 * @param {Function} handler the handler function
 */
annotorious.modules.Module.prototype.addHandler = function(type, handler) {
  goog.array.forEach(this._annotators.getValues(), function(annotator, idx, array) {
    annotator.addHandler(type, handler);
  }); 
  this._eventHandlers.push({ type: type, handler: handler });
}

/**
 * Adds a plugin to this module.
 * @param {Plugin} plugin the plugin
 */
annotorious.modules.Module.prototype.addPlugin = function(plugin) {
  this._plugins.push(plugin);
  var self = this;
  goog.array.forEach(this._annotators.getValues(), function(annotator) {
    self._initPlugin(plugin, annotator);
  });
}

/**
 * Adds a selector to an item managed by this module.
 *
 * !! TEMPORARY !! 
 *
 * TODO selectors should be added to annotators directly, from within a plugin
 * which will make this method unecessary
 */
annotorious.modules.Module.prototype.addSelector = function(item_url, selector) {
  if (this.annotatesItem(item_url)) {
    var annotator = this._annotators.get(item_url);
    if (annotator)
      annotator.addSelector(selector);
  }
}

/**
 * Tests if this module is in charge of managing the item with the specified URL.
 * @param {string} item_url the URL of the item
 * @return {boolean} true if this module is in charge of the media
 */ 
annotorious.modules.Module.prototype.annotatesItem = function(item_url) {
  if (this._annotators.containsKey(item_url)) {
    return true;
  } else {
    var self = this;
    var item = goog.array.find(this._itemsToLoad, function(item) {
      return self.getItemURL(item) == item_url;
    });
    
    return goog.isDefAndNotNull(item);
  }
}

/**
 * Returns the name of the selector that is currently activated on the item
 * with the specified URL (if managed by this module).
 * @param {string} item_url the URL of the item to query for the active selector
 * @return {string | undefined} the name of the active selector (or undefined)
 */
annotorious.modules.Module.prototype.getActiveSelector = function(item_url) {
  if (this.annotatesItem(item_url)) {
    var annotator = this._annotators.get(item_url);
    if (annotator)
      return annotator.getActiveSelector().getName();
  }
  return undefined;
}

/**
 * Returns all annotations on the item with the specified URL (if managed by this
 * module) or all annotations from this module in case no URL is specified.
 * @param {string | undefined} opt_item_url an item URL (optional)
 * @return {Array.<annotorious.annotation.Annotation>} the annotations
 */
annotorious.modules.Module.prototype.getAnnotations = function(opt_item_url) {
  if (opt_item_url) {
    var annotator = this._annotators.get(opt_item_url);
    if (annotator) {
      return annotator.getAnnotations();
    } else {
      return goog.array.filter(this._bufferedForAdding, function(annotation) {
        return annotation.src == opt_item_url;
      });
    }
  } else {
    var annotations = [];
    goog.array.forEach(this._annotators.getValues(), function(annotator) {
      goog.array.extend(annotations, annotator.getAnnotations());
    });
    goog.array.extend(annotations, this._bufferedForAdding);
    return annotations;
  }
}

/**
 * Returns the list of available shape selectors for a particular item.
 * @param {string} item_url the URL of the item to query for available selectors
 * @returns {Array.<string> | undefined} the list of selector names
 */
annotorious.modules.Module.prototype.getAvailableSelectors = function(item_url) {
  if (this.annotatesItem(item_url)) {
    var annotator = this._annotators.get(item_url);
    if (annotator) {
      return goog.array.map(annotator.getAvailableSelectors(), function(selector) {
        return selector.getName();
      });
    }
  }
  return undefined;
}

/**
 * Hides existing annotations on all, or a specific item.
 * @param {string} opt_item_url the URL of the item
 */
annotorious.modules.Module.prototype.hideAnnotations = function(opt_item_url) {
  this._setAnnotationVisibility(opt_item_url, false);
}

/**
 * Hides the selection widget, thus preventing users from creating new annotations.
 * The selection widget can be hidden on a specific item or all.
 * @param {string} opt_item_url the URL of the item on which to hide the selection widget
 */
annotorious.modules.Module.prototype.hideSelectionWidget = function(opt_item_url) {
  this._setSelectionWidgetVisibility(opt_item_url, false);
}

/**
 * Highlights the specified annotation.
 * @param {annotorious.annotation.Annotation} annotation the annotation
 */
annotorious.modules.Module.prototype.highlightAnnotation = function(annotation) {
  if (annotation) {
    if (this.annotatesItem(annotation.src)) {
      var annotator = this._annotators.get(annotation.src);
      if (annotator)
        annotator.highlightAnnotation(annotation);
    }  
  } else {
    goog.array.forEach(this._annotators.getValues(), function(annotator) {
      annotator.highlightAnnotation();
    });
  }
}

/**
 * Lifecycle method: called by Annotorious on module initialization.
 */
annotorious.modules.Module.prototype.init = function() {
  if (this._preLoad)
    goog.array.extend(this._itemsToLoad, this._preLoad()); 

  this._lazyLoad();
  
  var self = this;
  var key = goog.events.listen(window, goog.events.EventType.SCROLL, function() {
    if (self._itemsToLoad.length > 0)
      self._lazyLoad();
    else
      goog.events.unlistenByKey(key);
  });
}

/**
 * Makes an item annotatable, if it is supported by this module.
 * @param {Object} item the annotatable item
 */
annotorious.modules.Module.prototype.makeAnnotatable = function(item) {
  if (this.supports(item))
    this._initAnnotator(item);
}

/**
 * Removes an annotation from the item with the specified URL.
 * @param {annotorious.annotation.Annotation} annotation the annotation
 */
annotorious.modules.Module.prototype.removeAnnotation = function(annotation) {
  if (this.annotatesItem(annotation.src)) {
    var annotator = this._annotators.get(annotation.src);
    if (annotator)
      annotator.removeAnnotation(annotation);
    else
      this._bufferedForRemoval.push(annotation);
  }
}

/**
 * Resets annotation functionality on this page. After the reset, annotation
 * functionality will be reomved from all items. Images with the 'annotatable'
 * CSS class will have been re-initialized (i.e. they will be annotatable, with
 * a fresh annotator).
 */
annotorious.modules.Module.prototype.reset = function() {
  goog.array.forEach(this._annotators.getValues(), function(annotator) {
    annotator.destroy();
  }); 
  this._annotators.clear();

  // TODO re-init
}

/**
 * Sets a specific selector on a particular item.
 * @param {string} item_url the URL of the item on which to set the selector
 * @param {string} selector the name of the selector to set on the item
 */
annotorious.modules.Module.prototype.setActiveSelector = function(item_url, selector) {
  if (this.annotatesItem(item_url)) {
    var annotator = this._annotators.get(item_url);
    if (annotator)
      annotator.setActiveSelector(selector);
  }
}

/**
 * Shows existing annotations on all, or a specific item.
 * @param {string} opt_item_url the URL of the item
 */
annotorious.modules.Module.prototype.showAnnotations = function(opt_item_url) {
  this._setAnnotationVisibility(opt_item_url, true);
}

/**
 * Shows the selection widget, thus enabling users to create new annotations.
 * The selection widget can be made visible on a specific item or all.
 * @param {string} opt_item_url the URL of the item on which to show the selection widget 
 */
annotorious.modules.Module.prototype.showSelectionWidget = function(opt_item_url) {
  this._setSelectionWidgetVisibility(opt_item_url, true);
}

/** Methods that must be implemented by subclasses of annotorious.modules.Module **/

/**
 * Returns the identifying URL of the specified item.
 * @param {Element} item the item.
 * @return {string} the URL
 */
annotorious.modules.Module.prototype.getItemURL = goog.abstractMethod;

/**
 * Returns a new annotator for the specified item.
 * @param {Element} item the item
 * @return {Object} an annotator for this item
 */
annotorious.modules.Module.prototype.newAnnotator = goog.abstractMethod;

/**
 * Tests if this module supports the specified item's media type.
 * @param {Object} item the item
 * @return {boolean} true if this module supports the item
 */
annotorious.modules.Module.prototype.supports = goog.abstractMethod;
