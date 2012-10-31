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
  this._g2d = this._canvas.getContext('2d');

  /** @private **/
  this._currentAnnotation;

  /** @private **/
  this._eventsEnabled = true;

  /** @private **/
  this._cachedMouseEvent;

  var self = this; 
  goog.events.listen(this._canvas, goog.events.EventType.MOUSEMOVE, function(event) {
    if (self._eventsEnabled) {
      self._onMouseMove(event);
    } else {
      self._cachedMouseEvent = event;
    }
  });

  annotator.addHandler(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_MEDIA, function(event) {
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
  this._draw(annotation, '#ffffff', 1);
}

/**
 * Removes an annotation from the viewer.
 * @param {annotorious.annotation.Annotation} the annotation
 */
annotorious.modules.image.Viewer.prototype.removeAnnotation = function(annotation) {
  if (annotation == this._currentAnnotation)
    delete this._currentAnnotation;
    
  goog.array.remove(this._annotations, annotation);
  this._redraw();
  
  this._annotator.fireEvent(annotorious.events.EventType.ANNOTATION_REMOVED,
    { annotation: annotation });
}

/**
 * Highlights a particular annotation in the viewer, or de-highlights (if that's a
 * word...) all, if no annotation is passed to the method.
 * @param {annotorious.annotation.Annotation | undefined} opt_annotation the annotation
 */
annotorious.modules.image.Viewer.prototype.highlightAnnotation = function(opt_annotation) {
  this._currentAnnotation = opt_annotation;
  if (!opt_annotation)
    this._popup.startHideTimer();
  this._redraw();
}

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
  goog.array.forEach(this._annotations, function(annotation, idx, array) {
    if (annotorious.geom.intersects(annotation.shape.geometry, px, py)) {
      intersectedAnnotations.push(annotation);
    }
  });

  goog.array.sort(intersectedAnnotations, function(a, b) {
    return annotorious.geom.size(a.shape.geometry) > annotorious.geom.size(b.shape.geometry);
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
  } else {
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
annotorious.modules.image.Viewer.prototype._draw = function(annotation, color, lineWidth) {
  this._g2d.lineWidth = lineWidth;

  var shape = annotation.shape;
  if (shape.type == annotorious.annotation.ShapeType.POINT) {
    // TODO implement
  } else if (shape.type == annotorious.annotation.ShapeType.POLYGON) {
    // TODO implement
  } else if (shape.type == annotorious.annotation.ShapeType.RECTANGLE) {
    var rect = shape.geometry;
    this._g2d.strokeStyle = '#000000';
    this._g2d.strokeRect(rect.x + 0.5, rect.y + 0.5, rect.width, rect.height);
    this._g2d.strokeStyle = color;
    this._g2d.strokeRect(rect.x + 1.5, rect.y + 1.5, rect.width - 2, rect.height - 2);
  }  
}

/**
 * @private
 */
annotorious.modules.image.Viewer.prototype._redraw = function() {
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
  
  var self = this;
  goog.array.forEach(this._annotations, function(annotation, idx, array) {
    self._draw(annotation, '#ffffff', 1);
  });
    
  if (this._currentAnnotation) {
    this._draw(this._currentAnnotation, '#fff000', 1.2);
        
    // TODO need to introduce a bbox property that's supported by every shape type
    // Currently the shape.geometry will always be a yuma.geom.Rectangle
    var bbox = this._currentAnnotation.shape.geometry;
    this._popup.show(this._currentAnnotation, bbox.x, bbox.y + bbox.height + 5);

    // TODO Orientation check - what if the popup would be outside the viewport?
  }
}
