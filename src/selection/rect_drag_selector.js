goog.provide('annotorious.plugins.selection.RectDragSelector');

goog.require('goog.events');

goog.require('annotorious.events.ui');

/**
 * The default selector: a simple click-and-drag rectangle selection tool.
 * @constructor
 */
annotorious.plugins.selection.RectDragSelector = function () { }

/**
 * Initializes the selector.
 * @param {Element} canvas the canvas to draw on
 * @param {Object} annotator reference to the annotator
 */
annotorious.plugins.selection.RectDragSelector.prototype.init = function (annotator, canvas) {

  /** @private **/
  this._canvas = canvas;

  /** @private **/
  this._annotator = annotator;

  /** @private **/
  this._g2d = canvas.getContext('2d');

  /** @private **/
  this._anchor;

  /** @private **/
  this._opposite;

  /** @private **/
  this._enabled = false;

  /** @private **/
  this._mouseMoveListener;

  /** @private **/
  this._mouseUpListener;

  /** @private **/
  this._properties = {
    outline: '#000000',
    outlineWidth: 1,
    hiOutline: '#000000',
    hiOutlineWidth: 1,
    stroke: '#ffffff',
    strokeWidth: 1,
    hiStroke: '#fff000',
    hiStrokeWidth: 1.2,
    fill: undefined,
    hiFill: undefined,
    maskTransparency: 0.8,
    maskBorder: true
  };

  /** @private **/
  this._defaultProperties = Object.assign({}, this._properties);

  /** @private **/
  this._useFancyBox = false;
}

/**
 * Attaches MOUSEUP and MOUSEMOVE listeners to the editing canvas.
 * @private
 */
