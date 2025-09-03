# ForgeDatePicker

Comprehensive date picker component with calendar interface, range selection, and internationalization support.

## Overview

The ForgeDatePicker component provides a rich date selection experience with a calendar interface, support for date ranges, internationalization, and comprehensive keyboard navigation. It includes date constraints and custom formatting options.

## Key Features

- **Calendar Interface**: Interactive month/year navigation with date grid
- **Date Range Selection**: Single date or date range picking
- **Internationalization**: Locale-aware formatting and display
- **Date Constraints**: Min/max dates and disabled date support
- **Keyboard Navigation**: Full keyboard accessibility
- **Custom Formatting**: Configurable date display formats
- **Touch Support**: Mobile-optimized interactions
- **AI-Ready**: Comprehensive AI metadata for intelligent interactions

## Basic Usage

```html
<forge-date-picker
  placeholder="Select a date"
  .value="${selectedDate}"
  @forge-change="${handleDateChange}"
>
</forge-date-picker>
```

## Advanced Usage

```html
<forge-date-picker
  placeholder="Select date range"
  format="DD/MM/YYYY"
  locale="en-GB"
  .rangeMode="${true}"
  .clearButton="${true}"
  .weekStartMonday="${true}"
  .min="${minDate}"
  .max="${maxDate}"
  .disabledDates="${disabledDates}"
  .range="${selectedRange}"
  @forge-change="${handleRangeChange}"
>
</forge-date-picker>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `Date \| null` | `null` | Selected date (single mode) |
| `range` | `DateRange \| null` | `null` | Selected date range (range mode) |
| `placeholder` | `string` | `'Select date'` | Input placeholder text |
| `format` | `string` | `'MM/DD/YYYY'` | Date display format |
| `locale` | `string` | `'en-US'` | Locale for date formatting |
| `disabled` | `boolean` | `false` | Whether picker is disabled |
| `range-mode` | `boolean` | `false` | Enable date range selection |
| `clear-button` | `boolean` | `true` | Show clear button when date selected |
| `min` | `Date \| null` | `null` | Minimum selectable date |
| `max` | `Date \| null` | `null` | Maximum selectable date |
| `disabled-dates` | `Date[]` | `[]` | Array of disabled dates |
| `week-start-monday` | `boolean` | `false` | Start week on Monday instead of Sunday |

## Types

### DateRange
```typescript
interface DateRange {
  start: Date | null;
  end: Date | null;
}
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-change` | `{ value?: Date, range?: DateRange }` | Fired when date selection changes |

## Calendar Navigation

### Month/Year Controls
Interactive dropdowns for quick navigation:

```html
<div class="calendar__month-year">
  <select class="calendar__month-select">
    <option value="0">January</option>
    <option value="1">February</option>
    <!-- ... -->
  </select>
  
  <select class="calendar__year-select">
    <option value="2023">2023</option>
    <option value="2024">2024</option>
    <!-- ... -->
  </select>
</div>
```

### Navigation Buttons
Previous/next month navigation:

```html
<button class="calendar__nav-button" aria-label="Previous month">
  <forge-icon name="chevron-left"></forge-icon>
</button>
<button class="calendar__nav-button" aria-label="Next month">
  <forge-icon name="chevron-right"></forge-icon>
</button>
```

## Date Formatting

### Custom Formats
Configurable date display formats:

```typescript
// Default format
format="MM/DD/YYYY" // 03/15/2024

// European format
format="DD/MM/YYYY" // 15/03/2024

// ISO format
format="YYYY-MM-DD" // 2024-03-15
```

### Format Implementation
```typescript
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
```

## Single Date Selection

Standard single date picking:

```html
<forge-date-picker
  placeholder="Select appointment date"
  .value="${appointmentDate}"
  .min="${new Date()}" <!-- No past dates -->
  @forge-change="${handleAppointmentChange}"
>
</forge-date-picker>
```

## Date Range Selection

Select start and end dates:

```html
<forge-date-picker
  placeholder="Select date range"
  .rangeMode="${true}"
  .range="${selectedRange}"
  @forge-change="${handleRangeChange}"
