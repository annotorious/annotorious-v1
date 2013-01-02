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
  var annotationLayer, viewCanvas, hint;

  /** The editor for this annotator (public for use by plugins) **/
  this.editor;

  /** The popup for this annotator (public for use by plugins) **/
  this.popup;

  /** @private **/
  this._image = image;
  
  /** @private **/
  this._eventBroker = new annotorious.events.EventBroker();

  /** @private **/
  this._selectors = [];
  
  /** @private **/
  this._currentSelector;

  /** @private **/
  this._selectionEnabled = true;

  annotationLayer = goog.dom.createDom('div', 'annotorious-annotationlayer');
  goog.style.setStyle(annotationLayer, 'position', 'relative');
  goog.style.setSize(annotationLayer, image.width, image.height); 
  goog.dom.replaceNode(annotationLayer, image);
  goog.dom.appendChild(annotationLayer, image);
  
  viewCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas,
    { width:image.width, height:image.height });
  goog.style.setOpacity(viewCanvas, 0.4); 
  goog.dom.appendChild(annotationLayer, viewCanvas);   

  /** @private **/
  this._editCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas, 
    { width:image.width, height:image.height });
  goog.style.showElement(this._editCanvas, false); 
  goog.dom.appendChild(annotationLayer, this._editCanvas);  

  this.popup = new annotorious.viewer.Popup(annotationLayer, this);

  // TODO these should be plugins, not hardcoded!
  var default_selector = new annotorious.plugins.selection.RectDragSelector();
  default_selector.init(this._editCanvas, this); 
  this._selectors.push(default_selector);
  this._currentSelector = default_selector;

  var polygon_selector = new annotorious.plugins.selection.PolygonSelector();
  polygon_selector.init(this._editCanvas, this);
  this._selectors.push(polygon_selector);

  /** @private **/
  this._viewer = new annotorious.modules.image.Viewer(viewCanvas, this.popup, this); 

  this.editor = new annotorious.editor.Editor(this, annotationLayer);

  hint = new annotorious.hint.Hint(this, annotationLayer);
  
  var self = this;  

  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOVER, function(event) {
    var relatedTarget = event.relatedTarget;
    if (!relatedTarget || !goog.dom.contains(annotationLayer, relatedTarget)) {
      self._eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_ITEM);
      goog.style.setOpacity(viewCanvas, 1.0); 
    }
  });
  
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOUT, function(event) {
    var relatedTarget = event.relatedTarget;
    if (!relatedTarget || !goog.dom.contains(annotationLayer, relatedTarget)) {
      self._eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM);
      goog.style.setOpacity(viewCanvas, 0.4);
    }
  });

  goog.events.listen(viewCanvas, goog.events.EventType.MOUSEDOWN, function(event) {
    if (self._selectionEnabled) {
      goog.style.showElement(self._editCanvas, true);
      self._viewer.highlightAnnotation(undefined);
      self._currentSelector.startSelection(event.offsetX, event.offsetY);
    }
  });

  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_COMPLETED, function(event) {
    var bounds = event.viewportBounds;
    self.editor.setPosition({ x: bounds.left + self._image.offsetLeft,
                               y: bounds.bottom + 4 + self._image.offsetTop });
    self.editor.open();
  });
  
  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_CANCELED, function() {
    goog.style.showElement(self._editCanvas, false);
    self._currentSelector.stopSelection();
  });
}

annotorious.modules.image.ImageAnnotator.prototype.stopSelection = function() {
   goog.style.showElement(this._editCanvas, false);
   this._currentSelector.stopSelection();
}

/**
 * Returns the image that this annotator is responsible for.
 * @returns {element} the image
 */
annotorious.modules.image.ImageAnnotator.prototype.getItem = function() {
  // TODO include width and height
  return { src: annotorious.modules.image.ImageModule.getItemURL(this._image) };
}

/**
 * Adds a lifecycle event handler to this annotator's Event Broker.
 * @param {annotorious.events.EventType} type the event type
 * @param {function} the handler function
 */
annotorious.modules.image.ImageAnnotator.prototype.addHandler = function(type, handler) {
  this._eventBroker.addHandler(type, handler);  
}

annotorious.modules.image.ImageAnnotator.prototype.addSelector = function(selector) {

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

annotorious.modules.image.ImageAnnotator.prototype.getAvailableSelectors = function() {
  return this._selectors;
}

annotorious.modules.image.ImageAnnotator.prototype.getActiveSelector = function() {
  return this._currentSelector;
}

annotorious.modules.image.ImageAnnotator.prototype.setActiveSelector = function(selector) {
  this._currentSelector = goog.array.find(this._selectors, function(sel) {
    return sel.getName() == selector;
  });
}


/**
 * Removes an annotation from this annotator's viewer.
 * @param {annotorious.annotation.Annotation} annotation the annotation
 */
annotorious.modules.image.ImageAnnotator.prototype.removeAnnotation = function(annotation) {
  this._viewer.removeAnnotation(annotation);
}

/**
 * Enables (or disables) the ability to create new annotations on the item
 * managed by this annotator.
 * @param {boolean} enabled if <code>true</code> new annotations can be created
 */
annotorious.modules.image.ImageAnnotator.prototype.setSelectionEnabled = function(enabled) {
  this._selectionEnabled = enabled;
}

/**
 * Returns all annotations on the annotatable media.
 * @return {Array.<Annotation>} the annotations
 */
annotorious.modules.image.ImageAnnotator.prototype.getAnnotations = function() {
  return this._viewer.getAnnotations();
}

annotorious.modules.image.ImageAnnotator.prototype.toItemCoordinates = function(xy) {
  var imgSize = goog.style.getSize(this._image);
  return { x: xy.x / imgSize.width, y: xy.y / imgSize.height };
}

annotorious.modules.image.ImageAnnotator.prototype.fromItemCoordinates = function(xy) {
  var imgSize = goog.style.getSize(this._image);
  return { x: xy.x * imgSize.width, y: xy.y * imgSize.height };
}
