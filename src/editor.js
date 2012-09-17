goog.provide('yuma.editor');

goog.require('goog.soy');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.style');

/**
 * Base annotation edit form.
 * @param {yuma.model.Annotation | undefined} annotation
 * @constructor
 * @extends {goog.events.EventTarget}
 */
yuma.editor.Editor = function(annotation) {
  /** @private **/
  this._div = goog.soy.renderAsElement(yuma.templates.editform);

  /** @private **/
  this._textarea = goog.dom.query('.annotation-text', this._div)[0];

  /** @private **/
  this._btnCancel = goog.dom.query('.annotation-cancel', this._div)[0];

  /** @private **/
  this._btnSave = goog.dom.query('.annotation-save', this._div)[0];

  yuma.events.EventBroker.getInstance().registerEventTarget(this, [
    yuma.events.EventType.ANNOTATION_EDIT,
    yuma.events.EventType.ANNOTATION_EDIT_CANCEL,
    yuma.events.EventType.ANNOTATION_EDIT_SAVE
  ]);

  var self = this;
  goog.events.listen(this._btnCancel, goog.events.EventType.CLICK, function(event) {
    goog.events.dispatchEvent(self, 
      {type: yuma.events.EventType.ANNOTATION_EDIT_CANCEL, mouseEvent: event});
    self.close();
  });

  goog.events.listen(this._btnSave, goog.events.EventType.CLICK, function(event) {
    // TODO event object needs to contain the text/tags/etc.
    goog.events.dispatchEvent(self, 
      {type: yuma.events.EventType.ANNOTATION_EDIT_SAVE, mouseEvent: event});
    self.close();
  });
 
  goog.dom.appendChild(document.body, this._div);
  this._textarea.focus();

  goog.events.dispatchEvent(self, {type: yuma.events.EventType.ANNOTATION_EDIT, annotation: annotation});
}
goog.inherits(yuma.editor.Editor, goog.events.EventTarget);

/**
 * Sets the position.
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
yuma.editor.Editor.prototype.setPosition = function(x, y) {
  goog.style.setPosition(this._div, x, y);
}

/**
 * Closes the editor.
 */
yuma.editor.Editor.prototype.close = function() {
  goog.dom.removeNode(this._div);
}
