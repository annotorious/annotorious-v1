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

