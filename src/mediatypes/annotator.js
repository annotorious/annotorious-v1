goog.provide('annotorious.mediatypes.Annotator');

/**
 * A base class for Annotorious Annotator implementations.
 * @constructor
 */
annotorious.mediatypes.Annotator = function() { }

annotorious.mediatypes.Annotator.prototype.addAnnotation = function(annotation, opt_replace) {
  this._viewer.addAnnotation(annotation, opt_replace);
}

annotorious.mediatypes.Annotator.prototype.addHandler = function(type, handler) {
  this._eventBroker.addHandler(type, handler);  
}

annotorious.mediatypes.Annotator.prototype.fireEvent = function(type, event, opt_extra) {
  return this._eventBroker.fireEvent(type, event, opt_extra);
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
