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
* *ColorMode:* Ability to draw custom shape without make an annotation. The drawn pixels coordinate are returned when the mouse is released.

### Changes
* Added the ability to reload the annotations.
* Added the `onMouseMoveOverItem` event - fired when the mouse enters an annotatable item.
* Added an old annotation text inside the event `onAnnotationUpdated`, when editing the annotation. 
* Added the ability to insert more new annotation to an item on the page.
* Added attributes in to the "annotation" variable.
* Added more properties for editing style and functionality on runtime.
* Fixed bug:
    - resizing the image: now the annotations are resized with the image. (The image must have the `annotatable` class).
    - add new annotation: if the new annotation forms are exactly the same as the other annotation forms, the new annotation is not inserted.
    - measurement units 'pixel': now the measurement units 'pixel' are relative to the original image size. This because the image is responsive and the annotation has need of reference measurement units.

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
            maskTransparency: 0.8, //transparency for annotation mask [0-1] [OPTIONAL]
            maskBorder: true //if false, not show the mask border [OPTIONAL]
        }
    }]
    ```

- set *Mask* dynamically - setMask(***mask***, ***shapeIdx***, ***transparency***, ***border***);

    - **mask**: the URL of the mask
    - **shapeIdx**: index of shapes (default: 0)
    - **transparency** transparency of mask [0-1](default: 0.8)
    - **border** flag indicating whether the mask border is shown (default: true)

    ```
    anno.addHandler('onAnnotationCreated', function (annotation) {
        annotation.setMask("http://www.example.com/mymask.jpg");
        anno.reload();
    });
    ```

### ColorMode - anno.setColorMode(*enabled*, *insideAnno*, *mode*, *color*, *strokeWidth*);

Ability to draw custom shape without make an annotation. The last drawn pixels coordinate are returned when the mouse is released on `onDrawnPixels` event. 

Mode of save the drawn pixels:
* *permanent*: pixels are saved until `anno.reset()` or `anno.reload()`.
* *active*: pixels are saved as long as *ColorMode* is enabled.
* *release*: the pixels are not saved, they are deleted when the mouse is released.

- set *ColorMode* in the properties

    ```
    anno.setProperties({        
        colorMode: {
            /* DEFAULT VALUES */
            enabled: false, //if true, enable the colorMode
            insideAnno: false, //if true, is possible draw only inside the annotations [OPTIONAL]            
            mode: "active", // mode of save the drawn pixels ["permanent", "active", "release"] [OPTIONAL]
            color: "#2ECC71", //color of pixels [OPTIONAL]
            strokeWidth: 2, //stroke width of pixels [1-12] [OPTIONAL]
        }
      });
    ```

- set *ColorMode* using the function
    
    ```
    anno.setColorMode(true, true, 'release', '#E74C3C', 1); // ENABLE - insideAnno, mode, color and strokeWidth are OPTIONAL
   
    anno.setColorMode(false); // DISABLE
    ```

- Get drawn pixels

    ```
    anno.addHandler('onDrawnPixels', function (event) {
        console.log(event);
        event.drawnPixels; //array of last drawn pixels {x, y}
        event.annotation; //the annotation on which it was drawn inside (only if the 'insideAnno' property is enabled)
    });
    ```

### Reload the annotations - anno.reload(*removeProperties*); 

Ability to reload the annotations, the image must have the `annotatable` class.

```
anno.reload(); 
```

If you want to reload the annotations and remove the properties use: `anno.reload(true);`.

### Events

* Added the `onMouseMoveOverItem` event, fired when the mouse enters an annotatable item. Return the cursor coordinates and bounding box coordinates [measurement units are 'pixels' relative to the original image size]

    ```
    anno.addHandler('onMouseMoveOverItem', function (pixels, event) {
        console.log(pixels); // {cursor: { x, y }, box: { x, y, width, height }}
    });
    ```

* Added an old annotation text inside the event `onAnnotationUpdated`, when editing the annotation.  

    ```
    anno.addHandler('onAnnotationUpdated', function (annotation, old_value) { 
        console.log(old_value);  // {text: "My annotation"}
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
    context: '', //source URL of the HTML document containing the annotated object [OPTIONAL]

    text : 'My annotation', //the annotation text
    editable: true, //if false, there will be no delete icon in the annotation popup. Make annotation 'read-only' [OPTIONAL]

    created_at: 1579909408935, //the timestamp of annotation creation [OPTIONAL]

    shapes : [{ //the annotation shape    
    
        type : 'rect', //the shape type ['rect', 'point', 'polygon']
        mask : 'http://www.example.com/mymask.jpg', //the URL of the mask - only if type is 'rect' [OPTIONAL]
        geometry : { x : 0.1, y: 0.1, width : 0.4, height: 0.3 } //the shape geometry (relative coordinates)
        
        //geometry : { x : 10, y: 10, width : 40, height: 60 } //the shape geometry (pixel coordinates relative to the original image size)    
        units: 'fraction', //measurement units used for the geometry ['pixel', 'fraction'] [OPTIONAL - only required for pixel coordinates] 
        
        style: { //the shape style, override the shapeStyle properties for this annotation [OPTIONAL]
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
    }],

    setMask(mask, shapeIdx, transparency, border) //function to set mask dinamically on the shape 

```

### Properties
  
Added more properties for editing style and functionality on runtime. 

- All properties are **OPTIONAL** and they merge with the existing.
- If you set the property such as `undefined` or empty object (for the objects), then set the default value.
- The properties are removed if the `anno.reset();` function is called or the `anno.reload(true);` function is called, retained if the `anno.reload();` function is called.

```
anno.setProperties({ 

    /* COMPLETE and DEFAULT VALUES */ 

    displayMessage: "Click and Drag to Annotate", //the message to display as hint  
    hideSelectionWidget: false, //if true, disables the selection widget on all 
    hideAnnotations: false, //if true, hides existing annotations on all 

    outputUnits: 'fraction', //measurement units used for the output geometry ['pixel', 'fraction'] [pixels are relative to the original image size]    
    shapeStyle: { //global style 
        outline: '#000000', //outline color for annotation and selection shapes 
        outlineWidth: 1, //outline width for annotation and selection shapes [1-12] 

        hiOutline: '#000000', // outline color for highlighted annotation shapes 
        hiOutlineWidth: 1, // outline width for highlighted annotation shapes [1-12] 

        stroke: '#ffffff', // stroke color for annotation and selection shapes 
        strokeWidth: 1, // stroke width for annotation and selection shapes [1-12] 

        hiStroke: '#fff000', // stroke color for highlighted annotation shapes 
        hiStrokeWidth: 1.2,  //stroke width for highlighted annotation shapes [1-12] 

        fill: undefined, //fill color for annotation and selection shapes
        hiFill: undefined, //fill color for highlighted annotation shapes

        maskTransparency: 0.8, //transparency for annotation mask [0-1] 
        maskBorder: true //if false, not show the mask border 
    }
});
```

## License

Annotorious is licensed under the terms of the [MIT License](mit-license.txt). In short: Annotorious is delivered 'as is', and you can feel free to use it wherever or however you want. Needless to say: if you fix a bug, or add a cool feature, be sure to give back to the community.
