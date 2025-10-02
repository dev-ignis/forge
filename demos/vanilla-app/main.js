// Import Forge web components (ESM)
import '@nexcraft/forge';

// Theme toggling via data attribute
const root = document.documentElement;
const setTheme = (t) => {
  root.setAttribute('data-forge-theme', t);
  root.style.setProperty('--forge-theme', t);
  localStorage.setItem('forge-theme', t);
};
document.getElementById('theme-light')?.addEventListener('click', () => setTheme('light'));
document.getElementById('theme-dark')?.addEventListener('click', () => setTheme('dark'));
document.getElementById('theme-auto')?.addEventListener('click', () => setTheme('auto'));
setTheme(localStorage.getItem('forge-theme') || 'auto');

// Modal wiring
const modal = document.getElementById('demo-modal');
document.getElementById('open-modal')?.addEventListener('click', () => modal?.show?.());
document.getElementById('close-modal')?.addEventListener('click', () => modal?.close?.());
document.getElementById('confirm-modal')?.addEventListener('click', () => {
  alert('Confirmed!');
  modal?.close?.();
});

// Progress demo
const progress = document.getElementById('progress');
const progressCircle = document.getElementById('progress-circle');
document.getElementById('inc-progress')?.addEventListener('click', () => {
  const next = Math.min(100, (Number(progress?.value ?? 0) + 10));
  if (progress) progress.value = next;
  if (progressCircle) progressCircle.value = next;
});

// AI state reading
const aiBtn = document.getElementById('ai-button');
const aiStatePre = document.getElementById('ai-state');
const refreshAIState = () => {
  // @ts-ignore - aiState is implemented by BaseElement in Forge
  const state = aiBtn?.aiState || { note: 'aiState not available' };
  aiStatePre.textContent = JSON.stringify(state, null, 2);
};
aiBtn?.addEventListener('click', refreshAIState);
setTimeout(refreshAIState, 500);

