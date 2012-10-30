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
    
  var eventBroker = new annotorious.events.EventBroker(this);
  
  var annotationLayer = goog.dom.createDom('div', 'yuma-annotationlayer');
  goog.style.setStyle(annotationLayer, 'position', 'relative');
  goog.style.setSize(annotationLayer, image.width, image.height); 
  goog.dom.replaceNode(annotationLayer, image);
  goog.dom.appendChild(annotationLayer, image);
    
  var hint = goog.soy.renderAsElement(annotorious.templates.image.hint, {msg:'Click and Drag to Annotate'});
  goog.style.setOpacity(hint, 0); 
  goog.dom.appendChild(annotationLayer, hint);
  
  var viewCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas,
    { width:image.width, height:image.height });
  goog.dom.appendChild(annotationLayer, viewCanvas);   

  var editCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas, 
    { width:image.width, height:image.height });
  goog.style.showElement(editCanvas, false); 
  goog.dom.appendChild(annotationLayer, editCanvas);  
  
  var editorIsShown = function() {
    return !goog.dom.classes.has(okfnAnnotator.editor.element[0], 'annotator-hide');  
  }
  
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOVER, function(event) {
    goog.dom.classes.add(annotationLayer, 'hover');
    if (!(popup.isShown() || editorIsShown()))
      eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_MEDIA);
  });
  
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOUT, function(event) {
    goog.dom.classes.remove(annotationLayer, 'hover'); 
    if (!(popup.isShown() || editorIsShown()))
      eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_MEDIA);
  });
 
  var popup = new annotorious.okfn.Popup(image, eventBroker, okfnAnnotator, baseOffset);

  var viewer = new annotorious.modules.image.Viewer(viewCanvas, popup, eventBroker);
  
  var selector = new annotorious.selection.DragSelector(editCanvas, eventBroker);

  var self = this;
  goog.events.listen(viewCanvas, goog.events.EventType.MOUSEDOWN, function(event) {
    goog.style.showElement(editCanvas, true);
    selector.startSelection(event.offsetX, event.offsetY);
  });

  eventBroker.addHandler(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_MEDIA, function() {
    goog.style.setOpacity(viewCanvas, 1.0); 
    goog.style.setOpacity(hint, 0.8); 
  });
  
  eventBroker.addHandler(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_MEDIA, function() {
    goog.style.setOpacity(viewCanvas, 0.4); 
    goog.style.setOpacity(hint, 0);
  });

  /** Communication yuma -> okfn **/
  
  eventBroker.addHandler(annotorious.events.EventType.SELECTION_COMPLETED, function(event) {	
    var annotation = { url: image.src, shape: event.shape };
    okfnAnnotator.publish('beforeAnnotationCreated', annotation);
	
    var imgOffset = annotorious.dom.getOffset(image);
    var geometry = event.shape.geometry; 
    var x = geometry.x + imgOffset.left - baseOffset.left + 16;
    var y = geometry.y + geometry.height + imgOffset.top + window.pageYOffset - baseOffset.top + 5;
    
    okfnAnnotator.showEditor(annotation, {top: window.pageYOffset - baseOffset.top, left: 0});
    goog.style.setPosition(okfnAnnotator.editor.element[0], x, y);	
  });
  
  /** Communication okfn -> yuma **/
  
  okfnAnnotator.viewer.on('edit', function(annotation) {
    // Problem: We have N yuma.okfn.ImagePlugin instances for N images, hence this
    // event handler is called N times & we need to check against the image SRC.
    // TODO find a better solution
    if (annotation.url == image.src) {
      // TODO code duplication -> move into a function
      var imgOffset = annotorious.dom.getOffset(image);
      var geometry = annotation.shape.geometry;
      var x = geometry.x + imgOffset.left - baseOffset.left + 16;
      var y = geometry.y + geometry.height + imgOffset.top - baseOffset.top + window.pageYOffset + 5;

      // Use editor.show instead of showEditor to prevent a second annotationEditorShown event
      goog.style.setPosition(okfnAnnotator.editor.element[0], 0, window.pageYOffset - baseOffset.top);
      okfnAnnotator.editor.show();
      goog.style.setPosition(okfnAnnotator.editor.element[0], x, y);
    }
  });

  okfnAnnotator.viewer.on('hide', function() {
    eventBroker.fireEvent(annotorious.events.EventType.BEFORE_POPUP_HIDE);
    if (!goog.dom.classes.has(annotationLayer, 'hover'))
      eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_MEDIA);
  });
  
  okfnAnnotator.subscribe('annotationCreated', function(annotation) {
    selector.stopSelection();
    if(annotation.url == image.src) {
      viewer.addAnnotation(annotation);
    }
  });
  
  okfnAnnotator.subscribe('annotationsLoaded', function(annotations) {
    // Use Google's forEach utility instead!
    for(var i in annotations) {
      var annotation = annotations[i];
      if(annotation.url == image.src) {
	viewer.addAnnotation(annotation);
      }
    }
  });
  
  okfnAnnotator.subscribe('annotationDeleted', function(annotation) {
    if(annotation.url == image.src) {
      viewer.removeAnnotation(annotation);
    }
  });
  
  okfnAnnotator.subscribe('annotationEditorHidden', function(editor) {
    goog.style.showElement(editCanvas, false);
    selector.stopSelection();
  });
}



