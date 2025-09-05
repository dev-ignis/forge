/**
 * @fileoverview Performance Dashboard Usage Examples
 * 
 * This file demonstrates how to use the Performance Dashboard to monitor
 * Forge component performance in real-time.
 */

import { performanceDashboard, type ComponentMetricsSummary } from '../src/utils/performance-dashboard';

// Example 1: Basic Performance Dashboard Integration
export function basicDashboardExample() {
  console.log('=== Basic Performance Dashboard Example ===');
  
  // The dashboard automatically discovers and monitors Forge components
  // Just add components to the DOM and they'll be monitored
  
  document.body.innerHTML = `
    <div id="dashboard-demo">
      <h2>Performance Monitoring Demo</h2>
      
      <!-- Performance Dashboard Component -->
      <forge-performance-dashboard 
        auto-refresh="true" 
        refresh-interval="1000"
        show-violations="true">
      </forge-performance-dashboard>
      
      <!-- Sample components to monitor -->
      <forge-button max-render-ms="10" warn-on-violation>Fast Button</forge-button>
      <forge-card max-render-ms="16" performance-mode="auto">Auto Card</forge-card>
      <forge-modal max-render-ms="20" dev-mode>Dev Modal</forge-modal>
    </div>
  `;
  
  console.log('Dashboard initialized. Components will be automatically monitored.');
}

// Example 2: Programmatic Dashboard Usage
export function programmaticDashboardExample() {
  console.log('\n=== Programmatic Dashboard Usage Example ===');
  
  // Get current metrics for all components
  const allMetrics = performanceDashboard.getAllMetrics();
  console.log('Current metrics for all components:', allMetrics);
  
  // Get metrics for a specific component
  const buttonMetrics = performanceDashboard.getComponentMetrics('forge-button');
  if (buttonMetrics) {
    console.log('Button performance:', {
      renderTime: `${buttonMetrics.renderTime.toFixed(2)}ms`,
      renderCount: buttonMetrics.renderCount,
      violations: buttonMetrics.violations,
      mode: buttonMetrics.mode
    });
  }
  
  // Find slow components
  const slowComponents = performanceDashboard.getSlowComponents(16);
  if (slowComponents.length > 0) {
    console.log('Components exceeding 16ms render budget:', slowComponents);
  }
  
  // Get performance violations
  const violations = performanceDashboard.getViolations(5);
  if (violations.length > 0) {
    console.log('Recent performance violations:', violations);
    violations.forEach(violation => {
      console.log(`  ${violation.component}: ${violation.renderTime.toFixed(2)}ms > ${violation.budget}ms`);
    });
  }
}

// Example 3: Real-time Monitoring with Custom Logic
export function realtimeMonitoringExample() {
  console.log('\n=== Real-time Monitoring Example ===');
  
  // Subscribe to real-time metrics updates
  const unsubscribe = performanceDashboard.subscribe((metrics) => {
    console.log('📊 Metrics updated at', new Date().toLocaleTimeString());
    
    // Custom performance analysis
    Object.entries(metrics).forEach(([componentName, metric]) => {
      if (metric.renderTime > 16) {
        console.warn(`⚠️  ${componentName} is rendering slowly: ${metric.renderTime.toFixed(2)}ms`);
      }
      
      if (metric.violations > 0) {
        console.warn(`🚨 ${componentName} has ${metric.violations} budget violations`);
      }
    });
  });
  
  // Monitor for 10 seconds then cleanup
  setTimeout(() => {
    console.log('Stopping real-time monitoring');
    unsubscribe();
  }, 10000);
  
  return unsubscribe;
}

