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
  
  /** The editor for this annotator (public for use by plugins) **/
  this.editor;
  
  /** @private **/   
  this._osdViewer = osdViewer; 
    
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
  this._viewer = new annotorious.mediatypes.openseadragon.Viewer(osdViewer, this);

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
      
  /** @private **/
  this._selector = new annotorious.plugins.selection.RectDragSelector();
  this._selector.init(this, this._editCanvas); 
  
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
goog.inherits(annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator, annotorious.mediatypes.Annotator);

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.showSelectionWidget = function() {
  // Does not have any effect at the moment
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.hideSelectionWidget = function() {
  // Does not have any effect at the moment
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

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.addSelector = function(selector) {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.fromItemCoordinates = function(itemCoords) {
  var viewElementPoint = new OpenSeadragon.Point(itemCoords.x, itemCoords.y);
  var viewportPoint = this._osdViewport.viewerElementToViewportCoordinates(viewElementPoint); 
  console.log(viewportPoint);
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.getAnnotations = function() {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.getAvailableSelectors = function() {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.getItem = function() {
  // TODO implement something decent!
  return { src: "dzi://openseadragon/something" };
}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.setActiveSelector = function(selector) {

}

annotorious.mediatypes.openseadragon.OpenSeadragonAnnotator.prototype.toItemCoordinates = function(xy) {
  var viewportPoint = new OpenSeadragon.Point(xy.x, xy.y);
  var viewportOpposite = (xy.width) ? new OpenSeadragon.Point(xy.x + xy.width - 2, xy.y + xy.height - 2) : false;
  var viewElementPoint = this._osdViewer.viewport.windowToViewportCoordinates(viewportPoint); 
  
  if (viewportOpposite) {
    var viewElementOpposite = this._osdViewer.viewport.windowToViewportCoordinates(viewportOpposite);
    return {x: viewElementPoint.x, y: viewElementPoint.y, width: viewElementOpposite.x - viewElementPoint.x, height: viewElementOpposite.y - viewElementPoint.y};
  } else {
    return viewElementPoint;
  }
}
