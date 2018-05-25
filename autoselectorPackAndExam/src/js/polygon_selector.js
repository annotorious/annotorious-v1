/**
 * Plugin wrapper.
 * @param {Object} config_opts configuration options
 * @constructor
 */
annotorious.plugin.PolygonSelector = function(config_opts) { 
  if (config_opts)
    this._activate = config_opts.activate;
}

/**
 * Attach a new selector onInitAnnotator.
 */
annotorious.plugin.PolygonSelector.prototype.onInitAnnotator = function(annotator) {
  annotator.addSelector(new annotorious.plugin.PolygonSelector.Selector());
  if (this._activate)
    annotator.setCurrentSelector('polygon');
}

/**
 * A polygon selector.
 * @constructor
 */
annotorious.plugin.PolygonSelector.Selector = function() { }

annotorious.plugin.PolygonSelector.Selector.prototype.init = function(annotator, canvas) {
  /** @private **/
  this._annotator = annotator;

  /** @private **/
  this._canvas = canvas;  

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
annotorious.plugin.PolygonSelector.Selector.prototype._attachListeners = function() {
  var self = this;  

  var refresh = function(last, highlight_last) {
    self._g2d.clearRect(0, 0, self._canvas.width, self._canvas.height);

    // Outer line
    self._g2d.lineWidth = 2.5;
    self._g2d.strokeStyle = '#000000';    
    self._g2d.beginPath();
    self._g2d.moveTo(self._anchor.x, self._anchor.y);
    
    // TODO replace with goog.array.forEach  
    for (var i=0; i<self._points.length; i++) { 
      self._g2d.lineTo(self._points[i].x, self._points[i].y);
    };

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

    // TODO replace with goog.array.forEach
    for (var i=0; i<self._points.length; i++) {
      self._g2d.lineTo(self._points[i].x, self._points[i].y);
    };
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

  this._mouseMoveListener = function(event) {
    if (self._enabled) {
      if (event.offsetX == undefined) {
        event.offsetX = event.layerX;
        event.offsetY = event.layerY;
      }

      self._mouse = { x: event.offsetX, y: event.offsetY };
      refresh(self._mouse, isClosable(event.offsetX, event.offsetY));
    }
  };

  this._canvas.addEventListener('mousemove', this._mouseMoveListener);

  this._mouseUpListener = function(event) {
    if (event.offsetX == undefined) {
      event.offsetX = event.layerX;
      event.offsetY = event.layerY;
    }

    if (isClosable(event.offsetX, event.offsetY)) {
      self._enabled = false;
      refresh(self._anchor);
      self._annotator.fireEvent('onSelectionCompleted',
        { mouseEvent: event, shape: self.getShape(), viewportBounds: self.getViewportBounds() }); 
    } else {
      self._points.push({ x: event.offsetX, y: event.offsetY });
    }
  };

  this._canvas.addEventListener('mouseup', this._mouseUpListener);
}

/**
 * Detaches MOUSEUP and MOUSEMOVE listeners from the editing canvas.
 * @private
 */
annotorious.plugin.PolygonSelector.Selector.prototype._detachListeners = function() {
  var self = this;
  if (this._mouseMoveListener) {
     this._canvas.removeEventListener("mousemove", self._mouseMoveListener);
  }

  if (this._mouseUpListener) {
     this._canvas.removeEventListener("mouseup", self._mouseUpListener);
  }
}

/**
 * Selector API method: returns the selector name.
 * @returns the selector name
 */
annotorious.plugin.PolygonSelector.Selector.prototype.getName = function() {
  return 'polygon';
}

/**
 * Selector API method: returns the supported shape type.
 *
 * TODO support for multiple shape types?
 *
 * @return the supported shape type
 */
annotorious.plugin.PolygonSelector.Selector.prototype.getSupportedShapeType = function() {
  return 'polygon';
}


/**
 * Selector API method: starts the selection at the specified coordinates.
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
annotorious.plugin.PolygonSelector.Selector.prototype.startSelection = function(x, y) {
  this._enabled = true;
  this._attachListeners();
  this._anchor = { x: x, y: y };
  this._annotator.fireEvent('onSelectionStarted', { offsetX: x, offsetY: y });
  
  // goog.style.setStyle(document.body, '-webkit-user-select', 'none');
}

/**
 * Selector API method: stops the selection.
 */
annotorious.plugin.PolygonSelector.Selector.prototype.stopSelection = function() {
  this._points = [];
  this._detachListeners();
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
  // goog.style.setStyle(document.body, '-webkit-user-select', 'auto');
}

/**
 * Selector API method: returns the currently edited shape.
 * @returns {annotorious.shape.Shape} the shape
 */
annotorious.plugin.PolygonSelector.Selector.prototype.getShape = function() {
  var points = [];
  points.push(this._annotator.toItemCoordinates(this._anchor));
  
  var self = this;
  // goog.array.forEach(this._points, function(pt) {
  for (var i=0; i<this._points.length; i++) {
    points.push(self._annotator.toItemCoordinates(this._points[i]));
  }

  return { type: 'polygon', geometry: { points: points } };
}

/**
 * Selector API method: returns the bounds of the selected shape, in viewport (= pixel) coordinates.
 * @returns {object} the shape viewport bounds
 */
annotorious.plugin.PolygonSelector.Selector.prototype.getViewportBounds = function() {
  var right = this._anchor.x;
  var left = this._anchor.x;
  var top = this._anchor.y;
  var bottom = this._anchor.y;

  // TODO replace with goog.array.forEach
  for (var i=0; i<this._points.length; i++) {
    var pt = this._points[i];

    if (pt.x > right)
      right = pt.x;

    if (pt.x < left)
      left = pt.x;

    if (pt.y > bottom)
      bottom = pt.y;

    if (pt.y < top)
      top = pt.y;
  };

  return { top: top, right: right, bottom: bottom, left: left };
}

/**
 * TODO not sure if this is really the best way/architecture to handle viewer shape drawing 
 */

var i = 100; 

annotorious.plugin.PolygonSelector.Selector.prototype.drawShape = function(g2d, shape, highlight) {
  var color;
  if (highlight) {
    color = '#fff000';
  } else {
    color = '#ffffff';
  }

  // TODO check if it's really a polyogn
  // Outer line
  g2d.lineWidth = 1.3;
  g2d.strokeStyle = '#000000';
 
  g2d.beginPath();
  g2d.moveTo(0 + i, 0 + i);
  g2d.lineTo(500,1500);
  g2d.stroke();

  // Inner line
  g2d.lineWidth = 1.2;
  g2d.strokeStyle = color;
  
  g2d.beginPath();
  g2d.moveTo(200,300);
  g2d.lineTo(1200, 1200);
  g2d.stroke();

  i = i + 20;
}

