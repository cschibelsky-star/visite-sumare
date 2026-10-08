import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  css: { postcss: { plugins: [] } },
  server: { proxy: { '/api': 'http://localhost:8787', '/uploads': 'http://localhost:8787' } }
});
