import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@providers': path.resolve('./', './src/providers'),
      '@services': path.resolve('./', './src/services'),
    },
  },
});
