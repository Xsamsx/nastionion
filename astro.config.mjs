// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://xsamsx.github.io',
  base: '/nastionion',
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 1500
    }
  }
});