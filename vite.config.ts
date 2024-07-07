import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

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
      '@providers': path.resolve(__dirname, './src/providers'),
      '@services': path.resolve(__dirname, './src/services'),
    },
  },
  esbuild: {
    // jsxInject: `import React from 'react';`,
  },
});
