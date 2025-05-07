const canvas = document.createElement('canvas');
canvas.id = 'starfield-canvas';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = 0;
canvas.style.pointerEvents = 'none';

const STAR_COUNT = 180;
const SPEED = 0.022;
const stars = [];

function randomStar() {
  const angle = Math.random() * 2 * Math.PI;
  const minRadius = Math.min(width, height) * 0.10;
  const maxRadius = Math.min(width, height) * 0.40;
  const radius = minRadius + Math.random() * (maxRadius - minRadius);
  return {
    x: width/2 + Math.cos(angle) * radius,
    y: height/2 + Math.sin(angle) * radius,
    vx: Math.cos(angle),
    vy: Math.sin(angle),
    r: Math.random() * 1.2 + 0.7,
    d: radius
  };
}

function resetStar(star) {
  const angle = Math.random() * 2 * Math.PI;
  const minRadius = Math.min(width, height) * 0.10;
  const maxRadius = Math.min(width, height) * 0.40;
  const radius = minRadius + Math.random() * (maxRadius - minRadius);
  star.x = width/2 + Math.cos(angle) * radius;
  star.y = height/2 + Math.sin(angle) * radius;
  star.vx = Math.cos(angle);
  star.vy = Math.sin(angle);
  star.r = Math.random() * 1.2 + 0.7;
  star.d = radius;
}

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push(randomStar());
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (let star of stars) {
    star.x += star.vx * (SPEED * star.d);
    star.y += star.vy * (SPEED * star.d);
    star.d += 0.7;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
    // Se saiu da tela, reseta
    if (
      star.x < 0 || star.x > width ||
      star.y < 0 || star.y > height
    ) {
      resetStar(star);
    }
  }
  requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}); 