goog.provide('annotorious.mediatypes.image.Viewer');

/**
 * The image viewer - the central entity that manages annotations 
 * displayed for one image.
 * @param {Element} canvas the canvas element 
 * @param {annotorious.Popup} popup the popup to use in this viewer
 * @param {annotorious.mediatypes.image.ImageAnnotator} annotator reference to the annotator
 * @constructor
 */
annotorious.mediatypes.image.Viewer = function(canvas, popup, annotator) {
  /** @private **/
  this._canvas = canvas;

  /** @private **/
  this._popup = popup;
  
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

  var self = this; 
  goog.events.listen(this._canvas, annotorious.events.ui.EventType.MOVE, function(event) {
    if (self._eventsEnabled) {
      self._onMouseMove(event);
    } else {
      self._cachedMouseEvent = event;
    }
  });

  annotator.addHandler(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM, function(event) {
    delete self._currentAnnotation;
    self._eventsEnabled = true;
  });

  annotator.addHandler(annotorious.events.EventType.BEFORE_POPUP_HIDE, function() {
    if (!self._eventsEnabled && self._cachedMouseEvent) {
      var mouseX = self._cachedMouseEvent.offsetX;
      var mouseY = self._cachedMouseEvent.offsetY;
            
      var previousAnnotation = self._currentAnnotation;
      self._currentAnnotation = self.topAnnotationAt(mouseX, mouseY);
      self._eventsEnabled = true;
          
      if (previousAnnotation != self._currentAnnotation) {
        // Annotation under mouse has changed in the mean time - redraw
        self._redraw();
        self._annotator.fireEvent(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATION,
          { annotation: previousAnnotation, mouseEvent: self._cachedMouseEvent });
  
        self._annotator.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATION,
          { annotation: self._currentAnnotation, mouseEvent: self._cachedMouseEvent });
      } else {
        if (self._currentAnnotation) {
          // Annotation under mouse is the same - just keep showing the popup
          self._popup.clearHideTimer();
        }
      }
    } else {
      // Popup is hiding and mouse events are enabled? Must be because 
      // the mouse is outside the annotatable media! Redraw.
      self._redraw();
    }
  });
}

/**
 * Adds an annotation to the viewer.
 * @param {annotorious.Annotation} annotation the annotation
 * @param {annotorious.Annotation=} opt_replace optionally, an existing annotation to replace
 */
annotorious.mediatypes.image.Viewer.prototype.addAnnotation = function(annotation, opt_replace) {
  // Remove opt_replace, if specified
  if (opt_replace) {
    if (opt_replace == this._currentAnnotation)
      delete this._currentAnnotation;
   
      goog.array.remove(this._annotations, opt_replace);
      delete this._shapes[annotorious.shape.hashCode(opt_replace.shapes[0])];
  }

  this._annotations.push(annotation);
  
  // The viewer always operates in pixel coordinates for efficiency reasons
  var shape = annotation.shapes[0];
  if (shape.units == annotorious.shape.Units.PIXEL) {
    this._shapes[annotorious.shape.hashCode(annotation.shapes[0])] = shape;     
  } else {
    var self = this;
    var viewportShape = annotorious.shape.transform(shape, function(xy) {
      return self._annotator.fromItemCoordinates(xy); 
    });
    this._shapes[annotorious.shape.hashCode(annotation.shapes[0])] = viewportShape;
  }

  this._redraw();
}

/**
 * Removes an annotation from the viewer.
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.mediatypes.image.Viewer.prototype.removeAnnotation = function(annotation) {
  if (annotation == this._currentAnnotation)
    delete this._currentAnnotation;
   
  goog.array.remove(this._annotations, annotation);
  delete this._shapes[annotorious.shape.hashCode(annotation.shapes[0])];
  this._redraw();
}

/**
 * Returns all annotations in this viewer.
 * @return {Array.<annotorious.Annotation>} the annotations
 */
annotorious.mediatypes.image.Viewer.prototype.getAnnotations = function() {
  return goog.array.clone(this._annotations) 
}

/**
 * Highlights a particular annotation in the viewer, or de-highlights (if that's a
 * word...) all, if no annotation is passed to the method.
 * @param {annotorious.Annotation | undefined} opt_annotation the annotation
 */
