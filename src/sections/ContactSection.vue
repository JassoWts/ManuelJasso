<template>
  <section class="section" aria-labelledby="contact-heading">
    <h2 id="contact-heading">Contacto</h2>
    <div class="mt-6 card p-6 flex flex-col items-center text-center">
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">Puedes contactarme a través de:</p>
      <SkillIcons
        :names="['Gmail','GitHub','LinkedIn']"
        :links="[null, data.contact.github, data.contact.linkedin]"
        size="lg"
        class="justify-center gap-6"
        @icon-click="handleIconClick"
      />
      <p class="mt-5 text-xs text-slate-400 break-all">{{ primaryEmail }}</p>
    </div>

    <!-- Modal correos -->
    <transition name="fade">
      <div v-if="showEmailModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur" @click.self="closeModal">
        <div class="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md p-6 relative">
          <button @click="closeModal" class="absolute top-2 right-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200" aria-label="Cerrar">✕</button>
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2"><img src="https://skillicons.dev/icons?i=gmail" alt="Gmail" class="h-6 w-6" /> Correos de contacto</h3>
          <ul class="space-y-3">
            <li v-for="mail in emails" :key="mail" class="flex items-center gap-3">
              <img src="https://skillicons.dev/icons?i=gmail" alt="Gmail" class="h-6 w-6 flex-shrink-0" />
              <a :href="`mailto:${mail}`" class="text-primary font-medium break-all">{{ mail }}</a>
              <button @click="copy(mail)" class="ml-auto text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">Copiar</button>
            </li>
          </ul>
          <p v-if="copied" class="mt-4 text-xs text-green-600 dark:text-green-400">Copiado ✔</p>
        </div>
      </div>
    </transition>
  </section>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { cvData as data } from '../data/cvData';
import SkillIcons from '../components/SkillIcons.vue';

const emails = [
  data.contact.email,
  'manuel.jmosco@gmail.com',
  'solutionswmit@gmail.com'
];
const primaryEmail = emails[0];
const showEmailModal = ref(false);
const copied = ref(false);
let copyTimeout;

function handleIconClick(icon) {
  if (icon.slug === 'gmail') {
    openModal();
  }
}

function openModal() {
  showEmailModal.value = true;
  copied.value = false;
  trapKeyboard(true);
}
function closeModal() {
  showEmailModal.value = false;
  trapKeyboard(false);
}

function copy(mail) {
  navigator.clipboard.writeText(mail).then(() => {
    copied.value = true;
    clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => { copied.value = false; }, 2000);
  }).catch(() => {});
}

function onKey(e) {
  if (e.key === 'Escape' && showEmailModal.value) closeModal();
}

function trapKeyboard(enable) {
  if (enable) document.addEventListener('keydown', onKey);
  else document.removeEventListener('keydown', onKey);
}

onMounted(() => {
  // nada adicional
});
onBeforeUnmount(() => trapKeyboard(false));
</script>
