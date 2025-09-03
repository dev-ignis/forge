import { expect, fixture, html, elementUpdated, waitUntil } from '@open-wc/testing';
import './modal'; // Register the element
import { ForgeModal } from './modal';

describe('ForgeModal', () => {
  it('should render with default properties', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal>Modal content</forge-modal>
    `);

    expect(el).to.exist;
    expect(el.open).to.be.false;
    expect(el.size).to.equal('medium');
    expect(el.showClose).to.be.true;
    expect(el.closeOnBackdrop).to.be.true;
    expect(el.closeOnEscape).to.be.true;
  });

  it('should open and close modal', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal>Content</forge-modal>
    `);

    expect(el.open).to.be.false;
    
    el.show();
    await elementUpdated(el);
    expect(el.open).to.be.true;
    
    el.close();
    await elementUpdated(el);
    expect(el.open).to.be.false;
  });

  it('should render different sizes', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal size="large" open>Content</forge-modal>
    `);

    const modal = el.shadowRoot!.querySelector('.modal');
    expect(modal?.classList.contains('modal--large')).to.be.true;
  });

  it('should render title when provided', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal title="Test Modal" open>Content</forge-modal>
    `);

    const title = el.shadowRoot!.querySelector('.modal__title');
    expect(title?.textContent).to.equal('Test Modal');
  });

  it('should show close button by default', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open>Content</forge-modal>
    `);

    const closeButton = el.shadowRoot!.querySelector('.modal__close');
    expect(closeButton).to.exist;
  });

  it('should hide close button when showClose is false', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open show-close="false">Content</forge-modal>
    `);

    const closeButton = el.shadowRoot!.querySelector('.modal__close');
    expect(closeButton).to.not.exist;
  });

  it('should emit forge-modal-toggle event when opened', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal>Content</forge-modal>
    `);

    let toggleEvent: CustomEvent | null = null;
    el.addEventListener('forge-modal-toggle', (e: Event) => {
      toggleEvent = e as CustomEvent;
    });

    el.open = true;
    await elementUpdated(el);

    expect(toggleEvent).to.exist;
    expect(toggleEvent!.detail.open).to.be.true;
  });

  it('should emit forge-modal-close event when close is called', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open>Content</forge-modal>
    `);

    let closeEvent: CustomEvent | null = null;
    el.addEventListener('forge-modal-close', (e: Event) => {
      closeEvent = e as CustomEvent;
    });

    el.close();
    await elementUpdated(el);

    expect(closeEvent).to.exist;
  });

  it('should emit forge-modal-open event when show is called', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal>Content</forge-modal>
    `);

    let openEvent: CustomEvent | null = null;
    el.addEventListener('forge-modal-open', (e: Event) => {
      openEvent = e as CustomEvent;
    });

    el.show();
    await elementUpdated(el);

    expect(openEvent).to.exist;
  });

  it('should close when close button is clicked', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open>Content</forge-modal>
    `);

    const closeButton = el.shadowRoot!.querySelector('.modal__close') as HTMLButtonElement;
    closeButton.click();
    await elementUpdated(el);

    expect(el.open).to.be.false;
  });

  it('should close when backdrop is clicked if closeOnBackdrop is true', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open close-on-backdrop>Content</forge-modal>
    `);

    const container = el.shadowRoot!.querySelector('.modal-container') as HTMLElement;
    container.click();
    await elementUpdated(el);

    expect(el.open).to.be.false;
  });

  it('should not close when backdrop is clicked if closeOnBackdrop is false', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open close-on-backdrop="false">Content</forge-modal>
    `);

    const container = el.shadowRoot!.querySelector('.modal-container') as HTMLElement;
    container.click();
    await elementUpdated(el);

    expect(el.open).to.be.true;
  });

  it('should close when ESC is pressed if closeOnEscape is true', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open close-on-escape>Content</forge-modal>
    `);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await elementUpdated(el);

    expect(el.open).to.be.false;
  });

  it('should prevent event if forge-modal-close is cancelled', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open>Content</forge-modal>
    `);

    el.addEventListener('forge-modal-close', (e: Event) => {
      e.preventDefault();
    });

    el.close();
    await elementUpdated(el);

    expect(el.open).to.be.true;
  });

  it('should prevent event if forge-modal-open is cancelled', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal>Content</forge-modal>
    `);

    el.addEventListener('forge-modal-open', (e: Event) => {
      e.preventDefault();
    });

    el.show();
    await elementUpdated(el);

    expect(el.open).to.be.false;
  });

  it('should support header slot', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open>
        <div slot="header">Custom Header</div>
        Content
      </forge-modal>
    `);

    const headerSlot = el.shadowRoot!.querySelector('slot[name="header"]') as HTMLSlotElement;
    expect(headerSlot).to.exist;
    
    const slottedHeader = el.querySelector('[slot="header"]');
    expect(slottedHeader).to.exist;
    expect(slottedHeader?.textContent).to.equal('Custom Header');
  });

  it('should support footer slot', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open>
        <div slot="footer">Footer content</div>
        Content
      </forge-modal>
    `);

    const footerSlot = el.shadowRoot!.querySelector('slot[name="footer"]') as HTMLSlotElement;
    expect(footerSlot).to.exist;
    
    const slottedFooter = el.querySelector('[slot="footer"]');
    expect(slottedFooter).to.exist;
    expect(slottedFooter?.textContent).to.equal('Footer content');
  });

  it('should have correct scroll behavior', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open scroll-behavior="entire">Content</forge-modal>
    `);

    const modal = el.shadowRoot!.querySelector('.modal');
    expect(modal?.classList.contains('modal--scroll-entire')).to.be.true;
  });

  it('should support no-header-border attribute', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open title="Test" no-header-border>Content</forge-modal>
    `);

    const modal = el.shadowRoot!.querySelector('.modal');
    expect(modal?.classList.contains('modal--no-header-border')).to.be.true;
  });

  it('should support no-footer-border attribute', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open no-footer-border>
        <button slot="footer">Close</button>
        Content
      </forge-modal>
    `);

    const modal = el.shadowRoot!.querySelector('.modal');
    expect(modal?.classList.contains('modal--no-footer-border')).to.be.true;
  });

  it('should set aria attributes correctly', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open title="Test Modal">Content</forge-modal>
    `);

    const modal = el.shadowRoot!.querySelector('.modal');
    expect(modal?.getAttribute('role')).to.equal('dialog');
    expect(modal?.getAttribute('aria-modal')).to.equal('true');
    expect(modal?.getAttribute('aria-label')).to.equal('Test Modal');
  });

  it('should support custom aria-label', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open aria-label="Custom Label">Content</forge-modal>
    `);

    const modal = el.shadowRoot!.querySelector('.modal');
    expect(modal?.getAttribute('aria-label')).to.equal('Custom Label');
  });

  it('should support animation types', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open animation="slide">Content</forge-modal>
    `);

    const modal = el.shadowRoot!.querySelector('.modal');
    expect(modal?.classList.contains('modal--animation-slide')).to.be.true;
  });

  it('should support stack level for multiple modals', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open stack-level="2">Content</forge-modal>
    `);

    expect(el.style.getPropertyValue('--stack-level')).to.equal('2');
  });

  it('should have correct AI metadata', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal>Content</forge-modal>
    `);

    const aiState = el.aiState;
    expect(aiState.metadata.purpose).to.equal('Modal dialog for focused content or interactions');
    expect(aiState.metadata.criticality).to.equal('high');
    expect(aiState.metadata.semanticRole).to.equal('dialog');
  });

  it('should have correct AI actions', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal>Content</forge-modal>
    `);

    const actions = el.getPossibleActions();
    expect(actions).to.have.lengthOf.at.least(3);
    
    const openAction = actions.find(a => a.name === 'open');
    expect(openAction).to.exist;
    expect(openAction!.available).to.be.true;
    
    el.open = true;
    await elementUpdated(el);
    
    const updatedActions = el.getPossibleActions();
    const closeAction = updatedActions.find(a => a.name === 'close');
    expect(closeAction).to.exist;
    expect(closeAction!.available).to.be.true;
  });

  it('should explain state correctly', async () => {
    const el = await fixture<ForgeModal>(html`
      <forge-modal open size="large">Content</forge-modal>
    `);

    const explanation = el.explainState();
    expect(explanation.currentState).to.equal('open');
    expect(explanation.stateDescription).to.include('large');
  });
});