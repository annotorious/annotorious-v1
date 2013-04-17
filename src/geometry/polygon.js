goog.provide('annotorious.shape.geom.Polygon');

/**
 * A polygon geometry primitive.
 * @param {Array.<annotorious.shape.geom.Point>} points the points
 * @constructor
 */
annotorious.shape.geom.Polygon = function(points) {
  this.points = points;
}

/** Polygon-specific helper functions & geometry computation utilities **/

/**
 * Computes the area of a polygon. Note that the area can be <0, depending on the
 * clockwise/counterclockwise orientation of a polygon.
 * @param {Array.<annotorious.shape.geom.Point>} points the points
 * @returns the area
 */
annotorious.shape.geom.Polygon.computeArea = function(points) {
    var area = 0.0;

    var j = points.length - 1;
    for (var i=0; i<points.length; i++) {
      area += (points[j].x + points[i].x) * (points[j].y -points[i].y); 
      j = i; 
    }

    return area / 2;  
}

/**
 * Tests whether a polygon is oriented in clockwise or counterclockwise
 * direction.
 * @param {Array.<annotorious.shape.geom.Point>} points the points
 * @returns {boolean} true if the geometry is in clockwise orientation
 */
annotorious.shape.geom.Polygon.isClockwise = function(points) {
  return annotorious.shape.geom.Polygon.computeArea(points) < 0;
}

/**
 * Computes the centroid coordinate for the specified polygon.
 * @param {Array.<annotorious.shape.geom.Point>} points the points
 * @returns {annotorious.shape.geom.Point} the centroid X/Y coordinate
 */
annotorious.shape.geom.Polygon.computeCentroid = function(points) {
  var x = 0;
  var y = 0;
  var f;
  var j = points.length - 1;

  for (var i=0; i<points.length; i++) {
    f = points[i].x * points[j].y - points[j].x * points[i].y;
    x += (points[i].x + points[j].x) * f;
    y += (points[i].y + points[j].y) * f;
    j = i;
  }

  f = annotorious.shape.geom.Polygon.computeArea(points) * 6;
  return { x: Math.abs(x/f), y: Math.abs(y/f) }; 
}

annotorious.shape.geom.Polygon.sign = function(number) {
  return number > 0 ? 1 : number < 0 ? -1 : 0;
}

/**
 * A simple triangle expansion algorithm that shifts triangle vertices in/outwards by a specified
 * delta, along the axis centroid->vertex. Used internally as a subroutine for polygon expansion.
 * @param {Array.<annotorious.shape.geom.Point>} points the points
 * @returns {Array.<annotorious.shape.geom.Point>} the expanded triangle
 * @private
 */
annotorious.shape.geom.Polygon._expandTriangle = function(points, delta) {
  // Step 1: compute vectors for lines (12) and (23)
  var v1 = { x: points[0].x - points[1].x, y: points[0].y - points[1].y };
  var v2 = { x: points[2].x - points[1].x, y: points[2].y - points[1].y };
  
  // Step 2: compute angle between vectors
  var alpha_half = annotorious.shape.computeAngle(v1, v2) / 2;

  // Step 3: compute distance along mid-angle line
  var offset = delta / Math.sin(alpha_half);
  
  // Compute angle of first line
  var phi = annotorious.shape.computeAngle(v1) - alpha_half;
  var offset_pt = { x: points[1].x + Math.cos(phi) * offset, y: points[1].y + Math.sin(phi) * offset };
  
  return [ points[0], offset_pt, points[2] ];
  /* Step 4: compute coordinates at offset
  function shiftAlongAxis(px, centroid, delta) {
    var axis = { x: (px.x - centroid.x) , y: (px.y - centroid.y) };
    var sign_delta = annotorious.shape.geom.Polygon.sign(delta);
    var sign_x = annotorious.shape.geom.Polygon.sign(axis.x) * sign_delta;
    var sign_y = annotorious.shape.geom.Polygon.sign(axis.y) * sign_delta;
  
    var dy = Math.sqrt(Math.pow(delta, 2) / (1 + Math.pow((axis.x / axis.y), 2)));
    var dx = (axis.x / axis.y) * dy;
    return { x: px.x + Math.abs(dx) * sign_x, y: px.y + Math.abs(dy) * sign_y };
  }
  
  var centroid = annotorious.shape.geom.Polygon.computeCentroid(points);
  var expanded = [];
    
  for (var i=0; i<points.length; i++) {
    var sign = (annotorious.shape.geom.Polygon.isClockwise(points)) ? -1 : 1;
    expanded.push(shiftAlongAxis(points[i], centroid, sign * delta));
  }
    
  return expanded;
  */

}

/**
 * A simple polygon expansion algorithm that generates generates a series of triangles from the
 * polygon, and then applies annotorious.shape.geom.Polygon._expandTriangle.
 * @param {Array.<annotorious.shape.geom.Point>} points the points
 * @returns {Array.<annotorious.shape.geom.Point>} the expanded polygon
 */
annotorious.shape.geom.Polygon.expandPolygon = function(points, delta) {
  var sign = (annotorious.shape.geom.Polygon.isClockwise(points)) ? -1 : 1;
  
  if (points.length < 4)
    return annotorious.shape.geom.Polygon._expandTriangle(points, sign * delta);
  
  var prev = points.length - 1;
  var next = 1;
  
  var expanded = [];
  for (var current = 0; current<points.length; current++) {
    var expTriangle = annotorious.shape.geom.Polygon._expandTriangle([ points[prev], points[current], points[next] ], sign * delta);
    expanded.push(expTriangle[1]);
    prev = current;
    next++;
    if (next > points.length - 1)
      next = 0;
  }
  
  return expanded;
}
