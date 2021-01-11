goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.query');

goog.require('annotorious.dom');
goog.require('annotorious.events');
goog.require('annotorious.mediatypes.Module');
goog.require('annotorious.mediatypes.image.ImageModule');
goog.require('annotorious.mediatypes.openlayers.OpenLayersModule');
goog.require('annotorious.mediatypes.openseadragon.OpenSeadragonModule');

/**
 * The main entrypoint to the application. The Annotorious class is instantiated exactly once,
 * and added to the global window object as 'window.anno'. It exposes the external JavaScript API
 * and internally manages the 'modules'. (Each module is responsible for one particular media
 * type - image, OpenLayers, etc.)  
 * @constructor
 */
annotorious.Annotorious = function () {
  /** @private **/
  this._isInitialized = false;

  /** @private **/
  this._modules = [new annotorious.mediatypes.image.ImageModule()];

  if (window['OpenLayers'])
    this._modules.push(new annotorious.mediatypes.openlayers.OpenLayersModule());

  if (window['OpenSeadragon'])
    this._modules.push(new annotorious.mediatypes.openseadragon.OpenSeadragonModule());

  /** @private **/
  this._plugins = [];

  var self = this;
  annotorious.dom.addOnLoadHandler(function () { self._init(); });
}

annotorious.Annotorious.prototype._init = function () {
  if (this._isInitialized)
    return;

  var self = this;
  goog.array.forEach(this._modules, function (module) {
    module.init();
  });

  goog.array.forEach(this._plugins, function (plugin) {
    if (plugin.initPlugin)
      plugin.initPlugin(self);

    goog.array.forEach(self._modules, function (module) {
      module.addPlugin(plugin);
    });
  });

  /**
   * Each time the window is resized, it reloads the annotations - for responsive images
   * The image must have the 'annotatable' class
   */
  goog.events.listen(window, goog.events.EventType.RESIZE, function (event) {
    self.reload();
  });

  this._isInitialized = true;
}

/**
 * Returns the module that is in charge of handling the item with the specified
 * URL or null, if no responsible module is found.
 * @param {string} item_src the URL of the annotatable item 
 * @return {Object | null}
 * @private
 */
annotorious.Annotorious.prototype._getModuleForItemSrc = function (item_src) {
  return goog.array.find(this._modules, function (module) {
    return module.annotatesItem(item_src);
  });
}

/**
 * 'Manually' actives the selector, bypassing the selection widget. Note: this also
 * works when the selection widget is hidden. Primary use case for this is for developers
 * who want to build their own selector widgets or 'Create Annotation' buttons.
 * The selector can be activated on a specific item or globally, on all items (which 
 * serves mainly as a shortcut for pages where there is only one annotatable item).
 * The function can take a callback function as parameter, which will be called when the
 * selector is deactivated again.
 * @param {string | Function} opt_item_url_or_callback the URL of the item, or a callback function
 * @param {Function} opt_callback a callback function (if the first parameter was a URL)
 */
annotorious.Annotorious.prototype.activateSelector = function (opt_item_url_or_callback, opt_callback) {
  var item_url = undefined,
    callback = undefined;

  if (goog.isString(opt_item_url_or_callback)) {
    item_url = opt_item_url_or_callback;
    callback = opt_callback;
  } else if (goog.isFunction(opt_item_url_or_callback)) {
    callback = opt_item_url_or_callback;
  }

  if (item_url) {
    var module = this._getModuleForItemSrc(item_url);
    if (module)
      module.activateSelector(item_url, callback);
  } else {
    goog.array.forEach(this._modules, function (module) {
      module.activateSelector(callback);
    });
  }
}

/**
 * Adds an annotation to an item on the page.
 * @param {annotorious.Annotation} annotation the annotation
 * @param {annotorious.Annotation} opt_replace optionally, an existing annotation to replace
 */
annotorious.Annotorious.prototype.addAnnotation = function (annotation, opt_replace) {
  if (!annotation.src) {
    console.error("Error: The src attribute is required for identification the image associated to annotation. See the documentation for more details.", annotation);
    return;
  }
  if (!annotation.shapes) {
    console.error("Error: The shapes attribute is required and must necessarily include the type and geometry field. See the documentation for more details.", annotation);
    return;
  }

  var newAnnotation = new annotorious.Annotation(
    annotorious.dom.toAbsoluteURL(annotation.src),
    annotation.text,
    annotation.shapes[0],
    annotation.created_at,
    annotation.textId,
    annotation.id
  );
  newAnnotation.editable = annotation.editable;
  newAnnotation.movable = annotation.movable;
  newAnnotation.rotable = annotation.rotable;
  var module = this._getModuleForItemSrc(newAnnotation.src);
  if (module)
    module.addAnnotation(newAnnotation, opt_replace);
}

