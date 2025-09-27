# React Integration

React integration for Nexcraft Forge web components through the `@nexcraft/forge-react` package.

## Overview

The `@nexcraft/forge-react` package provides React wrapper components and utilities for seamless use of Forge web components in React applications, including SSR/SSG support with Next.js, Remix, and other React frameworks.

## Installation

```bash
npm install @nexcraft/forge @nexcraft/forge-react
```

## Quick Start

```tsx
import React from 'react';
import { ForgeButton, ForgeInput, ForgeCard } from '@nexcraft/forge-react';

function App() {
  const [value, setValue] = React.useState('');

  return (
    <ForgeCard>
      <ForgeInput 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your name"
      />
      <ForgeButton variant="primary" onClick={() => alert(`Hello ${value}!`)}>
        Submit
      </ForgeButton>
    </ForgeCard>
  );
}

export default App;
```

## Features

- **Universal Components**: Work seamlessly in both SSR and client environments
- **TypeScript Support**: Full type safety with React props and event handlers
- **Event Handling**: Proper React event mapping (onClick, onChange, onFocus, etc.)
- **SSR Compatible**: Server-side rendering with progressive enhancement
- **Form Integration**: Controlled and uncontrolled component patterns
- **Performance Optimized**: Tree-shakeable imports and lazy loading
- **React 17/18/19 Support**: Compatible with all modern React versions

## Component Categories

### Atom Components

Basic building blocks for your application:

```tsx
import { 
  ForgeAlert,
  ForgeAspectRatio,
  ForgeAvatar,
  ForgeBadge,
  ForgeButton,
  ForgeCheckbox,
  ForgeIcon,
  ForgeInput,
  ForgeProgress,
  ForgeProgressCircle,
  ForgeRadioGroup,
  ForgeSelect,
  ForgeSkeleton,
  ForgeSwitch
} from '@nexcraft/forge-react';

function BasicComponents() {
  return (
    <div>
      <ForgeAlert severity="info">Information message</ForgeAlert>
      <ForgeButton variant="primary">Click me</ForgeButton>
      <ForgeInput placeholder="Enter text" />
      <ForgeCheckbox label="Agree to terms" />
    </div>
  );
}
```

### Molecule Components

More complex interactive components:

```tsx
import { 
  ForgeCard,
  ForgeDatePicker,
  ForgeDropdown,
  ForgeFormField,
  ForgeModal,
  ForgeMultiSelect,
  ForgeToast,
  ForgeTooltip
} from '@nexcraft/forge-react';

function MoleculeComponents() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div>
      <ForgeCard>
        <ForgeFormField label="Select Date">
          <ForgeDatePicker />
        </ForgeFormField>
        <ForgeTooltip content="Click to open">
          <ForgeButton onClick={() => setIsModalOpen(true)}>
            Open Modal
          </ForgeButton>
        </ForgeTooltip>
      </ForgeCard>

      <ForgeModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <p>Modal content here</p>
      </ForgeModal>
    </div>
  );
}
```

### Organism Components

Complex data-driven components:

```tsx
import { 
  ForgeAccordion,
  ForgeDataGrid,
  ForgeDataTable,
  ForgeNavigationBar,
  ForgePagination,
  ForgeTabs,
  ForgeTreeView
} from '@nexcraft/forge-react';

function OrganismComponents() {
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true }
  ];

  return (
    <div>
      <ForgeNavigationBar>
        <ForgeButton>Home</ForgeButton>
        <ForgeButton>About</ForgeButton>
      </ForgeNavigationBar>

      <ForgeTabs>
        <ForgeTab label="Data Table">
          <ForgeDataTable 
            data={tableData}
            columns={columns}
            sortable
            filterable
          />
        </ForgeTab>
        <ForgeTab label="Accordion">
          <ForgeAccordion>
            <ForgeAccordionItem title="Section 1">
              Content for section 1
            </ForgeAccordionItem>
          </ForgeAccordion>
        </ForgeTab>
      </ForgeTabs>
    </div>
  );
}
```

