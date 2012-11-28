goog.provide('annotorious.selection.DragSelector');

goog.require('goog.events');

/**
 * Click-and-drag-style selector.
 * @param {Element} canvas the canvas to draw on
 * @param {yuma.modules.image.ImageAnnotator} annotator reference to the annotator
 * @constructor
 */
annotorious.selection.DragSelector = function(canvas, annotator) {
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

  var self = this;  
  goog.events.listen(canvas, goog.events.EventType.MOUSEMOVE, function(event) {
    if (self._enabled) {
      self._opposite = { x: event.offsetX, y: event.offsetY };

      self._g2d.clearRect(0, 0, canvas.width, canvas.height);
      
      var width = self._opposite.x - self._anchor.x;
      var height = self._opposite.y - self._anchor.y;
      
      self._g2d.strokeStyle = '#000000';
      self._g2d.strokeRect(self._anchor.x + 0.5, self._anchor.y + 0.5, width, height);
      self._g2d.strokeStyle = '#ffffff';
      self._g2d.strokeRect(self._anchor.x + 1.5, self._anchor.y + 1.5, width - 2, height - 2);
    }
  });

  goog.events.listen(canvas, goog.events.EventType.MOUSEUP, function(event) {
    self._enabled = false;
    var shape = self.getShape();
    if (shape) {
      self._annotator.fireEvent(annotorious.events.EventType.SELECTION_COMPLETED,
        { mouseEvent: event, shape: shape, viewportBounds: self.getViewportBounds() }); 
    } else {
      self._annotator.fireEvent(annotorious.events.EventType.SELECTION_CANCELED); 
    }
  });
}

/**
 * Starts the selection at the specified coordinates.
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
annotorious.selection.DragSelector.prototype.startSelection = function(x, y) {
  this._enabled = true;
  this._anchor = new annotorious.geom.Point(x, y);
  this._annotator.fireEvent(annotorious.events.EventType.SELECTION_STARTED, {
    offsetX: x, offsetY: y});
  
  goog.style.setStyle(document.body, '-webkit-user-select', 'none');
}

/**
 * Stops the selection.
 */
annotorious.selection.DragSelector.prototype.stopSelection = function() {
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
  goog.style.setStyle(document.body, '-webkit-user-select', 'auto');
  delete this._opposite;
}

/**
 * The currently edited shape
 *
 * TODO remove this method - pass via events instead!
 */
annotorious.selection.DragSelector.prototype.getShape = function() {
  var item_anchor = this._annotator.toItemCoordinates(this._anchor);
  var item_opposite = this._annotator.toItemCoordinates({x: this._opposite.x - 1, y: this._opposite.y - 1});
  
  if (item_opposite) {
    var rect = new annotorious.geom.Rectangle(
      item_anchor.x,
      item_anchor.y,
      item_opposite.x - item_anchor.x,
      item_opposite.y - item_anchor.y
    );

    return new annotorious.annotation.Shape(annotorious.annotation.ShapeType.RECTANGLE, rect);
  } else {
    return undefined;
  }
}

annotorious.selection.DragSelector.prototype.getViewportBounds = function() {
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