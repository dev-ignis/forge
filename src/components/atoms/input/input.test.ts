import { fixture, expect, html } from '@open-wc/testing';
import { vi } from 'vitest';
import { sendKeys } from '../../../test/test-helpers';
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
      await sendKeys({ press: 'Enter', target: input });
      
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

  describe('AI Methods', () => {
    let el: ForgeInput;

    beforeEach(async () => {
      el = await fixture<ForgeInput>(html`
        <forge-input type="text" value="test"></forge-input>
      `);
    });

    describe('getAIDataType', () => {
      it('should map text type correctly', () => {
        const dataType = el['getAIDataType']();
        expect(dataType).to.equal('text');
      });

      it('should map email type correctly', async () => {
        el.type = 'email';
        await el.updateComplete;
        const dataType = el['getAIDataType']();
        expect(dataType).to.equal('email');
      });

      it('should map password type correctly', async () => {
        el.type = 'password';
        await el.updateComplete;
        const dataType = el['getAIDataType']();
        expect(dataType).to.equal('password');
      });

      it('should map number type correctly', async () => {
        el.type = 'number';
        await el.updateComplete;
        const dataType = el['getAIDataType']();
        expect(dataType).to.equal('number');
      });

      it('should map tel type to phone', async () => {
        el.type = 'tel';
        await el.updateComplete;
        const dataType = el['getAIDataType']();
        expect(dataType).to.equal('phone');
      });

      it('should map url type correctly', async () => {
        el.type = 'url';
        await el.updateComplete;
        const dataType = el['getAIDataType']();
        expect(dataType).to.equal('url');
      });

      it('should map search type to text', async () => {
        el.type = 'search';
        await el.updateComplete;
        const dataType = el['getAIDataType']();
        expect(dataType).to.equal('text');
      });
    });

    describe('getPossibleActions', () => {
      it('should return input action when enabled', () => {
        const actions = el.getPossibleActions();
        
        const inputAction = actions.find(a => a.name === 'input');
        expect(inputAction).to.exist;
        expect(inputAction?.available).to.be.true;
        expect(inputAction?.description).to.equal('Enter text into the field');
      });

      it('should return clear action when value exists', () => {
        const actions = el.getPossibleActions();
        
        const clearAction = actions.find(a => a.name === 'clear');
        expect(clearAction).to.exist;
        expect(clearAction?.available).to.be.true;
      });

      it('should disable clear when no value', async () => {
        el.value = '';
        await el.updateComplete;
        
        const actions = el.getPossibleActions();
        const clearAction = actions.find(a => a.name === 'clear');
        expect(clearAction?.available).to.be.false;
      });

      it('should disable input when disabled', async () => {
        el.disabled = true;
        await el.updateComplete;
        
        const actions = el.getPossibleActions();
        
        const inputAction = actions.find(a => a.name === 'input');
        expect(inputAction?.available).to.be.false;
        
        const clearAction = actions.find(a => a.name === 'clear');
        expect(clearAction?.available).to.be.false;
        
        const focusAction = actions.find(a => a.name === 'focus');
        expect(focusAction?.available).to.be.false;
      });

      it('should disable input when readonly', async () => {
        el.readonly = true;
        await el.updateComplete;
        
        const actions = el.getPossibleActions();
        
        const inputAction = actions.find(a => a.name === 'input');
        expect(inputAction?.available).to.be.false;
        
        const clearAction = actions.find(a => a.name === 'clear');
        expect(clearAction?.available).to.be.false;
      });

      it('should show password toggle for password type', async () => {
        el.type = 'password';
        await el.updateComplete;
        
        const actions = el.getPossibleActions();
        const showPasswordAction = actions.find(a => a.name === 'showPassword');
        expect(showPasswordAction).to.exist;
        expect(showPasswordAction?.available).to.be.true;
      });

      it('should always allow validate action', () => {
        const actions = el.getPossibleActions();
        const validateAction = actions.find(a => a.name === 'validate');
        expect(validateAction?.available).to.be.true;
      });
    });

    describe('explainState', () => {
      it('should explain filled state', () => {
        const state = el.explainState();
        
        expect(state.currentState).to.include('filled');
        expect(state.possibleStates).to.include('filled');
        expect(state.possibleStates).to.include('empty');
        expect(state.stateDescription).to.include('contains text data');
      });

      it('should explain empty state', async () => {
        el.value = '';
        await el.updateComplete;
        
        const state = el.explainState();
        
        expect(state.currentState).to.include('empty');
        expect(state.stateDescription).to.include('empty and ready');
      });

      it('should explain disabled state', async () => {
        el.disabled = true;
        await el.updateComplete;
        
        const state = el.explainState();
        
        expect(state.currentState).to.include('disabled');
        expect(state.stateDescription).to.include('disabled and cannot be edited');
      });

      it('should explain readonly state', async () => {
        el.readonly = true;
        await el.updateComplete;
        
        const state = el.explainState();
        
        expect(state.currentState).to.include('readonly');
        expect(state.stateDescription).to.include('read-only');
      });

      it('should explain error state', async () => {
        el.validationState = 'error';
        await el.updateComplete;
        
        const state = el.explainState();
        
        expect(state.currentState).to.include('error');
        expect(state.stateDescription).to.include('validation error');
      });

      it('should explain warning state', async () => {
        el.validationState = 'warning';
        await el.updateComplete;
        
        const state = el.explainState();
        
        expect(state.currentState).to.include('warning');
        expect(state.stateDescription).to.include('validation warning');
      });

      it('should explain success state', async () => {
        el.validationState = 'success';
        await el.updateComplete;
        
        const state = el.explainState();
        
        expect(state.currentState).to.include('success');
        expect(state.stateDescription).to.include('value is valid');
      });
    });

    describe('getStateDescription', () => {
      it('should handle disabled state description', () => {
        const description = el['getStateDescription']('disabled');
        expect(description).to.equal('Input is disabled and cannot be edited');
      });

      it('should handle readonly state description', () => {
        const description = el['getStateDescription']('readonly');
        expect(description).to.equal('Input is read-only');
      });

      it('should handle error state description', () => {
        const description = el['getStateDescription']('error');
        expect(description).to.equal('Input has validation error');
      });

      it('should handle filled state with specific type', async () => {
        el.type = 'email';
        await el.updateComplete;
        
        const description = el['getStateDescription']('filled');
        expect(description).to.equal('Input contains email data');
      });

      it('should handle empty state description', () => {
        const description = el['getStateDescription']('empty');
        expect(description).to.equal('Input is empty and ready for data entry');
      });

      it('should handle default state description', () => {
        const description = el['getStateDescription']('default');
        expect(description).to.equal('Input field ready for data entry');
      });
    });

    describe('AI State Updates in Lifecycle', () => {
      it('should update state on value change', async () => {
        el.value = 'new value';
        await el.updateComplete;
        
        expect(el['componentState'].get('value')).to.equal('new value');
      });

      it('should update state on type change', async () => {
        el.type = 'email';
        await el.updateComplete;
        
        expect(el['componentState'].get('type')).to.equal('email');
        expect(el['aiMetadata'].dataType).to.equal('email');
      });

      it('should update state on disabled change', async () => {
        el.disabled = true;
        await el.updateComplete;
        
        expect(el['componentState'].get('disabled')).to.be.true;
      });

      it('should update state on validation change', async () => {
        el.validationState = 'error';
        await el.updateComplete;
        
        expect(el['componentState'].get('validationState')).to.equal('error');
      });

      it('should initialize state in connectedCallback', async () => {
        const newInput = document.createElement('forge-input') as ForgeInput;
        newInput.type = 'email';
        newInput.value = 'test@example.com';
        newInput.disabled = false;
        newInput.readonly = false;
        
        document.body.appendChild(newInput);
        await newInput.updateComplete;
        
        expect(newInput['componentState'].get('type')).to.equal('email');
        expect(newInput['componentState'].get('value')).to.equal('test@example.com');
        expect(newInput['componentState'].get('disabled')).to.be.false;
        expect(newInput['componentState'].get('readonly')).to.be.false;
        
        document.body.removeChild(newInput);
      });
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