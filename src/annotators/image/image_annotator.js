goog.provide('yuma.ImageAnnotator');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.math');
goog.require('goog.style');

goog.require('yuma.selection.DragSelector');

yuma.ImageAnnotator = function(id) {
  var image = goog.dom.getElement(id);

  // TODO can we do this in a more compact/readable way with templates?
  var annotationLayer = goog.dom.createDom('div', 'yuma-annotationlayer');
  goog.style.setStyle(annotationLayer, 'position', 'absolute');
  goog.style.setPosition(annotationLayer , goog.style.getPosition(image));

  var hint = goog.dom.createDom('div', 'yuma-hint', 'Click and Drag to Annotate');
  goog.style.setStyle(hint, 'white-space', 'nowrap');
  goog.style.setStyle(hint, 'position', 'absolute');
  goog.style.setStyle(hint, 'pointer-events', 'none'); 
  goog.style.setOpacity(hint, 0); 
  goog.style.setPosition(hint, new goog.math.Coordinate(10,10));
  goog.dom.appendChild(annotationLayer, hint);

  var viewCanvas = goog.dom.createDom('canvas', 'yuma-canvas');
  goog.style.setStyle(viewCanvas, 'position', 'absolute');
  goog.style.setPosition(viewCanvas, new goog.math.Coordinate(0, 0));
  goog.style.setSize(viewCanvas, goog.style.getSize(image));
  goog.dom.setProperties(viewCanvas, {'width':image.width, 'height':image.height});
  goog.dom.appendChild(annotationLayer, viewCanvas);   

  // TODO eliminate code duplication
  // TODO Encapsulate this into a class
  var editCanvas = goog.dom.createDom('canvas', 'yuma-canvas');
  goog.style.setStyle(editCanvas, 'position', 'absolute');
  goog.style.setStyle(editCanvas, 'pointer-events', 'none'); 
  goog.style.setPosition(editCanvas, new goog.math.Coordinate(0, 0));
  goog.style.setSize(editCanvas, goog.style.getSize(image));
  goog.dom.setProperties(editCanvas, {'width':image.width, 'height':image.height});
  goog.dom.appendChild(annotationLayer, editCanvas);  

  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOVER, function() { 
    goog.style.setOpacity(viewCanvas, 1.0); 
    goog.style.setOpacity(hint, 0.8); 
  });

  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOUT, function() { 
    goog.style.setOpacity(viewCanvas, 0.4); 
    goog.style.setOpacity(hint, 0);
  });

  goog.dom.appendChild(document.body, annotationLayer);

  var viewer = new yuma.Viewer(viewCanvas);

  var selector = new yuma.selection.DragSelector(editCanvas);
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEDOWN, function(event) { 
    selector.startSelection(event.offsetX, event.offsetY);
    goog.style.setStyle(editCanvas, 'pointer-events', 'auto'); 
  });
  goog.events.listen(selector, yuma.selection.events.EventType.SELECTION_CREATED, function(event) {
    viewer.addAnnotation(new yuma.Annotation('', event.target.getShape()));
    goog.style.setStyle(editCanvas, 'pointer-events', 'none'); 
  });
}

window['ImageAnnotator'] = yuma.ImageAnnotator;
