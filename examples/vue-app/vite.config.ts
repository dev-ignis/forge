import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // Treat all tags with a dash as custom elements
        isCustomElement: (tag) => tag.includes('-')
      }
    }
  })],
  server: {
    port: 3001
  },
  optimizeDeps: {
    exclude: ['@nexcraft/forge'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  build: {
    target: 'es2020'
  }
})