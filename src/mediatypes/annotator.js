goog.provide('annotorious.mediatypes.Annotator');

/**
 * A base class for Annotorious Annotator implementations.
 * @constructor
 */
annotorious.mediatypes.Annotator = function() { 
  
}

annotorious.mediatypes.Annotator.prototype.addAnnotation = function(annotation) {
  this._viewer.addAnnotation(annotation);
}

annotorious.mediatypes.Annotator.prototype.addHandler = function(type, handler) {
  this._eventBroker.addHandler(type, handler);  
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





