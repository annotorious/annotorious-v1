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
annotorious.okfn.Popup = function(image, eventBroker, okfnAnnotator, baseOffset) {  
  /** @private **/
  this._image = image;

  /** @private **/
  this._eventBroker = eventBroker;
  
  /** @private **/ 
  this._okfnAnnotator = okfnAnnotator;
  
  /** @private **/
  this._baseOffset = baseOffset;

  /** @private **/
  this._popupHideTimer;

  /** @private **/
  this._cancelHide = false;

  /** @private **/
  this._currentAnnotation;

  /** @private **/
  this._mouseoverHandlers = [];

  /** @private **/
  this._mouseoutHandlers = [];

  var self = this;
  goog.events.listen(this._okfnAnnotator.viewer.element[0], goog.events.EventType.MOUSEOVER, function(event) {
    if (self._currentAnnotation) {
      if (self._currentAnnotation.url == self._image.src) {
        self.clearHideTimer();
        goog.array.forEach(self._mouseoverHandlers, function(handler) {
          handler(event);
        });
      }
    }
  });
  
  goog.events.listen(this._okfnAnnotator.viewer.element[0], goog.events.EventType.MOUSEOUT, function(event) {
    if (self._currentAnnotation) {
      if (self._currentAnnotation.url == self._image.src) {
        self.startHideTimer();
        goog.array.forEach(self._mouseoutHandlers, function(handler) {
          handler(event);
        });
      }
    }
  });
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
  this._cancelHide = false;
  if (!this._popupHideTimer) {
    var self = this;
    this._popupHideTimer = window.setTimeout(function() {
      self._eventBroker.fireEvent(annotorious.events.EventType.BEFORE_POPUP_HIDE);
      if (!self._cancelHide) {
        goog.dom.classes.add(self._okfnAnnotator.viewer.element[0], 'annotator-hide');
        delete self._popupHideTimer;
      }
    }, 300);
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
 * @param {number} x coordinate (relative to the image)
 * @param {number} y coordiante (relative to the image)
 */
annotorious.okfn.Popup.prototype.show = function(annotation, x, y) {
  this._currentAnnotation = annotation;

  var imgOffset = annotorious.dom.getOffset(this._image); 

  goog.style.setPosition(this._okfnAnnotator.viewer.element[0], 0, window.pageYOffset - this._baseOffset.top);
  this._okfnAnnotator.viewer.load([annotation]);   
  goog.style.setPosition(this._okfnAnnotator.viewer.element[0],
			 imgOffset.left - this._baseOffset.left + x + 16,
			 imgOffset.top + window.pageYOffset - this._baseOffset.top + y);
  this.clearHideTimer();
}

/**
 * Set the position of the popup.
 * @param {number} x coordinate (relative to the image)
 * @param {number} y coordinate (realtive to the image)
 */
annotorious.okfn.Popup.prototype.setPosition = function(x, y) {
  goog.style.setPosition(this._okfnAnnotator.viewer.element[0], x, y);  
}
