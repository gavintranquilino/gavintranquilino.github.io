import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      // Exclude /guhbot path from being handled by the dev server
      // This ensures it's served as static files
      '/guhbot': {
        target: 'http://localhost:5173',
        bypass: (req) => {
          if (req.url.startsWith('/guhbot')) {
            return req.url;
          }
        }
      }
    }
  },
  build: {
    // Use named output chunks
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
