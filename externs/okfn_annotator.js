/**
 * Externs definition for the OKFN Annotator class.
 */
var Annotator = {
  /** Publish an event **/
  publish : function(type, event) {},
    
  /** Subscribe to an event **/
  subscribe : function(type, handler) {},
    
  /** Show the viewer popup **/
  showViewer : function(annotation, position) {},

  /** Start the viewer hide timer **/
  startViewerHideTimer : function() {},
    
  /** Clear/stop the viewer hide timer **/
  clearViewerHideTimer : function() {},

  /** Viewer object **/   
  viewer : {
    element : {},
    load : function(annotations) {}
  },
  
  /** Show the editor widget **/  
  showEditor : function(annotation, position) {},
  
  /** Editor object **/  
  editor : {
    element : {},
    show : function() {}
  }
}