/**
 * Adds more annotations to an item on the page.
 * @param {Array[annotorious.Annotation]} annotations the annotations
 */
annotorious.Annotorious.prototype.addAnnotations = function (annotations) {
  if (!Array.isArray(annotations) || !annotations.length) return;
  var self = this;
  annotations.forEach(function (annotation) {
    self.addAnnotation(annotation);
  });
}

/**
 * Adds an event handler to Annotorious.
 * @param {annotorious.events.EventType} type the event type
 * @param {Function} handler the handler function
 */
annotorious.Annotorious.prototype.addHandler = function (type, handler) {
  goog.array.forEach(this._modules, function (module) {
    module.addHandler(type, handler);
  });
}

/**
 * Removes an event handler to Annotorious.
 * @param {annotorious.events.EventType} type the event type
 * @param {Function} handler the handler function
 */
annotorious.Annotorious.prototype.removeHandler = function (type, handler) {
  goog.array.forEach(this._modules, function (module) {
    module.removeHandler(type, handler);
  });
}

/**
 * Adds a plugin to Annotorious.
 * @param {string} plugin_name the plugin name
 * @param {Object} opt_config_options an optional object literal with plugin config options
 */
annotorious.Annotorious.prototype.addPlugin = function (plugin_name, opt_config_options) {
  try {
    var plugin = new window['annotorious']['plugin'][plugin_name](opt_config_options);

    if (document.readyState == 'complete') {
      // Document loaded -- init immediately
      if (plugin.initPlugin)
        plugin.initPlugin(this);

      goog.array.forEach(this._modules, function (module) {
        module.addPlugin(plugin);
      });
    } else {
      // Document not loaded yet -- defer init
      this._plugins.push(plugin);
    }
  } catch (error) {
    console.log('Could not load plugin: ' + plugin_name);
  }
}

/**
 * Destroys annotation functionality on an item, or all items on the page. Note
 * that this method differs from anno.reset() in so far as class="annotatable"
 * attributes are not re-evaluated! What is destroyed, stays destroyed - until
 * made annotatable again via anno.makeAnnotatable().
 * @param {string=} opt_item_url the URL of the item on which to destroy annotation functionality
 */
annotorious.Annotorious.prototype.destroy = function (opt_item_url) {
  if (opt_item_url) {
    var module = this._getModuleForItemSrc(opt_item_url);
    if (module)
      module.destroy(opt_item_url);
  } else {
    goog.array.forEach(this._modules, function (module) {
      module.destroy();
    });
  }
}

/**
 * Returns the name of the selector that is currently activated on a 
 * particular item.
 * @param {string} item_url the URL of the item to query for the active selector
 */
annotorious.Annotorious.prototype.getActiveSelector = function (item_url) {
  var module = this._getModuleForItemSrc(item_url);
  if (module)
    return module.getActiveSelector(item_url);
  else
    return undefined;
}

/**
 * Returns all annotations on the annotatable item with the specified URL, or
 * all annotations on the page in case no URL is specified.
 * @param {string | undefined} opt_item_url an item URL (optional)
 * @return {Array.<annotorious.Annotation>} the annotations
 */
annotorious.Annotorious.prototype.getAnnotations = function (opt_item_url) {
  if (opt_item_url) {
    var module = this._getModuleForItemSrc(opt_item_url);
    if (module)
      return module.getAnnotations(opt_item_url);
    else
      return [];
  } else {
    var annotations = [];
    goog.array.forEach(this._modules, function (module) {
      goog.array.extend(annotations, module.getAnnotations());
    });
    return annotations;
  }
}

/**
 * Returns the list of available shape selectors for a particular item.
 * @param {string} item_url the URL of the item to query for available selectors
 * @returns {Array.<string>} the list of selector names
 */
annotorious.Annotorious.prototype.getAvailableSelectors = function (item_url) {
  var module = this._getModuleForItemSrc(item_url);
  if (module)
    return module.getAvailableSelectors(item_url);
  else
    return [];
}

/**
 * Hides existing annotations on all, or a specific item.
 * @param {string} opt_item_url the URL of the item
 */
annotorious.Annotorious.prototype.hideAnnotations = function (opt_item_url) {
  if (opt_item_url) {
    var module = this._getModuleForItemSrc(opt_item_url);
    if (module)
      module.hideAnnotations(opt_item_url);
  } else {
    goog.array.forEach(this._modules, function (module) {
      module.hideAnnotations();
    });
  }
}

