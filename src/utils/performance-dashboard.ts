/**
 * @fileoverview Performance Dashboard - Real-time metrics display and monitoring
 * 
 * Critical for developer experience and completing the performance monitoring story
 */

import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseElement } from '../core/BaseElement';
import type { AIPerformanceMetrics } from '../core/ai-metadata.types';

export interface PerformanceMetricsHistory {
  timestamp: number;
  component: string;
  renderTime: number;
  renderCount: number;
  violations: number;
  mode: 'auto' | 'fast' | 'balanced' | 'quality';
}

export interface PerformanceViolation {
  timestamp: number;
  component: string;
  renderTime: number;
  budget: number;
  violationCount: number;
}

export interface ComponentMetricsSummary {
  name: string;
  averageRenderTime: number;
  maxRenderTime: number;
  totalRenders: number;
  violations: number;
  currentMode: string;
  health: 'excellent' | 'good' | 'warning' | 'critical';
}

/**
 * Global Performance Dashboard singleton for monitoring all Forge components
 */
export class PerformanceDashboard {
  private components: Map<string, BaseElement> = new Map();
  private metricsHistory: PerformanceMetricsHistory[] = [];
  private violations: PerformanceViolation[] = [];
  private updateListeners: Set<(metrics: Record<string, AIPerformanceMetrics>) => void> = new Set();
  private isMonitoring = false;
  private monitoringInterval?: number;

  constructor() {
    this.startAutoDiscovery();
  }

  /**
   * Automatically discover and register Forge components
   */
  private startAutoDiscovery(): void {
    // Watch for new Forge components being added to the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            this.scanForForgeComponents(element);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial scan
    this.scanForForgeComponents(document.body);
  }

  private scanForForgeComponents(root: Element): void {
    const forgeComponents = root.querySelectorAll('[data-ready="true"]');
    forgeComponents.forEach((element) => {
      if (element.tagName.startsWith('FORGE-') && element instanceof BaseElement) {
        this.registerComponent(element);
      }
    });
  }

  /**
   * Register a component for monitoring
   */
  registerComponent(component: BaseElement): void {
    const componentName = component.tagName.toLowerCase();
    this.components.set(componentName + '_' + Date.now(), component);
    
    // Listen for performance events
    component.addEventListener('performance-violation', (e) => {
      const customEvent = e as CustomEvent<PerformanceViolation>;
      this.recordViolation(customEvent.detail);
    });
    
    component.addEventListener('ai-state-change', (e) => {
      const customEvent = e as CustomEvent<{ key: string }>;
      if (customEvent.detail.key.startsWith('performance')) {
        this.updateMetrics(component);
      }
    });

    if (!this.isMonitoring) {
      this.startMonitoring();
    }
  }

  private startMonitoring(): void {
    this.isMonitoring = true;
    
    // Collect metrics every 100ms for real-time updates
    this.monitoringInterval = setInterval(() => {
      this.collectMetrics();
    }, 100) as unknown as number;
  }

  private collectMetrics(): void {
    const currentMetrics: Record<string, AIPerformanceMetrics> = {};
    
    this.components.forEach((component, _key) => {
      const componentName = component.tagName.toLowerCase();
      const metrics = component.aiState.performance;
      
      if (metrics) {
        currentMetrics[componentName] = metrics;
        
        // Record in history
        this.metricsHistory.push({
          timestamp: Date.now(),
          component: componentName,
          renderTime: metrics.renderTime,
          renderCount: metrics.renderCount,
          violations: metrics.violations,
          mode: metrics.mode
        });
      }
    });

    // Keep history manageable (last 1000 entries)
    if (this.metricsHistory.length > 1000) {
      this.metricsHistory = this.metricsHistory.slice(-1000);
    }

    // Notify listeners
    this.updateListeners.forEach(listener => listener(currentMetrics));
  }

  private updateMetrics(_component: BaseElement): void {
    // Trigger immediate metrics collection for this component
    this.collectMetrics();
  }

  private recordViolation(violation: PerformanceViolation): void {
    this.violations.push({
      ...violation,
      timestamp: Date.now()
    });
    
    // Keep last 100 violations
    if (this.violations.length > 100) {
      this.violations = this.violations.slice(-100);
    }
  }

  /**
   * Get current metrics for all components
   */
  getAllMetrics(): Record<string, AIPerformanceMetrics> {
    const metrics: Record<string, AIPerformanceMetrics> = {};
    
    this.components.forEach((component, _key) => {
      const componentName = component.tagName.toLowerCase();
      const componentMetrics = component.aiState.performance;
      if (componentMetrics) {
        metrics[componentName] = componentMetrics;
      }
    });
    
    return metrics;
  }

