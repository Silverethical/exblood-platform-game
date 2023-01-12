import { canvas, c, collisionBlockSize, scale, keys } from "./variables.js";
import { Sprite, Player, CollisionBlock } from "./classes.js";
import { floorCollisions, platformCollisions } from "./data/collisions.js";

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * collisionBlockSize.width,
            y: y * collisionBlockSize.height,
          },
        })
      );
    }
  });
});

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}
const platformCollisionBlocks = [];
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * collisionBlockSize.width,
            y: y * collisionBlockSize.height,
          },
        })
      );
    }
  });
});

/** change canvas dimensions */
canvas.width = 1024;
canvas.height = 576;

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

  /** save current scale */
  c.save();

  /** scale to 4 (just for background) */
  c.scale(scale.x, scale.y);

  /** move to the bottom of the image */
  c.translate(0, -background.image.height + canvas.height / scale.y);

  /** update background */
  background.update();

  /** render collision blocks */
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });

  /** render platform blocks */
  platformCollisionBlocks.forEach((block) => {
    block.update();
  });

  /** restore to saved scale */
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

/** call animate function */
animate();
