<template>
  <div class="app">
    <!-- AI-Native Status Bar -->
    <header class="ai-status-bar">
      <div class="status-item">
        <span class="label">🤖 AI State:</span>
        <span class="value">{{ aiStatus }}</span>
      </div>
      <div class="status-item">
        <span class="label">⚡ Performance:</span>
        <span class="value">{{ performanceStatus }}</span>
      </div>
      <div class="status-item">
        <span class="label">🎨 Theme:</span>
        <span class="value">{{ currentTheme }}</span>
      </div>
    </header>

    <!-- Main Hero Section -->
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">
          🚀 AI-Native Forge Components
          <span class="subtitle">in Vue 3</span>
        </h1>
        <p class="hero-description">
          Experience the future of UI components with built-in AI intelligence, 
          performance monitoring, and seamless Vue integration.
        </p>
        
        <!-- Interactive Demo Controls -->
        <div class="demo-controls">
          <forge-button 
            ref="primaryButton"
            variant="primary" 
            size="lg"
            @click="exploreAIFeatures"
            class="cta-button"
          >
            🤖 Explore AI Features
          </forge-button>
          
          <forge-button 
            variant="secondary" 
            size="lg"
            @click="toggleTheme"
            class="theme-button"
          >
            🎨 Toggle Theme
          </forge-button>
        </div>
      </div>
    </section>

    <!-- AI Intelligence Showcase -->
    <section class="ai-showcase">
      <div class="container">
        <h2>🧠 AI Intelligence Showcase</h2>
        
        <div class="showcase-grid">
          <!-- AI State Explanation -->
          <div class="showcase-card">
            <h3>🤖 AI State Explanation</h3>
            <forge-card variant="elevated" class="ai-card">
              <div class="ai-explanation">
                <pre>{{ aiExplanation }}</pre>
              </div>
              <forge-button 
                @click="getAIExplanation" 
                variant="outline"
                size="sm"
              >
                Refresh AI State
              </forge-button>
            </forge-card>
          </div>

          <!-- Performance Monitoring -->
          <div class="showcase-card">
            <h3>⚡ Performance Monitoring</h3>
            <forge-card variant="elevated" class="performance-card">
              <div class="performance-metrics">
                <div class="metric">
                  <span class="metric-label">Render Time:</span>
                  <span class="metric-value">{{ renderTime }}ms</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Components:</span>
                  <span class="metric-value">{{ componentCount }}</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Memory:</span>
                  <span class="metric-value">{{ memoryUsage }}MB</span>
                </div>
              </div>
            </forge-card>
          </div>

          <!-- Possible Actions -->
          <div class="showcase-card">
            <h3>🎯 Possible Actions</h3>
            <forge-card variant="elevated" class="actions-card">
              <div class="actions-list">
                <div 
                  v-for="action in possibleActions" 
                  :key="action.name"
                  class="action-item"
                >
                  <span class="action-name">{{ action.name }}</span>
                  <span :class="['action-status', action.available ? 'available' : 'disabled']">
                    {{ action.available ? '✅ Available' : '❌ Disabled' }}
                  </span>
                </div>
              </div>
            </forge-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Components Demo -->
    <section class="components-demo">
      <div class="container">
        <h2>🎨 Interactive Components</h2>
        
        <div class="demo-grid">
          <!-- Form Demo -->
          <div class="demo-section">
            <h3>📝 Smart Forms</h3>
            <forge-card class="demo-card">
              <forge-input
                ref="smartInput"
                v-model="formData.name"
                placeholder="Enter your name..."
                label="Smart Input"
                :required="true"
                @input="onInputChange"
              />
              
              <forge-select
                ref="smartSelect"
                v-model="formData.country"
                :options="countryOptions"
                placeholder="Select country..."
                label="Smart Select"
                @change="onSelectChange"
              />
              
              <forge-checkbox
                ref="smartCheckbox"
                v-model="formData.newsletter"
                label="Subscribe to AI updates"
                @change="onCheckboxChange"
              />
              
              <div class="form-state">
                <h4>Form AI State:</h4>
                <pre>{{ formAIState }}</pre>
              </div>
            </forge-card>
          </div>

          <!-- UI Components Demo -->
          <div class="demo-section">
            <h3>🎛️ UI Components</h3>
            <forge-card class="demo-card">
              <div class="component-row">
                <forge-alert 
                  ref="smartAlert"
                  :severity="alertSeverity" 
                  :dismissible="true"
                  @dismiss="onAlertDismiss"
                >
                  {{ alertMessage }}
                </forge-alert>
              </div>
              
              <div class="component-row">
                <forge-button 
                  v-for="variant in buttonVariants"
                  :key="variant"
                  :variant="variant"
                  @click="triggerAlert(variant)"
                  class="demo-button"
                >
                  {{ variant }} Alert
                </forge-button>
              </div>
              
              <div class="component-row">
                <forge-modal
                  ref="smartModal"
                  v-model:open="modalOpen"
                  title="🤖 AI Component Analysis"
                  @open="onModalOpen"
                  @close="onModalClose"
                >
                  <div class="modal-content">
                    <h4>Component Intelligence Report</h4>
                    <pre>{{ modalAIReport }}</pre>
                  </div>
                </forge-modal>
                
                <forge-button @click="openModal" variant="primary">
                  🤖 View AI Analysis
                </forge-button>
              </div>
            </forge-card>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Debugging Console -->
    <section class="ai-console">
      <div class="container">
        <h2>🔍 AI Debugging Console</h2>
        <forge-card variant="elevated" class="console-card">
          <div class="console-header">
            <h3>Live AI State Monitor</h3>
            <forge-button @click="refreshConsole" variant="outline" size="sm">
              🔄 Refresh
            </forge-button>
          </div>
          <div class="console-content">
            <pre>{{ consoleOutput }}</pre>
          </div>
        </forge-card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'