annotorious.mediatypes.image.Viewer.prototype.highlightAnnotation = function(opt_annotation) {
  this._currentAnnotation = opt_annotation;

  if (opt_annotation)
    this._keepHighlighted = true;
  else
    this._popup.startHideTimer();
    
  this._redraw();
  this._eventsEnabled = true;
}

/**
 * Returns the currently highlighted annotation (or 'undefined' if none).
 * @returns {Object} the currently highlighted annotation
 */
annotorious.mediatypes.image.Viewer.prototype.getHighlightedAnnotation = function() {
  return this._currentAnnotation;
}

/**
 * Convenience method returing only the top-most annotation at the specified coordinates.
 * @param {number} px the X coordinate
 * @param {number} py the Y coordinates
 */
annotorious.mediatypes.image.Viewer.prototype.topAnnotationAt = function(px, py) {
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
annotorious.mediatypes.image.Viewer.prototype.getAnnotationsAt = function(px, py) {
  // TODO for large numbers of annotations, we can optimize this
  // using a tree- or grid-like data structure instead of a list
  var intersectedAnnotations = [];

  var self = this;
  goog.array.forEach(this._annotations, function(annotation) {
    if (annotorious.shape.intersects(self._shapes[annotorious.shape.hashCode(annotation.shapes[0])], px, py)) {
      intersectedAnnotations.push(annotation);
    }
  });

  goog.array.sort(intersectedAnnotations, function(a, b) {
    var shape_a = self._shapes[annotorious.shape.hashCode(a.shapes[0])];
    var shape_b = self._shapes[annotorious.shape.hashCode(b.shapes[0])];
    return  annotorious.shape.getSize(shape_a) - annotorious.shape.getSize(shape_b);
  });
  
  return intersectedAnnotations;
}

/**
 * @private
 */
annotorious.mediatypes.image.Viewer.prototype._onMouseMove = function(event) {
  var topAnnotation = this.topAnnotationAt(event.offsetX, event.offsetY);
    
  // TODO remove code duplication

  var self = this;
  if (topAnnotation) {
    this._keepHighlighted = this._keepHighlighted && (topAnnotation == this._currentAnnotation);

    if (!this._currentAnnotation) {
      // Mouse moved into annotation from empty space - highlight immediately
      this._currentAnnotation = topAnnotation;
      this._redraw();
      this._annotator.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATION,
        { annotation: this._currentAnnotation, mouseEvent: event });   
    } else if (this._currentAnnotation != topAnnotation) {
      // Mouse changed from one annotation to another one
      this._eventsEnabled = false;
      this._popup.startHideTimer();
    }
  } else if (!this._keepHighlighted) {
    if (this._currentAnnotation) {
      // Mouse moved out of an annotation, into empty space  
      this._eventsEnabled = false;
      this._popup.startHideTimer();
    }
  }
}

/**
 * @param {annotorious.shape.Shape} shape the shape
 * @param {boolean=} highlight set true to highlight the shape
 * @private
 */
annotorious.mediatypes.image.Viewer.prototype._draw = function(shape, highlight) {
  var selector = goog.array.find(this._annotator.getAvailableSelectors(), function(selector) {
    return selector.getSupportedShapeType() == shape.type;
  });  

  if (selector)
    selector.drawShape(this._g2d, shape, highlight);
  else
    console.log('WARNING unsupported shape type: ' + shape.type);
}

/**
 * @private
 */
annotorious.mediatypes.image.Viewer.prototype._redraw = function() {
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);

  var self = this;
  goog.array.forEach(this._annotations, function(annotation) {
    self._draw(self._shapes[annotorious.shape.hashCode(annotation.shapes[0])]);
  });
    
  if (this._currentAnnotation) {
    var shape = this._shapes[annotorious.shape.hashCode(this._currentAnnotation.shapes[0])];
    this._draw(shape, true);
    var bbox = annotorious.shape.getBoundingRect(shape).geometry;
    this._popup.show(this._currentAnnotation, new annotorious.shape.geom.Point(bbox.x, bbox.y + bbox.height + 5));

    // TODO Orientation check - what if the popup would be outside the viewport?
  }
}
