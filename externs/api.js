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
  
  /** @type {Object} the annotation shape **/
  shape : {
  
    /** @type {string} the annotation shape type (e.g. rectangle, point, polygon) **/
    type     : {},
    
    /** @type {Object} the shape geometry **/
    geometry : {}
  }
};

/**
 * Annotorious Plugin interface.
 * @interface
 */
var Plugin = {

  /** type {function} called on plugin initialization **/
  initPlugin : function(anno) {},

  /** type {function} called on initialization of a Popup element **/
  onInitPopup : function(popup) {},

  /** type {function} called on initialization of an Editor element **/
  onInitEditor : function(editor) {}
  
}

