<template>
  <div class="min-h-screen flex flex-col font-sans relative">
    <!-- Animated gradient background layer -->
    <div class="app-animated-bg" aria-hidden="true"></div>
    <!-- Intro overlay (video-game style) -->
    <IntroSplash
      v-if="showIntro"
      class="z-[70]"
      title="José Manuel Jasso"
      @finished="onIntroFinished"
    />

    <HeaderNav v-show="!showIntro" class="sticky top-0 z-50" />
    <main v-show="!showIntro" class="flex-1 container-default w-full relative z-10">
      <router-view />
    </main>
  <!-- Watermelon rain inserted below (component to be added) -->
  <WatermelonRain v-show="!showIntro" />
    <SiteFooter v-show="!showIntro" class="relative z-10" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderNav from './components/HeaderNav.vue';
import SiteFooter from './components/SiteFooter.vue';
import WatermelonRain from './components/WatermelonRain.vue';
import IntroSplash from './components/IntroSplash.vue';

const showIntro = ref(true);

onMounted(() => {
  // Mostrar solo una vez por sesión
  const k = 'intro:shown';
  const already = sessionStorage.getItem(k) === '1';
  showIntro.value = !already;
  if (!already) sessionStorage.setItem(k, '1');
});

function onIntroFinished() {
  showIntro.value = false;
}
</script>
