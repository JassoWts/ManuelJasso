<template>
  <div class="flex flex-wrap items-center gap-3" v-if="icons.length">
    <component
      v-for="icon in icons"
      :is="icon.href ? 'a' : 'div'"
      :href="icon.href || undefined"
      :target="icon.href ? '_blank' : undefined"
      :rel="icon.href ? 'noopener noreferrer' : undefined"
      :key="icon.slug"
      class="group flex items-center gap-1 font-medium focus:outline-none focus:ring-2 focus:ring-primary/60 rounded transition cursor-pointer"
      :title="icon.name"
      @click="onIconClick(icon)"
    >
      <img :src="icon.url" :alt="icon.name" :class="imgClass" loading="lazy" decoding="async" />
      <span v-if="labels" class="hidden sm:inline text-[11px] group-hover:text-primary">{{ icon.name }}</span>
    </component>
  </div>
</template>
<script setup>
// Props: names: array de nombres 'JavaScript', 'Vue', etc.
// Optional: labels (boolean) para mostrar texto al lado.
import { computed } from 'vue';
const emit = defineEmits(['icon-click']);

const props = defineProps({
  names: { type: Array, default: () => [] },
  labels: { type: Boolean, default: false },
  links: { type: Array, default: () => [] }, // opcional: array de urls paralelo a names
  size: { type: String, default: 'md' } // xs | sm | md | lg | xl
});

// Mapeo de nombres a slugs soportados por skillicons.dev
// Si necesitas reutilizar este mapa en otro archivo, convierte este componente a <script> normal y expórtalo desde allí.
const skillSlugMap = {
  javascript: 'js',
  typescript: 'ts',
  vue: 'vue',
  'vue.js': 'vue',
  node: 'nodejs',
    'node.js': 'nodejs',
    nodejs: 'nodejs',
  python: 'python',
  php: 'php',
  mysql: 'mysql',
  postgresql: 'postgres',
  mongo: 'mongodb',
  mongodb: 'mongodb',
  docker: 'docker',
  kubernetes: 'kubernetes',
  git: 'git',
  redis: 'redis',
  graphql: 'graphql',
  express: 'express',
    'express.js': 'express',
  tailwind: 'tailwind',
  tailwindcss: 'tailwind',
  azure: 'azure',
  'azure ad': 'azure',
  vite: 'vite',
  laravel: 'laravel',
  kotlin: 'kotlin',
  react: 'react',
  'react native': 'react',
  postman: 'postman',
  'ci/cd': 'githubactions',
  cicd: 'githubactions',
  'google cloud': 'gcp',
  gcp: 'gcp',
  aws: 'aws',
  bootstrap: 'bootstrap',
  npm: 'npm',
  jquery: 'jquery',
  html: 'html',
  html5: 'html',
  css: 'css',
  css3: 'css',
  linux: 'linux',
  ubuntu: 'ubuntu',
    'sql server': 'mssql',
    mssql: 'mssql',
  github: 'github',
  bitbucket: 'bitbucket',
  java: 'java',
  c: 'c',
  'c++': 'cpp',
  cpp: 'cpp',
  'c#': 'cs',
  cs: 'cs',
  linkedin: 'linkedin',
  gmail: 'gmail',
};

const sizeMap = {
  xs: 'h-4 w-4',
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
  xl: 'h-14 w-14'
};

const imgClass = computed(() => sizeMap[props.size] || sizeMap.md);

const icons = computed(() => {
  return props.names.map((n, idx) => {
    const key = String(n).trim().toLowerCase();
    const slug = skillSlugMap[key];
    if (!slug) return null;
    const href = props.links[idx];
    return {
      name: n,
      slug,
      url: `https://skillicons.dev/icons?i=${slug}`,
      href: typeof href === 'string' ? href : undefined
    };
  }).filter(Boolean);
});

function onIconClick(icon) {
  // Si el icono tiene href, el navegador seguirá el link; igual emitimos evento.
  emit('icon-click', icon);
}
</script>
