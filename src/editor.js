goog.provide('annotorious.editor');

goog.require('goog.soy');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.style');

/**
 * Base annotation edit form.
 * @param {annotorious.selection.Selector} selection reference to the selection widget
 * @param {annotorious.modules.image.ImageAnnotator} annotator reference to the annotator
 * @param {element} parentEl the DOM element to attach the editor to
 * @param {annotorious.annotation.Annotation} the (optional) existing annotation to edit
 * @constructor
 */
annotorious.editor.Editor = function(annotator, parentEl, opt_annotation) {
  this.element = goog.soy.renderAsElement(annotorious.templates.editform);
  
  /** @private **/
  this._annotator = annotator;

  /** @private **/
  this._item = annotator.getItem();

  /** @private **/
  this._textarea = goog.dom.query('.annotorious-editor-text', this.element)[0];

  /** @private **/
  this._btnCancel = goog.dom.query('.annotorious-editor-button-cancel', this.element)[0];

  /** @private **/
  this._btnSave = goog.dom.query('.annotorious-editor-button-save', this.element)[0];

  /** @private **/
  this._btnContainer = goog.dom.getParentElement(this._btnSave);

  /** @private **/
  this._extraFields = [];

  var self = this;
  goog.events.listen(this._btnCancel, goog.events.EventType.CLICK, function(event) {
    event.preventDefault();
    annotator.stopSelection();
    self.close();
  });

  goog.events.listen(this._btnSave, goog.events.EventType.CLICK, function(event) {
    event.preventDefault();
    annotator.addAnnotation(self.getAnnotation());
    annotator.fireEvent(annotorious.events.EventType.ANNOTATION_CREATED, self.getAnnotation());
    annotator.stopSelection();
    self.close();
  });
 
  goog.style.showElement(this.element, false);
  goog.dom.appendChild(parentEl, this.element);
  this._textarea.focus();
}

/**
 * Adds a field to the popup GUI widget. A field can be either a string (containing
 * HTML) or a function that takes an Annotation as argument and returns an (HTML) string.
 * @param {string | function} field the field
 */
annotorious.editor.Editor.prototype.addField = function(field) {
  var fieldEl = goog.dom.createDom('div', 'annotorious-editor-field');
  
  if (goog.isString(field))  {
    fieldEl.innerHTML = field;
  } else if (goog.isFunction(field)) {
    this._extraFields.push({el: fieldEl, fn: field});
  }

  goog.dom.insertSiblingBefore(fieldEl, this._btnContainer);
}

annotorious.editor.Editor.prototype.open = function() {
  goog.style.showElement(this.element, true);
  this._textarea.focus();

  // TODO update extra fields in case there is an existing annotation
}

/**
 * Closes the editor.
 */
annotorious.editor.Editor.prototype.close = function() {
  goog.style.showElement(this.element, false);
  this._textarea.value = "";
}

/**
 * Sets the position (i.e. CSS left/top value) of the editor element.
 * @param {annotorious.geom.Point} xy the viewport coordinate
 */
annotorious.editor.Editor.prototype.setPosition = function(xy) {
  goog.style.setPosition(this.element, xy.x, xy.y);
}

/**
 * Gets the annotation that is the current state of the editor.
 * @return {annotorious.annotation.Annotation} the annotation
 */
annotorious.editor.Editor.prototype.getAnnotation = function() {
  return new annotorious.annotation.Annotation(this._item.src, this._textarea.value, this._annotator.getActiveSelector().getShape());
}

// Export addField API method
annotorious.editor.Editor.prototype['addField'] = annotorious.editor.Editor.prototype.addField;

