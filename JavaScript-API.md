# JavaScript API

Annotorious provides a JavaScript API you can use to get, add or remove annotations, and hook into the Annotorious event lifecycle. All functionality is exposed via the global _anno_ object. The _anno_ object has the following methods

* _anno.activateSelector(opt_item_url_or_callback, opt_callback)_
* _anno.addAnnotation(annotation, opt_replace)_
* _anno.addHandler(type, handler)_
* _anno.addPlugin(pluginName, opt_config_options)_
* _anno.destroy(opt_item_url)_
* _anno.getAnnotations(opt_item_url)_
* _anno.hideAnnotations(opt_item_url)_
* _anno.hideSelectionWidget(opt_item_url)_
* _anno.highlightAnnotation(annotation)_
* _anno.makeAnnotatable(item)_
* _anno.removeAll(opt_item_url)_
* _anno.removeAnnotation(annotation)_
* _anno.reset()_
* _anno.showAnnotations(opt_item_url)_
* _anno.showSelectionWidget(opt_item_url)_

## anno.activateSelector(opt_item_url_or_callback, opt_callback)

__NOTE: this method is currently only relevant for the OpenLayers module. Feel free to ignore in
case you are only using the standard image annotation features of Annotorious.__

Manually actives the selector. The selector can be activated on a specific item or globally, on all items (which serves mainly as a shortcut for pages where there is only one annotatable item). The function can take a callback function as parameter, which will be called when the selector is deactivated again.

## anno.addAnnotation(annotation, opt_replace)

Adds a new annotation, or replaces an existing annotation with a new annotation. (In the latter case, the parameter _opt\_replace_ must be the existing annotation.) 

Create the new annotation as an object literal, according to the following example:

    var myAnnotation = {
      /** The URL of the image where the annotation should go **/
      src : 'http://www.example.com/myimage.jpg',
     
      /** The annotation text **/
      text : 'My annotation',
     
      /** The annotation shape **/
      shapes : [{
        /** The shape type **/
        type : 'rect',
        
        /** The shape geometry (relative coordinates) **/
        geometry : { x : 0.1, y: 0.1, width : 0.4, height: 0.3 }
      }]
    } 

__Some notes on annotation shapes:__

* Although the ``shapes`` field requires an array of shapes, Annotorious currently uses
  the first shape in the array __only__. All other shapes are disregarded. (The array is there for future use,
  and for reasons of compatibility with other annotation systems.)
* Currently, ``rect`` (rectangle) is the only supported shape type.
* Per default, Annotorious uses a normalized coordinate system. The example above represents
  a rectangle that starts at a horizontal (vertical) distance of 10% of the image's width (height); 
  has a width of 40% of the image's width; and a height of 30% of the image's height. 

__Using pixel coordinates:__ optionally, you can also express geometry coordinates in pixel units. See below for an example:

    var myAnnotation = {
      /** The URL of the image where the annotation should go **/
      src : 'http://www.example.com/myimage.jpg',
     
      /** The annotation text **/
      text : 'My annotation',
     
      /** The annotation shape **/
      shapes : [{
        /** The shape type **/
        type : 'rect',
 
        /** 'units' is required unless you want to use relative coordinates! **/
        units: 'pixel',
       
        /** The shape geometry (pixel coordinates) **/
        geometry : { x : 10, y: 10, width : 40, height: 60 }
      }]
    }

__Making annotations 'read-only'__: in most cases, you probably don't want users to be able to delete or edit the
annotations you have added via the API. You can easily make them 'read-only' by adding an additional field to the object literal:

    editable : false

If this field is set to false, there will be no _delete_ icon in the annotation popup.

## anno.addHandler(type, handler)

Adds an event handler function. Code example:

    // Logs newly-created annotations to the console
    anno.addHandler('onAnnotationCreated', function(annotation) {
      console.log(annotation.text);
    });

Annotorious issues the following events:

* _onMouseOverItem(event)_ - fired when the mouse enters an annotatable item
* _onMouseOutOfItem(event)_ - fired when the mouse leaves an annotatable item
* _onMouseOverAnnotation(event)_ - fired when the mouse enters an annotation
* _onMouseOutOfAnnotation(event)_ - fired when the mouse leaves an annotation
* _onSelectionStarted(event)_ - fired when the user starts a selection
* _onSelectionCanceled(event)_ - fired when the user cancels a selection (not available on all selection tools)
* _onSelectionCompleted(event)_ - fired when the user completes a selection
* _onSelectionChanged(event)_ - fired when the user changed a selection
* _beforePopupHide(popup)_ - fired just before the annotation info popup window hides
* _beforeAnnotationRemoved(annotation)_ - fired before an annotation is removed (Note: it is possible
  to prevent annotation removal by returning _false_ from the handler method!)
* _onAnnotationRemoved(annotation)_ - fired when an annotation is removed from an imgae
* _onAnnotationCreated(annotation)_ - fired when an annotation was created
* _onAnnotationUpdated(annotation)_ - fired when an existing annotation was edited/updated


## anno.addPlugin(pluginName, opt_config_options)

Registers a plugin. For more information, see the [Plugins Wiki page](/annotorious/annotorious/wiki/Plugins).

## anno.destroy(opt_item_url)

Destroys annotation functionality on a specific item, or on all items on the page. Note that this
method differs from ``anno.reset()`` (see below) insofar as ``destroy`` does not re-evaluate the
``annotatable`` CSS attributes. What is destroyed, stays destroyed. (Until re-enabled through
``anno.makeAnnotatable()``).

## anno.getAnnotations(opt_item_url)

Returns the current annotations. ``opt_item_url`` is optional. If omitted, the method call will return all annotations, on all annotatable items on the page. If set to a specific item URL, only the annotations on that item will be returned.

## anno.hideAnnotations(opt_item_url)

Hides existing annotations on all, or a specific item.

## anno.hideSelectionWidget(opt_item_url)

Disables the selection widget (the small tooltip in the upper left corner which says "Click and Drag to 
Annotate"), thus preventing users from creating new annotations alltogether. The typical use case for this
is 'read-only' annotated images. I.e. if you want to add some pre-defined annotations using
anno.addAnnotation without the user being able to add or change anything.

The selection widget can be hidden on a specific item or globally, on all annotatable items on the page.

## anno.highlightAnnotation(annotation)

Highlights the specified annotation, just as if the mouse pointer was hovering over it. The annotation
will remain highlighted until one of these conditions is met:

* The user moves the mouse into, and out of the annotation
* The user moves the mouse over another annotation
* The highlight is removed by calling this method with an empty parameter, e.g.
  _anno.highlightAnnotation()_ or _anno.highlightAnnotation(undefined)_
* Another annotation is highlighted via _anno.highlightAnnotation_ 

## anno.makeAnnotatable(item)

Makes an item on the screen annotatable (if there is a module available supporting the item format). You can
use this method as an alternative to CSS-based activation. It works just the same way, and is simply there for convenience, and to prepare for (future) item formats that technically don't support CSS-based activation (such as Web maps).

Example:
```
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="css/annotorious.css" />
    <script type="text/javascript" src="annotorious.min.js"></script>
    <script>
      function init() {
        anno.makeAnnotatable(document.getElementById('myImage')); 
      }
    </script>
  </head>      
  <body onload="init();">
    <img src="example.jpg" id="myImage" />
  </body>
</html>
```

## anno.removeAll(opt_item_url)

Removes all annotations. If the optional parameter ``opt_item_url`` is set, only the annotations on the
specified item will be removed. Otherwise all annotations on all items on the page will be removed.

## anno.removeAnnotation(annotation)
 
Removes an annotation from the page.

## anno.reset()

Performs a 'hard reset' on Annotorious. This means all annotation features will be removed, and the page
will be re-scanned for items with the 'annotatable' CSS class. (Note: this method could be handy in case you
are working with JavaScript image carousels. Just make sure the images have 'annotatable' set, then
reset Annotorious after each page flip.)

## anno.showAnnotations(opt_item_url)

Shows existing annotations on all, or a specific item (if they were hidden using _anno.hideAnnotations_).

## anno.showSelectionWidget(opt_item_url)

Enables the selection widget (the small tooltip in the upper left corner which says "Click and Drag to Annotate"), thus enabling users to creating new annotations. (Per default, the selection widget is 
enabled.)