import { canvas, c, gravity, collisionBlockSize } from "./variables.js";

/** Sprite class */
export class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    if (!this.image) return;
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

/** Player class */
export class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 100;
    this.width = 100;
  }

  /** draw player on the canvas */
  draw() {
    c.fillStyle = "maroon";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  /** update player position */
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    /** check if player does not go beyond canvas in the next frame */
    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      /** increase velocity */
      this.velocity.y += gravity;
    } else {
      /** reset velocity */
      this.velocity.y = 0;
    }
  }
}

/** CollisionBlock class */
export class CollisionBlock {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = collisionBlockSize.width;
    this.height = collisionBlockSize.height;
  }

  draw() {
    c.fillStyle = "rgba(255, 0, 0, 0.5)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
  }
}
