goog.provide('annotorious.Editor');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.soy');
goog.require('goog.string.html.htmlSanitize');
goog.require('goog.style');
goog.require('goog.ui.Textarea');

goog.require('annotorious.templates');

/**
 * Annotation edit form.
 * @param {Object} annotator reference to the annotator
 * @constructor
 */
annotorious.Editor = function (annotator) {
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
  this._textarea = new goog.ui.Textarea('');

  /** @private **/
  this._btnCancel = goog.dom.query('.annotorious-editor-button-cancel', this.element)[0];

  /** @private **/
  this._btnSave = goog.dom.query('.annotorious-editor-button-save', this.element)[0];

  /** @private **/
  this._btnContainer = goog.dom.getParentElement(this._btnSave);

  /** @private **/
  this._extraFields = [];

  /** @private **/
  this._useSelect = false;

  var self = this;
  goog.events.listen(this._btnCancel, goog.events.EventType.CLICK, function (event) {
    event.preventDefault();
    annotator.stopSelection(self._original_annotation);
    self.close();
  });

  goog.events.listen(this._btnSave, goog.events.EventType.CLICK, function (event) {
    event.preventDefault();
    if (self._useSelect && self._select.options[0].disabled && (self._select.selectedIndex == 0 || !self._select.value)) return; //Not is possible set empty text.

    var oldText = (self._original_annotation) ? { "text": self._original_annotation.text, "textId": self._original_annotation.textId } : undefined;

    var annotation = self.getAnnotation();
    annotator.addAnnotation(annotation);
    annotator.stopSelection();

    if (self._original_annotation)
      annotator.fireEvent(annotorious.events.EventType.ANNOTATION_UPDATED, annotation, oldText);
    else
      annotator.fireEvent(annotorious.events.EventType.ANNOTATION_CREATED, annotation, annotator.getItem());
    self.close();
  });

  goog.style.showElement(this.element, false);
  goog.dom.appendChild(annotator.element, this.element);
  this._textarea.decorate(goog.dom.query('.annotorious-editor-text', this.element)[0]);
  annotorious.dom.makeHResizable(this.element, function () { self._textarea.resize(); });
}

/**
 * Adds a field to the editor GUI widget. A field can be either an (HTML) string, or
 * a function that takes an Annotation as argument and returns an (HTML) string or
 * a DOM element.
 * @param {string | Function} field the field
 */
annotorious.Editor.prototype.addField = function (field) {
  var fieldEl = goog.dom.createDom('div', 'annotorious-editor-field');

  if (goog.isString(field)) {
    fieldEl.innerHTML = field;
  } else if (goog.isFunction(field)) {
    this._extraFields.push({ el: fieldEl, fn: field });
  } else if (goog.dom.isElement(field)) {
    goog.dom.appendChild(fieldEl, field);
  }

  goog.dom.insertSiblingBefore(fieldEl, this._btnContainer);
}

/**
 * Opens the edit form with an annotation.
 * @param {annotorious.Annotation=} opt_annotation the annotation to edit (or undefined)
 * @param {Object=} opt_event the event, if any 
 */
annotorious.Editor.prototype.open = function (opt_annotation, opt_event) {
  this._annotator.fireEvent(annotorious.events.EventType.BEFORE_EDITOR_SHOWN, opt_annotation);

  this._original_annotation = opt_annotation;
  this._current_annotation = opt_annotation;

  goog.style.showElement(this.element, true);
  if (!this._useSelect) {
    if (opt_annotation) this._textarea.setValue(opt_annotation.text);
    this._textarea.getElement().focus();
  }
  else {
    if (opt_annotation && this._select.innerHTML.indexOf('value="' + opt_annotation.text + '"') > -1) this._select.value = opt_annotation.text;
    else this._select.options[0].selected = true;
  }

  // Update extra fields (if any)
  goog.array.forEach(this._extraFields, function (field) {
    var f = field.fn(opt_annotation);
    if (goog.isString(f)) {
      field.el.innerHTML = f;
    } else if (goog.dom.isElement(f)) {
      goog.dom.removeChildren(field.el);
      goog.dom.appendChild(field.el, f);
    }
  });
  this._annotator.fireEvent(annotorious.events.EventType.EDITOR_SHOWN, opt_annotation);
}

/**
 * Closes the editor.
 */
annotorious.Editor.prototype.close = function () {
  goog.style.showElement(this.element, false);
  if (!this._useSelect) this._textarea.setValue('');
  else this._select.value = "";
}

/**
 * Sets the position (i.e. CSS left/top value) of the editor element.
 * @param {annotorious.shape.geom.Point} xy the viewport coordinate
 */
annotorious.Editor.prototype.setPosition = function (xy) {
  goog.style.setPosition(this.element, xy.x, xy.y);
}

/**
 * Returns the annotation that is the current state of the editor.
 * @return {annotorious.Annotation} the annotation
 */
annotorious.Editor.prototype.getAnnotation = function () {
  var sanitized = goog.string.html.htmlSanitize((this._useSelect ? this._select.value : this._textarea.getValue()), function (url) {
    return url;
  });

  var textId = (this._useSelect) ? this._select.options[this._select.selectedIndex].getAttribute("valueid") : undefined;

  if (this._current_annotation) {
    this._current_annotation.text = sanitized;
    this._current_annotation.textId = textId;
  } else {
    this._current_annotation =
      new annotorious.Annotation(
        this._item.src,
        sanitized,
        this._annotator.getActiveSelector().getShape(),
        undefined,
        textId
      );
  }

  return this._current_annotation;
}

/** 
 * Enables (or disables) the ability to use select (dropdown menu) instead of textarea
 * @param {Object} selectEditor {enabled:bool, options:array[Object], emptyOption:bool, customLabel:string} if is enabled, options of select, true to enable the empty select option, the custom first label if not use empty options
 */
annotorious.Editor.prototype.setSelectEditor = function (selectEditor) {
  this._useSelect = (selectEditor && selectEditor instanceof Object && selectEditor["enabled"] && Array.isArray(selectEditor["options"])) ? true : false;

  if (!this._useSelect) {
    this._textarea.removeClassName("d-none");
    if (this._select) {
      this._select.remove();
      delete this._select;
    }
    return;
  }

  this._textarea.addClassName("d-none");
  if (!this._select) {
    this._select = document.createElement("select");
    this._select.classList.add("annotorious-editor-text");
  } else this._select.innerHTML = "";

  var self = this;
  var newOptions = selectEditor["options"].slice();
  newOptions.unshift({ "value": "" })
  goog.array.forEach(newOptions, function (option) {
    var opt = new Option(option["value"], option["value"]);
    if (option["id"]) {
      var attr = document.createAttribute("valueid");
      attr.value = option["id"];
      opt.setAttributeNode(attr);
    }
    self._select.appendChild(opt);
  });

  if (!selectEditor["emptyOption"]) {
    this._select.options[0].disabled = true;
    this._select.options[0].innerHTML = selectEditor["customLabel"] || "<--- Select one option --->"
  }
  goog.dom.insertSiblingBefore(this._select, this._btnContainer);
}

/** API exports **/
annotorious.Editor.prototype['addField'] = annotorious.Editor.prototype.addField;
annotorious.Editor.prototype['getAnnotation'] = annotorious.Editor.prototype.getAnnotation;
