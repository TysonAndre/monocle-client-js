!function(){"use strict";var a="undefined"!=typeof exports?exports:window;if("function"==typeof require){a.Promise||require("bluebird")}var b=function(a){this._http=a,this._base="/"};b.prototype.setBase=function(a){this._base=a},["get","post","put","patch","delete","options"].forEach(function(a){b.prototype[a]=function(b,c){var d=(this._base+b).replace(/\/{2,}/g,"/");return this._http.request(a.toUpperCase(),d,c)}}),"undefined"!=typeof exports?module.exports=b:a.Monocle=b}(),function(){"use strict";function a(a,b,c){this._$http=a,this._$q=b,this._$window=c,this._timeout=1e4}var b="undefined"!=typeof exports?exports:window;if(a.prototype.setTimeout=function(a){this._timeout=parseInt(a,10)||1e4},a.prototype.request=function(a,b,c){var d={"x-tagged-client-url":this._$window.location.href,"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8","X-Requested-With":"XMLHttpRequest"};return this._$http({method:a.toUpperCase(),url:b,timeout:this._timeout,headers:d})["catch"](function(a){return this._$q.reject(a.data)}.bind(this)).then(function(a){return a.data})},"undefined"!=typeof exports)module.exports=a;else{var c=b.Monocle||{};c.AngularAdapter=a}}(),function(){"use strict";var a=function(a,b){var c=a.module("monocle",[]);c.provider("monocle",function(){this._base="/",this.setBase=function(a){this._base=a},this.$get=function(a,c,d){var e=new b.AngularAdapter(a,c,d),f=new b(e);return f.setBase(this._base),["get","post","put","patch","delete","options"].forEach(function(a){f[a]=function(d,e){return c.when(b.prototype[a].call(this,d,e))}}.bind(this)),f},this.$get.$provide=["$http","$q","$window"]})};"undefined"!=typeof exports?module.exports=a:Monocle.angularWrapper=a}(),Monocle.angularWrapper(angular,Monocle);