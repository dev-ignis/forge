# ForgeCalendar Implementation Plan

## Overview

ForgeCalendar is a comprehensive calendar component that provides multiple view modes, event management, drag & drop functionality, and full internationalization support. This plan outlines the detailed implementation approach for creating an enterprise-grade calendar solution.

**Duration**: 2 weeks  
**Complexity**: High  
**Priority**: Medium

## 🎯 Features

### Core Features
- **Multiple Views**: Month, week, day, agenda views with smooth transitions
- **Event Management**: Create, edit, delete, and view events with rich metadata
- **Drag & Drop**: Intuitive event movement between dates and times
- **Time Zones**: Multi-timezone support with automatic conversion
- **Internationalization**: Multiple languages, locales, and calendar systems
- **Recurring Events**: Support for complex recurring patterns (daily, weekly, monthly, yearly)

### Advanced Features
- **Event Categories**: Color-coded event categorization
- **All-Day Events**: Full-day event support with proper positioning
- **Event Overlapping**: Smart overlap detection and visual arrangement
- **Custom Event Renderers**: Pluggable event rendering system
- **External Calendars**: Integration with external calendar sources
- **Keyboard Navigation**: Full keyboard accessibility

## 🏗️ Architecture

### Component Structure

```typescript
interface ForgeCalendar extends BaseElement {
  // View Configuration
  view: CalendarView;
  defaultDate: Date;
  minDate?: Date;
  maxDate?: Date;
  
  // Events
  events: CalendarEvent[];
  eventSources: EventSource[];
  
  // Features
  editable: boolean;
  selectable: boolean;
  dragAndDrop: boolean;
  showWeekNumbers: boolean;
  
  // Internationalization
  locale: string;
  timeZone: string;
  firstDayOfWeek: DayOfWeek;
  
  // Styling
  eventColor: string;
  todayColor: string;
  weekendColor: string;
  
  // Callbacks
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onEventDrop?: (info: EventDropInfo) => void;
  onEventResize?: (info: EventResizeInfo) => void;
  onViewChange?: (view: CalendarView, date: Date) => void;
}

type CalendarView = 'month' | 'week' | 'day' | 'agenda' | 'year';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  recurring?: RecurringPattern;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  category?: string;
  description?: string;
  location?: string;
  attendees?: EventAttendee[];
  metadata?: Record<string, unknown>;
  editable?: boolean;
  deletable?: boolean;
  resizable?: boolean;
}

interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  until?: Date;
  count?: number;
  byDay?: DayOfWeek[];
  byMonthDay?: number[];
  byMonth?: number[];
  exceptions?: Date[];
}

interface EventSource {
  id: string;
  url?: string;
  events?: CalendarEvent[];
  color?: string;
  editable?: boolean;
  format?: 'ics' | 'json' | 'gcal';
}
```

### Core Classes

```typescript
export class CalendarEngine {
  private currentDate: Date;
  private currentView: CalendarView;
  private events: Map<string, CalendarEvent>;
  private timezone: string;

  constructor(options: CalendarOptions) {
    this.currentDate = options.defaultDate || new Date();
    this.currentView = options.view || 'month';
    this.events = new Map();
    this.timezone = options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  // View management
  setView(view: CalendarView, date?: Date): void;
  getViewDates(): { start: Date; end: Date };
  navigateNext(): void;
  navigatePrevious(): void;
  navigateToday(): void;

  // Event management
  addEvent(event: CalendarEvent): void;
  updateEvent(id: string, updates: Partial<CalendarEvent>): void;
  removeEvent(id: string): void;
  getEventsInRange(start: Date, end: Date): CalendarEvent[];
  
  // Recurring event expansion
  expandRecurringEvents(pattern: RecurringPattern, start: Date, end: Date): CalendarEvent[];
}

export class EventRenderer {
  private container: HTMLElement;
  private view: CalendarView;

  constructor(container: HTMLElement, view: CalendarView) {
    this.container = container;
    this.view = view;
  }

  renderEvents(events: CalendarEvent[], viewDates: ViewDates): void;
  renderEvent(event: CalendarEvent, position: EventPosition): HTMLElement;
  calculateEventPosition(event: CalendarEvent, viewDates: ViewDates): EventPosition;
  handleEventOverlap(events: CalendarEvent[]): EventLayout[];
}

export class DragDropManager {
  private calendar: ForgeCalendar;
  private draggedEvent: CalendarEvent | null = null;
  private dropZones: Map<string, DropZone>;

  constructor(calendar: ForgeCalendar) {
    this.calendar = calendar;
    this.dropZones = new Map();
    this.setupDragHandlers();
  }

  enableEventDragging(eventElement: HTMLElement, event: CalendarEvent): void;
  createDropZones(viewDates: ViewDates): void;
  handleDrop(dropZone: DropZone, event: CalendarEvent): void;
}
```

