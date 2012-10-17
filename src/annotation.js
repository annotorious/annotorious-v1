goog.provide('yuma.annotation');

/**
 * A 'domain class' implementation of the annotation interface (as defined in the externs).
 * @param {string} src the source URL of the annotated object
 * @param {string} text the annotation text
 * @param {yuma.model.Shape} shape the shape defining the annotated fragment
 * @implements {Annotation}
 * @constructor
 */
yuma.annotation.Annotation = function(src, text, shape) {
  this.src = src;
  this.text = text;
  this.shape = shape;
  // Note: we're using this notation this time in order to avoid dead code removal!
  this['context'] = document.URL;
}

/**
 * A shape, defining a 2D annotated area.
 * @param {yuma.model.ShapeType} type the shape type
 * @param {yuma.model.geom.Point | yuma.model.geom.Rectangle | yuma.model.geom.Polygon} geometry the geometry
 * @constructor
 */
yuma.annotation.Shape = function(type, geometry) {
  this.type = type
  this.geometry = geometry;
}

/**
 * Possible shape types
 * @enum {string}
 */
yuma.annotation.ShapeType = {
  POINT: "Point",
  RECTANGLE: "Rectangle",
  POLYGON: "Polygon"
}
