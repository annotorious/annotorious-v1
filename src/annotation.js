goog.provide('annotorious.annotation');

/**
 * A 'domain class' implementation of the external annotation interface.
 * @param {string} src the source URL of the annotated object
 * @param {string} text the annotation text
 * @param {annotorious.annotation.Shape} shape the annotated fragment shape
 * @implements {Annotation}
 * @constructor
 */
annotorious.annotation.Annotation = function(src, text, shape) {
  this.src = src;
  this.text = text;
  this.shapes = [ shape ];
  this['context'] = document.URL; // Prevents dead code removal
}

/**
 * A shape defining a 2D annotated area.
 * @param {annotorious.annotation.ShapeType} type the shape type
 * @param {annotorious.geom.Point | annotorious.geom.Rectangle | annotorious.geom.Polygon} geometry the geometry
 * @constructor
 */
annotorious.annotation.Shape = function(type, geometry) {
  this.type = type
  this.geometry = geometry;
  this['unit'] = 'pixel'; // Digilib conformance
}

/**
 * Possible shape types
 * @enum {string}
 */
annotorious.annotation.ShapeType = {
  POINT: "Point",
  RECTANGLE: "Rectangle",
  POLYGON: "Polygon"
}
