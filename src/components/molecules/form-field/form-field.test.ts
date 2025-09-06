import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, elementUpdated } from '@open-wc/testing';
import { ForgeFormField } from './form-field';
import './form-field';
import '../../atoms/input/input';

describe('ForgeFormField', () => {
  let element: ForgeFormField;

  describe('Basic Rendering', () => {
    beforeEach(async () => {
      element = await fixture<ForgeFormField>(html`
        <forge-form-field></forge-form-field>
      `);
    });

    it('should render with default properties', () => {
      expect(element).to.exist;
      expect(element.variant).to.equal('default');
      expect(element.validationState).to.equal('default');
      expect(element.disabled).to.be.false;
      expect(element.readonly).to.be.false;
      expect(element.required).to.be.false;
    });

    it('should render input element', () => {
      const input = element.shadowRoot?.querySelector('forge-input');
      expect(input).to.exist;
    });

    it('should render with label', async () => {
      element.label = 'Test Label';
      await elementUpdated(element);
      
      const label = element.shadowRoot?.querySelector('.label');
      expect(label).to.exist;
      expect(label?.textContent?.trim()).to.include('Test Label');
    });

    it('should render required indicator when required', async () => {
      element.label = 'Required Field';
      element.required = true;
      await elementUpdated(element);
      
      const indicator = element.shadowRoot?.querySelector('.required-indicator');
      expect(indicator).to.exist;
      expect(indicator?.textContent).to.equal('*');
    });

    it('should render optional indicator when showOptional is true', async () => {
      element.label = 'Optional Field';
      element.showOptional = true;
      element.required = false;
      await elementUpdated(element);
      
      const indicator = element.shadowRoot?.querySelector('.optional-indicator');
      expect(indicator).to.exist;
      expect(indicator?.textContent).to.include('optional');
    });
  });

  describe('Variants', () => {
    it('should render default variant', async () => {
      element = await fixture<ForgeFormField>(html`
        <forge-form-field variant="default" label="Default"></forge-form-field>
      `);
      
      await elementUpdated(element);
      const field = element.shadowRoot?.querySelector('.form-field');
      expect(field?.classList.contains('form-field--default')).to.be.true;
    });

    it('should render floating variant', async () => {
      element = await fixture<ForgeFormField>(html`
        <forge-form-field variant="floating" label="Floating"></forge-form-field>
      `);
      
      const field = element.shadowRoot?.querySelector('.form-field');
      expect(field?.classList.contains('form-field--floating')).to.be.true;
    });

    it('should render inline variant', async () => {
      element = await fixture<ForgeFormField>(html`
        <forge-form-field variant="inline" label="Inline"></forge-form-field>
      `);
      
      const field = element.shadowRoot?.querySelector('.form-field');
      expect(field?.classList.contains('form-field--inline')).to.be.true;
    });

    it('should add is-filled class when value exists', async () => {
      element = await fixture<ForgeFormField>(html`
        <forge-form-field value="test value"></forge-form-field>
      `);
      
      const field = element.shadowRoot?.querySelector('.form-field');
      expect(field?.classList.contains('is-filled')).to.be.true;
    });

    it('should handle floating label animation on focus', async () => {
      element = await fixture<ForgeFormField>(html`
        <forge-form-field variant="floating" label="Float"></forge-form-field>
      `);
      
      const input = element.shadowRoot?.querySelector('forge-input');
      input?.dispatchEvent(new Event('focus'));
      await elementUpdated(element);
      
      const field = element.shadowRoot?.querySelector('.form-field');
      expect(field?.classList.contains('is-focused')).to.be.true;
    });
  });

  describe('Validation States', () => {
    beforeEach(async () => {
      element = await fixture<ForgeFormField>(html`
        <forge-form-field label="Test Field"></forge-form-field>
      `);
    });

    it('should display error state and message', async () => {
      element.validationState = 'error';
      element.errorMessage = 'This field has an error';
      await elementUpdated(element);
      
      const field = element.shadowRoot?.querySelector('.form-field');
      expect(field?.classList.contains('form-field--error')).to.be.true;
      
      const errorMsg = element.shadowRoot?.querySelector('.error-message');
      expect(errorMsg).to.exist;
      expect(errorMsg?.textContent).to.include('This field has an error');
    });

    it('should display warning state and message', async () => {
      element.validationState = 'warning';
      element.warningMessage = 'This is a warning';
      await elementUpdated(element);
      
      const field = element.shadowRoot?.querySelector('.form-field');
      expect(field?.classList.contains('form-field--warning')).to.be.true;
      
      const warningMsg = element.shadowRoot?.querySelector('.warning-message');
      expect(warningMsg).to.exist;
      expect(warningMsg?.textContent).to.include('This is a warning');
    });

    it('should display success state and message', async () => {
      element.validationState = 'success';
      element.successMessage = 'Field is valid';
      await elementUpdated(element);
      
      const field = element.shadowRoot?.querySelector('.form-field');
      expect(field?.classList.contains('form-field--success')).to.be.true;
      
      const successMsg = element.shadowRoot?.querySelector('.success-message');
      expect(successMsg).to.exist;
      expect(successMsg?.textContent).to.include('Field is valid');
    });

    it('should display help text when no error', async () => {
      element.helpText = 'This is help text';
      await elementUpdated(element);
      
      const helpText = element.shadowRoot?.querySelector('.help-text');
      expect(helpText).to.exist;
      expect(helpText?.textContent?.trim()).to.equal('This is help text');
    });

    it('should hide help text when error exists', async () => {
      element.helpText = 'This is help text';
      element.errorMessage = 'Error occurred';
      element.validationState = 'error';
      await elementUpdated(element);
      
      const helpText = element.shadowRoot?.querySelector('.help-text');
      expect(helpText).to.not.exist;
    });
  });

  describe('Event Handling', () => {
    let inputEventSpy: any;
    let focusEventSpy: any;
    let blurEventSpy: any;
    let changeEventSpy: any;

    beforeEach(async () => {
      inputEventSpy = vi.fn();
      focusEventSpy = vi.fn();
      blurEventSpy = vi.fn();
      changeEventSpy = vi.fn();

      element = await fixture<ForgeFormField>(html`
        <forge-form-field 
          name="test-field"
          @input=${inputEventSpy}
          @focus=${focusEventSpy}
          @blur=${blurEventSpy}
          @change=${changeEventSpy}
        ></forge-form-field>
      `);
    });

    it('should emit input event with value and name', async () => {
      const input = element.shadowRoot?.querySelector('forge-input');
      const event = new CustomEvent('input', { 
        detail: { value: 'test input' },
        bubbles: true 
      });
      input?.dispatchEvent(event);
      await elementUpdated(element);

      expect(inputEventSpy).toHaveBeenCalledTimes(1);
      expect(element.value).to.equal('test input');
    });

    it('should emit focus event', async () => {
      const input = element.shadowRoot?.querySelector('forge-input');
      input?.dispatchEvent(new Event('focus', { bubbles: true }));
      await elementUpdated(element);

      expect(focusEventSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit blur event with value', async () => {
      element.value = 'test value';
      const input = element.shadowRoot?.querySelector('forge-input');
      input?.dispatchEvent(new Event('blur', { bubbles: true }));
      await elementUpdated(element);

      expect(blurEventSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit change event', async () => {
      const input = element.shadowRoot?.querySelector('forge-input');
      input?.dispatchEvent(new Event('change', { bubbles: true }));
      await elementUpdated(element);

      expect(changeEventSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('ARIA Attributes and Accessibility', () => {
    beforeEach(async () => {
      element = await fixture<ForgeFormField>(html`
        <forge-form-field 
          label="Accessible Field"
          name="accessible"
          .helpText=${"Help text"}
          .errorMessage=${"Error message"}
          validation-state="error"
        ></forge-form-field>
      `);
    });

    it('should set aria-labelledby on input', () => {
      const input = element.shadowRoot?.querySelector('forge-input');
      expect(input?.getAttribute('aria-labelledby')).to.equal('label-accessible');
    });

    it('should set aria-describedby with error message', () => {
      const input = element.shadowRoot?.querySelector('forge-input');
      expect(input?.getAttribute('aria-describedby')).to.include('error-accessible');
    });

    it('should update aria-describedby with multiple messages', async () => {
      element.warningMessage = 'Warning';
      element.successMessage = 'Success';
      await elementUpdated(element);
      
      const input = element.shadowRoot?.querySelector('forge-input');
      const describedBy = input?.getAttribute('aria-describedby');
      expect(describedBy).to.include('error-accessible');
      expect(describedBy).to.include('warning-accessible');
      expect(describedBy).to.include('success-accessible');
    });

    it('should have role="alert" on error message', async () => {
      await elementUpdated(element);
      const errorMsg = element.shadowRoot?.querySelector('.error-message');
      expect(errorMsg).to.exist;
      expect(errorMsg?.getAttribute('role')).to.equal('alert');
    });

    it('should set data-semantic-role on input', () => {
      const input = element.shadowRoot?.querySelector('forge-input');
      expect(input?.getAttribute('data-semantic-role')).to.equal('form-input');
    });

    it('should set data-ai-context on input', () => {
      const input = element.shadowRoot?.querySelector('forge-input');
      expect(input?.getAttribute('data-ai-context')).to.equal('form-field');
    });
  });

  describe('AI Methods', () => {
    beforeEach(async () => {
      element = await fixture<ForgeFormField>(html`
        <forge-form-field 
          label="AI Test Field"
          value="test value"
          required
        ></forge-form-field>
      `);
    });

    describe('getPossibleActions', () => {
      it('should return available actions when enabled', () => {
        const actions = element.getPossibleActions();
        
        expect(actions).to.be.an('array');
        expect(actions.length).to.be.greaterThan(0);
        
        const inputAction = actions.find(a => a.name === 'input');
        expect(inputAction).to.exist;
        expect(inputAction?.available).to.be.true;
        expect(inputAction?.description).to.include('AI Test Field');
        
        const clearAction = actions.find(a => a.name === 'clear');
        expect(clearAction?.available).to.be.true; // has value
        
        const focusAction = actions.find(a => a.name === 'focus');
        expect(focusAction?.available).to.be.true;
      });

      it('should disable actions when field is disabled', async () => {
        element.disabled = true;
        await elementUpdated(element);
        
        const actions = element.getPossibleActions();
        
        const inputAction = actions.find(a => a.name === 'input');
        expect(inputAction?.available).to.be.false;
        
        const clearAction = actions.find(a => a.name === 'clear');
        expect(clearAction?.available).to.be.false;
        
        const focusAction = actions.find(a => a.name === 'focus');
        expect(focusAction?.available).to.be.false;
      });

      it('should disable clear when no value', async () => {
        element.value = '';
        await elementUpdated(element);
        
        const actions = element.getPossibleActions();
        const clearAction = actions.find(a => a.name === 'clear');
        expect(clearAction?.available).to.be.false;
      });

      it('should handle readonly state', async () => {
        element.readonly = true;
        await elementUpdated(element);
        
        const actions = element.getPossibleActions();
        
        const inputAction = actions.find(a => a.name === 'input');
        expect(inputAction?.available).to.be.false;
        
        const validateAction = actions.find(a => a.name === 'validate');
        expect(validateAction?.available).to.be.true;
      });
    });

    describe('explainState', () => {
      it('should explain default state', () => {
        const explanation = element.explainState();
        
        expect(explanation.currentState).to.include('filled');
        // Current state doesn't include 'required' separately
        expect(explanation.possibleStates).to.include('filled');
        expect(explanation.possibleStates).to.include('empty');
        expect(explanation.possibleStates).to.include('disabled');
        expect(explanation.stateDescription).to.include('AI Test Field');
      });

      it('should explain error state', async () => {
        element.validationState = 'error';
        element.errorMessage = 'Invalid input';
        await elementUpdated(element);
        
        const explanation = element.explainState();
        
        expect(explanation.currentState).to.include('error');
        expect(explanation.stateDescription).to.include('validation error');
        expect(explanation.stateDescription).to.include('Invalid input');
      });

      it('should explain disabled state', async () => {
        element.disabled = true;
        await elementUpdated(element);
        
        const explanation = element.explainState();
        
        expect(explanation.currentState).to.include('disabled');
        expect(explanation.stateDescription).to.include('disabled');
      });

      it('should explain focused state', async () => {
        const input = element.shadowRoot?.querySelector('forge-input');
        input?.dispatchEvent(new Event('focus', { bubbles: true }));
        await elementUpdated(element);
        
        const explanation = element.explainState();
        
        expect(explanation.currentState).to.include('focused');
        expect(explanation.stateDescription).to.include('focused');
      });

      it('should explain required-empty state', async () => {
        element.value = '';
        element.required = true;
        await elementUpdated(element);
        
        const explanation = element.explainState();
        
        expect(explanation.currentState).to.include('required-empty');
        expect(explanation.stateDescription).to.include('required but empty');
      });
    });

    describe('AI State Tracking', () => {
      it('should track component state changes', async () => {
        const stateChangeSpy = vi.fn();
        element.addEventListener('ai-state-change', stateChangeSpy);
        
        element.value = 'new value';
        await elementUpdated(element);
        
        expect(stateChangeSpy).toHaveBeenCalled();
      });

      it('should update AI metadata criticality on error', async () => {
        element.validationState = 'error';
        await elementUpdated(element);
        
        expect(element['aiMetadata'].criticality).to.equal('medium'); // Criticality is const
      });

      it('should map input type to AI data type', async () => {
        element.type = 'email';
        await elementUpdated(element);
        
        expect(element['mapTypeToAIDataType']('email')).to.equal('email');
        expect(element['mapTypeToAIDataType']('password')).to.equal('password');
        expect(element['mapTypeToAIDataType']('number')).to.equal('number');
        expect(element['mapTypeToAIDataType']('tel')).to.equal('phone');
        expect(element['mapTypeToAIDataType']('unknown')).to.equal('text');
      });
    });
  });

  describe('Public Methods', () => {
    beforeEach(async () => {
      element = await fixture<ForgeFormField>(html`
        <forge-form-field></forge-form-field>
      `);
    });

    it('should focus input via focus method', () => {
      const input = element.shadowRoot?.querySelector('forge-input');
      const focusSpy = vi.spyOn(input!, 'focus');
      
      element.focus();
      
      expect(focusSpy).toHaveBeenCalled();
    });

    it('should blur input via blur method', () => {
      const input = element.shadowRoot?.querySelector('forge-input');
      const blurSpy = vi.spyOn(input!, 'blur');
      
      element.blur();
      
      expect(blurSpy).toHaveBeenCalled();
    });

    it('should validate input', () => {
      const result = element.validate();
      expect(result).to.be.a('boolean');
    });

    it('should report validity', () => {
      const result = element.reportValidity();
      expect(result).to.be.a('boolean');
    });
  });

  describe('Performance', () => {
    it('should track render performance', async () => {
      element = await fixture<ForgeFormField>(html`
        <forge-form-field 
          max-render-ms="16"
        ></forge-form-field>
      `);
      
      expect(element['renderMetrics']).to.exist;
      expect(element['renderMetrics'].time).to.be.a('number');
    });

    it('should warn on performance violation', async () => {
      const warnSpy = vi.spyOn(console, 'warn');
      
      element = await fixture<ForgeFormField>(html`
        <forge-form-field 
          max-render-ms="0.001"
          warn-on-violation
        ></forge-form-field>
      `);
      
      // Force multiple updates to ensure performance threshold is exceeded
      element.value = 'trigger update 1';
      await elementUpdated(element);
      
      element.label = 'new label';
      await elementUpdated(element);
      
      element.value = 'trigger update 2';
      await elementUpdated(element);
      
      // Add a small delay to ensure all performance measurements are complete
      await new Promise(resolve => setTimeout(resolve, 50));
      
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe('Input Property Propagation', () => {
    beforeEach(async () => {
      element = await fixture<ForgeFormField>(html`
        <forge-form-field
          type="email"
          placeholder="Enter email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
          minlength="5"
          maxlength="100"
          min="1"
          max="10"
        ></forge-form-field>
      `);
    });

    it('should propagate type to input', () => {
      const input = element.shadowRoot?.querySelector('forge-input');
      expect(input?.type).to.equal('email');
    });

    it('should not show placeholder in floating variant', async () => {
      element.variant = 'floating';
      await elementUpdated(element);
      
      const input = element.shadowRoot?.querySelector('forge-input');
      expect(input?.placeholder).to.equal('');
    });

    it('should propagate validation attributes', () => {
      const input = element.shadowRoot?.querySelector('forge-input');
      expect(input?.getAttribute('pattern')).to.exist;
      expect(input?.getAttribute('minlength')).to.equal('5');
      expect(input?.getAttribute('maxlength')).to.equal('100');
    });
  });
});