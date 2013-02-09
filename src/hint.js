goog.provide('annotorious.hint');

goog.require('goog.soy');
goog.require('goog.events');
goog.require('goog.style');
goog.require('goog.dom.query');

/**
 * @constructor
 */
annotorious.hint.Hint = function(annotator, parent) {
  var self = this;

  this.element = goog.soy.renderAsElement(annotorious.templates.hint);

  /** @private **/
  this._annotator = annotator;

  /** @private **/
  this._message = goog.dom.query('.annotorious-hint-msg', this.element)[0];

  /** @private **/
  this._icon = goog.dom.query('.annotorious-hint-icon', this.element)[0];

  /** @private **/
  this._hideTimer;

  /** @private **/
  this._mouseOverListener;

  /** @private **/
  this._mouseOutListener;

  /** @private **/
  this._overItemHandler = function() {
    self.show();
  };

  /** @private **/
  this._outOfItemHandler = function() {
    self.hide();
  };

  this._attachListeners();
  this.hide();
  goog.dom.appendChild(parent, this.element);
}

/**
 * Attaches MOUSEOVER and MOUSEOUT listeners to the icon, and MOUSE_OVER_ANNOTATABLE_ITEM
 * and MOUSE_OUT_OF_ANNOTATABLE_ITEM handlers to the annototator instance.
 * @private
 */
annotorious.hint.Hint.prototype._attachListeners = function() {
  var self = this;

  this._mouseOverListener = goog.events.listen(this._icon, goog.events.EventType.MOUSEOVER, function(event) {
    self.show();
    window.clearTimeout(self._hideTimer);
  });

  this._mouseOutListener = goog.events.listen(this._icon, goog.events.EventType.MOUSEOUT, function(event) {
    self.hide();
  });

  this._annotator.addHandler(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_ITEM, this._overItemHandler);

  this._annotator.addHandler(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM, this._outOfItemHandler);
}

/**
 * Detaches MOUSEUP and MOUSEMOVE listeners from the editing canvas.
 * @private
 */
annotorious.hint.Hint.prototype._detachListeners = function() {
  goog.events.unlistenByKey(this._mouseOverListener);
  goog.events.unlistenByKey(this._mouseOutListener);
  this._annotator.removeHandler(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_ITEM, this._overItemHandler);
  this._annotator.removeHandler(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM, this._outOfItemHandler);
}

/**
 * Shows the hint.
 */
annotorious.hint.Hint.prototype.show = function() {
  window.clearTimeout(this._hideTimer);
  goog.style.setOpacity(this._message, 1);

  var self = this;
  this._hideTimer = window.setTimeout(function() {
    self.hide();
  }, 3000);
}

/**
 * Hides the hint, leaving only the Annotorious feather icon.
 */
annotorious.hint.Hint.prototype.hide = function() {
  window.clearTimeout(this._hideTimer);
  goog.style.setOpacity(this._message, 0);
}

/**
 * Destroys the hint element, removing it from the DOM.
 */
annotorious.hint.Hint.prototype.destroy = function() {
  this._detachListeners();

  delete this._mouseOverListener;
  delete this._mouseOutListener;
  delete this._overItemHandler;
  delete this._outOfItemHandler;

  goog.dom.removeNode(this.element);
}
