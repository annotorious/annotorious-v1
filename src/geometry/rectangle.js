goog.provide('annotorious.shape.geom.Rectangle');

/**
 * A rectangle geometry primitive.
 * @param {number} x the anchor point x coordinate
 * @param {number} y the anchor point y coordinate
 * @param {number} width the rectangle width
 * @param {number} height the rectangle height
 * @constructor
 */
annotorious.shape.geom.Rectangle = function(x, y, width, height) {
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

