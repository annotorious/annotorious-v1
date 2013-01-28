goog.provide('annotorious.editor');

goog.require('goog.soy');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.style');
goog.require('goog.string.html.htmlSanitize');

/**
 * Annotation edit form.
 * @param {annotorious.modules.image.ImageAnnotator} annotator reference to the annotator
 * @param {element} parentEl the DOM element to attach the editor to
 * @constructor
 */
annotorious.editor.Editor = function(annotator, parentEl) {
  this.element = goog.soy.renderAsElement(annotorious.templates.editform);
  
  /** @private **/
  this._annotator = annotator;

  /** @private **/
  this._item = annotator.getItem();
  
  /** @private **/
  this._annotation;

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
    var annotation = self.getAnnotation();
    annotator.addAnnotation(annotation);
    annotator.fireEvent(annotorious.events.EventType.ANNOTATION_CREATED, annotation);
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

/**
 * Opens the edit form with an annotation.
 * @param {Annotation} annotation the annotation to edit
 */
annotorious.editor.Editor.prototype.open = function(annotation) {
  this._annotation = annotation;
  
  goog.style.showElement(this.element, true);
  this._textarea.value = annotation.text;
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
 * (Re-)sets the position (i.e. CSS left/top value) of the editor element.
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
  var sanitized = goog.string.html.htmlSanitize(this._textarea.value, function(url) {
    return url;
  });

  // TODO hack!
  if (this._annotator.getActiveSelector().getShape()) {
    return new annotorious.annotation.Annotation(this._item.src, sanitized, this._annotator.getActiveSelector().getShape());
  } else {
    this._annotation.text = sanitized;
    return this._annotation;
  }
}

// Export addField API method
annotorious.editor.Editor.prototype['addField'] = annotorious.editor.Editor.prototype.addField;

