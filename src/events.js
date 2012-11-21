goog.provide('annotorious.events');

goog.require('goog.array');
goog.require('goog.events');

/**
 * A central 'event bus' to distribute the annotation lifecycle events.
 * @constructor
 */
annotorious.events.EventBroker = function() {
  /** @private **/
  this._handlers = [];
}

/**
 * Adds an event handler.
 * @param {annotorious.events.EventType} type the event type
 * @param {function} the handler function to add
 */
annotorious.events.EventBroker.prototype.addHandler = function(type, handler) {
  if (!this._handlers[type]) 
    this._handlers[type] = [];

  this._handlers[type].push(handler);  
}

/**
 * Removes an event handler.
 * @param {annotorious.events.EventType} type the event type
 * @param {function} the handler function to remove
 */
annotorious.events.EventBroker.prototype.removeHandler = function(type, handler) {
  var handlers = this._handlers[type];
  if (handlers)
    goog.array.remove(handlers, handler);  
}

/**
 * Fires an event, triggering execution of all registered handlers.
 * @param {annotorious.events.EventType} type the event type
 * @param {object} the event object
 */
annotorious.events.EventBroker.prototype.fireEvent = function(type, event) {
  var handlers = this._handlers[type];
  if (handlers) {
    goog.array.forEach(handlers, function(handler, idx, array) {
      handler(event);
    });
  }    
}

/**
 * Annotation lifecycle events
 * @enum {string}
 */
annotorious.events.EventType = {

  /**
   * The mouse entered the annotatable media area
   */
  MOUSE_OVER_ANNOTATABLE_MEDIA: 'onMouseOverMedia',

  /**
   * The mouse moved out of the annotatable media area
   */
  MOUSE_OUT_OF_ANNOTATABLE_MEDIA: 'onMouseOutOfMedia',

  /** 
   * The mouse entered an annotation
   */ 
  MOUSE_OVER_ANNOTATION: 'onMouseOverAnnotation',

  /** 
   * The mouse moved out of an annotation
   */ 
  MOUSE_OUT_OF_ANNOTATION: 'onMouseOutOfAnnotation',

  /**
   * A new selection was started
   */
  SELECTION_STARTED: 'onSelectionStarted',
  
  /**
   * The current selection was canceled
   */
  SELECTION_CANCELED: 'onSelectionCanceled',
  
  /** 
   * The current selection was completed
   */
  SELECTION_COMPLETED: 'onSelectionCompleted',
  
  /** 
   * The current selection was changed
   */
  SELECTION_CHANGED: 'onSelectionChanged',

  /**
   * The annotation popup widget was hidden
   */
  BEFORE_POPUP_HIDE: 'beforePopupHide',

  /**
   * An annotation was removed
   */
  ANNOTATION_REMOVED: 'onAnnotationRemoved',

  /**
   * Annotation editing was completed - annotation saved
   */
  ANNOTATION_CREATED: 'onAnnotationCreated'

};
