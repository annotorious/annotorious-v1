goog.provide('annotorious.plugins.selection.PolygonSelector');

goog.require('goog.events');

/**
 * A polygon drawing tool selector.
 * @constructor
 */
annotorious.plugins.selection.PolygonSelector = function() { }

/**
 * Initializes the selector.
 * @param {element} canvas the canvas to draw on
 * @param {object} annotator reference to the annotator
 */
annotorious.plugins.selection.PolygonSelector.prototype.init = function(canvas, annotator) {
  /** @private **/
  this._canvas = canvas;
  
  /** @private **/
  this._annotator = annotator;

  /** @private **/
  this._g2d = canvas.getContext('2d');

  /** @private **/
  this._anchor;
  
  /** @private **/
  this._points = [];

  /** @private **/
  this._mouse;

  /** @private **/
  this._enabled = false;

  /** @private **/
  this._mouseMoveListener;

  /** @private **/
  this._mouseUpListener;
}

/**
 * Attaches MOUSEUP and MOUSEMOVE listeners to the editing canvas.
 * @private
 */
annotorious.plugins.selection.PolygonSelector.prototype._attachListeners = function() {
  var self = this;  

  var refresh = function(last, highlight_last) {
    self._g2d.clearRect(0, 0, self._canvas.width, self._canvas.height);

    // Outer line
    self._g2d.lineWidth = 2.5;
    self._g2d.strokeStyle = '#000000';    
    self._g2d.beginPath();
    self._g2d.moveTo(self._anchor.x, self._anchor.y);
    goog.array.forEach(self._points, function(pt) {
      self._g2d.lineTo(pt.x, pt.y);
    });
    self._g2d.lineTo(last.x, last.y);
    self._g2d.stroke();
    
    /* Outer line
    g2d.lineWidth = 1.4;
    g2d.strokeStyle = '#000000';
  
    var outline = annotorious.shape.expand(shape, 1).points;
    g2d.beginPath();
    g2d.moveTo(outline[0].x, outline[0].y);
    for (var i=1; i<outline.length; i++) {
      g2d.lineTo(outline[i].x, outline[i].y);
    }
    g2d.lineTo(outline[0].x, outline[0].y);
    g2d.stroke();
    */
    
    // Inner line
    self._g2d.lineWidth = 1.4;
    self._g2d.strokeStyle = '#ffffff';
    self._g2d.beginPath();
    self._g2d.moveTo(self._anchor.x, self._anchor.y);
    goog.array.forEach(self._points, function(pt) {
      self._g2d.lineTo(pt.x, pt.y);
    });
    self._g2d.lineTo(last.x, last.y);
    self._g2d.stroke();

    // Last coord highlight (if needed)
    if (highlight_last) {
      self._g2d.lineWidth = 1.0;
      self._g2d.fillStyle = '#ffffff';
      self._g2d.strokeStyle = '#000000';

      self._g2d.beginPath();
      self._g2d.arc(last.x, last.y, 3.5, 0, 2 * Math.PI, false);
      self._g2d.fill();
      self._g2d.stroke();
    }
  };

  var isClosable = function(x, y) {
    return (self._points.length > 1 && Math.abs(x - self._anchor.x) < 5 && Math.abs(y - self._anchor.y) < 5);
  };

  this._mouseMoveListener = goog.events.listen(this._canvas, goog.events.EventType.MOUSEMOVE, function(event) {
    if (self._enabled) {
      self._mouse = { x: event.offsetX, y: event.offsetY };
      refresh(self._mouse, isClosable(event.offsetX, event.offsetY));
    }
  });

  this._mouseUpListener = goog.events.listen(this._canvas, goog.events.EventType.MOUSEUP, function(event) {
    if (isClosable(event.offsetX, event.offsetY)) {
      self._enabled = false;
      refresh(self._anchor);

      self._annotator.fireEvent(annotorious.events.EventType.SELECTION_COMPLETED,
        { mouseEvent: event, shape: self.getShape(), viewportBounds: self.getViewportBounds() }); 
    } else {
      self._points.push({ x: event.offsetX, y: event.offsetY });
    }
  });
}

/**
 * Detaches MOUSEUP and MOUSEMOVE listeners from the editing canvas.
 * @private
 */
