/**
 * OpenLayers externs definition.
 */
var OpenLayers = {
    
  /** Bounds class **/
  Bounds: function(left, bottom, right, top) {},
    
  /** Layer namespace **/
  Layer : {
    
    /** Boxes layer type **/
    Boxes : {  
      addMarker : function() {},
      removeMarker : function() {}
    }
  },
    
  /** LonLat class **/
  LonLat : {
    lon : {},
    lat : {}
  },
  
  /** Map class **/
  Map : {
    div : {},
    addLayer : function(layer) {},
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
