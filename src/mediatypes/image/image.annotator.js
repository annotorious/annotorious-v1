goog.provide('annotorious.mediatypes.image.ImageAnnotator');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.math');
goog.require('goog.soy');
goog.require('goog.style');

goog.require('annotorious.Editor');
goog.require('annotorious.Hint');
goog.require('annotorious.Popup');
goog.require('annotorious.mediatypes.Annotator');
goog.require('annotorious.mediatypes.image.Viewer');
goog.require('annotorious.plugins.selection.RectDragSelector');
goog.require('annotorious.templates.image');

/**
 * The ImageAnnotator is responsible for one image in the page.
 * @param {Element} item the image DOM element
 * @param {annotorious.Popup=} opt_popup a popup implementation to use instead of the default one
 * @constructor
 */
annotorious.mediatypes.image.ImageAnnotator = function (item, opt_popup) {
  annotorious.mediatypes.Annotator.call();

  var hint;

  /** The container DOM element (DIV) for the annotation layer **/
  this.element;

  /** The editor for this annotator (public for use by plugins) **/
  this.editor;

  /** The popup for this annotator (public for use by plugins) **/
  this.popup;

  /** @private **/
  this._image = item;

  /** @private **/
  this._original_bufferspace = { padding: item.style.padding, margin: item.style.margin }

  /** @private **/
  this._viewer;

  /** @private **/
  this._editCanvas;

  /** @private **/
  this._hint;

  /** @private **/
  this._displayMessage = undefined;

  /** @private **/
  this.outputUnits = annotorious.shape.Units.FRACTION;

  /** @private **/
  this._eventBroker = new annotorious.events.EventBroker();

  /** @private **/
  this._selectors = [];

  /** @private **/
  this._currentSelector;

  /** @private **/
  this._selectionEnabled = true;

  this.element = goog.dom.createDom('div', 'annotorious-annotationlayer');
  goog.style.setStyle(this.element, 'position', 'relative');
  goog.style.setStyle(this.element, 'display', 'inline-block');
  this._transferStyles(item, this.element);

  goog.dom.replaceNode(this.element, item);
  goog.dom.appendChild(this.element, item);

  var img_bounds = goog.style.getBounds(item);
  this._viewCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas,
    { width: img_bounds.width, height: img_bounds.height });
  if (annotorious.events.ui.hasMouse)
    goog.dom.classes.add(this._viewCanvas, 'annotorious-item-unfocus');
  goog.dom.appendChild(this.element, this._viewCanvas);

  this._editCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas,
    { width: img_bounds.width, height: img_bounds.height });

  if (annotorious.events.ui.hasMouse)
    goog.style.showElement(this._editCanvas, false);
  goog.dom.appendChild(this.element, this._editCanvas);

  if (opt_popup)
    this.popup = opt_popup;
  else
    this.popup = new annotorious.Popup(this);

  var default_selector = new annotorious.plugins.selection.RectDragSelector();
  default_selector.init(this, this._editCanvas);
  this._selectors.push(default_selector);
  this._currentSelector = default_selector;

  this.editor = new annotorious.Editor(this);
  this._viewer = new annotorious.mediatypes.image.Viewer(this._viewCanvas, this);
  this._hint = new annotorious.Hint(this, this.element);

  var self = this;

  if (annotorious.events.ui.hasMouse) {
    goog.events.listen(this.element, annotorious.events.ui.EventType.OVER, function (event) {
      var relatedTarget = event.relatedTarget;
      if (!relatedTarget || !goog.dom.contains(self.element, relatedTarget)) {
        self._eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_ITEM);
        goog.dom.classes.addRemove(self._viewCanvas, 'annotorious-item-unfocus', 'annotorious-item-focus');
      }
    });

    goog.events.listen(this.element, annotorious.events.ui.EventType.OUT, function (event) {
      var relatedTarget = event.relatedTarget;
      if (!relatedTarget || !goog.dom.contains(self.element, relatedTarget)) {
        self._eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM);
        goog.dom.classes.addRemove(self._viewCanvas, 'annotorious-item-focus', 'annotorious-item-unfocus');
      }
    });
  }

  var activeCanvas = (annotorious.events.ui.hasTouch) ? this._editCanvas : this._viewCanvas;
  this._attachListener(activeCanvas);

  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_COMPLETED, function (event) {
    var bounds = event.viewportBounds;
    self.editor.setPosition(new annotorious.shape.geom.Point(bounds.left + self._image.offsetLeft,
      bounds.bottom + 4 + self._image.offsetTop));
    self.editor.open(false, event);
  });

  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_CANCELED, function () {
    if (annotorious.events.ui.hasMouse)
      goog.style.showElement(self._editCanvas, false);
    self._currentSelector.stopSelection();
  });
}
goog.inherits(annotorious.mediatypes.image.ImageAnnotator, annotorious.mediatypes.Annotator);

