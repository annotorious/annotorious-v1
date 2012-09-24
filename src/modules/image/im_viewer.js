goog.provide('yuma.modules.image.Viewer');

goog.require('goog.soy');
goog.require('goog.dom.classes');
goog.require('goog.events.EventTarget');

/**
 * The image viewer - the central entity that manages annotations 
 * displayed for one image.
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

  var self = this; 
  goog.events.listen(this._canvas, goog.events.EventType.MOUSEMOVE, function(event) {
    self._redraw(event);
  });

  yuma.events.EventBroker.getInstance().registerEventTarget(this, [
    yuma.events.EventType.MOUSE_OVER_ANNOTATION,
    yuma.events.EventType.MOUSE_OUT_OF_ANNOTATION
  ]);
}
goog.inherits(yuma.modules.image.Viewer, goog.events.EventTarget);

/**
 * Adds an annotation to the viewer.
 * @param {yuma.model.Annotation} annotation
 */
yuma.modules.image.Viewer.prototype.addAnnotation = function(annotation) {
  this._annotations.push(annotation);  
  this._draw(annotation, '#ffffff', 1);
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
  
  var p = this._popup;
  goog.events.listen(p, goog.events.EventType.MOUSEOVER, function(event) {
    goog.dom.classes.add(p, 'hover');
  });
  
  goog.events.listen(p, goog.events.EventType.MOUSEOUT, function(event) {
    goog.dom.classes.remove(p, 'hover');
  });
  
  goog.dom.appendChild(goog.dom.getParentElement(this._canvas), this._popup);
  // goog.dom.appendChild(document.body, this._popup);
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
yuma.modules.image.Viewer.prototype._redraw = function(mouseEvent) {
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);

  var self = this;
  goog.array.forEach(this._annotations, function(annotation, idx, array) {
    self._draw(annotation, '#ffffff', 1);
  });

  var intersectedAnnotations = [];
  goog.array.forEach(this._annotations, function(annotation, idx, array) {
    if (yuma.geom.Rectangle.intersects(annotation.shape.geometry, mouseEvent.offsetX, mouseEvent.offsetY)) {
      intersectedAnnotations.push(annotation);
    }
  });

  goog.array.sort(intersectedAnnotations, function(a, b) {
    return yuma.geom.Rectangle.size(a.shape.geometry) > yuma.geom.Rectangle.size(b.shape.geometry);
  });

  if (intersectedAnnotations.length > 0) {
    if (this._currentAnnotation != intersectedAnnotations[0]) {
      if (this._currentAnnotation)
        goog.events.dispatchEvent(this, {type: yuma.events.EventType.MOUSE_OUT_OF_ANNOTATION,
          annotation: this._currentAnnotation, mouseEvent: mouseEvent});

      this._currentAnnotation = intersectedAnnotations[0];

      goog.events.dispatchEvent(this, {type: yuma.events.EventType.MOUSE_OVER_ANNOTATION, 
        annotation: this._currentAnnotation, mouseEvent: mouseEvent});

      if (this._showPopups) {
        this._newPopup({text: this._currentAnnotation.text});
        
        // TODO need to introduce a bbox property that's supported by every shape type
        // Currently the shape.geometry will always be a yuma.geom.Rectangle
        var bbox = intersectedAnnotations[0].shape.geometry;

        goog.style.setPosition(this._popup, new goog.math.Coordinate(bbox.x, bbox.y + bbox.height + 1));

        // TODO Orientation check - what if the popup would be outside the viewport?
      } 
    }
    this._draw(intersectedAnnotations[0], '#fff000', 1.8);
  } else {
    if (this._currentAnnotation) {
      goog.events.dispatchEvent(this, {type: yuma.events.EventType.MOUSE_OUT_OF_ANNOTATION,
        annotation: this._currentAnnotation, mouseEvent: mouseEvent});
      delete this._currentAnnotation;
      
      if (this._showPopups)
        this._clearPopup();
    }
  }

  // TODO for large numbers of annotations, we can optimize this
  // using a tree- or grid-like data structure instead of a list
} 