## 📁 File Structure

```
src/components/organisms/calendar/
├── calendar.ts                 # Main ForgeCalendar component
├── calendar.test.ts           # Comprehensive tests
├── calendar.stories.ts        # Storybook stories
├── calendar.scss             # Calendar-specific styles
│
├── core/
│   ├── calendar-engine.ts    # Core calendar logic
│   ├── event-renderer.ts     # Event rendering system
│   ├── drag-drop-manager.ts  # Drag & drop functionality
│   ├── timezone-manager.ts   # Timezone handling
│   └── recurring-events.ts   # Recurring event logic
│
├── views/
│   ├── month-view.ts         # Month grid view
│   ├── week-view.ts          # Week timeline view
│   ├── day-view.ts           # Single day detailed view
│   ├── agenda-view.ts        # List-based agenda view
│   └── year-view.ts          # Year overview
│
├── components/
│   ├── calendar-header.ts    # Navigation header
│   ├── calendar-toolbar.ts   # View switcher & controls
│   ├── event-popover.ts      # Event details popup
│   ├── date-picker.ts        # Date selection component
│   └── time-picker.ts        # Time selection component
│
├── utils/
│   ├── date-utils.ts         # Date manipulation utilities
│   ├── locale-utils.ts       # Internationalization helpers
│   ├── event-utils.ts        # Event processing utilities
│   └── validation.ts         # Input validation
│
└── types/
    ├── calendar.types.ts     # Core interfaces
    ├── event.types.ts        # Event-related types
    └── view.types.ts         # View-specific types
```

## 🚀 Implementation Timeline

### Week 1: Foundation & Core Views

#### Day 1-2: Core Architecture
```typescript
// calendar.ts - Main component setup
export class ForgeCalendar extends BaseElement {
  @property({ type: String }) view: CalendarView = 'month';
  @property({ type: Object }) defaultDate: Date = new Date();
  @property({ type: Array }) events: CalendarEvent[] = [];
  @property({ type: Boolean }) editable = true;
  @property({ type: Boolean }) selectable = true;
  @property({ type: String }) locale = 'en-US';
  @property({ type: String }) timeZone = 'auto';

  private engine: CalendarEngine;
  private renderer: EventRenderer;

  constructor() {
    super();
    this.aiMetadata = {
      purpose: 'Interactive calendar for event management and scheduling',
      context: 'Displays and manages calendar events with multiple view modes',
      dataType: 'datetime',
      criticality: 'high',
      semanticRole: 'calendar-widget'
    };
  }

  protected firstUpdated() {
    this.engine = new CalendarEngine({
      defaultDate: this.defaultDate,
      view: this.view,
      timeZone: this.timeZone,
      locale: this.locale
    });
    
    this.renderer = new EventRenderer(
      this.shadowRoot!.querySelector('.calendar-grid')!,
      this.view
    );
    
    this.loadEvents();
    this.renderCalendar();
  }
}
```

