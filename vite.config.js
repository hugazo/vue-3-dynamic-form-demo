import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  plugins: [vue()],
})
