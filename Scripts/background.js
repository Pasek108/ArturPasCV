"use strict";

class StarsBackground {
  constructor() {
    this.animation = 0;
    this.fps = 30;
    this.fps_interval = 1000 / this.fps;
    this.now = 0;
    this.then = performance.now();
    this.elapsed = 0;

    this.container = document.querySelector(".background");
    this.canvas = this.container.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    addEventListener("resize", this.resize.bind(this));

    this.resize();
    this.startAnimation();
  }

  startAnimation() {
    if (this.animation != 0) return;
    this.animation = requestAnimationFrame(this.animate.bind(this));
  }

  stopAnimation() {
    cancelAnimationFrame(this.animation);
    this.animation = 0;
  }

  moveBackground(i) {
    this.canvas.style.transform = `translateX(${-100 * i}vw)`;
  }

  /** Resizes canvas and generate new points array for this size */
  resize() {
    this.canvas_w = screen.width * 3;
    this.canvas_h = screen.height;
    this.canvas.width = this.canvas_w;
    this.canvas.height = this.canvas_h;
    this.ctx.fillStyle = "white";
    this.generateStars();
  }

  /**
   * Clears canvas and executes drawStars method when enough time passed (current is 30 fps). Function should be run from requestAnimationFrame
   * @param {number} new_time time from requestAnimationFrame
   */
  animate(new_time) {
    this.animation = requestAnimationFrame(this.animate.bind(this));

    this.now = new_time;
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fps_interval) {
      this.then = this.now - (this.elapsed % this.fps_interval);

      this.ctx.clearRect(0, 0, this.canvas_w, this.canvas_h);
      this.drawStars(this.little_stars);
      this.drawStars(this.medium_stars);
      this.drawStars(this.large_stars);
    }
  }

  drawStars(stars) {
    for (let i = 0; i < stars.length; i++) {
      stars[i].y -= stars[i].speed;
      if (stars[i].y < 0) stars[i].y = screen.height;
      this.ctx.fillRect(stars[i].x, stars[i].y, stars[i].size, stars[i].size);
    }
  }

  /** Generates stars arrays. Stars are stored as position (x, y) speed and size */
  generateStars() {
    this.little_stars = [];
    this.medium_stars = [];
    this.large_stars = [];

    const stars_data = [
      {
        quantity: ((screen.width * 3) / 3) | 0,
        speed: ((screen.height / 18) | 0) / 100,
        array: this.little_stars,
        size: 1,
      },
      {
        quantity: ((screen.width * 3) / 16) | 0,
        speed: ((screen.height / 24) | 0) / 100,
        array: this.medium_stars,
        size: 2,
      },
      {
        quantity: ((screen.width * 3) / 30) | 0,
        speed: ((screen.height / 31) | 0) / 100,
        array: this.large_stars,
        size: 3,
      },
    ];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < stars_data[i].quantity; j++) {
        stars_data[i].array.push({
          x: random(1, this.canvas_w),
          y: random(1, this.canvas_h),
          speed: stars_data[i].speed,
          size: stars_data[i].size,
        });
      }
    }
  }
}

const stars_background = new StarsBackground();
