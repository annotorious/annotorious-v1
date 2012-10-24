goog.provide('annotorious.viewer');

goog.require('goog.style');
goog.require('goog.dom');
goog.require('goog.dom.query');

/**
 * A popup bubble widget to show annotation details.
 * @param {element} parentEl the DOM element to attach to
 * @param {annotorious.modules.image.ImageAnnotator} annotator reference to the annotator
 * @constructor
 */
annotorious.viewer.Popup = function(parentEl, annotator) {      
  /** @private **/
  this._annotator = annotator;

  /** @private **/
  this._element = goog.soy.renderAsElement(annotorious.templates.popup);
  
  /** @private **/
  this._currentAnnotation;

  /** @private **/
  this._text = goog.dom.query('.yuma-popup-text', this._element)[0];

  /** @private **/
  this._buttons = goog.dom.query('.yuma-popup-action-delete', this._element)[0];

  /** @private **/
  this._timer;

  var btnDelete = goog.dom.query('.yuma-popup-action-delete', this._element)[0];

  var self = this;
  goog.events.listen(btnDelete, goog.events.EventType.CLICK, function(event) {
    goog.style.setOpacity(self._element, 0.0); 
    annotator.fireEvent(annotorious.events.EventType.POPUP_BTN_DELETE,
      { annotation: self._currentAnnotation, mouseEvent: event });
  });
  
  goog.events.listen(this._element, goog.events.EventType.MOUSEOVER, function(event) {
    goog.style.setOpacity(self._buttons, 0.4);
    self.clearHideTimer();
  });
  
  goog.events.listen(this._element, goog.events.EventType.MOUSEOUT, function(event) {
    goog.style.setOpacity(self._buttons, 0);
    self.startHideTimer();
  });
  
  goog.style.setOpacity(this._element, 0.0);
  goog.dom.appendChild(parentEl, this._element);
}

/**
 * Start the popup hide timer.
 */
annotorious.viewer.Popup.prototype.startHideTimer = function() {
  if (!this._timer) {
    var self = this;
    this._timer = window.setTimeout(function() {
      goog.style.setOpacity(self._element, 0.0);
      self._annotator.fireEvent(annotorious.events.EventType.POPUP_HIDDEN);
      delete self._timer;
    }, 300);
  }
}

/**
 * Clear the popup hide timer.
 */
annotorious.viewer.Popup.prototype.clearHideTimer = function() {
  if (this._timer) {
    window.clearTimeout(this._timer);
    delete this._timer;
  }
}

/**
 * Show the popup, loaded with the specified annotation, at the specified coordinates.
 * @param {Object} annotation the annotation
 * @param {number} x coordinate (relative to the image)
 * @param {number} y coordiante (relative to the image)
 */
annotorious.viewer.Popup.prototype.show = function(annotation, x, y) {
  if (!this.isShown()) {
    this._currentAnnotation = annotation;
    this._text.innerHTML = annotation.text;
    this.setPosition(x, y);
    goog.style.setOpacity(this._element, 0.9); 

    var self = this;
    goog.style.setOpacity(this._buttons, 0.4);
    window.setTimeout(function() {
      goog.style.setOpacity(self._buttons, 0);
    }, 1000);
  }
}

annotorious.viewer.Popup.prototype.isShown = function() {
  // TODO fix!
  return goog.style.getOpacity(this._element) > 0;
}

/**
 * Set the position of the popup.
 * @param {number} x coordinate (relative to the image)
 * @param {number} y coordinate (realtive to the image)
 */
annotorious.viewer.Popup.prototype.setPosition = function(x, y) {
  goog.style.setPosition(this._element, new goog.math.Coordinate(x, y));
}

