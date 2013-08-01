goog.provide('annotorious.modules.image.ImageAnnotator');

goog.require('goog.soy');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.math');
goog.require('goog.style');
goog.require('annotorious.modules.image.Viewer');
goog.require('annotorious.templates.image');
goog.require('annotorious.viewer');
goog.require('annotorious.editor');
goog.require('annotorious.hint');
goog.require('annotorious.plugins.selection.RectDragSelector');

/**
 * The ImageAnnotator is responsible for one image in the page.
 * @param {Element} item the image DOM element
 * @param {annotorious.viewer.Popup=} opt_popup a popup implementation to use instead of the default one
 * @constructor
 */
annotorious.modules.image.ImageAnnotator = function(item, opt_popup) {
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
  this._viewer;
  
  /** @private **/
  this._editCanvas;
  
  /** @private **/
  this._hint;
  
  /** @private **/
  this._eventBroker = new annotorious.events.EventBroker();

  /** @private **/
  this._selectors = [];
  
  /** @private **/
  this._currentSelector;

  /** @private **/
  this._selectionEnabled = true;

  var img_bounds = goog.style.getBounds(item);
  this.element = goog.dom.createDom('div', 'annotorious-annotationlayer');
  goog.style.setStyle(this.element, 'position', 'relative');
  goog.style.setStyle(this.element, 'display', 'inline-block');
  this._transferStyles(item, this.element);

  goog.style.setSize(this.element, img_bounds.width, img_bounds.height); 
  goog.dom.replaceNode(this.element, item);
  goog.dom.appendChild(this.element, item);
  
  this._viewCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas,
    { width:img_bounds.width, height:img_bounds.height });
  goog.dom.classes.add(this._viewCanvas, 'annotorious-item-unfocus');
  goog.dom.appendChild(this.element, this._viewCanvas);   

  this._editCanvas = goog.soy.renderAsElement(annotorious.templates.image.canvas, 
    { width:img_bounds.width, height:img_bounds.height });
  goog.style.showElement(this._editCanvas, false); 
  goog.dom.appendChild(this.element, this._editCanvas);

  if (opt_popup)
    this.popup = opt_popup;
  else
    this.popup = new annotorious.viewer.Popup(this);

  var default_selector = new annotorious.plugins.selection.RectDragSelector();
  default_selector.init(this._editCanvas, this); 
  this._selectors.push(default_selector);
  this._currentSelector = default_selector;

  this.editor = new annotorious.editor.Editor(this);
  this._viewer = new annotorious.modules.image.Viewer(this._viewCanvas, this.popup, this); 
  this._hint = new annotorious.hint.Hint(this, this.element);
  
  var self = this;
  goog.events.listen(this.element, goog.events.EventType.MOUSEOVER, function(event) {
    var relatedTarget = event.relatedTarget;
    if (!relatedTarget || !goog.dom.contains(self.element, relatedTarget)) {
      self._eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OVER_ANNOTATABLE_ITEM);
      goog.dom.classes.addRemove(self._viewCanvas, 'annotorious-item-unfocus', 'annotorious-item-focus');
    }
  });
  
  goog.events.listen(this.element, goog.events.EventType.MOUSEOUT, function(event) {
    var relatedTarget = event.relatedTarget;
    if (!relatedTarget || !goog.dom.contains(self.element, relatedTarget)) {
      self._eventBroker.fireEvent(annotorious.events.EventType.MOUSE_OUT_OF_ANNOTATABLE_ITEM);
      goog.dom.classes.addRemove(self._viewCanvas, 'annotorious-item-focus', 'annotorious-item-unfocus');
    }
  });

  goog.events.listen(this._viewCanvas, goog.events.EventType.MOUSEDOWN, function(event) {
    if (self._selectionEnabled) {
      goog.style.showElement(self._editCanvas, true);
      self._viewer.highlightAnnotation(undefined);
      self._currentSelector.startSelection(event.offsetX, event.offsetY);
    }
  });

  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_COMPLETED, function(event) {
    var bounds = event.viewportBounds;
    self.editor.setPosition(new annotorious.shape.geom.Point(bounds.left + self._image.offsetLeft,
                                                            bounds.bottom + 4 + self._image.offsetTop));
    self.editor.open();
  });
  
  this._eventBroker.addHandler(annotorious.events.EventType.SELECTION_CANCELED, function() {
    goog.style.showElement(self._editCanvas, false);
    self._currentSelector.stopSelection();
  });
}

/**
 * Helper function to transfer relevant styles from the <img> to the annotation layer <div> element.
 * @private
 */
