goog.provide('yuma.modules.image.ImageAnnotator');

goog.require('goog.soy');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.math');
goog.require('goog.style');

/**
 * The ImageAnnotator is responsible for handling annotation functionality on
 * one image in the page.
 * @param {element} image the image DOM element
 */
yuma.modules.image.ImageAnnotator = function(image) {
  // TODO check if image is really an IMG
  
  // Instantiate DOM elements
  var annotationLayer = goog.dom.createDom('div', 'yuma-annotationlayer');
  goog.style.setStyle(annotationLayer, 'position', 'absolute');
  goog.style.setPosition(annotationLayer , goog.style.getPosition(image));
  goog.dom.appendChild(document.body, annotationLayer);
    
  var hint = goog.soy.renderAsElement(yuma.templates.image.hint, {msg:'Click and Drag to Annotate'});
  goog.style.setOpacity(hint, 0.8); 
  goog.dom.appendChild(annotationLayer, hint);
  
  var viewCanvas = goog.soy.renderAsElement(yuma.templates.image.canvas,
    {width:image.width, height:image.height});
  goog.dom.appendChild(annotationLayer, viewCanvas);   

  var editCanvas = goog.soy.renderAsElement(yuma.templates.image.canvas, 
    {width:image.width, height:image.height});
  goog.style.showElement(editCanvas, false); 
  goog.dom.appendChild(annotationLayer, editCanvas);  
  
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOVER, function() { 
    goog.style.setOpacity(viewCanvas, 1.0); 
    goog.style.setOpacity(hint, 0.8); 
  });
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOUT, function() { 
    goog.style.setOpacity(viewCanvas, 0.4); 
    goog.style.setOpacity(hint, 0);
  });
 
  // TODO register with EventBroker for
  //  yuma.events.EventType.MOUSE_OVER_ANNOTATABLE_MEDIA,
  //  yuma.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_MEDIA,
 
  // Instantiate worker objects
  var viewer = new yuma.modules.image.Viewer(viewCanvas);
  
  var selector = new yuma.selection.DragSelector(editCanvas);
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEDOWN, function(event) { 
    goog.style.showElement(editCanvas, true);
    selector.startSelection(event.offsetX, event.offsetY);
  });

  // Set up lifecycle event handling
  var eventBroker = yuma.events.EventBroker.getInstance();

  eventBroker.addHandler(yuma.events.EventType.SELECTION_COMPLETED, function(event) {  
    var shape = event.shape;
    var editor = new yuma.editor.Editor(selector);
    editor.setPosition(shape.geometry.x + image.offsetLeft,
                       shape.geometry.y + shape.geometry.height + 4 + image.offsetTop);
  });

  eventBroker.addHandler(yuma.events.EventType.MOUSE_OVER_ANNOTATION, function(event) {
    console.log('mouseover');
  });

  eventBroker.addHandler(yuma.events.EventType.MOUSE_OUT_OF_ANNOTATION, function(event) {
    console.log('mouseoutof');
  });
  
  eventBroker.addHandler(yuma.events.EventType.ANNOTATION_EDIT_CANCEL, function(event) {
    goog.style.showElement(editCanvas, false);
    selector.stopSelection();  
  });

  eventBroker.addHandler(yuma.events.EventType.ANNOTATION_EDIT_SAVE, function(event) {
    goog.style.showElement(editCanvas, false);
    viewer.addAnnotation(event.annotation);
    selector.stopSelection();  
  });
}