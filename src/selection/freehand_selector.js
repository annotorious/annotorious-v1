goog.provide('yuma.selector');

goog.require('goog.events');

yuma.selector.DragSelector = function(canvas) {
  paper.setup(canvas);
 
  var path = new paper.Path();
  path.strokeColor = '#ffffff';

  var moveListener = function(event) {
    var to = new paper.Point(event.offsetX, event.offsetY);
    path.lineTo(to);
    paper.view.draw();
  }

  goog.events.listen(canvas, goog.events.EventType.MOUSEDOWN, function(event) {
    goog.events.listen(canvas, goog.events.EventType.MOUSEMOVE, moveListener);
    var start = new paper.Point(event.offsetX, event.offsetY);
    path.moveTo(start);
  });

  goog.events.listen(canvas, goog.events.EventType.MOUSEUP, function(event) {
    path = new paper.Path();
    path.strokeColor = '#ffffff';
    goog.events.unlisten(canvas, goog.events.EventType.MOUSEMOVE, moveListener);
  });

}
