goog.provide('yuma.events');

goog.require('goog.array');
goog.require('goog.events');

/**
 * A central, singleton 'event bus' to distribute the 'macroscopic' Yuma events. 
 * @constructor
 */
yuma.events.EventBroker = function() {
  /** @private **/
  this._handlers = [];
}
goog.addSingletonGetter(yuma.events.EventBroker);


/**
 * Registers an EventTarget with the EventBroker. NOTE: according to Google
 * Closure convention, an EventTarget is a *source* of events!
 * @param {goog.events.EventTarget} target the event target 
 * @param {Array.<yuma.events.EventType>} types the event types to listen for 
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


/**
 * Adds an event listener.
 * @param {yuma.events.EventType} type the event type to listen to
 * @param {function(Object)} handler the handler function
 */
yuma.events.EventBroker.prototype.addHandler = function(type, handler) {
  if (!this._handlers[type]) 
    this._handlers[type] = [];

  this._handlers[type].push(handler);
}


/**
 * Removes a listener.
 * @param {yuma.events.EventType} type the event type
 * @param {function(Object)} handler the handler function
 */
yuma.events.EventBroker.prototype.removeHandler = function(type, handler) {
  var handlers = this._handlers[type];
  if (handlers)
    goog.array.remove(handlers, handler);
}


/**
 * The 'macroscopic' events used in the annotation lifecycle
 * @enum {string}
 */
yuma.events.EventType = {

  /**
   * A new selection was started.
   */
  SELECTION_STARTED: goog.events.getUniqueId('selection_started'),
  
  /** 
   * The current selection was completed.
   */
  SELECTION_COMPLETED: goog.events.getUniqueId('selection_completed'),
  
  /** 
   * The current selection was changed. 
   */
  SELECTION_CHANGED: goog.events.getUniqueId('selection_changed'),

  /** 
   * The mouse entered an annotation.
   */ 
  MOUSE_OVER_ANNOTATION: goog.events.getUniqueId('mouse_over_annotation'),

  /** 
   * The mouse moved out of an annotation shape.
   */ 
  MOUSE_OUT_OF_ANNOTATION: goog.events.getUniqueId('mouse_out_of_annotation'),

  /**
   * The mouse entered the annotatable media
   */
  MOUSE_OVER_ANNOTATABLE_MEDIA: goog.events.getUniqueId('mouse_over_media'),

  /**
   * The mouse moved out of the annotatable media
   */
  MOUSE_OUT_OF_ANNOTATABLE_MEDIA: goog.events.getUniqueId('mouse_out_of_media')

};
