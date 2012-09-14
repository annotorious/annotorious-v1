goog.provide('yuma.annotators.image.ImageViewer');

goog.require('goog.soy');
goog.require('goog.events.EventTarget');

/**
 * The image viewer - the central entity that manages annotations 
 * displayed for one image.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
yuma.annotators.image.ImageViewer = function(canvas) {
  /** @private **/
  this._canvas = canvas;

  /** @private **/
  this._annotations = [];

  /** @private **/
  this._g2d = canvas.getContext('2d');

  /** @private **/
  this._currentAnnotation;

  /** @private **/
  this._popup;
  
  var self = this;

  goog.events.listen(canvas, goog.events.EventType.MOUSEMOVE, function(event) { 
    self._redraw(event);
  });

  yuma.events.EventBroker.getInstance().registerEventTarget(this, [
    yuma.events.EventType.MOUSE_OVER_ANNOTATION,
    yuma.events.EventType.MOUSE_OUT_OF_ANNOTATION
  ]);
}
goog.inherits(yuma.annotators.image.ImageViewer, goog.events.EventTarget);

/**
 * Adds an annotation to the viewer.
 * @param {yuma.model.Annotation} annotation
 */
yuma.annotators.image.ImageViewer.prototype.addAnnotation = function(annotation) {
  this._annotations.push(annotation);  
  this._draw(annotation, '#ffffff', 1);
}

/**
 * @private
 */
yuma.annotators.image.ImageViewer.prototype._draw = function(annotation, color, lineWidth) {
  this._g2d.strokeStyle = color;
  this._g2d.lineWidth = lineWidth;

  var shape = annotation.shape;
  if (shape.type == yuma.model.ShapeType.POINT) {
    // TODO implement
  } else if (shape.type == yuma.model.ShapeType.POLYGON) {
    // TODO implement
  } else if (shape.type == yuma.model.ShapeType.RECTANGLE) {
    var rect = shape.geometry;
    this._g2d.strokeRect(rect.x + 0.5, rect.y + 0.5, rect.width, rect.height); 
  }  
}

/**
 * @private
 */
yuma.annotators.image.ImageViewer.prototype._clearPopup = function(annotation) {
  if (this._popup) {
    goog.dom.removeNode(this._popup);
    delete this._popup;
  }
}

/**
 * @private
 */
yuma.annotators.image.ImageViewer.prototype._redraw = function(mouseEvent) {
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);

  var self = this;
  goog.array.forEach(this._annotations, function(annotation, idx, array) {
    self._draw(annotation, '#ffffff', 1);
  });

  var intersectedAnnotations = [];
  goog.array.forEach(this._annotations, function(annotation, idx, array) {
    if (annotation.shape.geometry.intersects(mouseEvent.offsetX, mouseEvent.offsetY)) {
      intersectedAnnotations.push(annotation);
    }
  });

  goog.array.sort(intersectedAnnotations, function(a, b) {
    return a.shape.geometry.size() > b.shape.geometry.size();
  });

  if (intersectedAnnotations.length > 0) {
    if (this._currentAnnotation != intersectedAnnotations[0]) {
        if (this._currentAnnotation)
          goog.events.dispatchEvent(this, {type: yuma.events.EventType.MOUSE_OUT_OF_ANNOTATION,
            annotation: this._currentAnnotation, mouseEvent: mouseEvent});

        this._currentAnnotation = intersectedAnnotations[0];

        goog.events.dispatchEvent(this, {type: yuma.events.EventType.MOUSE_OVER_ANNOTATION, 
           annotation: this._currentAnnotation, mouseEvent: mouseEvent});

        this._clearPopup();

        this._popup = goog.soy.renderAsElement(yuma.templates.popup, {text: this._currentAnnotation.text});

        goog.dom.appendChild(document.body, this._popup);

        // TODO need to introduce a bbox property that's supported by every shape type
        // Currently the shape.geometry will always be a yuma.geom.Rectangle
        var bbox = intersectedAnnotations[0].shape.geometry;

        // TODO unfortunately, position varies with the CSS padding settings - need to take this into account
        goog.style.setPosition(this._popup, new goog.math.Coordinate(bbox.x + 7, bbox.y + bbox.height + 14));

       // TODO Orientation check - what if the popup would be outside the viewport?
    }

    this._draw(intersectedAnnotations[0], '#fff000', 1.8);
  } else {
    if (this._currentAnnotation) {
      goog.events.dispatchEvent(this, {type: yuma.events.EventType.MOUSE_OUT_OF_ANNOTATION,
        annotation: this._currentAnnotation, mouseEvent: mouseEvent});
      delete this._currentAnnotation;
      this._clearPopup();
    }
  }

  // TODO for large numbers of annotations, we can optimize this
  // using a tree- or grid-like data structure instead of a list
} 
