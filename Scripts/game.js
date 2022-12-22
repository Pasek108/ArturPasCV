"use strict";

const app = new PIXI.Application();
document.querySelector(".game").appendChild(app.view);

app.renderer.resize(screen.width, screen.height);
app.loader.baseUrl = "./Images";
app.loader.add("ground", "ground.png").add("platform_wide", "platform_wide.png").add("platform_narrow", "platform_narrow.png");

app.loader.load();

const stage = new PIXI.Container();
stage.width = app.screen.width;
stage.height = app.screen.height;
const a = new PIXI.Graphics()
  .beginFill(0x1a71e4, 1)
  .drawRect(0, 0, app.screen.width * 20, app.screen.height)
  .endFill();
stage.addChild(a);
app.stage.addChild(stage);

/* ------------------------ background ------------------------ */

const bg_music = new Audio("./Sounds/caketown.mp3");
bg_music.preload = true;
bg_music.volume = 0.5;
bg_music.play();

const background_container = new PIXI.Container();
const background_texture = [];
for (let i = 0; i < 2; i++) {
  background_texture.push(PIXI.Sprite.from("./Images/bg.png"));
  background_texture[i].width = 2000;
  background_texture[i].height = 500;
  background_texture[i].position.set(2000 * i, app.screen.height - 440);
  background_container.addChild(background_texture[i]);
}

stage.addChild(background_container);

/* ------------------------ ground ------------------------ */

const ground_level = app.screen.height - 210;
const ground_y = app.screen.height - 150;

app.loader.onComplete.add(() => {
  new Platform(app.loader.resources["ground"].texture, 1300, 200, 0, ground_y, 0, 0, 0, false, false);
  new Platform(app.loader.resources["platform_wide"].texture, 500, 200, 1600, ground_y, 1450, 1750, 0, false, false);
  new Platform(app.loader.resources["platform_narrow"].texture, 200, 200, 2400, ground_y, 0, 0, 0, true, false);
  new Platform(app.loader.resources["platform_wide"].texture, 500, 200, 2900, ground_y, 2750, 3050, 2, true, true);
  new Platform(app.loader.resources["platform_narrow"].texture, 200, 200, 3700, ground_y, 3600, 3800, 1, true, true);
});

/* ------------------------ player ------------------------ */

class Player {
  constructor() {
    this.container = new PIXI.Graphics().beginFill(0xff0000).drawRect(0, 0, 100, 100).endFill();
    this.container.position.set(200, ground_level);

    this.death_sound = new Audio("./Sounds/goofy-yell.mp3");
    this.death_sound.preload = true;
    this.death_ticker = createTicker(playerFall, 62);
  }

  playerFall() {
    if (this.container.y > app.screen.height + 50) this.death_ticker.stop();

    const new_x = this.container.x + 1;
    const new_y = (this.container.y + 10 + (app.screen.height - this.container.y) / 20) | 0;
    this.container.position.set(new_x, new_y);
  }
}

const player_death = new Audio("./Sounds/goofy-yell.mp3");
player_death.preload = true;
const player = new PIXI.Graphics().beginFill(0xff0000).drawRect(0, 0, 100, 100).endFill();
player.position.set(200, ground_level);
stage.addChild(player);

const player_death_ticker = createTicker(playerFall, 62);

function playerFall() {
  if (player.y > app.screen.height + 50) player_death_ticker.stop();

  player.position.set(player.x + 1, (player.y + 10 + (app.screen.height - player.y) / 20) | 0);
}

/* ------------------ jump ------------------ */

let jump_start = false;
let jump_end = true;
let jump_max_distance = 600;
let jump_distance = player.width + 10;
let jump_direction = 1;
let jump_start_point = {};
let jump_mid_point = {};
let jump_end_point = {};

/* --------------- jump landing point --------------- */

