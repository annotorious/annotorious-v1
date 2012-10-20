goog.provide('yuma.modules.image.Viewer');

goog.require('goog.soy');
goog.require('goog.events');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');

/**
 * The image viewer - the central entity that manages annotations 
 * displayed for one image.
 * @param {element} canvas the canvas element 
 * @param {yuma.viewer.Popup} the popup to use in this viewer
 * @param {yuma.modules.image.ImageAnnotator} annotator reference to the annotator
 * @constructor
 */
yuma.modules.image.Viewer = function(canvas, popup, annotator) {
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

  annotator.addHandler(yuma.events.EventType.POPUP_HIDDEN, function() {
    if (self._cachedMouseEvent) {
      var mouseX = self._cachedMouseEvent.offsetX;
      var mouseY = self._cachedMouseEvent.offsetY;
            
      var previousAnnotation = self._currentAnnotation;
      self._currentAnnotation = self.topAnnotationAt(mouseX, mouseY);
      self._redraw();
      self._eventsEnabled = true;
            
      if (previousAnnotation != self._currentAnnotation) {
        self._annotator.fireEvent(yuma.events.EventType.MOUSE_OUT_OF_ANNOTATION,
          { annotation: previousAnnotation, mouseEvent: event });
  
        self._annotator.fireEvent(yuma.events.EventType.MOUSE_OVER_ANNOTATION,
          { annotation: self._currentAnnotation, mouseEvent: event });
      }
    }
  });
}

/**
 * Adds an annotation to the viewer.
 * @param {yuma.annotation.Annotation} the annotation
 */
yuma.modules.image.Viewer.prototype.addAnnotation = function(annotation) {
  this._annotations.push(annotation);  
  this._draw(annotation, '#ffffff', 1);
}

/**
 * Removes an annotation from the viewer.
 * @param {yuma.annotation.Annotation} the annotation
 */
yuma.modules.image.Viewer.prototype.removeAnnotation = function(annotation) {
  if (annotation == this._currentAnnotation)
    delete this._currentAnnotation;
    
  goog.array.remove(this._annotations, annotation);
  this._redraw();
  
  this._annotator.fireEvent(yuma.events.EventType.ANNOTATION_REMOVED,
    { annotation: annotation });
}

/**
 * Convenience method returing only the top-most annotation at the specified coordinates.
 * @param {number} px the X coordinate
 * @param {number} py the Y coordinates
 */
yuma.modules.image.Viewer.prototype.topAnnotationAt = function(px, py) {
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
 * @return {Array.<yuma.annotation.Annotation>} the annotations sorted by size, smallest first
 */
yuma.modules.image.Viewer.prototype.annotationsAt = function(px, py) { 
  // TODO for large numbers of annotations, we can optimize this
  // using a tree- or grid-like data structure instead of a list
  var intersectedAnnotations = [];
  goog.array.forEach(this._annotations, function(annotation, idx, array) {
    if (yuma.geom.intersects(annotation.shape.geometry, px, py)) {
      intersectedAnnotations.push(annotation);
    }
  });

  goog.array.sort(intersectedAnnotations, function(a, b) {
    return yuma.geom.size(a.shape.geometry) > yuma.geom.size(b.shape.geometry);
  });
  
  return intersectedAnnotations;
}

/**
 * @private
 */
yuma.modules.image.Viewer.prototype._resetPopup = function(annotation, x, y) {
  this._popup.show(annotation, x, y);
}

/**
 * @private
 */
yuma.modules.image.Viewer.prototype._onMouseMove = function(event) {
  var topAnnotation = this.topAnnotationAt(event.offsetX, event.offsetY);
    
  // TODO remove code duplication
  
  var self = this;
  if (topAnnotation) {
    if (!this._currentAnnotation) {
      // Mouse moved into annotation from empty space - highlight immediately
      this._currentAnnotation = topAnnotation;
      this._redraw();
      this._annotator.fireEvent(yuma.events.EventType.MOUSE_OVER_ANNOTATION,
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
yuma.modules.image.Viewer.prototype._draw = function(annotation, color, lineWidth) {
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
yuma.modules.image.Viewer.prototype._redraw = function() {  
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
    this._resetPopup(this._currentAnnotation, bbox.x, bbox.y + bbox.height + 5);

    // TODO Orientation check - what if the popup would be outside the viewport?
  } else {
    if (this._showPopups)
      this._clearPopup();    
  }
}
