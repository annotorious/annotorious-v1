goog.provide('annotorious.modules.image.ImageAnnotator');

goog.require('goog.soy');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.math');
goog.require('goog.style');

/**
 * The ImageAnnotator is responsible for handling annotation functionality
 * on one image in the page.
 * @param {element} image the image DOM element
 * @constructor
 */
annotorious.modules.image.ImageAnnotator = function(image) {
  /** @private **/
  this._image = image;
  
  /** @private **/
  this._eventBroker = new annotorious.events.EventBroker();
  
  var annotationLayer = goog.dom.createDom('div', 'annotorious-annotationlayer');
  goog.style.setStyle(annotationLayer, 'position', 'relative');
  goog.style.setSize(annotationLayer, image.width, image.height); 
  goog.dom.replaceNode(annotationLayer, image);
  goog.dom.appendChild(annotationLayer, image);
    
  var hint = goog.soy.renderAsElement(annotorious.templates.image.hint, {msg:'Click and Drag to Annotate'});
  goog.style.setOpacity(hint, 0); 
  goog.dom.appendChild(annotationLayer, hint);
  
  var viewCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas,
    { width:image.width, height:image.height });
  goog.style.setOpacity(viewCanvas, 0.4); 
  goog.dom.appendChild(annotationLayer, viewCanvas);   

  /** @private **/
  this._editCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas, 
    { width:image.width, height:image.height });
  goog.style.showElement(this._editCanvas, false); 
  goog.dom.appendChild(annotationLayer, this._editCanvas);  

  /** @private **/
  this._popup = new annotorious.viewer.Popup(annotationLayer, this);

  // TODO these should be plugins, not hardcoded!
  // this._selector = new annotorious.plugins.selection.PolygonSelector(this._editCanvas, this); 

  /** @private **/
  this._selector = new annotorious.plugins.selection.RectDragSelector(this._editCanvas, this); 

  /** @private **/
  this._viewer = new annotorious.modules.image.Viewer(viewCanvas, this._popup, [this._selector], this);

  /** @private **/
  this._editor = new annotorious.editor.Editor(this._selector, this, annotationLayer);

  var self = this;  
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOVER, function(event) {
    var relatedTarget = event.relatedTarget;
    if (!relatedTarget || !goog.dom.contains(annotationLayer, relatedTarget)) {
      self._eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_ITEM);
      goog.style.setOpacity(viewCanvas, 1.0); 
      goog.style.setOpacity(hint, 0.8); 
    }
  });
  
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOUT, function(event) {
    var relatedTarget = event.relatedTarget;
    if (!relatedTarget || !goog.dom.contains(annotationLayer, relatedTarget)) {
      self._eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_MEDIA);
      goog.style.setOpacity(viewCanvas, 0.4); 
      goog.style.setOpacity(hint, 0);
    }
  });

  goog.events.listen(viewCanvas, goog.events.EventType.MOUSEDOWN, function(event) {
    goog.style.showElement(self._editCanvas, true);
    self._viewer.highlightAnnotation(undefined);
    self._selector.startSelection(event.offsetX, event.offsetY);
  });

  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_COMPLETED, function(event) {
    var bounds = event.viewportBounds;
    self._editor.setPosition(bounds.left + self._image.offsetLeft,
                             bounds.bottom + 4 + self._image.offsetTop);
    self._editor.open();
  });
  
  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_CANCELED, function() {
    goog.style.showElement(self._editCanvas, false);
    self._selector.stopSelection();
  });
}

annotorious.modules.image.ImageAnnotator.prototype.stopSelection = function() {
   goog.style.showElement(this._editCanvas, false);
   this._selector.stopSelection();
}

/**
 * Returns the image that this annotator is responsible for.
 * @returns {element} the image
 */
annotorious.modules.image.ImageAnnotator.prototype.getImage = function() {
  return this._image;
}

/** 
 * Returns the popup instance managed by this annotator.
 * @returns {annotorious.viewer.Popup} the popup
 */
annotorious.modules.image.ImageAnnotator.prototype.getPopup = function() {
  return this._popup;
}

/**
 * Returns the editor instance managed by this annotator.
 * @returns {annotorious.editor.Editor} the editor
 */
annotorious.modules.image.ImageAnnotator.prototype.getEditor = function() {
  return this._editor;
}

/**
 * Adds a lifecycle event handler to this annotator's Event Broker.
 * @param {annotorious.events.EventType} type the event type
 * @param {function} the handler function
 */
annotorious.modules.image.ImageAnnotator.prototype.addHandler = function(type, handler) {
  this._eventBroker.addHandler(type, handler);  
}

/**
 * Fire an event on this annotator's Event Broker.
 * @param {annotorious.events.EventType} type the event type
 * @param {object} the event object
 */
annotorious.modules.image.ImageAnnotator.prototype.fireEvent = function(type, event) {
  this._eventBroker.fireEvent(type, event);
}

/**
 * Adds annotation to this annotator's viewer.
 * @param {annotorious.annotation.Annotation} annotation the annotation
 */
annotorious.modules.image.ImageAnnotator.prototype.addAnnotation = function(annotation) {
  this._viewer.addAnnotation(annotation);
}

/**
 * Removes an annotation from this annotator's viewer.
 * @param {annotorious.annotation.Annotation} annotation the annotation
 */
annotorious.modules.image.ImageAnnotator.prototype.removeAnnotation = function(annotation) {
  this._viewer.removeAnnotation(annotation);
}

/**
 * Returns all annotations on the annotatable media.
 * @return {Array.<Annotation>} the annotations
 */
annotorious.modules.image.ImageAnnotator.prototype.getAnnotations = function() {
  return this._viewer.getAnnotations();
}

annotorious.modules.image.ImageAnnotator.prototype.toItemCoordinates = function(pxCoords) {
  // For the time being, pxCoords = itemCoords
  return pxCoords;
}

annotorious.modules.image.ImageAnnotator.prototype.fromItemCoordinates = function(itemCoords) {
  // For the time being, itemCoords = pxCoords
  return pxCoords;
}
