(function(o,i){typeof exports=="object"&&typeof module<"u"?module.exports=i():typeof define=="function"&&define.amd?define(i):(o=typeof globalThis<"u"?globalThis:o||self,o.index=i())})(this,function(){"use strict";const o=s=>s.replace(/[A-Z]+(?![a-z])|[A-Z]/g,(t,r)=>(r?"-":"")+t.toLowerCase()),i=s=>{const{dataset:t}=s;if(Object.keys(t).length===0)return;const r=Object.entries(t).map(([e,n])=>[o(e),n]).filter(([e])=>(e==null?void 0:e.startsWith("source-"))||!1).map(([e,n])=>[e==null?void 0:e.replace("source-",""),n]);return Object.fromEntries(r)},u=s=>Object.entries(s).sort(([t],[r])=>t==="default"?1:r==="default"||parseInt(r,10)<=parseInt(t,10)?-1:1),f=s=>{const t=s.querySelector("source");if(t===null)return;const r=s.querySelector("img");if(r===null)return;const e=i(t);if(e===void 0)return;const n=u(e);new ResizeObserver(([d])=>{const{width:l}=d.contentRect,c=n.find(([a])=>Number.isNaN(parseInt(a,10))?!1:parseInt(a,10)<=l);if(c===void 0){t.srcset=e.default;return}const[,p]=c;t.srcset=p}).observe(r)};return s=>{s.forEach(t=>{const r={rootMargin:"200px"},e=new IntersectionObserver(([n])=>{!n.isIntersecting||(f(t),e.disconnect())},r);e.observe(t)})}});
