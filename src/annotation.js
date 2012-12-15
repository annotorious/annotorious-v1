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
 * @param {annotorious.annotatoin.Units} units geometry measurement units
 * @constructor
 */
annotorious.annotation.Shape = function(type, geometry, units) {
  this.type = type
  this.geometry = geometry;
  if (units)
    this.units = units;
}

/**
 * Possible shape types
 * @enum {string}
 */
annotorious.annotation.ShapeType = {
  POINT: 'point',
  RECTANGLE: 'rect',
  POLYGON: 'polygon'
}

/**
 * Possible unit types
 * @enum {string}
 */
annotorious.annotation.Units = {
  PIXEL: 'pixel',
  FRACTION: 'fraction'
}