>
</forge-date-picker>
```

### Range Selection Flow
1. Click first date → sets range start
2. Click second date → sets range end
3. Visual preview shows range while selecting
4. Range automatically orders start/end dates

```typescript
private selectDate(date: Date): void {
  if (this.rangeMode) {
    if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
      this.rangeStart = date;
      this.rangeEnd = null;
    } else {
      if (date < this.rangeStart) {
        this.rangeEnd = this.rangeStart;
        this.rangeStart = date;
      } else {
        this.rangeEnd = date;
      }
      this.range = { start: this.rangeStart, end: this.rangeEnd };
    }
  }
}
```

## Date Constraints

### Min/Max Dates
Restrict selectable date range:

```html
<forge-date-picker
  .min="${new Date(2024, 0, 1)}" <!-- Min: Jan 1, 2024 -->
  .max="${new Date(2024, 11, 31)}" <!-- Max: Dec 31, 2024 -->
>
</forge-date-picker>
```

### Disabled Dates
Specify individual disabled dates:

```typescript
const holidays = [
  new Date(2024, 0, 1),  // New Year's Day
  new Date(2024, 6, 4),  // Independence Day
  new Date(2024, 11, 25) // Christmas
];
```

```html
<forge-date-picker
  .disabledDates="${holidays}"
  placeholder="Select business day"
>
</forge-date-picker>
```

### Constraint Validation
```typescript
private isDateDisabled(date: Date): boolean {
  if (this.min && date < this.min) return true;
  if (this.max && date > this.max) return true;
  
  return this.disabledDates.some(disabled => 
    disabled.getDate() === date.getDate() &&
    disabled.getMonth() === date.getMonth() &&
    disabled.getFullYear() === date.getFullYear()
  );
}
```

## Internationalization

### Locale Support
Automatic locale-aware formatting:

```html
<!-- US Format -->
<forge-date-picker locale="en-US" format="MM/DD/YYYY">
</forge-date-picker>

<!-- UK Format -->
<forge-date-picker locale="en-GB" format="DD/MM/YYYY">
</forge-date-picker>

<!-- German Format -->
<forge-date-picker locale="de-DE" format="DD.MM.YYYY">
</forge-date-picker>
```

### Week Start Configuration
Choose week start day:

```html
<!-- Week starts on Sunday (default) -->
<forge-date-picker .weekStartMonday="${false}">
</forge-date-picker>

<!-- Week starts on Monday -->
<forge-date-picker .weekStartMonday="${true}">
</forge-date-picker>
```

## Keyboard Navigation

Comprehensive keyboard support:

- **Enter**: Open calendar or select focused date
- **Escape**: Close calendar
- **Arrow Keys**: Navigate calendar grid
- **Home/End**: First/last day of month
- **Page Up/Down**: Previous/next month
- **Tab**: Navigate between elements

```typescript
private handleKeydown = (e: KeyboardEvent): void => {
  switch (e.key) {
    case 'Escape':
      this.closeCalendar();
      break;
    case 'Enter':
      if (!this.isOpen) {
        this.toggleCalendar();
      }
      break;
    // ... additional key handling
  }
};
```

## Visual States

### Today Indicator
Current date is highlighted with special styling:

```css
.calendar__day--today {
  font-weight: 600;
  color: var(--forge-primary-color);
}

.calendar__day--today::after {
  content: '';
  position: absolute;
  bottom: 2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--forge-primary-color);
}
```

### Selection States
Visual feedback for selected dates:

```css
.calendar__day--selected {
  background: var(--forge-primary-color);
  color: white;
}

.calendar__day--in-range {
  background: var(--forge-primary-alpha);
}