  /**
   * Get metrics for a specific component type
   */
  getComponentMetrics(componentName: string): AIPerformanceMetrics | null {
    const component = Array.from(this.components.values())
      .find(c => c.tagName.toLowerCase() === componentName.toLowerCase());
    return component?.aiState.performance || null;
  }

  /**
   * Get components that are performing slowly
   */
  getSlowComponents(threshold: number = 16): string[] {
    return Array.from(this.components.entries())
      .filter(([, component]) => 
        (component.aiState.performance?.renderTime || 0) > threshold
      )
      .map(([, component]) => component.tagName.toLowerCase());
  }

  /**
   * Get performance violations
   */
  getViolations(limit: number = 50): PerformanceViolation[] {
    return this.violations.slice(-limit);
  }

  /**
   * Get metrics history for a time range
   */
  getMetricsHistory(fromTimestamp?: number, componentName?: string): PerformanceMetricsHistory[] {
    let filtered = this.metricsHistory;
    
    if (fromTimestamp) {
      filtered = filtered.filter(m => m.timestamp >= fromTimestamp);
    }
    
    if (componentName) {
      filtered = filtered.filter(m => m.component === componentName);
    }
    
    return filtered;
  }

  /**
   * Get summary of component performance
   */
  getComponentSummaries(): ComponentMetricsSummary[] {
    const summaries: Map<string, {
      renderTimes: number[];
      totalRenders: number;
      violations: number;
      currentMode: string;
    }> = new Map();

    // Aggregate data from history
    this.metricsHistory.forEach(entry => {
      if (!summaries.has(entry.component)) {
        summaries.set(entry.component, {
          renderTimes: [],
          totalRenders: 0,
          violations: 0,
          currentMode: entry.mode
        });
      }
      
      const summary = summaries.get(entry.component)!;
      summary.renderTimes.push(entry.renderTime);
      summary.totalRenders = Math.max(summary.totalRenders, entry.renderCount);
      summary.violations = Math.max(summary.violations, entry.violations);
      summary.currentMode = entry.mode; // Latest mode
    });

    // Convert to ComponentMetricsSummary array
    return Array.from(summaries.entries()).map(([name, data]) => {
      const averageRenderTime = data.renderTimes.reduce((a, b) => a + b, 0) / data.renderTimes.length;
      const maxRenderTime = Math.max(...data.renderTimes);
      
      let health: ComponentMetricsSummary['health'] = 'excellent';
      if (averageRenderTime > 32) health = 'critical';
      else if (averageRenderTime > 16) health = 'warning';
      else if (averageRenderTime > 8) health = 'good';

      return {
        name,
        averageRenderTime,
        maxRenderTime,
        totalRenders: data.totalRenders,
        violations: data.violations,
        currentMode: data.currentMode,
        health
      };
    });
  }

  /**
   * Subscribe to real-time metrics updates
   */
  subscribe(listener: (metrics: Record<string, AIPerformanceMetrics>) => void): () => void {
    this.updateListeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.updateListeners.delete(listener);
    };
  }

  /**
   * Stop monitoring (cleanup)
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
    }
    this.isMonitoring = false;
  }
}

/**
 * Visual Performance Dashboard Component
 */
