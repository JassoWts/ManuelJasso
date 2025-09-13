<template>
  <div
    ref="wrapper"
    class="pointer-events-auto select-none fixed z-40"
    :style="wrapperStyle"
    @mouseenter="onPetStart"
    @mouseleave="onPetEnd"
    @mousedown.prevent="onDragStart"
    @touchstart.prevent="onDragStart"
  >
    <div class="relative" @dblclick="triggerMeow">
      <!-- Tail (independent overlay behind body) -->
      <div class="absolute left-0 top-0 w-[160px] h-[120px] pointer-events-none">
        <svg
          class="absolute pointer-events-none origin-[0px_60px]" :class="tailAnimClass"
          :style="tailStyle"
          width="90" height="120" viewBox="0 0 90 120"
        >
          <!-- Simple stylized tail path; base near (0,60) so transform-origin works -->
          <path :fill="tailFill" :stroke="tailStroke" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
            d="M8 60 q30 -38 50 -10 10 16 -6 30 -12 10 -4 22 8 10 20 4" />
        </svg>
      </div>
      <div
        class="w-[160px] h-[120px] bg-no-repeat relative"
        :style="spriteStyle"
        role="img"
        aria-label="Gato interactivo"
      >
        <!-- Reactive pupils overlay -->
        <template v-if="pupilVisible">
          <div v-for="(p, i) in pupilPositions" :key="i" class="absolute w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-neutral-200" :style="{ transform: `translate(${p.x - 5}px, ${p.y - 5}px)` }"></div>
        </template>
      </div>
      <!-- Sleep indicator -->
      <transition name="fade">
        <div
          v-if="state === 'sleep'"
          class="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-600 dark:text-slate-300 animate-pulse"
        >Zzz</div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
// Using side-view pixel-art sprite now
import catSpriteUrl from '../assets/cat-pixel-side-sprite.svg';

// Frame meta (each 160x120)
const FRAME_W = 160;
const FRAME_H = 120;
// Mapping of animation sequences (10 frames total now)
const sequences = {
  idle: [0, 2, 3, 0],
  blink: [1],
  sleepIntro: [4,5],
  sleepLoop: [5,6],
  walk: [6,7,8,9], // four-step cycle
  pet: [2,3,0],
  meow: [0,2,0]
};

const wrapper = ref(null);

