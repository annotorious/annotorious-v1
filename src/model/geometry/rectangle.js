goog.provide('yuma.model.geom.Rectangle');

/**
 * @constructor
 */
yuma.model.geom.Rectangle = function(x, y, width, height) {
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

yuma.model.geom.Rectangle.prototype.intersects = function(px, py) {
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

yuma.model.geom.Rectangle.prototype.size = function() {
  return this.width * this.height;
}

