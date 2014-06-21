goog.provide('annotorious.mediatypes.openlayers.OpenLayersAnnotator');

goog.require('annotorious.mediatypes.Annotator');
goog.require('annotorious.templates.openlayers');
goog.require('annotorious.mediatypes.openlayers.Viewer');

/**
 * The OpenLayersAnnotator is responsible for handling annotation functionality
 * on one OpenLayers map in the page.
 * @param {OpenLayers.Map} map the OpenLayers map
 * @constructor
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator = function(map) {
  annotorious.mediatypes.Annotator.call();
  
  /** @private **/
  this._map = map;
  
  /** @private **/
  this.element = map.div;
  
  // We need to constrain the dimension of the canvas by the size of the map.
  // Therefore the map enclosing DIV needs to have position 'absolute' or
  // 'relative' set!
  var pos = goog.style.getStyle(this.element, 'position');
  if (pos != 'absolute' && pos != 'relative')
    goog.style.setStyle(this.element, 'position', 'relative');
  
  /** @private **/
  this._eventBroker = new annotorious.events.EventBroker();
  
  /** @private **/
  this._secondaryHint = goog.soy.renderAsElement(annotorious.templates.openlayers.secondaryHint, {msg: 'Click and Drag'});
  goog.style.setStyle(this._secondaryHint, 'z-index', 9998);
  goog.style.setOpacity(this._secondaryHint, 0); 
  goog.dom.appendChild(this.element, this._secondaryHint);
  
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
        var width = parseInt(goog.style.getComputedStyle(self.element, 'width'), 10),
            height = parseInt(goog.style.getComputedStyle(self.element, 'height'), 10);

        goog.style.setSize(self._editCanvas, width, height);
        self._editCanvas.width = width;
        self._editCanvas.height = height;
      };
  
  updateCanvasSize();

  /** @private **/
  this._currentSelector = new annotorious.plugins.selection.RectDragSelector();
  this._currentSelector.init(this, this._editCanvas); 
    
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
    var offset = goog.style.getClientPosition(self.element);
    self._currentSelector.startSelection(event.clientX - offset.x, event.clientY - offset.y);
  });
  
  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_COMPLETED, function(event) {
    goog.style.setStyle(self._editCanvas, 'pointer-events', 'none');

    var bounds = event.viewportBounds;
    self.editor.setPosition(new annotorious.shape.geom.Point(bounds.left /* + self.element.offsetLeft */,
                                                             bounds.bottom + 4 /* + self.element.offsetTop */));
    self.editor.open();    
  });

  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_CANCELED, function(event) {
    self.stopSelection();    
  });
}
goog.inherits(annotorious.mediatypes.openlayers.OpenLayersAnnotator, annotorious.mediatypes.Annotator);

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
  goog.style.setOpacity(this._secondaryHint, 0.8); 
  window.setTimeout(function() {
    goog.style.setOpacity(self._secondaryHint, 0);
  }, 2000);

  if (callback)
    this._stop_selection_callback = callback;
}

annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.destroy = function() {
  this._viewer.destroy();
  goog.dom.removeNode(this._secondaryHint);  
  goog.dom.removeNode(this._editCanvas);  
}

/**
 * Standard Annotator method: addSelector
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.addSelector = function(selector) {

}

annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.editAnnotation = function(annotation) {
  // Step 1 - remove from viewer
  this._viewer.removeAnnotation(annotation);

  // Step 2 - TODO find a suitable selector for the shape
  var selector = this._currentSelector;

  // Step 3 - open annotation in editor
  var self = this;
  if (selector) {
    goog.style.showElement(this._editCanvas, true);
    this._viewer.highlightAnnotation(undefined);
    
    // TODO make editable - not just draw (selector implementation required)
    var g2d = this._editCanvas.getContext('2d');
    var shape = annotation.shapes[0];
    var viewportShape = annotorious.shape.transform(shape, function(xy) { return self.fromItemCoordinates(xy); });
    console.log(viewportShape);
    selector.drawShape(g2d, viewportShape);

    var viewportBounds = annotorious.shape.getBoundingRect(viewportShape).geometry;
    this.editor.setPosition(new annotorious.shape.geom.Point(viewportBounds.x, viewportBounds.y + viewportBounds.height));
    this.editor.open(annotation);   
  }
}

/**
 * Standard Annotator method: fromItemCoordinates
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.fromItemCoordinates = function(itemCoords) {
  var pxCoords = this._map.getViewPortPxFromLonLat(new OpenLayers.LonLat(itemCoords.x, itemCoords.y));
  var pxOpposite = (itemCoords.width) ?
    this._map.getViewPortPxFromLonLat(new OpenLayers.LonLat(itemCoords.x + itemCoords.width, itemCoords.y + itemCoords.height)) : 
    false;
    
  if (pxOpposite) {
    return { x: pxCoords.x, y: pxOpposite.y, width: pxOpposite.x - pxCoords.x + 2, height: pxCoords.y - pxOpposite.y + 2};
  } else {
    return { x: pxCoords.x, y: pxCoords.y };
  }
}

/**
 * Standard Annotator method: getAnnotations
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.getAnnotations = function() {
  return this._viewer.getAnnotations();
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
 * Standard Annotator method: setActiveSelector
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.setActiveSelector = function(selector) {

}

/**
 * Standard Annotator method: toItemCoordinates
 */
annotorious.mediatypes.openlayers.OpenLayersAnnotator.prototype.toItemCoordinates = function(xy) {
  var itemCoords = this._map.getLonLatFromPixel(new OpenLayers.Pixel(xy.x, xy.y));
  var opposite = (xy.width) ? new OpenLayers.Pixel(xy.x + xy.width - 2, xy.y + xy.height - 2) : false;
  
  if (opposite) {
  	var itemOpposite = this._map.getLonLatFromPixel(opposite);
	  var foo = { x: itemCoords.lon, y: itemOpposite.lat, 
	           width: itemOpposite.lon - itemCoords.lon,
	           height: itemCoords.lat - itemOpposite.lat };
             
    console.log(foo);
    return foo;
  } else {
    return { x: itemCoords.lon, y: itemCoords.lat };
  }
}