annotorious.modules.image.ImageAnnotator.prototype._transferStyles = function(image, annotationLayer) {
  var transferMargin = function(direction, value) {
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
annotorious.modules.image.ImageAnnotator.prototype.activateSelector = function(callback) { }

/**
 * Adds an annotation to this annotator's viewer.
 * @param {annotorious.annotation.Annotation} annotation the annotation
 * @param {annotorious.annotation.Annotation=} opt_replace optionally, an existing annotation to replace
 */
annotorious.modules.image.ImageAnnotator.prototype.addAnnotation = function(annotation, opt_replace) {
  this._viewer.addAnnotation(annotation, opt_replace);
}

/**
 * Adds a lifecycle event handler to this annotator's Event Broker.
 * @param {annotorious.events.EventType} type the event type
 * @param {Function} handler the handler function
 */
annotorious.modules.image.ImageAnnotator.prototype.addHandler = function(type, handler) {
  this._eventBroker.addHandler(type, handler);  
}

/**
 * Adds a selector.
 * @param {Object} selector the selector object 
 */
annotorious.modules.image.ImageAnnotator.prototype.addSelector = function(selector) {
  selector.init(this, this._editCanvas); 
  this._selectors.push(selector);
}

/**
 * Edits the specified existing annotation.
 * @param {annotorious.annotation.Annotation} annotation the annotation
 */
annotorious.modules.image.ImageAnnotator.prototype.editAnnotation = function(annotation) {
  // Step 1 - remove from viewer
  this._viewer.removeAnnotation(annotation);
  
  // Step 2 - find a suitable selector for the shape
  var selector = goog.array.find(this._selectors, function(selector) {
    return selector.getSupportedShapeType() == annotation.shapes[0].type;
  });
  
  // Step 3 - open annotation in editor
  if (selector) {
    goog.style.showElement(this._editCanvas, true);
    this._viewer.highlightAnnotation(undefined);
    
    // TODO make editable - not just draw (selector implementation required)
    var g2d = this._editCanvas.getContext('2d');
    var shape = annotation.shapes[0];
    
    var self = this;
    var viewportShape = (shape.units == 'pixel') ? shape : annotorious.shape.transform(shape, function(xy) { return self.fromItemCoordinates(xy); }) ;
    selector.drawShape(g2d, viewportShape);
  }
  
  var bounds = annotorious.shape.getBoundingRect(annotation.shapes[0]).geometry;
  var anchor = (annotation.shapes[0].units == 'pixel') ?
    new annotorious.shape.geom.Point(bounds.x, bounds.y + bounds.height) :
    this.fromItemCoordinates(new annotorious.shape.geom.Point(bounds.x, bounds.y + bounds.height));   
  
  this.editor.setPosition(new annotorious.shape.geom.Point(anchor.x + this._image.offsetLeft,
                                                           anchor.y + 4 + this._image.offsetTop));
  this.editor.open(annotation);  
}

/**
 * Fire an event on this annotator's Event Broker.
 * @param {annotorious.events.EventType} type the event type
 * @param {Object} event the event object
 */
annotorious.modules.image.ImageAnnotator.prototype.fireEvent = function(type, event) {
  return this._eventBroker.fireEvent(type, event);
}

/**
 * Converts the specified viewport coordinate to the
 * coordinate system used by the annotatable item.
 * @param {annotorious.shape.geom.Point} xy the viewport coordinate
 * @returns the corresponding item coordinate
 */
annotorious.modules.image.ImageAnnotator.prototype.fromItemCoordinates = function(xy) {
  var imgSize = goog.style.getSize(this._image);
  return { x: xy.x * imgSize.width, y: xy.y * imgSize.height };
}

/**
 * Returns the currently active selector.
 * @returns {Object} the currently active selector
 */
annotorious.modules.image.ImageAnnotator.prototype.getActiveSelector = function() {
  return this._currentSelector;
}

/**
 * Returns all annotations on the annotatable media.
 * @returns {Array.<annotorious.annotation.Annotation>} the annotations
 */
annotorious.modules.image.ImageAnnotator.prototype.getAnnotations = function() {
  return this._viewer.getAnnotations();
}

/**
 * Returns the annotations at the specified client X/Y coordinates.
 * @param {number} cx the client X coordinate
 * @param {number} cy the client Y coordinate
 * @return {Array.<annotorious.annotation.Annotation>} the annotations sorted by size, smallest first
 */
annotorious.modules.image.ImageAnnotator.prototype.getAnnotationsAt = function(cx, cy) {
  return goog.array.clone(this._viewer.getAnnotationsAt(cx, cy));
}

/**
 * Returns the available selectors for this item.
 * @returns {Array.<Object>} the list of selectors
 */
annotorious.modules.image.ImageAnnotator.prototype.getAvailableSelectors = function() {
  return this._selectors;
}

/**
 * Returns the image that this annotator is responsible for.
 * @returns {Object} the image
 */
annotorious.modules.image.ImageAnnotator.prototype.getItem = function() {
  // TODO include width and height
  return { src: annotorious.modules.image.ImageAnnotator.getItemURL(this._image) };
}

/**
 * Helper function that returns the 'URL' of the image. Normally, this will be the
 * 'src' attribute of the <img> tag. But to provide more flexiblity, it is possible to 
 * override this value using the 'data-original' attribute. Only if this attribute 
 * does not exist, the real 'src' will be returned.
 * @param {Element} item the image DOM element
 * @return {string} the URL
 */
annotorious.modules.image.ImageAnnotator.getItemURL = function(item) {
  var src = item.getAttribute('data-original');
  if (src)
    return src;
  else
    return item.src;
}

/**
 * Hides annotations (and all other Annotorious elements).
 */
annotorious.modules.image.ImageAnnotator.prototype.hideAnnotations = function() {
  goog.style.showElement(this._viewCanvas, false);
}

/**
 * Hides the selection widget, thus preventing users from creating new annotations.
 */
annotorious.modules.image.ImageAnnotator.prototype.hideSelectionWidget = function() {
  this._selectionEnabled = false;
  if (this._hint) {
    this._hint.destroy();
    delete this._hint;
  }
}

/**
 * Highlights the specified annotation.
 * @param {annotorious.annotation.Annotation} annotation the annotation
 */
annotorious.modules.image.ImageAnnotator.prototype.highlightAnnotation = function(annotation) {
  this._viewer.highlightAnnotation(annotation);
}

/**
 * Removes an annotation from this annotator's viewer.
 * @param {annotorious.annotation.Annotation} annotation the annotation
 */
annotorious.modules.image.ImageAnnotator.prototype.removeAnnotation = function(annotation) {
  this._viewer.removeAnnotation(annotation);
}

/**
 * Removes a lifecycle event handler to this annotator's Event Broker.
 * @param {annotorious.events.EventType} type the event type
 * @param {Function} handler the handler function
 */
annotorious.modules.image.ImageAnnotator.prototype.removeHandler = function(type, handler) {
  this._eventBroker.removeHandler(type, handler);
}

/**
 * Sets the active selector for this item to the specified selector.
 * @param {Object} selector the selector object
 */
annotorious.modules.image.ImageAnnotator.prototype.setActiveSelector = function(selector) {
  this._currentSelector = goog.array.find(this._selectors, function(sel) {
    return sel.getName() == selector;
  });

  if (!this._currentSelector)
    console.log('WARNING: selector "' + selector + '" not available'); 
}

/**
 * Shows annotations (and all other Annotorious elements).
 */
annotorious.modules.image.ImageAnnotator.prototype.showAnnotations = function() {
  goog.style.showElement(this._viewCanvas, true);
}

/**
 * Shows the selection widget, thus enabling users to create new annotations.
 */
annotorious.modules.image.ImageAnnotator.prototype.showSelectionWidget = function() {
  this._selectionEnabled = true;  
  if (!this._hint)
    this._hint = new annotorious.hint.Hint(this, this.element);
}

/**
 * Stops the selection (if any).
 * @param {annotorious.annotation.Annotation=} opt_original_annotation the original annotation being edited (if any)
 */
annotorious.modules.image.ImageAnnotator.prototype.stopSelection = function(opt_original_annotation) {
   goog.style.showElement(this._editCanvas, false);
   this._currentSelector.stopSelection();
   
   // If this was an edit of an annotation (rather than creation of a new one) re-add to viewer!
   if (opt_original_annotation)
     this._viewer.addAnnotation(opt_original_annotation);
}

/**
 * Converts the specified coordinate from the
 * coordinate system used by the annotatable item to viewport coordinates.
 * @param {annotorious.shape.geom.Point} xy the item coordinate
 * @returns the corresponding viewport coordinate
 */
annotorious.modules.image.ImageAnnotator.prototype.toItemCoordinates = function(xy) {
  var imgSize = goog.style.getSize(this._image);
  return { x: xy.x / imgSize.width, y: xy.y / imgSize.height };
}

/** API exports **/
annotorious.modules.image.ImageAnnotator.prototype['fireEvent'] = annotorious.modules.image.ImageAnnotator.prototype.fireEvent;
annotorious.modules.image.ImageAnnotator.prototype['toItemCoordinates'] = annotorious.modules.image.ImageAnnotator.prototype.toItemCoordinates;
