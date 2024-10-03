import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@redux': path.resolve(__dirname, 'src/redux'),  
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://world.openfoodfacts.org',
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
