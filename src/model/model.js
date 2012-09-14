goog.provide('yuma.model');

/**
 * An annotation
 * @param {string} text the annotation text
 * @param {yuma.Annotation.Shape} shape the shape defining the annotated fragment
 * @constructor
 */
yuma.model.Annotation = function(text, shape) {
  this.text = text;
  this.shape = shape;
}

/**
 * @param {yuma.Annotation.ShapeType} type the shape type
 * @param {yuma.geom.Point | yuma.geom.Rectangle | yuma.geom.Polygon} geometry the geometry
 * @constructor
 */
yuma.model.Shape = function(type, geometry) {
  this.type = type
  this.geometry = geometry;
}

/**
 * @enum {string}
 */
yuma.model.ShapeType = {
  POINT: "point",
  RECTANGLE: "rectangle",
  POLYGON: "polygon"
}