#### Day 3-4: Month View Implementation
```typescript
// views/month-view.ts
export class MonthView {
  private container: HTMLElement;
  private engine: CalendarEngine;

  render(): TemplateResult {
    const monthStart = this.engine.getViewDates().start;
    const monthEnd = this.engine.getViewDates().end;
    const weeks = this.generateWeeks(monthStart, monthEnd);
    
    return html`
      <div class="month-grid">
        ${this.renderHeader()}
        ${weeks.map(week => this.renderWeek(week))}
      </div>
    `;
  }

  private renderWeek(week: Date[]): TemplateResult {
    return html`
      <div class="week-row">
        ${week.map(date => this.renderDay(date))}
      </div>
    `;
  }

  private renderDay(date: Date): TemplateResult {
    const events = this.engine.getEventsForDate(date);
    const isToday = this.isToday(date);
    const isCurrentMonth = this.isCurrentMonth(date);
    
    return html`
      <div 
        class="day-cell ${classMap({
          'today': isToday,
          'other-month': !isCurrentMonth,
          'has-events': events.length > 0
        })}"
        @click=${() => this.handleDateClick(date)}
        data-date=${date.toISOString().split('T')[0]}
      >
        <div class="day-number">${date.getDate()}</div>
        <div class="events-container">
          ${events.map(event => this.renderEventBadge(event))}
        </div>
      </div>
    `;
  }
}
```

#### Day 5: Week View Implementation
```typescript
// views/week-view.ts
export class WeekView {
  private timeSlots: TimeSlot[];
  private allDaySection: HTMLElement;

  render(): TemplateResult {
    const weekStart = this.engine.getViewDates().start;
    const weekDays = this.generateWeekDays(weekStart);
    
    return html`
      <div class="week-view">
        ${this.renderAllDaySection(weekDays)}
        ${this.renderTimeGrid(weekDays)}
      </div>
    `;
  }

  private renderTimeGrid(days: Date[]): TemplateResult {
    return html`
      <div class="time-grid">
        <div class="time-labels">
          ${this.timeSlots.map(slot => html`
            <div class="time-label">${this.formatTime(slot.start)}</div>
          `)}
        </div>
        <div class="days-container">
          ${days.map(day => this.renderDayColumn(day))}
        </div>
      </div>
    `;
  }

  private renderDayColumn(day: Date): TemplateResult {
    const dayEvents = this.engine.getEventsForDate(day)
      .filter(event => !event.allDay);
    
    return html`
      <div class="day-column" data-date=${day.toISOString()}>
        ${this.timeSlots.map(slot => html`
          <div 
            class="time-slot"
            @click=${() => this.handleTimeSlotClick(day, slot)}
            @drop=${this.handleEventDrop}
            @dragover=${this.handleDragOver}
          ></div>
        `)}
        ${dayEvents.map(event => this.renderTimedEvent(event))}
      </div>
    `;
  }
}
```

### Week 2: Advanced Features & Polish

#### Day 6-7: Event Management & Drag/Drop
```typescript
// core/drag-drop-manager.ts
export class DragDropManager {
  private activeElement: HTMLElement | null = null;
  private dropIndicator: HTMLElement;

  enableDragDrop(): void {
    this.calendar.addEventListener('dragstart', this.handleDragStart.bind(this));
    this.calendar.addEventListener('dragover', this.handleDragOver.bind(this));
    this.calendar.addEventListener('drop', this.handleDrop.bind(this));
  }

  private handleDragStart(event: DragEvent): void {
    const eventElement = event.target as HTMLElement;
    const eventId = eventElement.dataset.eventId;
    const calendarEvent = this.calendar.getEvent(eventId!);
    
    if (!calendarEvent || !calendarEvent.editable) return;
    
    this.activeElement = eventElement;
    event.dataTransfer!.setData('text/calendar-event', eventId!);
    event.dataTransfer!.effectAllowed = 'move';
    
    // Create drag image
    const dragImage = this.createDragImage(calendarEvent);
    event.dataTransfer!.setDragImage(dragImage, 0, 0);
  }

  private handleDrop(event: DragEvent): void {
    event.preventDefault();
    const dropZone = event.target as HTMLElement;
    const eventId = event.dataTransfer!.getData('text/calendar-event');
    
    if (!eventId || !this.isValidDropZone(dropZone)) return;
    
    const newDate = this.extractDateFromDropZone(dropZone);
    const calendarEvent = this.calendar.getEvent(eventId);
    
    if (calendarEvent) {
      this.calendar.moveEvent(eventId, newDate);
      this.calendar.emit('event-drop', {
        event: calendarEvent,
        oldDate: calendarEvent.start,
        newDate,
        jsEvent: event
      });
    }
  }
}
```

