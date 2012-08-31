goog.provide('yuma.selection.events');

goog.require('goog.events');

/**
 * @enum {string}
 */
yuma.selection.events.EventType = {
  
  SELECTION_CREATED: goog.events.getUniqueId('selection_created'),
  
  ANNOTATION_MOUSE_ENTER: goog.events.getUniqueId('annotation_mouse_enter'),

  ANNOTATION_MOUSE_LEAVE: goog.events.getUniqueId('annotation_mouse_leave')

};