/**
 * Helper function to transfer relevant styles from the <img> to the annotation layer <div> element.
 * @private
 */
annotorious.mediatypes.image.ImageAnnotator.prototype._transferStyles = function (image, annotationLayer) {
  var transferMargin = function (direction, value) {
    goog.style.setStyle(annotationLayer, 'margin-' + direction, value + 'px');
    goog.style.setStyle(image, 'margin-' + direction, 0);
    goog.style.setStyle(image, 'padding-' + direction, 0);
  }

  var margin = goog.style.getMarginBox(image);
  var padding = goog.style.getPaddingBox(image);

  if (margin.top != 0 || padding.top != 0)
    transferMargin('top', margin.top + padding.top);

  if (margin.right != 0 || padding.right != 0)
    transferMargin('right', margin.right + padding.right);

  if (margin.bottom != 0 || padding.bottom != 0)
    transferMargin('bottom', margin.bottom + padding.bottom);

  if (margin.left != 0 || padding.left != 0)
    transferMargin('left', margin.left + padding.left);
}

/**
 * NOT NEEDED/SUPPORTED on ImageAnnotator.
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.activateSelector = function (callback) { }

/**
 * Adds a selector
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.addSelector = function (selector) {
  selector.init(this, this._editCanvas);
  this._selectors.push(selector);
}

/**
 * Destroys this annotator instance.
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.destroy = function () {
  var img = this._image;
  img.style.margin = this._original_bufferspace.margin;
  img.style.padding = this._original_bufferspace.padding;
  goog.dom.replaceNode(img, this.element);
}

/**
 * Edits the specified existing annotation.
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.editAnnotation = function (annotation) {
  // Step 1 - remove from viewer
  this._viewer.removeAnnotation(annotation);

  // Step 2 - find a suitable selector for the shape
  var selector = goog.array.find(this._selectors, function (selector) {
    var types = selector.getSupportedShapeType();
    return Array.isArray(types) ? goog.array.indexOf(types, annotation.shapes[0].type) != -1 : types == annotation.shapes[0].type;
  });

  var shape = annotation.shapes[0];
  var self = this;
  var viewportShape = (shape.units == annotorious.shape.Units.PIXEL) ? annotorious.shape.transform(shape, function (xy) { return self.fromItemPixelCoordinates(xy); }) : annotorious.shape.transform(shape, function (xy) { return self.fromItemCoordinates(xy); });

  // Step 3 - open annotation in editor
  if (selector) {
    goog.style.showElement(this._editCanvas, true);
    this._viewer.highlightAnnotation(false);

    // TODO make editable - not just draw (selector implementation required)
    var g2d = this._editCanvas.getContext('2d');
    selector.drawShape(g2d, viewportShape);
  }

  var bounds = annotorious.shape.getBoundingRect(viewportShape).geometry;
  var anchor = new annotorious.shape.geom.Point(bounds.x, bounds.y + bounds.height);
  this.editor.setPosition(new annotorious.shape.geom.Point(anchor.x + this._image.offsetLeft,
    anchor.y + 4 + this._image.offsetTop));
  this.editor.open(annotation);
}

/**
 * Returns the currently active selector.
 * @returns {Object} the currently active selector
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.getActiveSelector = function () {
  return this._currentSelector;
}

/**
 * Returns all annotations on the annotatable media.
 * @returns {Array.<annotorious.Annotation>} the annotations
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.getAnnotations = function () {
  return this._viewer.getAnnotations();
}

/**
 * Returns the annotations at the specified client X/Y coordinates.
 * @param {number} cx the client X coordinate
 * @param {number} cy the client Y coordinate
 * @return {Array.<annotorious.Annotation>} the annotations sorted by size, smallest first
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.getAnnotationsAt = function (cx, cy) {
  return goog.array.clone(this._viewer.getAnnotationsAt(cx, cy));
}

/**
 * Returns the available selectors for this item.
 * @returns {Array.<Object>} the list of selectors
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.getAvailableSelectors = function () {
  return this._selectors;
}

/**
 * Returns the image that this annotator is responsible for.
 * @returns {Object} the image
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.getItem = function () {
  return { src: annotorious.mediatypes.image.ImageAnnotator.getItemURL(this._image), element: this._image };
}

/**
 * Helper function that returns the 'URL' of the image. Normally, this will be the
 * 'src' attribute of the <img> tag. But to provide more flexiblity, it is possible to 
 * override this value using the 'data-original' attribute. Only if this attribute 
 * does not exist, the real 'src' will be returned.
 * @param {Element} item the image DOM element
 * @return {string} the URL
 */
