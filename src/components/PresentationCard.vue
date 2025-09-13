<template>
  <section class="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-50 p-8 md:p-12 shadow-xl" :style="bgStyle">
    <AnimatedBackground />
    <div class="absolute inset-0 bg-slate-900/70 dark:bg-slate-900/75 backdrop-blur-sm" />

    <!-- Floating brand badges -->
    <div class="pointer-events-none">
      <div class="absolute left-8 top-6">
        <AnimatedCat />
      </div>
      <div class="absolute right-10 top-20">
        <AnimatedWatermelon />
      </div>
    </div>

    <div class="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
      <div class="flex items-center gap-6">
        <ImageWithFallback :src="avatarJpeg" :fallback="avatarSvg" alt="Avatar" img-class="w-28 h-28 rounded-full ring-4 ring-primary/40 shadow-lg object-cover" />
        <div>
          <h1 class="text-3xl md:text-4xl font-bold tracking-tight drop-shadow">José Manuel Jasso</h1>
          <p class="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-sm border border-white/20">Desarrollador Web <span class="text-primary">Full Stack</span></p>
        </div>
      </div>
      <div class="flex-1 space-y-4 max-w-2xl">
        <p class="text-sm md:text-base text-slate-200 leading-relaxed">
          Me entusiasma y apasiona el desarrollo web tanto <strong>frontend</strong> como <strong>backend</strong>, creando soluciones escalables, mantenibles y centradas en el usuario. Disfruto diseñar APIs limpias, optimizar rendimiento y automatizar flujos de entrega continua. Tengo experiencia con herramientas de despliegue y orquestación como <strong>Docker</strong> y <strong>Kubernetes</strong>, así como en adoptar tecnologías de nube moderna en <strong>Google Cloud</strong>, <strong>Azure</strong> y <strong>AWS</strong> para potenciar la resiliencia y el escalamiento de los sistemas.
        </p>
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in tags" :key="tag" class="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur">{{ tag }}</span>
        </div>
        <div class="flex flex-wrap gap-3 pt-2">
          <a href="#proyectos" class="px-5 py-2 rounded-md bg-primary text-white text-sm font-medium shadow hover:shadow-md transition">Ver Proyectos</a>
          <a href="#contacto" class="px-5 py-2 rounded-md bg-white/10 border border-white/20 text-sm font-medium hover:bg-white/15 transition">Contactar</a>
          <a href="/cv.pdf" class="px-5 py-2 rounded-md bg-gradient-to-r from-primary to-accent text-white text-sm font-medium shadow hover:opacity-90 transition">Descargar CV</a>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import ImageWithFallback from './ImageWithFallback.vue';
import AnimatedCat from './AnimatedCat.vue';
import AnimatedWatermelon from './AnimatedWatermelon.vue';
import AnimatedBackground from './AnimatedBackground.vue';
import avatarJpeg from '../assets/jm.jpeg';
import avatarSvg from '../assets/jm-avatar.svg';
import bg from '../assets/presentation.jpeg';

console.debug('[PresentationCard] assets', { avatarJpeg, avatarSvg, bg });

const tags = ['Vue', 'Tailwind', 'Docker', 'Node', 'SQL', 'Kubernetes'];

const bgStyle = {
  backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.3), rgba(15,23,42,0.65)), url(${bg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
};
</script>
