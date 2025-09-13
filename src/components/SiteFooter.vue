<template>
  <footer class="mt-20 py-8 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-500">
    <p>© {{ year }} José Manuel Jasso. Construido con Vue 3 + TailwindCSS.</p>
  </footer>
</template>
<script setup>
const year = new Date().getFullYear();
</script>
