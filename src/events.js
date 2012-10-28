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
  MOUSE_OVER_ANNOTATABLE_MEDIA: goog.events.getUniqueId('mouse_over_media'),

  /**
   * The mouse moved out of the annotatable media area
   */
  MOUSE_OUT_OF_ANNOTATABLE_MEDIA: goog.events.getUniqueId('mouse_out_of_media'),

  /** 
   * The mouse entered an annotation
   */ 
  MOUSE_OVER_ANNOTATION: goog.events.getUniqueId('mouse_over_annotation'),

  /** 
   * The mouse moved out of an annotation
   */ 
  MOUSE_OUT_OF_ANNOTATION: goog.events.getUniqueId('mouse_out_of_annotation'),

  /**
   * A new selection was started
   */
  SELECTION_STARTED: goog.events.getUniqueId('selection_started'),
  
  /**
   * The current selection was canceled
   */
  SELECTION_CANCELED: goog.events.getUniqueId('selection_canceled'),
  
  /** 
   * The current selection was completed
   */
  SELECTION_COMPLETED: goog.events.getUniqueId('selection_completed'),
  
  /** 
   * The current selection was changed
   */
  SELECTION_CHANGED: goog.events.getUniqueId('selection_changed'),

  /**
   * The annotation popup widget was hidden
   */
  BEFORE_POPUP_HIDE: goog.events.getUniqueId('before_popup_hide'),

  /**
   * The 'delete annotation' button was pressed in the popup
   */
  POPUP_BTN_DELETE: goog.events.getUniqueId('popup_btn_delete'),

  /**
   * The 'edit annotation' button was pressed in the popup
   */
  POPUP_BTN_EDIT: goog.events.getUniqueId('popup_btn_edit'),

  /**
   * An annotation was removed
   */
  ANNOTATION_REMOVED: goog.events.getUniqueId('annotation_removed'),
  
  /**
   * An annotation is in edit mode - the edit form is open
   */
  // ANNOTATION_EDIT: goog.events.getUniqueId('annotation_edit'),

  /**
   * Annotation editing was canceled
   */
  ANNOTATION_EDIT_CANCEL: goog.events.getUniqueId('annotation_edit_cancel'),

  /**
   * Annotation editing was completed - annotation saved
   */
  ANNOTATION_EDIT_SAVE: goog.events.getUniqueId('annotation_edit_save')

};
