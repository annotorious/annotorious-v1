goog.provide('yuma.selection.DragSelector');

goog.require('goog.events');
goog.require('goog.events.EventTarget');

goog.require('yuma.events');
goog.require('yuma.Annotation');
goog.require('yuma.geom.Point');
goog.require('yuma.geom.Rectangle');


/**
 * Simple click-and-drag-style selector
 * @param {Element} canvas
 * @constructor
 * @extends {goog.events.EventTarget}
 */
yuma.selection.DragSelector = function(canvas) {
  var g2d = canvas.getContext('2d');
  g2d.lineWidth = 1;
  g2d.strokeStyle = '#ffffff';
 
  /** @private **/
  this._anchor; 

  /** @private **/
  this._selection;

  var self = this;
  goog.events.listen(canvas, goog.events.EventType.MOUSEMOVE, function(event) {
    self._selection = new yuma.geom.Rectangle(
      self._anchor.x, 
      self._anchor.y,
      event.offsetX - self._anchor.x,
      event.offsetY - self._anchor.y
    );

    g2d.clearRect(0, 0, canvas.width, canvas.height);
    g2d.strokeRect(self._selection.x + 0.5, self._selection.y + 0.5, self._selection.width, self._selection.height);
  });

  goog.events.listen(canvas, goog.events.EventType.MOUSEUP, function(event) {
    self.dispatchEvent(yuma.events.EventType.SELECTION_CREATED);
    g2d.clearRect(0, 0, canvas.width, canvas.height);
  });

  yuma.events.EventBroker.getInstance().registerEventTarget(this, [
    yuma.events.EventType.SELECTION_CREATED
  ]);
}
goog.inherits(yuma.selection.DragSelector, goog.events.EventTarget);


/**
 * Starts the selection at the specified coordinates.
 * @param {number} x the X coordinate
 * @param {number} y the Y coordinate
 */
yuma.selection.DragSelector.prototype.startSelection = function(x, y) {
  this._anchor = new yuma.geom.Point(x, y);
}


/**
 * Returns the currently selected shape
 * @returns {yuma.Annotation.Shape} the shape
 */
yuma.selection.DragSelector.prototype.getShape = function() {
  return new yuma.Annotation.Shape(
    yuma.Annotation.ShapeType.RECTANGLE,
    this._selection
  );
}

