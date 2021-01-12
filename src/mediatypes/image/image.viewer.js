goog.provide('annotorious.mediatypes.image.Viewer');

/**
 * The image viewer - the central entity that manages annotations 
 * displayed for one image.
 * @param {Element} canvas the canvas element 
 * @param {annotorious.mediatypes.image.ImageAnnotator} annotator reference to the annotator
 * @constructor
 */
annotorious.mediatypes.image.Viewer = function (canvas, annotator) {
  /** @private **/
  this._canvas = canvas;

  /** @private **/
  this._annotator = annotator;

  /** @private **/
  this._annotations = [];

  /** @private **/
  this._shapes = [];

  /** @private **/
  this._g2d = this._canvas.getContext('2d');

  /** @private **/
  this._currentAnnotation;

  /** @private **/
  this._eventsEnabled = true;

  /** @private **/
  this._cachedMouseEvent;

  /** @private **/
  this._keepHighlighted = false;

  /** @private **/
  this._colorMode = {
    enabled: false,
    insideAnno: false,
    mode: "active",
    color: "#2ECC71",
    strokeWidth: 2,

    _mouseClick: false,
    _drawnPixels: [],
    _drawnShapes: [],
    _nAnnotations: 0
  };

  /** @private **/
  this._defaultColorMode = Object.assign({}, this._colorMode);

  var self = this;
  goog.events.listen(this._canvas, annotorious.events.ui.EventType.MOVE, function (event) {
    var pixCurs = self._annotator.toItemPixelCoordinates(annotorious.events.ui.sanitizeCoordinates(event, self._canvas));
    if (self._eventsEnabled) self._onMouseMove(event, pixCurs);
    else self._cachedMouseEvent = event;

    self._annotator.fireEvent(annotorious.events.EventType.MOUSE_MOVE_ANNOTATABLE_ITEM, { "cursor": pixCurs }, event);
  });

  goog.events.listen(this._canvas, annotorious.events.ui.EventType.DOWN, function (event) {
    if (self._moveAnnotation || self._rotateAnnotation) {
      var newAnnotation, newShape;

      if (self._moveAnnotation) {
        newAnnotation = Object.assign({}, self._moveAnnotation.annotation);
        newShape = self._moveAnnotation.newShape;
      } else {
        newAnnotation = Object.assign({}, self._rotateAnnotation.annotation);
        newShape = self._rotateAnnotation.newShape;
      }

      var shape = newAnnotation.shapes[0];
      if (shape.units == annotorious.shape.Units.PIXEL) {
        newAnnotation.shapes[0] = annotorious.shape.transform(newShape, function (xy) { return self._annotator.toItemPixelCoordinates(xy); });
      } else {
        newAnnotation.shapes[0] = annotorious.shape.transform(newShape, function (xy) { return self._annotator.toItemCoordinates(xy); });
      }
      self.addAnnotation(this._currentAnnotation, newAnnotation);

      if (self._moveAnnotation) {
        self._annotator.fireEvent(annotorious.events.EventType.ANNOTATION_MOVED, newAnnotation);
        self._moveAnnotation = undefined;
      }
      if (self._rotateAnnotation) {
        self._annotator.fireEvent(annotorious.events.EventType.ANNOTATION_ROTATED, newAnnotation);
        self._rotateAnnotation = undefined;
      }
    }

    if (self._colorMode.enabled) self._colorMode._mouseClick = true;
    if (self._currentAnnotation !== undefined && self._currentAnnotation != false) {
      self._annotator.fireEvent(annotorious.events.EventType.ANNOTATION_CLICKED, self._currentAnnotation);
    }
  });

  annotator.addHandler(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM, function (event) {
    delete self._currentAnnotation;
    self._eventsEnabled = true;
  });

  annotator.addHandler(annotorious.events.EventType.BEFORE_POPUP_HIDE, function () {
    if (!self._eventsEnabled && self._cachedMouseEvent) {
      var mouseX = self._cachedMouseEvent.offsetX;
      var mouseY = self._cachedMouseEvent.offsetY;

      var previousAnnotation = self._currentAnnotation;
      self._currentAnnotation = self.topAnnotationAt(mouseX, mouseY);

      self._eventsEnabled = true;

      if (previousAnnotation != self._currentAnnotation) {
        // Annotation under mouse has changed in the mean time - redraw
        self.redraw();
        self._annotator.fireEvent(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATION,
          { annotation: previousAnnotation, mouseEvent: self._cachedMouseEvent });

        self._annotator.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATION,
          { annotation: self._currentAnnotation, mouseEvent: self._cachedMouseEvent });
      } else {
        if (self._currentAnnotation) {
          // Annotation under mouse is the same - just keep showing the popup
          self._annotator.popup.clearHideTimer();
        }
      }
    } else {
      // Popup is hiding and mouse events are enabled? Must be because 
      // the mouse is outside the annotatable media! Redraw.
      self.redraw();
    }
  });
}

