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
  goog.style.setStyle(this._popup.element, 'z-index', 99000);
  
  /** @private **/
  this._overlays = [];

  /** @private **/
  this._currentlyHighlightedOverlay;

  /** @private **/
  this._lastHoveredOverlay;

  /** @private **/
  this._boxesLayer = new OpenLayers.Layer.Boxes('Annotorious'); // TODO make configurable
  this._map.addLayer(this._boxesLayer);

  var self = this;
  this._map.events.register('move', this._map, function() {
    if (self._currentlyHighlightedOverlay) {
      var div = self._currentlyHighlightedOverlay.marker.div;
      var pos = goog.style.getRelativePosition(div, self._map.div);
      var height = parseInt(goog.style.getStyle(div, 'height'), 10);
      self._popup.setPosition(pos.x, pos.y + height + 5);
    }
  });

  annotator.addHandler(annotorious.events.EventType.BEFORE_POPUP_HIDE, function() {
    self._updateHighlight(self._lastHoveredOverlay, self._currentlyHighlightedOverlay);
  });
}

annotorious.modules.openlayers.Viewer.prototype._updateHighlight = function(new_highlight, previous_highlight) {
  if (new_highlight) {
    var pos = goog.style.getRelativePosition(new_highlight.marker.div, this._map.div);
    var height = parseInt(goog.style.getStyle(new_highlight.marker.div, 'height'), 10);
    goog.style.setStyle(new_highlight.inner, 'border-color', '#fff000');
    this._popup.show(new_highlight.annotation, pos.x, pos.y + height + 5);
    this._currentlyHighlightedOverlay = new_highlight;
  } else {
    delete this._currentlyHighlightedOverlay;
  }

  if (previous_highlight) {
    goog.style.setStyle(previous_highlight.inner, 'border-color', '#fff');
  }
}

/**
 * Adds an annotation to the viewer.
 * @param {annotorious.annotation.Annotation} the annotation
 */
annotorious.modules.openlayers.Viewer.prototype.addAnnotation = function(annotation) {
  var geometry = annotation.shapes[0].geometry;
  var marker =
    new OpenLayers.Marker.Box(new OpenLayers.Bounds(geometry.x, geometry.y, geometry.x + geometry.width, geometry.y + geometry.height));
  goog.dom.classes.add(marker.div, 'annotorious-ol-boxmarker-outer');
  goog.style.setStyle(marker.div, 'border', null);
  
  var inner = goog.dom.createDom('div', 'annotorious-ol-boxmarker-inner');
  goog.style.setSize(inner, '100%', '100%');
  goog.dom.appendChild(marker.div, inner);

  var overlay = {annotation: annotation, marker: marker, inner: inner};

  var self = this;
  goog.events.listen(marker.div, goog.events.EventType.MOUSEOVER, function(event) {
    if (!self._currentlyHighlightedOverlay)
      self._updateHighlight(overlay, self._lastHoveredOverlay);

    self._lastHoveredOverlay = overlay;
  });
  
  goog.events.listen(marker.div, goog.events.EventType.MOUSEOUT, function(event) {
    delete self._lastHoveredOverlay;
    self._popup.startHideTimer();
  });
  
  this._overlays.push(overlay);

  goog.array.sort(this._overlays, function(a, b) {
    var geomA = a.annotation.shapes[0].geometry;
    var geomB = b.annotation.shapes[0].geometry;
    return annotorious.geom.size(geomB) - annotorious.geom.size(geomA);
  });
 
  var zIndex = 10000;
  goog.array.forEach(this._overlays, function(overlay) {
    goog.style.setStyle(overlay.marker.div, 'z-index', zIndex);
    zIndex++;
  });

  this._boxesLayer.addMarker(marker);
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
