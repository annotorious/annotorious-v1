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
  this.element = goog.soy.renderAsElement(annotorious.templates.popup);

  /** @private **/
  this._annotator = annotator;  
    
  /** @private **/
  this._currentAnnotation;

  /** @private **/
  this._text = goog.dom.query('.annotorious-popup-text', this.element)[0];

  /** @private **/
  this._buttons = goog.dom.query('.annotorious-popup-buttons', this.element)[0];
  
  /** @private **/
  this._popupHideTimer;
  
  /** @private **/
  this._buttonHideTimer;

  /** @private **/
  this._cancelHide = false;

  /** @private **/
  this._extraFields = [];

  var btnEdit = goog.dom.query('.annotorious-popup-button-edit', this._buttons)[0];
  goog.style.setOpacity(btnEdit, 0.4);

  var btnDelete = goog.dom.query('.annotorious-popup-button-delete', this._buttons)[0];
  goog.style.setOpacity(btnDelete, 0.4);

  var self = this;
  goog.events.listen(btnDelete, goog.events.EventType.CLICK, function(event) {
    goog.style.setOpacity(self.element, 0.0);
    goog.style.setStyle(self.element, 'pointer-events', 'none');
    annotator.fireEvent(annotorious.events.EventType.ANNOTATION_REMOVED, self._currentAnnotation);
    annotator.removeAnnotation(self._currentAnnotation);
  });
  
  goog.events.listen(this._buttons, goog.events.EventType.MOUSEOVER, function(event) {
    goog.style.setOpacity(self._buttons, 1.0);
  });
  
  goog.events.listen(this._buttons, goog.events.EventType.MOUSEOUT, function() {
    goog.style.setOpacity(self._buttons, 0.4);
  });
  
  goog.events.listen(this.element, goog.events.EventType.MOUSEOVER, function(event) {
    window.clearTimeout(self._buttonHideTimer);
    if (goog.style.getStyle(self._buttons, 'opacity') < 0.4)
      goog.style.setOpacity(self._buttons, 0.4);
    self.clearHideTimer();
  });
  
  goog.events.listen(this.element, goog.events.EventType.MOUSEOUT, function(event) {
    goog.style.setOpacity(self._buttons, 0);
    self.startHideTimer();
  });

  annotator.addHandler(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_MEDIA, function(event) {
    self.startHideTimer();
  });
    
  goog.style.setOpacity(this._buttons, 0.0);
  goog.style.setOpacity(this.element, 0.0);
  goog.style.setStyle(this.element, 'pointer-events', 'none');
  goog.dom.appendChild(parentEl, this.element);
}

/**
 * Adds a field to the popup GUI widget. A field can be either a string (containing
 * HTML) or a function that takes an Annotation as argument and returns an (HTML) string.
 * @param {string | function} field the field
 */
annotorious.viewer.Popup.prototype.addField = function(field) {
  var fieldEl = goog.dom.createDom('div', 'annotorious-popup-field');
  
  if (goog.isString(field))  {
    fieldEl.innerHTML = field;
  } else if (goog.isFunction(field)) {
    this._extraFields.push({el: fieldEl, fn: field});
  }

  goog.dom.appendChild(this.element, fieldEl);
}

/**
 * Start the popup hide timer.
 */
annotorious.viewer.Popup.prototype.startHideTimer = function() {
  this._cancelHide = false;
  if (!this._popupHideTimer) {
    var self = this;
    this._popupHideTimer = window.setTimeout(function() {
      self._annotator.fireEvent(annotorious.events.EventType.BEFORE_POPUP_HIDE, self);
      if (!self._cancelHide) {
        goog.style.setOpacity(self.element, 0.0);
        goog.style.setStyle(self.element, 'pointer-events', 'none');
        goog.style.setOpacity(self._buttons, 0.8);
        delete self._popupHideTimer;
      }
    }, 300);
  }
}

/**
 * Clear the popup hide timer.
 */
annotorious.viewer.Popup.prototype.clearHideTimer = function() {
  this._cancelHide = true;
  if (this._popupHideTimer) {
    window.clearTimeout(this._popupHideTimer);
    delete this._popupHideTimer;
  }
}

/**
 * Show the popup, loaded with the specified annotation, at the specified coordinates.
 * @param {Object} annotation the annotation
 * @param {annotorious.geom.Point} xy the viewport coordinate
 */
annotorious.viewer.Popup.prototype.show = function(annotation, xy) {
  this.clearHideTimer();
  
  if (annotation && xy) {
    // New annotation and position - reset
    this._currentAnnotation = annotation;
    if (annotation.text)
      this._text.innerHTML = annotation.text;
    else
      this._text.innerHTML = '<span class="annotorious-popup-empty">No comment</span>';

    if (('editable' in annotation) && annotation.editable == false)
      goog.style.showElement(this._buttons, false);
    else
      goog.style.showElement(this._buttons, true);

    this.setPosition(xy);
    
    if (this._buttonHideTimer)
      window.clearTimeout(this._buttonHideTimer);
      
    goog.style.setOpacity(this._buttons, 0.8);
    var self = this;
    this._buttonHideTimer = window.setTimeout(function() {
      goog.style.setOpacity(self._buttons, 0);
    }, 1000);

    // Update extra fields (if any)
    goog.array.forEach(this._extraFields, function(field) {
      field.el.innerHTML = field.fn(annotation);
    });
  }

  goog.style.setOpacity(this.element, 0.9);
  goog.style.setStyle(this.element, 'pointer-events', 'auto');
}

/**
 * Set the position of the popup.
 * @param {annotorious.geom.Point} xy the viewport coordinate
 */
annotorious.viewer.Popup.prototype.setPosition = function(xy) {
  goog.style.setPosition(this.element, new goog.math.Coordinate(xy.x, xy.y));
}

// Export addField method
annotorious.viewer.Popup.prototype['addField'] = annotorious.viewer.Popup.prototype.addField;