// Example 4: Performance Analysis and Reporting
export function performanceAnalysisExample() {
  console.log('\n=== Performance Analysis Example ===');
  
  // Get component summaries for analysis
  const summaries = performanceDashboard.getComponentSummaries();
  
  if (summaries.length === 0) {
    console.log('No components to analyze yet. Add some Forge components to the page.');
    return;
  }
  
  console.log(`Analyzing ${summaries.length} components:`);
  
  summaries.forEach((summary: ComponentMetricsSummary) => {
    const healthEmoji = {
      excellent: '🟢',
      good: '🔵', 
      warning: '🟡',
      critical: '🔴'
    }[summary.health];
    
    console.log(`\n${healthEmoji} ${summary.name}:`);
    console.log(`  Health: ${summary.health}`);
    console.log(`  Average render: ${summary.averageRenderTime.toFixed(2)}ms`);
    console.log(`  Max render: ${summary.maxRenderTime.toFixed(2)}ms`);
    console.log(`  Total renders: ${summary.totalRenders}`);
    console.log(`  Violations: ${summary.violations}`);
    console.log(`  Current mode: ${summary.currentMode}`);
  });
  
  // Performance recommendations
  const criticalComponents = summaries.filter(s => s.health === 'critical');
  const warningComponents = summaries.filter(s => s.health === 'warning');
  
  if (criticalComponents.length > 0) {
    console.log('\n🚨 CRITICAL PERFORMANCE ISSUES:');
    criticalComponents.forEach(comp => {
      console.log(`  - ${comp.name}: Average render time ${comp.averageRenderTime.toFixed(2)}ms`);
    });
  }
  
  if (warningComponents.length > 0) {
    console.log('\n⚠️  PERFORMANCE WARNINGS:');
    warningComponents.forEach(comp => {
      console.log(`  - ${comp.name}: Average render time ${comp.averageRenderTime.toFixed(2)}ms`);
    });
  }
  
  // Calculate overall performance score
  const totalComponents = summaries.length;
  const excellentCount = summaries.filter(s => s.health === 'excellent').length;
  const goodCount = summaries.filter(s => s.health === 'good').length;
  const warningCount = warningComponents.length;
  const criticalCount = criticalComponents.length;
  
  const score = (
    (excellentCount * 100) + 
    (goodCount * 80) + 
    (warningCount * 50) + 
    (criticalCount * 0)
  ) / totalComponents;
  
  console.log(`\n📈 Overall Performance Score: ${score.toFixed(1)}/100`);
  
  if (score >= 90) {
    console.log('🌟 Excellent performance! All components are running smoothly.');
  } else if (score >= 70) {
    console.log('👍 Good performance with room for improvement.');
  } else if (score >= 50) {
    console.log('⚠️  Performance issues detected. Consider optimization.');
  } else {
    console.log('🚨 Critical performance problems need immediate attention.');
  }
}

// Example 5: Development Workflow Integration
export function developmentWorkflowExample() {
  console.log('\n=== Development Workflow Integration Example ===');
  
  // Set up performance monitoring for development
  if (process.env.NODE_ENV === 'development') {
    console.log('🛠️  Development mode: Enhanced performance monitoring enabled');
    
    // Monitor all components with strict budgets
    document.querySelectorAll('[tagName*="FORGE-"]').forEach((element) => {
      if ('maxRenderMs' in element) {
        (element as any).maxRenderMs = 10; // Strict 10ms budget in dev
        (element as any).warnOnViolation = true;
        (element as any).devMode = true;
      }
    });
    
    // Log performance warnings to console
    performanceDashboard.subscribe((metrics) => {
      Object.entries(metrics).forEach(([component, metric]) => {
        if (metric.renderTime > 10) {
          console.warn(`[DEV] ${component} exceeded 10ms budget: ${metric.renderTime.toFixed(2)}ms`);
        }
      });
    });
    
    // Automatic performance reporting every 30 seconds
    setInterval(() => {
      const summaries = performanceDashboard.getComponentSummaries();
      const slowComponents = summaries.filter(s => s.averageRenderTime > 10);
      
      if (slowComponents.length > 0) {
        console.group('📊 Performance Report');
        console.log(`${slowComponents.length} components need optimization:`);
        slowComponents.forEach(comp => {
          console.log(`  - ${comp.name}: ${comp.averageRenderTime.toFixed(2)}ms avg`);
        });
        console.groupEnd();
      }
    }, 30000);
  }
}