/**
 * Returns the shape of an annotation used by the system
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.mediatypes.image.Viewer.prototype.getSystemShape = function (annotation) {
  return this._shapes[annotorious.shape.hashCode(annotation.shapes[0])]
}

/**
 * Adds an annotation to the viewer.
 * @param {annotorious.Annotation} annotation the annotation
 * @param {annotorious.Annotation=} opt_replace optionally, an existing annotation to replace
 */
annotorious.mediatypes.image.Viewer.prototype.addAnnotation = function (annotation, opt_replace) {
  // Remove opt_replace, if specified
  if (opt_replace) {
    if (opt_replace == this._currentAnnotation)
      delete this._currentAnnotation;

    goog.array.remove(this._annotations, opt_replace);
    delete this._shapes[annotorious.shape.hashCode(opt_replace.shapes[0])];

    annotation = annotation || opt_replace;
  }

  if (this.getSystemShape(annotation)) return; //The new annotation has shapes exactly equals other annotation. Not insert if not delete old annotation.
  this._annotations.push(annotation);

  // The viewer always operates in pixel coordinates for efficiency reasons
  var shape = annotation.shapes[0];
  var self = this;
  if (shape.units == annotorious.shape.Units.PIXEL) {
    //convert the pixel relative from original image size to the pixel system used by the annotatable item.    
    shape = annotorious.shape.transform(shape, function (xy) { return self._annotator.fromItemPixelCoordinates(xy); });
    if (this._annotator.outputUnits == annotorious.shape.Units.FRACTION) {
      annotation.shapes[0] = annotorious.shape.transform(shape, function (xy) { return self._annotator.toItemCoordinates(xy); });
      annotation.shapes[0].units = annotorious.shape.Units.FRACTION;
    }
    this._shapes[annotorious.shape.hashCode(annotation.shapes[0])] = shape;
  } else {
    //convert the fraction to the pixel system used by the annotatable item.
    var viewportShape = annotorious.shape.transform(shape, function (xy) { return self._annotator.fromItemCoordinates(xy); });
    if (this._annotator.outputUnits == annotorious.shape.Units.PIXEL) {
      annotation.shapes[0] = annotorious.shape.transform(viewportShape, function (xy) { return self._annotator.toItemPixelCoordinates(xy); });
      annotation.shapes[0].units = annotorious.shape.Units.PIXEL;
    }
    this._shapes[annotorious.shape.hashCode(annotation.shapes[0])] = viewportShape;
  }

  this.redraw();
}

/**
 * Removes an annotation from the viewer.
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.mediatypes.image.Viewer.prototype.removeAnnotation = function (annotation) {
  if (annotation == this._currentAnnotation)
    delete this._currentAnnotation;

  goog.array.remove(this._annotations, annotation);
  delete this._shapes[annotorious.shape.hashCode(annotation.shapes[0])];
  this.redraw();
}

/**
 * Move an annotation from the viewer.
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.mediatypes.image.Viewer.prototype.moveAnnotation = function (annotation) {
  this._moveAnnotation = { annotation: annotation };
  this._rotateAnnotation = undefined;
}

/**
 * Move an annotation from the viewer.
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.mediatypes.image.Viewer.prototype.rotateAnnotation = function (annotation) {
  this._rotateAnnotation = { annotation: annotation };
  this._moveAnnotation = undefined;
}

/**
 * Returns all annotations in this viewer.
 * @return {Array.<annotorious.Annotation>} the annotations
 */
annotorious.mediatypes.image.Viewer.prototype.getAnnotations = function () {
  return goog.array.clone(this._annotations)
}

/**
 * Highlights a particular annotation in the viewer, or de-highlights (if that's a
 * word...) all, if no annotation is passed to the method.
 * @param {annotorious.Annotation | undefined} opt_annotation the annotation
 */
annotorious.mediatypes.image.Viewer.prototype.highlightAnnotation = function (opt_annotation) {
  this._currentAnnotation = opt_annotation;
  if (opt_annotation)
    this._keepHighlighted = true;
  else
    this._annotator.popup.startHideTimer();

  this.redraw();
  this._eventsEnabled = true;
}

/**
 * Returns the currently highlighted annotation (or 'undefined' if none).
 * @returns {Object} the currently highlighted annotation
 */
annotorious.mediatypes.image.Viewer.prototype.getHighlightedAnnotation = function () {
  return this._currentAnnotation;
}

