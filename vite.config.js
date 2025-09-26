import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use root base for Vercel/Netlify to avoid asset and routing issues
  base: '/',
})
