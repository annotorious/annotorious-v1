/**
 * Definition of the Yuma annotation interface. This object needs
 * to be interoperable with the 'outside world'. (Users can pass
 * annotations via the JavaScript API; annotations are exchanged
 * via JSON with annotation servers.) Therefore, the Closure compiler
 * may not rename the annotation object properties!
 *
 * Unfortunately, this creates some code redundancy with the implementation
 * <code>yuma.annotation.Annotation</code> in src/annotation.js. But I
 * don't see a way around this presently.
 *
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