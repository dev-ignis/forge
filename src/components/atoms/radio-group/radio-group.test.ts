import { fixture, html, expect } from '@open-wc/testing';
import { createSpy, spyOn } from '../../../test/test-helpers';
import './radio-group';
import type { ForgeRadioGroup, RadioOption } from './radio-group';

describe('ForgeRadioGroup', () => {
  let element: ForgeRadioGroup;

  const defaultOptions: RadioOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
    { value: 'option4', label: 'Option 4', description: 'This is option 4' }
  ];

  beforeEach(async () => {
    element = await fixture<ForgeRadioGroup>(html`
      <forge-radio-group></forge-radio-group>
    `);
  });

  describe('Initialization', () => {
    it('should be defined', () => {
      expect(element).to.be.instanceOf(HTMLElement);
      expect(element.tagName.toLowerCase()).to.equal('forge-radio-group');
    });

    it('should have default properties', () => {
      expect(element.value).to.equal('');
      expect(element.disabled).to.be.false;
      expect(element.required).to.be.false;
      expect(element.error).to.be.false;
      expect(element.orientation).to.equal('vertical');
      expect(element.labelPosition).to.equal('end');
      expect(element.size).to.equal('md');
      expect(element.options).to.deep.equal([]);
    });

    it('should have correct ARIA attributes', () => {
      expect(element.getAttribute('role')).to.equal('radiogroup');
    });

    it('should set AI metadata', () => {
      expect(element.aiMetadata).to.deep.equal({
        purpose: 'Select single option from multiple choices',
        dataType: 'string',
        criticality: 'medium',
        semanticRole: 'radiogroup'
      });
    });
  });

  describe('Rendering', () => {
    it('should render options', async () => {
      element.options = defaultOptions;
      await element.updateComplete;

      const radioItems = element.shadowRoot!.querySelectorAll('.radio-item');
      expect(radioItems).to.have.length(4);
    });

    it('should render label and description', async () => {
      element.label = 'Choose an option';
      element.description = 'Select one from the list';
      await element.updateComplete;

      const label = element.shadowRoot!.querySelector('.radio-group-label');
      const description = element.shadowRoot!.querySelector('.radio-group-description');
      
      expect(label?.textContent?.trim()).to.include('Choose an option');
      expect(description?.textContent?.trim()).to.equal('Select one from the list');
    });

    it('should show required indicator', async () => {
      element.label = 'Choose an option';
      element.required = true;
      await element.updateComplete;

      const indicator = element.shadowRoot!.querySelector('.required-indicator');
      expect(indicator).to.exist;
      expect(indicator?.textContent).to.equal('*');
    });

    it('should show option descriptions', async () => {
      element.options = defaultOptions;
      await element.updateComplete;

      const descriptions = element.shadowRoot!.querySelectorAll('.radio-option-description');
      expect(descriptions).to.have.length(1);
      expect(descriptions[0].textContent?.trim()).to.equal('This is option 4');
    });
  });

  describe('Size Variants', () => {
    it('should apply sm size', async () => {
      element.size = 'sm';
      await element.updateComplete;

      expect(element.getAttribute('size')).to.equal('sm');
    });

    it('should apply md size', async () => {
      element.size = 'md';
      await element.updateComplete;

      expect(element.getAttribute('size')).to.equal('md');
    });

    it('should apply lg size', async () => {
      element.size = 'lg';
      await element.updateComplete;

      expect(element.getAttribute('size')).to.equal('lg');
    });
  });

  describe('Orientation', () => {
    it('should apply vertical orientation', async () => {
      element.orientation = 'vertical';
      await element.updateComplete;

      expect(element.getAttribute('orientation')).to.equal('vertical');
    });

    it('should apply horizontal orientation', async () => {
      element.orientation = 'horizontal';
      await element.updateComplete;

      expect(element.getAttribute('orientation')).to.equal('horizontal');
    });
  });

  describe('Label Position', () => {
    it('should apply end label position', async () => {
      element.labelPosition = 'end';
      await element.updateComplete;

      expect(element.getAttribute('label-position')).to.equal('end');
    });

    it('should apply start label position', async () => {
      element.labelPosition = 'start';
      await element.updateComplete;

      expect(element.getAttribute('label-position')).to.equal('start');
    });
  });

  describe('Selection', () => {
    beforeEach(async () => {
      element.options = defaultOptions;
      await element.updateComplete;
    });

    it('should select option on click', async () => {
      const changeHandler = createSpy();
      element.addEventListener('forge-change', changeHandler);

      const radioInputs = element.shadowRoot!.querySelectorAll('.radio-input') as NodeListOf<HTMLInputElement>;
      radioInputs[0].click();
      await element.updateComplete;

      expect(element.value).to.equal('option1');
      expect(changeHandler).toHaveBeenCalledTimes(1);
    });

    it('should not select disabled option', async () => {
      const changeHandler = createSpy();
      element.addEventListener('forge-change', changeHandler);

      const radioInputs = element.shadowRoot!.querySelectorAll('.radio-input') as NodeListOf<HTMLInputElement>;
      radioInputs[2].click();
      await element.updateComplete;

      expect(element.value).to.equal('');
      expect(changeHandler).not.to.have.property('called', true);
    });

    it('should emit change event with details', async () => {
      const changeHandler = createSpy();
      element.addEventListener('forge-change', changeHandler);

      element.selectOption('option2');
      await element.updateComplete;

      expect(changeHandler).toHaveBeenCalledTimes(1);
      const event = changeHandler.mock.calls[0][0];
      expect(event.detail.value).to.equal('option2');
      expect(event.detail.previousValue).to.equal('');
      expect(event.detail.option).to.deep.equal(defaultOptions[1]);
    });
  });

  describe('Keyboard Navigation', () => {
    beforeEach(async () => {
      element.options = defaultOptions.filter(opt => !opt.disabled);
      await element.updateComplete;
    });

    it('should navigate with arrow keys', async () => {
      const radioGroup = element.shadowRoot!.querySelector('.radio-group') as HTMLElement;
      
      element.value = 'option1';
      await element.updateComplete;

      const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      radioGroup.dispatchEvent(arrowDownEvent);
      await element.updateComplete;

      expect(element.value).to.equal('option2');

      const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      radioGroup.dispatchEvent(arrowUpEvent);
      await element.updateComplete;

      expect(element.value).to.equal('option1');
    });

    it('should wrap around at boundaries', async () => {
      const radioGroup = element.shadowRoot!.querySelector('.radio-group') as HTMLElement;
      
      element.value = 'option4';
      await element.updateComplete;

      const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      radioGroup.dispatchEvent(arrowDownEvent);
      await element.updateComplete;

      expect(element.value).to.equal('option1');
    });

    it('should jump to first/last with Home/End keys', async () => {
      const radioGroup = element.shadowRoot!.querySelector('.radio-group') as HTMLElement;
      
      const homeEvent = new KeyboardEvent('keydown', { key: 'Home' });
      radioGroup.dispatchEvent(homeEvent);
      await element.updateComplete;

      expect(element.value).to.equal('option1');

      const endEvent = new KeyboardEvent('keydown', { key: 'End' });
      radioGroup.dispatchEvent(endEvent);
      await element.updateComplete;

      expect(element.value).to.equal('option4');
    });
  });

  describe('Disabled State', () => {
    it('should disable all options when group is disabled', async () => {
      element.options = defaultOptions;
      element.disabled = true;
      await element.updateComplete;

      const radioInputs = element.shadowRoot!.querySelectorAll('.radio-input') as NodeListOf<HTMLInputElement>;
      radioInputs.forEach(input => {
        expect(input.disabled).to.be.true;
      });

      expect(element.getAttribute('aria-disabled')).to.equal('true');
    });

    it('should not allow selection when disabled', async () => {
      element.options = defaultOptions;
      element.disabled = true;
      await element.updateComplete;

      const changeHandler = createSpy();
      element.addEventListener('forge-change', changeHandler);

      element.selectOption('option1');
      expect(element.value).to.equal('');
      expect(changeHandler).not.to.have.property('called', true);
    });
  });

  describe('Error State', () => {
    it('should show error message', async () => {
      element.error = true;
      element.errorMessage = 'Selection is required';
      await element.updateComplete;

      const errorMsg = element.shadowRoot!.querySelector('.error-message');
      expect(errorMsg).to.exist;
      expect(errorMsg?.textContent?.trim()).to.equal('Selection is required');
      expect(element.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should apply error styling', async () => {
      element.options = defaultOptions;
      element.error = true;
      await element.updateComplete;

      expect(element.hasAttribute('error')).to.be.true;
    });
  });

  describe('Validation', () => {
    it('should validate required field', () => {
      element.required = true;
      element.value = '';
      
      const isValid = element.validate();
      expect(isValid).to.be.false;
      expect(element.error).to.be.true;
      expect(element.errorMessage).to.equal('Please select an option');
    });

    it('should pass validation when value is set', () => {
      element.required = true;
      element.value = 'option1';
      
      const isValid = element.validate();
      expect(isValid).to.be.true;
      expect(element.error).to.be.false;
      expect(element.errorMessage).to.equal('');
    });

    it('should pass validation when not required', () => {
      element.required = false;
      element.value = '';
      
      const isValid = element.validate();
      expect(isValid).to.be.true;
      expect(element.error).to.be.false;
    });
  });

  describe('Public Methods', () => {
    beforeEach(async () => {
      element.options = defaultOptions;
      await element.updateComplete;
    });

    it('should select option programmatically', () => {
      element.selectOption('option2');
      expect(element.value).to.equal('option2');
    });

    it('should not select disabled option programmatically', () => {
      element.selectOption('option3');
      expect(element.value).to.equal('');
    });

    it('should reset the radio group', () => {
      element.value = 'option1';
      element.error = true;
      element.errorMessage = 'Error';
      
      element.reset();
      
      expect(element.value).to.equal('');
      expect(element.error).to.be.false;
      expect(element.errorMessage).to.equal('');
    });
  });

  describe('AI Helper Methods', () => {
    it('should return possible actions', () => {
      element.options = defaultOptions;
      const actions = element.getPossibleActions();
      
      expect(actions).to.have.length(3);
      expect(actions[0].name).to.equal('selectOption');
      expect(actions[0].available).to.be.true;
    });

    it('should explain current state', () => {
      element.options = defaultOptions;
      element.value = 'option1';
      
      const explanation = element.explainState();
      expect(explanation.currentState).to.equal('selected');
      expect(explanation.stateDescription).to.include('Option 1');
    });

    it('should provide AI description', () => {
      element.label = 'Choose size';
      element.options = defaultOptions;
      element.value = 'option2';
      
      const description = element.getAIDescription();
      expect(description).to.include('Choose size');
      expect(description).to.include('4 options');
      expect(description).to.include('Option 2');
    });
  });

  describe('Performance', () => {
    it('should track render performance', async () => {
      element.options = defaultOptions;
      element.devMode = true;
      element.showMetrics = true;
      await element.updateComplete;

      expect(element.renderTime).to.be.a('number');
      expect(element.renderCount).to.be.greaterThan(0);
    });

    it('should apply performance degradation', () => {
      const applyDegradation = spyOn(element as any, 'applyPerformanceDegradation');
      element.renderTime = 100;
      element.maxRenderMs = 16;
      element.warnOnViolation = true;
      
      (element as any).checkPerformance(0);
      
      expect(applyDegradation).to.have.property('called', true);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      element.label = 'Select option';
      element.required = true;
      element.disabled = true;
      await element.updateComplete;

      expect(element.getAttribute('role')).to.equal('radiogroup');
      expect(element.getAttribute('aria-label')).to.equal('Select option');
      expect(element.getAttribute('aria-required')).to.equal('true');
      expect(element.getAttribute('aria-disabled')).to.equal('true');
    });

    it('should manage focus correctly', async () => {
      element.options = defaultOptions.filter(opt => !opt.disabled);
      await element.updateComplete;

      const radioInputs = element.shadowRoot!.querySelectorAll('.radio-input') as NodeListOf<HTMLInputElement>;
      radioInputs[0].focus();
      
      expect(element['focusedIndex']).to.equal(0);
    });
  });
});