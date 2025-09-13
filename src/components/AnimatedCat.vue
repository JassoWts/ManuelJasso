<template>
  <div class="animated-badge" :class="wrapperClasses" @click="handleClick" @mouseenter="hover=true" @mouseleave="hover=false" role="button" aria-label="animated cat">
    <svg viewBox="0 0 64 64" class="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="none">
      <defs>
        <linearGradient id="catGrad" x1="0" x2="1">
          <stop offset="0" stop-color="#ffd166" />
          <stop offset="1" stop-color="#ef476f" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#catGrad)" />
      <g transform="translate(12,14) scale(0.9)">
        <!-- mouth -->
        <path d="M8 22c2-8 18-8 20 0" stroke="#222" stroke-width="2" stroke-linecap="round" fill="none"/>
        <!-- eyes: we toggle size for blink -->
        <ellipse :cx="11" cy="14" :rx="eyeRadius" ry="3" fill="#222" />
        <ellipse :cx="25" cy="14" :rx="eyeRadius" ry="3" fill="#222" />
        <!-- whiskers -->
        <path class="whisker" d="M2 18 q8 2 14 0" stroke="#222" stroke-width="1.5" fill="none" />
        <path class="whisker" d="M6 20 q8 -1 12 1" stroke="#222" stroke-width="1.2" fill="none" />
        <path d="M6 10 q6 -8 14 0" stroke="#222" stroke-width="2" fill="none" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';

const props = defineProps({
  blinkInterval: { type: Number, default: 4000 }, // ms between blinks
  popDuration: { type: Number, default: 350 }, // ms pop animation
  hoverBlink: { type: Boolean, default: true },
  audioOnClick: { type: Boolean, default: false },
  size: { type: String, default: 'normal' }, // 'normal' | 'small'
  animationsEnabled: { type: Boolean, default: true }
});

const blinking = ref(false);
const popped = ref(false);
const hover = ref(false);
const eyeRadius = ref(3);

let blinkTimer = null;
function scheduleBlink() {
  clearTimeout(blinkTimer);
  const interval = props.hoverBlink && hover.value ? Math.max(800, props.blinkInterval * 0.25) : props.blinkInterval;
  blinkTimer = setTimeout(() => {
    if (!props.animationsEnabled) { scheduleBlink(); return; }
    blinking.value = true;
    eyeRadius.value = 0.8;
    setTimeout(() => { blinking.value = false; eyeRadius.value = 3; }, 180);
    scheduleBlink();
  }, interval + Math.random() * 1200);
}

function handleClick() {
  // trigger a bigger blink/pop reaction
  popped.value = true;
  setTimeout(() => { popped.value = false; }, props.popDuration);
  if (props.audioOnClick) playClickSound();
}

// optional click sound (tiny inline beep). Replace with real asset if preferred.
let audio;
function initAudio() {
  try {
    audio = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=");
  } catch (e) { audio = null; }
}
function playClickSound() { if (!audio) initAudio(); if (audio) { audio.currentTime = 0; audio.play().catch(()=>{}); } }

onMounted(() => { scheduleBlink(); });
onBeforeUnmount(() => { clearTimeout(blinkTimer); });

// re-schedule blink when hover toggles so frequency updates immediately
watch(hover, (v) => { if (props.hoverBlink) { clearTimeout(blinkTimer); scheduleBlink(); } });

const wrapperClasses = computed(() => [
  'cat',
  'transition-transform',
  props.animationsEnabled ? 'animate-float' : '',
  popped.value && props.animationsEnabled ? 'animate-badge-pop' : '',
]);
</script>

<style scoped>
.animated-badge { position: relative; display: inline-block; transform-origin: center; }
.cat svg ellipse { transition: transform 120ms ease; }
.cat .whisker { transform-origin: left center; transition: transform 160ms ease; }
.cat.animate-badge-pop .whisker { transform: rotate(-6deg); }
</style>