// Vue 3 Composition API with Forge web components
const currentTheme = ref('light')
const primaryButton = ref<HTMLElement>()
const smartInput = ref<HTMLElement>()
const smartSelect = ref<HTMLElement>()
const smartCheckbox = ref<HTMLElement>()
const smartAlert = ref<HTMLElement>()
const smartModal = ref<HTMLElement>()

// Theme toggle function
function toggleTheme() {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', currentTheme.value)
}

// Reactive state
const aiStatus = ref('🟢 Active')
const performanceStatus = ref('🟢 Optimal')
const renderTime = ref(0.8)
const componentCount = ref(12)
const memoryUsage = ref(2.4)
const aiExplanation = ref('Loading AI analysis...')
const consoleOutput = ref('🤖 AI Console initialized...\n')
const modalOpen = ref(false)
const modalAIReport = ref('')

// Form data
const formData = reactive({
  name: '',
  country: '',
  newsletter: false
})

// Component options
const countryOptions = [
  { value: 'us', label: 'United States 🇺🇸' },
  { value: 'uk', label: 'United Kingdom 🇬🇧' },
  { value: 'ca', label: 'Canada 🇨🇦' },
  { value: 'de', label: 'Germany 🇩🇪' },
  { value: 'fr', label: 'France 🇫🇷' }
]

const buttonVariants = ['primary', 'secondary', 'success', 'warning', 'error']
const alertSeverity = ref('info')
const alertMessage = ref('🤖 Welcome to AI-Native Forge Components!')

// Computed properties
const possibleActions = computed(() => [
  { name: 'click', available: true, description: 'Trigger button action' },
  { name: 'focus', available: true, description: 'Focus input element' },
  { name: 'validate', available: formData.name.length > 0, description: 'Validate form data' },
  { name: 'submit', available: formData.name && formData.country, description: 'Submit form' }
])

const formAIState = computed(() => {
  return JSON.stringify({
    completeness: `${Math.round(((formData.name ? 1 : 0) + (formData.country ? 1 : 0) + (formData.newsletter ? 1 : 0)) / 3 * 100)}%`,
    validation: formData.name.length >= 2 ? 'valid' : 'incomplete',
    engagement: formData.newsletter ? 'high' : 'standard',
    aiRecommendation: !formData.country ? 'Suggest completing country selection' : 'Form ready for submission'
  }, null, 2)
})

// AI-native methods
async function exploreAIFeatures() {
  consoleOutput.value += '🚀 Exploring AI features...\n'
  
  // Demonstrate AI capabilities
  if (primaryButton.value) {
    try {
      // These would be the AI methods if they were implemented
      const state = (primaryButton.value as any).aiState || { variant: 'primary', active: true }
      const explanation = `Button state: ${JSON.stringify(state)}`
      
      consoleOutput.value += `🤖 AI State: ${explanation}\n`
      aiExplanation.value = explanation
      
      // Simulate performance metrics
      renderTime.value = Math.round((Math.random() * 2 + 0.5) * 100) / 100
      memoryUsage.value = Math.round((Math.random() * 1 + 2) * 100) / 100
      
    } catch (error) {
      consoleOutput.value += `❌ AI feature simulation: ${error}\n`
    }
  }
}

async function getAIExplanation() {
  consoleOutput.value += '🧠 Generating AI explanation...\n'
  
  // Simulate AI explanation generation
  const components = ['button', 'input', 'select', 'checkbox', 'alert', 'card', 'modal']
  const currentComponent = components[Math.floor(Math.random() * components.length)]
  
  aiExplanation.value = `AI Analysis for ${currentComponent}:
- State: Active and interactive
- Performance: Optimized (${renderTime.value}ms render)
- Accessibility: WCAG 2.1 AA compliant
- Integration: Vue 3 Composition API ready
- Theme: ${currentTheme.value} mode active
- Actions: ${possibleActions.value.length} available`

  consoleOutput.value += `✅ AI explanation updated for ${currentComponent}\n`
}

function onInputChange(event: Event) {
  const target = event.target as HTMLInputElement
  consoleOutput.value += `📝 Input changed: "${target.value}"\n`
}