#### Day 8-9: Recurring Events & Internationalization
```typescript
// core/recurring-events.ts
export class RecurringEventProcessor {
  expandRecurrence(event: CalendarEvent, viewStart: Date, viewEnd: Date): CalendarEvent[] {
    if (!event.recurring) return [event];
    
    const instances: CalendarEvent[] = [];
    const pattern = event.recurring;
    let currentDate = new Date(event.start);
    
    while (currentDate <= viewEnd && (!pattern.until || currentDate <= pattern.until)) {
      if (currentDate >= viewStart && !this.isException(currentDate, pattern.exceptions)) {
        instances.push(this.createRecurringInstance(event, currentDate));
      }
      
      currentDate = this.getNextOccurrence(currentDate, pattern);
      
      if (pattern.count && instances.length >= pattern.count) break;
    }
    
    return instances;
  }

  private getNextOccurrence(date: Date, pattern: RecurringPattern): Date {
    const next = new Date(date);
    
    switch (pattern.frequency) {
      case 'daily':
        next.setDate(next.getDate() + pattern.interval);
        break;
      case 'weekly':
        next.setDate(next.getDate() + (7 * pattern.interval));
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + pattern.interval);
        break;
      case 'yearly':
        next.setFullYear(next.getFullYear() + pattern.interval);
        break;
    }
    
    return next;
  }
}

// utils/locale-utils.ts
export class LocaleManager {
  private locale: string;
  private timeZone: string;
  private translations: Map<string, Record<string, string>>;

  constructor(locale: string, timeZone: string) {
    this.locale = locale;
    this.timeZone = timeZone;
    this.translations = new Map();
    this.loadTranslations();
  }

  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(this.locale, {
      timeZone: this.timeZone,
      ...options
    }).format(date);
  }

  formatTime(date: Date): string {
    return this.formatDate(date, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: this.uses12HourFormat()
    });
  }

  getMonthNames(): string[] {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(2024, i, 1);
      months.push(this.formatDate(date, { month: 'long' }));
    }
    return months;
  }

  getDayNames(): string[] {
    const days = [];
    const startDate = new Date(2024, 0, 7); // Start with Sunday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(this.formatDate(date, { weekday: 'long' }));
    }
    
    return days;
  }
}
```

