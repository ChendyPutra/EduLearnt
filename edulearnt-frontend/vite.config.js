import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8000',
      '/login': 'http://localhost:8000',
      '/logout': 'http://localhost:8000',
      '/register': 'http://localhost:8000',
      '/sanctum': 'http://localhost:8000',
      '/admin': 'http://localhost:8000',
    },
  },
});
