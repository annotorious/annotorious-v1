/**
 * Definition of the Yuma anntation interface. This object needs to be interoperable with the 'outside world'. (Users can
 * pass annotations via the JavaScript API; annotations are exchanged via JSON with annotation servers.) Therefore the
 * Closure compiler can not rename the annotation object properties!
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