## SSR/SSG Support

All Forge React components work seamlessly in SSR environments:

### Next.js

```tsx
// pages/index.tsx or app/page.tsx
import { ForgeButton, ForgeCard } from '@nexcraft/forge-react';

export default function Home() {
  return (
    <ForgeCard>
      <h1>Welcome to Next.js with Forge</h1>
      <ForgeButton variant="primary">
        This renders on server and client
      </ForgeButton>
    </ForgeCard>
  );
}
```

### Remix

```tsx
// app/routes/_index.tsx
import { ForgeButton, ForgeInput } from '@nexcraft/forge-react';

export default function Index() {
  return (
    <div>
      <ForgeInput placeholder="Server-rendered input" />
      <ForgeButton>Server-rendered button</ForgeButton>
    </div>
  );
}
```

### Gatsby

```tsx
// src/pages/index.tsx
import React from 'react';
import { ForgeCard, ForgeButton } from '@nexcraft/forge-react';

const IndexPage = () => (
  <ForgeCard>
    <h1>Gatsby + Forge</h1>
    <ForgeButton variant="secondary">
      Works with Gatsby SSG
    </ForgeButton>
  </ForgeCard>
);

export default IndexPage;
```

## Hooks and Utilities

### useForgeComponent Hook

For accessing the underlying web component:

```tsx
import { useForgeComponent } from '@nexcraft/forge-react/hooks';

function CustomComponent() {
  const { ref, getElement } = useForgeComponent();

  const handleClick = () => {
    const element = getElement();
    console.log('Button element:', element);
    // Access web component methods
    element?.focus();
  };

  return (
    <ForgeButton ref={ref} onClick={handleClick}>
      Click me
    </ForgeButton>
  );
}
```

### useForgeEvent Hook

For handling custom events:

```tsx
import { useForgeEvent } from '@nexcraft/forge-react/hooks';

function DataTableExample() {
  const tableRef = useRef();

  useForgeEvent(tableRef, 'sort', (event) => {
    console.log('Sort event:', event.detail);
    // Handle sorting logic
  });

  return (
    <ForgeDataTable 
      ref={tableRef}
      data={data}
      sortable
    />
  );
}
```

## Form Integration

### Controlled Components

```tsx
function ControlledForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    newsletter: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ForgeInput
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Name"
        required
      />
      
      <ForgeInput
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
        required
      />
      
      <ForgeCheckbox
        checked={formData.newsletter}
        onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
        label="Subscribe to newsletter"
      />
      
      <ForgeButton type="submit" variant="primary">
        Submit
      </ForgeButton>
    </form>
  );
}
```

### React Hook Form Integration

For React Hook Form integration, use the dedicated `@nexcraft/forge-rhf` package:

```tsx
import { useForm } from 'react-hook-form';
import { RHFForgeInput, RHFForgeSelect } from '@nexcraft/forge-rhf';

function RHFForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <RHFForgeInput
        name="email"
        control={control}
        placeholder="Enter email"
        rules={{ required: 'Email is required' }}
      />
      
      <RHFForgeSelect
        name="country"
        control={control}
        options={countryOptions}
        rules={{ required: 'Please select a country' }}
      />
    </form>
  );
}
```

## Advanced Usage

### Custom Event Handling

```tsx
function AdvancedDataTable() {
  const handleSort = (event) => {
    const { key, direction } = event.detail;
    console.log(`Sorting by ${key} in ${direction} order`);
    // Implement sorting logic
  };

  const handleFilter = (event) => {
    const { filters } = event.detail;
    console.log('Applied filters:', filters);
    // Implement filtering logic
  };

  return (
    <ForgeDataTable
      data={tableData}
      columns={columns}
      onSort={handleSort}
      onFilter={handleFilter}
      sortable
      filterable
    />
  );
}
```

### Theme Integration

