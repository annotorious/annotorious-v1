function $JSCompiler_alias_THROW$$($jscomp_throw_param$$) {
  throw $jscomp_throw_param$$;
}
var $JSCompiler_alias_VOID$$ = void 0, $JSCompiler_alias_TRUE$$ = !0, $JSCompiler_alias_NULL$$ = null, $JSCompiler_alias_FALSE$$ = !1;
function $JSCompiler_emptyFn$$() {
  return function() {
  }
}
function $JSCompiler_get$$($JSCompiler_get_name$$) {
  return function() {
    return this[$JSCompiler_get_name$$]
  }
}
function $JSCompiler_returnArg$$($JSCompiler_returnArg_value$$) {
  return function() {
    return $JSCompiler_returnArg_value$$
  }
}
var $JSCompiler_prototypeAlias$$, $goog$global$$ = this;
function $goog$exportPath_$$($name$$57$$, $opt_object$$) {
  var $parts$$ = $name$$57$$.split("."), $cur$$ = $goog$global$$;
  !($parts$$[0] in $cur$$) && $cur$$.execScript && $cur$$.execScript("var " + $parts$$[0]);
  for(var $part$$;$parts$$.length && ($part$$ = $parts$$.shift());) {
    !$parts$$.length && $goog$isDef$$($opt_object$$) ? $cur$$[$part$$] = $opt_object$$ : $cur$$ = $cur$$[$part$$] ? $cur$$[$part$$] : $cur$$[$part$$] = {}
  }
}
function $goog$nullFunction$$() {
}
function $goog$addSingletonGetter$$($ctor$$) {
  $ctor$$.$getInstance$ = function $$ctor$$$$getInstance$$() {
    return $ctor$$.$instance_$ ? $ctor$$.$instance_$ : $ctor$$.$instance_$ = new $ctor$$
  }
}
function $goog$typeOf$$($value$$39$$) {
  var $s$$2$$ = typeof $value$$39$$;
  if("object" == $s$$2$$) {
    if($value$$39$$) {
      if($value$$39$$ instanceof Array) {
        return"array"
      }
      if($value$$39$$ instanceof Object) {
        return $s$$2$$
      }
      var $className$$1$$ = Object.prototype.toString.call($value$$39$$);
      if("[object Window]" == $className$$1$$) {
        return"object"
      }
      if("[object Array]" == $className$$1$$ || "number" == typeof $value$$39$$.length && "undefined" != typeof $value$$39$$.splice && "undefined" != typeof $value$$39$$.propertyIsEnumerable && !$value$$39$$.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == $className$$1$$ || "undefined" != typeof $value$$39$$.call && "undefined" != typeof $value$$39$$.propertyIsEnumerable && !$value$$39$$.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == $s$$2$$ && "undefined" == typeof $value$$39$$.call) {
      return"object"
    }
  }
  return $s$$2$$
}
function $goog$isDef$$($val$$) {
  return $val$$ !== $JSCompiler_alias_VOID$$
}
function $goog$isArray$$($val$$3$$) {
  return"array" == $goog$typeOf$$($val$$3$$)
}
function $goog$isArrayLike$$($val$$4$$) {
  var $type$$50$$ = $goog$typeOf$$($val$$4$$);
  return"array" == $type$$50$$ || "object" == $type$$50$$ && "number" == typeof $val$$4$$.length
}
function $goog$isString$$($val$$6$$) {
  return"string" == typeof $val$$6$$
}
function $goog$isFunction$$($val$$9$$) {
  return"function" == $goog$typeOf$$($val$$9$$)
}
function $goog$isObject$$($val$$10$$) {
  var $type$$51$$ = typeof $val$$10$$;
  return"object" == $type$$51$$ && $val$$10$$ != $JSCompiler_alias_NULL$$ || "function" == $type$$51$$
}
function $goog$getUid$$($obj$$17$$) {
  return $obj$$17$$[$goog$UID_PROPERTY_$$] || ($obj$$17$$[$goog$UID_PROPERTY_$$] = ++$goog$uidCounter_$$)
}
var $goog$UID_PROPERTY_$$ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36), $goog$uidCounter_$$ = 0;
function $goog$bindNative_$$($fn$$, $selfObj$$1$$, $var_args$$24$$) {
  return $fn$$.call.apply($fn$$.bind, arguments)
}
function $goog$bindJs_$$($fn$$1$$, $selfObj$$2$$, $var_args$$25$$) {
  $fn$$1$$ || $JSCompiler_alias_THROW$$(Error());
  if(2 < arguments.length) {
    var $boundArgs$$ = Array.prototype.slice.call(arguments, 2);
    return function() {
      var $newArgs$$ = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply($newArgs$$, $boundArgs$$);
      return $fn$$1$$.apply($selfObj$$2$$, $newArgs$$)
    }
  }
  return function() {
    return $fn$$1$$.apply($selfObj$$2$$, arguments)
  }
}
function $goog$bind$$($fn$$2$$, $selfObj$$3$$, $var_args$$26$$) {
  $goog$bind$$ = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? $goog$bindNative_$$ : $goog$bindJs_$$;
  return $goog$bind$$.apply($JSCompiler_alias_NULL$$, arguments)
}
function $goog$partial$$($fn$$3$$, $var_args$$27$$) {
  var $args$$ = Array.prototype.slice.call(arguments, 1);
  return function() {
    var $newArgs$$1$$ = Array.prototype.slice.call(arguments);
    $newArgs$$1$$.unshift.apply($newArgs$$1$$, $args$$);
    return $fn$$3$$.apply(this, $newArgs$$1$$)
  }
}
var $goog$now$$ = Date.now || function() {
  return+new Date
};
function $goog$inherits$$($childCtor$$, $parentCtor$$) {
  function $tempCtor$$() {
  }
  $tempCtor$$.prototype = $parentCtor$$.prototype;
  $childCtor$$.$superClass_$ = $parentCtor$$.prototype;
  $childCtor$$.prototype = new $tempCtor$$;
  $childCtor$$.prototype.constructor = $childCtor$$
}
;function $goog$string$trim$$($str$$25$$) {
  return $str$$25$$.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
}
function $goog$string$htmlEscape$$($str$$31$$) {
  if(!$goog$string$allRe_$$.test($str$$31$$)) {
    return $str$$31$$
  }
  -1 != $str$$31$$.indexOf("&") && ($str$$31$$ = $str$$31$$.replace($goog$string$amperRe_$$, "&amp;"));
  -1 != $str$$31$$.indexOf("<") && ($str$$31$$ = $str$$31$$.replace($goog$string$ltRe_$$, "&lt;"));
  -1 != $str$$31$$.indexOf(">") && ($str$$31$$ = $str$$31$$.replace($goog$string$gtRe_$$, "&gt;"));
  -1 != $str$$31$$.indexOf('"') && ($str$$31$$ = $str$$31$$.replace($goog$string$quotRe_$$, "&quot;"));
  return $str$$31$$
}
var $goog$string$amperRe_$$ = /&/g, $goog$string$ltRe_$$ = /</g, $goog$string$gtRe_$$ = />/g, $goog$string$quotRe_$$ = /\"/g, $goog$string$allRe_$$ = /[&<>\"]/;
function $goog$string$toCamelCase$$($str$$42$$) {
  return String($str$$42$$).replace(/\-([a-z])/g, function($all$$, $match$$) {
    return $match$$.toUpperCase()
  })
}
;var $goog$array$ARRAY_PROTOTYPE_$$ = Array.prototype, $goog$array$indexOf$$ = $goog$array$ARRAY_PROTOTYPE_$$.indexOf ? function($arr$$10$$, $obj$$21$$, $opt_fromIndex$$6$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.indexOf.call($arr$$10$$, $obj$$21$$, $opt_fromIndex$$6$$)
} : function($arr$$11$$, $obj$$22$$, $fromIndex_i$$12_opt_fromIndex$$7$$) {
  $fromIndex_i$$12_opt_fromIndex$$7$$ = $fromIndex_i$$12_opt_fromIndex$$7$$ == $JSCompiler_alias_NULL$$ ? 0 : 0 > $fromIndex_i$$12_opt_fromIndex$$7$$ ? Math.max(0, $arr$$11$$.length + $fromIndex_i$$12_opt_fromIndex$$7$$) : $fromIndex_i$$12_opt_fromIndex$$7$$;
  if($goog$isString$$($arr$$11$$)) {
    return!$goog$isString$$($obj$$22$$) || 1 != $obj$$22$$.length ? -1 : $arr$$11$$.indexOf($obj$$22$$, $fromIndex_i$$12_opt_fromIndex$$7$$)
  }
  for(;$fromIndex_i$$12_opt_fromIndex$$7$$ < $arr$$11$$.length;$fromIndex_i$$12_opt_fromIndex$$7$$++) {
    if($fromIndex_i$$12_opt_fromIndex$$7$$ in $arr$$11$$ && $arr$$11$$[$fromIndex_i$$12_opt_fromIndex$$7$$] === $obj$$22$$) {
      return $fromIndex_i$$12_opt_fromIndex$$7$$
    }
  }
  return-1
}, $goog$array$forEach$$ = $goog$array$ARRAY_PROTOTYPE_$$.forEach ? function($arr$$14$$, $f$$, $opt_obj$$1$$) {
  $goog$array$ARRAY_PROTOTYPE_$$.forEach.call($arr$$14$$, $f$$, $opt_obj$$1$$)
} : function($arr$$15$$, $f$$1$$, $opt_obj$$2$$) {
  for(var $l$$2$$ = $arr$$15$$.length, $arr2$$ = $goog$isString$$($arr$$15$$) ? $arr$$15$$.split("") : $arr$$15$$, $i$$14$$ = 0;$i$$14$$ < $l$$2$$;$i$$14$$++) {
    $i$$14$$ in $arr2$$ && $f$$1$$.call($opt_obj$$2$$, $arr2$$[$i$$14$$], $i$$14$$, $arr$$15$$)
  }
}, $goog$array$filter$$ = $goog$array$ARRAY_PROTOTYPE_$$.filter ? function($arr$$17$$, $f$$3$$, $opt_obj$$4$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.filter.call($arr$$17$$, $f$$3$$, $opt_obj$$4$$)
} : function($arr$$18$$, $f$$4$$, $opt_obj$$5$$) {
  for(var $l$$4$$ = $arr$$18$$.length, $res$$ = [], $resLength$$ = 0, $arr2$$2$$ = $goog$isString$$($arr$$18$$) ? $arr$$18$$.split("") : $arr$$18$$, $i$$16$$ = 0;$i$$16$$ < $l$$4$$;$i$$16$$++) {
    if($i$$16$$ in $arr2$$2$$) {
      var $val$$11$$ = $arr2$$2$$[$i$$16$$];
      $f$$4$$.call($opt_obj$$5$$, $val$$11$$, $i$$16$$, $arr$$18$$) && ($res$$[$resLength$$++] = $val$$11$$)
    }
  }
  return $res$$
}, $goog$array$map$$ = $goog$array$ARRAY_PROTOTYPE_$$.map ? function($arr$$19$$, $f$$5$$, $opt_obj$$6$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.map.call($arr$$19$$, $f$$5$$, $opt_obj$$6$$)
} : function($arr$$20$$, $f$$6$$, $opt_obj$$7$$) {
  for(var $l$$5$$ = $arr$$20$$.length, $res$$1$$ = Array($l$$5$$), $arr2$$3$$ = $goog$isString$$($arr$$20$$) ? $arr$$20$$.split("") : $arr$$20$$, $i$$17$$ = 0;$i$$17$$ < $l$$5$$;$i$$17$$++) {
    $i$$17$$ in $arr2$$3$$ && ($res$$1$$[$i$$17$$] = $f$$6$$.call($opt_obj$$7$$, $arr2$$3$$[$i$$17$$], $i$$17$$, $arr$$20$$))
  }
  return $res$$1$$
}, $goog$array$every$$ = $goog$array$ARRAY_PROTOTYPE_$$.every ? function($arr$$25$$, $f$$11$$, $opt_obj$$12$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.every.call($arr$$25$$, $f$$11$$, $opt_obj$$12$$)
} : function($arr$$26$$, $f$$12$$, $opt_obj$$13$$) {
  for(var $l$$7$$ = $arr$$26$$.length, $arr2$$5$$ = $goog$isString$$($arr$$26$$) ? $arr$$26$$.split("") : $arr$$26$$, $i$$19$$ = 0;$i$$19$$ < $l$$7$$;$i$$19$$++) {
    if($i$$19$$ in $arr2$$5$$ && !$f$$12$$.call($opt_obj$$13$$, $arr2$$5$$[$i$$19$$], $i$$19$$, $arr$$26$$)) {
      return $JSCompiler_alias_FALSE$$
    }
  }
  return $JSCompiler_alias_TRUE$$
};
function $goog$array$find$$($arr$$27$$, $f$$13$$) {
  var $i$$20_l$$inline_69$$;
  a: {
    $i$$20_l$$inline_69$$ = $arr$$27$$.length;
    for(var $arr2$$inline_70$$ = $goog$isString$$($arr$$27$$) ? $arr$$27$$.split("") : $arr$$27$$, $i$$inline_71$$ = 0;$i$$inline_71$$ < $i$$20_l$$inline_69$$;$i$$inline_71$$++) {
      if($i$$inline_71$$ in $arr2$$inline_70$$ && $f$$13$$.call($JSCompiler_alias_VOID$$, $arr2$$inline_70$$[$i$$inline_71$$], $i$$inline_71$$, $arr$$27$$)) {
        $i$$20_l$$inline_69$$ = $i$$inline_71$$;
        break a
      }
    }
    $i$$20_l$$inline_69$$ = -1
  }
  return 0 > $i$$20_l$$inline_69$$ ? $JSCompiler_alias_NULL$$ : $goog$isString$$($arr$$27$$) ? $arr$$27$$.charAt($i$$20_l$$inline_69$$) : $arr$$27$$[$i$$20_l$$inline_69$$]
}
function $goog$array$contains$$($arr$$31$$, $obj$$25$$) {
  return 0 <= $goog$array$indexOf$$($arr$$31$$, $obj$$25$$)
}
function $goog$array$remove$$($arr$$38$$, $obj$$29$$) {
  var $i$$26$$ = $goog$array$indexOf$$($arr$$38$$, $obj$$29$$);
  0 <= $i$$26$$ && $goog$array$ARRAY_PROTOTYPE_$$.splice.call($arr$$38$$, $i$$26$$, 1)
}
function $goog$array$toArray$$($object$$2$$) {
  var $length$$15$$ = $object$$2$$.length;
  if(0 < $length$$15$$) {
    for(var $rv$$3$$ = Array($length$$15$$), $i$$29$$ = 0;$i$$29$$ < $length$$15$$;$i$$29$$++) {
      $rv$$3$$[$i$$29$$] = $object$$2$$[$i$$29$$]
    }
    return $rv$$3$$
  }
  return[]
}
function $goog$array$extend$$($arr1$$, $var_args$$41$$) {
  for(var $i$$30$$ = 1;$i$$30$$ < arguments.length;$i$$30$$++) {
    var $arr2$$8$$ = arguments[$i$$30$$], $isArrayLike$$;
    if($goog$isArray$$($arr2$$8$$) || ($isArrayLike$$ = $goog$isArrayLike$$($arr2$$8$$)) && $arr2$$8$$.hasOwnProperty("callee")) {
      $arr1$$.push.apply($arr1$$, $arr2$$8$$)
    }else {
      if($isArrayLike$$) {
        for(var $len1$$ = $arr1$$.length, $len2$$ = $arr2$$8$$.length, $j$$1$$ = 0;$j$$1$$ < $len2$$;$j$$1$$++) {
          $arr1$$[$len1$$ + $j$$1$$] = $arr2$$8$$[$j$$1$$]
        }
      }else {
        $arr1$$.push($arr2$$8$$)
      }
    }
  }
}
function $goog$array$slice$$($arr$$42$$, $start$$5$$, $opt_end$$13$$) {
  return 2 >= arguments.length ? $goog$array$ARRAY_PROTOTYPE_$$.slice.call($arr$$42$$, $start$$5$$) : $goog$array$ARRAY_PROTOTYPE_$$.slice.call($arr$$42$$, $start$$5$$, $opt_end$$13$$)
}
function $goog$array$defaultCompare$$($a$$3$$, $b$$2$$) {
  return $a$$3$$ > $b$$2$$ ? 1 : $a$$3$$ < $b$$2$$ ? -1 : 0
}
;var $goog$userAgent$detectedOpera_$$, $goog$userAgent$detectedIe_$$, $goog$userAgent$detectedWebkit_$$, $goog$userAgent$detectedGecko_$$, $goog$userAgent$detectedMac_$$;
function $goog$userAgent$getUserAgentString$$() {
  return $goog$global$$.navigator ? $goog$global$$.navigator.userAgent : $JSCompiler_alias_NULL$$
}
function $goog$userAgent$getNavigator$$() {
  return $goog$global$$.navigator
}
$goog$userAgent$detectedGecko_$$ = $goog$userAgent$detectedWebkit_$$ = $goog$userAgent$detectedIe_$$ = $goog$userAgent$detectedOpera_$$ = $JSCompiler_alias_FALSE$$;
var $ua$$inline_76$$;
if($ua$$inline_76$$ = $goog$userAgent$getUserAgentString$$()) {
  var $navigator$$inline_77$$ = $goog$userAgent$getNavigator$$();
  $goog$userAgent$detectedOpera_$$ = 0 == $ua$$inline_76$$.indexOf("Opera");
  $goog$userAgent$detectedIe_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_76$$.indexOf("MSIE");
  $goog$userAgent$detectedWebkit_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_76$$.indexOf("WebKit");
  $goog$userAgent$detectedGecko_$$ = !$goog$userAgent$detectedOpera_$$ && !$goog$userAgent$detectedWebkit_$$ && "Gecko" == $navigator$$inline_77$$.product
}
var $goog$userAgent$OPERA$$ = $goog$userAgent$detectedOpera_$$, $goog$userAgent$IE$$ = $goog$userAgent$detectedIe_$$, $goog$userAgent$GECKO$$ = $goog$userAgent$detectedGecko_$$, $goog$userAgent$WEBKIT$$ = $goog$userAgent$detectedWebkit_$$, $navigator$$inline_79$$ = $goog$userAgent$getNavigator$$();
$goog$userAgent$detectedMac_$$ = -1 != ($navigator$$inline_79$$ && $navigator$$inline_79$$.platform || "").indexOf("Mac");
var $goog$userAgent$X11$$ = !!$goog$userAgent$getNavigator$$() && -1 != ($goog$userAgent$getNavigator$$().appVersion || "").indexOf("X11"), $goog$userAgent$VERSION$$;
a: {
  var $version$$inline_82$$ = "", $re$$inline_83$$;
  if($goog$userAgent$OPERA$$ && $goog$global$$.opera) {
    var $operaVersion$$inline_84$$ = $goog$global$$.opera.version, $version$$inline_82$$ = "function" == typeof $operaVersion$$inline_84$$ ? $operaVersion$$inline_84$$() : $operaVersion$$inline_84$$
  }else {
    if($goog$userAgent$GECKO$$ ? $re$$inline_83$$ = /rv\:([^\);]+)(\)|;)/ : $goog$userAgent$IE$$ ? $re$$inline_83$$ = /MSIE\s+([^\);]+)(\)|;)/ : $goog$userAgent$WEBKIT$$ && ($re$$inline_83$$ = /WebKit\/(\S+)/), $re$$inline_83$$) {
      var $arr$$inline_85$$ = $re$$inline_83$$.exec($goog$userAgent$getUserAgentString$$()), $version$$inline_82$$ = $arr$$inline_85$$ ? $arr$$inline_85$$[1] : ""
    }
  }
  if($goog$userAgent$IE$$) {
    var $docMode$$inline_86$$, $doc$$inline_817$$ = $goog$global$$.document;
    $docMode$$inline_86$$ = $doc$$inline_817$$ ? $doc$$inline_817$$.documentMode : $JSCompiler_alias_VOID$$;
    if($docMode$$inline_86$$ > parseFloat($version$$inline_82$$)) {
      $goog$userAgent$VERSION$$ = String($docMode$$inline_86$$);
      break a
    }
  }
  $goog$userAgent$VERSION$$ = $version$$inline_82$$
}
var $goog$userAgent$isVersionCache_$$ = {};
function $goog$userAgent$isVersion$$($version$$8$$) {
  var $JSCompiler_temp$$61_order$$inline_90$$;
  if(!($JSCompiler_temp$$61_order$$inline_90$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$])) {
    $JSCompiler_temp$$61_order$$inline_90$$ = 0;
    for(var $v1Subs$$inline_91$$ = $goog$string$trim$$(String($goog$userAgent$VERSION$$)).split("."), $v2Subs$$inline_92$$ = $goog$string$trim$$(String($version$$8$$)).split("."), $subCount$$inline_93$$ = Math.max($v1Subs$$inline_91$$.length, $v2Subs$$inline_92$$.length), $subIdx$$inline_94$$ = 0;0 == $JSCompiler_temp$$61_order$$inline_90$$ && $subIdx$$inline_94$$ < $subCount$$inline_93$$;$subIdx$$inline_94$$++) {
      var $v1Sub$$inline_95$$ = $v1Subs$$inline_91$$[$subIdx$$inline_94$$] || "", $v2Sub$$inline_96$$ = $v2Subs$$inline_92$$[$subIdx$$inline_94$$] || "", $v1CompParser$$inline_97$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$inline_98$$ = RegExp("(\\d*)(\\D*)", "g");
      do {
        var $v1Comp$$inline_99$$ = $v1CompParser$$inline_97$$.exec($v1Sub$$inline_95$$) || ["", "", ""], $v2Comp$$inline_100$$ = $v2CompParser$$inline_98$$.exec($v2Sub$$inline_96$$) || ["", "", ""];
        if(0 == $v1Comp$$inline_99$$[0].length && 0 == $v2Comp$$inline_100$$[0].length) {
          break
        }
        $JSCompiler_temp$$61_order$$inline_90$$ = ((0 == $v1Comp$$inline_99$$[1].length ? 0 : parseInt($v1Comp$$inline_99$$[1], 10)) < (0 == $v2Comp$$inline_100$$[1].length ? 0 : parseInt($v2Comp$$inline_100$$[1], 10)) ? -1 : (0 == $v1Comp$$inline_99$$[1].length ? 0 : parseInt($v1Comp$$inline_99$$[1], 10)) > (0 == $v2Comp$$inline_100$$[1].length ? 0 : parseInt($v2Comp$$inline_100$$[1], 10)) ? 1 : 0) || ((0 == $v1Comp$$inline_99$$[2].length) < (0 == $v2Comp$$inline_100$$[2].length) ? -1 : (0 == $v1Comp$$inline_99$$[2].length) > 
        (0 == $v2Comp$$inline_100$$[2].length) ? 1 : 0) || ($v1Comp$$inline_99$$[2] < $v2Comp$$inline_100$$[2] ? -1 : $v1Comp$$inline_99$$[2] > $v2Comp$$inline_100$$[2] ? 1 : 0)
      }while(0 == $JSCompiler_temp$$61_order$$inline_90$$)
    }
    $JSCompiler_temp$$61_order$$inline_90$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$] = 0 <= $JSCompiler_temp$$61_order$$inline_90$$
  }
  return $JSCompiler_temp$$61_order$$inline_90$$
}
var $goog$userAgent$isDocumentModeCache_$$ = {};
function $goog$userAgent$isDocumentMode$$($documentMode$$) {
  return $goog$userAgent$isDocumentModeCache_$$[$documentMode$$] || ($goog$userAgent$isDocumentModeCache_$$[$documentMode$$] = $goog$userAgent$IE$$ && !!document.documentMode && document.documentMode >= $documentMode$$)
}
;var $goog$dom$defaultDomHelper_$$, $goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ = !$goog$userAgent$IE$$ || $goog$userAgent$isDocumentMode$$(9);
!$goog$userAgent$GECKO$$ && !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && $goog$userAgent$isDocumentMode$$(9) || $goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9.1");
$goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("9");
var $goog$dom$BrowserFeature$CAN_USE_PARENT_ELEMENT_PROPERTY$$ = $goog$userAgent$IE$$ || $goog$userAgent$OPERA$$ || $goog$userAgent$WEBKIT$$;
function $goog$dom$classes$get$$($className$$4_element$$7$$) {
  $className$$4_element$$7$$ = $className$$4_element$$7$$.className;
  return $goog$isString$$($className$$4_element$$7$$) && $className$$4_element$$7$$.match(/\S+/g) || []
}
function $goog$dom$classes$add$$($element$$8$$, $var_args$$45$$) {
  var $classes$$ = $goog$dom$classes$get$$($element$$8$$), $args$$3$$ = $goog$array$slice$$(arguments, 1), $expectedCount$$ = $classes$$.length + $args$$3$$.length;
  $goog$dom$classes$add_$$($classes$$, $args$$3$$);
  $element$$8$$.className = $classes$$.join(" ");
  return $classes$$.length == $expectedCount$$
}
function $goog$dom$classes$remove$$($element$$9$$, $var_args$$46$$) {
  var $classes$$1$$ = $goog$dom$classes$get$$($element$$9$$), $args$$4$$ = $goog$array$slice$$(arguments, 1), $newClasses$$ = $goog$dom$classes$getDifference_$$($classes$$1$$, $args$$4$$);
  $element$$9$$.className = $newClasses$$.join(" ");
  return $newClasses$$.length == $classes$$1$$.length - $args$$4$$.length
}
function $goog$dom$classes$add_$$($classes$$2$$, $args$$5$$) {
  for(var $i$$40$$ = 0;$i$$40$$ < $args$$5$$.length;$i$$40$$++) {
    $goog$array$contains$$($classes$$2$$, $args$$5$$[$i$$40$$]) || $classes$$2$$.push($args$$5$$[$i$$40$$])
  }
}
function $goog$dom$classes$getDifference_$$($arr1$$4$$, $arr2$$12$$) {
  return $goog$array$filter$$($arr1$$4$$, function($item$$) {
    return!$goog$array$contains$$($arr2$$12$$, $item$$)
  })
}
function $goog$dom$classes$addRemove$$($element$$11$$, $classesToRemove$$, $classesToAdd$$) {
  var $classes$$4$$ = $goog$dom$classes$get$$($element$$11$$);
  $goog$isString$$($classesToRemove$$) ? $goog$array$remove$$($classes$$4$$, $classesToRemove$$) : $goog$isArray$$($classesToRemove$$) && ($classes$$4$$ = $goog$dom$classes$getDifference_$$($classes$$4$$, $classesToRemove$$));
  $goog$isString$$($classesToAdd$$) && !$goog$array$contains$$($classes$$4$$, $classesToAdd$$) ? $classes$$4$$.push($classesToAdd$$) : $goog$isArray$$($classesToAdd$$) && $goog$dom$classes$add_$$($classes$$4$$, $classesToAdd$$);
  $element$$11$$.className = $classes$$4$$.join(" ")
}
;function $goog$math$Coordinate$$($opt_x$$, $opt_y$$) {
  this.x = $goog$isDef$$($opt_x$$) ? $opt_x$$ : 0;
  this.y = $goog$isDef$$($opt_y$$) ? $opt_y$$ : 0
}
;function $goog$math$Size$$($width$$12$$, $height$$11$$) {
  this.width = $width$$12$$;
  this.height = $height$$11$$
}
$goog$math$Size$$.prototype.floor = function $$goog$math$Size$$$$floor$() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
$goog$math$Size$$.prototype.round = function $$goog$math$Size$$$$round$() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
function $goog$object$forEach$$($obj$$30$$, $f$$18$$) {
  for(var $key$$18$$ in $obj$$30$$) {
    $f$$18$$.call($JSCompiler_alias_VOID$$, $obj$$30$$[$key$$18$$], $key$$18$$, $obj$$30$$)
  }
}
var $goog$object$PROTOTYPE_FIELDS_$$ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function $goog$object$extend$$($target$$42$$, $var_args$$51$$) {
  for(var $key$$41$$, $source$$2$$, $i$$47$$ = 1;$i$$47$$ < arguments.length;$i$$47$$++) {
    $source$$2$$ = arguments[$i$$47$$];
    for($key$$41$$ in $source$$2$$) {
      $target$$42$$[$key$$41$$] = $source$$2$$[$key$$41$$]
    }
    for(var $j$$5$$ = 0;$j$$5$$ < $goog$object$PROTOTYPE_FIELDS_$$.length;$j$$5$$++) {
      $key$$41$$ = $goog$object$PROTOTYPE_FIELDS_$$[$j$$5$$], Object.prototype.hasOwnProperty.call($source$$2$$, $key$$41$$) && ($target$$42$$[$key$$41$$] = $source$$2$$[$key$$41$$])
    }
  }
}
;function $goog$dom$getDomHelper$$($opt_element$$10$$) {
  return $opt_element$$10$$ ? new $goog$dom$DomHelper$$($goog$dom$getOwnerDocument$$($opt_element$$10$$)) : $goog$dom$defaultDomHelper_$$ || ($goog$dom$defaultDomHelper_$$ = new $goog$dom$DomHelper$$)
}
function $goog$dom$getElementsByTagNameAndClass_$$() {
  var $el$$1_parent$$5$$, $i$$50$$, $len$$, $arrayLike$$;
  $el$$1_parent$$5$$ = document;
  if($el$$1_parent$$5$$.querySelectorAll && $el$$1_parent$$5$$.querySelector) {
    return $el$$1_parent$$5$$.querySelectorAll(".openseadragon-container")
  }
  if($el$$1_parent$$5$$.getElementsByClassName) {
    var $els$$ = $el$$1_parent$$5$$.getElementsByClassName("openseadragon-container");
    return $els$$
  }
  $els$$ = $el$$1_parent$$5$$.getElementsByTagName("*");
  $arrayLike$$ = {};
  for($i$$50$$ = $len$$ = 0;$el$$1_parent$$5$$ = $els$$[$i$$50$$];$i$$50$$++) {
    var $className$$10$$ = $el$$1_parent$$5$$.className;
    "function" == typeof $className$$10$$.split && $goog$array$contains$$($className$$10$$.split(/\s+/), "openseadragon-container") && ($arrayLike$$[$len$$++] = $el$$1_parent$$5$$)
  }
  $arrayLike$$.length = $len$$;
  return $arrayLike$$
}
function $goog$dom$setProperties$$($element$$16$$, $properties$$) {
  $goog$object$forEach$$($properties$$, function($val$$20$$, $key$$42$$) {
    "style" == $key$$42$$ ? $element$$16$$.style.cssText = $val$$20$$ : "class" == $key$$42$$ ? $element$$16$$.className = $val$$20$$ : "for" == $key$$42$$ ? $element$$16$$.htmlFor = $val$$20$$ : $key$$42$$ in $goog$dom$DIRECT_ATTRIBUTE_MAP_$$ ? $element$$16$$.setAttribute($goog$dom$DIRECT_ATTRIBUTE_MAP_$$[$key$$42$$], $val$$20$$) : 0 == $key$$42$$.lastIndexOf("aria-", 0) || 0 == $key$$42$$.lastIndexOf("data-", 0) ? $element$$16$$.setAttribute($key$$42$$, $val$$20$$) : $element$$16$$[$key$$42$$] = 
    $val$$20$$
  })
}
var $goog$dom$DIRECT_ATTRIBUTE_MAP_$$ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
function $goog$dom$createDom$$($tagName$$2$$, $opt_attributes$$, $var_args$$54$$) {
  var $args$$inline_106$$ = arguments, $doc$$inline_107$$ = document, $element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$ = $args$$inline_106$$[0], $attributes$$inline_109$$ = $args$$inline_106$$[1];
  if(!$goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ && $attributes$$inline_109$$ && ($attributes$$inline_109$$.name || $attributes$$inline_109$$.type)) {
    $element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$ = ["<", $element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$];
    $attributes$$inline_109$$.name && $element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$.push(' name="', $goog$string$htmlEscape$$($attributes$$inline_109$$.name), '"');
    if($attributes$$inline_109$$.type) {
      $element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$.push(' type="', $goog$string$htmlEscape$$($attributes$$inline_109$$.type), '"');
      var $clone$$inline_111$$ = {};
      $goog$object$extend$$($clone$$inline_111$$, $attributes$$inline_109$$);
      delete $clone$$inline_111$$.type;
      $attributes$$inline_109$$ = $clone$$inline_111$$
    }
    $element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$.push(">");
    $element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$ = $element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$.join("")
  }
  $element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$ = $doc$$inline_107$$.createElement($element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$);
  $attributes$$inline_109$$ && ($goog$isString$$($attributes$$inline_109$$) ? $element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$.className = $attributes$$inline_109$$ : $goog$isArray$$($attributes$$inline_109$$) ? $goog$dom$classes$add$$.apply($JSCompiler_alias_NULL$$, [$element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$].concat($attributes$$inline_109$$)) : $goog$dom$setProperties$$($element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$, $attributes$$inline_109$$));
  2 < $args$$inline_106$$.length && $goog$dom$append_$$($doc$$inline_107$$, $element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$, $args$$inline_106$$, 2);
  return $element$$inline_112_tagName$$inline_108_tagNameArr$$inline_110$$
}
function $goog$dom$append_$$($doc$$12$$, $parent$$6$$, $args$$7$$, $i$$51_startIndex$$) {
  function $childHandler$$($child$$1$$) {
    $child$$1$$ && $parent$$6$$.appendChild($goog$isString$$($child$$1$$) ? $doc$$12$$.createTextNode($child$$1$$) : $child$$1$$)
  }
  for(;$i$$51_startIndex$$ < $args$$7$$.length;$i$$51_startIndex$$++) {
    var $arg$$5$$ = $args$$7$$[$i$$51_startIndex$$];
    if($goog$isArrayLike$$($arg$$5$$) && !($goog$isObject$$($arg$$5$$) && 0 < $arg$$5$$.nodeType)) {
      var $JSCompiler_inline_result$$47$$;
      a: {
        if($arg$$5$$ && "number" == typeof $arg$$5$$.length) {
          if($goog$isObject$$($arg$$5$$)) {
            $JSCompiler_inline_result$$47$$ = "function" == typeof $arg$$5$$.item || "string" == typeof $arg$$5$$.item;
            break a
          }
          if($goog$isFunction$$($arg$$5$$)) {
            $JSCompiler_inline_result$$47$$ = "function" == typeof $arg$$5$$.item;
            break a
          }
        }
        $JSCompiler_inline_result$$47$$ = $JSCompiler_alias_FALSE$$
      }
      $goog$array$forEach$$($JSCompiler_inline_result$$47$$ ? $goog$array$toArray$$($arg$$5$$) : $arg$$5$$, $childHandler$$)
    }else {
      $childHandler$$($arg$$5$$)
    }
  }
}
function $goog$dom$removeChildren$$($node$$3$$) {
  for(var $child$$3$$;$child$$3$$ = $node$$3$$.firstChild;) {
    $node$$3$$.removeChild($child$$3$$)
  }
}
function $goog$dom$removeNode$$($node$$4$$) {
  $node$$4$$ && $node$$4$$.parentNode && $node$$4$$.parentNode.removeChild($node$$4$$)
}
function $goog$dom$isElement$$($obj$$59$$) {
  return $goog$isObject$$($obj$$59$$) && 1 == $obj$$59$$.nodeType
}
function $goog$dom$contains$$($parent$$13$$, $descendant$$) {
  if($parent$$13$$.contains && 1 == $descendant$$.nodeType) {
    return $parent$$13$$ == $descendant$$ || $parent$$13$$.contains($descendant$$)
  }
  if("undefined" != typeof $parent$$13$$.compareDocumentPosition) {
    return $parent$$13$$ == $descendant$$ || Boolean($parent$$13$$.compareDocumentPosition($descendant$$) & 16)
  }
  for(;$descendant$$ && $parent$$13$$ != $descendant$$;) {
    $descendant$$ = $descendant$$.parentNode
  }
  return $descendant$$ == $parent$$13$$
}
function $goog$dom$getOwnerDocument$$($node$$15$$) {
  return 9 == $node$$15$$.nodeType ? $node$$15$$ : $node$$15$$.ownerDocument || $node$$15$$.document
}
function $goog$dom$isFocusableTabIndex$$($element$$23_index$$53$$) {
  var $attrNode$$ = $element$$23_index$$53$$.getAttributeNode("tabindex");
  return $attrNode$$ && $attrNode$$.specified ? ($element$$23_index$$53$$ = $element$$23_index$$53$$.tabIndex, "number" == typeof $element$$23_index$$53$$ && 0 <= $element$$23_index$$53$$ && 32768 > $element$$23_index$$53$$) : $JSCompiler_alias_FALSE$$
}
function $goog$dom$DomHelper$$($opt_document$$) {
  this.$document_$ = $opt_document$$ || $goog$global$$.document || document
}
$JSCompiler_prototypeAlias$$ = $goog$dom$DomHelper$$.prototype;
$JSCompiler_prototypeAlias$$.$getDomHelper$ = $goog$dom$getDomHelper$$;
$JSCompiler_prototypeAlias$$.$getElement$ = function $$JSCompiler_prototypeAlias$$$$getElement$$($element$$28$$) {
  return $goog$isString$$($element$$28$$) ? this.$document_$.getElementById($element$$28$$) : $element$$28$$
};
$JSCompiler_prototypeAlias$$.$setProperties$ = $goog$dom$setProperties$$;
$JSCompiler_prototypeAlias$$.createElement = function $$JSCompiler_prototypeAlias$$$createElement$($name$$61$$) {
  return this.$document_$.createElement($name$$61$$)
};
$JSCompiler_prototypeAlias$$.createTextNode = function $$JSCompiler_prototypeAlias$$$createTextNode$($content$$1$$) {
  return this.$document_$.createTextNode($content$$1$$)
};
function $JSCompiler_StaticMethods_getDocumentScroll$$($JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_117$$) {
  var $doc$$inline_116_win$$inline_118$$ = $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_117$$.$document_$, $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_117$$ = !$goog$userAgent$WEBKIT$$ ? $doc$$inline_116_win$$inline_118$$.documentElement : $doc$$inline_116_win$$inline_118$$.body, $doc$$inline_116_win$$inline_118$$ = $doc$$inline_116_win$$inline_118$$.parentWindow || $doc$$inline_116_win$$inline_118$$.defaultView;
  return new $goog$math$Coordinate$$($doc$$inline_116_win$$inline_118$$.pageXOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_117$$.scrollLeft, $doc$$inline_116_win$$inline_118$$.pageYOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_117$$.scrollTop)
}
$JSCompiler_prototypeAlias$$.appendChild = function $$JSCompiler_prototypeAlias$$$appendChild$($parent$$7$$, $child$$2$$) {
  $parent$$7$$.appendChild($child$$2$$)
};
$JSCompiler_prototypeAlias$$.append = function $$JSCompiler_prototypeAlias$$$append$($parent$$8$$, $var_args$$55$$) {
  $goog$dom$append_$$($goog$dom$getOwnerDocument$$($parent$$8$$), $parent$$8$$, arguments, 1)
};
$JSCompiler_prototypeAlias$$.contains = $goog$dom$contains$$;
var $goog$functions$TRUE$$;
$goog$functions$TRUE$$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
/*
 Portions of this code are from the Dojo Toolkit, received by
 The Closure Library Authors under the BSD license. All other code is
 Copyright 2005-2009 The Closure Library Authors. All Rights Reserved.

The "New" BSD License:

Copyright (c) 2005-2009, The Dojo Foundation
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.
 Neither the name of the Dojo Foundation nor the names of its contributors
    may be used to endorse or promote products derived from this software
    without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function $getArr$$inline_122$$($i$$inline_160$$, $opt_arr$$inline_161$$) {
  var $r$$inline_162$$ = $opt_arr$$inline_161$$ || [];
  $i$$inline_160$$ && $r$$inline_162$$.push($i$$inline_160$$);
  return $r$$inline_162$$
}
var $cssCaseBug$$inline_123$$ = $goog$userAgent$WEBKIT$$ && "BackCompat" == document.compatMode, $childNodesName$$inline_124$$ = document.firstChild.children ? "children" : "childNodes", $caseSensitive$$inline_125$$ = $JSCompiler_alias_FALSE$$;
function $getQueryParts$$inline_126$$($query$$inline_163$$) {
  function $endAll$$inline_183$$() {
    0 <= $inId$$inline_171$$ && ($currentPart$$inline_178$$.id = $ts$$inline_164$$($inId$$inline_171$$, $x$$inline_176$$).replace(/\\/g, ""), $inId$$inline_171$$ = -1);
    if(0 <= $inTag$$inline_172$$) {
      var $tv$$inline_820$$ = $inTag$$inline_172$$ == $x$$inline_176$$ ? $JSCompiler_alias_NULL$$ : $ts$$inline_164$$($inTag$$inline_172$$, $x$$inline_176$$);
      0 > ">~+".indexOf($tv$$inline_820$$) ? $currentPart$$inline_178$$.$tag$ = $tv$$inline_820$$ : $currentPart$$inline_178$$.$oper$ = $tv$$inline_820$$;
      $inTag$$inline_172$$ = -1
    }
    0 <= $inClass$$inline_170$$ && ($currentPart$$inline_178$$.$classes$.push($ts$$inline_164$$($inClass$$inline_170$$ + 1, $x$$inline_176$$).replace(/\\/g, "")), $inClass$$inline_170$$ = -1)
  }
  function $ts$$inline_164$$($s$$inline_187$$, $e$$inline_188$$) {
    return $goog$string$trim$$($query$$inline_163$$.slice($s$$inline_187$$, $e$$inline_188$$))
  }
  for(var $query$$inline_163$$ = 0 <= ">~+".indexOf($query$$inline_163$$.slice(-1)) ? $query$$inline_163$$ + " * " : $query$$inline_163$$ + " ", $queryParts$$inline_165$$ = [], $cmf$$inline_185_inBrackets$$inline_166$$ = -1, $inParens$$inline_167$$ = -1, $addToCc$$inline_186_inMatchFor$$inline_168$$ = -1, $inPseudo$$inline_169$$ = -1, $inClass$$inline_170$$ = -1, $inId$$inline_171$$ = -1, $inTag$$inline_172$$ = -1, $lc$$inline_173$$ = "", $cc$$inline_174$$ = "", $pStart$$inline_175$$, $x$$inline_176$$ = 
  0, $ql$$inline_177$$ = $query$$inline_163$$.length, $currentPart$$inline_178$$ = $JSCompiler_alias_NULL$$, $cp$$inline_179$$ = $JSCompiler_alias_NULL$$;$lc$$inline_173$$ = $cc$$inline_174$$, $cc$$inline_174$$ = $query$$inline_163$$.charAt($x$$inline_176$$), $x$$inline_176$$ < $ql$$inline_177$$;$x$$inline_176$$++) {
    if("\\" != $lc$$inline_173$$) {
      if($currentPart$$inline_178$$ || ($pStart$$inline_175$$ = $x$$inline_176$$, $currentPart$$inline_178$$ = {$query$:$JSCompiler_alias_NULL$$, $pseudos$:[], $attrs$:[], $classes$:[], $tag$:$JSCompiler_alias_NULL$$, $oper$:$JSCompiler_alias_NULL$$, id:$JSCompiler_alias_NULL$$, $getTag$:function $$currentPart$$inline_178$$$$getTag$$() {
        return $caseSensitive$$inline_125$$ ? this.$otag$ : this.$tag$
      }}, $inTag$$inline_172$$ = $x$$inline_176$$), 0 <= $cmf$$inline_185_inBrackets$$inline_166$$) {
        if("]" == $cc$$inline_174$$) {
          $cp$$inline_179$$.$attr$ ? $cp$$inline_179$$.$matchFor$ = $ts$$inline_164$$($addToCc$$inline_186_inMatchFor$$inline_168$$ || $cmf$$inline_185_inBrackets$$inline_166$$ + 1, $x$$inline_176$$) : $cp$$inline_179$$.$attr$ = $ts$$inline_164$$($cmf$$inline_185_inBrackets$$inline_166$$ + 1, $x$$inline_176$$);
          if(($cmf$$inline_185_inBrackets$$inline_166$$ = $cp$$inline_179$$.$matchFor$) && ('"' == $cmf$$inline_185_inBrackets$$inline_166$$.charAt(0) || "'" == $cmf$$inline_185_inBrackets$$inline_166$$.charAt(0))) {
            $cp$$inline_179$$.$matchFor$ = $cmf$$inline_185_inBrackets$$inline_166$$.slice(1, -1)
          }
          $currentPart$$inline_178$$.$attrs$.push($cp$$inline_179$$);
          $cp$$inline_179$$ = $JSCompiler_alias_NULL$$;
          $cmf$$inline_185_inBrackets$$inline_166$$ = $addToCc$$inline_186_inMatchFor$$inline_168$$ = -1
        }else {
          "=" == $cc$$inline_174$$ && ($addToCc$$inline_186_inMatchFor$$inline_168$$ = 0 <= "|~^$*".indexOf($lc$$inline_173$$) ? $lc$$inline_173$$ : "", $cp$$inline_179$$.type = $addToCc$$inline_186_inMatchFor$$inline_168$$ + $cc$$inline_174$$, $cp$$inline_179$$.$attr$ = $ts$$inline_164$$($cmf$$inline_185_inBrackets$$inline_166$$ + 1, $x$$inline_176$$ - $addToCc$$inline_186_inMatchFor$$inline_168$$.length), $addToCc$$inline_186_inMatchFor$$inline_168$$ = $x$$inline_176$$ + 1)
        }
      }else {
        0 <= $inParens$$inline_167$$ ? ")" == $cc$$inline_174$$ && (0 <= $inPseudo$$inline_169$$ && ($cp$$inline_179$$.value = $ts$$inline_164$$($inParens$$inline_167$$ + 1, $x$$inline_176$$)), $inPseudo$$inline_169$$ = $inParens$$inline_167$$ = -1) : "#" == $cc$$inline_174$$ ? ($endAll$$inline_183$$(), $inId$$inline_171$$ = $x$$inline_176$$ + 1) : "." == $cc$$inline_174$$ ? ($endAll$$inline_183$$(), $inClass$$inline_170$$ = $x$$inline_176$$) : ":" == $cc$$inline_174$$ ? ($endAll$$inline_183$$(), 
        $inPseudo$$inline_169$$ = $x$$inline_176$$) : "[" == $cc$$inline_174$$ ? ($endAll$$inline_183$$(), $cmf$$inline_185_inBrackets$$inline_166$$ = $x$$inline_176$$, $cp$$inline_179$$ = {}) : "(" == $cc$$inline_174$$ ? (0 <= $inPseudo$$inline_169$$ && ($cp$$inline_179$$ = {name:$ts$$inline_164$$($inPseudo$$inline_169$$ + 1, $x$$inline_176$$), value:$JSCompiler_alias_NULL$$}, $currentPart$$inline_178$$.$pseudos$.push($cp$$inline_179$$)), $inParens$$inline_167$$ = $x$$inline_176$$) : " " == $cc$$inline_174$$ && 
        $lc$$inline_173$$ != $cc$$inline_174$$ && ($endAll$$inline_183$$(), 0 <= $inPseudo$$inline_169$$ && $currentPart$$inline_178$$.$pseudos$.push({name:$ts$$inline_164$$($inPseudo$$inline_169$$ + 1, $x$$inline_176$$)}), $currentPart$$inline_178$$.$loops$ = $currentPart$$inline_178$$.$pseudos$.length || $currentPart$$inline_178$$.$attrs$.length || $currentPart$$inline_178$$.$classes$.length, $currentPart$$inline_178$$.$oquery$ = $currentPart$$inline_178$$.$query$ = $ts$$inline_164$$($pStart$$inline_175$$, 
        $x$$inline_176$$), $currentPart$$inline_178$$.$otag$ = $currentPart$$inline_178$$.$tag$ = $currentPart$$inline_178$$.$oper$ ? $JSCompiler_alias_NULL$$ : $currentPart$$inline_178$$.$tag$ || "*", $currentPart$$inline_178$$.$tag$ && ($currentPart$$inline_178$$.$tag$ = $currentPart$$inline_178$$.$tag$.toUpperCase()), $queryParts$$inline_165$$.length && $queryParts$$inline_165$$[$queryParts$$inline_165$$.length - 1].$oper$ && ($currentPart$$inline_178$$.$infixOper$ = $queryParts$$inline_165$$.pop(), 
        $currentPart$$inline_178$$.$query$ = $currentPart$$inline_178$$.$infixOper$.$query$ + " " + $currentPart$$inline_178$$.$query$), $queryParts$$inline_165$$.push($currentPart$$inline_178$$), $currentPart$$inline_178$$ = $JSCompiler_alias_NULL$$)
      }
    }
  }
  return $queryParts$$inline_165$$
}
function $agree$$inline_127$$($first$$inline_190$$, $second$$inline_191$$) {
  return!$first$$inline_190$$ ? $second$$inline_191$$ : !$second$$inline_191$$ ? $first$$inline_190$$ : function() {
    return $first$$inline_190$$.apply(window, arguments) && $second$$inline_191$$.apply(window, arguments)
  }
}
function $isElement$$inline_128$$($n$$inline_192$$) {
  return 1 == $n$$inline_192$$.nodeType
}
function $getAttr$$inline_129$$($elem$$inline_193$$, $attr$$inline_194$$) {
  return!$elem$$inline_193$$ ? "" : "class" == $attr$$inline_194$$ ? $elem$$inline_193$$.className || "" : "for" == $attr$$inline_194$$ ? $elem$$inline_193$$.htmlFor || "" : "style" == $attr$$inline_194$$ ? $elem$$inline_193$$.style.cssText || "" : ($caseSensitive$$inline_125$$ ? $elem$$inline_193$$.getAttribute($attr$$inline_194$$) : $elem$$inline_193$$.getAttribute($attr$$inline_194$$, 2)) || ""
}
var $attrs$$inline_130$$ = {"*=":function($attr$$inline_195$$, $value$$inline_196$$) {
  return function($elem$$inline_197$$) {
    return 0 <= $getAttr$$inline_129$$($elem$$inline_197$$, $attr$$inline_195$$).indexOf($value$$inline_196$$)
  }
}, "^=":function($attr$$inline_198$$, $value$$inline_199$$) {
  return function($elem$$inline_200$$) {
    return 0 == $getAttr$$inline_129$$($elem$$inline_200$$, $attr$$inline_198$$).indexOf($value$$inline_199$$)
  }
}, "$=":function($attr$$inline_201$$, $value$$inline_202$$) {
  return function($ea$$inline_204_elem$$inline_203$$) {
    $ea$$inline_204_elem$$inline_203$$ = " " + $getAttr$$inline_129$$($ea$$inline_204_elem$$inline_203$$, $attr$$inline_201$$);
    return $ea$$inline_204_elem$$inline_203$$.lastIndexOf($value$$inline_202$$) == $ea$$inline_204_elem$$inline_203$$.length - $value$$inline_202$$.length
  }
}, "~=":function($attr$$inline_205$$, $value$$inline_206$$) {
  var $tval$$inline_207$$ = " " + $value$$inline_206$$ + " ";
  return function($elem$$inline_208$$) {
    return 0 <= (" " + $getAttr$$inline_129$$($elem$$inline_208$$, $attr$$inline_205$$) + " ").indexOf($tval$$inline_207$$)
  }
}, "|=":function($attr$$inline_209$$, $value$$inline_210$$) {
  $value$$inline_210$$ = " " + $value$$inline_210$$;
  return function($ea$$inline_212_elem$$inline_211$$) {
    $ea$$inline_212_elem$$inline_211$$ = " " + $getAttr$$inline_129$$($ea$$inline_212_elem$$inline_211$$, $attr$$inline_209$$);
    return $ea$$inline_212_elem$$inline_211$$ == $value$$inline_210$$ || 0 == $ea$$inline_212_elem$$inline_211$$.indexOf($value$$inline_210$$ + "-")
  }
}, "=":function($attr$$inline_213$$, $value$$inline_214$$) {
  return function($elem$$inline_215$$) {
    return $getAttr$$inline_129$$($elem$$inline_215$$, $attr$$inline_213$$) == $value$$inline_214$$
  }
}}, $noNextElementSibling$$inline_131$$ = "undefined" == typeof document.firstChild.nextElementSibling, $nSibling$$inline_132$$ = !$noNextElementSibling$$inline_131$$ ? "nextElementSibling" : "nextSibling", $pSibling$$inline_133$$ = !$noNextElementSibling$$inline_131$$ ? "previousElementSibling" : "previousSibling", $simpleNodeTest$$inline_134$$ = $noNextElementSibling$$inline_131$$ ? $isElement$$inline_128$$ : $goog$functions$TRUE$$;
function $_lookLeft$$inline_135$$($node$$inline_216$$) {
  for(;$node$$inline_216$$ = $node$$inline_216$$[$pSibling$$inline_133$$];) {
    if($simpleNodeTest$$inline_134$$($node$$inline_216$$)) {
      return $JSCompiler_alias_FALSE$$
    }
  }
  return $JSCompiler_alias_TRUE$$
}
function $_lookRight$$inline_136$$($node$$inline_217$$) {
  for(;$node$$inline_217$$ = $node$$inline_217$$[$nSibling$$inline_132$$];) {
    if($simpleNodeTest$$inline_134$$($node$$inline_217$$)) {
      return $JSCompiler_alias_FALSE$$
    }
  }
  return $JSCompiler_alias_TRUE$$
}
function $getNodeIndex$$inline_137$$($node$$inline_218$$) {
  var $root$$inline_219_te$$inline_225$$ = $node$$inline_218$$.parentNode, $i$$inline_220$$ = 0, $l$$inline_224_tret$$inline_221$$ = $root$$inline_219_te$$inline_225$$[$childNodesName$$inline_124$$], $ci$$inline_222$$ = $node$$inline_218$$._i || -1, $cl$$inline_223$$ = $root$$inline_219_te$$inline_225$$._l || -1;
  if(!$l$$inline_224_tret$$inline_221$$) {
    return-1
  }
  $l$$inline_224_tret$$inline_221$$ = $l$$inline_224_tret$$inline_221$$.length;
  if($cl$$inline_223$$ == $l$$inline_224_tret$$inline_221$$ && 0 <= $ci$$inline_222$$ && 0 <= $cl$$inline_223$$) {
    return $ci$$inline_222$$
  }
  $root$$inline_219_te$$inline_225$$._l = $l$$inline_224_tret$$inline_221$$;
  $ci$$inline_222$$ = -1;
  for($root$$inline_219_te$$inline_225$$ = $root$$inline_219_te$$inline_225$$.firstElementChild || $root$$inline_219_te$$inline_225$$.firstChild;$root$$inline_219_te$$inline_225$$;$root$$inline_219_te$$inline_225$$ = $root$$inline_219_te$$inline_225$$[$nSibling$$inline_132$$]) {
    $simpleNodeTest$$inline_134$$($root$$inline_219_te$$inline_225$$) && ($root$$inline_219_te$$inline_225$$._i = ++$i$$inline_220$$, $node$$inline_218$$ === $root$$inline_219_te$$inline_225$$ && ($ci$$inline_222$$ = $i$$inline_220$$))
  }
  return $ci$$inline_222$$
}
function $isEven$$inline_138$$($elem$$inline_226$$) {
  return!($getNodeIndex$$inline_137$$($elem$$inline_226$$) % 2)
}
function $isOdd$$inline_139$$($elem$$inline_227$$) {
  return $getNodeIndex$$inline_137$$($elem$$inline_227$$) % 2
}
var $pseudos$$inline_140$$ = {checked:function() {
  return function($elem$$inline_228$$) {
    return $elem$$inline_228$$.checked || $elem$$inline_228$$.attributes.checked
  }
}, "first-child":function() {
  return $_lookLeft$$inline_135$$
}, "last-child":function() {
  return $_lookRight$$inline_136$$
}, "only-child":function() {
  return function($node$$inline_229$$) {
    return!$_lookLeft$$inline_135$$($node$$inline_229$$) || !$_lookRight$$inline_136$$($node$$inline_229$$) ? $JSCompiler_alias_FALSE$$ : $JSCompiler_alias_TRUE$$
  }
}, empty:function() {
  return function($elem$$inline_230_x$$inline_232$$) {
    for(var $cn$$inline_231$$ = $elem$$inline_230_x$$inline_232$$.childNodes, $elem$$inline_230_x$$inline_232$$ = $elem$$inline_230_x$$inline_232$$.childNodes.length - 1;0 <= $elem$$inline_230_x$$inline_232$$;$elem$$inline_230_x$$inline_232$$--) {
      var $nt$$inline_233$$ = $cn$$inline_231$$[$elem$$inline_230_x$$inline_232$$].nodeType;
      if(1 === $nt$$inline_233$$ || 3 == $nt$$inline_233$$) {
        return $JSCompiler_alias_FALSE$$
      }
    }
    return $JSCompiler_alias_TRUE$$
  }
}, contains:function($name$$inline_234$$, $condition$$inline_235$$) {
  var $cz$$inline_236$$ = $condition$$inline_235$$.charAt(0);
  if('"' == $cz$$inline_236$$ || "'" == $cz$$inline_236$$) {
    $condition$$inline_235$$ = $condition$$inline_235$$.slice(1, -1)
  }
  return function($elem$$inline_237$$) {
    return 0 <= $elem$$inline_237$$.innerHTML.indexOf($condition$$inline_235$$)
  }
}, not:function($name$$inline_238$$, $condition$$inline_239$$) {
  var $p$$inline_240$$ = $getQueryParts$$inline_126$$($condition$$inline_239$$)[0], $ignores$$inline_241$$ = {$el$:1};
  "*" != $p$$inline_240$$.$tag$ && ($ignores$$inline_241$$.$tag$ = 1);
  $p$$inline_240$$.$classes$.length || ($ignores$$inline_241$$.$classes$ = 1);
  var $ntf$$inline_242$$ = $getSimpleFilterFunc$$inline_142$$($p$$inline_240$$, $ignores$$inline_241$$);
  return function($elem$$inline_243$$) {
    return!$ntf$$inline_242$$($elem$$inline_243$$)
  }
}, "nth-child":function($name$$inline_244$$, $condition$$inline_245$$) {
  if("odd" == $condition$$inline_245$$) {
    return $isOdd$$inline_139$$
  }
  if("even" == $condition$$inline_245$$) {
    return $isEven$$inline_138$$
  }
  if(-1 != $condition$$inline_245$$.indexOf("n")) {
    var $tparts$$inline_247$$ = $condition$$inline_245$$.split("n", 2), $pred$$inline_248$$ = $tparts$$inline_247$$[0] ? "-" == $tparts$$inline_247$$[0] ? -1 : parseInt($tparts$$inline_247$$[0], 10) : 1, $idx$$inline_249$$ = $tparts$$inline_247$$[1] ? parseInt($tparts$$inline_247$$[1], 10) : 0, $lb$$inline_250$$ = 0, $ub$$inline_251$$ = -1;
    0 < $pred$$inline_248$$ ? 0 > $idx$$inline_249$$ ? $idx$$inline_249$$ = $idx$$inline_249$$ % $pred$$inline_248$$ && $pred$$inline_248$$ + $idx$$inline_249$$ % $pred$$inline_248$$ : 0 < $idx$$inline_249$$ && ($idx$$inline_249$$ >= $pred$$inline_248$$ && ($lb$$inline_250$$ = $idx$$inline_249$$ - $idx$$inline_249$$ % $pred$$inline_248$$), $idx$$inline_249$$ %= $pred$$inline_248$$) : 0 > $pred$$inline_248$$ && ($pred$$inline_248$$ *= -1, 0 < $idx$$inline_249$$ && ($ub$$inline_251$$ = $idx$$inline_249$$, 
    $idx$$inline_249$$ %= $pred$$inline_248$$));
    if(0 < $pred$$inline_248$$) {
      return function($elem$$inline_254_i$$inline_255$$) {
        $elem$$inline_254_i$$inline_255$$ = $getNodeIndex$$inline_137$$($elem$$inline_254_i$$inline_255$$);
        return $elem$$inline_254_i$$inline_255$$ >= $lb$$inline_250$$ && (0 > $ub$$inline_251$$ || $elem$$inline_254_i$$inline_255$$ <= $ub$$inline_251$$) && $elem$$inline_254_i$$inline_255$$ % $pred$$inline_248$$ == $idx$$inline_249$$
      }
    }
    $condition$$inline_245$$ = $idx$$inline_249$$
  }
  var $ncount$$inline_252$$ = parseInt($condition$$inline_245$$, 10);
  return function($elem$$inline_256$$) {
    return $getNodeIndex$$inline_137$$($elem$$inline_256$$) == $ncount$$inline_252$$
  }
}}, $defaultGetter$$inline_141$$ = $goog$userAgent$IE$$ ? function($cond$$inline_257$$) {
  var $clc$$inline_258$$ = $cond$$inline_257$$.toLowerCase();
  "class" == $clc$$inline_258$$ && ($cond$$inline_257$$ = "className");
  return function($elem$$inline_259$$) {
    return $caseSensitive$$inline_125$$ ? $elem$$inline_259$$.getAttribute($cond$$inline_257$$) : $elem$$inline_259$$[$cond$$inline_257$$] || $elem$$inline_259$$[$clc$$inline_258$$]
  }
} : function($cond$$inline_260$$) {
  return function($elem$$inline_261$$) {
    return $elem$$inline_261$$ && $elem$$inline_261$$.getAttribute && $elem$$inline_261$$.hasAttribute($cond$$inline_260$$)
  }
};
function $getSimpleFilterFunc$$inline_142$$($query$$inline_262$$, $ignores$$inline_263$$) {
  if(!$query$$inline_262$$) {
    return $goog$functions$TRUE$$
  }
  var $ignores$$inline_263$$ = $ignores$$inline_263$$ || {}, $ff$$inline_264$$ = $JSCompiler_alias_NULL$$;
  $ignores$$inline_263$$.$el$ || ($ff$$inline_264$$ = $agree$$inline_127$$($ff$$inline_264$$, $isElement$$inline_128$$));
  $ignores$$inline_263$$.$tag$ || "*" != $query$$inline_262$$.$tag$ && ($ff$$inline_264$$ = $agree$$inline_127$$($ff$$inline_264$$, function($elem$$inline_265$$) {
    return $elem$$inline_265$$ && $elem$$inline_265$$.tagName == $query$$inline_262$$.$getTag$()
  }));
  $ignores$$inline_263$$.$classes$ || $goog$array$forEach$$($query$$inline_262$$.$classes$, function($cname$$inline_266$$, $idx$$inline_267$$) {
    var $re$$inline_268$$ = RegExp("(?:^|\\s)" + $cname$$inline_266$$ + "(?:\\s|$)");
    $ff$$inline_264$$ = $agree$$inline_127$$($ff$$inline_264$$, function($elem$$inline_269$$) {
      return $re$$inline_268$$.test($elem$$inline_269$$.className)
    });
    $ff$$inline_264$$.count = $idx$$inline_267$$
  });
  $ignores$$inline_263$$.$pseudos$ || $goog$array$forEach$$($query$$inline_262$$.$pseudos$, function($pseudo$$inline_270$$) {
    var $pn$$inline_271$$ = $pseudo$$inline_270$$.name;
    $pseudos$$inline_140$$[$pn$$inline_271$$] && ($ff$$inline_264$$ = $agree$$inline_127$$($ff$$inline_264$$, $pseudos$$inline_140$$[$pn$$inline_271$$]($pn$$inline_271$$, $pseudo$$inline_270$$.value)))
  });
  $ignores$$inline_263$$.$attrs$ || $goog$array$forEach$$($query$$inline_262$$.$attrs$, function($attr$$inline_272$$) {
    var $matcher$$inline_273$$, $a$$inline_274$$ = $attr$$inline_272$$.$attr$;
    $attr$$inline_272$$.type && $attrs$$inline_130$$[$attr$$inline_272$$.type] ? $matcher$$inline_273$$ = $attrs$$inline_130$$[$attr$$inline_272$$.type]($a$$inline_274$$, $attr$$inline_272$$.$matchFor$) : $a$$inline_274$$.length && ($matcher$$inline_273$$ = $defaultGetter$$inline_141$$($a$$inline_274$$));
    $matcher$$inline_273$$ && ($ff$$inline_264$$ = $agree$$inline_127$$($ff$$inline_264$$, $matcher$$inline_273$$))
  });
  $ignores$$inline_263$$.id || $query$$inline_262$$.id && ($ff$$inline_264$$ = $agree$$inline_127$$($ff$$inline_264$$, function($elem$$inline_275$$) {
    return!!$elem$$inline_275$$ && $elem$$inline_275$$.id == $query$$inline_262$$.id
  }));
  $ff$$inline_264$$ || "default" in $ignores$$inline_263$$ || ($ff$$inline_264$$ = $goog$functions$TRUE$$);
  return $ff$$inline_264$$
}
var $_getElementsFuncCache$$inline_147$$ = {};
function $getElementsFunc$$inline_148$$($query$$inline_295$$) {
  var $retFunc$$inline_296$$ = $_getElementsFuncCache$$inline_147$$[$query$$inline_295$$.$query$];
  if($retFunc$$inline_296$$) {
    return $retFunc$$inline_296$$
  }
  var $io$$inline_297_oper$$inline_298$$ = $query$$inline_295$$.$infixOper$, $io$$inline_297_oper$$inline_298$$ = $io$$inline_297_oper$$inline_298$$ ? $io$$inline_297_oper$$inline_298$$.$oper$ : "", $filterFunc$$inline_299$$ = $getSimpleFilterFunc$$inline_142$$($query$$inline_295$$, {$el$:1}), $wildcardTag$$inline_300$$ = "*" == $query$$inline_295$$.$tag$, $ecs$$inline_301_skipFilters$$inline_302$$ = document.getElementsByClassName;
  if($io$$inline_297_oper$$inline_298$$) {
    if($ecs$$inline_301_skipFilters$$inline_302$$ = {$el$:1}, $wildcardTag$$inline_300$$ && ($ecs$$inline_301_skipFilters$$inline_302$$.$tag$ = 1), $filterFunc$$inline_299$$ = $getSimpleFilterFunc$$inline_142$$($query$$inline_295$$, $ecs$$inline_301_skipFilters$$inline_302$$), "+" == $io$$inline_297_oper$$inline_298$$) {
      var $filterFunc$$inline_824$$ = $filterFunc$$inline_299$$, $retFunc$$inline_296$$ = function $$retFunc$$inline_296$$$($node$$inline_825$$, $ret$$inline_826$$, $bag$$inline_827$$) {
        for(;$node$$inline_825$$ = $node$$inline_825$$[$nSibling$$inline_132$$];) {
          if(!$noNextElementSibling$$inline_131$$ || $isElement$$inline_128$$($node$$inline_825$$)) {
            (!$bag$$inline_827$$ || $_isUnique$$inline_157$$($node$$inline_825$$, $bag$$inline_827$$)) && $filterFunc$$inline_824$$($node$$inline_825$$) && $ret$$inline_826$$.push($node$$inline_825$$);
            break
          }
        }
        return $ret$$inline_826$$
      }
    }else {
      if("~" == $io$$inline_297_oper$$inline_298$$) {
        var $filterFunc$$inline_829$$ = $filterFunc$$inline_299$$, $retFunc$$inline_296$$ = function $$retFunc$$inline_296$$$($root$$inline_830_te$$inline_833$$, $ret$$inline_831$$, $bag$$inline_832$$) {
          for($root$$inline_830_te$$inline_833$$ = $root$$inline_830_te$$inline_833$$[$nSibling$$inline_132$$];$root$$inline_830_te$$inline_833$$;) {
            if($simpleNodeTest$$inline_134$$($root$$inline_830_te$$inline_833$$)) {
              if($bag$$inline_832$$ && !$_isUnique$$inline_157$$($root$$inline_830_te$$inline_833$$, $bag$$inline_832$$)) {
                break
              }
              $filterFunc$$inline_829$$($root$$inline_830_te$$inline_833$$) && $ret$$inline_831$$.push($root$$inline_830_te$$inline_833$$)
            }
            $root$$inline_830_te$$inline_833$$ = $root$$inline_830_te$$inline_833$$[$nSibling$$inline_132$$]
          }
          return $ret$$inline_831$$
        }
      }else {
        if(">" == $io$$inline_297_oper$$inline_298$$) {
          var $filterFunc$$inline_835$$ = $filterFunc$$inline_299$$, $filterFunc$$inline_835$$ = $filterFunc$$inline_835$$ || $goog$functions$TRUE$$, $retFunc$$inline_296$$ = function $$retFunc$$inline_296$$$($root$$inline_836_te$$inline_839$$, $ret$$inline_837$$, $bag$$inline_838$$) {
            for(var $x$$inline_840$$ = 0, $tret$$inline_841$$ = $root$$inline_836_te$$inline_839$$[$childNodesName$$inline_124$$];$root$$inline_836_te$$inline_839$$ = $tret$$inline_841$$[$x$$inline_840$$++];) {
              $simpleNodeTest$$inline_134$$($root$$inline_836_te$$inline_839$$) && ((!$bag$$inline_838$$ || $_isUnique$$inline_157$$($root$$inline_836_te$$inline_839$$, $bag$$inline_838$$)) && $filterFunc$$inline_835$$($root$$inline_836_te$$inline_839$$, $x$$inline_840$$)) && $ret$$inline_837$$.push($root$$inline_836_te$$inline_839$$)
            }
            return $ret$$inline_837$$
          }
        }
      }
    }
  }else {
    if($query$$inline_295$$.id) {
      $filterFunc$$inline_299$$ = !$query$$inline_295$$.$loops$ && $wildcardTag$$inline_300$$ ? $goog$functions$TRUE$$ : $getSimpleFilterFunc$$inline_142$$($query$$inline_295$$, {$el$:1, id:1}), $retFunc$$inline_296$$ = function $$retFunc$$inline_296$$$($root$$inline_304$$, $arr$$inline_305$$) {
        var $te$$inline_306$$ = $goog$dom$getDomHelper$$($root$$inline_304$$).$getElement$($query$$inline_295$$.id), $JSCompiler_temp$$815_JSCompiler_temp$$816_pn$$inline_845$$;
        if($JSCompiler_temp$$815_JSCompiler_temp$$816_pn$$inline_845$$ = $te$$inline_306$$ && $filterFunc$$inline_299$$($te$$inline_306$$)) {
          if(!($JSCompiler_temp$$815_JSCompiler_temp$$816_pn$$inline_845$$ = 9 == $root$$inline_304$$.nodeType)) {
            for($JSCompiler_temp$$815_JSCompiler_temp$$816_pn$$inline_845$$ = $te$$inline_306$$.parentNode;$JSCompiler_temp$$815_JSCompiler_temp$$816_pn$$inline_845$$ && $JSCompiler_temp$$815_JSCompiler_temp$$816_pn$$inline_845$$ != $root$$inline_304$$;) {
              $JSCompiler_temp$$815_JSCompiler_temp$$816_pn$$inline_845$$ = $JSCompiler_temp$$815_JSCompiler_temp$$816_pn$$inline_845$$.parentNode
            }
            $JSCompiler_temp$$815_JSCompiler_temp$$816_pn$$inline_845$$ = !!$JSCompiler_temp$$815_JSCompiler_temp$$816_pn$$inline_845$$
          }
        }
        if($JSCompiler_temp$$815_JSCompiler_temp$$816_pn$$inline_845$$) {
          return $getArr$$inline_122$$($te$$inline_306$$, $arr$$inline_305$$)
        }
      }
    }else {
      if($ecs$$inline_301_skipFilters$$inline_302$$ && /\{\s*\[native code\]\s*\}/.test(String($ecs$$inline_301_skipFilters$$inline_302$$)) && $query$$inline_295$$.$classes$.length && !$cssCaseBug$$inline_123$$) {
        var $filterFunc$$inline_299$$ = $getSimpleFilterFunc$$inline_142$$($query$$inline_295$$, {$el$:1, $classes$:1, id:1}), $classesString$$inline_303$$ = $query$$inline_295$$.$classes$.join(" "), $retFunc$$inline_296$$ = function $$retFunc$$inline_296$$$($root$$inline_307$$, $arr$$inline_308$$) {
          for(var $ret$$inline_309$$ = $getArr$$inline_122$$(0, $arr$$inline_308$$), $te$$inline_310$$, $x$$inline_311$$ = 0, $tret$$inline_312$$ = $root$$inline_307$$.getElementsByClassName($classesString$$inline_303$$);$te$$inline_310$$ = $tret$$inline_312$$[$x$$inline_311$$++];) {
            $filterFunc$$inline_299$$($te$$inline_310$$, $root$$inline_307$$) && $ret$$inline_309$$.push($te$$inline_310$$)
          }
          return $ret$$inline_309$$
        }
      }else {
        !$wildcardTag$$inline_300$$ && !$query$$inline_295$$.$loops$ ? $retFunc$$inline_296$$ = function $$retFunc$$inline_296$$$($root$$inline_313$$, $arr$$inline_314$$) {
          for(var $ret$$inline_315$$ = $getArr$$inline_122$$(0, $arr$$inline_314$$), $te$$inline_316$$, $x$$inline_317$$ = 0, $tret$$inline_318$$ = $root$$inline_313$$.getElementsByTagName($query$$inline_295$$.$getTag$());$te$$inline_316$$ = $tret$$inline_318$$[$x$$inline_317$$++];) {
            $ret$$inline_315$$.push($te$$inline_316$$)
          }
          return $ret$$inline_315$$
        } : ($filterFunc$$inline_299$$ = $getSimpleFilterFunc$$inline_142$$($query$$inline_295$$, {$el$:1, $tag$:1, id:1}), $retFunc$$inline_296$$ = function $$retFunc$$inline_296$$$($root$$inline_319$$, $arr$$inline_320$$) {
          for(var $ret$$inline_321$$ = $getArr$$inline_122$$(0, $arr$$inline_320$$), $te$$inline_322$$, $x$$inline_323$$ = 0, $tret$$inline_324$$ = $root$$inline_319$$.getElementsByTagName($query$$inline_295$$.$getTag$());$te$$inline_322$$ = $tret$$inline_324$$[$x$$inline_323$$++];) {
            $filterFunc$$inline_299$$($te$$inline_322$$, $root$$inline_319$$) && $ret$$inline_321$$.push($te$$inline_322$$)
          }
          return $ret$$inline_321$$
        })
      }
    }
  }
  return $_getElementsFuncCache$$inline_147$$[$query$$inline_295$$.$query$] = $retFunc$$inline_296$$
}
var $_queryFuncCacheDOM$$inline_150$$ = {}, $_queryFuncCacheQSA$$inline_151$$ = {};
function $getStepQueryFunc$$inline_152$$($query$$inline_337$$) {
  var $qparts$$inline_338$$ = $getQueryParts$$inline_126$$($goog$string$trim$$($query$$inline_337$$));
  if(1 == $qparts$$inline_338$$.length) {
    var $tef$$inline_339$$ = $getElementsFunc$$inline_148$$($qparts$$inline_338$$[0]);
    return function($r$$inline_341_root$$inline_340$$) {
      if($r$$inline_341_root$$inline_340$$ = $tef$$inline_339$$($r$$inline_341_root$$inline_340$$, [])) {
        $r$$inline_341_root$$inline_340$$.$nozip$ = $JSCompiler_alias_TRUE$$
      }
      return $r$$inline_341_root$$inline_340$$
    }
  }
  return function($candidates$$inline_849_root$$inline_342$$) {
    for(var $candidates$$inline_849_root$$inline_342$$ = $getArr$$inline_122$$($candidates$$inline_849_root$$inline_342$$), $qp$$inline_850_te$$inline_852$$, $gef$$inline_857_x$$inline_851$$, $qpl$$inline_853$$ = $qparts$$inline_338$$.length, $bag$$inline_854$$, $ret$$inline_855$$, $i$$inline_856$$ = 0;$i$$inline_856$$ < $qpl$$inline_853$$;$i$$inline_856$$++) {
      $ret$$inline_855$$ = [];
      $qp$$inline_850_te$$inline_852$$ = $qparts$$inline_338$$[$i$$inline_856$$];
      $gef$$inline_857_x$$inline_851$$ = $candidates$$inline_849_root$$inline_342$$.length - 1;
      0 < $gef$$inline_857_x$$inline_851$$ && ($bag$$inline_854$$ = {}, $ret$$inline_855$$.$nozip$ = $JSCompiler_alias_TRUE$$);
      $gef$$inline_857_x$$inline_851$$ = $getElementsFunc$$inline_148$$($qp$$inline_850_te$$inline_852$$);
      for(var $j$$inline_858$$ = 0;$qp$$inline_850_te$$inline_852$$ = $candidates$$inline_849_root$$inline_342$$[$j$$inline_858$$];$j$$inline_858$$++) {
        $gef$$inline_857_x$$inline_851$$($qp$$inline_850_te$$inline_852$$, $ret$$inline_855$$, $bag$$inline_854$$)
      }
      if(!$ret$$inline_855$$.length) {
        break
      }
      $candidates$$inline_849_root$$inline_342$$ = $ret$$inline_855$$
    }
    return $ret$$inline_855$$
  }
}
var $qsaAvail$$inline_153$$ = !!document.querySelectorAll && (!$goog$userAgent$WEBKIT$$ || $goog$userAgent$isVersion$$("526"));
function $getQueryFunc$$inline_154$$($query$$inline_343$$, $opt_forceDOM$$inline_344$$) {
  if($qsaAvail$$inline_153$$) {
    var $domCached$$inline_346_qcz$$inline_347_qsaCached$$inline_345$$ = $_queryFuncCacheQSA$$inline_151$$[$query$$inline_343$$];
    if($domCached$$inline_346_qcz$$inline_347_qsaCached$$inline_345$$ && !$opt_forceDOM$$inline_344$$) {
      return $domCached$$inline_346_qcz$$inline_347_qsaCached$$inline_345$$
    }
  }
  if($domCached$$inline_346_qcz$$inline_347_qsaCached$$inline_345$$ = $_queryFuncCacheDOM$$inline_150$$[$query$$inline_343$$]) {
    return $domCached$$inline_346_qcz$$inline_347_qsaCached$$inline_345$$
  }
  var $domCached$$inline_346_qcz$$inline_347_qsaCached$$inline_345$$ = $query$$inline_343$$.charAt(0), $nospace$$inline_348$$ = -1 == $query$$inline_343$$.indexOf(" ");
  0 <= $query$$inline_343$$.indexOf("#") && $nospace$$inline_348$$ && ($opt_forceDOM$$inline_344$$ = $JSCompiler_alias_TRUE$$);
  if($qsaAvail$$inline_153$$ && !$opt_forceDOM$$inline_344$$ && -1 == ">~+".indexOf($domCached$$inline_346_qcz$$inline_347_qsaCached$$inline_345$$) && (!$goog$userAgent$IE$$ || -1 == $query$$inline_343$$.indexOf(":")) && !($cssCaseBug$$inline_123$$ && 0 <= $query$$inline_343$$.indexOf(".")) && -1 == $query$$inline_343$$.indexOf(":contains") && -1 == $query$$inline_343$$.indexOf("|=")) {
    var $tq$$inline_349$$ = 0 <= ">~+".indexOf($query$$inline_343$$.charAt($query$$inline_343$$.length - 1)) ? $query$$inline_343$$ + " *" : $query$$inline_343$$;
    return $_queryFuncCacheQSA$$inline_151$$[$query$$inline_343$$] = function $$_queryFuncCacheQSA$$inline_151$$$$query$$inline_343$$$($root$$inline_351$$) {
      try {
        9 == $root$$inline_351$$.nodeType || $nospace$$inline_348$$ || $JSCompiler_alias_THROW$$("");
        var $r$$inline_352$$ = $root$$inline_351$$.querySelectorAll($tq$$inline_349$$);
        $goog$userAgent$IE$$ ? $r$$inline_352$$.$commentStrip$ = $JSCompiler_alias_TRUE$$ : $r$$inline_352$$.$nozip$ = $JSCompiler_alias_TRUE$$;
        return $r$$inline_352$$
      }catch($e$$inline_353$$) {
        return $getQueryFunc$$inline_154$$($query$$inline_343$$, $JSCompiler_alias_TRUE$$)($root$$inline_351$$)
      }
    }
  }
  var $parts$$inline_350$$ = $query$$inline_343$$.split(/\s*,\s*/);
  return $_queryFuncCacheDOM$$inline_150$$[$query$$inline_343$$] = 2 > $parts$$inline_350$$.length ? $getStepQueryFunc$$inline_152$$($query$$inline_343$$) : function($root$$inline_354$$) {
    for(var $pindex$$inline_355$$ = 0, $ret$$inline_356$$ = [], $tp$$inline_357$$;$tp$$inline_357$$ = $parts$$inline_350$$[$pindex$$inline_355$$++];) {
      $ret$$inline_356$$ = $ret$$inline_356$$.concat($getStepQueryFunc$$inline_152$$($tp$$inline_357$$)($root$$inline_354$$))
    }
    return $ret$$inline_356$$
  }
}
var $_zipIdx$$inline_155$$ = 0, $_nodeUID$$inline_156$$ = $goog$userAgent$IE$$ ? function($node$$inline_358$$) {
  return $caseSensitive$$inline_125$$ ? $node$$inline_358$$.getAttribute("_uid") || $node$$inline_358$$.setAttribute("_uid", ++$_zipIdx$$inline_155$$) || $_zipIdx$$inline_155$$ : $node$$inline_358$$.uniqueID
} : function($node$$inline_359$$) {
  return $node$$inline_359$$._uid || ($node$$inline_359$$._uid = ++$_zipIdx$$inline_155$$)
};
function $_isUnique$$inline_157$$($node$$inline_360$$, $bag$$inline_361$$) {
  if(!$bag$$inline_361$$) {
    return 1
  }
  var $id$$inline_362$$ = $_nodeUID$$inline_156$$($node$$inline_360$$);
  return!$bag$$inline_361$$[$id$$inline_362$$] ? $bag$$inline_361$$[$id$$inline_362$$] = 1 : 0
}
function $_zip$$inline_158$$($arr$$inline_363$$) {
  if($arr$$inline_363$$ && $arr$$inline_363$$.$nozip$) {
    return $arr$$inline_363$$
  }
  var $ret$$inline_364$$ = [];
  if(!$arr$$inline_363$$ || !$arr$$inline_363$$.length) {
    return $ret$$inline_364$$
  }
  $arr$$inline_363$$[0] && $ret$$inline_364$$.push($arr$$inline_363$$[0]);
  if(2 > $arr$$inline_363$$.length) {
    return $ret$$inline_364$$
  }
  $_zipIdx$$inline_155$$++;
  if($goog$userAgent$IE$$ && $caseSensitive$$inline_125$$) {
    var $szidx$$inline_365$$ = $_zipIdx$$inline_155$$ + "";
    $arr$$inline_363$$[0].setAttribute("_zipIdx", $szidx$$inline_365$$);
    for(var $x$$inline_366$$ = 1, $te$$inline_367$$;$te$$inline_367$$ = $arr$$inline_363$$[$x$$inline_366$$];$x$$inline_366$$++) {
      $arr$$inline_363$$[$x$$inline_366$$].getAttribute("_zipIdx") != $szidx$$inline_365$$ && $ret$$inline_364$$.push($te$$inline_367$$), $te$$inline_367$$.setAttribute("_zipIdx", $szidx$$inline_365$$)
    }
  }else {
    if($goog$userAgent$IE$$ && $arr$$inline_363$$.$commentStrip$) {
      try {
        for($x$$inline_366$$ = 1;$te$$inline_367$$ = $arr$$inline_363$$[$x$$inline_366$$];$x$$inline_366$$++) {
          $isElement$$inline_128$$($te$$inline_367$$) && $ret$$inline_364$$.push($te$$inline_367$$)
        }
      }catch($e$$inline_368$$) {
      }
    }else {
      $arr$$inline_363$$[0] && ($arr$$inline_363$$[0]._zipIdx = $_zipIdx$$inline_155$$);
      for($x$$inline_366$$ = 1;$te$$inline_367$$ = $arr$$inline_363$$[$x$$inline_366$$];$x$$inline_366$$++) {
        $arr$$inline_363$$[$x$$inline_366$$]._zipIdx != $_zipIdx$$inline_155$$ && $ret$$inline_364$$.push($te$$inline_367$$), $te$$inline_367$$._zipIdx = $_zipIdx$$inline_155$$
      }
    }
  }
  return $ret$$inline_364$$
}
function $query$$inline_159$$($query$$inline_369$$, $root$$inline_370$$) {
  if(!$query$$inline_369$$) {
    return[]
  }
  if($query$$inline_369$$.constructor == Array) {
    return $query$$inline_369$$
  }
  if(!$goog$isString$$($query$$inline_369$$)) {
    return[$query$$inline_369$$]
  }
  if($goog$isString$$($root$$inline_370$$) && ($root$$inline_370$$ = $goog$isString$$($root$$inline_370$$) ? document.getElementById($root$$inline_370$$) : $root$$inline_370$$, !$root$$inline_370$$)) {
    return[]
  }
  var $root$$inline_370$$ = $root$$inline_370$$ || document, $od$$inline_371_r$$inline_372$$ = $root$$inline_370$$.ownerDocument || $root$$inline_370$$.documentElement;
  $caseSensitive$$inline_125$$ = $root$$inline_370$$.contentType && "application/xml" == $root$$inline_370$$.contentType || $goog$userAgent$OPERA$$ && ($root$$inline_370$$.doctype || "[object XMLDocument]" == $od$$inline_371_r$$inline_372$$.toString()) || !!$od$$inline_371_r$$inline_372$$ && ($goog$userAgent$IE$$ ? $od$$inline_371_r$$inline_372$$.xml : $root$$inline_370$$.xmlVersion || $od$$inline_371_r$$inline_372$$.xmlVersion);
  return($od$$inline_371_r$$inline_372$$ = $getQueryFunc$$inline_154$$($query$$inline_369$$)($root$$inline_370$$)) && $od$$inline_371_r$$inline_372$$.$nozip$ ? $od$$inline_371_r$$inline_372$$ : $_zip$$inline_158$$($od$$inline_371_r$$inline_372$$)
}
$query$$inline_159$$.$pseudos$ = $pseudos$$inline_140$$;
$goog$exportPath_$$("goog.dom.query", $query$$inline_159$$);
$goog$exportPath_$$("goog.dom.query.pseudos", $query$$inline_159$$.$pseudos$);
var $goog$events$BrowserFeature$HAS_W3C_BUTTON$$ = !$goog$userAgent$IE$$ || $goog$userAgent$isDocumentMode$$(9), $goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$ = !$goog$userAgent$IE$$ || $goog$userAgent$isDocumentMode$$(9), $goog$events$BrowserFeature$SET_KEY_CODE_TO_PREVENT_DEFAULT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("9");
!$goog$userAgent$WEBKIT$$ || $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9b") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("8") || $goog$userAgent$OPERA$$ && $goog$userAgent$isVersion$$("9.5") || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && !$goog$userAgent$isVersion$$("8") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("9");
function $goog$Disposable$$() {
  0 != $goog$Disposable$MonitoringMode$OFF$$ && (this.$creationStack$ = Error().stack, $goog$getUid$$(this))
}
var $goog$Disposable$MonitoringMode$OFF$$ = 0;
$goog$Disposable$$.prototype.$disposed_$ = $JSCompiler_alias_FALSE$$;
function $goog$events$Event$$($type$$55$$, $opt_target$$1$$) {
  this.type = $type$$55$$;
  this.currentTarget = this.target = $opt_target$$1$$
}
$JSCompiler_prototypeAlias$$ = $goog$events$Event$$.prototype;
$JSCompiler_prototypeAlias$$.$propagationStopped_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.defaultPrevented = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$returnValue_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.stopPropagation = function $$JSCompiler_prototypeAlias$$$stopPropagation$() {
  this.$propagationStopped_$ = $JSCompiler_alias_TRUE$$
};
$JSCompiler_prototypeAlias$$.preventDefault = function $$JSCompiler_prototypeAlias$$$preventDefault$() {
  this.defaultPrevented = $JSCompiler_alias_TRUE$$;
  this.$returnValue_$ = $JSCompiler_alias_FALSE$$
};
function $goog$events$Event$preventDefault$$($e$$15$$) {
  $e$$15$$.preventDefault()
}
;function $goog$reflect$sinkValue$$($x$$67$$) {
  $goog$reflect$sinkValue$$[" "]($x$$67$$);
  return $x$$67$$
}
$goog$reflect$sinkValue$$[" "] = $goog$nullFunction$$;
function $goog$events$BrowserEvent$$($opt_e$$, $opt_currentTarget$$) {
  $opt_e$$ && this.init($opt_e$$, $opt_currentTarget$$)
}
$goog$inherits$$($goog$events$BrowserEvent$$, $goog$events$Event$$);
var $goog$events$BrowserEvent$IEButtonMap$$ = [1, 4, 2];
$JSCompiler_prototypeAlias$$ = $goog$events$BrowserEvent$$.prototype;
$JSCompiler_prototypeAlias$$.target = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.relatedTarget = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.offsetX = 0;
$JSCompiler_prototypeAlias$$.offsetY = 0;
$JSCompiler_prototypeAlias$$.clientX = 0;
$JSCompiler_prototypeAlias$$.clientY = 0;
$JSCompiler_prototypeAlias$$.screenX = 0;
$JSCompiler_prototypeAlias$$.screenY = 0;
$JSCompiler_prototypeAlias$$.button = 0;
$JSCompiler_prototypeAlias$$.keyCode = 0;
$JSCompiler_prototypeAlias$$.charCode = 0;
$JSCompiler_prototypeAlias$$.ctrlKey = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.altKey = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.shiftKey = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.metaKey = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$platformModifierKey$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$event_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.init = function $$JSCompiler_prototypeAlias$$$init$($e$$17$$, $opt_currentTarget$$1$$) {
  var $type$$57$$ = this.type = $e$$17$$.type;
  $goog$events$Event$$.call(this, $type$$57$$);
  this.target = $e$$17$$.target || $e$$17$$.srcElement;
  this.currentTarget = $opt_currentTarget$$1$$;
  var $relatedTarget$$ = $e$$17$$.relatedTarget;
  if($relatedTarget$$) {
    if($goog$userAgent$GECKO$$) {
      var $JSCompiler_inline_result$$43$$;
      a: {
        try {
          $goog$reflect$sinkValue$$($relatedTarget$$.nodeName);
          $JSCompiler_inline_result$$43$$ = $JSCompiler_alias_TRUE$$;
          break a
        }catch($e$$inline_384$$) {
        }
        $JSCompiler_inline_result$$43$$ = $JSCompiler_alias_FALSE$$
      }
      $JSCompiler_inline_result$$43$$ || ($relatedTarget$$ = $JSCompiler_alias_NULL$$)
    }
  }else {
    "mouseover" == $type$$57$$ ? $relatedTarget$$ = $e$$17$$.fromElement : "mouseout" == $type$$57$$ && ($relatedTarget$$ = $e$$17$$.toElement)
  }
  this.relatedTarget = $relatedTarget$$;
  this.offsetX = $goog$userAgent$WEBKIT$$ || $e$$17$$.offsetX !== $JSCompiler_alias_VOID$$ ? $e$$17$$.offsetX : $e$$17$$.layerX;
  this.offsetY = $goog$userAgent$WEBKIT$$ || $e$$17$$.offsetY !== $JSCompiler_alias_VOID$$ ? $e$$17$$.offsetY : $e$$17$$.layerY;
  this.clientX = $e$$17$$.clientX !== $JSCompiler_alias_VOID$$ ? $e$$17$$.clientX : $e$$17$$.pageX;
  this.clientY = $e$$17$$.clientY !== $JSCompiler_alias_VOID$$ ? $e$$17$$.clientY : $e$$17$$.pageY;
  this.screenX = $e$$17$$.screenX || 0;
  this.screenY = $e$$17$$.screenY || 0;
  this.button = $e$$17$$.button;
  this.keyCode = $e$$17$$.keyCode || 0;
  this.charCode = $e$$17$$.charCode || ("keypress" == $type$$57$$ ? $e$$17$$.keyCode : 0);
  this.ctrlKey = $e$$17$$.ctrlKey;
  this.altKey = $e$$17$$.altKey;
  this.shiftKey = $e$$17$$.shiftKey;
  this.metaKey = $e$$17$$.metaKey;
  this.$platformModifierKey$ = $goog$userAgent$detectedMac_$$ ? $e$$17$$.metaKey : $e$$17$$.ctrlKey;
  this.state = $e$$17$$.state;
  this.$event_$ = $e$$17$$;
  $e$$17$$.defaultPrevented && this.preventDefault();
  delete this.$propagationStopped_$
};
function $JSCompiler_StaticMethods_isMouseActionButton$$($JSCompiler_StaticMethods_isMouseActionButton$self$$) {
  return($goog$events$BrowserFeature$HAS_W3C_BUTTON$$ ? 0 == $JSCompiler_StaticMethods_isMouseActionButton$self$$.$event_$.button : "click" == $JSCompiler_StaticMethods_isMouseActionButton$self$$.type ? $JSCompiler_alias_TRUE$$ : !!($JSCompiler_StaticMethods_isMouseActionButton$self$$.$event_$.button & $goog$events$BrowserEvent$IEButtonMap$$[0])) && !($goog$userAgent$WEBKIT$$ && $goog$userAgent$detectedMac_$$ && $JSCompiler_StaticMethods_isMouseActionButton$self$$.ctrlKey)
}
$JSCompiler_prototypeAlias$$.stopPropagation = function $$JSCompiler_prototypeAlias$$$stopPropagation$() {
  $goog$events$BrowserEvent$$.$superClass_$.stopPropagation.call(this);
  this.$event_$.stopPropagation ? this.$event_$.stopPropagation() : this.$event_$.cancelBubble = $JSCompiler_alias_TRUE$$
};
$JSCompiler_prototypeAlias$$.preventDefault = function $$JSCompiler_prototypeAlias$$$preventDefault$() {
  $goog$events$BrowserEvent$$.$superClass_$.preventDefault.call(this);
  var $be$$ = this.$event_$;
  if($be$$.preventDefault) {
    $be$$.preventDefault()
  }else {
    if($be$$.returnValue = $JSCompiler_alias_FALSE$$, $goog$events$BrowserFeature$SET_KEY_CODE_TO_PREVENT_DEFAULT$$) {
      try {
        if($be$$.ctrlKey || 112 <= $be$$.keyCode && 123 >= $be$$.keyCode) {
          $be$$.keyCode = -1
        }
      }catch($ex$$1$$) {
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$getBrowserEvent$ = $JSCompiler_get$$("$event_$");
function $goog$events$Listener$$() {
}
var $goog$events$Listener$counter_$$ = 0;
$JSCompiler_prototypeAlias$$ = $goog$events$Listener$$.prototype;
$JSCompiler_prototypeAlias$$.key = 0;
$JSCompiler_prototypeAlias$$.$removed$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$callOnce$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.init = function $$JSCompiler_prototypeAlias$$$init$($listener$$32$$, $proxy$$, $src$$6$$, $type$$58$$, $capture$$, $opt_handler$$) {
  $goog$isFunction$$($listener$$32$$) ? this.$isFunctionListener_$ = $JSCompiler_alias_TRUE$$ : $listener$$32$$ && $listener$$32$$.handleEvent && $goog$isFunction$$($listener$$32$$.handleEvent) ? this.$isFunctionListener_$ = $JSCompiler_alias_FALSE$$ : $JSCompiler_alias_THROW$$(Error("Invalid listener argument"));
  this.$listener$ = $listener$$32$$;
  this.$proxy$ = $proxy$$;
  this.src = $src$$6$$;
  this.type = $type$$58$$;
  this.capture = !!$capture$$;
  this.$handler$ = $opt_handler$$;
  this.$callOnce$ = $JSCompiler_alias_FALSE$$;
  this.key = ++$goog$events$Listener$counter_$$;
  this.$removed$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($eventObject$$) {
  return this.$isFunctionListener_$ ? this.$listener$.call(this.$handler$ || this.src, $eventObject$$) : this.$listener$.handleEvent.call(this.$listener$, $eventObject$$)
};
var $goog$events$listeners_$$ = {}, $goog$events$listenerTree_$$ = {}, $goog$events$sources_$$ = {}, $goog$events$onStringMap_$$ = {};
function $goog$events$listen$$($src$$7$$, $type$$59$$, $key$$43_listener$$33$$, $capture$$1_opt_capt$$2$$, $opt_handler$$1$$) {
  if($type$$59$$) {
    if($goog$isArray$$($type$$59$$)) {
      for(var $i$$67_proxy$$1$$ = 0;$i$$67_proxy$$1$$ < $type$$59$$.length;$i$$67_proxy$$1$$++) {
        $goog$events$listen$$($src$$7$$, $type$$59$$[$i$$67_proxy$$1$$], $key$$43_listener$$33$$, $capture$$1_opt_capt$$2$$, $opt_handler$$1$$)
      }
      return $JSCompiler_alias_NULL$$
    }
    var $capture$$1_opt_capt$$2$$ = !!$capture$$1_opt_capt$$2$$, $listenerObj_map$$ = $goog$events$listenerTree_$$;
    $type$$59$$ in $listenerObj_map$$ || ($listenerObj_map$$[$type$$59$$] = {$count_$:0, $remaining_$:0});
    $listenerObj_map$$ = $listenerObj_map$$[$type$$59$$];
    $capture$$1_opt_capt$$2$$ in $listenerObj_map$$ || ($listenerObj_map$$[$capture$$1_opt_capt$$2$$] = {$count_$:0, $remaining_$:0}, $listenerObj_map$$.$count_$++);
    var $listenerObj_map$$ = $listenerObj_map$$[$capture$$1_opt_capt$$2$$], $srcUid$$ = $goog$getUid$$($src$$7$$), $listenerArray$$;
    $listenerObj_map$$.$remaining_$++;
    if($listenerObj_map$$[$srcUid$$]) {
      $listenerArray$$ = $listenerObj_map$$[$srcUid$$];
      for($i$$67_proxy$$1$$ = 0;$i$$67_proxy$$1$$ < $listenerArray$$.length;$i$$67_proxy$$1$$++) {
        if($listenerObj_map$$ = $listenerArray$$[$i$$67_proxy$$1$$], $listenerObj_map$$.$listener$ == $key$$43_listener$$33$$ && $listenerObj_map$$.$handler$ == $opt_handler$$1$$) {
          if($listenerObj_map$$.$removed$) {
            break
          }
          return $listenerArray$$[$i$$67_proxy$$1$$].key
        }
      }
    }else {
      $listenerArray$$ = $listenerObj_map$$[$srcUid$$] = [], $listenerObj_map$$.$count_$++
    }
    var $proxyCallbackFunction$$inline_389$$ = $goog$events$handleBrowserEvent_$$, $f$$inline_390$$ = $goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$ ? function($eventObject$$inline_391$$) {
      return $proxyCallbackFunction$$inline_389$$.call($f$$inline_390$$.src, $f$$inline_390$$.key, $eventObject$$inline_391$$)
    } : function($eventObject$$inline_392_v$$inline_393$$) {
      $eventObject$$inline_392_v$$inline_393$$ = $proxyCallbackFunction$$inline_389$$.call($f$$inline_390$$.src, $f$$inline_390$$.key, $eventObject$$inline_392_v$$inline_393$$);
      if(!$eventObject$$inline_392_v$$inline_393$$) {
        return $eventObject$$inline_392_v$$inline_393$$
      }
    }, $i$$67_proxy$$1$$ = $f$$inline_390$$;
    $i$$67_proxy$$1$$.src = $src$$7$$;
    $listenerObj_map$$ = new $goog$events$Listener$$;
    $listenerObj_map$$.init($key$$43_listener$$33$$, $i$$67_proxy$$1$$, $src$$7$$, $type$$59$$, $capture$$1_opt_capt$$2$$, $opt_handler$$1$$);
    $key$$43_listener$$33$$ = $listenerObj_map$$.key;
    $i$$67_proxy$$1$$.key = $key$$43_listener$$33$$;
    $listenerArray$$.push($listenerObj_map$$);
    $goog$events$listeners_$$[$key$$43_listener$$33$$] = $listenerObj_map$$;
    $goog$events$sources_$$[$srcUid$$] || ($goog$events$sources_$$[$srcUid$$] = []);
    $goog$events$sources_$$[$srcUid$$].push($listenerObj_map$$);
    $src$$7$$.addEventListener ? ($src$$7$$ == $goog$global$$ || !$src$$7$$.$customEvent_$) && $src$$7$$.addEventListener($type$$59$$, $i$$67_proxy$$1$$, $capture$$1_opt_capt$$2$$) : $src$$7$$.attachEvent($type$$59$$ in $goog$events$onStringMap_$$ ? $goog$events$onStringMap_$$[$type$$59$$] : $goog$events$onStringMap_$$[$type$$59$$] = "on" + $type$$59$$, $i$$67_proxy$$1$$);
    return $key$$43_listener$$33$$
  }
  $JSCompiler_alias_THROW$$(Error("Invalid event type"))
}
function $goog$events$unlisten$$($listenerArray$$1_src$$10$$, $type$$61$$, $listener$$36$$, $capture$$2_opt_capt$$5$$, $opt_handler$$4$$) {
  if($goog$isArray$$($type$$61$$)) {
    for(var $i$$69$$ = 0;$i$$69$$ < $type$$61$$.length;$i$$69$$++) {
      $goog$events$unlisten$$($listenerArray$$1_src$$10$$, $type$$61$$[$i$$69$$], $listener$$36$$, $capture$$2_opt_capt$$5$$, $opt_handler$$4$$)
    }
  }else {
    if($capture$$2_opt_capt$$5$$ = !!$capture$$2_opt_capt$$5$$, $listenerArray$$1_src$$10$$ = $goog$events$getListeners_$$($listenerArray$$1_src$$10$$, $type$$61$$, $capture$$2_opt_capt$$5$$)) {
      for($i$$69$$ = 0;$i$$69$$ < $listenerArray$$1_src$$10$$.length;$i$$69$$++) {
        if($listenerArray$$1_src$$10$$[$i$$69$$].$listener$ == $listener$$36$$ && $listenerArray$$1_src$$10$$[$i$$69$$].capture == $capture$$2_opt_capt$$5$$ && $listenerArray$$1_src$$10$$[$i$$69$$].$handler$ == $opt_handler$$4$$) {
          $goog$events$unlistenByKey$$($listenerArray$$1_src$$10$$[$i$$69$$].key);
          break
        }
      }
    }
  }
}
function $goog$events$unlistenByKey$$($key$$45$$) {
  if(!$goog$events$listeners_$$[$key$$45$$]) {
    return $JSCompiler_alias_FALSE$$
  }
  var $listener$$37_listenerArray$$2$$ = $goog$events$listeners_$$[$key$$45$$];
  if($listener$$37_listenerArray$$2$$.$removed$) {
    return $JSCompiler_alias_FALSE$$
  }
  var $src$$11_srcUid$$1$$ = $listener$$37_listenerArray$$2$$.src, $type$$62$$ = $listener$$37_listenerArray$$2$$.type, $proxy$$2_sourcesArray$$ = $listener$$37_listenerArray$$2$$.$proxy$, $capture$$3$$ = $listener$$37_listenerArray$$2$$.capture;
  $src$$11_srcUid$$1$$.removeEventListener ? ($src$$11_srcUid$$1$$ == $goog$global$$ || !$src$$11_srcUid$$1$$.$customEvent_$) && $src$$11_srcUid$$1$$.removeEventListener($type$$62$$, $proxy$$2_sourcesArray$$, $capture$$3$$) : $src$$11_srcUid$$1$$.detachEvent && $src$$11_srcUid$$1$$.detachEvent($type$$62$$ in $goog$events$onStringMap_$$ ? $goog$events$onStringMap_$$[$type$$62$$] : $goog$events$onStringMap_$$[$type$$62$$] = "on" + $type$$62$$, $proxy$$2_sourcesArray$$);
  $src$$11_srcUid$$1$$ = $goog$getUid$$($src$$11_srcUid$$1$$);
  $goog$events$sources_$$[$src$$11_srcUid$$1$$] && ($proxy$$2_sourcesArray$$ = $goog$events$sources_$$[$src$$11_srcUid$$1$$], $goog$array$remove$$($proxy$$2_sourcesArray$$, $listener$$37_listenerArray$$2$$), 0 == $proxy$$2_sourcesArray$$.length && delete $goog$events$sources_$$[$src$$11_srcUid$$1$$]);
  $listener$$37_listenerArray$$2$$.$removed$ = $JSCompiler_alias_TRUE$$;
  if($listener$$37_listenerArray$$2$$ = $goog$events$listenerTree_$$[$type$$62$$][$capture$$3$$][$src$$11_srcUid$$1$$]) {
    $listener$$37_listenerArray$$2$$.$needsCleanup_$ = $JSCompiler_alias_TRUE$$, $goog$events$cleanUp_$$($type$$62$$, $capture$$3$$, $src$$11_srcUid$$1$$, $listener$$37_listenerArray$$2$$)
  }
  delete $goog$events$listeners_$$[$key$$45$$];
  return $JSCompiler_alias_TRUE$$
}
function $goog$events$cleanUp_$$($type$$63$$, $capture$$4$$, $srcUid$$2$$, $listenerArray$$3$$) {
  if(!$listenerArray$$3$$.$locked_$ && $listenerArray$$3$$.$needsCleanup_$) {
    for(var $oldIndex$$ = 0, $newIndex$$ = 0;$oldIndex$$ < $listenerArray$$3$$.length;$oldIndex$$++) {
      $listenerArray$$3$$[$oldIndex$$].$removed$ ? $listenerArray$$3$$[$oldIndex$$].$proxy$.src = $JSCompiler_alias_NULL$$ : ($oldIndex$$ != $newIndex$$ && ($listenerArray$$3$$[$newIndex$$] = $listenerArray$$3$$[$oldIndex$$]), $newIndex$$++)
    }
    $listenerArray$$3$$.length = $newIndex$$;
    $listenerArray$$3$$.$needsCleanup_$ = $JSCompiler_alias_FALSE$$;
    0 == $newIndex$$ && (delete $goog$events$listenerTree_$$[$type$$63$$][$capture$$4$$][$srcUid$$2$$], $goog$events$listenerTree_$$[$type$$63$$][$capture$$4$$].$count_$--, 0 == $goog$events$listenerTree_$$[$type$$63$$][$capture$$4$$].$count_$ && (delete $goog$events$listenerTree_$$[$type$$63$$][$capture$$4$$], $goog$events$listenerTree_$$[$type$$63$$].$count_$--), 0 == $goog$events$listenerTree_$$[$type$$63$$].$count_$ && delete $goog$events$listenerTree_$$[$type$$63$$])
  }
}
function $goog$events$getListeners_$$($obj$$66_objUid$$, $type$$65$$, $capture$$6$$) {
  var $map$$1$$ = $goog$events$listenerTree_$$;
  return $type$$65$$ in $map$$1$$ && ($map$$1$$ = $map$$1$$[$type$$65$$], $capture$$6$$ in $map$$1$$ && ($map$$1$$ = $map$$1$$[$capture$$6$$], $obj$$66_objUid$$ = $goog$getUid$$($obj$$66_objUid$$), $map$$1$$[$obj$$66_objUid$$])) ? $map$$1$$[$obj$$66_objUid$$] : $JSCompiler_alias_NULL$$
}
function $goog$events$fireListeners_$$($listenerArray$$5_map$$4$$, $obj$$69_objUid$$2$$, $type$$69$$, $capture$$9$$, $eventObject$$4$$) {
  var $retval$$ = 1, $obj$$69_objUid$$2$$ = $goog$getUid$$($obj$$69_objUid$$2$$);
  if($listenerArray$$5_map$$4$$[$obj$$69_objUid$$2$$]) {
    $listenerArray$$5_map$$4$$.$remaining_$--;
    $listenerArray$$5_map$$4$$ = $listenerArray$$5_map$$4$$[$obj$$69_objUid$$2$$];
    $listenerArray$$5_map$$4$$.$locked_$ ? $listenerArray$$5_map$$4$$.$locked_$++ : $listenerArray$$5_map$$4$$.$locked_$ = 1;
    try {
      for(var $length$$20$$ = $listenerArray$$5_map$$4$$.length, $i$$73$$ = 0;$i$$73$$ < $length$$20$$;$i$$73$$++) {
        var $listener$$43$$ = $listenerArray$$5_map$$4$$[$i$$73$$];
        $listener$$43$$ && !$listener$$43$$.$removed$ && ($retval$$ &= $goog$events$fireListener$$($listener$$43$$, $eventObject$$4$$) !== $JSCompiler_alias_FALSE$$)
      }
    }finally {
      $listenerArray$$5_map$$4$$.$locked_$--, $goog$events$cleanUp_$$($type$$69$$, $capture$$9$$, $obj$$69_objUid$$2$$, $listenerArray$$5_map$$4$$)
    }
  }
  return Boolean($retval$$)
}
function $goog$events$fireListener$$($listener$$44$$, $eventObject$$5$$) {
  $listener$$44$$.$callOnce$ && $goog$events$unlistenByKey$$($listener$$44$$.key);
  return $listener$$44$$.handleEvent($eventObject$$5$$)
}
function $goog$events$handleBrowserEvent_$$($key$$47$$, $opt_evt$$) {
  if(!$goog$events$listeners_$$[$key$$47$$]) {
    return $JSCompiler_alias_TRUE$$
  }
  var $listener$$45$$ = $goog$events$listeners_$$[$key$$47$$], $be$$1_type$$71$$ = $listener$$45$$.type, $map$$6$$ = $goog$events$listenerTree_$$;
  if(!($be$$1_type$$71$$ in $map$$6$$)) {
    return $JSCompiler_alias_TRUE$$
  }
  var $map$$6$$ = $map$$6$$[$be$$1_type$$71$$], $ieEvent_part$$inline_399_retval$$1$$, $targetsMap$$1$$;
  if(!$goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$) {
    var $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_397$$;
    if(!($JSCompiler_temp$$17_hasCapture$$2_parts$$inline_397$$ = $opt_evt$$)) {
      a: {
        $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_397$$ = ["window", "event"];
        for(var $cur$$inline_398_hasBubble$$1$$ = $goog$global$$;$ieEvent_part$$inline_399_retval$$1$$ = $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_397$$.shift();) {
          if($cur$$inline_398_hasBubble$$1$$[$ieEvent_part$$inline_399_retval$$1$$] != $JSCompiler_alias_NULL$$) {
            $cur$$inline_398_hasBubble$$1$$ = $cur$$inline_398_hasBubble$$1$$[$ieEvent_part$$inline_399_retval$$1$$]
          }else {
            $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_397$$ = $JSCompiler_alias_NULL$$;
            break a
          }
        }
        $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_397$$ = $cur$$inline_398_hasBubble$$1$$
      }
    }
    $ieEvent_part$$inline_399_retval$$1$$ = $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_397$$;
    $JSCompiler_temp$$17_hasCapture$$2_parts$$inline_397$$ = $JSCompiler_alias_TRUE$$ in $map$$6$$;
    $cur$$inline_398_hasBubble$$1$$ = $JSCompiler_alias_FALSE$$ in $map$$6$$;
    if($JSCompiler_temp$$17_hasCapture$$2_parts$$inline_397$$) {
      if(0 > $ieEvent_part$$inline_399_retval$$1$$.keyCode || $ieEvent_part$$inline_399_retval$$1$$.returnValue != $JSCompiler_alias_VOID$$) {
        return $JSCompiler_alias_TRUE$$
      }
      a: {
        var $evt$$15_useReturnValue$$inline_402$$ = $JSCompiler_alias_FALSE$$;
        if(0 == $ieEvent_part$$inline_399_retval$$1$$.keyCode) {
          try {
            $ieEvent_part$$inline_399_retval$$1$$.keyCode = -1;
            break a
          }catch($ex$$inline_403$$) {
            $evt$$15_useReturnValue$$inline_402$$ = $JSCompiler_alias_TRUE$$
          }
        }
        if($evt$$15_useReturnValue$$inline_402$$ || $ieEvent_part$$inline_399_retval$$1$$.returnValue == $JSCompiler_alias_VOID$$) {
          $ieEvent_part$$inline_399_retval$$1$$.returnValue = $JSCompiler_alias_TRUE$$
        }
      }
    }
    $evt$$15_useReturnValue$$inline_402$$ = new $goog$events$BrowserEvent$$;
    $evt$$15_useReturnValue$$inline_402$$.init($ieEvent_part$$inline_399_retval$$1$$, this);
    $ieEvent_part$$inline_399_retval$$1$$ = $JSCompiler_alias_TRUE$$;
    try {
      if($JSCompiler_temp$$17_hasCapture$$2_parts$$inline_397$$) {
        for(var $ancestors$$2$$ = [], $parent$$17$$ = $evt$$15_useReturnValue$$inline_402$$.currentTarget;$parent$$17$$;$parent$$17$$ = $parent$$17$$.parentNode) {
          $ancestors$$2$$.push($parent$$17$$)
        }
        $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_TRUE$$];
        $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
        for(var $i$$75$$ = $ancestors$$2$$.length - 1;!$evt$$15_useReturnValue$$inline_402$$.$propagationStopped_$ && 0 <= $i$$75$$ && $targetsMap$$1$$.$remaining_$;$i$$75$$--) {
          $evt$$15_useReturnValue$$inline_402$$.currentTarget = $ancestors$$2$$[$i$$75$$], $ieEvent_part$$inline_399_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$75$$], $be$$1_type$$71$$, $JSCompiler_alias_TRUE$$, $evt$$15_useReturnValue$$inline_402$$)
        }
        if($cur$$inline_398_hasBubble$$1$$) {
          $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_FALSE$$];
          $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
          for($i$$75$$ = 0;!$evt$$15_useReturnValue$$inline_402$$.$propagationStopped_$ && $i$$75$$ < $ancestors$$2$$.length && $targetsMap$$1$$.$remaining_$;$i$$75$$++) {
            $evt$$15_useReturnValue$$inline_402$$.currentTarget = $ancestors$$2$$[$i$$75$$], $ieEvent_part$$inline_399_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$2$$[$i$$75$$], $be$$1_type$$71$$, $JSCompiler_alias_FALSE$$, $evt$$15_useReturnValue$$inline_402$$)
          }
        }
      }else {
        $ieEvent_part$$inline_399_retval$$1$$ = $goog$events$fireListener$$($listener$$45$$, $evt$$15_useReturnValue$$inline_402$$)
      }
    }finally {
      $ancestors$$2$$ && ($ancestors$$2$$.length = 0)
    }
    return $ieEvent_part$$inline_399_retval$$1$$
  }
  $be$$1_type$$71$$ = new $goog$events$BrowserEvent$$($opt_evt$$, this);
  return $ieEvent_part$$inline_399_retval$$1$$ = $goog$events$fireListener$$($listener$$45$$, $be$$1_type$$71$$)
}
;function $goog$events$EventHandler$$($opt_handler$$7$$) {
  $goog$Disposable$$.call(this);
  this.$handler_$ = $opt_handler$$7$$;
  this.$keys_$ = []
}
$goog$inherits$$($goog$events$EventHandler$$, $goog$Disposable$$);
var $goog$events$EventHandler$typeArray_$$ = [];
function $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$self$$, $src$$15$$, $type$$72$$, $opt_fn$$, $opt_capture$$1$$) {
  $goog$isArray$$($type$$72$$) || ($goog$events$EventHandler$typeArray_$$[0] = $type$$72$$, $type$$72$$ = $goog$events$EventHandler$typeArray_$$);
  for(var $i$$76$$ = 0;$i$$76$$ < $type$$72$$.length;$i$$76$$++) {
    var $key$$48$$ = $goog$events$listen$$($src$$15$$, $type$$72$$[$i$$76$$], $opt_fn$$ || $JSCompiler_StaticMethods_listen$self$$, $opt_capture$$1$$ || $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_listen$self$$.$handler_$ || $JSCompiler_StaticMethods_listen$self$$);
    $JSCompiler_StaticMethods_listen$self$$.$keys_$.push($key$$48$$)
  }
  return $JSCompiler_StaticMethods_listen$self$$
}
function $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$50_listener$$47_listenerArray$$inline_412_src$$18$$, $i$$inline_413_type$$74$$, $listener$$inline_408_opt_fn$$2$$, $capture$$inline_411_opt_capture$$3$$, $opt_handler$$11_opt_handler$$inline_410$$) {
  if($goog$isArray$$($i$$inline_413_type$$74$$)) {
    for(var $i$$78$$ = 0;$i$$78$$ < $i$$inline_413_type$$74$$.length;$i$$78$$++) {
      $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$50_listener$$47_listenerArray$$inline_412_src$$18$$, $i$$inline_413_type$$74$$[$i$$78$$], $listener$$inline_408_opt_fn$$2$$, $capture$$inline_411_opt_capture$$3$$, $opt_handler$$11_opt_handler$$inline_410$$)
    }
  }else {
    a: {
      $listener$$inline_408_opt_fn$$2$$ = $listener$$inline_408_opt_fn$$2$$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $opt_handler$$11_opt_handler$$inline_410$$ = $opt_handler$$11_opt_handler$$inline_410$$ || $JSCompiler_StaticMethods_unlisten$self$$.$handler_$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $capture$$inline_411_opt_capture$$3$$ = !!$capture$$inline_411_opt_capture$$3$$;
      if($key$$50_listener$$47_listenerArray$$inline_412_src$$18$$ = $goog$events$getListeners_$$($key$$50_listener$$47_listenerArray$$inline_412_src$$18$$, $i$$inline_413_type$$74$$, $capture$$inline_411_opt_capture$$3$$)) {
        for($i$$inline_413_type$$74$$ = 0;$i$$inline_413_type$$74$$ < $key$$50_listener$$47_listenerArray$$inline_412_src$$18$$.length;$i$$inline_413_type$$74$$++) {
          if(!$key$$50_listener$$47_listenerArray$$inline_412_src$$18$$[$i$$inline_413_type$$74$$].$removed$ && $key$$50_listener$$47_listenerArray$$inline_412_src$$18$$[$i$$inline_413_type$$74$$].$listener$ == $listener$$inline_408_opt_fn$$2$$ && $key$$50_listener$$47_listenerArray$$inline_412_src$$18$$[$i$$inline_413_type$$74$$].capture == $capture$$inline_411_opt_capture$$3$$ && $key$$50_listener$$47_listenerArray$$inline_412_src$$18$$[$i$$inline_413_type$$74$$].$handler$ == $opt_handler$$11_opt_handler$$inline_410$$) {
            $key$$50_listener$$47_listenerArray$$inline_412_src$$18$$ = $key$$50_listener$$47_listenerArray$$inline_412_src$$18$$[$i$$inline_413_type$$74$$];
            break a
          }
        }
      }
      $key$$50_listener$$47_listenerArray$$inline_412_src$$18$$ = $JSCompiler_alias_NULL$$
    }
    $key$$50_listener$$47_listenerArray$$inline_412_src$$18$$ && ($key$$50_listener$$47_listenerArray$$inline_412_src$$18$$ = $key$$50_listener$$47_listenerArray$$inline_412_src$$18$$.key, $goog$events$unlistenByKey$$($key$$50_listener$$47_listenerArray$$inline_412_src$$18$$), $goog$array$remove$$($JSCompiler_StaticMethods_unlisten$self$$.$keys_$, $key$$50_listener$$47_listenerArray$$inline_412_src$$18$$))
  }
  return $JSCompiler_StaticMethods_unlisten$self$$
}
$goog$events$EventHandler$$.prototype.$removeAll$ = function $$goog$events$EventHandler$$$$$removeAll$$() {
  $goog$array$forEach$$(this.$keys_$, $goog$events$unlistenByKey$$);
  this.$keys_$.length = 0
};
$goog$events$EventHandler$$.prototype.handleEvent = function $$goog$events$EventHandler$$$$handleEvent$() {
  $JSCompiler_alias_THROW$$(Error("EventHandler.handleEvent not implemented"))
};
function $goog$events$EventTarget$$() {
  $goog$Disposable$$.call(this)
}
$goog$inherits$$($goog$events$EventTarget$$, $goog$Disposable$$);
$JSCompiler_prototypeAlias$$ = $goog$events$EventTarget$$.prototype;
$JSCompiler_prototypeAlias$$.$customEvent_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$parentEventTarget_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$setParentEventTarget$ = function $$JSCompiler_prototypeAlias$$$$setParentEventTarget$$($parent$$18$$) {
  this.$parentEventTarget_$ = $parent$$18$$
};
$JSCompiler_prototypeAlias$$.addEventListener = function $$JSCompiler_prototypeAlias$$$addEventListener$($type$$75$$, $handler$$3$$, $opt_capture$$4$$, $opt_handlerScope$$) {
  $goog$events$listen$$(this, $type$$75$$, $handler$$3$$, $opt_capture$$4$$, $opt_handlerScope$$)
};
$JSCompiler_prototypeAlias$$.removeEventListener = function $$JSCompiler_prototypeAlias$$$removeEventListener$($type$$76$$, $handler$$4$$, $opt_capture$$5$$, $opt_handlerScope$$1$$) {
  $goog$events$unlisten$$(this, $type$$76$$, $handler$$4$$, $opt_capture$$5$$, $opt_handlerScope$$1$$)
};
$JSCompiler_prototypeAlias$$.dispatchEvent = function $$JSCompiler_prototypeAlias$$$dispatchEvent$($JSCompiler_inline_result$$27_e$$23_e$$inline_416$$) {
  var $hasCapture$$inline_422_type$$inline_417$$ = $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.type || $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$, $map$$inline_418$$ = $goog$events$listenerTree_$$;
  if($hasCapture$$inline_422_type$$inline_417$$ in $map$$inline_418$$) {
    if($goog$isString$$($JSCompiler_inline_result$$27_e$$23_e$$inline_416$$)) {
      $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$ = new $goog$events$Event$$($JSCompiler_inline_result$$27_e$$23_e$$inline_416$$, this)
    }else {
      if($JSCompiler_inline_result$$27_e$$23_e$$inline_416$$ instanceof $goog$events$Event$$) {
        $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.target = $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.target || this
      }else {
        var $oldEvent$$inline_419_rv$$inline_420$$ = $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$, $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$ = new $goog$events$Event$$($hasCapture$$inline_422_type$$inline_417$$, this);
        $goog$object$extend$$($JSCompiler_inline_result$$27_e$$23_e$$inline_416$$, $oldEvent$$inline_419_rv$$inline_420$$)
      }
    }
    var $oldEvent$$inline_419_rv$$inline_420$$ = 1, $ancestors$$inline_421_current$$inline_426$$, $map$$inline_418$$ = $map$$inline_418$$[$hasCapture$$inline_422_type$$inline_417$$], $hasCapture$$inline_422_type$$inline_417$$ = $JSCompiler_alias_TRUE$$ in $map$$inline_418$$, $parent$$inline_424_targetsMap$$inline_423$$;
    if($hasCapture$$inline_422_type$$inline_417$$) {
      $ancestors$$inline_421_current$$inline_426$$ = [];
      for($parent$$inline_424_targetsMap$$inline_423$$ = this;$parent$$inline_424_targetsMap$$inline_423$$;$parent$$inline_424_targetsMap$$inline_423$$ = $parent$$inline_424_targetsMap$$inline_423$$.$parentEventTarget_$) {
        $ancestors$$inline_421_current$$inline_426$$.push($parent$$inline_424_targetsMap$$inline_423$$)
      }
      $parent$$inline_424_targetsMap$$inline_423$$ = $map$$inline_418$$[$JSCompiler_alias_TRUE$$];
      $parent$$inline_424_targetsMap$$inline_423$$.$remaining_$ = $parent$$inline_424_targetsMap$$inline_423$$.$count_$;
      for(var $i$$inline_425$$ = $ancestors$$inline_421_current$$inline_426$$.length - 1;!$JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.$propagationStopped_$ && 0 <= $i$$inline_425$$ && $parent$$inline_424_targetsMap$$inline_423$$.$remaining_$;$i$$inline_425$$--) {
        $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.currentTarget = $ancestors$$inline_421_current$$inline_426$$[$i$$inline_425$$], $oldEvent$$inline_419_rv$$inline_420$$ &= $goog$events$fireListeners_$$($parent$$inline_424_targetsMap$$inline_423$$, $ancestors$$inline_421_current$$inline_426$$[$i$$inline_425$$], $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.type, $JSCompiler_alias_TRUE$$, $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$) && $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.$returnValue_$ != 
        $JSCompiler_alias_FALSE$$
      }
    }
    if($JSCompiler_alias_FALSE$$ in $map$$inline_418$$) {
      if($parent$$inline_424_targetsMap$$inline_423$$ = $map$$inline_418$$[$JSCompiler_alias_FALSE$$], $parent$$inline_424_targetsMap$$inline_423$$.$remaining_$ = $parent$$inline_424_targetsMap$$inline_423$$.$count_$, $hasCapture$$inline_422_type$$inline_417$$) {
        for($i$$inline_425$$ = 0;!$JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.$propagationStopped_$ && $i$$inline_425$$ < $ancestors$$inline_421_current$$inline_426$$.length && $parent$$inline_424_targetsMap$$inline_423$$.$remaining_$;$i$$inline_425$$++) {
          $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.currentTarget = $ancestors$$inline_421_current$$inline_426$$[$i$$inline_425$$], $oldEvent$$inline_419_rv$$inline_420$$ &= $goog$events$fireListeners_$$($parent$$inline_424_targetsMap$$inline_423$$, $ancestors$$inline_421_current$$inline_426$$[$i$$inline_425$$], $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$) && $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.$returnValue_$ != 
          $JSCompiler_alias_FALSE$$
        }
      }else {
        for($ancestors$$inline_421_current$$inline_426$$ = this;!$JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.$propagationStopped_$ && $ancestors$$inline_421_current$$inline_426$$ && $parent$$inline_424_targetsMap$$inline_423$$.$remaining_$;$ancestors$$inline_421_current$$inline_426$$ = $ancestors$$inline_421_current$$inline_426$$.$parentEventTarget_$) {
          $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.currentTarget = $ancestors$$inline_421_current$$inline_426$$, $oldEvent$$inline_419_rv$$inline_420$$ &= $goog$events$fireListeners_$$($parent$$inline_424_targetsMap$$inline_423$$, $ancestors$$inline_421_current$$inline_426$$, $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.type, $JSCompiler_alias_FALSE$$, $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$) && $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
        }
      }
    }
    $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$ = Boolean($oldEvent$$inline_419_rv$$inline_420$$)
  }else {
    $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$ = $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_inline_result$$27_e$$23_e$$inline_416$$
};
function $goog$math$Box$$($top$$3$$, $right$$6$$, $bottom$$2$$, $left$$6$$) {
  this.top = $top$$3$$;
  this.right = $right$$6$$;
  this.bottom = $bottom$$2$$;
  this.left = $left$$6$$
}
$goog$math$Box$$.prototype.contains = function $$goog$math$Box$$$$contains$($other$$4$$) {
  return!this || !$other$$4$$ ? $JSCompiler_alias_FALSE$$ : $other$$4$$ instanceof $goog$math$Box$$ ? $other$$4$$.left >= this.left && $other$$4$$.right <= this.right && $other$$4$$.top >= this.top && $other$$4$$.bottom <= this.bottom : $other$$4$$.x >= this.left && $other$$4$$.x <= this.right && $other$$4$$.y >= this.top && $other$$4$$.y <= this.bottom
};
function $goog$math$Rect$$($x$$69$$, $y$$38$$, $w$$5$$, $h$$4$$) {
  this.left = $x$$69$$;
  this.top = $y$$38$$;
  this.width = $w$$5$$;
  this.height = $h$$4$$
}
$goog$math$Rect$$.prototype.contains = function $$goog$math$Rect$$$$contains$($another$$) {
  return $another$$ instanceof $goog$math$Rect$$ ? this.left <= $another$$.left && this.left + this.width >= $another$$.left + $another$$.width && this.top <= $another$$.top && this.top + this.height >= $another$$.top + $another$$.height : $another$$.x >= this.left && $another$$.x <= this.left + this.width && $another$$.y >= this.top && $another$$.y <= this.top + this.height
};
function $goog$style$setStyle$$($element$$29$$, $style$$, $opt_value$$5$$) {
  $goog$isString$$($style$$) ? $goog$style$setStyle_$$($element$$29$$, $opt_value$$5$$, $style$$) : $goog$object$forEach$$($style$$, $goog$partial$$($goog$style$setStyle_$$, $element$$29$$))
}
function $goog$style$setStyle_$$($element$$30$$, $value$$65$$, $style$$1$$) {
  $element$$30$$.style[$goog$string$toCamelCase$$($style$$1$$)] = $value$$65$$
}
function $goog$style$getComputedStyle$$($element$$32$$, $property$$4$$) {
  var $doc$$23_styles$$ = $goog$dom$getOwnerDocument$$($element$$32$$);
  return $doc$$23_styles$$.defaultView && $doc$$23_styles$$.defaultView.getComputedStyle && ($doc$$23_styles$$ = $doc$$23_styles$$.defaultView.getComputedStyle($element$$32$$, $JSCompiler_alias_NULL$$)) ? $doc$$23_styles$$[$property$$4$$] || $doc$$23_styles$$.getPropertyValue($property$$4$$) || "" : ""
}
function $goog$style$getCascadedStyle$$($element$$33$$, $style$$2$$) {
  return $element$$33$$.currentStyle ? $element$$33$$.currentStyle[$style$$2$$] : $JSCompiler_alias_NULL$$
}
function $goog$style$getStyle_$$($element$$34$$, $style$$3$$) {
  return $goog$style$getComputedStyle$$($element$$34$$, $style$$3$$) || $goog$style$getCascadedStyle$$($element$$34$$, $style$$3$$) || $element$$34$$.style && $element$$34$$.style[$style$$3$$]
}
function $goog$style$setPosition$$($el$$4$$, $arg1_y$$39$$, $opt_arg2$$) {
  var $x$$70$$, $buggyGeckoSubPixelPos$$ = $goog$userAgent$GECKO$$ && ($goog$userAgent$detectedMac_$$ || $goog$userAgent$X11$$) && $goog$userAgent$isVersion$$("1.9");
  $arg1_y$$39$$ instanceof $goog$math$Coordinate$$ ? ($x$$70$$ = $arg1_y$$39$$.x, $arg1_y$$39$$ = $arg1_y$$39$$.y) : ($x$$70$$ = $arg1_y$$39$$, $arg1_y$$39$$ = $opt_arg2$$);
  $el$$4$$.style.left = $goog$style$getPixelStyleValue_$$($x$$70$$, $buggyGeckoSubPixelPos$$);
  $el$$4$$.style.top = $goog$style$getPixelStyleValue_$$($arg1_y$$39$$, $buggyGeckoSubPixelPos$$)
}
function $goog$style$getBoundingClientRect_$$($doc$$26_el$$5$$) {
  var $rect$$4$$ = $doc$$26_el$$5$$.getBoundingClientRect();
  $goog$userAgent$IE$$ && ($doc$$26_el$$5$$ = $doc$$26_el$$5$$.ownerDocument, $rect$$4$$.left -= $doc$$26_el$$5$$.documentElement.clientLeft + $doc$$26_el$$5$$.body.clientLeft, $rect$$4$$.top -= $doc$$26_el$$5$$.documentElement.clientTop + $doc$$26_el$$5$$.body.clientTop);
  return $rect$$4$$
}
function $goog$style$getOffsetParent$$($element$$43_parent$$19$$) {
  if($goog$userAgent$IE$$ && !$goog$userAgent$isDocumentMode$$(8)) {
    return $element$$43_parent$$19$$.offsetParent
  }
  for(var $doc$$27$$ = $goog$dom$getOwnerDocument$$($element$$43_parent$$19$$), $positionStyle$$ = $goog$style$getStyle_$$($element$$43_parent$$19$$, "position"), $skipStatic$$ = "fixed" == $positionStyle$$ || "absolute" == $positionStyle$$, $element$$43_parent$$19$$ = $element$$43_parent$$19$$.parentNode;$element$$43_parent$$19$$ && $element$$43_parent$$19$$ != $doc$$27$$;$element$$43_parent$$19$$ = $element$$43_parent$$19$$.parentNode) {
    if($positionStyle$$ = $goog$style$getStyle_$$($element$$43_parent$$19$$, "position"), $skipStatic$$ = $skipStatic$$ && "static" == $positionStyle$$ && $element$$43_parent$$19$$ != $doc$$27$$.documentElement && $element$$43_parent$$19$$ != $doc$$27$$.body, !$skipStatic$$ && ($element$$43_parent$$19$$.scrollWidth > $element$$43_parent$$19$$.clientWidth || $element$$43_parent$$19$$.scrollHeight > $element$$43_parent$$19$$.clientHeight || "fixed" == $positionStyle$$ || "absolute" == $positionStyle$$ || 
    "relative" == $positionStyle$$)) {
      return $element$$43_parent$$19$$
    }
  }
  return $JSCompiler_alias_NULL$$
}
function $goog$style$getPageOffset$$($el$$8_scrollCoord_vpBox$$) {
  var $box$$7_doc$$inline_430$$, $doc$$28$$ = $goog$dom$getOwnerDocument$$($el$$8_scrollCoord_vpBox$$), $positionStyle$$1$$ = $goog$style$getStyle_$$($el$$8_scrollCoord_vpBox$$, "position"), $BUGGY_GECKO_BOX_OBJECT_parent$$20$$ = $goog$userAgent$GECKO$$ && $doc$$28$$.getBoxObjectFor && !$el$$8_scrollCoord_vpBox$$.getBoundingClientRect && "absolute" == $positionStyle$$1$$ && ($box$$7_doc$$inline_430$$ = $doc$$28$$.getBoxObjectFor($el$$8_scrollCoord_vpBox$$)) && (0 > $box$$7_doc$$inline_430$$.screenX || 
  0 > $box$$7_doc$$inline_430$$.screenY), $pos$$2$$ = new $goog$math$Coordinate$$(0, 0), $JSCompiler_temp$$801_JSCompiler_temp$$802_viewportElement$$;
  $box$$7_doc$$inline_430$$ = $doc$$28$$ ? $goog$dom$getOwnerDocument$$($doc$$28$$) : document;
  if($JSCompiler_temp$$801_JSCompiler_temp$$802_viewportElement$$ = $goog$userAgent$IE$$) {
    if($JSCompiler_temp$$801_JSCompiler_temp$$802_viewportElement$$ = !$goog$userAgent$isDocumentMode$$(9)) {
      $goog$dom$getDomHelper$$($box$$7_doc$$inline_430$$), $JSCompiler_temp$$801_JSCompiler_temp$$802_viewportElement$$ = $JSCompiler_alias_FALSE$$
    }
  }
  $JSCompiler_temp$$801_JSCompiler_temp$$802_viewportElement$$ = $JSCompiler_temp$$801_JSCompiler_temp$$802_viewportElement$$ ? $box$$7_doc$$inline_430$$.body : $box$$7_doc$$inline_430$$.documentElement;
  if($el$$8_scrollCoord_vpBox$$ == $JSCompiler_temp$$801_JSCompiler_temp$$802_viewportElement$$) {
    return $pos$$2$$
  }
  if($el$$8_scrollCoord_vpBox$$.getBoundingClientRect) {
    $box$$7_doc$$inline_430$$ = $goog$style$getBoundingClientRect_$$($el$$8_scrollCoord_vpBox$$), $el$$8_scrollCoord_vpBox$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($doc$$28$$)), $pos$$2$$.x = $box$$7_doc$$inline_430$$.left + $el$$8_scrollCoord_vpBox$$.x, $pos$$2$$.y = $box$$7_doc$$inline_430$$.top + $el$$8_scrollCoord_vpBox$$.y
  }else {
    if($doc$$28$$.getBoxObjectFor && !$BUGGY_GECKO_BOX_OBJECT_parent$$20$$) {
      $box$$7_doc$$inline_430$$ = $doc$$28$$.getBoxObjectFor($el$$8_scrollCoord_vpBox$$), $el$$8_scrollCoord_vpBox$$ = $doc$$28$$.getBoxObjectFor($JSCompiler_temp$$801_JSCompiler_temp$$802_viewportElement$$), $pos$$2$$.x = $box$$7_doc$$inline_430$$.screenX - $el$$8_scrollCoord_vpBox$$.screenX, $pos$$2$$.y = $box$$7_doc$$inline_430$$.screenY - $el$$8_scrollCoord_vpBox$$.screenY
    }else {
      $BUGGY_GECKO_BOX_OBJECT_parent$$20$$ = $el$$8_scrollCoord_vpBox$$;
      do {
        $pos$$2$$.x += $BUGGY_GECKO_BOX_OBJECT_parent$$20$$.offsetLeft;
        $pos$$2$$.y += $BUGGY_GECKO_BOX_OBJECT_parent$$20$$.offsetTop;
        $BUGGY_GECKO_BOX_OBJECT_parent$$20$$ != $el$$8_scrollCoord_vpBox$$ && ($pos$$2$$.x += $BUGGY_GECKO_BOX_OBJECT_parent$$20$$.clientLeft || 0, $pos$$2$$.y += $BUGGY_GECKO_BOX_OBJECT_parent$$20$$.clientTop || 0);
        if($goog$userAgent$WEBKIT$$ && "fixed" == $goog$style$getStyle_$$($BUGGY_GECKO_BOX_OBJECT_parent$$20$$, "position")) {
          $pos$$2$$.x += $doc$$28$$.body.scrollLeft;
          $pos$$2$$.y += $doc$$28$$.body.scrollTop;
          break
        }
        $BUGGY_GECKO_BOX_OBJECT_parent$$20$$ = $BUGGY_GECKO_BOX_OBJECT_parent$$20$$.offsetParent
      }while($BUGGY_GECKO_BOX_OBJECT_parent$$20$$ && $BUGGY_GECKO_BOX_OBJECT_parent$$20$$ != $el$$8_scrollCoord_vpBox$$);
      if($goog$userAgent$OPERA$$ || $goog$userAgent$WEBKIT$$ && "absolute" == $positionStyle$$1$$) {
        $pos$$2$$.y -= $doc$$28$$.body.offsetTop
      }
      for($BUGGY_GECKO_BOX_OBJECT_parent$$20$$ = $el$$8_scrollCoord_vpBox$$;($BUGGY_GECKO_BOX_OBJECT_parent$$20$$ = $goog$style$getOffsetParent$$($BUGGY_GECKO_BOX_OBJECT_parent$$20$$)) && $BUGGY_GECKO_BOX_OBJECT_parent$$20$$ != $doc$$28$$.body && $BUGGY_GECKO_BOX_OBJECT_parent$$20$$ != $JSCompiler_temp$$801_JSCompiler_temp$$802_viewportElement$$;) {
        if($pos$$2$$.x -= $BUGGY_GECKO_BOX_OBJECT_parent$$20$$.scrollLeft, !$goog$userAgent$OPERA$$ || "TR" != $BUGGY_GECKO_BOX_OBJECT_parent$$20$$.tagName) {
          $pos$$2$$.y -= $BUGGY_GECKO_BOX_OBJECT_parent$$20$$.scrollTop
        }
      }
    }
  }
  return $pos$$2$$
}
function $goog$style$getRelativePosition$$($a$$28$$, $b$$23$$) {
  var $ap$$ = $goog$style$getClientPosition$$($a$$28$$), $bp$$ = $goog$style$getClientPosition$$($b$$23$$);
  return new $goog$math$Coordinate$$($ap$$.x - $bp$$.x, $ap$$.y - $bp$$.y)
}
function $goog$style$getClientPosition$$($JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$) {
  var $JSCompiler_temp_const$$32_pos$$4$$ = new $goog$math$Coordinate$$;
  if(1 == $JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$.nodeType) {
    if($JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$.getBoundingClientRect) {
      var $box$$8_scrollCoord$$1$$ = $goog$style$getBoundingClientRect_$$($JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$);
      $JSCompiler_temp_const$$32_pos$$4$$.x = $box$$8_scrollCoord$$1$$.left;
      $JSCompiler_temp_const$$32_pos$$4$$.y = $box$$8_scrollCoord$$1$$.top
    }else {
      var $box$$8_scrollCoord$$1$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$)), $pageCoord$$ = $goog$style$getPageOffset$$($JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$);
      $JSCompiler_temp_const$$32_pos$$4$$.x = $pageCoord$$.x - $box$$8_scrollCoord$$1$$.x;
      $JSCompiler_temp_const$$32_pos$$4$$.y = $pageCoord$$.y - $box$$8_scrollCoord$$1$$.y
    }
    if($goog$userAgent$GECKO$$ && !$goog$userAgent$isVersion$$(12)) {
      var $isAbstractedEvent_property$$inline_433$$;
      $goog$userAgent$IE$$ ? $isAbstractedEvent_property$$inline_433$$ = "-ms-transform" : $goog$userAgent$WEBKIT$$ ? $isAbstractedEvent_property$$inline_433$$ = "-webkit-transform" : $goog$userAgent$OPERA$$ ? $isAbstractedEvent_property$$inline_433$$ = "-o-transform" : $goog$userAgent$GECKO$$ && ($isAbstractedEvent_property$$inline_433$$ = "-moz-transform");
      var $targetEvent_transform$$inline_434$$;
      $isAbstractedEvent_property$$inline_433$$ && ($targetEvent_transform$$inline_434$$ = $goog$style$getStyle_$$($JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$, $isAbstractedEvent_property$$inline_433$$));
      $targetEvent_transform$$inline_434$$ || ($targetEvent_transform$$inline_434$$ = $goog$style$getStyle_$$($JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$, "transform"));
      $targetEvent_transform$$inline_434$$ ? ($JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$ = $targetEvent_transform$$inline_434$$.match($goog$style$MATRIX_TRANSLATION_REGEX_$$), $JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$ = !$JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$ ? new $goog$math$Coordinate$$(0, 0) : new $goog$math$Coordinate$$(parseFloat($JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$[1]), parseFloat($JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$[2]))) : 
      $JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$ = new $goog$math$Coordinate$$(0, 0);
      $JSCompiler_temp_const$$32_pos$$4$$ = new $goog$math$Coordinate$$($JSCompiler_temp_const$$32_pos$$4$$.x + $JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$.x, $JSCompiler_temp_const$$32_pos$$4$$.y + $JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$.y)
    }
  }else {
    $isAbstractedEvent_property$$inline_433$$ = $goog$isFunction$$($JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$.$getBrowserEvent$), $targetEvent_transform$$inline_434$$ = $JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$, $JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$.targetTouches ? $targetEvent_transform$$inline_434$$ = $JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$.targetTouches[0] : $isAbstractedEvent_property$$inline_433$$ && $JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$.$event_$.targetTouches && 
    ($targetEvent_transform$$inline_434$$ = $JSCompiler_inline_result$$33_el$$12_matches$$inline_435$$.$event_$.targetTouches[0]), $JSCompiler_temp_const$$32_pos$$4$$.x = $targetEvent_transform$$inline_434$$.clientX, $JSCompiler_temp_const$$32_pos$$4$$.y = $targetEvent_transform$$inline_434$$.clientY
  }
  return $JSCompiler_temp_const$$32_pos$$4$$
}
function $goog$style$setSize$$($element$$47$$, $w$$6$$, $h$$5_opt_h$$) {
  $w$$6$$ instanceof $goog$math$Size$$ ? ($h$$5_opt_h$$ = $w$$6$$.height, $w$$6$$ = $w$$6$$.width) : $h$$5_opt_h$$ == $JSCompiler_alias_VOID$$ && $JSCompiler_alias_THROW$$(Error("missing height argument"));
  $element$$47$$.style.width = $goog$style$getPixelStyleValue_$$($w$$6$$, $JSCompiler_alias_TRUE$$);
  $element$$47$$.style.height = $goog$style$getPixelStyleValue_$$($h$$5_opt_h$$, $JSCompiler_alias_TRUE$$)
}
function $goog$style$getPixelStyleValue_$$($value$$66$$, $round$$) {
  "number" == typeof $value$$66$$ && ($value$$66$$ = ($round$$ ? Math.round($value$$66$$) : $value$$66$$) + "px");
  return $value$$66$$
}
function $goog$style$getSize$$($element$$50_size$$10$$) {
  if("none" != $goog$style$getStyle_$$($element$$50_size$$10$$, "display")) {
    return $goog$style$getSizeWithDisplay_$$($element$$50_size$$10$$)
  }
  var $style$$4$$ = $element$$50_size$$10$$.style, $originalDisplay$$ = $style$$4$$.display, $originalVisibility$$ = $style$$4$$.visibility, $originalPosition$$ = $style$$4$$.position;
  $style$$4$$.visibility = "hidden";
  $style$$4$$.position = "absolute";
  $style$$4$$.display = "inline";
  $element$$50_size$$10$$ = $goog$style$getSizeWithDisplay_$$($element$$50_size$$10$$);
  $style$$4$$.display = $originalDisplay$$;
  $style$$4$$.position = $originalPosition$$;
  $style$$4$$.visibility = $originalVisibility$$;
  return $element$$50_size$$10$$
}
function $goog$style$getSizeWithDisplay_$$($clientRect_element$$51$$) {
  var $offsetWidth$$ = $clientRect_element$$51$$.offsetWidth, $offsetHeight$$ = $clientRect_element$$51$$.offsetHeight, $webkitOffsetsZero$$ = $goog$userAgent$WEBKIT$$ && !$offsetWidth$$ && !$offsetHeight$$;
  return(!$goog$isDef$$($offsetWidth$$) || $webkitOffsetsZero$$) && $clientRect_element$$51$$.getBoundingClientRect ? ($clientRect_element$$51$$ = $goog$style$getBoundingClientRect_$$($clientRect_element$$51$$), new $goog$math$Size$$($clientRect_element$$51$$.right - $clientRect_element$$51$$.left, $clientRect_element$$51$$.bottom - $clientRect_element$$51$$.top)) : new $goog$math$Size$$($offsetWidth$$, $offsetHeight$$)
}
function $goog$style$getBounds$$($element$$52_s$$18$$) {
  var $o$$1$$ = $goog$style$getPageOffset$$($element$$52_s$$18$$), $element$$52_s$$18$$ = $goog$style$getSize$$($element$$52_s$$18$$);
  return new $goog$math$Rect$$($o$$1$$.x, $o$$1$$.y, $element$$52_s$$18$$.width, $element$$52_s$$18$$.height)
}
function $goog$style$setOpacity$$($el$$15$$, $alpha$$3$$) {
  var $style$$6$$ = $el$$15$$.style;
  "opacity" in $style$$6$$ ? $style$$6$$.opacity = $alpha$$3$$ : "MozOpacity" in $style$$6$$ ? $style$$6$$.MozOpacity = $alpha$$3$$ : "filter" in $style$$6$$ && ($style$$6$$.filter = "" === $alpha$$3$$ ? "" : "alpha(opacity=" + 100 * $alpha$$3$$ + ")")
}
function $goog$style$showElement$$($el$$18$$, $display$$) {
  $el$$18$$.style.display = $display$$ ? "" : "none"
}
function $goog$style$isRightToLeft$$($el$$22$$) {
  return"rtl" == $goog$style$getStyle_$$($el$$22$$, "direction")
}
var $goog$style$unselectableStyle_$$ = $goog$userAgent$GECKO$$ ? "MozUserSelect" : $goog$userAgent$WEBKIT$$ ? "WebkitUserSelect" : $JSCompiler_alias_NULL$$;
function $goog$style$getIePixelValue_$$($element$$59$$, $value$$68$$) {
  if(/^\d+px?$/.test($value$$68$$)) {
    return parseInt($value$$68$$, 10)
  }
  var $oldStyleValue$$ = $element$$59$$.style.left, $oldRuntimeValue$$ = $element$$59$$.runtimeStyle.left;
  $element$$59$$.runtimeStyle.left = $element$$59$$.currentStyle.left;
  $element$$59$$.style.left = $value$$68$$;
  var $pixelValue$$ = $element$$59$$.style.pixelLeft;
  $element$$59$$.style.left = $oldStyleValue$$;
  $element$$59$$.runtimeStyle.left = $oldRuntimeValue$$;
  return $pixelValue$$
}
function $goog$style$getBox_$$($element$$61$$, $stylePrefix$$) {
  if($goog$userAgent$IE$$) {
    var $left$$8$$ = $goog$style$getIePixelValue_$$($element$$61$$, $goog$style$getCascadedStyle$$($element$$61$$, $stylePrefix$$ + "Left")), $right$$9$$ = $goog$style$getIePixelValue_$$($element$$61$$, $goog$style$getCascadedStyle$$($element$$61$$, $stylePrefix$$ + "Right")), $top$$6$$ = $goog$style$getIePixelValue_$$($element$$61$$, $goog$style$getCascadedStyle$$($element$$61$$, $stylePrefix$$ + "Top")), $bottom$$5$$ = $goog$style$getIePixelValue_$$($element$$61$$, $goog$style$getCascadedStyle$$($element$$61$$, 
    $stylePrefix$$ + "Bottom"));
    return new $goog$math$Box$$($top$$6$$, $right$$9$$, $bottom$$5$$, $left$$8$$)
  }
  $left$$8$$ = $goog$style$getComputedStyle$$($element$$61$$, $stylePrefix$$ + "Left");
  $right$$9$$ = $goog$style$getComputedStyle$$($element$$61$$, $stylePrefix$$ + "Right");
  $top$$6$$ = $goog$style$getComputedStyle$$($element$$61$$, $stylePrefix$$ + "Top");
  $bottom$$5$$ = $goog$style$getComputedStyle$$($element$$61$$, $stylePrefix$$ + "Bottom");
  return new $goog$math$Box$$(parseFloat($top$$6$$), parseFloat($right$$9$$), parseFloat($bottom$$5$$), parseFloat($left$$8$$))
}
var $goog$style$ieBorderWidthKeywords_$$ = {thin:2, medium:4, thick:6};
function $goog$style$getIePixelBorder_$$($element$$64$$, $prop$$5$$) {
  if("none" == $goog$style$getCascadedStyle$$($element$$64$$, $prop$$5$$ + "Style")) {
    return 0
  }
  var $width$$15$$ = $goog$style$getCascadedStyle$$($element$$64$$, $prop$$5$$ + "Width");
  return $width$$15$$ in $goog$style$ieBorderWidthKeywords_$$ ? $goog$style$ieBorderWidthKeywords_$$[$width$$15$$] : $goog$style$getIePixelValue_$$($element$$64$$, $width$$15$$)
}
function $goog$style$getBorderBox$$($bottom$$6_element$$65$$) {
  if($goog$userAgent$IE$$) {
    var $left$$9$$ = $goog$style$getIePixelBorder_$$($bottom$$6_element$$65$$, "borderLeft"), $right$$10$$ = $goog$style$getIePixelBorder_$$($bottom$$6_element$$65$$, "borderRight"), $top$$7$$ = $goog$style$getIePixelBorder_$$($bottom$$6_element$$65$$, "borderTop"), $bottom$$6_element$$65$$ = $goog$style$getIePixelBorder_$$($bottom$$6_element$$65$$, "borderBottom");
    return new $goog$math$Box$$($top$$7$$, $right$$10$$, $bottom$$6_element$$65$$, $left$$9$$)
  }
  $left$$9$$ = $goog$style$getComputedStyle$$($bottom$$6_element$$65$$, "borderLeftWidth");
  $right$$10$$ = $goog$style$getComputedStyle$$($bottom$$6_element$$65$$, "borderRightWidth");
  $top$$7$$ = $goog$style$getComputedStyle$$($bottom$$6_element$$65$$, "borderTopWidth");
  $bottom$$6_element$$65$$ = $goog$style$getComputedStyle$$($bottom$$6_element$$65$$, "borderBottomWidth");
  return new $goog$math$Box$$(parseFloat($top$$7$$), parseFloat($right$$10$$), parseFloat($bottom$$6_element$$65$$), parseFloat($left$$9$$))
}
var $goog$style$MATRIX_TRANSLATION_REGEX_$$ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
function $goog$fx$Dragger$$($target$$43$$, $opt_handle$$, $opt_limits$$) {
  $goog$Disposable$$.call(this);
  this.target = $target$$43$$;
  this.handle = $opt_handle$$ || $target$$43$$;
  this.$limits$ = $opt_limits$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN);
  this.$document_$ = $goog$dom$getOwnerDocument$$($target$$43$$);
  this.$eventHandler_$ = new $goog$events$EventHandler$$(this);
  $goog$events$listen$$(this.handle, ["touchstart", "mousedown"], this.$startDrag$, $JSCompiler_alias_FALSE$$, this)
}
$goog$inherits$$($goog$fx$Dragger$$, $goog$events$EventTarget$$);
var $goog$fx$Dragger$HAS_SET_CAPTURE_$$ = $goog$userAgent$IE$$ || $goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9.3");
$JSCompiler_prototypeAlias$$ = $goog$fx$Dragger$$.prototype;
$JSCompiler_prototypeAlias$$.clientX = 0;
$JSCompiler_prototypeAlias$$.clientY = 0;
$JSCompiler_prototypeAlias$$.screenX = 0;
$JSCompiler_prototypeAlias$$.screenY = 0;
$JSCompiler_prototypeAlias$$.$startX$ = 0;
$JSCompiler_prototypeAlias$$.$startY$ = 0;
$JSCompiler_prototypeAlias$$.$deltaX$ = 0;
$JSCompiler_prototypeAlias$$.$deltaY$ = 0;
$JSCompiler_prototypeAlias$$.$enabled_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$dragging_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$hysteresisDistanceSquared_$ = 0;
$JSCompiler_prototypeAlias$$.$mouseDownTime_$ = 0;
$JSCompiler_prototypeAlias$$.$ieDragStartCancellingOn_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$useRightPositioningForRtl_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$getHandler$ = $JSCompiler_get$$("$eventHandler_$");
function $JSCompiler_StaticMethods_isRightToLeft_$$($JSCompiler_StaticMethods_isRightToLeft_$self$$) {
  $goog$isDef$$($JSCompiler_StaticMethods_isRightToLeft_$self$$.$rightToLeft_$) || ($JSCompiler_StaticMethods_isRightToLeft_$self$$.$rightToLeft_$ = $goog$style$isRightToLeft$$($JSCompiler_StaticMethods_isRightToLeft_$self$$.target));
  return $JSCompiler_StaticMethods_isRightToLeft_$self$$.$rightToLeft_$
}
$JSCompiler_prototypeAlias$$.$startDrag$ = function $$JSCompiler_prototypeAlias$$$$startDrag$$($JSCompiler_temp$$26_e$$25_element$$inline_452$$) {
  var $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$ = "mousedown" == $JSCompiler_temp$$26_e$$25_element$$inline_452$$.type;
  if(this.$enabled_$ && !this.$dragging_$ && (!$doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$ || $JSCompiler_StaticMethods_isMouseActionButton$$($JSCompiler_temp$$26_e$$25_element$$inline_452$$))) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($JSCompiler_temp$$26_e$$25_element$$inline_452$$);
    if(0 == this.$hysteresisDistanceSquared_$) {
      if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $JSCompiler_temp$$26_e$$25_element$$inline_452$$.clientX, $JSCompiler_temp$$26_e$$25_element$$inline_452$$.clientY, $JSCompiler_temp$$26_e$$25_element$$inline_452$$))) {
        this.$dragging_$ = $JSCompiler_alias_TRUE$$, $JSCompiler_temp$$26_e$$25_element$$inline_452$$.preventDefault()
      }else {
        return
      }
    }else {
      $JSCompiler_temp$$26_e$$25_element$$inline_452$$.preventDefault()
    }
    var $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$ = this.$document_$, $bestParent$$inline_454_docEl$$inline_449$$ = $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$.documentElement, $borderWidths$$inline_455_useCapture$$inline_450$$ = !$goog$fx$Dragger$HAS_SET_CAPTURE_$$;
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$, ["touchmove", "mousemove"], this.$handleMove_$, $borderWidths$$inline_455_useCapture$$inline_450$$);
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$, ["touchend", "mouseup"], this.$endDrag$, $borderWidths$$inline_455_useCapture$$inline_450$$);
    $goog$fx$Dragger$HAS_SET_CAPTURE_$$ ? ($bestParent$$inline_454_docEl$$inline_449$$.setCapture($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $bestParent$$inline_454_docEl$$inline_449$$, "losecapture", this.$endDrag$)) : $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$ ? $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$.parentWindow || $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$.defaultView : 
    window, "blur", this.$endDrag$);
    $goog$userAgent$IE$$ && this.$ieDragStartCancellingOn_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$, "dragstart", $goog$events$Event$preventDefault$$);
    this.$scrollTarget_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, this.$scrollTarget_$, "scroll", this.$onScroll_$, $borderWidths$$inline_455_useCapture$$inline_450$$);
    this.clientX = this.$startX$ = $JSCompiler_temp$$26_e$$25_element$$inline_452$$.clientX;
    this.clientY = this.$startY$ = $JSCompiler_temp$$26_e$$25_element$$inline_452$$.clientY;
    this.screenX = $JSCompiler_temp$$26_e$$25_element$$inline_452$$.screenX;
    this.screenY = $JSCompiler_temp$$26_e$$25_element$$inline_452$$.screenY;
    this.$useRightPositioningForRtl_$ ? ($JSCompiler_temp$$26_e$$25_element$$inline_452$$ = this.target, $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$ = $JSCompiler_temp$$26_e$$25_element$$inline_452$$.offsetLeft, $bestParent$$inline_454_docEl$$inline_449$$ = $JSCompiler_temp$$26_e$$25_element$$inline_452$$.offsetParent, !$bestParent$$inline_454_docEl$$inline_449$$ && "fixed" == $goog$style$getStyle_$$($JSCompiler_temp$$26_e$$25_element$$inline_452$$, "position") && ($bestParent$$inline_454_docEl$$inline_449$$ = 
    $goog$dom$getOwnerDocument$$($JSCompiler_temp$$26_e$$25_element$$inline_452$$).documentElement), $bestParent$$inline_454_docEl$$inline_449$$ ? ($goog$userAgent$GECKO$$ ? ($borderWidths$$inline_455_useCapture$$inline_450$$ = $goog$style$getBorderBox$$($bestParent$$inline_454_docEl$$inline_449$$), $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$ += $borderWidths$$inline_455_useCapture$$inline_450$$.left) : $goog$userAgent$isDocumentMode$$(8) && ($borderWidths$$inline_455_useCapture$$inline_450$$ = 
    $goog$style$getBorderBox$$($bestParent$$inline_454_docEl$$inline_449$$), $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$ -= $borderWidths$$inline_455_useCapture$$inline_450$$.left), $JSCompiler_temp$$26_e$$25_element$$inline_452$$ = $goog$style$isRightToLeft$$($bestParent$$inline_454_docEl$$inline_449$$) ? $bestParent$$inline_454_docEl$$inline_449$$.clientWidth - ($doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$ + $JSCompiler_temp$$26_e$$25_element$$inline_452$$.offsetWidth) : 
    $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$) : $JSCompiler_temp$$26_e$$25_element$$inline_452$$ = $doc$$inline_448_isMouseDown_offsetLeftForReal$$inline_453$$) : $JSCompiler_temp$$26_e$$25_element$$inline_452$$ = this.target.offsetLeft;
    this.$deltaX$ = $JSCompiler_temp$$26_e$$25_element$$inline_452$$;
    this.$deltaY$ = this.target.offsetTop;
    this.$pageScroll$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$(this.$document_$));
    this.$mouseDownTime_$ = $goog$now$$()
  }else {
    this.dispatchEvent("earlycancel")
  }
};
$JSCompiler_prototypeAlias$$.$endDrag$ = function $$JSCompiler_prototypeAlias$$$$endDrag$$($e$$27$$, $opt_dragCanceled$$) {
  this.$eventHandler_$.$removeAll$();
  $goog$fx$Dragger$HAS_SET_CAPTURE_$$ && this.$document_$.releaseCapture();
  if(this.$dragging_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$27$$);
    this.$dragging_$ = $JSCompiler_alias_FALSE$$;
    var $x$$72$$ = $JSCompiler_StaticMethods_limitX$$(this, this.$deltaX$), $y$$40$$ = $JSCompiler_StaticMethods_limitY$$(this, this.$deltaY$);
    this.dispatchEvent(new $goog$fx$DragEvent$$("end", this, $e$$27$$.clientX, $e$$27$$.clientY, $e$$27$$, $x$$72$$, $y$$40$$, $opt_dragCanceled$$ || "touchcancel" == $e$$27$$.type))
  }else {
    this.dispatchEvent("earlycancel")
  }
  ("touchend" == $e$$27$$.type || "touchcancel" == $e$$27$$.type) && $e$$27$$.preventDefault()
};
function $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$29$$) {
  var $type$$77$$ = $e$$29$$.type;
  "touchstart" == $type$$77$$ || "touchmove" == $type$$77$$ ? $e$$29$$.init($e$$29$$.$event_$.targetTouches[0], $e$$29$$.currentTarget) : ("touchend" == $type$$77$$ || "touchcancel" == $type$$77$$) && $e$$29$$.init($e$$29$$.$event_$.changedTouches[0], $e$$29$$.currentTarget)
}
$JSCompiler_prototypeAlias$$.$handleMove_$ = function $$JSCompiler_prototypeAlias$$$$handleMove_$$($e$$30$$) {
  if(this.$enabled_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$30$$);
    var $dx$$7_x$$73$$ = (this.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$(this) ? -1 : 1) * ($e$$30$$.clientX - this.clientX), $dy$$7_pos$$5_y$$41$$ = $e$$30$$.clientY - this.clientY;
    this.clientX = $e$$30$$.clientX;
    this.clientY = $e$$30$$.clientY;
    this.screenX = $e$$30$$.screenX;
    this.screenY = $e$$30$$.screenY;
    if(!this.$dragging_$) {
      var $diffX$$ = this.$startX$ - this.clientX, $diffY$$ = this.$startY$ - this.clientY;
      if($diffX$$ * $diffX$$ + $diffY$$ * $diffY$$ > this.$hysteresisDistanceSquared_$) {
        if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $e$$30$$.clientX, $e$$30$$.clientY, $e$$30$$))) {
          this.$dragging_$ = $JSCompiler_alias_TRUE$$
        }else {
          this.$disposed_$ || this.$endDrag$($e$$30$$);
          return
        }
      }
    }
    $dy$$7_pos$$5_y$$41$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, $dx$$7_x$$73$$, $dy$$7_pos$$5_y$$41$$);
    $dx$$7_x$$73$$ = $dy$$7_pos$$5_y$$41$$.x;
    $dy$$7_pos$$5_y$$41$$ = $dy$$7_pos$$5_y$$41$$.y;
    this.$dragging_$ && this.dispatchEvent(new $goog$fx$DragEvent$$("beforedrag", this, $e$$30$$.clientX, $e$$30$$.clientY, $e$$30$$, $dx$$7_x$$73$$, $dy$$7_pos$$5_y$$41$$)) && ($JSCompiler_StaticMethods_doDrag$$(this, $e$$30$$, $dx$$7_x$$73$$, $dy$$7_pos$$5_y$$41$$), $e$$30$$.preventDefault())
  }
};
function $JSCompiler_StaticMethods_calculatePosition_$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$, $dx$$8_x$$74$$, $dy$$8$$) {
  var $pageScroll$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$.$document_$)), $dx$$8_x$$74$$ = $dx$$8_x$$74$$ + ($pageScroll$$.x - $JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$.$pageScroll$.x), $dy$$8$$ = $dy$$8$$ + ($pageScroll$$.y - $JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$.$pageScroll$.y);
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$.$pageScroll$ = $pageScroll$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$.$deltaX$ += $dx$$8_x$$74$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$.$deltaY$ += $dy$$8$$;
  $dx$$8_x$$74$$ = $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$.$deltaX$);
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$ = $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$.$deltaY$);
  return new $goog$math$Coordinate$$($dx$$8_x$$74$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$42$$)
}
$JSCompiler_prototypeAlias$$.$onScroll_$ = function $$JSCompiler_prototypeAlias$$$$onScroll_$$($e$$31$$) {
  var $pos$$6$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, 0, 0);
  $e$$31$$.clientX = this.clientX;
  $e$$31$$.clientY = this.clientY;
  $JSCompiler_StaticMethods_doDrag$$(this, $e$$31$$, $pos$$6$$.x, $pos$$6$$.y)
};
function $JSCompiler_StaticMethods_doDrag$$($JSCompiler_StaticMethods_doDrag$self$$, $e$$32$$, $x$$75$$, $y$$43$$) {
  $JSCompiler_StaticMethods_doDrag$self$$.$defaultAction$($x$$75$$, $y$$43$$);
  $JSCompiler_StaticMethods_doDrag$self$$.dispatchEvent(new $goog$fx$DragEvent$$("drag", $JSCompiler_StaticMethods_doDrag$self$$, $e$$32$$.clientX, $e$$32$$.clientY, $e$$32$$, $x$$75$$, $y$$43$$))
}
function $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_limitX$self$$, $x$$76$$) {
  var $rect$$6_width$$17$$ = $JSCompiler_StaticMethods_limitX$self$$.$limits$, $left$$11$$ = !isNaN($rect$$6_width$$17$$.left) ? $rect$$6_width$$17$$.left : $JSCompiler_alias_NULL$$, $rect$$6_width$$17$$ = !isNaN($rect$$6_width$$17$$.width) ? $rect$$6_width$$17$$.width : 0;
  return Math.min($left$$11$$ != $JSCompiler_alias_NULL$$ ? $left$$11$$ + $rect$$6_width$$17$$ : Infinity, Math.max($left$$11$$ != $JSCompiler_alias_NULL$$ ? $left$$11$$ : -Infinity, $x$$76$$))
}
function $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_limitY$self$$, $y$$44$$) {
  var $height$$16_rect$$7$$ = $JSCompiler_StaticMethods_limitY$self$$.$limits$, $top$$9$$ = !isNaN($height$$16_rect$$7$$.top) ? $height$$16_rect$$7$$.top : $JSCompiler_alias_NULL$$, $height$$16_rect$$7$$ = !isNaN($height$$16_rect$$7$$.height) ? $height$$16_rect$$7$$.height : 0;
  return Math.min($top$$9$$ != $JSCompiler_alias_NULL$$ ? $top$$9$$ + $height$$16_rect$$7$$ : Infinity, Math.max($top$$9$$ != $JSCompiler_alias_NULL$$ ? $top$$9$$ : -Infinity, $y$$44$$))
}
$JSCompiler_prototypeAlias$$.$defaultAction$ = function $$JSCompiler_prototypeAlias$$$$defaultAction$$($x$$77$$, $y$$45$$) {
  this.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$(this) ? this.target.style.right = $x$$77$$ + "px" : this.target.style.left = $x$$77$$ + "px";
  this.target.style.top = $y$$45$$ + "px"
};
function $goog$fx$DragEvent$$($type$$78$$, $dragobj$$, $clientX$$2$$, $clientY$$2$$, $browserEvent$$, $opt_actX$$, $opt_actY$$, $opt_dragCanceled$$1$$) {
  $goog$events$Event$$.call(this, $type$$78$$);
  this.clientX = $clientX$$2$$;
  this.clientY = $clientY$$2$$;
  this.$browserEvent$ = $browserEvent$$;
  this.left = $goog$isDef$$($opt_actX$$) ? $opt_actX$$ : $dragobj$$.$deltaX$;
  this.top = $goog$isDef$$($opt_actY$$) ? $opt_actY$$ : $dragobj$$.$deltaY$;
  this.$dragger$ = $dragobj$$;
  this.$dragCanceled$ = !!$opt_dragCanceled$$1$$
}
$goog$inherits$$($goog$fx$DragEvent$$, $goog$events$Event$$);
function $annotorious$dom$getOffset$$($el$$29$$) {
  for(var $_x$$ = 0, $_y$$ = 0;$el$$29$$ && !isNaN($el$$29$$.offsetLeft) && !isNaN($el$$29$$.offsetTop);) {
    $_x$$ += $el$$29$$.offsetLeft - $el$$29$$.scrollLeft, $_y$$ += $el$$29$$.offsetTop - $el$$29$$.scrollTop, $el$$29$$ = $el$$29$$.offsetParent
  }
  return{top:$_y$$, left:$_x$$}
}
;function $annotorious$events$EventBroker$$() {
  this.$_handlers$ = []
}
$annotorious$events$EventBroker$$.prototype.addHandler = function $$annotorious$events$EventBroker$$$$addHandler$($type$$79$$, $handler$$5$$) {
  this.$_handlers$[$type$$79$$] || (this.$_handlers$[$type$$79$$] = []);
  this.$_handlers$[$type$$79$$].push($handler$$5$$)
};
$annotorious$events$EventBroker$$.prototype.$removeHandler$ = function $$annotorious$events$EventBroker$$$$$removeHandler$$($type$$80$$, $handler$$6$$) {
  var $handlers$$ = this.$_handlers$[$type$$80$$];
  $handlers$$ && $goog$array$remove$$($handlers$$, $handler$$6$$)
};
$annotorious$events$EventBroker$$.prototype.fireEvent = function $$annotorious$events$EventBroker$$$$fireEvent$($handlers$$1_type$$81$$, $opt_event$$, $opt_extra$$) {
  var $cancelEvent$$ = $JSCompiler_alias_FALSE$$;
  ($handlers$$1_type$$81$$ = this.$_handlers$[$handlers$$1_type$$81$$]) && $goog$array$forEach$$($handlers$$1_type$$81$$, function($handler$$7_retVal$$1$$) {
    $handler$$7_retVal$$1$$ = $handler$$7_retVal$$1$$($opt_event$$, $opt_extra$$);
    $goog$isDef$$($handler$$7_retVal$$1$$) && !$handler$$7_retVal$$1$$ && ($cancelEvent$$ = $JSCompiler_alias_TRUE$$)
  });
  return $cancelEvent$$
};
function $goog$structs$Map$$($opt_map$$, $var_args$$68$$) {
  this.$map_$ = {};
  this.$keys_$ = [];
  var $argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$ = arguments.length;
  if(1 < $argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$) {
    $argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$ % 2 && $JSCompiler_alias_THROW$$(Error("Uneven number of arguments"));
    for(var $i$$91_key$$inline_872_values$$inline_465$$ = 0;$i$$91_key$$inline_872_values$$inline_465$$ < $argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$;$i$$91_key$$inline_872_values$$inline_465$$ += 2) {
      this.set(arguments[$i$$91_key$$inline_872_values$$inline_465$$], arguments[$i$$91_key$$inline_872_values$$inline_465$$ + 1])
    }
  }else {
    if($opt_map$$) {
      var $key$$inline_867_keys$$inline_464$$;
      if($opt_map$$ instanceof $goog$structs$Map$$) {
        $JSCompiler_StaticMethods_cleanupKeysArray_$$($opt_map$$), $key$$inline_867_keys$$inline_464$$ = $opt_map$$.$keys_$.concat(), $i$$91_key$$inline_872_values$$inline_465$$ = $JSCompiler_StaticMethods_getValues$$($opt_map$$)
      }else {
        var $argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$ = [], $i$$inline_866_i$$inline_871$$ = 0;
        for($key$$inline_867_keys$$inline_464$$ in $opt_map$$) {
          $argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$[$i$$inline_866_i$$inline_871$$++] = $key$$inline_867_keys$$inline_464$$
        }
        $key$$inline_867_keys$$inline_464$$ = $argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$;
        $argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$ = [];
        $i$$inline_866_i$$inline_871$$ = 0;
        for($i$$91_key$$inline_872_values$$inline_465$$ in $opt_map$$) {
          $argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$[$i$$inline_866_i$$inline_871$$++] = $opt_map$$[$i$$91_key$$inline_872_values$$inline_465$$]
        }
        $i$$91_key$$inline_872_values$$inline_465$$ = $argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$
      }
      for($argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$ = 0;$argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$ < $key$$inline_867_keys$$inline_464$$.length;$argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$++) {
        this.set($key$$inline_867_keys$$inline_464$$[$argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$], $i$$91_key$$inline_872_values$$inline_465$$[$argLength$$2_i$$inline_466_res$$inline_865_res$$inline_870$$])
      }
    }
  }
}
$JSCompiler_prototypeAlias$$ = $goog$structs$Map$$.prototype;
$JSCompiler_prototypeAlias$$.$count_$ = 0;
$JSCompiler_prototypeAlias$$.$version_$ = 0;
function $JSCompiler_StaticMethods_getValues$$($JSCompiler_StaticMethods_getValues$self$$) {
  $JSCompiler_StaticMethods_cleanupKeysArray_$$($JSCompiler_StaticMethods_getValues$self$$);
  for(var $rv$$18$$ = [], $i$$92$$ = 0;$i$$92$$ < $JSCompiler_StaticMethods_getValues$self$$.$keys_$.length;$i$$92$$++) {
    $rv$$18$$.push($JSCompiler_StaticMethods_getValues$self$$.$map_$[$JSCompiler_StaticMethods_getValues$self$$.$keys_$[$i$$92$$]])
  }
  return $rv$$18$$
}
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$map_$ = {};
  this.$version_$ = this.$count_$ = this.$keys_$.length = 0
};
$JSCompiler_prototypeAlias$$.remove = function $$JSCompiler_prototypeAlias$$$remove$($key$$56$$) {
  return $goog$structs$Map$hasKey_$$(this.$map_$, $key$$56$$) ? (delete this.$map_$[$key$$56$$], this.$count_$--, this.$version_$++, this.$keys_$.length > 2 * this.$count_$ && $JSCompiler_StaticMethods_cleanupKeysArray_$$(this), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
function $JSCompiler_StaticMethods_cleanupKeysArray_$$($JSCompiler_StaticMethods_cleanupKeysArray_$self$$) {
  if($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$count_$ != $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length) {
    for(var $srcIndex$$ = 0, $destIndex$$ = 0;$srcIndex$$ < $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length;) {
      var $key$$57$$ = $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$srcIndex$$];
      $goog$structs$Map$hasKey_$$($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$map_$, $key$$57$$) && ($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$destIndex$$++] = $key$$57$$);
      $srcIndex$$++
    }
    $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length = $destIndex$$
  }
  if($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$count_$ != $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length) {
    for(var $seen$$2$$ = {}, $destIndex$$ = $srcIndex$$ = 0;$srcIndex$$ < $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length;) {
      $key$$57$$ = $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$srcIndex$$], $goog$structs$Map$hasKey_$$($seen$$2$$, $key$$57$$) || ($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$destIndex$$++] = $key$$57$$, $seen$$2$$[$key$$57$$] = 1), $srcIndex$$++
    }
    $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length = $destIndex$$
  }
}
$JSCompiler_prototypeAlias$$.get = function $$JSCompiler_prototypeAlias$$$get$($key$$58$$, $opt_val$$1$$) {
  return $goog$structs$Map$hasKey_$$(this.$map_$, $key$$58$$) ? this.$map_$[$key$$58$$] : $opt_val$$1$$
};
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($key$$59$$, $value$$73$$) {
  $goog$structs$Map$hasKey_$$(this.$map_$, $key$$59$$) || (this.$count_$++, this.$keys_$.push($key$$59$$), this.$version_$++);
  this.$map_$[$key$$59$$] = $value$$73$$
};
function $goog$structs$Map$hasKey_$$($obj$$72$$, $key$$63$$) {
  return Object.prototype.hasOwnProperty.call($obj$$72$$, $key$$63$$)
}
;function $annotorious$shape$geom$Point$$($x$$79$$, $y$$46$$) {
  this.x = $x$$79$$;
  this.y = $y$$46$$
}
;function $annotorious$shape$geom$Polygon$$($points$$) {
  this.points = $points$$
}
function $annotorious$shape$geom$Polygon$computeArea$$($points$$1$$) {
  for(var $area$$ = 0, $j$$8$$ = $points$$1$$.length - 1, $i$$99$$ = 0;$i$$99$$ < $points$$1$$.length;$i$$99$$++) {
    $area$$ += ($points$$1$$[$j$$8$$].x + $points$$1$$[$i$$99$$].x) * ($points$$1$$[$j$$8$$].y - $points$$1$$[$i$$99$$].y), $j$$8$$ = $i$$99$$
  }
  return $area$$ / 2
}
function $annotorious$shape$geom$Polygon$_expandTriangle$$($points$$4$$, $delta$$1$$) {
  for(var $centroid_x$$inline_469$$, $expanded_y$$inline_470$$ = $centroid_x$$inline_469$$ = 0, $f$$inline_471_i$$101$$, $j$$inline_472_px$$inline_475$$ = $points$$4$$.length - 1, $JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$ = 0;$JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$ < $points$$4$$.length;$JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$++) {
    $f$$inline_471_i$$101$$ = $points$$4$$[$JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$].x * $points$$4$$[$j$$inline_472_px$$inline_475$$].y - $points$$4$$[$j$$inline_472_px$$inline_475$$].x * $points$$4$$[$JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$].y, $centroid_x$$inline_469$$ += ($points$$4$$[$JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$].x + $points$$4$$[$j$$inline_472_px$$inline_475$$].x) * $f$$inline_471_i$$101$$, $expanded_y$$inline_470$$ += ($points$$4$$[$JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$].y + 
    $points$$4$$[$j$$inline_472_px$$inline_475$$].y) * $f$$inline_471_i$$101$$, $j$$inline_472_px$$inline_475$$ = $JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$
  }
  $f$$inline_471_i$$101$$ = 6 * $annotorious$shape$geom$Polygon$computeArea$$($points$$4$$);
  $centroid_x$$inline_469$$ = new $annotorious$shape$geom$Point$$(Math.abs($centroid_x$$inline_469$$ / $f$$inline_471_i$$101$$), Math.abs($expanded_y$$inline_470$$ / $f$$inline_471_i$$101$$));
  $expanded_y$$inline_470$$ = [];
  for($f$$inline_471_i$$101$$ = 0;$f$$inline_471_i$$101$$ < $points$$4$$.length;$f$$inline_471_i$$101$$++) {
    var $j$$inline_472_px$$inline_475$$ = $points$$4$$[$f$$inline_471_i$$101$$], $delta$$inline_477_dy$$inline_481$$ = (0 > $annotorious$shape$geom$Polygon$computeArea$$($points$$4$$) ? -1 : 1) * $delta$$1$$, $JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$ = $j$$inline_472_px$$inline_475$$.x - $centroid_x$$inline_469$$.x, $JSCompiler_object_inline_y_1$$inline_479$$ = $j$$inline_472_px$$inline_475$$.y - $centroid_x$$inline_469$$.y, $sign_delta$$inline_480$$ = 0 < $delta$$inline_477_dy$$inline_481$$ ? 
    1 : 0 > $delta$$inline_477_dy$$inline_481$$ ? -1 : 0, $delta$$inline_477_dy$$inline_481$$ = Math.sqrt(Math.pow($delta$$inline_477_dy$$inline_481$$, 2) / (1 + Math.pow($JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$ / $JSCompiler_object_inline_y_1$$inline_479$$, 2)));
    $expanded_y$$inline_470$$.push({x:$j$$inline_472_px$$inline_475$$.x + Math.abs($JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$ / $JSCompiler_object_inline_y_1$$inline_479$$ * $delta$$inline_477_dy$$inline_481$$) * (0 < $JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$ ? 1 : 0 > $JSCompiler_object_inline_x_0$$inline_478_i$$inline_473$$ ? -1 : 0) * $sign_delta$$inline_480$$, y:$j$$inline_472_px$$inline_475$$.y + Math.abs($delta$$inline_477_dy$$inline_481$$) * (0 < $JSCompiler_object_inline_y_1$$inline_479$$ ? 
    1 : 0 > $JSCompiler_object_inline_y_1$$inline_479$$ ? -1 : 0) * $sign_delta$$inline_480$$})
  }
  return $expanded_y$$inline_470$$
}
;function $annotorious$shape$geom$Rectangle$$($x$$81$$, $y$$48$$, $width$$19$$, $height$$18$$) {
  0 < $width$$19$$ ? (this.x = $x$$81$$, this.width = $width$$19$$) : (this.x = $x$$81$$ + $width$$19$$, this.width = -$width$$19$$);
  0 < $height$$18$$ ? (this.y = $y$$48$$, this.height = $height$$18$$) : (this.y = $y$$48$$ + $height$$18$$, this.height = -$height$$18$$)
}
;function $annotorious$shape$Shape$$($type$$82$$, $geometry$$, $units$$2$$, $style$$14$$) {
  this.type = $type$$82$$;
  this.geometry = $geometry$$;
  $units$$2$$ && (this.units = $units$$2$$);
  this.style = $style$$14$$ ? $style$$14$$ : {}
}
function $annotorious$shape$getSize$$($shape$$1$$) {
  return"rect" == $shape$$1$$.type ? $shape$$1$$.geometry.width * $shape$$1$$.geometry.height : "polygon" == $shape$$1$$.type ? Math.abs($annotorious$shape$geom$Polygon$computeArea$$($shape$$1$$.geometry.points)) : 0
}
function $annotorious$shape$getBoundingRect$$($shape$$2$$) {
  if("rect" == $shape$$2$$.type) {
    return $shape$$2$$
  }
  if("polygon" == $shape$$2$$.type) {
    for(var $points$$7$$ = $shape$$2$$.geometry.points, $left$$13$$ = $points$$7$$[0].x, $right$$11$$ = $points$$7$$[0].x, $top$$11$$ = $points$$7$$[0].y, $bottom$$7$$ = $points$$7$$[0].y, $i$$103$$ = 1;$i$$103$$ < $points$$7$$.length;$i$$103$$++) {
      $points$$7$$[$i$$103$$].x > $right$$11$$ && ($right$$11$$ = $points$$7$$[$i$$103$$].x), $points$$7$$[$i$$103$$].x < $left$$13$$ && ($left$$13$$ = $points$$7$$[$i$$103$$].x), $points$$7$$[$i$$103$$].y > $bottom$$7$$ && ($bottom$$7$$ = $points$$7$$[$i$$103$$].y), $points$$7$$[$i$$103$$].y < $top$$11$$ && ($top$$11$$ = $points$$7$$[$i$$103$$].y)
    }
    return new $annotorious$shape$Shape$$("rect", new $annotorious$shape$geom$Rectangle$$($left$$13$$, $top$$11$$, $right$$11$$ - $left$$13$$, $bottom$$7$$ - $top$$11$$), $JSCompiler_alias_FALSE$$, $shape$$2$$.style)
  }
}
function $annotorious$shape$expand$$($shape$$4$$, $delta$$4$$) {
  var $JSCompiler_inline_result$$10_points$$inline_483$$;
  $JSCompiler_inline_result$$10_points$$inline_483$$ = $shape$$4$$.geometry.points;
  var $sign$$inline_485$$ = 0 > $annotorious$shape$geom$Polygon$computeArea$$($JSCompiler_inline_result$$10_points$$inline_483$$) ? -1 : 1;
  if(4 > $JSCompiler_inline_result$$10_points$$inline_483$$.length) {
    $JSCompiler_inline_result$$10_points$$inline_483$$ = $annotorious$shape$geom$Polygon$_expandTriangle$$($JSCompiler_inline_result$$10_points$$inline_483$$, $sign$$inline_485$$ * $delta$$4$$)
  }else {
    for(var $expTriangle$$inline_490_prev$$inline_486$$ = $JSCompiler_inline_result$$10_points$$inline_483$$.length - 1, $next$$inline_487$$ = 1, $expanded$$inline_488$$ = [], $current$$inline_489$$ = 0;$current$$inline_489$$ < $JSCompiler_inline_result$$10_points$$inline_483$$.length;$current$$inline_489$$++) {
      $expTriangle$$inline_490_prev$$inline_486$$ = $annotorious$shape$geom$Polygon$_expandTriangle$$([$JSCompiler_inline_result$$10_points$$inline_483$$[$expTriangle$$inline_490_prev$$inline_486$$], $JSCompiler_inline_result$$10_points$$inline_483$$[$current$$inline_489$$], $JSCompiler_inline_result$$10_points$$inline_483$$[$next$$inline_487$$]], $sign$$inline_485$$ * $delta$$4$$), $expanded$$inline_488$$.push($expTriangle$$inline_490_prev$$inline_486$$[1]), $expTriangle$$inline_490_prev$$inline_486$$ = 
      $current$$inline_489$$, $next$$inline_487$$++, $next$$inline_487$$ > $JSCompiler_inline_result$$10_points$$inline_483$$.length - 1 && ($next$$inline_487$$ = 0)
    }
    $JSCompiler_inline_result$$10_points$$inline_483$$ = $expanded$$inline_488$$
  }
  return new $annotorious$shape$Shape$$("polygon", new $annotorious$shape$geom$Polygon$$($JSCompiler_inline_result$$10_points$$inline_483$$), $JSCompiler_alias_FALSE$$, $shape$$4$$.style)
}
function $annotorious$shape$transform$$($shape$$5$$, $transformationFn$$) {
  if("rect" == $shape$$5$$.type) {
    var $transformed$$ = $transformationFn$$($shape$$5$$.geometry);
    return new $annotorious$shape$Shape$$("rect", $transformed$$, $JSCompiler_alias_FALSE$$, $shape$$5$$.style)
  }
  if("polygon" == $shape$$5$$.type) {
    var $transformedPoints$$ = [];
    $goog$array$forEach$$($shape$$5$$.geometry.points, function($pt$$) {
      $transformedPoints$$.push($transformationFn$$($pt$$))
    });
    return new $annotorious$shape$Shape$$("polygon", new $annotorious$shape$geom$Polygon$$($transformedPoints$$), $JSCompiler_alias_FALSE$$, $shape$$5$$.style)
  }
}
function $annotorious$shape$hashCode$$($shape$$6$$) {
  return JSON.stringify($shape$$6$$.geometry)
}
;function $annotorious$Annotation$$($src$$21$$, $text$$10$$, $shape$$7$$) {
  this.src = $src$$21$$;
  this.text = $text$$10$$;
  this.shapes = [$shape$$7$$];
  this.context = document.URL
}
;function $annotorious$mediatypes$Module$$() {
}
function $JSCompiler_StaticMethods__initFields$$($JSCompiler_StaticMethods__initFields$self$$, $opt_preload_fn$$) {
  $JSCompiler_StaticMethods__initFields$self$$.$_annotators$ = new $goog$structs$Map$$;
  $JSCompiler_StaticMethods__initFields$self$$.$_eventHandlers$ = [];
  $JSCompiler_StaticMethods__initFields$self$$.$_plugins$ = [];
  $JSCompiler_StaticMethods__initFields$self$$.$_itemsToLoad$ = [];
  $JSCompiler_StaticMethods__initFields$self$$.$_bufferedForAdding$ = [];
  $JSCompiler_StaticMethods__initFields$self$$.$_bufferedForRemoval$ = [];
  $JSCompiler_StaticMethods__initFields$self$$.$_cachedGlobalSettings$ = {$hide_selection_widget$:$JSCompiler_alias_FALSE$$, $hide_annotations$:$JSCompiler_alias_FALSE$$};
  $JSCompiler_StaticMethods__initFields$self$$.$_cachedItemSettings$ = new $goog$structs$Map$$;
  $JSCompiler_StaticMethods__initFields$self$$.$_cachedProperties$ = $JSCompiler_alias_VOID$$;
  $JSCompiler_StaticMethods__initFields$self$$.$_preLoad$ = $opt_preload_fn$$
}
function $JSCompiler_StaticMethods__getSettings$$($JSCompiler_StaticMethods__getSettings$self$$, $item_url$$) {
  var $settings$$ = $JSCompiler_StaticMethods__getSettings$self$$.$_cachedItemSettings$.get($item_url$$);
  $settings$$ || ($settings$$ = {$hide_selection_widget$:$JSCompiler_alias_FALSE$$, $hide_annotations$:$JSCompiler_alias_FALSE$$}, $JSCompiler_StaticMethods__getSettings$self$$.$_cachedItemSettings$.set($item_url$$, $settings$$));
  return $settings$$
}
function $JSCompiler_StaticMethods__initAnnotator$$($JSCompiler_StaticMethods__initAnnotator$self$$, $item$$1$$) {
  var $item_src$$ = $JSCompiler_StaticMethods__initAnnotator$self$$.$getItemURL$($item$$1$$);
  if(!$JSCompiler_StaticMethods__initAnnotator$self$$.$_annotators$.get($item_src$$)) {
    var $annotator$$1$$ = $JSCompiler_StaticMethods__initAnnotator$self$$.$newAnnotator$($item$$1$$), $addedAnnotations$$ = [], $removedAnnotations$$ = [];
    $goog$array$forEach$$($JSCompiler_StaticMethods__initAnnotator$self$$.$_eventHandlers$, function($eventHandler$$) {
      $annotator$$1$$.addHandler($eventHandler$$.type, $eventHandler$$.$handler$)
    });
    $goog$array$forEach$$($JSCompiler_StaticMethods__initAnnotator$self$$.$_plugins$, function($plugin$$) {
      if($plugin$$.onInitAnnotator) {
        $plugin$$.onInitAnnotator($annotator$$1$$)
      }
    });
    $goog$array$forEach$$($JSCompiler_StaticMethods__initAnnotator$self$$.$_bufferedForAdding$, function($annotation$$) {
      $annotation$$.src == $item_src$$ && ($annotator$$1$$.$addAnnotation$($annotation$$), $addedAnnotations$$.push($annotation$$))
    });
    $goog$array$forEach$$($JSCompiler_StaticMethods__initAnnotator$self$$.$_bufferedForRemoval$, function($annotation$$1$$) {
      $annotation$$1$$.src == $item_src$$ && ($annotator$$1$$.$removeAnnotation$($annotation$$1$$), $removedAnnotations$$.push($annotation$$1$$))
    });
    $goog$array$forEach$$($addedAnnotations$$, function($annotation$$2$$) {
      $goog$array$remove$$($JSCompiler_StaticMethods__initAnnotator$self$$.$_bufferedForAdding$, $annotation$$2$$)
    });
    $goog$array$forEach$$($removedAnnotations$$, function($annotation$$3$$) {
      $goog$array$remove$$($JSCompiler_StaticMethods__initAnnotator$self$$.$_bufferedForRemoval$, $annotation$$3$$)
    });
    var $settings$$1$$ = $JSCompiler_StaticMethods__initAnnotator$self$$.$_cachedItemSettings$.get($item_src$$);
    $settings$$1$$ ? ($settings$$1$$.$hide_selection_widget$ && $annotator$$1$$.$hideSelectionWidget$(), $settings$$1$$.$hide_annotations$ && $annotator$$1$$.$hideAnnotations$(), $JSCompiler_StaticMethods__initAnnotator$self$$.$_cachedItemSettings$.remove($item_src$$)) : ($JSCompiler_StaticMethods__initAnnotator$self$$.$_cachedGlobalSettings$.$hide_selection_widget$ && $annotator$$1$$.$hideSelectionWidget$(), $JSCompiler_StaticMethods__initAnnotator$self$$.$_cachedGlobalSettings$.$hide_annotations$ && 
    $annotator$$1$$.$hideAnnotations$());
    $JSCompiler_StaticMethods__initAnnotator$self$$.$_cachedProperties$ && $annotator$$1$$.$setProperties$($JSCompiler_StaticMethods__initAnnotator$self$$.$_cachedProperties$);
    $JSCompiler_StaticMethods__initAnnotator$self$$.$_annotators$.set($item_src$$, $annotator$$1$$);
    $goog$array$remove$$($JSCompiler_StaticMethods__initAnnotator$self$$.$_itemsToLoad$, $item$$1$$)
  }
}
function $JSCompiler_StaticMethods__lazyLoad$$($JSCompiler_StaticMethods__lazyLoad$self$$) {
  var $item$$2$$, $i$$104$$;
  for($i$$104$$ = $JSCompiler_StaticMethods__lazyLoad$self$$.$_itemsToLoad$.length;0 < $i$$104$$;$i$$104$$--) {
    for(var $el$$inline_495$$ = $item$$2$$ = $JSCompiler_StaticMethods__lazyLoad$self$$.$_itemsToLoad$[$i$$104$$ - 1], $top$$inline_496$$ = $el$$inline_495$$.offsetTop, $left$$inline_497$$ = $el$$inline_495$$.offsetLeft, $width$$inline_498$$ = $el$$inline_495$$.offsetWidth, $height$$inline_499$$ = $el$$inline_495$$.offsetHeight;$el$$inline_495$$.offsetParent;) {
      $el$$inline_495$$ = $el$$inline_495$$.offsetParent, $top$$inline_496$$ += $el$$inline_495$$.offsetTop, $left$$inline_497$$ += $el$$inline_495$$.offsetLeft
    }
    $top$$inline_496$$ < window.pageYOffset + window.innerHeight && ($left$$inline_497$$ < window.pageXOffset + window.innerWidth && $top$$inline_496$$ + $height$$inline_499$$ > window.pageYOffset && $left$$inline_497$$ + $width$$inline_498$$ > window.pageXOffset) && $JSCompiler_StaticMethods__initAnnotator$$($JSCompiler_StaticMethods__lazyLoad$self$$, $item$$2$$)
  }
}
function $JSCompiler_StaticMethods__setAnnotationVisibility$$($JSCompiler_StaticMethods__setAnnotationVisibility$self$$, $opt_item_url$$, $visibility$$) {
  if($opt_item_url$$) {
    var $annotator$$3$$ = $JSCompiler_StaticMethods__setAnnotationVisibility$self$$.$_annotators$.get($opt_item_url$$);
    $annotator$$3$$ ? $visibility$$ ? $annotator$$3$$.$showAnnotations$() : $annotator$$3$$.$hideAnnotations$() : $JSCompiler_StaticMethods__getSettings$$($JSCompiler_StaticMethods__setAnnotationVisibility$self$$, $opt_item_url$$).$hide_annotations$ = $visibility$$
  }else {
    $goog$array$forEach$$($JSCompiler_StaticMethods_getValues$$($JSCompiler_StaticMethods__setAnnotationVisibility$self$$.$_annotators$), function($annotator$$4$$) {
      $visibility$$ ? $annotator$$4$$.$showAnnotations$() : $annotator$$4$$.$hideAnnotations$()
    }), $JSCompiler_StaticMethods__setAnnotationVisibility$self$$.$_cachedGlobalSettings$.$hide_annotations$ = !$visibility$$, $goog$array$forEach$$($JSCompiler_StaticMethods_getValues$$($JSCompiler_StaticMethods__setAnnotationVisibility$self$$.$_cachedItemSettings$), function($settings$$2$$) {
      $settings$$2$$.$hide_annotations$ = !$visibility$$
    })
  }
}
function $JSCompiler_StaticMethods__setSelectionWidgetVisibility$$($JSCompiler_StaticMethods__setSelectionWidgetVisibility$self$$, $opt_item_url$$1$$, $visibility$$1$$) {
  if($opt_item_url$$1$$) {
    var $annotator$$5$$ = $JSCompiler_StaticMethods__setSelectionWidgetVisibility$self$$.$_annotators$.get($opt_item_url$$1$$);
    $annotator$$5$$ ? $visibility$$1$$ ? $annotator$$5$$.$showSelectionWidget$() : $annotator$$5$$.$hideSelectionWidget$() : $JSCompiler_StaticMethods__getSettings$$($JSCompiler_StaticMethods__setSelectionWidgetVisibility$self$$, $opt_item_url$$1$$).$hide_selection_widget$ = $visibility$$1$$
  }else {
    $goog$array$forEach$$($JSCompiler_StaticMethods_getValues$$($JSCompiler_StaticMethods__setSelectionWidgetVisibility$self$$.$_annotators$), function($annotator$$6$$) {
      $visibility$$1$$ ? $annotator$$6$$.$showSelectionWidget$() : $annotator$$6$$.$hideSelectionWidget$()
    }), $JSCompiler_StaticMethods__setSelectionWidgetVisibility$self$$.$_cachedGlobalSettings$.$hide_selection_widget$ = !$visibility$$1$$, $goog$array$forEach$$($JSCompiler_StaticMethods_getValues$$($JSCompiler_StaticMethods__setSelectionWidgetVisibility$self$$.$_cachedItemSettings$), function($settings$$3$$) {
      $settings$$3$$.$hide_selection_widget$ = !$visibility$$1$$
    })
  }
}
$JSCompiler_prototypeAlias$$ = $annotorious$mediatypes$Module$$.prototype;
$JSCompiler_prototypeAlias$$.$activateSelector$ = function $$JSCompiler_prototypeAlias$$$$activateSelector$$($opt_item_url_or_callback$$, $opt_callback$$5$$) {
  var $annotator$$7_item_url$$1$$ = $JSCompiler_alias_VOID$$, $callback$$34$$ = $JSCompiler_alias_VOID$$;
  $goog$isString$$($opt_item_url_or_callback$$) ? ($annotator$$7_item_url$$1$$ = $opt_item_url_or_callback$$, $callback$$34$$ = $opt_callback$$5$$) : $goog$isFunction$$($opt_item_url_or_callback$$) && ($callback$$34$$ = $opt_item_url_or_callback$$);
  $annotator$$7_item_url$$1$$ ? ($annotator$$7_item_url$$1$$ = this.$_annotators$.get($annotator$$7_item_url$$1$$)) && $annotator$$7_item_url$$1$$.$activateSelector$($callback$$34$$) : $goog$array$forEach$$($JSCompiler_StaticMethods_getValues$$(this.$_annotators$), function($annotator$$8$$) {
    $annotator$$8$$.$activateSelector$($callback$$34$$)
  })
};
$JSCompiler_prototypeAlias$$.stopSelection = function $$JSCompiler_prototypeAlias$$$stopSelection$($annotator$$9_opt_item_url$$2$$) {
  $annotator$$9_opt_item_url$$2$$ ? ($annotator$$9_opt_item_url$$2$$ = this.$_annotators$.get($annotator$$9_opt_item_url$$2$$)) && $annotator$$9_opt_item_url$$2$$.stopSelection() : $goog$array$forEach$$($JSCompiler_StaticMethods_getValues$$(this.$_annotators$), function($annotator$$10$$) {
    $annotator$$10$$.stopSelection()
  })
};
$JSCompiler_prototypeAlias$$.$addAnnotation$ = function $$JSCompiler_prototypeAlias$$$$addAnnotation$$($annotation$$4$$, $opt_replace$$1$$) {
  if($JSCompiler_StaticMethods_annotatesItem$$(this, $annotation$$4$$.src)) {
    var $annotator$$11$$ = this.$_annotators$.get($annotation$$4$$.src);
    $annotator$$11$$ ? $annotator$$11$$.$addAnnotation$($annotation$$4$$, $opt_replace$$1$$) : (this.$_bufferedForAdding$.push($annotation$$4$$), $opt_replace$$1$$ && $goog$array$remove$$(this.$_bufferedForAdding$, $opt_replace$$1$$))
  }
};
$JSCompiler_prototypeAlias$$.addHandler = function $$JSCompiler_prototypeAlias$$$addHandler$($type$$83$$, $handler$$8$$) {
  $goog$array$forEach$$($JSCompiler_StaticMethods_getValues$$(this.$_annotators$), function($annotator$$12$$) {
    $annotator$$12$$.addHandler($type$$83$$, $handler$$8$$)
  });
  this.$_eventHandlers$.push({type:$type$$83$$, $handler$:$handler$$8$$})
};
$JSCompiler_prototypeAlias$$.$addPlugin$ = function $$JSCompiler_prototypeAlias$$$$addPlugin$$($plugin$$2$$) {
  this.$_plugins$.push($plugin$$2$$);
  $goog$array$forEach$$($JSCompiler_StaticMethods_getValues$$(this.$_annotators$), function($annotator$$13$$) {
    if($plugin$$2$$.onInitAnnotator) {
      $plugin$$2$$.onInitAnnotator($annotator$$13$$)
    }
  })
};
function $JSCompiler_StaticMethods_annotatesItem$$($JSCompiler_StaticMethods_annotatesItem$self$$, $item_url$$2$$) {
  return $goog$structs$Map$hasKey_$$($JSCompiler_StaticMethods_annotatesItem$self$$.$_annotators$.$map_$, $item_url$$2$$) ? $JSCompiler_alias_TRUE$$ : $goog$array$find$$($JSCompiler_StaticMethods_annotatesItem$self$$.$_itemsToLoad$, function($item$$4$$) {
    return $JSCompiler_StaticMethods_annotatesItem$self$$.$getItemURL$($item$$4$$) == $item_url$$2$$
  }) != $JSCompiler_alias_NULL$$
}
$JSCompiler_prototypeAlias$$.destroy = function $$JSCompiler_prototypeAlias$$$destroy$($opt_item_url$$3$$) {
  if($opt_item_url$$3$$) {
    var $annotator$$14$$ = this.$_annotators$.get($opt_item_url$$3$$);
    $annotator$$14$$ && ($annotator$$14$$.destroy(), this.$_annotators$.remove($opt_item_url$$3$$))
  }else {
    $goog$array$forEach$$($JSCompiler_StaticMethods_getValues$$(this.$_annotators$), function($annotator$$15$$) {
      $annotator$$15$$.destroy()
    }), this.$_annotators$.clear()
  }
};
$JSCompiler_prototypeAlias$$.$getActiveSelector$ = function $$JSCompiler_prototypeAlias$$$$getActiveSelector$$($annotator$$16_item_url$$3$$) {
  if($JSCompiler_StaticMethods_annotatesItem$$(this, $annotator$$16_item_url$$3$$) && ($annotator$$16_item_url$$3$$ = this.$_annotators$.get($annotator$$16_item_url$$3$$))) {
    return $annotator$$16_item_url$$3$$.$getActiveSelector$().getName()
  }
};
$JSCompiler_prototypeAlias$$.$getAnnotations$ = function $$JSCompiler_prototypeAlias$$$$getAnnotations$$($opt_item_url$$4$$) {
  if($opt_item_url$$4$$) {
    var $annotator$$17$$ = this.$_annotators$.get($opt_item_url$$4$$);
    return $annotator$$17$$ ? $annotator$$17$$.$getAnnotations$() : $goog$array$filter$$(this.$_bufferedForAdding$, function($annotation$$5$$) {
      return $annotation$$5$$.src == $opt_item_url$$4$$
    })
  }
  var $annotations$$ = [];
  $goog$array$forEach$$($JSCompiler_StaticMethods_getValues$$(this.$_annotators$), function($annotator$$18$$) {
    $goog$array$extend$$($annotations$$, $annotator$$18$$.$getAnnotations$())
  });
  $goog$array$extend$$($annotations$$, this.$_bufferedForAdding$);
  return $annotations$$
};
$JSCompiler_prototypeAlias$$.$getAvailableSelectors$ = function $$JSCompiler_prototypeAlias$$$$getAvailableSelectors$$($annotator$$19_item_url$$4$$) {
  if($JSCompiler_StaticMethods_annotatesItem$$(this, $annotator$$19_item_url$$4$$) && ($annotator$$19_item_url$$4$$ = this.$_annotators$.get($annotator$$19_item_url$$4$$))) {
    return $goog$array$map$$($annotator$$19_item_url$$4$$.$getAvailableSelectors$(), function($selector$$2$$) {
      return $selector$$2$$.getName()
    })
  }
};
$JSCompiler_prototypeAlias$$.$hideAnnotations$ = function $$JSCompiler_prototypeAlias$$$$hideAnnotations$$($opt_item_url$$5$$) {
  $JSCompiler_StaticMethods__setAnnotationVisibility$$(this, $opt_item_url$$5$$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$hideSelectionWidget$ = function $$JSCompiler_prototypeAlias$$$$hideSelectionWidget$$($opt_item_url$$6$$) {
  $JSCompiler_StaticMethods__setSelectionWidgetVisibility$$(this, $opt_item_url$$6$$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$highlightAnnotation$ = function $$JSCompiler_prototypeAlias$$$$highlightAnnotation$$($annotation$$6$$) {
  if($annotation$$6$$) {
    if($JSCompiler_StaticMethods_annotatesItem$$(this, $annotation$$6$$.src)) {
      var $annotator$$20$$ = this.$_annotators$.get($annotation$$6$$.src);
      $annotator$$20$$ && $annotator$$20$$.$highlightAnnotation$($annotation$$6$$)
    }
  }else {
    $goog$array$forEach$$($JSCompiler_StaticMethods_getValues$$(this.$_annotators$), function($annotator$$21$$) {
      $annotator$$21$$.$highlightAnnotation$()
    })
  }
};
$JSCompiler_prototypeAlias$$.init = function $$JSCompiler_prototypeAlias$$$init$() {
  this.$_preLoad$ && $goog$array$extend$$(this.$_itemsToLoad$, this.$_preLoad$());
  $JSCompiler_StaticMethods__lazyLoad$$(this);
  var $self$$4$$ = this, $key$$64$$ = $goog$events$listen$$(window, "scroll", function() {
    0 < $self$$4$$.$_itemsToLoad$.length ? $JSCompiler_StaticMethods__lazyLoad$$($self$$4$$) : $goog$events$unlistenByKey$$($key$$64$$)
  })
};
$JSCompiler_prototypeAlias$$.$makeAnnotatable$ = function $$JSCompiler_prototypeAlias$$$$makeAnnotatable$$($item$$5$$) {
  this.$supports$($item$$5$$) && $JSCompiler_StaticMethods__initAnnotator$$(this, $item$$5$$)
};
$JSCompiler_prototypeAlias$$.$removeAnnotation$ = function $$JSCompiler_prototypeAlias$$$$removeAnnotation$$($annotation$$7$$) {
  if($JSCompiler_StaticMethods_annotatesItem$$(this, $annotation$$7$$.src)) {
    var $annotator$$22$$ = this.$_annotators$.get($annotation$$7$$.src);
    $annotator$$22$$ ? $annotator$$22$$.$removeAnnotation$($annotation$$7$$) : this.$_bufferedForRemoval$.push($annotation$$7$$)
  }
};
$JSCompiler_prototypeAlias$$.$setActiveSelector$ = function $$JSCompiler_prototypeAlias$$$$setActiveSelector$$($item_url$$5$$, $selector$$3$$) {
  if($JSCompiler_StaticMethods_annotatesItem$$(this, $item_url$$5$$)) {
    var $annotator$$23$$ = this.$_annotators$.get($item_url$$5$$);
    $annotator$$23$$ && $annotator$$23$$.$setCurrentSelector$($selector$$3$$)
  }
};
$JSCompiler_prototypeAlias$$.$setProperties$ = function $$JSCompiler_prototypeAlias$$$$setProperties$$($props$$1$$) {
  this.$_cachedProperties$ = $props$$1$$;
  $goog$array$forEach$$($JSCompiler_StaticMethods_getValues$$(this.$_annotators$), function($annotator$$24$$) {
    $annotator$$24$$.$setProperties$($props$$1$$)
  })
};
$JSCompiler_prototypeAlias$$.$showAnnotations$ = function $$JSCompiler_prototypeAlias$$$$showAnnotations$$($opt_item_url$$7$$) {
  $JSCompiler_StaticMethods__setAnnotationVisibility$$(this, $opt_item_url$$7$$, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$showSelectionWidget$ = function $$JSCompiler_prototypeAlias$$$$showSelectionWidget$$($opt_item_url$$8$$) {
  $JSCompiler_StaticMethods__setSelectionWidgetVisibility$$(this, $opt_item_url$$8$$, $JSCompiler_alias_TRUE$$)
};
function $goog$soy$renderAsElement$$($template$$2$$, $opt_templateData$$2$$) {
  var $wrapper$$4$$ = $goog$dom$getDomHelper$$().createElement("DIV");
  $wrapper$$4$$.innerHTML = $template$$2$$($opt_templateData$$2$$ || $goog$soy$defaultTemplateData_$$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$);
  if(1 == $wrapper$$4$$.childNodes.length) {
    var $firstChild$$ = $wrapper$$4$$.firstChild;
    if(1 == $firstChild$$.nodeType) {
      return $firstChild$$
    }
  }
  return $wrapper$$4$$
}
var $goog$soy$defaultTemplateData_$$ = {};
function $goog$string$StringBuffer$$($opt_a1$$, $var_args$$69$$) {
  $opt_a1$$ != $JSCompiler_alias_NULL$$ && this.append.apply(this, arguments)
}
$JSCompiler_prototypeAlias$$ = $goog$string$StringBuffer$$.prototype;
$JSCompiler_prototypeAlias$$.$buffer_$ = "";
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($s$$19$$) {
  this.$buffer_$ = "" + $s$$19$$
};
$JSCompiler_prototypeAlias$$.append = function $$JSCompiler_prototypeAlias$$$append$($a1$$, $opt_a2$$, $var_args$$70$$) {
  this.$buffer_$ += $a1$$;
  if($opt_a2$$ != $JSCompiler_alias_NULL$$) {
    for(var $i$$105$$ = 1;$i$$105$$ < arguments.length;$i$$105$$++) {
      this.$buffer_$ += arguments[$i$$105$$]
    }
  }
  return this
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$buffer_$ = ""
};
$JSCompiler_prototypeAlias$$.toString = $JSCompiler_get$$("$buffer_$");
/*
 Portions of this code are from the google-caja project, received by
 Google under the Apache license (http://code.google.com/p/google-caja/).
 All other code is Copyright 2009 Google, Inc. All Rights Reserved.

// Copyright (C) 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

*/
function $goog$string$html$HtmlParser$$() {
}
var $goog$string$html$HtmlParser$Entities$$ = {$lt$:"<", $gt$:">", $amp$:"&", $nbsp$:"\u00a0", $quot$:'"', $apos$:"'"}, $goog$string$html$HtmlParser$Elements$$ = {a:0, abbr:0, acronym:0, address:0, applet:16, area:2, b:0, base:18, basefont:18, bdo:0, big:0, blockquote:0, body:49, br:2, button:0, caption:0, center:0, cite:0, code:0, col:2, colgroup:1, dd:1, del:0, dfn:0, dir:0, div:0, dl:0, dt:1, em:0, fieldset:0, font:0, form:0, frame:18, frameset:16, h1:0, h2:0, h3:0, h4:0, h5:0, h6:0, head:49, 
hr:2, html:49, i:0, iframe:20, img:2, input:2, ins:0, isindex:18, kbd:0, label:0, legend:0, li:1, link:18, map:0, menu:0, meta:18, noframes:20, noscript:20, object:16, ol:0, optgroup:0, option:1, p:1, param:18, pre:0, q:0, s:0, samp:0, script:20, select:0, small:0, span:0, strike:0, strong:0, style:20, sub:0, sup:0, table:0, tbody:1, td:1, textarea:8, tfoot:1, th:1, thead:1, title:24, tr:1, tt:0, u:0, ul:0, "var":0}, $goog$string$html$HtmlParser$AMP_RE_$$ = /&/g, $goog$string$html$HtmlParser$LOOSE_AMP_RE_$$ = 
/&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi, $goog$string$html$HtmlParser$LT_RE_$$ = /</g, $goog$string$html$HtmlParser$GT_RE_$$ = />/g, $goog$string$html$HtmlParser$QUOTE_RE_$$ = /\"/g, $goog$string$html$HtmlParser$EQUALS_RE_$$ = /=/g, $goog$string$html$HtmlParser$NULL_RE_$$ = /\0/g, $goog$string$html$HtmlParser$ENTITY_RE_$$ = /&(#\d+|#x[0-9A-Fa-f]+|\w+);/g, $goog$string$html$HtmlParser$DECIMAL_ESCAPE_RE_$$ = /^#(\d+)$/, $goog$string$html$HtmlParser$HEX_ESCAPE_RE_$$ = /^#x([0-9A-Fa-f]+)$/, 
$goog$string$html$HtmlParser$INSIDE_TAG_TOKEN_$$ = RegExp("^\\s*(?:(?:([a-z][a-z-]*)(\\s*=\\s*(\"[^\"]*\"|'[^']*'|(?=[a-z][a-z-]*\\s*=)|[^>\"'\\s]*))?)|(/?>)|[^a-z\\s>]+)", "i"), $goog$string$html$HtmlParser$OUTSIDE_TAG_TOKEN_$$ = RegExp("^(?:&(\\#[0-9]+|\\#[x][0-9a-f]+|\\w+);|<[!]--[\\s\\S]*?--\>|<!\\w[^>]*>|<\\?[^>*]*>|<(/)?([a-z][a-z0-9]*)|([^<&>]+)|([<&>]))", "i");
$goog$string$html$HtmlParser$$.prototype.parse = function $$goog$string$html$HtmlParser$$$$parse$($handler$$9$$, $htmlText$$) {
  var $htmlLower_i$$inline_510$$ = $JSCompiler_alias_NULL$$, $dataEnd_inTag$$1$$ = $JSCompiler_alias_FALSE$$, $attribs$$ = [], $tagName$$6$$, $eflags$$, $openTag$$;
  $handler$$9$$.$stack_$ = [];
  for($handler$$9$$.$ignoring_$ = $JSCompiler_alias_FALSE$$;$htmlText$$;) {
    var $decodedValue_encodedValue_m$$ = $htmlText$$.match($dataEnd_inTag$$1$$ ? $goog$string$html$HtmlParser$INSIDE_TAG_TOKEN_$$ : $goog$string$html$HtmlParser$OUTSIDE_TAG_TOKEN_$$), $htmlText$$ = $htmlText$$.substring($decodedValue_encodedValue_m$$[0].length);
    if($dataEnd_inTag$$1$$) {
      if($decodedValue_encodedValue_m$$[1]) {
        var $attribName$$ = $decodedValue_encodedValue_m$$[1].toLowerCase();
        if($decodedValue_encodedValue_m$$[2]) {
          $decodedValue_encodedValue_m$$ = $decodedValue_encodedValue_m$$[3];
          switch($decodedValue_encodedValue_m$$.charCodeAt(0)) {
            case 34:
            ;
            case 39:
              $decodedValue_encodedValue_m$$ = $decodedValue_encodedValue_m$$.substring(1, $decodedValue_encodedValue_m$$.length - 1)
          }
          $decodedValue_encodedValue_m$$ = $decodedValue_encodedValue_m$$.replace($goog$string$html$HtmlParser$NULL_RE_$$, "").replace($goog$string$html$HtmlParser$ENTITY_RE_$$, $goog$bind$$(this.$lookupEntity_$, this))
        }else {
          $decodedValue_encodedValue_m$$ = $attribName$$
        }
        $attribs$$.push($attribName$$, $decodedValue_encodedValue_m$$)
      }else {
        $decodedValue_encodedValue_m$$[4] && ($eflags$$ !== $JSCompiler_alias_VOID$$ && ($openTag$$ ? $handler$$9$$.$startTag$ && $handler$$9$$.$startTag$($tagName$$6$$, $attribs$$) : $handler$$9$$.$endTag$ && $handler$$9$$.$endTag$($tagName$$6$$)), $openTag$$ && $eflags$$ & 12 && ($htmlLower_i$$inline_510$$ = $htmlLower_i$$inline_510$$ === $JSCompiler_alias_NULL$$ ? $htmlText$$.toLowerCase() : $htmlLower_i$$inline_510$$.substring($htmlLower_i$$inline_510$$.length - $htmlText$$.length), $dataEnd_inTag$$1$$ = 
        $htmlLower_i$$inline_510$$.indexOf("</" + $tagName$$6$$), 0 > $dataEnd_inTag$$1$$ && ($dataEnd_inTag$$1$$ = $htmlText$$.length), $eflags$$ & 4 ? $handler$$9$$.$cdata$ && $handler$$9$$.$cdata$($htmlText$$.substring(0, $dataEnd_inTag$$1$$)) : $handler$$9$$.$rcdata$ && $handler$$9$$.$rcdata$($htmlText$$.substring(0, $dataEnd_inTag$$1$$).replace($goog$string$html$HtmlParser$LOOSE_AMP_RE_$$, "&amp;$1").replace($goog$string$html$HtmlParser$LT_RE_$$, "&lt;").replace($goog$string$html$HtmlParser$GT_RE_$$, 
        "&gt;")), $htmlText$$ = $htmlText$$.substring($dataEnd_inTag$$1$$)), $tagName$$6$$ = $eflags$$ = $openTag$$ = $JSCompiler_alias_VOID$$, $attribs$$.length = 0, $dataEnd_inTag$$1$$ = $JSCompiler_alias_FALSE$$)
      }
    }else {
      if($decodedValue_encodedValue_m$$[1]) {
        $JSCompiler_StaticMethods_pcdata$$($handler$$9$$, $decodedValue_encodedValue_m$$[0])
      }else {
        if($decodedValue_encodedValue_m$$[3]) {
          $openTag$$ = !$decodedValue_encodedValue_m$$[2], $dataEnd_inTag$$1$$ = $JSCompiler_alias_TRUE$$, $tagName$$6$$ = $decodedValue_encodedValue_m$$[3].toLowerCase(), $eflags$$ = $goog$string$html$HtmlParser$Elements$$.hasOwnProperty($tagName$$6$$) ? $goog$string$html$HtmlParser$Elements$$[$tagName$$6$$] : $JSCompiler_alias_VOID$$
        }else {
          if($decodedValue_encodedValue_m$$[4]) {
            $JSCompiler_StaticMethods_pcdata$$($handler$$9$$, $decodedValue_encodedValue_m$$[4])
          }else {
            if($decodedValue_encodedValue_m$$[5]) {
              switch($decodedValue_encodedValue_m$$[5]) {
                case "<":
                  $JSCompiler_StaticMethods_pcdata$$($handler$$9$$, "&lt;");
                  break;
                case ">":
                  $JSCompiler_StaticMethods_pcdata$$($handler$$9$$, "&gt;");
                  break;
                default:
                  $JSCompiler_StaticMethods_pcdata$$($handler$$9$$, "&amp;")
              }
            }
          }
        }
      }
    }
  }
  for($htmlLower_i$$inline_510$$ = $handler$$9$$.$stack_$.length;0 <= --$htmlLower_i$$inline_510$$;) {
    $handler$$9$$.$stringBuffer_$.append("</", $handler$$9$$.$stack_$[$htmlLower_i$$inline_510$$], ">")
  }
  $handler$$9$$.$stack_$.length = 0
};
$goog$string$html$HtmlParser$$.prototype.$lookupEntity_$ = function $$goog$string$html$HtmlParser$$$$$lookupEntity_$$($name$$70$$) {
  $name$$70$$ = $name$$70$$.toLowerCase();
  if($goog$string$html$HtmlParser$Entities$$.hasOwnProperty($name$$70$$)) {
    return $goog$string$html$HtmlParser$Entities$$[$name$$70$$]
  }
  var $m$$1$$ = $name$$70$$.match($goog$string$html$HtmlParser$DECIMAL_ESCAPE_RE_$$);
  return $m$$1$$ ? String.fromCharCode(parseInt($m$$1$$[1], 10)) : ($m$$1$$ = $name$$70$$.match($goog$string$html$HtmlParser$HEX_ESCAPE_RE_$$)) ? String.fromCharCode(parseInt($m$$1$$[1], 16)) : ""
};
function $goog$string$html$HtmlSaxHandler$$() {
}
;/*
 Portions of this code are from the google-caja project, received by
 Google under the Apache license (http://code.google.com/p/google-caja/).
 All other code is Copyright 2009 Google, Inc. All Rights Reserved.

// Copyright (C) 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

*/
function $goog$string$html$HtmlSanitizer$$($stringBuffer$$1$$, $opt_urlPolicy$$1$$, $opt_nmTokenPolicy$$1$$) {
  this.$stringBuffer_$ = $stringBuffer$$1$$;
  this.$stack_$ = [];
  this.$ignoring_$ = $JSCompiler_alias_FALSE$$;
  this.$urlPolicy_$ = $opt_urlPolicy$$1$$;
  this.$nmTokenPolicy_$ = $opt_nmTokenPolicy$$1$$
}
$goog$inherits$$($goog$string$html$HtmlSanitizer$$, $goog$string$html$HtmlSaxHandler$$);
var $goog$string$html$HtmlSanitizer$Attributes$$ = {"*::class":9, "*::dir":0, "*::id":4, "*::lang":0, "*::onclick":2, "*::ondblclick":2, "*::onkeydown":2, "*::onkeypress":2, "*::onkeyup":2, "*::onload":2, "*::onmousedown":2, "*::onmousemove":2, "*::onmouseout":2, "*::onmouseover":2, "*::onmouseup":2, "*::style":3, "*::title":0, "*::accesskey":0, "*::tabindex":0, "*::onfocus":2, "*::onblur":2, "a::coords":0, "a::href":1, "a::hreflang":0, "a::name":7, "a::onblur":2, "a::rel":0, "a::rev":0, "a::shape":0, 
"a::target":10, "a::type":0, "area::accesskey":0, "area::alt":0, "area::coords":0, "area::href":1, "area::nohref":0, "area::onfocus":2, "area::shape":0, "area::tabindex":0, "area::target":10, "bdo::dir":0, "blockquote::cite":1, "br::clear":0, "button::accesskey":0, "button::disabled":0, "button::name":8, "button::onblur":2, "button::onfocus":2, "button::tabindex":0, "button::type":0, "button::value":0, "caption::align":0, "col::align":0, "col::char":0, "col::charoff":0, "col::span":0, "col::valign":0, 
"col::width":0, "colgroup::align":0, "colgroup::char":0, "colgroup::charoff":0, "colgroup::span":0, "colgroup::valign":0, "colgroup::width":0, "del::cite":1, "del::datetime":0, "dir::compact":0, "div::align":0, "dl::compact":0, "font::color":0, "font::face":0, "font::size":0, "form::accept":0, "form::action":1, "form::autocomplete":0, "form::enctype":0, "form::method":0, "form::name":7, "form::onreset":2, "form::onsubmit":2, "form::target":10, "h1::align":0, "h2::align":0, "h3::align":0, "h4::align":0, 
"h5::align":0, "h6::align":0, "hr::align":0, "hr::noshade":0, "hr::size":0, "hr::width":0, "img::align":0, "img::alt":0, "img::border":0, "img::height":0, "img::hspace":0, "img::ismap":0, "img::longdesc":1, "img::name":7, "img::src":1, "img::usemap":11, "img::vspace":0, "img::width":0, "input::accept":0, "input::accesskey":0, "input::autocomplete":0, "input::align":0, "input::alt":0, "input::checked":0, "input::disabled":0, "input::ismap":0, "input::maxlength":0, "input::name":8, "input::onblur":2, 
"input::onchange":2, "input::onfocus":2, "input::onselect":2, "input::readonly":0, "input::size":0, "input::src":1, "input::tabindex":0, "input::type":0, "input::usemap":11, "input::value":0, "ins::cite":1, "ins::datetime":0, "label::accesskey":0, "label::for":5, "label::onblur":2, "label::onfocus":2, "legend::accesskey":0, "legend::align":0, "li::type":0, "li::value":0, "map::name":7, "menu::compact":0, "ol::compact":0, "ol::start":0, "ol::type":0, "optgroup::disabled":0, "optgroup::label":0, "option::disabled":0, 
"option::label":0, "option::selected":0, "option::value":0, "p::align":0, "pre::width":0, "q::cite":1, "select::disabled":0, "select::multiple":0, "select::name":8, "select::onblur":2, "select::onchange":2, "select::onfocus":2, "select::size":0, "select::tabindex":0, "table::align":0, "table::bgcolor":0, "table::border":0, "table::cellpadding":0, "table::cellspacing":0, "table::frame":0, "table::rules":0, "table::summary":0, "table::width":0, "tbody::align":0, "tbody::char":0, "tbody::charoff":0, 
"tbody::valign":0, "td::abbr":0, "td::align":0, "td::axis":0, "td::bgcolor":0, "td::char":0, "td::charoff":0, "td::colspan":0, "td::headers":6, "td::height":0, "td::nowrap":0, "td::rowspan":0, "td::scope":0, "td::valign":0, "td::width":0, "textarea::accesskey":0, "textarea::cols":0, "textarea::disabled":0, "textarea::name":8, "textarea::onblur":2, "textarea::onchange":2, "textarea::onfocus":2, "textarea::onselect":2, "textarea::readonly":0, "textarea::rows":0, "textarea::tabindex":0, "tfoot::align":0, 
"tfoot::char":0, "tfoot::charoff":0, "tfoot::valign":0, "th::abbr":0, "th::align":0, "th::axis":0, "th::bgcolor":0, "th::char":0, "th::charoff":0, "th::colspan":0, "th::headers":6, "th::height":0, "th::nowrap":0, "th::rowspan":0, "th::scope":0, "th::valign":0, "th::width":0, "thead::align":0, "thead::char":0, "thead::charoff":0, "thead::valign":0, "tr::align":0, "tr::bgcolor":0, "tr::char":0, "tr::charoff":0, "tr::valign":0, "ul::compact":0, "ul::type":0};
$goog$string$html$HtmlSanitizer$$.prototype.$startTag$ = function $$goog$string$html$HtmlSanitizer$$$$$startTag$$($tagName$$7$$, $attribs$$1$$) {
  if(!this.$ignoring_$ && $goog$string$html$HtmlParser$Elements$$.hasOwnProperty($tagName$$7$$)) {
    var $eflags$$1_i$$106$$ = $goog$string$html$HtmlParser$Elements$$[$tagName$$7$$];
    if(!($eflags$$1_i$$106$$ & 32)) {
      if($eflags$$1_i$$106$$ & 16) {
        this.$ignoring_$ = !($eflags$$1_i$$106$$ & 2)
      }else {
        for(var $attribs$$inline_514_n$$7$$ = $attribs$$1$$, $attribName$$1_i$$inline_515$$ = 0;$attribName$$1_i$$inline_515$$ < $attribs$$inline_514_n$$7$$.length;$attribName$$1_i$$inline_515$$ += 2) {
          var $attribName$$inline_516_value$$75$$ = $attribs$$inline_514_n$$7$$[$attribName$$1_i$$inline_515$$], $value$$inline_517$$ = $attribs$$inline_514_n$$7$$[$attribName$$1_i$$inline_515$$ + 1], $atype$$inline_518$$ = $JSCompiler_alias_NULL$$, $attribKey$$inline_519$$;
          if(($attribKey$$inline_519$$ = $tagName$$7$$ + "::" + $attribName$$inline_516_value$$75$$, $goog$string$html$HtmlSanitizer$Attributes$$.hasOwnProperty($attribKey$$inline_519$$)) || ($attribKey$$inline_519$$ = "*::" + $attribName$$inline_516_value$$75$$, $goog$string$html$HtmlSanitizer$Attributes$$.hasOwnProperty($attribKey$$inline_519$$))) {
            $atype$$inline_518$$ = $goog$string$html$HtmlSanitizer$Attributes$$[$attribKey$$inline_519$$]
          }
          if($atype$$inline_518$$ !== $JSCompiler_alias_NULL$$) {
            switch($atype$$inline_518$$) {
              case 0:
                break;
              case 2:
              ;
              case 3:
                $value$$inline_517$$ = $JSCompiler_alias_NULL$$;
                break;
              case 4:
              ;
              case 5:
              ;
              case 6:
              ;
              case 7:
              ;
              case 8:
              ;
              case 9:
                $value$$inline_517$$ = this.$nmTokenPolicy_$ ? this.$nmTokenPolicy_$($value$$inline_517$$) : $value$$inline_517$$;
                break;
              case 1:
                $value$$inline_517$$ = this.$urlPolicy_$ && this.$urlPolicy_$($value$$inline_517$$);
                break;
              case 11:
                $value$$inline_517$$ && "#" === $value$$inline_517$$.charAt(0) ? ($value$$inline_517$$ = this.$nmTokenPolicy_$ ? this.$nmTokenPolicy_$($value$$inline_517$$) : $value$$inline_517$$) && ($value$$inline_517$$ = "#" + $value$$inline_517$$) : $value$$inline_517$$ = $JSCompiler_alias_NULL$$;
                break;
              default:
                $value$$inline_517$$ = $JSCompiler_alias_NULL$$
            }
          }else {
            $value$$inline_517$$ = $JSCompiler_alias_NULL$$
          }
          $attribs$$inline_514_n$$7$$[$attribName$$1_i$$inline_515$$ + 1] = $value$$inline_517$$
        }
        if($attribs$$1$$ = $attribs$$inline_514_n$$7$$) {
          $eflags$$1_i$$106$$ & 2 || this.$stack_$.push($tagName$$7$$);
          this.$stringBuffer_$.append("<", $tagName$$7$$);
          $eflags$$1_i$$106$$ = 0;
          for($attribs$$inline_514_n$$7$$ = $attribs$$1$$.length;$eflags$$1_i$$106$$ < $attribs$$inline_514_n$$7$$;$eflags$$1_i$$106$$ += 2) {
            $attribName$$1_i$$inline_515$$ = $attribs$$1$$[$eflags$$1_i$$106$$], $attribName$$inline_516_value$$75$$ = $attribs$$1$$[$eflags$$1_i$$106$$ + 1], $attribName$$inline_516_value$$75$$ !== $JSCompiler_alias_NULL$$ && $attribName$$inline_516_value$$75$$ !== $JSCompiler_alias_VOID$$ && this.$stringBuffer_$.append(" ", $attribName$$1_i$$inline_515$$, '="', $attribName$$inline_516_value$$75$$.replace($goog$string$html$HtmlParser$AMP_RE_$$, "&amp;").replace($goog$string$html$HtmlParser$LT_RE_$$, 
            "&lt;").replace($goog$string$html$HtmlParser$GT_RE_$$, "&gt;").replace($goog$string$html$HtmlParser$QUOTE_RE_$$, "&#34;").replace($goog$string$html$HtmlParser$EQUALS_RE_$$, "&#61;"), '"')
          }
          this.$stringBuffer_$.append(">")
        }
      }
    }
  }
};
$goog$string$html$HtmlSanitizer$$.prototype.$endTag$ = function $$goog$string$html$HtmlSanitizer$$$$$endTag$$($tagName$$8$$) {
  if(this.$ignoring_$) {
    this.$ignoring_$ = $JSCompiler_alias_FALSE$$
  }else {
    if($goog$string$html$HtmlParser$Elements$$.hasOwnProperty($tagName$$8$$)) {
      var $eflags$$2_index$$54$$ = $goog$string$html$HtmlParser$Elements$$[$tagName$$8$$];
      if(!($eflags$$2_index$$54$$ & 50)) {
        if($eflags$$2_index$$54$$ & 1) {
          for($eflags$$2_index$$54$$ = this.$stack_$.length;0 <= --$eflags$$2_index$$54$$;) {
            var $stackEl$$ = this.$stack_$[$eflags$$2_index$$54$$];
            if($stackEl$$ === $tagName$$8$$) {
              break
            }
            if(!($goog$string$html$HtmlParser$Elements$$[$stackEl$$] & 1)) {
              return
            }
          }
        }else {
          for($eflags$$2_index$$54$$ = this.$stack_$.length;0 <= --$eflags$$2_index$$54$$ && this.$stack_$[$eflags$$2_index$$54$$] !== $tagName$$8$$;) {
          }
        }
        if(!(0 > $eflags$$2_index$$54$$)) {
          for(var $i$$107$$ = this.$stack_$.length;--$i$$107$$ > $eflags$$2_index$$54$$;) {
            $stackEl$$ = this.$stack_$[$i$$107$$], $goog$string$html$HtmlParser$Elements$$[$stackEl$$] & 1 || this.$stringBuffer_$.append("</", $stackEl$$, ">")
          }
          this.$stack_$.length = $eflags$$2_index$$54$$;
          this.$stringBuffer_$.append("</", $tagName$$8$$, ">")
        }
      }
    }
  }
};
function $JSCompiler_StaticMethods_pcdata$$($JSCompiler_StaticMethods_pcdata$self$$, $text$$11$$) {
  $JSCompiler_StaticMethods_pcdata$self$$.$ignoring_$ || $JSCompiler_StaticMethods_pcdata$self$$.$stringBuffer_$.append($text$$11$$)
}
$goog$string$html$HtmlSanitizer$$.prototype.$rcdata$ = function $$goog$string$html$HtmlSanitizer$$$$$rcdata$$($text$$12$$) {
  this.$ignoring_$ || this.$stringBuffer_$.append($text$$12$$)
};
$goog$string$html$HtmlSanitizer$$.prototype.$cdata$ = function $$goog$string$html$HtmlSanitizer$$$$$cdata$$($text$$13$$) {
  this.$ignoring_$ || this.$stringBuffer_$.append($text$$13$$)
};
function $goog$events$KeyCodes$firesKeyPressEvent$$($keyCode$$, $opt_heldKeyCode$$, $opt_shiftKey$$, $opt_ctrlKey$$, $opt_altKey$$) {
  if(!$goog$userAgent$IE$$ && (!$goog$userAgent$WEBKIT$$ || !$goog$userAgent$isVersion$$("525"))) {
    return $JSCompiler_alias_TRUE$$
  }
  if($goog$userAgent$detectedMac_$$ && $opt_altKey$$) {
    return $goog$events$KeyCodes$isCharacterKey$$($keyCode$$)
  }
  if($opt_altKey$$ && !$opt_ctrlKey$$ || !$opt_shiftKey$$ && (17 == $opt_heldKeyCode$$ || 18 == $opt_heldKeyCode$$) || $goog$userAgent$IE$$ && $opt_ctrlKey$$ && $opt_heldKeyCode$$ == $keyCode$$) {
    return $JSCompiler_alias_FALSE$$
  }
  switch($keyCode$$) {
    case 13:
      return!($goog$userAgent$IE$$ && $goog$userAgent$isDocumentMode$$(9));
    case 27:
      return!$goog$userAgent$WEBKIT$$
  }
  return $goog$events$KeyCodes$isCharacterKey$$($keyCode$$)
}
function $goog$events$KeyCodes$isCharacterKey$$($keyCode$$1$$) {
  if(48 <= $keyCode$$1$$ && 57 >= $keyCode$$1$$ || 96 <= $keyCode$$1$$ && 106 >= $keyCode$$1$$ || 65 <= $keyCode$$1$$ && 90 >= $keyCode$$1$$ || $goog$userAgent$WEBKIT$$ && 0 == $keyCode$$1$$) {
    return $JSCompiler_alias_TRUE$$
  }
  switch($keyCode$$1$$) {
    case 32:
    ;
    case 63:
    ;
    case 107:
    ;
    case 109:
    ;
    case 110:
    ;
    case 111:
    ;
    case 186:
    ;
    case 59:
    ;
    case 189:
    ;
    case 187:
    ;
    case 61:
    ;
    case 188:
    ;
    case 190:
    ;
    case 191:
    ;
    case 192:
    ;
    case 222:
    ;
    case 219:
    ;
    case 220:
    ;
    case 221:
      return $JSCompiler_alias_TRUE$$;
    default:
      return $JSCompiler_alias_FALSE$$
  }
}
function $goog$events$KeyCodes$normalizeGeckoKeyCode$$($keyCode$$2$$) {
  switch($keyCode$$2$$) {
    case 61:
      return 187;
    case 59:
      return 186;
    case 224:
      return 91;
    case 0:
      return 224;
    default:
      return $keyCode$$2$$
  }
}
;function $goog$events$KeyHandler$$($opt_element$$11$$, $opt_capture$$6$$) {
  $goog$Disposable$$.call(this);
  $opt_element$$11$$ && $JSCompiler_StaticMethods_attach$$(this, $opt_element$$11$$, $opt_capture$$6$$)
}
$goog$inherits$$($goog$events$KeyHandler$$, $goog$events$EventTarget$$);
$JSCompiler_prototypeAlias$$ = $goog$events$KeyHandler$$.prototype;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$keyPressKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$keyDownKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$keyUpKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$lastKey_$ = -1;
$JSCompiler_prototypeAlias$$.$keyCode_$ = -1;
$JSCompiler_prototypeAlias$$.$altKey_$ = $JSCompiler_alias_FALSE$$;
var $goog$events$KeyHandler$safariKey_$$ = {3:13, 12:144, 63232:38, 63233:40, 63234:37, 63235:39, 63236:112, 63237:113, 63238:114, 63239:115, 63240:116, 63241:117, 63242:118, 63243:119, 63244:120, 63245:121, 63246:122, 63247:123, 63248:44, 63272:46, 63273:36, 63275:35, 63276:33, 63277:34, 63289:144, 63302:45}, $goog$events$KeyHandler$keyIdentifier_$$ = {Up:38, Down:40, Left:37, Right:39, Enter:13, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, "U+007F":46, 
Home:36, End:35, PageUp:33, PageDown:34, Insert:45}, $goog$events$KeyHandler$USES_KEYDOWN_$$ = $goog$userAgent$IE$$ || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("525"), $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ = $goog$userAgent$detectedMac_$$ && $goog$userAgent$GECKO$$;
$JSCompiler_prototypeAlias$$ = $goog$events$KeyHandler$$.prototype;
$JSCompiler_prototypeAlias$$.$handleKeyDown_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyDown_$$($e$$36$$) {
  if($goog$userAgent$WEBKIT$$ && (17 == this.$lastKey_$ && !$e$$36$$.ctrlKey || 18 == this.$lastKey_$ && !$e$$36$$.altKey)) {
    this.$keyCode_$ = this.$lastKey_$ = -1
  }
  $goog$events$KeyHandler$USES_KEYDOWN_$$ && !$goog$events$KeyCodes$firesKeyPressEvent$$($e$$36$$.keyCode, this.$lastKey_$, $e$$36$$.shiftKey, $e$$36$$.ctrlKey, $e$$36$$.altKey) ? this.handleEvent($e$$36$$) : (this.$keyCode_$ = $goog$userAgent$GECKO$$ ? $goog$events$KeyCodes$normalizeGeckoKeyCode$$($e$$36$$.keyCode) : $e$$36$$.keyCode, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && (this.$altKey_$ = $e$$36$$.altKey))
};
$JSCompiler_prototypeAlias$$.$handleKeyup_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyup_$$($e$$37$$) {
  this.$keyCode_$ = this.$lastKey_$ = -1;
  this.$altKey_$ = $e$$37$$.altKey
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($e$$38_repeat$$) {
  var $be$$2_event$$3$$ = $e$$38_repeat$$.$event_$, $keyCode$$3$$, $charCode$$, $altKey$$2$$ = $be$$2_event$$3$$.altKey;
  $goog$userAgent$IE$$ && "keypress" == $e$$38_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 13 != $keyCode$$3$$ && 27 != $keyCode$$3$$ ? $be$$2_event$$3$$.keyCode : 0) : $goog$userAgent$WEBKIT$$ && "keypress" == $e$$38_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 0 <= $be$$2_event$$3$$.charCode && 63232 > $be$$2_event$$3$$.charCode && $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$2_event$$3$$.charCode : 0) : $goog$userAgent$OPERA$$ ? ($keyCode$$3$$ = 
  this.$keyCode_$, $charCode$$ = $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$2_event$$3$$.keyCode : 0) : ($keyCode$$3$$ = $be$$2_event$$3$$.keyCode || this.$keyCode_$, $charCode$$ = $be$$2_event$$3$$.charCode || 0, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && ($altKey$$2$$ = this.$altKey_$), $goog$userAgent$detectedMac_$$ && (63 == $charCode$$ && 224 == $keyCode$$3$$) && ($keyCode$$3$$ = 191));
  var $key$$65$$ = $keyCode$$3$$, $keyIdentifier$$ = $be$$2_event$$3$$.keyIdentifier;
  $keyCode$$3$$ ? 63232 <= $keyCode$$3$$ && $keyCode$$3$$ in $goog$events$KeyHandler$safariKey_$$ ? $key$$65$$ = $goog$events$KeyHandler$safariKey_$$[$keyCode$$3$$] : 25 == $keyCode$$3$$ && $e$$38_repeat$$.shiftKey && ($key$$65$$ = 9) : $keyIdentifier$$ && $keyIdentifier$$ in $goog$events$KeyHandler$keyIdentifier_$$ && ($key$$65$$ = $goog$events$KeyHandler$keyIdentifier_$$[$keyIdentifier$$]);
  $e$$38_repeat$$ = $key$$65$$ == this.$lastKey_$;
  this.$lastKey_$ = $key$$65$$;
  $be$$2_event$$3$$ = new $goog$events$KeyEvent$$($key$$65$$, $charCode$$, $e$$38_repeat$$, $be$$2_event$$3$$);
  $be$$2_event$$3$$.altKey = $altKey$$2$$;
  this.dispatchEvent($be$$2_event$$3$$)
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
function $JSCompiler_StaticMethods_attach$$($JSCompiler_StaticMethods_attach$self$$, $element$$71$$, $opt_capture$$7$$) {
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ && $JSCompiler_StaticMethods_attach$self$$.detach();
  $JSCompiler_StaticMethods_attach$self$$.$element_$ = $element$$71$$;
  $JSCompiler_StaticMethods_attach$self$$.$keyPressKey_$ = $goog$events$listen$$($JSCompiler_StaticMethods_attach$self$$.$element_$, "keypress", $JSCompiler_StaticMethods_attach$self$$, $opt_capture$$7$$);
  $JSCompiler_StaticMethods_attach$self$$.$keyDownKey_$ = $goog$events$listen$$($JSCompiler_StaticMethods_attach$self$$.$element_$, "keydown", $JSCompiler_StaticMethods_attach$self$$.$handleKeyDown_$, $opt_capture$$7$$, $JSCompiler_StaticMethods_attach$self$$);
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ = $goog$events$listen$$($JSCompiler_StaticMethods_attach$self$$.$element_$, "keyup", $JSCompiler_StaticMethods_attach$self$$.$handleKeyup_$, $opt_capture$$7$$, $JSCompiler_StaticMethods_attach$self$$)
}
$JSCompiler_prototypeAlias$$.detach = function $$JSCompiler_prototypeAlias$$$detach$() {
  this.$keyPressKey_$ && ($goog$events$unlistenByKey$$(this.$keyPressKey_$), $goog$events$unlistenByKey$$(this.$keyDownKey_$), $goog$events$unlistenByKey$$(this.$keyUpKey_$), this.$keyUpKey_$ = this.$keyDownKey_$ = this.$keyPressKey_$ = $JSCompiler_alias_NULL$$);
  this.$element_$ = $JSCompiler_alias_NULL$$;
  this.$keyCode_$ = this.$lastKey_$ = -1
};
function $goog$events$KeyEvent$$($keyCode$$4$$, $charCode$$1$$, $repeat$$1$$, $browserEvent$$1$$) {
  $browserEvent$$1$$ && this.init($browserEvent$$1$$, $JSCompiler_alias_VOID$$);
  this.type = "key";
  this.keyCode = $keyCode$$4$$;
  this.charCode = $charCode$$1$$;
  this.repeat = $repeat$$1$$
}
$goog$inherits$$($goog$events$KeyEvent$$, $goog$events$BrowserEvent$$);
function $goog$ui$IdGenerator$$() {
}
$goog$addSingletonGetter$$($goog$ui$IdGenerator$$);
$goog$ui$IdGenerator$$.prototype.$nextId_$ = 0;
$goog$ui$IdGenerator$$.$getInstance$();
function $goog$ui$Component$$($opt_domHelper$$2$$) {
  $goog$Disposable$$.call(this);
  this.$dom_$ = $opt_domHelper$$2$$ || $goog$dom$getDomHelper$$();
  this.$rightToLeft_$ = $goog$ui$Component$defaultRightToLeft_$$
}
$goog$inherits$$($goog$ui$Component$$, $goog$events$EventTarget$$);
$goog$ui$Component$$.prototype.$idGenerator_$ = $goog$ui$IdGenerator$$.$getInstance$();
var $goog$ui$Component$defaultRightToLeft_$$ = $JSCompiler_alias_NULL$$;
function $goog$ui$Component$getStateTransitionEvent$$($state$$, $isEntering$$) {
  switch($state$$) {
    case 1:
      return $isEntering$$ ? "disable" : "enable";
    case 2:
      return $isEntering$$ ? "highlight" : "unhighlight";
    case 4:
      return $isEntering$$ ? "activate" : "deactivate";
    case 8:
      return $isEntering$$ ? "select" : "unselect";
    case 16:
      return $isEntering$$ ? "check" : "uncheck";
    case 32:
      return $isEntering$$ ? "focus" : "blur";
    case 64:
      return $isEntering$$ ? "open" : "close"
  }
  $JSCompiler_alias_THROW$$(Error("Invalid component state"))
}
$JSCompiler_prototypeAlias$$ = $goog$ui$Component$$.prototype;
$JSCompiler_prototypeAlias$$.$id_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$inDocument_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$rightToLeft_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$parent_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$children_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$childIndex_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$wasDecorated_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$getHandler$ = function $$JSCompiler_prototypeAlias$$$$getHandler$$() {
  return this.$googUiComponentHandler_$ || (this.$googUiComponentHandler_$ = new $goog$events$EventHandler$$(this))
};
$JSCompiler_prototypeAlias$$.$setParentEventTarget$ = function $$JSCompiler_prototypeAlias$$$$setParentEventTarget$$($parent$$22$$) {
  this.$parent_$ && this.$parent_$ != $parent$$22$$ && $JSCompiler_alias_THROW$$(Error("Method not supported"));
  $goog$ui$Component$$.$superClass_$.$setParentEventTarget$.call(this, $parent$$22$$)
};
$JSCompiler_prototypeAlias$$.$getDomHelper$ = $JSCompiler_get$$("$dom_$");
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($element$$73$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  if($element$$73$$ && this.$canDecorate$($element$$73$$)) {
    this.$wasDecorated_$ = $JSCompiler_alias_TRUE$$;
    if(!this.$dom_$ || this.$dom_$.$document_$ != $goog$dom$getOwnerDocument$$($element$$73$$)) {
      this.$dom_$ = $goog$dom$getDomHelper$$($element$$73$$)
    }
    this.$decorateInternal$($element$$73$$);
    this.$enterDocument$()
  }else {
    $JSCompiler_alias_THROW$$(Error("Invalid element to decorate"))
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$75$$) {
  this.$element_$ = $element$$75$$
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  function $f$$inline_527$$($child$$8$$) {
    !$child$$8$$.$inDocument_$ && $child$$8$$.$getElement$() && $child$$8$$.$enterDocument$()
  }
  this.$inDocument_$ = $JSCompiler_alias_TRUE$$;
  this.$children_$ && $goog$array$forEach$$(this.$children_$, $f$$inline_527$$, $JSCompiler_alias_VOID$$)
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  function $f$$inline_531$$($child$$9$$) {
    $child$$9$$.$inDocument_$ && $child$$9$$.$exitDocument$()
  }
  this.$children_$ && $goog$array$forEach$$(this.$children_$, $f$$inline_531$$, $JSCompiler_alias_VOID$$);
  this.$googUiComponentHandler_$ && this.$googUiComponentHandler_$.$removeAll$();
  this.$inDocument_$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($rightToLeft$$1$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  this.$rightToLeft_$ = $rightToLeft$$1$$
};
$JSCompiler_prototypeAlias$$.removeChild = function $$JSCompiler_prototypeAlias$$$removeChild$($child$$15$$, $opt_unrender$$) {
  if($child$$15$$) {
    var $JSCompiler_StaticMethods_setParent$self$$inline_538_id$$6$$ = $goog$isString$$($child$$15$$) ? $child$$15$$ : $child$$15$$.$id_$ || ($child$$15$$.$id_$ = ":" + ($child$$15$$.$idGenerator_$.$nextId_$++).toString(36)), $JSCompiler_temp$$inline_876_obj$$inline_877_obj$$inline_880$$;
    this.$childIndex_$ && $JSCompiler_StaticMethods_setParent$self$$inline_538_id$$6$$ ? ($JSCompiler_temp$$inline_876_obj$$inline_877_obj$$inline_880$$ = this.$childIndex_$, $JSCompiler_temp$$inline_876_obj$$inline_877_obj$$inline_880$$ = ($JSCompiler_StaticMethods_setParent$self$$inline_538_id$$6$$ in $JSCompiler_temp$$inline_876_obj$$inline_877_obj$$inline_880$$ ? $JSCompiler_temp$$inline_876_obj$$inline_877_obj$$inline_880$$[$JSCompiler_StaticMethods_setParent$self$$inline_538_id$$6$$] : $JSCompiler_alias_VOID$$) || 
    $JSCompiler_alias_NULL$$) : $JSCompiler_temp$$inline_876_obj$$inline_877_obj$$inline_880$$ = $JSCompiler_alias_NULL$$;
    $child$$15$$ = $JSCompiler_temp$$inline_876_obj$$inline_877_obj$$inline_880$$;
    $JSCompiler_StaticMethods_setParent$self$$inline_538_id$$6$$ && $child$$15$$ && ($JSCompiler_temp$$inline_876_obj$$inline_877_obj$$inline_880$$ = this.$childIndex_$, $JSCompiler_StaticMethods_setParent$self$$inline_538_id$$6$$ in $JSCompiler_temp$$inline_876_obj$$inline_877_obj$$inline_880$$ && delete $JSCompiler_temp$$inline_876_obj$$inline_877_obj$$inline_880$$[$JSCompiler_StaticMethods_setParent$self$$inline_538_id$$6$$], $goog$array$remove$$(this.$children_$, $child$$15$$), $opt_unrender$$ && 
    ($child$$15$$.$exitDocument$(), $child$$15$$.$element_$ && $goog$dom$removeNode$$($child$$15$$.$element_$)), $JSCompiler_StaticMethods_setParent$self$$inline_538_id$$6$$ = $child$$15$$, $JSCompiler_StaticMethods_setParent$self$$inline_538_id$$6$$ == $JSCompiler_alias_NULL$$ && $JSCompiler_alias_THROW$$(Error("Unable to set parent component")), $JSCompiler_StaticMethods_setParent$self$$inline_538_id$$6$$.$parent_$ = $JSCompiler_alias_NULL$$, $goog$ui$Component$$.$superClass_$.$setParentEventTarget$.call($JSCompiler_StaticMethods_setParent$self$$inline_538_id$$6$$, 
    $JSCompiler_alias_NULL$$))
  }
  $child$$15$$ || $JSCompiler_alias_THROW$$(Error("Child is not in parent component"));
  return $child$$15$$
};
function $goog$ui$ControlRenderer$$() {
}
var $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$;
$goog$addSingletonGetter$$($goog$ui$ControlRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ControlRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$($element$$83$$) {
  return $element$$83$$
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($control$$1_element$$84$$, $className$$16$$, $enable$$1$$) {
  if($control$$1_element$$84$$ = $control$$1_element$$84$$.$getElement$ ? $control$$1_element$$84$$.$getElement$() : $control$$1_element$$84$$) {
    if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
      var $combinedClasses$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($goog$dom$classes$get$$($control$$1_element$$84$$), $className$$16$$);
      $combinedClasses$$.push($className$$16$$);
      $goog$partial$$($enable$$1$$ ? $goog$dom$classes$add$$ : $goog$dom$classes$remove$$, $control$$1_element$$84$$).apply($JSCompiler_alias_NULL$$, $combinedClasses$$)
    }else {
      $enable$$1$$ ? $goog$dom$classes$add$$($control$$1_element$$84$$, $className$$16$$) : $goog$dom$classes$remove$$($control$$1_element$$84$$, $className$$16$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($control$$3$$, $element$$86$$) {
  if($element$$86$$.id) {
    var $content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$ = $element$$86$$.id;
    if($control$$3$$.$parent_$ && $control$$3$$.$parent_$.$childIndex_$) {
      var $classNames$$1_obj$$inline_883_obj$$inline_886$$ = $control$$3$$.$parent_$.$childIndex_$, $extraClassNames_key$$inline_884$$ = $control$$3$$.$id_$;
      $extraClassNames_key$$inline_884$$ in $classNames$$1_obj$$inline_883_obj$$inline_886$$ && delete $classNames$$1_obj$$inline_883_obj$$inline_886$$[$extraClassNames_key$$inline_884$$];
      $classNames$$1_obj$$inline_883_obj$$inline_886$$ = $control$$3$$.$parent_$.$childIndex_$;
      $content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$ in $classNames$$1_obj$$inline_883_obj$$inline_886$$ && $JSCompiler_alias_THROW$$(Error('The object already contains the key "' + $content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$ + '"'));
      $classNames$$1_obj$$inline_883_obj$$inline_886$$[$content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$] = $control$$3$$
    }
    $control$$3$$.$id_$ = $content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$
  }
  ($content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$ = this.$getContentElement$($element$$86$$)) && $content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$.firstChild ? ($content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$ = $content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$.firstChild.nextSibling ? $goog$array$toArray$$($content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$.childNodes) : $content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$.firstChild, 
  $control$$3$$.$content_$ = $content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$) : $control$$3$$.$content_$ = $JSCompiler_alias_NULL$$;
  var $state$$2$$ = 0, $rendererClassName$$ = this.$getCssClass$(), $structuralClassName$$ = this.$getCssClass$(), $hasRendererClassName$$ = $JSCompiler_alias_FALSE$$, $hasStructuralClassName$$ = $JSCompiler_alias_FALSE$$, $content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$ = $JSCompiler_alias_FALSE$$, $classNames$$1_obj$$inline_883_obj$$inline_886$$ = $goog$dom$classes$get$$($element$$86$$);
  $goog$array$forEach$$($classNames$$1_obj$$inline_883_obj$$inline_886$$, function($className$$18_state$$inline_556$$) {
    if(!$hasRendererClassName$$ && $className$$18_state$$inline_556$$ == $rendererClassName$$) {
      $hasRendererClassName$$ = $JSCompiler_alias_TRUE$$, $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(!$hasStructuralClassName$$ && $className$$18_state$$inline_556$$ == $structuralClassName$$) {
        $hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$
      }else {
        var $JSCompiler_temp_const$$54$$ = $state$$2$$;
        if(!this.$stateByClass_$) {
          this.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$(this);
          var $obj$$inline_927$$ = this.$classByState_$, $transposed$$inline_928$$ = {}, $key$$inline_929$$;
          for($key$$inline_929$$ in $obj$$inline_927$$) {
            $transposed$$inline_928$$[$obj$$inline_927$$[$key$$inline_929$$]] = $key$$inline_929$$
          }
          this.$stateByClass_$ = $transposed$$inline_928$$
        }
        $className$$18_state$$inline_556$$ = parseInt(this.$stateByClass_$[$className$$18_state$$inline_556$$], 10);
        $state$$2$$ = $JSCompiler_temp_const$$54$$ | (isNaN($className$$18_state$$inline_556$$) ? 0 : $className$$18_state$$inline_556$$)
      }
    }
  }, this);
  $control$$3$$.$state_$ = $state$$2$$;
  $hasRendererClassName$$ || ($classNames$$1_obj$$inline_883_obj$$inline_886$$.push($rendererClassName$$), $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$));
  $hasStructuralClassName$$ || $classNames$$1_obj$$inline_883_obj$$inline_886$$.push($structuralClassName$$);
  ($extraClassNames_key$$inline_884$$ = $control$$3$$.$extraClassNames_$) && $classNames$$1_obj$$inline_883_obj$$inline_886$$.push.apply($classNames$$1_obj$$inline_883_obj$$inline_886$$, $extraClassNames_key$$inline_884$$);
  if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
    var $combinedClasses$$1$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classNames$$1_obj$$inline_883_obj$$inline_886$$);
    0 < $combinedClasses$$1$$.length && ($classNames$$1_obj$$inline_883_obj$$inline_886$$.push.apply($classNames$$1_obj$$inline_883_obj$$inline_886$$, $combinedClasses$$1$$), $content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$ = $JSCompiler_alias_TRUE$$)
  }
  if(!$hasRendererClassName$$ || !$hasStructuralClassName$$ || $extraClassNames_key$$inline_884$$ || $content$$inline_549_contentElem_hasCombinedClassName_id$$inline_546$$) {
    $element$$86$$.className = $classNames$$1_obj$$inline_883_obj$$inline_886$$.join(" ")
  }
  $control$$3$$.isEnabled() || this.$updateAriaState$($element$$86$$, 1, $JSCompiler_alias_TRUE$$);
  $control$$3$$.$state_$ & 8 && this.$updateAriaState$($element$$86$$, 8, $JSCompiler_alias_TRUE$$);
  $control$$3$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$86$$, 16, !!($control$$3$$.$state_$ & 16));
  $control$$3$$.$supportedStates_$ & 64 && this.$updateAriaState$($element$$86$$, 64, !!($control$$3$$.$state_$ & 64));
  return $element$$86$$
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($element$$89$$, $allow$$) {
  var $unselectable$$inline_569_value$$inline_572$$ = !$allow$$, $descendants$$inline_571$$ = $goog$userAgent$IE$$ || $goog$userAgent$OPERA$$ ? $element$$89$$.getElementsByTagName("*") : $JSCompiler_alias_NULL$$;
  if($goog$style$unselectableStyle_$$) {
    if($unselectable$$inline_569_value$$inline_572$$ = $unselectable$$inline_569_value$$inline_572$$ ? "none" : "", $element$$89$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_569_value$$inline_572$$, $descendants$$inline_571$$) {
      for(var $i$$inline_573$$ = 0, $descendant$$inline_574$$;$descendant$$inline_574$$ = $descendants$$inline_571$$[$i$$inline_573$$];$i$$inline_573$$++) {
        $descendant$$inline_574$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_569_value$$inline_572$$
      }
    }
  }else {
    if($goog$userAgent$IE$$ || $goog$userAgent$OPERA$$) {
      if($unselectable$$inline_569_value$$inline_572$$ = $unselectable$$inline_569_value$$inline_572$$ ? "on" : "", $element$$89$$.setAttribute("unselectable", $unselectable$$inline_569_value$$inline_572$$), $descendants$$inline_571$$) {
        for($i$$inline_573$$ = 0;$descendant$$inline_574$$ = $descendants$$inline_571$$[$i$$inline_573$$];$i$$inline_573$$++) {
          $descendant$$inline_574$$.setAttribute("unselectable", $unselectable$$inline_569_value$$inline_572$$)
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($element$$90$$, $rightToLeft$$2$$) {
  this.$enableClassName$($element$$90$$, this.$getCssClass$() + "-rtl", $rightToLeft$$2$$)
};
$JSCompiler_prototypeAlias$$.$isFocusable$ = function $$JSCompiler_prototypeAlias$$$$isFocusable$$($control$$6$$) {
  var $keyTarget$$;
  return $control$$6$$.$supportedStates_$ & 32 && ($keyTarget$$ = $control$$6$$.$getKeyEventTarget$()) ? $goog$dom$isFocusableTabIndex$$($keyTarget$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$setFocusable$ = function $$JSCompiler_prototypeAlias$$$$setFocusable$$($control$$7$$, $focusable$$) {
  var $element$$inline_576_keyTarget$$1$$;
  if($control$$7$$.$supportedStates_$ & 32 && ($element$$inline_576_keyTarget$$1$$ = $control$$7$$.$getKeyEventTarget$())) {
    if(!$focusable$$ && $control$$7$$.$state_$ & 32) {
      try {
        $element$$inline_576_keyTarget$$1$$.blur()
      }catch($e$$39$$) {
      }
      $control$$7$$.$state_$ & 32 && $control$$7$$.$handleBlur$()
    }
    $goog$dom$isFocusableTabIndex$$($element$$inline_576_keyTarget$$1$$) != $focusable$$ && ($focusable$$ ? $element$$inline_576_keyTarget$$1$$.tabIndex = 0 : ($element$$inline_576_keyTarget$$1$$.tabIndex = -1, $element$$inline_576_keyTarget$$1$$.removeAttribute("tabIndex")))
  }
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($control$$8$$, $state$$3$$, $enable$$3$$) {
  var $element$$92$$ = $control$$8$$.$getElement$();
  if($element$$92$$) {
    var $className$$19$$;
    this.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$(this);
    ($className$$19$$ = this.$classByState_$[$state$$3$$]) && this.$enableClassName$($control$$8$$, $className$$19$$, $enable$$3$$);
    this.$updateAriaState$($element$$92$$, $state$$3$$, $enable$$3$$)
  }
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$93$$, $ariaState_state$$4$$, $enable$$4$$) {
  $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ || ($goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  ($ariaState_state$$4$$ = $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$[$ariaState_state$$4$$]) && $element$$93$$.setAttribute("aria-" + $ariaState_state$$4$$, $enable$$4$$)
};
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($element$$94$$, $content$$2$$) {
  var $contentElem$$1$$ = this.$getContentElement$($element$$94$$);
  if($contentElem$$1$$ && ($goog$dom$removeChildren$$($contentElem$$1$$), $content$$2$$)) {
    if($goog$isString$$($content$$2$$)) {
      if("textContent" in $contentElem$$1$$) {
        $contentElem$$1$$.textContent = $content$$2$$
      }else {
        if($contentElem$$1$$.firstChild && 3 == $contentElem$$1$$.firstChild.nodeType) {
          for(;$contentElem$$1$$.lastChild != $contentElem$$1$$.firstChild;) {
            $contentElem$$1$$.removeChild($contentElem$$1$$.lastChild)
          }
          $contentElem$$1$$.firstChild.data = $content$$2$$
        }else {
          $goog$dom$removeChildren$$($contentElem$$1$$), $contentElem$$1$$.appendChild($goog$dom$getOwnerDocument$$($contentElem$$1$$).createTextNode($content$$2$$))
        }
      }
    }else {
      var $childHandler$$1$$ = function $$childHandler$$1$$$($child$$16$$) {
        if($child$$16$$) {
          var $doc$$34$$ = $goog$dom$getOwnerDocument$$($contentElem$$1$$);
          $contentElem$$1$$.appendChild($goog$isString$$($child$$16$$) ? $doc$$34$$.createTextNode($child$$16$$) : $child$$16$$)
        }
      };
      $goog$isArray$$($content$$2$$) ? $goog$array$forEach$$($content$$2$$, $childHandler$$1$$) : $goog$isArrayLike$$($content$$2$$) && !("nodeType" in $content$$2$$) ? $goog$array$forEach$$($goog$array$toArray$$($content$$2$$), $childHandler$$1$$) : $childHandler$$1$$($content$$2$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$getKeyEventTarget$ = function $$JSCompiler_prototypeAlias$$$$getKeyEventTarget$$($control$$9$$) {
  return $control$$9$$.$getElement$()
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-control");
function $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classes$$5$$, $opt_includedClass$$) {
  var $toAdd$$ = [];
  $opt_includedClass$$ && ($classes$$5$$ = $classes$$5$$.concat([$opt_includedClass$$]));
  $goog$array$forEach$$([], function($combo$$) {
    $goog$array$every$$($combo$$, $goog$partial$$($goog$array$contains$$, $classes$$5$$)) && (!$opt_includedClass$$ || $goog$array$contains$$($combo$$, $opt_includedClass$$)) && $toAdd$$.push($combo$$.join("_"))
  });
  return $toAdd$$
}
function $JSCompiler_StaticMethods_createClassByStateMap_$$($JSCompiler_StaticMethods_createClassByStateMap_$self$$) {
  var $baseClass$$ = $JSCompiler_StaticMethods_createClassByStateMap_$self$$.$getCssClass$();
  $JSCompiler_StaticMethods_createClassByStateMap_$self$$.$classByState_$ = {1:$baseClass$$ + "-disabled", 2:$baseClass$$ + "-hover", 4:$baseClass$$ + "-active", 8:$baseClass$$ + "-selected", 16:$baseClass$$ + "-checked", 32:$baseClass$$ + "-focused", 64:$baseClass$$ + "-open"}
}
;var $goog$ui$registry$defaultRenderers_$$ = {};
function $goog$ui$Control$$($content$$3$$, $JSCompiler_temp$$39_componentCtor$$inline_589_opt_renderer$$, $opt_domHelper$$3$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$3$$);
  if(!$JSCompiler_temp$$39_componentCtor$$inline_589_opt_renderer$$) {
    for(var $JSCompiler_temp$$39_componentCtor$$inline_589_opt_renderer$$ = this.constructor, $key$$inline_590_rendererCtor$$inline_591$$;$JSCompiler_temp$$39_componentCtor$$inline_589_opt_renderer$$;) {
      $key$$inline_590_rendererCtor$$inline_591$$ = $goog$getUid$$($JSCompiler_temp$$39_componentCtor$$inline_589_opt_renderer$$);
      if($key$$inline_590_rendererCtor$$inline_591$$ = $goog$ui$registry$defaultRenderers_$$[$key$$inline_590_rendererCtor$$inline_591$$]) {
        break
      }
      $JSCompiler_temp$$39_componentCtor$$inline_589_opt_renderer$$ = $JSCompiler_temp$$39_componentCtor$$inline_589_opt_renderer$$.$superClass_$ ? $JSCompiler_temp$$39_componentCtor$$inline_589_opt_renderer$$.$superClass_$.constructor : $JSCompiler_alias_NULL$$
    }
    $JSCompiler_temp$$39_componentCtor$$inline_589_opt_renderer$$ = $key$$inline_590_rendererCtor$$inline_591$$ ? $goog$isFunction$$($key$$inline_590_rendererCtor$$inline_591$$.$getInstance$) ? $key$$inline_590_rendererCtor$$inline_591$$.$getInstance$() : new $key$$inline_590_rendererCtor$$inline_591$$ : $JSCompiler_alias_NULL$$
  }
  this.$renderer_$ = $JSCompiler_temp$$39_componentCtor$$inline_589_opt_renderer$$;
  this.$content_$ = $content$$3$$
}
$goog$inherits$$($goog$ui$Control$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Control$$.prototype;
$JSCompiler_prototypeAlias$$.$content_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$state_$ = 0;
$JSCompiler_prototypeAlias$$.$supportedStates_$ = 39;
$JSCompiler_prototypeAlias$$.$autoStates_$ = 255;
$JSCompiler_prototypeAlias$$.$statesWithTransitionEvents_$ = 0;
$JSCompiler_prototypeAlias$$.$visible_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$extraClassNames_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$handleMouseEvents_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$allowTextSelection_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$preferredAriaRole_$ = $JSCompiler_alias_NULL$$;
function $JSCompiler_StaticMethods_setHandleMouseEvents$$($JSCompiler_StaticMethods_setHandleMouseEvents$self$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$self$$.$inDocument_$ && $JSCompiler_alias_FALSE$$ != $JSCompiler_StaticMethods_setHandleMouseEvents$self$$.$handleMouseEvents_$ && $JSCompiler_StaticMethods_enableMouseEventHandling_$$($JSCompiler_StaticMethods_setHandleMouseEvents$self$$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setHandleMouseEvents$self$$.$handleMouseEvents_$ = $JSCompiler_alias_FALSE$$
}
$JSCompiler_prototypeAlias$$.$getKeyEventTarget$ = function $$JSCompiler_prototypeAlias$$$$getKeyEventTarget$$() {
  return this.$renderer_$.$getKeyEventTarget$(this)
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($className$$25$$, $enable$$6$$) {
  $enable$$6$$ ? $className$$25$$ && (this.$extraClassNames_$ ? $goog$array$contains$$(this.$extraClassNames_$, $className$$25$$) || this.$extraClassNames_$.push($className$$25$$) : this.$extraClassNames_$ = [$className$$25$$], this.$renderer_$.$enableClassName$(this, $className$$25$$, $JSCompiler_alias_TRUE$$)) : $className$$25$$ && this.$extraClassNames_$ && ($goog$array$remove$$(this.$extraClassNames_$, $className$$25$$), 0 == this.$extraClassNames_$.length && (this.$extraClassNames_$ = $JSCompiler_alias_NULL$$), 
  this.$renderer_$.$enableClassName$(this, $className$$25$$, $JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  return this.$renderer_$.$getContentElement$(this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$98$$) {
  return this.$renderer_$.$canDecorate$($element$$98$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$99$$) {
  this.$element_$ = $element$$99$$ = this.$renderer_$.$decorate$(this, $element$$99$$);
  var $ariaRole$$inline_617$$ = this.$preferredAriaRole_$ || $JSCompiler_alias_VOID$$;
  $ariaRole$$inline_617$$ && $element$$99$$.setAttribute("role", $ariaRole$$inline_617$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$99$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ = "none" != $element$$99$$.style.display
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Control$$.$superClass_$.$enterDocument$.call(this);
  var $JSCompiler_StaticMethods_initializeDom$self$$inline_619_keyTarget$$2$$ = this.$renderer_$;
  this.$rightToLeft_$ == $JSCompiler_alias_NULL$$ && (this.$rightToLeft_$ = $goog$style$isRightToLeft$$(this.$inDocument_$ ? this.$element_$ : this.$dom_$.$document_$.body));
  this.$rightToLeft_$ && $JSCompiler_StaticMethods_initializeDom$self$$inline_619_keyTarget$$2$$.$setRightToLeft$(this.$getElement$(), $JSCompiler_alias_TRUE$$);
  this.isEnabled() && $JSCompiler_StaticMethods_initializeDom$self$$inline_619_keyTarget$$2$$.$setFocusable$(this, this.$visible_$);
  if(this.$supportedStates_$ & -2 && (this.$handleMouseEvents_$ && $JSCompiler_StaticMethods_enableMouseEventHandling_$$(this, $JSCompiler_alias_TRUE$$), this.$supportedStates_$ & 32 && ($JSCompiler_StaticMethods_initializeDom$self$$inline_619_keyTarget$$2$$ = this.$getKeyEventTarget$()))) {
    var $keyHandler$$ = this.$keyHandler_$ || (this.$keyHandler_$ = new $goog$events$KeyHandler$$);
    $JSCompiler_StaticMethods_attach$$($keyHandler$$, $JSCompiler_StaticMethods_initializeDom$self$$inline_619_keyTarget$$2$$);
    $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $keyHandler$$, "key", this.$handleKeyEvent$), $JSCompiler_StaticMethods_initializeDom$self$$inline_619_keyTarget$$2$$, "focus", this.$handleFocus$), $JSCompiler_StaticMethods_initializeDom$self$$inline_619_keyTarget$$2$$, "blur", this.$handleBlur$)
  }
};
function $JSCompiler_StaticMethods_enableMouseEventHandling_$$($JSCompiler_StaticMethods_enableMouseEventHandling_$self$$, $enable$$7$$) {
  var $handler$$11$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getHandler$(), $element$$100$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getElement$();
  $enable$$7$$ ? ($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($handler$$11$$, $element$$100$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$100$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$100$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$100$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_listen$$($handler$$11$$, $element$$100$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_listen$$($handler$$11$$, $element$$100$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$)) : 
  ($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($handler$$11$$, $element$$100$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$100$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$100$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$100$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$11$$, $element$$100$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$11$$, $element$$100$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$))
}
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  $goog$ui$Control$$.$superClass_$.$exitDocument$.call(this);
  this.$keyHandler_$ && this.$keyHandler_$.detach();
  this.$visible_$ && this.isEnabled() && this.$renderer_$.$setFocusable$(this, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($content$$4$$) {
  this.$renderer_$.$setContent$(this.$getElement$(), $content$$4$$);
  this.$content_$ = $content$$4$$
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($rightToLeft$$3$$) {
  $goog$ui$Control$$.$superClass_$.$setRightToLeft$.call(this, $rightToLeft$$3$$);
  var $element$$101$$ = this.$getElement$();
  $element$$101$$ && this.$renderer_$.$setRightToLeft$($element$$101$$, $rightToLeft$$3$$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($allow$$1$$) {
  this.$allowTextSelection_$ = $allow$$1$$;
  var $element$$102$$ = this.$getElement$();
  $element$$102$$ && this.$renderer_$.$setAllowTextSelection$($element$$102$$, $allow$$1$$)
};
$JSCompiler_prototypeAlias$$.isEnabled = function $$JSCompiler_prototypeAlias$$$isEnabled$() {
  return!(this.$state_$ & 1)
};
function $JSCompiler_StaticMethods_setHighlighted$$($JSCompiler_StaticMethods_setHighlighted$self$$, $highlight$$) {
  $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_setHighlighted$self$$, 2, $highlight$$) && $JSCompiler_StaticMethods_setHighlighted$self$$.$setState$(2, $highlight$$)
}
$JSCompiler_prototypeAlias$$.setActive = function $$JSCompiler_prototypeAlias$$$setActive$($active$$) {
  $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 4, $active$$) && this.$setState$(4, $active$$)
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($state$$9$$, $enable$$9$$) {
  this.$supportedStates_$ & $state$$9$$ && $enable$$9$$ != !!(this.$state_$ & $state$$9$$) && (this.$renderer_$.$setState$(this, $state$$9$$, $enable$$9$$), this.$state_$ = $enable$$9$$ ? this.$state_$ | $state$$9$$ : this.$state_$ & ~$state$$9$$)
};
function $JSCompiler_StaticMethods_isAutoState$$($JSCompiler_StaticMethods_isAutoState$self$$, $state$$13$$) {
  return!!($JSCompiler_StaticMethods_isAutoState$self$$.$autoStates_$ & $state$$13$$) && !!($JSCompiler_StaticMethods_isAutoState$self$$.$supportedStates_$ & $state$$13$$)
}
function $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_isTransitionAllowed$self$$, $state$$15$$, $enable$$12$$) {
  return!!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$supportedStates_$ & $state$$15$$) && !!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$state_$ & $state$$15$$) != $enable$$12$$ && (!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$statesWithTransitionEvents_$ & $state$$15$$) || $JSCompiler_StaticMethods_isTransitionAllowed$self$$.dispatchEvent($goog$ui$Component$getStateTransitionEvent$$($state$$15$$, $enable$$12$$))) && !$JSCompiler_StaticMethods_isTransitionAllowed$self$$.$disposed_$
}
$JSCompiler_prototypeAlias$$.$handleMouseOver$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOver$$($e$$40$$) {
  (!$e$$40$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$40$$.relatedTarget)) && (this.dispatchEvent("enter") && this.isEnabled() && $JSCompiler_StaticMethods_isAutoState$$(this, 2)) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleMouseOut$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOut$$($e$$41$$) {
  if((!$e$$41$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$41$$.relatedTarget)) && this.dispatchEvent("leave")) {
    $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$handleContextMenu$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$handleMouseDown$ = function $$JSCompiler_prototypeAlias$$$$handleMouseDown$$($e$$43$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_isMouseActionButton$$($e$$43$$) && ($JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_TRUE$$), this.$renderer_$.$isFocusable$(this) && this.$getKeyEventTarget$().focus()));
  !this.$allowTextSelection_$ && $JSCompiler_StaticMethods_isMouseActionButton$$($e$$43$$) && $e$$43$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$handleMouseUp$ = function $$JSCompiler_prototypeAlias$$$$handleMouseUp$$($e$$44$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), this.$state_$ & 4 && ($JSCompiler_StaticMethods_performActionInternal$$(this, $e$$44$$) && $JSCompiler_StaticMethods_isAutoState$$(this, 4)) && this.setActive($JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$handleDblClick$ = function $$JSCompiler_prototypeAlias$$$$handleDblClick$$($e$$45$$) {
  this.isEnabled() && $JSCompiler_StaticMethods_performActionInternal$$(this, $e$$45$$)
};
function $JSCompiler_StaticMethods_performActionInternal$$($JSCompiler_StaticMethods_performActionInternal$self$$, $e$$46$$) {
  if($JSCompiler_StaticMethods_isAutoState$$($JSCompiler_StaticMethods_performActionInternal$self$$, 16)) {
    var $actionEvent_check$$inline_626_open$$inline_632$$ = !($JSCompiler_StaticMethods_performActionInternal$self$$.$state_$ & 16);
    $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_performActionInternal$self$$, 16, $actionEvent_check$$inline_626_open$$inline_632$$) && $JSCompiler_StaticMethods_performActionInternal$self$$.$setState$(16, $actionEvent_check$$inline_626_open$$inline_632$$)
  }
  $JSCompiler_StaticMethods_isAutoState$$($JSCompiler_StaticMethods_performActionInternal$self$$, 8) && $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_performActionInternal$self$$, 8, $JSCompiler_alias_TRUE$$) && $JSCompiler_StaticMethods_performActionInternal$self$$.$setState$(8, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_isAutoState$$($JSCompiler_StaticMethods_performActionInternal$self$$, 64) && ($actionEvent_check$$inline_626_open$$inline_632$$ = !($JSCompiler_StaticMethods_performActionInternal$self$$.$state_$ & 64), $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_performActionInternal$self$$, 64, $actionEvent_check$$inline_626_open$$inline_632$$) && $JSCompiler_StaticMethods_performActionInternal$self$$.$setState$(64, $actionEvent_check$$inline_626_open$$inline_632$$));
  $actionEvent_check$$inline_626_open$$inline_632$$ = new $goog$events$Event$$("action", $JSCompiler_StaticMethods_performActionInternal$self$$);
  $e$$46$$ && ($actionEvent_check$$inline_626_open$$inline_632$$.altKey = $e$$46$$.altKey, $actionEvent_check$$inline_626_open$$inline_632$$.ctrlKey = $e$$46$$.ctrlKey, $actionEvent_check$$inline_626_open$$inline_632$$.metaKey = $e$$46$$.metaKey, $actionEvent_check$$inline_626_open$$inline_632$$.shiftKey = $e$$46$$.shiftKey, $actionEvent_check$$inline_626_open$$inline_632$$.$platformModifierKey$ = $e$$46$$.$platformModifierKey$);
  return $JSCompiler_StaticMethods_performActionInternal$self$$.dispatchEvent($actionEvent_check$$inline_626_open$$inline_632$$)
}
$JSCompiler_prototypeAlias$$.$handleFocus$ = function $$JSCompiler_prototypeAlias$$$$handleFocus$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_TRUE$$) && this.$setState$(32, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleBlur$ = function $$JSCompiler_prototypeAlias$$$$handleBlur$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 32, $JSCompiler_alias_FALSE$$) && this.$setState$(32, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$handleKeyEvent$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEvent$$($e$$49$$) {
  return this.$visible_$ && this.isEnabled() && 13 == $e$$49$$.keyCode && $JSCompiler_StaticMethods_performActionInternal$$(this, $e$$49$$) ? ($e$$49$$.preventDefault(), $e$$49$$.stopPropagation(), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$goog$isFunction$$($goog$ui$Control$$) || $JSCompiler_alias_THROW$$(Error("Invalid component class " + $goog$ui$Control$$));
$goog$isFunction$$($goog$ui$ControlRenderer$$) || $JSCompiler_alias_THROW$$(Error("Invalid renderer class " + $goog$ui$ControlRenderer$$));
var $key$$inline_642$$ = $goog$getUid$$($goog$ui$Control$$);
$goog$ui$registry$defaultRenderers_$$[$key$$inline_642$$] = $goog$ui$ControlRenderer$$;
function $decoratorFn$$inline_644$$() {
  return new $goog$ui$Control$$($JSCompiler_alias_NULL$$)
}
$goog$isFunction$$($decoratorFn$$inline_644$$) || $JSCompiler_alias_THROW$$(Error("Invalid decorator function " + $decoratorFn$$inline_644$$));
function $goog$ui$TextareaRenderer$$() {
}
$goog$inherits$$($goog$ui$TextareaRenderer$$, $goog$ui$ControlRenderer$$);
$goog$addSingletonGetter$$($goog$ui$TextareaRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$TextareaRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($control$$11$$, $element$$104$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($control$$11$$);
  $control$$11$$.$autoStates_$ &= -256;
  $control$$11$$.$inDocument_$ && $control$$11$$.$state_$ & 32 && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  $control$$11$$.$state_$ & 32 && $control$$11$$.$setState$(32, $JSCompiler_alias_FALSE$$);
  $control$$11$$.$supportedStates_$ &= -33;
  $goog$ui$TextareaRenderer$$.$superClass_$.$decorate$.call(this, $control$$11$$, $element$$104$$);
  $control$$11$$.$setContent$($element$$104$$.value);
  return $element$$104$$
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$106$$) {
  return"TEXTAREA" == $element$$106$$.tagName
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$isFocusable$ = function $$JSCompiler_prototypeAlias$$$$isFocusable$$($textarea$$1$$) {
  return $textarea$$1$$.isEnabled()
};
$JSCompiler_prototypeAlias$$.$setFocusable$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($element$$107_textarea$$2$$, $state$$16$$, $enable$$13$$) {
  $goog$ui$TextareaRenderer$$.$superClass_$.$setState$.call(this, $element$$107_textarea$$2$$, $state$$16$$, $enable$$13$$);
  if(($element$$107_textarea$$2$$ = $element$$107_textarea$$2$$.$getElement$()) && 1 == $state$$16$$) {
    $element$$107_textarea$$2$$.disabled = $enable$$13$$
  }
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($element$$108$$, $value$$78$$) {
  $element$$108$$ && ($element$$108$$.value = $value$$78$$)
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-textarea");
function $goog$ui$Textarea$$($content$$7$$, $opt_renderer$$1$$, $opt_domHelper$$4$$) {
  $goog$ui$Control$$.call(this, $content$$7$$, $opt_renderer$$1$$ || $goog$ui$TextareaRenderer$$.$getInstance$(), $opt_domHelper$$4$$);
  $JSCompiler_StaticMethods_setHandleMouseEvents$$(this);
  this.$setAllowTextSelection$($JSCompiler_alias_TRUE$$);
  $content$$7$$ || (this.$content_$ = "")
}
$goog$inherits$$($goog$ui$Textarea$$, $goog$ui$Control$$);
var $goog$ui$Textarea$NEEDS_HELP_SHRINKING_$$ = $goog$userAgent$GECKO$$ || $goog$userAgent$WEBKIT$$;
$JSCompiler_prototypeAlias$$ = $goog$ui$Textarea$$.prototype;
$JSCompiler_prototypeAlias$$.$isResizing_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$height_$ = 0;
$JSCompiler_prototypeAlias$$.$maxHeight_$ = 0;
$JSCompiler_prototypeAlias$$.$minHeight_$ = 0;
$JSCompiler_prototypeAlias$$.$hasDiscoveredTextareaCharacteristics_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$needsPaddingBorderFix_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$scrollHeightIncludesPadding_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$scrollHeightIncludesBorder_$ = $JSCompiler_alias_FALSE$$;
function $JSCompiler_StaticMethods_getPaddingBorderBoxHeight_$$($JSCompiler_StaticMethods_getPaddingBorderBoxHeight_$self$$) {
  return $JSCompiler_StaticMethods_getPaddingBorderBoxHeight_$self$$.$paddingBox_$.top + $JSCompiler_StaticMethods_getPaddingBorderBoxHeight_$self$$.$paddingBox_$.bottom + $JSCompiler_StaticMethods_getPaddingBorderBoxHeight_$self$$.$borderBox_$.top + $JSCompiler_StaticMethods_getPaddingBorderBoxHeight_$self$$.$borderBox_$.bottom
}
function $JSCompiler_StaticMethods_getMinHeight_$$($JSCompiler_StaticMethods_getMinHeight_$self$$) {
  var $minHeight$$ = $JSCompiler_StaticMethods_getMinHeight_$self$$.$minHeight_$, $textarea$$4$$ = $JSCompiler_StaticMethods_getMinHeight_$self$$.$getElement$();
  $minHeight$$ && ($textarea$$4$$ && $JSCompiler_StaticMethods_getMinHeight_$self$$.$needsPaddingBorderFix_$) && ($minHeight$$ -= $JSCompiler_StaticMethods_getPaddingBorderBoxHeight_$$($JSCompiler_StaticMethods_getMinHeight_$self$$));
  return $minHeight$$
}
function $JSCompiler_StaticMethods_getMaxHeight_$$($JSCompiler_StaticMethods_getMaxHeight_$self$$) {
  var $maxHeight$$ = $JSCompiler_StaticMethods_getMaxHeight_$self$$.$maxHeight_$, $textarea$$5$$ = $JSCompiler_StaticMethods_getMaxHeight_$self$$.$getElement$();
  $maxHeight$$ && ($textarea$$5$$ && $JSCompiler_StaticMethods_getMaxHeight_$self$$.$needsPaddingBorderFix_$) && ($maxHeight$$ -= $JSCompiler_StaticMethods_getPaddingBorderBoxHeight_$$($JSCompiler_StaticMethods_getMaxHeight_$self$$));
  return $maxHeight$$
}
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($content$$8$$) {
  $goog$ui$Textarea$$.$superClass_$.$setContent$.call(this, $content$$8$$);
  this.$getElement$() && this.$grow_$()
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Textarea$$.$superClass_$.$enterDocument$.call(this);
  var $textarea$$6$$ = this.$getElement$();
  $goog$style$setStyle$$($textarea$$6$$, {overflowY:"hidden", overflowX:"auto", boxSizing:"border-box", MsBoxSizing:"border-box", WebkitBoxSizing:"border-box", MozBoxSizing:"border-box"});
  this.$paddingBox_$ = $goog$style$getBox_$$($textarea$$6$$, "padding");
  this.$borderBox_$ = $goog$style$getBorderBox$$($textarea$$6$$);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $textarea$$6$$, "scroll", this.$grow_$), $textarea$$6$$, "focus", this.$grow_$), $textarea$$6$$, "keyup", this.$grow_$), $textarea$$6$$, "mouseup", this.$mouseUpListener_$);
  this.$getElement$() && this.$grow_$()
};
function $JSCompiler_StaticMethods_getHeight_$$($JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$) {
  if(!$JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$hasDiscoveredTextareaCharacteristics_$) {
    var $textarea$$7_textarea$$inline_659$$ = $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$getElement$().cloneNode($JSCompiler_alias_FALSE$$);
    $goog$style$setStyle$$($textarea$$7_textarea$$inline_659$$, {position:"absolute", height:"auto", top:"-9999px", margin:"0", padding:"1px", border:"1px solid #000", overflow:"hidden"});
    $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$getDomHelper$().$document_$.body.appendChild($textarea$$7_textarea$$inline_659$$);
    var $JSCompiler_temp_const$$15_height$$21_initialScrollHeight$$inline_660$$ = $textarea$$7_textarea$$inline_659$$.scrollHeight;
    $textarea$$7_textarea$$inline_659$$.style.padding = "10px";
    var $height$$inline_665_paddingBox$$3_paddingScrollHeight$$inline_661$$ = $textarea$$7_textarea$$inline_659$$.scrollHeight;
    $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$scrollHeightIncludesPadding_$ = $height$$inline_665_paddingBox$$3_paddingScrollHeight$$inline_661$$ > $JSCompiler_temp_const$$15_height$$21_initialScrollHeight$$inline_660$$;
    $textarea$$7_textarea$$inline_659$$.style.borderWidth = "10px";
    $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$scrollHeightIncludesBorder_$ = $textarea$$7_textarea$$inline_659$$.scrollHeight > $height$$inline_665_paddingBox$$3_paddingScrollHeight$$inline_661$$;
    $textarea$$7_textarea$$inline_659$$.style.height = "100px";
    100 != $textarea$$7_textarea$$inline_659$$.offsetHeight && ($JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$needsPaddingBorderFix_$ = $JSCompiler_alias_TRUE$$);
    $goog$dom$removeNode$$($textarea$$7_textarea$$inline_659$$);
    $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$hasDiscoveredTextareaCharacteristics_$ = $JSCompiler_alias_TRUE$$
  }
  var $textarea$$7_textarea$$inline_659$$ = $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$getElement$(), $JSCompiler_temp_const$$15_height$$21_initialScrollHeight$$inline_660$$ = $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$getElement$().scrollHeight, $borderBox$$inline_667_textarea$$inline_664$$ = $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$getElement$(), $height$$inline_665_paddingBox$$3_paddingScrollHeight$$inline_661$$ = $borderBox$$inline_667_textarea$$inline_664$$.offsetHeight - 
  $borderBox$$inline_667_textarea$$inline_664$$.clientHeight;
  if(!$JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$scrollHeightIncludesPadding_$) {
    var $paddingBox$$inline_666$$ = $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$paddingBox_$, $height$$inline_665_paddingBox$$3_paddingScrollHeight$$inline_661$$ = $height$$inline_665_paddingBox$$3_paddingScrollHeight$$inline_661$$ - ($paddingBox$$inline_666$$.top + $paddingBox$$inline_666$$.bottom)
  }
  $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$scrollHeightIncludesBorder_$ || ($borderBox$$inline_667_textarea$$inline_664$$ = $goog$style$getBorderBox$$($borderBox$$inline_667_textarea$$inline_664$$), $height$$inline_665_paddingBox$$3_paddingScrollHeight$$inline_661$$ -= $borderBox$$inline_667_textarea$$inline_664$$.top + $borderBox$$inline_667_textarea$$inline_664$$.bottom);
  $JSCompiler_temp_const$$15_height$$21_initialScrollHeight$$inline_660$$ += 0 < $height$$inline_665_paddingBox$$3_paddingScrollHeight$$inline_661$$ ? $height$$inline_665_paddingBox$$3_paddingScrollHeight$$inline_661$$ : 0;
  $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$needsPaddingBorderFix_$ ? $JSCompiler_temp_const$$15_height$$21_initialScrollHeight$$inline_660$$ -= $JSCompiler_StaticMethods_getPaddingBorderBoxHeight_$$($JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$) : ($JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$scrollHeightIncludesPadding_$ || ($height$$inline_665_paddingBox$$3_paddingScrollHeight$$inline_661$$ = $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$paddingBox_$, 
  $JSCompiler_temp_const$$15_height$$21_initialScrollHeight$$inline_660$$ += $height$$inline_665_paddingBox$$3_paddingScrollHeight$$inline_661$$.top + $height$$inline_665_paddingBox$$3_paddingScrollHeight$$inline_661$$.bottom), $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.$scrollHeightIncludesBorder_$ || ($JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$ = $goog$style$getBorderBox$$($textarea$$7_textarea$$inline_659$$), $JSCompiler_temp_const$$15_height$$21_initialScrollHeight$$inline_660$$ += 
  $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.top + $JSCompiler_StaticMethods_getHeight_$self_borderBox$$3$$.bottom));
  return $JSCompiler_temp_const$$15_height$$21_initialScrollHeight$$inline_660$$
}
function $JSCompiler_StaticMethods_setHeight_$$($JSCompiler_StaticMethods_setHeight_$self$$, $height$$22$$) {
  $JSCompiler_StaticMethods_setHeight_$self$$.$height_$ != $height$$22$$ && ($JSCompiler_StaticMethods_setHeight_$self$$.$height_$ = $height$$22$$, $JSCompiler_StaticMethods_setHeight_$self$$.$getElement$().style.height = $height$$22$$ + "px")
}
function $JSCompiler_StaticMethods_setHeightToEstimate_$$($JSCompiler_StaticMethods_setHeightToEstimate_$self_textarea$$8$$) {
  $JSCompiler_StaticMethods_setHeightToEstimate_$self_textarea$$8$$ = $JSCompiler_StaticMethods_setHeightToEstimate_$self_textarea$$8$$.$getElement$();
  $JSCompiler_StaticMethods_setHeightToEstimate_$self_textarea$$8$$.style.height = "auto";
  var $newlines$$ = $JSCompiler_StaticMethods_setHeightToEstimate_$self_textarea$$8$$.value.match(/\n/g) || [];
  $JSCompiler_StaticMethods_setHeightToEstimate_$self_textarea$$8$$.rows = $newlines$$.length + 1
}
$JSCompiler_prototypeAlias$$.$grow_$ = function $$JSCompiler_prototypeAlias$$$$grow_$$() {
  if(!this.$isResizing_$) {
    var $shouldCallShrink_textarea$$inline_673$$ = $JSCompiler_alias_FALSE$$;
    this.$isResizing_$ = $JSCompiler_alias_TRUE$$;
    var $isEmpty$$inline_674_textarea$$11$$ = this.$getElement$(), $oldHeight$$ = this.$height_$;
    if($isEmpty$$inline_674_textarea$$11$$.scrollHeight) {
      var $minHeight$$inline_677_setMinHeight$$ = $JSCompiler_alias_FALSE$$, $scrollHeight$$inline_675_setMaxHeight_shrinkToHeight$$inline_680$$ = $JSCompiler_alias_FALSE$$, $currentHeight$$inline_676_newHeight$$ = $JSCompiler_StaticMethods_getHeight_$$(this), $currentHeight_maxHeight$$inline_678_paddingBox$$inline_679$$ = $isEmpty$$inline_674_textarea$$11$$.offsetHeight, $minHeight$$1$$ = $JSCompiler_StaticMethods_getMinHeight_$$(this), $maxHeight$$1$$ = $JSCompiler_StaticMethods_getMaxHeight_$$(this);
      $minHeight$$1$$ && $currentHeight$$inline_676_newHeight$$ < $minHeight$$1$$ ? ($JSCompiler_StaticMethods_setHeight_$$(this, $minHeight$$1$$), $minHeight$$inline_677_setMinHeight$$ = $JSCompiler_alias_TRUE$$) : $maxHeight$$1$$ && $currentHeight$$inline_676_newHeight$$ > $maxHeight$$1$$ ? ($JSCompiler_StaticMethods_setHeight_$$(this, $maxHeight$$1$$), $isEmpty$$inline_674_textarea$$11$$.style.overflowY = "", $scrollHeight$$inline_675_setMaxHeight_shrinkToHeight$$inline_680$$ = $JSCompiler_alias_TRUE$$) : 
      $currentHeight_maxHeight$$inline_678_paddingBox$$inline_679$$ != $currentHeight$$inline_676_newHeight$$ ? $JSCompiler_StaticMethods_setHeight_$$(this, $currentHeight$$inline_676_newHeight$$) : this.$height_$ || (this.$height_$ = $currentHeight$$inline_676_newHeight$$);
      !$minHeight$$inline_677_setMinHeight$$ && (!$scrollHeight$$inline_675_setMaxHeight_shrinkToHeight$$inline_680$$ && $goog$ui$Textarea$NEEDS_HELP_SHRINKING_$$) && ($shouldCallShrink_textarea$$inline_673$$ = $JSCompiler_alias_TRUE$$)
    }else {
      $JSCompiler_StaticMethods_setHeightToEstimate_$$(this)
    }
    this.$isResizing_$ = $JSCompiler_alias_FALSE$$;
    $shouldCallShrink_textarea$$inline_673$$ && ($shouldCallShrink_textarea$$inline_673$$ = this.$getElement$(), this.$isResizing_$ || (this.$isResizing_$ = $JSCompiler_alias_TRUE$$, $isEmpty$$inline_674_textarea$$11$$ = $JSCompiler_alias_FALSE$$, $shouldCallShrink_textarea$$inline_673$$.value || ($shouldCallShrink_textarea$$inline_673$$.value = " ", $isEmpty$$inline_674_textarea$$11$$ = $JSCompiler_alias_TRUE$$), ($scrollHeight$$inline_675_setMaxHeight_shrinkToHeight$$inline_680$$ = $shouldCallShrink_textarea$$inline_673$$.scrollHeight) ? 
    ($currentHeight$$inline_676_newHeight$$ = $JSCompiler_StaticMethods_getHeight_$$(this), $minHeight$$inline_677_setMinHeight$$ = $JSCompiler_StaticMethods_getMinHeight_$$(this), $currentHeight_maxHeight$$inline_678_paddingBox$$inline_679$$ = $JSCompiler_StaticMethods_getMaxHeight_$$(this), !($minHeight$$inline_677_setMinHeight$$ && $currentHeight$$inline_676_newHeight$$ <= $minHeight$$inline_677_setMinHeight$$) && !($currentHeight_maxHeight$$inline_678_paddingBox$$inline_679$$ && $currentHeight$$inline_676_newHeight$$ >= 
    $currentHeight_maxHeight$$inline_678_paddingBox$$inline_679$$) && ($currentHeight_maxHeight$$inline_678_paddingBox$$inline_679$$ = this.$paddingBox_$, $shouldCallShrink_textarea$$inline_673$$.style.paddingBottom = $currentHeight_maxHeight$$inline_678_paddingBox$$inline_679$$.bottom + 1 + "px", $JSCompiler_StaticMethods_getHeight_$$(this) == $currentHeight$$inline_676_newHeight$$ && ($shouldCallShrink_textarea$$inline_673$$.style.paddingBottom = $currentHeight_maxHeight$$inline_678_paddingBox$$inline_679$$.bottom + 
    $scrollHeight$$inline_675_setMaxHeight_shrinkToHeight$$inline_680$$ + "px", $shouldCallShrink_textarea$$inline_673$$.scrollTop = 0, $scrollHeight$$inline_675_setMaxHeight_shrinkToHeight$$inline_680$$ = $JSCompiler_StaticMethods_getHeight_$$(this) - $scrollHeight$$inline_675_setMaxHeight_shrinkToHeight$$inline_680$$, $scrollHeight$$inline_675_setMaxHeight_shrinkToHeight$$inline_680$$ >= $minHeight$$inline_677_setMinHeight$$ ? $JSCompiler_StaticMethods_setHeight_$$(this, $scrollHeight$$inline_675_setMaxHeight_shrinkToHeight$$inline_680$$) : 
    $JSCompiler_StaticMethods_setHeight_$$(this, $minHeight$$inline_677_setMinHeight$$)), $shouldCallShrink_textarea$$inline_673$$.style.paddingBottom = $currentHeight_maxHeight$$inline_678_paddingBox$$inline_679$$.bottom + "px")) : $JSCompiler_StaticMethods_setHeightToEstimate_$$(this), $isEmpty$$inline_674_textarea$$11$$ && ($shouldCallShrink_textarea$$inline_673$$.value = ""), this.$isResizing_$ = $JSCompiler_alias_FALSE$$));
    $oldHeight$$ != this.$height_$ && this.dispatchEvent("resize")
  }
};
$JSCompiler_prototypeAlias$$.$mouseUpListener_$ = function $$JSCompiler_prototypeAlias$$$$mouseUpListener_$$() {
  var $dropShadow_textarea$$13$$ = this.$getElement$(), $height$$24$$ = $dropShadow_textarea$$13$$.offsetHeight;
  $dropShadow_textarea$$13$$.filters && $dropShadow_textarea$$13$$.filters.length && ($dropShadow_textarea$$13$$ = $dropShadow_textarea$$13$$.filters.item("DXImageTransform.Microsoft.DropShadow")) && ($height$$24$$ -= $dropShadow_textarea$$13$$.offX);
  $height$$24$$ != this.$height_$ && (this.$height_$ = this.$minHeight_$ = $height$$24$$)
};
$goog$userAgent$IE$$ && $goog$userAgent$isVersion$$(8);
function $soy$$0$0escapeHtml$$($value$$80$$) {
  return"object" === typeof $value$$80$$ && $value$$80$$ && 0 === $value$$80$$.$contentKind$ ? $value$$80$$.content : String($value$$80$$).replace($soy$esc$$0$0MATCHER_FOR_ESCAPE_HTML_$$, $soy$esc$$0$0REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$)
}
var $soy$esc$$0$0ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$ = {"\x00":"&#0;", '"':"&quot;", "&":"&amp;", "'":"&#39;", "<":"&lt;", ">":"&gt;", "\t":"&#9;", "\n":"&#10;", "\x0B":"&#11;", "\f":"&#12;", "\r":"&#13;", " ":"&#32;", "-":"&#45;", "/":"&#47;", "=":"&#61;", "`":"&#96;", "\u0085":"&#133;", "\u00a0":"&#160;", "\u2028":"&#8232;", "\u2029":"&#8233;"};
function $soy$esc$$0$0REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$($ch$$7$$) {
  return $soy$esc$$0$0ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_$$[$ch$$7$$]
}
var $soy$esc$$0$0MATCHER_FOR_ESCAPE_HTML_$$ = /[\x00\x22\x26\x27\x3c\x3e]/g;
function $annotorious$templates$popup$$() {
  return'<div class="annotorious-popup top-left" style="position:absolute;z-index:1"><div class="annotorious-popup-buttons"><a class="annotorious-popup-button annotorious-popup-button-edit" title="Edit" href="javascript:void(0);">EDIT</a><a class="annotorious-popup-button annotorious-popup-button-delete" title="Delete" href="javascript:void(0);">DELETE</a></div><span class="annotorious-popup-text"></span></div>'
}
function $annotorious$templates$editform$$() {
  return'<div class="annotorious-editor" style="position:absolute;z-index:1"><form><textarea class="annotorious-editor-text" placeholder="Add a Comment..." tabindex="1"></textarea><div class="annotorious-editor-button-container"><a class="annotorious-editor-button annotorious-editor-button-cancel" href="javascript:void(0);" tabindex="3">Cancel</a><a class="annotorious-editor-button annotorious-editor-button-save" href="javascript:void(0);" tabindex="2">Save</a></div></form></div>'
}
;function $annotorious$Editor$$($annotator$$25$$) {
  function $opt_callback$$inline_691$$() {
    var $JSCompiler_StaticMethods_resize$self$$inline_688$$ = $self$$5$$.$_textarea$;
    $JSCompiler_StaticMethods_resize$self$$inline_688$$.$getElement$() && $JSCompiler_StaticMethods_resize$self$$inline_688$$.$grow_$()
  }
  this.element = $goog$soy$renderAsElement$$($annotorious$templates$editform$$);
  this.$_annotator$ = $annotator$$25$$;
  this.$_item$ = $annotator$$25$$.getItem();
  this.$_textarea$ = new $goog$ui$Textarea$$("");
  this.$_btnCancel$ = $query$$inline_159$$(".annotorious-editor-button-cancel", this.element)[0];
  this.$_btnSave$ = $query$$inline_159$$(".annotorious-editor-button-save", this.element)[0];
  var $JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$;
  $JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$ = this.$_btnSave$;
  $goog$dom$BrowserFeature$CAN_USE_PARENT_ELEMENT_PROPERTY$$ ? $JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$ = $JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$.parentElement : ($JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$ = $JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$.parentNode, 
  $JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$ = $goog$dom$isElement$$($JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$) ? $JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$ : $JSCompiler_alias_NULL$$);
  this.$_btnContainer$ = $JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$;
  this.$_extraFields$ = [];
  var $self$$5$$ = this;
  $goog$events$listen$$(this.$_btnCancel$, "click", function($event$$4$$) {
    $event$$4$$.preventDefault();
    $annotator$$25$$.stopSelection($self$$5$$.$_original_annotation$);
    $self$$5$$.close()
  });
  $goog$events$listen$$(this.$_btnSave$, "click", function($annotation$$8_event$$5$$) {
    $annotation$$8_event$$5$$.preventDefault();
    $annotation$$8_event$$5$$ = $self$$5$$.$getAnnotation$();
    $annotator$$25$$.$addAnnotation$($annotation$$8_event$$5$$);
    $annotator$$25$$.stopSelection();
    $self$$5$$.$_original_annotation$ ? $annotator$$25$$.fireEvent("onAnnotationUpdated", $annotation$$8_event$$5$$, $annotator$$25$$.getItem()) : $annotator$$25$$.fireEvent("onAnnotationCreated", $annotation$$8_event$$5$$, $annotator$$25$$.getItem());
    $self$$5$$.close()
  });
  $goog$style$showElement$$(this.element, $JSCompiler_alias_FALSE$$);
  $annotator$$25$$.element.appendChild(this.element);
  this.$_textarea$.$decorate$($query$$inline_159$$(".annotorious-editor-text", this.element)[0]);
  var $div$$inline_690$$ = this.element;
  $JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$ = document.createElement("div");
  $goog$style$setStyle$$($JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$, "position", "absolute");
  $goog$style$setStyle$$($JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$, "top", "0px");
  $goog$style$setStyle$$($JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$, "right", "0px");
  $goog$style$setStyle$$($JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$, "width", "5px");
  $goog$style$setStyle$$($JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$, "height", "100%");
  $goog$style$setStyle$$($JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$, "cursor", "e-resize");
  $div$$inline_690$$.appendChild($JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$);
  var $div_border$$inline_693_width_limit$$inline_694$$ = $goog$style$getBorderBox$$($div$$inline_690$$), $div_border$$inline_693_width_limit$$inline_694$$ = $goog$style$getBounds$$($div$$inline_690$$).width - $div_border$$inline_693_width_limit$$inline_694$$.right - $div_border$$inline_693_width_limit$$inline_694$$.left;
  $JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$ = new $goog$fx$Dragger$$($JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$);
  $JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$.$limits$ = new $goog$math$Rect$$($div_border$$inline_693_width_limit$$inline_694$$, 0, 800, 0) || new $goog$math$Rect$$(NaN, NaN, NaN, NaN);
  $JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$.$defaultAction$ = function $$JSCompiler_inline_result$$34_dragger$$inline_695_element$$inline_682_handle$$inline_692_parent$$inline_683$$$$defaultAction$$($x$$inline_696$$) {
    $goog$style$setStyle$$($div$$inline_690$$, "width", $x$$inline_696$$ + "px");
    $opt_callback$$inline_691$$ && $opt_callback$$inline_691$$()
  }
}
$JSCompiler_prototypeAlias$$ = $annotorious$Editor$$.prototype;
$JSCompiler_prototypeAlias$$.$addField$ = function $$JSCompiler_prototypeAlias$$$$addField$$($field_refNode$$inline_702$$) {
  var $fieldEl$$ = $goog$dom$createDom$$("div", "annotorious-editor-field");
  $goog$isString$$($field_refNode$$inline_702$$) ? $fieldEl$$.innerHTML = $field_refNode$$inline_702$$ : $goog$isFunction$$($field_refNode$$inline_702$$) ? this.$_extraFields$.push({$el$:$fieldEl$$, $fn$:$field_refNode$$inline_702$$}) : $goog$dom$isElement$$($field_refNode$$inline_702$$) && $fieldEl$$.appendChild($field_refNode$$inline_702$$);
  $field_refNode$$inline_702$$ = this.$_btnContainer$;
  $field_refNode$$inline_702$$.parentNode && $field_refNode$$inline_702$$.parentNode.insertBefore($fieldEl$$, $field_refNode$$inline_702$$)
};
$JSCompiler_prototypeAlias$$.open = function $$JSCompiler_prototypeAlias$$$open$($opt_annotation$$) {
  (this.$_current_annotation$ = this.$_original_annotation$ = $opt_annotation$$) && this.$_textarea$.$setContent$(String($opt_annotation$$.text));
  $goog$style$showElement$$(this.element, $JSCompiler_alias_TRUE$$);
  this.$_textarea$.$getElement$().focus();
  $goog$array$forEach$$(this.$_extraFields$, function($field$$1$$) {
    var $f$$45$$ = $field$$1$$.$fn$($opt_annotation$$);
    $goog$isString$$($f$$45$$) ? $field$$1$$.$el$.innerHTML = $f$$45$$ : $goog$dom$isElement$$($f$$45$$) && ($goog$dom$removeChildren$$($field$$1$$.$el$), $field$$1$$.$el$.appendChild($f$$45$$))
  });
  this.$_annotator$.fireEvent("onEditorShown", $opt_annotation$$)
};
$JSCompiler_prototypeAlias$$.close = function $$JSCompiler_prototypeAlias$$$close$() {
  $goog$style$showElement$$(this.element, $JSCompiler_alias_FALSE$$);
  this.$_textarea$.$setContent$("")
};
$JSCompiler_prototypeAlias$$.setPosition = function $$JSCompiler_prototypeAlias$$$setPosition$($xy$$) {
  $goog$style$setPosition$$(this.element, $xy$$.x, $xy$$.y)
};
$JSCompiler_prototypeAlias$$.$getAnnotation$ = function $$JSCompiler_prototypeAlias$$$$getAnnotation$$() {
  var $htmlText$$inline_713_sanitized$$;
  $htmlText$$inline_713_sanitized$$ = this.$_textarea$.$getElement$().value;
  var $stringBuffer$$inline_716$$ = new $goog$string$StringBuffer$$;
  (new $goog$string$html$HtmlParser$$).parse(new $goog$string$html$HtmlSanitizer$$($stringBuffer$$inline_716$$, function($url$$22$$) {
    return $url$$22$$
  }, $JSCompiler_alias_VOID$$), $htmlText$$inline_713_sanitized$$);
  $htmlText$$inline_713_sanitized$$ = $stringBuffer$$inline_716$$.toString();
  this.$_current_annotation$ ? this.$_current_annotation$.text = $htmlText$$inline_713_sanitized$$ : this.$_current_annotation$ = new $annotorious$Annotation$$(this.$_item$.src, $htmlText$$inline_713_sanitized$$, this.$_annotator$.$getActiveSelector$().getShape());
  return this.$_current_annotation$
};
$annotorious$Editor$$.prototype.addField = $annotorious$Editor$$.prototype.$addField$;
$annotorious$Editor$$.prototype.getAnnotation = $annotorious$Editor$$.prototype.$getAnnotation$;
function $annotorious$Hint$$($annotator$$26$$, $parent$$24$$, $opt_msg$$1$$) {
  var $self$$6$$ = this;
  $opt_msg$$1$$ || ($opt_msg$$1$$ = "Click and Drag to Annotate");
  this.element = $goog$soy$renderAsElement$$($annotorious$templates$image$hint$$, {$msg$:$opt_msg$$1$$});
  this.$_annotator$ = $annotator$$26$$;
  this.$_message$ = $query$$inline_159$$(".annotorious-hint-msg", this.element)[0];
  this.$_icon$ = $query$$inline_159$$(".annotorious-hint-icon", this.element)[0];
  this.$_overItemHandler$ = function $this$$_overItemHandler$$() {
    $self$$6$$.show()
  };
  this.$_outOfItemHandler$ = function $this$$_outOfItemHandler$$() {
    $JSCompiler_StaticMethods_hide$$($self$$6$$)
  };
  this.$_attachListeners$();
  $JSCompiler_StaticMethods_hide$$(this);
  $parent$$24$$.appendChild(this.element)
}
$annotorious$Hint$$.prototype.$_attachListeners$ = function $$annotorious$Hint$$$$$_attachListeners$$() {
  var $self$$7$$ = this;
  this.$_mouseOverListener$ = $goog$events$listen$$(this.$_icon$, "mouseover", function() {
    $self$$7$$.show();
    window.clearTimeout($self$$7$$.$_hideTimer$)
  });
  this.$_mouseOutListener$ = $goog$events$listen$$(this.$_icon$, "mouseout", function() {
    $JSCompiler_StaticMethods_hide$$($self$$7$$)
  });
  this.$_annotator$.addHandler("onMouseOverItem", this.$_overItemHandler$);
  this.$_annotator$.addHandler("onMouseOutOfItem", this.$_outOfItemHandler$)
};
$annotorious$Hint$$.prototype.$_detachListeners$ = function $$annotorious$Hint$$$$$_detachListeners$$() {
  $goog$events$unlistenByKey$$(this.$_mouseOverListener$);
  $goog$events$unlistenByKey$$(this.$_mouseOutListener$);
  this.$_annotator$.$removeHandler$("onMouseOverItem", this.$_overItemHandler$);
  this.$_annotator$.$removeHandler$("onMouseOutOfItem", this.$_outOfItemHandler$)
};
$annotorious$Hint$$.prototype.show = function $$annotorious$Hint$$$$show$() {
  window.clearTimeout(this.$_hideTimer$);
  $goog$style$setOpacity$$(this.$_message$, 0.8);
  var $self$$8$$ = this;
  this.$_hideTimer$ = window.setTimeout(function() {
    $JSCompiler_StaticMethods_hide$$($self$$8$$)
  }, 3E3)
};
function $JSCompiler_StaticMethods_hide$$($JSCompiler_StaticMethods_hide$self$$) {
  window.clearTimeout($JSCompiler_StaticMethods_hide$self$$.$_hideTimer$);
  $goog$style$setOpacity$$($JSCompiler_StaticMethods_hide$self$$.$_message$, 0)
}
$annotorious$Hint$$.prototype.destroy = function $$annotorious$Hint$$$$destroy$() {
  this.$_detachListeners$();
  delete this.$_mouseOverListener$;
  delete this.$_mouseOutListener$;
  delete this.$_overItemHandler$;
  delete this.$_outOfItemHandler$;
  $goog$dom$removeNode$$(this.element)
};
function $annotorious$Popup$$($annotator$$27$$) {
  this.element = $goog$soy$renderAsElement$$($annotorious$templates$popup$$);
  this.$_annotator$ = $annotator$$27$$;
  this.$_text$ = $query$$inline_159$$(".annotorious-popup-text", this.element)[0];
  this.$_buttons$ = $query$$inline_159$$(".annotorious-popup-buttons", this.element)[0];
  this.$_cancelHide$ = $JSCompiler_alias_FALSE$$;
  this.$_extraFields$ = [];
  var $btnEdit$$ = $query$$inline_159$$(".annotorious-popup-button-edit", this.$_buttons$)[0], $btnDelete$$ = $query$$inline_159$$(".annotorious-popup-button-delete", this.$_buttons$)[0], $self$$9$$ = this;
  $goog$events$listen$$($btnEdit$$, "mouseover", function() {
    $goog$dom$classes$add$$($btnEdit$$, "annotorious-popup-button-active")
  });
  $goog$events$listen$$($btnEdit$$, "mouseout", function() {
    $goog$dom$classes$remove$$($btnEdit$$, "annotorious-popup-button-active")
  });
  $goog$events$listen$$($btnEdit$$, "click", function() {
    $goog$style$setOpacity$$($self$$9$$.element, 0);
    $goog$style$setStyle$$($self$$9$$.element, "pointer-events", "none");
    $annotator$$27$$.$editAnnotation$($self$$9$$.$_currentAnnotation$)
  });
  $goog$events$listen$$($btnDelete$$, "mouseover", function() {
    $goog$dom$classes$add$$($btnDelete$$, "annotorious-popup-button-active")
  });
  $goog$events$listen$$($btnDelete$$, "mouseout", function() {
    $goog$dom$classes$remove$$($btnDelete$$, "annotorious-popup-button-active")
  });
  $goog$events$listen$$($btnDelete$$, "click", function() {
    $annotator$$27$$.fireEvent("beforeAnnotationRemoved", $self$$9$$.$_currentAnnotation$) || ($goog$style$setOpacity$$($self$$9$$.element, 0), $goog$style$setStyle$$($self$$9$$.element, "pointer-events", "none"), $annotator$$27$$.$removeAnnotation$($self$$9$$.$_currentAnnotation$), $annotator$$27$$.fireEvent("onAnnotationRemoved", $self$$9$$.$_currentAnnotation$))
  });
  $annotorious$events$ui$hasMouse$$ && ($goog$events$listen$$(this.element, "mouseover", function() {
    window.clearTimeout($self$$9$$.$_buttonHideTimer$);
    0.9 > ($self$$9$$.$_buttons$.style[$goog$string$toCamelCase$$("opacity")] || "") && $goog$style$setOpacity$$($self$$9$$.$_buttons$, 0.9);
    $self$$9$$.clearHideTimer()
  }), $goog$events$listen$$(this.element, "mouseout", function() {
    $goog$style$setOpacity$$($self$$9$$.$_buttons$, 0);
    $self$$9$$.startHideTimer()
  }), $annotator$$27$$.addHandler("onMouseOutOfItem", function() {
    $self$$9$$.startHideTimer()
  }));
  $goog$style$setOpacity$$(this.$_buttons$, 0);
  $goog$style$setOpacity$$(this.element, 0);
  $goog$style$setStyle$$(this.element, "pointer-events", "none");
  $annotator$$27$$.element.appendChild(this.element)
}
$JSCompiler_prototypeAlias$$ = $annotorious$Popup$$.prototype;
$JSCompiler_prototypeAlias$$.$addField$ = function $$JSCompiler_prototypeAlias$$$$addField$$($field$$2$$) {
  var $fieldEl$$1$$ = $goog$dom$createDom$$("div", "annotorious-popup-field");
  $goog$isString$$($field$$2$$) ? $fieldEl$$1$$.innerHTML = $field$$2$$ : $goog$isFunction$$($field$$2$$) ? this.$_extraFields$.push({$el$:$fieldEl$$1$$, $fn$:$field$$2$$}) : $goog$dom$isElement$$($field$$2$$) && $fieldEl$$1$$.appendChild($field$$2$$);
  this.element.appendChild($fieldEl$$1$$)
};
$JSCompiler_prototypeAlias$$.startHideTimer = function $$JSCompiler_prototypeAlias$$$startHideTimer$() {
  this.$_cancelHide$ = $JSCompiler_alias_FALSE$$;
  if(!this.$_popupHideTimer$) {
    var $self$$10$$ = this;
    this.$_popupHideTimer$ = window.setTimeout(function() {
      $self$$10$$.$_annotator$.fireEvent("beforePopupHide", $self$$10$$);
      $self$$10$$.$_cancelHide$ || ($goog$style$setOpacity$$($self$$10$$.element, 0), $goog$style$setStyle$$($self$$10$$.element, "pointer-events", "none"), $goog$style$setOpacity$$($self$$10$$.$_buttons$, 0.9), delete $self$$10$$.$_popupHideTimer$)
    }, 150)
  }
};
$JSCompiler_prototypeAlias$$.clearHideTimer = function $$JSCompiler_prototypeAlias$$$clearHideTimer$() {
  this.$_cancelHide$ = $JSCompiler_alias_TRUE$$;
  this.$_popupHideTimer$ && (window.clearTimeout(this.$_popupHideTimer$), delete this.$_popupHideTimer$)
};
$JSCompiler_prototypeAlias$$.show = function $$JSCompiler_prototypeAlias$$$show$($annotation$$9$$, $xy$$1$$) {
  this.clearHideTimer();
  $xy$$1$$ && this.setPosition($xy$$1$$);
  $annotation$$9$$ && this.setAnnotation($annotation$$9$$);
  this.$_buttonHideTimer$ && window.clearTimeout(this.$_buttonHideTimer$);
  $goog$style$setOpacity$$(this.$_buttons$, 0.9);
  if($annotorious$events$ui$hasMouse$$) {
    var $self$$11$$ = this;
    this.$_buttonHideTimer$ = window.setTimeout(function() {
      $goog$style$setOpacity$$($self$$11$$.$_buttons$, 0)
    }, 1E3)
  }
  $goog$style$setOpacity$$(this.element, 0.9);
  $goog$style$setStyle$$(this.element, "pointer-events", "auto");
  this.$_annotator$.fireEvent("onPopupShown", this.$_currentAnnotation$)
};
$JSCompiler_prototypeAlias$$.setPosition = function $$JSCompiler_prototypeAlias$$$setPosition$($xy$$2$$) {
  $goog$style$setPosition$$(this.element, new $goog$math$Coordinate$$($xy$$2$$.x, $xy$$2$$.y))
};
$JSCompiler_prototypeAlias$$.setAnnotation = function $$JSCompiler_prototypeAlias$$$setAnnotation$($annotation$$10$$) {
  this.$_currentAnnotation$ = $annotation$$10$$;
  this.$_text$.innerHTML = $annotation$$10$$.text ? $annotation$$10$$.text.replace(/\n/g, "<br/>") : '<span class="annotorious-popup-empty">No comment</span>';
  "editable" in $annotation$$10$$ && $annotation$$10$$.editable == $JSCompiler_alias_FALSE$$ ? $goog$style$showElement$$(this.$_buttons$, $JSCompiler_alias_FALSE$$) : $goog$style$showElement$$(this.$_buttons$, $JSCompiler_alias_TRUE$$);
  $goog$array$forEach$$(this.$_extraFields$, function($field$$3$$) {
    var $f$$46$$ = $field$$3$$.$fn$($annotation$$10$$);
    $goog$isString$$($f$$46$$) ? $field$$3$$.$el$.innerHTML = $f$$46$$ : $goog$dom$isElement$$($f$$46$$) && ($goog$dom$removeChildren$$($field$$3$$.$el$), $field$$3$$.$el$.appendChild($f$$46$$))
  })
};
$annotorious$Popup$$.prototype.addField = $annotorious$Popup$$.prototype.$addField$;
function $annotorious$mediatypes$Annotator$$() {
}
$JSCompiler_prototypeAlias$$ = $annotorious$mediatypes$Annotator$$.prototype;
$JSCompiler_prototypeAlias$$.$addAnnotation$ = function $$JSCompiler_prototypeAlias$$$$addAnnotation$$($annotation$$11$$, $opt_replace$$2$$) {
  this.$_viewer$.$addAnnotation$($annotation$$11$$, $opt_replace$$2$$)
};
$JSCompiler_prototypeAlias$$.addHandler = function $$JSCompiler_prototypeAlias$$$addHandler$($type$$84$$, $handler$$12$$) {
  this.$_eventBroker$.addHandler($type$$84$$, $handler$$12$$)
};
$JSCompiler_prototypeAlias$$.fireEvent = function $$JSCompiler_prototypeAlias$$$fireEvent$($type$$85$$, $event$$15$$, $opt_extra$$1$$) {
  return this.$_eventBroker$.fireEvent($type$$85$$, $event$$15$$, $opt_extra$$1$$)
};
$JSCompiler_prototypeAlias$$.$getActiveSelector$ = $JSCompiler_get$$("$_currentSelector$");
$JSCompiler_prototypeAlias$$.$highlightAnnotation$ = function $$JSCompiler_prototypeAlias$$$$highlightAnnotation$$($annotation$$12$$) {
  this.$_viewer$.$highlightAnnotation$($annotation$$12$$)
};
$JSCompiler_prototypeAlias$$.$removeAnnotation$ = function $$JSCompiler_prototypeAlias$$$$removeAnnotation$$($annotation$$13$$) {
  this.$_viewer$.$removeAnnotation$($annotation$$13$$)
};
$JSCompiler_prototypeAlias$$.$removeHandler$ = function $$JSCompiler_prototypeAlias$$$$removeHandler$$($type$$86$$, $handler$$13$$) {
  this.$_eventBroker$.$removeHandler$($type$$86$$, $handler$$13$$)
};
$JSCompiler_prototypeAlias$$.stopSelection = function $$JSCompiler_prototypeAlias$$$stopSelection$($original_annotation$$) {
  $annotorious$events$ui$hasMouse$$ && $goog$style$showElement$$(this.$_editCanvas$, $JSCompiler_alias_FALSE$$);
  this.$_stop_selection_callback$ && (this.$_stop_selection_callback$(), delete this.$_stop_selection_callback$);
  this.$_currentSelector$.stopSelection();
  $original_annotation$$ && this.$_viewer$.$addAnnotation$($original_annotation$$)
};
function $JSCompiler_StaticMethods__attachListener$$($JSCompiler_StaticMethods__attachListener$self$$, $activeCanvas$$) {
  $goog$events$listen$$($activeCanvas$$, $annotorious$events$ui$EventType$DOWN$$, function($annotations$$1_coords_event$$16$$) {
    console.log("start selection event");
    console.log($annotations$$1_coords_event$$16$$);
    $annotations$$1_coords_event$$16$$ = $annotorious$events$ui$sanitizeCoordinates$$($annotations$$1_coords_event$$16$$, $activeCanvas$$);
    $JSCompiler_StaticMethods__attachListener$self$$.$_viewer$.$highlightAnnotation$($JSCompiler_alias_FALSE$$);
    $JSCompiler_StaticMethods__attachListener$self$$.$_selectionEnabled$ ? ($goog$style$showElement$$($JSCompiler_StaticMethods__attachListener$self$$.$_editCanvas$, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods__attachListener$self$$.$_currentSelector$.startSelection($annotations$$1_coords_event$$16$$.x, $annotations$$1_coords_event$$16$$.y)) : ($annotations$$1_coords_event$$16$$ = $JSCompiler_StaticMethods__attachListener$self$$.$_viewer$.$getAnnotationsAt$($annotations$$1_coords_event$$16$$.x, 
    $annotations$$1_coords_event$$16$$.y), 0 < $annotations$$1_coords_event$$16$$.length && $JSCompiler_StaticMethods__attachListener$self$$.$_viewer$.$highlightAnnotation$($annotations$$1_coords_event$$16$$[0]))
  })
}
;function $annotorious$mediatypes$image$Viewer$$($canvas$$, $annotator$$28$$) {
  this.$_canvas$ = $canvas$$;
  this.$_annotator$ = $annotator$$28$$;
  this.$_annotations$ = [];
  this.$_shapes$ = [];
  this.$_g2d$ = this.$_canvas$.getContext("2d");
  this.$_eventsEnabled$ = $JSCompiler_alias_TRUE$$;
  this.$_keepHighlighted$ = $JSCompiler_alias_FALSE$$;
  var $self$$13$$ = this;
  $goog$events$listen$$(this.$_canvas$, $annotorious$events$ui$EventType$MOVE$$, function($event$$17$$) {
    if($self$$13$$.$_eventsEnabled$) {
      var $topAnnotation$$inline_735$$ = $JSCompiler_StaticMethods_topAnnotationAt$$($self$$13$$, $event$$17$$.offsetX, $event$$17$$.offsetY);
      $topAnnotation$$inline_735$$ ? ($self$$13$$.$_keepHighlighted$ = $self$$13$$.$_keepHighlighted$ && $topAnnotation$$inline_735$$ == $self$$13$$.$_currentAnnotation$, $self$$13$$.$_currentAnnotation$ ? $self$$13$$.$_currentAnnotation$ != $topAnnotation$$inline_735$$ && ($self$$13$$.$_eventsEnabled$ = $JSCompiler_alias_FALSE$$, $self$$13$$.$_annotator$.popup.startHideTimer()) : ($self$$13$$.$_currentAnnotation$ = $topAnnotation$$inline_735$$, $JSCompiler_StaticMethods_redraw$$($self$$13$$), $self$$13$$.$_annotator$.fireEvent("onMouseOverAnnotation", 
      {$annotation$:$self$$13$$.$_currentAnnotation$, mouseEvent:$event$$17$$}))) : !$self$$13$$.$_keepHighlighted$ && $self$$13$$.$_currentAnnotation$ && ($self$$13$$.$_eventsEnabled$ = $JSCompiler_alias_FALSE$$, $self$$13$$.$_annotator$.popup.startHideTimer())
    }else {
      $self$$13$$.$_cachedMouseEvent$ = $event$$17$$
    }
  });
  $goog$events$listen$$(this.$_canvas$, $annotorious$events$ui$EventType$DOWN$$, function() {
    $self$$13$$.$_currentAnnotation$ !== $JSCompiler_alias_VOID$$ && $self$$13$$.$_currentAnnotation$ != $JSCompiler_alias_FALSE$$ && $self$$13$$.$_annotator$.fireEvent("onAnnotationClicked", $self$$13$$.$_currentAnnotation$)
  });
  $annotator$$28$$.addHandler("onMouseOutOfItem", function() {
    delete $self$$13$$.$_currentAnnotation$;
    $self$$13$$.$_eventsEnabled$ = $JSCompiler_alias_TRUE$$
  });
  $annotator$$28$$.addHandler("beforePopupHide", function() {
    if(!$self$$13$$.$_eventsEnabled$ && $self$$13$$.$_cachedMouseEvent$) {
      var $previousAnnotation$$ = $self$$13$$.$_currentAnnotation$;
      $self$$13$$.$_currentAnnotation$ = $JSCompiler_StaticMethods_topAnnotationAt$$($self$$13$$, $self$$13$$.$_cachedMouseEvent$.offsetX, $self$$13$$.$_cachedMouseEvent$.offsetY);
      $self$$13$$.$_eventsEnabled$ = $JSCompiler_alias_TRUE$$;
      $previousAnnotation$$ != $self$$13$$.$_currentAnnotation$ ? ($JSCompiler_StaticMethods_redraw$$($self$$13$$), $self$$13$$.$_annotator$.fireEvent("onMouseOutOfAnnotation", {$annotation$:$previousAnnotation$$, mouseEvent:$self$$13$$.$_cachedMouseEvent$}), $self$$13$$.$_annotator$.fireEvent("onMouseOverAnnotation", {$annotation$:$self$$13$$.$_currentAnnotation$, mouseEvent:$self$$13$$.$_cachedMouseEvent$})) : $self$$13$$.$_currentAnnotation$ && $self$$13$$.$_annotator$.popup.clearHideTimer()
    }else {
      $JSCompiler_StaticMethods_redraw$$($self$$13$$)
    }
  })
}
$JSCompiler_prototypeAlias$$ = $annotorious$mediatypes$image$Viewer$$.prototype;
$JSCompiler_prototypeAlias$$.$addAnnotation$ = function $$JSCompiler_prototypeAlias$$$$addAnnotation$$($annotation$$14$$, $opt_replace$$3$$) {
  $opt_replace$$3$$ && ($opt_replace$$3$$ == this.$_currentAnnotation$ && delete this.$_currentAnnotation$, $goog$array$remove$$(this.$_annotations$, $opt_replace$$3$$), delete this.$_shapes$[$annotorious$shape$hashCode$$($opt_replace$$3$$.shapes[0])]);
  this.$_annotations$.push($annotation$$14$$);
  var $shape$$8_viewportShape$$ = $annotation$$14$$.shapes[0];
  if("pixel" != $shape$$8_viewportShape$$.units) {
    var $self$$14$$ = this, $shape$$8_viewportShape$$ = $annotorious$shape$transform$$($shape$$8_viewportShape$$, function($xy$$3$$) {
      return $self$$14$$.$_annotator$.$fromItemCoordinates$($xy$$3$$)
    })
  }
  this.$_shapes$[$annotorious$shape$hashCode$$($annotation$$14$$.shapes[0])] = $shape$$8_viewportShape$$;
  $JSCompiler_StaticMethods_redraw$$(this)
};
$JSCompiler_prototypeAlias$$.$removeAnnotation$ = function $$JSCompiler_prototypeAlias$$$$removeAnnotation$$($annotation$$15$$) {
  $annotation$$15$$ == this.$_currentAnnotation$ && delete this.$_currentAnnotation$;
  $goog$array$remove$$(this.$_annotations$, $annotation$$15$$);
  delete this.$_shapes$[$annotorious$shape$hashCode$$($annotation$$15$$.shapes[0])];
  $JSCompiler_StaticMethods_redraw$$(this)
};
$JSCompiler_prototypeAlias$$.$getAnnotations$ = function $$JSCompiler_prototypeAlias$$$$getAnnotations$$() {
  return $goog$array$toArray$$(this.$_annotations$)
};
$JSCompiler_prototypeAlias$$.$highlightAnnotation$ = function $$JSCompiler_prototypeAlias$$$$highlightAnnotation$$($opt_annotation$$1$$) {
  (this.$_currentAnnotation$ = $opt_annotation$$1$$) ? this.$_keepHighlighted$ = $JSCompiler_alias_TRUE$$ : this.$_annotator$.popup.startHideTimer();
  $JSCompiler_StaticMethods_redraw$$(this);
  this.$_eventsEnabled$ = $JSCompiler_alias_TRUE$$
};
function $JSCompiler_StaticMethods_topAnnotationAt$$($JSCompiler_StaticMethods_topAnnotationAt$self_annotations$$2$$, $px$$2$$, $py$$1$$) {
  $JSCompiler_StaticMethods_topAnnotationAt$self_annotations$$2$$ = $JSCompiler_StaticMethods_topAnnotationAt$self_annotations$$2$$.$getAnnotationsAt$($px$$2$$, $py$$1$$);
  if(0 < $JSCompiler_StaticMethods_topAnnotationAt$self_annotations$$2$$.length) {
    return $JSCompiler_StaticMethods_topAnnotationAt$self_annotations$$2$$[0]
  }
}
$JSCompiler_prototypeAlias$$.$getAnnotationsAt$ = function $$JSCompiler_prototypeAlias$$$$getAnnotationsAt$$($px$$3$$, $py$$2$$) {
  var $intersectedAnnotations$$ = [], $self$$15$$ = this;
  $goog$array$forEach$$(this.$_annotations$, function($annotation$$16$$) {
    var $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$;
    $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$ = $self$$15$$.$_shapes$[$annotorious$shape$hashCode$$($annotation$$16$$.shapes[0])];
    if("rect" == $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$.type) {
      $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$ = $px$$3$$ < $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$.geometry.x || $py$$2$$ < $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$.geometry.y || $px$$3$$ > $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$.geometry.x + $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$.geometry.width || $py$$2$$ > $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$.geometry.y + 
      $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$.geometry.height ? $JSCompiler_alias_FALSE$$ : $JSCompiler_alias_TRUE$$
    }else {
      if("polygon" == $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$.type) {
        $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$ = $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$.geometry.points;
        for(var $inside$$inline_741$$ = $JSCompiler_alias_FALSE$$, $j$$inline_742$$ = $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$.length - 1, $i$$inline_743$$ = 0;$i$$inline_743$$ < $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$.length;$i$$inline_743$$++) {
          $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$[$i$$inline_743$$].y > $py$$2$$ != $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$[$j$$inline_742$$].y > $py$$2$$ && $px$$3$$ < ($JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$[$j$$inline_742$$].x - $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$[$i$$inline_743$$].x) * ($py$$2$$ - $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$[$i$$inline_743$$].y) / 
          ($JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$[$j$$inline_742$$].y - $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$[$i$$inline_743$$].y) + $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$[$i$$inline_743$$].x && ($inside$$inline_741$$ = !$inside$$inline_741$$), $j$$inline_742$$ = $i$$inline_743$$
        }
        $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$ = $inside$$inline_741$$
      }else {
        $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$ = $JSCompiler_alias_FALSE$$
      }
    }
    $JSCompiler_inline_result$$50_points$$inline_740_shape$$inline_737$$ && $intersectedAnnotations$$.push($annotation$$16$$)
  });
  $goog$array$ARRAY_PROTOTYPE_$$.sort.call($intersectedAnnotations$$, function($a$$31$$, $b$$26$$) {
    var $shape_a$$ = $self$$15$$.$_shapes$[$annotorious$shape$hashCode$$($a$$31$$.shapes[0])], $shape_b$$ = $self$$15$$.$_shapes$[$annotorious$shape$hashCode$$($b$$26$$.shapes[0])];
    return $annotorious$shape$getSize$$($shape_a$$) - $annotorious$shape$getSize$$($shape_b$$)
  } || $goog$array$defaultCompare$$);
  return $intersectedAnnotations$$
};
function $JSCompiler_StaticMethods__draw$$($JSCompiler_StaticMethods__draw$self$$, $shape$$9$$, $highlight$$1$$) {
  var $selector$$4$$ = $goog$array$find$$($JSCompiler_StaticMethods__draw$self$$.$_annotator$.$getAvailableSelectors$(), function($selector$$5$$) {
    return $selector$$5$$.getSupportedShapeType() == $shape$$9$$.type
  });
  $selector$$4$$ ? $selector$$4$$.drawShape($JSCompiler_StaticMethods__draw$self$$.$_g2d$, $shape$$9$$, $highlight$$1$$) : console.log("WARNING unsupported shape type: " + $shape$$9$$.type)
}
function $JSCompiler_StaticMethods_redraw$$($JSCompiler_StaticMethods_redraw$self$$) {
  $JSCompiler_StaticMethods_redraw$self$$.$_g2d$.clearRect(0, 0, $JSCompiler_StaticMethods_redraw$self$$.$_canvas$.width, $JSCompiler_StaticMethods_redraw$self$$.$_canvas$.height);
  $goog$array$forEach$$($JSCompiler_StaticMethods_redraw$self$$.$_annotations$, function($annotation$$17$$) {
    $annotation$$17$$ != $JSCompiler_StaticMethods_redraw$self$$.$_currentAnnotation$ && $JSCompiler_StaticMethods__draw$$($JSCompiler_StaticMethods_redraw$self$$, $JSCompiler_StaticMethods_redraw$self$$.$_shapes$[$annotorious$shape$hashCode$$($annotation$$17$$.shapes[0])])
  });
  if($JSCompiler_StaticMethods_redraw$self$$.$_currentAnnotation$) {
    var $bbox_shape$$10$$ = $JSCompiler_StaticMethods_redraw$self$$.$_shapes$[$annotorious$shape$hashCode$$($JSCompiler_StaticMethods_redraw$self$$.$_currentAnnotation$.shapes[0])];
    $JSCompiler_StaticMethods__draw$$($JSCompiler_StaticMethods_redraw$self$$, $bbox_shape$$10$$, $JSCompiler_alias_TRUE$$);
    $bbox_shape$$10$$ = $annotorious$shape$getBoundingRect$$($bbox_shape$$10$$).geometry;
    $JSCompiler_StaticMethods_redraw$self$$.$_annotator$.popup.show($JSCompiler_StaticMethods_redraw$self$$.$_currentAnnotation$, new $annotorious$shape$geom$Point$$($bbox_shape$$10$$.x, $bbox_shape$$10$$.y + $bbox_shape$$10$$.height + 5))
  }
}
;var $annotorious$events$ui$hasTouch$$ = "ontouchstart" in window, $annotorious$events$ui$hasMouse$$ = !$annotorious$events$ui$hasTouch$$, $annotorious$events$ui$EventType$DOWN$$ = $annotorious$events$ui$hasTouch$$ ? "touchstart" : "mousedown", $annotorious$events$ui$EventType$OVER$$ = $annotorious$events$ui$hasTouch$$ ? "touchenter" : "mouseover", $annotorious$events$ui$EventType$MOVE$$ = $annotorious$events$ui$hasTouch$$ ? "touchmove" : "mousemove", $annotorious$events$ui$EventType$UP$$ = $annotorious$events$ui$hasTouch$$ ? 
"touchend" : "mouseup", $annotorious$events$ui$EventType$OUT$$ = $annotorious$events$ui$hasTouch$$ ? "touchleave" : "mouseout";
function $annotorious$events$ui$sanitizeCoordinates$$($event$$21$$, $parent$$25$$) {
  var $points$$8$$ = $JSCompiler_alias_FALSE$$;
  $event$$21$$.offsetX = $event$$21$$.offsetX ? $event$$21$$.offsetX : $JSCompiler_alias_FALSE$$;
  $event$$21$$.offsetY = $event$$21$$.offsetY ? $event$$21$$.offsetY : $JSCompiler_alias_FALSE$$;
  return $points$$8$$ = (!$event$$21$$.offsetX || !$event$$21$$.offsetY) && $event$$21$$.$event_$.changedTouches ? {x:$event$$21$$.$event_$.changedTouches[0].clientX - $annotorious$dom$getOffset$$($parent$$25$$).left, y:$event$$21$$.$event_$.changedTouches[0].clientY - $annotorious$dom$getOffset$$($parent$$25$$).top} : {x:$event$$21$$.offsetX, y:$event$$21$$.offsetY}
}
;function $annotorious$plugins$selection$RectDragSelector$$() {
}
$JSCompiler_prototypeAlias$$ = $annotorious$plugins$selection$RectDragSelector$$.prototype;
$JSCompiler_prototypeAlias$$.init = function $$JSCompiler_prototypeAlias$$$init$($annotator$$29$$, $canvas$$1$$) {
  this.$_OUTLINE$ = "#000000";
  this.$_STROKE$ = "#ffffff";
  this.$_FILL$ = $JSCompiler_alias_FALSE$$;
  this.$_HI_OUTLINE$ = "#000000";
  this.$_HI_STROKE$ = "#fff000";
  this.$_HI_FILL$ = $JSCompiler_alias_FALSE$$;
  this.$_HI_OUTLINE_WIDTH$ = this.$_STROKE_WIDTH$ = this.$_OUTLINE_WIDTH$ = 1;
  this.$_HI_STROKE_WIDTH$ = 1.2;
  this.$_canvas$ = $canvas$$1$$;
  this.$_annotator$ = $annotator$$29$$;
  this.$_g2d$ = $canvas$$1$$.getContext("2d");
  this.$_g2d$.lineWidth = 1;
  this.$_enabled$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$_attachListeners$ = function $$JSCompiler_prototypeAlias$$$$_attachListeners$$() {
  var $self$$18$$ = this, $canvas$$2$$ = this.$_canvas$;
  this.$_mouseMoveListener$ = $goog$events$listen$$(this.$_canvas$, $annotorious$events$ui$EventType$MOVE$$, function($event$$22_points$$9_width$$20$$) {
    console.log($event$$22_points$$9_width$$20$$);
    $event$$22_points$$9_width$$20$$ = $annotorious$events$ui$sanitizeCoordinates$$($event$$22_points$$9_width$$20$$, $canvas$$2$$);
    if($self$$18$$.$_enabled$) {
      $self$$18$$.$_opposite$ = {x:$event$$22_points$$9_width$$20$$.x, y:$event$$22_points$$9_width$$20$$.y};
      $self$$18$$.$_g2d$.clearRect(0, 0, $canvas$$2$$.width, $canvas$$2$$.height);
      var $event$$22_points$$9_width$$20$$ = $self$$18$$.$_opposite$.x - $self$$18$$.$_anchor$.x, $height$$25$$ = $self$$18$$.$_opposite$.y - $self$$18$$.$_anchor$.y;
      $self$$18$$.drawShape($self$$18$$.$_g2d$, {type:"rect", geometry:{x:0 < $event$$22_points$$9_width$$20$$ ? $self$$18$$.$_anchor$.x : $self$$18$$.$_opposite$.x, y:0 < $height$$25$$ ? $self$$18$$.$_anchor$.y : $self$$18$$.$_opposite$.y, width:Math.abs($event$$22_points$$9_width$$20$$), height:Math.abs($height$$25$$)}, style:{}})
    }
  });
  this.$_mouseUpListener$ = $goog$events$listen$$($canvas$$2$$, $annotorious$events$ui$EventType$UP$$, function($annotations$$3_event$$23$$) {
    var $points$$10$$ = $annotorious$events$ui$sanitizeCoordinates$$($annotations$$3_event$$23$$, $canvas$$2$$), $shape$$11$$ = $self$$18$$.getShape(), $annotations$$3_event$$23$$ = $annotations$$3_event$$23$$.$event_$ ? $annotations$$3_event$$23$$.$event_$ : $annotations$$3_event$$23$$;
    $self$$18$$.$_enabled$ = $JSCompiler_alias_FALSE$$;
    $shape$$11$$ ? ($self$$18$$.$_detachListeners$(), $self$$18$$.$_annotator$.fireEvent("onSelectionCompleted", {mouseEvent:$annotations$$3_event$$23$$, shape:$shape$$11$$, viewportBounds:$self$$18$$.getViewportBounds()})) : ($self$$18$$.$_annotator$.fireEvent("onSelectionCanceled"), $annotations$$3_event$$23$$ = $self$$18$$.$_annotator$.$getAnnotationsAt$($points$$10$$.x, $points$$10$$.y), 0 < $annotations$$3_event$$23$$.length && $self$$18$$.$_annotator$.$highlightAnnotation$($annotations$$3_event$$23$$[0]))
  })
};
$JSCompiler_prototypeAlias$$.$_detachListeners$ = function $$JSCompiler_prototypeAlias$$$$_detachListeners$$() {
  this.$_mouseMoveListener$ && ($goog$events$unlistenByKey$$(this.$_mouseMoveListener$), delete this.$_mouseMoveListener$);
  this.$_mouseUpListener$ && ($goog$events$unlistenByKey$$(this.$_mouseUpListener$), delete this.$_mouseUpListener$)
};
$JSCompiler_prototypeAlias$$.getName = $JSCompiler_returnArg$$("rect_drag");
$JSCompiler_prototypeAlias$$.getSupportedShapeType = $JSCompiler_returnArg$$("rect");
$JSCompiler_prototypeAlias$$.$setProperties$ = function $$JSCompiler_prototypeAlias$$$$setProperties$$($props$$2$$) {
  $props$$2$$.hasOwnProperty("outline") && (this.$_OUTLINE$ = $props$$2$$.outline);
  $props$$2$$.hasOwnProperty("stroke") && (this.$_STROKE$ = $props$$2$$.stroke);
  $props$$2$$.hasOwnProperty("fill") && (this.$_FILL$ = $props$$2$$.fill);
  $props$$2$$.hasOwnProperty("hi_outline") && (this.$_HI_OUTLINE$ = $props$$2$$.hi_outline);
  $props$$2$$.hasOwnProperty("hi_stroke") && (this.$_HI_STROKE$ = $props$$2$$.hi_stroke);
  $props$$2$$.hasOwnProperty("hi_fill") && (this.$_HI_FILL$ = $props$$2$$.hi_fill);
  $props$$2$$.hasOwnProperty("outline_width") && (this.$_OUTLINE_WIDTH$ = $props$$2$$.outline_width);
  $props$$2$$.hasOwnProperty("stroke_width") && (this.$_STROKE_WIDTH$ = $props$$2$$.stroke_width);
  $props$$2$$.hasOwnProperty("hi_outline_width") && (this.$_HI_OUTLINE_WIDTH$ = $props$$2$$.hi_outline_width);
  $props$$2$$.hasOwnProperty("hi_stroke_width") && (this.$_HI_STROKE_WIDTH$ = $props$$2$$.hi_stroke_width)
};
$JSCompiler_prototypeAlias$$.startSelection = function $$JSCompiler_prototypeAlias$$$startSelection$($x$$82$$, $y$$49$$) {
  var $startPoint$$2$$ = {x:$x$$82$$, y:$y$$49$$};
  this.$_enabled$ = $JSCompiler_alias_TRUE$$;
  this.$_attachListeners$($startPoint$$2$$);
  this.$_anchor$ = new $annotorious$shape$geom$Point$$($x$$82$$, $y$$49$$);
  this.$_annotator$.fireEvent("onSelectionStarted", {offsetX:$x$$82$$, offsetY:$y$$49$$});
  $goog$style$setStyle$$(document.body, "-webkit-user-select", "none")
};
$JSCompiler_prototypeAlias$$.stopSelection = function $$JSCompiler_prototypeAlias$$$stopSelection$() {
  this.$_detachListeners$();
  this.$_g2d$.clearRect(0, 0, this.$_canvas$.width, this.$_canvas$.height);
  $goog$style$setStyle$$(document.body, "-webkit-user-select", "auto");
  delete this.$_opposite$
};
$JSCompiler_prototypeAlias$$.getShape = function $$JSCompiler_prototypeAlias$$$getShape$() {
  if(this.$_opposite$ && 3 < Math.abs(this.$_opposite$.x - this.$_anchor$.x) && 3 < Math.abs(this.$_opposite$.y - this.$_anchor$.y)) {
    var $rect$$9_viewportBounds$$ = this.getViewportBounds(), $rect$$9_viewportBounds$$ = this.$_annotator$.$toItemCoordinates$({x:$rect$$9_viewportBounds$$.left, y:$rect$$9_viewportBounds$$.top, width:$rect$$9_viewportBounds$$.right - $rect$$9_viewportBounds$$.left, height:$rect$$9_viewportBounds$$.bottom - $rect$$9_viewportBounds$$.top});
    return new $annotorious$shape$Shape$$("rect", $rect$$9_viewportBounds$$)
  }
};
$JSCompiler_prototypeAlias$$.getViewportBounds = function $$JSCompiler_prototypeAlias$$$getViewportBounds$() {
  var $right$$12$$, $left$$14$$;
  this.$_opposite$.x > this.$_anchor$.x ? ($right$$12$$ = this.$_opposite$.x, $left$$14$$ = this.$_anchor$.x) : ($right$$12$$ = this.$_anchor$.x, $left$$14$$ = this.$_opposite$.x);
  var $top$$12$$, $bottom$$8$$;
  this.$_opposite$.y > this.$_anchor$.y ? ($top$$12$$ = this.$_anchor$.y, $bottom$$8$$ = this.$_opposite$.y) : ($top$$12$$ = this.$_opposite$.y, $bottom$$8$$ = this.$_anchor$.y);
  return{top:$top$$12$$, right:$right$$12$$, bottom:$bottom$$8$$, left:$left$$14$$}
};
$JSCompiler_prototypeAlias$$.drawShape = function $$JSCompiler_prototypeAlias$$$drawShape$($g2d$$, $geom$$1_shape$$12$$, $highlight$$2_stroke$$) {
  var $fill$$, $outline$$, $outline_width$$, $stroke_width$$;
  $geom$$1_shape$$12$$.style || ($geom$$1_shape$$12$$.style = {});
  "rect" == $geom$$1_shape$$12$$.type && ($highlight$$2_stroke$$ ? ($fill$$ = $geom$$1_shape$$12$$.style.hi_fill || this.$_HI_FILL$, $highlight$$2_stroke$$ = $geom$$1_shape$$12$$.style.hi_stroke || this.$_HI_STROKE$, $outline$$ = $geom$$1_shape$$12$$.style.hi_outline || this.$_HI_OUTLINE$, $outline_width$$ = $geom$$1_shape$$12$$.style.hi_outline_width || this.$_HI_OUTLINE_WIDTH$, $stroke_width$$ = $geom$$1_shape$$12$$.style.hi_stroke_width || this.$_HI_STROKE_WIDTH$) : ($fill$$ = $geom$$1_shape$$12$$.style.fill || 
  this.$_FILL$, $highlight$$2_stroke$$ = $geom$$1_shape$$12$$.style.stroke || this.$_STROKE$, $outline$$ = $geom$$1_shape$$12$$.style.outline || this.$_OUTLINE$, $outline_width$$ = $geom$$1_shape$$12$$.style.outline_width || this.$_OUTLINE_WIDTH$, $stroke_width$$ = $geom$$1_shape$$12$$.style.stroke_width || this.$_STROKE_WIDTH$), $geom$$1_shape$$12$$ = $geom$$1_shape$$12$$.geometry, $outline$$ && ($g2d$$.lineJoin = "round", $g2d$$.lineWidth = $outline_width$$, $g2d$$.strokeStyle = $outline$$, $g2d$$.strokeRect($geom$$1_shape$$12$$.x + 
  $outline_width$$ / 2, $geom$$1_shape$$12$$.y + $outline_width$$ / 2, $geom$$1_shape$$12$$.width - $outline_width$$, $geom$$1_shape$$12$$.height - $outline_width$$)), $highlight$$2_stroke$$ && ($g2d$$.lineJoin = "miter", $g2d$$.lineWidth = $stroke_width$$, $g2d$$.strokeStyle = $highlight$$2_stroke$$, $g2d$$.strokeRect($geom$$1_shape$$12$$.x + $outline_width$$ + $stroke_width$$ / 2, $geom$$1_shape$$12$$.y + $outline_width$$ + $stroke_width$$ / 2, $geom$$1_shape$$12$$.width - 2 * $outline_width$$ - 
  $stroke_width$$, $geom$$1_shape$$12$$.height - 2 * $outline_width$$ - $stroke_width$$)), $fill$$ && ($g2d$$.lineJoin = "miter", $g2d$$.lineWidth = $stroke_width$$, $g2d$$.fillStyle = $fill$$, $g2d$$.fillRect($geom$$1_shape$$12$$.x + $outline_width$$ + $stroke_width$$ / 2, $geom$$1_shape$$12$$.y + $outline_width$$ + $stroke_width$$ / 2, $geom$$1_shape$$12$$.width - 2 * $outline_width$$ - $stroke_width$$, $geom$$1_shape$$12$$.height - 2 * $outline_width$$ - $stroke_width$$)))
};
function $annotorious$templates$image$canvas$$($opt_data$$5$$) {
  return'<canvas class="annotorious-item annotorious-opacity-fade" style="position:absolute; top:0px; left:0px; width:' + $soy$$0$0escapeHtml$$($opt_data$$5$$.width) + "px; height:" + $soy$$0$0escapeHtml$$($opt_data$$5$$.height) + 'px; z-index:0" width="' + $soy$$0$0escapeHtml$$($opt_data$$5$$.width) + '" height="' + $soy$$0$0escapeHtml$$($opt_data$$5$$.height) + '"></canvas>'
}
function $annotorious$templates$image$hint$$($opt_data$$6$$) {
  return'<div class="annotorious-hint" style="white-space:nowrap; position:absolute; top:0px; left:0px; pointer-events:none;"><div class="annotorious-hint-msg annotorious-opacity-fade">' + $soy$$0$0escapeHtml$$($opt_data$$6$$.$msg$) + '</div><div class="annotorious-hint-icon" style="pointer-events:auto"></div></div>'
}
;function $annotorious$mediatypes$image$ImageAnnotator$$($item$$6$$, $opt_popup$$) {
  function $transferMargin$$inline_747$$($direction$$inline_750$$, $value$$inline_751$$) {
    $goog$style$setStyle$$($annotationLayer$$inline_746$$, "margin-" + $direction$$inline_750$$, $value$$inline_751$$ + "px");
    $goog$style$setStyle$$($item$$6$$, "margin-" + $direction$$inline_750$$, 0);
    $goog$style$setStyle$$($item$$6$$, "padding-" + $direction$$inline_750$$, 0)
  }
  this.$_image$ = $item$$6$$;
  this.$_original_bufferspace$ = {padding:$item$$6$$.style.padding, margin:$item$$6$$.style.margin};
  this.$_eventBroker$ = new $annotorious$events$EventBroker$$;
  this.$_selectors$ = [];
  this.$_selectionEnabled$ = $JSCompiler_alias_TRUE$$;
  this.element = $goog$dom$createDom$$("div", "annotorious-annotationlayer");
  $goog$style$setStyle$$(this.element, "position", "relative");
  $goog$style$setStyle$$(this.element, "display", "inline-block");
  var $annotationLayer$$inline_746$$ = this.element, $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$ = $goog$style$getBox_$$($item$$6$$, "margin"), $padding$$inline_749$$ = $goog$style$getBox_$$($item$$6$$, "padding");
  (0 != $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.top || 0 != $padding$$inline_749$$.top) && $transferMargin$$inline_747$$("top", $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.top + $padding$$inline_749$$.top);
  (0 != $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.right || 0 != $padding$$inline_749$$.right) && $transferMargin$$inline_747$$("right", $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.right + $padding$$inline_749$$.right);
  (0 != $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.bottom || 0 != $padding$$inline_749$$.bottom) && $transferMargin$$inline_747$$("bottom", $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.bottom + $padding$$inline_749$$.bottom);
  (0 != $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.left || 0 != $padding$$inline_749$$.left) && $transferMargin$$inline_747$$("left", $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.left + $padding$$inline_749$$.left);
  ($default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$ = $item$$6$$.parentNode) && $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.replaceChild(this.element, $item$$6$$);
  this.element.appendChild($item$$6$$);
  $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$ = $goog$style$getBounds$$($item$$6$$);
  this.$_viewCanvas$ = $goog$soy$renderAsElement$$($annotorious$templates$image$canvas$$, {width:$default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.width, height:$default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.height});
  $annotorious$events$ui$hasMouse$$ && $goog$dom$classes$add$$(this.$_viewCanvas$, "annotorious-item-unfocus");
  this.element.appendChild(this.$_viewCanvas$);
  this.$_editCanvas$ = $goog$soy$renderAsElement$$($annotorious$templates$image$canvas$$, {width:$default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.width, height:$default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.height});
  $annotorious$events$ui$hasMouse$$ && $goog$style$showElement$$(this.$_editCanvas$, $JSCompiler_alias_FALSE$$);
  this.element.appendChild(this.$_editCanvas$);
  this.popup = $opt_popup$$ ? $opt_popup$$ : new $annotorious$Popup$$(this);
  $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$ = new $annotorious$plugins$selection$RectDragSelector$$;
  $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$.init(this, this.$_editCanvas$);
  this.$_selectors$.push($default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$);
  this.$_currentSelector$ = $default_selector_img_bounds_margin$$inline_748_parent$$inline_755$$;
  this.editor = new $annotorious$Editor$$(this);
  this.$_viewer$ = new $annotorious$mediatypes$image$Viewer$$(this.$_viewCanvas$, this);
  this.$_hint$ = new $annotorious$Hint$$(this, this.element);
  var $self$$19$$ = this;
  $annotorious$events$ui$hasMouse$$ && ($goog$events$listen$$(this.element, $annotorious$events$ui$EventType$OVER$$, function($event$$24_relatedTarget$$1$$) {
    $event$$24_relatedTarget$$1$$ = $event$$24_relatedTarget$$1$$.relatedTarget;
    if(!$event$$24_relatedTarget$$1$$ || !$goog$dom$contains$$($self$$19$$.element, $event$$24_relatedTarget$$1$$)) {
      $self$$19$$.$_eventBroker$.fireEvent("onMouseOverItem"), $goog$dom$classes$addRemove$$($self$$19$$.$_viewCanvas$, "annotorious-item-unfocus", "annotorious-item-focus")
    }
  }), $goog$events$listen$$(this.element, $annotorious$events$ui$EventType$OUT$$, function($event$$25_relatedTarget$$2$$) {
    $event$$25_relatedTarget$$2$$ = $event$$25_relatedTarget$$2$$.relatedTarget;
    if(!$event$$25_relatedTarget$$2$$ || !$goog$dom$contains$$($self$$19$$.element, $event$$25_relatedTarget$$2$$)) {
      $self$$19$$.$_eventBroker$.fireEvent("onMouseOutOfItem"), $goog$dom$classes$addRemove$$($self$$19$$.$_viewCanvas$, "annotorious-item-focus", "annotorious-item-unfocus")
    }
  }));
  $JSCompiler_StaticMethods__attachListener$$(this, $annotorious$events$ui$hasTouch$$ ? this.$_editCanvas$ : this.$_viewCanvas$);
  this.$_eventBroker$.addHandler("onSelectionCompleted", function($event$$26$$) {
    var $bounds$$ = $event$$26$$.viewportBounds;
    $self$$19$$.editor.setPosition(new $annotorious$shape$geom$Point$$($bounds$$.left + $self$$19$$.$_image$.offsetLeft, $bounds$$.bottom + 4 + $self$$19$$.$_image$.offsetTop));
    $self$$19$$.editor.open($JSCompiler_alias_FALSE$$, $event$$26$$)
  });
  this.$_eventBroker$.addHandler("onSelectionCanceled", function() {
    $annotorious$events$ui$hasMouse$$ && $goog$style$showElement$$($self$$19$$.$_editCanvas$, $JSCompiler_alias_FALSE$$);
    $self$$19$$.$_currentSelector$.stopSelection()
  })
}
$goog$inherits$$($annotorious$mediatypes$image$ImageAnnotator$$, $annotorious$mediatypes$Annotator$$);
$JSCompiler_prototypeAlias$$ = $annotorious$mediatypes$image$ImageAnnotator$$.prototype;
$JSCompiler_prototypeAlias$$.$activateSelector$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$addSelector$ = function $$JSCompiler_prototypeAlias$$$$addSelector$$($selector$$6$$) {
  $selector$$6$$.init(this, this.$_editCanvas$);
  this.$_selectors$.push($selector$$6$$)
};
$JSCompiler_prototypeAlias$$.destroy = function $$JSCompiler_prototypeAlias$$$destroy$() {
  var $img$$2$$ = this.$_image$;
  $img$$2$$.style.margin = this.$_original_bufferspace$.margin;
  $img$$2$$.style.padding = this.$_original_bufferspace$.padding;
  var $oldNode$$inline_767$$ = this.element, $parent$$inline_768$$ = $oldNode$$inline_767$$.parentNode;
  $parent$$inline_768$$ && $parent$$inline_768$$.replaceChild($img$$2$$, $oldNode$$inline_767$$)
};
$JSCompiler_prototypeAlias$$.$editAnnotation$ = function $$JSCompiler_prototypeAlias$$$$editAnnotation$$($annotation$$18$$) {
  this.$_viewer$.$removeAnnotation$($annotation$$18$$);
  var $anchor_bounds$$1_selector$$7$$ = $goog$array$find$$(this.$_selectors$, function($selector$$8$$) {
    return $selector$$8$$.getSupportedShapeType() == $annotation$$18$$.shapes[0].type
  });
  if($anchor_bounds$$1_selector$$7$$) {
    $goog$style$showElement$$(this.$_editCanvas$, $JSCompiler_alias_TRUE$$);
    this.$_viewer$.$highlightAnnotation$($JSCompiler_alias_FALSE$$);
    var $g2d$$1$$ = this.$_editCanvas$.getContext("2d"), $shape$$13_viewportShape$$1$$ = $annotation$$18$$.shapes[0], $self$$20$$ = this, $shape$$13_viewportShape$$1$$ = "pixel" == $shape$$13_viewportShape$$1$$.units ? $shape$$13_viewportShape$$1$$ : $annotorious$shape$transform$$($shape$$13_viewportShape$$1$$, function($xy$$4$$) {
      return $self$$20$$.$fromItemCoordinates$($xy$$4$$)
    });
    $anchor_bounds$$1_selector$$7$$.drawShape($g2d$$1$$, $shape$$13_viewportShape$$1$$)
  }
  $anchor_bounds$$1_selector$$7$$ = $annotorious$shape$getBoundingRect$$($annotation$$18$$.shapes[0]).geometry;
  $anchor_bounds$$1_selector$$7$$ = "pixel" == $annotation$$18$$.shapes[0].units ? new $annotorious$shape$geom$Point$$($anchor_bounds$$1_selector$$7$$.x, $anchor_bounds$$1_selector$$7$$.y + $anchor_bounds$$1_selector$$7$$.height) : this.$fromItemCoordinates$(new $annotorious$shape$geom$Point$$($anchor_bounds$$1_selector$$7$$.x, $anchor_bounds$$1_selector$$7$$.y + $anchor_bounds$$1_selector$$7$$.height));
  this.editor.setPosition(new $annotorious$shape$geom$Point$$($anchor_bounds$$1_selector$$7$$.x + this.$_image$.offsetLeft, $anchor_bounds$$1_selector$$7$$.y + 4 + this.$_image$.offsetTop));
  this.editor.open($annotation$$18$$)
};
$JSCompiler_prototypeAlias$$.$fromItemCoordinates$ = function $$JSCompiler_prototypeAlias$$$$fromItemCoordinates$$($xy_wh$$) {
  var $imgSize$$ = $goog$style$getSize$$(this.$_image$);
  return $xy_wh$$.width ? {x:$xy_wh$$.x * $imgSize$$.width, y:$xy_wh$$.y * $imgSize$$.height, width:$xy_wh$$.width * $imgSize$$.width, height:$xy_wh$$.height * $imgSize$$.height} : {x:$xy_wh$$.x * $imgSize$$.width, y:$xy_wh$$.y * $imgSize$$.height}
};
$JSCompiler_prototypeAlias$$.$getActiveSelector$ = $JSCompiler_get$$("$_currentSelector$");
$JSCompiler_prototypeAlias$$.$getAnnotations$ = function $$JSCompiler_prototypeAlias$$$$getAnnotations$$() {
  return this.$_viewer$.$getAnnotations$()
};
$JSCompiler_prototypeAlias$$.$getAnnotationsAt$ = function $$JSCompiler_prototypeAlias$$$$getAnnotationsAt$$($cx$$, $cy$$) {
  return $goog$array$toArray$$(this.$_viewer$.$getAnnotationsAt$($cx$$, $cy$$))
};
$JSCompiler_prototypeAlias$$.$getAvailableSelectors$ = $JSCompiler_get$$("$_selectors$");
$JSCompiler_prototypeAlias$$.getItem = function $$JSCompiler_prototypeAlias$$$getItem$() {
  return{src:$annotorious$mediatypes$image$ImageAnnotator$getItemURL$$(this.$_image$), element:this.$_image$}
};
function $annotorious$mediatypes$image$ImageAnnotator$getItemURL$$($item$$7$$) {
  var $src$$22$$ = $item$$7$$.getAttribute("data-original");
  return $src$$22$$ ? $src$$22$$ : $item$$7$$.src
}
$JSCompiler_prototypeAlias$$.$hideAnnotations$ = function $$JSCompiler_prototypeAlias$$$$hideAnnotations$$() {
  $goog$style$showElement$$(this.$_viewCanvas$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$hideSelectionWidget$ = function $$JSCompiler_prototypeAlias$$$$hideSelectionWidget$$() {
  this.$_selectionEnabled$ = $JSCompiler_alias_FALSE$$;
  this.$_hint$ && (this.$_hint$.destroy(), delete this.$_hint$)
};
$JSCompiler_prototypeAlias$$.$setCurrentSelector$ = function $$JSCompiler_prototypeAlias$$$$setCurrentSelector$$($selector$$9$$) {
  (this.$_currentSelector$ = $goog$array$find$$(this.$_selectors$, function($sel$$) {
    return $sel$$.getName() == $selector$$9$$
  })) || console.log('WARNING: selector "' + $selector$$9$$ + '" not available')
};
$JSCompiler_prototypeAlias$$.$setProperties$ = function $$JSCompiler_prototypeAlias$$$$setProperties$$($props$$3$$) {
  $goog$array$forEach$$(this.$_selectors$, function($selector$$10$$) {
    $selector$$10$$.$setProperties$($props$$3$$)
  });
  $JSCompiler_StaticMethods_redraw$$(this.$_viewer$)
};
$JSCompiler_prototypeAlias$$.$showAnnotations$ = function $$JSCompiler_prototypeAlias$$$$showAnnotations$$() {
  $goog$style$showElement$$(this.$_viewCanvas$, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$showSelectionWidget$ = function $$JSCompiler_prototypeAlias$$$$showSelectionWidget$$() {
  this.$_selectionEnabled$ = $JSCompiler_alias_TRUE$$;
  this.$_hint$ || (this.$_hint$ = new $annotorious$Hint$$(this, this.element))
};
$JSCompiler_prototypeAlias$$.stopSelection = function $$JSCompiler_prototypeAlias$$$stopSelection$($opt_original_annotation$$) {
  $annotorious$events$ui$hasMouse$$ && $goog$style$showElement$$(this.$_editCanvas$, $JSCompiler_alias_FALSE$$);
  this.$_currentSelector$.stopSelection();
  $opt_original_annotation$$ && this.$_viewer$.$addAnnotation$($opt_original_annotation$$)
};
$JSCompiler_prototypeAlias$$.$toItemCoordinates$ = function $$JSCompiler_prototypeAlias$$$$toItemCoordinates$$($xy_wh$$1$$) {
  var $imgSize$$1$$ = $goog$style$getSize$$(this.$_image$);
  return $xy_wh$$1$$.width ? {x:$xy_wh$$1$$.x / $imgSize$$1$$.width, y:$xy_wh$$1$$.y / $imgSize$$1$$.height, width:$xy_wh$$1$$.width / $imgSize$$1$$.width, height:$xy_wh$$1$$.height / $imgSize$$1$$.height} : {x:$xy_wh$$1$$.x / $imgSize$$1$$.width, y:$xy_wh$$1$$.y / $imgSize$$1$$.height}
};
$annotorious$mediatypes$image$ImageAnnotator$$.prototype.addSelector = $annotorious$mediatypes$image$ImageAnnotator$$.prototype.$addSelector$;
$annotorious$mediatypes$image$ImageAnnotator$$.prototype.fireEvent = $annotorious$mediatypes$image$ImageAnnotator$$.prototype.fireEvent;
$annotorious$mediatypes$image$ImageAnnotator$$.prototype.setCurrentSelector = $annotorious$mediatypes$image$ImageAnnotator$$.prototype.$setCurrentSelector$;
$annotorious$mediatypes$image$ImageAnnotator$$.prototype.toItemCoordinates = $annotorious$mediatypes$image$ImageAnnotator$$.prototype.$toItemCoordinates$;
function $annotorious$mediatypes$image$ImageModule$$() {
  $JSCompiler_StaticMethods__initFields$$(this, function() {
    return $query$$inline_159$$("img.annotatable", document)
  })
}
$goog$inherits$$($annotorious$mediatypes$image$ImageModule$$, $annotorious$mediatypes$Module$$);
$annotorious$mediatypes$image$ImageModule$$.prototype.$getItemURL$ = function $$annotorious$mediatypes$image$ImageModule$$$$$getItemURL$$($item$$8$$) {
  return $annotorious$mediatypes$image$ImageAnnotator$getItemURL$$($item$$8$$)
};
$annotorious$mediatypes$image$ImageModule$$.prototype.$newAnnotator$ = function $$annotorious$mediatypes$image$ImageModule$$$$$newAnnotator$$($item$$9$$) {
  return new $annotorious$mediatypes$image$ImageAnnotator$$($item$$9$$)
};
$annotorious$mediatypes$image$ImageModule$$.prototype.$supports$ = function $$annotorious$mediatypes$image$ImageModule$$$$$supports$$($item$$10$$) {
  return $goog$dom$isElement$$($item$$10$$) ? "IMG" == $item$$10$$.tagName : $JSCompiler_alias_FALSE$$
};
function $annotorious$templates$openlayers$secondaryHint$$($opt_data$$7$$) {
  return'<div class="annotorious-opacity-fade" style="white-space:nowrap; position:absolute; pointer-events:none; top:80px; width:100%; text-align:center;"><div class="annotorious-ol-hint" style="width: 400px; margin:0px auto;">' + $soy$$0$0escapeHtml$$($opt_data$$7$$.$msg$) + "</dvi></div>"
}
;function $annotorious$mediatypes$openlayers$Viewer$$($map$$10$$, $annotator$$30$$) {
  this.$_map$ = $map$$10$$;
  this.$_map_bounds$ = $goog$style$getBounds$$($annotator$$30$$.element);
  this.$_popup$ = $annotator$$30$$.popup;
  $goog$style$setStyle$$(this.$_popup$.element, "z-index", 99E3);
  this.$_overlays$ = [];
  this.$_boxesLayer$ = new OpenLayers.Layer.Boxes("Annotorious");
  this.$_map$.addLayer(this.$_boxesLayer$);
  var $self$$21$$ = this;
  this.$_map$.events.register("move", this.$_map$, function() {
    $self$$21$$.$_currentlyHighlightedOverlay$ && $self$$21$$.$_place_popup$()
  });
  $annotator$$30$$.addHandler("beforePopupHide", function() {
    $self$$21$$.$_lastHoveredOverlay$ == $self$$21$$.$_currentlyHighlightedOverlay$ ? $self$$21$$.$_popup$.clearHideTimer() : $self$$21$$.$_updateHighlight$($self$$21$$.$_lastHoveredOverlay$, $self$$21$$.$_currentlyHighlightedOverlay$)
  })
}
$JSCompiler_prototypeAlias$$ = $annotorious$mediatypes$openlayers$Viewer$$.prototype;
$JSCompiler_prototypeAlias$$.destroy = function $$JSCompiler_prototypeAlias$$$destroy$() {
  this.$_boxesLayer$.destroy()
};
$JSCompiler_prototypeAlias$$.$_place_popup$ = function $$JSCompiler_prototypeAlias$$$$_place_popup$$() {
  var $JSCompiler_object_inline_top_2_annotation_div_popup_pos$$ = this.$_currentlyHighlightedOverlay$.$marker$.div, $annotation_dim_popup_bounds$$ = $goog$style$getBounds$$($JSCompiler_object_inline_top_2_annotation_div_popup_pos$$), $JSCompiler_object_inline_left_3_annotation_pos$$ = $goog$style$getRelativePosition$$($JSCompiler_object_inline_top_2_annotation_div_popup_pos$$, this.$_map$.div), $JSCompiler_object_inline_top_2_annotation_div_popup_pos$$ = $JSCompiler_object_inline_left_3_annotation_pos$$.y, 
  $JSCompiler_object_inline_left_3_annotation_pos$$ = $JSCompiler_object_inline_left_3_annotation_pos$$.x, $JSCompiler_object_inline_width_4$$ = $annotation_dim_popup_bounds$$.width, $JSCompiler_object_inline_height_5$$ = $annotation_dim_popup_bounds$$.height, $annotation_dim_popup_bounds$$ = $goog$style$getBounds$$(this.$_popup$.element), $JSCompiler_object_inline_top_2_annotation_div_popup_pos$$ = {y:$JSCompiler_object_inline_top_2_annotation_div_popup_pos$$ + $JSCompiler_object_inline_height_5$$ + 
  5};
  $JSCompiler_object_inline_left_3_annotation_pos$$ + $annotation_dim_popup_bounds$$.width > this.$_map_bounds$.width ? ($goog$dom$classes$addRemove$$(this.$_popup$.element, "top-left", "top-right"), $JSCompiler_object_inline_top_2_annotation_div_popup_pos$$.x = $JSCompiler_object_inline_left_3_annotation_pos$$ + $JSCompiler_object_inline_width_4$$ - $annotation_dim_popup_bounds$$.width) : ($goog$dom$classes$addRemove$$(this.$_popup$.element, "top-right", "top-left"), $JSCompiler_object_inline_top_2_annotation_div_popup_pos$$.x = 
  $JSCompiler_object_inline_left_3_annotation_pos$$);
  0 > $JSCompiler_object_inline_top_2_annotation_div_popup_pos$$.x && ($JSCompiler_object_inline_top_2_annotation_div_popup_pos$$.x = 0);
  $JSCompiler_object_inline_top_2_annotation_div_popup_pos$$.x + $annotation_dim_popup_bounds$$.width > this.$_map_bounds$.width && ($JSCompiler_object_inline_top_2_annotation_div_popup_pos$$.x = this.$_map_bounds$.width - $annotation_dim_popup_bounds$$.width);
  $JSCompiler_object_inline_top_2_annotation_div_popup_pos$$.y + $annotation_dim_popup_bounds$$.height > this.$_map_bounds$.height && ($JSCompiler_object_inline_top_2_annotation_div_popup_pos$$.y = this.$_map_bounds$.height - $annotation_dim_popup_bounds$$.height);
  this.$_popup$.setPosition($JSCompiler_object_inline_top_2_annotation_div_popup_pos$$)
};
$JSCompiler_prototypeAlias$$.$_show_popup$ = function $$JSCompiler_prototypeAlias$$$$_show_popup$$($annotation$$19$$) {
  this.$_popup$.setAnnotation($annotation$$19$$);
  this.$_place_popup$();
  this.$_popup$.show()
};
$JSCompiler_prototypeAlias$$.$_updateHighlight$ = function $$JSCompiler_prototypeAlias$$$$_updateHighlight$$($new_highlight$$, $previous_highlight$$) {
  $new_highlight$$ ? ($goog$style$getRelativePosition$$($new_highlight$$.$marker$.div, this.$_map$.div), $goog$string$toCamelCase$$("height"), $goog$style$setStyle$$($new_highlight$$.$inner$, "border-color", "#fff000"), this.$_currentlyHighlightedOverlay$ = $new_highlight$$, this.$_show_popup$($new_highlight$$.$annotation$)) : delete this.$_currentlyHighlightedOverlay$;
  $previous_highlight$$ && $goog$style$setStyle$$($previous_highlight$$.$inner$, "border-color", "#fff")
};
$JSCompiler_prototypeAlias$$.$addAnnotation$ = function $$JSCompiler_prototypeAlias$$$$addAnnotation$$($annotation$$20$$) {
  var $geometry$$1_marker$$ = $annotation$$20$$.shapes[0].geometry, $geometry$$1_marker$$ = new OpenLayers.Marker.Box(new OpenLayers.Bounds($geometry$$1_marker$$.x, $geometry$$1_marker$$.y, $geometry$$1_marker$$.x + $geometry$$1_marker$$.width, $geometry$$1_marker$$.y + $geometry$$1_marker$$.height));
  $goog$dom$classes$add$$($geometry$$1_marker$$.div, "annotorious-ol-boxmarker-outer");
  $goog$style$setStyle$$($geometry$$1_marker$$.div, "border", $JSCompiler_alias_NULL$$);
  var $inner$$ = $goog$dom$createDom$$("div", "annotorious-ol-boxmarker-inner");
  $goog$style$setSize$$($inner$$, "100%", "100%");
  $geometry$$1_marker$$.div.appendChild($inner$$);
  var $overlay$$ = {$annotation$:$annotation$$20$$, $marker$:$geometry$$1_marker$$, $inner$:$inner$$}, $self$$22$$ = this;
  $goog$events$listen$$($inner$$, "mouseover", function() {
    $self$$22$$.$_currentlyHighlightedOverlay$ || $self$$22$$.$_updateHighlight$($overlay$$);
    $self$$22$$.$_lastHoveredOverlay$ = $overlay$$
  });
  $goog$events$listen$$($inner$$, "mouseout", function() {
    delete $self$$22$$.$_lastHoveredOverlay$;
    $self$$22$$.$_popup$.startHideTimer()
  });
  this.$_overlays$.push($overlay$$);
  $goog$array$ARRAY_PROTOTYPE_$$.sort.call(this.$_overlays$, function($a$$32$$, $b$$27$$) {
    return $annotorious$shape$getSize$$($b$$27$$.$annotation$.shapes[0]) - $annotorious$shape$getSize$$($a$$32$$.$annotation$.shapes[0])
  } || $goog$array$defaultCompare$$);
  var $zIndex$$ = 1E4;
  $goog$array$forEach$$(this.$_overlays$, function($overlay$$1$$) {
    $goog$style$setStyle$$($overlay$$1$$.$marker$.div, "z-index", $zIndex$$);
    $zIndex$$++
  });
  this.$_boxesLayer$.addMarker($geometry$$1_marker$$)
};
$JSCompiler_prototypeAlias$$.$removeAnnotation$ = function $$JSCompiler_prototypeAlias$$$$removeAnnotation$$($annotation$$21$$) {
  var $overlay$$2$$ = $goog$array$find$$(this.$_overlays$, function($overlay$$3$$) {
    return $overlay$$3$$.$annotation$ == $annotation$$21$$
  });
  $overlay$$2$$ && ($goog$array$remove$$(this.$_overlays$, $overlay$$2$$), this.$_boxesLayer$.removeMarker($overlay$$2$$.$marker$))
};
$JSCompiler_prototypeAlias$$.$getAnnotations$ = function $$JSCompiler_prototypeAlias$$$$getAnnotations$$() {
  return $goog$array$map$$(this.$_overlays$, function($overlay$$4$$) {
    return $overlay$$4$$.$annotation$
  })
};
$JSCompiler_prototypeAlias$$.$highlightAnnotation$ = function $$JSCompiler_prototypeAlias$$$$highlightAnnotation$$($opt_annotation$$2$$) {
  $opt_annotation$$2$$ || this.$_popup$.startHideTimer()
};
function $annotorious$mediatypes$openlayers$OpenLayersAnnotator$$($map$$11$$) {
  function $updateCanvasSize$$() {
    var $width$$21$$ = parseInt($goog$style$getComputedStyle$$($self$$23$$.element, "width"), 10), $height$$27$$ = parseInt($goog$style$getComputedStyle$$($self$$23$$.element, "height"), 10);
    $goog$style$setSize$$($self$$23$$.$_editCanvas$, $width$$21$$, $height$$27$$);
    $self$$23$$.$_editCanvas$.width = $width$$21$$;
    $self$$23$$.$_editCanvas$.height = $height$$27$$
  }
  this.$_map$ = $map$$11$$;
  this.element = $map$$11$$.div;
  var $pos$$8$$ = this.element.style[$goog$string$toCamelCase$$("position")] || "";
  "absolute" != $pos$$8$$ && "relative" != $pos$$8$$ && $goog$style$setStyle$$(this.element, "position", "relative");
  this.$_eventBroker$ = new $annotorious$events$EventBroker$$;
  this.$_secondaryHint$ = $goog$soy$renderAsElement$$($annotorious$templates$openlayers$secondaryHint$$, {$msg$:"Click and Drag"});
  $goog$style$setStyle$$(this.$_secondaryHint$, "z-index", 9998);
  $goog$style$setOpacity$$(this.$_secondaryHint$, 0);
  this.element.appendChild(this.$_secondaryHint$);
  this.popup = new $annotorious$Popup$$(this);
  this.$_viewer$ = new $annotorious$mediatypes$openlayers$Viewer$$($map$$11$$, this);
  this.$_editCanvas$ = $goog$soy$renderAsElement$$($annotorious$templates$image$canvas$$, {width:"0", height:"0"});
  $goog$style$showElement$$(this.$_editCanvas$, $JSCompiler_alias_FALSE$$);
  $goog$style$setStyle$$(this.$_editCanvas$, "position", "absolute");
  $goog$style$setStyle$$(this.$_editCanvas$, "top", "0px");
  $goog$style$setStyle$$(this.$_editCanvas$, "z-index", 9999);
  this.element.appendChild(this.$_editCanvas$);
  var $self$$23$$ = this;
  $updateCanvasSize$$();
  this.$_currentSelector$ = new $annotorious$plugins$selection$RectDragSelector$$;
  this.$_currentSelector$.init(this, this.$_editCanvas$);
  this.$_stop_selection_callback$ = $JSCompiler_alias_VOID$$;
  this.editor = new $annotorious$Editor$$(this);
  $goog$style$setStyle$$(this.editor.element, "z-index", 1E4);
  window.addEventListener ? window.addEventListener("resize", $updateCanvasSize$$, $JSCompiler_alias_FALSE$$) : window.attachEvent && window.attachEvent("onresize", $updateCanvasSize$$);
  $goog$events$listen$$(this.element, "mouseover", function($event$$29_relatedTarget$$3$$) {
    $event$$29_relatedTarget$$3$$ = $event$$29_relatedTarget$$3$$.relatedTarget;
    (!$event$$29_relatedTarget$$3$$ || !$goog$dom$contains$$($self$$23$$.element, $event$$29_relatedTarget$$3$$)) && $self$$23$$.$_eventBroker$.fireEvent("onMouseOverItem")
  });
  $goog$events$listen$$(this.element, "mouseout", function($event$$30_relatedTarget$$4$$) {
    $event$$30_relatedTarget$$4$$ = $event$$30_relatedTarget$$4$$.relatedTarget;
    (!$event$$30_relatedTarget$$4$$ || !$goog$dom$contains$$($self$$23$$.element, $event$$30_relatedTarget$$4$$)) && $self$$23$$.$_eventBroker$.fireEvent("onMouseOutOfItem")
  });
  $goog$events$listen$$(this.$_editCanvas$, "mousedown", function($event$$31$$) {
    var $offset$$18$$ = $goog$style$getClientPosition$$($self$$23$$.element);
    $self$$23$$.$_currentSelector$.startSelection($event$$31$$.clientX - $offset$$18$$.x, $event$$31$$.clientY - $offset$$18$$.y)
  });
  this.$_eventBroker$.addHandler("onSelectionCompleted", function($bounds$$2_event$$32$$) {
    $goog$style$setStyle$$($self$$23$$.$_editCanvas$, "pointer-events", "none");
    $bounds$$2_event$$32$$ = $bounds$$2_event$$32$$.viewportBounds;
    $self$$23$$.editor.setPosition(new $annotorious$shape$geom$Point$$($bounds$$2_event$$32$$.left, $bounds$$2_event$$32$$.bottom + 4));
    $self$$23$$.editor.open()
  });
  this.$_eventBroker$.addHandler("onSelectionCanceled", function() {
    $self$$23$$.stopSelection()
  })
}
$goog$inherits$$($annotorious$mediatypes$openlayers$OpenLayersAnnotator$$, $annotorious$mediatypes$Annotator$$);
$JSCompiler_prototypeAlias$$ = $annotorious$mediatypes$openlayers$OpenLayersAnnotator$$.prototype;
$JSCompiler_prototypeAlias$$.$showSelectionWidget$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$hideSelectionWidget$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$activateSelector$ = function $$JSCompiler_prototypeAlias$$$$activateSelector$$($callback$$36$$) {
  $goog$style$setStyle$$(this.$_editCanvas$, "pointer-events", "auto");
  var $self$$24$$ = this;
  $goog$style$showElement$$(this.$_editCanvas$, $JSCompiler_alias_TRUE$$);
  $goog$style$setOpacity$$(this.$_secondaryHint$, 0.8);
  window.setTimeout(function() {
    $goog$style$setOpacity$$($self$$24$$.$_secondaryHint$, 0)
  }, 2E3);
  $callback$$36$$ && (this.$_stop_selection_callback$ = $callback$$36$$)
};
$JSCompiler_prototypeAlias$$.destroy = function $$JSCompiler_prototypeAlias$$$destroy$() {
  this.$_viewer$.destroy();
  $goog$dom$removeNode$$(this.$_secondaryHint$);
  $goog$dom$removeNode$$(this.$_editCanvas$)
};
$JSCompiler_prototypeAlias$$.$addSelector$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$editAnnotation$ = function $$JSCompiler_prototypeAlias$$$$editAnnotation$$($annotation$$22$$) {
  this.$_viewer$.$removeAnnotation$($annotation$$22$$);
  var $selector$$12_viewportBounds$$1$$ = this.$_currentSelector$, $self$$25$$ = this;
  if($selector$$12_viewportBounds$$1$$) {
    $goog$style$showElement$$(this.$_editCanvas$, $JSCompiler_alias_TRUE$$);
    this.$_viewer$.$highlightAnnotation$($JSCompiler_alias_VOID$$);
    var $g2d$$2$$ = this.$_editCanvas$.getContext("2d"), $viewportShape$$2$$ = $annotorious$shape$transform$$($annotation$$22$$.shapes[0], function($xy$$5$$) {
      return $self$$25$$.$fromItemCoordinates$($xy$$5$$)
    });
    console.log($viewportShape$$2$$);
    $selector$$12_viewportBounds$$1$$.drawShape($g2d$$2$$, $viewportShape$$2$$);
    $selector$$12_viewportBounds$$1$$ = $annotorious$shape$getBoundingRect$$($viewportShape$$2$$).geometry;
    this.editor.setPosition(new $annotorious$shape$geom$Point$$($selector$$12_viewportBounds$$1$$.x, $selector$$12_viewportBounds$$1$$.y + $selector$$12_viewportBounds$$1$$.height));
    this.editor.open($annotation$$22$$)
  }
};
$JSCompiler_prototypeAlias$$.$fromItemCoordinates$ = function $$JSCompiler_prototypeAlias$$$$fromItemCoordinates$$($itemCoords_pxOpposite$$) {
  var $pxCoords$$ = this.$_map$.getViewPortPxFromLonLat(new OpenLayers.LonLat($itemCoords_pxOpposite$$.x, $itemCoords_pxOpposite$$.y));
  return($itemCoords_pxOpposite$$ = $itemCoords_pxOpposite$$.width ? this.$_map$.getViewPortPxFromLonLat(new OpenLayers.LonLat($itemCoords_pxOpposite$$.x + $itemCoords_pxOpposite$$.width, $itemCoords_pxOpposite$$.y + $itemCoords_pxOpposite$$.height)) : $JSCompiler_alias_FALSE$$) ? {x:$pxCoords$$.x, y:$itemCoords_pxOpposite$$.y, width:$itemCoords_pxOpposite$$.x - $pxCoords$$.x + 2, height:$pxCoords$$.y - $itemCoords_pxOpposite$$.y + 2} : {x:$pxCoords$$.x, y:$pxCoords$$.y}
};
$JSCompiler_prototypeAlias$$.$getAnnotations$ = function $$JSCompiler_prototypeAlias$$$$getAnnotations$$() {
  return this.$_viewer$.$getAnnotations$()
};
$JSCompiler_prototypeAlias$$.$getAvailableSelectors$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.getItem = function $$JSCompiler_prototypeAlias$$$getItem$() {
  return{src:"map://openlayers/something"}
};
$JSCompiler_prototypeAlias$$.$setActiveSelector$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$toItemCoordinates$ = function $$JSCompiler_prototypeAlias$$$$toItemCoordinates$$($itemOpposite_opposite_xy$$6$$) {
  var $foo_itemCoords$$1$$ = this.$_map$.getLonLatFromPixel(new OpenLayers.Pixel($itemOpposite_opposite_xy$$6$$.x, $itemOpposite_opposite_xy$$6$$.y));
  return($itemOpposite_opposite_xy$$6$$ = $itemOpposite_opposite_xy$$6$$.width ? new OpenLayers.Pixel($itemOpposite_opposite_xy$$6$$.x + $itemOpposite_opposite_xy$$6$$.width - 2, $itemOpposite_opposite_xy$$6$$.y + $itemOpposite_opposite_xy$$6$$.height - 2) : $JSCompiler_alias_FALSE$$) ? ($itemOpposite_opposite_xy$$6$$ = this.$_map$.getLonLatFromPixel($itemOpposite_opposite_xy$$6$$), $foo_itemCoords$$1$$ = {x:$foo_itemCoords$$1$$.lon, y:$itemOpposite_opposite_xy$$6$$.lat, width:$itemOpposite_opposite_xy$$6$$.lon - 
  $foo_itemCoords$$1$$.lon, height:$foo_itemCoords$$1$$.lat - $itemOpposite_opposite_xy$$6$$.lat}, console.log($foo_itemCoords$$1$$), $foo_itemCoords$$1$$) : {x:$foo_itemCoords$$1$$.lon, y:$foo_itemCoords$$1$$.lat}
};
function $annotorious$mediatypes$openlayers$OpenLayersModule$$() {
  $JSCompiler_StaticMethods__initFields$$(this)
}
$goog$inherits$$($annotorious$mediatypes$openlayers$OpenLayersModule$$, $annotorious$mediatypes$Module$$);
$annotorious$mediatypes$openlayers$OpenLayersModule$$.prototype.$getItemURL$ = $JSCompiler_returnArg$$("map://openlayers/something");
$annotorious$mediatypes$openlayers$OpenLayersModule$$.prototype.$newAnnotator$ = function $$annotorious$mediatypes$openlayers$OpenLayersModule$$$$$newAnnotator$$($item$$12$$) {
  return new $annotorious$mediatypes$openlayers$OpenLayersAnnotator$$($item$$12$$)
};
$annotorious$mediatypes$openlayers$OpenLayersModule$$.prototype.$supports$ = function $$annotorious$mediatypes$openlayers$OpenLayersModule$$$$$supports$$($item$$13$$) {
  return $item$$13$$ instanceof OpenLayers.Map
};
function $annotorious$mediatypes$openseadragon$Viewer$$($osdViewer$$, $annotator$$31$$) {
  this.$_osdViewer$ = $osdViewer$$;
  this.$_map_bounds$ = $goog$style$getBounds$$($osdViewer$$.element);
  this.$_popup$ = $annotator$$31$$.popup;
  $goog$style$setStyle$$(this.$_popup$.element, "z-index", 99E3);
  this.$_overlays$ = [];
  var $self$$26$$ = this;
  this.$_osdViewer$.addHandler("animation", function() {
    $self$$26$$.$_currentlyHighlightedOverlay$ && $self$$26$$.$_place_popup$()
  });
  $annotator$$31$$.addHandler("beforePopupHide", function() {
    $self$$26$$.$_lastHoveredOverlay$ == $self$$26$$.$_currentlyHighlightedOverlay$ ? $self$$26$$.$_popup$.clearHideTimer() : $self$$26$$.$_updateHighlight$($self$$26$$.$_lastHoveredOverlay$, $self$$26$$.$_currentlyHighlightedOverlay$)
  })
}
$JSCompiler_prototypeAlias$$ = $annotorious$mediatypes$openseadragon$Viewer$$.prototype;
$JSCompiler_prototypeAlias$$.$_place_popup$ = function $$JSCompiler_prototypeAlias$$$$_place_popup$$() {
  var $JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$ = this.$_osdViewer$.element, $JSCompiler_object_inline_left_7_annotation_div$$1_annotation_pos$$1$$ = this.$_currentlyHighlightedOverlay$.$outer$, $annotation_dim$$1_popup_bounds$$1$$ = $goog$style$getBounds$$($JSCompiler_object_inline_left_7_annotation_div$$1_annotation_pos$$1$$), $JSCompiler_object_inline_left_7_annotation_div$$1_annotation_pos$$1$$ = $goog$style$getRelativePosition$$($JSCompiler_object_inline_left_7_annotation_div$$1_annotation_pos$$1$$, 
  $JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$), $JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$ = $JSCompiler_object_inline_left_7_annotation_div$$1_annotation_pos$$1$$.y, $JSCompiler_object_inline_left_7_annotation_div$$1_annotation_pos$$1$$ = $JSCompiler_object_inline_left_7_annotation_div$$1_annotation_pos$$1$$.x, $JSCompiler_object_inline_width_8$$ = $annotation_dim$$1_popup_bounds$$1$$.width, $JSCompiler_object_inline_height_9$$ = $annotation_dim$$1_popup_bounds$$1$$.height, 
  $annotation_dim$$1_popup_bounds$$1$$ = $goog$style$getBounds$$(this.$_popup$.element), $JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$ = {x:$JSCompiler_object_inline_left_7_annotation_div$$1_annotation_pos$$1$$, y:$JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$ + $JSCompiler_object_inline_height_9$$ + 12};
  $goog$dom$classes$addRemove$$(this.$_popup$.element, "top-right", "top-left");
  this.$_osdViewer$.isFullPage() || ($JSCompiler_object_inline_left_7_annotation_div$$1_annotation_pos$$1$$ + $annotation_dim$$1_popup_bounds$$1$$.width > this.$_map_bounds$.width && ($goog$dom$classes$addRemove$$(this.$_popup$.element, "top-left", "top-right"), $JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$.x = $JSCompiler_object_inline_left_7_annotation_div$$1_annotation_pos$$1$$ + $JSCompiler_object_inline_width_8$$ - $annotation_dim$$1_popup_bounds$$1$$.width), 0 > $JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$.x && 
  ($JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$.x = 0), $JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$.x + $annotation_dim$$1_popup_bounds$$1$$.width > this.$_map_bounds$.width && ($JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$.x = this.$_map_bounds$.width - $annotation_dim$$1_popup_bounds$$1$$.width), $JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$.y + $annotation_dim$$1_popup_bounds$$1$$.height > this.$_map_bounds$.height && ($JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$.y = 
  this.$_map_bounds$.height - $annotation_dim$$1_popup_bounds$$1$$.height));
  this.$_popup$.setPosition($JSCompiler_object_inline_top_6_popup_pos$$1_viewportEl$$)
};
$JSCompiler_prototypeAlias$$.$_show_popup$ = function $$JSCompiler_prototypeAlias$$$$_show_popup$$($annotation$$23$$) {
  this.$_popup$.setAnnotation($annotation$$23$$);
  this.$_place_popup$();
  this.$_popup$.show()
};
$JSCompiler_prototypeAlias$$.$_updateHighlight$ = function $$JSCompiler_prototypeAlias$$$$_updateHighlight$$($new_highlight$$1$$, $previous_highlight$$1$$) {
  $new_highlight$$1$$ ? ($goog$style$setStyle$$($new_highlight$$1$$.$inner$, "border-color", "#fff000"), this.$_currentlyHighlightedOverlay$ = $new_highlight$$1$$, this.$_show_popup$($new_highlight$$1$$.$annotation$)) : delete this.$_currentlyHighlightedOverlay$;
  $previous_highlight$$1$$ && $goog$style$setStyle$$($previous_highlight$$1$$.$inner$, "border-color", "#fff")
};
$JSCompiler_prototypeAlias$$.$addAnnotation$ = function $$JSCompiler_prototypeAlias$$$$addAnnotation$$($annotation$$24$$) {
  var $geometry$$2_rect$$10$$ = $annotation$$24$$.shapes[0].geometry, $outer$$ = $goog$dom$createDom$$("div", "annotorious-ol-boxmarker-outer"), $inner$$1$$ = $goog$dom$createDom$$("div", "annotorious-ol-boxmarker-inner");
  $goog$style$setSize$$($inner$$1$$, "100%", "100%");
  $outer$$.appendChild($inner$$1$$);
  var $geometry$$2_rect$$10$$ = new OpenSeadragon.Rect($geometry$$2_rect$$10$$.x, $geometry$$2_rect$$10$$.y, $geometry$$2_rect$$10$$.width, $geometry$$2_rect$$10$$.height), $overlay$$5$$ = {$annotation$:$annotation$$24$$, $outer$:$outer$$, $inner$:$inner$$1$$}, $self$$27$$ = this;
  $goog$events$listen$$($inner$$1$$, "mouseover", function() {
    $self$$27$$.$_currentlyHighlightedOverlay$ || $self$$27$$.$_updateHighlight$($overlay$$5$$);
    $self$$27$$.$_lastHoveredOverlay$ = $overlay$$5$$
  });
  $goog$events$listen$$($inner$$1$$, "mouseout", function() {
    delete $self$$27$$.$_lastHoveredOverlay$;
    $self$$27$$.$_popup$.startHideTimer()
  });
  this.$_overlays$.push($overlay$$5$$);
  $goog$array$ARRAY_PROTOTYPE_$$.sort.call(this.$_overlays$, function($a$$33$$, $b$$28$$) {
    return $annotorious$shape$getSize$$($b$$28$$.$annotation$.shapes[0]) - $annotorious$shape$getSize$$($a$$33$$.$annotation$.shapes[0])
  } || $goog$array$defaultCompare$$);
  var $zIndex$$1$$ = 1;
  $goog$array$forEach$$(this.$_overlays$, function($overlay$$6$$) {
    $goog$style$setStyle$$($overlay$$6$$.$outer$, "z-index", $zIndex$$1$$);
    $zIndex$$1$$++
  });
  this.$_osdViewer$.drawer.addOverlay($outer$$, $geometry$$2_rect$$10$$)
};
$JSCompiler_prototypeAlias$$.$removeAnnotation$ = function $$JSCompiler_prototypeAlias$$$$removeAnnotation$$($annotation$$25$$) {
  var $overlay$$7$$ = $goog$array$find$$(this.$_overlays$, function($overlay$$8$$) {
    return $overlay$$8$$.$annotation$ == $annotation$$25$$
  });
  $overlay$$7$$ && ($goog$array$remove$$(this.$_overlays$, $overlay$$7$$), this.$_osdViewer$.drawer.removeOverlay($overlay$$7$$.$outer$))
};
$JSCompiler_prototypeAlias$$.$getAnnotations$ = function $$JSCompiler_prototypeAlias$$$$getAnnotations$$() {
  return $goog$array$map$$(this.$_overlays$, function($overlay$$9$$) {
    console.log($overlay$$9$$);
    return $overlay$$9$$.$annotation$
  })
};
$JSCompiler_prototypeAlias$$.$highlightAnnotation$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.destroy = function $$JSCompiler_prototypeAlias$$$destroy$() {
  var $that$$ = this;
  $goog$array$forEach$$(this.$_overlays$, function($overlay$$10$$) {
    $that$$.$_osdViewer$.removeOverlay($overlay$$10$$.$outer$)
  });
  this.$_overlays$ = []
};
function $annotorious$mediatypes$openseadragon$OpenSeadragonAnnotator$$($default_selector$$1_osdViewer$$1_width$$inline_793$$) {
  this.element = $default_selector$$1_osdViewer$$1_width$$inline_793$$.element;
  var $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$ = document;
  $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$.querySelectorAll && $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$.querySelector ? $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$ = $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$.querySelector(".openseadragon-container") : ($JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$ = document, 
  $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$ = ($JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$.querySelectorAll && $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$.querySelector ? $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$.querySelectorAll(".openseadragon-container") : $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$.getElementsByClassName ? 
  $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$.getElementsByClassName("openseadragon-container") : $goog$dom$getElementsByTagNameAndClass_$$())[0]);
  $goog$style$setStyle$$($JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$ || $JSCompiler_alias_NULL$$, "z-index", 0);
  this.$_osdViewer$ = $default_selector$$1_osdViewer$$1_width$$inline_793$$;
  this.$_eventBroker$ = new $annotorious$events$EventBroker$$;
  this.$_selectors$ = [];
  this.$_selectionEnabled$ = $JSCompiler_alias_TRUE$$;
  this.$_secondaryHint$ = $goog$soy$renderAsElement$$($annotorious$templates$openlayers$secondaryHint$$, {$msg$:"Click and Drag"});
  $goog$style$setOpacity$$(this.$_secondaryHint$, 0);
  this.element.appendChild(this.$_secondaryHint$);
  this.popup = new $annotorious$Popup$$(this);
  this.$_viewer$ = new $annotorious$mediatypes$openseadragon$Viewer$$($default_selector$$1_osdViewer$$1_width$$inline_793$$, this);
  this.$_editCanvas$ = $goog$soy$renderAsElement$$($annotorious$templates$image$canvas$$, {width:"0", height:"0"});
  $goog$style$showElement$$(this.$_editCanvas$, $JSCompiler_alias_FALSE$$);
  this.element.appendChild(this.$_editCanvas$);
  var $self$$28$$ = this, $default_selector$$1_osdViewer$$1_width$$inline_793$$ = parseInt($goog$style$getComputedStyle$$($self$$28$$.element, "width"), 10), $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$ = parseInt($goog$style$getComputedStyle$$($self$$28$$.element, "height"), 10);
  $goog$style$setSize$$($self$$28$$.$_editCanvas$, $default_selector$$1_osdViewer$$1_width$$inline_793$$, $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$);
  $self$$28$$.$_editCanvas$.width = $default_selector$$1_osdViewer$$1_width$$inline_793$$;
  $self$$28$$.$_editCanvas$.height = $JSCompiler_temp$$811_height$$inline_794_parent$$inline_784_parent$$inline_924$$;
  $default_selector$$1_osdViewer$$1_width$$inline_793$$ = new $annotorious$plugins$selection$RectDragSelector$$;
  $default_selector$$1_osdViewer$$1_width$$inline_793$$.init(this, this.$_editCanvas$);
  this.$_selectors$.push($default_selector$$1_osdViewer$$1_width$$inline_793$$);
  this.$_currentSelector$ = $default_selector$$1_osdViewer$$1_width$$inline_793$$;
  this.editor = new $annotorious$Editor$$(this);
  $JSCompiler_StaticMethods__attachListener$$(this, this.$_editCanvas$);
  this.$_eventBroker$.addHandler("onSelectionCompleted", function($bounds$$3_event$$36$$) {
    $bounds$$3_event$$36$$ = $bounds$$3_event$$36$$.viewportBounds;
    $self$$28$$.editor.setPosition(new $annotorious$shape$geom$Point$$($bounds$$3_event$$36$$.left, $bounds$$3_event$$36$$.bottom + 4));
    $self$$28$$.editor.open()
  });
  this.$_eventBroker$.addHandler("onSelectionCanceled", function() {
    $self$$28$$.stopSelection()
  })
}
$goog$inherits$$($annotorious$mediatypes$openseadragon$OpenSeadragonAnnotator$$, $annotorious$mediatypes$Annotator$$);
$JSCompiler_prototypeAlias$$ = $annotorious$mediatypes$openseadragon$OpenSeadragonAnnotator$$.prototype;
$JSCompiler_prototypeAlias$$.$showSelectionWidget$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$hideSelectionWidget$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.destroy = function $$JSCompiler_prototypeAlias$$$destroy$() {
  this.$_viewer$.destroy();
  delete this.$_viewer$
};
$JSCompiler_prototypeAlias$$.$activateSelector$ = function $$JSCompiler_prototypeAlias$$$$activateSelector$$($callback$$37$$) {
  $goog$style$setStyle$$(this.$_editCanvas$, "pointer-events", "auto");
  var $self$$29$$ = this;
  $goog$style$showElement$$(this.$_editCanvas$, $JSCompiler_alias_TRUE$$);
  $goog$style$setOpacity$$(this.$_secondaryHint$, 0.8);
  window.setTimeout(function() {
    $goog$style$setOpacity$$($self$$29$$.$_secondaryHint$, 0)
  }, 2E3);
  $callback$$37$$ && (this.$_stop_selection_callback$ = $callback$$37$$)
};
$JSCompiler_prototypeAlias$$.$editAnnotation$ = function $$JSCompiler_prototypeAlias$$$$editAnnotation$$($annotation$$26$$) {
  this.$_viewer$.$removeAnnotation$($annotation$$26$$);
  var $selector$$14_viewportBounds$$2$$ = this.$_currentSelector$, $self$$30$$ = this;
  if($selector$$14_viewportBounds$$2$$) {
    $goog$style$showElement$$(this.$_editCanvas$, $JSCompiler_alias_TRUE$$);
    this.$_viewer$.$highlightAnnotation$($JSCompiler_alias_VOID$$);
    var $g2d$$3$$ = this.$_editCanvas$.getContext("2d"), $viewportShape$$3$$ = $annotorious$shape$transform$$($annotation$$26$$.shapes[0], function($xy$$7$$) {
      return $self$$30$$.$fromItemCoordinates$($xy$$7$$)
    });
    $selector$$14_viewportBounds$$2$$.drawShape($g2d$$3$$, $viewportShape$$3$$);
    $selector$$14_viewportBounds$$2$$ = $annotorious$shape$getBoundingRect$$($viewportShape$$3$$).geometry;
    this.editor.setPosition(new $annotorious$shape$geom$Point$$($selector$$14_viewportBounds$$2$$.x, $selector$$14_viewportBounds$$2$$.y + $selector$$14_viewportBounds$$2$$.height + 4));
    this.editor.open($annotation$$26$$)
  }
};
$JSCompiler_prototypeAlias$$.$fromItemCoordinates$ = function $$JSCompiler_prototypeAlias$$$$fromItemCoordinates$$($itemCoords$$2_viewportOpposite_windowOpposite$$) {
  var $offset$$19$$ = $annotorious$dom$getOffset$$(this.element);
  $offset$$19$$.top += window.pageYOffset;
  $offset$$19$$.left += window.pageXOffset;
  var $viewportPoint_windowPoint$$ = new OpenSeadragon.Point($itemCoords$$2_viewportOpposite_windowOpposite$$.x, $itemCoords$$2_viewportOpposite_windowOpposite$$.y), $itemCoords$$2_viewportOpposite_windowOpposite$$ = $itemCoords$$2_viewportOpposite_windowOpposite$$.width ? new OpenSeadragon.Point($itemCoords$$2_viewportOpposite_windowOpposite$$.x + $itemCoords$$2_viewportOpposite_windowOpposite$$.width, $itemCoords$$2_viewportOpposite_windowOpposite$$.y + $itemCoords$$2_viewportOpposite_windowOpposite$$.height) : 
  $JSCompiler_alias_FALSE$$, $viewportPoint_windowPoint$$ = this.$_osdViewer$.viewport.viewportToWindowCoordinates($viewportPoint_windowPoint$$);
  return $itemCoords$$2_viewportOpposite_windowOpposite$$ ? ($itemCoords$$2_viewportOpposite_windowOpposite$$ = this.$_osdViewer$.viewport.viewportToWindowCoordinates($itemCoords$$2_viewportOpposite_windowOpposite$$), {x:$viewportPoint_windowPoint$$.x - $offset$$19$$.left, y:$viewportPoint_windowPoint$$.y - $offset$$19$$.top, width:$itemCoords$$2_viewportOpposite_windowOpposite$$.x - $viewportPoint_windowPoint$$.x + 2, height:$itemCoords$$2_viewportOpposite_windowOpposite$$.y - $viewportPoint_windowPoint$$.y + 
  2}) : $viewportPoint_windowPoint$$
};
$JSCompiler_prototypeAlias$$.$getAnnotations$ = function $$JSCompiler_prototypeAlias$$$$getAnnotations$$() {
  return this.$_viewer$.$getAnnotations$()
};
$JSCompiler_prototypeAlias$$.$getAvailableSelectors$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.getItem = function $$JSCompiler_prototypeAlias$$$getItem$() {
  return{src:"dzi://openseadragon/something"}
};
$JSCompiler_prototypeAlias$$.$setActiveSelector$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$getActiveSelector$ = $JSCompiler_get$$("$_currentSelector$");
$JSCompiler_prototypeAlias$$.$toItemCoordinates$ = function $$JSCompiler_prototypeAlias$$$$toItemCoordinates$$($viewElementOpposite_viewportOpposite$$1_xy$$8$$) {
  var $offset$$20$$ = $annotorious$dom$getOffset$$(this.element);
  $offset$$20$$.top += window.pageYOffset;
  $offset$$20$$.left += window.pageXOffset;
  var $viewElementPoint_viewportPoint$$1$$ = new OpenSeadragon.Point($viewElementOpposite_viewportOpposite$$1_xy$$8$$.x + $offset$$20$$.left, $viewElementOpposite_viewportOpposite$$1_xy$$8$$.y + $offset$$20$$.top), $viewElementOpposite_viewportOpposite$$1_xy$$8$$ = $viewElementOpposite_viewportOpposite$$1_xy$$8$$.width ? new OpenSeadragon.Point($viewElementOpposite_viewportOpposite$$1_xy$$8$$.x + $offset$$20$$.left + $viewElementOpposite_viewportOpposite$$1_xy$$8$$.width - 2, $viewElementOpposite_viewportOpposite$$1_xy$$8$$.y + 
  $offset$$20$$.top + $viewElementOpposite_viewportOpposite$$1_xy$$8$$.height - 2) : $JSCompiler_alias_FALSE$$, $viewElementPoint_viewportPoint$$1$$ = this.$_osdViewer$.viewport.windowToViewportCoordinates($viewElementPoint_viewportPoint$$1$$);
  return $viewElementOpposite_viewportOpposite$$1_xy$$8$$ ? ($viewElementOpposite_viewportOpposite$$1_xy$$8$$ = this.$_osdViewer$.viewport.windowToViewportCoordinates($viewElementOpposite_viewportOpposite$$1_xy$$8$$), {x:$viewElementPoint_viewportPoint$$1$$.x, y:$viewElementPoint_viewportPoint$$1$$.y, width:$viewElementOpposite_viewportOpposite$$1_xy$$8$$.x - $viewElementPoint_viewportPoint$$1$$.x, height:$viewElementOpposite_viewportOpposite$$1_xy$$8$$.y - $viewElementPoint_viewportPoint$$1$$.y}) : 
  $viewElementPoint_viewportPoint$$1$$
};
function $annotorious$mediatypes$openseadragon$OpenSeadragonModule$$() {
  $JSCompiler_StaticMethods__initFields$$(this)
}
$goog$inherits$$($annotorious$mediatypes$openseadragon$OpenSeadragonModule$$, $annotorious$mediatypes$Module$$);
$annotorious$mediatypes$openseadragon$OpenSeadragonModule$$.prototype.$getItemURL$ = $JSCompiler_returnArg$$("dzi://openseadragon/something");
$annotorious$mediatypes$openseadragon$OpenSeadragonModule$$.prototype.$newAnnotator$ = function $$annotorious$mediatypes$openseadragon$OpenSeadragonModule$$$$$newAnnotator$$($item$$15$$) {
  return new $annotorious$mediatypes$openseadragon$OpenSeadragonAnnotator$$($item$$15$$)
};
$annotorious$mediatypes$openseadragon$OpenSeadragonModule$$.prototype.$supports$ = function $$annotorious$mediatypes$openseadragon$OpenSeadragonModule$$$$$supports$$($item$$16$$) {
  return!$item$$16$$.id || 0 != $item$$16$$.id.indexOf("openseadragon") || !$item$$16$$.hasOwnProperty("drawer") ? $JSCompiler_alias_FALSE$$ : $JSCompiler_alias_TRUE$$
};
function $annotorious$Annotorious$$() {
  function $fn$$inline_796$$() {
    $JSCompiler_StaticMethods__init$$($self$$31$$)
  }
  this.$_isInitialized$ = $JSCompiler_alias_FALSE$$;
  this.$_modules$ = [new $annotorious$mediatypes$image$ImageModule$$];
  window.OpenLayers && this.$_modules$.push(new $annotorious$mediatypes$openlayers$OpenLayersModule$$);
  window.OpenSeadragon && this.$_modules$.push(new $annotorious$mediatypes$openseadragon$OpenSeadragonModule$$);
  this.$_plugins$ = [];
  var $self$$31$$ = this;
  window.addEventListener ? window.addEventListener("load", $fn$$inline_796$$, $JSCompiler_alias_FALSE$$) : window.attachEvent && window.attachEvent("onload", $fn$$inline_796$$)
}
function $JSCompiler_StaticMethods__init$$($JSCompiler_StaticMethods__init$self$$) {
  $JSCompiler_StaticMethods__init$self$$.$_isInitialized$ || ($goog$array$forEach$$($JSCompiler_StaticMethods__init$self$$.$_modules$, function($module$$) {
    $module$$.init()
  }), $goog$array$forEach$$($JSCompiler_StaticMethods__init$self$$.$_plugins$, function($plugin$$3$$) {
    $plugin$$3$$.initPlugin && $plugin$$3$$.initPlugin($JSCompiler_StaticMethods__init$self$$);
    $goog$array$forEach$$($JSCompiler_StaticMethods__init$self$$.$_modules$, function($module$$1$$) {
      $module$$1$$.$addPlugin$($plugin$$3$$)
    })
  }), $JSCompiler_StaticMethods__init$self$$.$_isInitialized$ = $JSCompiler_alias_TRUE$$)
}
function $JSCompiler_StaticMethods__getModuleForItemSrc$$($JSCompiler_StaticMethods__getModuleForItemSrc$self$$, $item_src$$1$$) {
  return $goog$array$find$$($JSCompiler_StaticMethods__getModuleForItemSrc$self$$.$_modules$, function($module$$2$$) {
    return $JSCompiler_StaticMethods_annotatesItem$$($module$$2$$, $item_src$$1$$)
  })
}
$JSCompiler_prototypeAlias$$ = $annotorious$Annotorious$$.prototype;
$JSCompiler_prototypeAlias$$.$activateSelector$ = function $$JSCompiler_prototypeAlias$$$$activateSelector$$($opt_item_url_or_callback$$1$$, $opt_callback$$6$$) {
  var $item_url$$6$$ = $JSCompiler_alias_VOID$$, $callback$$38$$ = $JSCompiler_alias_VOID$$;
  $goog$isString$$($opt_item_url_or_callback$$1$$) ? ($item_url$$6$$ = $opt_item_url_or_callback$$1$$, $callback$$38$$ = $opt_callback$$6$$) : $goog$isFunction$$($opt_item_url_or_callback$$1$$) && ($callback$$38$$ = $opt_item_url_or_callback$$1$$);
  if($item_url$$6$$) {
    var $module$$3$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $item_url$$6$$);
    $module$$3$$ && $module$$3$$.$activateSelector$($item_url$$6$$, $callback$$38$$)
  }else {
    $goog$array$forEach$$(this.$_modules$, function($module$$4$$) {
      $module$$4$$.$activateSelector$($callback$$38$$)
    })
  }
};
$JSCompiler_prototypeAlias$$.$addAnnotation$ = function $$JSCompiler_prototypeAlias$$$$addAnnotation$$($annotation$$27$$, $opt_replace$$4$$) {
  var $JSCompiler_inline_result$$30_module$$5_url$$inline_798$$;
  $JSCompiler_inline_result$$30_module$$5_url$$inline_798$$ = $annotation$$27$$.src;
  if(!(0 < $JSCompiler_inline_result$$30_module$$5_url$$inline_798$$.indexOf("://"))) {
    var $link$$inline_799$$ = document.createElement("a");
    $link$$inline_799$$.href = $JSCompiler_inline_result$$30_module$$5_url$$inline_798$$;
    $JSCompiler_inline_result$$30_module$$5_url$$inline_798$$ = $link$$inline_799$$.protocol + "//" + $link$$inline_799$$.host + $link$$inline_799$$.pathname
  }
  $annotation$$27$$.src = $JSCompiler_inline_result$$30_module$$5_url$$inline_798$$;
  ($JSCompiler_inline_result$$30_module$$5_url$$inline_798$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $annotation$$27$$.src)) && $JSCompiler_inline_result$$30_module$$5_url$$inline_798$$.$addAnnotation$($annotation$$27$$, $opt_replace$$4$$)
};
$JSCompiler_prototypeAlias$$.addHandler = function $$JSCompiler_prototypeAlias$$$addHandler$($type$$88$$, $handler$$14$$) {
  $goog$array$forEach$$(this.$_modules$, function($module$$6$$) {
    $module$$6$$.addHandler($type$$88$$, $handler$$14$$)
  })
};
$JSCompiler_prototypeAlias$$.$addPlugin$ = function $$JSCompiler_prototypeAlias$$$$addPlugin$$($plugin_name$$, $opt_config_options$$) {
  try {
    var $plugin$$4$$ = new window.annotorious.plugin[$plugin_name$$]($opt_config_options$$);
    "complete" == document.readyState ? ($plugin$$4$$.initPlugin && $plugin$$4$$.initPlugin(this), $goog$array$forEach$$(this.$_modules$, function($module$$7$$) {
      $module$$7$$.$addPlugin$($plugin$$4$$)
    })) : this.$_plugins$.push($plugin$$4$$)
  }catch($error$$3$$) {
    console.log("Could not load plugin: " + $plugin_name$$)
  }
};
$JSCompiler_prototypeAlias$$.destroy = function $$JSCompiler_prototypeAlias$$$destroy$($opt_item_url$$9$$) {
  if($opt_item_url$$9$$) {
    var $module$$8$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $opt_item_url$$9$$);
    $module$$8$$ && $module$$8$$.destroy($opt_item_url$$9$$)
  }else {
    $goog$array$forEach$$(this.$_modules$, function($module$$9$$) {
      $module$$9$$.destroy()
    })
  }
};
$JSCompiler_prototypeAlias$$.$getActiveSelector$ = function $$JSCompiler_prototypeAlias$$$$getActiveSelector$$($item_url$$7$$) {
  var $module$$10$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $item_url$$7$$);
  if($module$$10$$) {
    return $module$$10$$.$getActiveSelector$($item_url$$7$$)
  }
};
$JSCompiler_prototypeAlias$$.$getAnnotations$ = function $$JSCompiler_prototypeAlias$$$$getAnnotations$$($opt_item_url$$10$$) {
  if($opt_item_url$$10$$) {
    var $module$$11$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $opt_item_url$$10$$);
    return $module$$11$$ ? $module$$11$$.$getAnnotations$($opt_item_url$$10$$) : []
  }
  var $annotations$$4$$ = [];
  $goog$array$forEach$$(this.$_modules$, function($module$$12$$) {
    $goog$array$extend$$($annotations$$4$$, $module$$12$$.$getAnnotations$())
  });
  return $annotations$$4$$
};
$JSCompiler_prototypeAlias$$.$getAvailableSelectors$ = function $$JSCompiler_prototypeAlias$$$$getAvailableSelectors$$($item_url$$8$$) {
  var $module$$13$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $item_url$$8$$);
  return $module$$13$$ ? $module$$13$$.$getAvailableSelectors$($item_url$$8$$) : []
};
$JSCompiler_prototypeAlias$$.$hideAnnotations$ = function $$JSCompiler_prototypeAlias$$$$hideAnnotations$$($opt_item_url$$11$$) {
  if($opt_item_url$$11$$) {
    var $module$$14$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $opt_item_url$$11$$);
    $module$$14$$ && $module$$14$$.$hideAnnotations$($opt_item_url$$11$$)
  }else {
    $goog$array$forEach$$(this.$_modules$, function($module$$15$$) {
      $module$$15$$.$hideAnnotations$()
    })
  }
};
$JSCompiler_prototypeAlias$$.$hideSelectionWidget$ = function $$JSCompiler_prototypeAlias$$$$hideSelectionWidget$$($opt_item_url$$12$$) {
  if($opt_item_url$$12$$) {
    var $module$$16$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $opt_item_url$$12$$);
    $module$$16$$ && $module$$16$$.$hideSelectionWidget$($opt_item_url$$12$$)
  }else {
    $goog$array$forEach$$(this.$_modules$, function($module$$17$$) {
      $module$$17$$.$hideSelectionWidget$()
    })
  }
};
$JSCompiler_prototypeAlias$$.stopSelection = function $$JSCompiler_prototypeAlias$$$stopSelection$($opt_item_url$$13$$) {
  if($opt_item_url$$13$$) {
    var $module$$18$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $opt_item_url$$13$$);
    $module$$18$$ && $module$$18$$.stopSelection($opt_item_url$$13$$)
  }else {
    $goog$array$forEach$$(this.$_modules$, function($module$$19$$) {
      $module$$19$$.stopSelection()
    })
  }
};
$JSCompiler_prototypeAlias$$.$highlightAnnotation$ = function $$JSCompiler_prototypeAlias$$$$highlightAnnotation$$($annotation$$28$$) {
  if($annotation$$28$$) {
    var $module$$20$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $annotation$$28$$.src);
    $module$$20$$ && $module$$20$$.$highlightAnnotation$($annotation$$28$$)
  }else {
    $goog$array$forEach$$(this.$_modules$, function($module$$21$$) {
      $module$$21$$.$highlightAnnotation$()
    })
  }
};
$JSCompiler_prototypeAlias$$.$makeAnnotatable$ = function $$JSCompiler_prototypeAlias$$$$makeAnnotatable$$($item$$17$$) {
  $JSCompiler_StaticMethods__init$$(this);
  var $module$$22$$ = $goog$array$find$$(this.$_modules$, function($module$$23$$) {
    return $module$$23$$.$supports$($item$$17$$)
  });
  $module$$22$$ ? $module$$22$$.$makeAnnotatable$($item$$17$$) : $JSCompiler_alias_THROW$$("Error: Annotorious does not support this media type in the current version or build configuration.")
};
$JSCompiler_prototypeAlias$$.$removeAll$ = function $$JSCompiler_prototypeAlias$$$$removeAll$$($opt_item_url$$14$$) {
  var $self$$33$$ = this;
  $goog$array$forEach$$(this.$getAnnotations$($opt_item_url$$14$$), function($annotation$$29$$) {
    $self$$33$$.$removeAnnotation$($annotation$$29$$)
  })
};
$JSCompiler_prototypeAlias$$.$removeAnnotation$ = function $$JSCompiler_prototypeAlias$$$$removeAnnotation$$($annotation$$30$$) {
  var $module$$24$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $annotation$$30$$.src);
  $module$$24$$ && $module$$24$$.$removeAnnotation$($annotation$$30$$)
};
$JSCompiler_prototypeAlias$$.reset = function $$JSCompiler_prototypeAlias$$$reset$() {
  $goog$array$forEach$$(this.$_modules$, function($module$$25$$) {
    $module$$25$$.destroy();
    $module$$25$$.init()
  })
};
$JSCompiler_prototypeAlias$$.$setActiveSelector$ = function $$JSCompiler_prototypeAlias$$$$setActiveSelector$$($item_url$$9$$, $selector$$16$$) {
  var $module$$26$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $item_url$$9$$);
  $module$$26$$ && $module$$26$$.$setActiveSelector$($item_url$$9$$, $selector$$16$$)
};
$JSCompiler_prototypeAlias$$.$setProperties$ = function $$JSCompiler_prototypeAlias$$$$setProperties$$($props$$4$$) {
  $goog$array$forEach$$(this.$_modules$, function($module$$27$$) {
    $module$$27$$.$setProperties$($props$$4$$)
  })
};
$JSCompiler_prototypeAlias$$.$setSelectionEnabled$ = function $$JSCompiler_prototypeAlias$$$$setSelectionEnabled$$($enabled$$2$$) {
  $enabled$$2$$ ? this.$showSelectionWidget$($JSCompiler_alias_VOID$$) : this.$hideSelectionWidget$($JSCompiler_alias_VOID$$)
};
$JSCompiler_prototypeAlias$$.$showAnnotations$ = function $$JSCompiler_prototypeAlias$$$$showAnnotations$$($opt_item_url$$15$$) {
  if($opt_item_url$$15$$) {
    var $module$$28$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $opt_item_url$$15$$);
    $module$$28$$ && $module$$28$$.$showAnnotations$($opt_item_url$$15$$)
  }else {
    $goog$array$forEach$$(this.$_modules$, function($module$$29$$) {
      $module$$29$$.$showAnnotations$()
    })
  }
};
$JSCompiler_prototypeAlias$$.$showSelectionWidget$ = function $$JSCompiler_prototypeAlias$$$$showSelectionWidget$$($opt_item_url$$16$$) {
  if($opt_item_url$$16$$) {
    var $module$$30$$ = $JSCompiler_StaticMethods__getModuleForItemSrc$$(this, $opt_item_url$$16$$);
    $module$$30$$ && $module$$30$$.$showSelectionWidget$($opt_item_url$$16$$)
  }else {
    $goog$array$forEach$$(this.$_modules$, function($module$$31$$) {
      $module$$31$$.$showSelectionWidget$()
    })
  }
};
window.anno = new $annotorious$Annotorious$$;
$annotorious$Annotorious$$.prototype.activateSelector = $annotorious$Annotorious$$.prototype.$activateSelector$;
$annotorious$Annotorious$$.prototype.addAnnotation = $annotorious$Annotorious$$.prototype.$addAnnotation$;
$annotorious$Annotorious$$.prototype.addHandler = $annotorious$Annotorious$$.prototype.addHandler;
$annotorious$Annotorious$$.prototype.addPlugin = $annotorious$Annotorious$$.prototype.$addPlugin$;
$annotorious$Annotorious$$.prototype.destroy = $annotorious$Annotorious$$.prototype.destroy;
$annotorious$Annotorious$$.prototype.getActiveSelector = $annotorious$Annotorious$$.prototype.$getActiveSelector$;
$annotorious$Annotorious$$.prototype.getAnnotations = $annotorious$Annotorious$$.prototype.$getAnnotations$;
$annotorious$Annotorious$$.prototype.getAvailableSelectors = $annotorious$Annotorious$$.prototype.$getAvailableSelectors$;
$annotorious$Annotorious$$.prototype.hideAnnotations = $annotorious$Annotorious$$.prototype.$hideAnnotations$;
$annotorious$Annotorious$$.prototype.hideSelectionWidget = $annotorious$Annotorious$$.prototype.$hideSelectionWidget$;
$annotorious$Annotorious$$.prototype.highlightAnnotation = $annotorious$Annotorious$$.prototype.$highlightAnnotation$;
$annotorious$Annotorious$$.prototype.makeAnnotatable = $annotorious$Annotorious$$.prototype.$makeAnnotatable$;
$annotorious$Annotorious$$.prototype.removeAll = $annotorious$Annotorious$$.prototype.$removeAll$;
$annotorious$Annotorious$$.prototype.removeAnnotation = $annotorious$Annotorious$$.prototype.$removeAnnotation$;
$annotorious$Annotorious$$.prototype.reset = $annotorious$Annotorious$$.prototype.reset;
$annotorious$Annotorious$$.prototype.setActiveSelector = $annotorious$Annotorious$$.prototype.$setActiveSelector$;
$annotorious$Annotorious$$.prototype.setProperties = $annotorious$Annotorious$$.prototype.$setProperties$;
$annotorious$Annotorious$$.prototype.showAnnotations = $annotorious$Annotorious$$.prototype.$showAnnotations$;
$annotorious$Annotorious$$.prototype.showSelectionWidget = $annotorious$Annotorious$$.prototype.$showSelectionWidget$;
window.annotorious || (window.annotorious = {});
window.annotorious.plugin || (window.annotorious.plugin = {});
window.annotorious.geometry || (window.annotorious.geometry = {}, window.annotorious.geometry.expand = $annotorious$shape$expand$$, window.annotorious.geometry.getBoundingRect = $annotorious$shape$getBoundingRect$$);
$annotorious$Annotorious$$.prototype.setSelectionEnabled = $annotorious$Annotorious$$.prototype.$setSelectionEnabled$;

