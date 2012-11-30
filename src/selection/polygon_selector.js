goog.provide('annotorious.selection.PolygonSelector');

goog.require('goog.events');

/**
 * Click-and-drag-style selector.
 * @param {Element} canvas the canvas to draw on
 * @param {yuma.modules.image.ImageAnnotator} annotator reference to the annotator
 * @constructor
 */
annotorious.selection.PolygonSelector = function(canvas, annotator) {
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
    goog.array.forEach(self._points, function(pt) {
      self._g2d.lineTo(pt.x, pt.y);
    });
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

/**
 * Starts the selection at the specified coordinates.
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
annotorious.selection.PolygonSelector.prototype.startSelection = function(x, y) {
  this._enabled = true;
  this._anchor = new annotorious.geom.Point(x, y);
  this._annotator.fireEvent(annotorious.events.EventType.SELECTION_STARTED, {
    offsetX: x, offsetY: y});
  
  goog.style.setStyle(document.body, '-webkit-user-select', 'none');
}

/**
 * Stops the selection.
 */
annotorious.selection.PolygonSelector.prototype.stopSelection = function() {
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
  goog.style.setStyle(document.body, '-webkit-user-select', 'auto');
  this._points = [];
}

/**
 * The currently edited shape
 */
annotorious.selection.PolygonSelector.prototype.getShape = function() {
  var points = [ this._anchor ];
  goog.array.extend(points, this._points);
  return new annotorious.annotation.Shape(annotorious.annotation.ShapeType.POLYGON, new annotorious.geom.Polygon(points));
}

annotorious.selection.PolygonSelector.prototype.getViewportBounds = function() {
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
