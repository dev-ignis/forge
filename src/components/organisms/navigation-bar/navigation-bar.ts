import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/base-element';
import type { AIState, AIAction } from '../../../core/types';
import '../../atoms/button/button';
import '../../atoms/icon/icon';
import '../../molecules/dropdown/dropdown';
import type { DropdownItem } from '../../molecules/dropdown/dropdown';

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  items?: NavItem[];
  badge?: string | number;
}

/**
 * @element forge-navigation-bar
 * @description Responsive navigation bar with mobile drawer, dropdowns, and route detection
 * @fires navclick - When a navigation item is clicked
 * @fires useraction - When a user menu action is selected
 */
@customElement('forge-navigation-bar')
export class ForgeNavigationBar extends BaseElement {
  static override styles = [
    BaseElement.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 var(--forge-spacing-md, 16px);
        height: var(--forge-navbar-height, 64px);
        background: var(--forge-navbar-bg, #ffffff);
        box-shadow: var(--forge-navbar-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
        position: relative;
        z-index: 100;
      }

      .navbar.fixed {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      }

      .navbar.sticky {
        position: sticky;
        top: 0;
      }

      .nav-brand {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-sm, 8px);
      }

      .nav-logo {
        height: 40px;
        width: auto;
      }

      .nav-title {
        font-size: var(--forge-font-size-lg, 18px);
        font-weight: var(--forge-font-weight-bold, 600);
        color: var(--forge-text-primary, #333333);
      }

      .nav-menu {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-md, 16px);
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .nav-item {
        position: relative;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-xs, 4px);
        padding: var(--forge-spacing-sm, 8px) var(--forge-spacing-md, 16px);
        color: var(--forge-text-primary, #333333);
        text-decoration: none;
        font-size: var(--forge-font-size-base, 14px);
        font-weight: var(--forge-font-weight-medium, 500);
        transition: all 0.2s ease;
        border-radius: var(--forge-border-radius-sm, 4px);
      }

      .nav-link:hover {
        background: var(--forge-hover-bg, rgba(0, 0, 0, 0.04));
        color: var(--forge-primary-color, #1976d2);
      }

      .nav-link.active {
        color: var(--forge-primary-color, #1976d2);
        background: var(--forge-primary-bg-light, rgba(25, 118, 210, 0.08));
      }

      .nav-actions {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-sm, 8px);
      }

      /* Mobile menu toggle */
      .mobile-toggle {
        display: none;
      }

      /* Mobile drawer */
      .mobile-drawer {
        position: fixed;
        top: 0;
        left: -100%;
        width: 280px;
        height: 100%;
        background: var(--forge-surface-color, #ffffff);
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
        transition: left 0.3s ease;
        z-index: 200;
        overflow-y: auto;
      }

      .mobile-drawer.open {
        left: 0;
      }

      .drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--forge-spacing-md, 16px);
        border-bottom: 1px solid var(--forge-border-color, #e0e0e0);
      }

      .drawer-menu {
        list-style: none;
        margin: 0;
        padding: var(--forge-spacing-md, 16px);
      }

      .drawer-item {
        margin-bottom: var(--forge-spacing-sm, 8px);
      }

      .drawer-link {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-sm, 8px);
        padding: var(--forge-spacing-sm, 8px) var(--forge-spacing-md, 16px);
        color: var(--forge-text-primary, #333333);
        text-decoration: none;
        border-radius: var(--forge-border-radius-sm, 4px);
        transition: background 0.2s ease;
      }

      .drawer-link:hover {
        background: var(--forge-hover-bg, rgba(0, 0, 0, 0.04));
      }

      .drawer-link.active {
        background: var(--forge-primary-bg-light, rgba(25, 118, 210, 0.08));
        color: var(--forge-primary-color, #1976d2);
      }

      /* Overlay */
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 150;
      }

      .overlay.visible {
        opacity: 1;
        visibility: visible;
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        .mobile-toggle {
          display: flex;
        }

        .nav-menu {
          display: none;
        }

        .nav-actions {
          margin-left: auto;
        }
      }

      /* Skip link for accessibility */
      .skip-link {
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }

      .skip-link:focus {
        position: fixed;
        top: 10px;
        left: 10px;
        width: auto;
        height: auto;
        padding: var(--forge-spacing-sm, 8px) var(--forge-spacing-md, 16px);
        background: var(--forge-primary-color, #1976d2);
        color: white;
        text-decoration: none;
        border-radius: var(--forge-border-radius-sm, 4px);
        z-index: 1000;
      }
    `
  ];

  @property({ type: Array }) items: NavItem[] = [];
  @property({ type: String, attribute: 'logo-src' }) logoSrc = '';
  @property({ type: String }) title = '';
  @property({ type: String, attribute: 'active-route' }) activeRoute = '';
  @property({ type: String }) position: 'static' | 'fixed' | 'sticky' = 'static';
  @property({ type: Boolean, attribute: 'show-search' }) showSearch = false;
  @property({ type: Boolean, attribute: 'show-theme-toggle' }) showThemeToggle = false;
  @property({ type: String, attribute: 'user-name' }) userName = '';
  @property({ type: String, attribute: 'user-avatar' }) userAvatar = '';
  
  @state() private mobileOpen = false;

  constructor() {
    super();
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.handleRouteChange);
    this.detectActiveRoute();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this.handleRouteChange);
  }

  private handleRouteChange() {
    this.detectActiveRoute();
  }

  private detectActiveRoute() {
    const path = window.location.pathname;
    this.activeRoute = path;
  }

  private toggleMobileMenu() {
    this.mobileOpen = !this.mobileOpen;
    document.body.style.overflow = this.mobileOpen ? 'hidden' : '';
  }

  private closeMobileMenu() {
    this.mobileOpen = false;
    document.body.style.overflow = '';
  }

  private handleNavClick(e: Event, item: NavItem) {
    if (item.href) {
      e.preventDefault();
      window.history.pushState({}, '', item.href);
      this.detectActiveRoute();
      this.closeMobileMenu();
      
      this.dispatchEvent(new CustomEvent('navclick', {
        detail: { item },
        bubbles: true,
        composed: true
      }));
    }
  }

  private isActive(item: NavItem): boolean {
    if (!item.href) return false;
    return this.activeRoute === item.href || this.activeRoute.startsWith(item.href + '/');
  }

  // AI Metadata
  override get aiState(): AIState {
    return {
      ...super.aiState,
      activeRoute: this.activeRoute,
      mobileOpen: this.mobileOpen,
      itemCount: this.items.length,
      position: this.position,
      hasUser: !!this.userName
    };
  }

  override explainState(): string {
    const parts = ['Navigation bar'];
    
    if (this.activeRoute) {
      const activeItem = this.items.find(item => this.isActive(item));
      if (activeItem) {
        parts.push(`on ${activeItem.label} page`);
      }
    }
    
    parts.push(`${this.items.length} menu items`);
    
    if (this.mobileOpen) {
      parts.push('mobile menu open');
    }
    
    if (this.position !== 'static') {
      parts.push(this.position);
    }
    
    return parts.join(', ');
  }

  override getPossibleActions(): AIAction[] {
    const actions: AIAction[] = [];
    
    if (this.mobileOpen) {
      actions.push({
        name: 'closeMobileMenu',
        description: 'Close mobile menu',
        available: true
      });
    } else {
      actions.push({
        name: 'openMobileMenu',
        description: 'Open mobile menu',
        available: true
      });
    }
    
    this.items.forEach(item => {
      if (item.href && !this.isActive(item)) {
        actions.push({
          name: 'navigate',
          description: `Navigate to ${item.label}`,
          available: true,
          params: [item.href]
        });
      }
    });
    
    return actions;
  }

  override render() {
    const navbarClasses = {
      'navbar': true,
      'fixed': this.position === 'fixed',
      'sticky': this.position === 'sticky'
    };

    return html`
      <a href="#main-content" class="skip-link">Skip to main content</a>
      
      <nav class=${classMap(navbarClasses)} role="navigation" aria-label="Main navigation">
        <forge-button
          class="mobile-toggle"
          variant="text"
          @click=${this.toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded=${this.mobileOpen}
        >
          <forge-icon name="menu" size="md"></forge-icon>
        </forge-button>
        
        <div class="nav-brand">
          ${this.logoSrc ? html`
            <img src=${this.logoSrc} alt="Logo" class="nav-logo" />
          ` : ''}
          ${this.title ? html`
            <span class="nav-title">${this.title}</span>
          ` : ''}
        </div>
        
        <ul class="nav-menu">
          ${this.items.map(item => this.renderNavItem(item))}
        </ul>
        
        <div class="nav-actions">
          ${this.showSearch ? html`
            <forge-button variant="text" aria-label="Search">
              <forge-icon name="search" size="md"></forge-icon>
            </forge-button>
          ` : ''}
          
          ${this.showThemeToggle ? html`
            <forge-button variant="text" aria-label="Toggle theme">
              <forge-icon name="sun" size="md"></forge-icon>
            </forge-button>
          ` : ''}
          
          ${this.userName ? this.renderUserMenu() : ''}
        </div>
      </nav>
      
      ${this.renderMobileDrawer()}
      
      <div 
        class="overlay ${this.mobileOpen ? 'visible' : ''}"
        @click=${this.closeMobileMenu}
        aria-hidden="true"
      ></div>
    `;
  }

  private renderNavItem(item: NavItem) {
    if (item.items && item.items.length > 0) {
      const dropdownItems: DropdownItem[] = item.items.map(subItem => ({
        id: subItem.id,
        label: subItem.label,
        icon: subItem.icon
      }));

      return html`
        <li class="nav-item">
          <forge-dropdown
            .items=${dropdownItems}
            @itemclick=${(e: CustomEvent) => {
              const subItem = item.items!.find(i => i.id === e.detail.item.id);
              if (subItem?.href) {
                this.handleNavClick(e, subItem);
              }
            }}
          >
            <span slot="trigger" class="nav-link">
              ${item.icon ? html`<forge-icon name=${item.icon} size="sm"></forge-icon>` : ''}
              ${item.label}
              <forge-icon name="chevron-down" size="xs"></forge-icon>
            </span>
          </forge-dropdown>
        </li>
      `;
    }

    return html`
      <li class="nav-item">
        <a
          href=${item.href || '#'}
          class="nav-link ${this.isActive(item) ? 'active' : ''}"
          @click=${(e: Event) => this.handleNavClick(e, item)}
          aria-current=${this.isActive(item) ? 'page' : 'false'}
        >
          ${item.icon ? html`<forge-icon name=${item.icon} size="sm"></forge-icon>` : ''}
          ${item.label}
          ${item.badge ? html`
            <forge-badge size="sm" variant="primary">${item.badge}</forge-badge>
          ` : ''}
        </a>
      </li>
    `;
  }

  private renderUserMenu() {
    const userMenuItems: DropdownItem[] = [
      { id: 'profile', label: 'Profile', icon: 'user' },
      { id: 'settings', label: 'Settings', icon: 'settings' },
      { id: 'divider', label: '', divider: true },
      { id: 'logout', label: 'Logout', icon: 'logout' }
    ];

    return html`
      <forge-dropdown
        .items=${userMenuItems}
        @itemclick=${(e: CustomEvent) => {
          this.dispatchEvent(new CustomEvent('useraction', {
            detail: { action: e.detail.item.id },
            bubbles: true,
            composed: true
          }));
        }}
      >
        <forge-button slot="trigger" variant="text">
          ${this.userAvatar ? html`
            <img src=${this.userAvatar} alt=${this.userName} style="width: 32px; height: 32px; border-radius: 50%;" />
          ` : html`
            <forge-icon name="user" size="md"></forge-icon>
          `}
        </forge-button>
      </forge-dropdown>
    `;
  }

  private renderMobileDrawer() {
    return html`
      <div class="mobile-drawer ${this.mobileOpen ? 'open' : ''}">
        <div class="drawer-header">
          <span class="nav-title">${this.title}</span>
          <forge-button
            variant="text"
            @click=${this.closeMobileMenu}
            aria-label="Close mobile menu"
          >
            <forge-icon name="close" size="md"></forge-icon>
          </forge-button>
        </div>
        
        <ul class="drawer-menu">
          ${this.items.map(item => this.renderDrawerItem(item))}
        </ul>
      </div>
    `;
  }

  private renderDrawerItem(item: NavItem) {
    return html`
      <li class="drawer-item">
        <a
          href=${item.href || '#'}
          class="drawer-link ${this.isActive(item) ? 'active' : ''}"
          @click=${(e: Event) => this.handleNavClick(e, item)}
        >
          ${item.icon ? html`<forge-icon name=${item.icon} size="sm"></forge-icon>` : ''}
          ${item.label}
          ${item.badge ? html`
            <forge-badge size="sm" variant="primary">${item.badge}</forge-badge>
          ` : ''}
        </a>
        
        ${item.items && item.items.length > 0 ? html`
          <ul class="drawer-menu" style="padding-left: var(--forge-spacing-lg, 24px);">
            ${item.items.map(subItem => this.renderDrawerItem(subItem))}
          </ul>
        ` : ''}
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-navigation-bar': ForgeNavigationBar;
  }
}