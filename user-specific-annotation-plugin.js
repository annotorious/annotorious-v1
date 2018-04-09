annotorious.plugin.userSpecificAnnotations = function() { }

annotorious.plugin.userSpecificAnnotations.prototype.onInitAnnotator = function(annotator) {
    var oldAddAnnotation = annotorious.mediatypes.openseadragon.Viewer.prototype.addAnnotation;

    function toCamelCase(str) {
        return String(str).replace(/\-([a-z])/g, function(all, match) {
            return match.toUpperCase();
        });
    };

    function addCustomAnnotation(annotation) {
        var geometry = annotation.shapes[0].geometry;
        var outer = goog.dom.createDom('div', 'annotorious-ol-boxmarker-outer');
        var inner = goog.dom.createDom('div', 'annotorious-ol-boxmarker-inner');
        goog.style.setSize(inner, '100%', '100%');
        goog.dom.appendChild(outer, inner);

        for(var key in annotation.properties) {
            outer.style[toCamelCase(key)] = annotation.properties[key];
        }

        var rect = new OpenSeadragon.Rect(geometry.x, geometry.y, geometry.width, geometry.height);

        var overlay = {annotation: annotation, outer: outer, inner: inner};

        var self = this;
        goog.events.listen(inner, goog.events.EventType.MOUSEOVER, function(event) {
            if (!self._currentlyHighlightedOverlay)
                self._updateHighlight(overlay);

            self._lastHoveredOverlay = overlay;
        });

        goog.events.listen(inner, goog.events.EventType.MOUSEOUT, function(event) {
            delete self._lastHoveredOverlay;
            self._popup.startHideTimer();
        });

        this._overlays.push(overlay);

        goog.array.sort(this._overlays, function(a, b) {
            var shapeA = a.annotation.shapes[0];
            var shapeB = b.annotation.shapes[0];
            return annotorious.shape.getSize(shapeB) - annotorious.shape.getSize(shapeA);
        });

        var zIndex = 1;
        goog.array.forEach(this._overlays, function(overlay) {
            goog.style.setStyle(overlay.outer, 'z-index', zIndex);
            zIndex++;
        });

        this._osdViewer.addOverlay(outer, rect);
    }


    annotorious.mediatypes.openseadragon.Viewer.prototype.addAnnotation = function(annotation, opt_replace) {
        if(annotation.properties) {
            addCustomAnnotation.apply(this, [annotation]);
        } else {
            oldAddAnnotation.apply(this, [annotation, opt_replace]);
        }
    }
}

anno.addPlugin('userSpecificAnnotations', {});