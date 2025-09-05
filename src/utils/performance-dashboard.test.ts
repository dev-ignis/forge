/**
 * @fileoverview Tests for Performance Dashboard system
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { PerformanceDashboard, ForgePerformanceDashboard } from './performance-dashboard';
import { BaseElement } from '../core/BaseElement';
// import type { AIPerformanceMetrics } from '../core/ai-metadata.types';

// Mock component for testing
class MockForgeComponent extends BaseElement {
  static get styles() {
    return [];
  }

  protected render() {
    return html`<div>Mock Component</div>`;
  }

  // Expose protected methods for testing
  public setRenderTime(time: number) {
    this.renderTime = time;
    this.renderCount++;
  }

  public triggerPerformanceViolation() {
    this.emit('performance-violation', {
      timestamp: Date.now(),
      component: this.tagName.toLowerCase(),
      renderTime: this.renderTime,
      budget: this.maxRenderMs,
      violationCount: 1
    });
  }

  public triggerStateChange() {
    this.emit('ai-state-change', {
      key: 'performance.renderTime',
      value: this.renderTime,
      fullState: this.aiState
    });
  }
}

customElements.define('mock-forge-component', MockForgeComponent);

describe('PerformanceDashboard', () => {
  let dashboard: PerformanceDashboard;
  let mockComponent: MockForgeComponent;

  beforeEach(async () => {
    dashboard = new PerformanceDashboard();
    mockComponent = await fixture<MockForgeComponent>(html`
      <mock-forge-component max-render-ms="16"></mock-forge-component>
    `);
    // Set data-ready attribute to simulate component initialization
    mockComponent.setAttribute('data-ready', 'true');
  });

  afterEach(() => {
    dashboard.stopMonitoring();
  });

  describe('Component Registration', () => {
    it('should register components for monitoring', () => {
      dashboard.registerComponent(mockComponent);
      const metrics = dashboard.getAllMetrics();
      expect(Object.keys(metrics)).toContain('mock-forge-component');
    });

    it('should collect metrics from registered components', () => {
      mockComponent.setRenderTime(12.5);
      dashboard.registerComponent(mockComponent);
      
      const metrics = dashboard.getComponentMetrics('mock-forge-component');
      expect(metrics).toBeDefined();
      expect(metrics?.renderTime).toBe(12.5);
      expect(metrics?.renderCount).toBe(1);
    });
  });

  describe('Performance Violation Tracking', () => {
    it('should record performance violations', () => {
      dashboard.registerComponent(mockComponent);
      mockComponent.setRenderTime(25); // Exceeds 16ms budget
      mockComponent.triggerPerformanceViolation();
      
      const violations = dashboard.getViolations();
      expect(violations).toHaveLength(1);
      expect(violations[0].component).toBe('mock-forge-component');
      expect(violations[0].renderTime).toBe(25);
      expect(violations[0].budget).toBe(16);
    });

    it('should limit violation history to 100 entries', () => {
      dashboard.registerComponent(mockComponent);
      
      // Create 150 violations
      for (let i = 0; i < 150; i++) {
        mockComponent.triggerPerformanceViolation();
      }
      
      const violations = dashboard.getViolations();
      expect(violations.length).toBeLessThanOrEqual(100);
    });
  });

  describe('Metrics Collection', () => {
    it('should track slow components', () => {
      mockComponent.setRenderTime(20); // Slow component
      dashboard.registerComponent(mockComponent);
      
      const slowComponents = dashboard.getSlowComponents(16);
      expect(slowComponents).toContain('mock-forge-component');
    });

    it('should not include fast components in slow list', () => {
      mockComponent.setRenderTime(8); // Fast component
      dashboard.registerComponent(mockComponent);
      
      const slowComponents = dashboard.getSlowComponents(16);
      expect(slowComponents).not.toContain('mock-forge-component');
    });

    it('should generate component summaries', async () => {
      dashboard.registerComponent(mockComponent);
      
      // Simulate some renders with different times
      mockComponent.setRenderTime(10);
      mockComponent.triggerStateChange();
      
      mockComponent.setRenderTime(15);
      mockComponent.triggerStateChange();
      
      // Wait for metrics collection
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const summaries = dashboard.getComponentSummaries();
      expect(summaries.length).toBeGreaterThan(0);
      
      const mockSummary = summaries.find(s => s.name === 'mock-forge-component');
      expect(mockSummary).toBeDefined();
      expect(mockSummary?.totalRenders).toBeGreaterThan(0);
    });
  });

  describe('Real-time Updates', () => {
    it('should notify subscribers of metrics updates', async () => {
      const mockListener = vi.fn();
      const unsubscribe = dashboard.subscribe(mockListener);
      
      dashboard.registerComponent(mockComponent);
      mockComponent.setRenderTime(12);
      mockComponent.triggerStateChange();
      
      // Wait for update
      await new Promise(resolve => setTimeout(resolve, 150));
      
      expect(mockListener).toHaveBeenCalled();
      const lastCall = mockListener.mock.calls[mockListener.mock.calls.length - 1];
      expect(lastCall[0]).toHaveProperty('mock-forge-component');
      
      unsubscribe();
    });

    it('should allow unsubscribing from updates', () => {
      const mockListener = vi.fn();
      const unsubscribe = dashboard.subscribe(mockListener);
      
      unsubscribe();
      dashboard.registerComponent(mockComponent);
      
      expect(mockListener).not.toHaveBeenCalled();
    });
  });

  describe('History Management', () => {
    it('should maintain metrics history', async () => {
      dashboard.registerComponent(mockComponent);
      mockComponent.setRenderTime(10);
      mockComponent.triggerStateChange();
      
      // Wait for collection
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const history = dashboard.getMetricsHistory();
      expect(history.length).toBeGreaterThan(0);
      
      const entry = history.find(h => h.component === 'mock-forge-component');
      expect(entry).toBeDefined();
      expect(entry?.renderTime).toBe(10);
    });

    it('should filter history by component', async () => {
      dashboard.registerComponent(mockComponent);
      mockComponent.triggerStateChange();
      
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const componentHistory = dashboard.getMetricsHistory(undefined, 'mock-forge-component');
      expect(componentHistory.every(h => h.component === 'mock-forge-component')).toBe(true);
    });

    it('should filter history by timestamp', async () => {
      dashboard.registerComponent(mockComponent);
      const startTime = Date.now();
      
      mockComponent.triggerStateChange();
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const recentHistory = dashboard.getMetricsHistory(startTime);
      expect(recentHistory.every(h => h.timestamp >= startTime)).toBe(true);
    });
  });
});

describe('ForgePerformanceDashboard Component', () => {
  let dashboardElement: ForgePerformanceDashboard;
  let mockComponent: MockForgeComponent;

  beforeEach(async () => {
    mockComponent = await fixture<MockForgeComponent>(html`
      <mock-forge-component max-render-ms="16"></mock-forge-component>
    `);
    mockComponent.setAttribute('data-ready', 'true');

    dashboardElement = await fixture<ForgePerformanceDashboard>(html`
      <forge-performance-dashboard auto-refresh="false"></forge-performance-dashboard>
    `);
  });

  afterEach(() => {
    dashboardElement.remove();
  });

  describe('Rendering', () => {
    it('should render dashboard header', () => {
      const header = dashboardElement.shadowRoot?.querySelector('.dashboard-header');
      expect(header).toBeDefined();
      
      const title = dashboardElement.shadowRoot?.querySelector('.dashboard-title');
      expect(title?.textContent).toBe('Performance Dashboard');
    });

    it('should show no data message when no components', () => {
      const noData = dashboardElement.shadowRoot?.querySelector('.no-data');
      expect(noData).toBeDefined();
      expect(noData?.textContent).toContain('No Forge components detected');
    });

    it('should render metric cards when components are present', async () => {
      // Register a component with the dashboard
      const performanceDashboard = (dashboardElement as any).dashboard;
      mockComponent.setRenderTime(12);
      performanceDashboard.registerComponent(mockComponent);
      
      // Trigger manual update
      (dashboardElement as any).updateData();
      await dashboardElement.updateComplete;
      
      const metricsGrid = dashboardElement.shadowRoot?.querySelector('.metrics-grid');
      expect(metricsGrid).toBeDefined();
    });
  });

  describe('Auto-refresh', () => {
    it('should start auto-refresh when enabled', async () => {
      dashboardElement.autoRefresh = true;
      dashboardElement.refreshInterval = 100;
      
      await dashboardElement.updateComplete;
      
      // Auto-refresh should be running
      expect((dashboardElement as any).refreshTimer).toBeDefined();
    });

    it('should stop auto-refresh when disabled', async () => {
      dashboardElement.autoRefresh = true;
      await dashboardElement.updateComplete;
      
      dashboardElement.autoRefresh = false;
      await dashboardElement.updateComplete;
      
      // Auto-refresh should be stopped
      expect((dashboardElement as any).refreshTimer).toBeUndefined();
    });
  });

  describe('Violation Display', () => {
    it('should show violations section when violations exist', async () => {
      dashboardElement.showViolations = true;
      
      // Add a violation
      const performanceDashboard = (dashboardElement as any).dashboard;
      performanceDashboard.registerComponent(mockComponent);
      mockComponent.setRenderTime(25);
      mockComponent.triggerPerformanceViolation();
      
      // Update dashboard
      (dashboardElement as any).updateData();
      await dashboardElement.updateComplete;
      
      const violationsSection = dashboardElement.shadowRoot?.querySelector('.violations-section');
      expect(violationsSection).toBeDefined();
    });

    it('should hide violations when showViolations is false', async () => {
      dashboardElement.showViolations = false;
      await dashboardElement.updateComplete;
      
      const violationsSection = dashboardElement.shadowRoot?.querySelector('.violations-section');
      expect(violationsSection).toBeNull();
    });
  });

  describe('Health Indicators', () => {
    it('should show excellent health for fast components', async () => {
      // Create a fresh dashboard for isolated testing
      const freshDashboard = new PerformanceDashboard();
      const freshComponent = await fixture<MockForgeComponent>(html`
        <mock-forge-component max-render-ms="16"></mock-forge-component>
      `);
      freshComponent.setAttribute('data-ready', 'true');
      
      freshComponent.setRenderTime(5); // <= 8ms should be excellent
      freshDashboard.registerComponent(freshComponent);
      freshComponent.triggerStateChange();
      
      // Wait for metrics collection
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const summaries = freshDashboard.getComponentSummaries();
      const mockSummary = summaries.find((s: any) => s.name === 'mock-forge-component');
      expect(mockSummary).toBeDefined();
      expect(mockSummary?.health).toBe('excellent');
      
      freshDashboard.stopMonitoring();
    });

    it('should show good health for moderately fast components', async () => {
      // Create a fresh dashboard for isolated testing
      const freshDashboard = new PerformanceDashboard();
      const freshComponent = await fixture<MockForgeComponent>(html`
        <mock-forge-component max-render-ms="16"></mock-forge-component>
      `);
      freshComponent.setAttribute('data-ready', 'true');
      
      freshComponent.setRenderTime(12); // > 8ms and <= 16ms should be good
      freshDashboard.registerComponent(freshComponent);
      freshComponent.triggerStateChange();
      
      // Wait for metrics collection
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const summaries = freshDashboard.getComponentSummaries();
      const mockSummary = summaries.find((s: any) => s.name === 'mock-forge-component');
      expect(mockSummary).toBeDefined();
      expect(mockSummary?.health).toBe('good');
      
      freshDashboard.stopMonitoring();
    });

    it('should show warning health for slow components', async () => {
      // Create a fresh dashboard for isolated testing
      const freshDashboard = new PerformanceDashboard();
      const freshComponent = await fixture<MockForgeComponent>(html`
        <mock-forge-component max-render-ms="16"></mock-forge-component>
      `);
      freshComponent.setAttribute('data-ready', 'true');
      
      freshComponent.setRenderTime(25); // > 16ms and <= 32ms should be warning
      freshDashboard.registerComponent(freshComponent);
      freshComponent.triggerStateChange();
      
      // Wait for metrics collection
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const summaries = freshDashboard.getComponentSummaries();
      const mockSummary = summaries.find((s: any) => s.name === 'mock-forge-component');
      expect(mockSummary).toBeDefined();
      expect(mockSummary?.health).toBe('warning');
      
      freshDashboard.stopMonitoring();
    });
  });

  describe('Utility Methods', () => {
    it('should format time correctly', () => {
      const formatTime = (dashboardElement as any).formatTime;
      expect(formatTime(12.345)).toBe('12.35ms');
      expect(formatTime(0.1)).toBe('0.10ms');
    });

    it('should format timestamps correctly', () => {
      const formatTimestamp = (dashboardElement as any).formatTimestamp;
      const testTime = new Date('2023-01-01T12:00:00').getTime();
      const formatted = formatTimestamp(testTime);
      expect(formatted).toMatch(/\d{1,2}:\d{2}:\d{2}/);
    });
  });
});