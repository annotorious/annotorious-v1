This package created by hyun-june KIM on Bigdata Lab. 
Kookmin univ. in Korea

Create to do automatic selection of tagging box that do one click to right button from mouse.

ISSUE - 2018.04.25
-------------------------------------------------------------------

## Issue:
+ at currently You can received to geometry for rectangle, but got not numeric, it divided by pixel;<br>
   x / width, y / height
+ 


USAGE
-----

1. "<script src="kookmin-hjkim-custom.js"></script>"
2. "<body onload="init()> " -> Is that annotorious original function run.
3. create to event handler annotation in Image</br>
   please, must be read to basic usage from annotorious web.
4. you have to insert in function init(). init is event handler listener on package.

5. What does it function transFormSelOpt()?</br>		
   Yes, is this trans form that is changed textarea to select-option for tag.


Thank You
============

현재 javascript의 prototype 형태로 구현되지 않았습니다.
해당 부분은 조금 더 javascript architecture를 이해한 후 변환할 예정입니다.

html 태그에 script태그로 해당 js 파일을 import 해주세요. <br>
"<body onload="init()">" <br>

그 다음 body 태그에서 onload를 통해 init() 함수를 호출하도록 지시합니다.
호출된 init()함수는 내부 함수에 의해서 annotorious 기능을 일부 재변환 할 것 입니다.
<br>
<br>
내부 함수 중 중요한 부분은 transFormSelOpt()이며, 이것은 annotorious 환경이 구현되면, 마지막에 tag 입력단을 select 형태로 재변환 합니다.
<br>
각 함수 구현부는 init()함수 아래에서 addHandler()를 통해 진행되며, annotorious
api references Doc. 에 자세하게 나열되어있습니다.<br>
https://annotorious.github.io/api.html

<br>
<pre>
        //Annotation
        anno.makeAnnotatable(document.getElementById('testimage'));
        transFormSelOpt();

        //Polygonmode
        anno.addPlugin('PolygonSelector', { activate: false });

        anno.addHandler('onAnnotationCreated', function(annotation){
                //console.log(annotation.text);
                getData(annotation);
        });
        anno.addHandler('onAnnotationUpdated', function(annotation){
                deleteData(annotation);
                getData(annotation);
        });
</pre>
<br>

=======

auto-selector.js | <br>

+ annotorious.plugin.autoSelector.prototype.onInitAnnotator = function(annotator)
> **must be set to CurrentSelector('rect');**<br>

+ annotorious.plugin.autoSelector.Selector.prototype._attachListeners = function()
> start annotorious handler.<br>
> **if you want to create to new function, then maybe have to declare this inner function.<br>
> Can do it !!**<br>

+ annotorious.plugin.autoSelector.Selector.prototype.getName = function()
> that is return type something for want **tag box type.**<br>

+ annotorious.plugin.autoSelector.Selector.prototype.stopSelection = function()
> **finish**<br>

+ annotorious.plugin.autoSelector.Selector.prototype.startSelection = function(x, y)
> **Annotorious Entry point.**<br>
> this function get pointer from mouse click. <br>
> Is this like main and you **must be declare attachListeners() in it.**<br>
> and recommended to call delete geometry job.<br>

+ annotorious.plugin.autoSelector.Selector.prototype.getSupportedShapeType = function()
> it's important method.<br>
> primary type [ polygon, rect ] <br>
> Maybe you set to the other type( polygon..?? ), have to modified geometry if then no rect type.

+ annotorious.plugin.autoSelector.Selector.prototype.getShape = function()
> for set tagbox and for save geometry information create to this.<br>
> getShape call by attachListeners()<br>
> and it return box type, and **it return geometry for sending json data.**<br>

+ annotorious.plugin.autoSelector.Selector.prototype.drawShape = function()
> **no more to needed.**

+ annotorious.plugin.autoSelector.Selector.prototype.drawRect = function(click_x, click_y)
> it is __**my custom drawing tool for auto sketch.**__<br>
> code example below.<br>

<pre>
//TODO:simple code
attachListeners(shape) {
   self.drawRect(self._anchor.x, self._anchor.y);
   try{
      fireEvent("onSelectedCompleted",{mouseEvent:event, shape:shape, viewportBounds: getViewportBounds())
   }
}
</pre>


감사합니다.<br>
Big-Data Lab KOOKMIN-UNIV.
