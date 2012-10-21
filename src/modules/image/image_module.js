goog.provide('annotorious.modules.image.ImageModule');

goog.require('goog.array');
goog.require('goog.events');

/**
 * The Image Module scans the page for images marked with the
 * 'annotatable' CSS class, and attaches an ImageAnnotator to
 * each one.
 * @constructor
 */
annotorious.modules.image.ImageModule = function() { }
  
annotorious.modules.image.ImageModule.prototype.init = function() {
  /** @private **/
  this._allImages = goog.dom.query('img.annotatable', document);
  
  /** @private **/
  this._imagesToLoad = goog.array.clone(this._allImages);
  
  /** @private **/
  this._annotators = [];
  
  /** @private **/
  this._eventHandlers = [];
  
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
      
      self._annotators.push(annotator);
      goog.array.remove(self._imagesToLoad, image);
    }
  });  
}

/**
 * Adds a lifecycle event handler to the image module.
 * @param {yuma.events.EventType} type the event type
 * @param {function} handler the handler function
 */
annotorious.modules.image.ImageModule.prototype.addHandler = function(type, handler) {
  goog.array.forEach(this._annotators, function(annotator, idx, array) {
    annotator.addHandler(type, handler);
  });
  
  this._eventHandlers.push({ type: type, handler: handler });
}

/**
 * Adds an annotation to the image with the specified src URL.
 * @param {yuma.annotation.Annotation} the annotation
 * @param {string} src the src URL of the image
 */
annotorious.modules.image.ImageModule.prototype.addAnnotation = function(annotation) {
  // TODO make this more efficient!
  goog.array.forEach(this._annotators, function(annotator) {
    if (annotator.getImage().src == annotation.src)
      annotator.addAnnotation(annotation);
  });
}

/**
 * Removes an annotation from the image with the specified src URL.
 * @param {yuma.annotation.Annotation} annotation the annotation
 * @param {string} src the src URL of the image
 */
annotorious.modules.image.ImageModule.prototype.removeAnnotation = function(annotation, src) {
  // TODO implement
}
