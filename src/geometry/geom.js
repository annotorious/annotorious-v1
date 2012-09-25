goog.provide('yuma.geom');

/**
 * Checks whether a given geometry intersects a point.
 * @param {yuma.geom.Point | yuma.geom.Rectangle | yuma.geom.Polygon} geometry the geometry
 * @param {number} px the X coordinate
 * @param {nubmer} py the Y coordinate
 * @returns {boolean} true if the point intersects the geometry
 */
yuma.geom.intersects = function(geometry, px, py) {
    if (yuma.geom.isRectangle(geometry)) {
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
 * @param {yuma.geom.Rectangle | yuma.geom.Polygon} geometry the geometry
 * @returns {number} the size
 */
yuma.geom.size = function(geometry) {
  if (yuma.geom.isRectangle(geometry)) {
    return geometry.width * geometry.height;
  }
  
  return 0;
}

/**
 * Tests whether the geometry is a rectangle. Note: we need this 'duck typing' style
 * of instance check to make sure that not only instances of yuma.geom.Rectangle are
 * recognized correctly, but also plain JSON objects.
 */
yuma.geom.isRectangle = function(geometry) {
  return (geometry.width && geometry.height && geometry.x && geometry.y)
}