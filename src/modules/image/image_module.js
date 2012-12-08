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
  if (plugin.onInitPopup)
    plugin.onInitPopup(annotator.getPopup());

  if (plugin.onInitEditor)  
    plugin.onInitEditor(annotator.getEditor());
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
        if (annotation.src == image.src) {
          annotator.addAnnotation(annotation);
          addedAnnotations.push(annotation);
        }
      });
      
      goog.array.forEach(self._bufferedForRemoval, function(annotation) {
        if (annotation.src == image.src) {
          annotator.removeAnnotation(annotation);
          removedAnnotations.push(annotation);
        }
      });
  
      // Update _annotators and _imagesToLoad lists
      self._annotators.set(image.src, annotator);
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
  if (this.annotatesItem (annotation.src)) {
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
      return image.src == item_url;
    });
    
    return goog.isDefAndNotNull(image);
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

annotorious.modules.image.ImageModule.prototype.makeAnnotatable = function(item) {
  this._allImages.push(item);
  this._imagesToLoad.push(item);
  this._lazyLoad();
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
