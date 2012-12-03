goog.provide('annotorious.hint');

goog.require('goog.soy');
goog.require('goog.events');
goog.require('goog.style');
goog.require('goog.dom.query');

/**
 * @constructor
 */
annotorious.hint.Hint = function(parent) {
  this.element = goog.soy.renderAsElement(annotorious.templates.hint);

  /** @private **/
  this._message = goog.dom.query('.annotorious-hint-msg', this.element)[0];

  /** @private **/
  this._icon = goog.dom.query('.annotorious-hint-icon', this.element)[0];

  /** @private **/
  this._hideTimer;

  var self = this;
  goog.events.listen(this._icon, goog.events.EventType.MOUSEOVER, function(event) {
    self.show();
    window.clearTimeout(self._hideTimer);
  });

  goog.events.listen(this._icon, goog.events.EventType.MOUSEOUT, function(event) {
    self.hide();
  });
 
  this.hide();
  goog.dom.appendChild(parent, this.element);
}

annotorious.hint.Hint.prototype.show = function() {
  window.clearTimeout(this._hideTimer);
  goog.style.setOpacity(this._message, 0.8);

  var self = this;
  this._hideTimer = window.setTimeout(function() {
    self.hide();
  }, 3000);
}

annotorious.hint.Hint.prototype.hide = function() {
  window.clearTimeout(this._hideTimer);
  goog.style.setOpacity(this._message, 0);
}
