import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIMetadata, AIAction, AIStateExplanation } from '../../../core/ai-metadata.types';
import '../../atoms/button/button';
import { ForgeIcon } from '../../atoms/icon/icon';
import '../../atoms/input/input';

// Register required icons
ForgeIcon.registerIcon('calendar', '<path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>');
ForgeIcon.registerIcon('chevron-left', '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>');
ForgeIcon.registerIcon('chevron-right', '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>');

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

@customElement('forge-date-picker')
export class ForgeDatePicker extends BaseElement {
  static override styles = css`
    ${BaseElement.styles}
    
    :host {
      display: inline-block;
      position: relative;
      width: 100%;
      max-width: 300px;
    }

    .date-picker {
      position: relative;
    }

    .date-picker__input-wrapper {
      position: relative;
    }

    .date-picker__icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: var(--forge-text-muted, #6b7280);
    }

    .date-picker__clear {
      position: absolute;
      right: 36px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 50%;
      color: var(--forge-text-muted, #6b7280);
      transition: all 0.2s ease;
    }

    .date-picker__clear:hover {
      background: var(--forge-hover-bg, #f3f4f6);
      color: var(--forge-text-color, #374151);
    }

    .date-picker__calendar {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      z-index: 1000;
      background: var(--forge-bg-color, #ffffff);
      border: 1px solid var(--forge-border-color, #d1d5db);
      border-radius: 8px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.2s ease;
      padding: 16px;
      min-width: 300px;
    }

    .date-picker__calendar[data-open="true"] {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .calendar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .calendar__nav {
      display: flex;
      gap: 8px;
    }

    .calendar__nav-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 6px;
      color: var(--forge-text-color, #374151);
      transition: all 0.2s ease;
    }

    .calendar__nav-button:hover:not(:disabled) {
      background: var(--forge-hover-bg, #f3f4f6);
    }

    .calendar__nav-button:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .calendar__month-year {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 16px;
    }

    .calendar__month-select,
    .calendar__year-select {
      padding: 4px 8px;
      border: 1px solid var(--forge-border-color, #d1d5db);
      border-radius: 4px;
      background: var(--forge-bg-color, #ffffff);
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease;
    }

    .calendar__month-select:hover,
    .calendar__year-select:hover {
      border-color: var(--forge-primary-color, #3b82f6);
    }

    .calendar__month-select:focus,
    .calendar__year-select:focus {
      outline: none;
      border-color: var(--forge-primary-color, #3b82f6);
      box-shadow: 0 0 0 3px var(--forge-primary-alpha, rgba(59, 130, 246, 0.1));
    }

    .calendar__weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      margin-bottom: 8px;
    }

    .calendar__weekday {
      padding: 8px 0;
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      color: var(--forge-text-muted, #6b7280);
      text-transform: uppercase;
    }

    .calendar__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .calendar__day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 6px;
      font-size: 14px;
      color: var(--forge-text-color, #374151);
      transition: all 0.2s ease;
      position: relative;
    }

    .calendar__day:hover:not(:disabled):not(.calendar__day--selected) {
      background: var(--forge-hover-bg, #f3f4f6);
    }

    .calendar__day:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .calendar__day--other-month {
      color: var(--forge-text-muted, #9ca3af);
    }

    .calendar__day--today {
      font-weight: 600;
      color: var(--forge-primary-color, #3b82f6);
    }

    .calendar__day--today::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--forge-primary-color, #3b82f6);
    }

    .calendar__day--selected {
      background: var(--forge-primary-color, #3b82f6);
      color: white;
    }

    .calendar__day--in-range {
      background: var(--forge-primary-alpha, rgba(59, 130, 246, 0.1));
    }

    .calendar__day--range-start {
      background: var(--forge-primary-color, #3b82f6);
      color: white;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .calendar__day--range-end {
      background: var(--forge-primary-color, #3b82f6);
      color: white;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .calendar__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--forge-border-color, #e5e7eb);
    }

    .calendar__today-button {
      padding: 6px 12px;
      border: 1px solid var(--forge-border-color, #d1d5db);
      border-radius: 6px;
      background: transparent;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease;
    }

    .calendar__today-button:hover {
      background: var(--forge-hover-bg, #f3f4f6);
    }

    .calendar__range-info {
      font-size: 12px;
      color: var(--forge-text-muted, #6b7280);
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
  `;

