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
  this._original_annotation;

  /** @private **/
  this._current_annotation;

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
    annotator.stopSelection(self._original_annotation);
    self.close();
  });

  goog.events.listen(this._btnSave, goog.events.EventType.CLICK, function(event) {
    event.preventDefault();
    var annotation = self.getAnnotation();
    annotator.addAnnotation(annotation);
    annotator.stopSelection();

    if (self._original_annotation)
      annotator.fireEvent(annotorious.events.EventType.ANNOTATION_UPDATED, annotation);
    else
      annotator.fireEvent(annotorious.events.EventType.ANNOTATION_CREATED, annotation);      

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
  } else if (goog.dom.isElement(field)) {
    goog.dom.appendChild(fieldEl, field);
  }

  goog.dom.insertSiblingBefore(fieldEl, this._btnContainer);
}

/**
 * Opens the edit form with an annotation.
 * @param {Annotation} opt_annotation the annotation to edit or undefined to create a new annotation
 */
annotorious.editor.Editor.prototype.open = function(opt_annotation) {
  this._original_annotation = opt_annotation;
  this._current_annotation = opt_annotation;

  if (opt_annotation)
    this._textarea.value = opt_annotation.text;

  goog.style.showElement(this.element, true);
  this._textarea.focus();

  // Update extra fields (if any)
  goog.array.forEach(this._extraFields, function(field) {
    var f = field.fn(opt_annotation);
    
    if (goog.isString(f))  {
      field.el.innerHTML = f;
    } else if (goog.dom.isElement(f)) {
      goog.dom.removeChildren(field.el);
      goog.dom.appendChild(field.el, f);
    }
  });
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

  if (this._current_annotation) {
    this._current_annotation.text = sanitized;
  } else {
    this._current_annotation = 
      new annotorious.annotation.Annotation(this._item.src, sanitized, this._annotator.getActiveSelector().getShape());  
  }

  return this._current_annotation;
}

// Export addField API method
annotorious.editor.Editor.prototype['addField'] = annotorious.editor.Editor.prototype.addField;
annotorious.editor.Editor.prototype['getAnnotation'] = annotorious.editor.Editor.prototype.getAnnotation;
