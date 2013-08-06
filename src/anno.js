goog.require('annotorious.Annotorious');

/** API exports **/
window['anno'] = new annotorious.Annotorious();
annotorious.Annotorious.prototype['activateSelector'] = annotorious.Annotorious.prototype.activateSelector;
annotorious.Annotorious.prototype['addAnnotation'] = annotorious.Annotorious.prototype.addAnnotation;
annotorious.Annotorious.prototype['addHandler'] = annotorious.Annotorious.prototype.addHandler;
annotorious.Annotorious.prototype['addPlugin'] = annotorious.Annotorious.prototype.addPlugin;
annotorious.Annotorious.prototype['getActiveSelector'] = annotorious.Annotorious.prototype.getActiveSelector;
annotorious.Annotorious.prototype['getAnnotations'] = annotorious.Annotorious.prototype.getAnnotations;
annotorious.Annotorious.prototype['getAvailableSelectors'] = annotorious.Annotorious.prototype.getAvailableSelectors;
annotorious.Annotorious.prototype['hideAnnotations'] = annotorious.Annotorious.prototype.hideAnnotations;
annotorious.Annotorious.prototype['hideSelectionWidget'] = annotorious.Annotorious.prototype.hideSelectionWidget;
annotorious.Annotorious.prototype['highlightAnnotation'] = annotorious.Annotorious.prototype.highlightAnnotation;
annotorious.Annotorious.prototype['makeAnnotatable'] = annotorious.Annotorious.prototype.makeAnnotatable;
annotorious.Annotorious.prototype['removeAll'] = annotorious.Annotorious.prototype.removeAll;
annotorious.Annotorious.prototype['removeAnnotation'] = annotorious.Annotorious.prototype.removeAnnotation;
annotorious.Annotorious.prototype['reset'] = annotorious.Annotorious.prototype.reset;
annotorious.Annotorious.prototype['setActiveSelector'] = annotorious.Annotorious.prototype.setActiveSelector;
annotorious.Annotorious.prototype['showAnnotations'] = annotorious.Annotorious.prototype.showAnnotations;
annotorious.Annotorious.prototype['showSelectionWidget'] = annotorious.Annotorious.prototype.showSelectionWidget;

/** !!! TEMPORARY **/
annotorious.Annotorious.prototype['addSelector'] = annotorious.Annotorious.prototype.addSelector;

/** @deprecated **/
annotorious.Annotorious.prototype['setSelectionEnabled'] = annotorious.Annotorious.prototype.setSelectionEnabled;