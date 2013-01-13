goog.provide('annotorious.modules.image.Viewer');

goog.require('goog.soy');
goog.require('goog.events');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');

/**
 * The image viewer - the central entity that manages annotations 
 * displayed for one image.
 * @param {element} canvas the canvas element 
 * @param {annotorious.viewer.Popup} the popup to use in this viewer
 * @param {annotorious.modules.image.ImageAnnotator} annotator reference to the annotator
 * @constructor
 */
annotorious.modules.image.Viewer = function(canvas, popup, annotator) {
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
  goog.events.listen(this._canvas, goog.events.EventType.MOUSEMOVE, function(event) {
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
 * @param {annotorious.annotation.Annotation} the annotation
 */
annotorious.modules.image.Viewer.prototype.addAnnotation = function(annotation) {
  this._annotations.push(annotation);
  
  // The viewer operates in pixel coordinates for efficiency reasons
  var shape = annotation.shapes[0];
  if (shape.units == annotorious.shape.Units.PIXEL) {
    this._shapes[goog.getUid(annotation)] = shape;     
    this._draw(shape);
  } else {
    var self = this;
    var viewportShape = annotorious.shape.transform(shape, function(xy) {
      return self._annotator.fromItemCoordinates(xy); 
    });

    this._shapes[goog.getUid(annotation)] = viewportShape;
    this._draw(viewportShape);
  }
}

/**
 * Removes an annotation from the viewer.
 * @param {annotorious.annotation.Annotation} the annotation
 */
annotorious.modules.image.Viewer.prototype.removeAnnotation = function(annotation) {
  if (annotation == this._currentAnnotation)
    delete this._currentAnnotation;
   
  goog.array.remove(this._annotations, annotation);
  delete this._shapes[goog.getUid(annotation)]
  this._redraw();
}

/**
 * Returns all annotations in this viewer.
 * @return {Array.<Annotation>} the annotations
 */
annotorious.modules.image.Viewer.prototype.getAnnotations = function() {
  return this._annotations;
}

/**
 * Highlights a particular annotation in the viewer, or de-highlights (if that's a
 * word...) all, if no annotation is passed to the method.
 * @param {annotorious.annotation.Annotation | undefined} opt_annotation the annotation
 */
annotorious.modules.image.Viewer.prototype.highlightAnnotation = function(opt_annotation) {
  this._currentAnnotation = opt_annotation;

  if (!opt_annotation)
    this._keepHighlighted = true;
  else
    this._popup.startHideTimer();
    
  this._redraw();
}

/**
 * Returns the currently highlighted annotation (or 'undefined' if none).
 * @returns {object} the currently highlighted annotation
 */
annotorious.modules.image.Viewer.prototype.getHighlightedAnnotation = function() {
  return this._currentAnnotation;
}

/**
 * Convenience method returing only the top-most annotation at the specified coordinates.
 * @param {number} px the X coordinate
 * @param {number} py the Y coordinates
 */
annotorious.modules.image.Viewer.prototype.topAnnotationAt = function(px, py) {
  var annotationsAt = this.annotationsAt(px, py);
  if (annotationsAt.length > 0) {
    return annotationsAt[0];
  } else {
    return undefined;
  }
}

/**
 * Returns the annotations at the specified X/Y coordinates.
 * @param {number} px the X coordinate
 * @param {number} py the Y coordinate
 * @return {Array.<annotorious.annotation.Annotation>} the annotations sorted by size, smallest first
 */
annotorious.modules.image.Viewer.prototype.annotationsAt = function(px, py) {
  // TODO for large numbers of annotations, we can optimize this
  // using a tree- or grid-like data structure instead of a list
  var intersectedAnnotations = [];

  var self = this;
  goog.array.forEach(this._annotations, function(annotation) {
    if (annotorious.shape.intersects(self._shapes[goog.getUid(annotation)], px, py)) {
      intersectedAnnotations.push(annotation);
    }
  });

  goog.array.sort(intersectedAnnotations, function(a, b) {
    return annotorious.shape.size(a.shapes[0]) > annotorious.shape.size(b.shapes[0]);
  });
  
  return intersectedAnnotations;
}

/**
 * @private
 */
annotorious.modules.image.Viewer.prototype._onMouseMove = function(event) {
  var topAnnotation = this.topAnnotationAt(event.offsetX, event.offsetY);
    
  // TODO remove code duplication

  var self = this;
  if (topAnnotation) {
    this._keepHighlighted = false;

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
 * @private
 */
annotorious.modules.image.Viewer.prototype._draw = function(shape, highlight) {
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
annotorious.modules.image.Viewer.prototype._redraw = function() {
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);

  var self = this;
  goog.array.forEach(this._annotations, function(annotation) {
    self._draw(self._shapes[goog.getUid(annotation)]);
  });
    
  if (this._currentAnnotation) {
    var shape = this._shapes[goog.getUid(this._currentAnnotation)];
    this._draw(shape, true);
    var bbox = annotorious.shape.getBoundingRect(shape);
    this._popup.show(this._currentAnnotation, { x: bbox.x, y: bbox.y + bbox.height + 5 });

    // TODO Orientation check - what if the popup would be outside the viewport?
  }
}
