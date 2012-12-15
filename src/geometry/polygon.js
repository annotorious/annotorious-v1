goog.provide('annotorious.shape.geom.Polygon');

/**
 * A polygon geometry primitive.
 * @param {Array.<annotorious.geom.Point>} points the points
 * @constructor
 */
annotorious.shape.geom.Polygon = function(points) {
  this.points = points;
}


