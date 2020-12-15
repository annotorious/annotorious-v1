/** Annotorious API Interface declarations **/

/**
 * Annotorious annotation interface.
 */
var Annotation = {

  /** @type {integer} annotation id **/
  id: {},

  /** @type {string} source URL of the annotated object (e.g. image) **/
  src: {},

  /** @type {string} source URL of the HTML document containing the annotated object **/
  context: {},

  /** @type {string} annotation text **/
  text: {},

  /** @type {integer} annotation text id **/
  textId: {},

  /** @type {boolean} flag indicating whether the anntotation is edit-/deletable **/
  editable: {},

  /** @type {Date} the timestamp of creation **/
  created_at: {},

  /** @type {Object} the annotation shape **/
  shapes: [{

    /** @type {string} the annotation shape type (e.g. rect, point, polygon) **/
    type: {},

    /** @type {string} measurement units used for the geometry (e.g. 'pixel', 'fraction') **/
    units: {},

    /** @type {Object} the shape geometry **/
    geometry: {},

    /** @type {string} the annotation mask url - only if type is 'rect' **/
    mask: {},

    /** @type {Object} the shape style **/
    style: {

      /** @type {string} outline color **/
      outline: {},

      /** @type {number} outline width **/
      outlineWidth: {},

      /** @type {string} outline color when highlighted **/
      hiOutline: {},

      /** @type {number} outline width when hightlighted **/
      hiOutlineWidth: {},

      /** @type {string} stroke color **/
      stroke: {},

      /** @type {number} stroke width **/
      strokeWidth: {},

      /** @type {string} stroke color when highlighted **/
      hiStroke: {},

      /** @type {number} stroke width when highlighted **/
      hiStrokeWidth: {},

      /** @type {string} fill color **/
      fill: {},

      /** @type {string} fill color when highlighted **/
      hiFill: {},

      /** @type {number} transparency for annotation mask [0-1] **/
      maskTransparency: {},

      /** @type {boolean} flag indicating whether the mask border is shown **/
      maskBorder: {},

      /** @type {string} stroke color for arrow shape **/
      arrowStroke: {},

      /** @type {number} stroke width for arrow shape [1-12]  **/
      arrowStrokeWidth: {},

      /** @type {string} stroke color when highlighted for arrow shape  **/
      hiArrowStroke: {},

      /** @type {number} stroke width when highlighted for arrow shape [1-12]  **/
      hiArrowStrokeWidth: {},

      /** @type {string} color to highlight the tail of the arrow shape **/
      highlightTail: {},

      /** @type {number} arrow tail highlight radius **/
      hiTailRadius: {},

      /** @type {string} color to highlight the head of the arrow shape **/
      highlightHead: {},

      /** @type {number} arrow head highlight radius **/
      hiHeadRadius: {}
    }
  }],

  /** @type {Function} called for set mask on the shape **/
  setMask: function (mask, shapeIdx, transparency, border) { }
};

/**
 * Annotation shape type: Rectangle
 */
var Rectangle = {

  x: {},

  y: {},

  width: {},

  height: {}

}

/**
 * Annotation shape type: Polygon
 */
var Polygon = {

  points: {}

}

/**
 * Annotation shape type: Arrow
 */
var Arrow = {

  arrowTail: {},

  arrowHead: {}

}

/**
 * Annotorious Plugin interface.
 */
var AnnotoriousPlugin = {

  /** @type {Function} called on plugin initialization **/
  initPlugin: function (anno) { },

  /** @type {Function} called on initialization of a Popup element **/
  onInitAnnotator: function (annotator) { }

};

/**
 * Annotator interface
 */
var Annotator = {

  /** @type {Element} the annotator DOM element **/
  element: {},

  /** @type {Object} the popup used by this annotator **/
  popup: {},

  /** @type {Object} the editor used by this annotator **/
  editor: {}

};

/**
 * Selector interface
 */
var Selector = {

  init: function () { },

  getName: function () { },

  getSupportedShapeType: function () { },

  startSelection: function () { },

  stopSelection: function () { },

  getShape: function () { },

  getViewportBounds: function () { },

  drawShape: function () { }

}

/**
 * Selection event
 */
var SelectionEvent = {

  mouseEvent: {},

  shape: {},

  viewportBounds: {}

}

/**
 * Popup API
 */
var Popup = {

  startHideTimer: function () { },

  clearHideTimer: function () { },

  show: function () { },

  setPosition: function () { },

  setAnnotation: function () { }

}