/**
 * Convenience method returing only the top-most annotation at the specified coordinates.
 * @param {number} px the X coordinate
 * @param {number} py the Y coordinates
 */
annotorious.mediatypes.image.Viewer.prototype.topAnnotationAt = function (px, py) {
  var annotations = this.getAnnotationsAt(px, py);
  if (annotations.length > 0) {
    return annotations[0];
  } else {
    return undefined;
  }
}

/**
 * Returns the annotations at the specified X/Y coordinates.
 * @param {number} px the X coordinate
 * @param {number} py the Y coordinate
 * @return {Array.<annotorious.Annotation>} the annotations sorted by size, smallest first
 */
annotorious.mediatypes.image.Viewer.prototype.getAnnotationsAt = function (px, py) {
  // TODO for large numbers of annotations, we can optimize this
  // using a tree- or grid-like data structure instead of a list
  var intersectedAnnotations = [];

  var self = this;
  goog.array.forEach(this._annotations, function (annotation) {
    if (annotorious.shape.intersects(self._shapes[annotorious.shape.hashCode(annotation.shapes[0])], px, py)) {
      intersectedAnnotations.push(annotation);
    }
  });

  goog.array.sort(intersectedAnnotations, function (a, b) {
    var shape_a = self._shapes[annotorious.shape.hashCode(a.shapes[0])];
    var shape_b = self._shapes[annotorious.shape.hashCode(b.shapes[0])];
    return annotorious.shape.getSize(shape_a) - annotorious.shape.getSize(shape_b);
  });

  return intersectedAnnotations;
}

/**
 * @private
 */
annotorious.mediatypes.image.Viewer.prototype._onMouseMove = function (event, pixCurs) {
  if (this._moveAnnotation || this._rotateAnnotation) {
    this._currentAnnotation = this._moveAnnotation ? this._moveAnnotation.annotation : this._rotateAnnotation.annotation;

    this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);

    var self = this;
    goog.array.forEach(this._annotations, function (annotation) {
      if (annotation != self._currentAnnotation)
        self._draw(self._shapes[annotorious.shape.hashCode(annotation.shapes[0])]);
    });

    if (this._currentAnnotation) {
      var shape = this._shapes[annotorious.shape.hashCode(this._currentAnnotation.shapes[0])];
      var selector = goog.array.find(this._annotator.getAvailableSelectors(), function (selector) {
        var types = selector.getSupportedShapeType();
        return Array.isArray(types) ? goog.array.indexOf(types, shape.type) != -1 : types == shape.type;
      });


      if (selector) {
        if (this._moveAnnotation) this._moveAnnotation.newShape = selector.moveShape(this._g2d, shape, event.offsetX, event.offsetY);
        else this._rotateAnnotation.newShape = selector.rotateShape(this._g2d, shape, event.offsetX, event.offsetY);
      } else console.log('WARNING unsupported shape type: ' + shape.type);
    }
    return;
  }

  var topAnnotation = this.topAnnotationAt(event.offsetX, event.offsetY);
  if (topAnnotation) this._keepHighlighted = this._keepHighlighted && (topAnnotation == this._currentAnnotation);

  if (this._colorMode.enabled && this._colorMode._mouseClick) { /** Color Mode **/
    if (this._colorMode.insideAnno) {
      if (!this._colorMode._annotation) this._colorMode._annotation = this._currentAnnotation || topAnnotation;
      if (!this._currentAnnotation || !topAnnotation || !annotorious.shape.intersects(this._shapes[annotorious.shape.hashCode(this._colorMode._annotation.shapes[0])], event.offsetX, event.offsetY)) return; //can color only selected annotation
    }
    var shape = new annotorious.shape.Shape("point", new annotorious.shape.geom.Point(event.offsetX, event.offsetY), false, { fill: this._colorMode.color, strokeWidth: this._colorMode.strokeWidth })
    var drawnPixel = (this._annotator.outputUnits == annotorious.shape.Units.PIXEL) ? pixCurs : this._annotator.toItemCoordinates(shape.geometry);
    this._colorMode._drawnPixels.push(drawnPixel);
    if (this._colorMode.mode != "release") this._colorMode._drawnShapes.push(shape);
    this._draw(shape);
    return;
  }

  if (this._currentAnnotation) {
    if (this._currentAnnotation != topAnnotation || !this._keepHighlighted) {
      // Mouse moved out of an annotation, into empty space or mouse changed from one annotation to another one 
      this._eventsEnabled = false;
      this._annotator.popup.startHideTimer();
    }
    return;
  }

  // Mouse moved into annotation from empty space - highlight immediately
  this._currentAnnotation = topAnnotation;
  this.redraw();
  this._annotator.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATION,
    { annotation: this._currentAnnotation, mouseEvent: event });
}

