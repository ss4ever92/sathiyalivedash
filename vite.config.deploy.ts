import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages deployment
// Replace 'your-repo-name' with your actual repository name
export default defineConfig({
  plugins: [react()],
  base: '/ai-trading-dashboard/', // Change this to your repo name
})
