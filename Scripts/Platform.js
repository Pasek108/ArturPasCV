"use strict";

class Platform extends PIXI.Sprite {
  static platforms = [];

  constructor(texture, width, height, x, y, min_x, max_x, speed, hidden, movable) {
    super(texture);
    this.width = width;
    this.height = height;
    this.position.set(x, y);
    this.original_y = y;
    this.min_x = min_x;
    this.max_x = max_x;
    this.original_speed = speed;
    this.speed = speed;
    this.hidden = hidden;
    this.movable = movable;

    Platform.platforms.push(this);
    stage.addChild(this);

    this.directionChangeTimeout = setTimeout(() => {}, 1);
    this.platform_ticker = createTicker(this.showAnimation.bind(this), 62);

    if (this.hidden) this.position.set(x, app.screen.height);
    else this.show();
  }

  static isPlayerOnPlatform() {
    if (player.x > 4000) return true;

    for (let i = 0; i < Platform.platforms.length; i++) {
      const is_from_left = player.x + player.width / 2 >= Platform.platforms[i].x;
      const is_from_right = player.x + player.width / 2 <= Platform.platforms[i].x + Platform.platforms[i].width;
      if (is_from_left && is_from_right) {
        Platform.platforms[i].stopPlatform();
        return true;
      }
    }

    return false;
  }

  static showNextPlatform() {
    for (let i = 0; i < Platform.platforms.length; i++) {
      const is_from_left = player.x + player.width / 2 >= Platform.platforms[i].x;
      const is_from_right = player.x + player.width / 2 <= Platform.platforms[i].x + Platform.platforms[i].width;
      if (is_from_left && is_from_right) {
        if (i + 1 < Platform.platforms.length) Platform.platforms[i + 1].show();
      }
    }
  }

  show() {
    if (this.platform_ticker.started) return;
    this.platform_ticker.start();
  }

  showAnimation() {
    this.position.set(this.x, (this.y - (this.y - this.original_y) / 15) | 0);

    if (this.y <= this.original_y) {
      this.position.set(this.x, this.original_y);
      this.platform_ticker.stop();
      this.platform_ticker = createTicker(this.movePlatform.bind(this), 62);
      if (this.movable) this.platform_ticker.start();
    }
  }

  movePlatform() {
    this.position.set(this.x + this.speed, app.screen.height - 150);

    if (this.x <= this.min_x && this.speed != 0) {
      this.speed = 0;
      this.directionChangeTimeout = setTimeout(() => (this.speed = this.original_speed), 300);
    } else if (this.x >= this.max_x && this.speed != 0) {
      this.speed = 0;
      this.directionChangeTimeout = setTimeout(() => (this.speed = -this.original_speed), 300);
    }
  }

  stopPlatform() {
    this.speed = 0;
    this.platform_ticker.stop();
    clearTimeout(this.directionChangeTimeout);
  }
}
