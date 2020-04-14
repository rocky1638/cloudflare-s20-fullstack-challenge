!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t,r){"use strict";var n=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==n)return n;throw new Error("unable to locate global object")}();e.exports=t=n.fetch,t.default=n.fetch.bind(n),t.Headers=n.Headers,t.Request=n.Request,t.Response=n.Response},function(e,t,r){"use strict";
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */t.parse=function(e,t){if("string"!=typeof e)throw new TypeError("argument str must be a string");for(var r={},o=t||{},a=e.split(i),u=o.decode||n,c=0;c<a.length;c++){var l=a[c],f=l.indexOf("=");if(!(f<0)){var p=l.substr(0,f).trim(),d=l.substr(++f,l.length).trim();'"'==d[0]&&(d=d.slice(1,-1)),null==r[p]&&(r[p]=s(d,u))}}return r},t.serialize=function(e,t,r){var n=r||{},i=n.encode||o;if("function"!=typeof i)throw new TypeError("option encode is invalid");if(!a.test(e))throw new TypeError("argument name is invalid");var s=i(t);if(s&&!a.test(s))throw new TypeError("argument val is invalid");var u=e+"="+s;if(null!=n.maxAge){var c=n.maxAge-0;if(isNaN(c))throw new Error("maxAge should be a Number");u+="; Max-Age="+Math.floor(c)}if(n.domain){if(!a.test(n.domain))throw new TypeError("option domain is invalid");u+="; Domain="+n.domain}if(n.path){if(!a.test(n.path))throw new TypeError("option path is invalid");u+="; Path="+n.path}if(n.expires){if("function"!=typeof n.expires.toUTCString)throw new TypeError("option expires is invalid");u+="; Expires="+n.expires.toUTCString()}n.httpOnly&&(u+="; HttpOnly");n.secure&&(u+="; Secure");if(n.sameSite){switch("string"==typeof n.sameSite?n.sameSite.toLowerCase():n.sameSite){case!0:u+="; SameSite=Strict";break;case"lax":u+="; SameSite=Lax";break;case"strict":u+="; SameSite=Strict";break;case"none":u+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return u};var n=decodeURIComponent,o=encodeURIComponent,i=/; */,a=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function s(e,t){try{return t(e)}catch(t){return e}}},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),i=r(1),a=r.n(i);class s{constructor(e,t){this.selector=e,this.variant=t}element(e){switch(this.selector){case"title":e.setInnerContent("Rock's Cloudflare Challenge");break;case"h1#title":e.setInnerContent(this.variant?"Open Beta":"Current Version");break;case"p#description":e.setInnerContent(this.variant?"Welcome to the open beta! Take a look around.":"Welcome back.");break;case"a#url":e.setInnerContent("Visit my website!").setAttribute("href","https://rockzhou.com")}}}var u=(e,t)=>(new HTMLRewriter).on("title",new s("title",t)).on("h1#title",new s("h1#title",t)).on("p#description",new s("p#description",t)).on("a#url",new s("a#url",t)).transform(e);var c={COOKIE_KEY:"rockzhou_cloudflare_key"};addEventListener("fetch",e=>{e.respondWith(l(e.request))});const l=async e=>{const t=await o()("https://cfw-takehome.developers.workers.dev/api/variants"),r=await t.json(),{variants:n}=r,i=a.a.parse(e.headers.get("Cookie")||"")[c.COOKIE_KEY];let s;s=void 0===i?Math.round(Math.random()):i;const l=n[s],f=await o()(l);let p=u(f,s);if(void 0===i){const e=a.a.serialize(c.COOKIE_KEY,String(s),{maxAge:604800});p.headers.set("Set-Cookie",e)}return p}}]);