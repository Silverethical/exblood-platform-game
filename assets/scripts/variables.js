/** variables / selectors */
export const canvas = document.querySelector("canvas"),
  c = canvas.getContext("2d"),
  gravity = 0.5,
  collisionBlockSize = {
    width: 16,
    height: 16,
  },
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
