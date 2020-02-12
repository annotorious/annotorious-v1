goog.provide('annotorious.shape.geom.Arrow');

/**
 * A Arrow.
 * @param {annotorious.shape.geom.Point} arrowTail the point of arrow tail
 * @param {annotorious.shape.geom.Point} arrowHead the point of arrow head
 * @constructor
 */
annotorious.shape.geom.Arrow = function (arrowTail, arrowHead) {
  this.arrowTail = arrowTail;
  this.arrowHead = arrowHead;
}

/** Arrow-specific helper functions & geometry computation utilities **/

/**
 * Returns the rectangle formed by the ends of the arrow
 * @param {annotorious.shape.geom.Arrow} arrow the arrow
 * @return {annotorious.shape.geom.Rectangle} the rectangle
 */
annotorious.shape.geom.Arrow.getRectangle = function (arrow) {
  var right, left;
  if (arrow.arrowHead.x > arrow.arrowTail.x) {
    right = arrow.arrowHead.x;
    left = arrow.arrowTail.x;
  } else {
    right = arrow.arrowTail.x;
    left = arrow.arrowHead.x;
  }

  var top, bottom;
  if (arrow.arrowHead.y > arrow.arrowTail.y) {
    top = arrow.arrowTail.y;
    bottom = arrow.arrowHead.y;
  } else {
    top = arrow.arrowHead.y;
    bottom = arrow.arrowTail.y;
  }

  return new annotorious.shape.geom.Rectangle(left, top, right - left, (bottom + 5) - top)
}
