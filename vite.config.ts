/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
  plugins: [
    react(),
    svgr(),
  ],
})
