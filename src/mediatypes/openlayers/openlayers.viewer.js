goog.provide('annotorious.mediatypes.openlayers.Viewer');

goog.require('goog.events.MouseWheelHandler');

/**
 * The OpenLayers viewer wraps an OpenLayers Box Marker layer to display annotations inside
 * of Box markers.
 * @param {Object} map the OpenLayers map
 * @param {annotorious.mediatypes.openlayers.OpenLayersAnnotator} annotator reference to the annotator
 * @constructor
 */
annotorious.mediatypes.openlayers.Viewer = function(map, annotator) {
  /** @private **/
  this._map = map;

  /** @private **/  
  this._map_bounds = goog.style.getBounds(annotator.element);
      
  /** @private **/
  this._popup = annotator.popup;
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
    if (self._currentlyHighlightedOverlay)
      self._place_popup();
  });

  annotator.addHandler(annotorious.events.EventType.BEFORE_POPUP_HIDE, function() {
    if (self._lastHoveredOverlay == self._currentlyHighlightedOverlay)
      self._popup.clearHideTimer();
    else
      self._updateHighlight(self._lastHoveredOverlay, self._currentlyHighlightedOverlay);
  });
}

annotorious.mediatypes.openlayers.Viewer.prototype.destroy = function() {
  this._boxesLayer.destroy();
}

/**
 * Resets the position of the popup, without changing the annotation.
 */
annotorious.mediatypes.openlayers.Viewer.prototype._place_popup = function() {
  // Compute correct annotation bounds, relative to map
  var annotation_div = this._currentlyHighlightedOverlay.marker.div;
  var annotation_dim = goog.style.getBounds(annotation_div);
  var annotation_pos = goog.style.getRelativePosition(annotation_div, this._map.div);
  var annotation_bounds = { top: annotation_pos.y, 
                            left: annotation_pos.x, 
                            width: annotation_dim.width, 
                            height: annotation_dim.height };

  // Popup width & height
  var popup_bounds = goog.style.getBounds(this._popup.element);

  var popup_pos = { y: annotation_bounds.top + annotation_bounds.height + 5 };
  if (annotation_bounds.left + popup_bounds.width > this._map_bounds.width) {
    goog.dom.classes.addRemove(this._popup.element, 'top-left', 'top-right');
    popup_pos.x = (annotation_bounds.left + annotation_bounds.width) - popup_bounds.width;
  } else {
    goog.dom.classes.addRemove(this._popup.element, 'top-right', 'top-left');
    popup_pos.x = annotation_bounds.left;
  }

  if (popup_pos.x < 0)
    popup_pos.x = 0;

  if (popup_pos.x + popup_bounds.width > this._map_bounds.width)
    popup_pos.x = this._map_bounds.width - popup_bounds.width;
     
  if (popup_pos.y + popup_bounds.height > this._map_bounds.height)
    popup_pos.y = this._map_bounds.height - popup_bounds.height;

  this._popup.setPosition(popup_pos);    
}

/**
 * Shows the popup with a new annotation.
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.mediatypes.openlayers.Viewer.prototype._show_popup = function(annotation) {
  this._popup.setAnnotation(annotation);
  this._place_popup();
  this._popup.show();
}

/**
 * @param {Object=} new_highlight the overlay to highlight
 * @param {Object=} previous_highlight the overlay previously highlighted
 */
annotorious.mediatypes.openlayers.Viewer.prototype._updateHighlight = function(new_highlight, previous_highlight) {
  if (new_highlight) {
    var pos = goog.style.getRelativePosition(new_highlight.marker.div, this._map.div);
    var height = parseInt(goog.style.getStyle(new_highlight.marker.div, 'height'), 10);
    goog.style.setStyle(new_highlight.inner, 'border-color', '#fff000');
    this._currentlyHighlightedOverlay = new_highlight;
    this._show_popup(new_highlight.annotation);
  } else {
    delete this._currentlyHighlightedOverlay;
  }

  if (previous_highlight) {
    goog.style.setStyle(previous_highlight.inner, 'border-color', '#fff');
  }
}

/**
 * Adds an annotation to the viewer.
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.mediatypes.openlayers.Viewer.prototype.addAnnotation = function(annotation) {
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
  goog.events.listen(inner, goog.events.EventType.MOUSEOVER, function(event) {
    if (!self._currentlyHighlightedOverlay)
      self._updateHighlight(overlay);

    self._lastHoveredOverlay = overlay;
  });
  
  goog.events.listen(inner, goog.events.EventType.MOUSEOUT, function(event) {
    delete self._lastHoveredOverlay;
    self._popup.startHideTimer();
  });
  
  this._overlays.push(overlay);

  goog.array.sort(this._overlays, function(a, b) {
    var shapeA = a.annotation.shapes[0];
    var shapeB = b.annotation.shapes[0];
    return annotorious.shape.getSize(shapeB) - annotorious.shape.getSize(shapeA);
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
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.mediatypes.openlayers.Viewer.prototype.removeAnnotation = function(annotation) {
  var overlay = goog.array.find(this._overlays, function(overlay) {
    return overlay.annotation == annotation;
  }); 

  if (overlay) {
    goog.array.remove(this._overlays, overlay);
    this._boxesLayer.removeMarker(overlay.marker);
  }
}

/**
 * Returns all annotations in this viewer.
 * @return {Array.<annotorious.Annotation>} the annotations
 */
annotorious.mediatypes.openlayers.Viewer.prototype.getAnnotations = function() {
  return goog.array.map(this._overlays, function(overlay) {
    return overlay.annotation;
  });
}

/**
 * Highlights a particular annotation in the viewer, or de-highlights (if that's a
 * word...) all, if no annotation is passed to the method.
 * @param {annotorious.Annotation | undefined} opt_annotation the annotation
 */
annotorious.mediatypes.openlayers.Viewer.prototype.highlightAnnotation = function(opt_annotation) {
  if (opt_annotation) {
    // TODO
  } else {
    this._popup.startHideTimer();
  }  
}
