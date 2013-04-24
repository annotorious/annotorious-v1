/**
 * An 'abstract' (forgive my Java speak) module base class
 * @constructor
 */
annotorious.modules.Module = function() {  
  /** @private **/
  this._annotators = new goog.structs.Map();
  
  /** @private **/
  this._eventHandlers = [];

  /** @private **/
  this._plugins = [];
  
  /** @private **/
  this._allItems = [];
  
  /** @private **/
  this._itemsToLoad = [];
  
  /** @private **/
  this._bufferedForAdding = [];
  
  /** @private **/
  this._bufferedForRemoval = [];

  /** @private **/
  this._isSelectionEnabled = true;
}

/**
 * Standard module method: adds an annotation.
 * @param {Annotation} the annotation
 * @param {Annotation} opt_replace optionally, an existing annotation to replace
 */
annotorious.modules.Module.prototype.addAnnotation = function(annotation, opt_replace) {
  if (this.annotatesItem(annotation.src)) {
    var annotator = this._annotators.get(annotation.src);
    if (annotator) {
      annotator.addAnnotation(annotation, opt_replace)
    } else {
      this._bufferedForAdding.push(annotation);
      if (opt_replace)
        goog.array.remove(this._bufferedForAdding, opt_replace);
    }
  }
}

/**
 * Standard module method: tests if this module is in charge of managing the
 * annotatable item with the specified URL.
 * @param {string} item_url the URL of the item
 * @return {boolean} true if this module is in charge of the media
 */ 
annotorious.modules.Module.prototype.annotatesItem = function(item_url) {
  if (this._annotators.containsKey(item_url)) {
    return true;
  } else {
    var self = this;
    var item = goog.array.find(this._itemsToLoad, function(item) {
      return self.getItemURL(item) == item_url;
    });
    
    return goog.isDefAndNotNull(item);
  }
}

/**
 * Standard module method: returns all annotations on the annotatable media with the specified
 * URL, or all annotations from this module in case no URL is specified.
 * @param {string | undefined} opt_media_url a media URL (optional)
 * @return {Array.<Annotation>} the annotations
 */
annotorious.modules.Module.prototype.getAnnotations = function(opt_item_url) {
  if (opt_item_url) {
    var annotator = this._annotators.get(opt_item_url);
    if (annotator) {
      return annotator.getAnnotations();
    } else {
      return goog.array.filter(this._bufferedForAdding, function(annotation) {
        return annotation.src == opt_item_url;
      });
    }
  } else {
    var annotations = [];
    goog.array.forEach(this._annotators.getValues(), function(annotator) {
      goog.array.extend(annotations, annotator.getAnnotations());
    });
    goog.array.extend(annotations, this._bufferedForAdding);
    return annotations;
  }
}

/**
 * Returns the list of available shape selectors for a particular item.
 * @param {string} the URL of the item to query for available selectors
 * @returns {List.<string>} the list of selector names
 */
annotorious.modules.Module.prototype.getAvailableSelectors = function(item_url) {
  if (this.annotatesItem(item_url)) {
    var annotator = this._annotators.get(item_url);
    if (annotator) {
      return goog.array.map(annotator.getAvailableSelectors(), function(selector) {
        return selector.getName();
      });
    }
  }
}

/**
 * Standard module method: highlights the specified annotation.
 * @param {Annotation} annotation the annotation
 */
annotorious.modules.Module.prototype.highlightAnnotation = function(annotation) {
  if (annotation) {
    if (this.annotatesItem(annotation.src)) {
      var annotator = this._annotators.get(annotation.src);
      if (annotator)
        annotator.highlightAnnotation(annotation);
    }  
  } else {
    goog.array.forEach(this._annotators.getValues(), function(annotator) {
      annotator.highlightAnnotation();
    });
  }
}

/**
 * Standard module method: Makes an item annotatable, if it is supported by this module.
 * @param {object} item the annotatable item
 */
annotorious.modules.Module.prototype.makeAnnotatable = function(item) {
  if (this.supports(item)) {
    this._allItems.push(item);
    this._initAnnotator(item);
  }
}

/**
 * Standard module method: removes an annotation from the item with the specified src URL.
 * @param {Annotation} annotation the annotation
 */
annotorious.modules.Module.prototype.removeAnnotation = function(annotation) {
  if (this.annotatesItem(annotation.src)) {
    var annotator = this._annotators.get(annotation.src);
    if (annotator)
      annotator.removeAnnotation(annotation);
    else
      this._bufferedForRemoval.push(annotation);
  }
}

/**
 * Standard module method: sets a specific selector on a particular item.
 * @param {string} the URL of the item on which to set the selector
 * @param {string} the name of the selector to set on the item
 */
annotorious.modules.Module.prototype.setActiveSelector = function(item_url, selector) {
  if (this.annotatesItem(item_url)) {
    var annotator = this._annotators.get(item_url);
    if (annotator)
      annotator.setActiveSelector(selector);
  }
}

/**
 * Standard module method: enables (or disables) the ability to create new annotations
 * on an annotatable item.
 * @param {boolean} enabled if <code>true</code> new annotations can be created
 */
annotorious.modules.Module.prototype.setSelectionEnabled = function(enabled) {
  this._isSelectionEnabled = enabled;
  goog.array.forEach(this._annotators.getValues(), function(annotator) {
    annotator.setSelectionEnabled(enabled);
  });
}

/**
 * Standard module method: tests if this module is able to support annotation on the
 * specified item.
 * @param {object} item the item to test
 * @return {boolean} true if this module can provide annotation functionality for the item
 * @interface
 */
annotorious.modules.Module.prototype.supports = goog.abstractMethod // This should be the proper Closure way to do it


