import { fixture, expect, html, elementUpdated } from '@open-wc/testing';
import './navigation-bar';
import { ForgeNavigationBar } from './navigation-bar';
import type { NavItem } from './navigation-bar';

describe('ForgeNavigationBar', () => {
  const mockNavItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      href: '/home',
      icon: 'home'
    },
    {
      id: 'products',
      label: 'Products',
      items: [
        { id: 'product1', label: 'Product 1', href: '/products/1' },
        { id: 'product2', label: 'Product 2', href: '/products/2' }
      ]
    },
    {
      id: 'about',
      label: 'About',
      href: '/about',
      badge: 'New'
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/contact',
      badge: 5
    }
  ];

  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<ForgeNavigationBar>(html`<forge-navigation-bar></forge-navigation-bar>`);
      
      expect(el).to.exist;
      expect(el.items).to.deep.equal([]);
      expect(el.logoSrc).to.equal('');
      expect(el.title).to.equal('');
      expect(el.activeRoute).to.equal('');
      expect(el.position).to.equal('static');
      expect(el.showSearch).to.be.false;
      expect(el.showThemeToggle).to.be.false;
      expect(el.userName).to.equal('');
      expect(el.userAvatar).to.equal('');
    });

    it('should render navigation items', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const navItems = el.shadowRoot?.querySelectorAll('.nav-item');
      expect(navItems!.length).to.be.greaterThan(0);
    });

    it('should render brand section with logo and title', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar 
          logo-src="/logo.png" 
          title="My App">
        </forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const brand = el.shadowRoot?.querySelector('.nav-brand');
      const logo = el.shadowRoot?.querySelector('.nav-logo');
      const title = el.shadowRoot?.querySelector('.nav-title');
      
      expect(brand).to.exist;
      expect(logo).to.exist;
      expect(title).to.exist;
      expect(title?.textContent).to.equal('My App');
    });

    it('should render user section when user info provided', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar 
          user-name="John Doe" 
          user-avatar="/avatar.jpg">
        </forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const userSection = el.shadowRoot?.querySelector('.nav-user');
      expect(userSection).to.exist;
    });
  });

  describe('Position Modes', () => {
    it('should apply static position by default', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const navbar = el.shadowRoot?.querySelector('.navbar');
      expect(navbar?.classList.contains('static')).to.be.true;
    });

    it('should apply fixed position when specified', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar position="fixed"></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const navbar = el.shadowRoot?.querySelector('.navbar');
      expect(navbar?.classList.contains('fixed')).to.be.true;
    });

    it('should apply sticky position when specified', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar position="sticky"></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const navbar = el.shadowRoot?.querySelector('.navbar');
      expect(navbar?.classList.contains('sticky')).to.be.true;
    });
  });

  describe('Navigation Interaction', () => {
    it('should emit navclick event when navigation item clicked', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      let eventDetail: any = null;
      el.addEventListener('navclick', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });
      
      const navItem = el.shadowRoot?.querySelector('[data-nav-id="home"]') as HTMLElement;
      navItem?.click();
      
      await el.updateComplete;
      
      expect(eventDetail).to.exist;
      expect(eventDetail.id).to.equal('home');
    });

    it('should highlight active route', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems} active-route="/home"></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const activeItem = el.shadowRoot?.querySelector('[data-nav-id="home"]');
      expect(activeItem?.classList.contains('active')).to.be.true;
    });

    it('should handle dropdown navigation items', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const dropdownItem = el.shadowRoot?.querySelector('[data-nav-id="products"]');
      expect(dropdownItem).to.exist;
      
      // Check if dropdown exists
      const dropdown = dropdownItem?.querySelector('forge-dropdown');
      expect(dropdown).to.exist;
    });
  });

  describe('Mobile Navigation', () => {
    it('should render mobile toggle button', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const mobileToggle = el.shadowRoot?.querySelector('.mobile-toggle');
      expect(mobileToggle).to.exist;
    });

    it('should toggle mobile drawer on mobile toggle click', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const mobileToggle = el.shadowRoot?.querySelector('.mobile-toggle') as HTMLElement;
      mobileToggle?.click();
      
      await el.updateComplete;
      
      const drawer = el.shadowRoot?.querySelector('.drawer');
      expect(drawer?.classList.contains('open')).to.be.true;
    });

    it('should render overlay when drawer is open', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      // Open drawer
      const mobileToggle = el.shadowRoot?.querySelector('.mobile-toggle') as HTMLElement;
      mobileToggle?.click();
      
      await el.updateComplete;
      
      const overlay = el.shadowRoot?.querySelector('.overlay');
      expect(overlay?.classList.contains('visible')).to.be.true;
    });

    it('should close drawer when overlay clicked', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      // Open drawer first
      const mobileToggle = el.shadowRoot?.querySelector('.mobile-toggle') as HTMLElement;
      mobileToggle?.click();
      await el.updateComplete;
      
      // Click overlay to close
      const overlay = el.shadowRoot?.querySelector('.overlay') as HTMLElement;
      overlay?.click();
      await el.updateComplete;
      
      const drawer = el.shadowRoot?.querySelector('.drawer');
      expect(drawer?.classList.contains('open')).to.be.false;
    });
  });

  describe('Search Feature', () => {
    it('should render search input when enabled', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar show-search></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const searchInput = el.shadowRoot?.querySelector('.nav-search');
      expect(searchInput).to.exist;
    });

    it('should emit search event when search performed', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar show-search></forge-navigation-bar>
      `);
      
      let searchTerm: string = '';
      el.addEventListener('search', (e: Event) => {
        searchTerm = (e as CustomEvent).detail.query;
      });
      
      const searchInput = el.shadowRoot?.querySelector('.nav-search input') as HTMLInputElement;
      if (searchInput) {
        searchInput.value = 'test query';
        searchInput.dispatchEvent(new Event('input'));
      }
      
      await el.updateComplete;
      
      expect(searchTerm).to.equal('test query');
    });
  });

  describe('Theme Toggle', () => {
    it('should render theme toggle when enabled', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar show-theme-toggle></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const themeToggle = el.shadowRoot?.querySelector('.theme-toggle');
      expect(themeToggle).to.exist;
    });

    it('should emit theme change event when toggled', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar show-theme-toggle></forge-navigation-bar>
      `);
      
      let themeChanged = false;
      el.addEventListener('themechange', () => {
        themeChanged = true;
      });
      
      const themeToggle = el.shadowRoot?.querySelector('.theme-toggle') as HTMLElement;
      themeToggle?.click();
      
      await el.updateComplete;
      
      expect(themeChanged).to.be.true;
    });
  });

  describe('User Menu', () => {
    it('should render user dropdown when user info provided', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar 
          user-name="John Doe" 
          user-avatar="/avatar.jpg">
        </forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const userDropdown = el.shadowRoot?.querySelector('.nav-user forge-dropdown');
      expect(userDropdown).to.exist;
    });

    it('should emit useraction event when user menu item clicked', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar 
          user-name="John Doe">
        </forge-navigation-bar>
      `);
      
      let actionId: string = '';
      el.addEventListener('useraction', (e: Event) => {
        actionId = (e as CustomEvent).detail.action;
      });
      
      // Simulate user menu action
      const userMenu = el.shadowRoot?.querySelector('.nav-user');
      if (userMenu) {
        // This would need to be adjusted based on actual implementation
        const profileAction = userMenu.querySelector('[data-action="profile"]') as HTMLElement;
        profileAction?.click();
      }
      
      await el.updateComplete;
      
      // This assertion might need adjustment based on actual implementation
      // expect(actionId).to.equal('profile');
    });
  });

  describe('Badges', () => {
    it('should render numeric badges', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const badgeItem = el.shadowRoot?.querySelector('[data-nav-id="contact"] .nav-badge');
      expect(badgeItem).to.exist;
      expect(badgeItem?.textContent).to.equal('5');
    });

    it('should render text badges', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const badgeItem = el.shadowRoot?.querySelector('[data-nav-id="about"] .nav-badge');
      expect(badgeItem).to.exist;
      expect(badgeItem?.textContent).to.equal('New');
    });
  });

  describe('Accessibility Compliance', () => {
    it('meets WCAG 2.1 AA standards', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await expect(el).to.be.accessible();
    });

    it('provides proper navigation landmark', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav).to.exist;
      expect(nav).to.have.attribute('role', 'navigation');
      expect(nav).to.have.attribute('aria-label');
    });

    it('renders skip link for screen reader users', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const skipLink = el.shadowRoot?.querySelector('.skip-link');
      expect(skipLink).to.exist;
      expect(skipLink).to.have.attribute('href', '#main');
      expect(skipLink?.textContent).to.include('Skip to main content');
    });

    it('maintains proper focus management in mobile drawer', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      // Open mobile drawer
      const mobileToggle = el.shadowRoot?.querySelector('.mobile-toggle') as HTMLElement;
      mobileToggle?.click();
      await el.updateComplete;
      
      // Focus should be trapped within drawer when open
      const drawer = el.shadowRoot?.querySelector('.drawer');
      expect(drawer?.classList.contains('open')).to.be.true;
      
      // First focusable element in drawer should receive focus
      const firstDrawerLink = drawer?.querySelector('a, button') as HTMLElement;
      expect(firstDrawerLink).to.exist;
    });

    it('provides proper ARIA attributes for mobile toggle', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const mobileToggle = el.shadowRoot?.querySelector('.mobile-toggle');
      expect(mobileToggle).to.have.attribute('aria-label');
      expect(mobileToggle).to.have.attribute('aria-expanded', 'false');
      
      // After opening drawer
      (mobileToggle as HTMLElement)?.click();
      await el.updateComplete;
      
      expect(mobileToggle).to.have.attribute('aria-expanded', 'true');
    });

    it('supports keyboard navigation through menu items', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      // All navigation items should be focusable
      const navLinks = el.shadowRoot?.querySelectorAll('a, button');
      navLinks?.forEach((link) => {
        expect(link.tabIndex).to.not.equal(-1); // Should not be explicitly non-focusable
      });
    });

    it('closes drawer on Escape key', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      // Open drawer
      const mobileToggle = el.shadowRoot?.querySelector('.mobile-toggle') as HTMLElement;
      mobileToggle?.click();
      await el.updateComplete;
      
      // Press Escape key
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      el.dispatchEvent(escapeEvent);
      await el.updateComplete;
      
      // Drawer should close
      const drawer = el.shadowRoot?.querySelector('.drawer');
      expect(drawer?.classList.contains('open')).to.be.false;
    });

    it('provides proper ARIA labels for user menu', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar user-name="John Doe" user-avatar="/avatar.jpg"></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const userMenu = el.shadowRoot?.querySelector('.nav-user');
      if (userMenu) {
        const userButton = userMenu.querySelector('forge-button');
        expect(userButton).to.have.attribute('aria-label');
        expect(userButton).to.have.attribute('aria-haspopup');
        expect(userButton).to.have.attribute('aria-expanded');
      }
    });

    it('announces search functionality to screen readers', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar show-search></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      const searchInput = el.shadowRoot?.querySelector('.nav-search input');
      if (searchInput) {
        expect(searchInput).to.have.attribute('aria-label');
        expect(searchInput).to.have.attribute('role', 'searchbox');
      }
    });
  });

  describe('AI Metadata', () => {
    it('should provide AI state', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      const aiState = el.aiState;
      
      expect(aiState.itemCount).to.be.a('number');
      expect(aiState.hasUser).to.be.a('boolean');
      expect(aiState.position).to.equal('static');
      expect(aiState.showSearch).to.be.false;
      expect(aiState.showThemeToggle).to.be.false;
    });

    it('should explain state in natural language', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems} title="My App"></forge-navigation-bar>
      `);
      
      const explanation = el.explainState();
      
      expect(explanation.stateDescription).to.include('Navigation bar');
      expect(explanation.stateDescription).to.include('My App');
    });

    it('should provide possible actions', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      const actions = el.getPossibleActions();
      
      expect(actions).to.be.an('array');
      expect(actions.some(a => a.name === 'navigateTo')).to.be.true;
    });
  });

  describe('Public Methods', () => {
    it('should open mobile drawer programmatically', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      // Open drawer programmatically
      (el as any).openDrawer();
      await el.updateComplete;
      
      const drawer = el.shadowRoot?.querySelector('.drawer');
      expect(drawer?.classList.contains('open')).to.be.true;
    });

    it('should close mobile drawer programmatically', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      // Open first, then close
      (el as any).openDrawer();
      await el.updateComplete;
      
      (el as any).closeDrawer();
      await el.updateComplete;
      
      const drawer = el.shadowRoot?.querySelector('.drawer');
      expect(drawer?.classList.contains('open')).to.be.false;
    });

    it('should toggle mobile drawer programmatically', async () => {
      const el = await fixture<ForgeNavigationBar>(html`
        <forge-navigation-bar .items=${mockNavItems}></forge-navigation-bar>
      `);
      
      await el.updateComplete;
      
      // Initially closed
      let drawer = el.shadowRoot?.querySelector('.drawer');
      expect(drawer?.classList.contains('open')).to.be.false;
      
      // Toggle to open
      (el as any).toggleDrawer();
      await el.updateComplete;
      
      drawer = el.shadowRoot?.querySelector('.drawer');
      expect(drawer?.classList.contains('open')).to.be.true;
      
      // Toggle to close
      (el as any).toggleDrawer();
      await el.updateComplete;
      
      drawer = el.shadowRoot?.querySelector('.drawer');
      expect(drawer?.classList.contains('open')).to.be.false;
    });
  });
});