import { createApp } from 'vue'
import App from './App.vue'

// Import Forge web components - they auto-register
import '@nexcraft/forge'

const app = createApp(App)

app.mount('#app')