#### Day 10: Testing & Optimization
```typescript
// calendar.test.ts
describe('ForgeCalendar', () => {
  describe('View Navigation', () => {
    it('should navigate between months correctly', async () => {
      const calendar = await fixture<ForgeCalendar>(html`
        <forge-calendar view="month" .defaultDate=${new Date(2024, 5, 15)}></forge-calendar>
      `);
      
      const nextButton = calendar.shadowRoot!.querySelector('[data-action="next"]') as HTMLButtonElement;
      nextButton.click();
      await calendar.updateComplete;
      
      const headerTitle = calendar.shadowRoot!.querySelector('.calendar-title')!.textContent;
      expect(headerTitle).to.include('July 2024');
    });

    it('should switch between different views', async () => {
      const calendar = await fixture<ForgeCalendar>(html`
        <forge-calendar view="month"></forge-calendar>
      `);
      
      calendar.view = 'week';
      await calendar.updateComplete;
      
      const weekView = calendar.shadowRoot!.querySelector('.week-view');
      expect(weekView).to.exist;
    });
  });

  describe('Event Management', () => {
    it('should add and display events correctly', async () => {
      const events: CalendarEvent[] = [{
        id: 'test-1',
        title: 'Test Event',
        start: new Date(2024, 5, 15, 10, 0),
        end: new Date(2024, 5, 15, 11, 0)
      }];
      
      const calendar = await fixture<ForgeCalendar>(html`
        <forge-calendar .events=${events}></forge-calendar>
      `);
      
      const eventElement = calendar.shadowRoot!.querySelector('[data-event-id="test-1"]');
      expect(eventElement).to.exist;
      expect(eventElement!.textContent).to.include('Test Event');
    });

    it('should handle recurring events', async () => {
      const recurringEvent: CalendarEvent = {
        id: 'recurring-1',
        title: 'Daily Standup',
        start: new Date(2024, 5, 1, 9, 0),
        end: new Date(2024, 5, 1, 9, 30),
        recurring: {
          frequency: 'daily',
          interval: 1,
          count: 10
        }
      };
      
      const calendar = await fixture<ForgeCalendar>(html`
        <forge-calendar .events=${[recurringEvent]} view="month"></forge-calendar>
      `);
      
      const eventElements = calendar.shadowRoot!.querySelectorAll('[data-recurring-id="recurring-1"]');
      expect(eventElements.length).to.be.greaterThan(1);
    });
  });

  describe('Drag and Drop', () => {
    it('should move events when dragged', async () => {
      const calendar = await fixture<ForgeCalendar>(html`
        <forge-calendar drag-and-drop></forge-calendar>
      `);
      
      const event: CalendarEvent = {
        id: 'draggable-1',
        title: 'Draggable Event',
        start: new Date(2024, 5, 15),
        editable: true
      };
      
      calendar.addEvent(event);
      await calendar.updateComplete;
      
      const eventElement = calendar.shadowRoot!.querySelector('[data-event-id="draggable-1"]') as HTMLElement;
      const targetDate = calendar.shadowRoot!.querySelector('[data-date="2024-06-16"]') as HTMLElement;
      
      // Simulate drag and drop
      const dragEvent = new DragEvent('dragstart', { bubbles: true });
      eventElement.dispatchEvent(dragEvent);
      
      const dropEvent = new DragEvent('drop', { bubbles: true });
      targetDate.dispatchEvent(dropEvent);
      
      await calendar.updateComplete;
      
      const updatedEvent = calendar.getEvent('draggable-1');
      expect(updatedEvent.start.getDate()).to.equal(16);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', async () => {
      const calendar = await fixture<ForgeCalendar>(html`
        <forge-calendar></forge-calendar>
      `);
      
      expect(calendar.getAttribute('role')).to.equal('application');
      expect(calendar.getAttribute('aria-label')).to.include('Calendar');
      
      const monthGrid = calendar.shadowRoot!.querySelector('.month-grid');
      expect(monthGrid!.getAttribute('role')).to.equal('grid');
    });

    it('should support keyboard navigation', async () => {
      const calendar = await fixture<ForgeCalendar>(html`
        <forge-calendar></forge-calendar>
      `);
      
      const firstDate = calendar.shadowRoot!.querySelector('.day-cell[tabindex="0"]') as HTMLElement;
      firstDate.focus();
      
      // Simulate arrow key navigation
      const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      firstDate.dispatchEvent(arrowRightEvent);
      
      await calendar.updateComplete;
      
      const focusedElement = calendar.shadowRoot!.activeElement;
      expect(focusedElement).to.have.attribute('data-date');
    });
  });
});
```

## 🎨 Styling & Themes

