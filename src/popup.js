goog.provide('annotorious.Popup');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');
goog.require('goog.style');

/**
 * A popup bubble widget to show annotation details.
 * @param {Object} annotator reference to the annotator
 * @constructor
 */
annotorious.Popup = function (annotator) {
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

  /** @private **/
  this._properties = {
    extraFields: undefined
  };

  /** @private **/
  this._defaultProperties = JSON.parse(JSON.stringify(this._properties));

  var btnEdit = goog.dom.query('.annotorious-popup-button-edit', this._buttons)[0];
  var btnDelete = goog.dom.query('.annotorious-popup-button-delete', this._buttons)[0];
  this._btnMove = goog.dom.query('.annotorious-popup-button-move', this._buttons)[0];
  this._btnRotate = goog.dom.query('.annotorious-popup-button-rotate', this._buttons)[0];

  var self = this;
  goog.events.listen(btnEdit, goog.events.EventType.MOUSEOVER, function (event) {
    goog.dom.classes.add(btnEdit, 'annotorious-popup-button-active');
  });

  goog.events.listen(btnEdit, goog.events.EventType.MOUSEOUT, function () {
    goog.dom.classes.remove(btnEdit, 'annotorious-popup-button-active');
  });

  goog.events.listen(btnEdit, goog.events.EventType.CLICK, function (event) {
    goog.style.setOpacity(self.element, 0);
    goog.style.setStyle(self.element, 'pointer-events', 'none');
    annotator.editAnnotation(self._currentAnnotation);
  });

  goog.events.listen(btnDelete, goog.events.EventType.MOUSEOVER, function (event) {
    goog.dom.classes.add(btnDelete, 'annotorious-popup-button-active');
  });

  goog.events.listen(btnDelete, goog.events.EventType.MOUSEOUT, function () {
    goog.dom.classes.remove(btnDelete, 'annotorious-popup-button-active');
  });

  goog.events.listen(btnDelete, goog.events.EventType.CLICK, function (event) {
    var cancelEvent = annotator.fireEvent(annotorious.events.EventType.BEFORE_ANNOTATION_REMOVED, self._currentAnnotation);
    if (!cancelEvent) {
      goog.style.setOpacity(self.element, 0);
      goog.style.setStyle(self.element, 'pointer-events', 'none');
      annotator.removeAnnotation(self._currentAnnotation);
      annotator.fireEvent(annotorious.events.EventType.ANNOTATION_REMOVED, self._currentAnnotation);
    }
  });

  goog.events.listen(self._btnMove, goog.events.EventType.MOUSEOVER, function (event) {
    goog.dom.classes.add(self._btnMove, 'annotorious-popup-button-active');
  });

  goog.events.listen(self._btnMove, goog.events.EventType.MOUSEOUT, function () {
    goog.dom.classes.remove(self._btnMove, 'annotorious-popup-button-active');
  });

  goog.events.listen(self._btnMove, goog.events.EventType.CLICK, function (event) {
    goog.style.setOpacity(self.element, 0);
    goog.style.setStyle(self.element, 'pointer-events', 'none');
    annotator.moveAnnotation(self._currentAnnotation);
  });

  goog.events.listen(self._btnRotate, goog.events.EventType.MOUSEOVER, function (event) {
    goog.dom.classes.add(self._btnRotate, 'annotorious-popup-button-active');
  });

  goog.events.listen(self._btnRotate, goog.events.EventType.MOUSEOUT, function () {
    goog.dom.classes.remove(self._btnRotate, 'annotorious-popup-button-active');
  });

  goog.events.listen(self._btnRotate, goog.events.EventType.CLICK, function (event) {
    goog.style.setOpacity(self.element, 0);
    goog.style.setStyle(self.element, 'pointer-events', 'none');
    annotator.rotateAnnotation(self._currentAnnotation);
  });

  if (annotorious.events.ui.hasMouse) {
    goog.events.listen(this.element, goog.events.EventType.MOUSEOVER, function (event) {
      window.clearTimeout(self._buttonHideTimer);
      if (goog.style.getStyle(self._buttons, 'opacity') < 0.9)
        goog.style.setOpacity(self._buttons, 0.9);
      self.clearHideTimer();
    });

    goog.events.listen(this.element, goog.events.EventType.MOUSEOUT, function (event) {
      goog.style.setOpacity(self._buttons, 0);
      self.startHideTimer();
    });

    annotator.addHandler(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM, function (event) {
      self.startHideTimer();
    });
  }

  goog.style.setOpacity(this._buttons, 0);
  goog.style.setOpacity(this.element, 0);
  goog.style.setStyle(this.element, 'pointer-events', 'none');
  goog.dom.appendChild(annotator.element, this.element);
}

/**
 * Adds a field to the popup GUI widget. A field can be either an (HTML) string, or
 * a function that takes an Annotation as argument and returns an (HTML) string or
 * a DOM element.
 * @param {string | Function} field the field
 */
