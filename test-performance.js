#!/usr/bin/env node

/**
 * Performance verification script for Phase 2 components
 * Checks that all molecule components meet the <2ms render requirement
 */

import { html, render } from 'lit';
import './dist/index.js';

const molecules = [
  { name: 'forge-card', template: html`<forge-card>Test Card</forge-card>` },
  { name: 'forge-modal', template: html`<forge-modal>Test Modal</forge-modal>` },
  { name: 'forge-tooltip', template: html`<forge-tooltip content="Test">Hover</forge-tooltip>` },
  { name: 'forge-dropdown', template: html`<forge-dropdown label="Menu"></forge-dropdown>` },
  { name: 'forge-multi-select', template: html`<forge-multi-select></forge-multi-select>` },
  { name: 'forge-date-picker', template: html`<forge-date-picker></forge-date-picker>` },
  { name: 'forge-form-field', template: html`<forge-form-field label="Test"></forge-form-field>` }
];

console.log('🚀 Phase 2 Performance Verification\n');
console.log('Target: All molecules render in <2ms\n');

const results = [];
const container = document.createElement('div');
document.body.appendChild(container);

for (const molecule of molecules) {
  const startTime = performance.now();
  render(molecule.template, container);
  const endTime = performance.now();
  const renderTime = endTime - startTime;
  
  results.push({
    component: molecule.name,
    renderTime: renderTime.toFixed(2),
    passed: renderTime < 2
  });
  
  // Clear for next test
  render(html``, container);
}

console.log('Results:');
console.log('--------');

let allPassed = true;
for (const result of results) {
  const status = result.passed ? '✅' : '❌';
  const indicator = result.passed ? '' : ' (FAILED)';
  console.log(`${status} ${result.component}: ${result.renderTime}ms${indicator}`);
  if (!result.passed) allPassed = false;
}

console.log('\n' + (allPassed ? '✨ All performance requirements met!' : '⚠️ Some components exceed 2ms target'));

process.exit(allPassed ? 0 : 1);