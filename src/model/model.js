goog.provide('yuma.model');

/**
 * An annotation.
 * @param {string} text the annotation text
 * @param {yuma.model.Shape} shape the shape defining the annotated fragment
 * @constructor
 */
yuma.model.Annotation = function(text, shape) {
  this.text = text;
  this.shape = shape;
}

/**
 * A shape, defining a 2D annotated area.
 * @param {yuma.model.ShapeType} type the shape type
 * @param {yuma.model.geom.Point | yuma.model.geom.Rectangle | yuma.model.geom.Polygon} geometry the geometry
 * @constructor
 */
yuma.model.Shape = function(type, geometry) {
  this.type = type
  this.geometry = geometry;
}

/**
 * Possible shape types
 * @enum {string}
 */
yuma.model.ShapeType = {
  POINT: "point",
  RECTANGLE: "rectangle",
  POLYGON: "polygon"
}
