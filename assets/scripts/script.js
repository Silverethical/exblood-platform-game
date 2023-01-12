/** variables / selectors */
const canvas = document.querySelector("canvas"),
  c = canvas.getContext("2d"),
  gravity = 0.5,
  keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    s: { pressed: false },
  };

/** change canvas dimensions */
canvas.width = 1024;
canvas.height = 576;

/** Player class */
class Player {
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

/** declare a new player */
const player1 = new Player({ x: 100, y: 100 });

/** create animate function */
function animate() {
  /** call the animate function over and over again */
  window.requestAnimationFrame(animate);

  /** clear canvas by drawing a gray rectangle on the canvas */
  c.fillStyle = "gray ";
  c.fillRect(0, 0, canvas.width, canvas.height);

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
