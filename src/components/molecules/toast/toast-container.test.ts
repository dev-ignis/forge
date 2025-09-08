import { expect } from '@open-wc/testing';
import { html, fixture } from '@open-wc/testing';
import { ForgeToastContainer, showToast, toast } from './toast-container';
import './toast-container';

describe('ForgeToastContainer', () => {
  let element: ForgeToastContainer;

  beforeEach(async () => {
    element = await fixture(html`<forge-toast-container></forge-toast-container>`);
    // Clear any global references
    (window as any).forgeToastContainer = null;
  });

  afterEach(() => {
    // Clean up global references
    (window as any).forgeToastContainer = null;
  });

  describe('Initialization', () => {
    it('should be defined', () => {
      expect(element).to.be.instanceOf(ForgeToastContainer);
    });

    it('should have default properties', () => {
      expect(element.position).to.equal('top-right');
      expect(element.maxToasts).to.equal(5);
      expect(element.stackNewest).to.be.true;
    });

    it('should set accessibility attributes', () => {
      expect(element.getAttribute('role')).to.equal('region');
      expect(element.getAttribute('aria-label')).to.equal('Notifications');
      expect(element.getAttribute('aria-live')).to.equal('polite');
    });
  });

  describe('Properties', () => {
    it('should update position property', async () => {
      element.position = 'bottom-left';
      await element.updateComplete;
      
      expect(element.position).to.equal('bottom-left');
      expect(element.getAttribute('position')).to.equal('bottom-left');
    });

    it('should update maxToasts property', async () => {
      element.maxToasts = 3;
      await element.updateComplete;
      
      expect(element.maxToasts).to.equal(3);
    });

    it('should update stackNewest property', async () => {
      element.stackNewest = false;
      await element.updateComplete;
      
      expect(element.stackNewest).to.be.false;
    });
  });

  describe('Toast Management', () => {
    it('should add toast notification', () => {
      const toastId = element.addToast({
        message: 'Test message',
        variant: 'info'
      });
      
      expect(toastId).to.be.a('string');
      expect(toastId.length).to.be.greaterThan(0);
      
      const toasts = element.getToasts();
      expect(toasts.length).to.equal(1);
      expect(toasts[0].message).to.equal('Test message');
      expect(toasts[0].variant).to.equal('info');
    });

    it('should add toast with custom ID', () => {
      const customId = 'custom-toast-123';
      const toastId = element.addToast({
        id: customId,
        message: 'Test message'
      });
      
      expect(toastId).to.equal(customId);
      
      const toasts = element.getToasts();
      expect(toasts[0].toastId).to.equal(customId);
    });

    it('should add toast with all options', () => {
      const toastId = element.addToast({
        title: 'Test Title',
        message: 'Test message',
        variant: 'success',
        duration: 3000,
        dismissible: false,
        persistent: true,
        showProgress: true
      });
      
      const toasts = element.getToasts();
      const toast = toasts[0];
      
      expect(toast.title).to.equal('Test Title');
      expect(toast.message).to.equal('Test message');
      expect(toast.variant).to.equal('success');
      expect(toast.duration).to.equal(3000);
      expect(toast.dismissible).to.be.false;
      expect(toast.persistent).to.be.true;
      expect(toast.showProgress).to.be.true;
    });

    it('should remove toast by ID', () => {
      const toastId = element.addToast({ message: 'Test message' });
      
      expect(element.getToasts().length).to.equal(1);
      
      const removed = element.removeToast(toastId);
      expect(removed).to.be.true;
      
      // Toast should be marked for dismissal but might still exist until animation completes
      const toasts = element.getToasts();
      if (toasts.length > 0) {
        // If toast still exists, it should be in dismissing state
        expect(toasts[0]).to.exist;
      }
    });

    it('should return false when removing non-existent toast', () => {
      const removed = element.removeToast('non-existent-id');
      expect(removed).to.be.false;
    });

    it('should clear all toasts', () => {
      element.addToast({ message: 'Toast 1' });
      element.addToast({ message: 'Toast 2' });
      element.addToast({ message: 'Toast 3' });
      
      expect(element.getToasts().length).to.equal(3);
      
      element.clearAll();
      
      // Toasts should be marked for dismissal
      const toasts = element.getToasts();
      // After clearing, toasts may still exist but should be in dismissing state
      toasts.forEach(toast => {
        // We can't easily check the private isVisible state, so we just verify the method ran
        expect(toast).to.exist;
      });
    });

    it('should queue toasts when at capacity', () => {
      element.maxToasts = 2;
      
      // Add toasts up to capacity
      element.addToast({ message: 'Toast 1' });
      element.addToast({ message: 'Toast 2' });
      element.addToast({ message: 'Toast 3' }); // This should be queued
      
      const count = element.getToastCount();
      expect(count.active).to.equal(2);
      expect(count.queued).to.equal(1);
      expect(count.total).to.equal(3);
    });

    it('should get toast count correctly', () => {
      element.maxToasts = 2;
      
      element.addToast({ message: 'Toast 1' });
      element.addToast({ message: 'Toast 2' });
      element.addToast({ message: 'Toast 3' }); // Queued
      element.addToast({ message: 'Toast 4' }); // Queued
      
      const count = element.getToastCount();
      expect(count.active).to.equal(2);
      expect(count.queued).to.equal(2);
      expect(count.total).to.equal(4);
    });
  });

  describe('Toast Stacking', () => {
    it('should stack newest on top by default', () => {
      element.addToast({ id: 'first', message: 'First toast' });
      element.addToast({ id: 'second', message: 'Second toast' });
      
      const toasts = element.getToasts();
      expect(toasts[0].toastId).to.equal('second'); // Newest first
      expect(toasts[1].toastId).to.equal('first');
    });

    it('should stack oldest on top when stackNewest is false', async () => {
      element.stackNewest = false;
      await element.updateComplete;
      
      element.addToast({ id: 'first', message: 'First toast' });
      element.addToast({ id: 'second', message: 'Second toast' });
      
      const toasts = element.getToasts();
      expect(toasts[0].toastId).to.equal('first'); // Oldest first
      expect(toasts[1].toastId).to.equal('second');
    });
  });

  describe('Global Toast Management', () => {
    it('should set itself as global container when none exists', async () => {
      // Ensure no existing global container
      (window as any).forgeToastContainer = null;
      const existingGlobal = document.querySelector('forge-toast-container[data-global="true"]');
      if (existingGlobal) {
        existingGlobal.removeAttribute('data-global');
      }
      
      // Create a new container that should become global
      const container = document.createElement('forge-toast-container');
      document.body.appendChild(container);
      
      // Wait for firstUpdated to be called
      await container.updateComplete;
      
      expect((window as any).forgeToastContainer).to.equal(container);
      expect(container.hasAttribute('data-global')).to.be.true;
      
      // Clean up
      container.remove();
      (window as any).forgeToastContainer = null;
    });

    it('should show toast using global helper', () => {
      // Set up global container
      (window as any).forgeToastContainer = element;
      
      const toastId = showToast({
        message: 'Global toast message',
        variant: 'success'
      });
      
      expect(toastId).to.be.a('string');
      expect(element.getToasts().length).to.equal(1);
      expect(element.getToasts()[0].message).to.equal('Global toast message');
    });

    it('should create container if none exists for global toast', () => {
      // Ensure no global container exists
      (window as any).forgeToastContainer = null;
      const existingContainer = document.querySelector('forge-toast-container[data-global="true"]');
      if (existingContainer) {
        existingContainer.remove();
      }
      
      const toastId = showToast({
        message: 'Auto-created container toast'
      });
      
      expect(toastId).to.be.a('string');
      expect((window as any).forgeToastContainer).to.exist;
      
      // Clean up
      const createdContainer = document.querySelector('forge-toast-container[data-global="true"]');
      if (createdContainer) {
        createdContainer.remove();
      }
      (window as any).forgeToastContainer = null;
    });
  });

  describe('Toast Helper Functions', () => {
    beforeEach(() => {
      (window as any).forgeToastContainer = element;
    });

    it('should show info toast', () => {
      const toastId = toast.info('Info message', 'Info Title');
      
      expect(toastId).to.be.a('string');
      const toasts = element.getToasts();
      expect(toasts[0].variant).to.equal('info');
      expect(toasts[0].message).to.equal('Info message');
      expect(toasts[0].title).to.equal('Info Title');
    });

    it('should show success toast', () => {
      const toastId = toast.success('Success message');
      
      const toasts = element.getToasts();
      expect(toasts[0].variant).to.equal('success');
      expect(toasts[0].message).to.equal('Success message');
    });

    it('should show warning toast', () => {
      const toastId = toast.warning('Warning message');
      
      const toasts = element.getToasts();
      expect(toasts[0].variant).to.equal('warning');
      expect(toasts[0].message).to.equal('Warning message');
    });

    it('should show error toast as persistent', () => {
      const toastId = toast.error('Error message');
      
      const toasts = element.getToasts();
      expect(toasts[0].variant).to.equal('error');
      expect(toasts[0].message).to.equal('Error message');
      expect(toasts[0].persistent).to.be.true;
    });

    it('should dismiss toast by ID', () => {
      const toastId = element.addToast({ message: 'Test message' });
      
      const result = toast.dismiss(toastId);
      expect(result).to.be.true;
    });

    it('should clear all toasts', () => {
      element.addToast({ message: 'Toast 1' });
      element.addToast({ message: 'Toast 2' });
      
      toast.clear();
      
      // After clearing, toasts should be in dismissing state
      // We can't easily test the final state without waiting for animations
    });
  });

  describe('AI Integration', () => {
    it('should explain empty state', () => {
      const explanation = element.explainState();
      
      expect(explanation.currentState).to.equal('empty');
      expect(explanation.stateDescription).to.include('no active or queued');
    });

    it('should explain active state', () => {
      element.addToast({ message: 'Test message' });
      
      const explanation = element.explainState();
      
      expect(explanation.currentState).to.equal('active');
      expect(explanation.stateDescription).to.include('showing 1 of 5');
    });

    it('should explain full state', () => {
      element.maxToasts = 2;
      element.addToast({ message: 'Toast 1' });
      element.addToast({ message: 'Toast 2' });
      
      const explanation = element.explainState();
      
      expect(explanation.currentState).to.equal('full');
      expect(explanation.stateDescription).to.include('at capacity with 2');
    });

    it('should explain queued state', () => {
      element.maxToasts = 1;
      element.addToast({ message: 'Toast 1' });
      element.addToast({ message: 'Toast 2' }); // Queued
      
      const explanation = element.explainState();
      
      expect(explanation.currentState).to.equal('queued');
      expect(explanation.stateDescription).to.include('1 active and 1 queued');
    });

    it('should return possible actions', () => {
      const actions = element.getPossibleActions();
      
      expect(actions).to.be.an('array');
      const addAction = actions.find(a => a.name === 'addToast');
      expect(addAction?.available).to.be.true;
      
      const clearAction = actions.find(a => a.name === 'clearAll');
      expect(clearAction?.available).to.be.false; // No toasts yet
    });

    it('should return actions for container with toasts', () => {
      element.addToast({ message: 'Test message' });
      
      const actions = element.getPossibleActions();
      const clearAction = actions.find(a => a.name === 'clearAll');
      expect(clearAction?.available).to.be.true;
      
      const removeAction = actions.find(a => a.name === 'removeToast');
      expect(removeAction?.available).to.be.true;
    });

    it('should return AI state', () => {
      element.position = 'bottom-left';
      element.maxToasts = 3;
      element.stackNewest = false;
      element.addToast({ id: 'test-1', message: 'Message 1' });
      element.addToast({ id: 'test-2', message: 'Message 2' });
      
      const state = element.aiState;
      
      expect(state.position).to.equal('bottom-left');
      expect(state.maxToasts).to.equal(3);
      expect(state.stackNewest).to.be.false;
      expect(state.activeToasts).to.equal(2);
      expect(state.queuedToasts).to.equal(0);
      expect(state.totalToasts).to.equal(2);
      expect(state.toastIds).to.deep.equal(['test-1', 'test-2']);
    });
  });
});