import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './date-picker';
import type { ForgeDatePicker } from './date-picker';

describe('ForgeDatePicker', () => {
  let element: ForgeDatePicker;

  beforeEach(async () => {
    element = await fixture<ForgeDatePicker>(html`
      <forge-date-picker></forge-date-picker>
    `);
  });

  describe('Basic Properties', () => {
    it('should be defined', () => {
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('forge-date-picker');
    });

    it('should have default properties', () => {
      expect(element.value).toBeNull();
      expect(element.placeholder).toBe('Select date');
      expect(element.format).toBe('MM/DD/YYYY');
      expect(element.disabled).toBe(false);
      expect(element.rangeMode).toBe(false);
      expect(element.required).toBe(false);
      expect(element.weekStartMonday).toBe(false);
      expect(element.locale).toBe('en-US');
    });

    it('should set and get value', () => {
      const testDate = new Date(2025, 8, 15);
      element.value = testDate;
      expect(element.value).toEqual(testDate);
    });

    it('should clear value', () => {
      const testDate = new Date(2025, 8, 15);
      element.value = testDate;
      expect(element.value).toEqual(testDate);
      
      element.value = null;
      expect(element.value).toBeNull();
    });

    it('should handle invalid dates', () => {
      const invalidDate = new Date('invalid');
      element.value = invalidDate;
      expect(element.value).toBeNull();
    });

    it('should set placeholder', () => {
      element.placeholder = 'Choose a date';
      expect(element.placeholder).toBe('Choose a date');
    });

    it('should set format', () => {
      element.format = 'DD/MM/YYYY';
      expect(element.format).toBe('DD/MM/YYYY');
    });

    it('should set disabled state', () => {
      element.disabled = true;
      expect(element.disabled).toBe(true);
    });

    it('should set required state', () => {
      element.required = true;
      expect(element.required).toBe(true);
    });

    it('should set locale', () => {
      element.locale = 'fr-FR';
      expect(element.locale).toBe('fr-FR');
    });

    it('should set weekStartMonday', () => {
      element.weekStartMonday = true;
      expect(element.weekStartMonday).toBe(true);
    });
  });

  describe('Calendar State', () => {
    it('should track open state', () => {
      expect(element.isOpen).toBe(false);
      element.isOpen = true;
      expect(element.isOpen).toBe(true);
      element.isOpen = false;
      expect(element.isOpen).toBe(false);
    });

    it('should track current month and year', () => {
      const now = new Date();
      expect(element.currentMonth).toBe(now.getMonth());
      expect(element.currentYear).toBe(now.getFullYear());
    });

    it('should navigate to next month', () => {
      const initialMonth = element.currentMonth;
      const initialYear = element.currentYear;
      
      element.nextMonth();
      
      if (initialMonth === 11) {
        expect(element.currentMonth).toBe(0);
        expect(element.currentYear).toBe(initialYear + 1);
      } else {
        expect(element.currentMonth).toBe(initialMonth + 1);
        expect(element.currentYear).toBe(initialYear);
      }
    });

    it('should navigate to previous month', () => {
      const initialMonth = element.currentMonth;
      const initialYear = element.currentYear;
      
      element.previousMonth();
      
      if (initialMonth === 0) {
        expect(element.currentMonth).toBe(11);
        expect(element.currentYear).toBe(initialYear - 1);
      } else {
        expect(element.currentMonth).toBe(initialMonth - 1);
        expect(element.currentYear).toBe(initialYear);
      }
    });

    it('should navigate months correctly at year boundaries', () => {
      // Test December to January
      element.currentMonth = 11;
      element.currentYear = 2024;
      element.nextMonth();
      expect(element.currentMonth).toBe(0);
      expect(element.currentYear).toBe(2025);
      
      // Test January to December
      element.previousMonth();
      expect(element.currentMonth).toBe(11);
      expect(element.currentYear).toBe(2024);
    });
  });

  describe('Date Constraints', () => {
    it('should set min date', () => {
      const minDate = new Date(2025, 0, 1);
      element.min = minDate;
      expect(element.min).toEqual(minDate);
    });

    it('should set max date', () => {
      const maxDate = new Date(2025, 11, 31);
      element.max = maxDate;
      expect(element.max).toEqual(maxDate);
    });

    it('should set disabled dates', () => {
      const disabledDates = [
        new Date(2025, 8, 10),
        new Date(2025, 8, 11),
        new Date(2025, 8, 12)
      ];
      element.disabledDates = disabledDates;
      expect(element.disabledDates).toEqual(disabledDates);
    });

    it('should check if date is disabled', () => {
      element.disabledDates = [new Date(2025, 8, 15)];
      const isDisabled = element.isDateDisabled(new Date(2025, 8, 15));
      expect(isDisabled).toBe(true);
      
      const isEnabled = element.isDateDisabled(new Date(2025, 8, 16));
      expect(isEnabled).toBe(false);
    });

    it('should check if date is before min', () => {
      element.min = new Date(2025, 8, 10);
      const beforeMin = element.isDateDisabled(new Date(2025, 8, 5));
      expect(beforeMin).toBe(true);
      
      const afterMin = element.isDateDisabled(new Date(2025, 8, 15));
      expect(afterMin).toBe(false);
    });

    it('should check if date is after max', () => {
      element.max = new Date(2025, 8, 20);
      const afterMax = element.isDateDisabled(new Date(2025, 8, 25));
      expect(afterMax).toBe(true);
      
      const beforeMax = element.isDateDisabled(new Date(2025, 8, 15));
      expect(beforeMax).toBe(false);
    });
  });

  describe('Range Mode', () => {
    beforeEach(() => {
      element.rangeMode = true;
    });

    it('should enable range mode', () => {
      expect(element.rangeMode).toBe(true);
    });

    it('should track range start and end', () => {
      expect(element.rangeStart).toBeNull();
      expect(element.rangeEnd).toBeNull();
      
      element.rangeStart = new Date(2025, 8, 10);
      expect(element.rangeStart).toEqual(new Date(2025, 8, 10));
      
      element.rangeEnd = new Date(2025, 8, 20);
      expect(element.rangeEnd).toEqual(new Date(2025, 8, 20));
    });

    it('should set and get range', () => {
      const range = {
        start: new Date(2025, 8, 10),
        end: new Date(2025, 8, 20)
      };
      
      element.range = range;
      expect(element.range).toEqual(range);
      expect(element.rangeStart).toEqual(range.start);
      expect(element.rangeEnd).toEqual(range.end);
    });

    it('should clear range', () => {
      element.range = {
        start: new Date(2025, 8, 10),
        end: new Date(2025, 8, 20)
      };
      
      element.range = null;
      expect(element.range).toBeNull();
      expect(element.rangeStart).toBeNull();
      expect(element.rangeEnd).toBeNull();
    });

    it('should check if date is in range', () => {
      element.rangeStart = new Date(2025, 8, 10);
      element.rangeEnd = new Date(2025, 8, 20);
      
      const inRange = element.isDateInRange(new Date(2025, 8, 15));
      expect(inRange).toBe(true);
      
      const outOfRange = element.isDateInRange(new Date(2025, 8, 5));
      expect(outOfRange).toBe(false);
    });
  });

  describe('Date Formatting', () => {
    it('should format date with default format', () => {
      const date = new Date(2025, 8, 15);
      const formatted = element.formatDate(date);
      expect(formatted).toBe('09/15/2025');
    });

    it('should format date with DD/MM/YYYY', () => {
      element.format = 'DD/MM/YYYY';
      const date = new Date(2025, 8, 15);
      const formatted = element.formatDate(date);
      expect(formatted).toBe('15/09/2025');
    });

    it('should format date with YYYY-MM-DD', () => {
      element.format = 'YYYY-MM-DD';
      const date = new Date(2025, 8, 15);
      const formatted = element.formatDate(date);
      expect(formatted).toBe('2025-09-15');
    });

    it('should parse date from string', () => {
      const parsed = element.parseDate('09/15/2025');
      expect(parsed).toBeDefined();
      expect(parsed?.getMonth()).toBe(8);
      expect(parsed?.getDate()).toBe(15);
      expect(parsed?.getFullYear()).toBe(2025);
    });

    it('should return null for invalid date string', () => {
      const parsed = element.parseDate('invalid date');
      expect(parsed).toBeNull();
    });
  });

  describe('Month Names and Weekdays', () => {
    it('should get month name', () => {
      const monthName = element.getMonthName(0);
      expect(monthName).toContain('January');
    });

    it('should get month name in different locale', () => {
      element.locale = 'fr-FR';
      const monthName = element.getMonthName(0);
      expect(monthName.toLowerCase()).toContain('janvier');
    });

    it('should get weekday names', () => {
      const weekdays = element.getWeekdayNames();
      expect(weekdays).toHaveLength(7);
      expect(weekdays[0]).toContain('S'); // Sunday
      expect(weekdays[6]).toContain('S'); // Saturday
    });

    it('should get weekday names starting Monday', () => {
      element.weekStartMonday = true;
      const weekdays = element.getWeekdayNames();
      expect(weekdays).toHaveLength(7);
      expect(weekdays[0]).toContain('M'); // Monday
      expect(weekdays[6]).toContain('S'); // Sunday
    });
  });

  describe('Calendar Days', () => {
    it('should get days in month', () => {
      const days = element.getDaysInMonth(8, 2025); // September 2025
      expect(days).toBe(30);
    });

    it('should handle leap year', () => {
      const daysInFeb2024 = element.getDaysInMonth(1, 2024); // Leap year
      expect(daysInFeb2024).toBe(29);
      
      const daysInFeb2025 = element.getDaysInMonth(1, 2025); // Non-leap year
      expect(daysInFeb2025).toBe(28);
    });

    it('should get first day of month', () => {
      const firstDay = element.getFirstDayOfMonth(8, 2025); // September 2025
      expect(firstDay).toBeGreaterThanOrEqual(0);
      expect(firstDay).toBeLessThanOrEqual(6);
    });

    it('should generate calendar days array', () => {
      const days = element.getCalendarDays();
      expect(days).toBeDefined();
      expect(Array.isArray(days)).toBe(true);
      expect(days.length).toBeGreaterThan(0);
    });

    it('should check if date is today', () => {
      const today = new Date();
      const isToday = element.isToday(today);
      expect(isToday).toBe(true);
      
      const notToday = new Date(2024, 0, 1); // January 1, 2024 - definitely not today
      const isNotToday = element.isToday(notToday);
      expect(isNotToday).toBe(false);
    });

    it('should check if date is selected', () => {
      element.value = new Date(2025, 8, 15);
      const isSelected = element.isSelected(new Date(2025, 8, 15));
      expect(isSelected).toBe(true);
      
      const notSelected = element.isSelected(new Date(2025, 8, 16));
      expect(notSelected).toBe(false);
    });
  });

  describe('Date Selection', () => {
    it('should select date', () => {
      const date = new Date(2025, 8, 15);
      element.selectDate(date);
      expect(element.value).toEqual(date);
    });

    it('should not select disabled date', () => {
      element.disabledDates = [new Date(2025, 8, 15)];
      element.selectDate(new Date(2025, 8, 15));
      expect(element.value).toBeNull();
    });

    it('should close calendar after selection', () => {
      element.isOpen = true;
      element.selectDate(new Date(2025, 8, 15));
      expect(element.isOpen).toBe(false);
    });

    it('should clear value', () => {
      element.value = new Date(2025, 8, 15);
      element.clear();
      expect(element.value).toBeNull();
    });

    it('should select today', () => {
      element.selectToday();
      const today = new Date();
      expect(element.value?.getDate()).toBe(today.getDate());
      expect(element.value?.getMonth()).toBe(today.getMonth());
      expect(element.value?.getFullYear()).toBe(today.getFullYear());
    });
  });

  describe('Public Methods', () => {
    it('should open calendar', () => {
      element.open();
      expect(element.isOpen).toBe(true);
    });

    it('should close calendar', () => {
      element.isOpen = true;
      element.close();
      expect(element.isOpen).toBe(false);
    });

    it('should toggle calendar', () => {
      element.toggle();
      expect(element.isOpen).toBe(true);
      element.toggle();
      expect(element.isOpen).toBe(false);
    });

    it('should not open when disabled', () => {
      element.disabled = true;
      element.open();
      expect(element.isOpen).toBe(false);
    });
  });

  describe('Rendering', () => {
    it('should render', async () => {
      await element.updateComplete;
      expect(element.shadowRoot).toBeDefined();
    });

    it('should render within performance budget', async () => {
      const startTime = performance.now();
      await element.updateComplete;
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100);
    });
  });

  describe('AI Metadata', () => {
    it('should have AI metadata', () => {
      const aiState = element.aiState;
      expect(aiState).toBeDefined();
      expect(aiState.metadata.purpose).toBe('Date selection with calendar interface');
      expect(aiState.metadata.dataType).toBe('date');
      expect(aiState.metadata.criticality).toBe('medium');
    });

    it('should provide possible actions', () => {
      const actions = element.getPossibleActions();
      expect(actions).toBeDefined();
      expect(Array.isArray(actions)).toBe(true);
      expect(actions.length).toBeGreaterThan(0);
      
      const actionNames = actions.map(a => a.name);
      expect(actionNames).toContain('toggle');
      expect(actionNames).toContain('clear');
      expect(actionNames).toContain('selectToday');
    });

    it('should explain state when no date selected', () => {
      const explanation = element.explainState();
      expect(explanation.currentState).toBe('empty');
      expect(explanation.stateDescription).toContain('No date selected');
    });

    it('should explain state when date selected', () => {
      element.value = new Date(2025, 8, 15);
      const explanation = element.explainState();
      expect(explanation.currentState).toBe('selected');
      expect(explanation.stateDescription).toContain('09/15/2025');
    });

    it('should explain state when calendar open', () => {
      element.isOpen = true;
      const explanation = element.explainState();
      expect(explanation.currentState).toBe('open');
      expect(explanation.stateDescription).toContain('open');
    });

    it('should explain state when disabled', () => {
      element.disabled = true;
      const explanation = element.explainState();
      expect(explanation.currentState).toBe('disabled');
    });

    it('should provide visual indicators', () => {
      element.value = new Date(2025, 8, 15);
      const explanation = element.explainState();
      expect(explanation.visualIndicators).toBeDefined();
      expect(explanation.visualIndicators?.some(v => v.includes('selected'))).toBe(true);
    });
  });

  describe('Events', () => {
    it('should handle input change', async () => {
      const input = element.shadowRoot?.querySelector('.date-picker__input') as HTMLInputElement;
      if (input) {
        input.value = '09/15/2025';
        input.dispatchEvent(new Event('change'));
        await element.updateComplete;
        
        expect(element.value).toBeDefined();
        expect(element.value?.getMonth()).toBe(8);
        expect(element.value?.getDate()).toBe(15);
      }
    });

    it('should handle invalid input', async () => {
      const input = element.shadowRoot?.querySelector('.date-picker__input') as HTMLInputElement;
      if (input) {
        input.value = 'invalid';
        input.dispatchEvent(new Event('change'));
        await element.updateComplete;
        
        expect(element.value).toBeNull();
      }
    });
  });
});