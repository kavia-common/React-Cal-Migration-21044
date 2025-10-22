import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Bind to all interfaces and enforce port 3000 for preview readiness
    host: true,
    port: 3000,
    strictPort: true
  },
  preview: {
    host: true,
    port: 3000,
    strictPort: true
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true
  }
});
