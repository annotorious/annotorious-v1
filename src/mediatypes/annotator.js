goog.provide('annotorious.mediatypes.Annotator');

/**
 * A base class for Annotorious Annotator implementations.
 * @constructor
 */
annotorious.mediatypes.Annotator = function () { }

annotorious.mediatypes.Annotator.prototype.addAnnotation = function (annotation, opt_replace) {
  this._viewer.addAnnotation(annotation, opt_replace);
}

/**
 * Retrieves all annotations that intersect the centroid of an annotation
 * @param {annotorious.Annotation} annotation annotation from which to retrieve the centroid
 * @param {String} type filter by shape type 
 * @return {Array.<annotorious.Annotation>} the annotations sorted by size, smallest first
 */
annotorious.mediatypes.Annotator.prototype.getIntersectedAnnotations = function (annotation, type) {
  var self = this;
  var shape = (annotation.shapes[0].units == annotorious.shape.Units.PIXEL) ? annotorious.shape.transform(annotation.shapes[0], function (xy) { return self.fromItemPixelCoordinates(xy); }) :
    annotorious.shape.transform(annotation.shapes[0], function (xy) { return self.fromItemCoordinates(xy); });

  var point = annotorious.shape.getCentroid(shape);
  var annotations = this.getAnnotationsAt(point.x, point.y);

  return annotations.filter(function (annota) {
    var notSelfAnno = annotorious.shape.hashCode(annota.shapes[0]) != annotorious.shape.hashCode(annotation.shapes[0]);
    return notSelfAnno && (!type || annota.shapes[0].type == type);
  });
}

annotorious.mediatypes.Annotator.prototype.addHandler = function (type, handler) {
  this._eventBroker.addHandler(type, handler);
}

annotorious.mediatypes.Annotator.prototype.removeHandler = function (type) {
  this._eventBroker.removeHandler(type);
}

annotorious.mediatypes.Annotator.prototype.fireEvent = function (type, event, opt_extra) {
  return this._eventBroker.fireEvent(type, event, opt_extra);
}

annotorious.mediatypes.Annotator.prototype.getActiveSelector = function () {
  return this._currentSelector;
}

annotorious.mediatypes.Annotator.prototype.highlightAnnotation = function (annotation) {
  this._viewer.highlightAnnotation(annotation);
}

annotorious.mediatypes.Annotator.prototype.removeAnnotation = function (annotation) {
  this._viewer.removeAnnotation(annotation);
}

annotorious.mediatypes.Annotator.prototype.removeHandler = function (type, handler) {
  this._eventBroker.removeHandler(type, handler);
}

annotorious.mediatypes.Annotator.prototype.stopSelection = function (original_annotation) {
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

annotorious.mediatypes.Annotator.prototype._attachListener = function (activeCanvas) {
  var self = this;
  goog.events.listen(activeCanvas, annotorious.events.ui.EventType.DOWN, function (event) {
    //console.log('start selection event');
    //console.log(event);
    var coords = annotorious.events.ui.sanitizeCoordinates(event, activeCanvas);
    self._viewer.highlightAnnotation(false);

    var annotations = undefined;
    if (self._selectionEnabled) {

      if (self._drawInsideRectAnno) {
        annotations = self._viewer.getAnnotationsAt(coords.x, coords.y);
        if (!annotations.length) return;
        annotations = annotations.filter(function (anno) {
          return anno.shapes[0].type == annotorious.shape.ShapeType.RECTANGLE;
        });
        if (!annotations.length) return;
      }
      goog.style.showElement(self._editCanvas, true);
      self._currentSelector.startSelection(coords.x, coords.y, annotations ? self._viewer.getSystemShape(annotations[0]) : undefined);
    } else {
      annotations = self._viewer.getAnnotationsAt(coords.x, coords.y);
      if (annotations.length > 0)
        self._viewer.highlightAnnotation(annotations[0]);
    }
  });
}
