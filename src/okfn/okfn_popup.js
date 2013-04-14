goog.provide('annotorious.okfn.Popup');

goog.require('goog.array');
goog.require('goog.style');
goog.require('goog.dom.classes');

/**
 * A wrapper around the OKFN viewer popup, mimicking the Annotorious Popup.
 * @param {element} image the image
 * @param {annotorious.events.EventBroker} eventBroker reference to the Yuma EventBroker
 * @param {Annotator} okfnAnnotator reference to the OKFN Annotator
 * @param {Object} the base offset of the annotatable DOM element
 * @constructor
 */
annotorious.okfn.Popup = function(image, okfnAnnotator, baseOffset) {  
  /** @private **/
  this._image = image;

  /** @private **/
  // TODO
  this._eventBroker = undefined;
  
  /** @private **/ 
  this._okfnAnnotator = okfnAnnotator;
  
  /** @private **/
  this._baseOffset = baseOffset;

  /** @private **/
  this._popupHideTimer;

  /** @private **/
  this._cancelHide = false;

  /** @private **/
  this._mouseoverHandlers = [];

  /** @private **/
  this._mouseoutHandlers = [];

  var self = this;
  goog.events.listen(this._okfnAnnotator.viewer.element[0], goog.events.EventType.MOUSEOVER, function(event) {
    if (self.isViewerCurrentlyOwned()) {
      self.clearHideTimer()
      goog.array.forEach(self._mouseoverHandlers, function(handler) {
        handler(event);
      });
    }
  });
  
  goog.events.listen(this._okfnAnnotator.viewer.element[0], goog.events.EventType.MOUSEOUT, function(event) {
    if (self.isViewerCurrentlyOwned()) {
      okfnAnnotator.clearViewerHideTimer(); // Switch off Annotator's own fade out
      self.startHideTimer();
      goog.array.forEach(self._mouseoutHandlers, function(handler) {
        handler(event);
      });
    }
  });
}

/**
 * Utility method that tests if the viewer is currently 'owned' by the image that this
 * popup wrapper is responsible for. I.e. whether the (first) current annotation in the 
 * viewer is an image annotation, and the annotation 'url' property matches this wrapper's
 * _image.src.
 * @returns {boolean} true if the viewer is currently owned by this wrapper
 */
annotorious.okfn.Popup.prototype.isViewerCurrentlyOwned = function() {
  var annotations = this._okfnAnnotator.viewer.annotations;

  if (!annotations) 
    return false;

  if (annotations.length < 1)
    return false;

  return annotations[0].url == this._image.src;
}

/**
 * Adds a mouseover event handler to this popup wrapper. Note that this handler 
 * will _not_ be invoked on all mouseover events that happen on the underlying
 * Annotator popup, but _only_ on events that happen while the Annotator popup
 * is "owned" by this wrapper. (I.e. when the popup contains an annotation that 
 * belongs to the same image as this popup wrapper.) 
 */
annotorious.okfn.Popup.prototype.addMouseOverHandler = function(handler) {
  this._mouseoverHandlers.push(handler);
}

/**
 * Adds a mouseout event handler to this popup wrapper. Note that this handler 
 * will _not_ be invoked on all mouseout events that happen on the underlying
 * Annotator popup, but _only_ on events that happen while the Annotator popup
 * is "owned" by this wrapper. (I.e. when the popup contains an annotation that 
 * belongs to the same image as this popup wrapper.) 
 */
annotorious.okfn.Popup.prototype.addMouseOutHandler = function(handler) {
  this._mouseoutHandlers.push(handler);
}

/**
 * Start the popup hide timer.
 */
annotorious.okfn.Popup.prototype.startHideTimer = function() {
  if (!goog.dom.classes.has(this._okfnAnnotator.viewer.element[0], 'annotator-hide')) {
    this._cancelHide = false;
    if (!this._popupHideTimer) {
      var self = this;
      this._popupHideTimer = window.setTimeout(function() {
        self._eventBroker.fireEvent(annotorious.events.EventType.BEFORE_POPUP_HIDE);
        if (!self._cancelHide && self.isViewerCurrentlyOwned()) {
          goog.dom.classes.add(self._okfnAnnotator.viewer.element[0], 'annotator-hide');
          self._okfnAnnotator.viewer.annotations = [];
          delete self._popupHideTimer;
        }
      }, 300);
    }
  }
}

/**
 * Clear the popup hide timer.
 */
annotorious.okfn.Popup.prototype.clearHideTimer = function() {
  this._cancelHide = true;
  if (this._popupHideTimer) {
    window.clearTimeout(this._popupHideTimer);
    delete this._popupHideTimer;
  }
}

/**
 * Show the popup, loaded with the specified annotation, at the specified coordinates.
 * @param {Object} annotation the annotation
 * @param {annotorious.geom.Point} xy the viewport coordinate (relative to the image)
 */
annotorious.okfn.Popup.prototype.show = function(annotation, xy) {
  goog.dom.classes.remove(this._okfnAnnotator.viewer.element[0], 'annotator-hide');

  var imgOffset = annotorious.dom.getOffset(this._image); 

  goog.style.setPosition(this._okfnAnnotator.viewer.element[0], 0, window.pageYOffset - this._baseOffset.top);
  this._okfnAnnotator.viewer.load([annotation]);   
  goog.style.setPosition(this._okfnAnnotator.viewer.element[0],
			 imgOffset.left - this._baseOffset.left + xy.x + 16,
			 imgOffset.top + window.pageYOffset - this._baseOffset.top + xy.y);
  this.clearHideTimer();
}

/**
 * Set the position of the popup.
 * @param {annotorious.geom.Point} xy the viewport coordinate (relative to the image)
 */
annotorious.okfn.Popup.prototype.setPosition = function(x, y) {
  goog.style.setPosition(this._okfnAnnotator.viewer.element[0], xy.x, xy.y);  
}
