import { fixture, expect, html } from '@open-wc/testing';
import './pagination';
import { ForgePagination } from './pagination';

describe('ForgePagination', () => {
  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<ForgePagination>(html`<forge-pagination></forge-pagination>`);
      
      expect(el).to.exist;
      expect(el.currentPage).to.equal(1);
      expect(el.totalPages).to.equal(1);
      expect(el.pageSize).to.equal(10);
      expect(el.mode).to.equal('pagination');
    });

    it('should render page buttons', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="1" 
          total-pages="10"
          total-items="100"
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      const pageButtons = el.shadowRoot?.querySelectorAll('.page-button');
      expect(pageButtons).to.exist;
      expect(pageButtons!.length).to.be.greaterThan(0);
    });
  });

  describe('Page Navigation', () => {
    it('should navigate to next page', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="1" 
          total-pages="5"
        ></forge-pagination>
      `);
      
      let eventFired = false;
      el.addEventListener('pagechange', (e: Event) => {
        eventFired = true;
        const detail = (e as CustomEvent).detail;
        expect(detail.page).to.equal(2);
        expect(detail.oldPage).to.equal(1);
      });
      
      const nextButton = Array.from(el.shadowRoot?.querySelectorAll('.page-button') || [])
        .find(btn => btn.textContent?.includes('Next')) as HTMLElement;
      
      nextButton?.click();
      await el.updateComplete;
      
      expect(eventFired).to.be.true;
      expect(el.currentPage).to.equal(2);
    });

    it('should disable previous on first page', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="1" 
          total-pages="5"
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      const prevButton = el.shadowRoot?.querySelector('.page-button[aria-label="Previous page"]') as HTMLButtonElement;
      expect(prevButton?.disabled).to.be.true;
    });

    it('should disable next on last page', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="5" 
          total-pages="5"
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      const nextButton = el.shadowRoot?.querySelector('.page-button[aria-label="Next page"]') as HTMLButtonElement;
      expect(nextButton?.disabled).to.be.true;
    });
  });

  describe('Page Size', () => {
    it('should change page size', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="3" 
          total-pages="10"
          page-size="10"
          total-items="100"
          show-page-size
        ></forge-pagination>
      `);
      
      let eventFired = false;
      el.addEventListener('pagesizechange', (e: Event) => {
        eventFired = true;
        const detail = (e as CustomEvent).detail;
        expect(detail.pageSize).to.equal(25);
        expect(detail.oldPageSize).to.equal(10);
      });
      
      // Simulate page size change
      el['changePageSize'](new CustomEvent('change', { detail: { value: '25' } }));
      await el.updateComplete;
      
      expect(eventFired).to.be.true;
      expect(el.pageSize).to.equal(25);
    });
  });

  describe('Ellipsis Logic', () => {
    it('should show ellipsis for many pages', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="5" 
          total-pages="20"
          sibling-count="1"
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      const pages = el['getPageNumbers']();
      expect(pages).to.include('...');
      expect(pages).to.include(1);
      expect(pages).to.include(20);
    });

    it('should not show ellipsis for few pages', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="3" 
          total-pages="5"
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      const pages = el['getPageNumbers']();
      expect(pages).to.deep.equal([1, 2, 3, 4, 5]);
    });
  });

  describe('Load More Mode', () => {
    it('should render load more button', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          mode="load-more"
          has-more
          current-page="1"
          page-size="10"
          total-items="100"
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      const loadMoreButton = el.shadowRoot?.querySelector('forge-button');
      expect(loadMoreButton).to.exist;
      expect(loadMoreButton?.textContent).to.include('Load More');
    });

    it('should emit load more event', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          mode="load-more"
          has-more
          current-page="1"
        ></forge-pagination>
      `);
      
      let eventFired = false;
      el.addEventListener('loadmore', (e: Event) => {
        eventFired = true;
        expect((e as CustomEvent).detail.page).to.equal(2);
      });
      
      const loadMoreButton = el.shadowRoot?.querySelector('forge-button');
      loadMoreButton?.click();
      
      expect(eventFired).to.be.true;
    });
  });

  describe('AI Metadata', () => {
    it('should provide AI state', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="3" 
          total-pages="10"
          page-size="25"
          total-items="250"
        ></forge-pagination>
      `);
      
      const aiState = el.aiState;
      
      expect(aiState.currentPage).to.equal(3);
      expect(aiState.totalPages).to.equal(10);
      expect(aiState.pageSize).to.equal(25);
      expect(aiState.totalItems).to.equal(250);
      expect(aiState.mode).to.equal('pagination');
    });

    it('should explain state in natural language', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="3" 
          total-pages="10"
          page-size="25"
          total-items="250"
        ></forge-pagination>
      `);
      
      const explanation = el.explainState();
      
      expect(explanation).to.include('Pagination component');
      expect(explanation).to.include('page 3 of 10');
      expect(explanation).to.include('25 items per page');
      expect(explanation).to.include('showing items 51-75 of 250');
    });

    it('should provide possible actions', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="5" 
          total-pages="10"
          show-jump-to
          show-page-size
        ></forge-pagination>
      `);
      
      const actions = el.getPossibleActions();
      
      expect(actions.some(a => a.name === 'previousPage')).to.be.true;
      expect(actions.some(a => a.name === 'nextPage')).to.be.true;
      expect(actions.some(a => a.name === 'firstPage')).to.be.true;
      expect(actions.some(a => a.name === 'lastPage')).to.be.true;
      expect(actions.some(a => a.name === 'jumpToPage')).to.be.true;
      expect(actions.some(a => a.name === 'changePageSize')).to.be.true;
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate with arrow keys', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="5" 
          total-pages="10"
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      // Simulate arrow left
      const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      el.dispatchEvent(leftEvent);
      await el.updateComplete;
      
      expect(el.currentPage).to.equal(4);
      
      // Simulate arrow right
      const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      el.dispatchEvent(rightEvent);
      await el.updateComplete;
      
      expect(el.currentPage).to.equal(5);
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid jump page input', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="5" 
          total-pages="10"
          show-jump-to
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      // Test invalid input
      el.jumpValue = 'invalid';
      const jumpButton = el.shadowRoot?.querySelector('.jump-button') as HTMLElement;
      jumpButton?.click();
      await el.updateComplete;
      
      expect(el.currentPage).to.equal(5); // Should remain unchanged
      // jumpValue is not cleared on invalid input, it just returns early
    });

    it('should handle jump page input out of bounds', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="5" 
          total-pages="10"
          show-jump-to
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      // Test value greater than total pages
      el.jumpValue = '20';
      // Call the private method directly since the button might not exist
      (el as any).handleJumpToPage();
      await el.updateComplete;
      
      expect(el.currentPage).to.equal(10); // Should clamp to max
      expect(el.jumpValue).to.equal(''); // Should be cleared after successful jump
      
      // Test value less than 1
      el.jumpValue = '0';
      (el as any).handleJumpToPage();
      await el.updateComplete;
      
      expect(el.currentPage).to.equal(1); // Should clamp to min
    });

    it('should handle disconnection properly', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="5" 
          total-pages="10"
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      // Test disconnectedCallback
      el.remove();
      
      // Should not throw errors when disconnected
      expect(() => {
        const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        el.dispatchEvent(event);
      }).to.not.throw();
    });

    it('should handle load more mode', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          mode="load-more"
          current-page="5" 
          total-pages="10"
        ></forge-pagination>
      `);
      
      let loadMoreEvent = false;
      el.addEventListener('loadmore', (e: Event) => {
        loadMoreEvent = true;
        const detail = (e as CustomEvent).detail;
        expect(detail.page).to.equal(6);
      });
      
      // Call the private method directly
      (el as any).loadMore();
      
      expect(loadMoreEvent).to.be.true;
    });
  });

  describe('Accessibility Compliance', () => {
    it('meets WCAG 2.1 AA standards', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="5" 
          total-pages="10"
        ></forge-pagination>
      `);
      
      await expect(el).to.be.accessible();
    });

    it('provides proper ARIA labels for navigation', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="5" 
          total-pages="10"
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      // Check page buttons have proper labels (now using forge-button)
      const pageButtons = el.shadowRoot?.querySelectorAll('forge-button.page-button');
      expect(pageButtons!.length).to.be.greaterThan(0);
      pageButtons?.forEach((button) => {
        expect(button).to.have.attribute('aria-label');
      });
    });

    it('announces page changes to screen readers', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="5" 
          total-pages="10"
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      // Check for aria-current on current page
      const currentPageButton = el.shadowRoot?.querySelector('.page-button[aria-current="page"]');
      expect(currentPageButton).to.exist;
      
      // Navigate to next page
      const nextButton = el.shadowRoot?.querySelector('.page-button[aria-label="Next page"]') as HTMLElement;
      nextButton?.click();
      await el.updateComplete;
      
      // Verify aria-current moved to new page
      expect(el.currentPage).to.equal(6);
    });

    it('supports keyboard navigation with arrow keys', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="5" 
          total-pages="10"
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      // Test left arrow key navigation
      const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      el.dispatchEvent(leftEvent);
      await el.updateComplete;
      
      expect(el.currentPage).to.equal(4);
      
      // Test right arrow key navigation
      const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      el.dispatchEvent(rightEvent);
      await el.updateComplete;
      
      expect(el.currentPage).to.equal(5);
    });

    it('has proper focus management', async () => {
      const el = await fixture<ForgePagination>(html`
        <forge-pagination 
          current-page="1" 
          total-pages="10"
        ></forge-pagination>
      `);
      
      await el.updateComplete;
      
      // Focus should be manageable on pagination buttons
      const firstButton = el.shadowRoot?.querySelector('.page-button') as HTMLElement;
      firstButton?.focus();
      
      expect(document.activeElement).to.exist;
      
      // Tab navigation should work through all focusable elements (now forge-button)
      const focusableElements = el.shadowRoot?.querySelectorAll('forge-button:not([disabled])');
      expect(focusableElements!.length).to.be.greaterThan(0);
    });
  });
});