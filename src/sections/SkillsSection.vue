<template>
  <section class="section" aria-labelledby="skills-heading">
    <h2 id="skills-heading">Skills</h2>
    <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="(list, key) in data.skills" :key="key" class="card space-y-3">
        <div>
          <h3 class="mb-2 capitalize flex items-center justify-between">
            <span>{{ key }}</span>
            <span class="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{{ list.length }}</span>
          </h3>
          <SkillIcons :names="list" labels class="mb-2" />
          <div class="flex flex-wrap gap-1.5">
            <span v-for="item in list" :key="item" class="tag">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { cvData as data } from '../data/cvData';
import SkillIcons from '../components/SkillIcons.vue';
</script>
