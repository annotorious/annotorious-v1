goog.provide('yuma.events');

goog.require('goog.events');

/**
 * @constructor
 */
yuma.events.EventBroker = function() {
  /** @private **/
  this._handlers = [];
}
goog.addSingletonGetter(yuma.events.EventBroker);

/*
yuma.events.EventBroker.prototype.fireEvent = function(type, event) {
  var handlers = this._handlers[type];
  if (handlers) {
    goog.array.forEach(handlers, function(handler, idx, array) {
      handler(event);
    });
  }  
}
*/

yuma.events.EventBroker.prototype.registerEventTarget = function(target, types) {
  self = this;
  goog.array.forEach(types, function(type, idx, array) {    
    goog.events.listen(target, type, function(event) {
      var handlers = self._handlers[type];
      if (handlers) {
        goog.array.forEach(handlers, function(handler, idx, array) {
          handler(event);
        });
      }  
    });
  });
}

yuma.events.EventBroker.prototype.subscribe = function(type, handler) {
  if (!this._handlers[type]) 
    this._handlers[type] = [];

  this._handlers[type].push(handler);
}

yuma.events.EventBroker.prototype.unsubscribe = function(type, handler) {
  var handlers = this._handlers[type];
  if (handlers)
    goog.array.remove(handlers, handler);
}

/**
 * @enum {string}
 */
yuma.events.EventType = {
  
  SELECTION_CREATED: goog.events.getUniqueId('selection_created'),
  
  SELECTION_CHANGED: goog.events.getUniqueId('selection_changed'),

  ANNOTATION_MOUSE_ENTER: goog.events.getUniqueId('annotation_mouse_enter'),

  ANNOTATION_MOUSE_LEAVE: goog.events.getUniqueId('annotation_mouse_leave'),

  ANNOTATION_AREA_MOUSE_ENTER: goog.events.getUniqueId('annotation_area_mouse_enter'),

  ANNOTATION_AREA_MOUSE_LEAVE: goog.events.getUniqueId('annotation_area_mouse_leave')

};
