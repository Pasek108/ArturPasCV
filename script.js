"use strict";

function random(min, max) {
  min = Math.ceil(min);
  max = max | 0;
  return (Math.random() * (max - min + 1) + min) | 0;
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
