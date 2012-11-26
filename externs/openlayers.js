/**
 * OpenLayers externs definition.
 */
var OpenLayers = {
    
  /** Bounds class **/
  Bounds: function() {},
    
  /** Layer namespace **/
  Layer : {
    
    /** Boxes layer type **/
    Boxes : {  
      addMarker : function() {},
      removeMarker : function() {}
    }
  },
    
  /** Map class **/
  Map : {
    div : {},
    addLayer : function() {},
    getViewPortPxFromLonLat : function() {},
    getLonLatFromPixel : function() {}
  },
  
  /** Marker namespace **/
  Marker : {
    
    /** Box marker type **/
    Box : {
      div : {}
    }  
  },
  
  /** Pixel class **/
  Pixel: function(x ,y) {}
  
}
