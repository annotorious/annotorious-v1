goog.provide('annotorious.annotation');

/**
 * A 'domain class' implementation of the external annotation interface.
 * @param {string} src the source URL of the annotated object
 * @param {string} text the annotation text
 * @param {annotorious.annotation.Shape} shape the annotated fragment shape
 * @implements {Annotation}
 * @constructor
 */
annotorious.annotation.Annotation = function(src, text, shape) {
  this.src = src;
  this.text = text;
  this.shapes = [ shape ];
  this['context'] = document.URL; // Prevents dead code removal
}

/**
 * Utility function to create a copy of an annotation
 * @param {annotorious.annotation.Annotation} annotation the original annotation
 * @return {annotorious.annotation.Annotation} a copy
 */
annotorious.annotation.Annotation.clone = function(annotation) {
  return new annotorious.annotation.Annotation(annotation.src, annotation.text, annotation.shapes[0]);
}
