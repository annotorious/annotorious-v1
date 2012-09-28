goog.provide('yuma.okfn.ImagePlugin');

goog.require('goog.soy');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.math');
goog.require('goog.style');

/**
 * Implementation of the Yuma image plugin for OKFN Annotator.
 * @param {element} image the image to be annotated
 * @param {Object} okfnAnnotator reference to the OKFN Annotator instance
 */
yuma.okfn.ImagePlugin = function(image, okfnAnnotator) {
  var imageAnnotator = yuma.modules.image.ImageAnnotator (image);
  
  /** Communication yuma -> okfn **/
  
  imageAnnotator.addHandler(yuma.events.EventType.SELECTION_COMPLETED, function(event) {	
    // TODO once we have aligned our datamodels, this conversion won't be necessary any more
    var annotation = {};

    okfnAnnotator.publish('beforeAnnotationCreated', annotation);
	
    var shape = event.shape;
    var x = shape.geometry.x + image.offsetLeft;
    var y = shape.geometry.y + shape.geometry.height + image.offsetTop;	

    // TODO can we move that before okfnAnnotator.publish?
    annotation.url = image.src;
    annotation.shape = shape;
	
    okfnAnnotator.showEditor(annotation, {top: 0, left: 0});
    
    // TODO get rid of jQuery dependency
    $(okfnAnnotator.editor.element).css({top: y, left: x});
  });
  
  imageAnnotator.addHandler(yuma.events.EventType.MOUSE_OVER_ANNOTATION, function(event) {
    var shape = event.annotation.shape;
    var x = shape.geometry.x + image.offsetLeft;
    var y = shape.geometry.y + shape.geometry.height + image.offsetTop;
	
    okfnAnnotator.showViewer([event.annotation], {top: 0, left: 0});
    
    // TODO get rid of jQuery dependency
    $(okfnAnnotator.viewer.element).css({top: y - 5, left: x + 5});
    okfnAnnotator.clearViewerHideTimer();
  });
  
  imageAnnotator.addHandler(yuma.events.EventType.MOUSE_OUT_OF_ANNOTATION, function(event) {  
    okfnAnnotator.startViewerHideTimer();
  });
  
  /** Communication okfn -> yuma **/
  
  okfnAnnotator.viewer.on("edit", function(annotation) {
    // TODO code duplication -> move into a function
    var shape = annotation.shape;
    var x = shape.geometry.x + image.offsetLeft;
    var y = shape.geometry.y + shape.geometry.height + image.offsetTop;
	
    // Use editor.show instead of showEditor to prevent a second annotationEditorShown event
    // TODO get rid of jQuery dependency
    $(okfnAnnotator.editor.element).css({top: 0, left: 0});
    okfnAnnotator.editor.show();
    $(okfnAnnotator.editor.element).css({top: y, left: x});
  });
  
  okfnAnnotator.subscribe("annotationCreated", function(annotation) {
    if(annotation.url == image.src) {
      imageAnnotator.addAnnotation(annotation);
    }
  });
  
  okfnAnnotator.subscribe("annotationsLoaded", function(annotations) {
    // Use Google's forEach utility instead!
    for(var i in annotations) {
      var annotation = annotations[i];
      if(annotation.url == image.src) {
	imageAnnotator.addAnnotation(annotation);
      }
    }
  });
  
  okfnAnnotator.subscribe("annotationDeleted", function(annotation) {
    if(annotation.url == image.src) {
      imageAnnotator.removeAnnotation(annotation);
    }
  });
  
  okfnAnnotator.subscribe("annotationEditorHidden", function(editor) {
    imageAnnotator.clearSelection();
  });
}

/**
 * OKFN plugin interface.
 */
Annotator.Plugin.YumaImagePlugin = (function() {
  var annotatableElement;

  function YumaImagePlugin(element, options) {
    annotatableElement = element;
  }

  YumaImagePlugin.prototype.pluginInit = function() {
    var images = annotatableElement.getElementsByTagName('img');
    
    // TODO use Google collection iterator util
    for (var i=0; i<images.length; i++) {
      new yuma.okfn.ImagePlugin(images[i], this.annotator);
      // TODO annotation edit save event => annotator
    }
  }

  return ImageAnnotator;
})();

window['Annotator.Plugin.YumaImagePlugin'] = Annotator.Plugin.YumaImagePlugin;
