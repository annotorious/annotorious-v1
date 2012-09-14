goog.provide('yuma.annotators.image.ImageAnnotator');

goog.require('goog.soy');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.math');
goog.require('goog.style');

yuma.annotators.image.ImageAnnotator = function(id) {
  var image = goog.dom.getElement(id);

  var annotationLayer = goog.dom.createDom('div', 'yuma-annotationlayer');
  goog.style.setStyle(annotationLayer, 'position', 'absolute');
  goog.style.setPosition(annotationLayer , goog.style.getPosition(image));

  var hint = goog.soy.renderAsElement(yuma.templates.image.hint, {msg:'Click and Drag to Annotate'});
  goog.style.setOpacity(hint, 0); 
  goog.dom.appendChild(annotationLayer, hint);

  var viewCanvas = goog.soy.renderAsElement(yuma.templates.image.canvas, {width:image.width, height:image.height});
  goog.dom.appendChild(annotationLayer, viewCanvas);

  var editCanvas = goog.soy.renderAsElement(yuma.templates.image.canvas, {width:image.width, height:image.height});
  goog.style.setStyle(editCanvas, 'pointer-events', 'none'); 
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

  var viewer = new yuma.annotators.image.ImageViewer(viewCanvas);

  var selector = new yuma.selection.DragSelector(editCanvas);
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEDOWN, function(event) { 
    selector.startSelection(event.offsetX, event.offsetY);
    goog.style.setStyle(editCanvas, 'pointer-events', 'auto'); 
  });


  var eventBroker = yuma.events.EventBroker.getInstance();

  // TODO need to customize the event object to contain shape and mouse event
  eventBroker.addHandler(yuma.events.EventType.SELECTION_CREATED, function(event) {  
    var shape = event.target.getShape();

    var editForm = goog.soy.renderAsElement(yuma.templates.editform);
    var textarea = goog.dom.query('.annotation-text', editForm)[0];

    // TODO this will get cleaner once we got a decent custom event object!
    goog.style.setPosition(editForm, 
      shape.geometry.x + image.offsetLeft, 
      shape.geometry.y + shape.geometry.height + 4 + image.offsetTop);
    goog.dom.appendChild(document.body, editForm);
    textarea.focus();

    var btnCancel = goog.dom.query('.annotation-cancel', editForm)[0];
    goog.events.listen(btnCancel, goog.events.EventType.CLICK, function(event) {
      goog.dom.removeNode(editForm);
      selector.stopSelection();
    });

    var outer = event;
    var btnSave = goog.dom.query('.annotation-save', editForm)[0];
    goog.events.listen(btnSave, goog.events.EventType.CLICK, function(event) {
      viewer.addAnnotation(new yuma.model.Annotation(textarea.value, shape));
      goog.dom.removeNode(editForm);
      selector.stopSelection();
    });

    goog.style.setStyle(editCanvas, 'pointer-events', 'none'); 
  });

  // For testing purposes 
  eventBroker.addHandler(yuma.events.EventType.ANNOTATION_MOUSE_ENTER, function(event) {
    console.log('entering ' + event.target.getCurrentAnnotation().text);
  });

  eventBroker.addHandler(yuma.events.EventType.ANNOTATION_MOUSE_LEAVE, function(event) {
    console.log('leaving ' + event.target.getCurrentAnnotation().text);
  });
}

window['ImageAnnotator'] = yuma.annotators.image.ImageAnnotator;
