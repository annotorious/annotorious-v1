goog.provide('annotorious.plugins.selection.RectDragSelector');

goog.require('goog.events');

goog.require('annotorious.events.ui');

/**
 * The default selector: a simple click-and-drag rectangle selection tool.
 * @constructor
 */
annotorious.plugins.selection.RectDragSelector = function() { }

/**
 * Initializes the selector.
 * @param {Element} canvas the canvas to draw on
 * @param {Object} annotator reference to the annotator
 */
annotorious.plugins.selection.RectDragSelector.prototype.init = function(annotator, canvas) {
  /** @private **/
  this._OUTLINE = '#000000';

  /** @private **/
  this._STROKE = '#ffffff';
  
  /** @private **/
  this._FILL = false;
  
  /** @private **/
  this._HI_STROKE = '#fff000';
  
  /** @private **/
  this._HI_FILL = false;
	
  /** @private **/
  this._canvas = canvas;
  
  /** @private **/
  this._annotator = annotator;

  /** @private **/
  this._g2d = canvas.getContext('2d');
  this._g2d.lineWidth = 1;
 
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
}

/**
 * Attaches MOUSEUP and MOUSEMOVE listeners to the editing canvas.
 * @private
 */
annotorious.plugins.selection.RectDragSelector.prototype._attachListeners = function(startPoint) {
  var self = this;  
  var canvas = this._canvas;
  
  this._mouseMoveListener = goog.events.listen(this._canvas, annotorious.events.ui.EventType.MOVE, function(event) {
    var points = annotorious.events.ui.sanitizeCoordinates(event, canvas);
    if (self._enabled) {
      self._opposite = { x: points.x, y: points.y };

      self._g2d.clearRect(0, 0, canvas.width, canvas.height);
      
      var width = self._opposite.x - self._anchor.x;
      var height = self._opposite.y - self._anchor.y;
      
      self._g2d.strokeStyle = self._OUTLINE;
      self._g2d.strokeRect(self._anchor.x + 0.5, self._anchor.y + 0.5, width, height);
      self._g2d.strokeStyle = self._STROKE;

      if (width > 0 && height > 0) {
        self._g2d.strokeRect(self._anchor.x + 1.5, self._anchor.y + 1.5, width - 2, height - 2);
      } else if (width > 0 && height < 0) {
        self._g2d.strokeRect(self._anchor.x + 1.5, self._anchor.y - 0.5, width - 2, height + 2);
      } else if (width < 0 && height < 0) {
        self._g2d.strokeRect(self._anchor.x - 0.5, self._anchor.y - 0.5, width + 2, height + 2);
      } else {
        self._g2d.strokeRect(self._anchor.x - 0.5, self._anchor.y + 1.5, width + 2, height - 2);
      }
    }
  });

  this._mouseUpListener = goog.events.listen(canvas, annotorious.events.ui.EventType.UP, function(event) {
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
annotorious.plugins.selection.RectDragSelector.prototype._detachListeners = function() {
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
annotorious.plugins.selection.RectDragSelector.prototype.getName = function() {
  return 'rect_drag';
}

/**
 * Selector API method: returns the supported shape type.
 *
 * TODO support for multiple shape types?
 *
 * @return the supported shape type
 */
annotorious.plugins.selection.RectDragSelector.prototype.getSupportedShapeType = function() {
  return annotorious.shape.ShapeType.RECTANGLE;
}

/**
 * Sets the properties on this selector.
 */
annotorious.plugins.selection.RectDragSelector.prototype.setProperties = function(props) {  
  if (props['outline'])
    this._OUTLINE = props['outline'];

  if (props['stroke'])
    this._STROKE = props['stroke'];
 
  if (props['fill'])
    this._FILL = props['fill'];  
    
  if (props['hi_stroke'])
    this._HI_STROKE = props['hi_stroke'];

  if (props['hi_fill'])
    this._HI_FILL = props['hi_fill'];
}

/**
 * Selector API method: starts the selection at the specified coordinates.
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
annotorious.plugins.selection.RectDragSelector.prototype.startSelection = function(x, y) {
  var startPoint = {
    x: x,
    y: y
  };
  this._enabled = true;
  this._attachListeners(startPoint);
  this._anchor = new annotorious.shape.geom.Point(x, y);
  this._annotator.fireEvent(annotorious.events.EventType.SELECTION_STARTED, {
    offsetX: x, offsetY: y});
  
  goog.style.setStyle(document.body, '-webkit-user-select', 'none');
}

/**
 * Selector API method: stops the selection.
 */
annotorious.plugins.selection.RectDragSelector.prototype.stopSelection = function() {
  this._detachListeners();
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
  goog.style.setStyle(document.body, '-webkit-user-select', 'auto');
  delete this._opposite;
}

/**
 * Selector API method: returns the currently edited shape.
 * @return {annotorious.shape.Shape | undefined} the shape
 */
annotorious.plugins.selection.RectDragSelector.prototype.getShape = function() {
  if (this._opposite && 
     (Math.abs(this._opposite.x - this._anchor.x) > 3) && 
     (Math.abs(this._opposite.y - this._anchor.y) > 3)) {
       
    var viewportBounds = this.getViewportBounds();
    var item_anchor = this._annotator.toItemCoordinates({x: viewportBounds.left, y: viewportBounds.top});
    var item_opposite = this._annotator.toItemCoordinates({x: viewportBounds.right - 1, y: viewportBounds.bottom - 1});
 
    var rect = new annotorious.shape.geom.Rectangle(
      item_anchor.x,
      item_anchor.y,
      item_opposite.x - item_anchor.x,
      item_opposite.y - item_anchor.y
    );

    return new annotorious.shape.Shape(annotorious.shape.ShapeType.RECTANGLE, rect);
  } else {
    return undefined;
  }
}

/**
 * Selector API method: returns the bounds of the selected shape, in viewport (= pixel) coordinates.
 * @returns {Object} the shape viewport bounds
 */
annotorious.plugins.selection.RectDragSelector.prototype.getViewportBounds = function() {
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
  
  return {top: top, right: right, bottom: bottom, left: left};
}

/**
 * TODO not sure if this is really the best way/architecture to handle viewer shape drawing
 * @param {Object} g2d graphics context
 * @param {annotorious.shape.Shape} shape the shape to draw
 * @param {boolean=} highlight if true, shape will be drawn highlighted
 */
annotorious.plugins.selection.RectDragSelector.prototype.drawShape = function(g2d, shape, highlight) {
  var geom, stroke, fill;
  
  if (shape.type == annotorious.shape.ShapeType.RECTANGLE) {
    if (highlight) {
      g2d.lineWidth = 1.2;
      stroke = this._HI_STROKE;
      fill = this._HI_FILL;
    } else {
      g2d.lineWidth = 1;
      stroke = this._STROKE;
      fill = this._FILL;
    }

    geom = shape.geometry;

    // Outline
    g2d.strokeStyle = this._OUTLINE;      
    g2d.strokeRect(geom.x + 0.5, geom.y + 0.5, geom.width + 1, geom.height + 1);

    // Stroke
    g2d.strokeStyle = stroke;
    g2d.strokeRect(geom.x + 1.5, geom.y + 1.5, geom.width - 1, geom.height - 1);
 
    // Fill   
    if (fill) {
      g2d.fillStyle = fill;
      g2d.fillRect(geom.x + 1.5, geom.y + 1.5, geom.width - 1, geom.height - 1);
    }
  }
}
