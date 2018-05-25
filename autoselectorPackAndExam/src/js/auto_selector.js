/**
 * Plugin wrapper.
 * @param {Object} config_opts configuration options
 * @constructor
 */
annotorious.plugin.autoSelector = function(config_opts) { 
  if (config_opts)
    this._activate = config_opts.activate;
}

/**
 * Attach a new selector onInitAnnotator.
 */
annotorious.plugin.autoSelector.prototype.onInitAnnotator = function(annotator) {
  annotator.addSelector(new annotorious.plugin.autoSelector.Selector());
  if (this._activate)
    annotator.setCurrentSelector('rect');
}

/**
 * A autosel selector.
 * @constructor
 */
annotorious.plugin.autoSelector.Selector = function() { }

annotorious.plugin.autoSelector.Selector.prototype.init = function(annotator, canvas) {
  /** @private **/
  this._annotator = annotator;
  //console.log(annotator);

  /** @private **/
  this._canvas = canvas;  
  //console.log("canvas", canvas);

  /** @private **/
  this._g2d = canvas.getContext('2d');
  
  /** @private **/
  this._anchor;
  
  /** @private **/
  this._points = [];

  /** @private **/
  this._mouse;

  /** @private **/
  this._enabled = false;

  /** @private **/
  this._drawLocking = false;

  /** @private **/
  this._mouseUpListener;
  this._mouseDownListner;

  /** @private **/
  this._opposite;
}

/*
 * attach Handler.
 */
annotorious.plugin.autoSelector.Selector.prototype._attachListeners = function() {
  var self = this; 

  /* mouse dragging listener */
  var moveCount = 0;
  this._mouseMoveListener = function(event) {
  self._g2d.lineWidth = 2;
    
    moveCount += 1;
    //console.log("getMoveCount",moveCount);
    if (self._enabled && moveCount > 5) {
      self._drawLocking = true; // custom draw Lock.

      self._opposite = (event.offsetX == undefined) ? 
        { x: event.layerX, y: event.layerY } : 
        { x: event.offsetX, y: event.offsetY };
      console.log("getOpposite", self._opposite);
      self._g2d.clearRect(0, 0, self._canvas.width, self._canvas.height);
      
      var top, left, bottom, right;
      if (self._opposite.y > self._anchor.y) {
        top = self._anchor.y;
        bottom = self._opposite.y;
      } else {
        top = self._opposite.y;    
        bottom = self._anchor.y;
      }
      
      if (self._opposite.x > self._anchor.x) {
        right = self._opposite.x;
        left = self._anchor.x;
      } else {
        right = self._anchor.x;   
        left = self._opposite.x;     
      }
      var width = right - left;
      var height = bottom - top;
      self._g2d.strokeStyle = '#ffffff';
      self._g2d.strokeRect(left + 0.5, top + 0.5, width, height);
    }
  };
  this._canvas.addEventListener('mousemove', this._mouseMoveListener);

  /* push up linsten */
  this._mouseUpListener = function(event){
    var shape = self.getShape();
    
      if(shape){
        console.log("moveCount", moveCount);
        if(moveCount < 2){
          self.drawRect(self._anchor.x, self._anchor.y);
        }
        self._enabled = false;
        try{
          self._annotator.fireEvent("onSelectionCompleted", 
          {mouseEvent:event, shape:shape, viewportBounds: self.getViewportBounds()});
          console.log("mission completed");
          console.log(shape);
          console.log(self.getViewportBounds());
        } catch(err){
          console.log("fireEvent Error",err);
        }
      } else {
        self._annotator.fireEvent("onSelectionCanceled");
      }
      self._drawLocking = false;
  };
  this._canvas.addEventListener('mouseup', this._mouseUpListener);

}


/*
 * detach Handler.
 */
annotorious.plugin.autoSelector.Selector.prototype._detachListeners = function() {
  var self = this;
  if (this._mouseMoveListener) {
     this._canvas.removeEventListener("mousemove", self._mouseMoveListener);
  }
  if (this._mouseUpListener) {
     this._canvas.removeEventListener("mouseup", self._mouseUpListener);
  }
}

annotorious.plugin.autoSelector.Selector.prototype.getName = function() {
  return 'rect';
}


/*
 * become view for area that is selection sample.
 */
annotorious.plugin.autoSelector.Selector.prototype.drawRect = function (click_x, click_y) {
  if (this._drawLocking == false) {
    this._g2d.strokeStyle = "#35E5F1"; // 청색
    this._g2d.lineWidth = 2;

    var x = click_x - 32;
    var y = click_y - 32;
    var w = 64;
    var h = 64;

    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    this._g2d.strokeRect(x, y, w, h);
  }
}

