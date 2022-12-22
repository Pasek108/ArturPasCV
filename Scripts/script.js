"use strict";

function random(min, max) {
  min = Math.ceil(min);
  max = max | 0;
  return (Math.random() * (max - min + 1) + min) | 0;
}

function createNewDOM(tag = "div", class_name = "", text = "") {
  const new_element = document.createElement(tag);
  new_element.className = class_name;
  new_element.innerText = text;

  return new_element;
}

function createTicker(func, fps) {
  const ticker = new PIXI.Ticker();
  ticker.maxFPS = fps;
  ticker.add(func);

  return ticker;
}

const title = document.title;

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

document.addEventListener("visibilitychange", changePageTitle);

function changePageTitle() {
  if (!document.hidden) document.title = title;
  else sleep(500).then(() => (document.title = "Artur Pas (Θ︹Θ)"));
}