/**
 * @param {annotorious.shape.Shape} shape the shape
 * @param {boolean=} highlight set true to highlight the shape
 * @private
 */
annotorious.mediatypes.image.Viewer.prototype._draw = function (shape, highlight) {
  var selector = goog.array.find(this._annotator.getAvailableSelectors(), function (selector) {
    var types = selector.getSupportedShapeType();
    return Array.isArray(types) ? goog.array.indexOf(types, shape.type) != -1 : types == shape.type;
  });

  if (selector)
    selector.drawShape(this._g2d, shape, highlight);
  else
    console.log('WARNING unsupported shape type: ' + shape.type);
}

/**
 * @private
 */
annotorious.mediatypes.image.Viewer.prototype.redraw = function () {
  if (this._colorMode.enabled && this._colorMode._mouseClick) return;
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);

  var self = this;
  goog.array.forEach(this._annotations, function (annotation) {
    if (annotation != self._currentAnnotation)
      self._draw(self._shapes[annotorious.shape.hashCode(annotation.shapes[0])]);
  });

  if (this._currentAnnotation && !this._moveAnnotation && !this._rotateAnnotation) {
    var shape = this._shapes[annotorious.shape.hashCode(this._currentAnnotation.shapes[0])];
    this._draw(shape, true);
    var bbox = annotorious.shape.getBoundingRect(shape).geometry;
    this._annotator.popup.show(this._currentAnnotation, new annotorious.shape.geom.Point(bbox.x, bbox.y + bbox.height + 5));

    // TODO Orientation check - what if the popup would be outside the viewport?
  }

  if (this._colorMode.mode != "release") goog.array.forEach(this._colorMode._drawnShapes, function (shape) {
    self._draw(shape);
  });
}

/**
 * Enable or Disable colorMode
 * @param {Object} colorMode {enabled: false, insideAnno: false, mode: "active", color: "#2ECC71", strokeWidth: 2}
 * - enabled if true, enable the colorMode
 * - insideAnno if true, is possible draw only inside the annotations
 * - mode mode of save the drawn pixels 
 * - color color of pixels
 * - strokeWidth stroke width of pixels [1-12] 
 */
annotorious.mediatypes.image.Viewer.prototype.setColorMode = function (colorMode) {
  if (!(colorMode instanceof Object) || Object.keys(colorMode).length === 0) {
    var mode = this._colorMode.mode;
    this._colorMode = Object.assign({ _listener: this._colorMode._listener }, this._defaultColorMode);
    if (mode === "permanent") this._colorMode.mode = mode;
  }
  else {
    this._colorMode.enabled = colorMode["enabled"];
    this._colorMode.insideAnno = (typeof colorMode["insideAnno"] === "boolean") ? colorMode["insideAnno"] : this._defaultColorMode.insideAnno;
    if (colorMode["mode"] === "permanent" || colorMode["mode"] === "release") this._colorMode.mode = colorMode["mode"];
    else if (this._colorMode.mode !== "permanent") this._colorMode.mode = this._defaultColorMode.mode;
    this._colorMode.color = (colorMode["color"]) ? colorMode["color"] : this._defaultColorMode.color;
    this._colorMode.strokeWidth = (colorMode["strokeWidth"]) ? colorMode["strokeWidth"] : this._defaultColorMode.strokeWidth;
  }

  if (!this._colorMode.enabled) {
    if (this._colorMode._listener) {
      goog.events.unlistenByKey(this._colorMode._listener);
      delete this._colorMode._listener;
    }
    if (this._colorMode.mode === "active") {
      this._colorMode._drawnShapes = [];
      this.redraw();
    }
    this._colorMode._drawnPixels = [];
    this._annotator.showSelectionWidget();
    return;
  }

  if (!this._colorMode._listener) {
    var self = this;
    this._colorMode._listener = goog.events.listen(this._canvas, annotorious.events.ui.EventType.UP, function (event) {
      self._colorMode._mouseClick = false;
      if (self._colorMode._drawnPixels.length > 0) {
        self._annotator.fireEvent(annotorious.events.EventType.DRAWN_PIXELS,
          { "drawnPixels": self._colorMode._drawnPixels, "annotation": self._colorMode._annotation });
      }
      self._colorMode._drawnPixels = [];
      self._colorMode._annotation = undefined;
      self._colorMode._nAnnotations = 0;
      if (self._colorMode.mode === "release") self.redraw();
    });
  }
  this._annotator.hideSelectionWidget();
}