import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/apip': 'http://localhost:8000',
    //   '/apiu': 'http://localhost:8001',
    //   '/apio': 'http://localhost:8002',
    // }
    proxy: {
      '/apip': {
        target: 'http://products:8000',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/apip/, ''),
        //secure: false,
      },
      '/apiu': {
        target: 'http://users:8001',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/apiu/, ''),
        //secure: false,
      },
      '/apio': {
        target: 'http://orders:8002',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/apio/, ''),
        //secure: false,
      },
    }
  }
})
