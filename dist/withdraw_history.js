(()=>{"use strict";function t(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,n){if(!t)return;if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return e(t,n)}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0,a=function(){};return{s:a,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return c=t.done,t},e:function(t){u=!0,i=t},f:function(){try{c||null==r.return||r.return()}finally{if(u)throw i}}}}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}document.addEventListener("DOMContentLoaded",(function(){var e=JSON.parse(localStorage.getItem("withdrawals"));if(e){var n,r=document.getElementById("history"),o=t(e);try{for(o.s();!(n=o.n()).done;){var a=n.value,i=document.createElement("p");i.classList.add("history","my-3","py-2"),i.innerHTML="".concat(a.date," withdrawal operation, amount ").concat(a.currency," ").concat(a.amount),r.append(i)}}catch(t){o.e(t)}finally{o.f()}}})),document.getElementById("clear-hist-btn").addEventListener("click",(function(){var t=document.getElementById("history");localStorage.removeItem("withdrawals"),t.innerHTML=""}))})();