annotorious.plugins.selection.RectDragSelector.prototype._attachListeners = function (startPoint, limitShape) {
  var self = this;
  var canvas = this._canvas;

  this._mouseMoveListener = goog.events.listen(this._canvas, annotorious.events.ui.EventType.MOVE, function (event) {
    var points = annotorious.events.ui.sanitizeCoordinates(event, canvas);
    if (!self._enabled || (limitShape && !annotorious.shape.intersects(limitShape, points.x, points.y))) return;
    self._opposite = { x: points.x, y: points.y };

    self._g2d.clearRect(0, 0, canvas.width, canvas.height);

    var width = self._opposite.x - self._anchor.x;
    var height = self._opposite.y - self._anchor.y;

    var pixCurs = self._annotator.toItemPixelCoordinates(points);
    var pixBox = self._annotator.toItemPixelCoordinates({ x: self._anchor.x, y: self._anchor.y, width: width, height: height });
    self._annotator.fireEvent(annotorious.events.EventType.MOUSE_MOVE_ANNOTATABLE_ITEM, { "cursor": pixCurs, "box": pixBox }, event);

    if (self._useFancyBox) {
      var vb = self.getViewportBounds();
      height = Math.abs(height);
      width = Math.abs(width);

      self._g2d.lineWidth = self._g2d.lineWidth = self._properties.strokeWidth;
      self._g2d.strokeStyle = self._properties.stroke;
      self._g2d.fillStyle = 'rgba(0,0,0,0.45)';
      self._g2d.fillRect(0, 0, self._canvas.width, vb.top);
      self._g2d.fillRect(vb.right, vb.top, (self._canvas.width - vb.right), height);
      self._g2d.fillRect(0, vb.bottom, self._canvas.width, (self._canvas.height - vb.bottom));
      self._g2d.fillRect(0, vb.top, vb.left, height);
      self._g2d.strokeRect(vb.left + 0.5, vb.top + 0.5, width, height);
      return;
    }

    self.drawShape(self._g2d, {
      type: annotorious.shape.ShapeType.RECTANGLE,
      geometry: {
        x: width > 0 ? self._anchor.x : self._opposite.x,
        y: height > 0 ? self._anchor.y : self._opposite.y,
        width: Math.abs(width),
        height: Math.abs(height)
      },
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
annotorious.plugins.selection.RectDragSelector.prototype._detachListeners = function () {
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
annotorious.plugins.selection.RectDragSelector.prototype.getName = function () {
  return 'rect_drag';
}

/**
 * Selector API method: returns the supported shape type.
 *
 * @return the supported shape type
 */
annotorious.plugins.selection.RectDragSelector.prototype.getSupportedShapeType = function () {
  return [annotorious.shape.ShapeType.RECTANGLE, annotorious.shape.ShapeType.POINT];
}

/**
 * Set the Fancy Box Selector
 * @param {Boolean} enabled true if enable the Fancy Box Selector
 */
annotorious.plugins.selection.RectDragSelector.prototype.setFancyBox = function (enabled) {
  this._useFancyBox = enabled;
}

/**
 * Sets the properties on this selector.
 */
annotorious.plugins.selection.RectDragSelector.prototype.setProperties = function (props) {
  if (!(props instanceof Object) || Object.keys(props).length === 0) {
    this._properties = Object.assign({}, this._defaultProperties);
    return;
  }

  if (props.hasOwnProperty('outline'))
    this._properties.outline = props['outline'] || this._defaultProperties.outline;

  if (props.hasOwnProperty('outlineWidth'))
    this._properties.outlineWidth = props['outlineWidth'] || this._defaultProperties.outlineWidth;

  if (props.hasOwnProperty('hiOutline'))
    this._properties.hiOutline = props['hiOutline'] || this._defaultProperties.hiOutline;

  if (props.hasOwnProperty('hiOutlineWidth'))
    this._properties.hiOutlineWidth = props['hiOutlineWidth'] || this._defaultProperties.hiOutlineWidth;

  if (props.hasOwnProperty('stroke'))
    this._properties.stroke = props['stroke'] || this._defaultProperties.stroke;

  if (props.hasOwnProperty('strokeWidth'))
    this._properties.strokeWidth = props['strokeWidth'] || this._defaultProperties.strokeWidth;

  if (props.hasOwnProperty('hiStroke'))
    this._properties.hiStroke = props['hiStroke'] || this._defaultProperties.hiStroke;

  if (props.hasOwnProperty('hiStrokeWidth'))
    this._properties.hiStrokeWidth = props['hiStrokeWidth'] || this._defaultProperties.hiStrokeWidth;

  if (props.hasOwnProperty('fill'))
    this._properties.fill = props['fill'] || this._defaultProperties.fill;

  if (props.hasOwnProperty('hiFill'))
    this._properties.hiFill = props['hiFill'] || this._defaultProperties.hiFill;

  if (props.hasOwnProperty('maskTransparency'))
    this._properties.maskTransparency = props['maskTransparency'] || this._defaultProperties.maskTransparency;

  if (props.hasOwnProperty('maskBorder'))
    this._properties.maskBorder = (typeof props['maskBorder'] === "boolean") ? props['maskBorder'] : this._defaultProperties.maskBorder;

}

/**
 * Selector API method: starts the selection at the specified coordinates.
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 * @param {annotorious.shape.Shape | undefined} limitShape the shape of limit draw
 */
annotorious.plugins.selection.RectDragSelector.prototype.startSelection = function (x, y, limitShape) {
  var startPoint = {
    x: x,
    y: y
  };
  this._enabled = true;
  this._attachListeners(startPoint, limitShape);
  this._anchor = new annotorious.shape.geom.Point(x, y);
  this._annotator.fireEvent(annotorious.events.EventType.SELECTION_STARTED, {
    offsetX: x, offsetY: y
  });

  goog.style.setStyle(document.body, '-webkit-user-select', 'none');
}

/**
 * Selector API method: stops the selection.
 */
annotorious.plugins.selection.RectDragSelector.prototype.stopSelection = function () {
  this._detachListeners();
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
  goog.style.setStyle(document.body, '-webkit-user-select', 'auto');
  delete this._opposite;
}

/**
 * Selector API method: returns the currently edited shape.
 * @return {annotorious.shape.Shape | undefined} the shape
 */
annotorious.plugins.selection.RectDragSelector.prototype.getShape = function () {
  if (this._opposite &&
    (Math.abs(this._opposite.x - this._anchor.x) > 3) &&
    (Math.abs(this._opposite.y - this._anchor.y) > 3)) {

    var viewportBounds = this.getViewportBounds();
    var rect = this._annotator.toItemCoordinates({ // conversion to fraction 
      x: viewportBounds.left,
      y: viewportBounds.top,
      width: viewportBounds.right - viewportBounds.left,
      height: viewportBounds.bottom - viewportBounds.top
    });

    return new annotorious.shape.Shape(annotorious.shape.ShapeType.RECTANGLE, rect);
  }
  return undefined;
}

/**
 * Selector API method: returns the bounds of the selected shape, in viewport (= pixel) coordinates.
 * @returns {Object} the shape viewport bounds
 */
annotorious.plugins.selection.RectDragSelector.prototype.getViewportBounds = function () {
  var right, left;
  if (this._opposite.x > this._anchor.x) {
    right = this._opposite.x;
    left = this._anchor.x;
  } else {
    right = this._anchor.x;
    left = this._opposite.x;
  }

  var top, bottom;
  if (this._opposite.y > this._anchor.y) {
    top = this._anchor.y;
    bottom = this._opposite.y;
  } else {
    top = this._opposite.y;
    bottom = this._anchor.y;
  }

  return { top: top, right: right, bottom: bottom, left: left };
}

/**
 * TODO not sure if this is really the best way/architecture to handle viewer shape drawing
 * @param {Object} g2d graphics context
 * @param {annotorious.shape.Shape} shape the shape to draw
 * @param {boolean=} highlight if true, shape will be drawn highlighted
 */
annotorious.plugins.selection.RectDragSelector.prototype.drawShape = function (g2d, shape, highlight) {
  var geom = shape.geometry, stroke, fill, outline, outlineWidth, strokeWidth;

  if (!shape.style) shape.style = {};

  if (shape.type == annotorious.shape.ShapeType.RECTANGLE) {
    if (highlight) {
      fill = shape.style.hiFill || this._properties.hiFill;
      stroke = shape.style.hiStroke || this._properties.hiStroke;
      outline = shape.style.hiOutline || this._properties.hiOutline;
      outlineWidth = shape.style.hiOutlineWidth || this._properties.hiOutlineWidth;
      strokeWidth = shape.style.hiStrokeWidth || this._properties.hiStrokeWidth;
    } else {
      fill = shape.style.fill || this._properties.fill;
      stroke = shape.style.stroke || this._properties.stroke;
      outline = shape.style.outline || this._properties.outline;
      outlineWidth = shape.style.outlineWidth || this._properties.outlineWidth;
      strokeWidth = shape.style.strokeWidth || this._properties.strokeWidth;
    }


    var tempGeom = Object.assign({}, geom);
    if (geom.rotation != undefined && (!shape.mask || (shape.mask && shape.hasOwnProperty("_loadedMask")))) {
      g2d.save();
      g2d.beginPath();

      //g2d.translate((this._canvas.width / 2), (this._canvas.height / 2));
      g2d.translate((geom.x + geom.width / 2), (geom.y + geom.height / 2));
      g2d.rotate(geom.rotation * Math.PI / 180);
    }

    //annotation has a mask
    if (shape.mask) {
      if (!shape.hasOwnProperty("_loadedMask") || shape["_loadedMask"].url != shape.mask) {
        Object.defineProperty(shape, "_loadedMask", {
          enumerable: false,
          writable: true
        });
        var self = this;
        shape["_loadedMask"] = {
          image: new Image,
          url: shape.mask
        }
        shape["_loadedMask"].image.onload = function () {
          self.drawShape(g2d, shape, highlight);
        }
        shape["_loadedMask"].image.src = shape.mask;
      }
      if (shape["_loadedMask"].image) {
        g2d.globalAlpha = shape.style.maskTransparency || this._properties.maskTransparency;
        if (geom.rotation != undefined) g2d.drawImage(shape["_loadedMask"].image, -geom.x, -geom.y, geom.width, geom.height);
        else g2d.drawImage(shape["_loadedMask"].image, geom.x, geom.y, geom.width, geom.height);
        g2d.globalAlpha = 1;

        if ((shape.style.maskBorder != undefined && !shape.style.maskBorder) || (shape.style.maskBorder == undefined && !this._properties.maskBorder)) return;

        if (geom.rotation != undefined) geom = { x: geom.x + strokeWidth + outlineWidth, y: geom.y + strokeWidth + outlineWidth, width: geom.width + strokeWidth + outlineWidth, height: geom.height + strokeWidth + outlineWidth, rotation: geom.rotation };
        else geom = { x: geom.x - strokeWidth - outlineWidth, y: geom.y - strokeWidth - outlineWidth, width: geom.width + strokeWidth + outlineWidth, height: geom.height + strokeWidth + outlineWidth, rotation: geom.rotation };
      }
    }

    if (geom.rotation != undefined && (!shape.mask || (shape.mask && shape.hasOwnProperty("_loadedMask")))) {
      var tempGeom = Object.assign({}, geom);
      geom.x *= -1;
      geom.y *= -1;
    }

    // Outline
    g2d.lineJoin = "round";
    g2d.lineWidth = outlineWidth;
    g2d.strokeStyle = outline;
    g2d.strokeRect(
      geom.x + outlineWidth / 2,
      geom.y + outlineWidth / 2,
      geom.width - outlineWidth,
      geom.height - outlineWidth
    );

    // Stroke    
    g2d.lineJoin = "miter";
    g2d.lineWidth = strokeWidth;
    g2d.strokeStyle = stroke;
    g2d.strokeRect(
      geom.x + outlineWidth + strokeWidth / 2,
      geom.y + outlineWidth + strokeWidth / 2,
      geom.width - outlineWidth * 2 - strokeWidth,
      geom.height - outlineWidth * 2 - strokeWidth
    );

    // Fill   
    if (fill) {
      g2d.lineJoin = "miter";
      g2d.lineWidth = strokeWidth;
      g2d.fillStyle = fill;
      g2d.fillRect(
        geom.x + outlineWidth + strokeWidth / 2,
        geom.y + outlineWidth + strokeWidth / 2,
        geom.width - outlineWidth * 2 - strokeWidth,
        geom.height - outlineWidth * 2 - strokeWidth
      );
    }

    if (geom.rotation != undefined) {
      g2d.restore();
      geom.x = tempGeom.x;
      geom.y = tempGeom.y;
    }

    return;
  }

  if (shape.type == annotorious.shape.ShapeType.POINT) {
    fill = shape.style.fill || this._properties.fill;
    strokeWidth = shape.style.strokeWidth || this._properties.strokeWidth;
    g2d.beginPath();
    g2d.fillStyle = fill;
    g2d.arc(geom.x, geom.y, strokeWidth, 0, strokeWidth * Math.PI, false);
    g2d.fill();
  }
}

/**
 * Move the rectangle to the new point as the center
 * @param {Object} g2d graphics context
 * @param {annotorious.shape.Shape} shape the shape to draw
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
annotorious.plugins.selection.RectDragSelector.prototype.moveShape = function (g2d, shape, x, y) {
  if (shape.type != annotorious.shape.ShapeType.RECTANGLE) return;

  var point = new annotorious.shape.geom.Point(x, y);
  var geo = shape.geometry;
  geo.x = point.x - geo.width / 2;
  geo.y = point.y - geo.height / 2;

  this.drawShape(g2d, shape);
  return shape;
}

/**
 * Rotate the rectangle by calculating the angle based on the new point and the center of the rectangle
 * @param {Object} g2d graphics context
 * @param {annotorious.shape.Shape} shape the shape to draw
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
annotorious.plugins.selection.RectDragSelector.prototype.rotateShape = function (g2d, shape, x, y) {
  if (shape.type != annotorious.shape.ShapeType.RECTANGLE) return;

  var coordinate = new annotorious.shape.geom.Point(x, y);
  var geom = shape.geometry;
  var center = new annotorious.shape.geom.Point((geom.x + (geom.width / 2)), (geom.y + (geom.height / 2)));

  var rotation = Math.atan2(coordinate.y - center.y, coordinate.x - center.x) * 180 / Math.PI;
  geom.rotation = rotation;

  this.drawShape(g2d, shape);

  return shape;
}
