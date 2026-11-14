import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/auth': {
        target: 'http://host.docker.internal:8083',
        changeOrigin: true,
      },
      '/questions': {
        target: 'http://host.docker.internal:8083',
        changeOrigin: true,
      },
      '/road-sign': {
        target: 'http://host.docker.internal:8083',
        changeOrigin: true,
      },
      '/chapter': {
        target: 'http://host.docker.internal:8083',
        changeOrigin: true,
      },
      '/users': {
        target: 'http://host.docker.internal:8083',
        changeOrigin: true,
      },
      '/image': {
        target: 'http://host.docker.internal:8083',
        changeOrigin: true,
      },
    },
  },
});
