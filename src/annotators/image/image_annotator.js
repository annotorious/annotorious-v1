goog.provide('yuma.annotators.image.ImageAnnotator');

goog.require('goog.soy');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.math');
goog.require('goog.style');

// TODO make this work for MULTIPLE images on one page!
yuma.annotators.image.ImageAnnotator = function() {
  var images = goog.dom.query('.annotatable', document);
  for (var i=images.length - 1; i > -1; i--) {
    var image = images[i];
    
    // Instantiate DOM elements
    var annotationLayer = goog.dom.createDom('div', 'yuma-annotationlayer');
    goog.style.setStyle(annotationLayer, 'position', 'absolute');
    goog.style.setPosition(annotationLayer , goog.style.getPosition(image));
  
    var hint = goog.soy.renderAsElement(yuma.templates.image.hint, {msg:'Click and Drag to Annotate'});
    goog.style.setOpacity(hint, 0); 
    goog.dom.appendChild(annotationLayer, hint);
  
    var viewCanvas = goog.soy.renderAsElement(yuma.templates.image.canvas,
     {width:image.width, height:image.height});
    goog.dom.appendChild(annotationLayer, viewCanvas);
  
    var editCanvas = goog.soy.renderAsElement(yuma.templates.image.canvas, 
      {width:image.width, height:image.height});
    goog.style.showElement(editCanvas, false); 
    goog.dom.appendChild(annotationLayer, editCanvas);  
    
    // TODO move this into the viewer class and trigger ANNOTATION_AREA_MOUSE_ENTER/LEAVE events
    goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOVER, function() { 
      goog.style.setOpacity(viewCanvas, 1.0); 
      goog.style.setOpacity(hint, 0.8); 
    });
    goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOUT, function() { 
      goog.style.setOpacity(viewCanvas, 0.4); 
      goog.style.setOpacity(hint, 0);
    });
    goog.dom.appendChild(document.body, annotationLayer);
  
    // Instantiate worker objects
    var viewer = new yuma.annotators.image.ImageViewer(viewCanvas);
  
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
  
      // TODO this CSS property doesn't seem to work on IE - need to handle this via JavaScript
      // goog.style.setStyle(editCanvas, 'pointer-events', 'none'); 
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
}

if (typeof window.onload != 'function') {
  window.onload = function() {
    new yuma.annotators.image.ImageAnnotator();
  }
} else {
  var current = window.onload;
  window.onload = function() {
    current();
    new yuma.annotators.image.ImageAnnotator();
  }
}

window['ImageAnnotator'] = yuma.annotators.image.ImageAnnotator;