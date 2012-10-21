goog.provide('annotorious.geom.Polygon');

/**
 * A polygon geometry primitive.
 * @param {Array.<annotorious.geom.Point>} points the points
 * @constructor
 */
annotorious.geom.Polygon = function(points) {
  this.points = points;
}


