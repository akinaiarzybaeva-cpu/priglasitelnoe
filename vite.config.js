import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — сайтты каалаган папкага же хостингге жүктөсө да иштейт
export default defineConfig({
  plugins: [react()],
  base: './',
});
