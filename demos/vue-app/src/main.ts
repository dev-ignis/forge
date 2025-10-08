import { createApp } from 'vue'
import App from './App.vue'

// Import Forge web components - they auto-register
import '@nexcraft/forge'

// Import AI manifest for real component discovery
// Note: These may not be available in published package, so we'll handle gracefully
let aiIndex = null
let aiManifest = null

try {
  // Try to import from the local development version first
  aiIndex = require('@nexcraft/forge/ai-index.json')
} catch (e) {
  console.warn('AI Index not available in published package, using fallback')
}

try {
  aiManifest = require('@nexcraft/forge/ai-manifest.json')
} catch (e) {
  console.warn('AI Manifest not available in published package, using fallback')
}

const app = createApp(App)

// Make AI data globally available
app.config.globalProperties.$aiIndex = aiIndex
app.config.globalProperties.$aiManifest = aiManifest

app.mount('#app')