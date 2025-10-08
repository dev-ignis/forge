// @ts-check
// Import Forge web components (ESM)
import '@nexcraft/forge';
import { toast } from '@nexcraft/forge';
import '@nexcraft/forge/dist/tokens.css';

// Theme toggling via data attribute
const root = document.documentElement;
const setTheme = (t) => {
  root.setAttribute('data-forge-theme', t);
  root.style.setProperty('--forge-theme', t);
  localStorage.setItem('forge-theme', t);
};
setTheme(localStorage.getItem('forge-theme') || 'auto');
// Hook top navigation theme toggle
const topNav = document.getElementById('top-nav');
topNav?.addEventListener('themechange', () => {
  const current = localStorage.getItem('forge-theme') || 'auto';
  const next = current === 'light' ? 'dark' : current === 'dark' ? 'auto' : 'light';
  setTheme(next);
});

// Modal wiring
/** @type {HTMLElement & { show?: () => void; close?: () => void }} */
const modal = /** @type {any} */ (document.getElementById('demo-modal'));
document.getElementById('open-modal')?.addEventListener('click', () => modal?.show?.());
document.getElementById('close-modal')?.addEventListener('click', () => modal?.close?.());
document.getElementById('confirm-modal')?.addEventListener('click', () => {
  // Use Forge toast instead of alert to keep UX consistent
  toast.success('Confirmed!');
  modal?.close?.();
});

// Progress demo
/** @type {HTMLElement & { value?: number }} */
const progress = /** @type {any} */ (document.getElementById('progress'));
/** @type {HTMLElement & { value?: number }} */
const progressCircle = /** @type {any} */ (document.getElementById('progress-circle'));
document.getElementById('inc-progress')?.addEventListener('click', () => {
  const next = Math.min(100, (Number(progress?.value ?? 0) + 10));
  if (progress) progress.value = next;
  if (progressCircle) progressCircle.value = next;
});

// AI state reading
/** @type {HTMLElement & { aiState?: unknown }} */
const aiBtn = /** @type {any} */ (document.getElementById('ai-button'));
/** @type {HTMLElement} */
const aiStatePre = /** @type {any} */ (document.getElementById('ai-state'));
const refreshAIState = () => {
  const state = aiBtn?.aiState || { note: 'aiState not available' };
  aiStatePre.textContent = JSON.stringify(state, null, 2);
};
aiBtn?.addEventListener('click', refreshAIState);
setTimeout(refreshAIState, 500);

// Populate Radio Group
/** @type {HTMLElement & { options?: any, label?: string }} */
const rg = /** @type {any} */ (document.getElementById('rg-demo'));
if (rg) {
  rg.options = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
  ];
}

// Populate Select
/** @type {HTMLElement & { options?: any, placeholder?: string, value?: string }} */
const select = /** @type {any} */ (document.getElementById('select-demo'));
if (select) {
  select.options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ];
  select.value = 'banana';
}

// Dropdown items
/** @type {HTMLElement & { items?: any, addEventListener: any }} */
const dropdown = /** @type {any} */ (document.getElementById('dropdown-demo'));
if (dropdown) {
  dropdown.items = [
    { id: 'new', label: 'New File', icon: 'plus' },
    { id: 'open', label: 'Open…' },
    { divider: true },
    { id: 'save', label: 'Save', icon: 'download' },
  ];
}

// Multi Select options
/** @type {HTMLElement & { options?: any, value?: string[] }} */
const multi = /** @type {any} */ (document.getElementById('multi-select-demo'));
if (multi) {
  multi.options = [
    { value: 'vue', label: 'Vue' },
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ];
  multi.value = ['react', 'vue'];
}

// Accordion panels
/** @type {HTMLElement & { panels?: any, expandedPanels?: string[] }} */
const accordion = /** @type {any} */ (document.getElementById('accordion-demo'));
if (accordion) {
  accordion.panels = [
    { id: 'p1', header: 'What is Forge?', content: 'AI-native web components.' },
    { id: 'p2', header: 'Why Forge?', content: 'Performance + Accessibility + AI.' },
    { id: 'p3', header: 'Get started', content: 'Install with npm and import.' },
  ];
  accordion.expandedPanels = ['p1'];
}

// Tree View nodes
/** @type {HTMLElement & { nodes?: any }} */
const tree = /** @type {any} */ (document.getElementById('tree-view-demo'));
if (tree) {
  tree.nodes = [
    { id: 'src', label: 'src', icon: 'folder', expanded: true, children: [
      { id: 'atoms', label: 'atoms', icon: 'folder' },
      { id: 'molecules', label: 'molecules', icon: 'folder' },
      { id: 'organisms', label: 'organisms', icon: 'folder' },
    ]},
    { id: 'docs', label: 'docs', icon: 'folder' },
  ];
}

// Data Table columns/rows
/** @type {HTMLElement & { columns?: any, rows?: any, selectable?: boolean }} */
const table = /** @type {any} */ (document.getElementById('data-table-demo'));
if (table) {
  table.columns = [
    { id: 'name', label: 'Name', sortable: true },
    { id: 'role', label: 'Role', sortable: true },
    { id: 'status', label: 'Status' },
  ];
  table.rows = [
    { id: '1', data: { name: 'Alice', role: 'Engineer', status: 'Active' } },
    { id: '2', data: { name: 'Bob', role: 'Designer', status: 'Inactive' } },
    { id: '3', data: { name: 'Carol', role: 'PM', status: 'Active' } },
    { id: '4', data: { name: 'Dan', role: 'QA', status: 'Active' } },
    { id: '5', data: { name: 'Eve', role: 'Engineer', status: 'Active' } },
    { id: '6', data: { name: 'Finn', role: 'Ops', status: 'Active' } },
  ];
  table.selectable = true;
}

// Pagination demo (noop handlers)
/** @type {HTMLElement & { addEventListener: any }} */
const pager = /** @type {any} */ (document.getElementById('pagination-demo'));
if (pager) {
  pager.addEventListener('pagechange', (e) => {
    console.log('pagechange', e.detail);
  });
}

// Top Navigation Bar items
if (topNav) {
  topNav.items = [
    { id: 'home', label: 'Home', href: '#home', icon: 'home' },
    { id: 'components', label: 'Components', items: [
      { id: 'atoms', label: 'Atoms' },
      { id: 'molecules', label: 'Molecules' },
      { id: 'organisms', label: 'Organisms' },
    ]},
    { id: 'docs', label: 'Docs', href: '#docs' },
  ];
  topNav.userName = 'Jane Doe';
}


