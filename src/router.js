import { createRouter, createWebHistory } from 'vue-router';
import About from './sections/AboutSection.vue';
import Experience from './sections/ExperienceSection.vue';
// Projects section temporalmente oculto (sin proyectos aún)
// import Projects from './sections/ProjectsSection.vue';
import Skills from './sections/SkillsSection.vue';
import Education from './sections/EducationSection.vue';
import Contact from './sections/ContactSection.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'about', component: About },
    { path: '/experiencia', name: 'experience', component: Experience },
  // { path: '/proyectos', name: 'projects', component: Projects }, // Rehabilitar cuando existan proyectos
    { path: '/skills', name: 'skills', component: Skills },
    { path: '/educacion', name: 'education', component: Education },
    { path: '/contacto', name: 'contact', component: Contact },
  ],
  scrollBehavior() { return { top: 0 }; }
});
