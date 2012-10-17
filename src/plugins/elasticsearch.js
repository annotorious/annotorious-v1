goog.provide('yuma.storage');

goog.require('goog.array');
goog.require('goog.json');
goog.require('goog.net.XhrIo');

/**
 * A simple storage connector to the ElasticSearch REST interface.
 *
 * TODO do we need a common yuma.modules.Module base class?
 * 
 * @param {yuma.modules.image.ImageModule} module the module
 * @constructor
 */
yuma.storage.ElasticSearchStorage = function(module) {
  /** @private **/
  this._STORE_URI = 'http://localhost:9200/annotations/';
  
  var self = this;
  module.addHandler(yuma.events.EventType.ANNOTATION_EDIT_SAVE, function(event) {
    self.create(event.annotation);
  });
  
  this.loadAnnotations(module);  
}

/**
 * @private
 */
yuma.storage.ElasticSearchStorage.prototype._showError = function(error) {
  // TODO proper error handling
  window.alert('ERROR');
  console.log(error);
}

yuma.storage.ElasticSearchStorage.prototype.loadAnnotations = function(module) {
  // TODO need to restrict search to the URL of the annotated
  
  var self = this;
  goog.net.XhrIo.send(this._STORE_URI + '_search?query=*:*', function(data) {
    try {
      var hits = data.target.getResponseJson()['hits']['hits'];
      goog.array.forEach(hits, function(hit, idx, array) {
        module.addAnnotation(hit['_source']);
      });
    } catch (e) {
      self._showError(e);
    }
  });
}

yuma.storage.ElasticSearchStorage.prototype.create = function(annotation) {
  var self = this;
  goog.net.XhrIo.send(this._STORE_URI + 'annotation/', function(response){
    
  }, 'POST', goog.json.serialize(annotation));
}