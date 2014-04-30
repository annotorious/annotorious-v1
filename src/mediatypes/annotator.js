goog.provide('annotorious.mediatypes.Annotator');

/**
 * A base class for Annotorious Annotator implementations.
 * @constructor
 */
annotorious.mediatypes.Annotator = function() { }

annotorious.mediatypes.Annotator.prototype.addAnnotation = function(annotation) {
  this._viewer.addAnnotation(annotation);
}

annotorious.mediatypes.Annotator.prototype.addHandler = function(type, handler) {
  this._eventBroker.addHandler(type, handler);  
}

annotorious.mediatypes.Annotator.prototype.editAnnotation = function(annotation) {
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
    this.editor.setPosition(new annotorious.shape.geom.Point(viewportBounds.x + this.element.offsetLeft,
                                                             viewportBounds.y + viewportBounds.height + 4 + this.element.offsetTop));
    this.editor.open(annotation);   
  }
}

annotorious.mediatypes.Annotator.prototype.fireEvent = function(type, event) {
  return this._eventBroker.fireEvent(type, event);
}

annotorious.mediatypes.Annotator.prototype.getActiveSelector = function() {
  return this._selector;
}

annotorious.mediatypes.Annotator.prototype.highlightAnnotation = function(annotation) {
  this._viewer.highlightAnnotation(annotation);
}

annotorious.mediatypes.Annotator.prototype.removeAnnotation = function(annotation) {
  this._viewer.removeAnnotation(annotation);
}

annotorious.mediatypes.Annotator.prototype.removeHandler = function(type, handler) {
  this._eventBroker.removeHandler(type, handler);
}

annotorious.mediatypes.Annotator.prototype.stopSelection = function(original_annotation) {
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





