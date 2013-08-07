goog.provide('annotorious.Annotation');

goog.require('annotorious.shape');

/**
 * A 'domain class' implementation of the external annotation interface.
 * @param {string} src the source URL of the annotated object
 * @param {string} text the annotation text
 * @param {annotorious.shape.Shape} shape the annotated fragment shape
 * @constructor
 */
annotorious.Annotation = function(src, text, shape) {
  this.src = src;
  this.text = text;
  this.shapes = [ shape ];
  this['context'] = document.URL; // Prevents dead code removal
}