annotorious.Popup.prototype.addField = function (field) {
  var fieldEl = goog.dom.createDom('div', 'annotorious-popup-field');

  if (goog.isString(field)) {
    fieldEl.innerHTML = field;
  } else if (goog.isFunction(field)) {
    this._extraFields.push({ el: fieldEl, fn: field });
  } else if (goog.dom.isElement(field)) {
    goog.dom.appendChild(fieldEl, field);
  }

  goog.dom.appendChild(this.element, fieldEl);
}

/**
 * Start the popup hide timer.
 */
annotorious.Popup.prototype.startHideTimer = function () {
  this._cancelHide = false;
  if (!this._popupHideTimer) {
    var self = this;
    this._popupHideTimer = window.setTimeout(function () {
      self._annotator.fireEvent(annotorious.events.EventType.BEFORE_POPUP_HIDE, self);
      if (!self._cancelHide) {
        goog.style.setOpacity(self.element, 0.0);
        goog.style.setStyle(self.element, 'pointer-events', 'none');
        goog.style.setOpacity(self._buttons, 0.9);
        delete self._popupHideTimer;
      }
    }, 150);
  }
}

/**
 * Clear the popup hide timer.
 */
annotorious.Popup.prototype.clearHideTimer = function () {
  this._cancelHide = true;
  if (this._popupHideTimer) {
    window.clearTimeout(this._popupHideTimer);
    delete this._popupHideTimer;
  }
}

/**
 * Show the popup, loaded with the specified annotation, at the specified coordinates.
 * @param {annotorious.Annotation} annotation the annotation
 * @param {annotorious.shape.geom.Point} xy the viewport coordinate
 */
annotorious.Popup.prototype.show = function (annotation, xy) {
  this.clearHideTimer();

  if (xy)
    this.setPosition(xy);

  if (annotation)
    this.setAnnotation(annotation);

  if (this._buttonHideTimer)
    window.clearTimeout(this._buttonHideTimer);

  goog.style.setOpacity(this._buttons, 0.9);

  if (annotorious.events.ui.hasMouse) {
    var self = this;
    this._buttonHideTimer = window.setTimeout(function () {
      goog.style.setOpacity(self._buttons, 0);
    }, 1000);
  }

  goog.style.setOpacity(this.element, 0.9);
  goog.style.setStyle(this.element, 'pointer-events', 'auto');
  this._annotator.fireEvent(annotorious.events.EventType.POPUP_SHOWN, this._currentAnnotation);
}

/**
 * Set the position of the popup.
 * @param {annotorious.shape.geom.Point} xy the viewport coordinate
 */
annotorious.Popup.prototype.setPosition = function (xy) {
  goog.style.setPosition(this.element, new goog.math.Coordinate(xy.x, xy.y));
}

/**
 * Set the annotation for the popup.
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.Popup.prototype.setAnnotation = function (annotation) {
  this._currentAnnotation = annotation;
  if (annotation.text)
    this._text.innerHTML = annotation.text.replace(/\n/g, '<br/>');
  else
    this._text.innerHTML = '<span class="annotorious-popup-empty">No comment</span>';

  if (('editable' in annotation) && annotation.editable == false)
    goog.style.showElement(this._buttons, false);
  else
    goog.style.showElement(this._buttons, true);

  if (annotation.shapes[0].type != annotorious.shape.ShapeType.RECTANGLE ||
    ('movable' in annotation) && annotation.movable == false) {
    goog.style.showElement(this._btnMove, false);
  }
  else goog.style.showElement(this._btnMove, true);

  if (annotation.shapes[0].type != annotorious.shape.ShapeType.RECTANGLE ||
    ('rotable' in annotation) && annotation.rotable == false) {
    goog.style.showElement(this._btnRotate, false);
  }
  else goog.style.showElement(this._btnRotate, true);

  // Update extra fields (if any)
  goog.array.forEach(this._extraFields, function (field) {
    var f = field.fn(annotation);
    if (goog.isString(f)) {
      field.el.innerHTML = f;
    } else if (goog.dom.isElement(f)) {
      goog.dom.removeChildren(field.el);
      goog.dom.appendChild(field.el, f);
    }
  });
}

/**
 * Sets the properties on this popup.
 */
annotorious.Popup.prototype.setProperties = function (props) {
  if (!(props instanceof Object) || Object.keys(props).length === 0) this._properties = JSON.parse(JSON.stringify(this._defaultProperties));
  else {
    if (props.hasOwnProperty('extraFields')) this._properties.extraFields = props["extraFields"];
  }

  //Apply the properties    
  var container = goog.dom.query('.annotorious-popup-field', this.element)[0];
  if (container) container.remove();
  if (this._properties.extraFields && Array.isArray(this._properties.extraFields)) {
    var self = this;
    goog.array.forEach(this._properties.extraFields, function (field) {
      self.addField(field);
    });
  }
}

/** API exports **/
annotorious.Popup.prototype['addField'] = annotorious.Popup.prototype.addField;
