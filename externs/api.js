/** Annotorious API Interface declarations **/

/**
 * Annotorious annotation interface.
 * @interface
 */
var Annotation = {  

  /** @type {string} source URL of the annotated object (e.g. image) **/
  src   : {},
  
  /** @type {string} source URL of the HTML document containing the annotated object **/
  context : {},
  
  /** @type {string} annotation text **/
  text  : {},

  /** @type {boolean} flag indicating whether the anntotation is edit-/deletable **/
  editable : {},
  
  /** @type {Object} the annotation shape **/
  shapes : [{
  
    /** @type {string} the annotation shape type (e.g. rect, point, polygon) **/
    type     : {},

    /** @type {string} measurement units used for the geometry (e.g. 'pixel', 'fraction') **/
    units    : {},
    
    /** @type {Object} the shape geometry **/
    geometry : {}
  }]
};

/**
 * Annotorious Plugin interface.
 * @interface
 */
var Plugin = {

  /** @type {function} called on plugin initialization **/
  initPlugin : function(anno) {},

  /** @type {function} called on initialization of a Popup element **/
  onInitAnnotator : function(annotator) {}
  
};

var Annotator = {

  /** @type {object} the popup used by this annotator **/
  popup : {},

  /** @type {object} the editor used by this annotator **/
  editor : {}

};

