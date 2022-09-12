"use strict";

addEventListener("resize", resizeBackground);

const bakcground = new PIXI.Application({ backgroundAlpha: 0 });
document.querySelector(".background").appendChild(bakcground.view);

let stars_s_quantity = 0;
let stars_s_speed = 0;
let stars_s_container_top = new PIXI.Container();
let stars_s_container_bot = new PIXI.Container();
bakcground.stage.addChild(stars_s_container_top);
bakcground.stage.addChild(stars_s_container_bot);

let stars_m_quantity = 0;
let stars_m_speed = 0;
let stars_m_container_top = new PIXI.Container();
let stars_m_container_bot = new PIXI.Container();
bakcground.stage.addChild(stars_m_container_top);
bakcground.stage.addChild(stars_m_container_bot);

let stars_l_quantity = 0;
let stars_l_speed = 0;
let stars_l_container_top = new PIXI.Container();
let stars_l_container_bot = new PIXI.Container();
bakcground.stage.addChild(stars_l_container_top);
bakcground.stage.addChild(stars_l_container_bot);

resizeBackground();
const bakcground_ticker = createTicker(drawStars, 62);
bakcground_ticker.start();

function drawStars() {
  moveStars(stars_s_speed, stars_s_container_top, stars_s_container_bot);
  moveStars(stars_m_speed, stars_m_container_top, stars_m_container_bot);
  moveStars(stars_l_speed, stars_l_container_top, stars_l_container_bot);
}

function moveStars(speed, container_top, container_bot) {
  let stars_x = container_top.x;
  let stars_y = container_top.y - speed;
  if (stars_y < -screen.height) stars_y = 0;
  container_top.position.set(stars_x, stars_y);
  container_bot.position.set(stars_x, stars_y + screen.height);
}

function initBackground() {
  /* ---------- samll ---------- */
  stars_s_quantity = ((screen.width * 3) / 3) | 0;
  stars_s_speed = (((screen.height / 1860) * 100) | 0) / 100;
  stars_s_container_top = recreateContainer(stars_s_container_top);
  stars_s_container_bot = recreateContainer(stars_s_container_bot);
  createStars(stars_s_quantity, 1, stars_s_container_top, stars_s_container_bot);

  /* ---------- medium ---------- */
  stars_m_quantity = ((screen.width * 3) / 16) | 0;
  stars_m_speed = (((screen.height / 2480) * 100) | 0) / 100;
  stars_m_container_top = recreateContainer(stars_m_container_top);
  stars_m_container_bot = recreateContainer(stars_m_container_bot);
  createStars(stars_m_quantity, 2, stars_m_container_top, stars_m_container_bot);

  /* ---------- large ---------- */
  stars_l_quantity = ((screen.width * 3) / 30) | 0;
  stars_l_speed = (((screen.height / 3100) * 100) | 0) / 100;
  stars_l_container_top = recreateContainer(stars_l_container_top);
  stars_l_container_bot = recreateContainer(stars_l_container_bot);
  createStars(stars_l_quantity, 3, stars_l_container_top, stars_l_container_bot);
}

function recreateContainer(old_containter) {
  old_containter.parent.removeChild(old_containter);
  old_containter.destroy({ children: true, texture: true, baseTexture: true });

  const new_container = addStarsContainer();
  bakcground.stage.addChild(new_container);

  return new_container;
}

function createStars(quantity, size, container_top, container_bot) {
  for (let i = 0; i < quantity; i++) {
    const position = { x: random(0, screen.width * 3), y: random(0, screen.height) };

    const star_top = new PIXI.Graphics().beginFill(0xffffff).drawRect(0, 0, size, size).endFill();
    star_top.position.set(position.x, position.y);
    container_top.addChild(star_top);

    const star_bot = new PIXI.Graphics().beginFill(0xffffff).drawRect(0, 0, size, size).endFill();
    star_bot.position.set(position.x, position.y);
    container_bot.addChild(star_bot);
  }
}

function addStarsContainer() {
  const stars_container = new PIXI.Container();
  stars_container.width = screen.width * 3;
  stars_container.height = screen.height;
  stars_container.position.set(0, 0);

  return stars_container;
}

function resizeBackground() {
  initBackground();
  bakcground.renderer.resize(screen.width * 3, screen.height);
}

function moveBackground(i) {
  bakcground.view.style.transform = `translateX(${-100 * i}vw)`;
}
