import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Para Pages, debemos servir bajo /ManuelJasso/ cuando hacemos build.
export default defineConfig(({ command }) => ({
  plugins: [vue()],
  base: command === 'build' ? '/ManuelJasso/' : '/',
}));
