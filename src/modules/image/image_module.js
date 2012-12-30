goog.provide('annotorious.modules.image.ImageModule');

goog.require('goog.dom');
goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.structs.Map');

/**
 * The Image Module scans the page for images marked with the
 * 'annotatable' CSS class, and attaches an ImageAnnotator to
 * each one.
 * @constructor
 */
annotorious.modules.image.ImageModule = function() {   
  /** @private **/
  this._annotators = new goog.structs.Map();
  
  /** @private **/
  this._eventHandlers = [];

  /** @private **/
  this._plugins = [];
  
  /** @private **/
  this._allImages = [];
  
  /** @private **/
  this._imagesToLoad = [];
  
  /** @private **/
  this._bufferedForAdding = [];
  
  /** @private **/
  this._bufferedForRemoval = [];
}
  
/**
 * Standard module init() function.
 */
annotorious.modules.image.ImageModule.prototype.init = function() {
  // Query images marked with 'annotatable' CSS class
  var annotatableImages = goog.dom.query('img.annotatable', document);
  goog.array.extend(this._allImages, annotatableImages);
  goog.array.extend(this._imagesToLoad, annotatableImages);  

  // Make images in viewport annotatable
  this._lazyLoad();
  
  // Attach a listener to make images annotatable as they scroll into view
  var self = this;
  var key = goog.events.listen(window, goog.events.EventType.SCROLL, function() {
    if (self._imagesToLoad.length > 0)
      self._lazyLoad();
    else
      goog.events.unlistenByKey(key);
  });
}

/**
 * @private
 */
annotorious.modules.image.ImageModule.prototype._initPlugin = function(plugin, annotator) {
  if (plugin.onInitAnnotator)
    plugin.onInitAnnotator(annotator);
}

/**
 * @private
 */
annotorious.modules.image.ImageModule.prototype._lazyLoad = function() {
  // Keep track of changes
  var loadedImages = [];
  var addedAnnotations = [];
  var removedAnnotations = [];
        
  var self = this;
  goog.array.forEach(this._imagesToLoad, function(image) {
    if (annotorious.dom.isInViewport(image)) {
      var annotator = new annotorious.modules.image.ImageAnnotator(image);
      var image_src = annotorious.modules.image.ImageModule.getItemURL(image);

      // Attach handlers that are already registered
      goog.array.forEach(self._eventHandlers, function(eventHandler) {
        annotator.addHandler(eventHandler.type, eventHandler.handler);
      });

      // Callback to registered plugins
      goog.array.forEach(self._plugins, function(plugin) {
        self._initPlugin(plugin, annotator);
      });
            
      // Cross-check with annotation add/remove buffers
      goog.array.forEach(self._bufferedForAdding, function(annotation) {
        if (annotation.src == image_src) {
          annotator.addAnnotation(annotation);
          addedAnnotations.push(annotation);
        }
      });
      
      goog.array.forEach(self._bufferedForRemoval, function(annotation) {
        if (annotation.src == image_src) {
          annotator.removeAnnotation(annotation);
          removedAnnotations.push(annotation);
        }
      });
  
      // Update _annotators and _imagesToLoad lists
      self._annotators.set(image_src, annotator);
      loadedImages.push(image);
    }
  });

  // Apply changes
  goog.array.forEach(addedAnnotations, function(annotation) {
    goog.array.remove(self._bufferedForAdding, annotation);
  });
  
  goog.array.forEach(removedAnnotations, function(annotation) {
    goog.array.remove(self._bufferedForRemoval, annotation);
  });
  
  goog.array.forEach(loadedImages, function(image) {
    goog.array.remove(self._imagesToLoad, image);
  });
}

/**
 * Standard module method: adds an annotation to the image with the specified src URL.
 * @param {Annotation} the annotation
 * @param {string} src the src URL of the image
 */
annotorious.modules.image.ImageModule.prototype.addAnnotation = function(annotation) {
  if (this.annotatesItem(annotation.src)) {
    var annotator = this._annotators.get(annotation.src);
    if (annotator)
      annotator.addAnnotation(annotation)
    else
      this._bufferedForAdding.push(annotation);
  }
}

/**
 * Standard module method: adds a lifecycle event handler to the image module.
 * @param {yuma.events.EventType} type the event type
 * @param {function} handler the handler function
 */
annotorious.modules.image.ImageModule.prototype.addHandler = function(type, handler) {
  goog.array.forEach(this._annotators.getValues(), function(annotator, idx, array) {
    annotator.addHandler(type, handler);
  });
  
  this._eventHandlers.push({ type: type, handler: handler });
}

/**
 * Standard module method: adds a plugin to this module.
 * @param {Plugin} plugin the plugin
 */
annotorious.modules.image.ImageModule.prototype.addPlugin = function(plugin) {
  this._plugins.push(plugin);
  
  var self = this;
  goog.array.forEach(this._annotators.getValues(), function(annotator) {
    self._initPlugin(plugin, annotator);
  });
}

