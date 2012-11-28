goog.provide('annotorious.modules.openlayers.Viewer');

goog.require('goog.style');
goog.require('goog.events');
goog.require('goog.dom.classes');
goog.require('goog.events.MouseWheelHandler');

/**
 * The OpenLayers viewer wraps an OpenLayers Box Marker layer to display annotations inside
 * of Box markers.
 * @param {object} map the OpenLayers map
 * @param {annotorious.viewer.Popup} the popup to use in this viewer
 * @param {annotorious.modules.openlayers.OpenLayersAnnotator} annotator reference to the annotator
 * @constructor
 */
annotorious.modules.openlayers.Viewer = function(map, popup, annotator) {
  /** @private **/
  this._map = map;

  /** @private **/
  this._popup = popup;
  goog.style.setStyle(this._popup.element, 'z-index', 10000);
  
  /** @private **/
  this._overlays = [];

  /** @private **/
  this._currentOverlay;

  /** @private **/
  this._boxesLayer = new OpenLayers.Layer.Boxes('Annotorious');
  this._map.addLayer(this._boxesLayer);

  var self = this;
  this._map.events.register('move', this._map, function() {
    if (self._currentOverlay) {
      var div = self._currentOverlay.marker.div;
      var pos = goog.style.getRelativePosition(div, self._map.div);
      var height = parseInt(goog.style.getStyle(div, 'height'), 10);
      self._popup.setPosition(pos.x, pos.y + height + 5);
    }
  });
}

/**
 * Adds an annotation to the viewer.
 * @param {annotorious.annotation.Annotation} the annotation
 */
annotorious.modules.openlayers.Viewer.prototype.addAnnotation = function(annotation) {
  var geometry = annotation.shape.geometry;
  var marker =
    new OpenLayers.Marker.Box(new OpenLayers.Bounds(geometry.x, geometry.y, geometry.x + geometry.width, geometry.y + geometry.height));
  goog.dom.classes.add(marker.div, 'annotorious-ol-boxmarker-outer');
  goog.style.setStyle(marker.div, 'border', null);
  
  var inner = goog.dom.createDom('div', 'annotorious-ol-boxmarker-inner');
  goog.style.setSize(inner, '100%', '100%');
  goog.dom.appendChild(marker.div, inner);

  var self = this;
  goog.events.listen(marker.div, goog.events.EventType.MOUSEOVER, function(event) {
    var pos = goog.style.getRelativePosition(marker.div, self._map.div);
    var height = parseInt(goog.style.getStyle(marker.div, 'height'), 10);
    goog.style.setStyle(inner, 'border-color', '#fff000');
    self._popup.show(annotation, pos.x, pos.y + height + 5);
    self._currentOverlay = {annotation: annotation, marker: marker};
  });
  
  goog.events.listen(marker.div, goog.events.EventType.MOUSEOUT, function(event) {
    goog.style.setStyle(inner, 'border-color', '#fff');
    self._popup.startHideTimer();
    delete self._currentOverlay;
  });
  
  /*
  this._map.events.register('mousemove', marker, function() {
    var pos = goog.style.getRelativePosition(marker.div, self._map.div);
    var height = parseInt(goog.style.getStyle(marker.div, 'height'), 10);
    self._popup.setPosition(pos.x, pos.y + height + 5);
  });
  
  this._map.events.register('zoomend', marker, function() {
    var pos = goog.style.getRelativePosition(marker.div, self._map.div);
    var height = parseInt(goog.style.getStyle(marker.div, 'height'), 10);
    self._popup.setPosition(pos.x, pos.y + height + 5);
  });
  */
  
  // TODO sort by size and (re-)assign z-indices
  this._boxesLayer.addMarker(marker);
  this._overlays.push({annotation: annotation, marker: marker});
}

/**
 * Removes an annotation from the viewer.
 * @param {annotorious.annotation.Annotation} the annotation
 */
annotorious.modules.openlayers.Viewer.prototype.removeAnnotation = function(annotation) {
  var overlay = goog.array.find(this._overlays, function(overlay) {
    return overlay.annotation == annotation;
  }); 

  if (overlay)
    this._boxesLayer.removeMarker(overlay.marker);
}
