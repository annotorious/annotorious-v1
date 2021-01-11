# Annotorious - Image Annotation for the Web (custom)

This library is a custom version of the [Annotorious library](https://github.com/annotorious/annotorious) (currently deprecated / dead). Show the new [Annotorious library](https://github.com/recogito/annotorious). 

Annotorious is an Open Source image annotation toolkit written in JavaScript. It allows you to add drawing, commenting and labeling capabilities to your web page images with a few lines of code.

Are you looking for toolkit written in jQuery to annotate an image by dragging and dropping annotations? Check out [this project](https://github.com/AntoninoBonanno/DragDropAnnotate).

## Getting Started

Instructions on getting started using Original Annotorious library [on the Wiki](https://github.com/annotorious/annotorious/wiki/Getting-Started). 
Instructions on using it as a plugin to the [Annotator](http://okfnlabs.org/projects/annotator/) Web annotation system are [here](http://annotorious.github.io/plug-outs/okfn-annotator.html).

## How Do I Add Annotorious to My Web Page?

* Unzip the contents of the package on your server
* Link the __Annotorious CSS file__ into the &lt;head&gt; of your Web pages
* Link the __Annotorious JavaScript__ file into the &lt;head&gt; of your Web pages

Example:

```
    <head>
      <link rel="stylesheet" type="text/css" href="css/annotorious.css" />
      <script type="text/javascript" src="annotorious.min.js"></script>
    </head>
```

## How Do I Enable Annotation for an Image on My Page?

Once you have linked Annotorious into your Web page, you need to tell it which images should be annotatable.
There are two ways you can do this:

__Option 1.__ Add a CSS class called ``annotatable`` to the image. This is the easiest way to add annotation functionality, and I'd always recommend using this approach unless your page loads images dynamically via JavaScript, after the page has loaded.

Example:

```
<html>
    <head>
    <link rel="stylesheet" type="text/css" href="css/annotorious.css" />
    <script type="text/javascript" src="annotorious.min.js"></script>
    </head>
    
    <body>
    <img src="example.jpg" class="annotatable" />
    </body>
</html>
```

__Option 2:__ Annotation-enable your images via JavaScript API, using ``anno.makeAnnotatable(img);`` You can use
this approach if your page loads images dynamically via JavaScript.

# JavaScript API

Annotorious provides a JavaScript API you can use to get, add or remove annotations, and hook into the Annotorious event lifecycle. All functionality is exposed via the global _anno_ object. The _anno_ object has the following methods

**Show [JavaScript-API.md](https://github.com/AntoninoBonanno/annotorious/blob/master/JavaScript-API.md) for more details**

## My Contribution (Extended JavaScript API)

### Functionality
* [Mask](#mask): Added the ability to insert an image inside a annotation with shapes rect.
* [ColorMode](#colormode): Added the ability to draw custom shape without make an annotation. The drawn pixels coordinate are returned when the mouse is released.
* [SelectEditor](#selecteditor): Added the ability to use a select inside the editor. (Dropdown menu)
* [CursorAxes](#cursoraxes): Added the ability to show cursor axes inside the image.
* [ArrowMode](#arrowmode): Added the ability to annotate with draw arrow shape. (Arrow selector)
* [Fancy Box](#fancy-box): Added ['Fancy Box Selector'](https://annotorious.github.io/demos/fancybox-preview.html) plugin integration.
* [ExtraFields](#extrafields): Added the ability to add many fields to the annotation GUI widget from properties.
* [IntersectedAnnotations](#intersectedAnnotations): Added the ability to retrieves all annotations that intersect the centroid of an annotation.

### Changes
* Added the ability to [reload the annotations](#reload-the-annotations).
* Added the `onMouseMoveOverItem` [event](#events) - fired when the mouse enters an annotatable item.
* Added an old annotation text inside the [event](#events) `onAnnotationUpdated`, when editing the annotation. 
* Added the ability to insert [more new annotation](#add-multiple-annotations) to an item on the page.
* Added attributes in to the ["annotation" variable](#annotation-variable).
* Added more [properties](#properties) for editing style and functionality on runtime.
* Added the ability to set the measurement units used for the output geometry ['pixel', 'fraction'].
* Added the ability to custom the editor.
* Added the ability to move the annotations. The `onAnnotationMoved` [event](#events) - fired when the annotation was moved.
* Added the ability to rotate the annotations. The `onAnnotationRotated` [event](#events) - fired when the annotation was rotated.
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
    <br/>

    ```
    anno.addHandler('onAnnotationCreated', function (annotation) {
        annotation.setMask("http://www.example.com/mymask.jpg");
        anno.reload();
    });
    ```

### ColorMode

Ability to draw custom shape without make an annotation. The last drawn pixels coordinate are returned when the mouse is released on `onDrawnPixels` event. 

**`anno.setColorMode(*enabled*, *insideAnno*, *mode*, *color*, *strokeWidth*);`**

Modalities of save the drawn pixels:
- **permanent**: pixels are saved until `anno.reset()` or `anno.reload()`.
- **active**: pixels are saved as long as *ColorMode* is enabled.
- **release**: the pixels are not saved, they are deleted when the mouse is released.

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
    // ENABLE - insideAnno, mode, color and strokeWidth are OPTIONAL
    anno.setColorMode(true, true, 'release', '#E74C3C', 1); 
   
    // DISABLE
    anno.setColorMode(false); 
    ```

- Get drawn pixels

    ```
    anno.addHandler('onDrawnPixels', function (event) {
        console.log(event);
        event.drawnPixels; //array of last drawn pixels {x, y}
        event.annotation; //the annotation on which it was drawn inside (only if the 'insideAnno' property is enabled)
    });
    ```

### SelectEditor 

Ability to use a select, with custom options, inside the editor. (Dropdown menu)

**`anno.useSelectEditor(*enabled*, *options*, *emptyOption*, *customLabel*);`**

- define custom options

    ```
    var selectOptions = [
        {
          id: 1, //the annotation text id [OPTIONAL]
          value: 'My annotation' //the annotation text
        },
    ];
    ```
    
- set *SelectEditor* in the properties

    ```
    anno.setProperties({        
        selectEditor: {
            /* DEFAULT VALUES */   
            enabled: false, //if true, enable the select editor
            options: undefined, //the options of select, use format of 'selectOptions' variable 
            emptyOption: false, //if true, enable the empty select option [OPTIONAL]
            customLabel: "<--- Select one option --->" //the custom first label if not use empty options [OPTIONAL]
        }
    });
    ```

- set *SelectEditor* using the function
    
    ```
    // ENABLE - emptyOption and customLabel are OPTIONAL
    anno.useSelectEditor(true, selectOptions, false, "Select one"); 

    // DISABLE
    anno.useSelectEditor(false); 
    ```

### CursorAxes

Ability to show cursor axes inside the image.

**`anno.showCursorAxes(*enabled*, *dash*, *color*, *strokeWidth*);`**

- set *CursorAxes* in the properties

    ```
    anno.setProperties({        
        cursorAxes: {
            /* DEFAULT VALUES */    
            enabled: false, //if true, enable the cursor axes 
            dash: false, //if true, draw dashed stroke [OPTIONAL]
            color: "#ffffff", //color of cursor axes [OPTIONAL]
            strokeWidth: 2 //stroke width of axes [1-12] [OPTIONAL]            
        }
    });
    ```

- set *CursorAxes* using the function
    
    ```
    // ENABLE - dash, color and strokeWidth are OPTIONAL
    anno.showCursorAxes(true, true, '#E74C3C', 2); 
   
    // DISABLE
    anno.showCursorAxes(false); 
    ```

### ArrowMode

Ability to annotate with draw arrow shape. (Arrow selector)

**` anno.setArrowMode(*enabled*); `**

- set *ArrowMode* in the properties

    ```
    anno.setProperties({ 
        /* DEFAULT VALUES */           
        arrowMode: false, //if true, enable the arrowMode   
        shapeStyle: { // set style            
            arrowStroke: '#ffffff', // stroke color for arrow shape
            arrowStrokeWidth: 2, // stroke width for arrow shape [1-12] 
            hiArrowStroke: '#fff000', // stroke color for arrow shape 
            hiArrowStrokeWidth: 2.2  //stroke width for arrow shape [1-12] 

            highlightTail: undefined, //color to highlight the tail of the arrow shape (draw a circle on the tail) [es "rgba(0, 0, 255, 0.7)"] 
            hiTailRadius: 5, // arrow tail highlight radius 
            highlightHead: undefined, //color to highlight the head of the arrow shape (draw a circle on the head) [es "rgba(0, 0, 255, 0.7)"] 
            hiHeadRadius: 5 // arrow head highlight radius 
        }
    });
    ```

- set *ArrowMode* using the function

    ```
    // ENABLE
    anno.setArrowMode(true); 

    // DISABLE
    anno.setArrowMode(false); 
    ```

- set *arrow* shape on annotation variable

    ```
    shapes: [{
        type: 'arrow',
        geometry: { //the shape geometry (relative coordinates) [you can also use the coordinates in pixels]
            arrowTail: { x: 0.20 y: 0.74 }, // coordinate of arrow tail
            arrowHead: { x: 0.77 y: 0.66 } // coordinate of arrowhead
        },

        style: { //style [OPTIONAL]
            arrowStroke: '#ffffff', // stroke color for arrow shape
            arrowStrokeWidth: 2, // stroke width for arrow shape [1-12] 
            hiArrowStroke: '#fff000', // stroke color for arrow shape 
            hiArrowStrokeWidth: 2.2  //stroke width for arrow shape [1-12] 

            highlightTail: undefined, //color to highlight the tail of the arrow shape (draw a circle on the tail) [es "rgba(0, 0, 255, 0.7)"] 
            hiTailRadius: 5, // arrow tail highlight radius 
            highlightHead: undefined, //color to highlight the head of the arrow shape (draw a circle on the head) [es "rgba(0, 0, 255, 0.7)"] 
            hiHeadRadius: 5 // arrow head highlight radius 
        }
    }]
    ```

### Fancy Box 

Added ['Fancy Box Selector'](https://annotorious.github.io/demos/fancybox-preview.html) plugin integration.

**` anno.useFancyBox(*enabled*); `**

- set *Fancy Box* in the properties

    ```
    anno.setProperties({ 
        /* DEFAULT VALUES */           
        fancyBox: false, //if true, enable the Fancy Box Selector
    });
    ```

- set *Fancy Box* using the function

    ```
    // ENABLE
    anno.useFancyBox(true); 

    // DISABLE
    anno.useFancyBox(false); 
    ```

### ExtraFields

Ability to add many fields to the annotation GUI widget from properties. A field can be either an (HTML) string, or a function that takes an Annotation as argument and returns an (HTML) string or a DOM element.

- set *ExtraFields* for editor GUI widget

    ```
    anno.setProperties({    
        editor: {   
            extraFields: [
                "<div id='myId' class='myClass'> MyExtraField </div>", //a field (HTML) string
            ]
        }
      });
    ```

- set *ExtraFields* for popup GUI widget

    ```
    anno.setProperties({    
        popup: {   
            extraFields: [
                "<div id='myId' class='myClass'> MyExtraField </div>", //a field (HTML) string
            ]
        }
      });
    ```

### IntersectedAnnotations

Ability to retrieves all annotations that intersect the centroid of an annotation.

**` anno.getIntersectedAnnotations(*annotation*, *shapeType*); `**

Function parameters:
- **annotation**: an annotation. The centroid is calculated from the shapes[0] of this variable.
- **shapeType**: if you want to filter the results by shape type; Default `undefined`, possible values: ['rect', 'point', 'arrow', 'polygon']

The function return an array of the intersect annotations sorted by size, smallest first.

Example of use:
```
anno.addHandler('onAnnotationCreated', function (annotation, item) {
    var intersectedAnnotations = anno.getIntersectedAnnotations(annotation);
    var intersectedFilteredAnnotations = anno.getIntersectedAnnotations(annotation, 'rect');

    console.log(intersectedAnnotations, intersectedFilteredAnnotations);
});
```

### Reload the annotations

Ability to reload the annotations, the image must have the `annotatable` class.

**` anno.reload(*removeProperties*); `**

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
        console.log(old_value);  // {text: "My annotation", textId: "1"}
    });
    ```

* Added the `onAnnotationMoved` event, fired when the annotation was moved. Return the annotation moved.

    ```
    anno.addHandler('onAnnotationMoved', function (annotation) {
        console.log(annotation); 
    });
    ```

* Added the `onAnnotationRotated` event, fired when the annotation was rotated. Return the annotation rotated.

    ```
    anno.addHandler('onAnnotationRotated', function (annotation) {
        console.log(annotation); 
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
    
    id: undefined, //id assignable to annotation

    src : 'http://www.example.com/myimage.jpg', //the URL of the image where the annotation should go    
    context: '', //source URL of the HTML document containing the annotated object [OPTIONAL]

    text : 'My annotation', //the annotation text 
    textId : 1, //the annotation text id [OPTIONAL]
    editable: true, //if false, there will be no delete icon in the annotation popup. Make annotation 'read-only' [OPTIONAL]

    movable: true, //if false, there will be no move icon in the annotation popup. Make annotation not movable [OPTIONAL]
    rotable: true, //if false, there will be no rotate icon in the annotation popup. Make annotation not rotable [OPTIONAL]

    created_at: 1579909408935, //the timestamp of annotation creation [OPTIONAL]

    shapes : [{ //the annotation shape    
    
        type : 'rect', //the shape type ['rect', 'point', 'arrow', 'polygon'] for enable 'polygon' shape show the official page
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
                        
            maskTransparency: 0.8, //transparency for annotation mask [0-1] [OPTIONAL]
            maskBorder: true,  //if false, not show the mask border [OPTIONAL]

            arrowStroke: '#ffffff', // stroke color for arrow shape [OPTIONAL]
            arrowStrokeWidth: 2, // stroke width for arrow shape [1-12] [OPTIONAL]
            hiArrowStroke: '#fff000', // stroke color for arrow shape [OPTIONAL]
            hiArrowStrokeWidth: 2.2  //stroke width for arrow shape [1-12] [OPTIONAL]

            highlightTail: undefined, //color to highlight the tail of the arrow shape (draw a circle on the tail) [OPTIONAL]
            hiTailRadius: 5, // arrow tail highlight radius [OPTIONAL]
            highlightHead: undefined, //color to highlight the head of the arrow shape (draw a circle on the head) [OPTIONAL]
            hiHeadRadius: 5 // arrow head highlight radius [OPTIONAL]
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
    drawInsideRectAnno: false, //if true, new annotations can only be made within annotations with 'rect' shape

    colorMode: {
        enabled: false, //if true, enable the colorMode
        insideAnno: false, //if true, is possible draw only inside the annotations         
        mode: "active", // mode of save the drawn pixels ["permanent", "active", "release"] 
        color: "#2ECC71", //color of pixels 
        strokeWidth: 2, //stroke width of pixels [1-12]
    },

    selectEditor: { 
        enabled: false, //if true, enable the select editor
        options: undefined, //the options of select, use format of 'selectOptions' variable [only required if is enabled]
        emptyOption: false, //if true, enable the empty select option 
        customLabel: "<--- Select one option --->" //the custom first label if not use empty options 
    },

    cursorAxes: { 
        enabled: false, //if true, enable the cursor axes 
        dash: false, //if true, draw dashed stroke 
        color: "#ffffff", //color of cursor axes 
        strokeWidth: 2 //stroke width of axes [1-12]        
    },

    arrowMode: false, //if true, enable the arrowMode     

    fancyBox: false, //if true, enable the Fancy Box Selector

    editor: { //properties for editor GUI widget
        enterText: true, //if false, not show the textarea or select for enter text
        saveReadOnly: false, // if true, the new annotation is 'read-only' (the users can't delete or edit the new annotation - does not apply to edited annotations)
        textarea: {
            placeholder: "Add a Comment...", //placeholder of textarea
            className: "annotorious-editor-text" //class of textarea
        },
        buttons: {
            save: {
                text: "Save", //text of save button
                className: "annotorious-editor-button annotorious-editor-button-save" //class of save button
            },
            abort: {
                text: "Cancel", //text of abort button
                className: "annotorious-editor-button annotorious-editor-button-cancel" //class of abort button
            }
        }, 
        extraFields: undefined //add many fields to the annotation editor GUI widget. Show 'ExtraFields' section for more details           
    },

    popup: { //properties for popup GUI widget
        extraFields: undefined //add many fields to the annotation popup GUI widget. Show 'ExtraFields' section for more
    },

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
        maskBorder: true, //if false, not show the mask border 

        arrowStroke: '#ffffff', // stroke color for arrow shape
        arrowStrokeWidth: 2, // stroke width for arrow shape [1-12] 
        hiArrowStroke: '#fff000', // stroke color for arrow shape 
        hiArrowStrokeWidth: 2.2  //stroke width for arrow shape [1-12] 

        highlightTail: undefined, //you can set a color to highlight the tail of the arrow shape (draw a circle on the tail)
        hiTailRadius: 5, // arrow tail highlight radius
        highlightHead: undefined, //you can set a color to highlight the head of the arrow shape (draw a circle on the head)
        hiHeadRadius: 5 // arrow head highlight radius 
    }
});
```

## Test Library

Run `java -jar plovr/plovr.jar serve standalone.json` command on root directory project

Open test\image\index.html

## Build library

Run `java -jar plovr/plovr.jar build standalone.json > annotorious.min.js` command on root directory of project, then the file **annotorious.min.js** will be generated.

## License

Annotorious is licensed under the terms of the [MIT License](mit-license.txt). In short: Annotorious is delivered 'as is', and you can feel free to use it wherever or however you want. Needless to say: if you fix a bug, or add a cool feature, be sure to give back to the community.
