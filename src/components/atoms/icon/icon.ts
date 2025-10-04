import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { BaseElement } from '../../../core/BaseElement';
import type { ComponentSize } from '../../../types';
import { throwFetchError, throwInvalidSVGError } from '../../../utils/errors';

/* eslint-disable no-console */
/* global fetch, performance, DOMParser */

export type IconSize = ComponentSize | 'xs' | 'xl';

interface IconData {
  svg: string;
  viewBox?: string;
}

@customElement('forge-icon')
export class ForgeIcon extends BaseElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: currentColor;
      fill: currentColor;
      line-height: 1;
      flex-shrink: 0;
      max-width: 100%;
      vertical-align: middle;
    }

    :host([hidden]) {
      display: none !important;
    }

    svg {
      width: 100%;
      height: 100%;
      display: block;
      fill: currentColor;
      stroke: currentColor;
    }

    /* Size variants */
    :host([size='xs']) {
      width: 16px;
      height: 16px;
    }

    :host([size='sm']) {
      width: 20px;
      height: 20px;
    }

    :host([size='md']) {
      width: 24px;
      height: 24px;
    }

    :host([size='lg']) {
      width: 32px;
      height: 32px;
    }

    :host([size='xl']) {
      width: 40px;
      height: 40px;
    }

    /* Spin animation */
    :host([spin]) svg {
      animation: forge-icon-spin 1s linear infinite;
    }

    @keyframes forge-icon-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Pulse animation */
    :host([pulse]) svg {
      animation: forge-icon-pulse 2s ease-in-out infinite;
    }

    @keyframes forge-icon-pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    /* Performance overlay */
    .performance-overlay {
      position: fixed;
      top: 4px;
      left: 4px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      padding: 4px 8px;
      font-family: monospace;
      font-size: 10px;
      border-radius: 4px;
      z-index: 10000;
      pointer-events: none;
    }

    .performance-overlay.warning {
      color: #ffff00;
    }

    .performance-overlay.error {
      color: #ff0000;
    }
  `;

  private static iconRegistry = new Map<string, IconData>();
  private static loadingIcons = new Map<string, Promise<IconData>>();

  @property({ type: String }) name?: string;
  @property({ type: String }) src?: string;
  @property({ type: String }) size: IconSize = 'md';
  @property({ type: Boolean }) spin = false;
  @property({ type: Boolean }) pulse = false;
  @property({ type: String }) label?: string;

  @property({ type: String, attribute: 'semantic-role' }) semanticRole?: string;
  @property({ type: String, attribute: 'ai-context' }) aiContext?: string;
  @property({ type: String, attribute: 'aria-description' }) ariaDescription: string | null = null;

  @property({ type: Number, attribute: 'max-render-ms' }) maxRenderMs = 16;
  @property({ type: Boolean, attribute: 'warn-on-violation' }) warnOnViolation = false;
  @property({ type: String, attribute: 'performance-mode' }) performanceMode:
    | 'auto'
    | 'fast'
    | 'balanced'
    | 'quality' = 'auto';

  @property({ type: Boolean, attribute: 'dev-mode' }) devMode = false;
  @property({ type: Boolean, attribute: 'show-metrics' }) showMetrics = false;

  @state() private iconData?: IconData;
  @state() private loading = false;
  @state() private error = false;
  @state() protected renderTime = 0;
  @state() protected renderCount = 0;

  static registerIcon(name: string, svg: string, viewBox?: string): void {
    this.iconRegistry.set(name, { svg, viewBox });
  }

  static registerIcons(icons: Record<string, string | IconData>): void {
    Object.entries(icons).forEach(([name, data]) => {
      if (typeof data === 'string') {
        this.registerIcon(name, data);
      } else {
        this.registerIcon(name, data.svg, data.viewBox);
      }
    });
  }

  static async loadIconSet(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.registerIcons(data);
    } catch (error) {
      console.error('Failed to load icon set:', error);
      throw error;
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.updateAria();
  }

  protected override firstUpdated(): void {
    const startTime = performance.now();

    // Load icon on first update when properties are ready
    if (this.name && ForgeIcon.iconRegistry.has(this.name)) {
      this.iconData = ForgeIcon.iconRegistry.get(this.name)!;
      this.error = false;
      this.trackRenderPerformance(startTime);
      return; // Don't call loadIcon if we found it in registry
    }

    if (this.name || this.src) {
      this.loadIcon();
    } else {
      // No icon to load, but still track performance
      this.trackRenderPerformance(startTime);
    }
  }

  override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    // Reload icon if name/src changed (but skip if this is the first update from undefined)
    const nameChanged = changedProperties.has('name');
    const srcChanged = changedProperties.has('src');
    const isFirstUpdate =
      (changedProperties.has('name') && changedProperties.get('name') === undefined) ||
      (changedProperties.has('src') && changedProperties.get('src') === undefined);

    // Skip if this is handled by firstUpdated
    if (!isFirstUpdate && (nameChanged || srcChanged)) {
      // Check registry synchronously first to avoid unnecessary async operations
      if (this.name && ForgeIcon.iconRegistry.has(this.name)) {
        const startTime = performance.now();
        this.iconData = ForgeIcon.iconRegistry.get(this.name)!;
        this.error = false;
        this.trackRenderPerformance(startTime);
      } else if (this.name || this.src) {
        this.loadIcon();
      }
    }

    if (
      changedProperties.has('label') ||
      changedProperties.has('semanticRole') ||
      changedProperties.has('aiContext')
    ) {
      this.updateAria();
    }
  }

  private async loadIcon(): Promise<void> {
    const startTime = performance.now();

    if (this.name) {
      const cached = ForgeIcon.iconRegistry.get(this.name);
      if (cached) {
        this.iconData = cached;
        this.error = false;
        this.trackRenderPerformance(startTime);
        return;
      }

      // Icon not in registry, try loading from src if provided
      if (this.src) {
        await this.loadFromUrl(this.src);
      } else {
        // Only set error if icon is not found in registry AND no src provided
        this.error = true;
        console.warn(`Icon "${this.name}" not found in registry`);
      }
    } else if (this.src) {
      await this.loadFromUrl(this.src);
    }

    this.trackRenderPerformance(startTime);
  }

  private async loadFromUrl(url: string): Promise<void> {
    const existing = ForgeIcon.loadingIcons.get(url);
    if (existing) {
      try {
        this.iconData = await existing;
        this.error = false;
        return;
      } catch {
        this.error = true;
        return;
      }
    }

    const promise = this.fetchIcon(url);
    ForgeIcon.loadingIcons.set(url, promise);

    try {
      this.loading = true;
      this.iconData = await promise;
      this.error = false;

      if (this.name) {
        ForgeIcon.iconRegistry.set(this.name, this.iconData);
      }
    } catch (error) {
      this.error = true;
      console.error('Failed to load icon:', error);
    } finally {
      this.loading = false;
      ForgeIcon.loadingIcons.delete(url);
    }
  }

  private async fetchIcon(url: string): Promise<IconData> {
    const response = await fetch(url);
    if (!response.ok) {
      throwFetchError('ForgeIcon', url, response.status, response.statusText);
    }

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'image/svg+xml');
    const svg = doc.querySelector('svg');

    if (!svg) {
      const parserError = doc.querySelector('parsererror');
      const errorMessage = parserError ? parserError.textContent : 'No <svg> element found';
      throwInvalidSVGError('ForgeIcon', errorMessage || undefined);
    }

    const viewBox = svg.getAttribute('viewBox') || undefined;
    const svgContent = svg.innerHTML;

    return { svg: svgContent, viewBox };
  }

  private updateAria(): void {
    const role = this.label ? 'img' : 'presentation';
    this.setAttribute('role', role);

    if (this.label) {
      this.setAttribute('aria-label', this.label);
    } else {
      this.removeAttribute('aria-label');
    }

    if (this.ariaDescription) {
      this.setAttribute('aria-description', this.ariaDescription);
    }

    if (this.semanticRole) {
      this.setAttribute('data-semantic-role', this.semanticRole);
    }

    if (this.aiContext) {
      this.setAttribute('data-ai-context', this.aiContext);
    }
  }

  private trackRenderPerformance(startTime: number): void {
    const endTime = performance.now();
    this.renderTime = endTime - startTime;
    this.renderCount++;

    if (this.renderTime > this.maxRenderMs) {
      const message = `Icon render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;

      if (this.warnOnViolation) {
        console.warn(message, {
          component: 'forge-icon',
          name: this.name,
          renderTime: this.renderTime,
          maxRenderMs: this.maxRenderMs,
          renderCount: this.renderCount,
        });
      }

      if (this.performanceMode === 'auto') {
        this.applyPerformanceDegradation();
      }
    }

    if (this.devMode) {
      console.log('Icon render metrics:', {
        component: 'forge-icon',
        name: this.name,
        renderTime: this.renderTime,
        renderCount: this.renderCount,
        cacheHit: !!ForgeIcon.iconRegistry.get(this.name || ''),
      });
    }
  }

  protected applyPerformanceDegradation(): void {
    this.spin = false;
    this.pulse = false;
  }

  override render() {
    const content = this.renderIcon();
    const metrics = this.showMetrics ? this.renderMetrics() : null;

    return html` ${metrics} ${content} `;
  }

  private renderIcon() {
    if (this.loading) {
      return this.renderLoading();
    }

    if (this.error || !this.iconData) {
      return this.renderError();
    }

    const viewBox = this.iconData.viewBox || '0 0 24 24';
    return html`
      <svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" part="svg">
        ${unsafeHTML(this.iconData.svg)}
      </svg>
    `;
  }

  private renderLoading() {
    return html`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" part="svg">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          opacity="0.3"
        />
        <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" stroke-width="2" fill="none">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    `;
  }

  private renderError() {
    return html`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" part="svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2" />
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" />
      </svg>
    `;
  }

  private renderMetrics() {
    const status =
      this.renderTime > this.maxRenderMs
        ? 'error'
        : this.renderTime > this.maxRenderMs * 0.75
          ? 'warning'
          : '';

    return html`
      <div class="performance-overlay ${status}">
        Icon: ${this.name || 'custom'}<br />
        Render: ${this.renderTime.toFixed(2)}ms<br />
        Count: ${this.renderCount}<br />
        Cache: ${ForgeIcon.iconRegistry.size} icons
      </div>
    `;
  }

  override getPossibleActions() {
    return [
      {
        name: 'reload',
        description: 'Reload icon from source',
        available: this.error && (!!this.name || !!this.src),
      },
      {
        name: 'clearCache',
        description: 'Clear icon from cache',
        available: !!this.name && ForgeIcon.iconRegistry.has(this.name),
      },
      {
        name: 'startSpin',
        description: 'Start spinning animation',
        available: !this.spin && !this.loading,
      },
      {
        name: 'stopSpin',
        description: 'Stop spinning animation',
        available: this.spin,
      },
      {
        name: 'startPulse',
        description: 'Start pulse animation',
        available: !this.pulse && !this.loading,
      },
      {
        name: 'stopPulse',
        description: 'Stop pulse animation',
        available: this.pulse,
      },
      {
        name: 'focus',
        description: 'Focus the icon',
        available: true,
      },
    ];
  }

  override explainState() {
    const states = ['idle', 'loading', 'loaded', 'error'];
    if (this.spin) states.push('spinning');
    if (this.pulse) states.push('pulsing');

    let currentState = 'idle';
    if (this.loading) currentState = 'loading';
    else if (this.error) currentState = 'error';
    else if (this.iconData) currentState = 'loaded';

    let description = `Icon component`;
    if (this.name) description += ` displaying "${this.name}" icon`;
    else if (this.src) description += ` loading from custom source`;
    else description += ` without icon specified`;

    if (this.loading) description += ', currently loading';
    else if (this.error) description += ', failed to load';
    else if (this.iconData) description += ', successfully loaded';

    if (this.spin) description += ', spinning animation active';
    if (this.pulse) description += ', pulse animation active';

    const cacheHit = !!(this.name && ForgeIcon.iconRegistry.has(this.name));
    if (cacheHit) description += ', cached in registry';

    return {
      currentState,
      possibleStates: states,
      stateDescription: description,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-icon': ForgeIcon;
  }
}

export const commonIcons = {
  'chevron-down': '<path d="M6 9l6 6 6-6"/>',
  'chevron-up': '<path d="M18 15l-6-6-6 6"/>',
  'chevron-left': '<path d="M15 18l-6-6 6-6"/>',
  'chevron-right': '<path d="M9 18l6-6-6-6"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  close: '<path d="M18 6L6 18M6 6l12 12"/>',
  menu: '<path d="M3 12h18M3 6h18M3 18h18"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 7.54l4.24 4.24m12.68 0l4.24 4.24M1.54 16.46l4.24-4.24"/>',
  'alert-circle':
    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  warning:
    '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  heart:
    '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  trash:
    '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  download:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  upload:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
  'arrow-left': '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  'arrow-up': '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
  'arrow-down': '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
  expand_less: '<polyline points="18 15 12 9 6 15"/>',
  expand_more: '<polyline points="6 9 12 15 18 9"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  file: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>',
  calendar:
    '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  'chevron-double-left':
    '<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>',
  'chevron-double-right':
    '<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>',
  sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  image:
    '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
};

ForgeIcon.registerIcons(commonIcons);
