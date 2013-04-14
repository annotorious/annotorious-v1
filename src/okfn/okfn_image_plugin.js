goog.provide('annotorious.okfn.ImagePlugin');

goog.require('goog.array');
goog.require('goog.soy');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.math');
goog.require('goog.style');

/**
 * Implementation of the Yuma image plugin for OKFN Annotator.
 * @param {element} image the image to be annotated
 * @param {Object} okfnAnnotator reference to the OKFN Annotator instance
 * @constructor
 */
annotorious.okfn.ImagePlugin = function(image, okfnAnnotator) {
  var baseOffset = annotorious.dom.getOffset(okfnAnnotator.element[0].firstChild);
    
  // var eventBroker = new annotorious.events.EventBroker();
 
  // Trying to re-use more from the standalone version
  // BEWARE this may get dirty (at first...)
  var annotator = new annotorious.modules.image.ImageAnnotator(image);
  
  /*
  var annotationLayer = goog.dom.createDom('div', 'yuma-annotationlayer');
  goog.style.setStyle(annotationLayer, 'position', 'relative');
  goog.style.setSize(annotationLayer, image.width, image.height); 
  goog.dom.replaceNode(annotationLayer, image);
  goog.dom.appendChild(annotationLayer, image);
  
  var viewCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas,
    { width:image.width, height:image.height });
  goog.dom.appendChild(annotationLayer, viewCanvas);   

  var popup = new annotorious.okfn.Popup(image, eventBroker, okfnAnnotator, baseOffset);
  
  var editCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas, 
    { width:image.width, height:image.height });
  goog.style.showElement(editCanvas, false); 
  goog.dom.appendChild(annotationLayer, editCanvas);  

  var selector = new annotorious.plugins.selection.RectDragSelector();
  selector.init(editCanvas, eventBroker);

  var viewer = new annotorious.modules.image.Viewer(viewCanvas, popup, eventBroker);
    
  var hint = new annotorious.hint.Hint(eventBroker, annotationLayer);
  
  // TODO clean up this mess
  eventBroker.toItemCoordinates = function(coords) {
    return coords;
  };

  eventBroker.fromItemCoordinates = function(coords) {
    return coords;
  };

  eventBroker.getAvailableSelectors = function() {
    return [ selector ];
  };
  */

  /** 
   * Checks if the OKFN Editor is currently 'owned' by this image. I.e. whether
   * the current annotation in the editor is an image annotation, and the annotation 
   * 'url' property matches this wrapper's _image.src.
   */
  var isEditorCurrentlyOwned = function() {
    var annotation = okfnAnnotator.editor.annotation;

    if (!annotation) 
      return false;

    return annotation.url == image.src;
  };
 
  /**
   * Checks if the mouseover/out event happened inside the annotatable area. 
   * Unfortunately Annotator makes this task a little complex...
   *
   * TODO this needs to go into the popup implementation somehow...
   *
   */                       
  var isMouseEventInside = function(event) {
    var relatedTarget = event.relatedTarget;
    
    // No related target - mouse was inside the annotationLayer on page load
    if (!relatedTarget)
      return true;  

    // Related target is a child of the annotation layer - inside
    if (goog.dom.contains(annotationLayer, relatedTarget))
      return true;

    // Related target is part of the Annotator editor - inside
    if (goog.dom.contains(okfnAnnotator.editor.element[0], relatedTarget) && isEditorCurrentlyOwned())
      return true;

    // Related target is part of the Annotator popup - inside
    if (goog.dom.contains(okfnAnnotator.viewer.element[0], relatedTarget) && popup.isViewerCurrentlyOwned())
      return true;

    return false;
  };
 
  var self = this;  
  // Once the isMouseEventInside function is in the popup, we can get rid of this special handling
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOVER, function(event) {
    if (!isMouseEventInside(event))
      eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_ITEM);
  });
  
  // Once the isMouseEventInside function is in the popup, we can get rid of this special handling
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOUT, function(event) {
    if (!isMouseEventInside(event))
      eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM);
  });

  // Once the isMouseEventInside function is in the popup, we can get rid of this special handling
  popup.addMouseOverHandler(function(event) {
    if (!isMouseEventInside(event))
      eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_ITEM);
  });

  // Once the isMouseEventInside function is in the popup, we can get rid of this special handling
  popup.addMouseOutHandler(function(event) { 
    if (!isMouseEventInside(event))
      eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM);
  });
 
  /*
  goog.events.listen(viewCanvas, goog.events.EventType.MOUSEDOWN, function(event) {
    goog.style.showElement(editCanvas, true);
    viewer.highlightAnnotation(undefined);
    selector.startSelection(event.offsetX, event.offsetY);
  });
  
  eventBroker.addHandler(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_ITEM, function() {
    okfnAnnotator.clearViewerHideTimer(); // In case the mouse arrives (fast) from an HTML annotation
    goog.style.setOpacity(viewCanvas, 1.0);
  });
  
  eventBroker.addHandler(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM, function() {
    goog.style.setOpacity(viewCanvas, 0.4);
  });
  */

  /** Communication yuma -> okfn **/
  
  eventBroker.addHandler(annotorious.events.EventType.SELECTION_COMPLETED, function(event) {    
    var annotation = { url: image.src, shapes: [event.shape] };
    okfnAnnotator.publish('beforeAnnotationCreated', annotation);
	
    var imgOffset = annotorious.dom.getOffset(image);
    var geometry = event.shape.geometry; 
    var x = geometry.x + imgOffset.left - baseOffset.left + 16;
    var y = geometry.y + geometry.height + imgOffset.top + window.pageYOffset - baseOffset.top + 5;
    
    okfnAnnotator.showEditor(annotation, {top: window.pageYOffset - baseOffset.top, left: 0});
    goog.style.setPosition(okfnAnnotator.editor.element[0], x, y);	
  });

  eventBroker.addHandler(annotorious.events.EventType.SELECTION_CANCELED, function() {
    goog.style.showElement(editCanvas, false);
    selector.stopSelection();
  });
  
  /** Communication okfn -> yuma **/
  
  okfnAnnotator.viewer.on('edit', function(annotation) {
    if (annotation.url == image.src) {
      goog.style.showElement(editCanvas, true);
      viewer.highlightAnnotation(undefined);

      // TODO code duplication -> move into a function
      var imgOffset = annotorious.dom.getOffset(image);
      var geometry = annotation.shapes[0].geometry;
      var x = geometry.x + imgOffset.left - baseOffset.left + 16;
      var y = geometry.y + geometry.height + imgOffset.top - baseOffset.top + window.pageYOffset + 5;

      // Use editor.show instead of showEditor to prevent a second annotationEditorShown event
      goog.style.setPosition(okfnAnnotator.editor.element[0], 0, window.pageYOffset - baseOffset.top);
      okfnAnnotator.editor.show();
      goog.style.setPosition(okfnAnnotator.editor.element[0], x, y);
    }
  });

  okfnAnnotator.subscribe('annotationCreated', function(annotation) {
    if (annotation.url == image.src) {
      selector.stopSelection();
      if(annotation.url == image.src) {
	viewer.addAnnotation(annotation);
      }
    }
  });
  
  okfnAnnotator.subscribe('annotationsLoaded', function(annotations) {
    goog.array.forEach(annotations, function(annotation) {
      if(annotation.url == image.src) {
	viewer.addAnnotation(annotation);
      }
    });
  });
  
  okfnAnnotator.subscribe('annotationDeleted', function(annotation) {
    if(annotation.url == image.src) {
      viewer.removeAnnotation(annotation);
    }

    // Annotator silently closes the popup - so we need to fire the event manually afterwards
    eventBroker.fireEvent(annotorious.events.EventType.BEFORE_POPUP_HIDE);
  });
  
  okfnAnnotator.subscribe('annotationEditorHidden', function(editor) {
    goog.style.showElement(editCanvas, false);
    selector.stopSelection();
    
    // TODO workaround before we have decent 'edit' behavior in Annotorious standalone!
    eventBroker.fireEvent(annotorious.events.EventType.BEFORE_POPUP_HIDE);
  });
}

/**
 * OKFN plugin interface.
 */
window['Annotator']['Plugin']['AnnotoriousImagePlugin'] = (function() {

  function AnnotoriousImagePlugin(element, options) {    
    this._el = element;
  }

  AnnotoriousImagePlugin.prototype['pluginInit'] = function() {
    var images = this._el.getElementsByTagName('img');
    var self = this;
    goog.array.forEach(images, function(img, idx, array) {
      new annotorious.okfn.ImagePlugin(img, self['annotator']);
    });
  }
  
  return AnnotoriousImagePlugin;
})();

