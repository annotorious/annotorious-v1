goog.provide('annotorious.plugin.selector');

goog.require('goog.events');

/**
 * A basic selector for polygon shapes.
 */
annotorious.plugin.selector.PolygonSelector = function() { }

/**
 * @param {element} canvas the canvas to draw on
 * @param {object} annotator reference to the annotator
 * @constructor
 */
annotorious.plugin.selector.PolygonSelector.prototype.init = function(canvas, annotator) {
  /** @private **/
  this._canvas = canvas;
  
  /** @private **/
  this._annotator = annotator;

  /** @private **/
  this._g2d = canvas.getContext('2d');
  this._g2d.lineWidth = 1.5;
  this._g2d.strokeStyle = '#0000ff';

  /** @private **/
  this._anchor;
  
  /** @private **/
  this._points = [];

  /** @private **/
  this._mouse;

  /** @private **/
  this._enabled = false;

  var refresh = function() {
    self._g2d.clearRect(0, 0, canvas.width, canvas.height);
    self._g2d.beginPath();
    self._g2d.moveTo(self._anchor.x, self._anchor.y);

    // Polyline
    goog.array.forEach(self._points, function(pt) {
      self._g2d.lineTo(pt.x, pt.y);
    });

    /* Vertex circles
    goog.array.forEach(self._points, function(pt) {
      self._g2d.arc(pt.x, pt.y, 5, 0, 2 * Math.PI, false);
    }*/
  }

  var self = this;  
  goog.events.listen(canvas, goog.events.EventType.MOUSEMOVE, function(event) {
    if (self._enabled) {
      refresh();
      self._mouse = { x: event.offsetX, y: event.offsetY };
      self._g2d.lineTo(self._mouse.x, self._mouse.y);
      self._g2d.stroke();
    }
  });

  goog.events.listen(canvas, goog.events.EventType.MOUSEUP, function(event) {
    if (self._points.length > 0 && Math.abs(event.offsetX - self._anchor.x) < 5 && Math.abs(event.offsetY - self._anchor.y) < 5) {
      self._enabled = false;
      refresh();
      self._g2d.lineTo(self._anchor.x, self._anchor.y);
      self._g2d.fill();

      self._annotator.fireEvent(annotorious.events.EventType.SELECTION_COMPLETED,
        { mouseEvent: event, shape: self.getShape(), viewportBounds: self.getViewportBounds() }); 
    } else {
      self._points.push({ x: event.offsetX, y: event.offsetY });
    }
  });
}

annotorious.plugin.selector.PolygonSelector.prototype.supportedShapeType = function() {
  return annotorious.shape.ShapeType.POLYGON;
}

/**
 * Starts the selection at the specified coordinates.
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
annotorious.plugin.selector.PolygonSelector.prototype.startSelection = function(x, y) {
  this._enabled = true;
  this._anchor = new annotorious.shape.geom.Point(x, y);
  this._annotator.fireEvent(annotorious.events.EventType.SELECTION_STARTED, {
    offsetX: x, offsetY: y});
  
  goog.style.setStyle(document.body, '-webkit-user-select', 'none');
}

/**
 * Stops the selection.
 */
annotorious.plugin.selector.PolygonSelector.prototype.stopSelection = function() {
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
  goog.style.setStyle(document.body, '-webkit-user-select', 'auto');
  this._points = [];
}

/**
 * The currently edited shape
 */
annotorious.plugin.selector.PolygonSelector.prototype.getShape = function() {
  var points = [ this._anchor ];
  goog.array.extend(points, this._points);
  return new annotorious.shape.Shape(annotorious.shape.ShapeType.POLYGON, new annotorious.shape.geom.Polygon(points));
}

annotorious.plugin.selector.PolygonSelector.prototype.getViewportBounds = function() {
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

annotorious.plugin.selector.PolygonSelector.prototype.drawShape = function(g2d, shape) {
  g2d.strokeStyle = '#0000ff';
  g2d.lineWidth = 1.5;
  g2d.beginPath();
  var points = shape.geometry.points;

  // TODO check if it's really a polyogn

  // TODO check if it's a valid polygon (e.g. points.length < 3)

  g2d.moveTo(points[0].x, points[0].y);
  for (var i=1; i<points.length; i++) {
    g2d.lineTo(points[i].x, points[i].y);
  }
  g2d.lineTo(points[0].x, points[0].y);
  g2d.stroke();
}

/**
 * Wraps the polygon selector into an Annotorious plugin.
 * @constructor
 */
annotorious.plugin.Polygon = function() { }

annotorious.plugin.Polygon.prototype.onInitAnnotator = function(annotator) {
  annotator.addSelector(new annotorious.selector.PolygonSelector());
}

