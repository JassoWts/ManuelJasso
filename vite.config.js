import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// GitHub Pages sirve el proyecto en /<repo>/
// Usamos base "/ManuelJasso/" solo para builds de producción.
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [vue()],
  base: isProd ? '/ManuelJasso/' : '/',
});
