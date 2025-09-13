<template>
  <div class="animated-bg absolute inset-0 -z-10" aria-hidden>
    <div class="gradient-layer"></div>
    <canvas ref="canvas" class="w-full h-full block"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
const canvas = ref(null);
let animId;

onMounted(() => {
  const ctx = canvas.value.getContext('2d');
  let w = canvas.value.width = canvas.value.clientWidth;
  let h = canvas.value.height = canvas.value.clientHeight;
  const particles = Array.from({ length: 12 }).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 20 + Math.random() * 60,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2
  }));

  function resize() { w = canvas.value.width = canvas.value.clientWidth; h = canvas.value.height = canvas.value.clientHeight; }
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0,0,w,h);
    // subtle dark vignette
    ctx.fillStyle = 'rgba(6,10,26,0.25)';
    ctx.fillRect(0,0,w,h);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -100) p.x = w + 100; if (p.x > w + 100) p.x = -100;
      if (p.y < -100) p.y = h + 100; if (p.y > h + 100) p.y = -100;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, 'rgba(255,255,255,0.02)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    animId = requestAnimationFrame(draw);
  }
  draw();
  onBeforeUnmount(() => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); });
});
</script>

<style scoped>
.animated-bg { pointer-events: none; }
.gradient-layer { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(37,99,235,0.12), rgba(245,158,11,0.06)); mix-blend-mode: overlay; }
canvas { display: block; }
</style>
