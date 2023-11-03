(()=>{"use strict";!0===window.matchMedia("(prefers-reduced-motion: reduce)")||window.matchMedia("(prefers-reduced-motion: reduce)").matches,window.location.href.includes("webflow.io");const e=()=>document.documentElement.classList.add("popup-opened"),t=(e,t)=>new class{constructor(e,t){this.element=e,this.handler=null,this.timeout=null,this.promise=this.createPromise(e,t)}createPromise(e,t){const{addClass:s,removeClass:o,action:n,timeout:i}=t;return new Promise((t=>{if(this.handler=s=>{s&&(s.target!==e||s.pseudoElement)||(e.removeEventListener("transitionend",this.handler),t(e))},i?this.timeout=setTimeout((()=>{t(e)}),i):e.addEventListener("transitionend",this.handler),n)return n(e);s&&this.addClasses(e,s),o&&this.removeClasses(e,o)}))}break(){clearTimeout(this.timeout),this.element.removeEventListener("transitionend",this.handler)}addClasses(e,t){Array.isArray(t)?e.classList.add(...t):e.classList.add(t)}removeClasses(e,t){Array.isArray(t)?e.classList.remove(...t):e.classList.remove(t)}}(e,t).promise,s=new Event("page-ready");!function(){const o="preloaded",n=document.querySelector(".preloader");if(!n)return;const i=n.querySelector(".preloader__indicator"),r=i.querySelector(".preloader__indicator-value");let a=0,d=0,l=null;const c={isPageLoaded:!1,isTextReady:!1},u=n.closest(".preloaderscript"),m="true"===u?.dataset?.mainPage;if("true"===sessionStorage.getItem(o))w(!0),window.setPreloader=()=>{};else{m&&n.classList.add("main-page");const s=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scroll-bar-width",`${s}px`),i.classList.add("shown"),function(){const e=n.querySelector(".preloader__text"),s=e.querySelectorAll("span");s.forEach(((e,t)=>{const s=.04*t;e.style.setProperty("--delay",`${s}s`)})),setTimeout((()=>{t(s[s.length-1],{action:()=>e.classList.add("transition","shown")}).then((()=>{setTimeout((()=>v({isTextReady:!0})),500)}))}),5)}(),setTimeout(e,50),window.addEventListener("load",(()=>y(100))),window.setPreloader=y}function h(){window.dispatchEvent(s)}function p(){return document.documentElement.classList.remove("popup-opened"),n.remove(),sessionStorage.setItem(o,"true"),h(),Promise.resolve()}function w(e=!1){if(e)return setTimeout(h,500),n.remove();t(n,{addClass:"loaded",timeout:800}).then((()=>t(n,{addClass:"hidden"}))).then((()=>{if(!m)return p();window.glitchSection?.("ai"),t(n,{addClass:"transparent"}).then(p)}))}function y(e){e<a||(a=e,d<a&&(clearTimeout(l),l=setTimeout((()=>f(d+1)),50)))}function f(e=0){if(d=e,i.style.setProperty("--value",d),r.textContent=`${d}%`,100===d)return v({isPageLoaded:!0});if(d===a)return void(l=null);const t=50*(1-(a-d)/a);clearTimeout(l),l=setTimeout((()=>f(d+1)),t)}function v({isTextReady:e=!1,isPageLoaded:t=!1}){t&&(c.isPageLoaded=t),e&&(c.isTextReady=e),c.isPageLoaded&&c.isTextReady&&w()}}()})();