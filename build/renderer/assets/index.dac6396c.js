import{j as a,r as c,v as d,R as f,a as p}from"./vendor.cb871c65.js";const m=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}};m();var v="./assets/video.b61335c0.mov";const s=a.exports.jsx,u={autoplay:!0,controls:!1,responsive:!0,fluid:!0,sources:[{src:v}]},y=()=>{const n=c.exports.useRef(null),t=c.exports.useRef();return c.exports.useEffect(()=>{if(t.current)t.current.src();else{const o=n.current;if(!o)return;t.current=d(o,u,()=>{console.log("player is ready")})}},[u,n]),c.exports.useEffect(()=>{const o=t.current;return()=>{o&&(o.dispose(),t.current=null)}},[t]),s("div",{className:"full",children:s("div",{"data-vjs-player":!0,children:s("video",{ref:n,className:"video-js vjs-big-play-centered"})})})};f.render(s(p.StrictMode,{children:s(y,{})}),document.getElementById("root"));
