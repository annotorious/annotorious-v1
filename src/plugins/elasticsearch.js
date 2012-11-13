goog.provide('annotorious.plugin.ElasticSearch');

goog.require('goog.array');
goog.require('goog.net.XhrIo');

/**
 * A simple storage connector to the ElasticSearch REST interface.
 * Note: work in progress!
 * 
 * @param {yuma.modules.Module} module the module
 * @constructor
 */
annotorious.plugin.ElasticSearch = function(opt_config_options) {
  /** @private **/
  this._STORE_URI = opt_config_options['base_url'];

  /** @private **/
  this._annotations = [];
}

annotorious.plugin.ElasticSearch.prototype.initPlugin = function(anno) {
  var self = this;
  anno.addHandler(annotorious.events.EventType.ANNOTATION_EDIT_SAVE, function(event) {
    self._create(event.annotation);
  });

  anno.addHandler(annotorious.events.EventType.ANNOTATION_REMOVED, function(event) {
    self._delete(event.annotation);
  });
  
  self._loadAnnotations(anno);
}

/**
 * @private
 */
annotorious.plugin.ElasticSearch.prototype._showError = function(error) {
  // TODO proper error handling
  window.alert('ERROR');
  console.log(error);
}

/**
 * @private
 */
annotorious.plugin.ElasticSearch.prototype._loadAnnotations = function(anno) {
  // TODO need to restrict search to the URL of the annotated
  var self = this;
  goog.net.XhrIo.send(this._STORE_URI + '_search?query=*:*', function(data) {
    try {
      var hits = data.target.getResponseJson()['hits']['hits'];
      goog.array.forEach(hits, function(hit, idx, array) {
        var annotation = hit['_source'];
        annotation.id = hit['_id'];
        if (!goog.array.contains(self._annotations, annotation.id)) {
          self._annotations.push(annotation.id);
          anno.addAnnotation(annotation);
        }
      });
    } catch (e) {
      self._showError(e);
    }
  });
}

/**
 * @private
 */
annotorious.plugin.ElasticSearch.prototype._create = function(annotation) {
  var self = this;
  goog.net.XhrIo.send(this._STORE_URI + 'annotation/', function(response) {
    // TODO error handling if response status != 201 (CREATED)

    var id = response.target.getResponseJson()['_id'];
    annotation.id = id;
  }, 'POST', goog.json.serialize(annotation));
}

/**
 * @private
 */
annotorious.plugin.ElasticSearch.prototype._delete = function(annotation) {
  goog.net.XhrIo.send(this._STORE_URI + 'annotation/' + annotation.id, function(response) {
    // TODO error handling
  }, 'DELETE');  
}

window['annotorious']['plugin']['ElasticSearch'] = annotorious.plugin.ElasticSearch;
annotorious.plugin.ElasticSearch.prototype['initPlugin'] = annotorious.plugin.ElasticSearch.prototype.initPlugin;
