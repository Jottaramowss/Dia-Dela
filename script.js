const canvas = document.getElementById('canvas-vg');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: -100, y: -100 };

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', init);
init();

class Stroke {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2.5 + 1;
        this.color = this.getRandomColor();
        this.angle = Math.random() * Math.PI * 2;
    }
    getRandomColor() {
        const colors = ['#0f2d52', '#2a4b7c', '#f9d71c', '#e3b04b', '#ffffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150) {
            this.angle += 0.05;
            this.x += Math.cos(this.angle) * 1.5;
            this.y += Math.sin(this.angle) * 1.5;
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
    }
}

for(let i=0; i<200; i++) particles.push(new Stroke());

function animate() {
    ctx.fillStyle = 'rgba(5, 11, 26, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });

function initExperience() {
    document.getElementById('reveal-area').classList.add('active');
    document.querySelector('.btn-interact').style.display = 'none';
    for(let i=0; i<80; i++) {
        setTimeout(() => {
            let p = new Stroke();
            p.x = window.innerWidth/2; p.y = window.innerHeight/2;
            p.color = '#f9d71c'; p.radius = 3;
            particles.push(p);
        }, i * 15);
    }
}