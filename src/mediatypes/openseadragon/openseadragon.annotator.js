goog.provide('annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator');

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
  /** @private **/
  this.element = osdViewer['element'];
  
  /** The editor for this annotator (public for use by plugins) **/
  this.editor;
  
  /** @private **/   
  this._osdViewer = osdViewer; 
    
  /** @private **/
  this._eventBroker = new annotorious.events.EventBroker();
  
  /** @private **/
  this.popup = new annotorious.Popup(this);

  /** @private **/
  // this._viewer = new annotorious.mediatypes.openlayers.Viewer(map, this);

  /** @private **/
  this._editCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas, 
    { width:'0', height:'0' });
  goog.style.showElement(this._editCanvas, true);
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
  this._selector = new annotorious.plugins.selection.RectDragSelector();
  this._selector.init(this, this._editCanvas); 
  
  this.editor = new annotorious.Editor(this);
  
  /** Note - this code is duplicate across image, OpenLayers and OpenSeadragon & really needs to go into its own class **/
  goog.events.listen(this._editCanvas, goog.events.EventType.MOUSEDOWN, function(event) {
    var offset = goog.style.getClientPosition(self.element);
    self._selector.startSelection(event.clientX - offset.x, event.clientY - offset.y);
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

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.showSelectionWidget = function() {
  // Does not have any effect at the moment
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.hideSelectionWidget = function() {
  // Does not have any effect at the moment
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.activateSelector = function(callback) {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.editAnnotation = function(annotation) {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.addAnnotation = function(annotation) {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.addHandler = function(type, handler) {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.addSelector = function(selector) {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.fireEvent = function(type, event) {
  return this._eventBroker.fireEvent(type, event);
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.fromItemCoordinates = function(itemCoords) {
  console.log(this._osdViewport);
  var viewElementPoint = new OpenSeadragon.Point(itemCoords.x, itemCoords.y);
  var viewportPoint = this._osdViewport.viewerElementToViewportCoordinates(viewElementPoint); 
  console.log(viewportPoint);
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.getActiveSelector = function() {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.getAnnotations = function() {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.getAvailableSelectors = function() {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.getItem = function() {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.highlightAnnotation = function(annotation) {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.removeAnnotation = function(annotation) {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.removeHandler = function(type, handler) {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.setActiveSelector = function(selector) {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.stopSelection = function(original_annotation) {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.toItemCoordinates = function(xy) {
  var viewportPoint = new OpenSeadragon.Point(xy.x, xy.y);
  var viewElementPoint = this._osdViewer['viewport']['viewportToViewerElementCoordinates'](viewportPoint); 
  return viewElementPoint;
}