annotorious.plugin.autoSelector.Selector.prototype.clearRect = function(){
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
}

annotorious.plugin.autoSelector.Selector.prototype.getSupportedShapeType = function() {
  return 'rect';
}

annotorious.plugin.autoSelector.Selector.prototype.startSelection = function(x, y) {
  console.log("start autoSelect!!");
  this._enabled = true;
  this._opposite = {x : 0,
                    y : 0}; // 초기화
  this._anchor = { x : x,
                   y : y};
  this._attachListeners();
}

annotorious.plugin.autoSelector.Selector.prototype.stopSelection = function() {
  var self = this;
  self.clearRect();
  delete this._anchor;
  delete this._opposite;
}

/*
 * get gemoetry for drawing tagbox
*/
annotorious.plugin.autoSelector.Selector.prototype.getShape = function() {
  console.log("get Opposite: ", this._opposite);
  
  // if overfited (x or y) than (width or height), do checked below
  var x = (this._anchor.x - 32) / this._canvas.width;
  if(x < 0){
    x = 0;
  }
  else if ( x + (64/this._canvas.width) > 1 ){
    x = 1 - (64/this._canvas.width);
  } 
  var y = (this._anchor.y - 32 )/ this._canvas.height;
  if(y < 0){
    y = 0;
  }
  else if ( y + (64/this._canvas.height) > 1 ){
    y = 1 - (64 / this._canvas.height);
  }

  var autoRect = { x: x, 
                   y: y, 
                   width: 64 / this._canvas.width, 
                   height: 64 / this._canvas.height};

  if (this._opposite && this._opposite.x + this._opposite.y > 0 &&
    (Math.abs(this._opposite.x - this._anchor.x) > 3) &&
    (Math.abs(this._opposite.y - this._anchor.y) > 3)) {
    console.log("changed drag points")
    var viewportBounds = this.getViewportBounds();
    var item_anchor = this._annotator.toItemCoordinates({ x: viewportBounds.left, y: viewportBounds.top });
    var item_opposite = this._annotator.toItemCoordinates({ x: viewportBounds.right - 1, y: viewportBounds.bottom - 1 });

    console.log("Drag Event");
    return { type: 'rect', geometry: { x: item_anchor.x, y: item_anchor.y, width: item_opposite.x - item_anchor.x, height: item_opposite.y - item_anchor.y } };
  } else {
    console.log("Click Event");
    return { type: 'rect', geometry: { x: autoRect.x, y: autoRect.y, width: autoRect.width, height: autoRect.height } };
  }


}


annotorious.plugin.autoSelector.Selector.prototype.getViewportBounds = function() {

/** set Veiwport location 
    1) set Tagging tool
    2) get tag box size.
**/

  var right = (this._anchor.x - 32); /// this._canvas.width;
  var left = (this._anchor.x + 32); // / this._canvas.width;
  var top = (this._anchor.y + 32); // / this._canvas.height;
  var bottom = (this._anchor.y - 32); // / this._canvas.height;


  if(right < 0){
    right = 0;
  }

  if(bottom < 0){
    bottom = 0;
  }

 
  var autoRect = { top: top, right: right, bottom: bottom, left: left};
  
  /** dragging event **/
  if (this._opposite.x + this._opposite.y > 0) {
    if (this._opposite.x > this._anchor.x) {
      right = this._opposite.x;
      left = this._anchor.x;
    } else {
      right = this._anchor.x;
      left = this._opposite.x;
    }

    var top, bottom;
    if (this._opposite.y > this._anchor.y) {
      top = this._anchor.y;
      bottom = this._opposite.y;
    } else {
      top = this._opposite.y;
      bottom = this._anchor.y;
    }

    return { top: top, right: right, bottom: bottom, left: left };
  } else {
    return autoRect;
  }
}

/*
annotorious.plugin.autoSelector.Selector.prototype.drawShape = function(g2d, shape, highlight) {
  console.log("DrawShape!!!");

  if (shape.type == 'rect') {
    var color, lineWidth;
    if (highlight) {
      color = '#fff000';
      lineWidth = 1.2;
    } else {
      color = '#ffffff';
      lineWidth = 1;
    }

    var geom = shape.geometry;
    g2d.strokeStyle = '#000000';
    g2d.lineWidth = lineWidth;
    g2d.strokeRect(geom.x + 0.5, geom.y + 0.5, geom.width + 1, geom.height + 1);
    g2d.strokeStyle = color;
    g2d.strokeRect(geom.x + 1.5, geom.y + 1.5, geom.width - 1, geom.height - 1);
  }
}
*/
