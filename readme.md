This is an effort to port the [yuma.js](http://yuma-js.github.com) image annotation toolkit to JavaScript, improving things as we go along. Any help appreciated! I'm putting up live demos of the intermediate state as we progress:

http://rsimon.github.com/yuma2

http://rsimon.github.com/yuma2/index_okfn.html (Annotator plugin)

## Using

To make images on your Website annotatable with this library, follow these steps:

__Include the library JavaScript__ file in the &lt;head&gt; of your HTML page

    <head>
      ...
      <script type="text/javascript" src="yuma2.min.js"></script>
      ...
    </head>

__Include the library CSS stylesheet__ in the &lt;head&gt; of your HTML page

    <head>
      ...
      <link rel="stylesheet" type="text/css" href="css/yuma2.css" />
      <script type="text/javascript" src="yuma2.min.js"></script>
      ...
    </head>  

__Mark the images to be annotatable__ using the 'annotatable' CSS class.

    <body>
      ...
      <img class="annotatable" src="myimage.jpg">
      ...
    </body>

## Developing

We're using Google's [Closure Tools](http://developers.google.com/closure/). I recommend using the [plovr](http://plovr.com/) build tool to get started quickly. (Plovr requires Java to be installed on your system.)

* Run ``java -jar plovr/plovr.jar serve standalone.json`` and open ``index_standalone.html`` to run the Yuma2 standalone version
* Run ``java -jar plovr/plovr.jar serve okfn_plugin.json`` and open ``index_okfn.html`` to run Yuma2 as an OKFN Annotator plugin
* To build the minified JavaScript, run ``java -jar plovr/plovr.jar build standalone.json > yuma2.min.js`` (or ``java -jar plovr/plovr.jar build okfn_plugin.json > yuma2.min.js``), replacing 'yuma2.min.js' with a file name of your choice
* Note: the version of plovr I included in this repository is the February 2012 release ([plovr-4b3caf2b7d84.jar](http://code.google.com/p/plovr/downloads/detail?name=plovr-4b3caf2b7d84.jar&can=2)).

## TODOs (almost in order of priority...)

* __Find a decent name for this tool!__
* Attach storage according to "OKFN Annotator Store":http://github.com/okfn/annotator/wiki/Storage protocol
* Expose the most relevant JS methods to the outside world: addAnnotation, removeAnnotation, addHandler, new ImageAnnotator(image)
* Should we add the stylesheet via JS? Would make Yuma integration a 1-liner!
* Make Yuma2 work on pages with dynamically loaded images (e.g. image carousels)
* Editing existing annotations
* Make selection move/resizable after it is created
* OpenLayers and/or Seadragon AJAX support
* Make soft fade effects work on Internet Explorer
* Implement Point and Polygon shape selection
* Implement freehand draw selection
* Add support for the "toponym selection tool":http://github.com/rsimon/toponymotator
* ~~Make MOUSE_OVER/OUT_OF_ANNOTATABLE_MEDIA events fire properly~~ __DONE__
* ~~Refactor 'Popup' into separate class~~ __DONE__
* ~~Clean up the OKFN Annotator plugin implementation (needs to work in ADVANCED COMPILATION mode~~ __DONE__
* ~~Support lazy loading of image annotation overlays~~ __DONE__
* ~~Make Yuma2 work on pages with multiple images~~ __DONE__
* ~~Make Yuma2 work on pages with floating/flexible layouts~~ __DONE__
* ~~Deleting existing annotations~~ __DONE__
* ~~Create an OKFN Annotator Plugin wrapper~~ __DONE__ (but very alpha)
* ~~Change the way activation works: activation no longer via JavaScript but via a CSS class~~ __DONE__
* ~~Popup annotation text bubble~~ __DONE__ (but needs some style)
* ~~Popup annotation create/edit form~~ __DONE__ (but needs some style)
* ~~Clean up namespacing (it's a bit messy after the last refactoring)~~ __DONE__
* ~~Central event bus/event broker to keep code tidy~~ __DONE__ (but needs fix to work with multiple annotatable images!)
* ~~Custom mouseover/mouseout events for annotation shapes~~ __DONE__

## Licensing

This tool is licensed under the terms of the __GNU Lesser General Public License (LGPL)__. In plain English,
this means you can use and re-distribute our tool for free, in non-commercial as well commercial products, with
no restrictions or implications on the license of your own software. __However__: should you modify the code of the tool itself, these __modifications__ need to be Open Source, too. In short: feel free to use this tool wherever or however you want without restrictions. But if you fix a bug, add a cool feature, etc. be sure to give back to the community.