const jump_trajectory = new PIXI.Graphics();
const landing_point = new PIXI.Container();
const outer_circle = new PIXI.Graphics().lineStyle(5, 0xffffff, 0.75).drawEllipse(100, 100, 70, 25);
const inner_circle = new PIXI.Graphics().beginFill(0xffffff, 0.75).drawEllipse(100, 100, 55, 15).endFill();
landing_point.position.set(500, app.screen.height - 212);
landing_point.addChild(outer_circle);
landing_point.addChild(inner_circle);

/* --------------- jump tickers --------------- */

stage.interactive = true;
stage.on("pointerdown", startJump);
stage.on("pointerup", prepareAndExecuteJump);

const jump_indicator_ticker = createTicker(drawJumpIndicator, 62);
const jump_animation_ticker = createTicker(jumpAnimation, 62);
const focus_after_jump = createTicker(focusCamera, 62);

function drawJumpIndicator() {
  landing_point.position.set(player.x + jump_distance, app.screen.height - 212);

  jump_trajectory.clear();
  jump_trajectory.lineStyle(5, 0xffffff, 0.75);
  jump_trajectory.moveTo(player.x + player.width + 5, app.screen.height - 200);
  jump_trajectory.quadraticCurveTo(
    player.x + jump_distance + 50,
    (app.screen.height - (270 + jump_distance / 5)) | 0,
    landing_point.x + landing_point.width / 2 + 25,
    landing_point.y + 60
  );

  stage.addChild(landing_point);
  stage.addChild(jump_trajectory);

  if (jump_distance < jump_max_distance && jump_direction === 1) jump_distance += 4;
  else if (jump_distance > player.width && jump_direction === -1) jump_distance -= 4;
  else if (jump_distance < jump_max_distance) jump_direction = 1;
  else jump_direction = -1;
}

function jumpAnimation() {
  stage.addChild(player);

  if (player.x < jump_end_point.x) {
    const x1 = jump_start_point.x;
    const y1 = jump_start_point.y;
    const p = jump_mid_point.x;
    const q = jump_mid_point.y;
    const x2 = jump_end_point.x;
    const y2 = jump_end_point.y;

    let speed = ((jump_end_point.x - player.x) / 10) | 0;
    if (speed > 30) speed = 30;
    else if (speed < 10) speed = 10;

    const x = player.x + speed;

    if (player.x < jump_mid_point.x) player.position.set(x, calculateJumpHeight(x, x1, y1, p, q));
    else player.position.set(x, calculateJumpHeight(x, x2, y2, p, q));

    if (player.x > jump_end_point.x) player.position.set(jump_end_point.x, player.y);
    if (player.y > ground_level) {
      if (!Platform.isPlayerOnPlatform()) {
        player_death.play();
        jump_animation_ticker.stop();
        player_death_ticker.start();
      } else player.position.set(player.x, ground_level);
    }
  } else {
    jump_start = false;
    jump_distance = player.width + 10;
    jump_direction = 1;
    jump_animation_ticker.stop();
    focus_after_jump.start();
  }
}

function focusCamera() {
  if (stage.x <= 200 - player.x) {
    jump_end = true;
    focus_after_jump.stop();
    Platform.showNextPlatform();
  }

  stage.position.set(stage.x - 10, stage.y);
}

function calculateJumpHeight(x, x1, y1, p, q) {
  const a = (y1 - q) / (x1 - p) ** 2;
  return a * (x - p) ** 2 + q;
}

function startJump() {
  if (!jump_end) return;
  jump_start = true;
  jump_indicator_ticker.start();
}

function prepareAndExecuteJump() {
  if (!jump_end || !jump_start) return;
  jump_end = false;
  jump_indicator_ticker.stop();

  jump_start_point = { x: player.x, y: ground_level };
  jump_mid_point = { x: player.x + jump_distance - jump_distance / 5, y: (app.screen.height - (270 + jump_distance / 5)) | 0 };
  jump_end_point = { x: landing_point.x + 50, y: ground_level };

  jump_animation_ticker.start();

  stage.removeChild(landing_point);
  stage.removeChild(jump_trajectory);
}
