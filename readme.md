# Annotorious - Image Annotation for the Web

**CURRENTLY UNSUPPORTED**

Annotorious is an Open Source image annotation toolkit written in JavaScript. Online demos are available
[on our project Website](https://annotorious.github.io).

## Getting Started

Instructions on getting started using Annotorious on your own Web pages are [on the project Website](https://annotorious.github.io/getting-started.html) or
[on the Wiki](https://github.com/annotorious/annotorious/wiki/Getting-Started). Instructions on using it as a plugin to the
[Annotator](http://okfnlabs.org/projects/annotator/) Web annotation system are [here](http://annotorious.github.io/plug-outs/okfn-annotator.html).
If you require support, get in touch [via our mailing list](https://groups.google.com/forum/#!forum/annotorious).

## My Contribution

### Functionality

* *Mask:* Added the ability to insert an image inside a annotation with shapes rect.

### Changes
* Added the ability to resets annotation functionality on page and reload the annotations: `anno.reload()` (The image must have the 'annotatable' class).
* Added the `onMouseMoveOverItem` event - fired when the mouse enters an annotatable item.
* Added an old annotation text inside the event `onAnnotationUpdated`, when editing the annotation. 
* Added the ability to insert more new annotation to an item on the page.
* Added attributes in to the "annotation" variable.
* Fixed bug:
    - resizing the image: now the annotations are resized with the image. (The image must have the 'annotatable' class, the shapes geometry not in pixels)
    - add new annotation: if the new annotation forms are exactly the same as the other annotation forms, the new annotation is not inserted.


## Usage

### Mask

Ability to insert an image inside a annotation with shapes rect.

- set *Mask* on annotation variable

    ```
    shapes: [{
        type: 'rect',
        geometry: { x: 0.2, y: 0.2, width: 0.50, height: 0.5 },
        mask: "http://www.example.com/mymask.jpg",

        style: { //style [OPTIONAL]
            maskTransparency: 0.8 //transparency for annotation mask [0-1] [OPTIONAL]
        }
    }]
    ```

- set *Mask* dynamically 

    ```
    anno.addHandler('onAnnotationCreated', function (annotation) {
        annotation.shapes[0].mask = "http://www.example.com/mymask.jpg";
        anno.reload();
    });
    ```

### Events

* Added the `onMouseMoveOverItem` event, fired when the mouse enters an annotatable item. Return the cursor pixels and bounding box pixels [pixels are relative to the original image size]

    ```
    anno.addHandler('onMouseMoveOverItem', function (pixels, event) {
        console.log(pixels); 
    });
    ```

* Added an old annotation text inside the event `onAnnotationUpdated`, when editing the annotation.  

    ```
    anno.addHandler('onAnnotationUpdated', function (annotation, old_value) { 
        console.log(old_value); 
    });
    ```
### Add Multiple Annotations

Added the ability to insert more new annotation to an item on the page. The function accepts an array of annotations.

  ```
  anno.addAnnotations([myannotation, myannotation1]);
  ```

### Annotation Variable

Added attributes to the "annotation" variable [OPTIONAL - if you create this variable]

```
var myAnnotation = {

    /* COMPLETE ATTRIBUTES */
    
    src : 'http://www.example.com/myimage.jpg', //the URL of the image where the annotation should go    
    context: 'http://www.example.com/myimage.jpg', //source URL of the HTML document containing the annotated object [OPTIONAL]

    text : 'My annotation', //the annotation text
    editable: true, //if false, there will be no delete icon in the annotation popup. Make annotation 'read-only' [OPTIONAL]

    created_at: 1579909408935, //the timestamp of annotation creation [OPTIONAL]

    shapes : [{ //the annotation shape    
    
        type : 'rect', //the shape type ['rect', 'point', 'polygon']
        mask : 'http://www.example.com/mymask.jpg', //the The URL of the mask - only if type is 'rect' [OPTIONAL]
        geometry : { x : 0.1, y: 0.1, width : 0.4, height: 0.3 } //the shape geometry (relative coordinates)
        
        //geometry : { x : 10, y: 10, width : 40, height: 60 } //the shape geometry (pixel coordinates)    
        units: 'fraction', //'units' only required for pixel coordinates [OPTIONAL] ['pixel', 'fraction'] 
        
        style: { //the shape style for personalize single annotation [OPTIONAL]
            outline: '#000000', //outline color for annotation and selection shapes [OPTIONAL]
            outlineWidth: 1, //outline width for annotation and selection shapes [1-12] [OPTIONAL]
            
            hiOutline: '#000000', // outline color for highlighted annotation shapes [OPTIONAL]
            hiOutlineWidth: 1, // outline width for highlighted annotation shapes [1-12] [OPTIONAL]
            
            stroke: '#ffffff', // stroke color for annotation and selection shapes [OPTIONAL]
            strokeWidth: 1, // stroke width for annotation and selection shapes [1-12] [OPTIONAL]
            
            hiStroke: '#fff000', // stroke color for highlighted annotation shapes [OPTIONAL]		 
            hiStrokeWidth: 1.2,  //stroke width for highlighted annotation shapes [1-12] [OPTIONAL]
            
            fill: undefined, //fill color for annotation and selection shapes [OPTIONAL]
            hiFill: undefined, //fill color for highlighted annotation shapes [OPTIONAL]
                        
            maskTransparency: 0.8 //transparency for annotation mask [0-1] [OPTIONAL]
        }
    }]
}
```

## License

Annotorious is licensed under the terms of the [MIT License](mit-license.txt). In short: Annotorious is delivered 'as is', and you can feel free to use it wherever or however you want. Needless to say: if you fix a bug, or add a cool feature, be sure to give back to the community.