/**
 * A wrapper around the OKFN viewer popup, corresponding to Yuma's Popup 'interface'.
 * @param {element} image the image
 * @param {yuma.events.EventBroker} eventBroker reference to the Yuma EventBroker
 * @param {Object} okfnAnnotator reference to the OKFN Annotator
 * @param {Object} the base offset of the annotatable DOM element
 * @constructor
 */
annotorious.okfn.Popup = function(image, eventBroker, okfnAnnotator, baseOffset) {  
  /** @private **/
  this._image = image;

  /** @private **/
  this._eventBroker = eventBroker;
  
  /** @private **/ 
  this._okfnAnnotator = okfnAnnotator;
  
  /** @private **/
  this._baseOffset = baseOffset;
}

/**
 * Start the popup hide timer.
 */
annotorious.okfn.Popup.prototype.startHideTimer = function() {
  this._okfnAnnotator.startViewerHideTimer();
}

/**
 * Clear the popup hide timer.
 */
annotorious.okfn.Popup.prototype.clearHideTimer = function() {
  this._okfnAnnotator.clearViewerHideTimer();
  if (!this.isShown())
    goog.dom.classes.remove(this._okfnAnnotator.viewer.element[0], 'annotator-hide');
}

/**
 * Show the popup, loaded with the specified annotation, at the specified coordinates.
 * @param {Object} annotation the annotation
 * @param {number} x coordinate (relative to the image)
 * @param {number} y coordiante (relative to the image)
 */
annotorious.okfn.Popup.prototype.show = function(annotation, x, y) {
  var baseOffset = annotorious.dom.getOffset(this._okfnAnnotator.element); 
  var imgOffset = annotorious.dom.getOffset(this._image); 

  this._okfnAnnotator.showViewer([annotation], {top: window.pageYOffset - this._baseOffset.top , left: 0});   
  goog.style.setPosition(this._okfnAnnotator.viewer.element[0],
			 imgOffset.left - this._baseOffset.left + x + 16,
			 imgOffset.top + window.pageYOffset - this._baseOffset.top + y);
  this._okfnAnnotator.clearViewerHideTimer();
}

/**
 * Set the position of the popup.
 * @param {number} x coordinate (relative to the image)
 * @param {number} y coordinate (realtive to the image)
 */
annotorious.okfn.Popup.prototype.setPosition = function(x, y) {
  goog.style.setPosition(this._okfnAnnotator.viewer.element[0], x, y);  
}

annotorious.okfn.Popup.prototype.isShown = function() {
  return this._okfnAnnotator.viewer.isShown();
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
    annotorious.dom.addOnLoadHandler(function() {
      goog.array.forEach(images, function(img, idx, array) {
        new annotorious.okfn.ImagePlugin(img, self['annotator']);
      });
    });
  }
  
  return AnnotoriousImagePlugin;
})();

