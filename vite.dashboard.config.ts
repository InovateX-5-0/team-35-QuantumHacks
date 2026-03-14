import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/dashboard/',
  root: path.resolve(__dirname, 'src-dashboard'),
  build: {
    outDir: path.resolve(__dirname, 'dist-dashboard'),
  },
  server: {
    port: 5174,
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
