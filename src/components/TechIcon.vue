<template>
  <span :class="['inline-flex items-center justify-center', sizeClass]" :title="name" v-html="svg"></span>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({ name: { type:String, required:true }, size:{ type:String, default:'sm'} });
const sizeClass = computed(()=> props.size==='sm' ? 'w-5 h-5' : 'w-7 h-7');
const icons = {
  Laravel: '<svg viewBox="0 0 256 256" fill="none"><path fill="#FF2D20" d="M0 32l64-32 64 32v64L64 128 0 96V32zm128 0l64-32 64 32v64l-64 32-64-32V32zm0 128l64-32 64 32v64l-64 32-64-32v-64zM0 160l64-32 64 32v64l-64 32-64-32v-64z"/></svg>',
  PHP: '<svg viewBox="0 0 128 64" fill="none"><ellipse cx="64" cy="32" rx="62" ry="30" fill="#777BB3"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="28" font-family="monospace" fill="#fff">PHP</text></svg>',
  Vue: '<svg viewBox="0 0 261 226"><path fill="#41B883" d="M33 0h69.3L130.5 39 158 0h69L130.5 226"/><path fill="#35495E" d="M33 0L130.5 226 227 0h-69L130.5 78 102 0H33z"/></svg>',
  Kubernetes: '<svg viewBox="0 0 256 256"><circle cx="128" cy="128" r="120" fill="#326CE5"/><path fill="#fff" d="M128 72l44 28 16 52-44 32h-56L72 152l16-52 40-28z"/></svg>',
  Docker: '<svg viewBox="0 0 256 256"><rect x="16" y="136" width="224" height="64" rx="12" fill="#2496ED"/><path fill="#fff" d="M64 120h32v-32H64v32zm40 0h32v-32h-32v32zm40 0h32v-32h-32v32zM104 80h32V48h-32v32z"/></svg>',
  Azure: '<svg viewBox="0 0 256 256"><path fill="#0277D4" d="M144 32l80 192h-64l-24-64H80l64-128z"/><path fill="#42A5F5" d="M112 32L32 224h64l24-64h56L112 32z"/></svg>',
  TrueNAS: '<svg viewBox="0 0 256 256"><path fill="#0b5" d="M128 32l96 48v96l-96 48-96-48V80l96-48z"/><path fill="#fff" opacity="0.85" d="M128 60l72 36v64l-72 36-72-36V96l72-36z"/></svg>',
  'Google Calendar API': '<svg viewBox="0 0 256 256"><rect width="200" height="200" x="28" y="28" rx="32" fill="#1a73e8"/><text x="50%" y="58%" font-size="110" font-family="sans-serif" fill="#fff" text-anchor="middle">31</text></svg>',
  'React Native': '<svg viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="20" fill="#61DAFB"/><ellipse cx="128" cy="128" rx="112" ry="44" stroke="#61DAFB" stroke-width="8"/><ellipse cx="128" cy="128" rx="44" ry="112" stroke="#61DAFB" stroke-width="8" transform="rotate(60 128 128)"/><ellipse cx="128" cy="128" rx="44" ry="112" stroke="#61DAFB" stroke-width="8" transform="rotate(120 128 128)"/></svg>',
  PostgreSQL: '<svg viewBox="0 0 256 256"><rect width="256" height="256" rx="40" fill="#336791"/><path fill="#fff" d="M128 64c-36 0-64 20-64 52 0 20 8 36 24 44l-8 32 32-28c8 4 16 4 24 4 36 0 64-20 64-52s-28-52-72-52z"/></svg>',
  Redis: '<svg viewBox="0 0 256 256"><path fill="#A41E11" d="M32 96l96-32 96 32v64l-96 32-96-32V96z"/><path fill="#fff" d="M128 84l-40 12 40 12 40-12-40-12zm0 28l-28 8 28 8 28-8-28-8z"/></svg>',
  Python: '<svg viewBox="0 0 256 256"><path fill="#3776AB" d="M128 32h64v80c0 24-16 40-40 40h-48c-22 0-40 18-40 40v32H0v-72c0-32 24-56 56-56h48V72c0-22 10-40 24-40z"/><path fill="#FFDA4B" d="M128 224H64v-80c0-24 16-40 40-40h48c22 0 40-18 40-40V32h64v72c0 32-24 56-56 56h-48v40c0 22-10 40-24 40z"/></svg>',
  REST: '<svg viewBox="0 0 256 256"><rect width="256" height="256" rx="40" fill="#0e2430"/><text x="50%" y="54%" text-anchor="middle" font-size="84" font-family="monospace" fill="#fff">API</text></svg>',
  Kotlin: '<svg viewBox="0 0 256 256"><path fill="#7F52FF" d="M32 224V32h192L128 128l96 96H32z"/></svg>',
  MySQL: '<svg viewBox="0 0 256 256"><rect width="256" height="256" rx="40" fill="#00618A"/><path fill="#fff" d="M72 176c16-64 64-96 112-96-40 8-64 40-72 72 24-16 56-16 72 0-40 0-64 16-72 24 0 0-16 0-40 0z"/></svg>',
  Git: '<svg viewBox="0 0 256 256"><rect width="256" height="256" rx="40" fill="#F05133"/><circle cx="96" cy="128" r="20" fill="#fff"/><circle cx="160" cy="64" r="20" fill="#fff"/><circle cx="160" cy="192" r="20" fill="#fff"/><path stroke="#fff" stroke-width="12" fill="none" d="M96 128l64-64v128l-64-64z"/></svg>'
};
const svg = computed(()=> icons[props.name] || '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#999"/></svg>');
</script>
<style scoped>
span { line-height: 0; }
</style>
