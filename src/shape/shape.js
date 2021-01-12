goog.provide('annotorious.shape');

goog.require('annotorious.shape.geom.Polygon');
goog.require('annotorious.shape.geom.Rectangle');

/**
 * A shape. Consists of descriptive shape metadata, plus the actual shape geometry.
 * @param {annotorious.shape.ShapeType} type the shape type
 * @param {annotorious.shape.geom.Point | annotorious.shape.geom.Rectangle | annotorious.shape.geom.Polygon} geometry the geometry
 * @param {annotorious.shape.Units=} units geometry measurement units
 * @param {Object} style style of the shape (optional)
 * @param {string} mask the The URL of the mask - only if type is 'rect' (optional)
 * @constructor
 */
annotorious.shape.Shape = function (type, geometry, units, style, mask) {
  this.type = type
  this.geometry = geometry;
  if (mask && type == annotorious.shape.ShapeType.RECTANGLE)
    this.mask = mask;
  if (units)
    this.units = units;
  if (style)
    this.style = style;
  else
    this.style = {};
}

/**
 * Possible shape types
 * @enum {string}
 */
annotorious.shape.ShapeType = {
  POINT: 'point',
  RECTANGLE: 'rect',
  POLYGON: 'polygon',
  ARROW: 'arrow'
}

/**
 * Possible unit types
 * @enum {string}
 */
annotorious.shape.Units = {
  PIXEL: 'pixel',
  FRACTION: 'fraction'
}


/** Helper functions & geometry computation utilities **/


/**
 * Checks whether a given shape intersects a point.
 * @param {annotorious.shape.Shape} shape the shape
 * @param {number} px the X coordinate
 * @param {number} py the Y coordinate
 * @return {boolean} true if the point intersects the shape
 */
annotorious.shape.intersects = function (shape, px, py) {
  if (shape.type == annotorious.shape.ShapeType.RECTANGLE || shape.type == annotorious.shape.ShapeType.ARROW) {
    var geometry = (shape.type == annotorious.shape.ShapeType.ARROW) ? annotorious.shape.geom.Arrow.getRectangle(shape.geometry) : shape.geometry;

    if (px < geometry.x)
      return false;

    if (py < geometry.y)
      return false;

    if (px > geometry.x + geometry.width)
      return false;

    if (py > geometry.y + geometry.height)
      return false;

    return true;
  } else if (shape.type == annotorious.shape.ShapeType.POLYGON) {
    var points = shape.geometry.points;
    var inside = false;

    var j = points.length - 1;
    for (var i = 0; i < points.length; i++) {
      if ((points[i].y > py) != (points[j].y > py) &&
        (px < (points[j].x - points[i].x) * (py - points[i].y) / (points[j].y - points[i].y) + points[i].x)) {
        inside = !inside;
      }
      j = i;
    }

    return inside;
  }

  return false;
}

/**
 * Returns the size of a shape.
 * @param {annotorious.shape.Shape} shape the shape
 * @return {number} the size
 */
annotorious.shape.getSize = function (shape) {
  if (shape.type == annotorious.shape.ShapeType.RECTANGLE || shape.type == annotorious.shape.ShapeType.ARROW) {
    var geometry = (shape.type == annotorious.shape.ShapeType.ARROW) ? annotorious.shape.geom.Arrow.getRectangle(shape.geometry) : shape.geometry;
    return geometry.width * geometry.height;
  } else if (shape.type == annotorious.shape.ShapeType.POLYGON) {
    return Math.abs(annotorious.shape.geom.Polygon.computeArea(shape.geometry.points));
  }
  return 0;
}

/**
 * Returns the bounding rectangle of a shape.
 * @param {annotorious.shape.Shape} shape the shape
 * @return {annotorious.shape.Shape | undefined} the bounding rectangle
 */
