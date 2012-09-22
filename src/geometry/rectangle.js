goog.provide('yuma.geom.Rectangle');

/**
 * A rectangle geometry primitive.
 * @param {number} x the anchor point x coordinate
 * @param {number} y the anchor point y coordinate
 * @param {number} width the rectangle width
 * @param {number} height the rectangle height
 * @constructor
 */
yuma.geom.Rectangle = function(x, y, width, height) {
  // Normalize to positive width and height
  if (width > 0) {
    this.x = x;
    this.width = width;
  } else {
    this.x = x + width;
    this.width = -width;
  }

  if (height > 0) {
    this.y = y;
    this.height = height;
  } else {
    this.y = y + height;
    this.height = -height;
  }
}

/**
 * Tests if the rectangle intersects with the specified point.
 * @param {number} px the x coordinate of the point to test for intersection
 * @param {number} py the y coordinate of the point to test for intersection
 * @return {boolean} true if the point intersects the rectangle
 */
yuma.geom.Rectangle.prototype.intersects = function(px, py) {
  if (px < this.x)
    return false;

  if (py < this.y)
    return false;

  if (px > this.x + this.width)
    return false;

  if (py > this.y + this.height)
    return false;

  return true;
}

/**
 * Computes the size of the rectangle.
 * @return {number} the size
 */
yuma.geom.Rectangle.prototype.size = function() {
  return this.width * this.height;
}

