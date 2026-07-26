import tailwindcss from '@tailwindcss/postcss';
import { defineConfig } from 'vite';

import path from 'node:path';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
