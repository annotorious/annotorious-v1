goog.provide('annotorious.modules.image.ImageModule');

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
}
  
/**
 * Standard module init() function.
 */
annotorious.modules.image.ImageModule.prototype.init = function() {  
  /** @private **/
  this._allImages = goog.dom.query('img.annotatable', document);
  
  /** @private **/
  this._imagesToLoad = goog.array.clone(this._allImages);
  
  /** @private **/
  this._bufferedForAdding = [];
  
  /** @private **/
  this._bufferedForRemoval = [];

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
annotorious.modules.image.ImageModule.prototype._lazyLoad = function() {
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
        // TODO remove code duplication
        if (plugin.onPopupInit)
          plugin.onPopupInit(annotator.getPopup());

        if (plugin.onEditorInit)  
          plugin.onEditorInit(annotator.getEditor());
      });
      
      // Cross-check with annotation add/remove buffers
      goog.array.forEach(self._bufferedForAdding, function(annotation) {
        if (annotation.src == image.src) {
          annotator.addAnnotation(annotation);
          goog.array.remove(self._bufferedForAdding, annotation);
        }
      });
      
      goog.array.forEach(self._bufferedForRemoval, function(annotation) {
        if (annotation.src == image.src) {
          annotator.removeAnnotation(annotation);
          goog.array.remove(self._bufferedForRemoval, annotation);
        }
      });
      
      // Update _annotators and _imagesToLoad lists
      self._annotators.set(image.src, annotator);
      goog.array.remove(self._imagesToLoad, image);
    }
  });  
}

/**
 * Standard module method: adds a plugin to this module.
 * @param {Plugin} plugin the plugin
 */
annotorious.modules.image.ImageModule.prototype.addPlugin = function(plugin) {
  this._plugins.push(plugin);

  goog.array.forEach(this._annotators.getValues(), function(annotator) {
    if (plugin.onPopupInit)
      plugin.onPopupInit(annotator.getPopup());

    if (plugin.onEditorInit)  
      plugin.onEditorInit(annotator.getEditor());
  });
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
 * Standard module method: adds an annotation to the image with the specified src URL.
 * @param {Annotation} the annotation
 * @param {string} src the src URL of the image
 */
annotorious.modules.image.ImageModule.prototype.addAnnotation = function(annotation) {
  if (this.isInChargeOf(annotation.src)) {
    var annotator = this._annotators.get(annotation.src);
    if (annotator)
      annotator.addAnnotation(annotation)
    else
      this._bufferedForAdding.push(annotation);
  }
}

/**
 * Standard module method: removes an annotation from the image with the specified src URL.
 * @param {Annotation} annotation the annotation
 * @param {string} src the src URL of the image
 */
annotorious.modules.image.ImageModule.prototype.removeAnnotation = function(annotation) {
  if (this.isInChargeOf(annotation.src)) {
    var annotator = this._annotators.get(annotation.src);
    if (annotator)
      annotator.removeAnnotation(annotation);
    else
      this._bufferedForRemoval.push(annotation);
  }
}

/**
 * Standard module method: returns all annotations on the annotatable media with the specified
 * URL, or all annotations from this module in case no URL is specified.
 * @param {string | undefined} opt_media_url a media URL (optional)
 * @return {Array.<Annotation>} the annotations
 */
annotorious.modules.image.ImageModule.prototype.getAnnotations = function(opt_media_url) {
  if (opt_media_url) {
    var annotator = this._annotators.get(opt_media_url);
    if (annotator) {
      return annotator.getAnnotations();
    } else {
      return goog.array.filter(this._bufferedForAdding, function(annotation) {
        return annotation.src == opt_media_url;
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
 * Standard module method: tests if this module is in charge of managing the
 * annotatable media with the specified URL.
 * @return {boolean} true if this module is in charge of the media
 */ 
annotorious.modules.image.ImageModule.prototype.isInChargeOf = function(mediaURL) {
  if (this._annotators.containsKey(mediaURL))
    return true;
  
  var isInCharge = false;
  goog.array.forEach(this._imagesToLoad, function(image) {
    if (image.src == mediaURL)
      isInCharge = true;
  });
  return isInCharge;
}
