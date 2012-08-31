goog.provide('yuma.selection.events');

goog.require('goog.events');

/**
 * @enum {string}
 */
yuma.selection.events.EventType = {
  SELECT: goog.events.getUniqueId('new_annotation_selection')
};