.calendar__day--range-start,
.calendar__day--range-end {
  background: var(--forge-primary-color);
  color: white;
}
```

## Accessibility Features

- **ARIA Support**: Proper `role="dialog"` and labeling
- **Keyboard Navigation**: Complete keyboard control
- **Screen Reader**: Date announcements and navigation
- **Focus Management**: Logical focus flow
- **High Contrast**: Proper color contrast ratios

## AI Metadata

Comprehensive AI metadata for intelligent interactions:

```typescript
{
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
}
```

## Performance Features

- Efficient calendar grid rendering
- Optimized date calculations
- Minimal DOM updates
- Performance budget monitoring

## Styling

### CSS Custom Properties

```css
:host {
  --forge-bg-color: #ffffff;
  --forge-border-color: #d1d5db;
  --forge-primary-color: #3b82f6;
  --forge-primary-alpha: rgba(59, 130, 246, 0.1);
  --forge-text-color: #374151;
  --forge-text-muted: #6b7280;
  --forge-hover-bg: #f3f4f6;
}
```

### Calendar Structure

```css
.date-picker {
  position: relative;
}

.date-picker__calendar {
  position: absolute;
  background: var(--forge-bg-color);
  border: 1px solid var(--forge-border-color);
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
```

## Examples

### Event Booking
```html
<forge-date-picker
  placeholder="Select event date"
  .min="${new Date()}"
  .disabledDates="${bookedDates}"
  @forge-change="${handleEventDate}"
>
</forge-date-picker>
```

### Vacation Planner
```html
<forge-date-picker
  placeholder="Select vacation dates"
  .rangeMode="${true}"
  .min="${new Date()}"
  .max="${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}"
  @forge-change="${handleVacationDates}"
>
</forge-date-picker>
```

### Historical Data Filter
```html
<forge-date-picker
  placeholder="Select date range"
  format="YYYY-MM-DD"
  .rangeMode="${true}"
  .max="${new Date()}" <!-- No future dates -->
  .range="${filterRange}"
  @forge-change="${updateDateFilter}"
>
</forge-date-picker>
```

## Integration with Forms

### Form Field Integration
```html
<forge-form-field label="Birth Date" required>
  <forge-date-picker
    name="birthDate"
    placeholder="MM/DD/YYYY"
    .max="${new Date()}"
    .value="${formData.birthDate}"
    @forge-change="${updateBirthDate}"
  >
  </forge-date-picker>
</forge-form-field>
```

### Validation
```typescript
// Custom validation
private validateDate(): boolean {
  if (this.required && !this.value) {
    this.validationState = 'error';
    this.errorMessage = 'Date is required';
    return false;
  }
  
  if (this.value && this.min && this.value < this.min) {
    this.validationState = 'error';
    this.errorMessage = 'Date must be after minimum date';
    return false;
  }
  
  return true;
}
```

## Testing

Comprehensive test coverage includes:

- Date selection and validation
- Range selection flow
- Calendar navigation
- Keyboard interactions
- Accessibility compliance
- Constraint enforcement

```typescript
// Example test
it('should support date range selection', async () => {
  const datePicker = await fixture<ForgeDatePicker>(html`
    <forge-date-picker .rangeMode="${true}"></forge-date-picker>
  `);
  
  datePicker.toggleCalendar();
  
  // Select start date
  const startDate = new Date(2024, 2, 15);
  datePicker.selectDate(startDate);
  expect(datePicker.rangeStart).to.equal(startDate);
  
  // Select end date
  const endDate = new Date(2024, 2, 20);
  datePicker.selectDate(endDate);
  expect(datePicker.range?.end).to.equal(endDate);
});
```

## Best Practices

1. **Date Constraints**: Always set appropriate min/max bounds
2. **Localization**: Use proper locale for target audience
3. **Validation**: Provide clear validation feedback
4. **Mobile UX**: Test touch interactions thoroughly
5. **Accessibility**: Ensure keyboard navigation works

## Browser Support

- Modern browsers with Web Components support
- Date API compatibility
- Internationalization API support
- Touch-optimized for mobile devices

## Related Components

- [ForgeInput](../atoms/input.md) - For manual date input
- [ForgeFormField](./form-field.md) - For form integration
- [ForgeModal](./modal.md) - For expanded calendar views
- [ForgeButton](../atoms/button.md) - For calendar actions