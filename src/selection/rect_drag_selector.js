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
    maskTransparency: 0.8
  }

  /** @private **/
  this._defaultProperties = Object.assign({}, this._properties);
}

/**
 * Attaches MOUSEUP and MOUSEMOVE listeners to the editing canvas.
 * @private
 */
annotorious.plugins.selection.RectDragSelector.prototype._attachListeners = function (startPoint) {
  var self = this;
  var canvas = this._canvas;
  var image = this._annotator.getItem().element;

  this._mouseMoveListener = goog.events.listen(this._canvas, annotorious.events.ui.EventType.MOVE, function (event) {
    var points = annotorious.events.ui.sanitizeCoordinates(event, canvas);
    if (self._enabled) {
      self._opposite = { x: points.x, y: points.y };

      self._g2d.clearRect(0, 0, canvas.width, canvas.height);

      var width = self._opposite.x - self._anchor.x;
      var height = self._opposite.y - self._anchor.y;

      var cX = parseInt((image.naturalWidth * event.offsetX) / event.target.width);
      var cY = parseInt((image.naturalHeight * event.offsetY) / event.target.height);
      var aX = parseInt((image.naturalWidth * self._anchor.x) / event.target.width);
      var aY = parseInt((image.naturalHeight * self._anchor.y) / event.target.height);
      var aW = Math.abs(cX - aX);
      var aH = Math.abs(cY - aY);
      self._annotator.fireEvent(annotorious.events.EventType.MOUSE_MOVE_ANNOTATABLE_ITEM, { "cursor": { x: cX, y: cY }, "box": { x: aX, y: aY, width: aW, height: aH } }, event);

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
    }
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
 * TODO support for multiple shape types?
 *
 * @return the supported shape type
 */
annotorious.plugins.selection.RectDragSelector.prototype.getSupportedShapeType = function () {
  return annotorious.shape.ShapeType.RECTANGLE;
}

/**
 * Sets the properties on this selector.
 */
annotorious.plugins.selection.RectDragSelector.prototype.setProperties = function (props) {
  if (!(props instanceof Object) || Object.keys(props).length === 0) {
    this._properties = Object.assign({}, this._defaultProperties);
    return;
  }

  if (props.hasOwnProperty('outline')) {
    if (props['outline']) this._properties.outline = props['outline'];
    else this._properties.outline = this._defaultProperties.outline;
  }
  if (props.hasOwnProperty('outlineWidth')) {
    if (props['outlineWidth']) this._properties.outlineWidth = props['outlineWidth'];
    else this._properties.outlineWidth = this._defaultProperties.outlineWidth;
  }
  if (props.hasOwnProperty('hiOutline')) {
    if (props['hiOutline']) this._properties.hiOutline = props['hiOutline'];
    else this._properties.hiOutline = this._defaultProperties.hiOutline;
  }
  if (props.hasOwnProperty('hiOutlineWidth')) {
    if (props['hiOutlineWidth']) this._properties.hiOutlineWidth = props['hiOutlineWidth'];
    else this._properties.hiOutlineWidth = this._defaultProperties.hiOutlineWidth;
  }
  if (props.hasOwnProperty('stroke')) {
    if (props['stroke']) this._properties.stroke = props['stroke'];
    else this._properties.stroke = this._defaultProperties.stroke;
  }
  if (props.hasOwnProperty('strokeWidth')) {
    if (props['strokeWidth']) this._properties.strokeWidth = props['strokeWidth'];
    else this._properties.strokeWidth = this._defaultProperties.strokeWidth;
  }
  if (props.hasOwnProperty('hiStroke')) {
    if (props['hiStroke']) this._properties.hiStroke = props['hiStroke'];
    else this._properties.hiStroke = this._defaultProperties.hiStroke;
  }
  if (props.hasOwnProperty('hiStrokeWidth')) {
    if (props['hiStrokeWidth']) this._properties.hiStrokeWidth = props['hiStrokeWidth'];
    else this._properties.hiStrokeWidth = this._defaultProperties.hiStrokeWidth;
  }
  if (props.hasOwnProperty('fill')) {
    if (props['fill']) this._properties.fill = props['fill'];
    else this._properties.fill = this._defaultProperties.fill;
  }
  if (props.hasOwnProperty('hiFill')) {
    if (props['hiFill']) this._properties.hiFill = props['hiFill'];
    else this._properties.hiFill = this._defaultProperties.hiFill;
  }
  if (props.hasOwnProperty('maskTransparency')) {
    if (props['maskTransparency']) this._properties.maskTransparency = props['maskTransparency'];
    else this._properties.maskTransparency = this._defaultProperties.maskTransparency;
  }
}

/**
 * Selector API method: starts the selection at the specified coordinates.
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
annotorious.plugins.selection.RectDragSelector.prototype.startSelection = function (x, y) {
  var startPoint = {
    x: x,
    y: y
  };
  this._enabled = true;
  this._attachListeners(startPoint);
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
    // var item_anchor = this._annotator.toItemCoordinates({x: viewportBounds.left, y: viewportBounds.top});
    // var item_opposite = this._annotator.toItemCoordinates({x: viewportBounds.right, y: viewportBounds.bottom});

    /*
    var rect = new annotorious.shape.geom.Rectangle(
      item_anchor.x,
      item_anchor.y,
      item_opposite.x - item_anchor.x,
      item_opposite.y - item_anchor.y
    );*/
    var rect = this._annotator.toItemCoordinates({
      x: viewportBounds.left,
      y: viewportBounds.top,
      width: viewportBounds.right - viewportBounds.left,
      height: viewportBounds.bottom - viewportBounds.top
    });

    return new annotorious.shape.Shape(annotorious.shape.ShapeType.RECTANGLE, rect);
  } else {
    return undefined;
  }
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
  var geom, stroke, fill, outline, outlineWidth, strokeWidth;

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

    geom = shape.geometry;

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
      g2d.globalAlpha = shape.style.maskTransparency || this._properties.maskTransparency;
      g2d.drawImage(shape["_loadedMask"].image, geom.x, geom.y, geom.width, geom.height);
      geom = { x: geom.x - strokeWidth - outlineWidth, y: geom.y - strokeWidth - outlineWidth, width: geom.width + strokeWidth + outlineWidth, height: geom.height + strokeWidth + outlineWidth };
    }

    g2d.globalAlpha = 1;
    // Outline
    if (outline) {
      g2d.lineJoin = "round";
      g2d.lineWidth = outlineWidth;
      g2d.strokeStyle = outline;
      g2d.strokeRect(
        geom.x + outlineWidth / 2,
        geom.y + outlineWidth / 2,
        geom.width - outlineWidth,
        geom.height - outlineWidth
      );
    }

    // Stroke
    if (stroke) {
      g2d.lineJoin = "miter";
      g2d.lineWidth = strokeWidth;
      g2d.strokeStyle = stroke;
      g2d.strokeRect(
        geom.x + outlineWidth + strokeWidth / 2,
        geom.y + outlineWidth + strokeWidth / 2,
        geom.width - outlineWidth * 2 - strokeWidth,
        geom.height - outlineWidth * 2 - strokeWidth
      );
    }

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
  }
}
