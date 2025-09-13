<template>
  <header class="backdrop-blur bg-white/80 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700">
    <nav class="container-default flex items-center justify-between py-3 gap-4">
      <div class="flex items-center gap-3">
        <router-link to="/" class="flex items-center gap-2 font-bold text-lg tracking-tight">
          <ImageWithFallback :src="logoSvg" :fallback="logoPng" alt="Logo" img-class="h-8 w-8 object-contain" />
          <span>JM<span class="text-primary">.</span></span>
        </router-link>
      </div>
      <ul class="hidden md:flex gap-6 text-sm font-medium">
        <li v-for="item in items" :key="item.to">
          <router-link :to="item.to" class="hover:text-primary transition-colors" active-class="text-primary">{{ item.label }}</router-link>
        </li>
      </ul>
      <div class="flex items-center gap-2">
        <button @click="toggleDark" class="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800" :title="isDark ? 'Modo claro' : 'Modo oscuro'">
          <span v-if="!isDark">🌙</span>
          <span v-else>☀️</span>
        </button>
        <ImageWithFallback :src="avatarJpeg" :fallback="avatarSvg" alt="Avatar" img-class="h-9 w-9 rounded-full ring-2 ring-primary/40 shadow-sm object-cover" />
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ImageWithFallback from './ImageWithFallback.vue';
import logoSvg from '../assets/logo-wtrmlon.svg';
import logoPng from '../assets/logo-wtrmlon.png';
import avatarJpeg from '../assets/jm.jpeg';
import avatarSvg from '../assets/jm-avatar.svg';

console.debug('[HeaderNav] assets', { logoSvg, logoPng, avatarJpeg, avatarSvg });

const items = [
  { to: '/', label: 'Sobre mí' },
  { to: '/experiencia', label: 'Experiencia' },
  // { to: '/proyectos', label: 'Proyectos' }, // Rehabilitar cuando agregues proyectos
  { to: '/skills', label: 'Skills' },
  // { to: '/educacion', label: 'Educación' }, // Rehabilitar cuando quieras mostrar Educación
  { to: '/contacto', label: 'Contacto' },
];

const isDark = ref(false);
// Animation preference: 'auto' | 'on' | 'off'
const animationMode = ref('auto');
const animationsEnabled = ref(true); // derived

function applyAnimationState() {
  let enabled;
  if (animationMode.value === 'on') enabled = true;
  else if (animationMode.value === 'off') enabled = false;
  else { // auto => follow system preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    enabled = !mq.matches;
  }
  animationsEnabled.value = enabled;
  document.documentElement.setAttribute('data-animations', enabled ? 'on' : 'off');
}

function cycleAnimationMode() {
  if (animationMode.value === 'auto') animationMode.value = 'on';
  else if (animationMode.value === 'on') animationMode.value = 'off';
  else animationMode.value = 'auto';
  localStorage.setItem('animationMode', animationMode.value);
  applyAnimationState();
}

const animationAria = computed(() => {
  if (animationMode.value === 'auto') return 'Animaciones automáticas según preferencias del sistema';
  if (animationMode.value === 'on') return 'Animaciones activadas';
  return 'Animaciones desactivadas';
});

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark');
  const storedMode = localStorage.getItem('animationMode');
  if (storedMode === 'on' || storedMode === 'off' || storedMode === 'auto') animationMode.value = storedMode;
  // watch for system preference changes when in auto
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  function mqHandler() { if (animationMode.value === 'auto') applyAnimationState(); }
  mq.addEventListener('change', mqHandler);
  applyAnimationState();
  window.addEventListener('storage', (e) => {
    if (e.key === 'animationMode' && e.newValue) {
      animationMode.value = e.newValue;
      applyAnimationState();
    }
  });
});

function toggleDark() {
  const root = document.documentElement;
  if (root.classList.contains('dark')) {
    root.classList.remove('dark');
    isDark.value = false;
    localStorage.setItem('theme', 'light');
  } else {
    root.classList.add('dark');
    isDark.value = true;
    localStorage.setItem('theme', 'dark');
  }
}
</script>
