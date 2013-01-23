goog.provide('annotorious.shape');

/**
 * A shape. Consists of descriptive shape metadata, plus the actual shape geometry.
 * @param {annotorious.shape.ShapeType} type the shape type
 * @param {annotorious.shape.geom.Point | annotorious.shape.geom.Rectangle | annotorious.shape.geom.Polygon} geometry the geometry
 * @param {annotorious.shape.Units} units geometry measurement units
 * @constructor
 */
annotorious.shape.Shape = function(type, geometry, units) {
  this.type = type
  this.geometry = geometry;
  if (units)
    this.units = units;
}

/**
 * Possible shape types
 * @enum {string}
 */
annotorious.shape.ShapeType = {
  POINT: 'point',
  RECTANGLE: 'rect',
  POLYGON: 'polygon'
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
 * @param {nubmer} py the Y coordinate
 * @returns {boolean} true if the point intersects the shape
 */
annotorious.shape.intersects = function(shape, px, py) {
    if (shape.type == annotorious.shape.ShapeType.RECTANGLE) {
      if (px < shape.geometry.x)
        return false;

      if (py < shape.geometry.y)
        return false;

      if (px > shape.geometry.x + shape.geometry.width)
        return false;

      if (py > shape.geometry.y + shape.geometry.height)
        return false;
    
      return true;
    } else if (shape.type == annotorious.shape.ShapeType.POLYGON) {
      var points = shape.geometry.points;
      var inside = false;

      var j = points.length - 1;
      for (var i=0; i<points.length; i++) {
        if ((points[i].y > py) != (points[j].y > py) && 
            (px < (points[j].x - points[i].x) * (py - points[i].y) / (points[j].y-points[i].y) + points[i].x)) {
          inside = !inside;
        }
        j = i;
      }

      return inside;
    }
    
    return false;
}

/**
 * Returns the size of a given shape.
 * @param {annotorious.shape.Shape} shape the shape
 * @returns {number} the size
 */
annotorious.shape.size = function(shape) {
  if (shape.type == annotorious.shape.ShapeType.RECTANGLE) {
    return shape.geometry.width * shape.geometry.height;
  } else if (shape.type == annotorious.shape.ShapeType.POLYGON) {
    var points = shape.geometry.points;
    var area = 0.0;

    var j = points.length - 1;
    for (var i=0; i<points.length; i++) {
      area += (points[j].x + points[i].x) * (points[j].y -points[i].y); 
      j = i; 
    }

    return Math.abs(area / 2);
  }
  
  return 0;
}

/**
 * Returns the bounding rectangle of a given shape.
 * @param {annotorious.shape.Shape} shape the shape
 * @returns {annotorious.geom.Rectangle} the bounding rectangle
 */
annotorious.shape.getBoundingRect = function(shape) {
  if (shape.type == annotorious.shape.ShapeType.RECTANGLE) {
    return shape.geometry;
  } else if (shape.type == annotorious.shape.ShapeType.POLYGON) {
    var points = shape.geometry.points;

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

    return new annotorious.shape.geom.Rectangle(left, top, right - left, bottom - top);
  }
}

annotorious.shape.getCentroid = function(shape) {
  if (shape.type == annotorious.shape.ShapeType.RECTANGLE) {
    var rect = shape.geometry;
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  } else if (shape.type == annotorious.shape.ShapeType.POLYGON) {
    var points = shape.geometry.points;
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

    f = annotorious.shape.size(shape) * 6;
    return { x: Math.abs(x/f), y: Math.abs(y/f) };
  }
}

/**
 * Transforms a shape from a source to a destination coordinate system. The transformation
 * is calculated using the transformationFn parameter, which must be a function(xy)
 * that transforms a single XY coordinate.
 * @param {annotorious.shape.Shape} shape the shape to transform
 * @param {function} transformationFn the transformation function
 * @returns {annotorious.shape.Shape} the transformed shape
 */
annotorious.shape.transform = function(shape, transformationFn) {
  if (shape.type == annotorious.shape.ShapeType.RECTANGLE) {
    var geom = shape.geometry;
    var anchor = transformationFn({ x: geom.x, y: geom.y });
    var size = transformationFn({ x: geom.width, y: geom.height });
    return new annotorious.shape.Shape(annotorious.shape.ShapeType.RECTANGLE, 
      new annotorious.shape.geom.Rectangle(anchor.x, anchor.y, size.x, size.y));
  } else if (shape.type == annotorious.shape.ShapeType.POLYGON) {
    var transformedPoints = [];
    goog.array.forEach(shape.geometry.points, function(pt) {
      transformedPoints.push(transformationFn(pt));
    });
    return new annotorious.shape.Shape(annotorious.shape.ShapeType.POLYGON,
      new annotorious.shape.geom.Polygon(transformedPoints));
  }
}
