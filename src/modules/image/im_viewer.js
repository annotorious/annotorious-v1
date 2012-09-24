goog.provide('yuma.modules.image.Viewer');

goog.require('goog.soy');
goog.require('goog.dom.classes');
goog.require('goog.events.EventTarget');

/**
 * The image viewer - the central entity that manages annotations 
 * displayed for one image.
 * @param {element} the canvas element
 * @param {boolean=} boolean flag to enable/disable hover popups (default true)
 * @constructor
 * @extends {goog.events.EventTarget}
 */
yuma.modules.image.Viewer = function(canvas, opt_show_popups) {
  /** @private **/
  this._canvas = canvas;
  
  /** @private **/
  this._showPopups;
  if (opt_show_popups != undefined) {
    this._showPopups = opt_show_popups;
  } else {
    this._showPopups = true;
  }
 
  /** @private **/
  this._annotations = [];

  /** @private **/
  this._g2d = this._canvas.getContext('2d');

  /** @private **/
  this._currentAnnotation;

  /** @private **/
  this._popup;
  
  /** @private **/
  this._eventsEnabled = true;
  
  var self = this; 
  goog.events.listen(this._canvas, goog.events.EventType.MOUSEMOVE, function(event) {
    if (self._eventsEnabled)
      self._onMouseMove(event);
  });

  yuma.events.EventBroker.getInstance().registerEventTarget(this, [
    yuma.events.EventType.MOUSE_OVER_ANNOTATION,
    yuma.events.EventType.MOUSE_OUT_OF_ANNOTATION
  ]);
}
goog.inherits(yuma.modules.image.Viewer, goog.events.EventTarget);

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
  // TODO implement
}

/**
 * Returns the annotations at the specified X/Y coordinates.
 * @param {number} px the X coordinate
 * @param {number} py the Y coordinate
 * @return {Array.<yuma.annotation.Annotation>} the annotations sorted by size, smallest first
 */
yuma.modules.image.Viewer.prototype.getAnnotationsAt = function(px, py) { 
  // TODO for large numbers of annotations, we can optimize this
  // using a tree- or grid-like data structure instead of a list
  var intersectedAnnotations = [];
  goog.array.forEach(this._annotations, function(annotation, idx, array) {
    if (annotation.shape.geometry.intersects(px, py)) {
      intersectedAnnotations.push(annotation);
    }
  });

  goog.array.sort(intersectedAnnotations, function(a, b) {
    return a.shape.geometry.size() > b.shape.geometry.size();
  });
  
  return intersectedAnnotations;
}

/**
 * @private
 */
yuma.modules.image.Viewer.prototype._draw = function(annotation, color, lineWidth) {
  this._g2d.strokeStyle = color;
  this._g2d.lineWidth = lineWidth;

  var shape = annotation.shape;
  if (shape.type == yuma.annotation.ShapeType.POINT) {
    // TODO implement
  } else if (shape.type == yuma.annotation.ShapeType.POLYGON) {
    // TODO implement
  } else if (shape.type == yuma.annotation.ShapeType.RECTANGLE) {
    var rect = shape.geometry;
    this._g2d.strokeRect(rect.x + 0.5, rect.y + 0.5, rect.width, rect.height); 
  }  
}

/**
 * @private
 */
yuma.modules.image.Viewer.prototype._newPopup = function(payload) {
  this._clearPopup();          
  this._popup = goog.soy.renderAsElement(yuma.templates.popup, payload);
  
  var self = this;
  goog.events.listen(this._popup, goog.events.EventType.MOUSEOVER, function(event) {
    goog.dom.classes.add(self._popup, 'hover');
  });
  
  goog.events.listen(this._popup, goog.events.EventType.MOUSEOUT, function(event) {
    goog.dom.classes.remove(self._popup, 'hover');
    self._eventsEnabled = true;
  });
  
  goog.dom.appendChild(goog.dom.getParentElement(this._canvas), this._popup);
}

/**
 * @private
 */
yuma.modules.image.Viewer.prototype._clearPopup = function() {
  // TODO I don't know whether the MOUSEOVER/MOUSEOUT listeners get properly
  // destroyed when deleting the DOM element!
  if (this._popup) {
    goog.dom.removeNode(this._popup);
    delete this._popup;
  }
}

/**
 * @private
 */
yuma.modules.image.Viewer.prototype._onMouseMove = function(event) {
  var intersectedAnnotations = this.getAnnotationsAt(event.offsetX, event.offsetY);
  
  // TODO re-enable dispatching of MOUSE_OVER_ANNOTATION and MOUSE_OUT_OF_ANNOTATION events
  
  var self = this;
  if (intersectedAnnotations.length > 0) {
    if (!this._currentAnnotation) {
      // Mouse moved into annotation from empty space - highlight immediately
      this._currentAnnotation = intersectedAnnotations[0];
      this._redraw();
    } else if (this._currentAnnotation != intersectedAnnotations[0]) {
      // Mouse changed from one annotation to another one
      self._eventsEnabled = false;
      window.setTimeout(function() {
        if (!self._popup || !goog.dom.classes.has(self._popup, 'hover')) {
          self._currentAnnotation = intersectedAnnotations[0];
          self._redraw();
          self._eventsEnabled = true;
        }
      }, 300);
    }
  } else {
    if (this._currentAnnotation) {
      // Mouse moved out of an annotation, into empty space
      self._eventsEnabled = false;
      window.setTimeout(function() {
        if (!goog.dom.classes.has(self._popup, 'hover')) {
          delete self._currentAnnotation;
          self._redraw();
          self._eventsEnabled = true;
        }
      }, 300);
    }
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
    this._draw(this._currentAnnotation, '#fff000', 1.8);
    if (this._showPopups) {
      this._newPopup({text: this._currentAnnotation.text});
        
      // TODO need to introduce a bbox property that's supported by every shape type
      // Currently the shape.geometry will always be a yuma.geom.Rectangle
      var bbox = this._currentAnnotation.shape.geometry;

      goog.style.setPosition(this._popup, new goog.math.Coordinate(bbox.x, bbox.y + bbox.height + 5));

      // TODO Orientation check - what if the popup would be outside the viewport?
    }
  } else {
    if (this._showPopups)
      this._clearPopup();    
  }
}