/**
 * Hides the selection widget, thus preventing users from creating new annotations.
 * The selection widget can be hidden on a specific item or globally, on all annotatable
 * items on the page.
 * @param {string | undefined} opt_item_url the URL of the item on which to hide the selection widget
 */
annotorious.Annotorious.prototype.hideSelectionWidget = function (opt_item_url) {
  if (opt_item_url) {
    var module = this._getModuleForItemSrc(opt_item_url);
    if (module)
      module.hideSelectionWidget(opt_item_url);
  } else {
    goog.array.forEach(this._modules, function (module) {
      module.hideSelectionWidget();
    });
  }
}

annotorious.Annotorious.prototype.stopSelection = function (opt_item_url) {
  if (opt_item_url) {
    var module = this._getModuleForItemSrc(opt_item_url);
    if (module)
      module.stopSelection(opt_item_url);
  } else {
    goog.array.forEach(this._modules, function (module) {
      module.stopSelection();
    });
  }
}


/**
 * Highlights the specified annotation.
 * @param {annotorious.Annotation} annotation the annotation
 */
annotorious.Annotorious.prototype.highlightAnnotation = function (annotation) {
  if (annotation) {
    var module = this._getModuleForItemSrc(annotation.src);

    if (module)
      module.highlightAnnotation(annotation);
  } else {
    goog.array.forEach(this._modules, function (module) {
      module.highlightAnnotation();
    });
  }
}

/**
 * Makes an item annotatable, if there is a module that supports the item type.
 * @param {Object} item the annotatable item
 */
annotorious.Annotorious.prototype.makeAnnotatable = function (item) {
  // Be sure to init if the load handler hasn't already taken care of it
  this._init();

  var module = goog.array.find(this._modules, function (module) {
    return module.supports(item);
  });

  if (module)
    module.makeAnnotatable(item);
  else
    throw ('Error: Annotorious does not support this media type in the current version or build configuration.');
}

/**
 * Removes all annotations. If the optional parameter opt_item_url is set,
 * only the annotations on the specified item will be removed. Otherwise all
 * annotations on all items on the page will be removed.
 * @param {string} opt_item_url the src URL of the item
 */
annotorious.Annotorious.prototype.removeAll = function (opt_item_url) {
  // TODO this could be optimized a lot by adding a .removeAll method
  // to modules and annotators!
  var self = this;
  goog.array.forEach(this.getAnnotations(opt_item_url), function (annotation) {
    self.removeAnnotation(annotation);
  });
}

/**
 * Removes an annotation from an item on the page.
 * @param {annotorious.Annotation} annotation the annotation to remove
 */
annotorious.Annotorious.prototype.removeAnnotation = function (annotation) {
  var module = this._getModuleForItemSrc(annotation.src);
  if (module)
    module.removeAnnotation(annotation);
}

/**
 * Reload the annotations. Images with the 'annotatable'
 * CSS class will have been re-initialized (i.e. they will be annotatable, with
 * a fresh annotator).
 * @param {bool} removeProperties if true, reset the properties
 */
annotorious.Annotorious.prototype.reload = function (removeProperties) {
  goog.array.forEach(this._modules, function (module) {
    var annotations = module.getAnnotations();
    if (removeProperties) module.removeProperties();
    module.destroy();
    module.init();
    goog.array.forEach(annotations, function (annotation) {
      module.addAnnotation(annotation);
    });
  });
}

/**
 * Resets annotation functionality on this page. After the reset, annotation
 * functionality will be reomved from all items. Images with the 'annotatable'
 * CSS class will have been re-initialized (i.e. they will be annotatable, with
 * a fresh annotator).
 */
annotorious.Annotorious.prototype.reset = function (annotation) {
  goog.array.forEach(this._modules, function (module) {
    module.removeProperties();
    module.destroy();
    module.init();
  });
}

/**
 * Sets a specific selector on a particular item.
 * @param {string} item_url the URL of the item on which to set the selector
 * @param {string} selector the name of the selector to set on the item
 */
annotorious.Annotorious.prototype.setActiveSelector = function (item_url, selector) {
  var module = this._getModuleForItemSrc(item_url);
  if (module)
    module.setActiveSelector(item_url, selector);
}

/**
 * Sets system-wide properties. The 'props' object is a key/value hash and
 * supports the following properties: [show Readme.md]
 * 
 * @param {Object} props the properties object
 */
annotorious.Annotorious.prototype.setProperties = function (props) {
  goog.array.forEach(this._modules, function (module) {
    module.setProperties(props);
  });
}

