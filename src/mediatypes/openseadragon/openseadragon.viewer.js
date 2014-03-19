goog.provide('annotorious.mediatypes.openseadragon.Viewer');

goog.require('goog.events.MouseWheelHandler');

annotorious.mediatypes.openseadragon.Viewer = function(osdViewer) {
  this._osdViewer = osdViewer;
}

/**
 * Adds an annotation to the viewer.
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.mediatypes.openseadragon.Viewer.prototype.addAnnotation = function(annotation) {
  var element = document.createElement('div');
  element.innerHTML = 'DUMMY';
  this._osdViewer.drawer.addOverlay(element, new OpenSeadragon.Point(0.2, 0.2), OpenSeadragon.OverlayPlacement.CENTER);
}

/**
 * Removes an annotation from the viewer.
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.mediatypes.openseadragon.Viewer.prototype.removeAnnotation = function(annotation) {

}

/**
 * Returns all annotations in this viewer.
 * @return {Array.<annotorious.Annotation>} the annotations
 */
annotorious.mediatypes.openseadragon.Viewer.prototype.getAnnotations = function() {

}

/**
 * Highlights a particular annotation in the viewer, or de-highlights (if that's a
 * word...) all, if no annotation is passed to the method.
 * @param {annotorious.Annotation | undefined} opt_annotation the annotation
 */
annotorious.mediatypes.openseadragon.Viewer.prototype.highlightAnnotation = function(opt_annotation) {

}