/**
 * Standard module method: tests if this module is in charge of managing the
 * annotatable item with the specified URL.
 * @param {string} item_url the URL of the item
 * @return {boolean} true if this module is in charge of the media
 */ 
annotorious.modules.image.ImageModule.prototype.annotatesItem = function(item_url) {
  if (this._annotators.containsKey(item_url)) {
    return true;
  } else {
    var image = goog.array.find(this._imagesToLoad, function(image) {
      return annotorious.modules.image.ImageModule.getItemURL(image) == item_url;
    });
    
    return goog.isDefAndNotNull(image);
  }
}

/**
 * Returns the name of the selector that is currently activated on a 
 * particular item.
 *
 * !!!!!!!!!!!!!!!!!!!!
 * !!
 * !! TODO implement - currently doesn't return anything useful yet!!
 * !!
 * !!!!!!!!!!!!!!!!!!!!
 *
 * @param {string} the URL of the item to query for the active selector
 */
annotorious.modules.image.ImageModule.prototype.getActiveSelector = function(item_url) {
  // TODO return the selector NAME, not the actual selector object
  if (this.annotatesItem(item_url)) {
    var annotator = this._annotators.get(item_url);
    if (annotator)
      return annotator.getActiveSelector();
  }
}

/**
 * Standard module method: returns all annotations on the annotatable media with the specified
 * URL, or all annotations from this module in case no URL is specified.
 * @param {string | undefined} opt_media_url a media URL (optional)
 * @return {Array.<Annotation>} the annotations
 */
annotorious.modules.image.ImageModule.prototype.getAnnotations = function(opt_item_url) {
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
 *
 * !!!!!!!!!!!!!!!!!!!!
 * !!
 * !! TODO implement - currently doesn't return anything useful yet!!
 * !!
 * !!!!!!!!!!!!!!!!!!!!
 *
 * @param {string} the URL of the item to query for available selectors
 * @returns {List.<string>} the list of selector names
 */
annotorious.modules.image.ImageModule.prototype.getAvailableSelectors = function(item_url) {
  // TODO return list of selector NAMES, not the actual selector objects
  if (this.annotatesItem(item_url)) {
    var annotator = this._annotators.get(item_url);
    if (annotator)
      return annotator.getAvailableSelectors();
  }
}

/**
 * Annotations should be bound to the URL defined in the 'data-original' attribute of
 * the image. Only if this attribute does not exist, they should be bound to the original
 * image SRC. This utility function returns the correct URL to bind to.
 */
annotorious.modules.image.ImageModule.getItemURL = function(image) {
  var src = image.getAttribute('data-original');
  if (src)
    return src;
  else
    return image.src;
}

/**
 * Makes an item annotatable, if it is an image.
 * @param {object} the annotatable image
 */
annotorious.modules.image.ImageModule.prototype.makeAnnotatable = function(item) {
  if (this.supports(item)) {
    this._allImages.push(item);
    this._imagesToLoad.push(item);
    this._lazyLoad();
  }
}

/**
 * Standard module method: removes an annotation from the image with the specified src URL.
 * @param {Annotation} annotation the annotation
 * @param {string} src the src URL of the image
 */
annotorious.modules.image.ImageModule.prototype.removeAnnotation = function(annotation) {
  if (this.annotatesItem(annotation.src)) {
    var annotator = this._annotators.get(annotation.src);
    if (annotator)
      annotator.removeAnnotation(annotation);
    else
      this._bufferedForRemoval.push(annotation);
  }
}

/**
 * Sets a specific selector on a particular item.
 *
 * !!!!!!!!!!!!!!!!!!!!
 * !!
 * !! TODO implement - under development - may do unexpected things!!
 * !!
 * !!!!!!!!!!!!!!!!!!!!
 *
 * @param {string} the URL of the item on which to set the selector
 * @param {string} the name of the selector to set on the item
 */
annotorious.modules.image.ImageModule.prototype.setActiveSelector = function(item_url, selector) {
  // TODO implement so that param 'selector' is treated as the selector name
  if (this.annotatesItem(item_url)) {
    var annotator = this._annotators.get(item_url);
    if (annotator)
      annotator.setActiveSelector(selector);
  }
}

/**
 * Enables (or disables) the ability to create new annotations on an annotatable image.
 * @param {boolean} enabled if <code>true</code> new annotations can be created
 */
annotorious.modules.image.ImageModule.prototype.setSelectionEnabled = function(enabled) {
  goog.array.forEach(this._annotators.getValues(), function(annotator) {
    annotator.setSelectionEnabled(enabled);
  });
}

/**
 * Standard module method: tests if this module is able to support annotation on the
 * specified item.
 * @param {object} item the item to test
 * @return {boolean} true if this module can provide annotation functionality for the item
 */
annotorious.modules.image.ImageModule.prototype.supports = function(item) {
  if (goog.dom.isElement(item))
    return (item.tagName == 'IMG');
  else
    return false;
}
