(()=>{"use strict";const e=()=>document.documentElement.clientWidth>991,t=(e,t,n=200)=>{let o,r;window.addEventListener("resize",(()=>{clearTimeout(o),o=setTimeout((()=>{const n=t();n!==r&&(e(n),r=n)}),n)}))},n=!0===window.matchMedia("(prefers-reduced-motion: reduce)")||!0===window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=window.location.href.includes("webflow.io"),r=(e,t)=>{const{addClass:n,removeClass:o,action:r,timeout:s}=t;return new Promise((t=>{const i=n=>{n&&n.target!==e||(e.removeEventListener("transitionend",i),t(e))};if(s?setTimeout((()=>{i()}),s):e.addEventListener("transitionend",i),r)return r(e);n&&e.classList.add(n),o&&e.classList.remove(o)}))},s=["guides","tutorials","libraries","printed art","walpapers","cources","trainings"];o||(document.addEventListener("contextmenu",(e=>e.preventDefault())),document.addEventListener("copy",(e=>e.preventDefault()))),window.scrollBarListener||(window.scrollBarListener=new ResizeObserver((()=>{const e=document.documentElement.style.getPropertyValue("--scroll-bar-width"),t=window.innerWidth-document.documentElement.clientWidth;e!==`${t}px`&&document.documentElement.style.setProperty("--scroll-bar-width",`${t}px`)})),window.scrollBarListener.observe(document.documentElement));const i=function(){const n=document.querySelector(".mobilemenu");if(!n)return;const o={desktop:document.querySelector(".menulinks"),mobile:document.querySelector(".tabletmenulinks")},r=.2*document.body.clientWidth;let s,i;function c(e){e?(s=o.desktop,document.removeEventListener("scroll",a)):(s=o.mobile||o.desktop,document.addEventListener("scroll",a),a()),i=s.querySelectorAll("a"),s.style.setProperty("--num-steps",i.length)}function a(){window.scrollY>r?n.classList.add("shrink"):n.classList.remove("shrink")}return t(c,e,250),c(e()),function(e){s.style.setProperty("--step",e),i.forEach(((t,n)=>{e===n?t.classList.remove("inactive"):t.classList.add("inactive")}))}}();!function(n,o){const r=[...document.querySelectorAll('[data-animation="sections"]')].filter((e=>"educational"!==e.dataset.section)),s=25,i="section-",c=[...r].map((e=>e.dataset.section));let a,d,l=-1;function u(e){a&&a.disconnect(),d&&d.disconnect();const t=function(e){let t="0% 0% -50% 0%",n="-50% 0% 0% 0%";e||(t="0% 0% -30% 0%",n="-70% 0% 0% 0%");return{topObserver:new IntersectionObserver(h,{rootMargin:t,threshold:1}),bottomObserver:new IntersectionObserver(p,{rootMargin:n,threshold:1})}}(e);a=t.topObserver,d=t.bottomObserver,r.forEach((e=>{const{top:t}=e.getBoundingClientRect();t>document.documentElement.clientHeight/2-s?a.observe(e):d.observe(e)})),m()}function m(){const e=[...r].find((e=>{const{top:t}=e.getBoundingClientRect();return t>document.documentElement.clientHeight/2-s}));g(e?f(e.dataset.section)-1:c.length-1)}function h(e){e.forEach((e=>{const{isIntersecting:t,target:n}=e;t&&(g(f(n.dataset.section)),a.unobserve(n),d.observe(n))}))}function p(e){e.forEach((e=>{const{isIntersecting:t,target:n}=e;t&&(g(f(n.dataset.section)-1),d.unobserve(n),a.observe(n))}))}function f(e){return c.indexOf(e)}function g(e){if(e===l)return;const t=c[e],r=c[l];r&&document.body.classList.remove(`${i}${r}`),e>-1?(document.body.classList.add(`${i}${t}`),o(e),n?.(t)):o(0),l=e,setTimeout((()=>{const e=getComputedStyle(document.body).getPropertyValue("--color");window.setCursorColor?.(e)}),50)}t(u,e),u(e()),m()}(function(){if(n)return;const e=[...document.querySelectorAll('[data-animation="glitch"]')].reduce(((e,t)=>{const{section:n}=t.dataset;return e[n]||(e[n]=[]),e[n].push(t),e}),{});function t(e,t){return e.firstElementChild.textContent=function(e){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=",n=[];for(let o=0;o<e;o++){const e=Math.floor(91*Math.random());n.push(t.charAt(e))}return n.join("")}(t),Promise.resolve(e)}function o(e){return new Promise((t=>setTimeout((()=>{t(e)}),100)))}return function(n){e[n]&&(e[n].forEach((async(e,n)=>async function(e,n){const r=e.firstElementChild.textContent,s=r.length,i=[];for(let e=0;e<8;e++)i.push((e=>t(e,s)),o);i.reduce(((e,t)=>e.then(t)),new Promise((t=>setTimeout((()=>t(e)),n)))).then((e=>e.textContent=r))}(e,100*n))),e[n]=null)}}(),i),function(){function e(e){r(e,{addClass:"transparent"}).then((()=>{e.classList.add("hidden"),document.documentElement.classList.remove("popup-opened")}))}document.querySelectorAll("[data-popup-id]").forEach((t=>{t.classList.add("common-popup");const n=t.dataset.popupId,o=document.querySelector(`[data-popup-trigger="${n}"]`);if(!o)return console.error(`No trigger for the ${n} popup`);const s=t.querySelector("[data-popup-close]");o.addEventListener("click",(()=>function(e){r(e,{addClass:"transparent",timeout:5}).then((()=>r(e,{removeClass:"hidden",timeout:5}))).then((()=>{r(e,{removeClass:"transparent"})})),document.documentElement.classList.add("popup-opened")}(t))),s.addEventListener("click",(()=>e(t))),t.addEventListener("click",(n=>{n?.target===t&&e(t)}))}))}(),function(){if(n)return;const e=15,t=1+2*e/100,o=new IntersectionObserver((function(t){return t.forEach((t=>{const{isIntersecting:n,target:o,boundingClientRect:{bottom:r,height:i}}=t;n?(s.add(o),d(o,c(r,i))):(s.delete(o),d(o,r<0?e:0))})),s.size>0&&!i?(document.addEventListener("scroll",a),void(i=!0)):0===s.size&&i?(document.removeEventListener("scroll",a),void(i=!1)):void 0})),r=document.querySelectorAll('[data-animation="parallax"], .portfolioimage'),s=new Set([]);let i=!1;function c(t,n){const o=document.documentElement.clientHeight,r=1+e*(t/(o+n));return Math.round(1e3*(r+Number.EPSILON))/1e3}function a(){s.forEach((e=>{const{bottom:t,height:n}=e.getBoundingClientRect();d(e,c(t,n))}))}function d(e,t){e.style.setProperty("--shift",t)}r.forEach((e=>{e.style.setProperty("--zoom",t),o.observe(e)})),window.addEventListener("load",a)}(),function(){if("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0||n)return;const e=getComputedStyle(document.documentElement);let t=e.getPropertyValue("--page-color")||e.getPropertyValue("--red")||"#bb4b36";const o=window.devicePixelRatio||1;let r=document.querySelector("canvas.cursor-canvas");r||(r=document.createElement("canvas"),r.classList.add("cursor-canvas"),document.body.appendChild(r));const s=r.getContext("2d"),i=document.querySelectorAll('a, [data-animation="cursor-hover"], .portfolioimage');window.setCursorColor=e=>t=e;const c={width:window.innerWidth,height:window.innerHeight},a={x:c.width/2,y:c.height/2},d={radius:8,targetRadius:8,lastX:a.x,lastY:a.y};let l;function u(){c.width=r.width=window.innerWidth*o,c.height=r.height=window.innerHeight*o,o>1&&s.scale(o,o)}function m(e,t,n){return(1-n)*e+n*t}u(),requestAnimationFrame((function e(n){l||(l=n);const o=.01*(n-l);d.lastX=m(d.lastX,a.x,o),d.lastY=m(d.lastY,a.y,o),function(e){d.radius=function(e,t,n){const o=t-e,r=.8*Math.sign(o)*Math.cbrt(.05*n*Math.abs(o)*Math.abs(o));return Math.abs(r)<.1?t:e+r}(d.radius,d.targetRadius,e)}(o),s.fillStyle=t,s.globalAlpha=.4,s.clearRect(0,0,c.width,c.height),s.beginPath(),s.arc(d.lastX,d.lastY,d.radius,0,2*Math.PI,!1),s.closePath(),s.fill(),l=n,requestAnimationFrame(e)})),window.addEventListener("mousemove",(e=>{a.x=e.clientX,a.y=e.clientY})),window.addEventListener("resize",u,!1),i.forEach((e=>{e.addEventListener("mouseenter",(()=>d.targetRadius=25),!1),e.addEventListener("mouseleave",(()=>d.targetRadius=8),!1)}))}(),function(){const e=document.querySelector('[data-style="runner-container"]');e&&new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting?e.target.classList.add("animated"):e.target.classList.remove("animated")}))})).observe(e)}(),function(){if(n)return;const e=document.querySelectorAll('[data-animation="appear-by-line"]');if(!e?.length)return;const t=new ResizeObserver((e=>{for(const t of e)s(t.target.original)})),o=new IntersectionObserver((e=>{e.forEach((e=>{const{isIntersecting:n,target:s}=e;var i;n&&(i=s,t.unobserve(i),r(i.lastSpan,{action:()=>i.classList.add("shown")}).then((()=>{i.original.classList.remove("hidden"),i.remove()})),o.unobserve(s))}))}),{rootMargin:"-20% 0% -20% 0%",threshold:1});function s(e){const n=e.clone||e.cloneNode(),r=e.innerText.match(/\S+/g)||[],s=[];let i="",c="",a=0;const d=getComputedStyle(e).lineHeight;e.after(n),n.style.setProperty("--line-height",d),e.classList.add("hidden");for(var l=0;l<r.length;l++){const e=c+r[l]+" ";i+=r[l]+" ",n.innerText=i,0!==a&&n.clientHeight>a?(s.push(c.trim()),c=r[l]+" "):c=e,a=n.clientHeight}s.push(c.trim()),n.innerHTML="",s.forEach(((e,t)=>{const o=document.createElement("span");o.textContent=e;const r=document.createElement("p");r.appendChild(o),n.appendChild(r),t===s.length-1&&(n.lastSpan=o)})),e.clone||(e.clone=n,n.original=e,t.observe(n),o.observe(n))}e.forEach(s)}(),function(){const e=document.querySelector(".cominsoonprogress");if(!e)return;const t=document.querySelector(".cominsoonprogress span"),n=document.querySelector(".comingsooncategorytext");let o;const i=new IntersectionObserver((e=>{e[0].isIntersecting?a(0):clearTimeout(o)}),{threshold:0}),c=new IntersectionObserver((n=>{n[0].isIntersecting&&(r(e,{addClass:"shown"}).then((()=>t.classList.add("shown"))),c.disconnect())}),{threshold:0,rootMargin:"-15% 0% -15% 0%"});function a(e=0){clearInterval(o),n.textContent=s[e];const t=e<s.length-1?e+1:0;o=setTimeout((()=>a(t)),500)}i.observe(n),c.observe(e)}()})();