/**
 * Ability to draw custom shape without make an annotation.The drawn pixels coordinate are returned when the mouse is released.
 * @param {boolean} enabled if true, enable the colorMode
 * @param {boolean} insideAnno if true, is possible draw only inside the annotations
 * @param {string} mode mode of save the drawn pixels 
 * @param {string} color color of pixels
 * @param {integer} strokeWidth stroke width of pixels [1-12]
 */
annotorious.Annotorious.prototype.setColorMode = function (enabled, insideAnno, mode, color, strokeWidth) {
  this.setProperties({
    "colorMode": {
      "enabled": enabled,
      "insideAnno": insideAnno,
      "mode": mode,
      "color": color,
      "strokeWidth": strokeWidth
    }
  });
}

/**
 * Enables (or disables) the ability to show the select editor
 * @param {boolean} enabled true to enable the select editor
 * @param {Array[Object]} options the options of select
 * @param {boolean} emptyOption true to enable the empty select option
 * @param {string} customLabel the custom first label if not use empty options
 */
annotorious.Annotorious.prototype.useSelectEditor = function (enabled, options, emptyOption, customLabel) {
  this.setProperties({
    "selectEditor": {
      "enabled": enabled,
      "options": options,
      "emptyOption": emptyOption,
      "customLabel": customLabel
    }
  });
}

/**
 * Enables (or disables) the ability to show the cursor axes
 * @param {boolean} enabled true to enable the cursors axes 
 * @param {boolean} dash true if draw dashed line
 * @param {string} color color of axes
 * @param {integer} strokeWidth stroke width of axes [1-12]
 */
annotorious.Annotorious.prototype.showCursorAxes = function (enabled, dash, color, strokeWidth) {
  this.setProperties({
    "cursorAxes": {
      "enabled": enabled,
      "dash": dash,
      "color": color,
      "strokeWidth": strokeWidth
    }
  });
}

/**
 * Enables (or disables) the ability to draw arrow shape
 * @param {boolean} enabled true to enable the arrow mode
 */
annotorious.Annotorious.prototype.setArrowMode = function (enabled) {
  this.setProperties({
    "arrowMode": enabled
  });
}

/**
 * Enables (or disables) the ability to use Fancy Box Selector
 * @param {boolean} enabled true to enable the Fancy Box Selector
 */
annotorious.Annotorious.prototype.useFancyBox = function (enabled) {
  this.setProperties({
    "fancyBox": enabled
  });
}

/**
 * Retrieves all annotations that intersect the centroid of an annotation
 * @param {annotorious.Annotation} annotation annotation from which to retrieve the centroid
 * @param {String} type filter by shape type
 * @return {Array.<annotorious.Annotation>} the annotations sorted by size, smallest first
 */
annotorious.Annotorious.prototype.getIntersectedAnnotations = function (annotation, type) {
  var module = this._getModuleForItemSrc(annotorious.dom.toAbsoluteURL(annotation.src));
  return (module) ? module.getIntersectedAnnotations(annotation, type) : [];
}

/**
 * Enables (or disables) the ability to create new annotations on an annotatable item.
 * @param {boolean} enabled if true, new annotations can be created
 *
 * !!!!
 * @deprecated will be removed in v1.0!
 * !!!!
 */
annotorious.Annotorious.prototype.setSelectionEnabled = function (enabled) {
  if (enabled)
    this.showSelectionWidget(undefined);
  else
    this.hideSelectionWidget(undefined);
}

/**
 * Shows existing annotations on all, or a specific item.
 * @param {string} opt_item_url the URL of the item
 */
annotorious.Annotorious.prototype.showAnnotations = function (opt_item_url) {
  if (opt_item_url) {
    var module = this._getModuleForItemSrc(opt_item_url);
    if (module)
      module.showAnnotations(opt_item_url);
  } else {
    goog.array.forEach(this._modules, function (module) {
      module.showAnnotations();
    });
  }
}

/**
 * Shows the selection widget, thus enabling users to create new annotations.
 * The selection widget can be made visible on a specific item or globally, on all
 * annotatable items on the page.
 * @param {string | undefined} opt_item_url the URL of the item on which to show the selection widget 
 */
annotorious.Annotorious.prototype.showSelectionWidget = function (opt_item_url) {
  if (opt_item_url) {
    var module = this._getModuleForItemSrc(opt_item_url);
    if (module)
      module.showSelectionWidget(opt_item_url);
  } else {
    goog.array.forEach(this._modules, function (module) {
      module.showSelectionWidget();
    });
  }
}

window['anno'] = new annotorious.Annotorious();