annotorious.shape.getBoundingRect = function (shape) {
  if (shape.type == annotorious.shape.ShapeType.RECTANGLE) {
    return shape;
  } else if (shape.type == annotorious.shape.ShapeType.POLYGON) {
    var points = shape.geometry.points;

    var left = points[0].x;
    var right = points[0].x;
    var top = points[0].y;
    var bottom = points[0].y;

    for (var i = 1; i < points.length; i++) {
      if (points[i].x > right)
        right = points[i].x;

      if (points[i].x < left)
        left = points[i].x;

      if (points[i].y > bottom)
        bottom = points[i].y;

      if (points[i].y < top)
        top = points[i].y;
    }

    return new annotorious.shape.Shape(annotorious.shape.ShapeType.RECTANGLE,
      new annotorious.shape.geom.Rectangle(left, top, right - left, bottom - top),
      false, shape.style
    );
  } else if (shape.type == annotorious.shape.ShapeType.ARROW) {
    return new annotorious.shape.Shape(annotorious.shape.ShapeType.RECTANGLE,
      annotorious.shape.geom.Arrow.getRectangle(shape.geometry),
      false, shape.style
    );
  }

  return undefined;
}

/**
 * Computes the centroid coordinate for the specified shape.
 * @param {annotorious.shape.Shape} shape the shape
 * @returns {annotorious.shape.geom.Point | undefined} the centroid X/Y coordinate
 */
annotorious.shape.getCentroid = function (shape) {
  if (shape.type == annotorious.shape.ShapeType.RECTANGLE || shape.type == annotorious.shape.ShapeType.ARROW) {
    var rect = (shape.type == annotorious.shape.ShapeType.ARROW) ? annotorious.shape.geom.Arrow.getRectangle(shape.geometry) : shape.geometry;
    return new annotorious.shape.geom.Point(rect.x + rect.width / 2, rect.y + rect.height / 2);
  } else if (shape.type == annotorious.shape.ShapeType.POLYGON) {
    return annotorious.shape.geom.Polygon.computeCentroid(shape.geometry.points);
  }

  return undefined;
}

/**
 * Expands a shape by a specified delta.
 * @param {annotorious.shape.Shape} shape the shape
 * @param {number} delta the delta 
 */
annotorious.shape.expand = function (shape, delta) {
  // TODO for the sake of completeness: implement for RECTANGLE
  return new annotorious.shape.Shape(annotorious.shape.ShapeType.POLYGON,
    new annotorious.shape.geom.Polygon(annotorious.shape.geom.Polygon.expandPolygon(shape.geometry.points, delta)),
    false, shape.style);
}

/**
 * Transforms a shape from a source coordinate system to a destination coordinate
 * system. The transformation is calculated using the transformationFn parameter, 
 * which must be a function(xy) that transforms a single XY coordinate.
 * @param {annotorious.shape.Shape} shape the shape to transform
 * @param {Function} transformationFn the transformation function
 * @return {annotorious.shape.Shape | undefined} the transformed shape
 */
annotorious.shape.transform = function (shape, transformationFn) {
  if (shape.type == annotorious.shape.ShapeType.RECTANGLE) {

    var geom = shape.geometry;
    var transformed = transformationFn(geom);
    transformed.rotation = geom.rotation;

    return new annotorious.shape.Shape(annotorious.shape.ShapeType.RECTANGLE, transformed, false, shape.style, shape.mask);
  } else if (shape.type == annotorious.shape.ShapeType.POLYGON) {
    var transformedPoints = [];
    goog.array.forEach(shape.geometry.points, function (pt) {
      transformedPoints.push(transformationFn(pt));
    });
    return new annotorious.shape.Shape(annotorious.shape.ShapeType.POLYGON,
      new annotorious.shape.geom.Polygon(transformedPoints),
      false, shape.style
    );
  } else if (shape.type == annotorious.shape.ShapeType.ARROW) return new annotorious.shape.Shape(
    annotorious.shape.ShapeType.ARROW,
    new annotorious.shape.geom.Arrow(
      transformationFn(shape.geometry.arrowTail),
      transformationFn(shape.geometry.arrowHead)
    ), false, shape.style
  );

  return undefined;
}

/**
 * Computes a 'hashCode' for the specified shape. Not the nicest (and most performat?)
 * way to do it. But we need a useful .toString kind-of fuctionality to use for hashtable
 * keys in the viewer!
 * @param {annotorious.shape.Shape} shape the shape
 * @return {string} a 'hashcode' for the shape
 */
annotorious.shape.hashCode = function (shape) {
  return JSON.stringify(shape.geometry);
}
