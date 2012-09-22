goog.provide('yuma.annotation');

/**
 * An annotation.
 * @param {string} text the annotation text
 * @param {yuma.model.Shape} shape the shape defining the annotated fragment
 * @constructor
 */
yuma.annotation.Annotation = function(text, shape) {
  this.text = text;
  this.shape = shape;
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
  POINT: "point",
  RECTANGLE: "rectangle",
  POLYGON: "polygon"
}