```scss
// calendar.scss
:host {
  --calendar-bg: var(--color-surface-primary);
  --calendar-border: var(--color-border-subtle);
  --calendar-text: var(--color-text-primary);
  --calendar-text-muted: var(--color-text-secondary);
  --calendar-today-bg: var(--color-primary-50);
  --calendar-today-border: var(--color-primary-500);
  --calendar-weekend-bg: var(--color-neutral-25);
  --calendar-event-bg: var(--color-primary-500);
  --calendar-event-text: var(--color-white);
  --calendar-hover-bg: var(--color-surface-secondary);
  
  display: block;
  font-family: var(--font-family-base);
  background: var(--calendar-bg);
  border-radius: var(--radius-md);
  border: 1px solid var(--calendar-border);
  overflow: hidden;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--calendar-border);
  background: var(--color-surface-secondary);

  .calendar-title {
    font-size: var(--text-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--calendar-text);
    margin: 0;
  }

  .nav-buttons {
    display: flex;
    gap: var(--spacing-xs);

    button {
      padding: var(--spacing-xs);
      border: 1px solid var(--calendar-border);
      border-radius: var(--radius-sm);
      background: var(--color-white);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: var(--calendar-hover-bg);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}

.month-grid {
  display: grid;
  grid-template-rows: auto repeat(6, 1fr);

  .week-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background: var(--color-surface-secondary);

    .day-header {
      padding: var(--spacing-sm);
      text-align: center;
      font-weight: var(--font-weight-medium);
      color: var(--calendar-text-muted);
      border-right: 1px solid var(--calendar-border);

      &:last-child {
        border-right: none;
      }
    }
  }

  .week-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-bottom: 1px solid var(--calendar-border);

    &:last-child {
      border-bottom: none;
    }
  }

  .day-cell {
    min-height: 120px;
    padding: var(--spacing-xs);
    border-right: 1px solid var(--calendar-border);
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background: var(--calendar-hover-bg);
    }

    &.today {
      background: var(--calendar-today-bg);
      border: 2px solid var(--calendar-today-border);
    }

    &.other-month {
      color: var(--calendar-text-muted);
      background: var(--color-neutral-25);
    }

    &.weekend {
      background: var(--calendar-weekend-bg);
    }

    &:last-child {
      border-right: none;
    }

    .day-number {
      font-weight: var(--font-weight-medium);
      margin-bottom: var(--spacing-xs);
    }

    .events-container {
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow: hidden;
    }
  }
}

.event-badge {
  background: var(--calendar-event-bg);
  color: var(--calendar-event-text);
  padding: 2px var(--spacing-xs);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  &.all-day {
    background: var(--color-secondary-500);
  }

  &.dragging {
    opacity: 0.5;
    transform: rotate(2deg);
  }
}

.week-view, .day-view {
  display: grid;
  grid-template-rows: auto 1fr;

  .all-day-section {
    padding: var(--spacing-sm);
    border-bottom: 1px solid var(--calendar-border);
    background: var(--color-neutral-25);
    min-height: 60px;

    .all-day-events {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs);
    }
  }

  .time-grid {
    display: grid;
    grid-template-columns: 80px 1fr;
    overflow-y: auto;
    max-height: 600px;

    .time-labels {
      border-right: 1px solid var(--calendar-border);
      background: var(--color-surface-secondary);

      .time-label {
        height: 60px;
        padding: var(--spacing-xs);
        border-bottom: 1px solid var(--calendar-border);
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        font-size: var(--text-sm);
        color: var(--calendar-text-muted);
      }
    }

    .days-container {
      display: grid;
      position: relative;
    }

    .day-column {
      border-right: 1px solid var(--calendar-border);
      position: relative;

      &:last-child {
        border-right: none;
      }

      .time-slot {
        height: 60px;
        border-bottom: 1px solid var(--calendar-border);
        position: relative;
        cursor: pointer;

        &:hover {
          background: var(--calendar-hover-bg);
        }

        &.drop-zone-active {
          background: var(--calendar-today-bg);
          border: 2px dashed var(--calendar-today-border);
        }
      }
    }
  }
}

.timed-event {
  position: absolute;
  background: var(--calendar-event-bg);
  color: var(--calendar-event-text);
  border-radius: var(--radius-sm);
  padding: var(--spacing-xs);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 4px solid var(--calendar-event-bg);
  overflow: hidden;

  &:hover {
    transform: translateX(2px);
    box-shadow: var(--shadow-md);
  }

  &.dragging {
    opacity: 0.7;
    transform: rotate(1deg);
    z-index: 1000;
  }

  .event-time {
    font-weight: var(--font-weight-medium);
    margin-bottom: 2px;
  }

  .event-title {
    font-weight: var(--font-weight-medium);
    line-height: 1.2;
  }
}

// Responsive design
@media (max-width: 768px) {
  .month-grid .day-cell {
    min-height: 80px;
    padding: 4px;

    .day-number {
      font-size: var(--text-sm);
    }
  }

  .event-badge {
    font-size: 10px;
    padding: 1px 4px;
  }

  .week-view .time-grid {
    grid-template-columns: 60px 1fr;
  }

  .time-label {
    font-size: 10px;
  }
}

// Dark theme support
:host([theme="dark"]) {
  --calendar-bg: var(--color-neutral-900);
  --calendar-border: var(--color-neutral-700);
  --calendar-text: var(--color-neutral-100);
  --calendar-text-muted: var(--color-neutral-400);
  --calendar-today-bg: var(--color-primary-900);
  --calendar-weekend-bg: var(--color-neutral-800);
  --calendar-hover-bg: var(--color-neutral-800);
}

// High contrast theme
:host([theme="high-contrast"]) {
  --calendar-border: #000;
  --calendar-text: #000;
  --calendar-today-border: #000;
  
  .event-badge, .timed-event {
    border: 2px solid #000;
    font-weight: var(--font-weight-bold);
  }
}
```

