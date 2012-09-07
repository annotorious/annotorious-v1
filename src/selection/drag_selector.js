goog.provide('yuma.selection.DragSelector');

goog.require('goog.events');
goog.require('goog.events.EventTarget');

goog.require('yuma.Annotation');
goog.require('yuma.geom.Point');
goog.require('yuma.geom.Rectangle');
goog.require('yuma.events');

/**
 * Simple click-and-drag-style selector
 * @param {!Element} canvas
 * @constructor
 * @extends {goog.events.EventTarget}
 */
yuma.selection.DragSelector = function(canvas) {
  var g2d = canvas.getContext('2d');
  g2d.lineWidth = 1;
  g2d.strokeStyle = '#ffffff';
 
  /** @private **/
  this.anchor; 

  /** @private **/
  this.selection;

  var self = this;

  var moveListener = function(event) {
    self.selection = new yuma.geom.Rectangle(
      self.anchor.x, 
      self.anchor.y,
      event.offsetX - self.anchor.x,
      event.offsetY - self.anchor.y
    );

    g2d.clearRect(0, 0, canvas.width, canvas.height);
    g2d.strokeRect(self.selection.x + 0.5, self.selection.y + 0.5, self.selection.width, self.selection.height);
  }

  goog.events.listen(canvas, goog.events.EventType.MOUSEMOVE, moveListener);  

  goog.events.listen(canvas, goog.events.EventType.MOUSEUP, function(event) {
    self.dispatchEvent(yuma.events.EventType.SELECTION_CREATED);
    g2d.clearRect(0, 0, canvas.width, canvas.height);
  });
}
goog.inherits(yuma.selection.DragSelector, goog.events.EventTarget);

yuma.selection.DragSelector.prototype.startSelection = function(x, y) {
  this.anchor = new yuma.geom.Point(x, y);
}

/**
 * @returns {yuma.Annotation.Shape}
 */
yuma.selection.DragSelector.prototype.getShape = function() {
  return new yuma.Annotation.Shape(
    yuma.Annotation.ShapeType.RECTANGLE,
    this.selection
  );
}

