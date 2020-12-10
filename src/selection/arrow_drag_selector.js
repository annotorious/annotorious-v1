goog.provide('annotorious.plugins.selection.ArrowDragSelector');

goog.require('goog.events');
goog.require('annotorious.events.ui');
goog.require('annotorious.shape.geom.Arrow');

/**
 * The selector for draw arrows
 * @constructor
 */
annotorious.plugins.selection.ArrowDragSelector = function () { }

/**
 * Initializes the selector.
 * @param {Element} canvas the canvas to draw on
 * @param {Object} annotator reference to the annotator
 */
annotorious.plugins.selection.ArrowDragSelector.prototype.init = function (annotator, canvas) {

  /** @private **/
  this._canvas = canvas;

  /** @private **/
  this._annotator = annotator;

  /** @private **/
  this._g2d = canvas.getContext('2d');

  /** @private **/
  this._arrowTail;

  /** @private **/
  this._arrowHead;

  /** @private **/
  this._enabled = false;

  /** @private **/
  this._mouseMoveListener;

  /** @private **/
  this._mouseUpListener;

  /** @private **/
  this._properties = {
    arrowStroke: '#ffffff',
    arrowStrokeWidth: 2,
    hiArrowStroke: '#fff000',
    hiArrowStrokeWidth: 2.2
  };

  /** @private **/
  this._defaultProperties = Object.assign({}, this._properties);
}

/**
 * Attaches MOUSEUP and MOUSEMOVE listeners to the editing canvas. 
 * @private
 */
annotorious.plugins.selection.ArrowDragSelector.prototype._attachListeners = function (startPoint, limitShape) {
  var self = this;
  var canvas = this._canvas;

  this._mouseMoveListener = goog.events.listen(this._canvas, annotorious.events.ui.EventType.MOVE, function (event) {
    var points = annotorious.events.ui.sanitizeCoordinates(event, canvas);
    if (!self._enabled || (limitShape && !annotorious.shape.intersects(limitShape, points.x, points.y))) return;
    self._arrowHead = new annotorious.shape.geom.Point(points.x, points.y);

    self._g2d.clearRect(0, 0, canvas.width, canvas.height);

    var pixCurs = self._annotator.toItemPixelCoordinates(points);
    self._annotator.fireEvent(annotorious.events.EventType.MOUSE_MOVE_ANNOTATABLE_ITEM, { "cursor": pixCurs }, event);

    self.drawShape(self._g2d, {
      type: annotorious.shape.ShapeType.ARROW,
      geometry: new annotorious.shape.geom.Arrow(self._arrowTail, self._arrowHead),
      style: {}
    });
  });

  this._mouseUpListener = goog.events.listen(canvas, annotorious.events.ui.EventType.UP, function (event) {
    var points = annotorious.events.ui.sanitizeCoordinates(event, canvas);
    var shape = self.getShape();
    event = (event.event_) ? event.event_ : event;

    self._enabled = false;
    if (shape) {
      self._detachListeners();
      self._annotator.fireEvent(annotorious.events.EventType.SELECTION_COMPLETED,
        { mouseEvent: event, shape: shape, viewportBounds: self.getViewportBounds() });
    } else {
      self._annotator.fireEvent(annotorious.events.EventType.SELECTION_CANCELED);

      // On cancel, we "relay" the selection event to the annotator
      var annotations = self._annotator.getAnnotationsAt(points.x, points.y);
      if (annotations.length > 0)
        self._annotator.highlightAnnotation(annotations[0]);
    }
  });
}

/**
 * Detaches MOUSEUP and MOUSEMOVE listeners from the editing canvas.
 * @private
 */
