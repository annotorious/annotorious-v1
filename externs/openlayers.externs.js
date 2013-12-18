/**
 * OpenLayers externs definition.
 */
var OpenLayers = {
    
  /**
   * Bounds class
   * @constructor
   */
  Bounds: function(left, bottom, right, top) {},
    
  /** Layer namespace **/
  Layer : {
    
    /** Boxes layer type **/
    Boxes : {  
      addMarker : function() {},
      removeMarker : function() {},
      destroy : function() {}
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
    events : {
      register : function() {}
    },
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
  
  /**
   * Pixel class
   * @constructor
   */
  Pixel: function(x ,y) {}
  
}
