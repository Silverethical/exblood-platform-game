/** variables / selectors */
const canvas = document.querySelector("canvas"),
  c = canvas.getContext("2d"),
  gravity = 0.5,
  scale = {
    x: 4,
    y: 4,
  },
  keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    s: { pressed: false },
  };

/** change canvas dimensions */
canvas.width = 1024;
canvas.height = 576;

/** Sprite class */
class Sprite {
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

/** create a new player */
const player1 = new Player({ x: 100, y: 100 });

/** create a background */
const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./assets/images/backgrounds/background.png",
});

/** create animate function */
function animate() {
  /** call the animate function over and over again */
  window.requestAnimationFrame(animate);

  /** clear canvas by drawing a gray rectangle on the canvas */
  c.fillStyle = "gray ";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  /** scale to 4 (just for background) */
  c.scale(scale.x, scale.y);
  /** move to the bottom of the image */
  c.translate(0, -background.image.height + canvas.height / scale.y);
  /** update background */
  background.update();
  c.restore();

  /** update player position */
  player1.update();

  /** reset player horizontal movement */
  player1.velocity.x = 0;

  if (keys.d.pressed) {
    player1.velocity.x = 5;
  } else if (keys.a.pressed) {
    player1.velocity.x = -5;
  }
}

/** call animate function */
animate();

/** window event listener to start player movements */
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;

    case "a":
      keys.a.pressed = true;
      break;

    case "w":
      player1.velocity.y = -15;
      break;
  }
});

/** window event listener to stop player movements */
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;

    case "a":
      keys.a.pressed = false;
      break;
  }
});
