!function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){!function(a){"use strict";var b=c(1),d=c(15),e=new d(a.XMLHttpRequest,a.Promise);a.monocle=new b(e)}(window)},function(a,b,c){"use strict";function d(a,b){this._http=a,this._base="/",this._cache=new k(new l("monocle",{capacity:100})),this._batched=[],this._batchTimeout=null,this._queuedGets={},this._promise=b||Promise,this._host=""}function e(a,b){return b&&304===b.$httpStatus?(a.cached.$httpStatus=304,a.cached):this._promise.reject(b)}function f(a,b){if(!b)return!0;for(var c in b)if(b.hasOwnProperty(c)&&!g(a,b[c]))return!1;return!0}function g(a,b){if(!b)return!0;var c=[],d={type:"object",property:""};c.push(d);for(var e=0,f=b.length;e<f;e++){var g=b[e];switch(g){case".":d={type:"object",property:""},c.push(d);break;case"@":d={type:"array",property:""},c.push(d);break;default:d.property+=g}}for(var h,i=a,e=0,f=c.length;e<f;e++){if(null===i)return!1;switch(h=c[e],h.type){case"object":if(!i.hasOwnProperty(h.property))return!1;i=i[h.property];break;case"array":if(!i.length){i=null;break}if(!i[0].hasOwnProperty(h.property))return!1;i=i[0][h.property]}}return!0}function h(a,b,c){return"get"===a&&this._cache.put(c,b&&b.query),c}function i(a,b,c){return a+(b+c).replace(/\/{2,}/g,"/")}function j(a){var b={};if(a&&a.query&&"object"==typeof a.query)for(var c in a.query)b[c]=a.query[c];return a&&Array.isArray(a.props)&&(b.props=a.props.join(",")),m.stringify(b)}var k=c(2),l=c(3),m=c(10),n=c(13);d.prototype.setBase=function(a){return this._base=a,this},d.prototype.setHost=function(a){return this._host=a,this},d.prototype.getCache=function(){return this._cache},["get","post","put","patch","delete","options"].forEach(function(a){d.prototype[a]=function(b,c){return u.call(this,a,b,c)}});var o=function(){null===this._batchTimeout&&(this._batchTimeout=setTimeout(function(){p.call(this),this._batchTimeout=null}.bind(this)))},p=function(){var a=this._batched;if(this._batched=[],1===a.length){var b=i(this._host,this._base,a[0].url);return this._http.request(a[0].method.toUpperCase(),b,a[0].options,a[0].headers).catch(e.bind(this,a[0])).then(a[0].resolve).catch(a[0].reject)}var c=a.map(function(a){var b;return a.options&&a.options.body&&(b=a.options.body,delete a.options.body),{method:a.method,url:a.url,headers:a.headers,options:a.options,body:b,resolve:a.resolve,reject:a.reject}});return this._http.request("POST",i(this._host,this._base,"/_batch"),{body:c}).then(function(b){b.forEach(function(b,c){b.status>=200&&b.status<300?a[c].resolve(b.body):304===b.status?a[c].resolve(a[c].cached):a[c].reject(b.body)})}).catch(function(b){a.forEach(function(c,d){a[d].reject(b)})})},q=function(a,b){return[a,JSON.stringify(b)].join(":")},r=function(a,b){var c=q(a,b);return this._queuedGets.hasOwnProperty(c)?this._queuedGets[c]:null},s=function(a,b,c){var d=q(a,b);this._queuedGets[d]=c},t=function(a,b){var c=q(a,b);delete this._queuedGets[c]},u=function(a,b,c){c=c||{};var d={},e=null;if(c&&c.props){var g=/^[a-zA-Z0-9\@\.\$_-]+$/,i={code:422,message:"Invalid props, expecting an array of strings"},k={code:422,message:"Invalid props, expecting one or more"};if(!Array.isArray(c.props))return this._promise.reject(i);if(!c.props.length)return this._promise.reject(k);for(var l=0,m=c.props.length;l<m;l++){if("string"!=typeof c.props[l])return this._promise.reject(i);if(!c.props[l].match(g))return this._promise.reject(i)}}switch(a){case"get":var p=r.call(this,b,c);if(p)return p;var q=this._cache.generateCacheKey(b,c&&c.query);if(e=this._cache.get(q),e&&f(e,c.props)){if("collection"===e.$type){var u=new n(e,c.props,c.query),v=u.id();v&&(d["if-none-match"]=v);break}return this._promise.resolve(e)}break;case"post":case"put":case"delete":case"patch":this._cache.removeMatchingTag(b)}var w=new this._promise(function(f,g){var h=j(c);h&&(b+="?"+h),this._batched.push({method:a,url:b,headers:d,options:c,resolve:f,reject:g,cached:e}),o.call(this)}.bind(this)).then(h.bind(this,a,c)).finally(t.bind(this,b,c));return"get"===a&&s.call(this,b,c,w),w};a.exports=d},function(a,b){"use strict";function c(a){this._backend=a}c.prototype.get=function(a){return this._backend.get(a)},c.prototype.put=function(a,b){return this._backend.put(a,b)},c.prototype.remove=function(a){return this._backend.remove(a)},c.prototype.getAll=function(){return this._backend.getAll()},c.prototype.removeMatchingTag=function(a){return this._backend.removeMatchingTag(a)},c.prototype.generateCacheKey=function(a,b){return this._backend.generateCacheKey(a,b)},a.exports=c},function(a,b,c){"use strict";function d(a,b){this._cache=new i(a,b)}function e(a){var b=h(this._cache.get(a));if("undefined"!=typeof b&&!f.call(this,b))return g.call(this,b),b}function f(a){for(var b=Object.keys(a),c=0;c<b.length;c++){var d=b[c];if("object"==typeof a[d]&&null!=a[d]){if(!(a[d].hasOwnProperty("key")&&a[d].hasOwnProperty("value")&&a[d].hasOwnProperty("expiration")))return f.call(this,a[d]);if("undefined"==typeof e.call(this,a[d].key))return!0}}return!1}function g(a){for(var b=Object.keys(a),c=0;c<b.length;c++){var d=b[c];if("object"==typeof a[d]&&null!=a[d])if(a[d].hasOwnProperty("key")&&a[d].hasOwnProperty("value")&&a[d].hasOwnProperty("expiration")){var f=e.call(this,a[d].key);"undefined"!=typeof f&&(a[d]=f)}else g.call(this,a[d])}}var h=c(4),i=c(9),j=c(10);d.prototype.generateCacheKey=function(a,b){if(!b)return a;var c=Object.keys(b).map(function(a){var c={};return c[a]=b[a],j.stringify(c)}).sort();return a+"?"+c.join("&")},d.prototype.get=function(a){return e.call(this,a)},d.prototype.getAll=function(){return this._cache.getAll()},d.prototype.put=function(a,b){var c=k.call(this,a,b);return c?c.key:void 0};var k=function(a,b){if(a.hasOwnProperty("$id")&&a.hasOwnProperty("$expires")){var c=h(a);l.call(this,c);var d=this.generateCacheKey(c.$id,b),e=[a.$id];return this._cache.put(d,c,c.$expires,e)}},l=function(a){for(var b=Object.keys(a),c=0;c<b.length;c++){var d=b[c];"object"==typeof a[d]&&null!=a[d]&&(a[d].hasOwnProperty("$id")&&a[d].hasOwnProperty("$expires")?a[d]=k.call(this,a[d]):"object"==typeof a[d]&&l.call(this,a[d]))}};d.prototype.printFromHead=function(){this._cache.printFromHead()},d.prototype.printFromTail=function(){this._cache.printFromTail()},d.prototype.remove=function(a){this._cache.remove(a)},d.prototype.removeAll=function(){this._cache.removeAll()},d.prototype.removeMatchingTag=function(a){this._cache.removeMatchingTag(a)},a.exports=d},function(a,b,c){(function(b){var c=function(){"use strict";function a(c,d,e,f){function h(c,e){if(null===c)return null;if(0==e)return c;var i,m;if("object"!=typeof c)return c;if(a.__isArray(c))i=[];else if(a.__isRegExp(c))i=new RegExp(c.source,g(c)),c.lastIndex&&(i.lastIndex=c.lastIndex);else if(a.__isDate(c))i=new Date(c.getTime());else{if(l&&b.isBuffer(c))return i=new b(c.length),c.copy(i),i;"undefined"==typeof f?(m=Object.getPrototypeOf(c),i=Object.create(m)):(i=Object.create(f),m=f)}if(d){var n=j.indexOf(c);if(n!=-1)return k[n];j.push(c),k.push(i)}for(var o in c){var p;m&&(p=Object.getOwnPropertyDescriptor(m,o)),p&&null==p.set||(i[o]=h(c[o],e-1))}return i}var i;"object"==typeof d&&(e=d.depth,f=d.prototype,i=d.filter,d=d.circular);var j=[],k=[],l="undefined"!=typeof b;return"undefined"==typeof d&&(d=!0),"undefined"==typeof e&&(e=1/0),h(c,e)}function c(a){return Object.prototype.toString.call(a)}function d(a){return"object"==typeof a&&"[object Date]"===c(a)}function e(a){return"object"==typeof a&&"[object Array]"===c(a)}function f(a){return"object"==typeof a&&"[object RegExp]"===c(a)}function g(a){var b="";return a.global&&(b+="g"),a.ignoreCase&&(b+="i"),a.multiline&&(b+="m"),b}return a.clonePrototype=function(a){if(null===a)return null;var b=function(){};return b.prototype=a,new b},a.__objToStr=c,a.__isDate=d,a.__isArray=e,a.__isRegExp=f,a.__getRegExpFlags=g,a}();"object"==typeof a&&a.exports&&(a.exports=c)}).call(b,c(5).Buffer)},function(a,b,c){(function(a,d){"use strict";function e(){try{var a=new Uint8Array(1);return a.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===a.foo()&&"function"==typeof a.subarray&&0===a.subarray(1,1).byteLength}catch(a){return!1}}function f(){return a.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function g(b,c){if(f()<c)throw new RangeError("Invalid typed array length");return a.TYPED_ARRAY_SUPPORT?(b=new Uint8Array(c),b.__proto__=a.prototype):(null===b&&(b=new a(c)),b.length=c),b}function a(b,c,d){if(!(a.TYPED_ARRAY_SUPPORT||this instanceof a))return new a(b,c,d);if("number"==typeof b){if("string"==typeof c)throw new Error("If encoding is specified then the first argument must be a string");return k(this,b)}return h(this,b,c,d)}function h(a,b,c,d){if("number"==typeof b)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&b instanceof ArrayBuffer?n(a,b,c,d):"string"==typeof b?l(a,b,c):o(a,b)}function i(a){if("number"!=typeof a)throw new TypeError('"size" argument must be a number');if(a<0)throw new RangeError('"size" argument must not be negative')}function j(a,b,c,d){return i(b),b<=0?g(a,b):void 0!==c?"string"==typeof d?g(a,b).fill(c,d):g(a,b).fill(c):g(a,b)}function k(b,c){if(i(c),b=g(b,c<0?0:0|p(c)),!a.TYPED_ARRAY_SUPPORT)for(var d=0;d<c;++d)b[d]=0;return b}function l(b,c,d){if("string"==typeof d&&""!==d||(d="utf8"),!a.isEncoding(d))throw new TypeError('"encoding" must be a valid string encoding');var e=0|r(c,d);b=g(b,e);var f=b.write(c,d);return f!==e&&(b=b.slice(0,f)),b}function m(a,b){var c=b.length<0?0:0|p(b.length);a=g(a,c);for(var d=0;d<c;d+=1)a[d]=255&b[d];return a}function n(b,c,d,e){if(c.byteLength,d<0||c.byteLength<d)throw new RangeError("'offset' is out of bounds");if(c.byteLength<d+(e||0))throw new RangeError("'length' is out of bounds");return c=void 0===d&&void 0===e?new Uint8Array(c):void 0===e?new Uint8Array(c,d):new Uint8Array(c,d,e),a.TYPED_ARRAY_SUPPORT?(b=c,b.__proto__=a.prototype):b=m(b,c),b}function o(b,c){if(a.isBuffer(c)){var d=0|p(c.length);return b=g(b,d),0===b.length?b:(c.copy(b,0,0,d),b)}if(c){if("undefined"!=typeof ArrayBuffer&&c.buffer instanceof ArrayBuffer||"length"in c)return"number"!=typeof c.length||Y(c.length)?g(b,0):m(b,c);if("Buffer"===c.type&&_(c.data))return m(b,c.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function p(a){if(a>=f())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+f().toString(16)+" bytes");return 0|a}function q(b){return+b!=b&&(b=0),a.alloc(+b)}function r(b,c){if(a.isBuffer(b))return b.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(b)||b instanceof ArrayBuffer))return b.byteLength;"string"!=typeof b&&(b=""+b);var d=b.length;if(0===d)return 0;for(var e=!1;;)switch(c){case"ascii":case"latin1":case"binary":return d;case"utf8":case"utf-8":case void 0:return T(b).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*d;case"hex":return d>>>1;case"base64":return W(b).length;default:if(e)return T(b).length;c=(""+c).toLowerCase(),e=!0}}function s(a,b,c){var d=!1;if((void 0===b||b<0)&&(b=0),b>this.length)return"";if((void 0===c||c>this.length)&&(c=this.length),c<=0)return"";if(c>>>=0,b>>>=0,c<=b)return"";for(a||(a="utf8");;)switch(a){case"hex":return H(this,b,c);case"utf8":case"utf-8":return D(this,b,c);case"ascii":return F(this,b,c);case"latin1":case"binary":return G(this,b,c);case"base64":return C(this,b,c);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,b,c);default:if(d)throw new TypeError("Unknown encoding: "+a);a=(a+"").toLowerCase(),d=!0}}function t(a,b,c){var d=a[b];a[b]=a[c],a[c]=d}function u(b,c,d,e,f){if(0===b.length)return-1;if("string"==typeof d?(e=d,d=0):d>2147483647?d=2147483647:d<-2147483648&&(d=-2147483648),d=+d,isNaN(d)&&(d=f?0:b.length-1),d<0&&(d=b.length+d),d>=b.length){if(f)return-1;d=b.length-1}else if(d<0){if(!f)return-1;d=0}if("string"==typeof c&&(c=a.from(c,e)),a.isBuffer(c))return 0===c.length?-1:v(b,c,d,e,f);if("number"==typeof c)return c=255&c,a.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?f?Uint8Array.prototype.indexOf.call(b,c,d):Uint8Array.prototype.lastIndexOf.call(b,c,d):v(b,[c],d,e,f);throw new TypeError("val must be string, number or Buffer")}function v(a,b,c,d,e){function f(a,b){return 1===g?a[b]:a.readUInt16BE(b*g)}var g=1,h=a.length,i=b.length;if(void 0!==d&&(d=String(d).toLowerCase(),"ucs2"===d||"ucs-2"===d||"utf16le"===d||"utf-16le"===d)){if(a.length<2||b.length<2)return-1;g=2,h/=2,i/=2,c/=2}var j;if(e){var k=-1;for(j=c;j<h;j++)if(f(a,j)===f(b,k===-1?0:j-k)){if(k===-1&&(k=j),j-k+1===i)return k*g}else k!==-1&&(j-=j-k),k=-1}else for(c+i>h&&(c=h-i),j=c;j>=0;j--){for(var l=!0,m=0;m<i;m++)if(f(a,j+m)!==f(b,m)){l=!1;break}if(l)return j}return-1}function w(a,b,c,d){c=Number(c)||0;var e=a.length-c;d?(d=Number(d),d>e&&(d=e)):d=e;var f=b.length;if(f%2!==0)throw new TypeError("Invalid hex string");d>f/2&&(d=f/2);for(var g=0;g<d;++g){var h=parseInt(b.substr(2*g,2),16);if(isNaN(h))return g;a[c+g]=h}return g}function x(a,b,c,d){return X(T(b,a.length-c),a,c,d)}function y(a,b,c,d){return X(U(b),a,c,d)}function z(a,b,c,d){return y(a,b,c,d)}function A(a,b,c,d){return X(W(b),a,c,d)}function B(a,b,c,d){return X(V(b,a.length-c),a,c,d)}function C(a,b,c){return 0===b&&c===a.length?Z.fromByteArray(a):Z.fromByteArray(a.slice(b,c))}function D(a,b,c){c=Math.min(a.length,c);for(var d=[],e=b;e<c;){var f=a[e],g=null,h=f>239?4:f>223?3:f>191?2:1;if(e+h<=c){var i,j,k,l;switch(h){case 1:f<128&&(g=f);break;case 2:i=a[e+1],128===(192&i)&&(l=(31&f)<<6|63&i,l>127&&(g=l));break;case 3:i=a[e+1],j=a[e+2],128===(192&i)&&128===(192&j)&&(l=(15&f)<<12|(63&i)<<6|63&j,l>2047&&(l<55296||l>57343)&&(g=l));break;case 4:i=a[e+1],j=a[e+2],k=a[e+3],128===(192&i)&&128===(192&j)&&128===(192&k)&&(l=(15&f)<<18|(63&i)<<12|(63&j)<<6|63&k,l>65535&&l<1114112&&(g=l))}}null===g?(g=65533,h=1):g>65535&&(g-=65536,d.push(g>>>10&1023|55296),g=56320|1023&g),d.push(g),e+=h}return E(d)}function E(a){var b=a.length;if(b<=aa)return String.fromCharCode.apply(String,a);for(var c="",d=0;d<b;)c+=String.fromCharCode.apply(String,a.slice(d,d+=aa));return c}function F(a,b,c){var d="";c=Math.min(a.length,c);for(var e=b;e<c;++e)d+=String.fromCharCode(127&a[e]);return d}function G(a,b,c){var d="";c=Math.min(a.length,c);for(var e=b;e<c;++e)d+=String.fromCharCode(a[e]);return d}function H(a,b,c){var d=a.length;(!b||b<0)&&(b=0),(!c||c<0||c>d)&&(c=d);for(var e="",f=b;f<c;++f)e+=S(a[f]);return e}function I(a,b,c){for(var d=a.slice(b,c),e="",f=0;f<d.length;f+=2)e+=String.fromCharCode(d[f]+256*d[f+1]);return e}function J(a,b,c){if(a%1!==0||a<0)throw new RangeError("offset is not uint");if(a+b>c)throw new RangeError("Trying to access beyond buffer length")}function K(b,c,d,e,f,g){if(!a.isBuffer(b))throw new TypeError('"buffer" argument must be a Buffer instance');if(c>f||c<g)throw new RangeError('"value" argument is out of bounds');if(d+e>b.length)throw new RangeError("Index out of range")}function L(a,b,c,d){b<0&&(b=65535+b+1);for(var e=0,f=Math.min(a.length-c,2);e<f;++e)a[c+e]=(b&255<<8*(d?e:1-e))>>>8*(d?e:1-e)}function M(a,b,c,d){b<0&&(b=4294967295+b+1);for(var e=0,f=Math.min(a.length-c,4);e<f;++e)a[c+e]=b>>>8*(d?e:3-e)&255}function N(a,b,c,d,e,f){if(c+d>a.length)throw new RangeError("Index out of range");if(c<0)throw new RangeError("Index out of range")}function O(a,b,c,d,e){return e||N(a,b,c,4,3.4028234663852886e38,-3.4028234663852886e38),$.write(a,b,c,d,23,4),c+4}function P(a,b,c,d,e){return e||N(a,b,c,8,1.7976931348623157e308,-1.7976931348623157e308),$.write(a,b,c,d,52,8),c+8}function Q(a){if(a=R(a).replace(ba,""),a.length<2)return"";for(;a.length%4!==0;)a+="=";return a}function R(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")}function S(a){return a<16?"0"+a.toString(16):a.toString(16)}function T(a,b){b=b||1/0;for(var c,d=a.length,e=null,f=[],g=0;g<d;++g){if(c=a.charCodeAt(g),c>55295&&c<57344){if(!e){if(c>56319){(b-=3)>-1&&f.push(239,191,189);continue}if(g+1===d){(b-=3)>-1&&f.push(239,191,189);continue}e=c;continue}if(c<56320){(b-=3)>-1&&f.push(239,191,189),e=c;continue}c=(e-55296<<10|c-56320)+65536}else e&&(b-=3)>-1&&f.push(239,191,189);if(e=null,c<128){if((b-=1)<0)break;f.push(c)}else if(c<2048){if((b-=2)<0)break;f.push(c>>6|192,63&c|128)}else if(c<65536){if((b-=3)<0)break;f.push(c>>12|224,c>>6&63|128,63&c|128)}else{if(!(c<1114112))throw new Error("Invalid code point");if((b-=4)<0)break;f.push(c>>18|240,c>>12&63|128,c>>6&63|128,63&c|128)}}return f}function U(a){for(var b=[],c=0;c<a.length;++c)b.push(255&a.charCodeAt(c));return b}function V(a,b){for(var c,d,e,f=[],g=0;g<a.length&&!((b-=2)<0);++g)c=a.charCodeAt(g),d=c>>8,e=c%256,f.push(e),f.push(d);return f}function W(a){return Z.toByteArray(Q(a))}function X(a,b,c,d){for(var e=0;e<d&&!(e+c>=b.length||e>=a.length);++e)b[e+c]=a[e];return e}function Y(a){return a!==a}var Z=c(6),$=c(7),_=c(8);b.Buffer=a,b.SlowBuffer=q,b.INSPECT_MAX_BYTES=50,a.TYPED_ARRAY_SUPPORT=void 0!==d.TYPED_ARRAY_SUPPORT?d.TYPED_ARRAY_SUPPORT:e(),b.kMaxLength=f(),a.poolSize=8192,a._augment=function(b){return b.__proto__=a.prototype,b},a.from=function(a,b,c){return h(null,a,b,c)},a.TYPED_ARRAY_SUPPORT&&(a.prototype.__proto__=Uint8Array.prototype,a.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&a[Symbol.species]===a&&Object.defineProperty(a,Symbol.species,{value:null,configurable:!0})),a.alloc=function(a,b,c){return j(null,a,b,c)},a.allocUnsafe=function(a){return k(null,a)},a.allocUnsafeSlow=function(a){return k(null,a)},a.isBuffer=function(a){return!(null==a||!a._isBuffer)},a.compare=function(b,c){if(!a.isBuffer(b)||!a.isBuffer(c))throw new TypeError("Arguments must be Buffers");if(b===c)return 0;for(var d=b.length,e=c.length,f=0,g=Math.min(d,e);f<g;++f)if(b[f]!==c[f]){d=b[f],e=c[f];break}return d<e?-1:e<d?1:0},a.isEncoding=function(a){switch(String(a).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},a.concat=function(b,c){if(!_(b))throw new TypeError('"list" argument must be an Array of Buffers');if(0===b.length)return a.alloc(0);var d;if(void 0===c)for(c=0,d=0;d<b.length;++d)c+=b[d].length;var e=a.allocUnsafe(c),f=0;for(d=0;d<b.length;++d){var g=b[d];if(!a.isBuffer(g))throw new TypeError('"list" argument must be an Array of Buffers');g.copy(e,f),f+=g.length}return e},a.byteLength=r,a.prototype._isBuffer=!0,a.prototype.swap16=function(){var a=this.length;if(a%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var b=0;b<a;b+=2)t(this,b,b+1);return this},a.prototype.swap32=function(){var a=this.length;if(a%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var b=0;b<a;b+=4)t(this,b,b+3),t(this,b+1,b+2);return this},a.prototype.swap64=function(){var a=this.length;if(a%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var b=0;b<a;b+=8)t(this,b,b+7),t(this,b+1,b+6),t(this,b+2,b+5),t(this,b+3,b+4);return this},a.prototype.toString=function(){var a=0|this.length;return 0===a?"":0===arguments.length?D(this,0,a):s.apply(this,arguments)},a.prototype.equals=function(b){if(!a.isBuffer(b))throw new TypeError("Argument must be a Buffer");return this===b||0===a.compare(this,b)},a.prototype.inspect=function(){var a="",c=b.INSPECT_MAX_BYTES;return this.length>0&&(a=this.toString("hex",0,c).match(/.{2}/g).join(" "),this.length>c&&(a+=" ... ")),"<Buffer "+a+">"},a.prototype.compare=function(b,c,d,e,f){if(!a.isBuffer(b))throw new TypeError("Argument must be a Buffer");if(void 0===c&&(c=0),void 0===d&&(d=b?b.length:0),void 0===e&&(e=0),void 0===f&&(f=this.length),c<0||d>b.length||e<0||f>this.length)throw new RangeError("out of range index");if(e>=f&&c>=d)return 0;if(e>=f)return-1;if(c>=d)return 1;if(c>>>=0,d>>>=0,e>>>=0,f>>>=0,this===b)return 0;for(var g=f-e,h=d-c,i=Math.min(g,h),j=this.slice(e,f),k=b.slice(c,d),l=0;l<i;++l)if(j[l]!==k[l]){g=j[l],h=k[l];break}return g<h?-1:h<g?1:0},a.prototype.includes=function(a,b,c){return this.indexOf(a,b,c)!==-1},a.prototype.indexOf=function(a,b,c){return u(this,a,b,c,!0)},a.prototype.lastIndexOf=function(a,b,c){return u(this,a,b,c,!1)},a.prototype.write=function(a,b,c,d){if(void 0===b)d="utf8",c=this.length,b=0;else if(void 0===c&&"string"==typeof b)d=b,c=this.length,b=0;else{if(!isFinite(b))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");b=0|b,isFinite(c)?(c=0|c,void 0===d&&(d="utf8")):(d=c,c=void 0)}var e=this.length-b;if((void 0===c||c>e)&&(c=e),a.length>0&&(c<0||b<0)||b>this.length)throw new RangeError("Attempt to write outside buffer bounds");d||(d="utf8");for(var f=!1;;)switch(d){case"hex":return w(this,a,b,c);case"utf8":case"utf-8":return x(this,a,b,c);case"ascii":return y(this,a,b,c);case"latin1":case"binary":return z(this,a,b,c);case"base64":return A(this,a,b,c);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return B(this,a,b,c);default:if(f)throw new TypeError("Unknown encoding: "+d);d=(""+d).toLowerCase(),f=!0}},a.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var aa=4096;a.prototype.slice=function(b,c){var d=this.length;b=~~b,c=void 0===c?d:~~c,b<0?(b+=d,b<0&&(b=0)):b>d&&(b=d),c<0?(c+=d,c<0&&(c=0)):c>d&&(c=d),c<b&&(c=b);var e;if(a.TYPED_ARRAY_SUPPORT)e=this.subarray(b,c),e.__proto__=a.prototype;else{var f=c-b;e=new a(f,void 0);for(var g=0;g<f;++g)e[g]=this[g+b]}return e},a.prototype.readUIntLE=function(a,b,c){a=0|a,b=0|b,c||J(a,b,this.length);for(var d=this[a],e=1,f=0;++f<b&&(e*=256);)d+=this[a+f]*e;return d},a.prototype.readUIntBE=function(a,b,c){a=0|a,b=0|b,c||J(a,b,this.length);for(var d=this[a+--b],e=1;b>0&&(e*=256);)d+=this[a+--b]*e;return d},a.prototype.readUInt8=function(a,b){return b||J(a,1,this.length),this[a]},a.prototype.readUInt16LE=function(a,b){return b||J(a,2,this.length),this[a]|this[a+1]<<8},a.prototype.readUInt16BE=function(a,b){return b||J(a,2,this.length),this[a]<<8|this[a+1]},a.prototype.readUInt32LE=function(a,b){return b||J(a,4,this.length),(this[a]|this[a+1]<<8|this[a+2]<<16)+16777216*this[a+3]},a.prototype.readUInt32BE=function(a,b){return b||J(a,4,this.length),16777216*this[a]+(this[a+1]<<16|this[a+2]<<8|this[a+3])},a.prototype.readIntLE=function(a,b,c){a=0|a,b=0|b,c||J(a,b,this.length);for(var d=this[a],e=1,f=0;++f<b&&(e*=256);)d+=this[a+f]*e;return e*=128,d>=e&&(d-=Math.pow(2,8*b)),d},a.prototype.readIntBE=function(a,b,c){a=0|a,b=0|b,c||J(a,b,this.length);for(var d=b,e=1,f=this[a+--d];d>0&&(e*=256);)f+=this[a+--d]*e;return e*=128,f>=e&&(f-=Math.pow(2,8*b)),f},a.prototype.readInt8=function(a,b){return b||J(a,1,this.length),128&this[a]?(255-this[a]+1)*-1:this[a]},a.prototype.readInt16LE=function(a,b){b||J(a,2,this.length);var c=this[a]|this[a+1]<<8;return 32768&c?4294901760|c:c},a.prototype.readInt16BE=function(a,b){b||J(a,2,this.length);var c=this[a+1]|this[a]<<8;return 32768&c?4294901760|c:c},a.prototype.readInt32LE=function(a,b){return b||J(a,4,this.length),this[a]|this[a+1]<<8|this[a+2]<<16|this[a+3]<<24},a.prototype.readInt32BE=function(a,b){return b||J(a,4,this.length),this[a]<<24|this[a+1]<<16|this[a+2]<<8|this[a+3]},a.prototype.readFloatLE=function(a,b){return b||J(a,4,this.length),$.read(this,a,!0,23,4)},a.prototype.readFloatBE=function(a,b){return b||J(a,4,this.length),$.read(this,a,!1,23,4)},a.prototype.readDoubleLE=function(a,b){return b||J(a,8,this.length),$.read(this,a,!0,52,8)},a.prototype.readDoubleBE=function(a,b){return b||J(a,8,this.length),$.read(this,a,!1,52,8)},a.prototype.writeUIntLE=function(a,b,c,d){if(a=+a,b=0|b,c=0|c,!d){var e=Math.pow(2,8*c)-1;K(this,a,b,c,e,0)}var f=1,g=0;for(this[b]=255&a;++g<c&&(f*=256);)this[b+g]=a/f&255;return b+c},a.prototype.writeUIntBE=function(a,b,c,d){if(a=+a,b=0|b,c=0|c,!d){var e=Math.pow(2,8*c)-1;K(this,a,b,c,e,0)}var f=c-1,g=1;for(this[b+f]=255&a;--f>=0&&(g*=256);)this[b+f]=a/g&255;return b+c},a.prototype.writeUInt8=function(b,c,d){return b=+b,c=0|c,d||K(this,b,c,1,255,0),a.TYPED_ARRAY_SUPPORT||(b=Math.floor(b)),this[c]=255&b,c+1},a.prototype.writeUInt16LE=function(b,c,d){return b=+b,c=0|c,d||K(this,b,c,2,65535,0),a.TYPED_ARRAY_SUPPORT?(this[c]=255&b,this[c+1]=b>>>8):L(this,b,c,!0),c+2},a.prototype.writeUInt16BE=function(b,c,d){return b=+b,c=0|c,d||K(this,b,c,2,65535,0),a.TYPED_ARRAY_SUPPORT?(this[c]=b>>>8,this[c+1]=255&b):L(this,b,c,!1),c+2},a.prototype.writeUInt32LE=function(b,c,d){return b=+b,c=0|c,d||K(this,b,c,4,4294967295,0),a.TYPED_ARRAY_SUPPORT?(this[c+3]=b>>>24,this[c+2]=b>>>16,this[c+1]=b>>>8,this[c]=255&b):M(this,b,c,!0),c+4},a.prototype.writeUInt32BE=function(b,c,d){return b=+b,c=0|c,d||K(this,b,c,4,4294967295,0),a.TYPED_ARRAY_SUPPORT?(this[c]=b>>>24,this[c+1]=b>>>16,this[c+2]=b>>>8,this[c+3]=255&b):M(this,b,c,!1),c+4},a.prototype.writeIntLE=function(a,b,c,d){if(a=+a,b=0|b,!d){var e=Math.pow(2,8*c-1);K(this,a,b,c,e-1,-e)}var f=0,g=1,h=0;for(this[b]=255&a;++f<c&&(g*=256);)a<0&&0===h&&0!==this[b+f-1]&&(h=1),this[b+f]=(a/g>>0)-h&255;return b+c},a.prototype.writeIntBE=function(a,b,c,d){if(a=+a,b=0|b,!d){var e=Math.pow(2,8*c-1);K(this,a,b,c,e-1,-e)}var f=c-1,g=1,h=0;for(this[b+f]=255&a;--f>=0&&(g*=256);)a<0&&0===h&&0!==this[b+f+1]&&(h=1),this[b+f]=(a/g>>0)-h&255;return b+c},a.prototype.writeInt8=function(b,c,d){return b=+b,c=0|c,d||K(this,b,c,1,127,-128),a.TYPED_ARRAY_SUPPORT||(b=Math.floor(b)),b<0&&(b=255+b+1),this[c]=255&b,c+1},a.prototype.writeInt16LE=function(b,c,d){return b=+b,c=0|c,d||K(this,b,c,2,32767,-32768),a.TYPED_ARRAY_SUPPORT?(this[c]=255&b,this[c+1]=b>>>8):L(this,b,c,!0),c+2},a.prototype.writeInt16BE=function(b,c,d){return b=+b,c=0|c,d||K(this,b,c,2,32767,-32768),a.TYPED_ARRAY_SUPPORT?(this[c]=b>>>8,this[c+1]=255&b):L(this,b,c,!1),c+2},a.prototype.writeInt32LE=function(b,c,d){return b=+b,c=0|c,d||K(this,b,c,4,2147483647,-2147483648),a.TYPED_ARRAY_SUPPORT?(this[c]=255&b,this[c+1]=b>>>8,this[c+2]=b>>>16,this[c+3]=b>>>24):M(this,b,c,!0),c+4},a.prototype.writeInt32BE=function(b,c,d){return b=+b,c=0|c,d||K(this,b,c,4,2147483647,-2147483648),b<0&&(b=4294967295+b+1),a.TYPED_ARRAY_SUPPORT?(this[c]=b>>>24,this[c+1]=b>>>16,this[c+2]=b>>>8,this[c+3]=255&b):M(this,b,c,!1),c+4},a.prototype.writeFloatLE=function(a,b,c){return O(this,a,b,!0,c)},a.prototype.writeFloatBE=function(a,b,c){return O(this,a,b,!1,c)},a.prototype.writeDoubleLE=function(a,b,c){return P(this,a,b,!0,c)},a.prototype.writeDoubleBE=function(a,b,c){return P(this,a,b,!1,c)},a.prototype.copy=function(b,c,d,e){if(d||(d=0),e||0===e||(e=this.length),c>=b.length&&(c=b.length),c||(c=0),e>0&&e<d&&(e=d),e===d)return 0;if(0===b.length||0===this.length)return 0;if(c<0)throw new RangeError("targetStart out of bounds");if(d<0||d>=this.length)throw new RangeError("sourceStart out of bounds");if(e<0)throw new RangeError("sourceEnd out of bounds");e>this.length&&(e=this.length),b.length-c<e-d&&(e=b.length-c+d);var f,g=e-d;if(this===b&&d<c&&c<e)for(f=g-1;f>=0;--f)b[f+c]=this[f+d];else if(g<1e3||!a.TYPED_ARRAY_SUPPORT)for(f=0;f<g;++f)b[f+c]=this[f+d];else Uint8Array.prototype.set.call(b,this.subarray(d,d+g),c);return g},a.prototype.fill=function(b,c,d,e){if("string"==typeof b){if("string"==typeof c?(e=c,c=0,d=this.length):"string"==typeof d&&(e=d,d=this.length),1===b.length){var f=b.charCodeAt(0);f<256&&(b=f)}if(void 0!==e&&"string"!=typeof e)throw new TypeError("encoding must be a string");if("string"==typeof e&&!a.isEncoding(e))throw new TypeError("Unknown encoding: "+e)}else"number"==typeof b&&(b=255&b);if(c<0||this.length<c||this.length<d)throw new RangeError("Out of range index");if(d<=c)return this;c>>>=0,d=void 0===d?this.length:d>>>0,b||(b=0);var g;if("number"==typeof b)for(g=c;g<d;++g)this[g]=b;else{var h=a.isBuffer(b)?b:T(new a(b,e).toString()),i=h.length;for(g=0;g<d-c;++g)this[g+c]=h[g%i]}return this};var ba=/[^+\/0-9A-Za-z-_]/g}).call(b,c(5).Buffer,function(){return this}())},function(a,b){"use strict";function c(){for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b=0,c=a.length;b<c;++b)h[b]=a[b],i[a.charCodeAt(b)]=b;i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63}function d(a){var b,c,d,e,f,g,h=a.length;if(h%4>0)throw new Error("Invalid string. Length must be a multiple of 4");f="="===a[h-2]?2:"="===a[h-1]?1:0,g=new j(3*h/4-f),d=f>0?h-4:h;var k=0;for(b=0,c=0;b<d;b+=4,c+=3)e=i[a.charCodeAt(b)]<<18|i[a.charCodeAt(b+1)]<<12|i[a.charCodeAt(b+2)]<<6|i[a.charCodeAt(b+3)],g[k++]=e>>16&255,g[k++]=e>>8&255,g[k++]=255&e;return 2===f?(e=i[a.charCodeAt(b)]<<2|i[a.charCodeAt(b+1)]>>4,g[k++]=255&e):1===f&&(e=i[a.charCodeAt(b)]<<10|i[a.charCodeAt(b+1)]<<4|i[a.charCodeAt(b+2)]>>2,g[k++]=e>>8&255,g[k++]=255&e),g}function e(a){return h[a>>18&63]+h[a>>12&63]+h[a>>6&63]+h[63&a]}function f(a,b,c){for(var d,f=[],g=b;g<c;g+=3)d=(a[g]<<16)+(a[g+1]<<8)+a[g+2],f.push(e(d));return f.join("")}function g(a){for(var b,c=a.length,d=c%3,e="",g=[],i=16383,j=0,k=c-d;j<k;j+=i)g.push(f(a,j,j+i>k?k:j+i));return 1===d?(b=a[c-1],e+=h[b>>2],e+=h[b<<4&63],e+="=="):2===d&&(b=(a[c-2]<<8)+a[c-1],e+=h[b>>10],e+=h[b>>4&63],e+=h[b<<2&63],e+="="),g.push(e),g.join("")}b.toByteArray=d,b.fromByteArray=g;var h=[],i=[],j="undefined"!=typeof Uint8Array?Uint8Array:Array;c()},function(a,b){b.read=function(a,b,c,d,e){var f,g,h=8*e-d-1,i=(1<<h)-1,j=i>>1,k=-7,l=c?e-1:0,m=c?-1:1,n=a[b+l];for(l+=m,f=n&(1<<-k)-1,n>>=-k,k+=h;k>0;f=256*f+a[b+l],l+=m,k-=8);for(g=f&(1<<-k)-1,f>>=-k,k+=d;k>0;g=256*g+a[b+l],l+=m,k-=8);if(0===f)f=1-j;else{if(f===i)return g?NaN:(n?-1:1)*(1/0);g+=Math.pow(2,d),f-=j}return(n?-1:1)*g*Math.pow(2,f-d)},b.write=function(a,b,c,d,e,f){var g,h,i,j=8*f-e-1,k=(1<<j)-1,l=k>>1,m=23===e?Math.pow(2,-24)-Math.pow(2,-77):0,n=d?0:f-1,o=d?1:-1,p=b<0||0===b&&1/b<0?1:0;for(b=Math.abs(b),isNaN(b)||b===1/0?(h=isNaN(b)?1:0,g=k):(g=Math.floor(Math.log(b)/Math.LN2),b*(i=Math.pow(2,-g))<1&&(g--,i*=2),b+=g+l>=1?m/i:m*Math.pow(2,1-l),b*i>=2&&(g++,i/=2),g+l>=k?(h=0,g=k):g+l>=1?(h=(b*i-1)*Math.pow(2,e),g+=l):(h=b*Math.pow(2,l-1)*Math.pow(2,e),g=0));e>=8;a[c+n]=255&h,n+=o,h/=256,e-=8);for(g=g<<e|h,j+=e;j>0;a[c+n]=255&g,n+=o,g/=256,j-=8);a[c+n-o]|=128*p}},function(a,b){var c={}.toString;a.exports=Array.isArray||function(a){return"[object Array]"==c.call(a)}},function(a,b){"use strict";function c(a,b){this._cacheId=a,this._cache={},this._head=null,this._tail=null,this._options=b||{},this._options.hasOwnProperty("capacity")||(this._options.capacity=!1)}c.prototype.get=function(a){if(this._cache.hasOwnProperty(a)){var b=this._cache[a];if(b.expiration){var c=new Date;if(c.getTime()>b.expiration.getTime())return void this.remove(a)}return d.call(this,b),b.value}},c.prototype.getAll=function(){var a={};for(var b in this._cache){var c=this._cache[b];a[b]={value:c.value,expiration:c.expiration}}return a},c.prototype.put=function(a,b,c,g){Array.isArray(g)||(g="[object String]"==toString.call(g)?[g]:[]);var h={key:a,value:b,expiration:!1,tags:g};c=parseInt(c,10),isFinite(c)&&c>=0&&(h.expiration=new Date((new Date).getTime()+c)),d.call(this,h),this._cache[a]=h;var i=Object.keys(this._cache).length;return this._options.capacity>0&&i>this._options.capacity&&(f.call(this),Object.keys(this._cache).length>this._options.capacity&&e.call(this)),h},c.prototype.printFromHead=function(){if(!this._head)return"";for(var a=[],b=this._head;b;)a.push(b.key),b=b.next;return a.join(" > ")},c.prototype.printFromTail=function(){if(!this._tail)return"";for(var a=[],b=this._tail;b;)a.push(b.key),b=b.previous;return a.join(" < ")};var d=function(a){if(a!==this._head){var b=a.next,c=a.previous;b&&(b.previous=c),c&&(c.next=b),this._head?(a.next=this._head,this._head.previous=a):a.next=null,a.previous=null,this._head=a,this._tail===a&&(this._tail=c),this._tail||(this._tail=a)}},e=function(){this._head!==this._tail&&this._tail&&this.remove(this._tail.key)},f=function(){var a=new Date;Object.keys(this._cache).forEach(function(b){var c=this._cache[b];c.expiration&&a.getTime()>c.expiration.getTime()&&this.remove(b);
}.bind(this))};c.prototype.remove=function(a){if(this._cache.hasOwnProperty(a)){var b=this._cache[a],c=b.previous,d=b.next;c&&(c.next=d),d&&(d.previous=c),this._head===b&&(this._head=d),this._tail===b&&(this._tail=c),delete this._cache[a]}},c.prototype.removeAll=function(){this._cache={},this._head=null,this._tail=null},c.prototype.removeMatchingTag=function(a){Object.keys(this._cache).forEach(function(b){var c=this._cache[b];-1!==c.tags.indexOf(a)&&this.remove(b)}.bind(this))},a.exports=c},function(a,b,c){"use strict";b.decode=b.parse=c(11),b.encode=b.stringify=c(12)},function(a,b){"use strict";function c(a,b){return Object.prototype.hasOwnProperty.call(a,b)}a.exports=function(a,b,e,f){b=b||"&",e=e||"=";var g={};if("string"!=typeof a||0===a.length)return g;var h=/\+/g;a=a.split(b);var i=1e3;f&&"number"==typeof f.maxKeys&&(i=f.maxKeys);var j=a.length;i>0&&j>i&&(j=i);for(var k=0;k<j;++k){var l,m,n,o,p=a[k].replace(h,"%20"),q=p.indexOf(e);q>=0?(l=p.substr(0,q),m=p.substr(q+1)):(l=p,m=""),n=decodeURIComponent(l),o=decodeURIComponent(m),c(g,n)?d(g[n])?g[n].push(o):g[n]=[g[n],o]:g[n]=o}return g};var d=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)}},function(a,b){"use strict";function c(a,b){if(a.map)return a.map(b);for(var c=[],d=0;d<a.length;d++)c.push(b(a[d],d));return c}var d=function(a){switch(typeof a){case"string":return a;case"boolean":return a?"true":"false";case"number":return isFinite(a)?a:"";default:return""}};a.exports=function(a,b,g,h){return b=b||"&",g=g||"=",null===a&&(a=void 0),"object"==typeof a?c(f(a),function(f){var h=encodeURIComponent(d(f))+g;return e(a[f])?c(a[f],function(a){return h+encodeURIComponent(d(a))}).join(b):h+encodeURIComponent(d(a[f]))}).join(b):h?encodeURIComponent(d(h))+g+encodeURIComponent(d(a)):""};var e=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},f=Object.keys||function(a){var b=[];for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b}},function(a,b,c){var d=c(14),e=c(10),f=function(a,b,c){this.collection=a,this.props=b,this.query=c};f.prototype.id=function(){if("collection"!==this.collection.$type||!this.collection.$id||!this.collection.$expires)return!1;if(!Array.isArray(this.collection.items))return!1;var a=!1,b=this.collection.items,c=b.map(function(b){return b.$link?b.$link:b.$id?b.$id:void(a=!0)});if(a)return!1;var f=[].concat(this.props||[]).sort(),g=("string"==typeof this.query?this.query:e.stringify(this.query)).replace(/^\?/,"").split("&").filter(function(a){return!!a&&!a.match(/^props=/)}).sort(),h=JSON.stringify([c,f,g]),i=d(h);return'W/"'+i+'"'},a.exports=f},function(a,b,c){var d,e,f;!function(c,g){e=[],d=g,f="function"==typeof d?d.apply(b,e):d,!(void 0!==f&&(a.exports=f))}(this,function(){var a=function a(b){function c(a,b){return a>>>b|a<<32-b}for(var d,e,f=Math.pow,g=f(2,32),h="length",i="",j=[],k=8*b[h],l=a.h=a.h||[],m=a.k=a.k||[],n=m[h],o={},p=2;n<64;p++)if(!o[p]){for(d=0;d<313;d+=p)o[d]=p;l[n]=f(p,.5)*g|0,m[n++]=f(p,1/3)*g|0}for(b+="";b[h]%64-56;)b+="\0";for(d=0;d<b[h];d++){if(e=b.charCodeAt(d),e>>8)return;j[d>>2]|=e<<(3-d)%4*8}for(j[j[h]]=k/g|0,j[j[h]]=k,e=0;e<j[h];){var q=j.slice(e,e+=16),r=l;for(l=l.slice(0,8),d=0;d<64;d++){var s=q[d-15],t=q[d-2],u=l[0],v=l[4],w=l[7]+(c(v,6)^c(v,11)^c(v,25))+(v&l[5]^~v&l[6])+m[d]+(q[d]=d<16?q[d]:q[d-16]+(c(s,7)^c(s,18)^s>>>3)+q[d-7]+(c(t,17)^c(t,19)^t>>>10)|0),x=(c(u,2)^c(u,13)^c(u,22))+(u&l[1]^u&l[2]^l[1]&l[2]);l=[w+x|0].concat(l),l[4]=l[4]+w|0}for(d=0;d<8;d++)l[d]=l[d]+r[d]|0}for(d=0;d<8;d++)for(e=3;e+1;e--){var y=l[d]>>8*e&255;i+=(y<16?0:"")+y.toString(16)}return i};return a.code='var sha256=function a(b){function c(a,b){return a>>>b|a<<32-b}for(var d,e,f=Math.pow,g=f(2,32),h="length",i="",j=[],k=8*b[h],l=a.h=a.h||[],m=a.k=a.k||[],n=m[h],o={},p=2;64>n;p++)if(!o[p]){for(d=0;313>d;d+=p)o[d]=p;l[n]=f(p,.5)*g|0,m[n++]=f(p,1/3)*g|0}for(b+="\\x80";b[h]%64-56;)b+="\\x00";for(d=0;d<b[h];d++){if(e=b.charCodeAt(d),e>>8)return;j[d>>2]|=e<<(3-d)%4*8}for(j[j[h]]=k/g|0,j[j[h]]=k,e=0;e<j[h];){var q=j.slice(e,e+=16),r=l;for(l=l.slice(0,8),d=0;64>d;d++){var s=q[d-15],t=q[d-2],u=l[0],v=l[4],w=l[7]+(c(v,6)^c(v,11)^c(v,25))+(v&l[5]^~v&l[6])+m[d]+(q[d]=16>d?q[d]:q[d-16]+(c(s,7)^c(s,18)^s>>>3)+q[d-7]+(c(t,17)^c(t,19)^t>>>10)|0),x=(c(u,2)^c(u,13)^c(u,22))+(u&l[1]^u&l[2]^l[1]&l[2]);l=[w+x|0].concat(l),l[4]=l[4]+w|0}for(d=0;8>d;d++)l[d]=l[d]+r[d]|0}for(d=0;8>d;d++)for(e=3;e+1;e--){var y=l[d]>>8*e&255;i+=(16>y?0:"")+y.toString(16)}return i};',a})},function(a,b){"use strict";var c=function(a,b){this.XMLHttpRequest=a,this.Promise=b,this._timeout=3e4,this._headers={"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"}};c.prototype.setTimeout=function(a){return this._timeout=a,this},c.prototype.setHeader=function(a,b){return this._headers[a]=b,this},c.prototype.setHeaders=function(a){for(var b in a)a.hasOwnProperty(b)&&this.setHeader(b,a[b]);return this},c.prototype.request=function(a,b,c,e){var f=a.toUpperCase();"GET"===f&&(b+=-1===b.indexOf("?")?"?":"&",b+="_"+(new Date).getTime());var g=d({},this._headers,e),h=[],i=[];for(var j in g)g.hasOwnProperty(j)&&("function"!=typeof g[j]?(h.push(g[j]),i.push(j)):(h.push(g[j]()),i.push(j)));return Promise.all(h).then(function(a){return new this.Promise(function(d,e){var g=new this.XMLHttpRequest;i.forEach(function(b,c){g.setRequestHeader(b,a[c])}),g.open(f,b,!0),g.timeout=this._timeout,g.onreadystatechange=function(){if(4==g.readyState){try{var a=JSON.parse(g.responseText)}catch(a){e(a)}d(a)}};var h=c&&c.body?JSON.stringify(c.body):void 0;g.send(h)}.bind(this))}.bind(this))};var d=function(){for(var a=arguments[0],b=1,c=arguments.length;b<c;b++){var d=arguments[b];for(var e in d)d.hasOwnProperty(e)&&(a[e]=d[e])}return a};a.exports=c}]);