@customElement('forge-performance-dashboard')
export class ForgePerformanceDashboard extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
      font-size: 14px;
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 16px;
      max-height: 600px;
      overflow-y: auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #e9ecef;
    }

    .dashboard-title {
      font-size: 18px;
      font-weight: 600;
      color: #212529;
      margin: 0;
    }

    .refresh-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #6c757d;
      font-size: 12px;
    }

    .refresh-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #28a745;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .metric-card {
      background: white;
      border: 1px solid #e9ecef;
      border-radius: 6px;
      padding: 16px;
    }

    .metric-card.excellent { border-left: 4px solid #28a745; }
    .metric-card.good { border-left: 4px solid #17a2b8; }
    .metric-card.warning { border-left: 4px solid #ffc107; }
    .metric-card.critical { border-left: 4px solid #dc3545; }

    .metric-card h3 {
      font-size: 16px;
      font-weight: 500;
      margin: 0 0 12px 0;
      color: #495057;
    }

    .metric-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .metric-row:last-child {
      margin-bottom: 0;
    }

    .metric-label {
      color: #6c757d;
      font-size: 12px;
    }

    .metric-value {
      font-weight: 500;
      color: #212529;
    }

    .performance-mode {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .mode-auto { background: #e3f2fd; color: #1976d2; }
    .mode-fast { background: #fff3e0; color: #f57c00; }
    .mode-balanced { background: #f3e5f5; color: #7b1fa2; }
    .mode-quality { background: #e8f5e8; color: #388e3c; }

    .violations-section {
      background: white;
      border: 1px solid #e9ecef;
      border-radius: 6px;
      padding: 16px;
      margin-top: 16px;
    }

    .violations-header {
      font-size: 16px;
      font-weight: 500;
      margin: 0 0 12px 0;
      color: #495057;
    }

    .violation-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #f8f9fa;
    }

    .violation-item:last-child {
      border-bottom: none;
    }

    .violation-component {
      font-weight: 500;
      color: #dc3545;
    }

    .violation-time {
      color: #6c757d;
      font-size: 12px;
    }

    .no-data {
      text-align: center;
      color: #6c757d;
      padding: 24px;
      font-style: italic;
    }
  `;

  @property({ type: Boolean, attribute: 'auto-refresh' }) autoRefresh = true;
  @property({ type: Number, attribute: 'refresh-interval' }) refreshInterval = 1000;
  @property({ type: Boolean, attribute: 'show-violations' }) showViolations = true;

  @state() private metrics: Record<string, AIPerformanceMetrics> = {};
  @state() private summaries: ComponentMetricsSummary[] = [];
  @state() private violations: PerformanceViolation[] = [];
  @state() private lastUpdated = Date.now();

  private dashboard: PerformanceDashboard;
  private unsubscribe?: () => void;
  private refreshTimer?: number;

  constructor() {
    super();
    this.dashboard = performanceDashboard;
  }

  connectedCallback(): void {
    super.connectedCallback();
    
    if (this.autoRefresh) {
      this.startAutoRefresh();
    }
    
    // Subscribe to real-time updates
    this.unsubscribe = this.dashboard.subscribe((metrics) => {
      this.metrics = metrics;
      this.lastUpdated = Date.now();
      this.requestUpdate();
    });

    this.updateData();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopAutoRefresh();
    this.unsubscribe?.();
  }

  private startAutoRefresh(): void {
    this.refreshTimer = setInterval(() => {
      this.updateData();
    }, this.refreshInterval) as unknown as number;
  }

  private stopAutoRefresh(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = undefined;
    }
  }

  private updateData(): void {
    this.metrics = this.dashboard.getAllMetrics();
    this.summaries = this.dashboard.getComponentSummaries();
    this.violations = this.dashboard.getViolations(10);
    this.lastUpdated = Date.now();
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('autoRefresh')) {
      if (this.autoRefresh) {
        this.startAutoRefresh();
      } else {
        this.stopAutoRefresh();
      }
    }
  }

  private formatTime(ms: number): string {
    return `${ms.toFixed(2)}ms`;
  }

  private formatTimestamp(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString();
  }

  render() {
    const hasSummaries = this.summaries.length > 0;
    const hasViolations = this.violations.length > 0;

    return html`
      <div class="dashboard-header">
        <h2 class="dashboard-title">Performance Dashboard</h2>
        <div class="refresh-indicator">
          <div class="refresh-dot"></div>
          <span>Last updated: ${this.formatTimestamp(this.lastUpdated)}</span>
        </div>
      </div>

      ${hasSummaries ? html`
        <div class="metrics-grid">
          ${this.summaries.map(summary => html`
            <div class="metric-card ${summary.health}">
              <h3>${summary.name}</h3>
              <div class="metric-row">
                <span class="metric-label">Average Render</span>
                <span class="metric-value">${this.formatTime(summary.averageRenderTime)}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Max Render</span>
                <span class="metric-value">${this.formatTime(summary.maxRenderTime)}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Total Renders</span>
                <span class="metric-value">${summary.totalRenders}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Violations</span>
                <span class="metric-value">${summary.violations}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Mode</span>
                <span class="performance-mode mode-${summary.currentMode}">${summary.currentMode}</span>
              </div>
            </div>
          `)}
        </div>
      ` : html`
        <div class="no-data">
          No Forge components detected. Performance monitoring will start automatically when components are added to the page.
        </div>
      `}

      ${this.showViolations && hasViolations ? html`
        <div class="violations-section">
          <h3 class="violations-header">Recent Violations</h3>
          ${this.violations.map(violation => html`
            <div class="violation-item">
              <div>
                <span class="violation-component">${violation.component}</span>
                <span class="metric-value">${this.formatTime(violation.renderTime)} > ${this.formatTime(violation.budget)}</span>
              </div>
              <span class="violation-time">${this.formatTimestamp(violation.timestamp)}</span>
            </div>
          `)}
        </div>
      ` : ''}
    `;
  }
}

// Global instance
export const performanceDashboard = new PerformanceDashboard();

// Auto-start monitoring in development
declare const process: any;
if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
  // Development mode initialization
  void performanceDashboard;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-performance-dashboard': ForgePerformanceDashboard;
  }
}