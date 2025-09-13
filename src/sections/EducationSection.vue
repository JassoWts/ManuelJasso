<template>
  <section class="section" aria-labelledby="edu-heading">
    <h2 id="edu-heading">Educación</h2>
    <div class="mt-6 space-y-6">
      <div v-for="e in data.education" :key="e.institution" class="card">
        <h3 class="font-semibold">{{ e.degree }}</h3>
        <p class="text-sm text-slate-500">{{ e.institution }} · {{ e.period }}</p>
      </div>
    </div>
  </section>
</template>
<script setup>
import { cvData as data } from '../data/cvData';
</script>
