const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const swordBtn = document.getElementById("sword-btn");

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
let active = false;

// ================= PARTICLES =================
function createParticles() {
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 2 + Math.random() * 4,
            speedY: 0.5 + Math.random() * 1.2,
            speedX: -0.3 + Math.random() * 0.6,
            alpha: 0.3 + Math.random() * 0.6
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    });
}

// ================= ANIMATION LOOP =================
function animate() {
    if (!active) return;
    drawParticles();
    requestAnimationFrame(animate);
}

// ================= CLICK EVENT =================
swordBtn.addEventListener("click", () => {
    active = !active;

    if (active) {
        canvas.style.opacity = "1";
        createParticles();
        animate();
    } else {
        canvas.style.opacity = "0";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});
