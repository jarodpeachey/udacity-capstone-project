!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=3)}([function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"e",(function(){return o})),n.d(t,"f",(function(){return r})),n.d(t,"b",(function(){return a})),n.d(t,"g",(function(){return s})),n.d(t,"d",(function(){return c})),n.d(t,"c",(function(){return d}));let i=document.getElementById("entry-button"),o=document.getElementById("header"),r=document.getElementById("start-date"),a=document.getElementById("end-date"),s=document.getElementById("zip"),c=document.getElementById("entry-section"),d=document.getElementById("entries")},function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));const i=(e,t)=>{console.log("Start: ",e),console.log("End: ",t);let n=new Array,i=e;for(;i<=t;)n.push(Math.floor(new Date(i).getTime()/1e3)),i.setDate(i.getDate()+1);return n}},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var i=n(0);function o(){document.addEventListener("scroll",()=>{window.scrollY>10?i.e.classList.add("scrolled"):i.e.classList.remove("scrolled")})}},function(e,t,n){"use strict";n.r(t),function(e){n(5);var t=n(1),i=n(0),o=n(2);Object(o.a)(),i.a.addEventListener("click",(async function(n){n.preventDefault(),""==i.g.value||""==i.f.value||""==i.b.value?alert("Please fill in all the fields."):async function(n){let o;await fetch(`http://api.geonames.org/postalCodeSearchJSON?username=jarodpeachey&postalcode=${n}&countryCode=US`).then(e=>o=e);const r=(await o.json()).postalCodes[0],a=new Date(i.f.value),s=new Date(i.b.value),c=Object(t.a)(a,s);await async function(t,n){let i;const o={...t,dates:n,key:e.env.DARK_SKY_KEY};await async function(e,t){let n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return await n.json()}("/requestWeather",o).then(e=>i=e);return i}(r,c).then(e=>o=e);o.success&&async function(){await async function(e){let t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}});return await t.json()}("/getWeather").then(e=>{var t;t=e,i.d.classList.add("show"),i.c.innerHTML="",t.map(e=>{const t=Object.values(e.weather),n=t[0],o=t[t.length-1],r=`${new Date(1e3*n.date).getMonth()+1}/${new Date(1e3*n.date).getDate()}/${new Date(1e3*n.date).getFullYear()}`,a=`${new Date(1e3*o.date).getMonth()+1}/${new Date(1e3*o.date).getDate()}/${new Date(1e3*o.date).getFullYear()}`;let s="<span>";t.map(e=>{s+=`<div class='entry-day'>\n              <div class='flex'>\n                <span class='weather-day'>\n                  ${new Date(1e3*e.date).toLocaleString("default",{weekday:"short",month:"short",day:"numeric"})}\n                </span>\n                <span class='weather-temp'>\n                  ${e.daily.data[0].temperatureHigh}°\n                </span>\n              </div>\n              <span class='weather-icon'>\n                ${e.daily.data[0].summary}\n              </span>\n            </div>`}),s+="</span>";const c=`\n    <div class="entry">\n      <img class="entry-image" src="${e.image.hits[0]?e.image.hits[0].webformatURL:"https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}" />\n      <div class="entry-flex">\n        <div>\n          <h1 class="entry-name">${e.location}</h1>\n          <span class="entry-info">${r} - ${a}</span>\n        </div>\n        <div class="entry-icon">\n          <span class="entry-info">\n            ${n.daily.data[0].summary}\n          </span>\n        </div>\n      </div>\n      <div class="entry-weather">\n        ${s}\n      </div>\n    </div>\n  `;i.c.innerHTML+=c})})}()}(i.g.value)}))}.call(this,n(4))},function(e,t){var n,i,o=e.exports={};function r(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===r||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:r}catch(e){n=r}try{i="function"==typeof clearTimeout?clearTimeout:a}catch(e){i=a}}();var c,d=[],l=!1,u=-1;function p(){l&&c&&(l=!1,c.length?d=c.concat(d):u=-1,d.length&&f())}function f(){if(!l){var e=s(p);l=!0;for(var t=d.length;t;){for(c=d,d=[];++u<t;)c&&c[u].run();u=-1,t=d.length}c=null,l=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===a||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];d.push(new h(e,t)),1!==d.length||l||s(f)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){var i=n(6),o=n(7);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var r={insert:"head",singleton:!1},a=(i(o,r),o.locals?o.locals:{});e.exports=a},function(e,t,n){"use strict";var i,o=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},r=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function s(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function c(e,t){for(var n={},i=[],o=0;o<e.length;o++){var r=e[o],c=t.base?r[0]+t.base:r[0],d=n[c]||0,l="".concat(c," ").concat(d);n[c]=d+1;var u=s(l),p={css:r[1],media:r[2],sourceMap:r[3]};-1!==u?(a[u].references++,a[u].updater(p)):a.push({identifier:l,updater:g(p,t),references:1}),i.push(l)}return i}function d(e){var t=document.createElement("style"),i=e.attributes||{};if(void 0===i.nonce){var o=n.nc;o&&(i.nonce=o)}if(Object.keys(i).forEach((function(e){t.setAttribute(e,i[e])})),"function"==typeof e.insert)e.insert(t);else{var a=r(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var l,u=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")});function p(e,t,n,i){var o=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(e.styleSheet)e.styleSheet.cssText=u(t,o);else{var r=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(r,a[t]):e.appendChild(r)}}function f(e,t,n){var i=n.css,o=n.media,r=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),r&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var h=null,m=0;function g(e,t){var n,i,o;if(t.singleton){var r=m++;n=h||(h=d(t)),i=p.bind(null,n,r,!1),o=p.bind(null,n,r,!0)}else n=d(t),i=f.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var i=0;i<n.length;i++){var o=s(n[i]);a[o].references--}for(var r=c(e,t),d=0;d<n.length;d++){var l=s(n[d]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}n=r}}}},function(e,t,n){(t=n(8)(!1)).push([e.i,"html,body{margin:0;padding:0;font-family:Arial, Helvetica, sans-serif}*{box-sizing:border-box}#app{font-family:'Raleway'}.container{margin:0 auto;width:95%}.container.padding{padding:64px 0}@media (min-width: 540px){.container{margin:0 auto;width:90%}}@media (min-width: 769px){.container{margin:0 auto;width:85%}}@media (min-width: 1024px){.container{margin:0 auto;width:80%;max-width:960px}}#header{transition-duration:0.3s;z-index:99999999999;background:transparent;height:58px;position:fixed;top:0;width:100%;left:0;padding-top:48px}#header .container{display:flex;align-items:center;justify-content:space-between;height:100%;min-width:95% !important;transition-duration:0.3s}#header .site-title{font-size:52px;color:white;margin:0;font-weight:600;transition-duration:0.3s}#header .menu{list-style:none;display:block;height:100%;display:flex;align-items:center;position:relative;transition-duration:0.3s;top:6px}#header .menu .menu-item{width:auto;height:100%;display:flex;align-items:center;margin:0 8px;transition-duration:0.3s}#header .menu .menu-item a{font-size:26px;color:white;font-weight:500;text-decoration:none;padding:8px;margin:0;transition-duration:0.3s}#header .menu .menu-item:hover a{color:#fabd0c}#header.scrolled{padding:8px 0;transition-duration:0.3s;background:#5bbab6;box-shadow:5px 0px 15px #5bbab586}#header.scrolled .menu{top:0;transition-duration:0.3s}#header.scrolled .site-title{font-size:38px;transition-duration:0.3s}#header.scrolled .menu-item a{font-size:20px;transition-duration:0.3s}#hero{overflow:hidden;height:100vh;display:flex;flex-direction:column;position:relative;align-items:center;justify-content:center;text-align:center;background:linear-gradient(#5bbab6, #96e9e5);z-index:2}#hero .container{min-width:85%}#hero img{position:absolute;width:500px;right:-250px;bottom:0;opacity:0.8}@media (min-width: 769px){#hero img{right:-100px;opacity:1}}@media (min-width: 960px){#hero img{right:0}}.hero-title{text-shadow:5px 5px 1px rgba(66,55,55,0.4),10px 10px 20px rgba(66,55,55,0.2);padding-bottom:4px;max-width:80%;z-index:99;color:white;font-size:64px;font-family:'Arial', sans-serif;text-align:left;margin-bottom:16px;position:relative}@media (min-width: 769px){.hero-title{font-size:82px;max-width:725px;margin-top:0}}.hero-title::after{display:block;background:#fabd0c;content:'';height:4px;width:50%;position:relative;top:16px}.hero-subtitle{color:white;z-index:99;font-size:22px;text-align:left;font-weight:bold;padding:16px;position:relative;color:white;max-width:650px;line-height:1.5em}#add-entry{background:white;position:relative;z-index:1}#add-entry .container{padding-top:36px}#add-entry .card{width:100%;max-width:620px;width:100%;border-radius:12px;padding:36px;margin:0 auto;background:white;border-radius:5px;box-shadow:2px 3px 10px 1px rgba(155,155,155,0.37)}#add-entry::after{content:'';display:block;width:200%;left:-50%;height:500px;background:#e0e0e0;position:absolute;top:300px;z-index:-1;transform:rotate(-8deg)}.title{margin-top:0;color:black;width:100%;font-size:40px;padding-bottom:12px;width:fit-content;margin:0 auto;margin-bottom:48px}.title::after{display:block;background:#fabd0c;content:'';height:4px;width:50%;margin:0 auto;position:relative;top:16px}#entry-section{display:none;position:relative;z-index:1;margin-top:64px}#entry-section::before{content:'';display:block;width:200%;left:-50%;height:500px;background:white;position:absolute;top:65px;z-index:-1;transform:rotate(8deg)}#entry-section .title span{color:white;font-weight:800;mix-blend-mode:difference}#entry-section.show{display:block !important}.row{display:flex;flex-wrap:wrap;margin:0 -14px 0 -14px;width:calc(100% + 28px)}.col{padding:24px 14px;margin:0;display:block;width:100%}@media (min-width: 576px){.col-6{width:50%}}label{width:100%;margin-bottom:12px;display:block;font-family:montserrat;font-weight:500}input,textarea{width:100%;padding:16px;border-radius:5px;background:#e7e7e7;border:none}button{padding:12px;border:none;border-radius:5px;background:#5bbab6;color:white;margin:0 12px;font-size:18px;margin-left:auto;cursor:pointer}button:hover{background:#33e4eb;transition-duration:0.25s}.entry{border-radius:3px;background:#f7f7f7;padding:24px;margin-bottom:16px}.entry-flex{display:flex;align-items:center;justify-content:flex-start}.entry-icon{margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;height:100%}.entry-icon i{color:#535252;font-size:35px}.entry-icon span{display:block;font-size:16px;margin-left:12px}.entry-name{margin:0}.entry-image{width:100%;margin-bottom:18px}.entry-weather{margin-top:32px}.entry-day{padding:12px;background:white;margin:14px 0}.entry-day .flex{display:flex;align-items:center;justify-content:flex-start}.weather-day{font-weight:bold;font-size:20px}.weather-temp{font-size:28px;margin-left:auto}.weather-icon{display:block;font-size:16px;color:#535252}.weather-icon i{position:relative;top:2px}.entry-temp-indicator{font-size:48px;font-weight:normal}.entry-feelings{width:100%;margin:0;font-size:17px}.entry-feelings p{margin-bottom:2px}.entry-date{margin-left:auto;position:relative;top:6px}input{display:block}h1{font-size:36px}input:focus,select:focus,textarea:focus,button:focus{outline:none}\n",""]),e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var o=(a=i,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),r=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(e," */")}));return[n].concat(r).concat([o]).join("\n")}var a,s,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(i)for(var r=0;r<this.length;r++){var a=this[r][0];null!=a&&(o[a]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);i&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}}]);