annotorious.mediatypes.image.ImageAnnotator.getItemURL = function (item) {
  var src = item.getAttribute('data-original');
  if (src)
    return src;
  else
    return item.src;
}

/**
 * Hides annotations (and all other Annotorious elements).
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.hideAnnotations = function () {
  goog.style.showElement(this._viewCanvas, false);
}

/**
 * Hides the selection widget, thus preventing users from creating new annotations.
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.hideSelectionWidget = function () {
  this._selectionEnabled = false;
  if (this._hint) {
    this._hint.destroy();
    delete this._hint;
  }
}

/**
 * Sets the active selector for this item to the specified selector.
 * @param {Object} selector the selector object
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.setCurrentSelector = function (selector) {
  this._currentSelector = goog.array.find(this._selectors, function (sel) {
    return sel.getName() == selector;
  });

  if (!this._currentSelector)
    console.log('WARNING: selector "' + selector + '" not available');
}

/**
 * Set the properties on this annotator. (Currently, we only have properties
 * affecting the selectors).
 * @param {Object} props the properties object
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.setProperties = function (props) {

  /** DisplayMessage **/
  if (props.hasOwnProperty("displayMessage")) {
    this._displayMessage = props["displayMessage"];
    if (this._selectionEnabled) {
      this.hideSelectionWidget();
      this.showSelectionWidget();
    }
  }

  /** Output Shape Units **/
  if (props.hasOwnProperty("outputUnits"))
    this.outputUnits = (props["outputUnits"] == annotorious.shape.Units.PIXEL) ? annotorious.shape.Units.PIXEL : annotorious.shape.Units.FRACTION;

  /** Color Mode **/
  if (props.hasOwnProperty("colorMode"))
    this._viewer.setColorMode(props["colorMode"]);

  /** ShapeStyle **/
  if (props.hasOwnProperty("shapeStyle")) {
    goog.array.forEach(this._selectors, function (selector) {
      selector.setProperties(props["shapeStyle"]);
    });
    this._viewer.redraw();
  }
}

