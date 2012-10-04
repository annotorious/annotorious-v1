goog.provide('yuma.selection.DragSelector');

goog.require('goog.events');

/**
 * Click-and-drag-style selector.
 * @param {Element} canvas the canvas to draw on
 * @param {yuma.modules.image.ImageAnnotator} annotator reference to the annotator
 * @constructor
 */
yuma.selection.DragSelector = function(canvas, annotator) {
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
  this._selection;

  // TODO handle this with listener (de)registration rather than a flag
  this._enabled = false;

  var self = this;  
  goog.events.listen(canvas, goog.events.EventType.MOUSEMOVE, function(event) {
    if (self._enabled) {
      self._selection = new yuma.geom.Rectangle(
        self._anchor.x, 
        self._anchor.y,
        event.offsetX - self._anchor.x,
        event.offsetY - self._anchor.y
      );

      self._g2d.clearRect(0, 0, canvas.width, canvas.height);
      
      self._g2d.strokeStyle = '#000000';
      self._g2d.strokeRect(self._selection.x + 0.5, self._selection.y + 0.5,
                           self._selection.width, self._selection.height);
      self._g2d.strokeStyle = '#ffffff';
      self._g2d.strokeRect(self._selection.x + 1.5, self._selection.y + 1.5,
                           self._selection.width - 2, self._selection.height - 2);
    }
  });

  goog.events.listen(canvas, goog.events.EventType.MOUSEUP, function(event) {
    self._enabled = false;    
    self._annotator.fireEvent(yuma.events.EventType.SELECTION_COMPLETED,
      { mouseEvent: event, shape: new yuma.annotation.Shape(yuma.annotation.ShapeType.RECTANGLE, self._selection) });
  });
}

/**
 * Starts the selection at the specified coordinates.
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
yuma.selection.DragSelector.prototype.startSelection = function(x, y) {
  this._enabled = true;
  this._anchor = new yuma.geom.Point(x, y);
  this._annotator.fireEvent(yuma.events.EventType.SELECTION_STARTED, {
    offsetX: x, offsetY: y});
  
  goog.style.setStyle(document.body, '-webkit-user-select', 'none');
}

/**
 * Stops the selection.
 */
yuma.selection.DragSelector.prototype.stopSelection = function() {
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
  goog.style.setStyle(document.body, '-webkit-user-select', 'auto');
}

/**
 * Returns the currently selected shape
 * @return {yuma.annotation.Shape} the shape
 */
yuma.selection.DragSelector.prototype.getShape = function() {
  return new yuma.annotation.Shape(yuma.annotation.ShapeType.RECTANGLE, this._selection)
}