const pos = reactive({ x: 80, y: 80 });
const velocity = reactive({ x: 0, y: 0 });
const drag = reactive({ active: false, offsetX: 0, offsetY: 0 });
const cursor = reactive({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

const energy = ref(1); // can be used to scale wander speed
const state = ref('idle'); // idle|walk|sleep|pet|meow|sleepIntro|sleepLoop

const currentSeq = ref(sequences.idle);
const frameIndex = ref(0);
const frameElapsed = ref(0);
const frameDuration = 150; // ms faster animation for walk cycle

// Eye center mapping per absolute frame index (sprite frame). null => closed/hidden
// Side view: only one visible eye (slightly different x across some frames)
const eyeCenters = {
  0: [{ x:50, y:60 }],
  1: null,
  2: [{ x:50, y:60 }],
  3: [{ x:50, y:60 }],
  4: [{ x:50, y:60 }],
  5: null,
  6: null,
  7: [{ x:52, y:60 }],
  8: [{ x:52, y:60 }],
  9: [{ x:52, y:60 }]
};

let rafId = 0;
let lastTs = 0;
let sleepTimer = 0;
let nextBlinkAt = Date.now() + randomRange(2000,6000);
let nextWanderAt = Date.now() + randomRange(1500,3500);
let petTimeout = 0;
let meowAudio;

try {
  meowAudio = new Audio('data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCA//////////////////////////////8AAAAALGF2YyBsaWIxMC4yOC4yMDIzMDQxNS4wMC4xMDA=');
  meowAudio.volume = 0.4;
} catch(e) { /* ignore */ }

function randomRange(min,max){ return Math.random()*(max-min)+min; }

const spriteStyle = computed(()=>({
  backgroundImage: `url(${catSpriteUrl})`,
  backgroundSize: `${FRAME_W*10}px ${FRAME_H}px`,
  backgroundPosition: `-${FRAME_W * currentSeq.value[frameIndex.value]}px 0px`,
  imageRendering: 'pixelated'
}));

const wrapperStyle = computed(()=>({
  transform: `translate3d(${pos.x}px, ${pos.y}px,0) scale(${hovering.value?1.05:1})`,
  transition: draggingComputed.value? 'none':'transform 0.15s ease-out'
}));

const hovering = ref(false);

const draggingComputed = computed(()=>drag.active);

function setSequence(seqName, opts={}) {
  const seq = sequences[seqName];
  if(!seq) return;
  currentSeq.value = seq;
  frameIndex.value = 0;
  frameElapsed.value = 0;
  state.value = seqName;
  if(opts.once) {
    // mark will revert after completed
  }
}

function onPetStart(){
  hovering.value = true;
  setSequence('pet');
  clearTimeout(petTimeout);
  petTimeout = setTimeout(()=>{
    hovering.value=false;
    setSequence('idle');
  }, 1200);
}
function onPetEnd(){ hovering.value = false; }

function triggerMeow(){
  if(meowAudio){ meowAudio.currentTime = 0; meowAudio.play().catch(()=>{}); }
  setSequence('meow');
  setTimeout(()=>setSequence('idle'), 800);
}

function onDragStart(e){
  const point = ('touches' in e)? e.touches[0]: e;
  drag.active = true;
  drag.offsetX = point.clientX - pos.x;
  drag.offsetY = point.clientY - pos.y;
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('touchmove', onDragMove);
  window.addEventListener('mouseup', onDragEnd, { once:true });
  window.addEventListener('touchend', onDragEnd, { once:true });
}
function onDragMove(e){
  if(!drag.active) return;
  const point = ('touches' in e)? e.touches[0]: e;
  pos.x = point.clientX - drag.offsetX;
  pos.y = point.clientY - drag.offsetY;
  constrain();
}
function onDragEnd(){
  drag.active = false;
  window.removeEventListener('mousemove', onDragMove);
  window.removeEventListener('touchmove', onDragMove);
}

function constrain(){
  const margin = 10;
  pos.x = Math.min(window.innerWidth - FRAME_W - margin, Math.max(margin, pos.x));
  pos.y = Math.min(window.innerHeight - FRAME_H - margin, Math.max(margin, pos.y));
}

window.addEventListener('mousemove', e=>{ cursor.x = e.clientX; cursor.y = e.clientY; });
window.addEventListener('touchmove', e=>{ if(e.touches[0]) { cursor.x = e.touches[0].clientX; cursor.y = e.touches[0].clientY; }});

function schedule(){
  const now = Date.now();
  if(now > nextBlinkAt && state.value !== 'sleep' && state.value !== 'sleepLoop') {
    setSequence('blink');
    nextBlinkAt = now + randomRange(3000,7000);
    setTimeout(()=>{ if(state.value==='blink') setSequence('idle'); }, 300);
  }
  if(now > nextWanderAt && !drag.active && state.value.startsWith('sleep')===false) {
    wander();
    nextWanderAt = now + randomRange(2000,4500);
  }
  // Sleep logic
  if(state.value !== 'sleep' && state.value !== 'sleepLoop' && now - sleepTimer > 25000) {
    setSequence('sleepIntro');
    setTimeout(()=>{ setSequence('sleep'); setSequence('sleepLoop'); }, 1400);
  }
}

function wander(){
  const targetX = randomRange(40, window.innerWidth - FRAME_W - 40);
  const targetY = randomRange(40, window.innerHeight - FRAME_H - 40);
  const dx = targetX - pos.x;
  const dy = targetY - pos.y;
  const dist = Math.hypot(dx, dy);
  const duration = dist / 90 * 1000; // faster travel (higher divisor = faster)
  velocity.x = dx / duration;
  velocity.y = dy / duration;
  setSequence('walk');
  setTimeout(()=> { setSequence('idle'); velocity.x = velocity.y = 0; }, duration);
}

function loop(ts){
  if(!lastTs) lastTs = ts;
  const dt = ts - lastTs;
  lastTs = ts;

  frameElapsed.value += dt;
  if(frameElapsed.value > frameDuration){
    frameElapsed.value = 0;
    frameIndex.value = (frameIndex.value + 1) % currentSeq.value.length;
  }

  // Movement
  if(drag.active){ sleepTimer = Date.now(); }
  else {
    // Only wander / drag movement now (no direct cursor following)
    pos.x += velocity.x * dt;
    pos.y += velocity.y * dt;
    constrain();
  }

  schedule();
  rafId = requestAnimationFrame(loop);
}

// Tail coloring derived from body fill in sprite (#5a4632)
const tailFill = '#5a4632';
const tailStroke = '#2d241b';

// Tail style (position near right side of cat). We rotate around base (0,60) thanks to origin class
const tailStyle = computed(()=>({
  left: '84px', // shift tail group to align with rump
  top: '0px',
  animationFillMode: 'forwards'
}));

const tailAnimClass = computed(()=>{
  if(state.value.startsWith('sleep')) return 'tail-sleep';
  if(state.value === 'walk') return 'tail-walk';
  return 'tail-idle';
});

// Pupils
const pupilVisible = computed(()=>{
  const frame = currentSeq.value[frameIndex.value];
  return !!eyeCenters[frame];
});

const pupilPositions = computed(()=>{
  const frame = currentSeq.value[frameIndex.value];
  const centers = eyeCenters[frame];
  if(!centers) return [];
  // Vector from cat center to cursor
  const catCenterX = pos.x + FRAME_W/2;
  const catCenterY = pos.y + FRAME_H/2;
  const dx = cursor.x - catCenterX;
  const dy = cursor.y - catCenterY;
  const len = Math.hypot(dx, dy) || 1;
  // Normalized direction; limit radius (max pupil travel) inside eye
  const maxR = 4; // px
  const ux = dx / len;
  const uy = dy / len;
  return centers.map(c => ({ x: c.x + ux * maxR, y: c.y + uy * maxR }));
});

onMounted(()=>{
  sleepTimer = Date.now();
  rafId = requestAnimationFrame(loop);
});
onBeforeUnmount(()=> cancelAnimationFrame(rafId));
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .3s ease}
.fade-enter-from,.fade-leave-to{opacity:0}

@keyframes tailIdle {
  0% { transform: rotate(10deg); }
  50% { transform: rotate(-4deg); }
  100% { transform: rotate(10deg); }
}
@keyframes tailWalk {
  0% { transform: rotate(18deg); }
  50% { transform: rotate(6deg); }
  100% { transform: rotate(18deg); }
}
@keyframes tailSleep {
  0% { transform: rotate(4deg); opacity:.8; }
  50% { transform: rotate(2deg); opacity:.6; }
  100% { transform: rotate(4deg); opacity:.8; }
}
.tail-idle { animation: tailIdle 4s ease-in-out infinite; }
.tail-walk { animation: tailWalk 0.8s ease-in-out infinite; }
.tail-sleep { animation: tailSleep 5s ease-in-out infinite; }
</style>