/**
 * Shows annotations (and all other Annotorious elements).
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.showAnnotations = function () {
  goog.style.showElement(this._viewCanvas, true);
}

/**
 * Shows the selection widget, thus enabling users to create new annotations.
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.showSelectionWidget = function () {
  this._selectionEnabled = true;
  if (!this._hint)
    this._hint = new annotorious.Hint(this, this.element, this._displayMessage);
}

/**
 * Stops the selection (if any).
 * @param {annotorious.Annotation=} opt_original_annotation the original annotation being edited (if any)
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.stopSelection = function (opt_original_annotation) {
  if (annotorious.events.ui.hasMouse)
    goog.style.showElement(this._editCanvas, false);

  this._currentSelector.stopSelection();

  // If this was an edit of an annotation (rather than creation of a new one) re-add to viewer!
  if (opt_original_annotation)
    this._viewer.addAnnotation(opt_original_annotation);
}

/**
 * Converts the geometry 'fraction' coordinate to the coordinate used by system.
 * @param {annotorious.shape.geom.Point | annotorious.shape.geom.Rectangle} xy_wh the geometry 'fraction' coordinate
 * @returns the corresponding coordinate used by system
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.fromItemCoordinates = function (xy_wh) {
  var imgSize = goog.style.getSize(this._image);
  var systemPixel = { x: xy_wh.x * imgSize.width, y: xy_wh.y * imgSize.height };
  if (xy_wh.width) {
    systemPixel.width = xy_wh.width * imgSize.width;
    systemPixel.height = xy_wh.height * imgSize.height;
  }
  return systemPixel;
}

/**
 * Converts the geometry 'pixel' coordinate to the coordinate used by system.
 * [pixels are relative to the original image size]     
 * @param {annotorious.shape.geom.Point | annotorious.shape.geom.Rectangle} xy_wh the geometry 'pixel' coordinate
 * @returns the corresponding coordinate used by system
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.fromItemPixelCoordinates = function (xy_wh) {
  var imgSize = goog.style.getSize(this._image);

  var systemPixel = { x: parseInt((xy_wh.x / this._image.naturalWidth) * imgSize.width), y: parseInt((xy_wh.y / this._image.naturalHeight) * imgSize.height) };
  if (xy_wh.width) {
    systemPixel.width = parseInt((xy_wh.width / this._image.naturalWidth) * imgSize.width);
    systemPixel.height = parseInt((xy_wh.height / this._image.naturalHeight) * imgSize.height);
  }

  return systemPixel;
}

/**
 * Converts the specified coordinate used by system to geometry 'fraction' coordinate
 * @param {annotorious.shape.geom.Point | annotorious.shape.geom.Rectangle} xy_wh the system coordinate
 * @returns the corresponding geometry 'fraction' coordinate
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.toItemCoordinates = function (xy_wh) {
  var imgSize = goog.style.getSize(this._image);
  var newGeo = { x: xy_wh.x / imgSize.width, y: xy_wh.y / imgSize.height };
  if (xy_wh.width) {
    newGeo.width = xy_wh.width / imgSize.width;
    newGeo.height = xy_wh.height / imgSize.height;
  }
  return newGeo;
}

/**
 * Converts the specified coordinate used by system to geometry 'pixel' coordinate
 * [pixels are relative to the original image size]     
 * @param {annotorious.shape.geom.Point | annotorious.shape.geom.Rectangle} xy_wh the system coordinate
 * @returns the corresponding geometry 'pixel' coordinate
 */
annotorious.mediatypes.image.ImageAnnotator.prototype.toItemPixelCoordinates = function (xy_wh) {
  var imgSize = goog.style.getSize(this._image);
  var newGeo = { x: parseInt((xy_wh.x * this._image.naturalWidth) / imgSize.width), y: parseInt((xy_wh.y * this._image.naturalHeight) / imgSize.height) };
  if (xy_wh.width) {
    newGeo.width = parseInt((xy_wh.width * this._image.naturalWidth) / imgSize.width);
    newGeo.height = parseInt((xy_wh.height * this._image.naturalHeight) / imgSize.height);
  }
  return newGeo;
}

/** API exports **/
annotorious.mediatypes.image.ImageAnnotator.prototype['addSelector'] = annotorious.mediatypes.image.ImageAnnotator.prototype.addSelector;
annotorious.mediatypes.image.ImageAnnotator.prototype['fireEvent'] = annotorious.mediatypes.image.ImageAnnotator.prototype.fireEvent;
annotorious.mediatypes.image.ImageAnnotator.prototype['setCurrentSelector'] = annotorious.mediatypes.image.ImageAnnotator.prototype.setCurrentSelector;
annotorious.mediatypes.image.ImageAnnotator.prototype['toItemCoordinates'] = annotorious.mediatypes.image.ImageAnnotator.prototype.toItemCoordinates;
