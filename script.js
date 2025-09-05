// Particle background
const canvas = document.getElementById('network');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };
window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); });

class Particle {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 2;
    this.density = Math.random() * 10 + 1;
    this.vx = (Math.random() - 0.5) * 1.7;
    this.vy = (Math.random() - 0.5) * 1.7;
  }

  draw(){
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }

  update(){
    this.x += this.vx;
    this.y += this.vy;
    if(this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
    if(this.y <= 0 || this.y >= canvas.height) this.vy *= -1;

    if(mouse.x && mouse.y){
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx*dx + dy*dy);
      let maxDistance = 100;
      if(distance < maxDistance){
        let force = (maxDistance - distance)/maxDistance;
        this.x -= (dx/distance) * force * this.density;
        this.y -= (dy/distance) * force * this.density;
      }
    }
  }
}

let particlesArray;
function init(){
  particlesArray = [];
  for(let i=0; i<20; i++){
    particlesArray.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height));
  }
}
function connect(){
  for(let a=0; a<particlesArray.length; a++){
    for(let b=a; b<particlesArray.length; b++){
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < 150){
        ctx.strokeStyle = `rgba(255,255,255,${1 - distance/150})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  connect();
  requestAnimationFrame(animate);
}
init();
animate();