// Example 6: Custom Performance Dashboard
export function customDashboardExample() {
  console.log('\n=== Custom Performance Dashboard Example ===');
  
  // Create a custom dashboard with specific configuration
  const customDashboard = document.createElement('forge-performance-dashboard');
  customDashboard.setAttribute('auto-refresh', 'true');
  customDashboard.setAttribute('refresh-interval', '500'); // Very fast updates
  customDashboard.setAttribute('show-violations', 'true');
  
  // Add custom styling
  customDashboard.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 400px;
    max-height: 500px;
    z-index: 9999;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  `;
  
  // Append to body
  document.body.appendChild(customDashboard);
  
  console.log('Custom performance dashboard added to top-right corner');
  
  // Auto-hide after 30 seconds
  setTimeout(() => {
    customDashboard.style.opacity = '0.3';
    customDashboard.style.pointerEvents = 'none';
    console.log('Dashboard minimized (still monitoring in background)');
  }, 30000);
}

// Example 7: Performance Testing Integration
export function performanceTestingExample() {
  console.log('\n=== Performance Testing Integration Example ===');
  
  // Performance test helper
  function testComponentPerformance(componentSelector: string, iterations = 10) {
    const component = document.querySelector(componentSelector);
    if (!component) {
      console.error(`Component ${componentSelector} not found`);
      return;
    }
    
    console.log(`Testing ${componentSelector} performance...`);
    
    // Get baseline metrics
    const initialMetrics = performanceDashboard.getComponentMetrics(component.tagName.toLowerCase());
    const startRenderCount = initialMetrics?.renderCount || 0;
    
    // Trigger multiple re-renders
    const startTime = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      // Trigger re-render by changing a property
      if ('title' in component) {
        (component as any).title = `Test ${i}`;
      } else if ('value' in component) {
        (component as any).value = `Value ${i}`;
      }
    }
    
    // Wait for all renders to complete
    setTimeout(() => {
      const endTime = performance.now();
      const finalMetrics = performanceDashboard.getComponentMetrics(component.tagName.toLowerCase());
      
      if (finalMetrics) {
        const totalTime = endTime - startTime;
        const rendersDone = finalMetrics.renderCount - startRenderCount;
        const avgRenderTime = finalMetrics.renderTime;
        
        console.log(`\n📊 Performance Test Results for ${componentSelector}:`);
        console.log(`  Total time: ${totalTime.toFixed(2)}ms`);
        console.log(`  Renders completed: ${rendersDone}`);
        console.log(`  Average render time: ${avgRenderTime.toFixed(2)}ms`);
        console.log(`  Renders per second: ${(rendersDone / (totalTime / 1000)).toFixed(1)}`);
        
        // Performance evaluation
        if (avgRenderTime < 10) {
          console.log('  ✅ Excellent performance');
        } else if (avgRenderTime < 16) {
          console.log('  ✅ Good performance');
        } else if (avgRenderTime < 32) {
          console.log('  ⚠️  Needs optimization');
        } else {
          console.log('  🚨 Critical performance issue');
        }
      }
    }, 100);
  }
  
  // Test all Forge components
  const forgeComponents = document.querySelectorAll('[data-ready="true"]');
  forgeComponents.forEach((component, index) => {
    if (component.tagName.startsWith('FORGE-')) {
      setTimeout(() => {
        testComponentPerformance(component.tagName.toLowerCase());
      }, index * 1000); // Stagger tests
    }
  });
}

// Run all examples if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllExamples);
  } else {
    runAllExamples();
  }
}

function runAllExamples() {
  basicDashboardExample();
  
  setTimeout(() => {
    programmaticDashboardExample();
    realtimeMonitoringExample();
    performanceAnalysisExample();
    developmentWorkflowExample();
    customDashboardExample();
    
    // Run performance testing last
    setTimeout(performanceTestingExample, 2000);
  }, 1000);
}

// Functions are exported individually above