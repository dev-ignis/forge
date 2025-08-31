import { fixture, expect, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './input';
import type { ForgeInput } from './input';

describe('ForgeInput', () => {
  describe('AI-Ready Features (UVP)', () => {
    it('should have default semantic-role based on type', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input type="email"></forge-input>
      `);
      
      const input = el.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('data-semantic-role')).to.equal('email-input');
    });

    it('should accept custom semantic-role', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input semantic-role="username-field"></forge-input>
      `);
      
      const input = el.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('data-semantic-role')).to.equal('username-field');
    });

    it('should have appropriate ai-context for required fields', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input required></forge-input>
      `);
      
      const input = el.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('data-ai-context')).to.equal('required-field');
    });

    it('should generate proper aria-description', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input 
          label="Email Address" 
          type="email" 
          required 
          disabled>
        </forge-input>
      `);
      
      const input = el.shadowRoot?.querySelector('input');
      const description = input?.getAttribute('aria-description');
      expect(description).to.include('Email Address');
      expect(description).to.include('email input');
      expect(description).to.include('required');
      expect(description).to.include('disabled');
    });
  });

  describe('Performance Monitoring (UVP)', () => {
    it('should have default max-render-ms of 16ms', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input></forge-input>
      `);
      
      expect(el.maxRenderMs).to.equal(16);
    });

    it('should support performance monitoring attributes', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input 
          max-render-ms="8"
          warn-on-violation
          performance-mode="fast">
        </forge-input>
      `);
      
      expect(el.maxRenderMs).to.equal(8);
      expect(el.warnOnViolation).to.be.true;
      expect(el.performanceMode).to.equal('fast');
    });
  });

  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input></forge-input>
      `);
      
      expect(el.type).to.equal('text');
      expect(el.size).to.equal('md');
      expect(el.variant).to.equal('default');
      expect(el.validationState).to.equal('default');
      expect(el.disabled).to.be.false;
    });

    it('should render with label', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input label="Username"></forge-input>
      `);
      
      const label = el.shadowRoot?.querySelector('.label');
      expect(label?.textContent?.trim()).to.equal('Username');
    });

    it('should render with helper text', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input helper-text="Enter your username"></forge-input>
      `);
      
      const helperText = el.shadowRoot?.querySelector('.helper-text');
      expect(helperText?.textContent?.trim()).to.equal('Enter your username');
    });

    it('should show required indicator', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input label="Email" required></forge-input>
      `);
      
      const label = el.shadowRoot?.querySelector('.label');
      expect(label).to.have.class('label--required');
    });
  });

  describe('Input Types', () => {
    it('should support different input types', async () => {
      const types: Array<'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'> = 
        ['text', 'email', 'password', 'number', 'tel', 'url', 'search'];
      
      for (const type of types) {
        const el = await fixture<ForgeInput>(html`
          <forge-input type=${type}></forge-input>
        `);
        
        const input = el.shadowRoot?.querySelector('input');
        expect(input?.type).to.equal(type);
      }
    });
  });

  describe('Validation States', () => {
    it('should apply error state styling', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input validation-state="error"></forge-input>
      `);
      
      const container = el.shadowRoot?.querySelector('.input-container');
      expect(container).to.have.class('input-container--error');
    });

    it('should apply warning state styling', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input validation-state="warning"></forge-input>
      `);
      
      const container = el.shadowRoot?.querySelector('.input-container');
      expect(container).to.have.class('input-container--warning');
    });

    it('should apply success state styling', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input validation-state="success"></forge-input>
      `);
      
      const container = el.shadowRoot?.querySelector('.input-container');
      expect(container).to.have.class('input-container--success');
    });
  });

  describe('User Interaction', () => {
    it('should update value on input', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input></forge-input>
      `);
      
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = 'test value';
      input.dispatchEvent(new Event('input'));
      
      await el.updateComplete;
      expect(el.value).to.equal('test value');
    });

    it('should emit input event', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input></forge-input>
      `);
      
      let eventDetail: any;
      el.addEventListener('input', (e: any) => {
        eventDetail = e.detail;
      });
      
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      
      expect(eventDetail?.value).to.equal('test');
    });

    it('should emit enter event on Enter key', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input value="test"></forge-input>
      `);
      
      let eventDetail: any;
      el.addEventListener('enter', (e: any) => {
        eventDetail = e.detail;
      });
      
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.focus();
      await sendKeys({ press: 'Enter' });
      
      expect(eventDetail?.value).to.equal('test');
    });
  });

  describe('Clear Functionality', () => {
    it('should show clear button when clearable and has value', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input clearable value="test"></forge-input>
      `);
      
      const clearButton = el.shadowRoot?.querySelector('.clear-button');
      expect(clearButton).to.exist;
    });

    it('should clear value when clear button is clicked', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input clearable value="test"></forge-input>
      `);
      
      const clearButton = el.shadowRoot?.querySelector('.clear-button') as HTMLButtonElement;
      clearButton.click();
      
      await el.updateComplete;
      expect(el.value).to.equal('');
    });

    it('should emit clear event', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input clearable value="test"></forge-input>
      `);
      
      let clearEventFired = false;
      el.addEventListener('clear', () => {
        clearEventFired = true;
      });
      
      const clearButton = el.shadowRoot?.querySelector('.clear-button') as HTMLButtonElement;
      clearButton.click();
      
      expect(clearEventFired).to.be.true;
    });
  });

  describe('Disabled State', () => {
    it('should disable input when disabled', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input disabled></forge-input>
      `);
      
      const input = el.shadowRoot?.querySelector('input');
      expect(input?.disabled).to.be.true;
      
      const container = el.shadowRoot?.querySelector('.input-container');
      expect(container).to.have.class('input-container--disabled');
    });
  });

  describe('Sizes', () => {
    it('should apply size classes', async () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
      
      for (const size of sizes) {
        const el = await fixture<ForgeInput>(html`
          <forge-input size=${size}></forge-input>
        `);
        
        const container = el.shadowRoot?.querySelector('.input-container');
        expect(container).to.have.class(`input-container--${size}`);
      }
    });
  });

  describe('Variants', () => {
    it('should apply variant classes', async () => {
      const variants: Array<'default' | 'filled' | 'outlined'> = ['default', 'filled', 'outlined'];
      
      for (const variant of variants) {
        const el = await fixture<ForgeInput>(html`
          <forge-input variant=${variant}></forge-input>
        `);
        
        const container = el.shadowRoot?.querySelector('.input-container');
        expect(container).to.have.class(`input-container--${variant}`);
      }
    });
  });

  describe('Public Methods', () => {
    it('should focus input', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input></forge-input>
      `);
      
      el.focus();
      await el.updateComplete;
      
      const input = el.shadowRoot?.querySelector('input');
      expect(document.activeElement).to.equal(el);
      expect(el.shadowRoot?.activeElement).to.equal(input);
    });

    it('should blur input', async () => {
      const el = await fixture<ForgeInput>(html`
        <forge-input></forge-input>
      `);
      
      el.focus();
      await el.updateComplete;
      el.blur();
      await el.updateComplete;
      
      expect(el.shadowRoot?.activeElement).to.be.null;
    });
  });
});