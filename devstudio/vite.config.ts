import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: ['es2020', 'chrome87', 'firefox78', 'safari14', 'edge88'],
    cssTarget: 'chrome87',
  },
})
