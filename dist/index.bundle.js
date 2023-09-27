(()=>{"use strict";const e=()=>document.documentElement.clientWidth>991,t=(e,t,n=200)=>{let o,r;window.addEventListener("resize",(()=>{clearTimeout(o),o=setTimeout((()=>{const n=t();n!==r&&(e(n),r=n)}),n)}))},n=!0===window.matchMedia("(prefers-reduced-motion: reduce)")||!0===window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=window.location.href.includes("webflow.io"),r=["guides","tutorials","libraries","printed art","walpapers","cources","trainings"];o||(document.addEventListener("contextmenu",(e=>e.preventDefault())),document.addEventListener("copy",(e=>e.preventDefault()))),window.scrollBarListener||(window.scrollBarListener=new ResizeObserver((()=>{const e=document.documentElement.style.getPropertyValue("--scroll-bar-width");console.log("currentValue",e);const t=window.innerWidth-document.documentElement.clientWidth;console.log("scrollBarWidth",t),e!==`${t}px`&&document.documentElement.style.setProperty("--scroll-bar-width",`${t}px`)})),window.scrollBarListener.observe(document.documentElement));const i=function(){const n=document.querySelector(".mobilemenu"),o={desktop:document.querySelector(".menulinks"),mobile:document.querySelector(".tabletmenulinks")},r=.2*document.body.clientWidth;let i,s;function c(e){e?(i=o.desktop,document.removeEventListener("scroll",a)):(i=o.mobile||o.desktop,document.addEventListener("scroll",a),a()),s=i.querySelectorAll("a"),i.style.setProperty("--num-steps",s.length)}function a(){window.scrollY>r?n.classList.add("shrink"):n.classList.remove("shrink")}return t(c,e,250),c(e()),function(e){i.style.setProperty("--step",e),s.forEach(((t,n)=>{e===n?t.classList.remove("inactive"):t.classList.add("inactive")}))}}();!function(n,o){const r=[...document.querySelectorAll('[data-animation="sections"]')].filter((e=>"educational"!==e.dataset.section)),i=25,s="section-",c=[...r].map((e=>e.dataset.section));let a,d,l=-1;function u(e){a&&a.disconnect(),d&&d.disconnect();const t=function(e){let t="0% 0% -50% 0%",n="-50% 0% 0% 0%";e||(t="0% 0% -30% 0%",n="-70% 0% 0% 0%");return{topObserver:new IntersectionObserver(h,{rootMargin:t,threshold:1}),bottomObserver:new IntersectionObserver(f,{rootMargin:n,threshold:1})}}(e);a=t.topObserver,d=t.bottomObserver,r.forEach((e=>{const{top:t}=e.getBoundingClientRect();t>document.documentElement.clientHeight/2-i?a.observe(e):d.observe(e)})),m()}function m(){const e=[...r].find((e=>{const{top:t}=e.getBoundingClientRect();return t>document.documentElement.clientHeight/2-i}));v(e?g(e.dataset.section)-1:c.length-1)}function h(e){e.forEach((e=>{const{isIntersecting:t,target:n}=e;t&&(v(g(n.dataset.section)),a.unobserve(n),d.observe(n))}))}function f(e){e.forEach((e=>{const{isIntersecting:t,target:n}=e;t&&(v(g(n.dataset.section)-1),d.unobserve(n),a.observe(n))}))}function g(e){return c.indexOf(e)}function v(e){if(e===l)return;const t=c[e],r=c[l];r&&document.body.classList.remove(`${s}${r}`),e>-1?(document.body.classList.add(`${s}${t}`),o(e),n?.(t)):o(0),l=e}t(u,e),u(e()),m()}(function(){const e=[...document.querySelectorAll('[data-animation="glitch"]')].reduce(((e,t)=>{const{section:n}=t.dataset;return e[n]||(e[n]=[]),e[n].push(t),e}),{});function t(e,t){return e.firstElementChild.textContent=function(e){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=",n=[];for(let o=0;o<e;o++){const e=Math.floor(91*Math.random());n.push(t.charAt(e))}return n.join("")}(t),Promise.resolve(e)}function n(e){return new Promise((t=>setTimeout((()=>{t(e)}),150)))}return function(o){e[o]&&(e[o].forEach((async(e,o)=>async function(e,o){const r=e.firstElementChild.textContent,i=r.length,s=[];for(let e=0;e<6;e++)s.push((e=>t(e,i)),n);s.reduce(((e,t)=>e.then(t)),new Promise((t=>setTimeout((()=>t(e)),o)))).then((e=>e.textContent=r))}(e,150*o))),e[o]=null)}}(),i),function(){const e=document.querySelector(".burgermenu"),t=document.querySelector('[data-trigger="burger"]'),n=document.querySelector(".burgermenubutton");t.addEventListener("click",(function(){e.classList.add("opened"),document.documentElement.classList.add("popup-opened")})),n.addEventListener("click",(function(){e.classList.remove("opened"),document.documentElement.classList.remove("popup-opened")}))}(),function(){const e=15,t=1+2*e/100,n=new IntersectionObserver((function(t){t.forEach((t=>{const{isIntersecting:n,target:a,boundingClientRect:{bottom:d,height:l}}=t;n?(o.add(a),o.size>0&&!r&&(document.addEventListener("scroll",s),r=!0),c(a,i(d,l))):(o.delete(a),0===o.size&&r&&(document.removeEventListener("scroll",s),r=!1),c(a,d<0?e:0))}))}));document.querySelectorAll('[data-animation="parallax"], .portfolioimage').forEach((e=>{e.style.setProperty("--zoom",t),n.observe(e)}));const o=new Set([]);let r=!1;function i(t,n){const o=document.documentElement.clientHeight,r=1+e*(t/(o+n));return Math.round(1e3*(r+Number.EPSILON))/1e3}function s(){o.forEach((e=>{const{bottom:t,height:n}=e.getBoundingClientRect();c(e,i(t,n))}))}function c(e,t){e.style.setProperty("--shift",t)}}(),function(){if("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)return;const e=window.devicePixelRatio||1,t=document.createElement("canvas");t.classList.add("cursor-canvas");const n=t.getContext("2d");document.body.appendChild(t);const o=document.querySelectorAll('a, [data-animation="cursor-hover"], .portfolioimage'),r={width:window.innerWidth,height:window.innerHeight},i={x:r.width/2,y:r.height/2},s={radius:6,targetRadius:6,lastX:i.x,lastY:i.y};let c;function a(){r.width=t.width=window.innerWidth*e,r.height=t.height=window.innerHeight*e,e>1&&n.scale(e,e)}function d(e,t,n){return(1-n)*e+n*t}a(),requestAnimationFrame((function e(t){c||(c=t);const o=.01*(t-c);s.lastX=d(s.lastX,i.x,o),s.lastY=d(s.lastY,i.y,o),function(e){s.radius=function(e,t,n){const o=t-e,r=.8*Math.sign(o)*Math.cbrt(.05*n*Math.abs(o)*Math.abs(o));return Math.abs(r)<.1?t:e+r}(s.radius,s.targetRadius,e)}(o),n.fillStyle="white",n.strokeStyle="white",n.lineWidth=3,n.clearRect(0,0,r.width,r.height),n.beginPath(),n.arc(s.lastX,s.lastY,s.radius,0,2*Math.PI,!1),n.closePath(),n.fill(),c=t,requestAnimationFrame(e)})),window.addEventListener("mousemove",(e=>{i.x=e.clientX,i.y=e.clientY})),window.addEventListener("resize",a,!1),o.forEach((e=>{e.addEventListener("mouseenter",(()=>s.targetRadius=14),!1),e.addEventListener("mouseleave",(()=>s.targetRadius=6),!1)}))}(),function(){const e=document.querySelector('[data-style="runner-container"]');new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting?e.target.classList.add("animated"):e.target.classList.remove("animated")}))})).observe(e)}(),function(){if(n)return;const e=document.querySelectorAll('[data-animation="appear-by-line"]');if(!e?.length)return;const t=new ResizeObserver((e=>{for(const t of e)r(t.target.original)})),o=new IntersectionObserver((e=>{e.forEach((e=>{const{isIntersecting:n,target:r}=e;var i;n&&((i=r).lastSpan.addEventListener("transitionend",(()=>{i.original.classList.remove("hidden"),i.remove()})),t.unobserve(i),i.classList.add("shown"),o.unobserve(r))}))}),{rootMargin:"-20% 0% -20% 0%",threshold:1});function r(e){const n=e.clone||e.cloneNode(),r=e.innerText.match(/\S+/g)||[],i=[];let s="",c=0;const a=getComputedStyle(e).lineHeight;e.after(n),n.style.setProperty("--line-height",a),e.classList.add("hidden");for(var d=0;d<r.length;d++){const e=s+r[d]+" ";n.innerText=e,0!==c&&n.clientHeight>c?(i.push(s.trim()),s=r[d]+" "):(s=e,c=n.clientHeight)}i.push(s.trim()),n.innerHTML="",i.forEach(((e,t)=>{const o=document.createElement("span");o.textContent=e;const r=document.createElement("p");r.appendChild(o),n.appendChild(r),t===i.length-1&&(n.lastSpan=o)})),e.clone||(e.clone=n,n.original=e,t.observe(n),o.observe(n))}e.forEach(r)}(),function(){const e=document.querySelector(".comingsooncategorytext");let t;function n(o=0){clearInterval(t),e.textContent=r[o];const i=o<r.length-1?o+1:0;t=setTimeout((()=>n(i)),500)}new IntersectionObserver((e=>{e[0].isIntersecting?n(0):clearTimeout(t)}),{threshold:0}).observe(e)}()})();