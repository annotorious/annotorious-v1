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

/**
 * @param {annotorious.Annotation} annotation
 */
annotorious.Annotation.normalizePath = function(annotation) {
  if (annotation.src.indexOf('http://') != 0) {
	var link = document.createElement('a');
    link.href = annotation.src;
    annotation.src = link.protocol + '//' + link.host + link.pathname;
  }
}
