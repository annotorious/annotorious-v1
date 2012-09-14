goog.provide('yuma.model.geom.Polygon');

/**
 * A polygon geometry primitive.
 * @param {Array.<yuma.model.geom.Point>} points the points
 * @constructor
 */
yuma.model.geom.Polygon = function(points) {
  this.points = points;
}


