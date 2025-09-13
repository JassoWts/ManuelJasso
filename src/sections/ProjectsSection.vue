<template>
  <section class="section" aria-labelledby="projects-heading">
    <h2 id="projects-heading">Proyectos</h2>
    <div class="mt-6 grid gap-6 sm:grid-cols-2">
      <article v-for="p in data.projects" :key="p.name" class="card flex flex-col">
        <h3 class="font-semibold mb-1">{{ p.name }}</h3>
        <p class="text-sm text-slate-600 dark:text-slate-300 flex-1">{{ p.description }}</p>
        <div class="mt-3 space-x-3 text-sm">
          <a :href="p.repo" target="_blank" rel="noopener" class="font-medium">Código →</a>
          <a :href="p.demo" target="_blank" rel="noopener" class="font-medium text-accent">Demo →</a>
        </div>
        <div class="mt-3">
          <span v-for="tag in p.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
<script setup>
import { cvData as data } from '../data/cvData';
</script>
