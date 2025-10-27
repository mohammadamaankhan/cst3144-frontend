import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// Vite config for Vue 2.7 with Composition API support
export default defineConfig({
  plugins: [createVuePlugin()],
  // Base path for GitHub Pages deployment
  base: '/cst3144-frontend/',
})
