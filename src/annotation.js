goog.provide('annotorious.Annotation');

goog.require('annotorious.shape');

/**
 * A 'domain class' implementation of the external annotation interface.
 * @param {string} src the source URL of the annotated object
 * @param {string} text the annotation text
 * @param {annotorious.shape.Shape} shape the annotated fragment shape
 * @param {Date} created_at the timestamp of annotation creation [OPTIONAL]
 * @constructor
 */
annotorious.Annotation = function (src, text, shape, created_at) {
  this.src = src;
  this.text = text;
  this.shapes = [shape];
  this.created_at = created_at || Date.now();
  this['context'] = document.URL; // Prevents dead code removal  
  this['setMask'] = this.setMask;
}

/**
 * Set mask on the shape
 * @param {string} mask the URL of the mask - only if type is 'rect' 
 * @param {number} shapeIdx the index of shape to set the mask [default: 0] (optional)
 */
annotorious.Annotation.prototype.setMask = function (mask, shapeIdx) {
  if (!shapeIdx || this.shapes.length >= shapeIdx) shapeIdx = 0;
  if (this.shapes[shapeIdx].type != annotorious.shape.ShapeType.RECTANGLE) console.log('WARNING: impossible to set mask in shape ' + this.shapes[shapeIdx].type);
  else this.shapes[shapeIdx].mask = mask;
}