```tsx
function ThemedApp() {
  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-forge-theme', theme);
  }, [theme]);

  return (
    <div data-forge-theme={theme}>
      <ForgeButton 
        variant="secondary"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Toggle Theme ({theme})
      </ForgeButton>
      
      <ForgeCard>
        <p>This card adapts to the current theme</p>
      </ForgeCard>
    </div>
  );
}
```

## TypeScript Support

Full TypeScript support with comprehensive prop types:

```tsx
import type { 
  ForgeButtonProps,
  ForgeInputProps,
  ForgeDataTableProps
} from '@nexcraft/forge-react';

interface CustomFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
}

function TypedForm({ onSubmit, initialData }: CustomFormProps) {
  const buttonProps: ForgeButtonProps = {
    variant: 'primary',
    size: 'large',
    disabled: false
  };

  const inputProps: ForgeInputProps = {
    type: 'email',
    placeholder: 'Enter your email',
    required: true
  };

  return (
    <form>
      <ForgeInput {...inputProps} />
      <ForgeButton {...buttonProps}>
        Submit
      </ForgeButton>
    </form>
  );
}
```

## Migration from Main Package

If you were previously using React integration from `@nexcraft/forge/integrations/react`, migrate to the dedicated package:

```tsx
// Old (deprecated as of v0.8.0)
import { ForgeButton, ForgeInput } from '@nexcraft/forge/integrations/react';
import { useForgeComponent } from '@nexcraft/forge/integrations/react';

// New (recommended)
import { ForgeButton, ForgeInput } from '@nexcraft/forge-react';
import { useForgeComponent } from '@nexcraft/forge-react/hooks';
```

### Migration Benefits

- **Better Performance**: Tree-shakeable imports reduce bundle size
- **Faster Updates**: React-specific features can be updated independently
- **Better TypeScript**: More focused type definitions for React usage
- **SSR Optimizations**: React-specific SSR enhancements
- **Framework Focus**: React-specific documentation and examples

## Performance Optimization

### Tree-Shaking

Import only the components you need:

```tsx
// Good: Tree-shakeable imports
import { ForgeButton } from '@nexcraft/forge-react';
import { ForgeInput } from '@nexcraft/forge-react';

// Less optimal: Importing everything
import * as Forge from '@nexcraft/forge-react';
```

### Lazy Loading

For large applications, consider lazy loading:

```tsx
const ForgeDataTable = React.lazy(() => 
  import('@nexcraft/forge-react').then(module => ({ 
    default: module.ForgeDataTable 
  }))
);

function LazyTable() {
  return (
    <React.Suspense fallback={<ForgeSkeleton />}>
      <ForgeDataTable data={largeDataset} />
    </React.Suspense>
  );
}
```

## Troubleshooting

### Components not rendering

Ensure you've imported the base Forge package:

```bash
npm install @nexcraft/forge @nexcraft/forge-react
```

### TypeScript errors

Ensure you have React types installed:

```bash
npm install @types/react @types/react-dom --save-dev
```

### SSR hydration mismatches

Make sure to use the same component imports on server and client:

```tsx
// Use the same import on both server and client
import { ForgeButton } from '@nexcraft/forge-react';
```

### Event handlers not working

Ensure you're using React event patterns:

```tsx
// Correct: React event handling
<ForgeButton onClick={(e) => console.log('clicked', e)}>
  Click me
</ForgeButton>

// Incorrect: DOM event handling
<forge-button onclick="console.log('clicked')">
  Click me
</forge-button>
```

## Peer Dependencies

- `@nexcraft/forge >= 0.7.0`
- `react ^17.0.0 || ^18.0.0 || ^19.0.0`
- `react-dom ^17.0.0 || ^18.0.0 || ^19.0.0`

## Contributing

The React package is part of the Nexcraft Forge monorepo. See the main project's contributing guide for development setup and guidelines.

## Related Packages

- **`@nexcraft/forge`** - Core web components
- **`@nexcraft/forge-rhf`** - React Hook Form adapters
- **`@nexcraft/forge-vue`** - Vue integration
- **`@nexcraft/forge-angular`** - Angular integration