annotorious.plugins.selection.ArrowDragSelector.prototype._detachListeners = function () {
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
annotorious.plugins.selection.ArrowDragSelector.prototype.getName = function () {
  return 'arrow_drag';
}

/**
 * Selector API method: returns the supported shape type.
 *
 * @return the supported shape type
 */
annotorious.plugins.selection.ArrowDragSelector.prototype.getSupportedShapeType = function () {
  return annotorious.shape.ShapeType.ARROW;
}

/**
 * Sets the properties on this selector.
 */
annotorious.plugins.selection.ArrowDragSelector.prototype.setProperties = function (props) {
  if (!(props instanceof Object) || Object.keys(props).length === 0) {
    this._properties = Object.assign({}, this._defaultProperties);
    return;
  }
  if (props.hasOwnProperty('arrowStroke'))
    this._properties.arrowStroke = props['arrowStroke'] || this._defaultProperties.arrowStroke;

  if (props.hasOwnProperty('arrowStrokeWidth'))
    this._properties.arrowStrokeWidth = props['arrowStrokeWidth'] || this._defaultProperties.arrowStrokeWidth;

  if (props.hasOwnProperty('hiArrowStroke'))
    this._properties.hiArrowStroke = props['hiArrowStroke'] || this._defaultProperties.hiArrowStroke;

  if (props.hasOwnProperty('hiArrowStrokeWidth'))
    this._properties.hiArrowStrokeWidth = props['hiArrowStrokeWidth'] || this._defaultProperties.hiArrowStrokeWidth;
}

/**
 * Selector API method: starts the selection at the specified coordinates.
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 * @param {annotorious.shape.Shape | undefined} limitShape the shape of limit draw
 */
annotorious.plugins.selection.ArrowDragSelector.prototype.startSelection = function (x, y, limitShape) {
  var startPoint = {
    x: x,
    y: y
  };
  this._enabled = true;
  this._attachListeners(startPoint, limitShape);
  this._arrowTail = new annotorious.shape.geom.Point(x, y);
  this._annotator.fireEvent(annotorious.events.EventType.SELECTION_STARTED, {
    offsetX: x, offsetY: y
  });

  goog.style.setStyle(document.body, '-webkit-user-select', 'none');
}

/**
 * Selector API method: stops the selection.
 */
annotorious.plugins.selection.ArrowDragSelector.prototype.stopSelection = function () {
  this._detachListeners();
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
  goog.style.setStyle(document.body, '-webkit-user-select', 'auto');
  delete this._arrowHead;
}

/**
 * Selector API method: returns the currently edited shape.
 * @return {annotorious.shape.Shape | undefined} the shape
 */
annotorious.plugins.selection.ArrowDragSelector.prototype.getShape = function () {
  if (this._arrowHead && ((Math.abs(this._arrowHead.x - this._arrowTail.x) > 5) || (Math.abs(this._arrowHead.y - this._arrowTail.y) > 5))) {
    return new annotorious.shape.Shape(
      annotorious.shape.ShapeType.ARROW,
      new annotorious.shape.geom.Arrow(
        this._annotator.toItemCoordinates(this._arrowTail),
        this._annotator.toItemCoordinates(this._arrowHead)
      )
    );
  }
  return undefined;
}

/**
 * Selector API method: returns the bounds of the selected shape, in viewport (= pixel) coordinates.
 * @returns {Object} the shape viewport bounds
 */
annotorious.plugins.selection.ArrowDragSelector.prototype.getViewportBounds = function () {
  var right, left;
  if (this._arrowHead.x > this._arrowTail.x) {
    right = this._arrowHead.x;
    left = this._arrowTail.x;
  } else {
    right = this._arrowTail.x;
    left = this._arrowHead.x;
  }

  var top, bottom;
  if (this._arrowHead.y > this._arrowTail.y) {
    top = this._arrowTail.y;
    bottom = this._arrowHead.y;
  } else {
    top = this._arrowHead.y;
    bottom = this._arrowTail.y;
  }

  return { top: top, right: right, bottom: bottom + 5, left: left };
}

/**
 * TODO not sure if this is really the best way/architecture to handle viewer shape drawing
 * @param {Object} g2d graphics context
 * @param {annotorious.shape.Shape} shape the shape to draw
 * @param {boolean=} highlight if true, shape will be drawn highlighted
 */
annotorious.plugins.selection.ArrowDragSelector.prototype.drawShape = function (g2d, shape, highlight) {
  if (!shape.style) shape.style = {};

  if (shape.type == annotorious.shape.ShapeType.ARROW) {
    var geom = shape.geometry;

    if (highlight) {
      g2d.strokeStyle = g2d.fillStyle = shape.style.hiArrowStroke || this._properties.hiArrowStroke;
      g2d.lineWidth = shape.style.hiArrowStrokeWidth || this._properties.hiArrowStrokeWidth;
    } else {
      g2d.strokeStyle = g2d.fillStyle = shape.style.arrowStroke || this._properties.arrowStroke;
      g2d.lineWidth = shape.style.arrowStrokeWidth || this._properties.arrowStrokeWidth;
    }

    var angle = Math.PI / 5;
    var d = g2d.lineWidth * 3;

    var dist = Math.sqrt((geom.arrowHead.x - geom.arrowTail.x) * (geom.arrowHead.x - geom.arrowTail.x) + (geom.arrowHead.y - geom.arrowTail.y) * (geom.arrowHead.y - geom.arrowTail.y));
    var ratio = (dist - d / 3) / dist;
    var tox = Math.round(geom.arrowTail.x + (geom.arrowHead.x - geom.arrowTail.x) * ratio);
    var toy = Math.round(geom.arrowTail.y + (geom.arrowHead.y - geom.arrowTail.y) * ratio);

    // Draw the shaft of the arrow
    g2d.beginPath();
    g2d.moveTo(geom.arrowTail.x, geom.arrowTail.y);
    g2d.lineTo(tox, toy);
    g2d.stroke();

    // calculate the angle of the line
    var lineangle = Math.atan2(geom.arrowHead.y - geom.arrowTail.y, geom.arrowHead.x - geom.arrowTail.x);
    // h is the line length of a side of the arrow head
    var h = Math.abs(d / Math.cos(angle));

    var angle1 = lineangle + Math.PI + angle;
    var topx = geom.arrowHead.x + Math.cos(angle1) * h;
    var topy = geom.arrowHead.y + Math.sin(angle1) * h;
    var angle2 = lineangle + Math.PI - angle;
    var botx = geom.arrowHead.x + Math.cos(angle2) * h;
    var boty = geom.arrowHead.y + Math.sin(angle2) * h;

    g2d.save();
    g2d.beginPath();
    g2d.moveTo(topx, topy);
    g2d.lineTo(geom.arrowHead.x, geom.arrowHead.y);
    g2d.lineTo(botx, boty);

    // straight filled, add the bottom as a line and fill.
    g2d.beginPath();
    g2d.moveTo(topx, topy);
    g2d.lineTo(geom.arrowHead.x, geom.arrowHead.y);
    g2d.lineTo(botx, boty);
    g2d.lineTo(topx, topy);
    g2d.fill();

    g2d.restore();
  }
}
