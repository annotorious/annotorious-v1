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
  *
  * To get screen coordinates while taking into consideration mobile and the offset of the screen
  * @param event, the DOM Event object
  * @param the parent element that triggers the event
  */
annotorious.events.sanitizeCoordinates = function(event, parent) {
  var points = false;
  var offset = annotorious.dom.getOffset;
  
  if (!event.offsetX || !event.offsetY && event.event_.changedTouches) {
    points = {
      x: event.event_.changedTouches[0].pageX - offset(parent).left,
      y: event.event_.changedTouches[0].pageY - offset(parent).top
    };
  } else {
    points = {
      x: event.offsetX,
      y: event.offsetY
    };
  }
  
  return points;
};

/**
  *
  * To create native DOM events
  * @param options, the options of the event the type of event triggered.
  */
annotorious.events.dispatch = function(options) {
  var event, eventName = options.name;
  type = options.type || "HTMLEvents";
  event = document.createEvent("HTMLEvents");
  event.initEvent(eventName);
  event.data = options.data || {};
  options.element.dispatchEvent(event);
};

/**
 * Adds an event handler.
 * @param {annotorious.events.EventType} type the event type
 * @param {function} handler the handler function to add
 */
annotorious.events.EventBroker.prototype.addHandler = function(type, handler) {
  if (!this._handlers[type]) 
    this._handlers[type] = [];

  this._handlers[type].push(handler);  
}

/**
 * Removes an event handler.
 * @param {annotorious.events.EventType} type the event type
 * @param {function} handler the handler function to remove
 */
annotorious.events.EventBroker.prototype.removeHandler = function(type, handler) {
  var handlers = this._handlers[type];
  if (handlers)
    goog.array.remove(handlers, handler);  
}

/**
 * Fires an event, triggering execution of all registered handlers.
 * Event handlers may optionally return a boolean value to indicate whether
 * further steps following the event should be canceled (e.g. in case of 
 * annotation removal). If there is no return value (or the return value is
 * 'true'), no action will be taken by Annotorious. 
 * @param {annotorious.events.EventType} type the event type
 * @param {object} event the event object
 * @return {boolean} the 'cancel event' flag
 */
annotorious.events.EventBroker.prototype.fireEvent = function(type, event) {
  var cancelEvent = false;

  var handlers = this._handlers[type];
  if (handlers) {
    goog.array.forEach(handlers, function(handler, idx, array) {
      var retVal = handler(event);
      if (goog.isDef(retVal) && !retVal)
        cancelEvent = true;
    });
  }    

  return cancelEvent;
}

/**
 * Annotation lifecycle events.
 * @enum {string}
 */
annotorious.events.EventType = {

  /**
   * The mouse entered the annotatable media area
   */
  MOUSE_OVER_ANNOTATABLE_ITEM: 'onMouseOverItem',

  /**
   * The mouse moved out of the annotatable media area
   */
  MOUSE_OUT_OF_ANNOTATABLE_ITEM: 'onMouseOutOfItem',

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
   * The annotation popup widget is about to hide
   */
  BEFORE_POPUP_HIDE: 'beforePopupHide',

  /**
   * The annotation is about to be removed
   */
  BEFORE_ANNOTATION_REMOVED: 'beforeAnnotationRemoved',

  /**
   * An annotation was removed
   */
  ANNOTATION_REMOVED: 'onAnnotationRemoved',

  /**
   * An annotation was created
   */
  ANNOTATION_CREATED: 'onAnnotationCreated',
  
  /**
   * An existing annotation was updated
   */
  ANNOTATION_UPDATED: 'onAnnotationUpdated'

};
