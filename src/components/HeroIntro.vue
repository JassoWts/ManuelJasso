<template>
  <section class="relative overflow-hidden py-16 md:py-24 mx-4 md:mx-10 rounded-3xl shadow-xl border border-white/60 dark:border-white/10 bg-white/55 dark:bg-slate-900/30 backdrop-blur-sm">
    <div class="absolute inset-0 pointer-events-none select-none">
      <!-- subtle gradient backdrop -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 dark:from-primary/15 dark:to-accent/15" />
    </div>
    <div class="relative mx-auto max-w-5xl px-4 flex flex-col lg:flex-row gap-10 items-start">
      <!-- Photo with breathing animation -->
      <div class="flex-shrink-0 animate-breath">
        <ImageWithFallback :src="avatarJpeg" :fallback="avatarSvg" alt="Foto" img-class="w-40 h-40 md:w-56 md:h-56 rounded-full ring-4 ring-primary/40 shadow-xl object-cover" />
      </div>
      <!-- Text -->
      <div class="flex-1 space-y-6">
        <header>
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight leading-tight">José Manuel <span class="text-gradient-animate">Jasso</span></h1>
          <p class="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 dark:bg-slate-800/60 backdrop-blur text-sm font-medium border border-slate-200 dark:border-slate-700 shadow-sm">Desarrollador Web <span class="text-primary font-semibold">Full Stack</span></p>
        </header>
        <div class="prose prose-slate dark:prose-invert max-w-none text-base md:text-lg leading-relaxed">
          <p class="animate-text-fade-up">La programación para mí no es solo un trabajo, es algo que realmente disfruto y me apasiona. Amo el hecho de poder resolver problemas con código y transformar ideas en sistemas que ayudan a las personas y a las empresas.</p>
          <p class="animate-text-fade-up delay-anim-1">Mis áreas favoritas son el desarrollo backend y todo lo relacionado con la construcción de aplicaciones escalables y confiables.</p>
          <p class="animate-text-fade-up delay-anim-2">Mis herramientas de confianza son <strong>Laravel</strong>, porque me encanta la forma en que me permite estructurar proyectos con rapidez y elegancia; y en la parte de infraestructura disfruto muchísimo trabajar con <strong>Docker</strong> y <strong>Kubernetes</strong>, ya que me fascina ver cómo un sistema puede crecer y desplegarse en la nube de manera ordenada y eficiente.</p>
          <p class="animate-text-fade-up delay-anim-3">También me gusta explorar y aprovechar las posibilidades que ofrecen las plataformas cloud como <strong>AWS</strong>, <strong>Google Cloud</strong> y <strong>Azure</strong>. Creo que combinar el desarrollo con la infraestructura me da una visión completa para entregar soluciones sólidas y listas para el futuro.</p>
          <p class="animate-text-fade-up delay-anim-3">Soy de las personas que programan porque lo aman, no solo por cumplir un horario. Para mí, cada proyecto es una oportunidad de aprender, mejorar y demostrar que con código se pueden construir cosas increíbles.</p>
        </div>
        <div class="flex flex-wrap gap-4 pt-2">
          <!--<a href="#proyectos" class="px-6 py-3 rounded-md bg-primary text-white text-sm font-medium shadow hover:shadow-md transition">Ver Proyectos</a>-->
          <router-link to="/contacto" class="px-6 py-3 rounded-md bg-white/10 dark:bg-white/5 border border-slate-200 dark:border-slate-600 text-sm font-medium hover:bg-white/20 dark:hover:bg-white/10 transition">Contactar</router-link>
          <button
            type="button"
            @click="downloadCV"
            :disabled="downloading"
            class="relative px-6 py-3 rounded-md bg-gradient-to-r from-primary to-accent text-white text-sm font-medium shadow hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="!downloading && !downloadError">Descargar CV</span>
            <span v-else-if="downloading">Descargando...</span>
            <span v-else>Reintentar</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue';
import ImageWithFallback from './ImageWithFallback.vue';
import avatarJpeg from '../assets/jm.jpeg';
import avatarSvg from '../assets/jm-avatar.svg';

const downloading = ref(false);
const downloadError = ref(false);

async function downloadCV() {
  if (downloading.value) return;
  downloading.value = true;
  downloadError.value = false;
  const filePath = new URL(`${import.meta.env.BASE_URL}cv.pdf`, window.location.href).toString();
  try {
    const res = await fetch(filePath, { cache: 'no-store' });
    if (!res.ok) throw new Error('not ok');
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV-Jose-Manuel-Jasso.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  } catch (e) {
    console.warn('Fallo descarga CV', e);
    downloadError.value = true;
  } finally {
    downloading.value = false;
  }
}
</script>
<style scoped>
.prose p { margin-top: 0.85rem; margin-bottom: 0.85rem; }
</style>
