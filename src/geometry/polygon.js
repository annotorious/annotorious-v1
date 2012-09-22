goog.provide('yuma.geom.Polygon');

/**
 * A polygon geometry primitive.
 * @param {Array.<yuma.model.geom.Point>} points the points
 * @constructor
 */
yuma.geom.Polygon = function(points) {
  this.points = points;
}


