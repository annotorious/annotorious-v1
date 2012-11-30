/**
 * A collection of geometry helper functions.
 */
goog.provide('annotorious.geom');

/**
 * Checks whether a given geometry intersects a point.
 * @param {annotorious.geom.Point | annotorious.geom.Rectangle | annotorious.geom.Polygon} geometry the geometry
 * @param {number} px the X coordinate
 * @param {nubmer} py the Y coordinate
 * @returns {boolean} true if the point intersects the geometry
 */
annotorious.geom.intersects = function(geometry, px, py) {
    if (annotorious.geom.isRectangle(geometry)) {
      if (px < geometry.x)
        return false;

      if (py < geometry.y)
        return false;

      if (px > geometry.x + geometry.width)
        return false;

      if (py > geometry.y + geometry.height)
        return false;
    
      return true;
    }
    
    return false;
}

/**
 * Returns the size of a given geometry.
 * @param {annotorious.geom.Rectangle | annotorious.geom.Polygon} geometry the geometry
 * @returns {number} the size
 */
annotorious.geom.size = function(geometry) {
  if (annotorious.geom.isRectangle(geometry)) {
    return geometry.width * geometry.height;
  }
  
  return 0;
}

/**
 * Returns the bounding rectangle of a given geometry
 * @param {annotorious.geom.Rectangle | annotorious.geom.Polygon } geometry the geometry
 * @returns {annotorious.geom.Rectangle} the bounding rectangle
 */
annotorious.geom.getBoundingRect = function(geometry) {
  if (annotorious.geom.isRectangle(geometry)) {
    return geometry;
  } else if (annotorious.geom.isPolygon(geometry)) {
    var points = geometry.points;

    var left = points[0].x;
    var right = points[0].x;
    var top = points[0].y;
    var bottom = points[0].y;

    for (var i=1; i<points.length; i++) {
      if (points[i].x > right)
        right = points[i].x;

      if (points[i].x < left)
        left = points[i].x;

      if (points[i].y > bottom)
        bottom = points[i].y;

      if (points[i].y < top)
        top = points[i].y;
    }

    return new annotorious.geom.Rectangle(left, top, right - left, bottom - top);
  } else {
    return undefined;
  }
}

/**
 * Tests whether the geometry is a rectangle. Note: we need this 'duck typing' style
 * of instance check to make sure that not only instances of annotorious.geom.Rectangle are
 * recognized correctly, but also plain JSON objects.
 * @param {object} geometry the object to check
 * @returns {boolean} true if the object is a Rectangle
 */
annotorious.geom.isRectangle = function(geometry) {
  return (geometry.width && geometry.height && geometry.x && geometry.y)
}

annotorious.geom.isPolygon = function(geometry) {
  return (geometry.points && geometry.points.length > 2);
}
