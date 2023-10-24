import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/apip': 'http://localhost:8000',
      '/apiu': 'http://localhost:8001',
      '/apio': 'http://localhost:8002',
    }
  }
})
