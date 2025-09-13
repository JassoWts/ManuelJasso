<template>
  <!-- Fullscreen transparent overlay so the existing animated background is visible -->
  <div
    class="fixed inset-0 z-[70] flex items-center justify-center select-none"
    :class="leaving ? 'opacity-0 pointer-events-none' : 'opacity-100'"
    @click="skip"
  >
    <!-- Vignette for a subtle game intro feeling (very soft) -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>

    <div class="relative text-center px-6">
      <h1
        class="title text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wide drop-shadow-lg"
        :aria-label="title"
      >
        <span
          v-for="(ch, i) in letters"
          :key="i"
          class="letter text-gradient-animate"
          :style="{ ['--delay']: `${i * 80}ms` }"
          v-html="ch === ' ' ? '&nbsp;' : ch"
        />
      </h1>
      <p class="mt-6 text-sm md:text-base text-white/80">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/10">
          Presiona para continuar
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';

const emit = defineEmits(['finished']);
const props = defineProps({
  title: { type: String, default: 'José Manuel Jasso' },
  duration: { type: Number, default: 4000 }, // tiempo visible antes de desvanecer (ms)
  fadeMs: { type: Number, default: 600 }
});

const leaving = ref(false);
const letters = computed(() => Array.from(props.title));

let t1, t2;
onMounted(() => {
  // Mantener ~duration, luego activar salida y emitir tras fade
  t1 = window.setTimeout(() => {
    leaving.value = true;
    t2 = window.setTimeout(() => emit('finished'), props.fadeMs);
  }, props.duration);
  // Evita scroll mientras está el intro
  const prev = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  // noop
  // Restaurar al salir
  const cleanup = () => { document.documentElement.style.overflow = prev; };
  // store cleanup
  onBeforeUnmount(cleanup);
});

function skip() {
  if (leaving.value) return; // ya saliendo
  leaving.value = true;
  window.clearTimeout(t1);
  window.setTimeout(() => emit('finished'), props.fadeMs);
}
</script>

<style scoped>
.title { letter-spacing: 0.04em; }
.letter {
  display: inline-block;
  opacity: 0;
  /* Aparece desde la parte baja de la pantalla y luego flota levemente */
  animation:
    letterRise 700ms cubic-bezier(0.22, 1, 0.36, 1) var(--delay) both,
    floatSoft 4800ms ease-in-out calc(var(--delay) + 700ms) infinite;
}

@keyframes letterRise {
  0%   { opacity: 0; transform: translateY(60vh) scale(0.98); filter: blur(2px); }
  60%  { opacity: 1; }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

@keyframes floatSoft {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

/* Fade del contenedor */
.fixed { transition: opacity 600ms ease; }

/* Accesibilidad: reducir animaciones si el usuario lo prefiere */
@media (prefers-reduced-motion: reduce) {
  .letter { animation: none !important; opacity: 1; transform: none; }
}
</style>
