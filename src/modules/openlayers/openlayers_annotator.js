goog.provide('annotorious.modules.openlayers.OpenLayersAnnotator');

goog.require('goog.dom');
goog.require('goog.style');

/**
 * The OpenLayersAnnotator is responsible for handling annotation functionality
 * on one OpenLayers map in the page.
 * @param {OpenLayers.Map} map the OpenLayers map
 * @constructor
 */
annotorious.modules.openlayers.OpenLayersAnnotator = function(map) {
  /** @private **/
  this._map = map;
  
  /** @private **/
  this._div = map.div;
  
  var width = parseInt(goog.style.getComputedStyle(this._div, 'width'));
  var height = parseInt(goog.style.getComputedStyle(this._div, 'height'));
  
  /** @private **/
  this._eventBroker = new annotorious.events.EventBroker();
  
  var annotationLayer = goog.dom.createDom('div', 'annotorious-annotationlayer');
  goog.style.setStyle(annotationLayer, 'position', 'relative');
  goog.style.setSize(annotationLayer, width, height); 
  goog.dom.replaceNode(annotationLayer, this._div);
  goog.dom.appendChild(annotationLayer, this._div);
    
  var hint = goog.soy.renderAsElement(annotorious.templates.openlayers.hint, {msg:'Press and Hold CTRL to Annotate'});
  goog.style.setStyle(hint, 'z-index', 9998);
  goog.style.setOpacity(hint, 0); 
  goog.dom.appendChild(annotationLayer, hint);

  var secondaryHint = goog.soy.renderAsElement(annotorious.templates.openlayers.secondaryHint, {msg: 'Click and Drag'});
  goog.style.setStyle(secondaryHint, 'z-index', 9998);
  goog.style.setOpacity(secondaryHint, 0); 
  goog.dom.appendChild(annotationLayer, secondaryHint);
  
  /** @private **/
  this._popup = new annotorious.viewer.Popup(annotationLayer, this);

  /** @private **/
  this._viewer = new annotorious.modules.openlayers.Viewer(map, this._popup, this);

  /** @private **/
  this._editCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas, 
    { width:width, height:height });
  goog.style.showElement(this._editCanvas, false);
  goog.style.setStyle(this._editCanvas, 'z-index', 9999);
  goog.dom.appendChild(annotationLayer, this._editCanvas);  

  /** @private **/
  this._selector = new annotorious.plugins.selection.RectDragSelector(this._editCanvas, this);
    
  /** @private **/
  this._editor = new annotorious.editor.Editor(this._selector, this, annotationLayer);
  goog.style.setStyle(this._editor.element, 'z-index', 10000);

  var self = this;  
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOVER, function(event) {
    var relatedTarget = event.relatedTarget;
    if (!relatedTarget || !goog.dom.contains(annotationLayer, relatedTarget)) {
      self._eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_ITEM);
      goog.style.setOpacity(hint, 0.8); 
      window.setTimeout(function() {
        goog.style.setOpacity(hint, 0);
      }, 2000);
    }
  });
  
  goog.events.listen(annotationLayer, goog.events.EventType.MOUSEOUT, function(event) {
    var relatedTarget = event.relatedTarget;
    if (!relatedTarget || !goog.dom.contains(annotationLayer, relatedTarget)) {
      self._eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM);
      goog.style.setOpacity(hint, 0);
    }
  });
  
  var isCtrlKeyDown = false;
  goog.events.listen(document, goog.events.EventType.KEYDOWN, function(event) {
    if (event.keyCode == 17) {
      isCtrlKeyDown = true;
      goog.style.setOpacity(hint, 0);
      goog.style.setOpacity(secondaryHint, 0.8); 
      window.setTimeout(function() {
        goog.style.setOpacity(secondaryHint, 0);
      }, 2000);
    }
  });
  
  goog.events.listen(document, goog.events.EventType.KEYUP, function(event) {
    isCtrlKeyDown = false;
  });
  
  goog.events.listen(this._div, goog.events.EventType.MOUSEDOWN, function(event) {
    if (isCtrlKeyDown) {
      goog.style.showElement(self._editCanvas, true);
      //self._viewer.highlightAnnotation(undefined);
      self._selector.startSelection(event.clientX, event.clientY);
    }
  });
  
  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_COMPLETED, function(event) {
    var bounds = event.viewportBounds;
    self._editor.setPosition(bounds.left + self._div.offsetLeft,
                             bounds.bottom + 4 + self._div.offsetTop);
    self._editor.open();    
  });

  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_CANCELED, function(event) {
    self.stopSelection();    
  });
}

annotorious.modules.openlayers.OpenLayersAnnotator.prototype.stopSelection = function() {
   goog.style.showElement(this._editCanvas, false);
   this._selector.stopSelection();
}

annotorious.modules.openlayers.OpenLayersAnnotator.prototype.addHandler = function(type, handler) {
  this._eventBroker.addHandler(type, handler);  
}

annotorious.modules.openlayers.OpenLayersAnnotator.prototype.fireEvent = function(type, event) {
  this._eventBroker.fireEvent(type, event);
}

annotorious.modules.openlayers.OpenLayersAnnotator.prototype.getImage = function() {
  // TODO implement something decent!
  return {src: "map://openlayers/something"};
}

annotorious.modules.openlayers.OpenLayersAnnotator.prototype.toItemCoordinates = function(pxCoords) {
  var itemCoords = this._map.getLonLatFromPixel(new OpenLayers.Pixel(pxCoords.x, pxCoords.y));
  return { x: itemCoords.lon, y: itemCoords.lat };
}

annotorious.modules.openlayers.OpenLayersAnnotator.prototype.fromItemCoordinates = function(itemCoords) {
  var pxCoords = this._map.getViewPortPxFromLonLat(new OpenLayers.LonLat(itemCoords.x, itemCoords.y));
  return { x: pxCoords.x, y: pxCoords.y };
}

annotorious.modules.openlayers.OpenLayersAnnotator.prototype.addAnnotation = function(annotation) {
  this._viewer.addAnnotation(annotation);
}

annotorious.modules.openlayers.OpenLayersAnnotator.prototype.removeAnnotation = function(annotation) {
  this._viewer.removeAnnotation(annotation);
}