function onSelectChange(event: Event) {
  const target = event.target as HTMLSelectElement
  consoleOutput.value += `🎯 Selection changed: "${target.value}"\n`
}

function onCheckboxChange(event: Event) {
  const target = event.target as HTMLInputElement
  consoleOutput.value += `☑️ Checkbox ${target.checked ? 'checked' : 'unchecked'}\n`
}

function triggerAlert(variant: string) {
  alertSeverity.value = variant === 'error' ? 'error' : variant === 'warning' ? 'warning' : variant === 'success' ? 'success' : 'info'
  alertMessage.value = `🎨 ${variant.charAt(0).toUpperCase() + variant.slice(1)} alert triggered!`
  consoleOutput.value += `🚨 Alert triggered: ${variant}\n`
}

function onAlertDismiss() {
  consoleOutput.value += '❌ Alert dismissed by user\n'
}

function openModal() {
  modalOpen.value = true
}

function onModalOpen() {
  modalAIReport.value = `🤖 Component Intelligence Report
Generated: ${new Date().toLocaleTimeString()}

Active Components: ${componentCount.value}
Performance Score: ${Math.round((3 - renderTime.value) * 40)}%
Memory Efficiency: ${Math.round((5 - memoryUsage.value) * 20)}%
Theme Compatibility: 100%
AI Features: Fully Enabled

Recommendations:
• Form completion at ${JSON.parse(formAIState.value).completeness}
• ${possibleActions.value.filter(a => a.available).length} actions available
• Performance within optimal range`

  consoleOutput.value += '🔍 Modal opened - AI report generated\n'
}

function onModalClose() {
  consoleOutput.value += '🔒 Modal closed\n'
}

function refreshConsole() {
  consoleOutput.value = '🔄 Console refreshed\n'
  componentCount.value = document.querySelectorAll('[data-forge-component]').length || 12
  getAIExplanation()
}

// Initialize on mount
onMounted(() => {
  consoleOutput.value += '🎉 Vue 3 + Forge app initialized\n'
  consoleOutput.value += `📊 Theme: ${currentTheme.value}\n`
  consoleOutput.value += `⚡ Performance monitoring active\n`
  
  // Initial AI explanation
  getAIExplanation()
  
  // Simulate real-time updates
  setInterval(() => {
    if (Math.random() > 0.8) {
      renderTime.value = Math.round((Math.random() * 2 + 0.5) * 100) / 100
    }
  }, 3000)
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.ai-status-bar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label {
  font-weight: 600;
  opacity: 0.9;
}

.value {
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  display: block;
  font-size: 2rem;
  font-weight: 400;
  margin-top: 0.5rem;
  opacity: 0.8;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.demo-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button, .theme-button {
  font-size: 1.1rem !important;
  padding: 1rem 2rem !important;
  border-radius: 0.75rem !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
}

.ai-showcase, .components-demo, .ai-console {
  padding: 4rem 0;
}

.ai-showcase {
  background: rgba(0, 0, 0, 0.1);
}

.components-demo {
  background: rgba(255, 255, 255, 0.05);
}

.ai-console {
  background: rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
}

h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.showcase-grid, .demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.showcase-card, .demo-section {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.ai-card, .performance-card, .actions-card, .demo-card {
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.95) !important;
  color: #1f2937 !important;
  border-radius: 0.75rem !important;
  padding: 1.5rem !important;
}

.ai-explanation, .console-content {
  background: #1f2937;
  color: #10b981;
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
}

.performance-metrics {
  display: grid;
  gap: 1rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f3f4f6;
  border-radius: 0.5rem;
}

.metric-label {
  font-weight: 600;
  color: #374151;
}

.metric-value {
  font-weight: 700;
  color: #059669;
}

.actions-list {
  display: grid;
  gap: 0.75rem;
}

.action-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border-left: 4px solid #d1d5db;
}

.action-name {
  font-weight: 600;
  color: #374151;
}

.action-status.available {
  color: #059669;
  font-weight: 600;
}

.action-status.disabled {
  color: #9ca3af;
  font-weight: 500;
}

.component-row {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.demo-button {
  margin: 0.25rem !important;
}

.form-state {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
}

.form-state h4 {
  margin-bottom: 0.5rem;
  color: #475569;
}

.form-state pre {
  background: #1e293b;
  color: #06b6d4;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  overflow-x: auto;
}

.console-card {
  background: rgba(255, 255, 255, 0.95) !important;
  color: #1f2937 !important;
}

.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.console-header h3 {
  margin: 0;
  color: #1f2937;
}

.console-content {
  max-height: 300px;
  font-size: 0.875rem;
}

.modal-content {
  color: #1f2937;
}

.modal-content h4 {
  margin-bottom: 1rem;
  color: #374151;
}

.modal-content pre {
  background: #f3f4f6;
  color: #1f2937;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.5rem;
  }
  
  .ai-status-bar {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .demo-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .showcase-grid, .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>