<template>
  <div
    class="pointer-events-none fixed inset-0 overflow-hidden z-[5]"
    aria-hidden="true"
    ref="layer"
  >
    <div v-for="p in pieces" :key="p.id" class="absolute will-change-transform"
      :style="pieceStyle(p)">
      <img :src="sliceUrl" alt="" draggable="false" class="w-full h-full select-none" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import sliceUrl from '../assets/watermelon-slice.svg';

const MAX = 25; // concurrent slices
const SPAWN_INTERVAL = 600; // ms
const pieces = reactive([]);
let nextId = 0;
let spawnTimer = 0;
let rafId = 0;
let lastTs = 0;

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function spawn(){
  if(pieces.length >= MAX) return;
  const w = window.innerWidth;
  const size = 40 + Math.random()*50; // 40-90
  pieces.push({
    id: nextId++,
    x: Math.random()* (w - size),
    y: -size,
    size,
    rot: Math.random()*360,
    rotSpeed: (Math.random()*40 - 20),
    fallSpeed: 40 + Math.random()*60, // pixels/sec
    drift: (Math.random()*40 - 20),
    life: 0
  });
}

function pieceStyle(p){
  return {
    width: p.size + 'px',
    height: p.size + 'px',
    transform: `translate(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px) rotate(${p.rot.toFixed(1)}deg)`,
    transition: 'none'
  };
}

function loop(ts){
  if(!lastTs) lastTs = ts;
  const dt = (ts - lastTs)/1000; // seconds
  lastTs = ts;
  for(let i=pieces.length-1;i>=0;i--){
    const p = pieces[i];
    p.y += p.fallSpeed * dt;
    p.x += p.drift * dt;
    p.rot += p.rotSpeed * dt;
    p.life += dt;
    if(p.y > window.innerHeight + p.size){
      pieces.splice(i,1);
    }
  }
  rafId = requestAnimationFrame(loop);
}

onMounted(()=>{
  if(prefersReduced) return; // respect reduced motion
  spawn();
  spawnTimer = setInterval(spawn, SPAWN_INTERVAL);
  rafId = requestAnimationFrame(loop);
});

onBeforeUnmount(()=>{
  clearInterval(spawnTimer);
  cancelAnimationFrame(rafId);
});
</script>

<style scoped>
</style>
