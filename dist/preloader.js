(()=>{"use strict";!0===window.matchMedia("(prefers-reduced-motion: reduce)")||window.matchMedia("(prefers-reduced-motion: reduce)").matches,window.location.href.includes("webflow.io");const e=(e,t)=>{const{addClass:o,removeClass:n,action:r,timeout:s}=t;return new Promise((t=>{const d=o=>{o&&o.target!==e||(e.removeEventListener("transitionend",d),t(e))};if(s?setTimeout((()=>{d()}),s):e.addEventListener("transitionend",d),r)return r(e);o&&e.classList.add(o),n&&e.classList.remove(n)}))};!function(){const t="preloaded",o=document.querySelector(".preloader");if(!o)return;const n=o.querySelector(".preloader__indicator"),r=n.querySelector(".preloader__indicator-value");let s=0,d=0,i=null;const a=o.closest(".preloaderscript"),c="true"===a?.dataset?.mainPage;function u(){return document.documentElement.classList.remove("popup-opened"),o.remove(),sessionStorage.setItem(t,"true"),Promise.resolve()}function l(t=!1){if(t)return o.remove();e(o,{addClass:"loaded",timeout:800}).then((()=>e(o,{addClass:"hidden"}))).then((()=>{if(!c)return u();e(o,{addClass:"transparent"}).then(u)}))}function m(e){e<s||(s=e,d<s&&(clearTimeout(i),i=setTimeout((()=>p(d+1)),50)))}function p(e=0){if(d=e,n.style.setProperty("--value",d),r.textContent=`${d}%`,100===d)return l();if(d===s)return void(i=null);const t=50*(1-(s-d)/s);clearTimeout(i),i=setTimeout((()=>p(d+1)),t)}"true"===sessionStorage.getItem(t)?(l(!0),window.setPreloader=()=>{}):(c&&o.classList.add("main-page"),n.classList.add("shown"),document.documentElement.classList.add("popup-opened"),window.addEventListener("load",(()=>m(100))),window.setPreloader=m)}()})();