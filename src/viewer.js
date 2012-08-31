goog.provide('yuma.Viewer');

goog.require('goog.soy');

/**
 * @constructor
 */
yuma.Viewer = function(canvas) {

  /** @private **/
  this._canvas = canvas;

  var self = this;
  goog.events.listen(canvas, goog.events.EventType.MOUSEMOVE, function(event) { 
    self._redraw(event.offsetX, event.offsetY);
  });

  /** @private **/
  this._annotations = [];

  /** @private **/
  this._g2d = canvas.getContext('2d');

  /** @private **/
  this._popup;
}

/**
 * TODO just a temporary hack - implement something decent!
 * @private
 */
yuma.Viewer.prototype._draw = function(annotation, color, lineWidth) {
  this._g2d.strokeStyle = color;
  this._g2d.lineWidth = lineWidth;

  var shape = annotation.shape;
  if (shape.type == yuma.Annotation.ShapeType.POINT) {
    // TODO implement
  } else if (shape.type == yuma.Annotation.ShapeType.POLYGON) {
    // TODO implement
  } else if (shape.type == yuma.Annotation.ShapeType.RECTANGLE) {
    var rect = shape.geometry;
    this._g2d.strokeRect(rect.x + 0.5, rect.y + 0.5, rect.width, rect.height); 
  }  
}

/**
 * @param {yuma.Annotation} annotation
 */
yuma.Viewer.prototype.addAnnotation = function(annotation) {
  this._annotations.push(annotation);  
  this._draw(annotation, '#ffffff', 1);
}

yuma.Viewer.prototype._redraw = function(px, py) {
  // TODO optimize!
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);

  var self = this;
  goog.array.forEach(this._annotations, function(annotation, idx, array) {
    self._draw(annotation, '#ffffff', 1);
  });

  var intersectedAnnotations = [];
  goog.array.forEach(this._annotations, function(annotation, idx, array) {
    if (annotation.shape.geometry.intersects(px, py)) {
      intersectedAnnotations.push(annotation);
    }
  });

  goog.array.sort(intersectedAnnotations, function(a, b) {
    return a.shape.geometry.size() > b.shape.geometry.size();
  });

  if (intersectedAnnotations.length > 0) {
    this._draw(intersectedAnnotations[0], '#fff000', 1.8);

    if (!this._popup) {
      this._popup = goog.soy.renderAsElement(yuma.templates.popup);
      goog.dom.appendChild(document.body, this._popup);   
    }
    goog.style.setPosition(this._popup, new goog.math.Coordinate(px + 15, py + 20));
  } else {
    if (this._popup) {
      goog.dom.removeNode(this._popup);
      delete this._popup;
    }
  }

  // TODO for large numbers of annotations, we can optimize this
  // using a tree- or grid-like data structure instead of a list
} 
