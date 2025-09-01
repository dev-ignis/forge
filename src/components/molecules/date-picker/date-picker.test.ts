import { expect } from '@open-wc/testing';
import './date-picker'; // Register the element
import { ForgeDatePicker } from './date-picker';

describe('ForgeDatePicker', () => {
  it('should be defined', () => {
    expect(ForgeDatePicker).to.exist;
  });

  it('should have correct tag name', () => {
    const el = document.createElement('forge-date-picker');
    expect(el.tagName.toLowerCase()).to.equal('forge-date-picker');
  });

  it('should have default properties', () => {
    const el = new ForgeDatePicker();
    expect(el.value).to.be.null;
    expect(el.placeholder).to.equal('Select date');
    expect(el.format).to.equal('MM/DD/YYYY');
    expect(el.disabled).to.be.false;
    expect(el.rangeMode).to.be.false;
  });

  it('should support value property', () => {
    const el = new ForgeDatePicker();
    const testDate = new Date(2025, 8, 15);
    el.value = testDate;
    expect(el.value).to.deep.equal(testDate);
  });

  it('should support range mode', () => {
    const el = new ForgeDatePicker();
    el.rangeMode = true;
    expect(el.rangeMode).to.be.true;
  });

  it('should support min/max constraints', () => {
    const el = new ForgeDatePicker();
    const minDate = new Date(2025, 0, 1);
    const maxDate = new Date(2025, 11, 31);
    
    el.min = minDate;
    el.max = maxDate;
    
    expect(el.min).to.deep.equal(minDate);
    expect(el.max).to.deep.equal(maxDate);
  });

  it('should toggle calendar open state', () => {
    const el = new ForgeDatePicker();
    expect(el.isOpen).to.be.false;
    
    el.isOpen = true;
    expect(el.isOpen).to.be.true;
    
    el.isOpen = false;
    expect(el.isOpen).to.be.false;
  });

  it('should navigate months', () => {
    const el = new ForgeDatePicker();
    const initialMonth = el.currentMonth;
    const initialYear = el.currentYear;
    
    // Navigate to next month
    el.currentMonth = (initialMonth + 1) % 12;
    if (initialMonth === 11) {
      el.currentYear = initialYear + 1;
    }
    
    if (initialMonth === 11) {
      expect(el.currentMonth).to.equal(0);
      expect(el.currentYear).to.equal(initialYear + 1);
    } else {
      expect(el.currentMonth).to.equal(initialMonth + 1);
      expect(el.currentYear).to.equal(initialYear);
    }
  });

  it('should clear value', () => {
    const el = new ForgeDatePicker();
    const testDate = new Date(2025, 8, 15);
    
    el.value = testDate;
    expect(el.value).to.deep.equal(testDate);
    
    el.value = null;
    expect(el.value).to.be.null;
  });

  it('should handle disabled dates', () => {
    const el = new ForgeDatePicker();
    const disabledDates = [
      new Date(2025, 8, 10),
      new Date(2025, 8, 11),
      new Date(2025, 8, 12)
    ];
    
    el.disabledDates = disabledDates;
    expect(el.disabledDates).to.deep.equal(disabledDates);
  });

  it('should support custom placeholder', () => {
    const el = new ForgeDatePicker();
    el.placeholder = 'Choose your date';
    expect(el.placeholder).to.equal('Choose your date');
  });

  it('should support custom format', () => {
    const el = new ForgeDatePicker();
    el.format = 'DD/MM/YYYY';
    expect(el.format).to.equal('DD/MM/YYYY');
  });

  it('should be disabled when disabled prop is set', () => {
    const el = new ForgeDatePicker();
    el.disabled = true;
    expect(el.disabled).to.be.true;
  });

  it('should support week start on Monday', () => {
    const el = new ForgeDatePicker();
    el.weekStartMonday = true;
    expect(el.weekStartMonday).to.be.true;
  });

  it('should have correct AI metadata', () => {
    const el = new ForgeDatePicker();
    const aiState = el.aiState;
    expect(aiState.metadata.purpose).to.equal('Date selection with calendar interface');
    expect(aiState.metadata.dataType).to.equal('date');
    expect(aiState.metadata.criticality).to.equal('medium');
  });

  it('should have correct AI actions', () => {
    const el = new ForgeDatePicker();
    const actions = el.getPossibleActions();
    expect(actions).to.have.lengthOf.at.least(4);
    
    const toggleAction = actions.find(a => a.name === 'toggle');
    expect(toggleAction).to.exist;
    expect(toggleAction!.available).to.be.true;
  });

  it('should explain state correctly', () => {
    const el = new ForgeDatePicker();
    const testDate = new Date(2025, 8, 15);
    el.value = testDate;
    
    const explanation = el.explainState();
    expect(explanation.currentState).to.equal('selected');
    expect(explanation.stateDescription).to.include('09/15/2025');
  });

  it('should support locale property', () => {
    const el = new ForgeDatePicker();
    el.locale = 'fr-FR';
    expect(el.locale).to.equal('fr-FR');
  });

  it('should handle range selection state', () => {
    const el = new ForgeDatePicker();
    el.rangeMode = true;
    
    // Set range start
    el.rangeStart = new Date(2025, 8, 10);
    expect(el.rangeStart).to.exist;
    expect(el.rangeEnd).to.be.null;
    
    // Set range end  
    el.rangeEnd = new Date(2025, 8, 20);
    el.range = { start: el.rangeStart, end: el.rangeEnd };
    
    expect(el.range).to.exist;
    expect(el.range!.start).to.deep.equal(new Date(2025, 8, 10));
    expect(el.range!.end).to.deep.equal(new Date(2025, 8, 20));
  });
});