"use strict";function random(e,t){return e=Math.ceil(e),t|=0,Math.random()*(t-e+1)+e|0}function createNewDOM(e="div",t="",n=""){const i=document.createElement(e);return i.className=t,i.innerText=n,i}function createTicker(e,t){const n=new PIXI.Ticker;return n.maxFPS=t,n.add(e),n}const title=document.title;function sleep(e){return new Promise((t=>setTimeout(t,e)))}function changePageTitle(){document.hidden?sleep(500).then((()=>document.title="Artur Pas (Θ︹Θ)")):document.title=title}document.addEventListener("visibilitychange",changePageTitle);