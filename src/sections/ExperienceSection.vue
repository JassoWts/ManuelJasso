<template>
  <section class="section" aria-labelledby="exp-heading">
    <h2 id="exp-heading" class="text-3xl font-bold tracking-tight">Experiencia</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <article v-for="job in data.experience" :key="job.company" tabindex="0"
        @click="open(job,$event)" @keydown.enter.prevent="open(job,$event)"
        class="group relative rounded-2xl border border-white/60 dark:border-white/10 bg-white/55 dark:bg-slate-900/30 backdrop-blur-sm p-5 shadow-lg flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/60 transition hover:-translate-y-1 hover:shadow-xl">
        <header class="mb-3">
          <h3 class="font-semibold leading-tight text-sm md:text-base">
            <span class="block">{{ job.role }}</span>
            <span class="text-primary/80">{{ job.company }}</span>
          </h3>
          <span class="mt-1 inline-block text-xs font-medium text-slate-500 dark:text-slate-400">{{ job.period }}</span>
        </header>
        <div class="flex-1 space-y-3">
          <div v-for="section in job.sections" :key="section.title">
            <div class="flex items-center gap-2">
              <h4 class="text-[11px] font-semibold uppercase tracking-wide text-primary/80">{{ section.title }}</h4>
              <span class="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 leading-none">{{ section.items.length }}</span>
            </div>
            <ul class="list-disc list-inside space-y-1 text-[13px] leading-snug">
              <li v-for="item in section.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
        <footer class="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/40 flex flex-wrap gap-3 items-center">
          <SkillIcons :names="job.stack" />
        </footer>
        <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/0 group-hover:ring-primary/30 transition" aria-hidden="true"></div>
      </article>
    </div>

    <!-- Modal FLIP zoom detail -->
    <div v-if="active" class="fixed inset-0 z-50" role="dialog" aria-modal="true" @keydown.esc="close" ref="modalRoot">
      <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" :style="backdropStyle" @click="close" ref="backdropRef"></div>
      <div class="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div ref="panelRef" class="modal-panel relative w-full max-w-5xl xl:max-w-6xl origin-center bg-white dark:bg-slate-900 rounded-3xl border border-white/60 dark:border-white/10 shadow-2xl p-8 overflow-hidden pointer-events-auto" :style="panelStyle">
          <button class="absolute top-3 right-3 text-xs px-2 py-1 rounded-md bg-slate-200/60 dark:bg-slate-700/60 hover:bg-slate-300 dark:hover:bg-slate-600 transition" @click="close">Cerrar</button>
          <header class="mb-5">
            <h3 class="text-xl font-semibold leading-tight">{{ active.role }} · <span class="text-primary">{{ active.company }}</span></h3>
            <p class="text-xs mt-1 text-slate-500 dark:text-slate-400">{{ active.period }}</p>
          </header>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="md:col-span-2">
              <h4 class="text-sm font-semibold mb-2 uppercase tracking-wide text-primary">Responsabilidades y logros</h4>
              <div class="space-y-6 max-h-[60vh] overflow-auto pr-2">
                <div v-for="section in active.sections" :key="section.title" class="space-y-1">
                  <div class="flex items-center gap-2">
                    <h5 class="text-xs font-semibold tracking-wide text-primary/80 uppercase">{{ section.title }}</h5>
                    <span class="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 leading-none">{{ section.items.length }}</span>
                  </div>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li v-for="item in section.items" :key="item">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 class="text-sm font-semibold mb-2 uppercase tracking-wide text-primary">Stack</h4>
              <div class="space-y-3">
                <SkillIcons :names="active.stack" labels />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { cvData as data } from '../data/cvData';
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import SkillIcons from '../components/SkillIcons.vue';

const active = ref(null);
const modalRoot = ref(null);
let lastFocused = null;
const panelRef = ref(null);
const backdropRef = ref(null);
const panelStyle = ref({});
const backdropStyle = ref({ opacity: 0, transition: 'opacity .5s ease' });
let animFrom = null;

function open(job, ev){
  active.value = job;
  lastFocused = ev.currentTarget;
  const originRect = ev.currentTarget.getBoundingClientRect();
  animFrom = originRect;
  nextTick(()=>{
    if(!panelRef.value) return;
    const panelRect = panelRef.value.getBoundingClientRect();
    const dx = originRect.left + originRect.width/2 - (panelRect.left + panelRect.width/2);
    const dy = originRect.top + originRect.height/2 - (panelRect.top + panelRect.height/2);
    const sx = originRect.width / panelRect.width;
    const sy = originRect.height / panelRect.height;
    panelStyle.value = {
      transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy}) rotate(.001deg)`,
      opacity: 0.4,
      transition: 'transform .55s cubic-bezier(.16,.8,.24,1), opacity .55s'
    };
    requestAnimationFrame(()=>{
      backdropStyle.value = { ...backdropStyle.value, opacity: 1 };
      requestAnimationFrame(()=>{
        panelStyle.value = {
          transform: 'translate(0,0) scale(1,1)',
            opacity: 1,
          transition: 'transform .55s cubic-bezier(.16,.8,.24,1), opacity .55s'
        };
      });
    });
    requestAnimationFrame(()=>{ if(modalRoot.value) modalRoot.value.focus(); });
  });
}
function close(){
  if(!panelRef.value){
    active.value = null;
    if(lastFocused) lastFocused.focus();
    return;
  }
  const panelRect = panelRef.value.getBoundingClientRect();
  const origin = animFrom;
  if(origin){
    const dx = origin.left + origin.width/2 - (panelRect.left + panelRect.width/2);
    const dy = origin.top + origin.height/2 - (panelRect.top + panelRect.height/2);
    const sx = origin.width / panelRect.width;
    const sy = origin.height / panelRect.height;
    panelStyle.value = {
      transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy}) rotate(.001deg)`,
      opacity: 0.3,
      transition: 'transform .5s cubic-bezier(.6,.05,.2,.9), opacity .5s'
    };
    backdropStyle.value = { ...backdropStyle.value, opacity: 0 };
    const handler = ()=>{
      panelRef.value?.removeEventListener('transitionend', handler);
      active.value = null;
      if(lastFocused) lastFocused.focus();
    };
    panelRef.value.addEventListener('transitionend', handler);
  } else {
    active.value = null;
    if(lastFocused) lastFocused.focus();
  }
}

function onKey(e){ if(e.key==='Escape' && active.value) close(); }
onMounted(()=> window.addEventListener('keydown', onKey));
onBeforeUnmount(()=> window.removeEventListener('keydown', onKey));
</script>
<style scoped>
/* FLIP modal panel optimization */
.modal-panel{will-change:transform,opacity;}
.line-clamp-6{display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden;}
</style>
