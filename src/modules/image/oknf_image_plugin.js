goog.provide('yuma.okfn.plugin.ImageAnnotator');

goog.require('goog.soy');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.math');
goog.require('goog.style');

yuma.okfn.plugin.ImageAnnotator = function(image, mainAnnotator) {

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
  
  var eventBroker = yuma.events.EventBroker.getInstance();

  eventBroker.addHandler(yuma.events.EventType.SELECTION_COMPLETED, function(event) {
	var annotation = {};
	
	// as the adder is not used, beforeAnnotationCreated event has to be fired manually
    mainAnnotator.publish('beforeAnnotationCreated', annotation);
	
    var shape = event.shape;
	var x = shape.geometry.x + image.offsetLeft;
	var y = shape.geometry.y + shape.geometry.height + image.offsetTop;
	
	annotation.url = image.src;
	annotation.shape = shape;
	
	mainAnnotator.showEditor(annotation, {top: 0, left: 0});
	$(mainAnnotator.editor.element).css({top: y, left: x});
  });
  
  eventBroker.addHandler(yuma.events.EventType.MOUSE_OVER_ANNOTATION, function(event) {
    var shape = event.annotation.shape;
	var x = shape.geometry.x + image.offsetLeft;
	var y = shape.geometry.y + shape.geometry.height + image.offsetTop;
	mainAnnotator.showViewer([event.annotation], {top: 0, left: 0});
	$(mainAnnotator.viewer.element).css({top: y, left: x});
	
	mainAnnotator.clearViewerHideTimer();
  });
  
  eventBroker.addHandler(yuma.events.EventType.MOUSE_OUT_OF_ANNOTATION, function(event) {  
	mainAnnotator.startViewerHideTimer();
  });
  
  mainAnnotator.viewer.on("edit", function(annotation) {
    var shape = annotation.shape;
	var x = shape.geometry.x + image.offsetLeft;
	var y = shape.geometry.y + shape.geometry.height + image.offsetTop;
	
	// Reset orientation of the editor
	// Use editor.show instead of showEditor to prevent a second annotationEditorShown event
	$(mainAnnotator.editor.element).css({top: 0, left: 0});
	mainAnnotator.editor.show();
	$(mainAnnotator.editor.element).css({top: y, left: x});
  });
  
  mainAnnotator.subscribe("annotationCreated", function(annotation) {
	if(annotation.url == image.src) {
		viewer.addAnnotation(annotation);
	}
  });

  //mainAnnotator.subscribe("annotationUpdated", function(annotation) {
  //});
  
  mainAnnotator.subscribe("annotationDeleted", function(annotation) {
	if(annotation.url == image.src) {
		//TODO: uncomment the following line, when the method is implemented
		//viewer.removeAnnotation(annotation);
	}
  });
  
  mainAnnotator.subscribe("annotationEditorHidden", function(editor) {
	goog.style.showElement(editCanvas, false);
    selector.stopSelection(); 
  });
}

window['ImageAnnotatorPlugin'] = yuma.okfn.plugin.ImageAnnotator;
