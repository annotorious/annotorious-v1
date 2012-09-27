goog.provide('yuma.storage');

/**
 * A storage connector to the good old Yuma4j storage server.
 *
 * TODO do we need a common yuma.modules.Module base class?
 * 
 * @param {yuma.modules.image.ImageModule} module the module
 * @constructor
 */
yuma.storage.YumaStorage = function(module) {
  module.addHandler(yuma.events.EventType.ANNOTATION_EDIT_SAVE, function(event) {
    // TODO upload to storage
    console.log('Storing!');
    
    // TODO error handling - we should remove the annotation from the annotator/viewer.
    // In order to do this, we'll need a reference to the annotator in the event (which
    // is not a problem...)
  }); 
}

/**
 * TODO make OKFN the default storage (eventually...)
 *
 * @constructor
 */
yuma.storage.OKFNStorage = function() {
    // TODO implement
}