goog.provide('yuma.editor');

goog.require('goog.soy');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.style');

/**
 * Base annotation edit form.
 * TODO there is no common Selector base class yet
 * @param {yuma.selection.Selector} selection
 * @param {yuma.modules.image.ImageAnnotator} annotator reference to the annotator
 * @param {number} px the X offset of the editor position
 * @param {number} py the Y offset of the editor position
 * @param {yuma.model.Annotation=} annotation
 * @constructor
 */
yuma.editor.Editor = function(selection, annotator, px, py, opt_annotation) {
  /** @private **/
  this._selection = selection;

  /** @private **/
  this._div = goog.soy.renderAsElement(yuma.templates.editform);

  /** @private **/
  this._textarea = goog.dom.query('.annotation-text', this._div)[0];

  /** @private **/
  this._btnCancel = goog.dom.query('.annotation-cancel', this._div)[0];

  /** @private **/
  this._btnSave = goog.dom.query('.annotation-save', this._div)[0];

  var self = this;
  goog.events.listen(this._btnCancel, goog.events.EventType.CLICK, function(event) {
    annotator.fireEvent(yuma.events.EventType.ANNOTATION_EDIT_CANCEL, 
      { mouseEvent: event, annotation: opt_annotation });
    self.close();
  });

  goog.events.listen(this._btnSave, goog.events.EventType.CLICK, function(event) {
    annotator.fireEvent(yuma.events.EventType.ANNOTATION_EDIT_SAVE, 
      { mouseEvent: event, annotation: self.getAnnotation() });
    self.close();
  });
 
  this.setPosition(px, py);
  goog.dom.appendChild(document.body, this._div);
  this._textarea.focus();

  annotator.fireEvent(yuma.events.EventType.ANNOTATION_EDIT, { annotation: opt_annotation });
}

/**
 * Sets the position (i.e. CSS left/top value)
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
yuma.editor.Editor.prototype.setPosition = function(x, y) {
  goog.style.setPosition(this._div, x, y);
}

/**
 * Closes the editor
 */
yuma.editor.Editor.prototype.close = function() {
  goog.dom.removeNode(this._div);
}

/**
 * Returns the current annotation that is the current state of the editor
 * @return {yuma.model.Annotation} the annotation
 */
yuma.editor.Editor.prototype.getAnnotation = function() {
  return new yuma.annotation.Annotation(this._textarea.value, this._selection.getShape()); 
}
