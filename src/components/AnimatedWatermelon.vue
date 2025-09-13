<template>
  <div class="animated-badge" :class="wrapperClasses" @click="doPop" @mouseenter="hover=true" @mouseleave="hover=false" role="button" aria-label="animated watermelon">
    <svg viewBox="0 0 64 64" class="w-14 h-14" xmlns="http://www.w3.org/2000/svg" fill="none">
      <circle cx="32" cy="32" r="28" fill="#d81159" />
      <path d="M10 36 a22 18 0 0 0 44 0" fill="#ff6b6b" />
      <g class="seeds" fill="#1b4332">
        <circle class="seed" cx="26" cy="30" r="1.8" />
        <circle class="seed" cx="34" cy="26" r="1.6" />
        <circle class="seed" cx="40" cy="34" r="1.5" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({ popDuration: { type: Number, default: 300 }, popScale: { type: Number, default: 1.08 }, audioOnClick: { type: Boolean, default: false },
  size: { type: String, default: 'normal' },
  animationsEnabled: { type: Boolean, default: true }
});
const popped = ref(false);
const hover = ref(false);
let audio;
function doPop() {
  if (!props.animationsEnabled) { if (props.audioOnClick) playClickSound(); return; }
  popped.value = true;
  if (props.audioOnClick) playClickSound();
  setTimeout(() => { popped.value = false; }, props.popDuration);
}
function initAudio() { try { audio = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA="); } catch (e) { audio = null; } }
function playClickSound() { if (!audio) initAudio(); if (audio) { audio.currentTime = 0; audio.play().catch(()=>{}); } }

const wrapperClasses = computed(() => [
  'watermelon',
  props.animationsEnabled ? 'animate-float-lg' : '',
  popped.value && props.animationsEnabled ? 'animate-badge-pop' : '',
]);
</script>

<style scoped>
.animated-badge { position: relative; display: inline-block; transform-origin: center; }
.watermelon .seed { transition: transform 180ms ease; }
.animate-badge-pop.watermelon .seed { transform: translateY(-3px) rotate(-8deg); }
.watermelon:hover .seed { transform: translateY(-1.5px); }
</style>
