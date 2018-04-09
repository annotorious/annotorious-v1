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

annotorious.mediatypes.Annotator.prototype.removeHandler = function(type) {
  this._eventBroker.removeHandler(type);  
}

annotorious.mediatypes.Annotator.prototype.fireEvent = function(type, event, opt_extra) {
  return this._eventBroker.fireEvent(type, event, opt_extra);
}

annotorious.mediatypes.Annotator.prototype.getActiveSelector = function() {
  return this._currentSelector;
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
  if (annotorious.events.ui.hasMouse)
    goog.style.showElement(this._editCanvas, false);
    
  if (this._stop_selection_callback) {
    this._stop_selection_callback();
    delete this._stop_selection_callback;
  }

  this._currentSelector.stopSelection();
   
  // If this was an edit of an annotation (rather than creation of a new one) re-add to viewer!
  if (original_annotation)
    this._viewer.addAnnotation(original_annotation);
}

annotorious.mediatypes.Annotator.prototype._attachListener = function(activeCanvas) {
  var self = this;
  goog.events.listen(activeCanvas, annotorious.events.ui.EventType.DOWN, function(event) {
    console.log('start selection event');
    console.log(event);
    var coords = annotorious.events.ui.sanitizeCoordinates(event, activeCanvas);
    self._viewer.highlightAnnotation(false);
		if (self._selectionEnabled) {
      goog.style.showElement(self._editCanvas, true);      
      self._currentSelector.startSelection(coords.x, coords.y);
		} else {
			var annotations = self._viewer.getAnnotationsAt(coords.x, coords.y);
			if (annotations.length > 0)
				self._viewer.highlightAnnotation(annotations[0]);
		}
	});
}
