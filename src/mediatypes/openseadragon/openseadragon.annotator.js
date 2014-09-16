goog.provide('annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator');

goog.require('annotorious.mediatypes.Annotator');
goog.require('annotorious.mediatypes.openseadragon.Viewer');

/**
 * The OpenSeadragonAnnotator is responsible for handling annotation functionality
 * on one OpenSeadragon imagein the page.
 * 
 * FIXME there is lots of code duplication in here - refactor into a common annotator base class,
 * shared across image & OpenSeadragon
 * 
 * @param {Object} osdViewer the OpenSeadragon viewer
 * @constructor
 */
annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator = function(osdViewer) {
  annotorious.mediatypes.Annotator.call();
  
  /** @private **/
  this.element = osdViewer.element;
  // Hacky: Normalize the z-index of openseadragon-container
  goog.style.setStyle(goog.dom.getElementByClass("openseadragon-container"), 'z-index', 0);
  
  /** The editor for this annotator (public for use by plugins) **/
  this.editor;
  
  /** @private **/   
  this._osdViewer = osdViewer; 
    
  /** @private **/
  this._eventBroker = new annotorious.events.EventBroker();
  
  /** @private **/
  this._selectors = [];
  
  /** @private **/
  this._currentSelector;
  
  /** @private **/
  this._selectionEnabled = true;
  
  /** @private **/
  this._secondaryHint = goog.soy.renderAsElement(annotorious.templates.openlayers.secondaryHint, {msg: 'Click and Drag'});
  //goog.style.setStyle(this._secondaryHint, 'z-index', 9998);
  goog.style.setOpacity(this._secondaryHint, 0); 
  goog.dom.appendChild(this.element, this._secondaryHint);
  
  /** @private **/
  this.popup = new annotorious.Popup(this);

  /** @private **/
  this._viewer = new annotorious.mediatypes.openseadragon.Viewer(osdViewer, this);

  /** @private **/
  this._editCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas, 
    { width:'0', height:'0' });
  goog.style.showElement(this._editCanvas, false);

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
  
  var default_selector = new annotorious.plugins.selection.RectDragSelector();
  default_selector.init(this, this._editCanvas); 
  this._selectors.push(default_selector);
  this._currentSelector = default_selector;
  
  this.editor = new annotorious.Editor(this);
  
  /** Note - this code is duplicate across image, OpenLayers and OpenSeadragon & really needs to go into its own class **/
  this._attachListener(this._editCanvas);
  
  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_COMPLETED, function(event) {
    //goog.style.setStyle(self._editCanvas, 'pointer-events', 'none');

    var bounds = event.viewportBounds;
    self.editor.setPosition(new annotorious.shape.geom.Point(bounds.left, bounds.bottom + 4));
    self.editor.open();    
  });

  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_CANCELED, function(event) {
    self.stopSelection();    
  });
  
  /** End of possible dupplicated code **/ 
}
goog.inherits(annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator, annotorious.mediatypes.Annotator);

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.showSelectionWidget = function() {
  // Does not have any effect at the moment
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.hideSelectionWidget = function() {
  // Does not have any effect at the moment
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.destroy = function () {
	this._viewer.destroy();
	delete this._viewer;
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.activateSelector = function(callback) {
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

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.editAnnotation = function(annotation) {
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
    selector.drawShape(g2d, viewportShape);

    var viewportBounds = annotorious.shape.getBoundingRect(viewportShape).geometry;
    this.editor.setPosition(new annotorious.shape.geom.Point(viewportBounds.x, viewportBounds.y + viewportBounds.height + 4));
    this.editor.open(annotation);   
  }
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.fromItemCoordinates = function(itemCoords) {
  var offset = annotorious.dom.getOffset(this.element); 
  offset.top += window.pageYOffset;
  offset.left += window.pageXOffset;
  
  var viewportPoint = new OpenSeadragon.Point(itemCoords.x, itemCoords.y);
  var viewportOpposite = (itemCoords.width) ? new OpenSeadragon.Point(itemCoords.x + itemCoords.width, itemCoords.y + itemCoords.height) : false; 
  var windowPoint = this._osdViewer.viewport.viewportToWindowCoordinates(viewportPoint); 
 
  if (viewportOpposite) {
    var windowOpposite = this._osdViewer.viewport.viewportToWindowCoordinates(viewportOpposite);
    return { x: windowPoint.x - offset.left, y: windowPoint.y - offset.top, width: windowOpposite.x - windowPoint.x + 2, height: windowOpposite.y - windowPoint.y + 2 };    
  } else {
    return windowPoint;
  }  
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.getAnnotations = function() {
  return this._viewer._overlays;
}


annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.getAvailableSelectors = function() {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.getItem = function() {
  // TODO implement something decent!
  return { src: "dzi://openseadragon/something" };
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.setActiveSelector = function(selector) {

}

/**
 * Returns the currently active selector.
 * @returns {Object} the currently active selector
 */
annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.getActiveSelector = function() {
  return this._currentSelector;
}


annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.toItemCoordinates = function(xy) {
  var offset = annotorious.dom.getOffset(this.element); 
  offset.top += window.pageYOffset;
  offset.left += window.pageXOffset;
  
  var viewportPoint = new OpenSeadragon.Point(xy.x + offset.left, xy.y + offset.top);
  var viewportOpposite = (xy.width) ? new OpenSeadragon.Point(xy.x + offset.left + xy.width - 2, xy.y + offset.top + xy.height - 2) : false;
  var viewElementPoint = this._osdViewer.viewport.windowToViewportCoordinates(viewportPoint); 
  
  if (viewportOpposite) {
    var viewElementOpposite = this._osdViewer.viewport.windowToViewportCoordinates(viewportOpposite);
    return { x: viewElementPoint.x, y: viewElementPoint.y, 
             width: viewElementOpposite.x - viewElementPoint.x, 
             height: viewElementOpposite.y - viewElementPoint.y };
  } else {
    return viewElementPoint;
  }
}
