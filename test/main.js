var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// ../node_modules/@vue/shared/dist/shared.cjs.prod.js
var require_shared_cjs_prod = __commonJS({
  "../node_modules/@vue/shared/dist/shared.cjs.prod.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function makeMap(str, expectsLowerCase) {
      const map = Object.create(null);
      const list = str.split(",");
      for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
      }
      return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
    }
    var PatchFlagNames = {
      [1]: `TEXT`,
      [2]: `CLASS`,
      [4]: `STYLE`,
      [8]: `PROPS`,
      [16]: `FULL_PROPS`,
      [32]: `HYDRATE_EVENTS`,
      [64]: `STABLE_FRAGMENT`,
      [128]: `KEYED_FRAGMENT`,
      [256]: `UNKEYED_FRAGMENT`,
      [512]: `NEED_PATCH`,
      [1024]: `DYNAMIC_SLOTS`,
      [2048]: `DEV_ROOT_FRAGMENT`,
      [-1]: `HOISTED`,
      [-2]: `BAIL`
    };
    var slotFlagsText = {
      [1]: "STABLE",
      [2]: "DYNAMIC",
      [3]: "FORWARDED"
    };
    var GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
    var isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
    var range = 2;
    function generateCodeFrame(source, start = 0, end = source.length) {
      let lines = source.split(/(\r?\n)/);
      const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
      lines = lines.filter((_, idx) => idx % 2 === 0);
      let count = 0;
      const res = [];
      for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
        if (count >= start) {
          for (let j = i - range; j <= i + range || end > count; j++) {
            if (j < 0 || j >= lines.length)
              continue;
            const line = j + 1;
            res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
            const lineLength = lines[j].length;
            const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
            if (j === i) {
              const pad = start - (count - (lineLength + newLineSeqLength));
              const length = Math.max(1, end > count ? lineLength - pad : end - start);
              res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
            } else if (j > i) {
              if (end > count) {
                const length = Math.max(Math.min(end - count, lineLength), 1);
                res.push(`   |  ` + "^".repeat(length));
              }
              count += lineLength + newLineSeqLength;
            }
          }
          break;
        }
      }
      return res.join("\n");
    }
    var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
    var isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
    function includeBooleanAttr(value) {
      return !!value || value === "";
    }
    var unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
    var attrValidationCache = {};
    function isSSRSafeAttrName(name) {
      if (attrValidationCache.hasOwnProperty(name)) {
        return attrValidationCache[name];
      }
      const isUnsafe = unsafeAttrCharRE.test(name);
      if (isUnsafe) {
        console.error(`unsafe attribute name: ${name}`);
      }
      return attrValidationCache[name] = !isUnsafe;
    }
    var propsToAttrMap = {
      acceptCharset: "accept-charset",
      className: "class",
      htmlFor: "for",
      httpEquiv: "http-equiv"
    };
    var isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
    var isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
    var isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
    function normalizeStyle(value) {
      if (isArray(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
          if (normalized) {
            for (const key in normalized) {
              res[key] = normalized[key];
            }
          }
        }
        return res;
      } else if (isString(value)) {
        return value;
      } else if (isObject2(value)) {
        return value;
      }
    }
    var listDelimiterRE = /;(?![^(]*\))/g;
    var propertyDelimiterRE = /:(.+)/;
    function parseStringStyle(cssText) {
      const ret = {};
      cssText.split(listDelimiterRE).forEach((item) => {
        if (item) {
          const tmp = item.split(propertyDelimiterRE);
          tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
      });
      return ret;
    }
    function stringifyStyle(styles) {
      let ret = "";
      if (!styles || isString(styles)) {
        return ret;
      }
      for (const key in styles) {
        const value = styles[key];
        const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
        if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
          ret += `${normalizedKey}:${value};`;
        }
      }
      return ret;
    }
    function normalizeClass(value) {
      let res = "";
      if (isString(value)) {
        res = value;
      } else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const normalized = normalizeClass(value[i]);
          if (normalized) {
            res += normalized + " ";
          }
        }
      } else if (isObject2(value)) {
        for (const name in value) {
          if (value[name]) {
            res += name + " ";
          }
        }
      }
      return res.trim();
    }
    function normalizeProps(props) {
      if (!props)
        return null;
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (style) {
        props.style = normalizeStyle(style);
      }
      return props;
    }
    var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
    var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
    var VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
    var isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
    var isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
    var isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
    var escapeRE = /["'&<>]/;
    function escapeHtml(string) {
      const str = "" + string;
      const match = escapeRE.exec(str);
      if (!match) {
        return str;
      }
      let html = "";
      let escaped;
      let index;
      let lastIndex = 0;
      for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
          case 34:
            escaped = "&quot;";
            break;
          case 38:
            escaped = "&amp;";
            break;
          case 39:
            escaped = "&#39;";
            break;
          case 60:
            escaped = "&lt;";
            break;
          case 62:
            escaped = "&gt;";
            break;
          default:
            continue;
        }
        if (lastIndex !== index) {
          html += str.slice(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escaped;
      }
      return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
    }
    var commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
    function escapeHtmlComment(src) {
      return src.replace(commentStripRE, "");
    }
    function looseCompareArrays(a, b) {
      if (a.length !== b.length)
        return false;
      let equal = true;
      for (let i = 0; equal && i < a.length; i++) {
        equal = looseEqual(a[i], b[i]);
      }
      return equal;
    }
    function looseEqual(a, b) {
      if (a === b)
        return true;
      let aValidType = isDate(a);
      let bValidType = isDate(b);
      if (aValidType || bValidType) {
        return aValidType && bValidType ? a.getTime() === b.getTime() : false;
      }
      aValidType = isSymbol(a);
      bValidType = isSymbol(b);
      if (aValidType || bValidType) {
        return a === b;
      }
      aValidType = isArray(a);
      bValidType = isArray(b);
      if (aValidType || bValidType) {
        return aValidType && bValidType ? looseCompareArrays(a, b) : false;
      }
      aValidType = isObject2(a);
      bValidType = isObject2(b);
      if (aValidType || bValidType) {
        if (!aValidType || !bValidType) {
          return false;
        }
        const aKeysCount = Object.keys(a).length;
        const bKeysCount = Object.keys(b).length;
        if (aKeysCount !== bKeysCount) {
          return false;
        }
        for (const key in a) {
          const aHasKey = a.hasOwnProperty(key);
          const bHasKey = b.hasOwnProperty(key);
          if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
            return false;
          }
        }
      }
      return String(a) === String(b);
    }
    function looseIndexOf(arr, val) {
      return arr.findIndex((item) => looseEqual(item, val));
    }
    var toDisplayString = (val) => {
      return isString(val) ? val : val == null ? "" : isArray(val) || isObject2(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
    };
    var replacer = (_key, val) => {
      if (val && val.__v_isRef) {
        return replacer(_key, val.value);
      } else if (isMap(val)) {
        return {
          [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
            entries[`${key} =>`] = val2;
            return entries;
          }, {})
        };
      } else if (isSet(val)) {
        return {
          [`Set(${val.size})`]: [...val.values()]
        };
      } else if (isObject2(val) && !isArray(val) && !isPlainObject(val)) {
        return String(val);
      }
      return val;
    };
    var EMPTY_OBJ = {};
    var EMPTY_ARR = [];
    var NOOP = () => {
    };
    var NO = () => false;
    var onRE = /^on[^a-z]/;
    var isOn = (key) => onRE.test(key);
    var isModelListener = (key) => key.startsWith("onUpdate:");
    var extend = Object.assign;
    var remove = (arr, el) => {
      const i = arr.indexOf(el);
      if (i > -1) {
        arr.splice(i, 1);
      }
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = (val, key) => hasOwnProperty.call(val, key);
    var isArray = Array.isArray;
    var isMap = (val) => toTypeString(val) === "[object Map]";
    var isSet = (val) => toTypeString(val) === "[object Set]";
    var isDate = (val) => toTypeString(val) === "[object Date]";
    var isFunction = (val) => typeof val === "function";
    var isString = (val) => typeof val === "string";
    var isSymbol = (val) => typeof val === "symbol";
    var isObject2 = (val) => val !== null && typeof val === "object";
    var isPromise = (val) => {
      return isObject2(val) && isFunction(val.then) && isFunction(val.catch);
    };
    var objectToString = Object.prototype.toString;
    var toTypeString = (value) => objectToString.call(value);
    var toRawType = (value) => {
      return toTypeString(value).slice(8, -1);
    };
    var isPlainObject = (val) => toTypeString(val) === "[object Object]";
    var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
    var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
    var isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
    var cacheStringFunction = (fn) => {
      const cache = Object.create(null);
      return (str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
      };
    };
    var camelizeRE = /-(\w)/g;
    var camelize = cacheStringFunction((str) => {
      return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
    });
    var hyphenateRE = /\B([A-Z])/g;
    var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
    var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
    var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
    var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
    var invokeArrayFns = (fns, arg) => {
      for (let i = 0; i < fns.length; i++) {
        fns[i](arg);
      }
    };
    var def = (obj, key, value) => {
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        value
      });
    };
    var toNumber = (val) => {
      const n = parseFloat(val);
      return isNaN(n) ? val : n;
    };
    var _globalThis;
    var getGlobalThis = () => {
      return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    };
    var identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
    function genPropsAccessExp(name) {
      return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
    }
    exports2.EMPTY_ARR = EMPTY_ARR;
    exports2.EMPTY_OBJ = EMPTY_OBJ;
    exports2.NO = NO;
    exports2.NOOP = NOOP;
    exports2.PatchFlagNames = PatchFlagNames;
    exports2.camelize = camelize;
    exports2.capitalize = capitalize;
    exports2.def = def;
    exports2.escapeHtml = escapeHtml;
    exports2.escapeHtmlComment = escapeHtmlComment;
    exports2.extend = extend;
    exports2.genPropsAccessExp = genPropsAccessExp;
    exports2.generateCodeFrame = generateCodeFrame;
    exports2.getGlobalThis = getGlobalThis;
    exports2.hasChanged = hasChanged;
    exports2.hasOwn = hasOwn;
    exports2.hyphenate = hyphenate;
    exports2.includeBooleanAttr = includeBooleanAttr;
    exports2.invokeArrayFns = invokeArrayFns;
    exports2.isArray = isArray;
    exports2.isBooleanAttr = isBooleanAttr;
    exports2.isBuiltInDirective = isBuiltInDirective;
    exports2.isDate = isDate;
    exports2.isFunction = isFunction;
    exports2.isGloballyWhitelisted = isGloballyWhitelisted;
    exports2.isHTMLTag = isHTMLTag;
    exports2.isIntegerKey = isIntegerKey;
    exports2.isKnownHtmlAttr = isKnownHtmlAttr;
    exports2.isKnownSvgAttr = isKnownSvgAttr;
    exports2.isMap = isMap;
    exports2.isModelListener = isModelListener;
    exports2.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
    exports2.isObject = isObject2;
    exports2.isOn = isOn;
    exports2.isPlainObject = isPlainObject;
    exports2.isPromise = isPromise;
    exports2.isReservedProp = isReservedProp;
    exports2.isSSRSafeAttrName = isSSRSafeAttrName;
    exports2.isSVGTag = isSVGTag;
    exports2.isSet = isSet;
    exports2.isSpecialBooleanAttr = isSpecialBooleanAttr;
    exports2.isString = isString;
    exports2.isSymbol = isSymbol;
    exports2.isVoidTag = isVoidTag;
    exports2.looseEqual = looseEqual;
    exports2.looseIndexOf = looseIndexOf;
    exports2.makeMap = makeMap;
    exports2.normalizeClass = normalizeClass;
    exports2.normalizeProps = normalizeProps;
    exports2.normalizeStyle = normalizeStyle;
    exports2.objectToString = objectToString;
    exports2.parseStringStyle = parseStringStyle;
    exports2.propsToAttrMap = propsToAttrMap;
    exports2.remove = remove;
    exports2.slotFlagsText = slotFlagsText;
    exports2.stringifyStyle = stringifyStyle;
    exports2.toDisplayString = toDisplayString;
    exports2.toHandlerKey = toHandlerKey;
    exports2.toNumber = toNumber;
    exports2.toRawType = toRawType;
    exports2.toTypeString = toTypeString;
  }
});

// ../node_modules/@vue/shared/dist/shared.cjs.js
var require_shared_cjs = __commonJS({
  "../node_modules/@vue/shared/dist/shared.cjs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function makeMap(str, expectsLowerCase) {
      const map = Object.create(null);
      const list = str.split(",");
      for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
      }
      return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
    }
    var PatchFlagNames = {
      [1]: `TEXT`,
      [2]: `CLASS`,
      [4]: `STYLE`,
      [8]: `PROPS`,
      [16]: `FULL_PROPS`,
      [32]: `HYDRATE_EVENTS`,
      [64]: `STABLE_FRAGMENT`,
      [128]: `KEYED_FRAGMENT`,
      [256]: `UNKEYED_FRAGMENT`,
      [512]: `NEED_PATCH`,
      [1024]: `DYNAMIC_SLOTS`,
      [2048]: `DEV_ROOT_FRAGMENT`,
      [-1]: `HOISTED`,
      [-2]: `BAIL`
    };
    var slotFlagsText = {
      [1]: "STABLE",
      [2]: "DYNAMIC",
      [3]: "FORWARDED"
    };
    var GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
    var isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
    var range = 2;
    function generateCodeFrame(source, start = 0, end = source.length) {
      let lines = source.split(/(\r?\n)/);
      const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
      lines = lines.filter((_, idx) => idx % 2 === 0);
      let count = 0;
      const res = [];
      for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
        if (count >= start) {
          for (let j = i - range; j <= i + range || end > count; j++) {
            if (j < 0 || j >= lines.length)
              continue;
            const line = j + 1;
            res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
            const lineLength = lines[j].length;
            const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
            if (j === i) {
              const pad = start - (count - (lineLength + newLineSeqLength));
              const length = Math.max(1, end > count ? lineLength - pad : end - start);
              res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
            } else if (j > i) {
              if (end > count) {
                const length = Math.max(Math.min(end - count, lineLength), 1);
                res.push(`   |  ` + "^".repeat(length));
              }
              count += lineLength + newLineSeqLength;
            }
          }
          break;
        }
      }
      return res.join("\n");
    }
    var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
    var isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
    function includeBooleanAttr(value) {
      return !!value || value === "";
    }
    var unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
    var attrValidationCache = {};
    function isSSRSafeAttrName(name) {
      if (attrValidationCache.hasOwnProperty(name)) {
        return attrValidationCache[name];
      }
      const isUnsafe = unsafeAttrCharRE.test(name);
      if (isUnsafe) {
        console.error(`unsafe attribute name: ${name}`);
      }
      return attrValidationCache[name] = !isUnsafe;
    }
    var propsToAttrMap = {
      acceptCharset: "accept-charset",
      className: "class",
      htmlFor: "for",
      httpEquiv: "http-equiv"
    };
    var isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
    var isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
    var isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
    function normalizeStyle(value) {
      if (isArray(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
          if (normalized) {
            for (const key in normalized) {
              res[key] = normalized[key];
            }
          }
        }
        return res;
      } else if (isString(value)) {
        return value;
      } else if (isObject2(value)) {
        return value;
      }
    }
    var listDelimiterRE = /;(?![^(]*\))/g;
    var propertyDelimiterRE = /:(.+)/;
    function parseStringStyle(cssText) {
      const ret = {};
      cssText.split(listDelimiterRE).forEach((item) => {
        if (item) {
          const tmp = item.split(propertyDelimiterRE);
          tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
      });
      return ret;
    }
    function stringifyStyle(styles) {
      let ret = "";
      if (!styles || isString(styles)) {
        return ret;
      }
      for (const key in styles) {
        const value = styles[key];
        const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
        if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
          ret += `${normalizedKey}:${value};`;
        }
      }
      return ret;
    }
    function normalizeClass(value) {
      let res = "";
      if (isString(value)) {
        res = value;
      } else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const normalized = normalizeClass(value[i]);
          if (normalized) {
            res += normalized + " ";
          }
        }
      } else if (isObject2(value)) {
        for (const name in value) {
          if (value[name]) {
            res += name + " ";
          }
        }
      }
      return res.trim();
    }
    function normalizeProps(props) {
      if (!props)
        return null;
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (style) {
        props.style = normalizeStyle(style);
      }
      return props;
    }
    var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
    var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
    var VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
    var isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
    var isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
    var isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
    var escapeRE = /["'&<>]/;
    function escapeHtml(string) {
      const str = "" + string;
      const match = escapeRE.exec(str);
      if (!match) {
        return str;
      }
      let html = "";
      let escaped;
      let index;
      let lastIndex = 0;
      for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
          case 34:
            escaped = "&quot;";
            break;
          case 38:
            escaped = "&amp;";
            break;
          case 39:
            escaped = "&#39;";
            break;
          case 60:
            escaped = "&lt;";
            break;
          case 62:
            escaped = "&gt;";
            break;
          default:
            continue;
        }
        if (lastIndex !== index) {
          html += str.slice(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escaped;
      }
      return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
    }
    var commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
    function escapeHtmlComment(src) {
      return src.replace(commentStripRE, "");
    }
    function looseCompareArrays(a, b) {
      if (a.length !== b.length)
        return false;
      let equal = true;
      for (let i = 0; equal && i < a.length; i++) {
        equal = looseEqual(a[i], b[i]);
      }
      return equal;
    }
    function looseEqual(a, b) {
      if (a === b)
        return true;
      let aValidType = isDate(a);
      let bValidType = isDate(b);
      if (aValidType || bValidType) {
        return aValidType && bValidType ? a.getTime() === b.getTime() : false;
      }
      aValidType = isSymbol(a);
      bValidType = isSymbol(b);
      if (aValidType || bValidType) {
        return a === b;
      }
      aValidType = isArray(a);
      bValidType = isArray(b);
      if (aValidType || bValidType) {
        return aValidType && bValidType ? looseCompareArrays(a, b) : false;
      }
      aValidType = isObject2(a);
      bValidType = isObject2(b);
      if (aValidType || bValidType) {
        if (!aValidType || !bValidType) {
          return false;
        }
        const aKeysCount = Object.keys(a).length;
        const bKeysCount = Object.keys(b).length;
        if (aKeysCount !== bKeysCount) {
          return false;
        }
        for (const key in a) {
          const aHasKey = a.hasOwnProperty(key);
          const bHasKey = b.hasOwnProperty(key);
          if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
            return false;
          }
        }
      }
      return String(a) === String(b);
    }
    function looseIndexOf(arr, val) {
      return arr.findIndex((item) => looseEqual(item, val));
    }
    var toDisplayString = (val) => {
      return isString(val) ? val : val == null ? "" : isArray(val) || isObject2(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
    };
    var replacer = (_key, val) => {
      if (val && val.__v_isRef) {
        return replacer(_key, val.value);
      } else if (isMap(val)) {
        return {
          [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
            entries[`${key} =>`] = val2;
            return entries;
          }, {})
        };
      } else if (isSet(val)) {
        return {
          [`Set(${val.size})`]: [...val.values()]
        };
      } else if (isObject2(val) && !isArray(val) && !isPlainObject(val)) {
        return String(val);
      }
      return val;
    };
    var EMPTY_OBJ = Object.freeze({});
    var EMPTY_ARR = Object.freeze([]);
    var NOOP = () => {
    };
    var NO = () => false;
    var onRE = /^on[^a-z]/;
    var isOn = (key) => onRE.test(key);
    var isModelListener = (key) => key.startsWith("onUpdate:");
    var extend = Object.assign;
    var remove = (arr, el) => {
      const i = arr.indexOf(el);
      if (i > -1) {
        arr.splice(i, 1);
      }
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = (val, key) => hasOwnProperty.call(val, key);
    var isArray = Array.isArray;
    var isMap = (val) => toTypeString(val) === "[object Map]";
    var isSet = (val) => toTypeString(val) === "[object Set]";
    var isDate = (val) => toTypeString(val) === "[object Date]";
    var isFunction = (val) => typeof val === "function";
    var isString = (val) => typeof val === "string";
    var isSymbol = (val) => typeof val === "symbol";
    var isObject2 = (val) => val !== null && typeof val === "object";
    var isPromise = (val) => {
      return isObject2(val) && isFunction(val.then) && isFunction(val.catch);
    };
    var objectToString = Object.prototype.toString;
    var toTypeString = (value) => objectToString.call(value);
    var toRawType = (value) => {
      return toTypeString(value).slice(8, -1);
    };
    var isPlainObject = (val) => toTypeString(val) === "[object Object]";
    var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
    var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
    var isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
    var cacheStringFunction = (fn) => {
      const cache = Object.create(null);
      return (str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
      };
    };
    var camelizeRE = /-(\w)/g;
    var camelize = cacheStringFunction((str) => {
      return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
    });
    var hyphenateRE = /\B([A-Z])/g;
    var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
    var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
    var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
    var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
    var invokeArrayFns = (fns, arg) => {
      for (let i = 0; i < fns.length; i++) {
        fns[i](arg);
      }
    };
    var def = (obj, key, value) => {
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        value
      });
    };
    var toNumber = (val) => {
      const n = parseFloat(val);
      return isNaN(n) ? val : n;
    };
    var _globalThis;
    var getGlobalThis = () => {
      return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    };
    var identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
    function genPropsAccessExp(name) {
      return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
    }
    exports2.EMPTY_ARR = EMPTY_ARR;
    exports2.EMPTY_OBJ = EMPTY_OBJ;
    exports2.NO = NO;
    exports2.NOOP = NOOP;
    exports2.PatchFlagNames = PatchFlagNames;
    exports2.camelize = camelize;
    exports2.capitalize = capitalize;
    exports2.def = def;
    exports2.escapeHtml = escapeHtml;
    exports2.escapeHtmlComment = escapeHtmlComment;
    exports2.extend = extend;
    exports2.genPropsAccessExp = genPropsAccessExp;
    exports2.generateCodeFrame = generateCodeFrame;
    exports2.getGlobalThis = getGlobalThis;
    exports2.hasChanged = hasChanged;
    exports2.hasOwn = hasOwn;
    exports2.hyphenate = hyphenate;
    exports2.includeBooleanAttr = includeBooleanAttr;
    exports2.invokeArrayFns = invokeArrayFns;
    exports2.isArray = isArray;
    exports2.isBooleanAttr = isBooleanAttr;
    exports2.isBuiltInDirective = isBuiltInDirective;
    exports2.isDate = isDate;
    exports2.isFunction = isFunction;
    exports2.isGloballyWhitelisted = isGloballyWhitelisted;
    exports2.isHTMLTag = isHTMLTag;
    exports2.isIntegerKey = isIntegerKey;
    exports2.isKnownHtmlAttr = isKnownHtmlAttr;
    exports2.isKnownSvgAttr = isKnownSvgAttr;
    exports2.isMap = isMap;
    exports2.isModelListener = isModelListener;
    exports2.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
    exports2.isObject = isObject2;
    exports2.isOn = isOn;
    exports2.isPlainObject = isPlainObject;
    exports2.isPromise = isPromise;
    exports2.isReservedProp = isReservedProp;
    exports2.isSSRSafeAttrName = isSSRSafeAttrName;
    exports2.isSVGTag = isSVGTag;
    exports2.isSet = isSet;
    exports2.isSpecialBooleanAttr = isSpecialBooleanAttr;
    exports2.isString = isString;
    exports2.isSymbol = isSymbol;
    exports2.isVoidTag = isVoidTag;
    exports2.looseEqual = looseEqual;
    exports2.looseIndexOf = looseIndexOf;
    exports2.makeMap = makeMap;
    exports2.normalizeClass = normalizeClass;
    exports2.normalizeProps = normalizeProps;
    exports2.normalizeStyle = normalizeStyle;
    exports2.objectToString = objectToString;
    exports2.parseStringStyle = parseStringStyle;
    exports2.propsToAttrMap = propsToAttrMap;
    exports2.remove = remove;
    exports2.slotFlagsText = slotFlagsText;
    exports2.stringifyStyle = stringifyStyle;
    exports2.toDisplayString = toDisplayString;
    exports2.toHandlerKey = toHandlerKey;
    exports2.toNumber = toNumber;
    exports2.toRawType = toRawType;
    exports2.toTypeString = toTypeString;
  }
});

// ../node_modules/@vue/shared/index.js
var require_shared = __commonJS({
  "../node_modules/@vue/shared/index.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_shared_cjs_prod();
    } else {
      module2.exports = require_shared_cjs();
    }
  }
});

// ../node_modules/@vue/reactivity/dist/reactivity.cjs.prod.js
var require_reactivity_cjs_prod = __commonJS({
  "../node_modules/@vue/reactivity/dist/reactivity.cjs.prod.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var shared = require_shared();
    var activeEffectScope;
    var EffectScope = class {
      constructor(detached = false) {
        this.active = true;
        this.effects = [];
        this.cleanups = [];
        if (!detached && activeEffectScope) {
          this.parent = activeEffectScope;
          this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
        }
      }
      run(fn) {
        if (this.active) {
          const currentEffectScope = activeEffectScope;
          try {
            activeEffectScope = this;
            return fn();
          } finally {
            activeEffectScope = currentEffectScope;
          }
        }
      }
      on() {
        activeEffectScope = this;
      }
      off() {
        activeEffectScope = this.parent;
      }
      stop(fromParent) {
        if (this.active) {
          let i, l;
          for (i = 0, l = this.effects.length; i < l; i++) {
            this.effects[i].stop();
          }
          for (i = 0, l = this.cleanups.length; i < l; i++) {
            this.cleanups[i]();
          }
          if (this.scopes) {
            for (i = 0, l = this.scopes.length; i < l; i++) {
              this.scopes[i].stop(true);
            }
          }
          if (this.parent && !fromParent) {
            const last = this.parent.scopes.pop();
            if (last && last !== this) {
              this.parent.scopes[this.index] = last;
              last.index = this.index;
            }
          }
          this.active = false;
        }
      }
    };
    function effectScope(detached) {
      return new EffectScope(detached);
    }
    function recordEffectScope(effect2, scope = activeEffectScope) {
      if (scope && scope.active) {
        scope.effects.push(effect2);
      }
    }
    function getCurrentScope() {
      return activeEffectScope;
    }
    function onScopeDispose(fn) {
      if (activeEffectScope) {
        activeEffectScope.cleanups.push(fn);
      }
    }
    var createDep = (effects) => {
      const dep = new Set(effects);
      dep.w = 0;
      dep.n = 0;
      return dep;
    };
    var wasTracked = (dep) => (dep.w & trackOpBit) > 0;
    var newTracked = (dep) => (dep.n & trackOpBit) > 0;
    var initDepMarkers = ({ deps }) => {
      if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
          deps[i].w |= trackOpBit;
        }
      }
    };
    var finalizeDepMarkers = (effect2) => {
      const { deps } = effect2;
      if (deps.length) {
        let ptr = 0;
        for (let i = 0; i < deps.length; i++) {
          const dep = deps[i];
          if (wasTracked(dep) && !newTracked(dep)) {
            dep.delete(effect2);
          } else {
            deps[ptr++] = dep;
          }
          dep.w &= ~trackOpBit;
          dep.n &= ~trackOpBit;
        }
        deps.length = ptr;
      }
    };
    var targetMap = new WeakMap();
    var effectTrackDepth = 0;
    var trackOpBit = 1;
    var maxMarkerBits = 30;
    var activeEffect;
    var ITERATE_KEY2 = Symbol("");
    var MAP_KEY_ITERATE_KEY = Symbol("");
    var ReactiveEffect = class {
      constructor(fn, scheduler2 = null, scope) {
        this.fn = fn;
        this.scheduler = scheduler2;
        this.active = true;
        this.deps = [];
        this.parent = void 0;
        recordEffectScope(this, scope);
      }
      run() {
        if (!this.active) {
          return this.fn();
        }
        let parent = activeEffect;
        let lastShouldTrack = shouldTrack;
        while (parent) {
          if (parent === this) {
            return;
          }
          parent = parent.parent;
        }
        try {
          this.parent = activeEffect;
          activeEffect = this;
          shouldTrack = true;
          trackOpBit = 1 << ++effectTrackDepth;
          if (effectTrackDepth <= maxMarkerBits) {
            initDepMarkers(this);
          } else {
            cleanupEffect(this);
          }
          return this.fn();
        } finally {
          if (effectTrackDepth <= maxMarkerBits) {
            finalizeDepMarkers(this);
          }
          trackOpBit = 1 << --effectTrackDepth;
          activeEffect = this.parent;
          shouldTrack = lastShouldTrack;
          this.parent = void 0;
          if (this.deferStop) {
            this.stop();
          }
        }
      }
      stop() {
        if (activeEffect === this) {
          this.deferStop = true;
        } else if (this.active) {
          cleanupEffect(this);
          if (this.onStop) {
            this.onStop();
          }
          this.active = false;
        }
      }
    };
    function cleanupEffect(effect2) {
      const { deps } = effect2;
      if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
          deps[i].delete(effect2);
        }
        deps.length = 0;
      }
    }
    function effect(fn, options) {
      if (fn.effect) {
        fn = fn.effect.fn;
      }
      const _effect = new ReactiveEffect(fn);
      if (options) {
        shared.extend(_effect, options);
        if (options.scope)
          recordEffectScope(_effect, options.scope);
      }
      if (!options || !options.lazy) {
        _effect.run();
      }
      const runner = _effect.run.bind(_effect);
      runner.effect = _effect;
      return runner;
    }
    function stop(runner) {
      runner.effect.stop();
    }
    var shouldTrack = true;
    var trackStack = [];
    function pauseTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = false;
    }
    function enableTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = true;
    }
    function resetTracking() {
      const last = trackStack.pop();
      shouldTrack = last === void 0 ? true : last;
    }
    function track2(target, type, key) {
      if (shouldTrack && activeEffect) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
          targetMap.set(target, depsMap = new Map());
        }
        let dep = depsMap.get(key);
        if (!dep) {
          depsMap.set(key, dep = createDep());
        }
        trackEffects(dep);
      }
    }
    function trackEffects(dep, debuggerEventExtraInfo) {
      let shouldTrack2 = false;
      if (effectTrackDepth <= maxMarkerBits) {
        if (!newTracked(dep)) {
          dep.n |= trackOpBit;
          shouldTrack2 = !wasTracked(dep);
        }
      } else {
        shouldTrack2 = !dep.has(activeEffect);
      }
      if (shouldTrack2) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
      }
    }
    function trigger2(target, type, key, newValue, oldValue, oldTarget) {
      const depsMap = targetMap.get(target);
      if (!depsMap) {
        return;
      }
      let deps = [];
      if (type === "clear") {
        deps = [...depsMap.values()];
      } else if (key === "length" && shared.isArray(target)) {
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 >= newValue) {
            deps.push(dep);
          }
        });
      } else {
        if (key !== void 0) {
          deps.push(depsMap.get(key));
        }
        switch (type) {
          case "add":
            if (!shared.isArray(target)) {
              deps.push(depsMap.get(ITERATE_KEY2));
              if (shared.isMap(target)) {
                deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (shared.isIntegerKey(key)) {
              deps.push(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!shared.isArray(target)) {
              deps.push(depsMap.get(ITERATE_KEY2));
              if (shared.isMap(target)) {
                deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (shared.isMap(target)) {
              deps.push(depsMap.get(ITERATE_KEY2));
            }
            break;
        }
      }
      if (deps.length === 1) {
        if (deps[0]) {
          {
            triggerEffects(deps[0]);
          }
        }
      } else {
        const effects = [];
        for (const dep of deps) {
          if (dep) {
            effects.push(...dep);
          }
        }
        {
          triggerEffects(createDep(effects));
        }
      }
    }
    function triggerEffects(dep, debuggerEventExtraInfo) {
      const effects = shared.isArray(dep) ? dep : [...dep];
      for (const effect2 of effects) {
        if (effect2.computed) {
          triggerEffect(effect2);
        }
      }
      for (const effect2 of effects) {
        if (!effect2.computed) {
          triggerEffect(effect2);
        }
      }
    }
    function triggerEffect(effect2, debuggerEventExtraInfo) {
      if (effect2 !== activeEffect || effect2.allowRecurse) {
        if (effect2.scheduler) {
          effect2.scheduler();
        } else {
          effect2.run();
        }
      }
    }
    var isNonTrackableKeys = /* @__PURE__ */ shared.makeMap(`__proto__,__v_isRef,__isVue`);
    var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(shared.isSymbol));
    var get = /* @__PURE__ */ createGetter();
    var shallowGet = /* @__PURE__ */ createGetter(false, true);
    var readonlyGet = /* @__PURE__ */ createGetter(true);
    var shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
    var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
    function createArrayInstrumentations() {
      const instrumentations = {};
      ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
        instrumentations[key] = function(...args) {
          const arr = toRaw3(this);
          for (let i = 0, l = this.length; i < l; i++) {
            track2(arr, "get", i + "");
          }
          const res = arr[key](...args);
          if (res === -1 || res === false) {
            return arr[key](...args.map(toRaw3));
          } else {
            return res;
          }
        };
      });
      ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
        instrumentations[key] = function(...args) {
          pauseTracking();
          const res = toRaw3(this)[key].apply(this, args);
          resetTracking();
          return res;
        };
      });
      return instrumentations;
    }
    function createGetter(isReadonly2 = false, shallow = false) {
      return function get2(target, key, receiver) {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_isShallow") {
          return shallow;
        } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
          return target;
        }
        const targetIsArray = shared.isArray(target);
        if (!isReadonly2 && targetIsArray && shared.hasOwn(arrayInstrumentations, key)) {
          return Reflect.get(arrayInstrumentations, key, receiver);
        }
        const res = Reflect.get(target, key, receiver);
        if (shared.isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
          return res;
        }
        if (!isReadonly2) {
          track2(target, "get", key);
        }
        if (shallow) {
          return res;
        }
        if (isRef(res)) {
          return targetIsArray && shared.isIntegerKey(key) ? res : res.value;
        }
        if (shared.isObject(res)) {
          return isReadonly2 ? readonly(res) : reactive(res);
        }
        return res;
      };
    }
    var set = /* @__PURE__ */ createSetter();
    var shallowSet = /* @__PURE__ */ createSetter(true);
    function createSetter(shallow = false) {
      return function set2(target, key, value, receiver) {
        let oldValue = target[key];
        if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
          return false;
        }
        if (!shallow) {
          if (!isShallow(value) && !isReadonly(value)) {
            oldValue = toRaw3(oldValue);
            value = toRaw3(value);
          }
          if (!shared.isArray(target) && isRef(oldValue) && !isRef(value)) {
            oldValue.value = value;
            return true;
          }
        }
        const hadKey = shared.isArray(target) && shared.isIntegerKey(key) ? Number(key) < target.length : shared.hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        if (target === toRaw3(receiver)) {
          if (!hadKey) {
            trigger2(target, "add", key, value);
          } else if (shared.hasChanged(value, oldValue)) {
            trigger2(target, "set", key, value);
          }
        }
        return result;
      };
    }
    function deleteProperty(target, key) {
      const hadKey = shared.hasOwn(target, key);
      target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger2(target, "delete", key, void 0);
      }
      return result;
    }
    function has(target, key) {
      const result = Reflect.has(target, key);
      if (!shared.isSymbol(key) || !builtInSymbols.has(key)) {
        track2(target, "has", key);
      }
      return result;
    }
    function ownKeys(target) {
      track2(target, "iterate", shared.isArray(target) ? "length" : ITERATE_KEY2);
      return Reflect.ownKeys(target);
    }
    var mutableHandlers = {
      get,
      set,
      deleteProperty,
      has,
      ownKeys
    };
    var readonlyHandlers = {
      get: readonlyGet,
      set(target, key) {
        return true;
      },
      deleteProperty(target, key) {
        return true;
      }
    };
    var shallowReactiveHandlers = /* @__PURE__ */ shared.extend({}, mutableHandlers, {
      get: shallowGet,
      set: shallowSet
    });
    var shallowReadonlyHandlers = /* @__PURE__ */ shared.extend({}, readonlyHandlers, {
      get: shallowReadonlyGet
    });
    var toShallow = (value) => value;
    var getProto = (v) => Reflect.getPrototypeOf(v);
    function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
      target = target["__v_raw"];
      const rawTarget = toRaw3(target);
      const rawKey = toRaw3(key);
      if (!isReadonly2) {
        if (key !== rawKey) {
          track2(rawTarget, "get", key);
        }
        track2(rawTarget, "get", rawKey);
      }
      const { has: has2 } = getProto(rawTarget);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      if (has2.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has2.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    }
    function has$1(key, isReadonly2 = false) {
      const target = this["__v_raw"];
      const rawTarget = toRaw3(target);
      const rawKey = toRaw3(key);
      if (!isReadonly2) {
        if (key !== rawKey) {
          track2(rawTarget, "has", key);
        }
        track2(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    }
    function size(target, isReadonly2 = false) {
      target = target["__v_raw"];
      !isReadonly2 && track2(toRaw3(target), "iterate", ITERATE_KEY2);
      return Reflect.get(target, "size", target);
    }
    function add(value) {
      value = toRaw3(value);
      const target = toRaw3(this);
      const proto = getProto(target);
      const hadKey = proto.has.call(target, value);
      if (!hadKey) {
        target.add(value);
        trigger2(target, "add", value, value);
      }
      return this;
    }
    function set$1(key, value) {
      value = toRaw3(value);
      const target = toRaw3(this);
      const { has: has2, get: get2 } = getProto(target);
      let hadKey = has2.call(target, key);
      if (!hadKey) {
        key = toRaw3(key);
        hadKey = has2.call(target, key);
      }
      const oldValue = get2.call(target, key);
      target.set(key, value);
      if (!hadKey) {
        trigger2(target, "add", key, value);
      } else if (shared.hasChanged(value, oldValue)) {
        trigger2(target, "set", key, value);
      }
      return this;
    }
    function deleteEntry(key) {
      const target = toRaw3(this);
      const { has: has2, get: get2 } = getProto(target);
      let hadKey = has2.call(target, key);
      if (!hadKey) {
        key = toRaw3(key);
        hadKey = has2.call(target, key);
      }
      get2 ? get2.call(target, key) : void 0;
      const result = target.delete(key);
      if (hadKey) {
        trigger2(target, "delete", key, void 0);
      }
      return result;
    }
    function clear() {
      const target = toRaw3(this);
      const hadItems = target.size !== 0;
      const result = target.clear();
      if (hadItems) {
        trigger2(target, "clear", void 0, void 0);
      }
      return result;
    }
    function createForEach(isReadonly2, isShallow2) {
      return function forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = toRaw3(target);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track2(rawTarget, "iterate", ITERATE_KEY2);
        return target.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      };
    }
    function createIterableMethod(method, isReadonly2, isShallow2) {
      return function(...args) {
        const target = this["__v_raw"];
        const rawTarget = toRaw3(target);
        const targetIsMap = shared.isMap(rawTarget);
        const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
        const isKeyOnly = method === "keys" && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track2(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY2);
        return {
          next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          },
          [Symbol.iterator]() {
            return this;
          }
        };
      };
    }
    function createReadonlyMethod(type) {
      return function(...args) {
        return type === "delete" ? false : this;
      };
    }
    function createInstrumentations() {
      const mutableInstrumentations2 = {
        get(key) {
          return get$1(this, key);
        },
        get size() {
          return size(this);
        },
        has: has$1,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, false)
      };
      const shallowInstrumentations2 = {
        get(key) {
          return get$1(this, key, false, true);
        },
        get size() {
          return size(this);
        },
        has: has$1,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, true)
      };
      const readonlyInstrumentations2 = {
        get(key) {
          return get$1(this, key, true);
        },
        get size() {
          return size(this, true);
        },
        has(key) {
          return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(true, false)
      };
      const shallowReadonlyInstrumentations2 = {
        get(key) {
          return get$1(this, key, true, true);
        },
        get size() {
          return size(this, true);
        },
        has(key) {
          return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(true, true)
      };
      const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
      iteratorMethods.forEach((method) => {
        mutableInstrumentations2[method] = createIterableMethod(method, false, false);
        readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
        shallowInstrumentations2[method] = createIterableMethod(method, false, true);
        shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
      });
      return [
        mutableInstrumentations2,
        readonlyInstrumentations2,
        shallowInstrumentations2,
        shallowReadonlyInstrumentations2
      ];
    }
    var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
    function createInstrumentationGetter(isReadonly2, shallow) {
      const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
      return (target, key, receiver) => {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_raw") {
          return target;
        }
        return Reflect.get(shared.hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
      };
    }
    var mutableCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, false)
    };
    var shallowCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, true)
    };
    var readonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, false)
    };
    var shallowReadonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, true)
    };
    var reactiveMap = new WeakMap();
    var shallowReactiveMap = new WeakMap();
    var readonlyMap = new WeakMap();
    var shallowReadonlyMap = new WeakMap();
    function targetTypeMap(rawType) {
      switch (rawType) {
        case "Object":
        case "Array":
          return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
          return 2;
        default:
          return 0;
      }
    }
    function getTargetType(value) {
      return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(shared.toRawType(value));
    }
    function reactive(target) {
      if (isReadonly(target)) {
        return target;
      }
      return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
    }
    function shallowReactive(target) {
      return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
    }
    function readonly(target) {
      return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
    }
    function shallowReadonly(target) {
      return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
    }
    function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
      if (!shared.isObject(target)) {
        return target;
      }
      if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
        return target;
      }
      const existingProxy = proxyMap.get(target);
      if (existingProxy) {
        return existingProxy;
      }
      const targetType = getTargetType(target);
      if (targetType === 0) {
        return target;
      }
      const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
      proxyMap.set(target, proxy);
      return proxy;
    }
    function isReactive(value) {
      if (isReadonly(value)) {
        return isReactive(value["__v_raw"]);
      }
      return !!(value && value["__v_isReactive"]);
    }
    function isReadonly(value) {
      return !!(value && value["__v_isReadonly"]);
    }
    function isShallow(value) {
      return !!(value && value["__v_isShallow"]);
    }
    function isProxy(value) {
      return isReactive(value) || isReadonly(value);
    }
    function toRaw3(observed) {
      const raw = observed && observed["__v_raw"];
      return raw ? toRaw3(raw) : observed;
    }
    function markRaw(value) {
      shared.def(value, "__v_skip", true);
      return value;
    }
    var toReactive = (value) => shared.isObject(value) ? reactive(value) : value;
    var toReadonly = (value) => shared.isObject(value) ? readonly(value) : value;
    function trackRefValue(ref2) {
      if (shouldTrack && activeEffect) {
        ref2 = toRaw3(ref2);
        {
          trackEffects(ref2.dep || (ref2.dep = createDep()));
        }
      }
    }
    function triggerRefValue(ref2, newVal) {
      ref2 = toRaw3(ref2);
      if (ref2.dep) {
        {
          triggerEffects(ref2.dep);
        }
      }
    }
    function isRef(r) {
      return !!(r && r.__v_isRef === true);
    }
    function ref(value) {
      return createRef(value, false);
    }
    function shallowRef(value) {
      return createRef(value, true);
    }
    function createRef(rawValue, shallow) {
      if (isRef(rawValue)) {
        return rawValue;
      }
      return new RefImpl(rawValue, shallow);
    }
    var RefImpl = class {
      constructor(value, __v_isShallow) {
        this.__v_isShallow = __v_isShallow;
        this.dep = void 0;
        this.__v_isRef = true;
        this._rawValue = __v_isShallow ? value : toRaw3(value);
        this._value = __v_isShallow ? value : toReactive(value);
      }
      get value() {
        trackRefValue(this);
        return this._value;
      }
      set value(newVal) {
        const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
        newVal = useDirectValue ? newVal : toRaw3(newVal);
        if (shared.hasChanged(newVal, this._rawValue)) {
          this._rawValue = newVal;
          this._value = useDirectValue ? newVal : toReactive(newVal);
          triggerRefValue(this);
        }
      }
    };
    function triggerRef(ref2) {
      triggerRefValue(ref2);
    }
    function unref(ref2) {
      return isRef(ref2) ? ref2.value : ref2;
    }
    var shallowUnwrapHandlers = {
      get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
      set: (target, key, value, receiver) => {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        } else {
          return Reflect.set(target, key, value, receiver);
        }
      }
    };
    function proxyRefs(objectWithRefs) {
      return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }
    var CustomRefImpl = class {
      constructor(factory) {
        this.dep = void 0;
        this.__v_isRef = true;
        const { get: get2, set: set2 } = factory(() => trackRefValue(this), () => triggerRefValue(this));
        this._get = get2;
        this._set = set2;
      }
      get value() {
        return this._get();
      }
      set value(newVal) {
        this._set(newVal);
      }
    };
    function customRef(factory) {
      return new CustomRefImpl(factory);
    }
    function toRefs(object) {
      const ret = shared.isArray(object) ? new Array(object.length) : {};
      for (const key in object) {
        ret[key] = toRef(object, key);
      }
      return ret;
    }
    var ObjectRefImpl = class {
      constructor(_object, _key, _defaultValue) {
        this._object = _object;
        this._key = _key;
        this._defaultValue = _defaultValue;
        this.__v_isRef = true;
      }
      get value() {
        const val = this._object[this._key];
        return val === void 0 ? this._defaultValue : val;
      }
      set value(newVal) {
        this._object[this._key] = newVal;
      }
    };
    function toRef(object, key, defaultValue) {
      const val = object[key];
      return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
    }
    var _a;
    var ComputedRefImpl = class {
      constructor(getter, _setter, isReadonly2, isSSR) {
        this._setter = _setter;
        this.dep = void 0;
        this.__v_isRef = true;
        this[_a] = false;
        this._dirty = true;
        this.effect = new ReactiveEffect(getter, () => {
          if (!this._dirty) {
            this._dirty = true;
            triggerRefValue(this);
          }
        });
        this.effect.computed = this;
        this.effect.active = this._cacheable = !isSSR;
        this["__v_isReadonly"] = isReadonly2;
      }
      get value() {
        const self2 = toRaw3(this);
        trackRefValue(self2);
        if (self2._dirty || !self2._cacheable) {
          self2._dirty = false;
          self2._value = self2.effect.run();
        }
        return self2._value;
      }
      set value(newValue) {
        this._setter(newValue);
      }
    };
    _a = "__v_isReadonly";
    function computed(getterOrOptions, debugOptions, isSSR = false) {
      let getter;
      let setter;
      const onlyGetter = shared.isFunction(getterOrOptions);
      if (onlyGetter) {
        getter = getterOrOptions;
        setter = shared.NOOP;
      } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
      }
      const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
      return cRef;
    }
    var _a$1;
    var tick = /* @__PURE__ */ Promise.resolve();
    var queue = [];
    var queued = false;
    var scheduler = (fn) => {
      queue.push(fn);
      if (!queued) {
        queued = true;
        tick.then(flush2);
      }
    };
    var flush2 = () => {
      for (let i = 0; i < queue.length; i++) {
        queue[i]();
      }
      queue.length = 0;
      queued = false;
    };
    var DeferredComputedRefImpl = class {
      constructor(getter) {
        this.dep = void 0;
        this._dirty = true;
        this.__v_isRef = true;
        this[_a$1] = true;
        let compareTarget;
        let hasCompareTarget = false;
        let scheduled = false;
        this.effect = new ReactiveEffect(getter, (computedTrigger) => {
          if (this.dep) {
            if (computedTrigger) {
              compareTarget = this._value;
              hasCompareTarget = true;
            } else if (!scheduled) {
              const valueToCompare = hasCompareTarget ? compareTarget : this._value;
              scheduled = true;
              hasCompareTarget = false;
              scheduler(() => {
                if (this.effect.active && this._get() !== valueToCompare) {
                  triggerRefValue(this);
                }
                scheduled = false;
              });
            }
            for (const e of this.dep) {
              if (e.computed instanceof DeferredComputedRefImpl) {
                e.scheduler(true);
              }
            }
          }
          this._dirty = true;
        });
        this.effect.computed = this;
      }
      _get() {
        if (this._dirty) {
          this._dirty = false;
          return this._value = this.effect.run();
        }
        return this._value;
      }
      get value() {
        trackRefValue(this);
        return toRaw3(this)._get();
      }
    };
    _a$1 = "__v_isReadonly";
    function deferredComputed(getter) {
      return new DeferredComputedRefImpl(getter);
    }
    exports2.EffectScope = EffectScope;
    exports2.ITERATE_KEY = ITERATE_KEY2;
    exports2.ReactiveEffect = ReactiveEffect;
    exports2.computed = computed;
    exports2.customRef = customRef;
    exports2.deferredComputed = deferredComputed;
    exports2.effect = effect;
    exports2.effectScope = effectScope;
    exports2.enableTracking = enableTracking;
    exports2.getCurrentScope = getCurrentScope;
    exports2.isProxy = isProxy;
    exports2.isReactive = isReactive;
    exports2.isReadonly = isReadonly;
    exports2.isRef = isRef;
    exports2.isShallow = isShallow;
    exports2.markRaw = markRaw;
    exports2.onScopeDispose = onScopeDispose;
    exports2.pauseTracking = pauseTracking;
    exports2.proxyRefs = proxyRefs;
    exports2.reactive = reactive;
    exports2.readonly = readonly;
    exports2.ref = ref;
    exports2.resetTracking = resetTracking;
    exports2.shallowReactive = shallowReactive;
    exports2.shallowReadonly = shallowReadonly;
    exports2.shallowRef = shallowRef;
    exports2.stop = stop;
    exports2.toRaw = toRaw3;
    exports2.toRef = toRef;
    exports2.toRefs = toRefs;
    exports2.track = track2;
    exports2.trigger = trigger2;
    exports2.triggerRef = triggerRef;
    exports2.unref = unref;
  }
});

// ../node_modules/@vue/reactivity/dist/reactivity.cjs.js
var require_reactivity_cjs = __commonJS({
  "../node_modules/@vue/reactivity/dist/reactivity.cjs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var shared = require_shared();
    function warn(msg, ...args) {
      console.warn(`[Vue warn] ${msg}`, ...args);
    }
    var activeEffectScope;
    var EffectScope = class {
      constructor(detached = false) {
        this.active = true;
        this.effects = [];
        this.cleanups = [];
        if (!detached && activeEffectScope) {
          this.parent = activeEffectScope;
          this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
        }
      }
      run(fn) {
        if (this.active) {
          const currentEffectScope = activeEffectScope;
          try {
            activeEffectScope = this;
            return fn();
          } finally {
            activeEffectScope = currentEffectScope;
          }
        } else {
          warn(`cannot run an inactive effect scope.`);
        }
      }
      on() {
        activeEffectScope = this;
      }
      off() {
        activeEffectScope = this.parent;
      }
      stop(fromParent) {
        if (this.active) {
          let i, l;
          for (i = 0, l = this.effects.length; i < l; i++) {
            this.effects[i].stop();
          }
          for (i = 0, l = this.cleanups.length; i < l; i++) {
            this.cleanups[i]();
          }
          if (this.scopes) {
            for (i = 0, l = this.scopes.length; i < l; i++) {
              this.scopes[i].stop(true);
            }
          }
          if (this.parent && !fromParent) {
            const last = this.parent.scopes.pop();
            if (last && last !== this) {
              this.parent.scopes[this.index] = last;
              last.index = this.index;
            }
          }
          this.active = false;
        }
      }
    };
    function effectScope(detached) {
      return new EffectScope(detached);
    }
    function recordEffectScope(effect2, scope = activeEffectScope) {
      if (scope && scope.active) {
        scope.effects.push(effect2);
      }
    }
    function getCurrentScope() {
      return activeEffectScope;
    }
    function onScopeDispose(fn) {
      if (activeEffectScope) {
        activeEffectScope.cleanups.push(fn);
      } else {
        warn(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
      }
    }
    var createDep = (effects) => {
      const dep = new Set(effects);
      dep.w = 0;
      dep.n = 0;
      return dep;
    };
    var wasTracked = (dep) => (dep.w & trackOpBit) > 0;
    var newTracked = (dep) => (dep.n & trackOpBit) > 0;
    var initDepMarkers = ({ deps }) => {
      if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
          deps[i].w |= trackOpBit;
        }
      }
    };
    var finalizeDepMarkers = (effect2) => {
      const { deps } = effect2;
      if (deps.length) {
        let ptr = 0;
        for (let i = 0; i < deps.length; i++) {
          const dep = deps[i];
          if (wasTracked(dep) && !newTracked(dep)) {
            dep.delete(effect2);
          } else {
            deps[ptr++] = dep;
          }
          dep.w &= ~trackOpBit;
          dep.n &= ~trackOpBit;
        }
        deps.length = ptr;
      }
    };
    var targetMap = new WeakMap();
    var effectTrackDepth = 0;
    var trackOpBit = 1;
    var maxMarkerBits = 30;
    var activeEffect;
    var ITERATE_KEY2 = Symbol("iterate");
    var MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
    var ReactiveEffect = class {
      constructor(fn, scheduler2 = null, scope) {
        this.fn = fn;
        this.scheduler = scheduler2;
        this.active = true;
        this.deps = [];
        this.parent = void 0;
        recordEffectScope(this, scope);
      }
      run() {
        if (!this.active) {
          return this.fn();
        }
        let parent = activeEffect;
        let lastShouldTrack = shouldTrack;
        while (parent) {
          if (parent === this) {
            return;
          }
          parent = parent.parent;
        }
        try {
          this.parent = activeEffect;
          activeEffect = this;
          shouldTrack = true;
          trackOpBit = 1 << ++effectTrackDepth;
          if (effectTrackDepth <= maxMarkerBits) {
            initDepMarkers(this);
          } else {
            cleanupEffect(this);
          }
          return this.fn();
        } finally {
          if (effectTrackDepth <= maxMarkerBits) {
            finalizeDepMarkers(this);
          }
          trackOpBit = 1 << --effectTrackDepth;
          activeEffect = this.parent;
          shouldTrack = lastShouldTrack;
          this.parent = void 0;
          if (this.deferStop) {
            this.stop();
          }
        }
      }
      stop() {
        if (activeEffect === this) {
          this.deferStop = true;
        } else if (this.active) {
          cleanupEffect(this);
          if (this.onStop) {
            this.onStop();
          }
          this.active = false;
        }
      }
    };
    function cleanupEffect(effect2) {
      const { deps } = effect2;
      if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
          deps[i].delete(effect2);
        }
        deps.length = 0;
      }
    }
    function effect(fn, options) {
      if (fn.effect) {
        fn = fn.effect.fn;
      }
      const _effect = new ReactiveEffect(fn);
      if (options) {
        shared.extend(_effect, options);
        if (options.scope)
          recordEffectScope(_effect, options.scope);
      }
      if (!options || !options.lazy) {
        _effect.run();
      }
      const runner = _effect.run.bind(_effect);
      runner.effect = _effect;
      return runner;
    }
    function stop(runner) {
      runner.effect.stop();
    }
    var shouldTrack = true;
    var trackStack = [];
    function pauseTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = false;
    }
    function enableTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = true;
    }
    function resetTracking() {
      const last = trackStack.pop();
      shouldTrack = last === void 0 ? true : last;
    }
    function track2(target, type, key) {
      if (shouldTrack && activeEffect) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
          targetMap.set(target, depsMap = new Map());
        }
        let dep = depsMap.get(key);
        if (!dep) {
          depsMap.set(key, dep = createDep());
        }
        const eventInfo = { effect: activeEffect, target, type, key };
        trackEffects(dep, eventInfo);
      }
    }
    function trackEffects(dep, debuggerEventExtraInfo) {
      let shouldTrack2 = false;
      if (effectTrackDepth <= maxMarkerBits) {
        if (!newTracked(dep)) {
          dep.n |= trackOpBit;
          shouldTrack2 = !wasTracked(dep);
        }
      } else {
        shouldTrack2 = !dep.has(activeEffect);
      }
      if (shouldTrack2) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
        if (activeEffect.onTrack) {
          activeEffect.onTrack({
            effect: activeEffect,
            ...debuggerEventExtraInfo
          });
        }
      }
    }
    function trigger2(target, type, key, newValue, oldValue, oldTarget) {
      const depsMap = targetMap.get(target);
      if (!depsMap) {
        return;
      }
      let deps = [];
      if (type === "clear") {
        deps = [...depsMap.values()];
      } else if (key === "length" && shared.isArray(target)) {
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 >= newValue) {
            deps.push(dep);
          }
        });
      } else {
        if (key !== void 0) {
          deps.push(depsMap.get(key));
        }
        switch (type) {
          case "add":
            if (!shared.isArray(target)) {
              deps.push(depsMap.get(ITERATE_KEY2));
              if (shared.isMap(target)) {
                deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (shared.isIntegerKey(key)) {
              deps.push(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!shared.isArray(target)) {
              deps.push(depsMap.get(ITERATE_KEY2));
              if (shared.isMap(target)) {
                deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (shared.isMap(target)) {
              deps.push(depsMap.get(ITERATE_KEY2));
            }
            break;
        }
      }
      const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
      if (deps.length === 1) {
        if (deps[0]) {
          {
            triggerEffects(deps[0], eventInfo);
          }
        }
      } else {
        const effects = [];
        for (const dep of deps) {
          if (dep) {
            effects.push(...dep);
          }
        }
        {
          triggerEffects(createDep(effects), eventInfo);
        }
      }
    }
    function triggerEffects(dep, debuggerEventExtraInfo) {
      const effects = shared.isArray(dep) ? dep : [...dep];
      for (const effect2 of effects) {
        if (effect2.computed) {
          triggerEffect(effect2, debuggerEventExtraInfo);
        }
      }
      for (const effect2 of effects) {
        if (!effect2.computed) {
          triggerEffect(effect2, debuggerEventExtraInfo);
        }
      }
    }
    function triggerEffect(effect2, debuggerEventExtraInfo) {
      if (effect2 !== activeEffect || effect2.allowRecurse) {
        if (effect2.onTrigger) {
          effect2.onTrigger(shared.extend({ effect: effect2 }, debuggerEventExtraInfo));
        }
        if (effect2.scheduler) {
          effect2.scheduler();
        } else {
          effect2.run();
        }
      }
    }
    var isNonTrackableKeys = /* @__PURE__ */ shared.makeMap(`__proto__,__v_isRef,__isVue`);
    var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(shared.isSymbol));
    var get = /* @__PURE__ */ createGetter();
    var shallowGet = /* @__PURE__ */ createGetter(false, true);
    var readonlyGet = /* @__PURE__ */ createGetter(true);
    var shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
    var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
    function createArrayInstrumentations() {
      const instrumentations = {};
      ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
        instrumentations[key] = function(...args) {
          const arr = toRaw3(this);
          for (let i = 0, l = this.length; i < l; i++) {
            track2(arr, "get", i + "");
          }
          const res = arr[key](...args);
          if (res === -1 || res === false) {
            return arr[key](...args.map(toRaw3));
          } else {
            return res;
          }
        };
      });
      ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
        instrumentations[key] = function(...args) {
          pauseTracking();
          const res = toRaw3(this)[key].apply(this, args);
          resetTracking();
          return res;
        };
      });
      return instrumentations;
    }
    function createGetter(isReadonly2 = false, shallow = false) {
      return function get2(target, key, receiver) {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_isShallow") {
          return shallow;
        } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
          return target;
        }
        const targetIsArray = shared.isArray(target);
        if (!isReadonly2 && targetIsArray && shared.hasOwn(arrayInstrumentations, key)) {
          return Reflect.get(arrayInstrumentations, key, receiver);
        }
        const res = Reflect.get(target, key, receiver);
        if (shared.isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
          return res;
        }
        if (!isReadonly2) {
          track2(target, "get", key);
        }
        if (shallow) {
          return res;
        }
        if (isRef(res)) {
          return targetIsArray && shared.isIntegerKey(key) ? res : res.value;
        }
        if (shared.isObject(res)) {
          return isReadonly2 ? readonly(res) : reactive(res);
        }
        return res;
      };
    }
    var set = /* @__PURE__ */ createSetter();
    var shallowSet = /* @__PURE__ */ createSetter(true);
    function createSetter(shallow = false) {
      return function set2(target, key, value, receiver) {
        let oldValue = target[key];
        if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
          return false;
        }
        if (!shallow) {
          if (!isShallow(value) && !isReadonly(value)) {
            oldValue = toRaw3(oldValue);
            value = toRaw3(value);
          }
          if (!shared.isArray(target) && isRef(oldValue) && !isRef(value)) {
            oldValue.value = value;
            return true;
          }
        }
        const hadKey = shared.isArray(target) && shared.isIntegerKey(key) ? Number(key) < target.length : shared.hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        if (target === toRaw3(receiver)) {
          if (!hadKey) {
            trigger2(target, "add", key, value);
          } else if (shared.hasChanged(value, oldValue)) {
            trigger2(target, "set", key, value, oldValue);
          }
        }
        return result;
      };
    }
    function deleteProperty(target, key) {
      const hadKey = shared.hasOwn(target, key);
      const oldValue = target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger2(target, "delete", key, void 0, oldValue);
      }
      return result;
    }
    function has(target, key) {
      const result = Reflect.has(target, key);
      if (!shared.isSymbol(key) || !builtInSymbols.has(key)) {
        track2(target, "has", key);
      }
      return result;
    }
    function ownKeys(target) {
      track2(target, "iterate", shared.isArray(target) ? "length" : ITERATE_KEY2);
      return Reflect.ownKeys(target);
    }
    var mutableHandlers = {
      get,
      set,
      deleteProperty,
      has,
      ownKeys
    };
    var readonlyHandlers = {
      get: readonlyGet,
      set(target, key) {
        {
          warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
        }
        return true;
      },
      deleteProperty(target, key) {
        {
          warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
        }
        return true;
      }
    };
    var shallowReactiveHandlers = /* @__PURE__ */ shared.extend({}, mutableHandlers, {
      get: shallowGet,
      set: shallowSet
    });
    var shallowReadonlyHandlers = /* @__PURE__ */ shared.extend({}, readonlyHandlers, {
      get: shallowReadonlyGet
    });
    var toShallow = (value) => value;
    var getProto = (v) => Reflect.getPrototypeOf(v);
    function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
      target = target["__v_raw"];
      const rawTarget = toRaw3(target);
      const rawKey = toRaw3(key);
      if (!isReadonly2) {
        if (key !== rawKey) {
          track2(rawTarget, "get", key);
        }
        track2(rawTarget, "get", rawKey);
      }
      const { has: has2 } = getProto(rawTarget);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      if (has2.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has2.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    }
    function has$1(key, isReadonly2 = false) {
      const target = this["__v_raw"];
      const rawTarget = toRaw3(target);
      const rawKey = toRaw3(key);
      if (!isReadonly2) {
        if (key !== rawKey) {
          track2(rawTarget, "has", key);
        }
        track2(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    }
    function size(target, isReadonly2 = false) {
      target = target["__v_raw"];
      !isReadonly2 && track2(toRaw3(target), "iterate", ITERATE_KEY2);
      return Reflect.get(target, "size", target);
    }
    function add(value) {
      value = toRaw3(value);
      const target = toRaw3(this);
      const proto = getProto(target);
      const hadKey = proto.has.call(target, value);
      if (!hadKey) {
        target.add(value);
        trigger2(target, "add", value, value);
      }
      return this;
    }
    function set$1(key, value) {
      value = toRaw3(value);
      const target = toRaw3(this);
      const { has: has2, get: get2 } = getProto(target);
      let hadKey = has2.call(target, key);
      if (!hadKey) {
        key = toRaw3(key);
        hadKey = has2.call(target, key);
      } else {
        checkIdentityKeys(target, has2, key);
      }
      const oldValue = get2.call(target, key);
      target.set(key, value);
      if (!hadKey) {
        trigger2(target, "add", key, value);
      } else if (shared.hasChanged(value, oldValue)) {
        trigger2(target, "set", key, value, oldValue);
      }
      return this;
    }
    function deleteEntry(key) {
      const target = toRaw3(this);
      const { has: has2, get: get2 } = getProto(target);
      let hadKey = has2.call(target, key);
      if (!hadKey) {
        key = toRaw3(key);
        hadKey = has2.call(target, key);
      } else {
        checkIdentityKeys(target, has2, key);
      }
      const oldValue = get2 ? get2.call(target, key) : void 0;
      const result = target.delete(key);
      if (hadKey) {
        trigger2(target, "delete", key, void 0, oldValue);
      }
      return result;
    }
    function clear() {
      const target = toRaw3(this);
      const hadItems = target.size !== 0;
      const oldTarget = shared.isMap(target) ? new Map(target) : new Set(target);
      const result = target.clear();
      if (hadItems) {
        trigger2(target, "clear", void 0, void 0, oldTarget);
      }
      return result;
    }
    function createForEach(isReadonly2, isShallow2) {
      return function forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = toRaw3(target);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track2(rawTarget, "iterate", ITERATE_KEY2);
        return target.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      };
    }
    function createIterableMethod(method, isReadonly2, isShallow2) {
      return function(...args) {
        const target = this["__v_raw"];
        const rawTarget = toRaw3(target);
        const targetIsMap = shared.isMap(rawTarget);
        const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
        const isKeyOnly = method === "keys" && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track2(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY2);
        return {
          next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          },
          [Symbol.iterator]() {
            return this;
          }
        };
      };
    }
    function createReadonlyMethod(type) {
      return function(...args) {
        {
          const key = args[0] ? `on key "${args[0]}" ` : ``;
          console.warn(`${shared.capitalize(type)} operation ${key}failed: target is readonly.`, toRaw3(this));
        }
        return type === "delete" ? false : this;
      };
    }
    function createInstrumentations() {
      const mutableInstrumentations2 = {
        get(key) {
          return get$1(this, key);
        },
        get size() {
          return size(this);
        },
        has: has$1,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, false)
      };
      const shallowInstrumentations2 = {
        get(key) {
          return get$1(this, key, false, true);
        },
        get size() {
          return size(this);
        },
        has: has$1,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, true)
      };
      const readonlyInstrumentations2 = {
        get(key) {
          return get$1(this, key, true);
        },
        get size() {
          return size(this, true);
        },
        has(key) {
          return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(true, false)
      };
      const shallowReadonlyInstrumentations2 = {
        get(key) {
          return get$1(this, key, true, true);
        },
        get size() {
          return size(this, true);
        },
        has(key) {
          return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(true, true)
      };
      const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
      iteratorMethods.forEach((method) => {
        mutableInstrumentations2[method] = createIterableMethod(method, false, false);
        readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
        shallowInstrumentations2[method] = createIterableMethod(method, false, true);
        shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
      });
      return [
        mutableInstrumentations2,
        readonlyInstrumentations2,
        shallowInstrumentations2,
        shallowReadonlyInstrumentations2
      ];
    }
    var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
    function createInstrumentationGetter(isReadonly2, shallow) {
      const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
      return (target, key, receiver) => {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_raw") {
          return target;
        }
        return Reflect.get(shared.hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
      };
    }
    var mutableCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, false)
    };
    var shallowCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, true)
    };
    var readonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, false)
    };
    var shallowReadonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, true)
    };
    function checkIdentityKeys(target, has2, key) {
      const rawKey = toRaw3(key);
      if (rawKey !== key && has2.call(target, rawKey)) {
        const type = shared.toRawType(target);
        console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
      }
    }
    var reactiveMap = new WeakMap();
    var shallowReactiveMap = new WeakMap();
    var readonlyMap = new WeakMap();
    var shallowReadonlyMap = new WeakMap();
    function targetTypeMap(rawType) {
      switch (rawType) {
        case "Object":
        case "Array":
          return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
          return 2;
        default:
          return 0;
      }
    }
    function getTargetType(value) {
      return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(shared.toRawType(value));
    }
    function reactive(target) {
      if (isReadonly(target)) {
        return target;
      }
      return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
    }
    function shallowReactive(target) {
      return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
    }
    function readonly(target) {
      return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
    }
    function shallowReadonly(target) {
      return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
    }
    function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
      if (!shared.isObject(target)) {
        {
          console.warn(`value cannot be made reactive: ${String(target)}`);
        }
        return target;
      }
      if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
        return target;
      }
      const existingProxy = proxyMap.get(target);
      if (existingProxy) {
        return existingProxy;
      }
      const targetType = getTargetType(target);
      if (targetType === 0) {
        return target;
      }
      const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
      proxyMap.set(target, proxy);
      return proxy;
    }
    function isReactive(value) {
      if (isReadonly(value)) {
        return isReactive(value["__v_raw"]);
      }
      return !!(value && value["__v_isReactive"]);
    }
    function isReadonly(value) {
      return !!(value && value["__v_isReadonly"]);
    }
    function isShallow(value) {
      return !!(value && value["__v_isShallow"]);
    }
    function isProxy(value) {
      return isReactive(value) || isReadonly(value);
    }
    function toRaw3(observed) {
      const raw = observed && observed["__v_raw"];
      return raw ? toRaw3(raw) : observed;
    }
    function markRaw(value) {
      shared.def(value, "__v_skip", true);
      return value;
    }
    var toReactive = (value) => shared.isObject(value) ? reactive(value) : value;
    var toReadonly = (value) => shared.isObject(value) ? readonly(value) : value;
    function trackRefValue(ref2) {
      if (shouldTrack && activeEffect) {
        ref2 = toRaw3(ref2);
        {
          trackEffects(ref2.dep || (ref2.dep = createDep()), {
            target: ref2,
            type: "get",
            key: "value"
          });
        }
      }
    }
    function triggerRefValue(ref2, newVal) {
      ref2 = toRaw3(ref2);
      if (ref2.dep) {
        {
          triggerEffects(ref2.dep, {
            target: ref2,
            type: "set",
            key: "value",
            newValue: newVal
          });
        }
      }
    }
    function isRef(r) {
      return !!(r && r.__v_isRef === true);
    }
    function ref(value) {
      return createRef(value, false);
    }
    function shallowRef(value) {
      return createRef(value, true);
    }
    function createRef(rawValue, shallow) {
      if (isRef(rawValue)) {
        return rawValue;
      }
      return new RefImpl(rawValue, shallow);
    }
    var RefImpl = class {
      constructor(value, __v_isShallow) {
        this.__v_isShallow = __v_isShallow;
        this.dep = void 0;
        this.__v_isRef = true;
        this._rawValue = __v_isShallow ? value : toRaw3(value);
        this._value = __v_isShallow ? value : toReactive(value);
      }
      get value() {
        trackRefValue(this);
        return this._value;
      }
      set value(newVal) {
        const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
        newVal = useDirectValue ? newVal : toRaw3(newVal);
        if (shared.hasChanged(newVal, this._rawValue)) {
          this._rawValue = newVal;
          this._value = useDirectValue ? newVal : toReactive(newVal);
          triggerRefValue(this, newVal);
        }
      }
    };
    function triggerRef(ref2) {
      triggerRefValue(ref2, ref2.value);
    }
    function unref(ref2) {
      return isRef(ref2) ? ref2.value : ref2;
    }
    var shallowUnwrapHandlers = {
      get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
      set: (target, key, value, receiver) => {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        } else {
          return Reflect.set(target, key, value, receiver);
        }
      }
    };
    function proxyRefs(objectWithRefs) {
      return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }
    var CustomRefImpl = class {
      constructor(factory) {
        this.dep = void 0;
        this.__v_isRef = true;
        const { get: get2, set: set2 } = factory(() => trackRefValue(this), () => triggerRefValue(this));
        this._get = get2;
        this._set = set2;
      }
      get value() {
        return this._get();
      }
      set value(newVal) {
        this._set(newVal);
      }
    };
    function customRef(factory) {
      return new CustomRefImpl(factory);
    }
    function toRefs(object) {
      if (!isProxy(object)) {
        console.warn(`toRefs() expects a reactive object but received a plain one.`);
      }
      const ret = shared.isArray(object) ? new Array(object.length) : {};
      for (const key in object) {
        ret[key] = toRef(object, key);
      }
      return ret;
    }
    var ObjectRefImpl = class {
      constructor(_object, _key, _defaultValue) {
        this._object = _object;
        this._key = _key;
        this._defaultValue = _defaultValue;
        this.__v_isRef = true;
      }
      get value() {
        const val = this._object[this._key];
        return val === void 0 ? this._defaultValue : val;
      }
      set value(newVal) {
        this._object[this._key] = newVal;
      }
    };
    function toRef(object, key, defaultValue) {
      const val = object[key];
      return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
    }
    var _a;
    var ComputedRefImpl = class {
      constructor(getter, _setter, isReadonly2, isSSR) {
        this._setter = _setter;
        this.dep = void 0;
        this.__v_isRef = true;
        this[_a] = false;
        this._dirty = true;
        this.effect = new ReactiveEffect(getter, () => {
          if (!this._dirty) {
            this._dirty = true;
            triggerRefValue(this);
          }
        });
        this.effect.computed = this;
        this.effect.active = this._cacheable = !isSSR;
        this["__v_isReadonly"] = isReadonly2;
      }
      get value() {
        const self2 = toRaw3(this);
        trackRefValue(self2);
        if (self2._dirty || !self2._cacheable) {
          self2._dirty = false;
          self2._value = self2.effect.run();
        }
        return self2._value;
      }
      set value(newValue) {
        this._setter(newValue);
      }
    };
    _a = "__v_isReadonly";
    function computed(getterOrOptions, debugOptions, isSSR = false) {
      let getter;
      let setter;
      const onlyGetter = shared.isFunction(getterOrOptions);
      if (onlyGetter) {
        getter = getterOrOptions;
        setter = () => {
          console.warn("Write operation failed: computed value is readonly");
        };
      } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
      }
      const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
      if (debugOptions && !isSSR) {
        cRef.effect.onTrack = debugOptions.onTrack;
        cRef.effect.onTrigger = debugOptions.onTrigger;
      }
      return cRef;
    }
    var _a$1;
    var tick = /* @__PURE__ */ Promise.resolve();
    var queue = [];
    var queued = false;
    var scheduler = (fn) => {
      queue.push(fn);
      if (!queued) {
        queued = true;
        tick.then(flush2);
      }
    };
    var flush2 = () => {
      for (let i = 0; i < queue.length; i++) {
        queue[i]();
      }
      queue.length = 0;
      queued = false;
    };
    var DeferredComputedRefImpl = class {
      constructor(getter) {
        this.dep = void 0;
        this._dirty = true;
        this.__v_isRef = true;
        this[_a$1] = true;
        let compareTarget;
        let hasCompareTarget = false;
        let scheduled = false;
        this.effect = new ReactiveEffect(getter, (computedTrigger) => {
          if (this.dep) {
            if (computedTrigger) {
              compareTarget = this._value;
              hasCompareTarget = true;
            } else if (!scheduled) {
              const valueToCompare = hasCompareTarget ? compareTarget : this._value;
              scheduled = true;
              hasCompareTarget = false;
              scheduler(() => {
                if (this.effect.active && this._get() !== valueToCompare) {
                  triggerRefValue(this);
                }
                scheduled = false;
              });
            }
            for (const e of this.dep) {
              if (e.computed instanceof DeferredComputedRefImpl) {
                e.scheduler(true);
              }
            }
          }
          this._dirty = true;
        });
        this.effect.computed = this;
      }
      _get() {
        if (this._dirty) {
          this._dirty = false;
          return this._value = this.effect.run();
        }
        return this._value;
      }
      get value() {
        trackRefValue(this);
        return toRaw3(this)._get();
      }
    };
    _a$1 = "__v_isReadonly";
    function deferredComputed(getter) {
      return new DeferredComputedRefImpl(getter);
    }
    exports2.EffectScope = EffectScope;
    exports2.ITERATE_KEY = ITERATE_KEY2;
    exports2.ReactiveEffect = ReactiveEffect;
    exports2.computed = computed;
    exports2.customRef = customRef;
    exports2.deferredComputed = deferredComputed;
    exports2.effect = effect;
    exports2.effectScope = effectScope;
    exports2.enableTracking = enableTracking;
    exports2.getCurrentScope = getCurrentScope;
    exports2.isProxy = isProxy;
    exports2.isReactive = isReactive;
    exports2.isReadonly = isReadonly;
    exports2.isRef = isRef;
    exports2.isShallow = isShallow;
    exports2.markRaw = markRaw;
    exports2.onScopeDispose = onScopeDispose;
    exports2.pauseTracking = pauseTracking;
    exports2.proxyRefs = proxyRefs;
    exports2.reactive = reactive;
    exports2.readonly = readonly;
    exports2.ref = ref;
    exports2.resetTracking = resetTracking;
    exports2.shallowReactive = shallowReactive;
    exports2.shallowReadonly = shallowReadonly;
    exports2.shallowRef = shallowRef;
    exports2.stop = stop;
    exports2.toRaw = toRaw3;
    exports2.toRef = toRef;
    exports2.toRefs = toRefs;
    exports2.track = track2;
    exports2.trigger = trigger2;
    exports2.triggerRef = triggerRef;
    exports2.unref = unref;
  }
});

// ../node_modules/@vue/reactivity/index.js
var require_reactivity = __commonJS({
  "../node_modules/@vue/reactivity/index.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_reactivity_cjs_prod();
    } else {
      module2.exports = require_reactivity_cjs();
    }
  }
});

// ../node_modules/@vue/runtime-core/node_modules/@vue/shared/dist/shared.cjs.prod.js
var require_shared_cjs_prod2 = __commonJS({
  "../node_modules/@vue/runtime-core/node_modules/@vue/shared/dist/shared.cjs.prod.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function makeMap(str, expectsLowerCase) {
      const map = Object.create(null);
      const list = str.split(",");
      for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
      }
      return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
    }
    var PatchFlagNames = {
      [1]: `TEXT`,
      [2]: `CLASS`,
      [4]: `STYLE`,
      [8]: `PROPS`,
      [16]: `FULL_PROPS`,
      [32]: `HYDRATE_EVENTS`,
      [64]: `STABLE_FRAGMENT`,
      [128]: `KEYED_FRAGMENT`,
      [256]: `UNKEYED_FRAGMENT`,
      [512]: `NEED_PATCH`,
      [1024]: `DYNAMIC_SLOTS`,
      [2048]: `DEV_ROOT_FRAGMENT`,
      [-1]: `HOISTED`,
      [-2]: `BAIL`
    };
    var slotFlagsText = {
      [1]: "STABLE",
      [2]: "DYNAMIC",
      [3]: "FORWARDED"
    };
    var GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
    var isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
    var range = 2;
    function generateCodeFrame(source, start = 0, end = source.length) {
      let lines = source.split(/(\r?\n)/);
      const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
      lines = lines.filter((_, idx) => idx % 2 === 0);
      let count = 0;
      const res = [];
      for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
        if (count >= start) {
          for (let j = i - range; j <= i + range || end > count; j++) {
            if (j < 0 || j >= lines.length)
              continue;
            const line = j + 1;
            res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
            const lineLength = lines[j].length;
            const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
            if (j === i) {
              const pad = start - (count - (lineLength + newLineSeqLength));
              const length = Math.max(1, end > count ? lineLength - pad : end - start);
              res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
            } else if (j > i) {
              if (end > count) {
                const length = Math.max(Math.min(end - count, lineLength), 1);
                res.push(`   |  ` + "^".repeat(length));
              }
              count += lineLength + newLineSeqLength;
            }
          }
          break;
        }
      }
      return res.join("\n");
    }
    var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
    var isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
    function includeBooleanAttr(value) {
      return !!value || value === "";
    }
    var unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
    var attrValidationCache = {};
    function isSSRSafeAttrName(name) {
      if (attrValidationCache.hasOwnProperty(name)) {
        return attrValidationCache[name];
      }
      const isUnsafe = unsafeAttrCharRE.test(name);
      if (isUnsafe) {
        console.error(`unsafe attribute name: ${name}`);
      }
      return attrValidationCache[name] = !isUnsafe;
    }
    var propsToAttrMap = {
      acceptCharset: "accept-charset",
      className: "class",
      htmlFor: "for",
      httpEquiv: "http-equiv"
    };
    var isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
    var isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
    var isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
    function normalizeStyle(value) {
      if (isArray(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
          if (normalized) {
            for (const key in normalized) {
              res[key] = normalized[key];
            }
          }
        }
        return res;
      } else if (isString(value)) {
        return value;
      } else if (isObject2(value)) {
        return value;
      }
    }
    var listDelimiterRE = /;(?![^(]*\))/g;
    var propertyDelimiterRE = /:(.+)/;
    function parseStringStyle(cssText) {
      const ret = {};
      cssText.split(listDelimiterRE).forEach((item) => {
        if (item) {
          const tmp = item.split(propertyDelimiterRE);
          tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
      });
      return ret;
    }
    function stringifyStyle(styles) {
      let ret = "";
      if (!styles || isString(styles)) {
        return ret;
      }
      for (const key in styles) {
        const value = styles[key];
        const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
        if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
          ret += `${normalizedKey}:${value};`;
        }
      }
      return ret;
    }
    function normalizeClass(value) {
      let res = "";
      if (isString(value)) {
        res = value;
      } else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const normalized = normalizeClass(value[i]);
          if (normalized) {
            res += normalized + " ";
          }
        }
      } else if (isObject2(value)) {
        for (const name in value) {
          if (value[name]) {
            res += name + " ";
          }
        }
      }
      return res.trim();
    }
    function normalizeProps(props) {
      if (!props)
        return null;
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (style) {
        props.style = normalizeStyle(style);
      }
      return props;
    }
    var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
    var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
    var VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
    var isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
    var isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
    var isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
    var escapeRE = /["'&<>]/;
    function escapeHtml(string) {
      const str = "" + string;
      const match = escapeRE.exec(str);
      if (!match) {
        return str;
      }
      let html = "";
      let escaped;
      let index;
      let lastIndex = 0;
      for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
          case 34:
            escaped = "&quot;";
            break;
          case 38:
            escaped = "&amp;";
            break;
          case 39:
            escaped = "&#39;";
            break;
          case 60:
            escaped = "&lt;";
            break;
          case 62:
            escaped = "&gt;";
            break;
          default:
            continue;
        }
        if (lastIndex !== index) {
          html += str.slice(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escaped;
      }
      return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
    }
    var commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
    function escapeHtmlComment(src) {
      return src.replace(commentStripRE, "");
    }
    function looseCompareArrays(a, b) {
      if (a.length !== b.length)
        return false;
      let equal = true;
      for (let i = 0; equal && i < a.length; i++) {
        equal = looseEqual(a[i], b[i]);
      }
      return equal;
    }
    function looseEqual(a, b) {
      if (a === b)
        return true;
      let aValidType = isDate(a);
      let bValidType = isDate(b);
      if (aValidType || bValidType) {
        return aValidType && bValidType ? a.getTime() === b.getTime() : false;
      }
      aValidType = isSymbol(a);
      bValidType = isSymbol(b);
      if (aValidType || bValidType) {
        return a === b;
      }
      aValidType = isArray(a);
      bValidType = isArray(b);
      if (aValidType || bValidType) {
        return aValidType && bValidType ? looseCompareArrays(a, b) : false;
      }
      aValidType = isObject2(a);
      bValidType = isObject2(b);
      if (aValidType || bValidType) {
        if (!aValidType || !bValidType) {
          return false;
        }
        const aKeysCount = Object.keys(a).length;
        const bKeysCount = Object.keys(b).length;
        if (aKeysCount !== bKeysCount) {
          return false;
        }
        for (const key in a) {
          const aHasKey = a.hasOwnProperty(key);
          const bHasKey = b.hasOwnProperty(key);
          if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
            return false;
          }
        }
      }
      return String(a) === String(b);
    }
    function looseIndexOf(arr, val) {
      return arr.findIndex((item) => looseEqual(item, val));
    }
    var toDisplayString = (val) => {
      return isString(val) ? val : val == null ? "" : isArray(val) || isObject2(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
    };
    var replacer = (_key, val) => {
      if (val && val.__v_isRef) {
        return replacer(_key, val.value);
      } else if (isMap(val)) {
        return {
          [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
            entries[`${key} =>`] = val2;
            return entries;
          }, {})
        };
      } else if (isSet(val)) {
        return {
          [`Set(${val.size})`]: [...val.values()]
        };
      } else if (isObject2(val) && !isArray(val) && !isPlainObject(val)) {
        return String(val);
      }
      return val;
    };
    var EMPTY_OBJ = {};
    var EMPTY_ARR = [];
    var NOOP = () => {
    };
    var NO = () => false;
    var onRE = /^on[^a-z]/;
    var isOn = (key) => onRE.test(key);
    var isModelListener = (key) => key.startsWith("onUpdate:");
    var extend = Object.assign;
    var remove = (arr, el) => {
      const i = arr.indexOf(el);
      if (i > -1) {
        arr.splice(i, 1);
      }
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = (val, key) => hasOwnProperty.call(val, key);
    var isArray = Array.isArray;
    var isMap = (val) => toTypeString(val) === "[object Map]";
    var isSet = (val) => toTypeString(val) === "[object Set]";
    var isDate = (val) => toTypeString(val) === "[object Date]";
    var isFunction = (val) => typeof val === "function";
    var isString = (val) => typeof val === "string";
    var isSymbol = (val) => typeof val === "symbol";
    var isObject2 = (val) => val !== null && typeof val === "object";
    var isPromise = (val) => {
      return isObject2(val) && isFunction(val.then) && isFunction(val.catch);
    };
    var objectToString = Object.prototype.toString;
    var toTypeString = (value) => objectToString.call(value);
    var toRawType = (value) => {
      return toTypeString(value).slice(8, -1);
    };
    var isPlainObject = (val) => toTypeString(val) === "[object Object]";
    var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
    var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
    var isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
    var cacheStringFunction = (fn) => {
      const cache = Object.create(null);
      return (str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
      };
    };
    var camelizeRE = /-(\w)/g;
    var camelize = cacheStringFunction((str) => {
      return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
    });
    var hyphenateRE = /\B([A-Z])/g;
    var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
    var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
    var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
    var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
    var invokeArrayFns = (fns, arg) => {
      for (let i = 0; i < fns.length; i++) {
        fns[i](arg);
      }
    };
    var def = (obj, key, value) => {
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        value
      });
    };
    var toNumber = (val) => {
      const n = parseFloat(val);
      return isNaN(n) ? val : n;
    };
    var _globalThis;
    var getGlobalThis = () => {
      return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    };
    var identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
    function genPropsAccessExp(name) {
      return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
    }
    exports2.EMPTY_ARR = EMPTY_ARR;
    exports2.EMPTY_OBJ = EMPTY_OBJ;
    exports2.NO = NO;
    exports2.NOOP = NOOP;
    exports2.PatchFlagNames = PatchFlagNames;
    exports2.camelize = camelize;
    exports2.capitalize = capitalize;
    exports2.def = def;
    exports2.escapeHtml = escapeHtml;
    exports2.escapeHtmlComment = escapeHtmlComment;
    exports2.extend = extend;
    exports2.genPropsAccessExp = genPropsAccessExp;
    exports2.generateCodeFrame = generateCodeFrame;
    exports2.getGlobalThis = getGlobalThis;
    exports2.hasChanged = hasChanged;
    exports2.hasOwn = hasOwn;
    exports2.hyphenate = hyphenate;
    exports2.includeBooleanAttr = includeBooleanAttr;
    exports2.invokeArrayFns = invokeArrayFns;
    exports2.isArray = isArray;
    exports2.isBooleanAttr = isBooleanAttr;
    exports2.isBuiltInDirective = isBuiltInDirective;
    exports2.isDate = isDate;
    exports2.isFunction = isFunction;
    exports2.isGloballyWhitelisted = isGloballyWhitelisted;
    exports2.isHTMLTag = isHTMLTag;
    exports2.isIntegerKey = isIntegerKey;
    exports2.isKnownHtmlAttr = isKnownHtmlAttr;
    exports2.isKnownSvgAttr = isKnownSvgAttr;
    exports2.isMap = isMap;
    exports2.isModelListener = isModelListener;
    exports2.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
    exports2.isObject = isObject2;
    exports2.isOn = isOn;
    exports2.isPlainObject = isPlainObject;
    exports2.isPromise = isPromise;
    exports2.isReservedProp = isReservedProp;
    exports2.isSSRSafeAttrName = isSSRSafeAttrName;
    exports2.isSVGTag = isSVGTag;
    exports2.isSet = isSet;
    exports2.isSpecialBooleanAttr = isSpecialBooleanAttr;
    exports2.isString = isString;
    exports2.isSymbol = isSymbol;
    exports2.isVoidTag = isVoidTag;
    exports2.looseEqual = looseEqual;
    exports2.looseIndexOf = looseIndexOf;
    exports2.makeMap = makeMap;
    exports2.normalizeClass = normalizeClass;
    exports2.normalizeProps = normalizeProps;
    exports2.normalizeStyle = normalizeStyle;
    exports2.objectToString = objectToString;
    exports2.parseStringStyle = parseStringStyle;
    exports2.propsToAttrMap = propsToAttrMap;
    exports2.remove = remove;
    exports2.slotFlagsText = slotFlagsText;
    exports2.stringifyStyle = stringifyStyle;
    exports2.toDisplayString = toDisplayString;
    exports2.toHandlerKey = toHandlerKey;
    exports2.toNumber = toNumber;
    exports2.toRawType = toRawType;
    exports2.toTypeString = toTypeString;
  }
});

// ../node_modules/@vue/runtime-core/node_modules/@vue/shared/dist/shared.cjs.js
var require_shared_cjs2 = __commonJS({
  "../node_modules/@vue/runtime-core/node_modules/@vue/shared/dist/shared.cjs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function makeMap(str, expectsLowerCase) {
      const map = Object.create(null);
      const list = str.split(",");
      for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
      }
      return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
    }
    var PatchFlagNames = {
      [1]: `TEXT`,
      [2]: `CLASS`,
      [4]: `STYLE`,
      [8]: `PROPS`,
      [16]: `FULL_PROPS`,
      [32]: `HYDRATE_EVENTS`,
      [64]: `STABLE_FRAGMENT`,
      [128]: `KEYED_FRAGMENT`,
      [256]: `UNKEYED_FRAGMENT`,
      [512]: `NEED_PATCH`,
      [1024]: `DYNAMIC_SLOTS`,
      [2048]: `DEV_ROOT_FRAGMENT`,
      [-1]: `HOISTED`,
      [-2]: `BAIL`
    };
    var slotFlagsText = {
      [1]: "STABLE",
      [2]: "DYNAMIC",
      [3]: "FORWARDED"
    };
    var GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
    var isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
    var range = 2;
    function generateCodeFrame(source, start = 0, end = source.length) {
      let lines = source.split(/(\r?\n)/);
      const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
      lines = lines.filter((_, idx) => idx % 2 === 0);
      let count = 0;
      const res = [];
      for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
        if (count >= start) {
          for (let j = i - range; j <= i + range || end > count; j++) {
            if (j < 0 || j >= lines.length)
              continue;
            const line = j + 1;
            res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
            const lineLength = lines[j].length;
            const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
            if (j === i) {
              const pad = start - (count - (lineLength + newLineSeqLength));
              const length = Math.max(1, end > count ? lineLength - pad : end - start);
              res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
            } else if (j > i) {
              if (end > count) {
                const length = Math.max(Math.min(end - count, lineLength), 1);
                res.push(`   |  ` + "^".repeat(length));
              }
              count += lineLength + newLineSeqLength;
            }
          }
          break;
        }
      }
      return res.join("\n");
    }
    var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
    var isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
    function includeBooleanAttr(value) {
      return !!value || value === "";
    }
    var unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
    var attrValidationCache = {};
    function isSSRSafeAttrName(name) {
      if (attrValidationCache.hasOwnProperty(name)) {
        return attrValidationCache[name];
      }
      const isUnsafe = unsafeAttrCharRE.test(name);
      if (isUnsafe) {
        console.error(`unsafe attribute name: ${name}`);
      }
      return attrValidationCache[name] = !isUnsafe;
    }
    var propsToAttrMap = {
      acceptCharset: "accept-charset",
      className: "class",
      htmlFor: "for",
      httpEquiv: "http-equiv"
    };
    var isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
    var isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
    var isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
    function normalizeStyle(value) {
      if (isArray(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
          if (normalized) {
            for (const key in normalized) {
              res[key] = normalized[key];
            }
          }
        }
        return res;
      } else if (isString(value)) {
        return value;
      } else if (isObject2(value)) {
        return value;
      }
    }
    var listDelimiterRE = /;(?![^(]*\))/g;
    var propertyDelimiterRE = /:(.+)/;
    function parseStringStyle(cssText) {
      const ret = {};
      cssText.split(listDelimiterRE).forEach((item) => {
        if (item) {
          const tmp = item.split(propertyDelimiterRE);
          tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
      });
      return ret;
    }
    function stringifyStyle(styles) {
      let ret = "";
      if (!styles || isString(styles)) {
        return ret;
      }
      for (const key in styles) {
        const value = styles[key];
        const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
        if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
          ret += `${normalizedKey}:${value};`;
        }
      }
      return ret;
    }
    function normalizeClass(value) {
      let res = "";
      if (isString(value)) {
        res = value;
      } else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const normalized = normalizeClass(value[i]);
          if (normalized) {
            res += normalized + " ";
          }
        }
      } else if (isObject2(value)) {
        for (const name in value) {
          if (value[name]) {
            res += name + " ";
          }
        }
      }
      return res.trim();
    }
    function normalizeProps(props) {
      if (!props)
        return null;
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (style) {
        props.style = normalizeStyle(style);
      }
      return props;
    }
    var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
    var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
    var VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
    var isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
    var isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
    var isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
    var escapeRE = /["'&<>]/;
    function escapeHtml(string) {
      const str = "" + string;
      const match = escapeRE.exec(str);
      if (!match) {
        return str;
      }
      let html = "";
      let escaped;
      let index;
      let lastIndex = 0;
      for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
          case 34:
            escaped = "&quot;";
            break;
          case 38:
            escaped = "&amp;";
            break;
          case 39:
            escaped = "&#39;";
            break;
          case 60:
            escaped = "&lt;";
            break;
          case 62:
            escaped = "&gt;";
            break;
          default:
            continue;
        }
        if (lastIndex !== index) {
          html += str.slice(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escaped;
      }
      return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
    }
    var commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
    function escapeHtmlComment(src) {
      return src.replace(commentStripRE, "");
    }
    function looseCompareArrays(a, b) {
      if (a.length !== b.length)
        return false;
      let equal = true;
      for (let i = 0; equal && i < a.length; i++) {
        equal = looseEqual(a[i], b[i]);
      }
      return equal;
    }
    function looseEqual(a, b) {
      if (a === b)
        return true;
      let aValidType = isDate(a);
      let bValidType = isDate(b);
      if (aValidType || bValidType) {
        return aValidType && bValidType ? a.getTime() === b.getTime() : false;
      }
      aValidType = isSymbol(a);
      bValidType = isSymbol(b);
      if (aValidType || bValidType) {
        return a === b;
      }
      aValidType = isArray(a);
      bValidType = isArray(b);
      if (aValidType || bValidType) {
        return aValidType && bValidType ? looseCompareArrays(a, b) : false;
      }
      aValidType = isObject2(a);
      bValidType = isObject2(b);
      if (aValidType || bValidType) {
        if (!aValidType || !bValidType) {
          return false;
        }
        const aKeysCount = Object.keys(a).length;
        const bKeysCount = Object.keys(b).length;
        if (aKeysCount !== bKeysCount) {
          return false;
        }
        for (const key in a) {
          const aHasKey = a.hasOwnProperty(key);
          const bHasKey = b.hasOwnProperty(key);
          if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
            return false;
          }
        }
      }
      return String(a) === String(b);
    }
    function looseIndexOf(arr, val) {
      return arr.findIndex((item) => looseEqual(item, val));
    }
    var toDisplayString = (val) => {
      return isString(val) ? val : val == null ? "" : isArray(val) || isObject2(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
    };
    var replacer = (_key, val) => {
      if (val && val.__v_isRef) {
        return replacer(_key, val.value);
      } else if (isMap(val)) {
        return {
          [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
            entries[`${key} =>`] = val2;
            return entries;
          }, {})
        };
      } else if (isSet(val)) {
        return {
          [`Set(${val.size})`]: [...val.values()]
        };
      } else if (isObject2(val) && !isArray(val) && !isPlainObject(val)) {
        return String(val);
      }
      return val;
    };
    var EMPTY_OBJ = Object.freeze({});
    var EMPTY_ARR = Object.freeze([]);
    var NOOP = () => {
    };
    var NO = () => false;
    var onRE = /^on[^a-z]/;
    var isOn = (key) => onRE.test(key);
    var isModelListener = (key) => key.startsWith("onUpdate:");
    var extend = Object.assign;
    var remove = (arr, el) => {
      const i = arr.indexOf(el);
      if (i > -1) {
        arr.splice(i, 1);
      }
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = (val, key) => hasOwnProperty.call(val, key);
    var isArray = Array.isArray;
    var isMap = (val) => toTypeString(val) === "[object Map]";
    var isSet = (val) => toTypeString(val) === "[object Set]";
    var isDate = (val) => toTypeString(val) === "[object Date]";
    var isFunction = (val) => typeof val === "function";
    var isString = (val) => typeof val === "string";
    var isSymbol = (val) => typeof val === "symbol";
    var isObject2 = (val) => val !== null && typeof val === "object";
    var isPromise = (val) => {
      return isObject2(val) && isFunction(val.then) && isFunction(val.catch);
    };
    var objectToString = Object.prototype.toString;
    var toTypeString = (value) => objectToString.call(value);
    var toRawType = (value) => {
      return toTypeString(value).slice(8, -1);
    };
    var isPlainObject = (val) => toTypeString(val) === "[object Object]";
    var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
    var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
    var isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
    var cacheStringFunction = (fn) => {
      const cache = Object.create(null);
      return (str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
      };
    };
    var camelizeRE = /-(\w)/g;
    var camelize = cacheStringFunction((str) => {
      return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
    });
    var hyphenateRE = /\B([A-Z])/g;
    var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
    var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
    var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
    var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
    var invokeArrayFns = (fns, arg) => {
      for (let i = 0; i < fns.length; i++) {
        fns[i](arg);
      }
    };
    var def = (obj, key, value) => {
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        value
      });
    };
    var toNumber = (val) => {
      const n = parseFloat(val);
      return isNaN(n) ? val : n;
    };
    var _globalThis;
    var getGlobalThis = () => {
      return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    };
    var identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
    function genPropsAccessExp(name) {
      return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
    }
    exports2.EMPTY_ARR = EMPTY_ARR;
    exports2.EMPTY_OBJ = EMPTY_OBJ;
    exports2.NO = NO;
    exports2.NOOP = NOOP;
    exports2.PatchFlagNames = PatchFlagNames;
    exports2.camelize = camelize;
    exports2.capitalize = capitalize;
    exports2.def = def;
    exports2.escapeHtml = escapeHtml;
    exports2.escapeHtmlComment = escapeHtmlComment;
    exports2.extend = extend;
    exports2.genPropsAccessExp = genPropsAccessExp;
    exports2.generateCodeFrame = generateCodeFrame;
    exports2.getGlobalThis = getGlobalThis;
    exports2.hasChanged = hasChanged;
    exports2.hasOwn = hasOwn;
    exports2.hyphenate = hyphenate;
    exports2.includeBooleanAttr = includeBooleanAttr;
    exports2.invokeArrayFns = invokeArrayFns;
    exports2.isArray = isArray;
    exports2.isBooleanAttr = isBooleanAttr;
    exports2.isBuiltInDirective = isBuiltInDirective;
    exports2.isDate = isDate;
    exports2.isFunction = isFunction;
    exports2.isGloballyWhitelisted = isGloballyWhitelisted;
    exports2.isHTMLTag = isHTMLTag;
    exports2.isIntegerKey = isIntegerKey;
    exports2.isKnownHtmlAttr = isKnownHtmlAttr;
    exports2.isKnownSvgAttr = isKnownSvgAttr;
    exports2.isMap = isMap;
    exports2.isModelListener = isModelListener;
    exports2.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
    exports2.isObject = isObject2;
    exports2.isOn = isOn;
    exports2.isPlainObject = isPlainObject;
    exports2.isPromise = isPromise;
    exports2.isReservedProp = isReservedProp;
    exports2.isSSRSafeAttrName = isSSRSafeAttrName;
    exports2.isSVGTag = isSVGTag;
    exports2.isSet = isSet;
    exports2.isSpecialBooleanAttr = isSpecialBooleanAttr;
    exports2.isString = isString;
    exports2.isSymbol = isSymbol;
    exports2.isVoidTag = isVoidTag;
    exports2.looseEqual = looseEqual;
    exports2.looseIndexOf = looseIndexOf;
    exports2.makeMap = makeMap;
    exports2.normalizeClass = normalizeClass;
    exports2.normalizeProps = normalizeProps;
    exports2.normalizeStyle = normalizeStyle;
    exports2.objectToString = objectToString;
    exports2.parseStringStyle = parseStringStyle;
    exports2.propsToAttrMap = propsToAttrMap;
    exports2.remove = remove;
    exports2.slotFlagsText = slotFlagsText;
    exports2.stringifyStyle = stringifyStyle;
    exports2.toDisplayString = toDisplayString;
    exports2.toHandlerKey = toHandlerKey;
    exports2.toNumber = toNumber;
    exports2.toRawType = toRawType;
    exports2.toTypeString = toTypeString;
  }
});

// ../node_modules/@vue/runtime-core/node_modules/@vue/shared/index.js
var require_shared2 = __commonJS({
  "../node_modules/@vue/runtime-core/node_modules/@vue/shared/index.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_shared_cjs_prod2();
    } else {
      module2.exports = require_shared_cjs2();
    }
  }
});

// ../node_modules/@vue/runtime-core/node_modules/@vue/reactivity/dist/reactivity.cjs.prod.js
var require_reactivity_cjs_prod2 = __commonJS({
  "../node_modules/@vue/runtime-core/node_modules/@vue/reactivity/dist/reactivity.cjs.prod.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var shared = require_shared2();
    var activeEffectScope;
    var EffectScope = class {
      constructor(detached = false) {
        this.detached = detached;
        this.active = true;
        this.effects = [];
        this.cleanups = [];
        this.parent = activeEffectScope;
        if (!detached && activeEffectScope) {
          this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
        }
      }
      run(fn) {
        if (this.active) {
          const currentEffectScope = activeEffectScope;
          try {
            activeEffectScope = this;
            return fn();
          } finally {
            activeEffectScope = currentEffectScope;
          }
        }
      }
      on() {
        activeEffectScope = this;
      }
      off() {
        activeEffectScope = this.parent;
      }
      stop(fromParent) {
        if (this.active) {
          let i, l;
          for (i = 0, l = this.effects.length; i < l; i++) {
            this.effects[i].stop();
          }
          for (i = 0, l = this.cleanups.length; i < l; i++) {
            this.cleanups[i]();
          }
          if (this.scopes) {
            for (i = 0, l = this.scopes.length; i < l; i++) {
              this.scopes[i].stop(true);
            }
          }
          if (!this.detached && this.parent && !fromParent) {
            const last = this.parent.scopes.pop();
            if (last && last !== this) {
              this.parent.scopes[this.index] = last;
              last.index = this.index;
            }
          }
          this.parent = void 0;
          this.active = false;
        }
      }
    };
    function effectScope(detached) {
      return new EffectScope(detached);
    }
    function recordEffectScope(effect2, scope = activeEffectScope) {
      if (scope && scope.active) {
        scope.effects.push(effect2);
      }
    }
    function getCurrentScope() {
      return activeEffectScope;
    }
    function onScopeDispose(fn) {
      if (activeEffectScope) {
        activeEffectScope.cleanups.push(fn);
      }
    }
    var createDep = (effects) => {
      const dep = new Set(effects);
      dep.w = 0;
      dep.n = 0;
      return dep;
    };
    var wasTracked = (dep) => (dep.w & trackOpBit) > 0;
    var newTracked = (dep) => (dep.n & trackOpBit) > 0;
    var initDepMarkers = ({ deps }) => {
      if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
          deps[i].w |= trackOpBit;
        }
      }
    };
    var finalizeDepMarkers = (effect2) => {
      const { deps } = effect2;
      if (deps.length) {
        let ptr = 0;
        for (let i = 0; i < deps.length; i++) {
          const dep = deps[i];
          if (wasTracked(dep) && !newTracked(dep)) {
            dep.delete(effect2);
          } else {
            deps[ptr++] = dep;
          }
          dep.w &= ~trackOpBit;
          dep.n &= ~trackOpBit;
        }
        deps.length = ptr;
      }
    };
    var targetMap = new WeakMap();
    var effectTrackDepth = 0;
    var trackOpBit = 1;
    var maxMarkerBits = 30;
    var activeEffect;
    var ITERATE_KEY2 = Symbol("");
    var MAP_KEY_ITERATE_KEY = Symbol("");
    var ReactiveEffect = class {
      constructor(fn, scheduler2 = null, scope) {
        this.fn = fn;
        this.scheduler = scheduler2;
        this.active = true;
        this.deps = [];
        this.parent = void 0;
        recordEffectScope(this, scope);
      }
      run() {
        if (!this.active) {
          return this.fn();
        }
        let parent = activeEffect;
        let lastShouldTrack = shouldTrack;
        while (parent) {
          if (parent === this) {
            return;
          }
          parent = parent.parent;
        }
        try {
          this.parent = activeEffect;
          activeEffect = this;
          shouldTrack = true;
          trackOpBit = 1 << ++effectTrackDepth;
          if (effectTrackDepth <= maxMarkerBits) {
            initDepMarkers(this);
          } else {
            cleanupEffect(this);
          }
          return this.fn();
        } finally {
          if (effectTrackDepth <= maxMarkerBits) {
            finalizeDepMarkers(this);
          }
          trackOpBit = 1 << --effectTrackDepth;
          activeEffect = this.parent;
          shouldTrack = lastShouldTrack;
          this.parent = void 0;
          if (this.deferStop) {
            this.stop();
          }
        }
      }
      stop() {
        if (activeEffect === this) {
          this.deferStop = true;
        } else if (this.active) {
          cleanupEffect(this);
          if (this.onStop) {
            this.onStop();
          }
          this.active = false;
        }
      }
    };
    function cleanupEffect(effect2) {
      const { deps } = effect2;
      if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
          deps[i].delete(effect2);
        }
        deps.length = 0;
      }
    }
    function effect(fn, options) {
      if (fn.effect) {
        fn = fn.effect.fn;
      }
      const _effect = new ReactiveEffect(fn);
      if (options) {
        shared.extend(_effect, options);
        if (options.scope)
          recordEffectScope(_effect, options.scope);
      }
      if (!options || !options.lazy) {
        _effect.run();
      }
      const runner = _effect.run.bind(_effect);
      runner.effect = _effect;
      return runner;
    }
    function stop(runner) {
      runner.effect.stop();
    }
    var shouldTrack = true;
    var trackStack = [];
    function pauseTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = false;
    }
    function enableTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = true;
    }
    function resetTracking() {
      const last = trackStack.pop();
      shouldTrack = last === void 0 ? true : last;
    }
    function track2(target, type, key) {
      if (shouldTrack && activeEffect) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
          targetMap.set(target, depsMap = new Map());
        }
        let dep = depsMap.get(key);
        if (!dep) {
          depsMap.set(key, dep = createDep());
        }
        trackEffects(dep);
      }
    }
    function trackEffects(dep, debuggerEventExtraInfo) {
      let shouldTrack2 = false;
      if (effectTrackDepth <= maxMarkerBits) {
        if (!newTracked(dep)) {
          dep.n |= trackOpBit;
          shouldTrack2 = !wasTracked(dep);
        }
      } else {
        shouldTrack2 = !dep.has(activeEffect);
      }
      if (shouldTrack2) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
      }
    }
    function trigger2(target, type, key, newValue, oldValue, oldTarget) {
      const depsMap = targetMap.get(target);
      if (!depsMap) {
        return;
      }
      let deps = [];
      if (type === "clear") {
        deps = [...depsMap.values()];
      } else if (key === "length" && shared.isArray(target)) {
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 >= newValue) {
            deps.push(dep);
          }
        });
      } else {
        if (key !== void 0) {
          deps.push(depsMap.get(key));
        }
        switch (type) {
          case "add":
            if (!shared.isArray(target)) {
              deps.push(depsMap.get(ITERATE_KEY2));
              if (shared.isMap(target)) {
                deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (shared.isIntegerKey(key)) {
              deps.push(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!shared.isArray(target)) {
              deps.push(depsMap.get(ITERATE_KEY2));
              if (shared.isMap(target)) {
                deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (shared.isMap(target)) {
              deps.push(depsMap.get(ITERATE_KEY2));
            }
            break;
        }
      }
      if (deps.length === 1) {
        if (deps[0]) {
          {
            triggerEffects(deps[0]);
          }
        }
      } else {
        const effects = [];
        for (const dep of deps) {
          if (dep) {
            effects.push(...dep);
          }
        }
        {
          triggerEffects(createDep(effects));
        }
      }
    }
    function triggerEffects(dep, debuggerEventExtraInfo) {
      const effects = shared.isArray(dep) ? dep : [...dep];
      for (const effect2 of effects) {
        if (effect2.computed) {
          triggerEffect(effect2);
        }
      }
      for (const effect2 of effects) {
        if (!effect2.computed) {
          triggerEffect(effect2);
        }
      }
    }
    function triggerEffect(effect2, debuggerEventExtraInfo) {
      if (effect2 !== activeEffect || effect2.allowRecurse) {
        if (effect2.scheduler) {
          effect2.scheduler();
        } else {
          effect2.run();
        }
      }
    }
    var isNonTrackableKeys = /* @__PURE__ */ shared.makeMap(`__proto__,__v_isRef,__isVue`);
    var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(shared.isSymbol));
    var get = /* @__PURE__ */ createGetter();
    var shallowGet = /* @__PURE__ */ createGetter(false, true);
    var readonlyGet = /* @__PURE__ */ createGetter(true);
    var shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
    var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
    function createArrayInstrumentations() {
      const instrumentations = {};
      ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
        instrumentations[key] = function(...args) {
          const arr = toRaw3(this);
          for (let i = 0, l = this.length; i < l; i++) {
            track2(arr, "get", i + "");
          }
          const res = arr[key](...args);
          if (res === -1 || res === false) {
            return arr[key](...args.map(toRaw3));
          } else {
            return res;
          }
        };
      });
      ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
        instrumentations[key] = function(...args) {
          pauseTracking();
          const res = toRaw3(this)[key].apply(this, args);
          resetTracking();
          return res;
        };
      });
      return instrumentations;
    }
    function createGetter(isReadonly2 = false, shallow = false) {
      return function get2(target, key, receiver) {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_isShallow") {
          return shallow;
        } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
          return target;
        }
        const targetIsArray = shared.isArray(target);
        if (!isReadonly2 && targetIsArray && shared.hasOwn(arrayInstrumentations, key)) {
          return Reflect.get(arrayInstrumentations, key, receiver);
        }
        const res = Reflect.get(target, key, receiver);
        if (shared.isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
          return res;
        }
        if (!isReadonly2) {
          track2(target, "get", key);
        }
        if (shallow) {
          return res;
        }
        if (isRef(res)) {
          return targetIsArray && shared.isIntegerKey(key) ? res : res.value;
        }
        if (shared.isObject(res)) {
          return isReadonly2 ? readonly(res) : reactive(res);
        }
        return res;
      };
    }
    var set = /* @__PURE__ */ createSetter();
    var shallowSet = /* @__PURE__ */ createSetter(true);
    function createSetter(shallow = false) {
      return function set2(target, key, value, receiver) {
        let oldValue = target[key];
        if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
          return false;
        }
        if (!shallow) {
          if (!isShallow(value) && !isReadonly(value)) {
            oldValue = toRaw3(oldValue);
            value = toRaw3(value);
          }
          if (!shared.isArray(target) && isRef(oldValue) && !isRef(value)) {
            oldValue.value = value;
            return true;
          }
        }
        const hadKey = shared.isArray(target) && shared.isIntegerKey(key) ? Number(key) < target.length : shared.hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        if (target === toRaw3(receiver)) {
          if (!hadKey) {
            trigger2(target, "add", key, value);
          } else if (shared.hasChanged(value, oldValue)) {
            trigger2(target, "set", key, value);
          }
        }
        return result;
      };
    }
    function deleteProperty(target, key) {
      const hadKey = shared.hasOwn(target, key);
      target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger2(target, "delete", key, void 0);
      }
      return result;
    }
    function has(target, key) {
      const result = Reflect.has(target, key);
      if (!shared.isSymbol(key) || !builtInSymbols.has(key)) {
        track2(target, "has", key);
      }
      return result;
    }
    function ownKeys(target) {
      track2(target, "iterate", shared.isArray(target) ? "length" : ITERATE_KEY2);
      return Reflect.ownKeys(target);
    }
    var mutableHandlers = {
      get,
      set,
      deleteProperty,
      has,
      ownKeys
    };
    var readonlyHandlers = {
      get: readonlyGet,
      set(target, key) {
        return true;
      },
      deleteProperty(target, key) {
        return true;
      }
    };
    var shallowReactiveHandlers = /* @__PURE__ */ shared.extend({}, mutableHandlers, {
      get: shallowGet,
      set: shallowSet
    });
    var shallowReadonlyHandlers = /* @__PURE__ */ shared.extend({}, readonlyHandlers, {
      get: shallowReadonlyGet
    });
    var toShallow = (value) => value;
    var getProto = (v) => Reflect.getPrototypeOf(v);
    function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
      target = target["__v_raw"];
      const rawTarget = toRaw3(target);
      const rawKey = toRaw3(key);
      if (!isReadonly2) {
        if (key !== rawKey) {
          track2(rawTarget, "get", key);
        }
        track2(rawTarget, "get", rawKey);
      }
      const { has: has2 } = getProto(rawTarget);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      if (has2.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has2.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    }
    function has$1(key, isReadonly2 = false) {
      const target = this["__v_raw"];
      const rawTarget = toRaw3(target);
      const rawKey = toRaw3(key);
      if (!isReadonly2) {
        if (key !== rawKey) {
          track2(rawTarget, "has", key);
        }
        track2(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    }
    function size(target, isReadonly2 = false) {
      target = target["__v_raw"];
      !isReadonly2 && track2(toRaw3(target), "iterate", ITERATE_KEY2);
      return Reflect.get(target, "size", target);
    }
    function add(value) {
      value = toRaw3(value);
      const target = toRaw3(this);
      const proto = getProto(target);
      const hadKey = proto.has.call(target, value);
      if (!hadKey) {
        target.add(value);
        trigger2(target, "add", value, value);
      }
      return this;
    }
    function set$1(key, value) {
      value = toRaw3(value);
      const target = toRaw3(this);
      const { has: has2, get: get2 } = getProto(target);
      let hadKey = has2.call(target, key);
      if (!hadKey) {
        key = toRaw3(key);
        hadKey = has2.call(target, key);
      }
      const oldValue = get2.call(target, key);
      target.set(key, value);
      if (!hadKey) {
        trigger2(target, "add", key, value);
      } else if (shared.hasChanged(value, oldValue)) {
        trigger2(target, "set", key, value);
      }
      return this;
    }
    function deleteEntry(key) {
      const target = toRaw3(this);
      const { has: has2, get: get2 } = getProto(target);
      let hadKey = has2.call(target, key);
      if (!hadKey) {
        key = toRaw3(key);
        hadKey = has2.call(target, key);
      }
      get2 ? get2.call(target, key) : void 0;
      const result = target.delete(key);
      if (hadKey) {
        trigger2(target, "delete", key, void 0);
      }
      return result;
    }
    function clear() {
      const target = toRaw3(this);
      const hadItems = target.size !== 0;
      const result = target.clear();
      if (hadItems) {
        trigger2(target, "clear", void 0, void 0);
      }
      return result;
    }
    function createForEach(isReadonly2, isShallow2) {
      return function forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = toRaw3(target);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track2(rawTarget, "iterate", ITERATE_KEY2);
        return target.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      };
    }
    function createIterableMethod(method, isReadonly2, isShallow2) {
      return function(...args) {
        const target = this["__v_raw"];
        const rawTarget = toRaw3(target);
        const targetIsMap = shared.isMap(rawTarget);
        const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
        const isKeyOnly = method === "keys" && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track2(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY2);
        return {
          next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          },
          [Symbol.iterator]() {
            return this;
          }
        };
      };
    }
    function createReadonlyMethod(type) {
      return function(...args) {
        return type === "delete" ? false : this;
      };
    }
    function createInstrumentations() {
      const mutableInstrumentations2 = {
        get(key) {
          return get$1(this, key);
        },
        get size() {
          return size(this);
        },
        has: has$1,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, false)
      };
      const shallowInstrumentations2 = {
        get(key) {
          return get$1(this, key, false, true);
        },
        get size() {
          return size(this);
        },
        has: has$1,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, true)
      };
      const readonlyInstrumentations2 = {
        get(key) {
          return get$1(this, key, true);
        },
        get size() {
          return size(this, true);
        },
        has(key) {
          return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(true, false)
      };
      const shallowReadonlyInstrumentations2 = {
        get(key) {
          return get$1(this, key, true, true);
        },
        get size() {
          return size(this, true);
        },
        has(key) {
          return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(true, true)
      };
      const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
      iteratorMethods.forEach((method) => {
        mutableInstrumentations2[method] = createIterableMethod(method, false, false);
        readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
        shallowInstrumentations2[method] = createIterableMethod(method, false, true);
        shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
      });
      return [
        mutableInstrumentations2,
        readonlyInstrumentations2,
        shallowInstrumentations2,
        shallowReadonlyInstrumentations2
      ];
    }
    var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
    function createInstrumentationGetter(isReadonly2, shallow) {
      const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
      return (target, key, receiver) => {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_raw") {
          return target;
        }
        return Reflect.get(shared.hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
      };
    }
    var mutableCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, false)
    };
    var shallowCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, true)
    };
    var readonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, false)
    };
    var shallowReadonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, true)
    };
    var reactiveMap = new WeakMap();
    var shallowReactiveMap = new WeakMap();
    var readonlyMap = new WeakMap();
    var shallowReadonlyMap = new WeakMap();
    function targetTypeMap(rawType) {
      switch (rawType) {
        case "Object":
        case "Array":
          return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
          return 2;
        default:
          return 0;
      }
    }
    function getTargetType(value) {
      return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(shared.toRawType(value));
    }
    function reactive(target) {
      if (isReadonly(target)) {
        return target;
      }
      return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
    }
    function shallowReactive(target) {
      return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
    }
    function readonly(target) {
      return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
    }
    function shallowReadonly(target) {
      return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
    }
    function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
      if (!shared.isObject(target)) {
        return target;
      }
      if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
        return target;
      }
      const existingProxy = proxyMap.get(target);
      if (existingProxy) {
        return existingProxy;
      }
      const targetType = getTargetType(target);
      if (targetType === 0) {
        return target;
      }
      const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
      proxyMap.set(target, proxy);
      return proxy;
    }
    function isReactive(value) {
      if (isReadonly(value)) {
        return isReactive(value["__v_raw"]);
      }
      return !!(value && value["__v_isReactive"]);
    }
    function isReadonly(value) {
      return !!(value && value["__v_isReadonly"]);
    }
    function isShallow(value) {
      return !!(value && value["__v_isShallow"]);
    }
    function isProxy(value) {
      return isReactive(value) || isReadonly(value);
    }
    function toRaw3(observed) {
      const raw = observed && observed["__v_raw"];
      return raw ? toRaw3(raw) : observed;
    }
    function markRaw(value) {
      shared.def(value, "__v_skip", true);
      return value;
    }
    var toReactive = (value) => shared.isObject(value) ? reactive(value) : value;
    var toReadonly = (value) => shared.isObject(value) ? readonly(value) : value;
    function trackRefValue(ref2) {
      if (shouldTrack && activeEffect) {
        ref2 = toRaw3(ref2);
        {
          trackEffects(ref2.dep || (ref2.dep = createDep()));
        }
      }
    }
    function triggerRefValue(ref2, newVal) {
      ref2 = toRaw3(ref2);
      if (ref2.dep) {
        {
          triggerEffects(ref2.dep);
        }
      }
    }
    function isRef(r) {
      return !!(r && r.__v_isRef === true);
    }
    function ref(value) {
      return createRef(value, false);
    }
    function shallowRef(value) {
      return createRef(value, true);
    }
    function createRef(rawValue, shallow) {
      if (isRef(rawValue)) {
        return rawValue;
      }
      return new RefImpl(rawValue, shallow);
    }
    var RefImpl = class {
      constructor(value, __v_isShallow) {
        this.__v_isShallow = __v_isShallow;
        this.dep = void 0;
        this.__v_isRef = true;
        this._rawValue = __v_isShallow ? value : toRaw3(value);
        this._value = __v_isShallow ? value : toReactive(value);
      }
      get value() {
        trackRefValue(this);
        return this._value;
      }
      set value(newVal) {
        const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
        newVal = useDirectValue ? newVal : toRaw3(newVal);
        if (shared.hasChanged(newVal, this._rawValue)) {
          this._rawValue = newVal;
          this._value = useDirectValue ? newVal : toReactive(newVal);
          triggerRefValue(this);
        }
      }
    };
    function triggerRef(ref2) {
      triggerRefValue(ref2);
    }
    function unref(ref2) {
      return isRef(ref2) ? ref2.value : ref2;
    }
    var shallowUnwrapHandlers = {
      get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
      set: (target, key, value, receiver) => {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        } else {
          return Reflect.set(target, key, value, receiver);
        }
      }
    };
    function proxyRefs(objectWithRefs) {
      return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }
    var CustomRefImpl = class {
      constructor(factory) {
        this.dep = void 0;
        this.__v_isRef = true;
        const { get: get2, set: set2 } = factory(() => trackRefValue(this), () => triggerRefValue(this));
        this._get = get2;
        this._set = set2;
      }
      get value() {
        return this._get();
      }
      set value(newVal) {
        this._set(newVal);
      }
    };
    function customRef(factory) {
      return new CustomRefImpl(factory);
    }
    function toRefs(object) {
      const ret = shared.isArray(object) ? new Array(object.length) : {};
      for (const key in object) {
        ret[key] = toRef(object, key);
      }
      return ret;
    }
    var ObjectRefImpl = class {
      constructor(_object, _key, _defaultValue) {
        this._object = _object;
        this._key = _key;
        this._defaultValue = _defaultValue;
        this.__v_isRef = true;
      }
      get value() {
        const val = this._object[this._key];
        return val === void 0 ? this._defaultValue : val;
      }
      set value(newVal) {
        this._object[this._key] = newVal;
      }
    };
    function toRef(object, key, defaultValue) {
      const val = object[key];
      return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
    }
    var _a;
    var ComputedRefImpl = class {
      constructor(getter, _setter, isReadonly2, isSSR) {
        this._setter = _setter;
        this.dep = void 0;
        this.__v_isRef = true;
        this[_a] = false;
        this._dirty = true;
        this.effect = new ReactiveEffect(getter, () => {
          if (!this._dirty) {
            this._dirty = true;
            triggerRefValue(this);
          }
        });
        this.effect.computed = this;
        this.effect.active = this._cacheable = !isSSR;
        this["__v_isReadonly"] = isReadonly2;
      }
      get value() {
        const self2 = toRaw3(this);
        trackRefValue(self2);
        if (self2._dirty || !self2._cacheable) {
          self2._dirty = false;
          self2._value = self2.effect.run();
        }
        return self2._value;
      }
      set value(newValue) {
        this._setter(newValue);
      }
    };
    _a = "__v_isReadonly";
    function computed(getterOrOptions, debugOptions, isSSR = false) {
      let getter;
      let setter;
      const onlyGetter = shared.isFunction(getterOrOptions);
      if (onlyGetter) {
        getter = getterOrOptions;
        setter = shared.NOOP;
      } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
      }
      const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
      return cRef;
    }
    var _a$1;
    var tick = /* @__PURE__ */ Promise.resolve();
    var queue = [];
    var queued = false;
    var scheduler = (fn) => {
      queue.push(fn);
      if (!queued) {
        queued = true;
        tick.then(flush2);
      }
    };
    var flush2 = () => {
      for (let i = 0; i < queue.length; i++) {
        queue[i]();
      }
      queue.length = 0;
      queued = false;
    };
    var DeferredComputedRefImpl = class {
      constructor(getter) {
        this.dep = void 0;
        this._dirty = true;
        this.__v_isRef = true;
        this[_a$1] = true;
        let compareTarget;
        let hasCompareTarget = false;
        let scheduled = false;
        this.effect = new ReactiveEffect(getter, (computedTrigger) => {
          if (this.dep) {
            if (computedTrigger) {
              compareTarget = this._value;
              hasCompareTarget = true;
            } else if (!scheduled) {
              const valueToCompare = hasCompareTarget ? compareTarget : this._value;
              scheduled = true;
              hasCompareTarget = false;
              scheduler(() => {
                if (this.effect.active && this._get() !== valueToCompare) {
                  triggerRefValue(this);
                }
                scheduled = false;
              });
            }
            for (const e of this.dep) {
              if (e.computed instanceof DeferredComputedRefImpl) {
                e.scheduler(true);
              }
            }
          }
          this._dirty = true;
        });
        this.effect.computed = this;
      }
      _get() {
        if (this._dirty) {
          this._dirty = false;
          return this._value = this.effect.run();
        }
        return this._value;
      }
      get value() {
        trackRefValue(this);
        return toRaw3(this)._get();
      }
    };
    _a$1 = "__v_isReadonly";
    function deferredComputed(getter) {
      return new DeferredComputedRefImpl(getter);
    }
    exports2.EffectScope = EffectScope;
    exports2.ITERATE_KEY = ITERATE_KEY2;
    exports2.ReactiveEffect = ReactiveEffect;
    exports2.computed = computed;
    exports2.customRef = customRef;
    exports2.deferredComputed = deferredComputed;
    exports2.effect = effect;
    exports2.effectScope = effectScope;
    exports2.enableTracking = enableTracking;
    exports2.getCurrentScope = getCurrentScope;
    exports2.isProxy = isProxy;
    exports2.isReactive = isReactive;
    exports2.isReadonly = isReadonly;
    exports2.isRef = isRef;
    exports2.isShallow = isShallow;
    exports2.markRaw = markRaw;
    exports2.onScopeDispose = onScopeDispose;
    exports2.pauseTracking = pauseTracking;
    exports2.proxyRefs = proxyRefs;
    exports2.reactive = reactive;
    exports2.readonly = readonly;
    exports2.ref = ref;
    exports2.resetTracking = resetTracking;
    exports2.shallowReactive = shallowReactive;
    exports2.shallowReadonly = shallowReadonly;
    exports2.shallowRef = shallowRef;
    exports2.stop = stop;
    exports2.toRaw = toRaw3;
    exports2.toRef = toRef;
    exports2.toRefs = toRefs;
    exports2.track = track2;
    exports2.trigger = trigger2;
    exports2.triggerRef = triggerRef;
    exports2.unref = unref;
  }
});

// ../node_modules/@vue/runtime-core/node_modules/@vue/reactivity/dist/reactivity.cjs.js
var require_reactivity_cjs2 = __commonJS({
  "../node_modules/@vue/runtime-core/node_modules/@vue/reactivity/dist/reactivity.cjs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var shared = require_shared2();
    function warn(msg, ...args) {
      console.warn(`[Vue warn] ${msg}`, ...args);
    }
    var activeEffectScope;
    var EffectScope = class {
      constructor(detached = false) {
        this.detached = detached;
        this.active = true;
        this.effects = [];
        this.cleanups = [];
        this.parent = activeEffectScope;
        if (!detached && activeEffectScope) {
          this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
        }
      }
      run(fn) {
        if (this.active) {
          const currentEffectScope = activeEffectScope;
          try {
            activeEffectScope = this;
            return fn();
          } finally {
            activeEffectScope = currentEffectScope;
          }
        } else {
          warn(`cannot run an inactive effect scope.`);
        }
      }
      on() {
        activeEffectScope = this;
      }
      off() {
        activeEffectScope = this.parent;
      }
      stop(fromParent) {
        if (this.active) {
          let i, l;
          for (i = 0, l = this.effects.length; i < l; i++) {
            this.effects[i].stop();
          }
          for (i = 0, l = this.cleanups.length; i < l; i++) {
            this.cleanups[i]();
          }
          if (this.scopes) {
            for (i = 0, l = this.scopes.length; i < l; i++) {
              this.scopes[i].stop(true);
            }
          }
          if (!this.detached && this.parent && !fromParent) {
            const last = this.parent.scopes.pop();
            if (last && last !== this) {
              this.parent.scopes[this.index] = last;
              last.index = this.index;
            }
          }
          this.parent = void 0;
          this.active = false;
        }
      }
    };
    function effectScope(detached) {
      return new EffectScope(detached);
    }
    function recordEffectScope(effect2, scope = activeEffectScope) {
      if (scope && scope.active) {
        scope.effects.push(effect2);
      }
    }
    function getCurrentScope() {
      return activeEffectScope;
    }
    function onScopeDispose(fn) {
      if (activeEffectScope) {
        activeEffectScope.cleanups.push(fn);
      } else {
        warn(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
      }
    }
    var createDep = (effects) => {
      const dep = new Set(effects);
      dep.w = 0;
      dep.n = 0;
      return dep;
    };
    var wasTracked = (dep) => (dep.w & trackOpBit) > 0;
    var newTracked = (dep) => (dep.n & trackOpBit) > 0;
    var initDepMarkers = ({ deps }) => {
      if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
          deps[i].w |= trackOpBit;
        }
      }
    };
    var finalizeDepMarkers = (effect2) => {
      const { deps } = effect2;
      if (deps.length) {
        let ptr = 0;
        for (let i = 0; i < deps.length; i++) {
          const dep = deps[i];
          if (wasTracked(dep) && !newTracked(dep)) {
            dep.delete(effect2);
          } else {
            deps[ptr++] = dep;
          }
          dep.w &= ~trackOpBit;
          dep.n &= ~trackOpBit;
        }
        deps.length = ptr;
      }
    };
    var targetMap = new WeakMap();
    var effectTrackDepth = 0;
    var trackOpBit = 1;
    var maxMarkerBits = 30;
    var activeEffect;
    var ITERATE_KEY2 = Symbol("iterate");
    var MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
    var ReactiveEffect = class {
      constructor(fn, scheduler2 = null, scope) {
        this.fn = fn;
        this.scheduler = scheduler2;
        this.active = true;
        this.deps = [];
        this.parent = void 0;
        recordEffectScope(this, scope);
      }
      run() {
        if (!this.active) {
          return this.fn();
        }
        let parent = activeEffect;
        let lastShouldTrack = shouldTrack;
        while (parent) {
          if (parent === this) {
            return;
          }
          parent = parent.parent;
        }
        try {
          this.parent = activeEffect;
          activeEffect = this;
          shouldTrack = true;
          trackOpBit = 1 << ++effectTrackDepth;
          if (effectTrackDepth <= maxMarkerBits) {
            initDepMarkers(this);
          } else {
            cleanupEffect(this);
          }
          return this.fn();
        } finally {
          if (effectTrackDepth <= maxMarkerBits) {
            finalizeDepMarkers(this);
          }
          trackOpBit = 1 << --effectTrackDepth;
          activeEffect = this.parent;
          shouldTrack = lastShouldTrack;
          this.parent = void 0;
          if (this.deferStop) {
            this.stop();
          }
        }
      }
      stop() {
        if (activeEffect === this) {
          this.deferStop = true;
        } else if (this.active) {
          cleanupEffect(this);
          if (this.onStop) {
            this.onStop();
          }
          this.active = false;
        }
      }
    };
    function cleanupEffect(effect2) {
      const { deps } = effect2;
      if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
          deps[i].delete(effect2);
        }
        deps.length = 0;
      }
    }
    function effect(fn, options) {
      if (fn.effect) {
        fn = fn.effect.fn;
      }
      const _effect = new ReactiveEffect(fn);
      if (options) {
        shared.extend(_effect, options);
        if (options.scope)
          recordEffectScope(_effect, options.scope);
      }
      if (!options || !options.lazy) {
        _effect.run();
      }
      const runner = _effect.run.bind(_effect);
      runner.effect = _effect;
      return runner;
    }
    function stop(runner) {
      runner.effect.stop();
    }
    var shouldTrack = true;
    var trackStack = [];
    function pauseTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = false;
    }
    function enableTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = true;
    }
    function resetTracking() {
      const last = trackStack.pop();
      shouldTrack = last === void 0 ? true : last;
    }
    function track2(target, type, key) {
      if (shouldTrack && activeEffect) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
          targetMap.set(target, depsMap = new Map());
        }
        let dep = depsMap.get(key);
        if (!dep) {
          depsMap.set(key, dep = createDep());
        }
        const eventInfo = { effect: activeEffect, target, type, key };
        trackEffects(dep, eventInfo);
      }
    }
    function trackEffects(dep, debuggerEventExtraInfo) {
      let shouldTrack2 = false;
      if (effectTrackDepth <= maxMarkerBits) {
        if (!newTracked(dep)) {
          dep.n |= trackOpBit;
          shouldTrack2 = !wasTracked(dep);
        }
      } else {
        shouldTrack2 = !dep.has(activeEffect);
      }
      if (shouldTrack2) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
        if (activeEffect.onTrack) {
          activeEffect.onTrack({
            effect: activeEffect,
            ...debuggerEventExtraInfo
          });
        }
      }
    }
    function trigger2(target, type, key, newValue, oldValue, oldTarget) {
      const depsMap = targetMap.get(target);
      if (!depsMap) {
        return;
      }
      let deps = [];
      if (type === "clear") {
        deps = [...depsMap.values()];
      } else if (key === "length" && shared.isArray(target)) {
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 >= newValue) {
            deps.push(dep);
          }
        });
      } else {
        if (key !== void 0) {
          deps.push(depsMap.get(key));
        }
        switch (type) {
          case "add":
            if (!shared.isArray(target)) {
              deps.push(depsMap.get(ITERATE_KEY2));
              if (shared.isMap(target)) {
                deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (shared.isIntegerKey(key)) {
              deps.push(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!shared.isArray(target)) {
              deps.push(depsMap.get(ITERATE_KEY2));
              if (shared.isMap(target)) {
                deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (shared.isMap(target)) {
              deps.push(depsMap.get(ITERATE_KEY2));
            }
            break;
        }
      }
      const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
      if (deps.length === 1) {
        if (deps[0]) {
          {
            triggerEffects(deps[0], eventInfo);
          }
        }
      } else {
        const effects = [];
        for (const dep of deps) {
          if (dep) {
            effects.push(...dep);
          }
        }
        {
          triggerEffects(createDep(effects), eventInfo);
        }
      }
    }
    function triggerEffects(dep, debuggerEventExtraInfo) {
      const effects = shared.isArray(dep) ? dep : [...dep];
      for (const effect2 of effects) {
        if (effect2.computed) {
          triggerEffect(effect2, debuggerEventExtraInfo);
        }
      }
      for (const effect2 of effects) {
        if (!effect2.computed) {
          triggerEffect(effect2, debuggerEventExtraInfo);
        }
      }
    }
    function triggerEffect(effect2, debuggerEventExtraInfo) {
      if (effect2 !== activeEffect || effect2.allowRecurse) {
        if (effect2.onTrigger) {
          effect2.onTrigger(shared.extend({ effect: effect2 }, debuggerEventExtraInfo));
        }
        if (effect2.scheduler) {
          effect2.scheduler();
        } else {
          effect2.run();
        }
      }
    }
    var isNonTrackableKeys = /* @__PURE__ */ shared.makeMap(`__proto__,__v_isRef,__isVue`);
    var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(shared.isSymbol));
    var get = /* @__PURE__ */ createGetter();
    var shallowGet = /* @__PURE__ */ createGetter(false, true);
    var readonlyGet = /* @__PURE__ */ createGetter(true);
    var shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
    var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
    function createArrayInstrumentations() {
      const instrumentations = {};
      ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
        instrumentations[key] = function(...args) {
          const arr = toRaw3(this);
          for (let i = 0, l = this.length; i < l; i++) {
            track2(arr, "get", i + "");
          }
          const res = arr[key](...args);
          if (res === -1 || res === false) {
            return arr[key](...args.map(toRaw3));
          } else {
            return res;
          }
        };
      });
      ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
        instrumentations[key] = function(...args) {
          pauseTracking();
          const res = toRaw3(this)[key].apply(this, args);
          resetTracking();
          return res;
        };
      });
      return instrumentations;
    }
    function createGetter(isReadonly2 = false, shallow = false) {
      return function get2(target, key, receiver) {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_isShallow") {
          return shallow;
        } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
          return target;
        }
        const targetIsArray = shared.isArray(target);
        if (!isReadonly2 && targetIsArray && shared.hasOwn(arrayInstrumentations, key)) {
          return Reflect.get(arrayInstrumentations, key, receiver);
        }
        const res = Reflect.get(target, key, receiver);
        if (shared.isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
          return res;
        }
        if (!isReadonly2) {
          track2(target, "get", key);
        }
        if (shallow) {
          return res;
        }
        if (isRef(res)) {
          return targetIsArray && shared.isIntegerKey(key) ? res : res.value;
        }
        if (shared.isObject(res)) {
          return isReadonly2 ? readonly(res) : reactive(res);
        }
        return res;
      };
    }
    var set = /* @__PURE__ */ createSetter();
    var shallowSet = /* @__PURE__ */ createSetter(true);
    function createSetter(shallow = false) {
      return function set2(target, key, value, receiver) {
        let oldValue = target[key];
        if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
          return false;
        }
        if (!shallow) {
          if (!isShallow(value) && !isReadonly(value)) {
            oldValue = toRaw3(oldValue);
            value = toRaw3(value);
          }
          if (!shared.isArray(target) && isRef(oldValue) && !isRef(value)) {
            oldValue.value = value;
            return true;
          }
        }
        const hadKey = shared.isArray(target) && shared.isIntegerKey(key) ? Number(key) < target.length : shared.hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        if (target === toRaw3(receiver)) {
          if (!hadKey) {
            trigger2(target, "add", key, value);
          } else if (shared.hasChanged(value, oldValue)) {
            trigger2(target, "set", key, value, oldValue);
          }
        }
        return result;
      };
    }
    function deleteProperty(target, key) {
      const hadKey = shared.hasOwn(target, key);
      const oldValue = target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger2(target, "delete", key, void 0, oldValue);
      }
      return result;
    }
    function has(target, key) {
      const result = Reflect.has(target, key);
      if (!shared.isSymbol(key) || !builtInSymbols.has(key)) {
        track2(target, "has", key);
      }
      return result;
    }
    function ownKeys(target) {
      track2(target, "iterate", shared.isArray(target) ? "length" : ITERATE_KEY2);
      return Reflect.ownKeys(target);
    }
    var mutableHandlers = {
      get,
      set,
      deleteProperty,
      has,
      ownKeys
    };
    var readonlyHandlers = {
      get: readonlyGet,
      set(target, key) {
        {
          warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
        }
        return true;
      },
      deleteProperty(target, key) {
        {
          warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
        }
        return true;
      }
    };
    var shallowReactiveHandlers = /* @__PURE__ */ shared.extend({}, mutableHandlers, {
      get: shallowGet,
      set: shallowSet
    });
    var shallowReadonlyHandlers = /* @__PURE__ */ shared.extend({}, readonlyHandlers, {
      get: shallowReadonlyGet
    });
    var toShallow = (value) => value;
    var getProto = (v) => Reflect.getPrototypeOf(v);
    function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
      target = target["__v_raw"];
      const rawTarget = toRaw3(target);
      const rawKey = toRaw3(key);
      if (!isReadonly2) {
        if (key !== rawKey) {
          track2(rawTarget, "get", key);
        }
        track2(rawTarget, "get", rawKey);
      }
      const { has: has2 } = getProto(rawTarget);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      if (has2.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has2.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    }
    function has$1(key, isReadonly2 = false) {
      const target = this["__v_raw"];
      const rawTarget = toRaw3(target);
      const rawKey = toRaw3(key);
      if (!isReadonly2) {
        if (key !== rawKey) {
          track2(rawTarget, "has", key);
        }
        track2(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    }
    function size(target, isReadonly2 = false) {
      target = target["__v_raw"];
      !isReadonly2 && track2(toRaw3(target), "iterate", ITERATE_KEY2);
      return Reflect.get(target, "size", target);
    }
    function add(value) {
      value = toRaw3(value);
      const target = toRaw3(this);
      const proto = getProto(target);
      const hadKey = proto.has.call(target, value);
      if (!hadKey) {
        target.add(value);
        trigger2(target, "add", value, value);
      }
      return this;
    }
    function set$1(key, value) {
      value = toRaw3(value);
      const target = toRaw3(this);
      const { has: has2, get: get2 } = getProto(target);
      let hadKey = has2.call(target, key);
      if (!hadKey) {
        key = toRaw3(key);
        hadKey = has2.call(target, key);
      } else {
        checkIdentityKeys(target, has2, key);
      }
      const oldValue = get2.call(target, key);
      target.set(key, value);
      if (!hadKey) {
        trigger2(target, "add", key, value);
      } else if (shared.hasChanged(value, oldValue)) {
        trigger2(target, "set", key, value, oldValue);
      }
      return this;
    }
    function deleteEntry(key) {
      const target = toRaw3(this);
      const { has: has2, get: get2 } = getProto(target);
      let hadKey = has2.call(target, key);
      if (!hadKey) {
        key = toRaw3(key);
        hadKey = has2.call(target, key);
      } else {
        checkIdentityKeys(target, has2, key);
      }
      const oldValue = get2 ? get2.call(target, key) : void 0;
      const result = target.delete(key);
      if (hadKey) {
        trigger2(target, "delete", key, void 0, oldValue);
      }
      return result;
    }
    function clear() {
      const target = toRaw3(this);
      const hadItems = target.size !== 0;
      const oldTarget = shared.isMap(target) ? new Map(target) : new Set(target);
      const result = target.clear();
      if (hadItems) {
        trigger2(target, "clear", void 0, void 0, oldTarget);
      }
      return result;
    }
    function createForEach(isReadonly2, isShallow2) {
      return function forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = toRaw3(target);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track2(rawTarget, "iterate", ITERATE_KEY2);
        return target.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      };
    }
    function createIterableMethod(method, isReadonly2, isShallow2) {
      return function(...args) {
        const target = this["__v_raw"];
        const rawTarget = toRaw3(target);
        const targetIsMap = shared.isMap(rawTarget);
        const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
        const isKeyOnly = method === "keys" && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track2(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY2);
        return {
          next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          },
          [Symbol.iterator]() {
            return this;
          }
        };
      };
    }
    function createReadonlyMethod(type) {
      return function(...args) {
        {
          const key = args[0] ? `on key "${args[0]}" ` : ``;
          console.warn(`${shared.capitalize(type)} operation ${key}failed: target is readonly.`, toRaw3(this));
        }
        return type === "delete" ? false : this;
      };
    }
    function createInstrumentations() {
      const mutableInstrumentations2 = {
        get(key) {
          return get$1(this, key);
        },
        get size() {
          return size(this);
        },
        has: has$1,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, false)
      };
      const shallowInstrumentations2 = {
        get(key) {
          return get$1(this, key, false, true);
        },
        get size() {
          return size(this);
        },
        has: has$1,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, true)
      };
      const readonlyInstrumentations2 = {
        get(key) {
          return get$1(this, key, true);
        },
        get size() {
          return size(this, true);
        },
        has(key) {
          return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(true, false)
      };
      const shallowReadonlyInstrumentations2 = {
        get(key) {
          return get$1(this, key, true, true);
        },
        get size() {
          return size(this, true);
        },
        has(key) {
          return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(true, true)
      };
      const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
      iteratorMethods.forEach((method) => {
        mutableInstrumentations2[method] = createIterableMethod(method, false, false);
        readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
        shallowInstrumentations2[method] = createIterableMethod(method, false, true);
        shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
      });
      return [
        mutableInstrumentations2,
        readonlyInstrumentations2,
        shallowInstrumentations2,
        shallowReadonlyInstrumentations2
      ];
    }
    var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
    function createInstrumentationGetter(isReadonly2, shallow) {
      const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
      return (target, key, receiver) => {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_raw") {
          return target;
        }
        return Reflect.get(shared.hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
      };
    }
    var mutableCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, false)
    };
    var shallowCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, true)
    };
    var readonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, false)
    };
    var shallowReadonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, true)
    };
    function checkIdentityKeys(target, has2, key) {
      const rawKey = toRaw3(key);
      if (rawKey !== key && has2.call(target, rawKey)) {
        const type = shared.toRawType(target);
        console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
      }
    }
    var reactiveMap = new WeakMap();
    var shallowReactiveMap = new WeakMap();
    var readonlyMap = new WeakMap();
    var shallowReadonlyMap = new WeakMap();
    function targetTypeMap(rawType) {
      switch (rawType) {
        case "Object":
        case "Array":
          return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
          return 2;
        default:
          return 0;
      }
    }
    function getTargetType(value) {
      return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(shared.toRawType(value));
    }
    function reactive(target) {
      if (isReadonly(target)) {
        return target;
      }
      return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
    }
    function shallowReactive(target) {
      return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
    }
    function readonly(target) {
      return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
    }
    function shallowReadonly(target) {
      return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
    }
    function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
      if (!shared.isObject(target)) {
        {
          console.warn(`value cannot be made reactive: ${String(target)}`);
        }
        return target;
      }
      if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
        return target;
      }
      const existingProxy = proxyMap.get(target);
      if (existingProxy) {
        return existingProxy;
      }
      const targetType = getTargetType(target);
      if (targetType === 0) {
        return target;
      }
      const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
      proxyMap.set(target, proxy);
      return proxy;
    }
    function isReactive(value) {
      if (isReadonly(value)) {
        return isReactive(value["__v_raw"]);
      }
      return !!(value && value["__v_isReactive"]);
    }
    function isReadonly(value) {
      return !!(value && value["__v_isReadonly"]);
    }
    function isShallow(value) {
      return !!(value && value["__v_isShallow"]);
    }
    function isProxy(value) {
      return isReactive(value) || isReadonly(value);
    }
    function toRaw3(observed) {
      const raw = observed && observed["__v_raw"];
      return raw ? toRaw3(raw) : observed;
    }
    function markRaw(value) {
      shared.def(value, "__v_skip", true);
      return value;
    }
    var toReactive = (value) => shared.isObject(value) ? reactive(value) : value;
    var toReadonly = (value) => shared.isObject(value) ? readonly(value) : value;
    function trackRefValue(ref2) {
      if (shouldTrack && activeEffect) {
        ref2 = toRaw3(ref2);
        {
          trackEffects(ref2.dep || (ref2.dep = createDep()), {
            target: ref2,
            type: "get",
            key: "value"
          });
        }
      }
    }
    function triggerRefValue(ref2, newVal) {
      ref2 = toRaw3(ref2);
      if (ref2.dep) {
        {
          triggerEffects(ref2.dep, {
            target: ref2,
            type: "set",
            key: "value",
            newValue: newVal
          });
        }
      }
    }
    function isRef(r) {
      return !!(r && r.__v_isRef === true);
    }
    function ref(value) {
      return createRef(value, false);
    }
    function shallowRef(value) {
      return createRef(value, true);
    }
    function createRef(rawValue, shallow) {
      if (isRef(rawValue)) {
        return rawValue;
      }
      return new RefImpl(rawValue, shallow);
    }
    var RefImpl = class {
      constructor(value, __v_isShallow) {
        this.__v_isShallow = __v_isShallow;
        this.dep = void 0;
        this.__v_isRef = true;
        this._rawValue = __v_isShallow ? value : toRaw3(value);
        this._value = __v_isShallow ? value : toReactive(value);
      }
      get value() {
        trackRefValue(this);
        return this._value;
      }
      set value(newVal) {
        const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
        newVal = useDirectValue ? newVal : toRaw3(newVal);
        if (shared.hasChanged(newVal, this._rawValue)) {
          this._rawValue = newVal;
          this._value = useDirectValue ? newVal : toReactive(newVal);
          triggerRefValue(this, newVal);
        }
      }
    };
    function triggerRef(ref2) {
      triggerRefValue(ref2, ref2.value);
    }
    function unref(ref2) {
      return isRef(ref2) ? ref2.value : ref2;
    }
    var shallowUnwrapHandlers = {
      get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
      set: (target, key, value, receiver) => {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        } else {
          return Reflect.set(target, key, value, receiver);
        }
      }
    };
    function proxyRefs(objectWithRefs) {
      return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }
    var CustomRefImpl = class {
      constructor(factory) {
        this.dep = void 0;
        this.__v_isRef = true;
        const { get: get2, set: set2 } = factory(() => trackRefValue(this), () => triggerRefValue(this));
        this._get = get2;
        this._set = set2;
      }
      get value() {
        return this._get();
      }
      set value(newVal) {
        this._set(newVal);
      }
    };
    function customRef(factory) {
      return new CustomRefImpl(factory);
    }
    function toRefs(object) {
      if (!isProxy(object)) {
        console.warn(`toRefs() expects a reactive object but received a plain one.`);
      }
      const ret = shared.isArray(object) ? new Array(object.length) : {};
      for (const key in object) {
        ret[key] = toRef(object, key);
      }
      return ret;
    }
    var ObjectRefImpl = class {
      constructor(_object, _key, _defaultValue) {
        this._object = _object;
        this._key = _key;
        this._defaultValue = _defaultValue;
        this.__v_isRef = true;
      }
      get value() {
        const val = this._object[this._key];
        return val === void 0 ? this._defaultValue : val;
      }
      set value(newVal) {
        this._object[this._key] = newVal;
      }
    };
    function toRef(object, key, defaultValue) {
      const val = object[key];
      return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
    }
    var _a;
    var ComputedRefImpl = class {
      constructor(getter, _setter, isReadonly2, isSSR) {
        this._setter = _setter;
        this.dep = void 0;
        this.__v_isRef = true;
        this[_a] = false;
        this._dirty = true;
        this.effect = new ReactiveEffect(getter, () => {
          if (!this._dirty) {
            this._dirty = true;
            triggerRefValue(this);
          }
        });
        this.effect.computed = this;
        this.effect.active = this._cacheable = !isSSR;
        this["__v_isReadonly"] = isReadonly2;
      }
      get value() {
        const self2 = toRaw3(this);
        trackRefValue(self2);
        if (self2._dirty || !self2._cacheable) {
          self2._dirty = false;
          self2._value = self2.effect.run();
        }
        return self2._value;
      }
      set value(newValue) {
        this._setter(newValue);
      }
    };
    _a = "__v_isReadonly";
    function computed(getterOrOptions, debugOptions, isSSR = false) {
      let getter;
      let setter;
      const onlyGetter = shared.isFunction(getterOrOptions);
      if (onlyGetter) {
        getter = getterOrOptions;
        setter = () => {
          console.warn("Write operation failed: computed value is readonly");
        };
      } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
      }
      const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
      if (debugOptions && !isSSR) {
        cRef.effect.onTrack = debugOptions.onTrack;
        cRef.effect.onTrigger = debugOptions.onTrigger;
      }
      return cRef;
    }
    var _a$1;
    var tick = /* @__PURE__ */ Promise.resolve();
    var queue = [];
    var queued = false;
    var scheduler = (fn) => {
      queue.push(fn);
      if (!queued) {
        queued = true;
        tick.then(flush2);
      }
    };
    var flush2 = () => {
      for (let i = 0; i < queue.length; i++) {
        queue[i]();
      }
      queue.length = 0;
      queued = false;
    };
    var DeferredComputedRefImpl = class {
      constructor(getter) {
        this.dep = void 0;
        this._dirty = true;
        this.__v_isRef = true;
        this[_a$1] = true;
        let compareTarget;
        let hasCompareTarget = false;
        let scheduled = false;
        this.effect = new ReactiveEffect(getter, (computedTrigger) => {
          if (this.dep) {
            if (computedTrigger) {
              compareTarget = this._value;
              hasCompareTarget = true;
            } else if (!scheduled) {
              const valueToCompare = hasCompareTarget ? compareTarget : this._value;
              scheduled = true;
              hasCompareTarget = false;
              scheduler(() => {
                if (this.effect.active && this._get() !== valueToCompare) {
                  triggerRefValue(this);
                }
                scheduled = false;
              });
            }
            for (const e of this.dep) {
              if (e.computed instanceof DeferredComputedRefImpl) {
                e.scheduler(true);
              }
            }
          }
          this._dirty = true;
        });
        this.effect.computed = this;
      }
      _get() {
        if (this._dirty) {
          this._dirty = false;
          return this._value = this.effect.run();
        }
        return this._value;
      }
      get value() {
        trackRefValue(this);
        return toRaw3(this)._get();
      }
    };
    _a$1 = "__v_isReadonly";
    function deferredComputed(getter) {
      return new DeferredComputedRefImpl(getter);
    }
    exports2.EffectScope = EffectScope;
    exports2.ITERATE_KEY = ITERATE_KEY2;
    exports2.ReactiveEffect = ReactiveEffect;
    exports2.computed = computed;
    exports2.customRef = customRef;
    exports2.deferredComputed = deferredComputed;
    exports2.effect = effect;
    exports2.effectScope = effectScope;
    exports2.enableTracking = enableTracking;
    exports2.getCurrentScope = getCurrentScope;
    exports2.isProxy = isProxy;
    exports2.isReactive = isReactive;
    exports2.isReadonly = isReadonly;
    exports2.isRef = isRef;
    exports2.isShallow = isShallow;
    exports2.markRaw = markRaw;
    exports2.onScopeDispose = onScopeDispose;
    exports2.pauseTracking = pauseTracking;
    exports2.proxyRefs = proxyRefs;
    exports2.reactive = reactive;
    exports2.readonly = readonly;
    exports2.ref = ref;
    exports2.resetTracking = resetTracking;
    exports2.shallowReactive = shallowReactive;
    exports2.shallowReadonly = shallowReadonly;
    exports2.shallowRef = shallowRef;
    exports2.stop = stop;
    exports2.toRaw = toRaw3;
    exports2.toRef = toRef;
    exports2.toRefs = toRefs;
    exports2.track = track2;
    exports2.trigger = trigger2;
    exports2.triggerRef = triggerRef;
    exports2.unref = unref;
  }
});

// ../node_modules/@vue/runtime-core/node_modules/@vue/reactivity/index.js
var require_reactivity2 = __commonJS({
  "../node_modules/@vue/runtime-core/node_modules/@vue/reactivity/index.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_reactivity_cjs_prod2();
    } else {
      module2.exports = require_reactivity_cjs2();
    }
  }
});

// ../node_modules/@vue/runtime-core/dist/runtime-core.cjs.prod.js
var require_runtime_core_cjs_prod = __commonJS({
  "../node_modules/@vue/runtime-core/dist/runtime-core.cjs.prod.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var reactivity = require_reactivity2();
    var shared = require_shared2();
    var stack = [];
    function warn(msg, ...args) {
      reactivity.pauseTracking();
      const instance = stack.length ? stack[stack.length - 1].component : null;
      const appWarnHandler = instance && instance.appContext.config.warnHandler;
      const trace = getComponentTrace();
      if (appWarnHandler) {
        callWithErrorHandling(appWarnHandler, instance, 11, [
          msg + args.join(""),
          instance && instance.proxy,
          trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
          trace
        ]);
      } else {
        const warnArgs = [`[Vue warn]: ${msg}`, ...args];
        if (trace.length && true) {
          warnArgs.push(`
`, ...formatTrace(trace));
        }
        console.warn(...warnArgs);
      }
      reactivity.resetTracking();
    }
    function getComponentTrace() {
      let currentVNode = stack[stack.length - 1];
      if (!currentVNode) {
        return [];
      }
      const normalizedStack = [];
      while (currentVNode) {
        const last = normalizedStack[0];
        if (last && last.vnode === currentVNode) {
          last.recurseCount++;
        } else {
          normalizedStack.push({
            vnode: currentVNode,
            recurseCount: 0
          });
        }
        const parentInstance = currentVNode.component && currentVNode.component.parent;
        currentVNode = parentInstance && parentInstance.vnode;
      }
      return normalizedStack;
    }
    function formatTrace(trace) {
      const logs = [];
      trace.forEach((entry, i) => {
        logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
      });
      return logs;
    }
    function formatTraceEntry({ vnode, recurseCount }) {
      const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
      const isRoot = vnode.component ? vnode.component.parent == null : false;
      const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
      const close = `>` + postfix;
      return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
    }
    function formatProps(props) {
      const res = [];
      const keys = Object.keys(props);
      keys.slice(0, 3).forEach((key) => {
        res.push(...formatProp(key, props[key]));
      });
      if (keys.length > 3) {
        res.push(` ...`);
      }
      return res;
    }
    function formatProp(key, value, raw) {
      if (shared.isString(value)) {
        value = JSON.stringify(value);
        return raw ? value : [`${key}=${value}`];
      } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
        return raw ? value : [`${key}=${value}`];
      } else if (reactivity.isRef(value)) {
        value = formatProp(key, reactivity.toRaw(value.value), true);
        return raw ? value : [`${key}=Ref<`, value, `>`];
      } else if (shared.isFunction(value)) {
        return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
      } else {
        value = reactivity.toRaw(value);
        return raw ? value : [`${key}=`, value];
      }
    }
    function callWithErrorHandling(fn, instance, type, args) {
      let res;
      try {
        res = args ? fn(...args) : fn();
      } catch (err) {
        handleError(err, instance, type);
      }
      return res;
    }
    function callWithAsyncErrorHandling(fn, instance, type, args) {
      if (shared.isFunction(fn)) {
        const res = callWithErrorHandling(fn, instance, type, args);
        if (res && shared.isPromise(res)) {
          res.catch((err) => {
            handleError(err, instance, type);
          });
        }
        return res;
      }
      const values = [];
      for (let i = 0; i < fn.length; i++) {
        values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
      }
      return values;
    }
    function handleError(err, instance, type, throwInDev = true) {
      const contextVNode = instance ? instance.vnode : null;
      if (instance) {
        let cur = instance.parent;
        const exposedInstance = instance.proxy;
        const errorInfo = type;
        while (cur) {
          const errorCapturedHooks = cur.ec;
          if (errorCapturedHooks) {
            for (let i = 0; i < errorCapturedHooks.length; i++) {
              if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                return;
              }
            }
          }
          cur = cur.parent;
        }
        const appErrorHandler = instance.appContext.config.errorHandler;
        if (appErrorHandler) {
          callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
          return;
        }
      }
      logError(err, type, contextVNode, throwInDev);
    }
    function logError(err, type, contextVNode, throwInDev = true) {
      {
        console.error(err);
      }
    }
    var isFlushing = false;
    var isFlushPending = false;
    var queue = [];
    var flushIndex = 0;
    var pendingPostFlushCbs = [];
    var activePostFlushCbs = null;
    var postFlushIndex = 0;
    var resolvedPromise = /* @__PURE__ */ Promise.resolve();
    var currentFlushPromise = null;
    function nextTick2(fn) {
      const p = currentFlushPromise || resolvedPromise;
      return fn ? p.then(this ? fn.bind(this) : fn) : p;
    }
    function findInsertionIndex(id) {
      let start = flushIndex + 1;
      let end = queue.length;
      while (start < end) {
        const middle = start + end >>> 1;
        const middleJobId = getId(queue[middle]);
        middleJobId < id ? start = middle + 1 : end = middle;
      }
      return start;
    }
    function queueJob(job) {
      if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
        if (job.id == null) {
          queue.push(job);
        } else {
          queue.splice(findInsertionIndex(job.id), 0, job);
        }
        queueFlush();
      }
    }
    function queueFlush() {
      if (!isFlushing && !isFlushPending) {
        isFlushPending = true;
        currentFlushPromise = resolvedPromise.then(flushJobs);
      }
    }
    function invalidateJob(job) {
      const i = queue.indexOf(job);
      if (i > flushIndex) {
        queue.splice(i, 1);
      }
    }
    function queuePostFlushCb(cb) {
      if (!shared.isArray(cb)) {
        if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
          pendingPostFlushCbs.push(cb);
        }
      } else {
        pendingPostFlushCbs.push(...cb);
      }
      queueFlush();
    }
    function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
      for (; i < queue.length; i++) {
        const cb = queue[i];
        if (cb && cb.pre) {
          queue.splice(i, 1);
          i--;
          cb();
        }
      }
    }
    function flushPostFlushCbs(seen) {
      if (pendingPostFlushCbs.length) {
        const deduped = [...new Set(pendingPostFlushCbs)];
        pendingPostFlushCbs.length = 0;
        if (activePostFlushCbs) {
          activePostFlushCbs.push(...deduped);
          return;
        }
        activePostFlushCbs = deduped;
        activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
          activePostFlushCbs[postFlushIndex]();
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
      }
    }
    var getId = (job) => job.id == null ? Infinity : job.id;
    var comparator = (a, b) => {
      const diff = getId(a) - getId(b);
      if (diff === 0) {
        if (a.pre && !b.pre)
          return -1;
        if (b.pre && !a.pre)
          return 1;
      }
      return diff;
    };
    function flushJobs(seen) {
      isFlushPending = false;
      isFlushing = true;
      queue.sort(comparator);
      const check = shared.NOOP;
      try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
          const job = queue[flushIndex];
          if (job && job.active !== false) {
            if (false)
              ;
            callWithErrorHandling(job, null, 14);
          }
        }
      } finally {
        flushIndex = 0;
        queue.length = 0;
        flushPostFlushCbs();
        isFlushing = false;
        currentFlushPromise = null;
        if (queue.length || pendingPostFlushCbs.length) {
          flushJobs();
        }
      }
    }
    var buffer = [];
    function setDevtoolsHook(hook, target) {
      var _a, _b;
      exports2.devtools = hook;
      if (exports2.devtools) {
        exports2.devtools.enabled = true;
        buffer.forEach(({ event, args }) => exports2.devtools.emit(event, ...args));
        buffer = [];
      } else if (typeof window !== "undefined" && window.HTMLElement && !((_b = (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))) {
        const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
        replay.push((newHook) => {
          setDevtoolsHook(newHook, target);
        });
        setTimeout(() => {
          if (!exports2.devtools) {
            target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
            buffer = [];
          }
        }, 3e3);
      } else {
        buffer = [];
      }
    }
    function emit(instance, event, ...rawArgs) {
      if (instance.isUnmounted)
        return;
      const props = instance.vnode.props || shared.EMPTY_OBJ;
      let args = rawArgs;
      const isModelListener = event.startsWith("update:");
      const modelArg = isModelListener && event.slice(7);
      if (modelArg && modelArg in props) {
        const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
        const { number, trim } = props[modifiersKey] || shared.EMPTY_OBJ;
        if (trim) {
          args = rawArgs.map((a) => a.trim());
        }
        if (number) {
          args = rawArgs.map(shared.toNumber);
        }
      }
      let handlerName;
      let handler = props[handlerName = shared.toHandlerKey(event)] || props[handlerName = shared.toHandlerKey(shared.camelize(event))];
      if (!handler && isModelListener) {
        handler = props[handlerName = shared.toHandlerKey(shared.hyphenate(event))];
      }
      if (handler) {
        callWithAsyncErrorHandling(handler, instance, 6, args);
      }
      const onceHandler = props[handlerName + `Once`];
      if (onceHandler) {
        if (!instance.emitted) {
          instance.emitted = {};
        } else if (instance.emitted[handlerName]) {
          return;
        }
        instance.emitted[handlerName] = true;
        callWithAsyncErrorHandling(onceHandler, instance, 6, args);
      }
    }
    function normalizeEmitsOptions(comp, appContext, asMixin = false) {
      const cache = appContext.emitsCache;
      const cached = cache.get(comp);
      if (cached !== void 0) {
        return cached;
      }
      const raw = comp.emits;
      let normalized = {};
      let hasExtends = false;
      if (!shared.isFunction(comp)) {
        const extendEmits = (raw2) => {
          const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
          if (normalizedFromExtend) {
            hasExtends = true;
            shared.extend(normalized, normalizedFromExtend);
          }
        };
        if (!asMixin && appContext.mixins.length) {
          appContext.mixins.forEach(extendEmits);
        }
        if (comp.extends) {
          extendEmits(comp.extends);
        }
        if (comp.mixins) {
          comp.mixins.forEach(extendEmits);
        }
      }
      if (!raw && !hasExtends) {
        if (shared.isObject(comp)) {
          cache.set(comp, null);
        }
        return null;
      }
      if (shared.isArray(raw)) {
        raw.forEach((key) => normalized[key] = null);
      } else {
        shared.extend(normalized, raw);
      }
      if (shared.isObject(comp)) {
        cache.set(comp, normalized);
      }
      return normalized;
    }
    function isEmitListener(options, key) {
      if (!options || !shared.isOn(key)) {
        return false;
      }
      key = key.slice(2).replace(/Once$/, "");
      return shared.hasOwn(options, key[0].toLowerCase() + key.slice(1)) || shared.hasOwn(options, shared.hyphenate(key)) || shared.hasOwn(options, key);
    }
    var currentRenderingInstance = null;
    var currentScopeId = null;
    function setCurrentRenderingInstance(instance) {
      const prev = currentRenderingInstance;
      currentRenderingInstance = instance;
      currentScopeId = instance && instance.type.__scopeId || null;
      return prev;
    }
    function pushScopeId(id) {
      currentScopeId = id;
    }
    function popScopeId() {
      currentScopeId = null;
    }
    var withScopeId = (_id) => withCtx;
    function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
      if (!ctx)
        return fn;
      if (fn._n) {
        return fn;
      }
      const renderFnWithContext = (...args) => {
        if (renderFnWithContext._d) {
          setBlockTracking(-1);
        }
        const prevInstance = setCurrentRenderingInstance(ctx);
        let res;
        try {
          res = fn(...args);
        } finally {
          setCurrentRenderingInstance(prevInstance);
          if (renderFnWithContext._d) {
            setBlockTracking(1);
          }
        }
        return res;
      };
      renderFnWithContext._n = true;
      renderFnWithContext._c = true;
      renderFnWithContext._d = true;
      return renderFnWithContext;
    }
    function renderComponentRoot(instance) {
      const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
      let result;
      let fallthroughAttrs;
      const prev = setCurrentRenderingInstance(instance);
      try {
        if (vnode.shapeFlag & 4) {
          const proxyToUse = withProxy || proxy;
          result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
          fallthroughAttrs = attrs;
        } else {
          const render2 = Component;
          if (false)
            ;
          result = normalizeVNode(render2.length > 1 ? render2(props, false ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }) : render2(props, null));
          fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
        }
      } catch (err) {
        blockStack.length = 0;
        handleError(err, instance, 1);
        result = createVNode(Comment);
      }
      let root = result;
      if (fallthroughAttrs && inheritAttrs !== false) {
        const keys = Object.keys(fallthroughAttrs);
        const { shapeFlag } = root;
        if (keys.length) {
          if (shapeFlag & (1 | 6)) {
            if (propsOptions && keys.some(shared.isModelListener)) {
              fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
            }
            root = cloneVNode(root, fallthroughAttrs);
          }
        }
      }
      if (vnode.dirs) {
        root = cloneVNode(root);
        root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
      }
      if (vnode.transition) {
        root.transition = vnode.transition;
      }
      {
        result = root;
      }
      setCurrentRenderingInstance(prev);
      return result;
    }
    function filterSingleRoot(children) {
      let singleRoot;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isVNode(child)) {
          if (child.type !== Comment || child.children === "v-if") {
            if (singleRoot) {
              return;
            } else {
              singleRoot = child;
            }
          }
        } else {
          return;
        }
      }
      return singleRoot;
    }
    var getFunctionalFallthrough = (attrs) => {
      let res;
      for (const key in attrs) {
        if (key === "class" || key === "style" || shared.isOn(key)) {
          (res || (res = {}))[key] = attrs[key];
        }
      }
      return res;
    };
    var filterModelListeners = (attrs, props) => {
      const res = {};
      for (const key in attrs) {
        if (!shared.isModelListener(key) || !(key.slice(9) in props)) {
          res[key] = attrs[key];
        }
      }
      return res;
    };
    function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
      const { props: prevProps, children: prevChildren, component } = prevVNode;
      const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
      const emits = component.emitsOptions;
      if (nextVNode.dirs || nextVNode.transition) {
        return true;
      }
      if (optimized && patchFlag >= 0) {
        if (patchFlag & 1024) {
          return true;
        }
        if (patchFlag & 16) {
          if (!prevProps) {
            return !!nextProps;
          }
          return hasPropsChanged(prevProps, nextProps, emits);
        } else if (patchFlag & 8) {
          const dynamicProps = nextVNode.dynamicProps;
          for (let i = 0; i < dynamicProps.length; i++) {
            const key = dynamicProps[i];
            if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
              return true;
            }
          }
        }
      } else {
        if (prevChildren || nextChildren) {
          if (!nextChildren || !nextChildren.$stable) {
            return true;
          }
        }
        if (prevProps === nextProps) {
          return false;
        }
        if (!prevProps) {
          return !!nextProps;
        }
        if (!nextProps) {
          return true;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      }
      return false;
    }
    function hasPropsChanged(prevProps, nextProps, emitsOptions) {
      const nextKeys = Object.keys(nextProps);
      if (nextKeys.length !== Object.keys(prevProps).length) {
        return true;
      }
      for (let i = 0; i < nextKeys.length; i++) {
        const key = nextKeys[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
          return true;
        }
      }
      return false;
    }
    function updateHOCHostEl({ vnode, parent }, el) {
      while (parent && parent.subTree === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
      }
    }
    var isSuspense = (type) => type.__isSuspense;
    var SuspenseImpl = {
      name: "Suspense",
      __isSuspense: true,
      process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
        if (n1 == null) {
          mountSuspense(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals);
        } else {
          patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, rendererInternals);
        }
      },
      hydrate: hydrateSuspense,
      create: createSuspenseBoundary,
      normalize: normalizeSuspenseChildren
    };
    var Suspense = SuspenseImpl;
    function triggerEvent(vnode, name) {
      const eventListener = vnode.props && vnode.props[name];
      if (shared.isFunction(eventListener)) {
        eventListener();
      }
    }
    function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
      const { p: patch, o: { createElement } } = rendererInternals;
      const hiddenContainer = createElement("div");
      const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, isSVG, slotScopeIds, optimized, rendererInternals);
      patch(null, suspense.pendingBranch = vnode.ssContent, hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds);
      if (suspense.deps > 0) {
        triggerEvent(vnode, "onPending");
        triggerEvent(vnode, "onFallback");
        patch(null, vnode.ssFallback, container, anchor, parentComponent, null, isSVG, slotScopeIds);
        setActiveBranch(suspense, vnode.ssFallback);
      } else {
        suspense.resolve();
      }
    }
    function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement } }) {
      const suspense = n2.suspense = n1.suspense;
      suspense.vnode = n2;
      n2.el = n1.el;
      const newBranch = n2.ssContent;
      const newFallback = n2.ssFallback;
      const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense;
      if (pendingBranch) {
        suspense.pendingBranch = newBranch;
        if (isSameVNodeType(newBranch, pendingBranch)) {
          patch(pendingBranch, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
          if (suspense.deps <= 0) {
            suspense.resolve();
          } else if (isInFallback) {
            patch(activeBranch, newFallback, container, anchor, parentComponent, null, isSVG, slotScopeIds, optimized);
            setActiveBranch(suspense, newFallback);
          }
        } else {
          suspense.pendingId++;
          if (isHydrating) {
            suspense.isHydrating = false;
            suspense.activeBranch = pendingBranch;
          } else {
            unmount(pendingBranch, parentComponent, suspense);
          }
          suspense.deps = 0;
          suspense.effects.length = 0;
          suspense.hiddenContainer = createElement("div");
          if (isInFallback) {
            patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
            if (suspense.deps <= 0) {
              suspense.resolve();
            } else {
              patch(activeBranch, newFallback, container, anchor, parentComponent, null, isSVG, slotScopeIds, optimized);
              setActiveBranch(suspense, newFallback);
            }
          } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
            patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, isSVG, slotScopeIds, optimized);
            suspense.resolve(true);
          } else {
            patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
            if (suspense.deps <= 0) {
              suspense.resolve();
            }
          }
        }
      } else {
        if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
          patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, isSVG, slotScopeIds, optimized);
          setActiveBranch(suspense, newBranch);
        } else {
          triggerEvent(n2, "onPending");
          suspense.pendingBranch = newBranch;
          suspense.pendingId++;
          patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
          if (suspense.deps <= 0) {
            suspense.resolve();
          } else {
            const { timeout, pendingId } = suspense;
            if (timeout > 0) {
              setTimeout(() => {
                if (suspense.pendingId === pendingId) {
                  suspense.fallback(newFallback);
                }
              }, timeout);
            } else if (timeout === 0) {
              suspense.fallback(newFallback);
            }
          }
        }
      }
    }
    function createSuspenseBoundary(vnode, parent, parentComponent, container, hiddenContainer, anchor, isSVG, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
      const { p: patch, m: move, um: unmount, n: next, o: { parentNode, remove } } = rendererInternals;
      const timeout = shared.toNumber(vnode.props && vnode.props.timeout);
      const suspense = {
        vnode,
        parent,
        parentComponent,
        isSVG,
        container,
        hiddenContainer,
        anchor,
        deps: 0,
        pendingId: 0,
        timeout: typeof timeout === "number" ? timeout : -1,
        activeBranch: null,
        pendingBranch: null,
        isInFallback: true,
        isHydrating,
        isUnmounted: false,
        effects: [],
        resolve(resume = false) {
          const { vnode: vnode2, activeBranch, pendingBranch, pendingId, effects, parentComponent: parentComponent2, container: container2 } = suspense;
          if (suspense.isHydrating) {
            suspense.isHydrating = false;
          } else if (!resume) {
            const delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
            if (delayEnter) {
              activeBranch.transition.afterLeave = () => {
                if (pendingId === suspense.pendingId) {
                  move(pendingBranch, container2, anchor2, 0);
                }
              };
            }
            let { anchor: anchor2 } = suspense;
            if (activeBranch) {
              anchor2 = next(activeBranch);
              unmount(activeBranch, parentComponent2, suspense, true);
            }
            if (!delayEnter) {
              move(pendingBranch, container2, anchor2, 0);
            }
          }
          setActiveBranch(suspense, pendingBranch);
          suspense.pendingBranch = null;
          suspense.isInFallback = false;
          let parent2 = suspense.parent;
          let hasUnresolvedAncestor = false;
          while (parent2) {
            if (parent2.pendingBranch) {
              parent2.effects.push(...effects);
              hasUnresolvedAncestor = true;
              break;
            }
            parent2 = parent2.parent;
          }
          if (!hasUnresolvedAncestor) {
            queuePostFlushCb(effects);
          }
          suspense.effects = [];
          triggerEvent(vnode2, "onResolve");
        },
        fallback(fallbackVNode) {
          if (!suspense.pendingBranch) {
            return;
          }
          const { vnode: vnode2, activeBranch, parentComponent: parentComponent2, container: container2, isSVG: isSVG2 } = suspense;
          triggerEvent(vnode2, "onFallback");
          const anchor2 = next(activeBranch);
          const mountFallback = () => {
            if (!suspense.isInFallback) {
              return;
            }
            patch(null, fallbackVNode, container2, anchor2, parentComponent2, null, isSVG2, slotScopeIds, optimized);
            setActiveBranch(suspense, fallbackVNode);
          };
          const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
          if (delayEnter) {
            activeBranch.transition.afterLeave = mountFallback;
          }
          suspense.isInFallback = true;
          unmount(activeBranch, parentComponent2, null, true);
          if (!delayEnter) {
            mountFallback();
          }
        },
        move(container2, anchor2, type) {
          suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type);
          suspense.container = container2;
        },
        next() {
          return suspense.activeBranch && next(suspense.activeBranch);
        },
        registerDep(instance, setupRenderEffect) {
          const isInPendingSuspense = !!suspense.pendingBranch;
          if (isInPendingSuspense) {
            suspense.deps++;
          }
          const hydratedEl = instance.vnode.el;
          instance.asyncDep.catch((err) => {
            handleError(err, instance, 0);
          }).then((asyncSetupResult) => {
            if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
              return;
            }
            instance.asyncResolved = true;
            const { vnode: vnode2 } = instance;
            handleSetupResult(instance, asyncSetupResult, false);
            if (hydratedEl) {
              vnode2.el = hydratedEl;
            }
            const placeholder = !hydratedEl && instance.subTree.el;
            setupRenderEffect(instance, vnode2, parentNode(hydratedEl || instance.subTree.el), hydratedEl ? null : next(instance.subTree), suspense, isSVG, optimized);
            if (placeholder) {
              remove(placeholder);
            }
            updateHOCHostEl(instance, vnode2.el);
            if (isInPendingSuspense && --suspense.deps === 0) {
              suspense.resolve();
            }
          });
        },
        unmount(parentSuspense, doRemove) {
          suspense.isUnmounted = true;
          if (suspense.activeBranch) {
            unmount(suspense.activeBranch, parentComponent, parentSuspense, doRemove);
          }
          if (suspense.pendingBranch) {
            unmount(suspense.pendingBranch, parentComponent, parentSuspense, doRemove);
          }
        }
      };
      return suspense;
    }
    function hydrateSuspense(node, vnode, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals, hydrateNode) {
      const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, node.parentNode, document.createElement("div"), null, isSVG, slotScopeIds, optimized, rendererInternals, true);
      const result = hydrateNode(node, suspense.pendingBranch = vnode.ssContent, parentComponent, suspense, slotScopeIds, optimized);
      if (suspense.deps === 0) {
        suspense.resolve();
      }
      return result;
    }
    function normalizeSuspenseChildren(vnode) {
      const { shapeFlag, children } = vnode;
      const isSlotChildren = shapeFlag & 32;
      vnode.ssContent = normalizeSuspenseSlot(isSlotChildren ? children.default : children);
      vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment);
    }
    function normalizeSuspenseSlot(s) {
      let block;
      if (shared.isFunction(s)) {
        const trackBlock = isBlockTreeEnabled && s._c;
        if (trackBlock) {
          s._d = false;
          openBlock();
        }
        s = s();
        if (trackBlock) {
          s._d = true;
          block = currentBlock;
          closeBlock();
        }
      }
      if (shared.isArray(s)) {
        const singleChild = filterSingleRoot(s);
        s = singleChild;
      }
      s = normalizeVNode(s);
      if (block && !s.dynamicChildren) {
        s.dynamicChildren = block.filter((c) => c !== s);
      }
      return s;
    }
    function queueEffectWithSuspense(fn, suspense) {
      if (suspense && suspense.pendingBranch) {
        if (shared.isArray(fn)) {
          suspense.effects.push(...fn);
        } else {
          suspense.effects.push(fn);
        }
      } else {
        queuePostFlushCb(fn);
      }
    }
    function setActiveBranch(suspense, branch) {
      suspense.activeBranch = branch;
      const { vnode, parentComponent } = suspense;
      const el = vnode.el = branch.el;
      if (parentComponent && parentComponent.subTree === vnode) {
        parentComponent.vnode.el = el;
        updateHOCHostEl(parentComponent, el);
      }
    }
    function provide(key, value) {
      if (!currentInstance)
        ;
      else {
        let provides = currentInstance.provides;
        const parentProvides = currentInstance.parent && currentInstance.parent.provides;
        if (parentProvides === provides) {
          provides = currentInstance.provides = Object.create(parentProvides);
        }
        provides[key] = value;
      }
    }
    function inject(key, defaultValue, treatDefaultAsFactory = false) {
      const instance = currentInstance || currentRenderingInstance;
      if (instance) {
        const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
        if (provides && key in provides) {
          return provides[key];
        } else if (arguments.length > 1) {
          return treatDefaultAsFactory && shared.isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
        } else
          ;
      }
    }
    function watchEffect(effect, options) {
      return doWatch(effect, null, options);
    }
    function watchPostEffect(effect, options) {
      return doWatch(effect, null, { flush: "post" });
    }
    function watchSyncEffect(effect, options) {
      return doWatch(effect, null, { flush: "sync" });
    }
    var INITIAL_WATCHER_VALUE = {};
    function watch(source, cb, options) {
      return doWatch(source, cb, options);
    }
    function doWatch(source, cb, { immediate, deep, flush: flush2, onTrack, onTrigger } = shared.EMPTY_OBJ) {
      const instance = currentInstance;
      let getter;
      let forceTrigger = false;
      let isMultiSource = false;
      if (reactivity.isRef(source)) {
        getter = () => source.value;
        forceTrigger = reactivity.isShallow(source);
      } else if (reactivity.isReactive(source)) {
        getter = () => source;
        deep = true;
      } else if (shared.isArray(source)) {
        isMultiSource = true;
        forceTrigger = source.some((s) => reactivity.isReactive(s) || reactivity.isShallow(s));
        getter = () => source.map((s) => {
          if (reactivity.isRef(s)) {
            return s.value;
          } else if (reactivity.isReactive(s)) {
            return traverse(s);
          } else if (shared.isFunction(s)) {
            return callWithErrorHandling(s, instance, 2);
          } else
            ;
        });
      } else if (shared.isFunction(source)) {
        if (cb) {
          getter = () => callWithErrorHandling(source, instance, 2);
        } else {
          getter = () => {
            if (instance && instance.isUnmounted) {
              return;
            }
            if (cleanup) {
              cleanup();
            }
            return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
          };
        }
      } else {
        getter = shared.NOOP;
      }
      if (cb && deep) {
        const baseGetter = getter;
        getter = () => traverse(baseGetter());
      }
      let cleanup;
      let onCleanup = (fn) => {
        cleanup = effect.onStop = () => {
          callWithErrorHandling(fn, instance, 4);
        };
      };
      if (isInSSRComponentSetup) {
        onCleanup = shared.NOOP;
        if (!cb) {
          getter();
        } else if (immediate) {
          callWithAsyncErrorHandling(cb, instance, 3, [
            getter(),
            isMultiSource ? [] : void 0,
            onCleanup
          ]);
        }
        return shared.NOOP;
      }
      let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
      const job = () => {
        if (!effect.active) {
          return;
        }
        if (cb) {
          const newValue = effect.run();
          if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => shared.hasChanged(v, oldValue[i])) : shared.hasChanged(newValue, oldValue)) || false) {
            if (cleanup) {
              cleanup();
            }
            callWithAsyncErrorHandling(cb, instance, 3, [
              newValue,
              oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
              onCleanup
            ]);
            oldValue = newValue;
          }
        } else {
          effect.run();
        }
      };
      job.allowRecurse = !!cb;
      let scheduler;
      if (flush2 === "sync") {
        scheduler = job;
      } else if (flush2 === "post") {
        scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
      } else {
        job.pre = true;
        if (instance)
          job.id = instance.uid;
        scheduler = () => queueJob(job);
      }
      const effect = new reactivity.ReactiveEffect(getter, scheduler);
      if (cb) {
        if (immediate) {
          job();
        } else {
          oldValue = effect.run();
        }
      } else if (flush2 === "post") {
        queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
      } else {
        effect.run();
      }
      return () => {
        effect.stop();
        if (instance && instance.scope) {
          shared.remove(instance.scope.effects, effect);
        }
      };
    }
    function instanceWatch(source, value, options) {
      const publicThis = this.proxy;
      const getter = shared.isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
      let cb;
      if (shared.isFunction(value)) {
        cb = value;
      } else {
        cb = value.handler;
        options = value;
      }
      const cur = currentInstance;
      setCurrentInstance(this);
      const res = doWatch(getter, cb.bind(publicThis), options);
      if (cur) {
        setCurrentInstance(cur);
      } else {
        unsetCurrentInstance();
      }
      return res;
    }
    function createPathGetter(ctx, path) {
      const segments = path.split(".");
      return () => {
        let cur = ctx;
        for (let i = 0; i < segments.length && cur; i++) {
          cur = cur[segments[i]];
        }
        return cur;
      };
    }
    function traverse(value, seen) {
      if (!shared.isObject(value) || value["__v_skip"]) {
        return value;
      }
      seen = seen || new Set();
      if (seen.has(value)) {
        return value;
      }
      seen.add(value);
      if (reactivity.isRef(value)) {
        traverse(value.value, seen);
      } else if (shared.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          traverse(value[i], seen);
        }
      } else if (shared.isSet(value) || shared.isMap(value)) {
        value.forEach((v) => {
          traverse(v, seen);
        });
      } else if (shared.isPlainObject(value)) {
        for (const key in value) {
          traverse(value[key], seen);
        }
      }
      return value;
    }
    function useTransitionState() {
      const state = {
        isMounted: false,
        isLeaving: false,
        isUnmounting: false,
        leavingVNodes: new Map()
      };
      onMounted(() => {
        state.isMounted = true;
      });
      onBeforeUnmount(() => {
        state.isUnmounting = true;
      });
      return state;
    }
    var TransitionHookValidator = [Function, Array];
    var BaseTransitionImpl = {
      name: `BaseTransition`,
      props: {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: TransitionHookValidator,
        onEnter: TransitionHookValidator,
        onAfterEnter: TransitionHookValidator,
        onEnterCancelled: TransitionHookValidator,
        onBeforeLeave: TransitionHookValidator,
        onLeave: TransitionHookValidator,
        onAfterLeave: TransitionHookValidator,
        onLeaveCancelled: TransitionHookValidator,
        onBeforeAppear: TransitionHookValidator,
        onAppear: TransitionHookValidator,
        onAfterAppear: TransitionHookValidator,
        onAppearCancelled: TransitionHookValidator
      },
      setup(props, { slots }) {
        const instance = getCurrentInstance();
        const state = useTransitionState();
        let prevTransitionKey;
        return () => {
          const children = slots.default && getTransitionRawChildren(slots.default(), true);
          if (!children || !children.length) {
            return;
          }
          let child = children[0];
          if (children.length > 1) {
            for (const c of children) {
              if (c.type !== Comment) {
                child = c;
                break;
              }
            }
          }
          const rawProps = reactivity.toRaw(props);
          const { mode } = rawProps;
          if (state.isLeaving) {
            return emptyPlaceholder(child);
          }
          const innerChild = getKeepAliveChild(child);
          if (!innerChild) {
            return emptyPlaceholder(child);
          }
          const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
          setTransitionHooks(innerChild, enterHooks);
          const oldChild = instance.subTree;
          const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
          let transitionKeyChanged = false;
          const { getTransitionKey } = innerChild.type;
          if (getTransitionKey) {
            const key = getTransitionKey();
            if (prevTransitionKey === void 0) {
              prevTransitionKey = key;
            } else if (key !== prevTransitionKey) {
              prevTransitionKey = key;
              transitionKeyChanged = true;
            }
          }
          if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
            const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
            setTransitionHooks(oldInnerChild, leavingHooks);
            if (mode === "out-in") {
              state.isLeaving = true;
              leavingHooks.afterLeave = () => {
                state.isLeaving = false;
                instance.update();
              };
              return emptyPlaceholder(child);
            } else if (mode === "in-out" && innerChild.type !== Comment) {
              leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
                const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
                leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
                el._leaveCb = () => {
                  earlyRemove();
                  el._leaveCb = void 0;
                  delete enterHooks.delayedLeave;
                };
                enterHooks.delayedLeave = delayedLeave;
              };
            }
          }
          return child;
        };
      }
    };
    var BaseTransition = BaseTransitionImpl;
    function getLeavingNodesForType(state, vnode) {
      const { leavingVNodes } = state;
      let leavingVNodesCache = leavingVNodes.get(vnode.type);
      if (!leavingVNodesCache) {
        leavingVNodesCache = Object.create(null);
        leavingVNodes.set(vnode.type, leavingVNodesCache);
      }
      return leavingVNodesCache;
    }
    function resolveTransitionHooks(vnode, props, state, instance) {
      const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
      const key = String(vnode.key);
      const leavingVNodesCache = getLeavingNodesForType(state, vnode);
      const callHook2 = (hook, args) => {
        hook && callWithAsyncErrorHandling(hook, instance, 9, args);
      };
      const callAsyncHook = (hook, args) => {
        const done = args[1];
        callHook2(hook, args);
        if (shared.isArray(hook)) {
          if (hook.every((hook2) => hook2.length <= 1))
            done();
        } else if (hook.length <= 1) {
          done();
        }
      };
      const hooks = {
        mode,
        persisted,
        beforeEnter(el) {
          let hook = onBeforeEnter;
          if (!state.isMounted) {
            if (appear) {
              hook = onBeforeAppear || onBeforeEnter;
            } else {
              return;
            }
          }
          if (el._leaveCb) {
            el._leaveCb(true);
          }
          const leavingVNode = leavingVNodesCache[key];
          if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
            leavingVNode.el._leaveCb();
          }
          callHook2(hook, [el]);
        },
        enter(el) {
          let hook = onEnter;
          let afterHook = onAfterEnter;
          let cancelHook = onEnterCancelled;
          if (!state.isMounted) {
            if (appear) {
              hook = onAppear || onEnter;
              afterHook = onAfterAppear || onAfterEnter;
              cancelHook = onAppearCancelled || onEnterCancelled;
            } else {
              return;
            }
          }
          let called = false;
          const done = el._enterCb = (cancelled) => {
            if (called)
              return;
            called = true;
            if (cancelled) {
              callHook2(cancelHook, [el]);
            } else {
              callHook2(afterHook, [el]);
            }
            if (hooks.delayedLeave) {
              hooks.delayedLeave();
            }
            el._enterCb = void 0;
          };
          if (hook) {
            callAsyncHook(hook, [el, done]);
          } else {
            done();
          }
        },
        leave(el, remove) {
          const key2 = String(vnode.key);
          if (el._enterCb) {
            el._enterCb(true);
          }
          if (state.isUnmounting) {
            return remove();
          }
          callHook2(onBeforeLeave, [el]);
          let called = false;
          const done = el._leaveCb = (cancelled) => {
            if (called)
              return;
            called = true;
            remove();
            if (cancelled) {
              callHook2(onLeaveCancelled, [el]);
            } else {
              callHook2(onAfterLeave, [el]);
            }
            el._leaveCb = void 0;
            if (leavingVNodesCache[key2] === vnode) {
              delete leavingVNodesCache[key2];
            }
          };
          leavingVNodesCache[key2] = vnode;
          if (onLeave) {
            callAsyncHook(onLeave, [el, done]);
          } else {
            done();
          }
        },
        clone(vnode2) {
          return resolveTransitionHooks(vnode2, props, state, instance);
        }
      };
      return hooks;
    }
    function emptyPlaceholder(vnode) {
      if (isKeepAlive(vnode)) {
        vnode = cloneVNode(vnode);
        vnode.children = null;
        return vnode;
      }
    }
    function getKeepAliveChild(vnode) {
      return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
    }
    function setTransitionHooks(vnode, hooks) {
      if (vnode.shapeFlag & 6 && vnode.component) {
        setTransitionHooks(vnode.component.subTree, hooks);
      } else if (vnode.shapeFlag & 128) {
        vnode.ssContent.transition = hooks.clone(vnode.ssContent);
        vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
      } else {
        vnode.transition = hooks;
      }
    }
    function getTransitionRawChildren(children, keepComment = false, parentKey) {
      let ret = [];
      let keyedFragmentCount = 0;
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
        if (child.type === Fragment) {
          if (child.patchFlag & 128)
            keyedFragmentCount++;
          ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
        } else if (keepComment || child.type !== Comment) {
          ret.push(key != null ? cloneVNode(child, { key }) : child);
        }
      }
      if (keyedFragmentCount > 1) {
        for (let i = 0; i < ret.length; i++) {
          ret[i].patchFlag = -2;
        }
      }
      return ret;
    }
    function defineComponent(options) {
      return shared.isFunction(options) ? { setup: options, name: options.name } : options;
    }
    var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
    function defineAsyncComponent(source) {
      if (shared.isFunction(source)) {
        source = { loader: source };
      }
      const {
        loader,
        loadingComponent,
        errorComponent,
        delay = 200,
        timeout,
        suspensible = true,
        onError: userOnError
      } = source;
      let pendingRequest = null;
      let resolvedComp;
      let retries = 0;
      const retry = () => {
        retries++;
        pendingRequest = null;
        return load();
      };
      const load = () => {
        let thisRequest;
        return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
          err = err instanceof Error ? err : new Error(String(err));
          if (userOnError) {
            return new Promise((resolve2, reject) => {
              const userRetry = () => resolve2(retry());
              const userFail = () => reject(err);
              userOnError(err, userRetry, userFail, retries + 1);
            });
          } else {
            throw err;
          }
        }).then((comp) => {
          if (thisRequest !== pendingRequest && pendingRequest) {
            return pendingRequest;
          }
          if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
            comp = comp.default;
          }
          resolvedComp = comp;
          return comp;
        }));
      };
      return defineComponent({
        name: "AsyncComponentWrapper",
        __asyncLoader: load,
        get __asyncResolved() {
          return resolvedComp;
        },
        setup() {
          const instance = currentInstance;
          if (resolvedComp) {
            return () => createInnerComp(resolvedComp, instance);
          }
          const onError = (err) => {
            pendingRequest = null;
            handleError(err, instance, 13, !errorComponent);
          };
          if (suspensible && instance.suspense || isInSSRComponentSetup) {
            return load().then((comp) => {
              return () => createInnerComp(comp, instance);
            }).catch((err) => {
              onError(err);
              return () => errorComponent ? createVNode(errorComponent, {
                error: err
              }) : null;
            });
          }
          const loaded = reactivity.ref(false);
          const error = reactivity.ref();
          const delayed = reactivity.ref(!!delay);
          if (delay) {
            setTimeout(() => {
              delayed.value = false;
            }, delay);
          }
          if (timeout != null) {
            setTimeout(() => {
              if (!loaded.value && !error.value) {
                const err = new Error(`Async component timed out after ${timeout}ms.`);
                onError(err);
                error.value = err;
              }
            }, timeout);
          }
          load().then(() => {
            loaded.value = true;
            if (instance.parent && isKeepAlive(instance.parent.vnode)) {
              queueJob(instance.parent.update);
            }
          }).catch((err) => {
            onError(err);
            error.value = err;
          });
          return () => {
            if (loaded.value && resolvedComp) {
              return createInnerComp(resolvedComp, instance);
            } else if (error.value && errorComponent) {
              return createVNode(errorComponent, {
                error: error.value
              });
            } else if (loadingComponent && !delayed.value) {
              return createVNode(loadingComponent);
            }
          };
        }
      });
    }
    function createInnerComp(comp, { vnode: { ref, props, children, shapeFlag }, parent }) {
      const vnode = createVNode(comp, props, children);
      vnode.ref = ref;
      return vnode;
    }
    var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
    var KeepAliveImpl = {
      name: `KeepAlive`,
      __isKeepAlive: true,
      props: {
        include: [String, RegExp, Array],
        exclude: [String, RegExp, Array],
        max: [String, Number]
      },
      setup(props, { slots }) {
        const instance = getCurrentInstance();
        const sharedContext = instance.ctx;
        if (!sharedContext.renderer) {
          return () => {
            const children = slots.default && slots.default();
            return children && children.length === 1 ? children[0] : children;
          };
        }
        const cache = new Map();
        const keys = new Set();
        let current = null;
        const parentSuspense = instance.suspense;
        const { renderer: { p: patch, m: move, um: _unmount, o: { createElement } } } = sharedContext;
        const storageContainer = createElement("div");
        sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
          const instance2 = vnode.component;
          move(vnode, container, anchor, 0, parentSuspense);
          patch(instance2.vnode, vnode, container, anchor, instance2, parentSuspense, isSVG, vnode.slotScopeIds, optimized);
          queuePostRenderEffect(() => {
            instance2.isDeactivated = false;
            if (instance2.a) {
              shared.invokeArrayFns(instance2.a);
            }
            const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
            if (vnodeHook) {
              invokeVNodeHook(vnodeHook, instance2.parent, vnode);
            }
          }, parentSuspense);
        };
        sharedContext.deactivate = (vnode) => {
          const instance2 = vnode.component;
          move(vnode, storageContainer, null, 1, parentSuspense);
          queuePostRenderEffect(() => {
            if (instance2.da) {
              shared.invokeArrayFns(instance2.da);
            }
            const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
            if (vnodeHook) {
              invokeVNodeHook(vnodeHook, instance2.parent, vnode);
            }
            instance2.isDeactivated = true;
          }, parentSuspense);
        };
        function unmount(vnode) {
          resetShapeFlag(vnode);
          _unmount(vnode, instance, parentSuspense, true);
        }
        function pruneCache(filter) {
          cache.forEach((vnode, key) => {
            const name = getComponentName(vnode.type);
            if (name && (!filter || !filter(name))) {
              pruneCacheEntry(key);
            }
          });
        }
        function pruneCacheEntry(key) {
          const cached = cache.get(key);
          if (!current || cached.type !== current.type) {
            unmount(cached);
          } else if (current) {
            resetShapeFlag(current);
          }
          cache.delete(key);
          keys.delete(key);
        }
        watch(() => [props.include, props.exclude], ([include, exclude]) => {
          include && pruneCache((name) => matches(include, name));
          exclude && pruneCache((name) => !matches(exclude, name));
        }, { flush: "post", deep: true });
        let pendingCacheKey = null;
        const cacheSubtree = () => {
          if (pendingCacheKey != null) {
            cache.set(pendingCacheKey, getInnerChild(instance.subTree));
          }
        };
        onMounted(cacheSubtree);
        onUpdated(cacheSubtree);
        onBeforeUnmount(() => {
          cache.forEach((cached) => {
            const { subTree, suspense } = instance;
            const vnode = getInnerChild(subTree);
            if (cached.type === vnode.type) {
              resetShapeFlag(vnode);
              const da = vnode.component.da;
              da && queuePostRenderEffect(da, suspense);
              return;
            }
            unmount(cached);
          });
        });
        return () => {
          pendingCacheKey = null;
          if (!slots.default) {
            return null;
          }
          const children = slots.default();
          const rawVNode = children[0];
          if (children.length > 1) {
            current = null;
            return children;
          } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
            current = null;
            return rawVNode;
          }
          let vnode = getInnerChild(rawVNode);
          const comp = vnode.type;
          const name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
          const { include, exclude, max } = props;
          if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
            current = vnode;
            return rawVNode;
          }
          const key = vnode.key == null ? comp : vnode.key;
          const cachedVNode = cache.get(key);
          if (vnode.el) {
            vnode = cloneVNode(vnode);
            if (rawVNode.shapeFlag & 128) {
              rawVNode.ssContent = vnode;
            }
          }
          pendingCacheKey = key;
          if (cachedVNode) {
            vnode.el = cachedVNode.el;
            vnode.component = cachedVNode.component;
            if (vnode.transition) {
              setTransitionHooks(vnode, vnode.transition);
            }
            vnode.shapeFlag |= 512;
            keys.delete(key);
            keys.add(key);
          } else {
            keys.add(key);
            if (max && keys.size > parseInt(max, 10)) {
              pruneCacheEntry(keys.values().next().value);
            }
          }
          vnode.shapeFlag |= 256;
          current = vnode;
          return isSuspense(rawVNode.type) ? rawVNode : vnode;
        };
      }
    };
    var KeepAlive = KeepAliveImpl;
    function matches(pattern, name) {
      if (shared.isArray(pattern)) {
        return pattern.some((p) => matches(p, name));
      } else if (shared.isString(pattern)) {
        return pattern.split(",").includes(name);
      } else if (pattern.test) {
        return pattern.test(name);
      }
      return false;
    }
    function onActivated(hook, target) {
      registerKeepAliveHook(hook, "a", target);
    }
    function onDeactivated(hook, target) {
      registerKeepAliveHook(hook, "da", target);
    }
    function registerKeepAliveHook(hook, type, target = currentInstance) {
      const wrappedHook = hook.__wdc || (hook.__wdc = () => {
        let current = target;
        while (current) {
          if (current.isDeactivated) {
            return;
          }
          current = current.parent;
        }
        return hook();
      });
      injectHook(type, wrappedHook, target);
      if (target) {
        let current = target.parent;
        while (current && current.parent) {
          if (isKeepAlive(current.parent.vnode)) {
            injectToKeepAliveRoot(wrappedHook, type, target, current);
          }
          current = current.parent;
        }
      }
    }
    function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
      const injected = injectHook(type, hook, keepAliveRoot, true);
      onUnmounted(() => {
        shared.remove(keepAliveRoot[type], injected);
      }, target);
    }
    function resetShapeFlag(vnode) {
      let shapeFlag = vnode.shapeFlag;
      if (shapeFlag & 256) {
        shapeFlag -= 256;
      }
      if (shapeFlag & 512) {
        shapeFlag -= 512;
      }
      vnode.shapeFlag = shapeFlag;
    }
    function getInnerChild(vnode) {
      return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
    }
    function injectHook(type, hook, target = currentInstance, prepend = false) {
      if (target) {
        const hooks = target[type] || (target[type] = []);
        const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
          if (target.isUnmounted) {
            return;
          }
          reactivity.pauseTracking();
          setCurrentInstance(target);
          const res = callWithAsyncErrorHandling(hook, target, type, args);
          unsetCurrentInstance();
          reactivity.resetTracking();
          return res;
        });
        if (prepend) {
          hooks.unshift(wrappedHook);
        } else {
          hooks.push(wrappedHook);
        }
        return wrappedHook;
      }
    }
    var createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target);
    var onBeforeMount = createHook("bm");
    var onMounted = createHook("m");
    var onBeforeUpdate = createHook("bu");
    var onUpdated = createHook("u");
    var onBeforeUnmount = createHook("bum");
    var onUnmounted = createHook("um");
    var onServerPrefetch = createHook("sp");
    var onRenderTriggered = createHook("rtg");
    var onRenderTracked = createHook("rtc");
    function onErrorCaptured(hook, target = currentInstance) {
      injectHook("ec", hook, target);
    }
    function withDirectives(vnode, directives) {
      const internalInstance = currentRenderingInstance;
      if (internalInstance === null) {
        return vnode;
      }
      const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
      const bindings = vnode.dirs || (vnode.dirs = []);
      for (let i = 0; i < directives.length; i++) {
        let [dir, value, arg, modifiers = shared.EMPTY_OBJ] = directives[i];
        if (shared.isFunction(dir)) {
          dir = {
            mounted: dir,
            updated: dir
          };
        }
        if (dir.deep) {
          traverse(value);
        }
        bindings.push({
          dir,
          instance,
          value,
          oldValue: void 0,
          arg,
          modifiers
        });
      }
      return vnode;
    }
    function invokeDirectiveHook(vnode, prevVNode, instance, name) {
      const bindings = vnode.dirs;
      const oldBindings = prevVNode && prevVNode.dirs;
      for (let i = 0; i < bindings.length; i++) {
        const binding = bindings[i];
        if (oldBindings) {
          binding.oldValue = oldBindings[i].value;
        }
        let hook = binding.dir[name];
        if (hook) {
          reactivity.pauseTracking();
          callWithAsyncErrorHandling(hook, instance, 8, [
            vnode.el,
            binding,
            vnode,
            prevVNode
          ]);
          reactivity.resetTracking();
        }
      }
    }
    var COMPONENTS = "components";
    var DIRECTIVES = "directives";
    function resolveComponent(name, maybeSelfReference) {
      return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
    }
    var NULL_DYNAMIC_COMPONENT = Symbol();
    function resolveDynamicComponent(component) {
      if (shared.isString(component)) {
        return resolveAsset(COMPONENTS, component, false) || component;
      } else {
        return component || NULL_DYNAMIC_COMPONENT;
      }
    }
    function resolveDirective(name) {
      return resolveAsset(DIRECTIVES, name);
    }
    function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
      const instance = currentRenderingInstance || currentInstance;
      if (instance) {
        const Component = instance.type;
        if (type === COMPONENTS) {
          const selfName = getComponentName(Component, false);
          if (selfName && (selfName === name || selfName === shared.camelize(name) || selfName === shared.capitalize(shared.camelize(name)))) {
            return Component;
          }
        }
        const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
        if (!res && maybeSelfReference) {
          return Component;
        }
        return res;
      }
    }
    function resolve(registry, name) {
      return registry && (registry[name] || registry[shared.camelize(name)] || registry[shared.capitalize(shared.camelize(name))]);
    }
    function renderList(source, renderItem, cache, index) {
      let ret;
      const cached = cache && cache[index];
      if (shared.isArray(source) || shared.isString(source)) {
        ret = new Array(source.length);
        for (let i = 0, l = source.length; i < l; i++) {
          ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
        }
      } else if (typeof source === "number") {
        ret = new Array(source);
        for (let i = 0; i < source; i++) {
          ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
        }
      } else if (shared.isObject(source)) {
        if (source[Symbol.iterator]) {
          ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
        } else {
          const keys = Object.keys(source);
          ret = new Array(keys.length);
          for (let i = 0, l = keys.length; i < l; i++) {
            const key = keys[i];
            ret[i] = renderItem(source[key], key, i, cached && cached[i]);
          }
        }
      } else {
        ret = [];
      }
      if (cache) {
        cache[index] = ret;
      }
      return ret;
    }
    function createSlots(slots, dynamicSlots) {
      for (let i = 0; i < dynamicSlots.length; i++) {
        const slot = dynamicSlots[i];
        if (shared.isArray(slot)) {
          for (let j = 0; j < slot.length; j++) {
            slots[slot[j].name] = slot[j].fn;
          }
        } else if (slot) {
          slots[slot.name] = slot.key ? (...args) => {
            const res = slot.fn(...args);
            if (res)
              res.key = slot.key;
            return res;
          } : slot.fn;
        }
      }
      return slots;
    }
    function renderSlot(slots, name, props = {}, fallback, noSlotted) {
      if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
        return createVNode("slot", name === "default" ? null : { name }, fallback && fallback());
      }
      let slot = slots[name];
      if (slot && slot._c) {
        slot._d = false;
      }
      openBlock();
      const validSlotContent = slot && ensureValidVNode(slot(props));
      const rendered = createBlock(Fragment, {
        key: props.key || validSlotContent && validSlotContent.key || `_${name}`
      }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
      if (!noSlotted && rendered.scopeId) {
        rendered.slotScopeIds = [rendered.scopeId + "-s"];
      }
      if (slot && slot._c) {
        slot._d = true;
      }
      return rendered;
    }
    function ensureValidVNode(vnodes) {
      return vnodes.some((child) => {
        if (!isVNode(child))
          return true;
        if (child.type === Comment)
          return false;
        if (child.type === Fragment && !ensureValidVNode(child.children))
          return false;
        return true;
      }) ? vnodes : null;
    }
    function toHandlers(obj, preserveCaseIfNecessary) {
      const ret = {};
      for (const key in obj) {
        ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : shared.toHandlerKey(key)] = obj[key];
      }
      return ret;
    }
    var getPublicInstance = (i) => {
      if (!i)
        return null;
      if (isStatefulComponent(i))
        return getExposeProxy(i) || i.proxy;
      return getPublicInstance(i.parent);
    };
    var publicPropertiesMap = /* @__PURE__ */ shared.extend(Object.create(null), {
      $: (i) => i,
      $el: (i) => i.vnode.el,
      $data: (i) => i.data,
      $props: (i) => i.props,
      $attrs: (i) => i.attrs,
      $slots: (i) => i.slots,
      $refs: (i) => i.refs,
      $parent: (i) => getPublicInstance(i.parent),
      $root: (i) => getPublicInstance(i.root),
      $emit: (i) => i.emit,
      $options: (i) => resolveMergedOptions(i),
      $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
      $nextTick: (i) => i.n || (i.n = nextTick2.bind(i.proxy)),
      $watch: (i) => instanceWatch.bind(i)
    });
    var PublicInstanceProxyHandlers = {
      get({ _: instance }, key) {
        const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
        let normalizedProps;
        if (key[0] !== "$") {
          const n = accessCache[key];
          if (n !== void 0) {
            switch (n) {
              case 1:
                return setupState[key];
              case 2:
                return data[key];
              case 4:
                return ctx[key];
              case 3:
                return props[key];
            }
          } else if (setupState !== shared.EMPTY_OBJ && shared.hasOwn(setupState, key)) {
            accessCache[key] = 1;
            return setupState[key];
          } else if (data !== shared.EMPTY_OBJ && shared.hasOwn(data, key)) {
            accessCache[key] = 2;
            return data[key];
          } else if ((normalizedProps = instance.propsOptions[0]) && shared.hasOwn(normalizedProps, key)) {
            accessCache[key] = 3;
            return props[key];
          } else if (ctx !== shared.EMPTY_OBJ && shared.hasOwn(ctx, key)) {
            accessCache[key] = 4;
            return ctx[key];
          } else if (shouldCacheAccess) {
            accessCache[key] = 0;
          }
        }
        const publicGetter = publicPropertiesMap[key];
        let cssModule, globalProperties;
        if (publicGetter) {
          if (key === "$attrs") {
            reactivity.track(instance, "get", key);
          }
          return publicGetter(instance);
        } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
          return cssModule;
        } else if (ctx !== shared.EMPTY_OBJ && shared.hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (globalProperties = appContext.config.globalProperties, shared.hasOwn(globalProperties, key)) {
          {
            return globalProperties[key];
          }
        } else
          ;
      },
      set({ _: instance }, key, value) {
        const { data, setupState, ctx } = instance;
        if (setupState !== shared.EMPTY_OBJ && shared.hasOwn(setupState, key)) {
          setupState[key] = value;
          return true;
        } else if (data !== shared.EMPTY_OBJ && shared.hasOwn(data, key)) {
          data[key] = value;
          return true;
        } else if (shared.hasOwn(instance.props, key)) {
          return false;
        }
        if (key[0] === "$" && key.slice(1) in instance) {
          return false;
        } else {
          {
            ctx[key] = value;
          }
        }
        return true;
      },
      has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
        let normalizedProps;
        return !!accessCache[key] || data !== shared.EMPTY_OBJ && shared.hasOwn(data, key) || setupState !== shared.EMPTY_OBJ && shared.hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && shared.hasOwn(normalizedProps, key) || shared.hasOwn(ctx, key) || shared.hasOwn(publicPropertiesMap, key) || shared.hasOwn(appContext.config.globalProperties, key);
      },
      defineProperty(target, key, descriptor) {
        if (descriptor.get != null) {
          target._.accessCache[key] = 0;
        } else if (shared.hasOwn(descriptor, "value")) {
          this.set(target, key, descriptor.value, null);
        }
        return Reflect.defineProperty(target, key, descriptor);
      }
    };
    var RuntimeCompiledPublicInstanceProxyHandlers = /* @__PURE__ */ shared.extend({}, PublicInstanceProxyHandlers, {
      get(target, key) {
        if (key === Symbol.unscopables) {
          return;
        }
        return PublicInstanceProxyHandlers.get(target, key, target);
      },
      has(_, key) {
        const has = key[0] !== "_" && !shared.isGloballyWhitelisted(key);
        return has;
      }
    });
    var shouldCacheAccess = true;
    function applyOptions(instance) {
      const options = resolveMergedOptions(instance);
      const publicThis = instance.proxy;
      const ctx = instance.ctx;
      shouldCacheAccess = false;
      if (options.beforeCreate) {
        callHook(options.beforeCreate, instance, "bc");
      }
      const {
        data: dataOptions,
        computed: computedOptions,
        methods,
        watch: watchOptions,
        provide: provideOptions,
        inject: injectOptions,
        created,
        beforeMount,
        mounted,
        beforeUpdate,
        updated,
        activated,
        deactivated,
        beforeDestroy,
        beforeUnmount,
        destroyed,
        unmounted,
        render,
        renderTracked,
        renderTriggered,
        errorCaptured,
        serverPrefetch,
        expose,
        inheritAttrs,
        components,
        directives,
        filters
      } = options;
      const checkDuplicateProperties = null;
      if (injectOptions) {
        resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
      }
      if (methods) {
        for (const key in methods) {
          const methodHandler = methods[key];
          if (shared.isFunction(methodHandler)) {
            {
              ctx[key] = methodHandler.bind(publicThis);
            }
          }
        }
      }
      if (dataOptions) {
        const data = dataOptions.call(publicThis, publicThis);
        if (!shared.isObject(data))
          ;
        else {
          instance.data = reactivity.reactive(data);
        }
      }
      shouldCacheAccess = true;
      if (computedOptions) {
        for (const key in computedOptions) {
          const opt = computedOptions[key];
          const get = shared.isFunction(opt) ? opt.bind(publicThis, publicThis) : shared.isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : shared.NOOP;
          const set = !shared.isFunction(opt) && shared.isFunction(opt.set) ? opt.set.bind(publicThis) : shared.NOOP;
          const c = computed({
            get,
            set
          });
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: () => c.value,
            set: (v) => c.value = v
          });
        }
      }
      if (watchOptions) {
        for (const key in watchOptions) {
          createWatcher(watchOptions[key], ctx, publicThis, key);
        }
      }
      if (provideOptions) {
        const provides = shared.isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
        Reflect.ownKeys(provides).forEach((key) => {
          provide(key, provides[key]);
        });
      }
      if (created) {
        callHook(created, instance, "c");
      }
      function registerLifecycleHook(register, hook) {
        if (shared.isArray(hook)) {
          hook.forEach((_hook) => register(_hook.bind(publicThis)));
        } else if (hook) {
          register(hook.bind(publicThis));
        }
      }
      registerLifecycleHook(onBeforeMount, beforeMount);
      registerLifecycleHook(onMounted, mounted);
      registerLifecycleHook(onBeforeUpdate, beforeUpdate);
      registerLifecycleHook(onUpdated, updated);
      registerLifecycleHook(onActivated, activated);
      registerLifecycleHook(onDeactivated, deactivated);
      registerLifecycleHook(onErrorCaptured, errorCaptured);
      registerLifecycleHook(onRenderTracked, renderTracked);
      registerLifecycleHook(onRenderTriggered, renderTriggered);
      registerLifecycleHook(onBeforeUnmount, beforeUnmount);
      registerLifecycleHook(onUnmounted, unmounted);
      registerLifecycleHook(onServerPrefetch, serverPrefetch);
      if (shared.isArray(expose)) {
        if (expose.length) {
          const exposed = instance.exposed || (instance.exposed = {});
          expose.forEach((key) => {
            Object.defineProperty(exposed, key, {
              get: () => publicThis[key],
              set: (val) => publicThis[key] = val
            });
          });
        } else if (!instance.exposed) {
          instance.exposed = {};
        }
      }
      if (render && instance.render === shared.NOOP) {
        instance.render = render;
      }
      if (inheritAttrs != null) {
        instance.inheritAttrs = inheritAttrs;
      }
      if (components)
        instance.components = components;
      if (directives)
        instance.directives = directives;
    }
    function resolveInjections(injectOptions, ctx, checkDuplicateProperties = shared.NOOP, unwrapRef = false) {
      if (shared.isArray(injectOptions)) {
        injectOptions = normalizeInject(injectOptions);
      }
      for (const key in injectOptions) {
        const opt = injectOptions[key];
        let injected;
        if (shared.isObject(opt)) {
          if ("default" in opt) {
            injected = inject(opt.from || key, opt.default, true);
          } else {
            injected = inject(opt.from || key);
          }
        } else {
          injected = inject(opt);
        }
        if (reactivity.isRef(injected)) {
          if (unwrapRef) {
            Object.defineProperty(ctx, key, {
              enumerable: true,
              configurable: true,
              get: () => injected.value,
              set: (v) => injected.value = v
            });
          } else {
            ctx[key] = injected;
          }
        } else {
          ctx[key] = injected;
        }
      }
    }
    function callHook(hook, instance, type) {
      callWithAsyncErrorHandling(shared.isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
    }
    function createWatcher(raw, ctx, publicThis, key) {
      const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
      if (shared.isString(raw)) {
        const handler = ctx[raw];
        if (shared.isFunction(handler)) {
          watch(getter, handler);
        }
      } else if (shared.isFunction(raw)) {
        watch(getter, raw.bind(publicThis));
      } else if (shared.isObject(raw)) {
        if (shared.isArray(raw)) {
          raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
        } else {
          const handler = shared.isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
          if (shared.isFunction(handler)) {
            watch(getter, handler, raw);
          }
        }
      } else
        ;
    }
    function resolveMergedOptions(instance) {
      const base = instance.type;
      const { mixins, extends: extendsOptions } = base;
      const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
      const cached = cache.get(base);
      let resolved;
      if (cached) {
        resolved = cached;
      } else if (!globalMixins.length && !mixins && !extendsOptions) {
        {
          resolved = base;
        }
      } else {
        resolved = {};
        if (globalMixins.length) {
          globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
        }
        mergeOptions(resolved, base, optionMergeStrategies);
      }
      if (shared.isObject(base)) {
        cache.set(base, resolved);
      }
      return resolved;
    }
    function mergeOptions(to, from, strats, asMixin = false) {
      const { mixins, extends: extendsOptions } = from;
      if (extendsOptions) {
        mergeOptions(to, extendsOptions, strats, true);
      }
      if (mixins) {
        mixins.forEach((m) => mergeOptions(to, m, strats, true));
      }
      for (const key in from) {
        if (asMixin && key === "expose")
          ;
        else {
          const strat = internalOptionMergeStrats[key] || strats && strats[key];
          to[key] = strat ? strat(to[key], from[key]) : from[key];
        }
      }
      return to;
    }
    var internalOptionMergeStrats = {
      data: mergeDataFn,
      props: mergeObjectOptions,
      emits: mergeObjectOptions,
      methods: mergeObjectOptions,
      computed: mergeObjectOptions,
      beforeCreate: mergeAsArray,
      created: mergeAsArray,
      beforeMount: mergeAsArray,
      mounted: mergeAsArray,
      beforeUpdate: mergeAsArray,
      updated: mergeAsArray,
      beforeDestroy: mergeAsArray,
      beforeUnmount: mergeAsArray,
      destroyed: mergeAsArray,
      unmounted: mergeAsArray,
      activated: mergeAsArray,
      deactivated: mergeAsArray,
      errorCaptured: mergeAsArray,
      serverPrefetch: mergeAsArray,
      components: mergeObjectOptions,
      directives: mergeObjectOptions,
      watch: mergeWatchOptions,
      provide: mergeDataFn,
      inject: mergeInject
    };
    function mergeDataFn(to, from) {
      if (!from) {
        return to;
      }
      if (!to) {
        return from;
      }
      return function mergedDataFn() {
        return shared.extend(shared.isFunction(to) ? to.call(this, this) : to, shared.isFunction(from) ? from.call(this, this) : from);
      };
    }
    function mergeInject(to, from) {
      return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
    }
    function normalizeInject(raw) {
      if (shared.isArray(raw)) {
        const res = {};
        for (let i = 0; i < raw.length; i++) {
          res[raw[i]] = raw[i];
        }
        return res;
      }
      return raw;
    }
    function mergeAsArray(to, from) {
      return to ? [...new Set([].concat(to, from))] : from;
    }
    function mergeObjectOptions(to, from) {
      return to ? shared.extend(shared.extend(Object.create(null), to), from) : from;
    }
    function mergeWatchOptions(to, from) {
      if (!to)
        return from;
      if (!from)
        return to;
      const merged = shared.extend(Object.create(null), to);
      for (const key in from) {
        merged[key] = mergeAsArray(to[key], from[key]);
      }
      return merged;
    }
    function initProps(instance, rawProps, isStateful, isSSR = false) {
      const props = {};
      const attrs = {};
      shared.def(attrs, InternalObjectKey, 1);
      instance.propsDefaults = Object.create(null);
      setFullProps(instance, rawProps, props, attrs);
      for (const key in instance.propsOptions[0]) {
        if (!(key in props)) {
          props[key] = void 0;
        }
      }
      if (isStateful) {
        instance.props = isSSR ? props : reactivity.shallowReactive(props);
      } else {
        if (!instance.type.props) {
          instance.props = attrs;
        } else {
          instance.props = props;
        }
      }
      instance.attrs = attrs;
    }
    function updateProps(instance, rawProps, rawPrevProps, optimized) {
      const { props, attrs, vnode: { patchFlag } } = instance;
      const rawCurrentProps = reactivity.toRaw(props);
      const [options] = instance.propsOptions;
      let hasAttrsChanged = false;
      if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
        if (patchFlag & 8) {
          const propsToUpdate = instance.vnode.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            let key = propsToUpdate[i];
            if (isEmitListener(instance.emitsOptions, key)) {
              continue;
            }
            const value = rawProps[key];
            if (options) {
              if (shared.hasOwn(attrs, key)) {
                if (value !== attrs[key]) {
                  attrs[key] = value;
                  hasAttrsChanged = true;
                }
              } else {
                const camelizedKey = shared.camelize(key);
                props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
              }
            } else {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            }
          }
        }
      } else {
        if (setFullProps(instance, rawProps, props, attrs)) {
          hasAttrsChanged = true;
        }
        let kebabKey;
        for (const key in rawCurrentProps) {
          if (!rawProps || !shared.hasOwn(rawProps, key) && ((kebabKey = shared.hyphenate(key)) === key || !shared.hasOwn(rawProps, kebabKey))) {
            if (options) {
              if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
                props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
              }
            } else {
              delete props[key];
            }
          }
        }
        if (attrs !== rawCurrentProps) {
          for (const key in attrs) {
            if (!rawProps || !shared.hasOwn(rawProps, key) && true) {
              delete attrs[key];
              hasAttrsChanged = true;
            }
          }
        }
      }
      if (hasAttrsChanged) {
        reactivity.trigger(instance, "set", "$attrs");
      }
    }
    function setFullProps(instance, rawProps, props, attrs) {
      const [options, needCastKeys] = instance.propsOptions;
      let hasAttrsChanged = false;
      let rawCastValues;
      if (rawProps) {
        for (let key in rawProps) {
          if (shared.isReservedProp(key)) {
            continue;
          }
          const value = rawProps[key];
          let camelKey;
          if (options && shared.hasOwn(options, camelKey = shared.camelize(key))) {
            if (!needCastKeys || !needCastKeys.includes(camelKey)) {
              props[camelKey] = value;
            } else {
              (rawCastValues || (rawCastValues = {}))[camelKey] = value;
            }
          } else if (!isEmitListener(instance.emitsOptions, key)) {
            if (!(key in attrs) || value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
      if (needCastKeys) {
        const rawCurrentProps = reactivity.toRaw(props);
        const castValues = rawCastValues || shared.EMPTY_OBJ;
        for (let i = 0; i < needCastKeys.length; i++) {
          const key = needCastKeys[i];
          props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !shared.hasOwn(castValues, key));
        }
      }
      return hasAttrsChanged;
    }
    function resolvePropValue(options, props, key, value, instance, isAbsent) {
      const opt = options[key];
      if (opt != null) {
        const hasDefault = shared.hasOwn(opt, "default");
        if (hasDefault && value === void 0) {
          const defaultValue = opt.default;
          if (opt.type !== Function && shared.isFunction(defaultValue)) {
            const { propsDefaults } = instance;
            if (key in propsDefaults) {
              value = propsDefaults[key];
            } else {
              setCurrentInstance(instance);
              value = propsDefaults[key] = defaultValue.call(null, props);
              unsetCurrentInstance();
            }
          } else {
            value = defaultValue;
          }
        }
        if (opt[0]) {
          if (isAbsent && !hasDefault) {
            value = false;
          } else if (opt[1] && (value === "" || value === shared.hyphenate(key))) {
            value = true;
          }
        }
      }
      return value;
    }
    function normalizePropsOptions(comp, appContext, asMixin = false) {
      const cache = appContext.propsCache;
      const cached = cache.get(comp);
      if (cached) {
        return cached;
      }
      const raw = comp.props;
      const normalized = {};
      const needCastKeys = [];
      let hasExtends = false;
      if (!shared.isFunction(comp)) {
        const extendProps = (raw2) => {
          hasExtends = true;
          const [props, keys] = normalizePropsOptions(raw2, appContext, true);
          shared.extend(normalized, props);
          if (keys)
            needCastKeys.push(...keys);
        };
        if (!asMixin && appContext.mixins.length) {
          appContext.mixins.forEach(extendProps);
        }
        if (comp.extends) {
          extendProps(comp.extends);
        }
        if (comp.mixins) {
          comp.mixins.forEach(extendProps);
        }
      }
      if (!raw && !hasExtends) {
        if (shared.isObject(comp)) {
          cache.set(comp, shared.EMPTY_ARR);
        }
        return shared.EMPTY_ARR;
      }
      if (shared.isArray(raw)) {
        for (let i = 0; i < raw.length; i++) {
          const normalizedKey = shared.camelize(raw[i]);
          if (validatePropName(normalizedKey)) {
            normalized[normalizedKey] = shared.EMPTY_OBJ;
          }
        }
      } else if (raw) {
        for (const key in raw) {
          const normalizedKey = shared.camelize(key);
          if (validatePropName(normalizedKey)) {
            const opt = raw[key];
            const prop = normalized[normalizedKey] = shared.isArray(opt) || shared.isFunction(opt) ? { type: opt } : opt;
            if (prop) {
              const booleanIndex = getTypeIndex(Boolean, prop.type);
              const stringIndex = getTypeIndex(String, prop.type);
              prop[0] = booleanIndex > -1;
              prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
              if (booleanIndex > -1 || shared.hasOwn(prop, "default")) {
                needCastKeys.push(normalizedKey);
              }
            }
          }
        }
      }
      const res = [normalized, needCastKeys];
      if (shared.isObject(comp)) {
        cache.set(comp, res);
      }
      return res;
    }
    function validatePropName(key) {
      if (key[0] !== "$") {
        return true;
      }
      return false;
    }
    function getType(ctor) {
      const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
      return match ? match[1] : ctor === null ? "null" : "";
    }
    function isSameType(a, b) {
      return getType(a) === getType(b);
    }
    function getTypeIndex(type, expectedTypes) {
      if (shared.isArray(expectedTypes)) {
        return expectedTypes.findIndex((t) => isSameType(t, type));
      } else if (shared.isFunction(expectedTypes)) {
        return isSameType(expectedTypes, type) ? 0 : -1;
      }
      return -1;
    }
    var isInternalKey = (key) => key[0] === "_" || key === "$stable";
    var normalizeSlotValue = (value) => shared.isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
    var normalizeSlot = (key, rawSlot, ctx) => {
      if (rawSlot._n) {
        return rawSlot;
      }
      const normalized = withCtx((...args) => {
        if (false)
          ;
        return normalizeSlotValue(rawSlot(...args));
      }, ctx);
      normalized._c = false;
      return normalized;
    };
    var normalizeObjectSlots = (rawSlots, slots, instance) => {
      const ctx = rawSlots._ctx;
      for (const key in rawSlots) {
        if (isInternalKey(key))
          continue;
        const value = rawSlots[key];
        if (shared.isFunction(value)) {
          slots[key] = normalizeSlot(key, value, ctx);
        } else if (value != null) {
          const normalized = normalizeSlotValue(value);
          slots[key] = () => normalized;
        }
      }
    };
    var normalizeVNodeSlots = (instance, children) => {
      const normalized = normalizeSlotValue(children);
      instance.slots.default = () => normalized;
    };
    var initSlots = (instance, children) => {
      if (instance.vnode.shapeFlag & 32) {
        const type = children._;
        if (type) {
          instance.slots = reactivity.toRaw(children);
          shared.def(children, "_", type);
        } else {
          normalizeObjectSlots(children, instance.slots = {});
        }
      } else {
        instance.slots = {};
        if (children) {
          normalizeVNodeSlots(instance, children);
        }
      }
      shared.def(instance.slots, InternalObjectKey, 1);
    };
    var updateSlots = (instance, children, optimized) => {
      const { vnode, slots } = instance;
      let needDeletionCheck = true;
      let deletionComparisonTarget = shared.EMPTY_OBJ;
      if (vnode.shapeFlag & 32) {
        const type = children._;
        if (type) {
          if (optimized && type === 1) {
            needDeletionCheck = false;
          } else {
            shared.extend(slots, children);
            if (!optimized && type === 1) {
              delete slots._;
            }
          }
        } else {
          needDeletionCheck = !children.$stable;
          normalizeObjectSlots(children, slots);
        }
        deletionComparisonTarget = children;
      } else if (children) {
        normalizeVNodeSlots(instance, children);
        deletionComparisonTarget = { default: 1 };
      }
      if (needDeletionCheck) {
        for (const key in slots) {
          if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
            delete slots[key];
          }
        }
      }
    };
    function createAppContext() {
      return {
        app: null,
        config: {
          isNativeTag: shared.NO,
          performance: false,
          globalProperties: {},
          optionMergeStrategies: {},
          errorHandler: void 0,
          warnHandler: void 0,
          compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap()
      };
    }
    var uid = 0;
    function createAppAPI(render, hydrate) {
      return function createApp(rootComponent, rootProps = null) {
        if (!shared.isFunction(rootComponent)) {
          rootComponent = { ...rootComponent };
        }
        if (rootProps != null && !shared.isObject(rootProps)) {
          rootProps = null;
        }
        const context = createAppContext();
        const installedPlugins = new Set();
        let isMounted = false;
        const app = context.app = {
          _uid: uid++,
          _component: rootComponent,
          _props: rootProps,
          _container: null,
          _context: context,
          _instance: null,
          version,
          get config() {
            return context.config;
          },
          set config(v) {
          },
          use(plugin, ...options) {
            if (installedPlugins.has(plugin))
              ;
            else if (plugin && shared.isFunction(plugin.install)) {
              installedPlugins.add(plugin);
              plugin.install(app, ...options);
            } else if (shared.isFunction(plugin)) {
              installedPlugins.add(plugin);
              plugin(app, ...options);
            } else
              ;
            return app;
          },
          mixin(mixin) {
            {
              if (!context.mixins.includes(mixin)) {
                context.mixins.push(mixin);
              }
            }
            return app;
          },
          component(name, component) {
            if (!component) {
              return context.components[name];
            }
            context.components[name] = component;
            return app;
          },
          directive(name, directive) {
            if (!directive) {
              return context.directives[name];
            }
            context.directives[name] = directive;
            return app;
          },
          mount(rootContainer, isHydrate, isSVG) {
            if (!isMounted) {
              const vnode = createVNode(rootComponent, rootProps);
              vnode.appContext = context;
              if (isHydrate && hydrate) {
                hydrate(vnode, rootContainer);
              } else {
                render(vnode, rootContainer, isSVG);
              }
              isMounted = true;
              app._container = rootContainer;
              rootContainer.__vue_app__ = app;
              return getExposeProxy(vnode.component) || vnode.component.proxy;
            }
          },
          unmount() {
            if (isMounted) {
              render(null, app._container);
              delete app._container.__vue_app__;
            }
          },
          provide(key, value) {
            context.provides[key] = value;
            return app;
          }
        };
        return app;
      };
    }
    function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
      if (shared.isArray(rawRef)) {
        rawRef.forEach((r, i) => setRef(r, oldRawRef && (shared.isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
        return;
      }
      if (isAsyncWrapper(vnode) && !isUnmount) {
        return;
      }
      const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
      const value = isUnmount ? null : refValue;
      const { i: owner, r: ref } = rawRef;
      const oldRef = oldRawRef && oldRawRef.r;
      const refs2 = owner.refs === shared.EMPTY_OBJ ? owner.refs = {} : owner.refs;
      const setupState = owner.setupState;
      if (oldRef != null && oldRef !== ref) {
        if (shared.isString(oldRef)) {
          refs2[oldRef] = null;
          if (shared.hasOwn(setupState, oldRef)) {
            setupState[oldRef] = null;
          }
        } else if (reactivity.isRef(oldRef)) {
          oldRef.value = null;
        }
      }
      if (shared.isFunction(ref)) {
        callWithErrorHandling(ref, owner, 12, [value, refs2]);
      } else {
        const _isString = shared.isString(ref);
        const _isRef = reactivity.isRef(ref);
        if (_isString || _isRef) {
          const doSet = () => {
            if (rawRef.f) {
              const existing = _isString ? shared.hasOwn(setupState, ref) ? setupState[ref] : refs2[ref] : ref.value;
              if (isUnmount) {
                shared.isArray(existing) && shared.remove(existing, refValue);
              } else {
                if (!shared.isArray(existing)) {
                  if (_isString) {
                    refs2[ref] = [refValue];
                    if (shared.hasOwn(setupState, ref)) {
                      setupState[ref] = refs2[ref];
                    }
                  } else {
                    ref.value = [refValue];
                    if (rawRef.k)
                      refs2[rawRef.k] = ref.value;
                  }
                } else if (!existing.includes(refValue)) {
                  existing.push(refValue);
                }
              }
            } else if (_isString) {
              refs2[ref] = value;
              if (shared.hasOwn(setupState, ref)) {
                setupState[ref] = value;
              }
            } else if (_isRef) {
              ref.value = value;
              if (rawRef.k)
                refs2[rawRef.k] = value;
            } else
              ;
          };
          if (value) {
            doSet.id = -1;
            queuePostRenderEffect(doSet, parentSuspense);
          } else {
            doSet();
          }
        }
      }
    }
    var hasMismatch = false;
    var isSVGContainer = (container) => /svg/.test(container.namespaceURI) && container.tagName !== "foreignObject";
    var isComment = (node) => node.nodeType === 8;
    function createHydrationFunctions(rendererInternals) {
      const { mt: mountComponent, p: patch, o: { patchProp, createText, nextSibling, parentNode, remove, insert, createComment } } = rendererInternals;
      const hydrate = (vnode, container) => {
        if (!container.hasChildNodes()) {
          patch(null, vnode, container);
          flushPostFlushCbs();
          container._vnode = vnode;
          return;
        }
        hasMismatch = false;
        hydrateNode(container.firstChild, vnode, null, null, null);
        flushPostFlushCbs();
        container._vnode = vnode;
        if (hasMismatch && true) {
          console.error(`Hydration completed but contains mismatches.`);
        }
      };
      const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
        const isFragmentStart = isComment(node) && node.data === "[";
        const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
        const { type, ref, shapeFlag, patchFlag } = vnode;
        let domType = node.nodeType;
        vnode.el = node;
        if (patchFlag === -2) {
          optimized = false;
          vnode.dynamicChildren = null;
        }
        let nextNode = null;
        switch (type) {
          case Text:
            if (domType !== 3) {
              if (vnode.children === "") {
                insert(vnode.el = createText(""), parentNode(node), node);
                nextNode = node;
              } else {
                nextNode = onMismatch();
              }
            } else {
              if (node.data !== vnode.children) {
                hasMismatch = true;
                node.data = vnode.children;
              }
              nextNode = nextSibling(node);
            }
            break;
          case Comment:
            if (domType !== 8 || isFragmentStart) {
              nextNode = onMismatch();
            } else {
              nextNode = nextSibling(node);
            }
            break;
          case Static:
            if (isFragmentStart) {
              node = nextSibling(node);
              domType = node.nodeType;
            }
            if (domType === 1 || domType === 3) {
              nextNode = node;
              const needToAdoptContent = !vnode.children.length;
              for (let i = 0; i < vnode.staticCount; i++) {
                if (needToAdoptContent)
                  vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
                if (i === vnode.staticCount - 1) {
                  vnode.anchor = nextNode;
                }
                nextNode = nextSibling(nextNode);
              }
              return isFragmentStart ? nextSibling(nextNode) : nextNode;
            } else {
              onMismatch();
            }
            break;
          case Fragment:
            if (!isFragmentStart) {
              nextNode = onMismatch();
            } else {
              nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
            }
            break;
          default:
            if (shapeFlag & 1) {
              if (domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) {
                nextNode = onMismatch();
              } else {
                nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
              }
            } else if (shapeFlag & 6) {
              vnode.slotScopeIds = slotScopeIds;
              const container = parentNode(node);
              mountComponent(vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), optimized);
              nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node);
              if (nextNode && isComment(nextNode) && nextNode.data === "teleport end") {
                nextNode = nextSibling(nextNode);
              }
              if (isAsyncWrapper(vnode)) {
                let subTree;
                if (isFragmentStart) {
                  subTree = createVNode(Fragment);
                  subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
                } else {
                  subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
                }
                subTree.el = node;
                vnode.component.subTree = subTree;
              }
            } else if (shapeFlag & 64) {
              if (domType !== 8) {
                nextNode = onMismatch();
              } else {
                nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
              }
            } else if (shapeFlag & 128) {
              nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, isSVGContainer(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
            } else
              ;
        }
        if (ref != null) {
          setRef(ref, null, parentSuspense, vnode);
        }
        return nextNode;
      };
      const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
        optimized = optimized || !!vnode.dynamicChildren;
        const { type, props, patchFlag, shapeFlag, dirs } = vnode;
        const forcePatchValue = type === "input" && dirs || type === "option";
        if (forcePatchValue || patchFlag !== -1) {
          if (dirs) {
            invokeDirectiveHook(vnode, null, parentComponent, "created");
          }
          if (props) {
            if (forcePatchValue || !optimized || patchFlag & (16 | 32)) {
              for (const key in props) {
                if (forcePatchValue && key.endsWith("value") || shared.isOn(key) && !shared.isReservedProp(key)) {
                  patchProp(el, key, null, props[key], false, void 0, parentComponent);
                }
              }
            } else if (props.onClick) {
              patchProp(el, "onClick", null, props.onClick, false, void 0, parentComponent);
            }
          }
          let vnodeHooks;
          if (vnodeHooks = props && props.onVnodeBeforeMount) {
            invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          }
          if (dirs) {
            invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
          }
          if ((vnodeHooks = props && props.onVnodeMounted) || dirs) {
            queueEffectWithSuspense(() => {
              vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
              dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
            }, parentSuspense);
          }
          if (shapeFlag & 16 && !(props && (props.innerHTML || props.textContent))) {
            let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
            while (next) {
              hasMismatch = true;
              const cur = next;
              next = next.nextSibling;
              remove(cur);
            }
          } else if (shapeFlag & 8) {
            if (el.textContent !== vnode.children) {
              hasMismatch = true;
              el.textContent = vnode.children;
            }
          }
        }
        return el.nextSibling;
      };
      const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
        optimized = optimized || !!parentVNode.dynamicChildren;
        const children = parentVNode.children;
        const l = children.length;
        for (let i = 0; i < l; i++) {
          const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
          if (node) {
            node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
          } else if (vnode.type === Text && !vnode.children) {
            continue;
          } else {
            hasMismatch = true;
            patch(null, vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
          }
        }
        return node;
      };
      const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
        const { slotScopeIds: fragmentSlotScopeIds } = vnode;
        if (fragmentSlotScopeIds) {
          slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
        }
        const container = parentNode(node);
        const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
        if (next && isComment(next) && next.data === "]") {
          return nextSibling(vnode.anchor = next);
        } else {
          hasMismatch = true;
          insert(vnode.anchor = createComment(`]`), container, next);
          return next;
        }
      };
      const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
        hasMismatch = true;
        vnode.el = null;
        if (isFragment) {
          const end = locateClosingAsyncAnchor(node);
          while (true) {
            const next2 = nextSibling(node);
            if (next2 && next2 !== end) {
              remove(next2);
            } else {
              break;
            }
          }
        }
        const next = nextSibling(node);
        const container = parentNode(node);
        remove(node);
        patch(null, vnode, container, next, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
        return next;
      };
      const locateClosingAsyncAnchor = (node) => {
        let match = 0;
        while (node) {
          node = nextSibling(node);
          if (node && isComment(node)) {
            if (node.data === "[")
              match++;
            if (node.data === "]") {
              if (match === 0) {
                return nextSibling(node);
              } else {
                match--;
              }
            }
          }
        }
        return node;
      };
      return [hydrate, hydrateNode];
    }
    var queuePostRenderEffect = queueEffectWithSuspense;
    function createRenderer(options) {
      return baseCreateRenderer(options);
    }
    function createHydrationRenderer(options) {
      return baseCreateRenderer(options, createHydrationFunctions);
    }
    function baseCreateRenderer(options, createHydrationFns) {
      const target = shared.getGlobalThis();
      target.__VUE__ = true;
      const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = shared.NOOP, insertStaticContent: hostInsertStaticContent } = options;
      const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
        if (n1 === n2) {
          return;
        }
        if (n1 && !isSameVNodeType(n1, n2)) {
          anchor = getNextHostNode(n1);
          unmount(n1, parentComponent, parentSuspense, true);
          n1 = null;
        }
        if (n2.patchFlag === -2) {
          optimized = false;
          n2.dynamicChildren = null;
        }
        const { type, ref, shapeFlag } = n2;
        switch (type) {
          case Text:
            processText(n1, n2, container, anchor);
            break;
          case Comment:
            processCommentNode(n1, n2, container, anchor);
            break;
          case Static:
            if (n1 == null) {
              mountStaticNode(n2, container, anchor, isSVG);
            }
            break;
          case Fragment:
            processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            break;
          default:
            if (shapeFlag & 1) {
              processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else if (shapeFlag & 6) {
              processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else if (shapeFlag & 64) {
              type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
            } else if (shapeFlag & 128) {
              type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
            } else
              ;
        }
        if (ref != null && parentComponent) {
          setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
        }
      };
      const processText = (n1, n2, container, anchor) => {
        if (n1 == null) {
          hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
        } else {
          const el = n2.el = n1.el;
          if (n2.children !== n1.children) {
            hostSetText(el, n2.children);
          }
        }
      };
      const processCommentNode = (n1, n2, container, anchor) => {
        if (n1 == null) {
          hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
        } else {
          n2.el = n1.el;
        }
      };
      const mountStaticNode = (n2, container, anchor, isSVG) => {
        [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
      };
      const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
        let next;
        while (el && el !== anchor) {
          next = hostNextSibling(el);
          hostInsert(el, container, nextSibling);
          el = next;
        }
        hostInsert(anchor, container, nextSibling);
      };
      const removeStaticNode = ({ el, anchor }) => {
        let next;
        while (el && el !== anchor) {
          next = hostNextSibling(el);
          hostRemove(el);
          el = next;
        }
        hostRemove(anchor);
      };
      const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        isSVG = isSVG || n2.type === "svg";
        if (n1 == null) {
          mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        let el;
        let vnodeHook;
        const { type, props, shapeFlag, transition, dirs } = vnode;
        el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
        if (shapeFlag & 8) {
          hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16) {
          mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "created");
        }
        if (props) {
          for (const key in props) {
            if (key !== "value" && !shared.isReservedProp(key)) {
              hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
          if ("value" in props) {
            hostPatchProp(el, "value", null, props.value);
          }
          if (vnodeHook = props.onVnodeBeforeMount) {
            invokeVNodeHook(vnodeHook, parentComponent, vnode);
          }
        }
        setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
        }
        const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
        if (needCallTransitionHooks) {
          transition.beforeEnter(el);
        }
        hostInsert(el, container, anchor);
        if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            needCallTransitionHooks && transition.enter(el);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
          }, parentSuspense);
        }
      };
      const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
        if (scopeId) {
          hostSetScopeId(el, scopeId);
        }
        if (slotScopeIds) {
          for (let i = 0; i < slotScopeIds.length; i++) {
            hostSetScopeId(el, slotScopeIds[i]);
          }
        }
        if (parentComponent) {
          let subTree = parentComponent.subTree;
          if (vnode === subTree) {
            const parentVNode = parentComponent.vnode;
            setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
          }
        }
      };
      const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
        for (let i = start; i < children.length; i++) {
          const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
          patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        const el = n2.el = n1.el;
        let { patchFlag, dynamicChildren, dirs } = n2;
        patchFlag |= n1.patchFlag & 16;
        const oldProps = n1.props || shared.EMPTY_OBJ;
        const newProps = n2.props || shared.EMPTY_OBJ;
        let vnodeHook;
        parentComponent && toggleRecurse(parentComponent, false);
        if (vnodeHook = newProps.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        }
        if (dirs) {
          invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
        }
        parentComponent && toggleRecurse(parentComponent, true);
        const areChildrenSVG = isSVG && n2.type !== "foreignObject";
        if (dynamicChildren) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
        } else if (!optimized) {
          patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
        }
        if (patchFlag > 0) {
          if (patchFlag & 16) {
            patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
          } else {
            if (patchFlag & 2) {
              if (oldProps.class !== newProps.class) {
                hostPatchProp(el, "class", null, newProps.class, isSVG);
              }
            }
            if (patchFlag & 4) {
              hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
            }
            if (patchFlag & 8) {
              const propsToUpdate = n2.dynamicProps;
              for (let i = 0; i < propsToUpdate.length; i++) {
                const key = propsToUpdate[i];
                const prev = oldProps[key];
                const next = newProps[key];
                if (next !== prev || key === "value") {
                  hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
                }
              }
            }
          }
          if (patchFlag & 1) {
            if (n1.children !== n2.children) {
              hostSetElementText(el, n2.children);
            }
          }
        } else if (!optimized && dynamicChildren == null) {
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        }
        if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
            dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
          }, parentSuspense);
        }
      };
      const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
        for (let i = 0; i < newChildren.length; i++) {
          const oldVNode = oldChildren[i];
          const newVNode = newChildren[i];
          const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
          patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
        }
      };
      const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
        if (oldProps !== newProps) {
          if (oldProps !== shared.EMPTY_OBJ) {
            for (const key in oldProps) {
              if (!shared.isReservedProp(key) && !(key in newProps)) {
                hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
          for (const key in newProps) {
            if (shared.isReservedProp(key))
              continue;
            const next = newProps[key];
            const prev = oldProps[key];
            if (next !== prev && key !== "value") {
              hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
          if ("value" in newProps) {
            hostPatchProp(el, "value", oldProps.value, newProps.value);
          }
        }
      };
      const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
        const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
        let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
        if (fragmentSlotScopeIds) {
          slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
        }
        if (n1 == null) {
          hostInsert(fragmentStartAnchor, container, anchor);
          hostInsert(fragmentEndAnchor, container, anchor);
          mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
            patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
            if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
              traverseStaticChildren(n1, n2, true);
            }
          } else {
            patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        }
      };
      const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        n2.slotScopeIds = slotScopeIds;
        if (n1 == null) {
          if (n2.shapeFlag & 512) {
            parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
          } else {
            mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          }
        } else {
          updateComponent(n1, n2, optimized);
        }
      };
      const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
        const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
        if (isKeepAlive(initialVNode)) {
          instance.ctx.renderer = internals;
        }
        {
          setupComponent(instance);
        }
        if (instance.asyncDep) {
          parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
          if (!initialVNode.el) {
            const placeholder = instance.subTree = createVNode(Comment);
            processCommentNode(null, placeholder, container, anchor);
          }
          return;
        }
        setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
      };
      const updateComponent = (n1, n2, optimized) => {
        const instance = n2.component = n1.component;
        if (shouldUpdateComponent(n1, n2, optimized)) {
          if (instance.asyncDep && !instance.asyncResolved) {
            updateComponentPreRender(instance, n2, optimized);
            return;
          } else {
            instance.next = n2;
            invalidateJob(instance.update);
            instance.update();
          }
        } else {
          n2.el = n1.el;
          instance.vnode = n2;
        }
      };
      const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
        const componentUpdateFn = () => {
          if (!instance.isMounted) {
            let vnodeHook;
            const { el, props } = initialVNode;
            const { bm, m, parent } = instance;
            const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
            toggleRecurse(instance, false);
            if (bm) {
              shared.invokeArrayFns(bm);
            }
            if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
              invokeVNodeHook(vnodeHook, parent, initialVNode);
            }
            toggleRecurse(instance, true);
            if (el && hydrateNode) {
              const hydrateSubTree = () => {
                instance.subTree = renderComponentRoot(instance);
                hydrateNode(el, instance.subTree, instance, parentSuspense, null);
              };
              if (isAsyncWrapperVNode) {
                initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
              } else {
                hydrateSubTree();
              }
            } else {
              const subTree = instance.subTree = renderComponentRoot(instance);
              patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
              initialVNode.el = subTree.el;
            }
            if (m) {
              queuePostRenderEffect(m, parentSuspense);
            }
            if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
              const scopedInitialVNode = initialVNode;
              queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
            }
            if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
              instance.a && queuePostRenderEffect(instance.a, parentSuspense);
            }
            instance.isMounted = true;
            initialVNode = container = anchor = null;
          } else {
            let { next, bu, u, parent, vnode } = instance;
            let originNext = next;
            let vnodeHook;
            toggleRecurse(instance, false);
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            } else {
              next = vnode;
            }
            if (bu) {
              shared.invokeArrayFns(bu);
            }
            if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
              invokeVNodeHook(vnodeHook, parent, next, vnode);
            }
            toggleRecurse(instance, true);
            const nextTree = renderComponentRoot(instance);
            const prevTree = instance.subTree;
            instance.subTree = nextTree;
            patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
            next.el = nextTree.el;
            if (originNext === null) {
              updateHOCHostEl(instance, nextTree.el);
            }
            if (u) {
              queuePostRenderEffect(u, parentSuspense);
            }
            if (vnodeHook = next.props && next.props.onVnodeUpdated) {
              queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
            }
          }
        };
        const effect = instance.effect = new reactivity.ReactiveEffect(componentUpdateFn, () => queueJob(update2), instance.scope);
        const update2 = instance.update = () => effect.run();
        update2.id = instance.uid;
        toggleRecurse(instance, true);
        update2();
      };
      const updateComponentPreRender = (instance, nextVNode, optimized) => {
        nextVNode.component = instance;
        const prevProps = instance.vnode.props;
        instance.vnode = nextVNode;
        instance.next = null;
        updateProps(instance, nextVNode.props, prevProps, optimized);
        updateSlots(instance, nextVNode.children, optimized);
        reactivity.pauseTracking();
        flushPreFlushCbs();
        reactivity.resetTracking();
      };
      const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
        const c1 = n1 && n1.children;
        const prevShapeFlag = n1 ? n1.shapeFlag : 0;
        const c2 = n2.children;
        const { patchFlag, shapeFlag } = n2;
        if (patchFlag > 0) {
          if (patchFlag & 128) {
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            return;
          } else if (patchFlag & 256) {
            patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            return;
          }
        }
        if (shapeFlag & 8) {
          if (prevShapeFlag & 16) {
            unmountChildren(c1, parentComponent, parentSuspense);
          }
          if (c2 !== c1) {
            hostSetElementText(container, c2);
          }
        } else {
          if (prevShapeFlag & 16) {
            if (shapeFlag & 16) {
              patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else {
              unmountChildren(c1, parentComponent, parentSuspense, true);
            }
          } else {
            if (prevShapeFlag & 8) {
              hostSetElementText(container, "");
            }
            if (shapeFlag & 16) {
              mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
          }
        }
      };
      const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        c1 = c1 || shared.EMPTY_ARR;
        c2 = c2 || shared.EMPTY_ARR;
        const oldLength = c1.length;
        const newLength = c2.length;
        const commonLength = Math.min(oldLength, newLength);
        let i;
        for (i = 0; i < commonLength; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
        if (oldLength > newLength) {
          unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
        } else {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
        }
      };
      const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        let i = 0;
        const l2 = c2.length;
        let e1 = c1.length - 1;
        let e2 = l2 - 1;
        while (i <= e1 && i <= e2) {
          const n1 = c1[i];
          const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (isSameVNodeType(n1, n2)) {
            patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            break;
          }
          i++;
        }
        while (i <= e1 && i <= e2) {
          const n1 = c1[e1];
          const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
          if (isSameVNodeType(n1, n2)) {
            patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            break;
          }
          e1--;
          e2--;
        }
        if (i > e1) {
          if (i <= e2) {
            const nextPos = e2 + 1;
            const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
            while (i <= e2) {
              patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
              i++;
            }
          }
        } else if (i > e2) {
          while (i <= e1) {
            unmount(c1[i], parentComponent, parentSuspense, true);
            i++;
          }
        } else {
          const s1 = i;
          const s2 = i;
          const keyToNewIndexMap = new Map();
          for (i = s2; i <= e2; i++) {
            const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
            if (nextChild.key != null) {
              keyToNewIndexMap.set(nextChild.key, i);
            }
          }
          let j;
          let patched = 0;
          const toBePatched = e2 - s2 + 1;
          let moved = false;
          let maxNewIndexSoFar = 0;
          const newIndexToOldIndexMap = new Array(toBePatched);
          for (i = 0; i < toBePatched; i++)
            newIndexToOldIndexMap[i] = 0;
          for (i = s1; i <= e1; i++) {
            const prevChild = c1[i];
            if (patched >= toBePatched) {
              unmount(prevChild, parentComponent, parentSuspense, true);
              continue;
            }
            let newIndex;
            if (prevChild.key != null) {
              newIndex = keyToNewIndexMap.get(prevChild.key);
            } else {
              for (j = s2; j <= e2; j++) {
                if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                  newIndex = j;
                  break;
                }
              }
            }
            if (newIndex === void 0) {
              unmount(prevChild, parentComponent, parentSuspense, true);
            } else {
              newIndexToOldIndexMap[newIndex - s2] = i + 1;
              if (newIndex >= maxNewIndexSoFar) {
                maxNewIndexSoFar = newIndex;
              } else {
                moved = true;
              }
              patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
              patched++;
            }
          }
          const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : shared.EMPTY_ARR;
          j = increasingNewIndexSequence.length - 1;
          for (i = toBePatched - 1; i >= 0; i--) {
            const nextIndex = s2 + i;
            const nextChild = c2[nextIndex];
            const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
            if (newIndexToOldIndexMap[i] === 0) {
              patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else if (moved) {
              if (j < 0 || i !== increasingNewIndexSequence[j]) {
                move(nextChild, container, anchor, 2);
              } else {
                j--;
              }
            }
          }
        }
      };
      const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
        const { el, type, transition, children, shapeFlag } = vnode;
        if (shapeFlag & 6) {
          move(vnode.component.subTree, container, anchor, moveType);
          return;
        }
        if (shapeFlag & 128) {
          vnode.suspense.move(container, anchor, moveType);
          return;
        }
        if (shapeFlag & 64) {
          type.move(vnode, container, anchor, internals);
          return;
        }
        if (type === Fragment) {
          hostInsert(el, container, anchor);
          for (let i = 0; i < children.length; i++) {
            move(children[i], container, anchor, moveType);
          }
          hostInsert(vnode.anchor, container, anchor);
          return;
        }
        if (type === Static) {
          moveStaticNode(vnode, container, anchor);
          return;
        }
        const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
        if (needTransition) {
          if (moveType === 0) {
            transition.beforeEnter(el);
            hostInsert(el, container, anchor);
            queuePostRenderEffect(() => transition.enter(el), parentSuspense);
          } else {
            const { leave, delayLeave, afterLeave } = transition;
            const remove2 = () => hostInsert(el, container, anchor);
            const performLeave = () => {
              leave(el, () => {
                remove2();
                afterLeave && afterLeave();
              });
            };
            if (delayLeave) {
              delayLeave(el, remove2, performLeave);
            } else {
              performLeave();
            }
          }
        } else {
          hostInsert(el, container, anchor);
        }
      };
      const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
        const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
        if (ref != null) {
          setRef(ref, null, parentSuspense, vnode, true);
        }
        if (shapeFlag & 256) {
          parentComponent.ctx.deactivate(vnode);
          return;
        }
        const shouldInvokeDirs = shapeFlag & 1 && dirs;
        const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
        let vnodeHook;
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
        if (shapeFlag & 6) {
          unmountComponent(vnode.component, parentSuspense, doRemove);
        } else {
          if (shapeFlag & 128) {
            vnode.suspense.unmount(parentSuspense, doRemove);
            return;
          }
          if (shouldInvokeDirs) {
            invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
          }
          if (shapeFlag & 64) {
            vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
          } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
            unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
          } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
            unmountChildren(children, parentComponent, parentSuspense);
          }
          if (doRemove) {
            remove(vnode);
          }
        }
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
          }, parentSuspense);
        }
      };
      const remove = (vnode) => {
        const { type, el, anchor, transition } = vnode;
        if (type === Fragment) {
          {
            removeFragment(el, anchor);
          }
          return;
        }
        if (type === Static) {
          removeStaticNode(vnode);
          return;
        }
        const performRemove = () => {
          hostRemove(el);
          if (transition && !transition.persisted && transition.afterLeave) {
            transition.afterLeave();
          }
        };
        if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
          const { leave, delayLeave } = transition;
          const performLeave = () => leave(el, performRemove);
          if (delayLeave) {
            delayLeave(vnode.el, performRemove, performLeave);
          } else {
            performLeave();
          }
        } else {
          performRemove();
        }
      };
      const removeFragment = (cur, end) => {
        let next;
        while (cur !== end) {
          next = hostNextSibling(cur);
          hostRemove(cur);
          cur = next;
        }
        hostRemove(end);
      };
      const unmountComponent = (instance, parentSuspense, doRemove) => {
        const { bum, scope, update: update2, subTree, um } = instance;
        if (bum) {
          shared.invokeArrayFns(bum);
        }
        scope.stop();
        if (update2) {
          update2.active = false;
          unmount(subTree, instance, parentSuspense, doRemove);
        }
        if (um) {
          queuePostRenderEffect(um, parentSuspense);
        }
        queuePostRenderEffect(() => {
          instance.isUnmounted = true;
        }, parentSuspense);
        if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
          parentSuspense.deps--;
          if (parentSuspense.deps === 0) {
            parentSuspense.resolve();
          }
        }
      };
      const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
        for (let i = start; i < children.length; i++) {
          unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
        }
      };
      const getNextHostNode = (vnode) => {
        if (vnode.shapeFlag & 6) {
          return getNextHostNode(vnode.component.subTree);
        }
        if (vnode.shapeFlag & 128) {
          return vnode.suspense.next();
        }
        return hostNextSibling(vnode.anchor || vnode.el);
      };
      const render = (vnode, container, isSVG) => {
        if (vnode == null) {
          if (container._vnode) {
            unmount(container._vnode, null, null, true);
          }
        } else {
          patch(container._vnode || null, vnode, container, null, null, null, isSVG);
        }
        flushPreFlushCbs();
        flushPostFlushCbs();
        container._vnode = vnode;
      };
      const internals = {
        p: patch,
        um: unmount,
        m: move,
        r: remove,
        mt: mountComponent,
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        n: getNextHostNode,
        o: options
      };
      let hydrate;
      let hydrateNode;
      if (createHydrationFns) {
        [hydrate, hydrateNode] = createHydrationFns(internals);
      }
      return {
        render,
        hydrate,
        createApp: createAppAPI(render, hydrate)
      };
    }
    function toggleRecurse({ effect, update: update2 }, allowed) {
      effect.allowRecurse = update2.allowRecurse = allowed;
    }
    function traverseStaticChildren(n1, n2, shallow = false) {
      const ch1 = n1.children;
      const ch2 = n2.children;
      if (shared.isArray(ch1) && shared.isArray(ch2)) {
        for (let i = 0; i < ch1.length; i++) {
          const c1 = ch1[i];
          let c2 = ch2[i];
          if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
            if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
              c2 = ch2[i] = cloneIfMounted(ch2[i]);
              c2.el = c1.el;
            }
            if (!shallow)
              traverseStaticChildren(c1, c2);
          }
        }
      }
    }
    function getSequence(arr) {
      const p = arr.slice();
      const result = [0];
      let i, j, u, v, c;
      const len = arr.length;
      for (i = 0; i < len; i++) {
        const arrI = arr[i];
        if (arrI !== 0) {
          j = result[result.length - 1];
          if (arr[j] < arrI) {
            p[i] = j;
            result.push(i);
            continue;
          }
          u = 0;
          v = result.length - 1;
          while (u < v) {
            c = u + v >> 1;
            if (arr[result[c]] < arrI) {
              u = c + 1;
            } else {
              v = c;
            }
          }
          if (arrI < arr[result[u]]) {
            if (u > 0) {
              p[i] = result[u - 1];
            }
            result[u] = i;
          }
        }
      }
      u = result.length;
      v = result[u - 1];
      while (u-- > 0) {
        result[u] = v;
        v = p[v];
      }
      return result;
    }
    var isTeleport = (type) => type.__isTeleport;
    var isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
    var isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
    var resolveTarget = (props, select) => {
      const targetSelector = props && props.to;
      if (shared.isString(targetSelector)) {
        if (!select) {
          return null;
        } else {
          const target = select(targetSelector);
          return target;
        }
      } else {
        return targetSelector;
      }
    };
    var TeleportImpl = {
      __isTeleport: true,
      process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
        const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
        const disabled = isTeleportDisabled(n2.props);
        let { shapeFlag, children, dynamicChildren } = n2;
        if (n1 == null) {
          const placeholder = n2.el = createText("");
          const mainAnchor = n2.anchor = createText("");
          insert(placeholder, container, anchor);
          insert(mainAnchor, container, anchor);
          const target = n2.target = resolveTarget(n2.props, querySelector);
          const targetAnchor = n2.targetAnchor = createText("");
          if (target) {
            insert(targetAnchor, target);
            isSVG = isSVG || isTargetSVG(target);
          }
          const mount = (container2, anchor2) => {
            if (shapeFlag & 16) {
              mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
          };
          if (disabled) {
            mount(container, mainAnchor);
          } else if (target) {
            mount(target, targetAnchor);
          }
        } else {
          n2.el = n1.el;
          const mainAnchor = n2.anchor = n1.anchor;
          const target = n2.target = n1.target;
          const targetAnchor = n2.targetAnchor = n1.targetAnchor;
          const wasDisabled = isTeleportDisabled(n1.props);
          const currentContainer = wasDisabled ? container : target;
          const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
          isSVG = isSVG || isTargetSVG(target);
          if (dynamicChildren) {
            patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
            traverseStaticChildren(n1, n2, true);
          } else if (!optimized) {
            patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
          }
          if (disabled) {
            if (!wasDisabled) {
              moveTeleport(n2, container, mainAnchor, internals, 1);
            }
          } else {
            if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
              const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
              if (nextTarget) {
                moveTeleport(n2, nextTarget, null, internals, 0);
              }
            } else if (wasDisabled) {
              moveTeleport(n2, target, targetAnchor, internals, 1);
            }
          }
        }
      },
      remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
        const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
        if (target) {
          hostRemove(targetAnchor);
        }
        if (doRemove || !isTeleportDisabled(props)) {
          hostRemove(anchor);
          if (shapeFlag & 16) {
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
            }
          }
        }
      },
      move: moveTeleport,
      hydrate: hydrateTeleport
    };
    function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
      if (moveType === 0) {
        insert(vnode.targetAnchor, container, parentAnchor);
      }
      const { el, anchor, shapeFlag, children, props } = vnode;
      const isReorder = moveType === 2;
      if (isReorder) {
        insert(el, container, parentAnchor);
      }
      if (!isReorder || isTeleportDisabled(props)) {
        if (shapeFlag & 16) {
          for (let i = 0; i < children.length; i++) {
            move(children[i], container, parentAnchor, 2);
          }
        }
      }
      if (isReorder) {
        insert(anchor, container, parentAnchor);
      }
    }
    function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector } }, hydrateChildren) {
      const target = vnode.target = resolveTarget(vnode.props, querySelector);
      if (target) {
        const targetNode = target._lpa || target.firstChild;
        if (vnode.shapeFlag & 16) {
          if (isTeleportDisabled(vnode.props)) {
            vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
            vnode.targetAnchor = targetNode;
          } else {
            vnode.anchor = nextSibling(node);
            let targetAnchor = targetNode;
            while (targetAnchor) {
              targetAnchor = nextSibling(targetAnchor);
              if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
                vnode.targetAnchor = targetAnchor;
                target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
                break;
              }
            }
            hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
          }
        }
      }
      return vnode.anchor && nextSibling(vnode.anchor);
    }
    var Teleport = TeleportImpl;
    var Fragment = Symbol(void 0);
    var Text = Symbol(void 0);
    var Comment = Symbol(void 0);
    var Static = Symbol(void 0);
    var blockStack = [];
    var currentBlock = null;
    function openBlock(disableTracking = false) {
      blockStack.push(currentBlock = disableTracking ? null : []);
    }
    function closeBlock() {
      blockStack.pop();
      currentBlock = blockStack[blockStack.length - 1] || null;
    }
    var isBlockTreeEnabled = 1;
    function setBlockTracking(value) {
      isBlockTreeEnabled += value;
    }
    function setupBlock(vnode) {
      vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || shared.EMPTY_ARR : null;
      closeBlock();
      if (isBlockTreeEnabled > 0 && currentBlock) {
        currentBlock.push(vnode);
      }
      return vnode;
    }
    function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
      return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
    }
    function createBlock(type, props, children, patchFlag, dynamicProps) {
      return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
    }
    function isVNode(value) {
      return value ? value.__v_isVNode === true : false;
    }
    function isSameVNodeType(n1, n2) {
      return n1.type === n2.type && n1.key === n2.key;
    }
    function transformVNodeArgs(transformer) {
    }
    var InternalObjectKey = `__vInternal`;
    var normalizeKey = ({ key }) => key != null ? key : null;
    var normalizeRef = ({ ref, ref_key, ref_for }) => {
      return ref != null ? shared.isString(ref) || reactivity.isRef(ref) || shared.isFunction(ref) ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for } : ref : null;
    };
    function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
      const vnode = {
        __v_isVNode: true,
        __v_skip: true,
        type,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        slotScopeIds: null,
        children,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag,
        patchFlag,
        dynamicProps,
        dynamicChildren: null,
        appContext: null
      };
      if (needFullChildrenNormalization) {
        normalizeChildren(vnode, children);
        if (shapeFlag & 128) {
          type.normalize(vnode);
        }
      } else if (children) {
        vnode.shapeFlag |= shared.isString(children) ? 8 : 16;
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
        currentBlock.push(vnode);
      }
      return vnode;
    }
    var createVNode = _createVNode;
    function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
      if (!type || type === NULL_DYNAMIC_COMPONENT) {
        type = Comment;
      }
      if (isVNode(type)) {
        const cloned = cloneVNode(type, props, true);
        if (children) {
          normalizeChildren(cloned, children);
        }
        if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
          if (cloned.shapeFlag & 6) {
            currentBlock[currentBlock.indexOf(type)] = cloned;
          } else {
            currentBlock.push(cloned);
          }
        }
        cloned.patchFlag |= -2;
        return cloned;
      }
      if (isClassComponent(type)) {
        type = type.__vccOpts;
      }
      if (props) {
        props = guardReactiveProps(props);
        let { class: klass, style } = props;
        if (klass && !shared.isString(klass)) {
          props.class = shared.normalizeClass(klass);
        }
        if (shared.isObject(style)) {
          if (reactivity.isProxy(style) && !shared.isArray(style)) {
            style = shared.extend({}, style);
          }
          props.style = shared.normalizeStyle(style);
        }
      }
      const shapeFlag = shared.isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : shared.isObject(type) ? 4 : shared.isFunction(type) ? 2 : 0;
      return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
    }
    function guardReactiveProps(props) {
      if (!props)
        return null;
      return reactivity.isProxy(props) || InternalObjectKey in props ? shared.extend({}, props) : props;
    }
    function cloneVNode(vnode, extraProps, mergeRef = false) {
      const { props, ref, patchFlag, children } = vnode;
      const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
      const cloned = {
        __v_isVNode: true,
        __v_skip: true,
        type: vnode.type,
        props: mergedProps,
        key: mergedProps && normalizeKey(mergedProps),
        ref: extraProps && extraProps.ref ? mergeRef && ref ? shared.isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
        scopeId: vnode.scopeId,
        slotScopeIds: vnode.slotScopeIds,
        children,
        target: vnode.target,
        targetAnchor: vnode.targetAnchor,
        staticCount: vnode.staticCount,
        shapeFlag: vnode.shapeFlag,
        patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
        dynamicProps: vnode.dynamicProps,
        dynamicChildren: vnode.dynamicChildren,
        appContext: vnode.appContext,
        dirs: vnode.dirs,
        transition: vnode.transition,
        component: vnode.component,
        suspense: vnode.suspense,
        ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
        ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
        el: vnode.el,
        anchor: vnode.anchor
      };
      return cloned;
    }
    function createTextVNode(text = " ", flag = 0) {
      return createVNode(Text, null, text, flag);
    }
    function createStaticVNode(content, numberOfNodes) {
      const vnode = createVNode(Static, null, content);
      vnode.staticCount = numberOfNodes;
      return vnode;
    }
    function createCommentVNode(text = "", asBlock = false) {
      return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
    }
    function normalizeVNode(child) {
      if (child == null || typeof child === "boolean") {
        return createVNode(Comment);
      } else if (shared.isArray(child)) {
        return createVNode(Fragment, null, child.slice());
      } else if (typeof child === "object") {
        return cloneIfMounted(child);
      } else {
        return createVNode(Text, null, String(child));
      }
    }
    function cloneIfMounted(child) {
      return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
    }
    function normalizeChildren(vnode, children) {
      let type = 0;
      const { shapeFlag } = vnode;
      if (children == null) {
        children = null;
      } else if (shared.isArray(children)) {
        type = 16;
      } else if (typeof children === "object") {
        if (shapeFlag & (1 | 64)) {
          const slot = children.default;
          if (slot) {
            slot._c && (slot._d = false);
            normalizeChildren(vnode, slot());
            slot._c && (slot._d = true);
          }
          return;
        } else {
          type = 32;
          const slotFlag = children._;
          if (!slotFlag && !(InternalObjectKey in children)) {
            children._ctx = currentRenderingInstance;
          } else if (slotFlag === 3 && currentRenderingInstance) {
            if (currentRenderingInstance.slots._ === 1) {
              children._ = 1;
            } else {
              children._ = 2;
              vnode.patchFlag |= 1024;
            }
          }
        }
      } else if (shared.isFunction(children)) {
        children = { default: children, _ctx: currentRenderingInstance };
        type = 32;
      } else {
        children = String(children);
        if (shapeFlag & 64) {
          type = 16;
          children = [createTextVNode(children)];
        } else {
          type = 8;
        }
      }
      vnode.children = children;
      vnode.shapeFlag |= type;
    }
    function mergeProps(...args) {
      const ret = {};
      for (let i = 0; i < args.length; i++) {
        const toMerge = args[i];
        for (const key in toMerge) {
          if (key === "class") {
            if (ret.class !== toMerge.class) {
              ret.class = shared.normalizeClass([ret.class, toMerge.class]);
            }
          } else if (key === "style") {
            ret.style = shared.normalizeStyle([ret.style, toMerge.style]);
          } else if (shared.isOn(key)) {
            const existing = ret[key];
            const incoming = toMerge[key];
            if (incoming && existing !== incoming && !(shared.isArray(existing) && existing.includes(incoming))) {
              ret[key] = existing ? [].concat(existing, incoming) : incoming;
            }
          } else if (key !== "") {
            ret[key] = toMerge[key];
          }
        }
      }
      return ret;
    }
    function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
      callWithAsyncErrorHandling(hook, instance, 7, [
        vnode,
        prevVNode
      ]);
    }
    var emptyAppContext = createAppContext();
    var uid$1 = 0;
    function createComponentInstance(vnode, parent, suspense) {
      const type = vnode.type;
      const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
      const instance = {
        uid: uid$1++,
        vnode,
        type,
        parent,
        appContext,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new reactivity.EffectScope(true),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: parent ? parent.provides : Object.create(appContext.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: normalizePropsOptions(type, appContext),
        emitsOptions: normalizeEmitsOptions(type, appContext),
        emit: null,
        emitted: null,
        propsDefaults: shared.EMPTY_OBJ,
        inheritAttrs: type.inheritAttrs,
        ctx: shared.EMPTY_OBJ,
        data: shared.EMPTY_OBJ,
        props: shared.EMPTY_OBJ,
        attrs: shared.EMPTY_OBJ,
        slots: shared.EMPTY_OBJ,
        refs: shared.EMPTY_OBJ,
        setupState: shared.EMPTY_OBJ,
        setupContext: null,
        suspense,
        suspenseId: suspense ? suspense.pendingId : 0,
        asyncDep: null,
        asyncResolved: false,
        isMounted: false,
        isUnmounted: false,
        isDeactivated: false,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
      };
      {
        instance.ctx = { _: instance };
      }
      instance.root = parent ? parent.root : instance;
      instance.emit = emit.bind(null, instance);
      if (vnode.ce) {
        vnode.ce(instance);
      }
      return instance;
    }
    var currentInstance = null;
    var getCurrentInstance = () => currentInstance || currentRenderingInstance;
    var setCurrentInstance = (instance) => {
      currentInstance = instance;
      instance.scope.on();
    };
    var unsetCurrentInstance = () => {
      currentInstance && currentInstance.scope.off();
      currentInstance = null;
    };
    function isStatefulComponent(instance) {
      return instance.vnode.shapeFlag & 4;
    }
    var isInSSRComponentSetup = false;
    function setupComponent(instance, isSSR = false) {
      isInSSRComponentSetup = isSSR;
      const { props, children } = instance.vnode;
      const isStateful = isStatefulComponent(instance);
      initProps(instance, props, isStateful, isSSR);
      initSlots(instance, children);
      const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
      isInSSRComponentSetup = false;
      return setupResult;
    }
    function setupStatefulComponent(instance, isSSR) {
      const Component = instance.type;
      instance.accessCache = Object.create(null);
      instance.proxy = reactivity.markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
      const { setup } = Component;
      if (setup) {
        const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
        setCurrentInstance(instance);
        reactivity.pauseTracking();
        const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
        reactivity.resetTracking();
        unsetCurrentInstance();
        if (shared.isPromise(setupResult)) {
          setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
          if (isSSR) {
            return setupResult.then((resolvedResult) => {
              handleSetupResult(instance, resolvedResult, isSSR);
            }).catch((e) => {
              handleError(e, instance, 0);
            });
          } else {
            instance.asyncDep = setupResult;
          }
        } else {
          handleSetupResult(instance, setupResult, isSSR);
        }
      } else {
        finishComponentSetup(instance, isSSR);
      }
    }
    function handleSetupResult(instance, setupResult, isSSR) {
      if (shared.isFunction(setupResult)) {
        if (instance.type.__ssrInlineRender) {
          instance.ssrRender = setupResult;
        } else {
          instance.render = setupResult;
        }
      } else if (shared.isObject(setupResult)) {
        instance.setupState = reactivity.proxyRefs(setupResult);
      } else
        ;
      finishComponentSetup(instance, isSSR);
    }
    var compile;
    var installWithProxy;
    function registerRuntimeCompiler(_compile) {
      compile = _compile;
      installWithProxy = (i) => {
        if (i.render._rc) {
          i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
        }
      };
    }
    var isRuntimeOnly = () => !compile;
    function finishComponentSetup(instance, isSSR, skipOptions) {
      const Component = instance.type;
      if (!instance.render) {
        if (!isSSR && compile && !Component.render) {
          const template = Component.template || resolveMergedOptions(instance).template;
          if (template) {
            const { isCustomElement, compilerOptions } = instance.appContext.config;
            const { delimiters, compilerOptions: componentCompilerOptions } = Component;
            const finalCompilerOptions = shared.extend(shared.extend({
              isCustomElement,
              delimiters
            }, compilerOptions), componentCompilerOptions);
            Component.render = compile(template, finalCompilerOptions);
          }
        }
        instance.render = Component.render || shared.NOOP;
        if (installWithProxy) {
          installWithProxy(instance);
        }
      }
      {
        setCurrentInstance(instance);
        reactivity.pauseTracking();
        applyOptions(instance);
        reactivity.resetTracking();
        unsetCurrentInstance();
      }
    }
    function createAttrsProxy(instance) {
      return new Proxy(instance.attrs, {
        get(target, key) {
          reactivity.track(instance, "get", "$attrs");
          return target[key];
        }
      });
    }
    function createSetupContext(instance) {
      const expose = (exposed) => {
        instance.exposed = exposed || {};
      };
      let attrs;
      {
        return {
          get attrs() {
            return attrs || (attrs = createAttrsProxy(instance));
          },
          slots: instance.slots,
          emit: instance.emit,
          expose
        };
      }
    }
    function getExposeProxy(instance) {
      if (instance.exposed) {
        return instance.exposeProxy || (instance.exposeProxy = new Proxy(reactivity.proxyRefs(reactivity.markRaw(instance.exposed)), {
          get(target, key) {
            if (key in target) {
              return target[key];
            } else if (key in publicPropertiesMap) {
              return publicPropertiesMap[key](instance);
            }
          }
        }));
      }
    }
    var classifyRE = /(?:^|[-_])(\w)/g;
    var classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
    function getComponentName(Component, includeInferred = true) {
      return shared.isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
    }
    function formatComponentName(instance, Component, isRoot = false) {
      let name = getComponentName(Component);
      if (!name && Component.__file) {
        const match = Component.__file.match(/([^/\\]+)\.\w+$/);
        if (match) {
          name = match[1];
        }
      }
      if (!name && instance && instance.parent) {
        const inferFromRegistry = (registry) => {
          for (const key in registry) {
            if (registry[key] === Component) {
              return key;
            }
          }
        };
        name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
      }
      return name ? classify(name) : isRoot ? `App` : `Anonymous`;
    }
    function isClassComponent(value) {
      return shared.isFunction(value) && "__vccOpts" in value;
    }
    var computed = (getterOrOptions, debugOptions) => {
      return reactivity.computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
    };
    function defineProps() {
      return null;
    }
    function defineEmits() {
      return null;
    }
    function defineExpose(exposed) {
    }
    function withDefaults(props, defaults) {
      return null;
    }
    function useSlots() {
      return getContext().slots;
    }
    function useAttrs() {
      return getContext().attrs;
    }
    function getContext() {
      const i = getCurrentInstance();
      return i.setupContext || (i.setupContext = createSetupContext(i));
    }
    function mergeDefaults(raw, defaults) {
      const props = shared.isArray(raw) ? raw.reduce((normalized, p) => (normalized[p] = {}, normalized), {}) : raw;
      for (const key in defaults) {
        const opt = props[key];
        if (opt) {
          if (shared.isArray(opt) || shared.isFunction(opt)) {
            props[key] = { type: opt, default: defaults[key] };
          } else {
            opt.default = defaults[key];
          }
        } else if (opt === null) {
          props[key] = { default: defaults[key] };
        } else
          ;
      }
      return props;
    }
    function createPropsRestProxy(props, excludedKeys) {
      const ret = {};
      for (const key in props) {
        if (!excludedKeys.includes(key)) {
          Object.defineProperty(ret, key, {
            enumerable: true,
            get: () => props[key]
          });
        }
      }
      return ret;
    }
    function withAsyncContext(getAwaitable) {
      const ctx = getCurrentInstance();
      let awaitable = getAwaitable();
      unsetCurrentInstance();
      if (shared.isPromise(awaitable)) {
        awaitable = awaitable.catch((e) => {
          setCurrentInstance(ctx);
          throw e;
        });
      }
      return [awaitable, () => setCurrentInstance(ctx)];
    }
    function h(type, propsOrChildren, children) {
      const l = arguments.length;
      if (l === 2) {
        if (shared.isObject(propsOrChildren) && !shared.isArray(propsOrChildren)) {
          if (isVNode(propsOrChildren)) {
            return createVNode(type, null, [propsOrChildren]);
          }
          return createVNode(type, propsOrChildren);
        } else {
          return createVNode(type, null, propsOrChildren);
        }
      } else {
        if (l > 3) {
          children = Array.prototype.slice.call(arguments, 2);
        } else if (l === 3 && isVNode(children)) {
          children = [children];
        }
        return createVNode(type, propsOrChildren, children);
      }
    }
    var ssrContextKey = Symbol(``);
    var useSSRContext = () => {
      {
        const ctx = inject(ssrContextKey);
        if (!ctx) {
          warn(`Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`);
        }
        return ctx;
      }
    };
    function initCustomFormatter() {
      {
        return;
      }
    }
    function withMemo(memo, render, cache, index) {
      const cached = cache[index];
      if (cached && isMemoSame(cached, memo)) {
        return cached;
      }
      const ret = render();
      ret.memo = memo.slice();
      return cache[index] = ret;
    }
    function isMemoSame(cached, memo) {
      const prev = cached.memo;
      if (prev.length != memo.length) {
        return false;
      }
      for (let i = 0; i < prev.length; i++) {
        if (shared.hasChanged(prev[i], memo[i])) {
          return false;
        }
      }
      if (isBlockTreeEnabled > 0 && currentBlock) {
        currentBlock.push(cached);
      }
      return true;
    }
    var version = "3.2.41";
    var _ssrUtils = {
      createComponentInstance,
      setupComponent,
      renderComponentRoot,
      setCurrentRenderingInstance,
      isVNode,
      normalizeVNode
    };
    var ssrUtils = _ssrUtils;
    var resolveFilter = null;
    var compatUtils = null;
    exports2.EffectScope = reactivity.EffectScope;
    exports2.ReactiveEffect = reactivity.ReactiveEffect;
    exports2.customRef = reactivity.customRef;
    exports2.effect = reactivity.effect;
    exports2.effectScope = reactivity.effectScope;
    exports2.getCurrentScope = reactivity.getCurrentScope;
    exports2.isProxy = reactivity.isProxy;
    exports2.isReactive = reactivity.isReactive;
    exports2.isReadonly = reactivity.isReadonly;
    exports2.isRef = reactivity.isRef;
    exports2.isShallow = reactivity.isShallow;
    exports2.markRaw = reactivity.markRaw;
    exports2.onScopeDispose = reactivity.onScopeDispose;
    exports2.proxyRefs = reactivity.proxyRefs;
    exports2.reactive = reactivity.reactive;
    exports2.readonly = reactivity.readonly;
    exports2.ref = reactivity.ref;
    exports2.shallowReactive = reactivity.shallowReactive;
    exports2.shallowReadonly = reactivity.shallowReadonly;
    exports2.shallowRef = reactivity.shallowRef;
    exports2.stop = reactivity.stop;
    exports2.toRaw = reactivity.toRaw;
    exports2.toRef = reactivity.toRef;
    exports2.toRefs = reactivity.toRefs;
    exports2.triggerRef = reactivity.triggerRef;
    exports2.unref = reactivity.unref;
    exports2.camelize = shared.camelize;
    exports2.capitalize = shared.capitalize;
    exports2.normalizeClass = shared.normalizeClass;
    exports2.normalizeProps = shared.normalizeProps;
    exports2.normalizeStyle = shared.normalizeStyle;
    exports2.toDisplayString = shared.toDisplayString;
    exports2.toHandlerKey = shared.toHandlerKey;
    exports2.BaseTransition = BaseTransition;
    exports2.Comment = Comment;
    exports2.Fragment = Fragment;
    exports2.KeepAlive = KeepAlive;
    exports2.Static = Static;
    exports2.Suspense = Suspense;
    exports2.Teleport = Teleport;
    exports2.Text = Text;
    exports2.callWithAsyncErrorHandling = callWithAsyncErrorHandling;
    exports2.callWithErrorHandling = callWithErrorHandling;
    exports2.cloneVNode = cloneVNode;
    exports2.compatUtils = compatUtils;
    exports2.computed = computed;
    exports2.createBlock = createBlock;
    exports2.createCommentVNode = createCommentVNode;
    exports2.createElementBlock = createElementBlock;
    exports2.createElementVNode = createBaseVNode;
    exports2.createHydrationRenderer = createHydrationRenderer;
    exports2.createPropsRestProxy = createPropsRestProxy;
    exports2.createRenderer = createRenderer;
    exports2.createSlots = createSlots;
    exports2.createStaticVNode = createStaticVNode;
    exports2.createTextVNode = createTextVNode;
    exports2.createVNode = createVNode;
    exports2.defineAsyncComponent = defineAsyncComponent;
    exports2.defineComponent = defineComponent;
    exports2.defineEmits = defineEmits;
    exports2.defineExpose = defineExpose;
    exports2.defineProps = defineProps;
    exports2.getCurrentInstance = getCurrentInstance;
    exports2.getTransitionRawChildren = getTransitionRawChildren;
    exports2.guardReactiveProps = guardReactiveProps;
    exports2.h = h;
    exports2.handleError = handleError;
    exports2.initCustomFormatter = initCustomFormatter;
    exports2.inject = inject;
    exports2.isMemoSame = isMemoSame;
    exports2.isRuntimeOnly = isRuntimeOnly;
    exports2.isVNode = isVNode;
    exports2.mergeDefaults = mergeDefaults;
    exports2.mergeProps = mergeProps;
    exports2.nextTick = nextTick2;
    exports2.onActivated = onActivated;
    exports2.onBeforeMount = onBeforeMount;
    exports2.onBeforeUnmount = onBeforeUnmount;
    exports2.onBeforeUpdate = onBeforeUpdate;
    exports2.onDeactivated = onDeactivated;
    exports2.onErrorCaptured = onErrorCaptured;
    exports2.onMounted = onMounted;
    exports2.onRenderTracked = onRenderTracked;
    exports2.onRenderTriggered = onRenderTriggered;
    exports2.onServerPrefetch = onServerPrefetch;
    exports2.onUnmounted = onUnmounted;
    exports2.onUpdated = onUpdated;
    exports2.openBlock = openBlock;
    exports2.popScopeId = popScopeId;
    exports2.provide = provide;
    exports2.pushScopeId = pushScopeId;
    exports2.queuePostFlushCb = queuePostFlushCb;
    exports2.registerRuntimeCompiler = registerRuntimeCompiler;
    exports2.renderList = renderList;
    exports2.renderSlot = renderSlot;
    exports2.resolveComponent = resolveComponent;
    exports2.resolveDirective = resolveDirective;
    exports2.resolveDynamicComponent = resolveDynamicComponent;
    exports2.resolveFilter = resolveFilter;
    exports2.resolveTransitionHooks = resolveTransitionHooks;
    exports2.setBlockTracking = setBlockTracking;
    exports2.setDevtoolsHook = setDevtoolsHook;
    exports2.setTransitionHooks = setTransitionHooks;
    exports2.ssrContextKey = ssrContextKey;
    exports2.ssrUtils = ssrUtils;
    exports2.toHandlers = toHandlers;
    exports2.transformVNodeArgs = transformVNodeArgs;
    exports2.useAttrs = useAttrs;
    exports2.useSSRContext = useSSRContext;
    exports2.useSlots = useSlots;
    exports2.useTransitionState = useTransitionState;
    exports2.version = version;
    exports2.warn = warn;
    exports2.watch = watch;
    exports2.watchEffect = watchEffect;
    exports2.watchPostEffect = watchPostEffect;
    exports2.watchSyncEffect = watchSyncEffect;
    exports2.withAsyncContext = withAsyncContext;
    exports2.withCtx = withCtx;
    exports2.withDefaults = withDefaults;
    exports2.withDirectives = withDirectives;
    exports2.withMemo = withMemo;
    exports2.withScopeId = withScopeId;
  }
});

// ../node_modules/@vue/runtime-core/dist/runtime-core.cjs.js
var require_runtime_core_cjs = __commonJS({
  "../node_modules/@vue/runtime-core/dist/runtime-core.cjs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var reactivity = require_reactivity2();
    var shared = require_shared2();
    var stack = [];
    function pushWarningContext(vnode) {
      stack.push(vnode);
    }
    function popWarningContext() {
      stack.pop();
    }
    function warn(msg, ...args) {
      reactivity.pauseTracking();
      const instance = stack.length ? stack[stack.length - 1].component : null;
      const appWarnHandler = instance && instance.appContext.config.warnHandler;
      const trace = getComponentTrace();
      if (appWarnHandler) {
        callWithErrorHandling(appWarnHandler, instance, 11, [
          msg + args.join(""),
          instance && instance.proxy,
          trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
          trace
        ]);
      } else {
        const warnArgs = [`[Vue warn]: ${msg}`, ...args];
        if (trace.length && true) {
          warnArgs.push(`
`, ...formatTrace(trace));
        }
        console.warn(...warnArgs);
      }
      reactivity.resetTracking();
    }
    function getComponentTrace() {
      let currentVNode = stack[stack.length - 1];
      if (!currentVNode) {
        return [];
      }
      const normalizedStack = [];
      while (currentVNode) {
        const last = normalizedStack[0];
        if (last && last.vnode === currentVNode) {
          last.recurseCount++;
        } else {
          normalizedStack.push({
            vnode: currentVNode,
            recurseCount: 0
          });
        }
        const parentInstance = currentVNode.component && currentVNode.component.parent;
        currentVNode = parentInstance && parentInstance.vnode;
      }
      return normalizedStack;
    }
    function formatTrace(trace) {
      const logs = [];
      trace.forEach((entry, i) => {
        logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
      });
      return logs;
    }
    function formatTraceEntry({ vnode, recurseCount }) {
      const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
      const isRoot = vnode.component ? vnode.component.parent == null : false;
      const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
      const close = `>` + postfix;
      return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
    }
    function formatProps(props) {
      const res = [];
      const keys = Object.keys(props);
      keys.slice(0, 3).forEach((key) => {
        res.push(...formatProp(key, props[key]));
      });
      if (keys.length > 3) {
        res.push(` ...`);
      }
      return res;
    }
    function formatProp(key, value, raw) {
      if (shared.isString(value)) {
        value = JSON.stringify(value);
        return raw ? value : [`${key}=${value}`];
      } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
        return raw ? value : [`${key}=${value}`];
      } else if (reactivity.isRef(value)) {
        value = formatProp(key, reactivity.toRaw(value.value), true);
        return raw ? value : [`${key}=Ref<`, value, `>`];
      } else if (shared.isFunction(value)) {
        return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
      } else {
        value = reactivity.toRaw(value);
        return raw ? value : [`${key}=`, value];
      }
    }
    var ErrorTypeStrings = {
      ["sp"]: "serverPrefetch hook",
      ["bc"]: "beforeCreate hook",
      ["c"]: "created hook",
      ["bm"]: "beforeMount hook",
      ["m"]: "mounted hook",
      ["bu"]: "beforeUpdate hook",
      ["u"]: "updated",
      ["bum"]: "beforeUnmount hook",
      ["um"]: "unmounted hook",
      ["a"]: "activated hook",
      ["da"]: "deactivated hook",
      ["ec"]: "errorCaptured hook",
      ["rtc"]: "renderTracked hook",
      ["rtg"]: "renderTriggered hook",
      [0]: "setup function",
      [1]: "render function",
      [2]: "watcher getter",
      [3]: "watcher callback",
      [4]: "watcher cleanup function",
      [5]: "native event handler",
      [6]: "component event handler",
      [7]: "vnode hook",
      [8]: "directive hook",
      [9]: "transition hook",
      [10]: "app errorHandler",
      [11]: "app warnHandler",
      [12]: "ref function",
      [13]: "async component loader",
      [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
    };
    function callWithErrorHandling(fn, instance, type, args) {
      let res;
      try {
        res = args ? fn(...args) : fn();
      } catch (err) {
        handleError(err, instance, type);
      }
      return res;
    }
    function callWithAsyncErrorHandling(fn, instance, type, args) {
      if (shared.isFunction(fn)) {
        const res = callWithErrorHandling(fn, instance, type, args);
        if (res && shared.isPromise(res)) {
          res.catch((err) => {
            handleError(err, instance, type);
          });
        }
        return res;
      }
      const values = [];
      for (let i = 0; i < fn.length; i++) {
        values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
      }
      return values;
    }
    function handleError(err, instance, type, throwInDev = true) {
      const contextVNode = instance ? instance.vnode : null;
      if (instance) {
        let cur = instance.parent;
        const exposedInstance = instance.proxy;
        const errorInfo = ErrorTypeStrings[type];
        while (cur) {
          const errorCapturedHooks = cur.ec;
          if (errorCapturedHooks) {
            for (let i = 0; i < errorCapturedHooks.length; i++) {
              if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                return;
              }
            }
          }
          cur = cur.parent;
        }
        const appErrorHandler = instance.appContext.config.errorHandler;
        if (appErrorHandler) {
          callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
          return;
        }
      }
      logError(err, type, contextVNode, throwInDev);
    }
    function logError(err, type, contextVNode, throwInDev = true) {
      {
        const info = ErrorTypeStrings[type];
        if (contextVNode) {
          pushWarningContext(contextVNode);
        }
        warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
        if (contextVNode) {
          popWarningContext();
        }
        if (throwInDev) {
          throw err;
        } else {
          console.error(err);
        }
      }
    }
    var isFlushing = false;
    var isFlushPending = false;
    var queue = [];
    var flushIndex = 0;
    var pendingPostFlushCbs = [];
    var activePostFlushCbs = null;
    var postFlushIndex = 0;
    var resolvedPromise = /* @__PURE__ */ Promise.resolve();
    var currentFlushPromise = null;
    var RECURSION_LIMIT = 100;
    function nextTick2(fn) {
      const p = currentFlushPromise || resolvedPromise;
      return fn ? p.then(this ? fn.bind(this) : fn) : p;
    }
    function findInsertionIndex(id) {
      let start = flushIndex + 1;
      let end = queue.length;
      while (start < end) {
        const middle = start + end >>> 1;
        const middleJobId = getId(queue[middle]);
        middleJobId < id ? start = middle + 1 : end = middle;
      }
      return start;
    }
    function queueJob(job) {
      if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
        if (job.id == null) {
          queue.push(job);
        } else {
          queue.splice(findInsertionIndex(job.id), 0, job);
        }
        queueFlush();
      }
    }
    function queueFlush() {
      if (!isFlushing && !isFlushPending) {
        isFlushPending = true;
        currentFlushPromise = resolvedPromise.then(flushJobs);
      }
    }
    function invalidateJob(job) {
      const i = queue.indexOf(job);
      if (i > flushIndex) {
        queue.splice(i, 1);
      }
    }
    function queuePostFlushCb(cb) {
      if (!shared.isArray(cb)) {
        if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
          pendingPostFlushCbs.push(cb);
        }
      } else {
        pendingPostFlushCbs.push(...cb);
      }
      queueFlush();
    }
    function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
      {
        seen = seen || new Map();
      }
      for (; i < queue.length; i++) {
        const cb = queue[i];
        if (cb && cb.pre) {
          if (checkRecursiveUpdates(seen, cb)) {
            continue;
          }
          queue.splice(i, 1);
          i--;
          cb();
        }
      }
    }
    function flushPostFlushCbs(seen) {
      if (pendingPostFlushCbs.length) {
        const deduped = [...new Set(pendingPostFlushCbs)];
        pendingPostFlushCbs.length = 0;
        if (activePostFlushCbs) {
          activePostFlushCbs.push(...deduped);
          return;
        }
        activePostFlushCbs = deduped;
        {
          seen = seen || new Map();
        }
        activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
          if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
            continue;
          }
          activePostFlushCbs[postFlushIndex]();
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
      }
    }
    var getId = (job) => job.id == null ? Infinity : job.id;
    var comparator = (a, b) => {
      const diff = getId(a) - getId(b);
      if (diff === 0) {
        if (a.pre && !b.pre)
          return -1;
        if (b.pre && !a.pre)
          return 1;
      }
      return diff;
    };
    function flushJobs(seen) {
      isFlushPending = false;
      isFlushing = true;
      {
        seen = seen || new Map();
      }
      queue.sort(comparator);
      const check = (job) => checkRecursiveUpdates(seen, job);
      try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
          const job = queue[flushIndex];
          if (job && job.active !== false) {
            if (check(job)) {
              continue;
            }
            callWithErrorHandling(job, null, 14);
          }
        }
      } finally {
        flushIndex = 0;
        queue.length = 0;
        flushPostFlushCbs(seen);
        isFlushing = false;
        currentFlushPromise = null;
        if (queue.length || pendingPostFlushCbs.length) {
          flushJobs(seen);
        }
      }
    }
    function checkRecursiveUpdates(seen, fn) {
      if (!seen.has(fn)) {
        seen.set(fn, 1);
      } else {
        const count = seen.get(fn);
        if (count > RECURSION_LIMIT) {
          const instance = fn.ownerInstance;
          const componentName = instance && getComponentName(instance.type);
          warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
          return true;
        } else {
          seen.set(fn, count + 1);
        }
      }
    }
    var isHmrUpdating = false;
    var hmrDirtyComponents = new Set();
    {
      shared.getGlobalThis().__VUE_HMR_RUNTIME__ = {
        createRecord: tryWrap(createRecord),
        rerender: tryWrap(rerender),
        reload: tryWrap(reload)
      };
    }
    var map = new Map();
    function registerHMR(instance) {
      const id = instance.type.__hmrId;
      let record = map.get(id);
      if (!record) {
        createRecord(id, instance.type);
        record = map.get(id);
      }
      record.instances.add(instance);
    }
    function unregisterHMR(instance) {
      map.get(instance.type.__hmrId).instances.delete(instance);
    }
    function createRecord(id, initialDef) {
      if (map.has(id)) {
        return false;
      }
      map.set(id, {
        initialDef: normalizeClassComponent(initialDef),
        instances: new Set()
      });
      return true;
    }
    function normalizeClassComponent(component) {
      return isClassComponent(component) ? component.__vccOpts : component;
    }
    function rerender(id, newRender) {
      const record = map.get(id);
      if (!record) {
        return;
      }
      record.initialDef.render = newRender;
      [...record.instances].forEach((instance) => {
        if (newRender) {
          instance.render = newRender;
          normalizeClassComponent(instance.type).render = newRender;
        }
        instance.renderCache = [];
        isHmrUpdating = true;
        instance.update();
        isHmrUpdating = false;
      });
    }
    function reload(id, newComp) {
      const record = map.get(id);
      if (!record)
        return;
      newComp = normalizeClassComponent(newComp);
      updateComponentDef(record.initialDef, newComp);
      const instances = [...record.instances];
      for (const instance of instances) {
        const oldComp = normalizeClassComponent(instance.type);
        if (!hmrDirtyComponents.has(oldComp)) {
          if (oldComp !== record.initialDef) {
            updateComponentDef(oldComp, newComp);
          }
          hmrDirtyComponents.add(oldComp);
        }
        instance.appContext.optionsCache.delete(instance.type);
        if (instance.ceReload) {
          hmrDirtyComponents.add(oldComp);
          instance.ceReload(newComp.styles);
          hmrDirtyComponents.delete(oldComp);
        } else if (instance.parent) {
          queueJob(instance.parent.update);
          if (instance.parent.type.__asyncLoader && instance.parent.ceReload) {
            instance.parent.ceReload(newComp.styles);
          }
        } else if (instance.appContext.reload) {
          instance.appContext.reload();
        } else if (typeof window !== "undefined") {
          window.location.reload();
        } else {
          console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
        }
      }
      queuePostFlushCb(() => {
        for (const instance of instances) {
          hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
        }
      });
    }
    function updateComponentDef(oldComp, newComp) {
      shared.extend(oldComp, newComp);
      for (const key in oldComp) {
        if (key !== "__file" && !(key in newComp)) {
          delete oldComp[key];
        }
      }
    }
    function tryWrap(fn) {
      return (id, arg) => {
        try {
          return fn(id, arg);
        } catch (e) {
          console.error(e);
          console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
        }
      };
    }
    var buffer = [];
    var devtoolsNotInstalled = false;
    function emit(event, ...args) {
      if (exports2.devtools) {
        exports2.devtools.emit(event, ...args);
      } else if (!devtoolsNotInstalled) {
        buffer.push({ event, args });
      }
    }
    function setDevtoolsHook(hook, target) {
      var _a, _b;
      exports2.devtools = hook;
      if (exports2.devtools) {
        exports2.devtools.enabled = true;
        buffer.forEach(({ event, args }) => exports2.devtools.emit(event, ...args));
        buffer = [];
      } else if (typeof window !== "undefined" && window.HTMLElement && !((_b = (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))) {
        const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
        replay.push((newHook) => {
          setDevtoolsHook(newHook, target);
        });
        setTimeout(() => {
          if (!exports2.devtools) {
            target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
            devtoolsNotInstalled = true;
            buffer = [];
          }
        }, 3e3);
      } else {
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }
    function devtoolsInitApp(app, version2) {
      emit("app:init", app, version2, {
        Fragment,
        Text,
        Comment,
        Static
      });
    }
    function devtoolsUnmountApp(app) {
      emit("app:unmount", app);
    }
    var devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook("component:added");
    var devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook("component:updated");
    var _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook("component:removed");
    var devtoolsComponentRemoved = (component) => {
      if (exports2.devtools && typeof exports2.devtools.cleanupBuffer === "function" && !exports2.devtools.cleanupBuffer(component)) {
        _devtoolsComponentRemoved(component);
      }
    };
    function createDevtoolsComponentHook(hook) {
      return (component) => {
        emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
      };
    }
    var devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:start");
    var devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:end");
    function createDevtoolsPerformanceHook(hook) {
      return (component, type, time) => {
        emit(hook, component.appContext.app, component.uid, component, type, time);
      };
    }
    function devtoolsComponentEmit(component, event, params) {
      emit("component:emit", component.appContext.app, component, event, params);
    }
    function emit$1(instance, event, ...rawArgs) {
      if (instance.isUnmounted)
        return;
      const props = instance.vnode.props || shared.EMPTY_OBJ;
      {
        const { emitsOptions, propsOptions: [propsOptions] } = instance;
        if (emitsOptions) {
          if (!(event in emitsOptions) && true) {
            if (!propsOptions || !(shared.toHandlerKey(event) in propsOptions)) {
              warn(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${shared.toHandlerKey(event)}" prop.`);
            }
          } else {
            const validator = emitsOptions[event];
            if (shared.isFunction(validator)) {
              const isValid = validator(...rawArgs);
              if (!isValid) {
                warn(`Invalid event arguments: event validation failed for event "${event}".`);
              }
            }
          }
        }
      }
      let args = rawArgs;
      const isModelListener = event.startsWith("update:");
      const modelArg = isModelListener && event.slice(7);
      if (modelArg && modelArg in props) {
        const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
        const { number, trim } = props[modifiersKey] || shared.EMPTY_OBJ;
        if (trim) {
          args = rawArgs.map((a) => a.trim());
        }
        if (number) {
          args = rawArgs.map(shared.toNumber);
        }
      }
      {
        devtoolsComponentEmit(instance, event, args);
      }
      {
        const lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && props[shared.toHandlerKey(lowerCaseEvent)]) {
          warn(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${shared.hyphenate(event)}" instead of "${event}".`);
        }
      }
      let handlerName;
      let handler = props[handlerName = shared.toHandlerKey(event)] || props[handlerName = shared.toHandlerKey(shared.camelize(event))];
      if (!handler && isModelListener) {
        handler = props[handlerName = shared.toHandlerKey(shared.hyphenate(event))];
      }
      if (handler) {
        callWithAsyncErrorHandling(handler, instance, 6, args);
      }
      const onceHandler = props[handlerName + `Once`];
      if (onceHandler) {
        if (!instance.emitted) {
          instance.emitted = {};
        } else if (instance.emitted[handlerName]) {
          return;
        }
        instance.emitted[handlerName] = true;
        callWithAsyncErrorHandling(onceHandler, instance, 6, args);
      }
    }
    function normalizeEmitsOptions(comp, appContext, asMixin = false) {
      const cache = appContext.emitsCache;
      const cached = cache.get(comp);
      if (cached !== void 0) {
        return cached;
      }
      const raw = comp.emits;
      let normalized = {};
      let hasExtends = false;
      if (!shared.isFunction(comp)) {
        const extendEmits = (raw2) => {
          const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
          if (normalizedFromExtend) {
            hasExtends = true;
            shared.extend(normalized, normalizedFromExtend);
          }
        };
        if (!asMixin && appContext.mixins.length) {
          appContext.mixins.forEach(extendEmits);
        }
        if (comp.extends) {
          extendEmits(comp.extends);
        }
        if (comp.mixins) {
          comp.mixins.forEach(extendEmits);
        }
      }
      if (!raw && !hasExtends) {
        if (shared.isObject(comp)) {
          cache.set(comp, null);
        }
        return null;
      }
      if (shared.isArray(raw)) {
        raw.forEach((key) => normalized[key] = null);
      } else {
        shared.extend(normalized, raw);
      }
      if (shared.isObject(comp)) {
        cache.set(comp, normalized);
      }
      return normalized;
    }
    function isEmitListener(options, key) {
      if (!options || !shared.isOn(key)) {
        return false;
      }
      key = key.slice(2).replace(/Once$/, "");
      return shared.hasOwn(options, key[0].toLowerCase() + key.slice(1)) || shared.hasOwn(options, shared.hyphenate(key)) || shared.hasOwn(options, key);
    }
    var currentRenderingInstance = null;
    var currentScopeId = null;
    function setCurrentRenderingInstance(instance) {
      const prev = currentRenderingInstance;
      currentRenderingInstance = instance;
      currentScopeId = instance && instance.type.__scopeId || null;
      return prev;
    }
    function pushScopeId(id) {
      currentScopeId = id;
    }
    function popScopeId() {
      currentScopeId = null;
    }
    var withScopeId = (_id) => withCtx;
    function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
      if (!ctx)
        return fn;
      if (fn._n) {
        return fn;
      }
      const renderFnWithContext = (...args) => {
        if (renderFnWithContext._d) {
          setBlockTracking(-1);
        }
        const prevInstance = setCurrentRenderingInstance(ctx);
        let res;
        try {
          res = fn(...args);
        } finally {
          setCurrentRenderingInstance(prevInstance);
          if (renderFnWithContext._d) {
            setBlockTracking(1);
          }
        }
        {
          devtoolsComponentUpdated(ctx);
        }
        return res;
      };
      renderFnWithContext._n = true;
      renderFnWithContext._c = true;
      renderFnWithContext._d = true;
      return renderFnWithContext;
    }
    var accessedAttrs = false;
    function markAttrsAccessed() {
      accessedAttrs = true;
    }
    function renderComponentRoot(instance) {
      const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
      let result;
      let fallthroughAttrs;
      const prev = setCurrentRenderingInstance(instance);
      {
        accessedAttrs = false;
      }
      try {
        if (vnode.shapeFlag & 4) {
          const proxyToUse = withProxy || proxy;
          result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
          fallthroughAttrs = attrs;
        } else {
          const render2 = Component;
          if (attrs === props) {
            markAttrsAccessed();
          }
          result = normalizeVNode(render2.length > 1 ? render2(props, true ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }) : render2(props, null));
          fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
        }
      } catch (err) {
        blockStack.length = 0;
        handleError(err, instance, 1);
        result = createVNode(Comment);
      }
      let root = result;
      let setRoot = void 0;
      if (result.patchFlag > 0 && result.patchFlag & 2048) {
        [root, setRoot] = getChildRoot(result);
      }
      if (fallthroughAttrs && inheritAttrs !== false) {
        const keys = Object.keys(fallthroughAttrs);
        const { shapeFlag } = root;
        if (keys.length) {
          if (shapeFlag & (1 | 6)) {
            if (propsOptions && keys.some(shared.isModelListener)) {
              fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
            }
            root = cloneVNode(root, fallthroughAttrs);
          } else if (!accessedAttrs && root.type !== Comment) {
            const allAttrs = Object.keys(attrs);
            const eventAttrs = [];
            const extraAttrs = [];
            for (let i = 0, l = allAttrs.length; i < l; i++) {
              const key = allAttrs[i];
              if (shared.isOn(key)) {
                if (!shared.isModelListener(key)) {
                  eventAttrs.push(key[2].toLowerCase() + key.slice(3));
                }
              } else {
                extraAttrs.push(key);
              }
            }
            if (extraAttrs.length) {
              warn(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`);
            }
            if (eventAttrs.length) {
              warn(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
            }
          }
        }
      }
      if (vnode.dirs) {
        if (!isElementRoot(root)) {
          warn(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
        }
        root = cloneVNode(root);
        root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
      }
      if (vnode.transition) {
        if (!isElementRoot(root)) {
          warn(`Component inside <Transition> renders non-element root node that cannot be animated.`);
        }
        root.transition = vnode.transition;
      }
      if (setRoot) {
        setRoot(root);
      } else {
        result = root;
      }
      setCurrentRenderingInstance(prev);
      return result;
    }
    var getChildRoot = (vnode) => {
      const rawChildren = vnode.children;
      const dynamicChildren = vnode.dynamicChildren;
      const childRoot = filterSingleRoot(rawChildren);
      if (!childRoot) {
        return [vnode, void 0];
      }
      const index = rawChildren.indexOf(childRoot);
      const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
      const setRoot = (updatedRoot) => {
        rawChildren[index] = updatedRoot;
        if (dynamicChildren) {
          if (dynamicIndex > -1) {
            dynamicChildren[dynamicIndex] = updatedRoot;
          } else if (updatedRoot.patchFlag > 0) {
            vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
          }
        }
      };
      return [normalizeVNode(childRoot), setRoot];
    };
    function filterSingleRoot(children) {
      let singleRoot;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isVNode(child)) {
          if (child.type !== Comment || child.children === "v-if") {
            if (singleRoot) {
              return;
            } else {
              singleRoot = child;
            }
          }
        } else {
          return;
        }
      }
      return singleRoot;
    }
    var getFunctionalFallthrough = (attrs) => {
      let res;
      for (const key in attrs) {
        if (key === "class" || key === "style" || shared.isOn(key)) {
          (res || (res = {}))[key] = attrs[key];
        }
      }
      return res;
    };
    var filterModelListeners = (attrs, props) => {
      const res = {};
      for (const key in attrs) {
        if (!shared.isModelListener(key) || !(key.slice(9) in props)) {
          res[key] = attrs[key];
        }
      }
      return res;
    };
    var isElementRoot = (vnode) => {
      return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
    };
    function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
      const { props: prevProps, children: prevChildren, component } = prevVNode;
      const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
      const emits = component.emitsOptions;
      if ((prevChildren || nextChildren) && isHmrUpdating) {
        return true;
      }
      if (nextVNode.dirs || nextVNode.transition) {
        return true;
      }
      if (optimized && patchFlag >= 0) {
        if (patchFlag & 1024) {
          return true;
        }
        if (patchFlag & 16) {
          if (!prevProps) {
            return !!nextProps;
          }
          return hasPropsChanged(prevProps, nextProps, emits);
        } else if (patchFlag & 8) {
          const dynamicProps = nextVNode.dynamicProps;
          for (let i = 0; i < dynamicProps.length; i++) {
            const key = dynamicProps[i];
            if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
              return true;
            }
          }
        }
      } else {
        if (prevChildren || nextChildren) {
          if (!nextChildren || !nextChildren.$stable) {
            return true;
          }
        }
        if (prevProps === nextProps) {
          return false;
        }
        if (!prevProps) {
          return !!nextProps;
        }
        if (!nextProps) {
          return true;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      }
      return false;
    }
    function hasPropsChanged(prevProps, nextProps, emitsOptions) {
      const nextKeys = Object.keys(nextProps);
      if (nextKeys.length !== Object.keys(prevProps).length) {
        return true;
      }
      for (let i = 0; i < nextKeys.length; i++) {
        const key = nextKeys[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
          return true;
        }
      }
      return false;
    }
    function updateHOCHostEl({ vnode, parent }, el) {
      while (parent && parent.subTree === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
      }
    }
    var isSuspense = (type) => type.__isSuspense;
    var SuspenseImpl = {
      name: "Suspense",
      __isSuspense: true,
      process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
        if (n1 == null) {
          mountSuspense(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals);
        } else {
          patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, rendererInternals);
        }
      },
      hydrate: hydrateSuspense,
      create: createSuspenseBoundary,
      normalize: normalizeSuspenseChildren
    };
    var Suspense = SuspenseImpl;
    function triggerEvent(vnode, name) {
      const eventListener = vnode.props && vnode.props[name];
      if (shared.isFunction(eventListener)) {
        eventListener();
      }
    }
    function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
      const { p: patch, o: { createElement } } = rendererInternals;
      const hiddenContainer = createElement("div");
      const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, isSVG, slotScopeIds, optimized, rendererInternals);
      patch(null, suspense.pendingBranch = vnode.ssContent, hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds);
      if (suspense.deps > 0) {
        triggerEvent(vnode, "onPending");
        triggerEvent(vnode, "onFallback");
        patch(null, vnode.ssFallback, container, anchor, parentComponent, null, isSVG, slotScopeIds);
        setActiveBranch(suspense, vnode.ssFallback);
      } else {
        suspense.resolve();
      }
    }
    function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement } }) {
      const suspense = n2.suspense = n1.suspense;
      suspense.vnode = n2;
      n2.el = n1.el;
      const newBranch = n2.ssContent;
      const newFallback = n2.ssFallback;
      const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense;
      if (pendingBranch) {
        suspense.pendingBranch = newBranch;
        if (isSameVNodeType(newBranch, pendingBranch)) {
          patch(pendingBranch, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
          if (suspense.deps <= 0) {
            suspense.resolve();
          } else if (isInFallback) {
            patch(activeBranch, newFallback, container, anchor, parentComponent, null, isSVG, slotScopeIds, optimized);
            setActiveBranch(suspense, newFallback);
          }
        } else {
          suspense.pendingId++;
          if (isHydrating) {
            suspense.isHydrating = false;
            suspense.activeBranch = pendingBranch;
          } else {
            unmount(pendingBranch, parentComponent, suspense);
          }
          suspense.deps = 0;
          suspense.effects.length = 0;
          suspense.hiddenContainer = createElement("div");
          if (isInFallback) {
            patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
            if (suspense.deps <= 0) {
              suspense.resolve();
            } else {
              patch(activeBranch, newFallback, container, anchor, parentComponent, null, isSVG, slotScopeIds, optimized);
              setActiveBranch(suspense, newFallback);
            }
          } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
            patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, isSVG, slotScopeIds, optimized);
            suspense.resolve(true);
          } else {
            patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
            if (suspense.deps <= 0) {
              suspense.resolve();
            }
          }
        }
      } else {
        if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
          patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, isSVG, slotScopeIds, optimized);
          setActiveBranch(suspense, newBranch);
        } else {
          triggerEvent(n2, "onPending");
          suspense.pendingBranch = newBranch;
          suspense.pendingId++;
          patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
          if (suspense.deps <= 0) {
            suspense.resolve();
          } else {
            const { timeout, pendingId } = suspense;
            if (timeout > 0) {
              setTimeout(() => {
                if (suspense.pendingId === pendingId) {
                  suspense.fallback(newFallback);
                }
              }, timeout);
            } else if (timeout === 0) {
              suspense.fallback(newFallback);
            }
          }
        }
      }
    }
    var hasWarned = false;
    function createSuspenseBoundary(vnode, parent, parentComponent, container, hiddenContainer, anchor, isSVG, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
      if (!hasWarned) {
        hasWarned = true;
        console[console.info ? "info" : "log"](`<Suspense> is an experimental feature and its API will likely change.`);
      }
      const { p: patch, m: move, um: unmount, n: next, o: { parentNode, remove } } = rendererInternals;
      const timeout = shared.toNumber(vnode.props && vnode.props.timeout);
      const suspense = {
        vnode,
        parent,
        parentComponent,
        isSVG,
        container,
        hiddenContainer,
        anchor,
        deps: 0,
        pendingId: 0,
        timeout: typeof timeout === "number" ? timeout : -1,
        activeBranch: null,
        pendingBranch: null,
        isInFallback: true,
        isHydrating,
        isUnmounted: false,
        effects: [],
        resolve(resume = false) {
          {
            if (!resume && !suspense.pendingBranch) {
              throw new Error(`suspense.resolve() is called without a pending branch.`);
            }
            if (suspense.isUnmounted) {
              throw new Error(`suspense.resolve() is called on an already unmounted suspense boundary.`);
            }
          }
          const { vnode: vnode2, activeBranch, pendingBranch, pendingId, effects, parentComponent: parentComponent2, container: container2 } = suspense;
          if (suspense.isHydrating) {
            suspense.isHydrating = false;
          } else if (!resume) {
            const delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
            if (delayEnter) {
              activeBranch.transition.afterLeave = () => {
                if (pendingId === suspense.pendingId) {
                  move(pendingBranch, container2, anchor2, 0);
                }
              };
            }
            let { anchor: anchor2 } = suspense;
            if (activeBranch) {
              anchor2 = next(activeBranch);
              unmount(activeBranch, parentComponent2, suspense, true);
            }
            if (!delayEnter) {
              move(pendingBranch, container2, anchor2, 0);
            }
          }
          setActiveBranch(suspense, pendingBranch);
          suspense.pendingBranch = null;
          suspense.isInFallback = false;
          let parent2 = suspense.parent;
          let hasUnresolvedAncestor = false;
          while (parent2) {
            if (parent2.pendingBranch) {
              parent2.effects.push(...effects);
              hasUnresolvedAncestor = true;
              break;
            }
            parent2 = parent2.parent;
          }
          if (!hasUnresolvedAncestor) {
            queuePostFlushCb(effects);
          }
          suspense.effects = [];
          triggerEvent(vnode2, "onResolve");
        },
        fallback(fallbackVNode) {
          if (!suspense.pendingBranch) {
            return;
          }
          const { vnode: vnode2, activeBranch, parentComponent: parentComponent2, container: container2, isSVG: isSVG2 } = suspense;
          triggerEvent(vnode2, "onFallback");
          const anchor2 = next(activeBranch);
          const mountFallback = () => {
            if (!suspense.isInFallback) {
              return;
            }
            patch(null, fallbackVNode, container2, anchor2, parentComponent2, null, isSVG2, slotScopeIds, optimized);
            setActiveBranch(suspense, fallbackVNode);
          };
          const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
          if (delayEnter) {
            activeBranch.transition.afterLeave = mountFallback;
          }
          suspense.isInFallback = true;
          unmount(activeBranch, parentComponent2, null, true);
          if (!delayEnter) {
            mountFallback();
          }
        },
        move(container2, anchor2, type) {
          suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type);
          suspense.container = container2;
        },
        next() {
          return suspense.activeBranch && next(suspense.activeBranch);
        },
        registerDep(instance, setupRenderEffect) {
          const isInPendingSuspense = !!suspense.pendingBranch;
          if (isInPendingSuspense) {
            suspense.deps++;
          }
          const hydratedEl = instance.vnode.el;
          instance.asyncDep.catch((err) => {
            handleError(err, instance, 0);
          }).then((asyncSetupResult) => {
            if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
              return;
            }
            instance.asyncResolved = true;
            const { vnode: vnode2 } = instance;
            {
              pushWarningContext(vnode2);
            }
            handleSetupResult(instance, asyncSetupResult, false);
            if (hydratedEl) {
              vnode2.el = hydratedEl;
            }
            const placeholder = !hydratedEl && instance.subTree.el;
            setupRenderEffect(instance, vnode2, parentNode(hydratedEl || instance.subTree.el), hydratedEl ? null : next(instance.subTree), suspense, isSVG, optimized);
            if (placeholder) {
              remove(placeholder);
            }
            updateHOCHostEl(instance, vnode2.el);
            {
              popWarningContext();
            }
            if (isInPendingSuspense && --suspense.deps === 0) {
              suspense.resolve();
            }
          });
        },
        unmount(parentSuspense, doRemove) {
          suspense.isUnmounted = true;
          if (suspense.activeBranch) {
            unmount(suspense.activeBranch, parentComponent, parentSuspense, doRemove);
          }
          if (suspense.pendingBranch) {
            unmount(suspense.pendingBranch, parentComponent, parentSuspense, doRemove);
          }
        }
      };
      return suspense;
    }
    function hydrateSuspense(node, vnode, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals, hydrateNode) {
      const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, node.parentNode, document.createElement("div"), null, isSVG, slotScopeIds, optimized, rendererInternals, true);
      const result = hydrateNode(node, suspense.pendingBranch = vnode.ssContent, parentComponent, suspense, slotScopeIds, optimized);
      if (suspense.deps === 0) {
        suspense.resolve();
      }
      return result;
    }
    function normalizeSuspenseChildren(vnode) {
      const { shapeFlag, children } = vnode;
      const isSlotChildren = shapeFlag & 32;
      vnode.ssContent = normalizeSuspenseSlot(isSlotChildren ? children.default : children);
      vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment);
    }
    function normalizeSuspenseSlot(s) {
      let block;
      if (shared.isFunction(s)) {
        const trackBlock = isBlockTreeEnabled && s._c;
        if (trackBlock) {
          s._d = false;
          openBlock();
        }
        s = s();
        if (trackBlock) {
          s._d = true;
          block = currentBlock;
          closeBlock();
        }
      }
      if (shared.isArray(s)) {
        const singleChild = filterSingleRoot(s);
        if (!singleChild) {
          warn(`<Suspense> slots expect a single root node.`);
        }
        s = singleChild;
      }
      s = normalizeVNode(s);
      if (block && !s.dynamicChildren) {
        s.dynamicChildren = block.filter((c) => c !== s);
      }
      return s;
    }
    function queueEffectWithSuspense(fn, suspense) {
      if (suspense && suspense.pendingBranch) {
        if (shared.isArray(fn)) {
          suspense.effects.push(...fn);
        } else {
          suspense.effects.push(fn);
        }
      } else {
        queuePostFlushCb(fn);
      }
    }
    function setActiveBranch(suspense, branch) {
      suspense.activeBranch = branch;
      const { vnode, parentComponent } = suspense;
      const el = vnode.el = branch.el;
      if (parentComponent && parentComponent.subTree === vnode) {
        parentComponent.vnode.el = el;
        updateHOCHostEl(parentComponent, el);
      }
    }
    function provide(key, value) {
      if (!currentInstance) {
        {
          warn(`provide() can only be used inside setup().`);
        }
      } else {
        let provides = currentInstance.provides;
        const parentProvides = currentInstance.parent && currentInstance.parent.provides;
        if (parentProvides === provides) {
          provides = currentInstance.provides = Object.create(parentProvides);
        }
        provides[key] = value;
      }
    }
    function inject(key, defaultValue, treatDefaultAsFactory = false) {
      const instance = currentInstance || currentRenderingInstance;
      if (instance) {
        const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
        if (provides && key in provides) {
          return provides[key];
        } else if (arguments.length > 1) {
          return treatDefaultAsFactory && shared.isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
        } else {
          warn(`injection "${String(key)}" not found.`);
        }
      } else {
        warn(`inject() can only be used inside setup() or functional components.`);
      }
    }
    function watchEffect(effect, options) {
      return doWatch(effect, null, options);
    }
    function watchPostEffect(effect, options) {
      return doWatch(effect, null, { ...options, flush: "post" });
    }
    function watchSyncEffect(effect, options) {
      return doWatch(effect, null, { ...options, flush: "sync" });
    }
    var INITIAL_WATCHER_VALUE = {};
    function watch(source, cb, options) {
      if (!shared.isFunction(cb)) {
        warn(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
      }
      return doWatch(source, cb, options);
    }
    function doWatch(source, cb, { immediate, deep, flush: flush2, onTrack, onTrigger } = shared.EMPTY_OBJ) {
      if (!cb) {
        if (immediate !== void 0) {
          warn(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
        }
        if (deep !== void 0) {
          warn(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
        }
      }
      const warnInvalidSource = (s) => {
        warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
      };
      const instance = currentInstance;
      let getter;
      let forceTrigger = false;
      let isMultiSource = false;
      if (reactivity.isRef(source)) {
        getter = () => source.value;
        forceTrigger = reactivity.isShallow(source);
      } else if (reactivity.isReactive(source)) {
        getter = () => source;
        deep = true;
      } else if (shared.isArray(source)) {
        isMultiSource = true;
        forceTrigger = source.some((s) => reactivity.isReactive(s) || reactivity.isShallow(s));
        getter = () => source.map((s) => {
          if (reactivity.isRef(s)) {
            return s.value;
          } else if (reactivity.isReactive(s)) {
            return traverse(s);
          } else if (shared.isFunction(s)) {
            return callWithErrorHandling(s, instance, 2);
          } else {
            warnInvalidSource(s);
          }
        });
      } else if (shared.isFunction(source)) {
        if (cb) {
          getter = () => callWithErrorHandling(source, instance, 2);
        } else {
          getter = () => {
            if (instance && instance.isUnmounted) {
              return;
            }
            if (cleanup) {
              cleanup();
            }
            return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
          };
        }
      } else {
        getter = shared.NOOP;
        warnInvalidSource(source);
      }
      if (cb && deep) {
        const baseGetter = getter;
        getter = () => traverse(baseGetter());
      }
      let cleanup;
      let onCleanup = (fn) => {
        cleanup = effect.onStop = () => {
          callWithErrorHandling(fn, instance, 4);
        };
      };
      if (isInSSRComponentSetup) {
        onCleanup = shared.NOOP;
        if (!cb) {
          getter();
        } else if (immediate) {
          callWithAsyncErrorHandling(cb, instance, 3, [
            getter(),
            isMultiSource ? [] : void 0,
            onCleanup
          ]);
        }
        return shared.NOOP;
      }
      let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
      const job = () => {
        if (!effect.active) {
          return;
        }
        if (cb) {
          const newValue = effect.run();
          if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => shared.hasChanged(v, oldValue[i])) : shared.hasChanged(newValue, oldValue)) || false) {
            if (cleanup) {
              cleanup();
            }
            callWithAsyncErrorHandling(cb, instance, 3, [
              newValue,
              oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
              onCleanup
            ]);
            oldValue = newValue;
          }
        } else {
          effect.run();
        }
      };
      job.allowRecurse = !!cb;
      let scheduler;
      if (flush2 === "sync") {
        scheduler = job;
      } else if (flush2 === "post") {
        scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
      } else {
        job.pre = true;
        if (instance)
          job.id = instance.uid;
        scheduler = () => queueJob(job);
      }
      const effect = new reactivity.ReactiveEffect(getter, scheduler);
      {
        effect.onTrack = onTrack;
        effect.onTrigger = onTrigger;
      }
      if (cb) {
        if (immediate) {
          job();
        } else {
          oldValue = effect.run();
        }
      } else if (flush2 === "post") {
        queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
      } else {
        effect.run();
      }
      return () => {
        effect.stop();
        if (instance && instance.scope) {
          shared.remove(instance.scope.effects, effect);
        }
      };
    }
    function instanceWatch(source, value, options) {
      const publicThis = this.proxy;
      const getter = shared.isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
      let cb;
      if (shared.isFunction(value)) {
        cb = value;
      } else {
        cb = value.handler;
        options = value;
      }
      const cur = currentInstance;
      setCurrentInstance(this);
      const res = doWatch(getter, cb.bind(publicThis), options);
      if (cur) {
        setCurrentInstance(cur);
      } else {
        unsetCurrentInstance();
      }
      return res;
    }
    function createPathGetter(ctx, path) {
      const segments = path.split(".");
      return () => {
        let cur = ctx;
        for (let i = 0; i < segments.length && cur; i++) {
          cur = cur[segments[i]];
        }
        return cur;
      };
    }
    function traverse(value, seen) {
      if (!shared.isObject(value) || value["__v_skip"]) {
        return value;
      }
      seen = seen || new Set();
      if (seen.has(value)) {
        return value;
      }
      seen.add(value);
      if (reactivity.isRef(value)) {
        traverse(value.value, seen);
      } else if (shared.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          traverse(value[i], seen);
        }
      } else if (shared.isSet(value) || shared.isMap(value)) {
        value.forEach((v) => {
          traverse(v, seen);
        });
      } else if (shared.isPlainObject(value)) {
        for (const key in value) {
          traverse(value[key], seen);
        }
      }
      return value;
    }
    function useTransitionState() {
      const state = {
        isMounted: false,
        isLeaving: false,
        isUnmounting: false,
        leavingVNodes: new Map()
      };
      onMounted(() => {
        state.isMounted = true;
      });
      onBeforeUnmount(() => {
        state.isUnmounting = true;
      });
      return state;
    }
    var TransitionHookValidator = [Function, Array];
    var BaseTransitionImpl = {
      name: `BaseTransition`,
      props: {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: TransitionHookValidator,
        onEnter: TransitionHookValidator,
        onAfterEnter: TransitionHookValidator,
        onEnterCancelled: TransitionHookValidator,
        onBeforeLeave: TransitionHookValidator,
        onLeave: TransitionHookValidator,
        onAfterLeave: TransitionHookValidator,
        onLeaveCancelled: TransitionHookValidator,
        onBeforeAppear: TransitionHookValidator,
        onAppear: TransitionHookValidator,
        onAfterAppear: TransitionHookValidator,
        onAppearCancelled: TransitionHookValidator
      },
      setup(props, { slots }) {
        const instance = getCurrentInstance();
        const state = useTransitionState();
        let prevTransitionKey;
        return () => {
          const children = slots.default && getTransitionRawChildren(slots.default(), true);
          if (!children || !children.length) {
            return;
          }
          let child = children[0];
          if (children.length > 1) {
            let hasFound = false;
            for (const c of children) {
              if (c.type !== Comment) {
                if (hasFound) {
                  warn("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
                  break;
                }
                child = c;
                hasFound = true;
              }
            }
          }
          const rawProps = reactivity.toRaw(props);
          const { mode } = rawProps;
          if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
            warn(`invalid <transition> mode: ${mode}`);
          }
          if (state.isLeaving) {
            return emptyPlaceholder(child);
          }
          const innerChild = getKeepAliveChild(child);
          if (!innerChild) {
            return emptyPlaceholder(child);
          }
          const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
          setTransitionHooks(innerChild, enterHooks);
          const oldChild = instance.subTree;
          const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
          let transitionKeyChanged = false;
          const { getTransitionKey } = innerChild.type;
          if (getTransitionKey) {
            const key = getTransitionKey();
            if (prevTransitionKey === void 0) {
              prevTransitionKey = key;
            } else if (key !== prevTransitionKey) {
              prevTransitionKey = key;
              transitionKeyChanged = true;
            }
          }
          if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
            const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
            setTransitionHooks(oldInnerChild, leavingHooks);
            if (mode === "out-in") {
              state.isLeaving = true;
              leavingHooks.afterLeave = () => {
                state.isLeaving = false;
                instance.update();
              };
              return emptyPlaceholder(child);
            } else if (mode === "in-out" && innerChild.type !== Comment) {
              leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
                const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
                leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
                el._leaveCb = () => {
                  earlyRemove();
                  el._leaveCb = void 0;
                  delete enterHooks.delayedLeave;
                };
                enterHooks.delayedLeave = delayedLeave;
              };
            }
          }
          return child;
        };
      }
    };
    var BaseTransition = BaseTransitionImpl;
    function getLeavingNodesForType(state, vnode) {
      const { leavingVNodes } = state;
      let leavingVNodesCache = leavingVNodes.get(vnode.type);
      if (!leavingVNodesCache) {
        leavingVNodesCache = Object.create(null);
        leavingVNodes.set(vnode.type, leavingVNodesCache);
      }
      return leavingVNodesCache;
    }
    function resolveTransitionHooks(vnode, props, state, instance) {
      const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
      const key = String(vnode.key);
      const leavingVNodesCache = getLeavingNodesForType(state, vnode);
      const callHook2 = (hook, args) => {
        hook && callWithAsyncErrorHandling(hook, instance, 9, args);
      };
      const callAsyncHook = (hook, args) => {
        const done = args[1];
        callHook2(hook, args);
        if (shared.isArray(hook)) {
          if (hook.every((hook2) => hook2.length <= 1))
            done();
        } else if (hook.length <= 1) {
          done();
        }
      };
      const hooks = {
        mode,
        persisted,
        beforeEnter(el) {
          let hook = onBeforeEnter;
          if (!state.isMounted) {
            if (appear) {
              hook = onBeforeAppear || onBeforeEnter;
            } else {
              return;
            }
          }
          if (el._leaveCb) {
            el._leaveCb(true);
          }
          const leavingVNode = leavingVNodesCache[key];
          if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
            leavingVNode.el._leaveCb();
          }
          callHook2(hook, [el]);
        },
        enter(el) {
          let hook = onEnter;
          let afterHook = onAfterEnter;
          let cancelHook = onEnterCancelled;
          if (!state.isMounted) {
            if (appear) {
              hook = onAppear || onEnter;
              afterHook = onAfterAppear || onAfterEnter;
              cancelHook = onAppearCancelled || onEnterCancelled;
            } else {
              return;
            }
          }
          let called = false;
          const done = el._enterCb = (cancelled) => {
            if (called)
              return;
            called = true;
            if (cancelled) {
              callHook2(cancelHook, [el]);
            } else {
              callHook2(afterHook, [el]);
            }
            if (hooks.delayedLeave) {
              hooks.delayedLeave();
            }
            el._enterCb = void 0;
          };
          if (hook) {
            callAsyncHook(hook, [el, done]);
          } else {
            done();
          }
        },
        leave(el, remove) {
          const key2 = String(vnode.key);
          if (el._enterCb) {
            el._enterCb(true);
          }
          if (state.isUnmounting) {
            return remove();
          }
          callHook2(onBeforeLeave, [el]);
          let called = false;
          const done = el._leaveCb = (cancelled) => {
            if (called)
              return;
            called = true;
            remove();
            if (cancelled) {
              callHook2(onLeaveCancelled, [el]);
            } else {
              callHook2(onAfterLeave, [el]);
            }
            el._leaveCb = void 0;
            if (leavingVNodesCache[key2] === vnode) {
              delete leavingVNodesCache[key2];
            }
          };
          leavingVNodesCache[key2] = vnode;
          if (onLeave) {
            callAsyncHook(onLeave, [el, done]);
          } else {
            done();
          }
        },
        clone(vnode2) {
          return resolveTransitionHooks(vnode2, props, state, instance);
        }
      };
      return hooks;
    }
    function emptyPlaceholder(vnode) {
      if (isKeepAlive(vnode)) {
        vnode = cloneVNode(vnode);
        vnode.children = null;
        return vnode;
      }
    }
    function getKeepAliveChild(vnode) {
      return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
    }
    function setTransitionHooks(vnode, hooks) {
      if (vnode.shapeFlag & 6 && vnode.component) {
        setTransitionHooks(vnode.component.subTree, hooks);
      } else if (vnode.shapeFlag & 128) {
        vnode.ssContent.transition = hooks.clone(vnode.ssContent);
        vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
      } else {
        vnode.transition = hooks;
      }
    }
    function getTransitionRawChildren(children, keepComment = false, parentKey) {
      let ret = [];
      let keyedFragmentCount = 0;
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
        if (child.type === Fragment) {
          if (child.patchFlag & 128)
            keyedFragmentCount++;
          ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
        } else if (keepComment || child.type !== Comment) {
          ret.push(key != null ? cloneVNode(child, { key }) : child);
        }
      }
      if (keyedFragmentCount > 1) {
        for (let i = 0; i < ret.length; i++) {
          ret[i].patchFlag = -2;
        }
      }
      return ret;
    }
    function defineComponent(options) {
      return shared.isFunction(options) ? { setup: options, name: options.name } : options;
    }
    var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
    function defineAsyncComponent(source) {
      if (shared.isFunction(source)) {
        source = { loader: source };
      }
      const {
        loader,
        loadingComponent,
        errorComponent,
        delay = 200,
        timeout,
        suspensible = true,
        onError: userOnError
      } = source;
      let pendingRequest = null;
      let resolvedComp;
      let retries = 0;
      const retry = () => {
        retries++;
        pendingRequest = null;
        return load();
      };
      const load = () => {
        let thisRequest;
        return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
          err = err instanceof Error ? err : new Error(String(err));
          if (userOnError) {
            return new Promise((resolve2, reject) => {
              const userRetry = () => resolve2(retry());
              const userFail = () => reject(err);
              userOnError(err, userRetry, userFail, retries + 1);
            });
          } else {
            throw err;
          }
        }).then((comp) => {
          if (thisRequest !== pendingRequest && pendingRequest) {
            return pendingRequest;
          }
          if (!comp) {
            warn(`Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.`);
          }
          if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
            comp = comp.default;
          }
          if (comp && !shared.isObject(comp) && !shared.isFunction(comp)) {
            throw new Error(`Invalid async component load result: ${comp}`);
          }
          resolvedComp = comp;
          return comp;
        }));
      };
      return defineComponent({
        name: "AsyncComponentWrapper",
        __asyncLoader: load,
        get __asyncResolved() {
          return resolvedComp;
        },
        setup() {
          const instance = currentInstance;
          if (resolvedComp) {
            return () => createInnerComp(resolvedComp, instance);
          }
          const onError = (err) => {
            pendingRequest = null;
            handleError(err, instance, 13, !errorComponent);
          };
          if (suspensible && instance.suspense || isInSSRComponentSetup) {
            return load().then((comp) => {
              return () => createInnerComp(comp, instance);
            }).catch((err) => {
              onError(err);
              return () => errorComponent ? createVNode(errorComponent, {
                error: err
              }) : null;
            });
          }
          const loaded = reactivity.ref(false);
          const error = reactivity.ref();
          const delayed = reactivity.ref(!!delay);
          if (delay) {
            setTimeout(() => {
              delayed.value = false;
            }, delay);
          }
          if (timeout != null) {
            setTimeout(() => {
              if (!loaded.value && !error.value) {
                const err = new Error(`Async component timed out after ${timeout}ms.`);
                onError(err);
                error.value = err;
              }
            }, timeout);
          }
          load().then(() => {
            loaded.value = true;
            if (instance.parent && isKeepAlive(instance.parent.vnode)) {
              queueJob(instance.parent.update);
            }
          }).catch((err) => {
            onError(err);
            error.value = err;
          });
          return () => {
            if (loaded.value && resolvedComp) {
              return createInnerComp(resolvedComp, instance);
            } else if (error.value && errorComponent) {
              return createVNode(errorComponent, {
                error: error.value
              });
            } else if (loadingComponent && !delayed.value) {
              return createVNode(loadingComponent);
            }
          };
        }
      });
    }
    function createInnerComp(comp, { vnode: { ref, props, children, shapeFlag }, parent }) {
      const vnode = createVNode(comp, props, children);
      vnode.ref = ref;
      return vnode;
    }
    var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
    var KeepAliveImpl = {
      name: `KeepAlive`,
      __isKeepAlive: true,
      props: {
        include: [String, RegExp, Array],
        exclude: [String, RegExp, Array],
        max: [String, Number]
      },
      setup(props, { slots }) {
        const instance = getCurrentInstance();
        const sharedContext = instance.ctx;
        if (!sharedContext.renderer) {
          return () => {
            const children = slots.default && slots.default();
            return children && children.length === 1 ? children[0] : children;
          };
        }
        const cache = new Map();
        const keys = new Set();
        let current = null;
        {
          instance.__v_cache = cache;
        }
        const parentSuspense = instance.suspense;
        const { renderer: { p: patch, m: move, um: _unmount, o: { createElement } } } = sharedContext;
        const storageContainer = createElement("div");
        sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
          const instance2 = vnode.component;
          move(vnode, container, anchor, 0, parentSuspense);
          patch(instance2.vnode, vnode, container, anchor, instance2, parentSuspense, isSVG, vnode.slotScopeIds, optimized);
          queuePostRenderEffect(() => {
            instance2.isDeactivated = false;
            if (instance2.a) {
              shared.invokeArrayFns(instance2.a);
            }
            const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
            if (vnodeHook) {
              invokeVNodeHook(vnodeHook, instance2.parent, vnode);
            }
          }, parentSuspense);
          {
            devtoolsComponentAdded(instance2);
          }
        };
        sharedContext.deactivate = (vnode) => {
          const instance2 = vnode.component;
          move(vnode, storageContainer, null, 1, parentSuspense);
          queuePostRenderEffect(() => {
            if (instance2.da) {
              shared.invokeArrayFns(instance2.da);
            }
            const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
            if (vnodeHook) {
              invokeVNodeHook(vnodeHook, instance2.parent, vnode);
            }
            instance2.isDeactivated = true;
          }, parentSuspense);
          {
            devtoolsComponentAdded(instance2);
          }
        };
        function unmount(vnode) {
          resetShapeFlag(vnode);
          _unmount(vnode, instance, parentSuspense, true);
        }
        function pruneCache(filter) {
          cache.forEach((vnode, key) => {
            const name = getComponentName(vnode.type);
            if (name && (!filter || !filter(name))) {
              pruneCacheEntry(key);
            }
          });
        }
        function pruneCacheEntry(key) {
          const cached = cache.get(key);
          if (!current || cached.type !== current.type) {
            unmount(cached);
          } else if (current) {
            resetShapeFlag(current);
          }
          cache.delete(key);
          keys.delete(key);
        }
        watch(() => [props.include, props.exclude], ([include, exclude]) => {
          include && pruneCache((name) => matches(include, name));
          exclude && pruneCache((name) => !matches(exclude, name));
        }, { flush: "post", deep: true });
        let pendingCacheKey = null;
        const cacheSubtree = () => {
          if (pendingCacheKey != null) {
            cache.set(pendingCacheKey, getInnerChild(instance.subTree));
          }
        };
        onMounted(cacheSubtree);
        onUpdated(cacheSubtree);
        onBeforeUnmount(() => {
          cache.forEach((cached) => {
            const { subTree, suspense } = instance;
            const vnode = getInnerChild(subTree);
            if (cached.type === vnode.type) {
              resetShapeFlag(vnode);
              const da = vnode.component.da;
              da && queuePostRenderEffect(da, suspense);
              return;
            }
            unmount(cached);
          });
        });
        return () => {
          pendingCacheKey = null;
          if (!slots.default) {
            return null;
          }
          const children = slots.default();
          const rawVNode = children[0];
          if (children.length > 1) {
            {
              warn(`KeepAlive should contain exactly one component child.`);
            }
            current = null;
            return children;
          } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
            current = null;
            return rawVNode;
          }
          let vnode = getInnerChild(rawVNode);
          const comp = vnode.type;
          const name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
          const { include, exclude, max } = props;
          if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
            current = vnode;
            return rawVNode;
          }
          const key = vnode.key == null ? comp : vnode.key;
          const cachedVNode = cache.get(key);
          if (vnode.el) {
            vnode = cloneVNode(vnode);
            if (rawVNode.shapeFlag & 128) {
              rawVNode.ssContent = vnode;
            }
          }
          pendingCacheKey = key;
          if (cachedVNode) {
            vnode.el = cachedVNode.el;
            vnode.component = cachedVNode.component;
            if (vnode.transition) {
              setTransitionHooks(vnode, vnode.transition);
            }
            vnode.shapeFlag |= 512;
            keys.delete(key);
            keys.add(key);
          } else {
            keys.add(key);
            if (max && keys.size > parseInt(max, 10)) {
              pruneCacheEntry(keys.values().next().value);
            }
          }
          vnode.shapeFlag |= 256;
          current = vnode;
          return isSuspense(rawVNode.type) ? rawVNode : vnode;
        };
      }
    };
    var KeepAlive = KeepAliveImpl;
    function matches(pattern, name) {
      if (shared.isArray(pattern)) {
        return pattern.some((p) => matches(p, name));
      } else if (shared.isString(pattern)) {
        return pattern.split(",").includes(name);
      } else if (pattern.test) {
        return pattern.test(name);
      }
      return false;
    }
    function onActivated(hook, target) {
      registerKeepAliveHook(hook, "a", target);
    }
    function onDeactivated(hook, target) {
      registerKeepAliveHook(hook, "da", target);
    }
    function registerKeepAliveHook(hook, type, target = currentInstance) {
      const wrappedHook = hook.__wdc || (hook.__wdc = () => {
        let current = target;
        while (current) {
          if (current.isDeactivated) {
            return;
          }
          current = current.parent;
        }
        return hook();
      });
      injectHook(type, wrappedHook, target);
      if (target) {
        let current = target.parent;
        while (current && current.parent) {
          if (isKeepAlive(current.parent.vnode)) {
            injectToKeepAliveRoot(wrappedHook, type, target, current);
          }
          current = current.parent;
        }
      }
    }
    function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
      const injected = injectHook(type, hook, keepAliveRoot, true);
      onUnmounted(() => {
        shared.remove(keepAliveRoot[type], injected);
      }, target);
    }
    function resetShapeFlag(vnode) {
      let shapeFlag = vnode.shapeFlag;
      if (shapeFlag & 256) {
        shapeFlag -= 256;
      }
      if (shapeFlag & 512) {
        shapeFlag -= 512;
      }
      vnode.shapeFlag = shapeFlag;
    }
    function getInnerChild(vnode) {
      return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
    }
    function injectHook(type, hook, target = currentInstance, prepend = false) {
      if (target) {
        const hooks = target[type] || (target[type] = []);
        const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
          if (target.isUnmounted) {
            return;
          }
          reactivity.pauseTracking();
          setCurrentInstance(target);
          const res = callWithAsyncErrorHandling(hook, target, type, args);
          unsetCurrentInstance();
          reactivity.resetTracking();
          return res;
        });
        if (prepend) {
          hooks.unshift(wrappedHook);
        } else {
          hooks.push(wrappedHook);
        }
        return wrappedHook;
      } else {
        const apiName = shared.toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
        warn(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
      }
    }
    var createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target);
    var onBeforeMount = createHook("bm");
    var onMounted = createHook("m");
    var onBeforeUpdate = createHook("bu");
    var onUpdated = createHook("u");
    var onBeforeUnmount = createHook("bum");
    var onUnmounted = createHook("um");
    var onServerPrefetch = createHook("sp");
    var onRenderTriggered = createHook("rtg");
    var onRenderTracked = createHook("rtc");
    function onErrorCaptured(hook, target = currentInstance) {
      injectHook("ec", hook, target);
    }
    function validateDirectiveName(name) {
      if (shared.isBuiltInDirective(name)) {
        warn("Do not use built-in directive ids as custom directive id: " + name);
      }
    }
    function withDirectives(vnode, directives) {
      const internalInstance = currentRenderingInstance;
      if (internalInstance === null) {
        warn(`withDirectives can only be used inside render functions.`);
        return vnode;
      }
      const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
      const bindings = vnode.dirs || (vnode.dirs = []);
      for (let i = 0; i < directives.length; i++) {
        let [dir, value, arg, modifiers = shared.EMPTY_OBJ] = directives[i];
        if (shared.isFunction(dir)) {
          dir = {
            mounted: dir,
            updated: dir
          };
        }
        if (dir.deep) {
          traverse(value);
        }
        bindings.push({
          dir,
          instance,
          value,
          oldValue: void 0,
          arg,
          modifiers
        });
      }
      return vnode;
    }
    function invokeDirectiveHook(vnode, prevVNode, instance, name) {
      const bindings = vnode.dirs;
      const oldBindings = prevVNode && prevVNode.dirs;
      for (let i = 0; i < bindings.length; i++) {
        const binding = bindings[i];
        if (oldBindings) {
          binding.oldValue = oldBindings[i].value;
        }
        let hook = binding.dir[name];
        if (hook) {
          reactivity.pauseTracking();
          callWithAsyncErrorHandling(hook, instance, 8, [
            vnode.el,
            binding,
            vnode,
            prevVNode
          ]);
          reactivity.resetTracking();
        }
      }
    }
    var COMPONENTS = "components";
    var DIRECTIVES = "directives";
    function resolveComponent(name, maybeSelfReference) {
      return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
    }
    var NULL_DYNAMIC_COMPONENT = Symbol();
    function resolveDynamicComponent(component) {
      if (shared.isString(component)) {
        return resolveAsset(COMPONENTS, component, false) || component;
      } else {
        return component || NULL_DYNAMIC_COMPONENT;
      }
    }
    function resolveDirective(name) {
      return resolveAsset(DIRECTIVES, name);
    }
    function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
      const instance = currentRenderingInstance || currentInstance;
      if (instance) {
        const Component = instance.type;
        if (type === COMPONENTS) {
          const selfName = getComponentName(Component, false);
          if (selfName && (selfName === name || selfName === shared.camelize(name) || selfName === shared.capitalize(shared.camelize(name)))) {
            return Component;
          }
        }
        const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
        if (!res && maybeSelfReference) {
          return Component;
        }
        if (warnMissing && !res) {
          const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
          warn(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
        }
        return res;
      } else {
        warn(`resolve${shared.capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
      }
    }
    function resolve(registry, name) {
      return registry && (registry[name] || registry[shared.camelize(name)] || registry[shared.capitalize(shared.camelize(name))]);
    }
    function renderList(source, renderItem, cache, index) {
      let ret;
      const cached = cache && cache[index];
      if (shared.isArray(source) || shared.isString(source)) {
        ret = new Array(source.length);
        for (let i = 0, l = source.length; i < l; i++) {
          ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
        }
      } else if (typeof source === "number") {
        if (!Number.isInteger(source)) {
          warn(`The v-for range expect an integer value but got ${source}.`);
        }
        ret = new Array(source);
        for (let i = 0; i < source; i++) {
          ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
        }
      } else if (shared.isObject(source)) {
        if (source[Symbol.iterator]) {
          ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
        } else {
          const keys = Object.keys(source);
          ret = new Array(keys.length);
          for (let i = 0, l = keys.length; i < l; i++) {
            const key = keys[i];
            ret[i] = renderItem(source[key], key, i, cached && cached[i]);
          }
        }
      } else {
        ret = [];
      }
      if (cache) {
        cache[index] = ret;
      }
      return ret;
    }
    function createSlots(slots, dynamicSlots) {
      for (let i = 0; i < dynamicSlots.length; i++) {
        const slot = dynamicSlots[i];
        if (shared.isArray(slot)) {
          for (let j = 0; j < slot.length; j++) {
            slots[slot[j].name] = slot[j].fn;
          }
        } else if (slot) {
          slots[slot.name] = slot.key ? (...args) => {
            const res = slot.fn(...args);
            if (res)
              res.key = slot.key;
            return res;
          } : slot.fn;
        }
      }
      return slots;
    }
    function renderSlot(slots, name, props = {}, fallback, noSlotted) {
      if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
        return createVNode("slot", name === "default" ? null : { name }, fallback && fallback());
      }
      let slot = slots[name];
      if (slot && slot.length > 1) {
        warn(`SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.`);
        slot = () => [];
      }
      if (slot && slot._c) {
        slot._d = false;
      }
      openBlock();
      const validSlotContent = slot && ensureValidVNode(slot(props));
      const rendered = createBlock(Fragment, {
        key: props.key || validSlotContent && validSlotContent.key || `_${name}`
      }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
      if (!noSlotted && rendered.scopeId) {
        rendered.slotScopeIds = [rendered.scopeId + "-s"];
      }
      if (slot && slot._c) {
        slot._d = true;
      }
      return rendered;
    }
    function ensureValidVNode(vnodes) {
      return vnodes.some((child) => {
        if (!isVNode(child))
          return true;
        if (child.type === Comment)
          return false;
        if (child.type === Fragment && !ensureValidVNode(child.children))
          return false;
        return true;
      }) ? vnodes : null;
    }
    function toHandlers(obj, preserveCaseIfNecessary) {
      const ret = {};
      if (!shared.isObject(obj)) {
        warn(`v-on with no argument expects an object value.`);
        return ret;
      }
      for (const key in obj) {
        ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : shared.toHandlerKey(key)] = obj[key];
      }
      return ret;
    }
    var getPublicInstance = (i) => {
      if (!i)
        return null;
      if (isStatefulComponent(i))
        return getExposeProxy(i) || i.proxy;
      return getPublicInstance(i.parent);
    };
    var publicPropertiesMap = /* @__PURE__ */ shared.extend(Object.create(null), {
      $: (i) => i,
      $el: (i) => i.vnode.el,
      $data: (i) => i.data,
      $props: (i) => reactivity.shallowReadonly(i.props),
      $attrs: (i) => reactivity.shallowReadonly(i.attrs),
      $slots: (i) => reactivity.shallowReadonly(i.slots),
      $refs: (i) => reactivity.shallowReadonly(i.refs),
      $parent: (i) => getPublicInstance(i.parent),
      $root: (i) => getPublicInstance(i.root),
      $emit: (i) => i.emit,
      $options: (i) => resolveMergedOptions(i),
      $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
      $nextTick: (i) => i.n || (i.n = nextTick2.bind(i.proxy)),
      $watch: (i) => instanceWatch.bind(i)
    });
    var isReservedPrefix = (key) => key === "_" || key === "$";
    var PublicInstanceProxyHandlers = {
      get({ _: instance }, key) {
        const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
        if (key === "__isVue") {
          return true;
        }
        if (setupState !== shared.EMPTY_OBJ && setupState.__isScriptSetup && shared.hasOwn(setupState, key)) {
          return setupState[key];
        }
        let normalizedProps;
        if (key[0] !== "$") {
          const n = accessCache[key];
          if (n !== void 0) {
            switch (n) {
              case 1:
                return setupState[key];
              case 2:
                return data[key];
              case 4:
                return ctx[key];
              case 3:
                return props[key];
            }
          } else if (setupState !== shared.EMPTY_OBJ && shared.hasOwn(setupState, key)) {
            accessCache[key] = 1;
            return setupState[key];
          } else if (data !== shared.EMPTY_OBJ && shared.hasOwn(data, key)) {
            accessCache[key] = 2;
            return data[key];
          } else if ((normalizedProps = instance.propsOptions[0]) && shared.hasOwn(normalizedProps, key)) {
            accessCache[key] = 3;
            return props[key];
          } else if (ctx !== shared.EMPTY_OBJ && shared.hasOwn(ctx, key)) {
            accessCache[key] = 4;
            return ctx[key];
          } else if (shouldCacheAccess) {
            accessCache[key] = 0;
          }
        }
        const publicGetter = publicPropertiesMap[key];
        let cssModule, globalProperties;
        if (publicGetter) {
          if (key === "$attrs") {
            reactivity.track(instance, "get", key);
            markAttrsAccessed();
          }
          return publicGetter(instance);
        } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
          return cssModule;
        } else if (ctx !== shared.EMPTY_OBJ && shared.hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (globalProperties = appContext.config.globalProperties, shared.hasOwn(globalProperties, key)) {
          {
            return globalProperties[key];
          }
        } else if (currentRenderingInstance && (!shared.isString(key) || key.indexOf("__v") !== 0)) {
          if (data !== shared.EMPTY_OBJ && isReservedPrefix(key[0]) && shared.hasOwn(data, key)) {
            warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
          } else if (instance === currentRenderingInstance) {
            warn(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
          }
        }
      },
      set({ _: instance }, key, value) {
        const { data, setupState, ctx } = instance;
        if (setupState !== shared.EMPTY_OBJ && shared.hasOwn(setupState, key)) {
          setupState[key] = value;
          return true;
        } else if (data !== shared.EMPTY_OBJ && shared.hasOwn(data, key)) {
          data[key] = value;
          return true;
        } else if (shared.hasOwn(instance.props, key)) {
          warn(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
          return false;
        }
        if (key[0] === "$" && key.slice(1) in instance) {
          warn(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`, instance);
          return false;
        } else {
          if (key in instance.appContext.config.globalProperties) {
            Object.defineProperty(ctx, key, {
              enumerable: true,
              configurable: true,
              value
            });
          } else {
            ctx[key] = value;
          }
        }
        return true;
      },
      has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
        let normalizedProps;
        return !!accessCache[key] || data !== shared.EMPTY_OBJ && shared.hasOwn(data, key) || setupState !== shared.EMPTY_OBJ && shared.hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && shared.hasOwn(normalizedProps, key) || shared.hasOwn(ctx, key) || shared.hasOwn(publicPropertiesMap, key) || shared.hasOwn(appContext.config.globalProperties, key);
      },
      defineProperty(target, key, descriptor) {
        if (descriptor.get != null) {
          target._.accessCache[key] = 0;
        } else if (shared.hasOwn(descriptor, "value")) {
          this.set(target, key, descriptor.value, null);
        }
        return Reflect.defineProperty(target, key, descriptor);
      }
    };
    {
      PublicInstanceProxyHandlers.ownKeys = (target) => {
        warn(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
        return Reflect.ownKeys(target);
      };
    }
    var RuntimeCompiledPublicInstanceProxyHandlers = /* @__PURE__ */ shared.extend({}, PublicInstanceProxyHandlers, {
      get(target, key) {
        if (key === Symbol.unscopables) {
          return;
        }
        return PublicInstanceProxyHandlers.get(target, key, target);
      },
      has(_, key) {
        const has = key[0] !== "_" && !shared.isGloballyWhitelisted(key);
        if (!has && PublicInstanceProxyHandlers.has(_, key)) {
          warn(`Property ${JSON.stringify(key)} should not start with _ which is a reserved prefix for Vue internals.`);
        }
        return has;
      }
    });
    function createDevRenderContext(instance) {
      const target = {};
      Object.defineProperty(target, `_`, {
        configurable: true,
        enumerable: false,
        get: () => instance
      });
      Object.keys(publicPropertiesMap).forEach((key) => {
        Object.defineProperty(target, key, {
          configurable: true,
          enumerable: false,
          get: () => publicPropertiesMap[key](instance),
          set: shared.NOOP
        });
      });
      return target;
    }
    function exposePropsOnRenderContext(instance) {
      const { ctx, propsOptions: [propsOptions] } = instance;
      if (propsOptions) {
        Object.keys(propsOptions).forEach((key) => {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: () => instance.props[key],
            set: shared.NOOP
          });
        });
      }
    }
    function exposeSetupStateOnRenderContext(instance) {
      const { ctx, setupState } = instance;
      Object.keys(reactivity.toRaw(setupState)).forEach((key) => {
        if (!setupState.__isScriptSetup) {
          if (isReservedPrefix(key[0])) {
            warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
            return;
          }
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: () => setupState[key],
            set: shared.NOOP
          });
        }
      });
    }
    function createDuplicateChecker() {
      const cache = Object.create(null);
      return (type, key) => {
        if (cache[key]) {
          warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
        } else {
          cache[key] = type;
        }
      };
    }
    var shouldCacheAccess = true;
    function applyOptions(instance) {
      const options = resolveMergedOptions(instance);
      const publicThis = instance.proxy;
      const ctx = instance.ctx;
      shouldCacheAccess = false;
      if (options.beforeCreate) {
        callHook(options.beforeCreate, instance, "bc");
      }
      const {
        data: dataOptions,
        computed: computedOptions,
        methods,
        watch: watchOptions,
        provide: provideOptions,
        inject: injectOptions,
        created,
        beforeMount,
        mounted,
        beforeUpdate,
        updated,
        activated,
        deactivated,
        beforeDestroy,
        beforeUnmount,
        destroyed,
        unmounted,
        render,
        renderTracked,
        renderTriggered,
        errorCaptured,
        serverPrefetch,
        expose,
        inheritAttrs,
        components,
        directives,
        filters
      } = options;
      const checkDuplicateProperties = createDuplicateChecker();
      {
        const [propsOptions] = instance.propsOptions;
        if (propsOptions) {
          for (const key in propsOptions) {
            checkDuplicateProperties("Props", key);
          }
        }
      }
      if (injectOptions) {
        resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
      }
      if (methods) {
        for (const key in methods) {
          const methodHandler = methods[key];
          if (shared.isFunction(methodHandler)) {
            {
              Object.defineProperty(ctx, key, {
                value: methodHandler.bind(publicThis),
                configurable: true,
                enumerable: true,
                writable: true
              });
            }
            {
              checkDuplicateProperties("Methods", key);
            }
          } else {
            warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
          }
        }
      }
      if (dataOptions) {
        if (!shared.isFunction(dataOptions)) {
          warn(`The data option must be a function. Plain object usage is no longer supported.`);
        }
        const data = dataOptions.call(publicThis, publicThis);
        if (shared.isPromise(data)) {
          warn(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
        }
        if (!shared.isObject(data)) {
          warn(`data() should return an object.`);
        } else {
          instance.data = reactivity.reactive(data);
          {
            for (const key in data) {
              checkDuplicateProperties("Data", key);
              if (!isReservedPrefix(key[0])) {
                Object.defineProperty(ctx, key, {
                  configurable: true,
                  enumerable: true,
                  get: () => data[key],
                  set: shared.NOOP
                });
              }
            }
          }
        }
      }
      shouldCacheAccess = true;
      if (computedOptions) {
        for (const key in computedOptions) {
          const opt = computedOptions[key];
          const get = shared.isFunction(opt) ? opt.bind(publicThis, publicThis) : shared.isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : shared.NOOP;
          if (get === shared.NOOP) {
            warn(`Computed property "${key}" has no getter.`);
          }
          const set = !shared.isFunction(opt) && shared.isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
            warn(`Write operation failed: computed property "${key}" is readonly.`);
          };
          const c = computed({
            get,
            set
          });
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: () => c.value,
            set: (v) => c.value = v
          });
          {
            checkDuplicateProperties("Computed", key);
          }
        }
      }
      if (watchOptions) {
        for (const key in watchOptions) {
          createWatcher(watchOptions[key], ctx, publicThis, key);
        }
      }
      if (provideOptions) {
        const provides = shared.isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
        Reflect.ownKeys(provides).forEach((key) => {
          provide(key, provides[key]);
        });
      }
      if (created) {
        callHook(created, instance, "c");
      }
      function registerLifecycleHook(register, hook) {
        if (shared.isArray(hook)) {
          hook.forEach((_hook) => register(_hook.bind(publicThis)));
        } else if (hook) {
          register(hook.bind(publicThis));
        }
      }
      registerLifecycleHook(onBeforeMount, beforeMount);
      registerLifecycleHook(onMounted, mounted);
      registerLifecycleHook(onBeforeUpdate, beforeUpdate);
      registerLifecycleHook(onUpdated, updated);
      registerLifecycleHook(onActivated, activated);
      registerLifecycleHook(onDeactivated, deactivated);
      registerLifecycleHook(onErrorCaptured, errorCaptured);
      registerLifecycleHook(onRenderTracked, renderTracked);
      registerLifecycleHook(onRenderTriggered, renderTriggered);
      registerLifecycleHook(onBeforeUnmount, beforeUnmount);
      registerLifecycleHook(onUnmounted, unmounted);
      registerLifecycleHook(onServerPrefetch, serverPrefetch);
      if (shared.isArray(expose)) {
        if (expose.length) {
          const exposed = instance.exposed || (instance.exposed = {});
          expose.forEach((key) => {
            Object.defineProperty(exposed, key, {
              get: () => publicThis[key],
              set: (val) => publicThis[key] = val
            });
          });
        } else if (!instance.exposed) {
          instance.exposed = {};
        }
      }
      if (render && instance.render === shared.NOOP) {
        instance.render = render;
      }
      if (inheritAttrs != null) {
        instance.inheritAttrs = inheritAttrs;
      }
      if (components)
        instance.components = components;
      if (directives)
        instance.directives = directives;
    }
    function resolveInjections(injectOptions, ctx, checkDuplicateProperties = shared.NOOP, unwrapRef = false) {
      if (shared.isArray(injectOptions)) {
        injectOptions = normalizeInject(injectOptions);
      }
      for (const key in injectOptions) {
        const opt = injectOptions[key];
        let injected;
        if (shared.isObject(opt)) {
          if ("default" in opt) {
            injected = inject(opt.from || key, opt.default, true);
          } else {
            injected = inject(opt.from || key);
          }
        } else {
          injected = inject(opt);
        }
        if (reactivity.isRef(injected)) {
          if (unwrapRef) {
            Object.defineProperty(ctx, key, {
              enumerable: true,
              configurable: true,
              get: () => injected.value,
              set: (v) => injected.value = v
            });
          } else {
            {
              warn(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
            }
            ctx[key] = injected;
          }
        } else {
          ctx[key] = injected;
        }
        {
          checkDuplicateProperties("Inject", key);
        }
      }
    }
    function callHook(hook, instance, type) {
      callWithAsyncErrorHandling(shared.isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
    }
    function createWatcher(raw, ctx, publicThis, key) {
      const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
      if (shared.isString(raw)) {
        const handler = ctx[raw];
        if (shared.isFunction(handler)) {
          watch(getter, handler);
        } else {
          warn(`Invalid watch handler specified by key "${raw}"`, handler);
        }
      } else if (shared.isFunction(raw)) {
        watch(getter, raw.bind(publicThis));
      } else if (shared.isObject(raw)) {
        if (shared.isArray(raw)) {
          raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
        } else {
          const handler = shared.isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
          if (shared.isFunction(handler)) {
            watch(getter, handler, raw);
          } else {
            warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
          }
        }
      } else {
        warn(`Invalid watch option: "${key}"`, raw);
      }
    }
    function resolveMergedOptions(instance) {
      const base = instance.type;
      const { mixins, extends: extendsOptions } = base;
      const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
      const cached = cache.get(base);
      let resolved;
      if (cached) {
        resolved = cached;
      } else if (!globalMixins.length && !mixins && !extendsOptions) {
        {
          resolved = base;
        }
      } else {
        resolved = {};
        if (globalMixins.length) {
          globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
        }
        mergeOptions(resolved, base, optionMergeStrategies);
      }
      if (shared.isObject(base)) {
        cache.set(base, resolved);
      }
      return resolved;
    }
    function mergeOptions(to, from, strats, asMixin = false) {
      const { mixins, extends: extendsOptions } = from;
      if (extendsOptions) {
        mergeOptions(to, extendsOptions, strats, true);
      }
      if (mixins) {
        mixins.forEach((m) => mergeOptions(to, m, strats, true));
      }
      for (const key in from) {
        if (asMixin && key === "expose") {
          warn(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
        } else {
          const strat = internalOptionMergeStrats[key] || strats && strats[key];
          to[key] = strat ? strat(to[key], from[key]) : from[key];
        }
      }
      return to;
    }
    var internalOptionMergeStrats = {
      data: mergeDataFn,
      props: mergeObjectOptions,
      emits: mergeObjectOptions,
      methods: mergeObjectOptions,
      computed: mergeObjectOptions,
      beforeCreate: mergeAsArray,
      created: mergeAsArray,
      beforeMount: mergeAsArray,
      mounted: mergeAsArray,
      beforeUpdate: mergeAsArray,
      updated: mergeAsArray,
      beforeDestroy: mergeAsArray,
      beforeUnmount: mergeAsArray,
      destroyed: mergeAsArray,
      unmounted: mergeAsArray,
      activated: mergeAsArray,
      deactivated: mergeAsArray,
      errorCaptured: mergeAsArray,
      serverPrefetch: mergeAsArray,
      components: mergeObjectOptions,
      directives: mergeObjectOptions,
      watch: mergeWatchOptions,
      provide: mergeDataFn,
      inject: mergeInject
    };
    function mergeDataFn(to, from) {
      if (!from) {
        return to;
      }
      if (!to) {
        return from;
      }
      return function mergedDataFn() {
        return shared.extend(shared.isFunction(to) ? to.call(this, this) : to, shared.isFunction(from) ? from.call(this, this) : from);
      };
    }
    function mergeInject(to, from) {
      return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
    }
    function normalizeInject(raw) {
      if (shared.isArray(raw)) {
        const res = {};
        for (let i = 0; i < raw.length; i++) {
          res[raw[i]] = raw[i];
        }
        return res;
      }
      return raw;
    }
    function mergeAsArray(to, from) {
      return to ? [...new Set([].concat(to, from))] : from;
    }
    function mergeObjectOptions(to, from) {
      return to ? shared.extend(shared.extend(Object.create(null), to), from) : from;
    }
    function mergeWatchOptions(to, from) {
      if (!to)
        return from;
      if (!from)
        return to;
      const merged = shared.extend(Object.create(null), to);
      for (const key in from) {
        merged[key] = mergeAsArray(to[key], from[key]);
      }
      return merged;
    }
    function initProps(instance, rawProps, isStateful, isSSR = false) {
      const props = {};
      const attrs = {};
      shared.def(attrs, InternalObjectKey, 1);
      instance.propsDefaults = Object.create(null);
      setFullProps(instance, rawProps, props, attrs);
      for (const key in instance.propsOptions[0]) {
        if (!(key in props)) {
          props[key] = void 0;
        }
      }
      {
        validateProps(rawProps || {}, props, instance);
      }
      if (isStateful) {
        instance.props = isSSR ? props : reactivity.shallowReactive(props);
      } else {
        if (!instance.type.props) {
          instance.props = attrs;
        } else {
          instance.props = props;
        }
      }
      instance.attrs = attrs;
    }
    function isInHmrContext(instance) {
      while (instance) {
        if (instance.type.__hmrId)
          return true;
        instance = instance.parent;
      }
    }
    function updateProps(instance, rawProps, rawPrevProps, optimized) {
      const { props, attrs, vnode: { patchFlag } } = instance;
      const rawCurrentProps = reactivity.toRaw(props);
      const [options] = instance.propsOptions;
      let hasAttrsChanged = false;
      if (!isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
        if (patchFlag & 8) {
          const propsToUpdate = instance.vnode.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            let key = propsToUpdate[i];
            if (isEmitListener(instance.emitsOptions, key)) {
              continue;
            }
            const value = rawProps[key];
            if (options) {
              if (shared.hasOwn(attrs, key)) {
                if (value !== attrs[key]) {
                  attrs[key] = value;
                  hasAttrsChanged = true;
                }
              } else {
                const camelizedKey = shared.camelize(key);
                props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
              }
            } else {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            }
          }
        }
      } else {
        if (setFullProps(instance, rawProps, props, attrs)) {
          hasAttrsChanged = true;
        }
        let kebabKey;
        for (const key in rawCurrentProps) {
          if (!rawProps || !shared.hasOwn(rawProps, key) && ((kebabKey = shared.hyphenate(key)) === key || !shared.hasOwn(rawProps, kebabKey))) {
            if (options) {
              if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
                props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
              }
            } else {
              delete props[key];
            }
          }
        }
        if (attrs !== rawCurrentProps) {
          for (const key in attrs) {
            if (!rawProps || !shared.hasOwn(rawProps, key) && true) {
              delete attrs[key];
              hasAttrsChanged = true;
            }
          }
        }
      }
      if (hasAttrsChanged) {
        reactivity.trigger(instance, "set", "$attrs");
      }
      {
        validateProps(rawProps || {}, props, instance);
      }
    }
    function setFullProps(instance, rawProps, props, attrs) {
      const [options, needCastKeys] = instance.propsOptions;
      let hasAttrsChanged = false;
      let rawCastValues;
      if (rawProps) {
        for (let key in rawProps) {
          if (shared.isReservedProp(key)) {
            continue;
          }
          const value = rawProps[key];
          let camelKey;
          if (options && shared.hasOwn(options, camelKey = shared.camelize(key))) {
            if (!needCastKeys || !needCastKeys.includes(camelKey)) {
              props[camelKey] = value;
            } else {
              (rawCastValues || (rawCastValues = {}))[camelKey] = value;
            }
          } else if (!isEmitListener(instance.emitsOptions, key)) {
            if (!(key in attrs) || value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
      if (needCastKeys) {
        const rawCurrentProps = reactivity.toRaw(props);
        const castValues = rawCastValues || shared.EMPTY_OBJ;
        for (let i = 0; i < needCastKeys.length; i++) {
          const key = needCastKeys[i];
          props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !shared.hasOwn(castValues, key));
        }
      }
      return hasAttrsChanged;
    }
    function resolvePropValue(options, props, key, value, instance, isAbsent) {
      const opt = options[key];
      if (opt != null) {
        const hasDefault = shared.hasOwn(opt, "default");
        if (hasDefault && value === void 0) {
          const defaultValue = opt.default;
          if (opt.type !== Function && shared.isFunction(defaultValue)) {
            const { propsDefaults } = instance;
            if (key in propsDefaults) {
              value = propsDefaults[key];
            } else {
              setCurrentInstance(instance);
              value = propsDefaults[key] = defaultValue.call(null, props);
              unsetCurrentInstance();
            }
          } else {
            value = defaultValue;
          }
        }
        if (opt[0]) {
          if (isAbsent && !hasDefault) {
            value = false;
          } else if (opt[1] && (value === "" || value === shared.hyphenate(key))) {
            value = true;
          }
        }
      }
      return value;
    }
    function normalizePropsOptions(comp, appContext, asMixin = false) {
      const cache = appContext.propsCache;
      const cached = cache.get(comp);
      if (cached) {
        return cached;
      }
      const raw = comp.props;
      const normalized = {};
      const needCastKeys = [];
      let hasExtends = false;
      if (!shared.isFunction(comp)) {
        const extendProps = (raw2) => {
          hasExtends = true;
          const [props, keys] = normalizePropsOptions(raw2, appContext, true);
          shared.extend(normalized, props);
          if (keys)
            needCastKeys.push(...keys);
        };
        if (!asMixin && appContext.mixins.length) {
          appContext.mixins.forEach(extendProps);
        }
        if (comp.extends) {
          extendProps(comp.extends);
        }
        if (comp.mixins) {
          comp.mixins.forEach(extendProps);
        }
      }
      if (!raw && !hasExtends) {
        if (shared.isObject(comp)) {
          cache.set(comp, shared.EMPTY_ARR);
        }
        return shared.EMPTY_ARR;
      }
      if (shared.isArray(raw)) {
        for (let i = 0; i < raw.length; i++) {
          if (!shared.isString(raw[i])) {
            warn(`props must be strings when using array syntax.`, raw[i]);
          }
          const normalizedKey = shared.camelize(raw[i]);
          if (validatePropName(normalizedKey)) {
            normalized[normalizedKey] = shared.EMPTY_OBJ;
          }
        }
      } else if (raw) {
        if (!shared.isObject(raw)) {
          warn(`invalid props options`, raw);
        }
        for (const key in raw) {
          const normalizedKey = shared.camelize(key);
          if (validatePropName(normalizedKey)) {
            const opt = raw[key];
            const prop = normalized[normalizedKey] = shared.isArray(opt) || shared.isFunction(opt) ? { type: opt } : opt;
            if (prop) {
              const booleanIndex = getTypeIndex(Boolean, prop.type);
              const stringIndex = getTypeIndex(String, prop.type);
              prop[0] = booleanIndex > -1;
              prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
              if (booleanIndex > -1 || shared.hasOwn(prop, "default")) {
                needCastKeys.push(normalizedKey);
              }
            }
          }
        }
      }
      const res = [normalized, needCastKeys];
      if (shared.isObject(comp)) {
        cache.set(comp, res);
      }
      return res;
    }
    function validatePropName(key) {
      if (key[0] !== "$") {
        return true;
      } else {
        warn(`Invalid prop name: "${key}" is a reserved property.`);
      }
      return false;
    }
    function getType(ctor) {
      const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
      return match ? match[1] : ctor === null ? "null" : "";
    }
    function isSameType(a, b) {
      return getType(a) === getType(b);
    }
    function getTypeIndex(type, expectedTypes) {
      if (shared.isArray(expectedTypes)) {
        return expectedTypes.findIndex((t) => isSameType(t, type));
      } else if (shared.isFunction(expectedTypes)) {
        return isSameType(expectedTypes, type) ? 0 : -1;
      }
      return -1;
    }
    function validateProps(rawProps, props, instance) {
      const resolvedValues = reactivity.toRaw(props);
      const options = instance.propsOptions[0];
      for (const key in options) {
        let opt = options[key];
        if (opt == null)
          continue;
        validateProp(key, resolvedValues[key], opt, !shared.hasOwn(rawProps, key) && !shared.hasOwn(rawProps, shared.hyphenate(key)));
      }
    }
    function validateProp(name, value, prop, isAbsent) {
      const { type, required, validator } = prop;
      if (required && isAbsent) {
        warn('Missing required prop: "' + name + '"');
        return;
      }
      if (value == null && !prop.required) {
        return;
      }
      if (type != null && type !== true) {
        let isValid = false;
        const types = shared.isArray(type) ? type : [type];
        const expectedTypes = [];
        for (let i = 0; i < types.length && !isValid; i++) {
          const { valid, expectedType } = assertType(value, types[i]);
          expectedTypes.push(expectedType || "");
          isValid = valid;
        }
        if (!isValid) {
          warn(getInvalidTypeMessage(name, value, expectedTypes));
          return;
        }
      }
      if (validator && !validator(value)) {
        warn('Invalid prop: custom validator check failed for prop "' + name + '".');
      }
    }
    var isSimpleType = /* @__PURE__ */ shared.makeMap("String,Number,Boolean,Function,Symbol,BigInt");
    function assertType(value, type) {
      let valid;
      const expectedType = getType(type);
      if (isSimpleType(expectedType)) {
        const t = typeof value;
        valid = t === expectedType.toLowerCase();
        if (!valid && t === "object") {
          valid = value instanceof type;
        }
      } else if (expectedType === "Object") {
        valid = shared.isObject(value);
      } else if (expectedType === "Array") {
        valid = shared.isArray(value);
      } else if (expectedType === "null") {
        valid = value === null;
      } else {
        valid = value instanceof type;
      }
      return {
        valid,
        expectedType
      };
    }
    function getInvalidTypeMessage(name, value, expectedTypes) {
      let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(shared.capitalize).join(" | ")}`;
      const expectedType = expectedTypes[0];
      const receivedType = shared.toRawType(value);
      const expectedValue = styleValue(value, expectedType);
      const receivedValue = styleValue(value, receivedType);
      if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
        message += ` with value ${expectedValue}`;
      }
      message += `, got ${receivedType} `;
      if (isExplicable(receivedType)) {
        message += `with value ${receivedValue}.`;
      }
      return message;
    }
    function styleValue(value, type) {
      if (type === "String") {
        return `"${value}"`;
      } else if (type === "Number") {
        return `${Number(value)}`;
      } else {
        return `${value}`;
      }
    }
    function isExplicable(type) {
      const explicitTypes = ["string", "number", "boolean"];
      return explicitTypes.some((elem) => type.toLowerCase() === elem);
    }
    function isBoolean(...args) {
      return args.some((elem) => elem.toLowerCase() === "boolean");
    }
    var isInternalKey = (key) => key[0] === "_" || key === "$stable";
    var normalizeSlotValue = (value) => shared.isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
    var normalizeSlot = (key, rawSlot, ctx) => {
      if (rawSlot._n) {
        return rawSlot;
      }
      const normalized = withCtx((...args) => {
        if (currentInstance) {
          warn(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
        }
        return normalizeSlotValue(rawSlot(...args));
      }, ctx);
      normalized._c = false;
      return normalized;
    };
    var normalizeObjectSlots = (rawSlots, slots, instance) => {
      const ctx = rawSlots._ctx;
      for (const key in rawSlots) {
        if (isInternalKey(key))
          continue;
        const value = rawSlots[key];
        if (shared.isFunction(value)) {
          slots[key] = normalizeSlot(key, value, ctx);
        } else if (value != null) {
          {
            warn(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
          }
          const normalized = normalizeSlotValue(value);
          slots[key] = () => normalized;
        }
      }
    };
    var normalizeVNodeSlots = (instance, children) => {
      if (!isKeepAlive(instance.vnode) && true) {
        warn(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
      }
      const normalized = normalizeSlotValue(children);
      instance.slots.default = () => normalized;
    };
    var initSlots = (instance, children) => {
      if (instance.vnode.shapeFlag & 32) {
        const type = children._;
        if (type) {
          instance.slots = reactivity.toRaw(children);
          shared.def(children, "_", type);
        } else {
          normalizeObjectSlots(children, instance.slots = {});
        }
      } else {
        instance.slots = {};
        if (children) {
          normalizeVNodeSlots(instance, children);
        }
      }
      shared.def(instance.slots, InternalObjectKey, 1);
    };
    var updateSlots = (instance, children, optimized) => {
      const { vnode, slots } = instance;
      let needDeletionCheck = true;
      let deletionComparisonTarget = shared.EMPTY_OBJ;
      if (vnode.shapeFlag & 32) {
        const type = children._;
        if (type) {
          if (isHmrUpdating) {
            shared.extend(slots, children);
          } else if (optimized && type === 1) {
            needDeletionCheck = false;
          } else {
            shared.extend(slots, children);
            if (!optimized && type === 1) {
              delete slots._;
            }
          }
        } else {
          needDeletionCheck = !children.$stable;
          normalizeObjectSlots(children, slots);
        }
        deletionComparisonTarget = children;
      } else if (children) {
        normalizeVNodeSlots(instance, children);
        deletionComparisonTarget = { default: 1 };
      }
      if (needDeletionCheck) {
        for (const key in slots) {
          if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
            delete slots[key];
          }
        }
      }
    };
    function createAppContext() {
      return {
        app: null,
        config: {
          isNativeTag: shared.NO,
          performance: false,
          globalProperties: {},
          optionMergeStrategies: {},
          errorHandler: void 0,
          warnHandler: void 0,
          compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap()
      };
    }
    var uid = 0;
    function createAppAPI(render, hydrate) {
      return function createApp(rootComponent, rootProps = null) {
        if (!shared.isFunction(rootComponent)) {
          rootComponent = { ...rootComponent };
        }
        if (rootProps != null && !shared.isObject(rootProps)) {
          warn(`root props passed to app.mount() must be an object.`);
          rootProps = null;
        }
        const context = createAppContext();
        const installedPlugins = new Set();
        let isMounted = false;
        const app = context.app = {
          _uid: uid++,
          _component: rootComponent,
          _props: rootProps,
          _container: null,
          _context: context,
          _instance: null,
          version,
          get config() {
            return context.config;
          },
          set config(v) {
            {
              warn(`app.config cannot be replaced. Modify individual options instead.`);
            }
          },
          use(plugin, ...options) {
            if (installedPlugins.has(plugin)) {
              warn(`Plugin has already been applied to target app.`);
            } else if (plugin && shared.isFunction(plugin.install)) {
              installedPlugins.add(plugin);
              plugin.install(app, ...options);
            } else if (shared.isFunction(plugin)) {
              installedPlugins.add(plugin);
              plugin(app, ...options);
            } else {
              warn(`A plugin must either be a function or an object with an "install" function.`);
            }
            return app;
          },
          mixin(mixin) {
            {
              if (!context.mixins.includes(mixin)) {
                context.mixins.push(mixin);
              } else {
                warn("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
              }
            }
            return app;
          },
          component(name, component) {
            {
              validateComponentName(name, context.config);
            }
            if (!component) {
              return context.components[name];
            }
            if (context.components[name]) {
              warn(`Component "${name}" has already been registered in target app.`);
            }
            context.components[name] = component;
            return app;
          },
          directive(name, directive) {
            {
              validateDirectiveName(name);
            }
            if (!directive) {
              return context.directives[name];
            }
            if (context.directives[name]) {
              warn(`Directive "${name}" has already been registered in target app.`);
            }
            context.directives[name] = directive;
            return app;
          },
          mount(rootContainer, isHydrate, isSVG) {
            if (!isMounted) {
              if (rootContainer.__vue_app__) {
                warn(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
              }
              const vnode = createVNode(rootComponent, rootProps);
              vnode.appContext = context;
              {
                context.reload = () => {
                  render(cloneVNode(vnode), rootContainer, isSVG);
                };
              }
              if (isHydrate && hydrate) {
                hydrate(vnode, rootContainer);
              } else {
                render(vnode, rootContainer, isSVG);
              }
              isMounted = true;
              app._container = rootContainer;
              rootContainer.__vue_app__ = app;
              {
                app._instance = vnode.component;
                devtoolsInitApp(app, version);
              }
              return getExposeProxy(vnode.component) || vnode.component.proxy;
            } else {
              warn(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
            }
          },
          unmount() {
            if (isMounted) {
              render(null, app._container);
              {
                app._instance = null;
                devtoolsUnmountApp(app);
              }
              delete app._container.__vue_app__;
            } else {
              warn(`Cannot unmount an app that is not mounted.`);
            }
          },
          provide(key, value) {
            if (key in context.provides) {
              warn(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
            }
            context.provides[key] = value;
            return app;
          }
        };
        return app;
      };
    }
    function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
      if (shared.isArray(rawRef)) {
        rawRef.forEach((r, i) => setRef(r, oldRawRef && (shared.isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
        return;
      }
      if (isAsyncWrapper(vnode) && !isUnmount) {
        return;
      }
      const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
      const value = isUnmount ? null : refValue;
      const { i: owner, r: ref } = rawRef;
      if (!owner) {
        warn(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
        return;
      }
      const oldRef = oldRawRef && oldRawRef.r;
      const refs2 = owner.refs === shared.EMPTY_OBJ ? owner.refs = {} : owner.refs;
      const setupState = owner.setupState;
      if (oldRef != null && oldRef !== ref) {
        if (shared.isString(oldRef)) {
          refs2[oldRef] = null;
          if (shared.hasOwn(setupState, oldRef)) {
            setupState[oldRef] = null;
          }
        } else if (reactivity.isRef(oldRef)) {
          oldRef.value = null;
        }
      }
      if (shared.isFunction(ref)) {
        callWithErrorHandling(ref, owner, 12, [value, refs2]);
      } else {
        const _isString = shared.isString(ref);
        const _isRef = reactivity.isRef(ref);
        if (_isString || _isRef) {
          const doSet = () => {
            if (rawRef.f) {
              const existing = _isString ? shared.hasOwn(setupState, ref) ? setupState[ref] : refs2[ref] : ref.value;
              if (isUnmount) {
                shared.isArray(existing) && shared.remove(existing, refValue);
              } else {
                if (!shared.isArray(existing)) {
                  if (_isString) {
                    refs2[ref] = [refValue];
                    if (shared.hasOwn(setupState, ref)) {
                      setupState[ref] = refs2[ref];
                    }
                  } else {
                    ref.value = [refValue];
                    if (rawRef.k)
                      refs2[rawRef.k] = ref.value;
                  }
                } else if (!existing.includes(refValue)) {
                  existing.push(refValue);
                }
              }
            } else if (_isString) {
              refs2[ref] = value;
              if (shared.hasOwn(setupState, ref)) {
                setupState[ref] = value;
              }
            } else if (_isRef) {
              ref.value = value;
              if (rawRef.k)
                refs2[rawRef.k] = value;
            } else {
              warn("Invalid template ref type:", ref, `(${typeof ref})`);
            }
          };
          if (value) {
            doSet.id = -1;
            queuePostRenderEffect(doSet, parentSuspense);
          } else {
            doSet();
          }
        } else {
          warn("Invalid template ref type:", ref, `(${typeof ref})`);
        }
      }
    }
    var hasMismatch = false;
    var isSVGContainer = (container) => /svg/.test(container.namespaceURI) && container.tagName !== "foreignObject";
    var isComment = (node) => node.nodeType === 8;
    function createHydrationFunctions(rendererInternals) {
      const { mt: mountComponent, p: patch, o: { patchProp, createText, nextSibling, parentNode, remove, insert, createComment } } = rendererInternals;
      const hydrate = (vnode, container) => {
        if (!container.hasChildNodes()) {
          warn(`Attempting to hydrate existing markup but container is empty. Performing full mount instead.`);
          patch(null, vnode, container);
          flushPostFlushCbs();
          container._vnode = vnode;
          return;
        }
        hasMismatch = false;
        hydrateNode(container.firstChild, vnode, null, null, null);
        flushPostFlushCbs();
        container._vnode = vnode;
        if (hasMismatch && true) {
          console.error(`Hydration completed but contains mismatches.`);
        }
      };
      const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
        const isFragmentStart = isComment(node) && node.data === "[";
        const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
        const { type, ref, shapeFlag, patchFlag } = vnode;
        let domType = node.nodeType;
        vnode.el = node;
        if (patchFlag === -2) {
          optimized = false;
          vnode.dynamicChildren = null;
        }
        let nextNode = null;
        switch (type) {
          case Text:
            if (domType !== 3) {
              if (vnode.children === "") {
                insert(vnode.el = createText(""), parentNode(node), node);
                nextNode = node;
              } else {
                nextNode = onMismatch();
              }
            } else {
              if (node.data !== vnode.children) {
                hasMismatch = true;
                warn(`Hydration text mismatch:
- Client: ${JSON.stringify(node.data)}
- Server: ${JSON.stringify(vnode.children)}`);
                node.data = vnode.children;
              }
              nextNode = nextSibling(node);
            }
            break;
          case Comment:
            if (domType !== 8 || isFragmentStart) {
              nextNode = onMismatch();
            } else {
              nextNode = nextSibling(node);
            }
            break;
          case Static:
            if (isFragmentStart) {
              node = nextSibling(node);
              domType = node.nodeType;
            }
            if (domType === 1 || domType === 3) {
              nextNode = node;
              const needToAdoptContent = !vnode.children.length;
              for (let i = 0; i < vnode.staticCount; i++) {
                if (needToAdoptContent)
                  vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
                if (i === vnode.staticCount - 1) {
                  vnode.anchor = nextNode;
                }
                nextNode = nextSibling(nextNode);
              }
              return isFragmentStart ? nextSibling(nextNode) : nextNode;
            } else {
              onMismatch();
            }
            break;
          case Fragment:
            if (!isFragmentStart) {
              nextNode = onMismatch();
            } else {
              nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
            }
            break;
          default:
            if (shapeFlag & 1) {
              if (domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) {
                nextNode = onMismatch();
              } else {
                nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
              }
            } else if (shapeFlag & 6) {
              vnode.slotScopeIds = slotScopeIds;
              const container = parentNode(node);
              mountComponent(vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), optimized);
              nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node);
              if (nextNode && isComment(nextNode) && nextNode.data === "teleport end") {
                nextNode = nextSibling(nextNode);
              }
              if (isAsyncWrapper(vnode)) {
                let subTree;
                if (isFragmentStart) {
                  subTree = createVNode(Fragment);
                  subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
                } else {
                  subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
                }
                subTree.el = node;
                vnode.component.subTree = subTree;
              }
            } else if (shapeFlag & 64) {
              if (domType !== 8) {
                nextNode = onMismatch();
              } else {
                nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
              }
            } else if (shapeFlag & 128) {
              nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, isSVGContainer(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
            } else {
              warn("Invalid HostVNode type:", type, `(${typeof type})`);
            }
        }
        if (ref != null) {
          setRef(ref, null, parentSuspense, vnode);
        }
        return nextNode;
      };
      const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
        optimized = optimized || !!vnode.dynamicChildren;
        const { type, props, patchFlag, shapeFlag, dirs } = vnode;
        const forcePatchValue = type === "input" && dirs || type === "option";
        {
          if (dirs) {
            invokeDirectiveHook(vnode, null, parentComponent, "created");
          }
          if (props) {
            if (forcePatchValue || !optimized || patchFlag & (16 | 32)) {
              for (const key in props) {
                if (forcePatchValue && key.endsWith("value") || shared.isOn(key) && !shared.isReservedProp(key)) {
                  patchProp(el, key, null, props[key], false, void 0, parentComponent);
                }
              }
            } else if (props.onClick) {
              patchProp(el, "onClick", null, props.onClick, false, void 0, parentComponent);
            }
          }
          let vnodeHooks;
          if (vnodeHooks = props && props.onVnodeBeforeMount) {
            invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          }
          if (dirs) {
            invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
          }
          if ((vnodeHooks = props && props.onVnodeMounted) || dirs) {
            queueEffectWithSuspense(() => {
              vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
              dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
            }, parentSuspense);
          }
          if (shapeFlag & 16 && !(props && (props.innerHTML || props.textContent))) {
            let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
            let hasWarned2 = false;
            while (next) {
              hasMismatch = true;
              if (!hasWarned2) {
                warn(`Hydration children mismatch in <${vnode.type}>: server rendered element contains more child nodes than client vdom.`);
                hasWarned2 = true;
              }
              const cur = next;
              next = next.nextSibling;
              remove(cur);
            }
          } else if (shapeFlag & 8) {
            if (el.textContent !== vnode.children) {
              hasMismatch = true;
              warn(`Hydration text content mismatch in <${vnode.type}>:
- Client: ${el.textContent}
- Server: ${vnode.children}`);
              el.textContent = vnode.children;
            }
          }
        }
        return el.nextSibling;
      };
      const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
        optimized = optimized || !!parentVNode.dynamicChildren;
        const children = parentVNode.children;
        const l = children.length;
        let hasWarned2 = false;
        for (let i = 0; i < l; i++) {
          const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
          if (node) {
            node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
          } else if (vnode.type === Text && !vnode.children) {
            continue;
          } else {
            hasMismatch = true;
            if (!hasWarned2) {
              warn(`Hydration children mismatch in <${container.tagName.toLowerCase()}>: server rendered element contains fewer child nodes than client vdom.`);
              hasWarned2 = true;
            }
            patch(null, vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
          }
        }
        return node;
      };
      const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
        const { slotScopeIds: fragmentSlotScopeIds } = vnode;
        if (fragmentSlotScopeIds) {
          slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
        }
        const container = parentNode(node);
        const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
        if (next && isComment(next) && next.data === "]") {
          return nextSibling(vnode.anchor = next);
        } else {
          hasMismatch = true;
          insert(vnode.anchor = createComment(`]`), container, next);
          return next;
        }
      };
      const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
        hasMismatch = true;
        warn(`Hydration node mismatch:
- Client vnode:`, vnode.type, `
- Server rendered DOM:`, node, node.nodeType === 3 ? `(text)` : isComment(node) && node.data === "[" ? `(start of fragment)` : ``);
        vnode.el = null;
        if (isFragment) {
          const end = locateClosingAsyncAnchor(node);
          while (true) {
            const next2 = nextSibling(node);
            if (next2 && next2 !== end) {
              remove(next2);
            } else {
              break;
            }
          }
        }
        const next = nextSibling(node);
        const container = parentNode(node);
        remove(node);
        patch(null, vnode, container, next, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
        return next;
      };
      const locateClosingAsyncAnchor = (node) => {
        let match = 0;
        while (node) {
          node = nextSibling(node);
          if (node && isComment(node)) {
            if (node.data === "[")
              match++;
            if (node.data === "]") {
              if (match === 0) {
                return nextSibling(node);
              } else {
                match--;
              }
            }
          }
        }
        return node;
      };
      return [hydrate, hydrateNode];
    }
    var supported;
    var perf;
    function startMeasure(instance, type) {
      if (instance.appContext.config.performance && isSupported()) {
        perf.mark(`vue-${type}-${instance.uid}`);
      }
      {
        devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
      }
    }
    function endMeasure(instance, type) {
      if (instance.appContext.config.performance && isSupported()) {
        const startTag = `vue-${type}-${instance.uid}`;
        const endTag = startTag + `:end`;
        perf.mark(endTag);
        perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
      }
      {
        devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
      }
    }
    function isSupported() {
      if (supported !== void 0) {
        return supported;
      }
      if (typeof window !== "undefined" && window.performance) {
        supported = true;
        perf = window.performance;
      } else {
        supported = false;
      }
      return supported;
    }
    var queuePostRenderEffect = queueEffectWithSuspense;
    function createRenderer(options) {
      return baseCreateRenderer(options);
    }
    function createHydrationRenderer(options) {
      return baseCreateRenderer(options, createHydrationFunctions);
    }
    function baseCreateRenderer(options, createHydrationFns) {
      const target = shared.getGlobalThis();
      target.__VUE__ = true;
      {
        setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
      }
      const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = shared.NOOP, insertStaticContent: hostInsertStaticContent } = options;
      const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
        if (n1 === n2) {
          return;
        }
        if (n1 && !isSameVNodeType(n1, n2)) {
          anchor = getNextHostNode(n1);
          unmount(n1, parentComponent, parentSuspense, true);
          n1 = null;
        }
        if (n2.patchFlag === -2) {
          optimized = false;
          n2.dynamicChildren = null;
        }
        const { type, ref, shapeFlag } = n2;
        switch (type) {
          case Text:
            processText(n1, n2, container, anchor);
            break;
          case Comment:
            processCommentNode(n1, n2, container, anchor);
            break;
          case Static:
            if (n1 == null) {
              mountStaticNode(n2, container, anchor, isSVG);
            } else {
              patchStaticNode(n1, n2, container, isSVG);
            }
            break;
          case Fragment:
            processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            break;
          default:
            if (shapeFlag & 1) {
              processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else if (shapeFlag & 6) {
              processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else if (shapeFlag & 64) {
              type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
            } else if (shapeFlag & 128) {
              type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
            } else {
              warn("Invalid VNode type:", type, `(${typeof type})`);
            }
        }
        if (ref != null && parentComponent) {
          setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
        }
      };
      const processText = (n1, n2, container, anchor) => {
        if (n1 == null) {
          hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
        } else {
          const el = n2.el = n1.el;
          if (n2.children !== n1.children) {
            hostSetText(el, n2.children);
          }
        }
      };
      const processCommentNode = (n1, n2, container, anchor) => {
        if (n1 == null) {
          hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
        } else {
          n2.el = n1.el;
        }
      };
      const mountStaticNode = (n2, container, anchor, isSVG) => {
        [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
      };
      const patchStaticNode = (n1, n2, container, isSVG) => {
        if (n2.children !== n1.children) {
          const anchor = hostNextSibling(n1.anchor);
          removeStaticNode(n1);
          [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
        } else {
          n2.el = n1.el;
          n2.anchor = n1.anchor;
        }
      };
      const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
        let next;
        while (el && el !== anchor) {
          next = hostNextSibling(el);
          hostInsert(el, container, nextSibling);
          el = next;
        }
        hostInsert(anchor, container, nextSibling);
      };
      const removeStaticNode = ({ el, anchor }) => {
        let next;
        while (el && el !== anchor) {
          next = hostNextSibling(el);
          hostRemove(el);
          el = next;
        }
        hostRemove(anchor);
      };
      const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        isSVG = isSVG || n2.type === "svg";
        if (n1 == null) {
          mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        let el;
        let vnodeHook;
        const { type, props, shapeFlag, transition, dirs } = vnode;
        el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
        if (shapeFlag & 8) {
          hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16) {
          mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "created");
        }
        if (props) {
          for (const key in props) {
            if (key !== "value" && !shared.isReservedProp(key)) {
              hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
          if ("value" in props) {
            hostPatchProp(el, "value", null, props.value);
          }
          if (vnodeHook = props.onVnodeBeforeMount) {
            invokeVNodeHook(vnodeHook, parentComponent, vnode);
          }
        }
        setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
        {
          Object.defineProperty(el, "__vnode", {
            value: vnode,
            enumerable: false
          });
          Object.defineProperty(el, "__vueParentComponent", {
            value: parentComponent,
            enumerable: false
          });
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
        }
        const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
        if (needCallTransitionHooks) {
          transition.beforeEnter(el);
        }
        hostInsert(el, container, anchor);
        if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            needCallTransitionHooks && transition.enter(el);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
          }, parentSuspense);
        }
      };
      const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
        if (scopeId) {
          hostSetScopeId(el, scopeId);
        }
        if (slotScopeIds) {
          for (let i = 0; i < slotScopeIds.length; i++) {
            hostSetScopeId(el, slotScopeIds[i]);
          }
        }
        if (parentComponent) {
          let subTree = parentComponent.subTree;
          if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
            subTree = filterSingleRoot(subTree.children) || subTree;
          }
          if (vnode === subTree) {
            const parentVNode = parentComponent.vnode;
            setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
          }
        }
      };
      const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
        for (let i = start; i < children.length; i++) {
          const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
          patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        const el = n2.el = n1.el;
        let { patchFlag, dynamicChildren, dirs } = n2;
        patchFlag |= n1.patchFlag & 16;
        const oldProps = n1.props || shared.EMPTY_OBJ;
        const newProps = n2.props || shared.EMPTY_OBJ;
        let vnodeHook;
        parentComponent && toggleRecurse(parentComponent, false);
        if (vnodeHook = newProps.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        }
        if (dirs) {
          invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
        }
        parentComponent && toggleRecurse(parentComponent, true);
        if (isHmrUpdating) {
          patchFlag = 0;
          optimized = false;
          dynamicChildren = null;
        }
        const areChildrenSVG = isSVG && n2.type !== "foreignObject";
        if (dynamicChildren) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
          if (parentComponent && parentComponent.type.__hmrId) {
            traverseStaticChildren(n1, n2);
          }
        } else if (!optimized) {
          patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
        }
        if (patchFlag > 0) {
          if (patchFlag & 16) {
            patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
          } else {
            if (patchFlag & 2) {
              if (oldProps.class !== newProps.class) {
                hostPatchProp(el, "class", null, newProps.class, isSVG);
              }
            }
            if (patchFlag & 4) {
              hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
            }
            if (patchFlag & 8) {
              const propsToUpdate = n2.dynamicProps;
              for (let i = 0; i < propsToUpdate.length; i++) {
                const key = propsToUpdate[i];
                const prev = oldProps[key];
                const next = newProps[key];
                if (next !== prev || key === "value") {
                  hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
                }
              }
            }
          }
          if (patchFlag & 1) {
            if (n1.children !== n2.children) {
              hostSetElementText(el, n2.children);
            }
          }
        } else if (!optimized && dynamicChildren == null) {
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        }
        if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
            dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
          }, parentSuspense);
        }
      };
      const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
        for (let i = 0; i < newChildren.length; i++) {
          const oldVNode = oldChildren[i];
          const newVNode = newChildren[i];
          const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
          patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
        }
      };
      const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
        if (oldProps !== newProps) {
          if (oldProps !== shared.EMPTY_OBJ) {
            for (const key in oldProps) {
              if (!shared.isReservedProp(key) && !(key in newProps)) {
                hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
          for (const key in newProps) {
            if (shared.isReservedProp(key))
              continue;
            const next = newProps[key];
            const prev = oldProps[key];
            if (next !== prev && key !== "value") {
              hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
          if ("value" in newProps) {
            hostPatchProp(el, "value", oldProps.value, newProps.value);
          }
        }
      };
      const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
        const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
        let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
        if (isHmrUpdating || patchFlag & 2048) {
          patchFlag = 0;
          optimized = false;
          dynamicChildren = null;
        }
        if (fragmentSlotScopeIds) {
          slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
        }
        if (n1 == null) {
          hostInsert(fragmentStartAnchor, container, anchor);
          hostInsert(fragmentEndAnchor, container, anchor);
          mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
            patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
            if (parentComponent && parentComponent.type.__hmrId) {
              traverseStaticChildren(n1, n2);
            } else if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
              traverseStaticChildren(n1, n2, true);
            }
          } else {
            patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        }
      };
      const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        n2.slotScopeIds = slotScopeIds;
        if (n1 == null) {
          if (n2.shapeFlag & 512) {
            parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
          } else {
            mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          }
        } else {
          updateComponent(n1, n2, optimized);
        }
      };
      const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
        const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
        if (instance.type.__hmrId) {
          registerHMR(instance);
        }
        {
          pushWarningContext(initialVNode);
          startMeasure(instance, `mount`);
        }
        if (isKeepAlive(initialVNode)) {
          instance.ctx.renderer = internals;
        }
        {
          {
            startMeasure(instance, `init`);
          }
          setupComponent(instance);
          {
            endMeasure(instance, `init`);
          }
        }
        if (instance.asyncDep) {
          parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
          if (!initialVNode.el) {
            const placeholder = instance.subTree = createVNode(Comment);
            processCommentNode(null, placeholder, container, anchor);
          }
          return;
        }
        setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
        {
          popWarningContext();
          endMeasure(instance, `mount`);
        }
      };
      const updateComponent = (n1, n2, optimized) => {
        const instance = n2.component = n1.component;
        if (shouldUpdateComponent(n1, n2, optimized)) {
          if (instance.asyncDep && !instance.asyncResolved) {
            {
              pushWarningContext(n2);
            }
            updateComponentPreRender(instance, n2, optimized);
            {
              popWarningContext();
            }
            return;
          } else {
            instance.next = n2;
            invalidateJob(instance.update);
            instance.update();
          }
        } else {
          n2.el = n1.el;
          instance.vnode = n2;
        }
      };
      const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
        const componentUpdateFn = () => {
          if (!instance.isMounted) {
            let vnodeHook;
            const { el, props } = initialVNode;
            const { bm, m, parent } = instance;
            const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
            toggleRecurse(instance, false);
            if (bm) {
              shared.invokeArrayFns(bm);
            }
            if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
              invokeVNodeHook(vnodeHook, parent, initialVNode);
            }
            toggleRecurse(instance, true);
            if (el && hydrateNode) {
              const hydrateSubTree = () => {
                {
                  startMeasure(instance, `render`);
                }
                instance.subTree = renderComponentRoot(instance);
                {
                  endMeasure(instance, `render`);
                }
                {
                  startMeasure(instance, `hydrate`);
                }
                hydrateNode(el, instance.subTree, instance, parentSuspense, null);
                {
                  endMeasure(instance, `hydrate`);
                }
              };
              if (isAsyncWrapperVNode) {
                initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
              } else {
                hydrateSubTree();
              }
            } else {
              {
                startMeasure(instance, `render`);
              }
              const subTree = instance.subTree = renderComponentRoot(instance);
              {
                endMeasure(instance, `render`);
              }
              {
                startMeasure(instance, `patch`);
              }
              patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
              {
                endMeasure(instance, `patch`);
              }
              initialVNode.el = subTree.el;
            }
            if (m) {
              queuePostRenderEffect(m, parentSuspense);
            }
            if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
              const scopedInitialVNode = initialVNode;
              queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
            }
            if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
              instance.a && queuePostRenderEffect(instance.a, parentSuspense);
            }
            instance.isMounted = true;
            {
              devtoolsComponentAdded(instance);
            }
            initialVNode = container = anchor = null;
          } else {
            let { next, bu, u, parent, vnode } = instance;
            let originNext = next;
            let vnodeHook;
            {
              pushWarningContext(next || instance.vnode);
            }
            toggleRecurse(instance, false);
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            } else {
              next = vnode;
            }
            if (bu) {
              shared.invokeArrayFns(bu);
            }
            if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
              invokeVNodeHook(vnodeHook, parent, next, vnode);
            }
            toggleRecurse(instance, true);
            {
              startMeasure(instance, `render`);
            }
            const nextTree = renderComponentRoot(instance);
            {
              endMeasure(instance, `render`);
            }
            const prevTree = instance.subTree;
            instance.subTree = nextTree;
            {
              startMeasure(instance, `patch`);
            }
            patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
            {
              endMeasure(instance, `patch`);
            }
            next.el = nextTree.el;
            if (originNext === null) {
              updateHOCHostEl(instance, nextTree.el);
            }
            if (u) {
              queuePostRenderEffect(u, parentSuspense);
            }
            if (vnodeHook = next.props && next.props.onVnodeUpdated) {
              queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
            }
            {
              devtoolsComponentUpdated(instance);
            }
            {
              popWarningContext();
            }
          }
        };
        const effect = instance.effect = new reactivity.ReactiveEffect(componentUpdateFn, () => queueJob(update2), instance.scope);
        const update2 = instance.update = () => effect.run();
        update2.id = instance.uid;
        toggleRecurse(instance, true);
        {
          effect.onTrack = instance.rtc ? (e) => shared.invokeArrayFns(instance.rtc, e) : void 0;
          effect.onTrigger = instance.rtg ? (e) => shared.invokeArrayFns(instance.rtg, e) : void 0;
          update2.ownerInstance = instance;
        }
        update2();
      };
      const updateComponentPreRender = (instance, nextVNode, optimized) => {
        nextVNode.component = instance;
        const prevProps = instance.vnode.props;
        instance.vnode = nextVNode;
        instance.next = null;
        updateProps(instance, nextVNode.props, prevProps, optimized);
        updateSlots(instance, nextVNode.children, optimized);
        reactivity.pauseTracking();
        flushPreFlushCbs();
        reactivity.resetTracking();
      };
      const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
        const c1 = n1 && n1.children;
        const prevShapeFlag = n1 ? n1.shapeFlag : 0;
        const c2 = n2.children;
        const { patchFlag, shapeFlag } = n2;
        if (patchFlag > 0) {
          if (patchFlag & 128) {
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            return;
          } else if (patchFlag & 256) {
            patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            return;
          }
        }
        if (shapeFlag & 8) {
          if (prevShapeFlag & 16) {
            unmountChildren(c1, parentComponent, parentSuspense);
          }
          if (c2 !== c1) {
            hostSetElementText(container, c2);
          }
        } else {
          if (prevShapeFlag & 16) {
            if (shapeFlag & 16) {
              patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else {
              unmountChildren(c1, parentComponent, parentSuspense, true);
            }
          } else {
            if (prevShapeFlag & 8) {
              hostSetElementText(container, "");
            }
            if (shapeFlag & 16) {
              mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
          }
        }
      };
      const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        c1 = c1 || shared.EMPTY_ARR;
        c2 = c2 || shared.EMPTY_ARR;
        const oldLength = c1.length;
        const newLength = c2.length;
        const commonLength = Math.min(oldLength, newLength);
        let i;
        for (i = 0; i < commonLength; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
        if (oldLength > newLength) {
          unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
        } else {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
        }
      };
      const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        let i = 0;
        const l2 = c2.length;
        let e1 = c1.length - 1;
        let e2 = l2 - 1;
        while (i <= e1 && i <= e2) {
          const n1 = c1[i];
          const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (isSameVNodeType(n1, n2)) {
            patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            break;
          }
          i++;
        }
        while (i <= e1 && i <= e2) {
          const n1 = c1[e1];
          const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
          if (isSameVNodeType(n1, n2)) {
            patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            break;
          }
          e1--;
          e2--;
        }
        if (i > e1) {
          if (i <= e2) {
            const nextPos = e2 + 1;
            const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
            while (i <= e2) {
              patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
              i++;
            }
          }
        } else if (i > e2) {
          while (i <= e1) {
            unmount(c1[i], parentComponent, parentSuspense, true);
            i++;
          }
        } else {
          const s1 = i;
          const s2 = i;
          const keyToNewIndexMap = new Map();
          for (i = s2; i <= e2; i++) {
            const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
            if (nextChild.key != null) {
              if (keyToNewIndexMap.has(nextChild.key)) {
                warn(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
              }
              keyToNewIndexMap.set(nextChild.key, i);
            }
          }
          let j;
          let patched = 0;
          const toBePatched = e2 - s2 + 1;
          let moved = false;
          let maxNewIndexSoFar = 0;
          const newIndexToOldIndexMap = new Array(toBePatched);
          for (i = 0; i < toBePatched; i++)
            newIndexToOldIndexMap[i] = 0;
          for (i = s1; i <= e1; i++) {
            const prevChild = c1[i];
            if (patched >= toBePatched) {
              unmount(prevChild, parentComponent, parentSuspense, true);
              continue;
            }
            let newIndex;
            if (prevChild.key != null) {
              newIndex = keyToNewIndexMap.get(prevChild.key);
            } else {
              for (j = s2; j <= e2; j++) {
                if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                  newIndex = j;
                  break;
                }
              }
            }
            if (newIndex === void 0) {
              unmount(prevChild, parentComponent, parentSuspense, true);
            } else {
              newIndexToOldIndexMap[newIndex - s2] = i + 1;
              if (newIndex >= maxNewIndexSoFar) {
                maxNewIndexSoFar = newIndex;
              } else {
                moved = true;
              }
              patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
              patched++;
            }
          }
          const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : shared.EMPTY_ARR;
          j = increasingNewIndexSequence.length - 1;
          for (i = toBePatched - 1; i >= 0; i--) {
            const nextIndex = s2 + i;
            const nextChild = c2[nextIndex];
            const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
            if (newIndexToOldIndexMap[i] === 0) {
              patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else if (moved) {
              if (j < 0 || i !== increasingNewIndexSequence[j]) {
                move(nextChild, container, anchor, 2);
              } else {
                j--;
              }
            }
          }
        }
      };
      const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
        const { el, type, transition, children, shapeFlag } = vnode;
        if (shapeFlag & 6) {
          move(vnode.component.subTree, container, anchor, moveType);
          return;
        }
        if (shapeFlag & 128) {
          vnode.suspense.move(container, anchor, moveType);
          return;
        }
        if (shapeFlag & 64) {
          type.move(vnode, container, anchor, internals);
          return;
        }
        if (type === Fragment) {
          hostInsert(el, container, anchor);
          for (let i = 0; i < children.length; i++) {
            move(children[i], container, anchor, moveType);
          }
          hostInsert(vnode.anchor, container, anchor);
          return;
        }
        if (type === Static) {
          moveStaticNode(vnode, container, anchor);
          return;
        }
        const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
        if (needTransition) {
          if (moveType === 0) {
            transition.beforeEnter(el);
            hostInsert(el, container, anchor);
            queuePostRenderEffect(() => transition.enter(el), parentSuspense);
          } else {
            const { leave, delayLeave, afterLeave } = transition;
            const remove2 = () => hostInsert(el, container, anchor);
            const performLeave = () => {
              leave(el, () => {
                remove2();
                afterLeave && afterLeave();
              });
            };
            if (delayLeave) {
              delayLeave(el, remove2, performLeave);
            } else {
              performLeave();
            }
          }
        } else {
          hostInsert(el, container, anchor);
        }
      };
      const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
        const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
        if (ref != null) {
          setRef(ref, null, parentSuspense, vnode, true);
        }
        if (shapeFlag & 256) {
          parentComponent.ctx.deactivate(vnode);
          return;
        }
        const shouldInvokeDirs = shapeFlag & 1 && dirs;
        const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
        let vnodeHook;
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
        if (shapeFlag & 6) {
          unmountComponent(vnode.component, parentSuspense, doRemove);
        } else {
          if (shapeFlag & 128) {
            vnode.suspense.unmount(parentSuspense, doRemove);
            return;
          }
          if (shouldInvokeDirs) {
            invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
          }
          if (shapeFlag & 64) {
            vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
          } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
            unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
          } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
            unmountChildren(children, parentComponent, parentSuspense);
          }
          if (doRemove) {
            remove(vnode);
          }
        }
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
          }, parentSuspense);
        }
      };
      const remove = (vnode) => {
        const { type, el, anchor, transition } = vnode;
        if (type === Fragment) {
          if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
            vnode.children.forEach((child) => {
              if (child.type === Comment) {
                hostRemove(child.el);
              } else {
                remove(child);
              }
            });
          } else {
            removeFragment(el, anchor);
          }
          return;
        }
        if (type === Static) {
          removeStaticNode(vnode);
          return;
        }
        const performRemove = () => {
          hostRemove(el);
          if (transition && !transition.persisted && transition.afterLeave) {
            transition.afterLeave();
          }
        };
        if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
          const { leave, delayLeave } = transition;
          const performLeave = () => leave(el, performRemove);
          if (delayLeave) {
            delayLeave(vnode.el, performRemove, performLeave);
          } else {
            performLeave();
          }
        } else {
          performRemove();
        }
      };
      const removeFragment = (cur, end) => {
        let next;
        while (cur !== end) {
          next = hostNextSibling(cur);
          hostRemove(cur);
          cur = next;
        }
        hostRemove(end);
      };
      const unmountComponent = (instance, parentSuspense, doRemove) => {
        if (instance.type.__hmrId) {
          unregisterHMR(instance);
        }
        const { bum, scope, update: update2, subTree, um } = instance;
        if (bum) {
          shared.invokeArrayFns(bum);
        }
        scope.stop();
        if (update2) {
          update2.active = false;
          unmount(subTree, instance, parentSuspense, doRemove);
        }
        if (um) {
          queuePostRenderEffect(um, parentSuspense);
        }
        queuePostRenderEffect(() => {
          instance.isUnmounted = true;
        }, parentSuspense);
        if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
          parentSuspense.deps--;
          if (parentSuspense.deps === 0) {
            parentSuspense.resolve();
          }
        }
        {
          devtoolsComponentRemoved(instance);
        }
      };
      const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
        for (let i = start; i < children.length; i++) {
          unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
        }
      };
      const getNextHostNode = (vnode) => {
        if (vnode.shapeFlag & 6) {
          return getNextHostNode(vnode.component.subTree);
        }
        if (vnode.shapeFlag & 128) {
          return vnode.suspense.next();
        }
        return hostNextSibling(vnode.anchor || vnode.el);
      };
      const render = (vnode, container, isSVG) => {
        if (vnode == null) {
          if (container._vnode) {
            unmount(container._vnode, null, null, true);
          }
        } else {
          patch(container._vnode || null, vnode, container, null, null, null, isSVG);
        }
        flushPreFlushCbs();
        flushPostFlushCbs();
        container._vnode = vnode;
      };
      const internals = {
        p: patch,
        um: unmount,
        m: move,
        r: remove,
        mt: mountComponent,
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        n: getNextHostNode,
        o: options
      };
      let hydrate;
      let hydrateNode;
      if (createHydrationFns) {
        [hydrate, hydrateNode] = createHydrationFns(internals);
      }
      return {
        render,
        hydrate,
        createApp: createAppAPI(render, hydrate)
      };
    }
    function toggleRecurse({ effect, update: update2 }, allowed) {
      effect.allowRecurse = update2.allowRecurse = allowed;
    }
    function traverseStaticChildren(n1, n2, shallow = false) {
      const ch1 = n1.children;
      const ch2 = n2.children;
      if (shared.isArray(ch1) && shared.isArray(ch2)) {
        for (let i = 0; i < ch1.length; i++) {
          const c1 = ch1[i];
          let c2 = ch2[i];
          if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
            if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
              c2 = ch2[i] = cloneIfMounted(ch2[i]);
              c2.el = c1.el;
            }
            if (!shallow)
              traverseStaticChildren(c1, c2);
          }
          if (c2.type === Comment && !c2.el) {
            c2.el = c1.el;
          }
        }
      }
    }
    function getSequence(arr) {
      const p = arr.slice();
      const result = [0];
      let i, j, u, v, c;
      const len = arr.length;
      for (i = 0; i < len; i++) {
        const arrI = arr[i];
        if (arrI !== 0) {
          j = result[result.length - 1];
          if (arr[j] < arrI) {
            p[i] = j;
            result.push(i);
            continue;
          }
          u = 0;
          v = result.length - 1;
          while (u < v) {
            c = u + v >> 1;
            if (arr[result[c]] < arrI) {
              u = c + 1;
            } else {
              v = c;
            }
          }
          if (arrI < arr[result[u]]) {
            if (u > 0) {
              p[i] = result[u - 1];
            }
            result[u] = i;
          }
        }
      }
      u = result.length;
      v = result[u - 1];
      while (u-- > 0) {
        result[u] = v;
        v = p[v];
      }
      return result;
    }
    var isTeleport = (type) => type.__isTeleport;
    var isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
    var isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
    var resolveTarget = (props, select) => {
      const targetSelector = props && props.to;
      if (shared.isString(targetSelector)) {
        if (!select) {
          warn(`Current renderer does not support string target for Teleports. (missing querySelector renderer option)`);
          return null;
        } else {
          const target = select(targetSelector);
          if (!target) {
            warn(`Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`);
          }
          return target;
        }
      } else {
        if (!targetSelector && !isTeleportDisabled(props)) {
          warn(`Invalid Teleport target: ${targetSelector}`);
        }
        return targetSelector;
      }
    };
    var TeleportImpl = {
      __isTeleport: true,
      process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
        const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
        const disabled = isTeleportDisabled(n2.props);
        let { shapeFlag, children, dynamicChildren } = n2;
        if (isHmrUpdating) {
          optimized = false;
          dynamicChildren = null;
        }
        if (n1 == null) {
          const placeholder = n2.el = createComment("teleport start");
          const mainAnchor = n2.anchor = createComment("teleport end");
          insert(placeholder, container, anchor);
          insert(mainAnchor, container, anchor);
          const target = n2.target = resolveTarget(n2.props, querySelector);
          const targetAnchor = n2.targetAnchor = createText("");
          if (target) {
            insert(targetAnchor, target);
            isSVG = isSVG || isTargetSVG(target);
          } else if (!disabled) {
            warn("Invalid Teleport target on mount:", target, `(${typeof target})`);
          }
          const mount = (container2, anchor2) => {
            if (shapeFlag & 16) {
              mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
          };
          if (disabled) {
            mount(container, mainAnchor);
          } else if (target) {
            mount(target, targetAnchor);
          }
        } else {
          n2.el = n1.el;
          const mainAnchor = n2.anchor = n1.anchor;
          const target = n2.target = n1.target;
          const targetAnchor = n2.targetAnchor = n1.targetAnchor;
          const wasDisabled = isTeleportDisabled(n1.props);
          const currentContainer = wasDisabled ? container : target;
          const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
          isSVG = isSVG || isTargetSVG(target);
          if (dynamicChildren) {
            patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
            traverseStaticChildren(n1, n2, true);
          } else if (!optimized) {
            patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
          }
          if (disabled) {
            if (!wasDisabled) {
              moveTeleport(n2, container, mainAnchor, internals, 1);
            }
          } else {
            if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
              const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
              if (nextTarget) {
                moveTeleport(n2, nextTarget, null, internals, 0);
              } else {
                warn("Invalid Teleport target on update:", target, `(${typeof target})`);
              }
            } else if (wasDisabled) {
              moveTeleport(n2, target, targetAnchor, internals, 1);
            }
          }
        }
      },
      remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
        const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
        if (target) {
          hostRemove(targetAnchor);
        }
        if (doRemove || !isTeleportDisabled(props)) {
          hostRemove(anchor);
          if (shapeFlag & 16) {
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
            }
          }
        }
      },
      move: moveTeleport,
      hydrate: hydrateTeleport
    };
    function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
      if (moveType === 0) {
        insert(vnode.targetAnchor, container, parentAnchor);
      }
      const { el, anchor, shapeFlag, children, props } = vnode;
      const isReorder = moveType === 2;
      if (isReorder) {
        insert(el, container, parentAnchor);
      }
      if (!isReorder || isTeleportDisabled(props)) {
        if (shapeFlag & 16) {
          for (let i = 0; i < children.length; i++) {
            move(children[i], container, parentAnchor, 2);
          }
        }
      }
      if (isReorder) {
        insert(anchor, container, parentAnchor);
      }
    }
    function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector } }, hydrateChildren) {
      const target = vnode.target = resolveTarget(vnode.props, querySelector);
      if (target) {
        const targetNode = target._lpa || target.firstChild;
        if (vnode.shapeFlag & 16) {
          if (isTeleportDisabled(vnode.props)) {
            vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
            vnode.targetAnchor = targetNode;
          } else {
            vnode.anchor = nextSibling(node);
            let targetAnchor = targetNode;
            while (targetAnchor) {
              targetAnchor = nextSibling(targetAnchor);
              if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
                vnode.targetAnchor = targetAnchor;
                target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
                break;
              }
            }
            hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
          }
        }
      }
      return vnode.anchor && nextSibling(vnode.anchor);
    }
    var Teleport = TeleportImpl;
    var Fragment = Symbol("Fragment");
    var Text = Symbol("Text");
    var Comment = Symbol("Comment");
    var Static = Symbol("Static");
    var blockStack = [];
    var currentBlock = null;
    function openBlock(disableTracking = false) {
      blockStack.push(currentBlock = disableTracking ? null : []);
    }
    function closeBlock() {
      blockStack.pop();
      currentBlock = blockStack[blockStack.length - 1] || null;
    }
    var isBlockTreeEnabled = 1;
    function setBlockTracking(value) {
      isBlockTreeEnabled += value;
    }
    function setupBlock(vnode) {
      vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || shared.EMPTY_ARR : null;
      closeBlock();
      if (isBlockTreeEnabled > 0 && currentBlock) {
        currentBlock.push(vnode);
      }
      return vnode;
    }
    function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
      return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
    }
    function createBlock(type, props, children, patchFlag, dynamicProps) {
      return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
    }
    function isVNode(value) {
      return value ? value.__v_isVNode === true : false;
    }
    function isSameVNodeType(n1, n2) {
      if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
        return false;
      }
      return n1.type === n2.type && n1.key === n2.key;
    }
    var vnodeArgsTransformer;
    function transformVNodeArgs(transformer) {
      vnodeArgsTransformer = transformer;
    }
    var createVNodeWithArgsTransform = (...args) => {
      return _createVNode(...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args);
    };
    var InternalObjectKey = `__vInternal`;
    var normalizeKey = ({ key }) => key != null ? key : null;
    var normalizeRef = ({ ref, ref_key, ref_for }) => {
      return ref != null ? shared.isString(ref) || reactivity.isRef(ref) || shared.isFunction(ref) ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for } : ref : null;
    };
    function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
      const vnode = {
        __v_isVNode: true,
        __v_skip: true,
        type,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        slotScopeIds: null,
        children,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag,
        patchFlag,
        dynamicProps,
        dynamicChildren: null,
        appContext: null
      };
      if (needFullChildrenNormalization) {
        normalizeChildren(vnode, children);
        if (shapeFlag & 128) {
          type.normalize(vnode);
        }
      } else if (children) {
        vnode.shapeFlag |= shared.isString(children) ? 8 : 16;
      }
      if (vnode.key !== vnode.key) {
        warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
        currentBlock.push(vnode);
      }
      return vnode;
    }
    var createVNode = createVNodeWithArgsTransform;
    function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
      if (!type || type === NULL_DYNAMIC_COMPONENT) {
        if (!type) {
          warn(`Invalid vnode type when creating vnode: ${type}.`);
        }
        type = Comment;
      }
      if (isVNode(type)) {
        const cloned = cloneVNode(type, props, true);
        if (children) {
          normalizeChildren(cloned, children);
        }
        if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
          if (cloned.shapeFlag & 6) {
            currentBlock[currentBlock.indexOf(type)] = cloned;
          } else {
            currentBlock.push(cloned);
          }
        }
        cloned.patchFlag |= -2;
        return cloned;
      }
      if (isClassComponent(type)) {
        type = type.__vccOpts;
      }
      if (props) {
        props = guardReactiveProps(props);
        let { class: klass, style } = props;
        if (klass && !shared.isString(klass)) {
          props.class = shared.normalizeClass(klass);
        }
        if (shared.isObject(style)) {
          if (reactivity.isProxy(style) && !shared.isArray(style)) {
            style = shared.extend({}, style);
          }
          props.style = shared.normalizeStyle(style);
        }
      }
      const shapeFlag = shared.isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : shared.isObject(type) ? 4 : shared.isFunction(type) ? 2 : 0;
      if (shapeFlag & 4 && reactivity.isProxy(type)) {
        type = reactivity.toRaw(type);
        warn(`Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
      }
      return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
    }
    function guardReactiveProps(props) {
      if (!props)
        return null;
      return reactivity.isProxy(props) || InternalObjectKey in props ? shared.extend({}, props) : props;
    }
    function cloneVNode(vnode, extraProps, mergeRef = false) {
      const { props, ref, patchFlag, children } = vnode;
      const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
      const cloned = {
        __v_isVNode: true,
        __v_skip: true,
        type: vnode.type,
        props: mergedProps,
        key: mergedProps && normalizeKey(mergedProps),
        ref: extraProps && extraProps.ref ? mergeRef && ref ? shared.isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
        scopeId: vnode.scopeId,
        slotScopeIds: vnode.slotScopeIds,
        children: patchFlag === -1 && shared.isArray(children) ? children.map(deepCloneVNode) : children,
        target: vnode.target,
        targetAnchor: vnode.targetAnchor,
        staticCount: vnode.staticCount,
        shapeFlag: vnode.shapeFlag,
        patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
        dynamicProps: vnode.dynamicProps,
        dynamicChildren: vnode.dynamicChildren,
        appContext: vnode.appContext,
        dirs: vnode.dirs,
        transition: vnode.transition,
        component: vnode.component,
        suspense: vnode.suspense,
        ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
        ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
        el: vnode.el,
        anchor: vnode.anchor
      };
      return cloned;
    }
    function deepCloneVNode(vnode) {
      const cloned = cloneVNode(vnode);
      if (shared.isArray(vnode.children)) {
        cloned.children = vnode.children.map(deepCloneVNode);
      }
      return cloned;
    }
    function createTextVNode(text = " ", flag = 0) {
      return createVNode(Text, null, text, flag);
    }
    function createStaticVNode(content, numberOfNodes) {
      const vnode = createVNode(Static, null, content);
      vnode.staticCount = numberOfNodes;
      return vnode;
    }
    function createCommentVNode(text = "", asBlock = false) {
      return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
    }
    function normalizeVNode(child) {
      if (child == null || typeof child === "boolean") {
        return createVNode(Comment);
      } else if (shared.isArray(child)) {
        return createVNode(Fragment, null, child.slice());
      } else if (typeof child === "object") {
        return cloneIfMounted(child);
      } else {
        return createVNode(Text, null, String(child));
      }
    }
    function cloneIfMounted(child) {
      return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
    }
    function normalizeChildren(vnode, children) {
      let type = 0;
      const { shapeFlag } = vnode;
      if (children == null) {
        children = null;
      } else if (shared.isArray(children)) {
        type = 16;
      } else if (typeof children === "object") {
        if (shapeFlag & (1 | 64)) {
          const slot = children.default;
          if (slot) {
            slot._c && (slot._d = false);
            normalizeChildren(vnode, slot());
            slot._c && (slot._d = true);
          }
          return;
        } else {
          type = 32;
          const slotFlag = children._;
          if (!slotFlag && !(InternalObjectKey in children)) {
            children._ctx = currentRenderingInstance;
          } else if (slotFlag === 3 && currentRenderingInstance) {
            if (currentRenderingInstance.slots._ === 1) {
              children._ = 1;
            } else {
              children._ = 2;
              vnode.patchFlag |= 1024;
            }
          }
        }
      } else if (shared.isFunction(children)) {
        children = { default: children, _ctx: currentRenderingInstance };
        type = 32;
      } else {
        children = String(children);
        if (shapeFlag & 64) {
          type = 16;
          children = [createTextVNode(children)];
        } else {
          type = 8;
        }
      }
      vnode.children = children;
      vnode.shapeFlag |= type;
    }
    function mergeProps(...args) {
      const ret = {};
      for (let i = 0; i < args.length; i++) {
        const toMerge = args[i];
        for (const key in toMerge) {
          if (key === "class") {
            if (ret.class !== toMerge.class) {
              ret.class = shared.normalizeClass([ret.class, toMerge.class]);
            }
          } else if (key === "style") {
            ret.style = shared.normalizeStyle([ret.style, toMerge.style]);
          } else if (shared.isOn(key)) {
            const existing = ret[key];
            const incoming = toMerge[key];
            if (incoming && existing !== incoming && !(shared.isArray(existing) && existing.includes(incoming))) {
              ret[key] = existing ? [].concat(existing, incoming) : incoming;
            }
          } else if (key !== "") {
            ret[key] = toMerge[key];
          }
        }
      }
      return ret;
    }
    function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
      callWithAsyncErrorHandling(hook, instance, 7, [
        vnode,
        prevVNode
      ]);
    }
    var emptyAppContext = createAppContext();
    var uid$1 = 0;
    function createComponentInstance(vnode, parent, suspense) {
      const type = vnode.type;
      const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
      const instance = {
        uid: uid$1++,
        vnode,
        type,
        parent,
        appContext,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new reactivity.EffectScope(true),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: parent ? parent.provides : Object.create(appContext.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: normalizePropsOptions(type, appContext),
        emitsOptions: normalizeEmitsOptions(type, appContext),
        emit: null,
        emitted: null,
        propsDefaults: shared.EMPTY_OBJ,
        inheritAttrs: type.inheritAttrs,
        ctx: shared.EMPTY_OBJ,
        data: shared.EMPTY_OBJ,
        props: shared.EMPTY_OBJ,
        attrs: shared.EMPTY_OBJ,
        slots: shared.EMPTY_OBJ,
        refs: shared.EMPTY_OBJ,
        setupState: shared.EMPTY_OBJ,
        setupContext: null,
        suspense,
        suspenseId: suspense ? suspense.pendingId : 0,
        asyncDep: null,
        asyncResolved: false,
        isMounted: false,
        isUnmounted: false,
        isDeactivated: false,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
      };
      {
        instance.ctx = createDevRenderContext(instance);
      }
      instance.root = parent ? parent.root : instance;
      instance.emit = emit$1.bind(null, instance);
      if (vnode.ce) {
        vnode.ce(instance);
      }
      return instance;
    }
    var currentInstance = null;
    var getCurrentInstance = () => currentInstance || currentRenderingInstance;
    var setCurrentInstance = (instance) => {
      currentInstance = instance;
      instance.scope.on();
    };
    var unsetCurrentInstance = () => {
      currentInstance && currentInstance.scope.off();
      currentInstance = null;
    };
    var isBuiltInTag = /* @__PURE__ */ shared.makeMap("slot,component");
    function validateComponentName(name, config) {
      const appIsNativeTag = config.isNativeTag || shared.NO;
      if (isBuiltInTag(name) || appIsNativeTag(name)) {
        warn("Do not use built-in or reserved HTML elements as component id: " + name);
      }
    }
    function isStatefulComponent(instance) {
      return instance.vnode.shapeFlag & 4;
    }
    var isInSSRComponentSetup = false;
    function setupComponent(instance, isSSR = false) {
      isInSSRComponentSetup = isSSR;
      const { props, children } = instance.vnode;
      const isStateful = isStatefulComponent(instance);
      initProps(instance, props, isStateful, isSSR);
      initSlots(instance, children);
      const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
      isInSSRComponentSetup = false;
      return setupResult;
    }
    function setupStatefulComponent(instance, isSSR) {
      var _a;
      const Component = instance.type;
      {
        if (Component.name) {
          validateComponentName(Component.name, instance.appContext.config);
        }
        if (Component.components) {
          const names = Object.keys(Component.components);
          for (let i = 0; i < names.length; i++) {
            validateComponentName(names[i], instance.appContext.config);
          }
        }
        if (Component.directives) {
          const names = Object.keys(Component.directives);
          for (let i = 0; i < names.length; i++) {
            validateDirectiveName(names[i]);
          }
        }
        if (Component.compilerOptions && isRuntimeOnly()) {
          warn(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
        }
      }
      instance.accessCache = Object.create(null);
      instance.proxy = reactivity.markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
      {
        exposePropsOnRenderContext(instance);
      }
      const { setup } = Component;
      if (setup) {
        const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
        setCurrentInstance(instance);
        reactivity.pauseTracking();
        const setupResult = callWithErrorHandling(setup, instance, 0, [reactivity.shallowReadonly(instance.props), setupContext]);
        reactivity.resetTracking();
        unsetCurrentInstance();
        if (shared.isPromise(setupResult)) {
          setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
          if (isSSR) {
            return setupResult.then((resolvedResult) => {
              handleSetupResult(instance, resolvedResult, isSSR);
            }).catch((e) => {
              handleError(e, instance, 0);
            });
          } else {
            instance.asyncDep = setupResult;
            if (!instance.suspense) {
              const name = (_a = Component.name) !== null && _a !== void 0 ? _a : "Anonymous";
              warn(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
            }
          }
        } else {
          handleSetupResult(instance, setupResult, isSSR);
        }
      } else {
        finishComponentSetup(instance, isSSR);
      }
    }
    function handleSetupResult(instance, setupResult, isSSR) {
      if (shared.isFunction(setupResult)) {
        if (instance.type.__ssrInlineRender) {
          instance.ssrRender = setupResult;
        } else {
          instance.render = setupResult;
        }
      } else if (shared.isObject(setupResult)) {
        if (isVNode(setupResult)) {
          warn(`setup() should not return VNodes directly - return a render function instead.`);
        }
        {
          instance.devtoolsRawSetupState = setupResult;
        }
        instance.setupState = reactivity.proxyRefs(setupResult);
        {
          exposeSetupStateOnRenderContext(instance);
        }
      } else if (setupResult !== void 0) {
        warn(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
      }
      finishComponentSetup(instance, isSSR);
    }
    var compile;
    var installWithProxy;
    function registerRuntimeCompiler(_compile) {
      compile = _compile;
      installWithProxy = (i) => {
        if (i.render._rc) {
          i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
        }
      };
    }
    var isRuntimeOnly = () => !compile;
    function finishComponentSetup(instance, isSSR, skipOptions) {
      const Component = instance.type;
      if (!instance.render) {
        if (!isSSR && compile && !Component.render) {
          const template = Component.template || resolveMergedOptions(instance).template;
          if (template) {
            {
              startMeasure(instance, `compile`);
            }
            const { isCustomElement, compilerOptions } = instance.appContext.config;
            const { delimiters, compilerOptions: componentCompilerOptions } = Component;
            const finalCompilerOptions = shared.extend(shared.extend({
              isCustomElement,
              delimiters
            }, compilerOptions), componentCompilerOptions);
            Component.render = compile(template, finalCompilerOptions);
            {
              endMeasure(instance, `compile`);
            }
          }
        }
        instance.render = Component.render || shared.NOOP;
        if (installWithProxy) {
          installWithProxy(instance);
        }
      }
      {
        setCurrentInstance(instance);
        reactivity.pauseTracking();
        applyOptions(instance);
        reactivity.resetTracking();
        unsetCurrentInstance();
      }
      if (!Component.render && instance.render === shared.NOOP && !isSSR) {
        if (!compile && Component.template) {
          warn(`Component provided template option but runtime compilation is not supported in this build of Vue.`);
        } else {
          warn(`Component is missing template or render function.`);
        }
      }
    }
    function createAttrsProxy(instance) {
      return new Proxy(instance.attrs, {
        get(target, key) {
          markAttrsAccessed();
          reactivity.track(instance, "get", "$attrs");
          return target[key];
        },
        set() {
          warn(`setupContext.attrs is readonly.`);
          return false;
        },
        deleteProperty() {
          warn(`setupContext.attrs is readonly.`);
          return false;
        }
      });
    }
    function createSetupContext(instance) {
      const expose = (exposed) => {
        if (instance.exposed) {
          warn(`expose() should be called only once per setup().`);
        }
        instance.exposed = exposed || {};
      };
      let attrs;
      {
        return Object.freeze({
          get attrs() {
            return attrs || (attrs = createAttrsProxy(instance));
          },
          get slots() {
            return reactivity.shallowReadonly(instance.slots);
          },
          get emit() {
            return (event, ...args) => instance.emit(event, ...args);
          },
          expose
        });
      }
    }
    function getExposeProxy(instance) {
      if (instance.exposed) {
        return instance.exposeProxy || (instance.exposeProxy = new Proxy(reactivity.proxyRefs(reactivity.markRaw(instance.exposed)), {
          get(target, key) {
            if (key in target) {
              return target[key];
            } else if (key in publicPropertiesMap) {
              return publicPropertiesMap[key](instance);
            }
          }
        }));
      }
    }
    var classifyRE = /(?:^|[-_])(\w)/g;
    var classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
    function getComponentName(Component, includeInferred = true) {
      return shared.isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
    }
    function formatComponentName(instance, Component, isRoot = false) {
      let name = getComponentName(Component);
      if (!name && Component.__file) {
        const match = Component.__file.match(/([^/\\]+)\.\w+$/);
        if (match) {
          name = match[1];
        }
      }
      if (!name && instance && instance.parent) {
        const inferFromRegistry = (registry) => {
          for (const key in registry) {
            if (registry[key] === Component) {
              return key;
            }
          }
        };
        name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
      }
      return name ? classify(name) : isRoot ? `App` : `Anonymous`;
    }
    function isClassComponent(value) {
      return shared.isFunction(value) && "__vccOpts" in value;
    }
    var computed = (getterOrOptions, debugOptions) => {
      return reactivity.computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
    };
    var warnRuntimeUsage = (method) => warn(`${method}() is a compiler-hint helper that is only usable inside <script setup> of a single file component. Its arguments should be compiled away and passing it at runtime has no effect.`);
    function defineProps() {
      {
        warnRuntimeUsage(`defineProps`);
      }
      return null;
    }
    function defineEmits() {
      {
        warnRuntimeUsage(`defineEmits`);
      }
      return null;
    }
    function defineExpose(exposed) {
      {
        warnRuntimeUsage(`defineExpose`);
      }
    }
    function withDefaults(props, defaults) {
      {
        warnRuntimeUsage(`withDefaults`);
      }
      return null;
    }
    function useSlots() {
      return getContext().slots;
    }
    function useAttrs() {
      return getContext().attrs;
    }
    function getContext() {
      const i = getCurrentInstance();
      if (!i) {
        warn(`useContext() called without active instance.`);
      }
      return i.setupContext || (i.setupContext = createSetupContext(i));
    }
    function mergeDefaults(raw, defaults) {
      const props = shared.isArray(raw) ? raw.reduce((normalized, p) => (normalized[p] = {}, normalized), {}) : raw;
      for (const key in defaults) {
        const opt = props[key];
        if (opt) {
          if (shared.isArray(opt) || shared.isFunction(opt)) {
            props[key] = { type: opt, default: defaults[key] };
          } else {
            opt.default = defaults[key];
          }
        } else if (opt === null) {
          props[key] = { default: defaults[key] };
        } else {
          warn(`props default key "${key}" has no corresponding declaration.`);
        }
      }
      return props;
    }
    function createPropsRestProxy(props, excludedKeys) {
      const ret = {};
      for (const key in props) {
        if (!excludedKeys.includes(key)) {
          Object.defineProperty(ret, key, {
            enumerable: true,
            get: () => props[key]
          });
        }
      }
      return ret;
    }
    function withAsyncContext(getAwaitable) {
      const ctx = getCurrentInstance();
      if (!ctx) {
        warn(`withAsyncContext called without active current instance. This is likely a bug.`);
      }
      let awaitable = getAwaitable();
      unsetCurrentInstance();
      if (shared.isPromise(awaitable)) {
        awaitable = awaitable.catch((e) => {
          setCurrentInstance(ctx);
          throw e;
        });
      }
      return [awaitable, () => setCurrentInstance(ctx)];
    }
    function h(type, propsOrChildren, children) {
      const l = arguments.length;
      if (l === 2) {
        if (shared.isObject(propsOrChildren) && !shared.isArray(propsOrChildren)) {
          if (isVNode(propsOrChildren)) {
            return createVNode(type, null, [propsOrChildren]);
          }
          return createVNode(type, propsOrChildren);
        } else {
          return createVNode(type, null, propsOrChildren);
        }
      } else {
        if (l > 3) {
          children = Array.prototype.slice.call(arguments, 2);
        } else if (l === 3 && isVNode(children)) {
          children = [children];
        }
        return createVNode(type, propsOrChildren, children);
      }
    }
    var ssrContextKey = Symbol(`ssrContext`);
    var useSSRContext = () => {
      {
        const ctx = inject(ssrContextKey);
        if (!ctx) {
          warn(`Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`);
        }
        return ctx;
      }
    };
    function isShallow(value) {
      return !!(value && value["__v_isShallow"]);
    }
    function initCustomFormatter() {
      if (typeof window === "undefined") {
        return;
      }
      const vueStyle = { style: "color:#3ba776" };
      const numberStyle = { style: "color:#0b1bc9" };
      const stringStyle = { style: "color:#b62e24" };
      const keywordStyle = { style: "color:#9d288c" };
      const formatter = {
        header(obj) {
          if (!shared.isObject(obj)) {
            return null;
          }
          if (obj.__isVue) {
            return ["div", vueStyle, `VueInstance`];
          } else if (reactivity.isRef(obj)) {
            return [
              "div",
              {},
              ["span", vueStyle, genRefFlag(obj)],
              "<",
              formatValue(obj.value),
              `>`
            ];
          } else if (reactivity.isReactive(obj)) {
            return [
              "div",
              {},
              ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
              "<",
              formatValue(obj),
              `>${reactivity.isReadonly(obj) ? ` (readonly)` : ``}`
            ];
          } else if (reactivity.isReadonly(obj)) {
            return [
              "div",
              {},
              ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
              "<",
              formatValue(obj),
              ">"
            ];
          }
          return null;
        },
        hasBody(obj) {
          return obj && obj.__isVue;
        },
        body(obj) {
          if (obj && obj.__isVue) {
            return [
              "div",
              {},
              ...formatInstance(obj.$)
            ];
          }
        }
      };
      function formatInstance(instance) {
        const blocks = [];
        if (instance.type.props && instance.props) {
          blocks.push(createInstanceBlock("props", reactivity.toRaw(instance.props)));
        }
        if (instance.setupState !== shared.EMPTY_OBJ) {
          blocks.push(createInstanceBlock("setup", instance.setupState));
        }
        if (instance.data !== shared.EMPTY_OBJ) {
          blocks.push(createInstanceBlock("data", reactivity.toRaw(instance.data)));
        }
        const computed2 = extractKeys(instance, "computed");
        if (computed2) {
          blocks.push(createInstanceBlock("computed", computed2));
        }
        const injected = extractKeys(instance, "inject");
        if (injected) {
          blocks.push(createInstanceBlock("injected", injected));
        }
        blocks.push([
          "div",
          {},
          [
            "span",
            {
              style: keywordStyle.style + ";opacity:0.66"
            },
            "$ (internal): "
          ],
          ["object", { object: instance }]
        ]);
        return blocks;
      }
      function createInstanceBlock(type, target) {
        target = shared.extend({}, target);
        if (!Object.keys(target).length) {
          return ["span", {}];
        }
        return [
          "div",
          { style: "line-height:1.25em;margin-bottom:0.6em" },
          [
            "div",
            {
              style: "color:#476582"
            },
            type
          ],
          [
            "div",
            {
              style: "padding-left:1.25em"
            },
            ...Object.keys(target).map((key) => {
              return [
                "div",
                {},
                ["span", keywordStyle, key + ": "],
                formatValue(target[key], false)
              ];
            })
          ]
        ];
      }
      function formatValue(v, asRaw = true) {
        if (typeof v === "number") {
          return ["span", numberStyle, v];
        } else if (typeof v === "string") {
          return ["span", stringStyle, JSON.stringify(v)];
        } else if (typeof v === "boolean") {
          return ["span", keywordStyle, v];
        } else if (shared.isObject(v)) {
          return ["object", { object: asRaw ? reactivity.toRaw(v) : v }];
        } else {
          return ["span", stringStyle, String(v)];
        }
      }
      function extractKeys(instance, type) {
        const Comp = instance.type;
        if (shared.isFunction(Comp)) {
          return;
        }
        const extracted = {};
        for (const key in instance.ctx) {
          if (isKeyOfType(Comp, key, type)) {
            extracted[key] = instance.ctx[key];
          }
        }
        return extracted;
      }
      function isKeyOfType(Comp, key, type) {
        const opts = Comp[type];
        if (shared.isArray(opts) && opts.includes(key) || shared.isObject(opts) && key in opts) {
          return true;
        }
        if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
          return true;
        }
        if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
          return true;
        }
      }
      function genRefFlag(v) {
        if (isShallow(v)) {
          return `ShallowRef`;
        }
        if (v.effect) {
          return `ComputedRef`;
        }
        return `Ref`;
      }
      if (window.devtoolsFormatters) {
        window.devtoolsFormatters.push(formatter);
      } else {
        window.devtoolsFormatters = [formatter];
      }
    }
    function withMemo(memo, render, cache, index) {
      const cached = cache[index];
      if (cached && isMemoSame(cached, memo)) {
        return cached;
      }
      const ret = render();
      ret.memo = memo.slice();
      return cache[index] = ret;
    }
    function isMemoSame(cached, memo) {
      const prev = cached.memo;
      if (prev.length != memo.length) {
        return false;
      }
      for (let i = 0; i < prev.length; i++) {
        if (shared.hasChanged(prev[i], memo[i])) {
          return false;
        }
      }
      if (isBlockTreeEnabled > 0 && currentBlock) {
        currentBlock.push(cached);
      }
      return true;
    }
    var version = "3.2.41";
    var _ssrUtils = {
      createComponentInstance,
      setupComponent,
      renderComponentRoot,
      setCurrentRenderingInstance,
      isVNode,
      normalizeVNode
    };
    var ssrUtils = _ssrUtils;
    var resolveFilter = null;
    var compatUtils = null;
    exports2.EffectScope = reactivity.EffectScope;
    exports2.ReactiveEffect = reactivity.ReactiveEffect;
    exports2.customRef = reactivity.customRef;
    exports2.effect = reactivity.effect;
    exports2.effectScope = reactivity.effectScope;
    exports2.getCurrentScope = reactivity.getCurrentScope;
    exports2.isProxy = reactivity.isProxy;
    exports2.isReactive = reactivity.isReactive;
    exports2.isReadonly = reactivity.isReadonly;
    exports2.isRef = reactivity.isRef;
    exports2.isShallow = reactivity.isShallow;
    exports2.markRaw = reactivity.markRaw;
    exports2.onScopeDispose = reactivity.onScopeDispose;
    exports2.proxyRefs = reactivity.proxyRefs;
    exports2.reactive = reactivity.reactive;
    exports2.readonly = reactivity.readonly;
    exports2.ref = reactivity.ref;
    exports2.shallowReactive = reactivity.shallowReactive;
    exports2.shallowReadonly = reactivity.shallowReadonly;
    exports2.shallowRef = reactivity.shallowRef;
    exports2.stop = reactivity.stop;
    exports2.toRaw = reactivity.toRaw;
    exports2.toRef = reactivity.toRef;
    exports2.toRefs = reactivity.toRefs;
    exports2.triggerRef = reactivity.triggerRef;
    exports2.unref = reactivity.unref;
    exports2.camelize = shared.camelize;
    exports2.capitalize = shared.capitalize;
    exports2.normalizeClass = shared.normalizeClass;
    exports2.normalizeProps = shared.normalizeProps;
    exports2.normalizeStyle = shared.normalizeStyle;
    exports2.toDisplayString = shared.toDisplayString;
    exports2.toHandlerKey = shared.toHandlerKey;
    exports2.BaseTransition = BaseTransition;
    exports2.Comment = Comment;
    exports2.Fragment = Fragment;
    exports2.KeepAlive = KeepAlive;
    exports2.Static = Static;
    exports2.Suspense = Suspense;
    exports2.Teleport = Teleport;
    exports2.Text = Text;
    exports2.callWithAsyncErrorHandling = callWithAsyncErrorHandling;
    exports2.callWithErrorHandling = callWithErrorHandling;
    exports2.cloneVNode = cloneVNode;
    exports2.compatUtils = compatUtils;
    exports2.computed = computed;
    exports2.createBlock = createBlock;
    exports2.createCommentVNode = createCommentVNode;
    exports2.createElementBlock = createElementBlock;
    exports2.createElementVNode = createBaseVNode;
    exports2.createHydrationRenderer = createHydrationRenderer;
    exports2.createPropsRestProxy = createPropsRestProxy;
    exports2.createRenderer = createRenderer;
    exports2.createSlots = createSlots;
    exports2.createStaticVNode = createStaticVNode;
    exports2.createTextVNode = createTextVNode;
    exports2.createVNode = createVNode;
    exports2.defineAsyncComponent = defineAsyncComponent;
    exports2.defineComponent = defineComponent;
    exports2.defineEmits = defineEmits;
    exports2.defineExpose = defineExpose;
    exports2.defineProps = defineProps;
    exports2.getCurrentInstance = getCurrentInstance;
    exports2.getTransitionRawChildren = getTransitionRawChildren;
    exports2.guardReactiveProps = guardReactiveProps;
    exports2.h = h;
    exports2.handleError = handleError;
    exports2.initCustomFormatter = initCustomFormatter;
    exports2.inject = inject;
    exports2.isMemoSame = isMemoSame;
    exports2.isRuntimeOnly = isRuntimeOnly;
    exports2.isVNode = isVNode;
    exports2.mergeDefaults = mergeDefaults;
    exports2.mergeProps = mergeProps;
    exports2.nextTick = nextTick2;
    exports2.onActivated = onActivated;
    exports2.onBeforeMount = onBeforeMount;
    exports2.onBeforeUnmount = onBeforeUnmount;
    exports2.onBeforeUpdate = onBeforeUpdate;
    exports2.onDeactivated = onDeactivated;
    exports2.onErrorCaptured = onErrorCaptured;
    exports2.onMounted = onMounted;
    exports2.onRenderTracked = onRenderTracked;
    exports2.onRenderTriggered = onRenderTriggered;
    exports2.onServerPrefetch = onServerPrefetch;
    exports2.onUnmounted = onUnmounted;
    exports2.onUpdated = onUpdated;
    exports2.openBlock = openBlock;
    exports2.popScopeId = popScopeId;
    exports2.provide = provide;
    exports2.pushScopeId = pushScopeId;
    exports2.queuePostFlushCb = queuePostFlushCb;
    exports2.registerRuntimeCompiler = registerRuntimeCompiler;
    exports2.renderList = renderList;
    exports2.renderSlot = renderSlot;
    exports2.resolveComponent = resolveComponent;
    exports2.resolveDirective = resolveDirective;
    exports2.resolveDynamicComponent = resolveDynamicComponent;
    exports2.resolveFilter = resolveFilter;
    exports2.resolveTransitionHooks = resolveTransitionHooks;
    exports2.setBlockTracking = setBlockTracking;
    exports2.setDevtoolsHook = setDevtoolsHook;
    exports2.setTransitionHooks = setTransitionHooks;
    exports2.ssrContextKey = ssrContextKey;
    exports2.ssrUtils = ssrUtils;
    exports2.toHandlers = toHandlers;
    exports2.transformVNodeArgs = transformVNodeArgs;
    exports2.useAttrs = useAttrs;
    exports2.useSSRContext = useSSRContext;
    exports2.useSlots = useSlots;
    exports2.useTransitionState = useTransitionState;
    exports2.version = version;
    exports2.warn = warn;
    exports2.watch = watch;
    exports2.watchEffect = watchEffect;
    exports2.watchPostEffect = watchPostEffect;
    exports2.watchSyncEffect = watchSyncEffect;
    exports2.withAsyncContext = withAsyncContext;
    exports2.withCtx = withCtx;
    exports2.withDefaults = withDefaults;
    exports2.withDirectives = withDirectives;
    exports2.withMemo = withMemo;
    exports2.withScopeId = withScopeId;
  }
});

// ../node_modules/@vue/runtime-core/index.js
var require_runtime_core = __commonJS({
  "../node_modules/@vue/runtime-core/index.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_runtime_core_cjs_prod();
    } else {
      module2.exports = require_runtime_core_cjs();
    }
  }
});

// ../node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "../node_modules/ws/lib/stream.js"(exports2, module2) {
    "use strict";
    var { Duplex } = require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream2(ws, options) {
      let terminateOnDestroy = true;
      const duplex = new Duplex({
        ...options,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", function message(msg, isBinary) {
        const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
        if (!duplex.push(data))
          ws.pause();
      });
      ws.once("error", function error(err) {
        if (duplex.destroyed)
          return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed)
          return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called)
            callback(err);
          process.nextTick(emitClose, duplex);
        });
        if (terminateOnDestroy)
          ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null)
          return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted)
            duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if (ws.isPaused)
          ws.resume();
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module2.exports = createWebSocketStream2;
  }
});

// ../node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "../node_modules/ws/lib/constants.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
      kListener: Symbol("kListener"),
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      NOOP: () => {
      }
    };
  }
});

// ../node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "../node_modules/ws/lib/buffer-util.js"(exports2, module2) {
    "use strict";
    var { EMPTY_BUFFER } = require_constants();
    function concat(list, totalLength) {
      if (list.length === 0)
        return EMPTY_BUFFER;
      if (list.length === 1)
        return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i = 0; i < list.length; i++) {
        const buf = list[i];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength)
        return target.slice(0, offset);
      return target;
    }
    function _mask(source, mask, output, offset, length) {
      for (let i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.byteLength === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data))
        return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    module2.exports = {
      concat,
      mask: _mask,
      toArrayBuffer,
      toBuffer,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL) {
      try {
        const bufferUtil = require("bufferutil");
        module2.exports.mask = function(source, mask, output, offset, length) {
          if (length < 48)
            _mask(source, mask, output, offset, length);
          else
            bufferUtil.mask(source, mask, output, offset, length);
        };
        module2.exports.unmask = function(buffer, mask) {
          if (buffer.length < 32)
            _unmask(buffer, mask);
          else
            bufferUtil.unmask(buffer, mask);
        };
      } catch (e) {
      }
    }
  }
});

// ../node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "../node_modules/ws/lib/limiter.js"(exports2, module2) {
    "use strict";
    var kDone = Symbol("kDone");
    var kRun = Symbol("kRun");
    var Limiter = class {
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      [kRun]() {
        if (this.pending === this.concurrency)
          return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module2.exports = Limiter;
  }
});

// ../node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "../node_modules/ws/lib/permessage-deflate.js"(exports2, module2) {
    "use strict";
    var zlib = require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode } = require_constants();
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = Symbol("permessage-deflate");
    var kTotalLength = Symbol("total-length");
    var kCallback = Symbol("callback");
    var kBuffers = Symbol("buffers");
    var kError = Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate = class {
      constructor(options, isServer, maxPayload) {
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      static get extensionName() {
        return "permessage-deflate";
      }
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(new Error("The deflate stream was closed while data was being processed"));
          }
        }
      }
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error('Unexpected or invalid parameter "client_max_window_bits"');
        }
        return params;
      }
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin)
          this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(this._inflate[kBuffers], this._inflate[kTotalLength]);
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(this._deflate[kBuffers], this._deflate[kTotalLength]);
          if (fin)
            data2 = data2.slice(0, data2.length - 4);
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module2.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});

// ../node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "../node_modules/ws/lib/validation.js"(exports2, module2) {
    "use strict";
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
    ];
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    module2.exports = {
      isValidStatusCode,
      isValidUTF8: _isValidUTF8,
      tokenChars
    };
    if (!process.env.WS_NO_UTF_8_VALIDATE) {
      try {
        const isValidUTF8 = require("utf-8-validate");
        module2.exports.isValidUTF8 = function(buf) {
          return buf.length < 150 ? _isValidUTF8(buf) : isValidUTF8(buf);
        };
      } catch (e) {
      }
    }
  }
});

// ../node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "../node_modules/ws/lib/receiver.js"(exports2, module2) {
    "use strict";
    var { Writable } = require("stream");
    var PerMessageDeflate = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var Receiver2 = class extends Writable {
      constructor(options = {}) {
        super();
        this._binaryType = options.binaryType || BINARY_TYPES[0];
        this._extensions = options.extensions || {};
        this._isServer = !!options.isServer;
        this._maxPayload = options.maxPayload | 0;
        this._skipUTF8Validation = !!options.skipUTF8Validation;
        this[kWebSocket] = void 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._state = GET_INFO;
        this._loop = false;
      }
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO)
          return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length)
          return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = buf.slice(n);
          return buf.slice(0, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = buf.slice(n);
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      startLoop(cb) {
        let err;
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              err = this.getInfo();
              break;
            case GET_PAYLOAD_LENGTH_16:
              err = this.getPayloadLength16();
              break;
            case GET_PAYLOAD_LENGTH_64:
              err = this.getPayloadLength64();
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              err = this.getData(cb);
              break;
            default:
              this._loop = false;
              return;
          }
        } while (this._loop);
        cb(err);
      }
      getInfo() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          this._loop = false;
          return error(RangeError, "RSV2 and RSV3 must be clear", true, 1002, "WS_ERR_UNEXPECTED_RSV_2_3");
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
          this._loop = false;
          return error(RangeError, "RSV1 must be clear", true, 1002, "WS_ERR_UNEXPECTED_RSV_1");
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            this._loop = false;
            return error(RangeError, "RSV1 must be clear", true, 1002, "WS_ERR_UNEXPECTED_RSV_1");
          }
          if (!this._fragmented) {
            this._loop = false;
            return error(RangeError, "invalid opcode 0", true, 1002, "WS_ERR_INVALID_OPCODE");
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            this._loop = false;
            return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002, "WS_ERR_INVALID_OPCODE");
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            this._loop = false;
            return error(RangeError, "FIN must be set", true, 1002, "WS_ERR_EXPECTED_FIN");
          }
          if (compressed) {
            this._loop = false;
            return error(RangeError, "RSV1 must be clear", true, 1002, "WS_ERR_UNEXPECTED_RSV_1");
          }
          if (this._payloadLength > 125) {
            this._loop = false;
            return error(RangeError, `invalid payload length ${this._payloadLength}`, true, 1002, "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");
          }
        } else {
          this._loop = false;
          return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002, "WS_ERR_INVALID_OPCODE");
        }
        if (!this._fin && !this._fragmented)
          this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            this._loop = false;
            return error(RangeError, "MASK must be set", true, 1002, "WS_ERR_EXPECTED_MASK");
          }
        } else if (this._masked) {
          this._loop = false;
          return error(RangeError, "MASK must be clear", true, 1002, "WS_ERR_UNEXPECTED_MASK");
        }
        if (this._payloadLength === 126)
          this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127)
          this._state = GET_PAYLOAD_LENGTH_64;
        else
          return this.haveLength();
      }
      getPayloadLength16() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        return this.haveLength();
      }
      getPayloadLength64() {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          this._loop = false;
          return error(RangeError, "Unsupported WebSocket frame: payload length > 2^53 - 1", false, 1009, "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        return this.haveLength();
      }
      haveLength() {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            this._loop = false;
            return error(RangeError, "Max payload size exceeded", false, 1009, "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");
          }
        }
        if (this._masked)
          this._state = GET_MASK;
        else
          this._state = GET_DATA;
      }
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
            unmask(data, this._mask);
          }
        }
        if (this._opcode > 7)
          return this.controlMessage(data);
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        return this.dataMessage();
      }
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err)
            return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              return cb(error(RangeError, "Max payload size exceeded", false, 1009, "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"));
            }
            this._fragments.push(buf);
          }
          const er = this.dataMessage();
          if (er)
            return cb(er);
          this.startLoop(cb);
        });
      }
      dataMessage() {
        if (this._fin) {
          const messageLength = this._messageLength;
          const fragments = this._fragments;
          this._totalPayloadLength = 0;
          this._messageLength = 0;
          this._fragmented = 0;
          this._fragments = [];
          if (this._opcode === 2) {
            let data;
            if (this._binaryType === "nodebuffer") {
              data = concat(fragments, messageLength);
            } else if (this._binaryType === "arraybuffer") {
              data = toArrayBuffer(concat(fragments, messageLength));
            } else {
              data = fragments;
            }
            this.emit("message", data, true);
          } else {
            const buf = concat(fragments, messageLength);
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              this._loop = false;
              return error(Error, "invalid UTF-8 sequence", true, 1007, "WS_ERR_INVALID_UTF8");
            }
            this.emit("message", buf, false);
          }
        }
        this._state = GET_INFO;
      }
      controlMessage(data) {
        if (this._opcode === 8) {
          this._loop = false;
          if (data.length === 0) {
            this.emit("conclude", 1005, EMPTY_BUFFER);
            this.end();
          } else if (data.length === 1) {
            return error(RangeError, "invalid payload length 1", true, 1002, "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              return error(RangeError, `invalid status code ${code}`, true, 1002, "WS_ERR_INVALID_CLOSE_CODE");
            }
            const buf = data.slice(2);
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              return error(Error, "invalid UTF-8 sequence", true, 1007, "WS_ERR_INVALID_UTF8");
            }
            this.emit("conclude", code, buf);
            this.end();
          }
        } else if (this._opcode === 9) {
          this.emit("ping", data);
        } else {
          this.emit("pong", data);
        }
        this._state = GET_INFO;
      }
    };
    module2.exports = Receiver2;
    function error(ErrorCtor, message, prefix, statusCode, errorCode) {
      const err = new ErrorCtor(prefix ? `Invalid WebSocket frame: ${message}` : message);
      Error.captureStackTrace(err, error);
      err.code = errorCode;
      err[kStatusCode] = statusCode;
      return err;
    }
  }
});

// ../node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "../node_modules/ws/lib/sender.js"(exports2, module2) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var { randomFillSync } = require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var { EMPTY_BUFFER } = require_constants();
    var { isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var kByteLength = Symbol("kByteLength");
    var maskBuffer = Buffer.alloc(4);
    var Sender2 = class {
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {};
        if (generateMask) {
          this._generateMask = generateMask;
          this._maskBuffer = Buffer.alloc(4);
        }
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._deflating = false;
        this._queue = [];
      }
      static frame(data, options) {
        let mask;
        let merge = false;
        let offset = 2;
        let skipMasking = false;
        if (options.mask) {
          mask = options.maskBuffer || maskBuffer;
          if (options.generateMask) {
            options.generateMask(mask);
          } else {
            randomFillSync(mask, 0, 4);
          }
          skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
          offset = 6;
        }
        let dataLength;
        if (typeof data === "string") {
          if ((!options.mask || skipMasking) && options[kByteLength] !== void 0) {
            dataLength = options[kByteLength];
          } else {
            data = Buffer.from(data);
            dataLength = data.length;
          }
        } else {
          dataLength = data.length;
          merge = options.mask && options.readOnly && !skipMasking;
        }
        let payloadLength = dataLength;
        if (dataLength >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (dataLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1)
          target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(dataLength, 2);
        } else if (payloadLength === 127) {
          target[2] = target[3] = 0;
          target.writeUIntBE(dataLength, 4, 6);
        }
        if (!options.mask)
          return [target, data];
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (skipMasking)
          return [target, data];
        if (merge) {
          applyMask(data, mask, target, offset, dataLength);
          return [target];
        }
        applyMask(data, mask, data, 0, dataLength);
        return [target, data];
      }
      close(code, data, mask, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || !data.length) {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code, 0);
          if (typeof data === "string") {
            buf.write(data, 2);
          } else {
            buf.set(data, 2);
          }
        }
        const options = {
          [kByteLength]: buf.length,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: false,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, buf, false, options, cb]);
        } else {
          this.sendFrame(Sender2.frame(buf, options), cb);
        }
      }
      ping(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(Sender2.frame(data, options), cb);
        }
      }
      pong(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(Sender2.frame(data, options), cb);
        }
      }
      send(data, options, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
            rsv1 = byteLength >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin)
          this._firstFragment = true;
        if (perMessageDeflate) {
          const opts = {
            [kByteLength]: byteLength,
            fin: options.fin,
            generateMask: this._generateMask,
            mask: options.mask,
            maskBuffer: this._maskBuffer,
            opcode,
            readOnly,
            rsv1
          };
          if (this._deflating) {
            this.enqueue([this.dispatch, data, this._compress, opts, cb]);
          } else {
            this.dispatch(data, this._compress, opts, cb);
          }
        } else {
          this.sendFrame(Sender2.frame(data, {
            [kByteLength]: byteLength,
            fin: options.fin,
            generateMask: this._generateMask,
            mask: options.mask,
            maskBuffer: this._maskBuffer,
            opcode,
            readOnly,
            rsv1: false
          }), cb);
        }
      }
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(Sender2.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        this._bufferedBytes += options[kByteLength];
        this._deflating = true;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error("The socket was closed while data was being compressed");
            if (typeof cb === "function")
              cb(err);
            for (let i = 0; i < this._queue.length; i++) {
              const params = this._queue[i];
              const callback = params[params.length - 1];
              if (typeof callback === "function")
                callback(err);
            }
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          this._deflating = false;
          options.readOnly = false;
          this.sendFrame(Sender2.frame(buf, options), cb);
          this.dequeue();
        });
      }
      dequeue() {
        while (!this._deflating && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength];
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength];
        this._queue.push(params);
      }
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module2.exports = Sender2;
  }
});

// ../node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "../node_modules/ws/lib/event-target.js"(exports2, module2) {
    "use strict";
    var { kForOnEventAttribute, kListener } = require_constants();
    var kCode = Symbol("kCode");
    var kData = Symbol("kData");
    var kError = Symbol("kError");
    var kMessage = Symbol("kMessage");
    var kReason = Symbol("kReason");
    var kTarget = Symbol("kTarget");
    var kType = Symbol("kType");
    var kWasClean = Symbol("kWasClean");
    var Event = class {
      constructor(type) {
        this[kTarget] = null;
        this[kType] = type;
      }
      get target() {
        return this[kTarget];
      }
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: true });
    Object.defineProperty(Event.prototype, "type", { enumerable: true });
    var CloseEvent = class extends Event {
      constructor(type, options = {}) {
        super(type);
        this[kCode] = options.code === void 0 ? 0 : options.code;
        this[kReason] = options.reason === void 0 ? "" : options.reason;
        this[kWasClean] = options.wasClean === void 0 ? false : options.wasClean;
      }
      get code() {
        return this[kCode];
      }
      get reason() {
        return this[kReason];
      }
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
    var ErrorEvent = class extends Event {
      constructor(type, options = {}) {
        super(type);
        this[kError] = options.error === void 0 ? null : options.error;
        this[kMessage] = options.message === void 0 ? "" : options.message;
      }
      get error() {
        return this[kError];
      }
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
    var MessageEvent = class extends Event {
      constructor(type, options = {}) {
        super(type);
        this[kData] = options.data === void 0 ? null : options.data;
      }
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
    var EventTarget = {
      addEventListener(type, listener, options = {}) {
        let wrapper;
        if (type === "message") {
          wrapper = function onMessage(data, isBinary) {
            const event = new MessageEvent("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this;
            listener.call(this, event);
          };
        } else if (type === "close") {
          wrapper = function onClose(code, message) {
            const event = new CloseEvent("close", {
              code,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this;
            listener.call(this, event);
          };
        } else if (type === "error") {
          wrapper = function onError(error) {
            const event = new ErrorEvent("error", {
              error,
              message: error.message
            });
            event[kTarget] = this;
            listener.call(this, event);
          };
        } else if (type === "open") {
          wrapper = function onOpen() {
            const event = new Event("open");
            event[kTarget] = this;
            listener.call(this, event);
          };
        } else {
          return;
        }
        wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
        wrapper[kListener] = listener;
        if (options.once) {
          this.once(type, wrapper);
        } else {
          this.on(type, wrapper);
        }
      },
      removeEventListener(type, handler) {
        for (const listener of this.listeners(type)) {
          if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            this.removeListener(type, listener);
            break;
          }
        }
      }
    };
    module2.exports = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent
    };
  }
});

// ../node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "../node_modules/ws/lib/extension.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function push(dest, name, elem) {
      if (dest[name] === void 0)
        dest[name] = [elem];
      else
        dest[name].push(elem);
    }
    function parse(header) {
      const offers = Object.create(null);
      let params = Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let code = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (i !== 0 && (code === 32 || code === 9)) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1)
              start = i;
            else if (!mustUnescape)
              mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1)
                start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes || code === 32 || code === 9) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1)
        end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension) => {
        let configurations = extensions[extension];
        if (!Array.isArray(configurations))
          configurations = [configurations];
        return configurations.map((params) => {
          return [extension].concat(Object.keys(params).map((k) => {
            let values = params[k];
            if (!Array.isArray(values))
              values = [values];
            return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
          })).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module2.exports = { format, parse };
  }
});

// ../node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "../node_modules/ws/lib/websocket.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var https = require("https");
    var http = require("http");
    var net = require("net");
    var tls = require("tls");
    var { randomBytes, createHash } = require("crypto");
    var { Readable } = require("stream");
    var { URL } = require("url");
    var PerMessageDeflate = require_permessage_deflate();
    var Receiver2 = require_receiver();
    var Sender2 = require_sender();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      GUID,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var {
      EventTarget: { addEventListener, removeEventListener }
    } = require_event_target();
    var { format, parse } = require_extension();
    var { toBuffer } = require_buffer_util();
    var closeTimeout = 30 * 1e3;
    var kAborted = Symbol("kAborted");
    var protocolVersions = [8, 13];
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    var WebSocket3 = class extends EventEmitter {
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = EMPTY_BUFFER;
        this._closeTimer = null;
        this._extensions = {};
        this._paused = false;
        this._protocol = "";
        this._readyState = WebSocket3.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (protocols === void 0) {
            protocols = [];
          } else if (!Array.isArray(protocols)) {
            if (typeof protocols === "object" && protocols !== null) {
              options = protocols;
              protocols = [];
            } else {
              protocols = [protocols];
            }
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._isServer = true;
        }
      }
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type))
          return;
        this._binaryType = type;
        if (this._receiver)
          this._receiver._binaryType = type;
      }
      get bufferedAmount() {
        if (!this._socket)
          return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      get isPaused() {
        return this._paused;
      }
      get onclose() {
        return null;
      }
      get onerror() {
        return null;
      }
      get onopen() {
        return null;
      }
      get onmessage() {
        return null;
      }
      get protocol() {
        return this._protocol;
      }
      get readyState() {
        return this._readyState;
      }
      get url() {
        return this._url;
      }
      setSocket(socket, head, options) {
        const receiver = new Receiver2({
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: options.maxPayload,
          skipUTF8Validation: options.skipUTF8Validation
        });
        this._sender = new Sender2(socket, this._extensions, options.generateMask);
        this._receiver = receiver;
        this._socket = socket;
        receiver[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        socket.setTimeout(0);
        socket.setNoDelay();
        if (head.length > 0)
          socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = WebSocket3.OPEN;
        this.emit("open");
      }
      emitClose() {
        if (!this._socket) {
          this._readyState = WebSocket3.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate.extensionName]) {
          this._extensions[PerMessageDeflate.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = WebSocket3.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      close(code, data) {
        if (this.readyState === WebSocket3.CLOSED)
          return;
        if (this.readyState === WebSocket3.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this.readyState === WebSocket3.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = WebSocket3.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err)
            return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        this._closeTimer = setTimeout(this._socket.destroy.bind(this._socket), closeTimeout);
      }
      pause() {
        if (this.readyState === WebSocket3.CONNECTING || this.readyState === WebSocket3.CLOSED) {
          return;
        }
        this._paused = true;
        this._socket.pause();
      }
      ping(data, mask, cb) {
        if (this.readyState === WebSocket3.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket3.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      pong(data, mask, cb) {
        if (this.readyState === WebSocket3.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket3.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      resume() {
        if (this.readyState === WebSocket3.CONNECTING || this.readyState === WebSocket3.CLOSED) {
          return;
        }
        this._paused = false;
        if (!this._receiver._writableState.needDrain)
          this._socket.resume();
      }
      send(data, options, cb) {
        if (this.readyState === WebSocket3.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket3.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      terminate() {
        if (this.readyState === WebSocket3.CLOSED)
          return;
        if (this.readyState === WebSocket3.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this._socket) {
          this._readyState = WebSocket3.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket3, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket3.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket3, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket3.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket3, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket3.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket3, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket3.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket3.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket3.prototype, `on${method}`, {
        enumerable: true,
        get() {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute])
              return listener[kListener];
          }
          return null;
        },
        set(handler) {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          }
          if (typeof handler !== "function")
            return;
          this.addEventListener(method, handler, {
            [kForOnEventAttribute]: true
          });
        }
      });
    });
    WebSocket3.prototype.addEventListener = addEventListener;
    WebSocket3.prototype.removeEventListener = removeEventListener;
    module2.exports = WebSocket3;
    function initAsClient(websocket, address, protocols, options) {
      const opts = {
        protocolVersion: protocolVersions[1],
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: false,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options,
        createConnection: void 0,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: "GET",
        host: void 0,
        path: void 0,
        port: void 0
      };
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(`Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`);
      }
      let parsedUrl;
      if (address instanceof URL) {
        parsedUrl = address;
        websocket._url = address.href;
      } else {
        try {
          parsedUrl = new URL(address);
        } catch (e) {
          throw new SyntaxError(`Invalid URL: ${address}`);
        }
        websocket._url = address;
      }
      const isSecure = parsedUrl.protocol === "wss:";
      const isIpcUrl = parsedUrl.protocol === "ws+unix:";
      let invalidUrlMessage;
      if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
        invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", or "ws+unix:"`;
      } else if (isIpcUrl && !parsedUrl.pathname) {
        invalidUrlMessage = "The URL's pathname is empty";
      } else if (parsedUrl.hash) {
        invalidUrlMessage = "The URL contains a fragment identifier";
      }
      if (invalidUrlMessage) {
        const err = new SyntaxError(invalidUrlMessage);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const defaultPort = isSecure ? 443 : 80;
      const key = randomBytes(16).toString("base64");
      const request = isSecure ? https.request : http.request;
      const protocolSet = new Set();
      let perMessageDeflate;
      opts.createConnection = isSecure ? tlsConnect : netConnect;
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        ...opts.headers,
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key,
        Connection: "Upgrade",
        Upgrade: "websocket"
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate(opts.perMessageDeflate !== true ? opts.perMessageDeflate : {}, false, opts.maxPayload);
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols.length) {
        for (const protocol of protocols) {
          if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
            throw new SyntaxError("An invalid or duplicated subprotocol was specified");
          }
          protocolSet.add(protocol);
        }
        opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isIpcUrl) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      let req;
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalIpc = isIpcUrl;
          websocket._originalSecure = isSecure;
          websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
          const headers = options && options.headers;
          options = { ...options, headers: {} };
          if (headers) {
            for (const [key2, value] of Object.entries(headers)) {
              options.headers[key2.toLowerCase()] = value;
            }
          }
        } else if (websocket.listenerCount("redirect") === 0) {
          const isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalIpc ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
          if (!isSameHost || websocket._originalSecure && !isSecure) {
            delete opts.headers.authorization;
            delete opts.headers.cookie;
            if (!isSameHost)
              delete opts.headers.host;
            opts.auth = void 0;
          }
        }
        if (opts.auth && !options.headers.authorization) {
          options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
        req = websocket._req = request(opts);
        if (websocket._redirects) {
          websocket.emit("redirect", websocket.url, req);
        }
      } else {
        req = websocket._req = request(opts);
      }
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req[kAborted])
          return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL(location, address);
          } catch (e) {
            const err = new SyntaxError(`Invalid URL: ${location}`);
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(websocket, req, `Unexpected server response: ${res.statusCode}`);
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket3.CONNECTING)
          return;
        req = websocket._req = null;
        if (res.headers.upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        let protError;
        if (serverProt !== void 0) {
          if (!protocolSet.size) {
            protError = "Server sent a subprotocol but none was requested";
          } else if (!protocolSet.has(serverProt)) {
            protError = "Server sent an invalid subprotocol";
          }
        } else if (protocolSet.size) {
          protError = "Server sent no subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt)
          websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
            const message = "Server indicated an extension that was not requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          try {
            perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
        websocket.setSocket(socket, head, {
          generateMask: opts.generateMask,
          maxPayload: opts.maxPayload,
          skipUTF8Validation: opts.skipUTF8Validation
        });
      });
      req.end();
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket3.CLOSING;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket3.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream[kAborted] = true;
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        process.nextTick(emitErrorAndClose, websocket, err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length = toBuffer(data).length;
        if (websocket._socket)
          websocket._sender._bufferedBytes += length;
        else
          websocket._bufferedAmount += length;
      }
      if (cb) {
        const err = new Error(`WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`);
        cb(err);
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (websocket._socket[kWebSocket] === void 0)
        return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code === 1005)
        websocket.close();
      else
        websocket.close(code, reason);
    }
    function receiverOnDrain() {
      const websocket = this[kWebSocket];
      if (!websocket.isPaused)
        websocket._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      websocket.emit("error", err);
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data, isBinary) {
      this[kWebSocket].emit("message", data, isBinary);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      websocket.pong(data, !websocket._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket3.CLOSING;
      let chunk;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && (chunk = websocket._socket.read()) !== null) {
        websocket._receiver.write(chunk);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket3.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket3.CLOSING;
        this.destroy();
      }
    }
  }
});

// ../node_modules/ws/lib/subprotocol.js
var require_subprotocol = __commonJS({
  "../node_modules/ws/lib/subprotocol.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function parse(header) {
      const protocols = new Set();
      let start = -1;
      let end = -1;
      let i = 0;
      for (i; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1)
            start = i;
        } else if (i !== 0 && (code === 32 || code === 9)) {
          if (end === -1 && start !== -1)
            end = i;
        } else if (code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1)
            end = i;
          const protocol2 = header.slice(start, end);
          if (protocols.has(protocol2)) {
            throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
          }
          protocols.add(protocol2);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
      if (start === -1 || end !== -1) {
        throw new SyntaxError("Unexpected end of input");
      }
      const protocol = header.slice(start, i);
      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }
      protocols.add(protocol);
      return protocols;
    }
    module2.exports = { parse };
  }
});

// ../node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "../node_modules/ws/lib/websocket-server.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var http = require("http");
    var https = require("https");
    var net = require("net");
    var tls = require("tls");
    var { createHash } = require("crypto");
    var extension = require_extension();
    var PerMessageDeflate = require_permessage_deflate();
    var subprotocol = require_subprotocol();
    var WebSocket3 = require_websocket();
    var { GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer2 = class extends EventEmitter {
      constructor(options, callback) {
        super();
        options = {
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null,
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket: WebSocket3,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');
        }
        if (options.port != null) {
          this._server = http.createServer((req, res) => {
            const body = http.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(options.port, options.host, options.backlog, callback);
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true)
          options.perMessageDeflate = {};
        if (options.clientTracking) {
          this.clients = new Set();
          this._shouldEmitClose = false;
        }
        this.options = options;
        this._state = RUNNING;
      }
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server)
          return null;
        return this._server.address();
      }
      close(cb) {
        if (this._state === CLOSED) {
          if (cb) {
            this.once("close", () => {
              cb(new Error("The server is not running"));
            });
          }
          process.nextTick(emitClose, this);
          return;
        }
        if (cb)
          this.once("close", cb);
        if (this._state === CLOSING)
          return;
        this._state = CLOSING;
        if (this.options.noServer || this.options.server) {
          if (this._server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
          }
          if (this.clients) {
            if (!this.clients.size) {
              process.nextTick(emitClose, this);
            } else {
              this._shouldEmitClose = true;
            }
          } else {
            process.nextTick(emitClose, this);
          }
        } else {
          const server = this._server;
          this._removeListeners();
          this._removeListeners = this._server = null;
          server.close(() => {
            emitClose(this);
          });
        }
      }
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path)
            return false;
        }
        return true;
      }
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"];
        const version = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          const message = "Invalid HTTP method";
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
          return;
        }
        if (req.headers.upgrade.toLowerCase() !== "websocket") {
          const message = "Invalid Upgrade header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (!key || !keyRegex.test(key)) {
          const message = "Missing or invalid Sec-WebSocket-Key header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (version !== 8 && version !== 13) {
          const message = "Missing or invalid Sec-WebSocket-Version header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
        let protocols = new Set();
        if (secWebSocketProtocol !== void 0) {
          try {
            protocols = subprotocol.parse(secWebSocketProtocol);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Protocol header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
        const extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          const perMessageDeflate = new PerMessageDeflate(this.options.perMessageDeflate, true, this.options.maxPayload);
          try {
            const offers = extension.parse(secWebSocketExtensions);
            if (offers[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
              extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
            });
            return;
          }
          if (!this.options.verifyClient(info))
            return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
      }
      completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
        if (!socket.readable || !socket.writable)
          return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");
        }
        if (this._state > RUNNING)
          return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new this.options.WebSocket(null);
        if (protocols.size) {
          const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate.extensionName]) {
          const params = extensions[PerMessageDeflate.extensionName].params;
          const value = extension.format({
            [PerMessageDeflate.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, {
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        });
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => {
            this.clients.delete(ws);
            if (this._shouldEmitClose && !this.clients.size) {
              process.nextTick(emitClose, this);
            }
          });
        }
        cb(ws, req);
      }
    };
    module2.exports = WebSocketServer2;
    function addListeners(server, map) {
      for (const event of Object.keys(map))
        server.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server) {
      server._state = CLOSED;
      server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      message = message || http.STATUS_CODES[code];
      headers = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(message),
        ...headers
      };
      socket.once("finish", socket.destroy);
      socket.end(`HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message);
    }
    function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
      if (server.listenerCount("wsClientError")) {
        const err = new Error(message);
        Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
        server.emit("wsClientError", err, socket, req);
      } else {
        abortHandshake(socket, code, message);
      }
    }
  }
});

// src/test.ts
var test_exports = {};
__export(test_exports, {
  booleans: () => booleans,
  collection_in_ref: () => collection_in_ref,
  collections: () => collections,
  empty: () => empty,
  numbers: () => numbers,
  objects: () => objects,
  ref_in_collections: () => ref_in_collections,
  refs: () => refs,
  strings: () => strings
});

// ../node_modules/@mfro/assert/lib.ts
function assert(condition, message) {
  if (!condition) {
    debugger;
    throw new Error(message);
  }
}

// ../client/src/core.ts
var import_reactivity2 = __toModule(require_reactivity());
var import_runtime_core = __toModule(require_runtime_core());

// ../client/src/path.ts
var import_reactivity = __toModule(require_reactivity());
var Path;
(function(Path2) {
  function resolve(root, path) {
    let node = root;
    for (const key of path) {
      assert(key in node, "invalid node");
      node = (0, import_reactivity.toRaw)(node[key]);
    }
    return node;
  }
  Path2.resolve = resolve;
  function parse(path) {
    assert(path[0] == "/", "valid path");
    return path.slice(1).split("/").map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"));
  }
  Path2.parse = parse;
  function toString(path) {
    return "/" + path.map((n) => n.replace(/~/g, "~0").replace(/\//g, "~1")).join("/");
  }
  Path2.toString = toString;
})(Path || (Path = {}));

// ../client/src/core.ts
var import_shared = __toModule(require_shared());
var VueTrackOps = {
  GET: "get",
  HAS: "has",
  ITERATE: "iterate"
};
var VueTriggerOps = {
  SET: "set",
  ADD: "add",
  DELETE: "delete",
  CLEAR: "clear"
};
var Fields = {
  RAW: "__v_raw",
  path: "__mfro_path",
  context: "__mfro_context"
};
var Adapt = class {
  constructor(inner) {
    this.inner = inner;
  }
  get value() {
    return this.inner[1];
  }
  get [Fields.RAW]() {
    return this.inner;
  }
  get [Fields.path]() {
    return this.inner[Fields.path];
  }
  get [Fields.context]() {
    return this.inner[Fields.context];
  }
  toJSON() {
    return this[Fields.RAW];
  }
  static register(name, adapter) {
    registerLoadAdapter(name, (inner) => new adapter(inner));
  }
};
var loadAdapters = new Map();
var proxyCache = new WeakMap();
var rawJSON = false;
function stringify(value) {
  rawJSON = true;
  const json = JSON.stringify(value);
  rawJSON = false;
  return json;
}
function flush(context) {
  context.version += 1;
  context.speculation += 1;
  context.ws.send(stringify({
    version: context.version,
    changes: context.changes
  }));
  context.changes.length = 0;
}
function init(ws, ...args) {
  let [cacheKey, version, root] = args.length == 0 ? ["", 0, {}] : args;
  return new Promise((resolve) => {
    const context = {
      ws,
      version,
      speculation: 0,
      changes: [],
      root,
      cacheKey
    };
    ws.addEventListener("close", (e) => console.log(e));
    ws.addEventListener("error", (e) => console.log(e));
    ws.addEventListener("message", (e) => {
      const message = JSON.parse(e.data);
      if ("id" in message) {
        context.cacheKey = `mfro:sync:${message.id}`;
      }
      applyUpdate(context, message);
      if ("id" in message) {
        resolve({
          data: createValue(context, "", root),
          id: message.id
        });
      }
    });
  });
}
function applyUpdate(context, update2) {
  if (update2.changes) {
    assert(context.speculation == 0, "speculation");
    for (const { target, value } of update2.changes) {
      applyChange(context, target, value);
    }
    context.version = update2.version;
  } else {
    assert(context.speculation > 0, "speculation");
    context.speculation -= 1;
  }
  localStorage.setItem(context.cacheKey, stringify({
    version: context.version,
    root: context.root
  }));
}
function applyChange(context, target, value) {
  const path = Path.parse(target);
  const receiver = (0, import_reactivity2.toRaw)(Path.resolve(context.root, path.slice(0, -1)));
  const lastKey = path[path.length - 1];
  if (value === void 0) {
    delete receiver[lastKey];
    (0, import_reactivity2.trigger)(receiver, VueTriggerOps.DELETE, lastKey);
  } else {
    const hadKey = lastKey in receiver;
    receiver[lastKey] = value;
    (0, import_reactivity2.trigger)(receiver, hadKey ? VueTriggerOps.SET : VueTriggerOps.ADD, lastKey);
  }
}
function createValue(context, path, target) {
  assert(typeof target == "object" && target != null, "createValue");
  const raw = (0, import_reactivity2.toRaw)(target);
  if (raw[Fields.path] && raw[Fields.path] !== path) {
    return ["ref", raw[Fields.path]];
  }
  const existing = proxyCache.get(raw);
  if (existing)
    return existing;
  Object.defineProperties(raw, {
    [Fields.path]: {
      value: path,
      writable: false,
      enumerable: false,
      configurable: false
    },
    [Fields.context]: {
      value: context,
      writable: false,
      enumerable: false,
      configurable: false
    }
  });
  const proxy = new Proxy(raw, proxyHandler);
  if (Array.isArray(raw)) {
    assert(raw.length == 2 && typeof raw[0] == "string", "adapter");
    const adapter = loadAdapters.get(raw[0]);
    assert(adapter != null, "adapter");
    const value = adapter(proxy);
    return value;
  } else {
    proxyCache.set(raw, proxy);
    return proxy;
  }
}
function registerLoadAdapter(name, load) {
  assert(!loadAdapters.has(name), `duplicate adapter definition ${name}`);
  loadAdapters.set(name, load);
}
function update(context, target, value) {
  if ((0, import_shared.isObject)(value)) {
    value = createValue(context, target, value);
  }
  if (context.changes.length == 0) {
    (0, import_runtime_core.nextTick)(() => flush(context));
  }
  context.changes.push({ target, value });
  applyChange(context, target, value);
}
var proxyHandler = {
  has(target, key) {
    (0, import_reactivity2.track)(target, VueTrackOps.HAS, key);
    return key in target;
  },
  get(target, key, self2) {
    if (key == Fields.RAW)
      return target;
    if (key == Fields.path) {
      if (rawJSON)
        return void 0;
      return target[Fields.path];
    }
    if (key == Fields.context) {
      if (rawJSON)
        return void 0;
      return target[Fields.context];
    }
    (0, import_reactivity2.track)(target, VueTrackOps.GET, key);
    const value = Reflect.get(target, key, self2);
    if (typeof key == "symbol" || !(0, import_shared.isObject)(value)) {
      return value;
    } else {
      return createValue(target[Fields.context], target[Fields.path] + Path.toString([key]), value);
    }
  },
  set(target, key, value, self2) {
    if (typeof key == "symbol") {
      return Reflect.set(target, key, value, self2);
    } else {
      update(target[Fields.context], target[Fields.path] + Path.toString([key]), value);
      return true;
    }
  },
  deleteProperty(target, key) {
    if (typeof key == "symbol") {
      return Reflect.deleteProperty(target, key);
    } else {
      update(target[Fields.context], target[Fields.path] + Path.toString([key]), void 0);
      return true;
    }
  },
  ownKeys(target) {
    (0, import_reactivity2.track)(target, VueTrackOps.ITERATE, import_reactivity2.ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
};

// ../client/src/collection.ts
var Collection = class extends Adapt {
  static create() {
    return ["collection", { nextId: 0 }];
  }
  get(id) {
    return this.value[id];
  }
  array() {
    return Object.keys(this.value).filter((id) => id != "nextId").map((id) => this.value[id]);
  }
  insert(value) {
    let id;
    if ("id" in value) {
      id = value.id;
      assert(typeof id == "number", "invalid id");
      this.value.nextId = Math.max(this.value.nextId, id + 1);
    } else {
      id = this.value.nextId++;
      Object.assign(value, { id });
    }
    this.value[id] = value;
    return this.get(id);
  }
  remove(id) {
    delete this.value[id];
  }
};
Adapt.register("collection", Collection);

// ../client/src/ref.ts
registerLoadAdapter("ref", (ref) => {
  if (rawJSON)
    return ref;
  const context = ref[Fields.context];
  const targetPath = Path.parse(ref[1]);
  const target = Path.resolve(context.root, targetPath);
  return createValue(context, ref[1], target);
});

// ../client/src/lib.ts
async function join_new(host) {
  const ws = new WebSocket(`${host}/new`);
  return await init(ws);
}

// src/test.ts
function init2() {
  return __async(this, null, function* () {
    const { data } = yield join_new("ws://localhost:8081");
    return data;
  });
}
function eq(a, b) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
      return b === a;
    case "object":
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length != bKeys.length) {
        return false;
      }
      for (const key of aKeys) {
        if (!eq(a[key], b[key])) {
          return false;
        }
      }
      return true;
    default:
      assert(false, "invalid data type");
  }
}
function defer() {
  return __async(this, null, function* () {
    return new Promise((resolve) => setTimeout(resolve, 0));
  });
}
function empty() {
  return __async(this, null, function* () {
    const data = yield init2();
    assert(eq(data, {}), "empty");
  });
}
function strings() {
  return __async(this, null, function* () {
    const data = yield init2();
    data.test = "hello";
    data["-x-"] = "test";
    yield defer();
    assert(eq(data, { test: "hello", "-x-": "test" }), "empty");
  });
}
function numbers() {
  return __async(this, null, function* () {
    const data = yield init2();
    data.test = 5;
    data[5] = 6;
    yield defer();
    assert(eq(data, { 5: 6, test: 5 }), "empty");
  });
}
function booleans() {
  return __async(this, null, function* () {
    const data = yield init2();
    data["true"] = true;
    data["false"] = false;
    yield defer();
    assert(eq(data, { true: true, false: false }), "empty");
  });
}
function objects() {
  return __async(this, null, function* () {
    const data = yield init2();
    data.x = {};
    data.x.y = {};
    yield defer();
    assert(eq(data, { x: { y: {} } }), "empty");
  });
}
function refs() {
  return __async(this, null, function* () {
    const data = yield init2();
    data.x = {};
    data.x.y = data.x;
    yield defer();
    assert(data.x == data.x.y, "empty");
  });
}
function collections() {
  return __async(this, null, function* () {
    const data = yield init2();
    data.x = Collection.create();
    data.x.insert({ value: 5 });
    data.x.insert({ value: 6 });
    yield defer();
    assert(data.x.get(0).value === 5, "empty");
    assert(data.x.get(1).value === 6, "empty");
  });
}
function ref_in_collections() {
  return __async(this, null, function* () {
    const data = yield init2();
    data.x = Collection.create();
    data.y = { test: "hello" };
    data.x.insert(data.y);
    data.y = { test: "updated" };
    yield defer();
    assert(data.x.get(0).test === "updated", "empty");
    data.y.test = "updated2";
    yield defer();
    assert(data.x.get(0).test === "updated2", "empty");
  });
}
function collection_in_ref() {
  return __async(this, null, function* () {
    const data = yield init2();
    data.x = Collection.create();
    data.y = data.x;
    data.x.insert({ value: "test" });
    yield defer();
    assert(data.x.get(0).value === "test", "empty");
    assert(data.y.get(0).value === "test", "empty");
  });
}

// ../node_modules/ws/wrapper.mjs
var import_stream = __toModule(require_stream());
var import_receiver = __toModule(require_receiver());
var import_sender = __toModule(require_sender());
var import_websocket = __toModule(require_websocket());
var import_websocket_server = __toModule(require_websocket_server());

// src/main.ts
Object.assign(global, {
  WebSocket: import_websocket.default,
  localStorage: {
    setItem() {
    },
    getItem() {
    }
  }
});
main();
function main() {
  return __async(this, null, function* () {
    for (const key in test_exports) {
      console.log(`running test ${key}`);
      const fn = test_exports[key];
      yield fn();
    }
    process.exit(0);
  });
}
