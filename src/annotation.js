goog.provide('annotorious.Annotation');

goog.require('annotorious.shape');

/**
 * A 'domain class' implementation of the external annotation interface.
 * @param {string} src the source URL of the annotated object
 * @param {string} text the annotation text
 * @param {annotorious.shape.Shape} shape the annotated fragment shape
 * @param {Date} created_at the timestamp of annotation creation [OPTIONAL]
 * @param {number} textId the id of text
 * @constructor
 */
annotorious.Annotation = function (src, text, shape, created_at, textId) {
  this.src = src;
  this.text = text;
  this.textId = textId;
  this.shapes = [shape];
  this.created_at = created_at || Date.now();
  this['context'] = document.URL; // Prevents dead code removal  
  this['setMask'] = this.setMask;
}

/**
 * Set mask on the shape
 * @param {string} mask the URL of the mask - only if type is 'rect' 
 * @param {number} shapeIdx the index of shape to set the mask [default: 0] (optional)
 * @param {number} transparency transparency for annotation mask [0-1] [default: 0.8] (optional)
 * @param {boolean} border if false, not show the mask border [default: true] (optional)
 */
annotorious.Annotation.prototype.setMask = function (mask, shapeIdx, transparency, border) {
  if (!shapeIdx || this.shapes.length >= shapeIdx) shapeIdx = 0;
  if (this.shapes[shapeIdx].type != annotorious.shape.ShapeType.RECTANGLE) console.log('WARNING: impossible to set mask in shape ' + this.shapes[shapeIdx].type);
  else this.shapes[shapeIdx].mask = mask;
  if (transparency) this.shapes[shapeIdx].style.maskTransparency = transparency;
  if (border != undefined) this.shapes[shapeIdx].style.maskBorder = border;
}