(()=>{"use strict";!0===window.matchMedia("(prefers-reduced-motion: reduce)")||window.matchMedia("(prefers-reduced-motion: reduce)").matches,window.location.href.includes("webflow.io");const e=(e,t)=>{const{addClass:o,removeClass:s,action:n,timeout:r}=t;return new Promise((t=>{const d=o=>{o&&o.target!==e||(e.removeEventListener("transitionend",d),t(e))};if(r?setTimeout((()=>{d()}),r):e.addEventListener("transitionend",d),n)return n(e);o&&e.classList.add(o),s&&e.classList.remove(s)}))};!function(){const t="preloaded",o=document.querySelector(".preloader");if(!o)return;const s=o.querySelector(".preloader__indicator"),n=s.querySelector(".preloader__indicator-value");let r=0,d=0,a=null;const i={isPageLoaded:!1,isTextReady:!1},c=o.closest(".preloaderscript"),l="true"===c?.dataset?.mainPage;function u(){return document.documentElement.classList.remove("popup-opened"),o.remove(),sessionStorage.setItem(t,"true"),Promise.resolve()}function m(t=!1){if(t)return o.remove();e(o,{addClass:"loaded",timeout:800}).then((()=>e(o,{addClass:"hidden"}))).then((()=>{if(!l)return u();e(o,{addClass:"transparent"}).then(u)}))}function p(e){e<r||(r=e,d<r&&(clearTimeout(a),a=setTimeout((()=>f(d+1)),50)))}function f(e=0){if(d=e,s.style.setProperty("--value",d),n.textContent=`${d}%`,100===d)return w({isPageLoaded:!0});if(d===r)return void(a=null);const t=50*(1-(r-d)/r);clearTimeout(a),a=setTimeout((()=>f(d+1)),t)}function w({isTextReady:e=!1,isPageLoaded:t=!1}){t&&(i.isPageLoaded=t),e&&(i.isTextReady=e),console.log(i.isPageLoaded,i.isTextReady),i.isPageLoaded&&i.isTextReady&&m()}"true"===sessionStorage.getItem(t)?(m(!0),window.setPreloader=()=>{}):(l&&o.classList.add("main-page"),s.classList.add("shown"),function(){const t=o.querySelector(".preloader__text"),s=t.querySelectorAll("span");s.forEach(((e,t)=>{const o=.04*t;e.style.setProperty("--delay",`${o}s`)})),setTimeout((()=>{e(s[s.length-1],{action:()=>t.classList.add("transition","shown")}).then((()=>{setTimeout((()=>w({isTextReady:!0})),500)}))}),5)}(),document.documentElement.classList.add("popup-opened"),window.addEventListener("load",(()=>p(100))),window.setPreloader=p)}()})();