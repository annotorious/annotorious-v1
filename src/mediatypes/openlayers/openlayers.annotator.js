goog.provide('annotorious.mediatypes.openlayers.OpenLayersAnnotator');

goog.require('annotorious.templates.openlayers');
goog.require('annotorious.mediatypes.openlayers.Viewer');

/**
 * The OpenLayersAnnotator is responsible for handling annotation functionality
 * on one OpenLayers map in the page.
 * @param {OpenLayers.Map} map the OpenLayers map
 * @constructor
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator = function(map) {
  /** @private **/
  this._map = map;
  
  /** @private **/
  this._div = map.div;
  
  /** @private **/
  this._eventBroker = new annotorious.events.EventBroker();
  
  this.element = map.div; // goog.dom.createDom('div', 'annotorious-annotationlayer');
  goog.style.setStyle(this.element, 'position', 'relative');
  // goog.style.setStyle(this.element, 'position', 'relative');  
  // goog.style.setStyle(this.element, 'width', this._div.style.width);
  // goog.style.setStyle(this.element, 'height', this._div.style.height);
  
  /** @private 
  this._secondaryHint = goog.soy.renderAsElement(annotorious.templates.openlayers.secondaryHint, {msg: 'Click and Drag'});
  goog.style.setStyle(this._secondaryHint, 'z-index', 9998);
  goog.style.setOpacity(this._secondaryHint, 0); 
  goog.dom.appendChild(this.element, this._secondaryHint);
  **/
  
  /** @private **/
  this.popup = new annotorious.Popup(this);

  /** @private **/
  this._viewer = new annotorious.mediatypes.openlayers.Viewer(map, this);

  /** @private **/
  this._editCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas, 
    { width:'0', height:'0' });
  goog.style.showElement(this._editCanvas, false);
  goog.style.setStyle(this._editCanvas, 'position', 'absolute');
  goog.style.setStyle(this._editCanvas, 'top', '0px');
  goog.style.setStyle(this._editCanvas, 'z-index', 9999);

  goog.dom.appendChild(this.element, this._editCanvas);  
  
  var self = this,
      updateCanvasSize = function() {
        var width = parseInt(goog.style.getComputedStyle(self._div, 'width'), 10),
            height = parseInt(goog.style.getComputedStyle(self._div, 'height'), 10);

        // goog.style.setSize(self.element, width, height); 
        goog.style.setSize(self._editCanvas, width, height);
        self._editCanvas.width = width;
        self._editCanvas.height = height;
      };
  
  updateCanvasSize();
//   goog.dom.replaceNode(this.element, this._div);
//   goog.dom.appendChild(this.element, this._div); 

  /** @private **/
  this._selector = new annotorious.plugins.selection.RectDragSelector();
  this._selector.init(this, this._editCanvas); 
    
  /** @private **/
  this._stop_selection_callback = undefined;

  /** @private **/
  this.editor = new annotorious.Editor(this);
  goog.style.setStyle(this.editor.element, 'z-index', 10000);

  if (window.addEventListener)
    window.addEventListener('resize', updateCanvasSize, false);
  else if (window.attachEvent) 
    window.attachEvent('onresize', updateCanvasSize);  

  goog.events.listen(this.element, goog.events.EventType.MOUSEOVER, function(event) {
    var relatedTarget = event.relatedTarget;
    if (!relatedTarget || !goog.dom.contains(self.element, relatedTarget))
      self._eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_ITEM);
  });
  
  goog.events.listen(this.element, goog.events.EventType.MOUSEOUT, function(event) {
    var relatedTarget = event.relatedTarget;
    if (!relatedTarget || !goog.dom.contains(self.element, relatedTarget))
      self._eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM);
  });
  
  goog.events.listen(this._editCanvas, goog.events.EventType.MOUSEDOWN, function(event) {
    var offset = goog.style.getClientPosition(self._div);
    self._selector.startSelection(event.clientX - offset.x, event.clientY - offset.y);
  });
  
  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_COMPLETED, function(event) {
    goog.style.setStyle(self._editCanvas, 'pointer-events', 'none');

    var bounds = event.viewportBounds;
    self.editor.setPosition(new annotorious.shape.geom.Point(bounds.left + self._div.offsetLeft,
                                                             bounds.bottom + 4 + self._div.offsetTop));
    self.editor.open();    
  });

  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_CANCELED, function(event) {
    self.stopSelection();    
  });
}

annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.showSelectionWidget = function() {
  // Does not have any effect at the moment
}

annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.hideSelectionWidget = function() {
  // Does not have any effect at the moment
}

annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.activateSelector = function(callback) {
  goog.style.setStyle(this._editCanvas, 'pointer-events', 'auto');

  var self = this;
  goog.style.showElement(this._editCanvas, true);
  // goog.style.setOpacity(this._secondaryHint, 0.8); 
  window.setTimeout(function() {
    // goog.style.setOpacity(self._secondaryHint, 0);
  }, 2000);

  if (callback)
    this._stop_selection_callback = callback;
}


/**
 * Standard Annotator method: editAnnotation
 * @suppress {checkTypes}
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.editAnnotation = function(annotation) {
  // Step 1 - remove from viewer
  this._viewer.removeAnnotation(annotation);

  // Step 2 - TODO find a suitable selector for the shape
  var selector = this._selector;

  // Step 3 - open annotation in editor
  var self = this;
  if (selector) {
    goog.style.showElement(this._editCanvas, true);
    this._viewer.highlightAnnotation(undefined);
    
    // TODO make editable - not just draw (selector implementation required)
    var g2d = this._editCanvas.getContext('2d');
    var shape = annotation.shapes[0];
    var viewportShape = annotorious.shape.transform(shape, function(xy) { return self.fromItemCoordinates(xy); });
    selector.drawShape(g2d, viewportShape);

    var viewportBounds = annotorious.shape.getBoundingRect(viewportShape).geometry;
    this.editor.setPosition(new annotorious.shape.geom.Point(viewportBounds.x + this._div.offsetLeft,
                                                             viewportBounds.y + viewportBounds.height + 4 + this._div.offsetTop));
    this.editor.open(annotation);   
  }
}

/**
 * Standard Annotator method: addAnnotation
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.addAnnotation = function(annotation) {
  this._viewer.addAnnotation(annotation);
}

/**
 * Standard Annotator method: addHandler
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.addHandler = function(type, handler) {
  this._eventBroker.addHandler(type, handler);  
}

/**
 * Standard Annotator method: addSelector
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.addSelector = function(selector) {

}

/**
 * Standard Annotator method: fireEvent
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.fireEvent = function(type, event) {
  return this._eventBroker.fireEvent(type, event);
}

/**
 * Standard Annotator method: fromItemCoordinates
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.fromItemCoordinates = function(itemCoords) {
  var pxCoords = this._map.getViewPortPxFromLonLat(new OpenLayers.LonLat(itemCoords.x, itemCoords.y));
  return { x: pxCoords.x, y: pxCoords.y };
}

/**
 * Standard Annotator method: getActiveSelector
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.getActiveSelector = function() {
  return this._selector;
}

/**
 * Standard Annotator method: getAnnotations
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.getAnnotations = function() {

}

/**
 * Standard Annotator method: getAvailableSelectors
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.getAvailableSelectors = function() {

}

/**
 * Standard Annotator method: getItem
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.getItem = function() {
  // TODO implement something decent!
  return {src: "map://openlayers/something"};
}

/**
 * Standard Annotator method: highlightAnnotation
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.highlightAnnotation = function(annotation) {
  this._viewer.highlightAnnotation(annotation);
}

/**
 * Standard Annotator method: removeAnnotation
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.removeAnnotation = function(annotation) {
  this._viewer.removeAnnotation(annotation);
}

/**
 * Standard Annotator method: removeHandler
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.removeHandler = function(type, handler) {
  this._eventBroker.removeHandler(type, handler);
}

/**
 * Standard Annotator method: setActiveSelector
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.setActiveSelector = function(selector) {

}

/**
 * Standard Annotator method: stopSelection
 * @param {annotorious.Annotation=} original_annotation the original annotation being edited (if any)
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.stopSelection = function(original_annotation) {
   goog.style.showElement(this._editCanvas, false);
   if (this._stop_selection_callback) {
     this._stop_selection_callback();
     delete this._stop_selection_callback;
   }

   this._selector.stopSelection();
   
   // If this was an edit of an annotation (rather than creation of a new one) re-add to viewer!
   if (original_annotation)
     this._viewer.addAnnotation(original_annotation);
}

/**
 * Standard Annotator method: toItemCoordinates
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.toItemCoordinates = function(xy) {
  var itemCoords = this._map.getLonLatFromPixel(new OpenLayers.Pixel(xy.x, xy.y));
  return { x: itemCoords.lon, y: itemCoords.lat };
}
