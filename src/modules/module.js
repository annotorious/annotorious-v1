goog.provide('annotorious.modules.Module');

/**
 * An 'abstract' (forgive my Java speak) module base class
 * @constructor
 */
annotorious.modules.Module = function() { }

/**
 * @protected
 */
annotorious.modules.Module.prototype._init = function(all_items) {
  /** @protected **/
  this._annotators = new goog.structs.Map();
  
  /** @protected **/
  this._eventHandlers = [];

  /** @protected **/
  this._plugins = [];
  
  /** @protected **/
  this._allItems = [];
  
  /** @protected **/
  this._itemsToLoad = [];
  
  /** @protected **/
  this._bufferedForAdding = [];
  
  /** @protected **/
  this._bufferedForRemoval = [];

  /** @protected **/
  this._isSelectionEnabled = true;

  goog.array.extend(this._allItems, all_items);
  goog.array.extend(this._itemsToLoad, all_items);  

  // Make items in viewport annotatable
  this._lazyLoad();
  
  // Attach a listener to make items annotatable as they scroll into view
  var self = this;
  var key = goog.events.listen(window, goog.events.EventType.SCROLL, function() {
    if (self._itemsToLoad.length > 0)
      self._lazyLoad();
    else
      goog.events.unlistenByKey(key);
  });
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
annotorious.modules.Module.prototype._initAnnotator = function(item) {
  var self = this;

  // Keep track of changes
  var addedAnnotations = [];
  var removedAnnotations = [];

  var annotator = this.newAnnotator(item);

  if (!this._isSelectionEnabled)
    annotator.setSelectionEnabled(false);

  var item_src = this.getItemURL(item);

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
    if (annotation.src == image_src) {
      annotator.addAnnotation(annotation);
      addedAnnotations.push(annotation);
    }
  });
      
  goog.array.forEach(this._bufferedForRemoval, function(annotation) {
    if (annotation.src == image_src) {
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
  
  // Update _annotators and _imagesToLoad lists
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
 * Standard module method: adds an annotation.
 * @param {Annotation} the annotation
 * @param {Annotation} opt_replace optionally, an existing annotation to replace
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
 * Standard module method: adds a lifecycle event handler to the image module.
 * @param {yuma.events.EventType} type the event type
 * @param {function} handler the handler function
 */
annotorious.modules.Module.prototype.addHandler = function(type, handler) {
  goog.array.forEach(this._annotators.getValues(), function(annotator, idx, array) {
    annotator.addHandler(type, handler);
  });
  
  this._eventHandlers.push({ type: type, handler: handler });
}

/**
 * Standard module method: adds a plugin to this module.
 * @param {Plugin} plugin the plugin
 */
annotorious.modules.Module.prototype.addPlugin = function(plugin) {
  this._plugins.push(plugin);
  
  var self = this;
  goog.array.forEach(this._annotators.getValues(), function(annotator) {
    self._initPlugin(plugin, annotator);
  });
}

annotorious.modules.Module.prototype.addSelector = function(item_url, selector) {
  if (this.annotatesItem(item_url)) {
    var annotator = this._annotators.get(item_url);
    if (annotator)
      annotator.addSelector(selector);
  }
}


/**
 * Standard module method: tests if this module is in charge of managing the
 * annotatable item with the specified URL.
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
 * Returns the name of the selector that is currently activated on a 
 * particular item.
 * @param {string} the URL of the item to query for the active selector
 */
annotorious.modules.Module.prototype.getActiveSelector = function(item_url) {
  if (this.annotatesItem(item_url)) {
    var annotator = this._annotators.get(item_url);
    if (annotator)
      return annotator.getActiveSelector().getName();
  }
}

/**
 * Standard module method: returns all annotations on the annotatable media with the specified
 * URL, or all annotations from this module in case no URL is specified.
 * @param {string | undefined} opt_media_url a media URL (optional)
 * @return {Array.<Annotation>} the annotations
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
 * @param {string} the URL of the item to query for available selectors
 * @returns {List.<string>} the list of selector names
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
}

/**
 * Standard module method: highlights the specified annotation.
 * @param {Annotation} annotation the annotation
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
 * Standard module method: Makes an item annotatable, if it is supported by this module.
 * @param {object} item the annotatable item
 */
annotorious.modules.Module.prototype.makeAnnotatable = function(item) {
  if (this.supports(item)) {
    this._allItems.push(item);
    this._initAnnotator(item);
  }
}

/**
 * Standard module method: removes an annotation from the item with the specified src URL.
 * @param {Annotation} annotation the annotation
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
 * Standard module method: sets a specific selector on a particular item.
 * @param {string} the URL of the item on which to set the selector
 * @param {string} the name of the selector to set on the item
 */
annotorious.modules.Module.prototype.setActiveSelector = function(item_url, selector) {
  if (this.annotatesItem(item_url)) {
    var annotator = this._annotators.get(item_url);
    if (annotator)
      annotator.setActiveSelector(selector);
  }
}

/**
 * Standard module method: enables (or disables) the ability to create new annotations
 * on an annotatable item.
 * @param {boolean} enabled if <code>true</code> new annotations can be created
 */
annotorious.modules.Module.prototype.setSelectionEnabled = function(enabled) {
  this._isSelectionEnabled = enabled;
  goog.array.forEach(this._annotators.getValues(), function(annotator) {
    annotator.setSelectionEnabled(enabled);
  });
}

/**
 * Standard module method: tests if this module is able to support annotation on the
 * specified item.
 * @param {object} item the item to test
 * @return {boolean} true if this module can provide annotation functionality for the item
 * @interface
 */
annotorious.modules.Module.prototype.supports = goog.abstractMethod;

annotorious.modules.Module.prototype.newAnnotator = goog.abstractMethod;

annotorious.modules.Module.prototype.init = goog.abstractMethod;

annotorious.modules.Module.prototype.getItemURL = goog.abstractMethod;