  @property({ type: Object, attribute: false }) value: Date | null = null;
  @property({ type: Object, attribute: false }) range: DateRange | null = null;
  @property({ type: String }) placeholder = 'Select date';
  @property({ type: String }) format = 'MM/DD/YYYY';
  @property({ type: String }) locale = 'en-US';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: 'range-mode' }) rangeMode = false;
  @property({ type: Boolean, attribute: 'clear-button' }) clearButton = true;
  @property({ type: Object, attribute: false }) min: Date | null = null;
  @property({ type: Object, attribute: false }) max: Date | null = null;
  @property({ type: Array, attribute: false }) disabledDates: Date[] = [];
  @property({ type: Boolean, attribute: 'week-start-monday' }) weekStartMonday = false;

  @state() isOpen = false;  // Make public for testing
  @state() currentMonth: number = new Date().getMonth();  // Make public for testing
  @state() currentYear: number = new Date().getFullYear();  // Make public for testing
  @state() private hoverDate: Date | null = null;
  @state() rangeStart: Date | null = null;  // Make public for testing
  @state() rangeEnd: Date | null = null;  // Make public for testing
  @state() private selectingRangeEnd = false;

  protected aiMetadata: AIMetadata = {
    purpose: 'Date selection with calendar interface',
    dataType: 'date',
    criticality: 'medium',
    semanticRole: 'date-picker',
    interactions: [
      {
        type: 'click',
        description: 'Open calendar',
        outcome: 'Shows calendar for date selection'
      },
      {
        type: 'select',
        description: 'Select date',
        outcome: 'Sets selected date value'
      },
      {
        type: 'keyboard',
        description: 'Navigate calendar',
        shortcuts: ['ArrowKeys', 'Enter', 'Escape']
      }
    ]
  };

  private monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  private weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor() {
    super();
    if (this.weekStartMonday) {
      this.weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('click', this.handleDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('click', this.handleDocumentClick);
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('value')) {
      this.updateComponentState('hasValue', this.value !== null);
      this.emit('forge-change', { value: this.value });
    }

    if (changedProperties.has('range')) {
      this.updateComponentState('hasRange', this.range !== null);
      this.emit('forge-change', { range: this.range });
    }
  }

  private toggleCalendar(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    this.updateComponentState('isOpen', this.isOpen);
  }

  private closeCalendar(): void {
    this.isOpen = false;
    this.updateComponentState('isOpen', false);
  }

  private handleDocumentClick = (e: MouseEvent): void => {
    if (!this.contains(e.target as Node)) {
      this.closeCalendar();
    }
  };

  private handleKeydown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this.closeCalendar();
        break;
      case 'Enter':
        e.preventDefault();
        if (!this.isOpen) {
          this.toggleCalendar();
        }
        break;
    }
  };

  private formatDate(date: Date | null): string {
    if (!date) return '';
    
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    return this.format
      .replace('MM', month)
      .replace('DD', day)
      .replace('YYYY', String(year));
  }

  private selectDate(date: Date): void {
    if (this.isDateDisabled(date)) return;

    if (this.rangeMode) {
      if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
        this.rangeStart = date;
        this.rangeEnd = null;
        this.selectingRangeEnd = true;
      } else {
        if (date < this.rangeStart) {
          this.rangeEnd = this.rangeStart;
          this.rangeStart = date;
        } else {
          this.rangeEnd = date;
        }
        this.selectingRangeEnd = false;
        this.range = { start: this.rangeStart, end: this.rangeEnd };
      }
    } else {
      this.value = date;
      this.closeCalendar();
    }
  }

  private clearValue(): void {
    if (this.rangeMode) {
      this.range = null;
      this.rangeStart = null;
      this.rangeEnd = null;
    } else {
      this.value = null;
    }
  }

  private goToToday(): void {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  private previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  private nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  private isDateDisabled(date: Date): boolean {
    if (this.min && date < this.min) return true;
    if (this.max && date > this.max) return true;
    
    return this.disabledDates.some(disabled => 
      disabled.getDate() === date.getDate() &&
      disabled.getMonth() === date.getMonth() &&
      disabled.getFullYear() === date.getFullYear()
    );
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  private isSelected(date: Date): boolean {
    if (this.rangeMode) {
      return (this.rangeStart?.getTime() === date.getTime()) ||
             (this.rangeEnd?.getTime() === date.getTime());
    }
    return this.value?.getTime() === date.getTime();
  }

  private isInRange(date: Date): boolean {
    if (!this.rangeMode || !this.rangeStart) return false;
    
    if (this.rangeEnd) {
      return date > this.rangeStart && date < this.rangeEnd;
    }
    
    if (this.hoverDate && this.selectingRangeEnd) {
      const end = this.hoverDate > this.rangeStart ? this.hoverDate : this.rangeStart;
      const start = this.hoverDate < this.rangeStart ? this.hoverDate : this.rangeStart;
      return date > start && date < end;
    }
    
    return false;
  }

  private getDaysInMonth(): Date[] {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const days: Date[] = [];
    
    // Get start day of week (0 = Sunday, 1 = Monday, etc.)
    let startDayOfWeek = firstDay.getDay();
    if (this.weekStartMonday) {
      startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    }
    
    // Add days from previous month
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(this.currentYear, this.currentMonth - 1, prevMonthLastDay - i));
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(this.currentYear, this.currentMonth, i));
    }
    
    // Add days from next month to complete the grid
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(this.currentYear, this.currentMonth + 1, i));
    }
    
    return days;
  }

  private renderCalendarDay(date: Date) {
    const isOtherMonth = date.getMonth() !== this.currentMonth;
    const isDisabled = this.isDateDisabled(date);
    const isToday = this.isToday(date);
    const isSelected = this.isSelected(date);
    const isInRange = this.isInRange(date);
    const isRangeStart = this.rangeStart?.getTime() === date.getTime();
    const isRangeEnd = this.rangeEnd?.getTime() === date.getTime();
    
    const classes = ['calendar__day'];
    if (isOtherMonth) classes.push('calendar__day--other-month');
    if (isToday) classes.push('calendar__day--today');
    if (isSelected) classes.push('calendar__day--selected');
    if (isInRange) classes.push('calendar__day--in-range');
    if (isRangeStart) classes.push('calendar__day--range-start');
    if (isRangeEnd) classes.push('calendar__day--range-end');
    
    return html`
      <button
        class=${classes.join(' ')}
        ?disabled=${isDisabled || isOtherMonth}
        @click=${() => !isOtherMonth && this.selectDate(date)}
        @mouseenter=${() => this.hoverDate = date}
        @mouseleave=${() => this.hoverDate = null}
        aria-label=${date.toLocaleDateString(this.locale)}
      >
        ${date.getDate()}
      </button>
    `;
  }

  protected render() {
    const startTime = performance.now();
    
    const inputValue = this.rangeMode && this.range
      ? `${this.formatDate(this.range.start)} - ${this.formatDate(this.range.end)}`
      : this.formatDate(this.value);

    const content = html`
      <div class="date-picker">
        <div class="date-picker__input-wrapper">
          <forge-input
            .type=${'text'}
            .value=${inputValue}
            .placeholder=${this.placeholder}
            .disabled=${this.disabled}
            .readonly=${true}
            @click=${this.toggleCalendar}
          ></forge-input>
          ${this.clearButton && (this.value || this.range) ? html`
            <button
              class="date-picker__clear"
              @click=${(e: Event) => { e.stopPropagation(); this.clearValue(); }}
              aria-label="Clear date"
            >
              ×
            </button>
          ` : ''}
          <forge-icon
            class="date-picker__icon"
            .name=${'calendar'}
            .size=${'small'}
          ></forge-icon>
        </div>

        <div
          class="date-picker__calendar"
          data-open=${this.isOpen}
          role="dialog"
          aria-label="Calendar"
        >
          <div class="calendar__header">
            <div class="calendar__nav">
              <button
                class="calendar__nav-button"
                @click=${this.previousMonth}
                aria-label="Previous month"
              >
                <forge-icon .name=${'chevron-left'} .size=${'small'}></forge-icon>
              </button>
            </div>
            
            <div class="calendar__month-year">
              <select
                class="calendar__month-select"
                .value=${String(this.currentMonth)}
                @change=${(e: Event) => {
                  this.currentMonth = parseInt((e.target as HTMLSelectElement).value);
                }}
              >
                ${this.monthNames.map((month, index) => html`
                  <option value=${index}>${month}</option>
                `)}
              </select>
              
              <select
                class="calendar__year-select"
                .value=${String(this.currentYear)}
                @change=${(e: Event) => {
                  this.currentYear = parseInt((e.target as HTMLSelectElement).value);
                }}
              >
                ${Array.from({ length: 20 }, (_, i) => this.currentYear - 10 + i).map(year => html`
                  <option value=${year}>${year}</option>
                `)}
              </select>
            </div>
            
            <div class="calendar__nav">
              <button
                class="calendar__nav-button"
                @click=${this.nextMonth}
                aria-label="Next month"
              >
                <forge-icon .name=${'chevron-right'} .size=${'small'}></forge-icon>
              </button>
            </div>
          </div>

          <div class="calendar__weekdays">
            ${this.weekdayNames.map(day => html`
              <div class="calendar__weekday">${day}</div>
            `)}
          </div>

          <div class="calendar__days">
            ${this.getDaysInMonth().map(date => this.renderCalendarDay(date))}
          </div>

          <div class="calendar__footer">
            <button
              class="calendar__today-button"
              @click=${this.goToToday}
            >
              Today
            </button>
            ${this.rangeMode ? html`
              <span class="calendar__range-info">
                ${this.rangeStart && !this.rangeEnd ? 'Select end date' : ''}
              </span>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    this.checkPerformance(startTime);
    return content;
  }

  getPossibleActions(): AIAction[] {
    return [
      {
        name: 'toggle',
        description: 'Toggle calendar open/closed',
        available: !this.disabled,
        result: 'Calendar visibility changes'
      },
      {
        name: 'selectDate',
        description: 'Select a specific date',
        available: !this.disabled && this.isOpen,
        parameters: [
          {
            name: 'date',
            type: 'date',
            required: true,
            description: 'Date to select'
          }
        ],
        result: 'Date is selected'
      },
      {
        name: 'clear',
        description: 'Clear selected date',
        available: !this.disabled && (this.value !== null || this.range !== null),
        result: 'Date selection cleared'
      },
      {
        name: 'goToToday',
        description: 'Navigate to current month',
        available: !this.disabled && this.isOpen,
        result: 'Calendar shows current month'
      }
    ];
  }

  explainState(): AIStateExplanation {
    const states = ['closed', 'open', 'selecting', 'selected'];
    let currentState = 'closed';
    
    if (this.isOpen) {
      currentState = this.rangeMode && this.selectingRangeEnd ? 'selecting' : 'open';
    } else if (this.value || this.range) {
      currentState = 'selected';
    }

    const description = this.rangeMode
      ? `Date range picker is ${currentState}. ${this.range ? 'Range selected' : 'No range selected'}.`
      : `Date picker is ${currentState}. ${this.value ? `Selected: ${this.formatDate(this.value)}` : 'No date selected'}.`;

    return {
      currentState,
      possibleStates: states,
      stateDescription: description,
      transitions: [
        {
          from: 'closed',
          to: 'open',
          trigger: 'Click input or press Enter'
        },
        {
          from: 'open',
          to: 'selected',
          trigger: 'Click on a date'
        },
        {
          from: 'open',
          to: 'closed',
          trigger: 'Click outside or press Escape'
        }
      ],
      visualIndicators: [
        this.isOpen ? 'Calendar visible' : 'Calendar hidden',
        this.value ? `Date selected: ${this.formatDate(this.value)}` : 'No date selected'
      ]
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-date-picker': ForgeDatePicker;
  }
}