## ♿ Accessibility Features

```typescript
// Enhanced accessibility implementation
export class CalendarAccessibility {
  private calendar: ForgeCalendar;
  private focusedDate: Date;
  private announcer: HTMLElement;

  constructor(calendar: ForgeCalendar) {
    this.calendar = calendar;
    this.focusedDate = new Date();
    this.setupAccessibility();
  }

  private setupAccessibility(): void {
    // Main calendar attributes
    this.calendar.setAttribute('role', 'application');
    this.calendar.setAttribute('aria-label', 'Interactive calendar');
    this.calendar.setAttribute('aria-describedby', 'calendar-instructions');
    
    // Create instructions
    this.createInstructions();
    
    // Create screen reader announcements
    this.createAnnouncer();
    
    // Keyboard event handlers
    this.calendar.addEventListener('keydown', this.handleKeyNavigation.bind(this));
    
    // Focus management
    this.setupFocusManagement();
  }

  private createInstructions(): void {
    const instructions = document.createElement('div');
    instructions.id = 'calendar-instructions';
    instructions.className = 'sr-only';
    instructions.textContent = 'Use arrow keys to navigate dates, Enter to select, Escape to close dialogs';
    this.calendar.shadowRoot!.appendChild(instructions);
  }

  private handleKeyNavigation(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.moveFocus(-1, 'day');
        break;
      case 'ArrowRight':
        this.moveFocus(1, 'day');
        break;
      case 'ArrowUp':
        this.moveFocus(-7, 'day');
        break;
      case 'ArrowDown':
        this.moveFocus(7, 'day');
        break;
      case 'Home':
        this.moveFocusToStart();
        break;
      case 'End':
        this.moveFocusToEnd();
        break;
      case 'PageUp':
        this.moveFocus(event.shiftKey ? -1 : -1, event.shiftKey ? 'year' : 'month');
        break;
      case 'PageDown':
        this.moveFocus(event.shiftKey ? 1 : 1, event.shiftKey ? 'year' : 'month');
        break;
      case 'Enter':
      case ' ':
        this.selectDate(this.focusedDate);
        break;
      case 'Escape':
        this.closeDialogs();
        break;
    }
  }

  private announceChange(message: string): void {
    this.announcer.textContent = message;
  }
}
```

## 🎯 AI Integration

