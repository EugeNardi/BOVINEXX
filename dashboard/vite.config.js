import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/getguia': 'http://localhost:4000',
      '/postguia': 'http://localhost:4000',
      '/uploads': 'http://localhost:4000',
    },
  },
})