annotorious.plugins.selection.PolygonSelector.prototype._detachListeners = function() {
  if (this._mouseMoveListener) {
    goog.events.unlistenByKey(this._mouseMoveListener);
    delete this._mouseMoveListener;
  }

  if (this._mouseUpListener) {
    goog.events.unlistenByKey(this._mouseUpListener);
    delete this._mouseUpListener;
  }
}

/**
 * Selector API method: returns the selector name.
 * @returns the selector name
 */
annotorious.plugins.selection.PolygonSelector.prototype.getName = function() {
  return 'polygon';
}

/**
 * Selector API method: returns the supported shape type.
 *
 * TODO support for multiple shape types?
 *
 * @return the supported shape type
 */
annotorious.plugins.selection.PolygonSelector.prototype.getSupportedShapeType = function() {
  return annotorious.shape.ShapeType.POLYGON;
}

/**
 * Selector API method: starts the selection at the specified coordinates.
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
annotorious.plugins.selection.PolygonSelector.prototype.startSelection = function(x, y) {
  this._enabled = true;
  this._attachListeners();
  this._anchor = new annotorious.shape.geom.Point(x, y);
  this._annotator.fireEvent(annotorious.events.EventType.SELECTION_STARTED, {
    offsetX: x, offsetY: y});
  
  goog.style.setStyle(document.body, '-webkit-user-select', 'none');
}

/**
 * Selector API method: stops the selection.
 */
annotorious.plugins.selection.PolygonSelector.prototype.stopSelection = function() {
  this._detachListeners();
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
  goog.style.setStyle(document.body, '-webkit-user-select', 'auto');
  this._points = [];
}

/**
 * Selector API method: returns the currently edited shape.
 * @returns {annotorious.shape.Shape} the shape
 */
annotorious.plugins.selection.PolygonSelector.prototype.getShape = function() {
  var points = [];
  points.push(this._annotator.toItemCoordinates(this._anchor));
  
  var self = this;
  goog.array.forEach(this._points, function(pt) {
    points.push(self._annotator.toItemCoordinates(pt));
  });

  return new annotorious.shape.Shape(annotorious.shape.ShapeType.POLYGON, new annotorious.shape.geom.Polygon(points));
}

/**
 * Selector API method: returns the bounds of the selected shape, in viewport (= pixel) coordinates.
 * @returns {object} the shape viewport bounds
 */
annotorious.plugins.selection.PolygonSelector.prototype.getViewportBounds = function() {
  var right = this._anchor.x;
  var left = this._anchor.x;
  var top = this._anchor.y;
  var bottom = this._anchor.y;

  goog.array.forEach(this._points, function(pt) {
    if (pt.x > right)
      right = pt.x;

    if (pt.x < left)
      left = pt.x;

    if (pt.y > bottom)
      bottom = pt.y;

    if (pt.y < top)
      top = pt.y;
  });

  return {top: top, right: right, bottom: bottom, left: left};
}

/**
 * TODO not sure if this is really the best way/architecture to handle viewer shape drawing 
 */
annotorious.plugins.selection.PolygonSelector.prototype.drawShape = function(g2d, shape, highlight) {
  var color;
  if (highlight) {
    color = '#fff000';
  } else {
    color = '#ffffff';
  }

  // TODO check if it's really a polyogn
  
  // Outer line
  g2d.lineWidth = 1.4;
  g2d.strokeStyle = '#000000';
  
  var outline = annotorious.shape.expand(shape, 1).geometry.points;
  g2d.beginPath();
  g2d.moveTo(outline[0].x, outline[0].y);
  for (var i=1; i<outline.length; i++) {
    g2d.lineTo(outline[i].x, outline[i].y);
  }
  g2d.lineTo(outline[0].x, outline[0].y);
  g2d.stroke();

  // Inner line
  g2d.lineWidth = 1;
  g2d.strokeStyle = color;
  
  var points = shape.geometry.points;
  g2d.beginPath();
  g2d.moveTo(points[0].x, points[0].y);
  for (var i=1; i<points.length; i++) {
    g2d.lineTo(points[i].x, points[i].y);
  }
  g2d.lineTo(points[0].x, points[0].y);
  g2d.stroke();
}