```typescript
// AI metadata for ForgeCalendar
protected aiMetadata: AIMetadata = {
  purpose: 'Interactive calendar for event management and scheduling',
  context: 'Displays events in multiple view modes with drag-drop capabilities',
  dataType: 'datetime',
  criticality: 'high',
  semanticRole: 'calendar-widget',
  interactions: [
    {
      type: 'click',
      description: 'Select date or event',
      outcome: 'Opens date/event details or triggers selection'
    },
    {
      type: 'drag',
      description: 'Move events between dates',
      outcome: 'Updates event date and time',
      shortcuts: ['Ctrl+drag for copy']
    },
    {
      type: 'keyboard',
      description: 'Navigate calendar with arrow keys',
      outcome: 'Moves focus between dates',
      shortcuts: ['←↑↓→', 'Enter', 'Home/End', 'PageUp/Down']
    }
  ],
  validation: [
    {
      type: 'custom',
      message: 'Event dates must be valid',
      value: 'validateEventDates'
    }
  ]
};

getPossibleActions(): AIAction[] {
  return [
    {
      name: 'navigateToDate',
      description: 'Navigate to specific date',
      available: true,
      parameters: [
        { name: 'date', type: 'date', required: true, description: 'Target date' }
      ],
      result: 'Calendar shows specified date'
    },
    {
      name: 'switchView',
      description: 'Change calendar view mode',
      available: true,
      parameters: [
        { 
          name: 'view', 
          type: 'selection', 
          required: true,
          enum: ['month', 'week', 'day', 'agenda'],
          description: 'View mode to switch to'
        }
      ],
      result: 'Calendar displays in selected view mode'
    },
    {
      name: 'addEvent',
      description: 'Create new calendar event',
      available: this.editable,
      parameters: [
        { name: 'title', type: 'text', required: true, description: 'Event title' },
        { name: 'start', type: 'datetime', required: true, description: 'Start date/time' },
        { name: 'end', type: 'datetime', required: false, description: 'End date/time' },
        { name: 'allDay', type: 'boolean', required: false, defaultValue: false, description: 'All-day event' }
      ],
      result: 'New event appears on calendar'
    }
  ];
}

explainState(): AIStateExplanation {
  const viewDates = this.engine.getViewDates();
  const eventCount = this.events.length;
  
  return {
    currentState: `${this.view}-view`,
    possibleStates: ['month-view', 'week-view', 'day-view', 'agenda-view'],
    stateDescription: `Showing ${this.view} view from ${this.formatDate(viewDates.start)} to ${this.formatDate(viewDates.end)} with ${eventCount} events`,
    transitions: [
      {
        from: this.view + '-view',
        to: 'any-view',
        trigger: 'View button click or API call',
        conditions: ['Valid view mode selected']
      }
    ],
    visualIndicators: [
      'Current view highlighted in toolbar',
      'Date range shown in header',
      `Events displayed as ${this.view === 'month' ? 'badges' : 'time blocks'}`
    ]
  };
}
```

## 🧪 Testing Strategy

- **Unit Tests**: Individual component logic, date calculations, event management
- **Integration Tests**: View switching, drag-drop functionality, keyboard navigation
- **Accessibility Tests**: Screen reader compatibility, keyboard navigation, ARIA labels
- **Performance Tests**: Large dataset rendering, virtual scrolling efficiency
- **Cross-browser Tests**: Chrome, Firefox, Safari, Edge compatibility
- **Mobile Tests**: Touch interactions, responsive layout, gesture support

## 📋 Completion Checklist

### Core Implementation
- [ ] Calendar engine with date calculations
- [ ] Month view with event display
- [ ] Week view with time slots
- [ ] Day view with detailed timeline
- [ ] Agenda view with event list
- [ ] Event creation and editing
- [ ] Drag and drop functionality

### Advanced Features
- [ ] Recurring event support
- [ ] Multiple timezone handling
- [ ] Internationalization (i18n)
- [ ] Custom event rendering
- [ ] External calendar integration
- [ ] Keyboard accessibility

### Testing & Quality
- [ ] Comprehensive test suite (>90% coverage)
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Documentation and examples

### Integration
- [ ] Storybook stories
- [ ] Framework integration examples
- [ ] TypeScript definitions
- [ ] Build optimization
- [ ] Bundle size analysis

This implementation plan provides a solid foundation for building ForgeCalendar as a comprehensive, enterprise-grade calendar component that meets modern web standards and accessibility requirements.