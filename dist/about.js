(()=>{"use strict";const e=!0===window.matchMedia("(prefers-reduced-motion: reduce)")||!0===window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.location.href.includes("webflow.io"),function(){const e=document.querySelector('[data-style="runner-container"]');new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting?e.target.classList.add("animated"):e.target.classList.remove("animated")}))})).observe(e)}(),e||document.querySelectorAll(".flyingphotosgroup").forEach((e=>{const t=e.dataset.section,o=document.querySelector(`.workareastag[data-section="${t}"]`);if(!o)return console.error(`No trigger for ${t} flyting photos`);o.addEventListener("mouseenter",(()=>{!function(e){e.classList.add("shown")}(e)})),o.addEventListener("mouseleave",(()=>{!function(e){e.classList.remove("shown")}(e)})),e.querySelectorAll(".flyingphoto").forEach(((e,t)=>{e.style.setProperty("--delay",.1*t+"s")}))})),function(){let e,t,o=0,s=!1;const n=document.querySelector(".aboutsecondblocktextsimage");new IntersectionObserver((e=>{s=e[0].isIntersecting,s?c():t&&(clearTimeout(t),t=null)})).observe(n);const r=["https://uploads-ssl.webflow.com/64ad0ab68d0150d89b44a63e/6512ec79ced75c2abc9efbe9_SLIDE%201.png","https://uploads-ssl.webflow.com/64ad0ab68d0150d89b44a63e/6512ed5a7d51ba682807f694_SLIDE%202.png","https://uploads-ssl.webflow.com/64ad0ab68d0150d89b44a63e/6512ed7876a5c2b0e5b26956_SLIDE%203.png","https://uploads-ssl.webflow.com/64ad0ab68d0150d89b44a63e/6512ed780ef76e600c8e0fe0_SLIDE%204.png"].map((e=>fetch(e).then((e=>e.blob()))));function c(){s&&!t&&e?.length>0&&a()}function a(){requestAnimationFrame((()=>{n.getAttribute("srcset")&&n.removeAttribute("srcset");const s=o>=e.length-1?0:o+1;n.setAttribute("src",e[s]),o=s,t=setTimeout(a,1200)}))}Promise.allSettled(r).then((e=>e.filter((e=>"fulfilled"===e.status)))).then((t=>{e=t.map((e=>URL.createObjectURL(e.value))),c()})).catch(console.log)}()})();