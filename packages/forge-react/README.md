# @nexcraft/forge-react

React integration for Nexcraft Forge web components.

## Overview

The `@nexcraft/forge-react` package provides React wrapper components and utilities for seamless use of Forge web components in React applications, including SSR/SSG support.

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
```

## Features

- **Universal Components**: Work in both SSR and client environments
- **TypeScript Support**: Full type safety with React props
- **Event Handling**: Proper React event mapping (onClick, onChange, etc.)
- **SSR Compatible**: Server-side rendering with progressive enhancement
- **Form Integration**: Controlled/uncontrolled component patterns
- **Performance Optimized**: Tree-shakeable imports

## Usage

### Basic Components

```tsx
import { 
  ForgeButton, 
  ForgeInput, 
  ForgeSelect, 
  ForgeCheckbox 
} from '@nexcraft/forge-react';

function MyForm() {
  return (
    <form>
      <ForgeInput placeholder="Email" type="email" />
      <ForgeSelect options={[{value: 'us', label: 'United States'}]} />
      <ForgeCheckbox label="Subscribe to newsletter" />
      <ForgeButton type="submit">Submit</ForgeButton>
    </form>
  );
}
```

### Advanced Components

```tsx
import { 
  ForgeDataTable, 
  ForgeModal, 
  ForgeTabs 
} from '@nexcraft/forge-react';

function Dashboard() {
  return (
    <div>
      <ForgeTabs>
        <ForgeTab label="Data">
          <ForgeDataTable 
            data={tableData}
            columns={columns}
            sortable
            filterable
          />
        </ForgeTab>
      </ForgeTabs>
    </div>
  );
}
```

### Hooks

```tsx
import { useForgeComponent, useForgeEvent } from '@nexcraft/forge-react/hooks';

function CustomComponent() {
  const buttonRef = useForgeComponent();
  
  useForgeEvent(buttonRef, 'click', (event) => {
    console.log('Button clicked:', event);
  });

  return <forge-button ref={buttonRef}>Click me</forge-button>;
}
```

## SSR Support

All components work seamlessly in SSR environments:

```tsx
// Works in Next.js, Remix, or any React SSR framework
import { ForgeButton } from '@nexcraft/forge-react';

export default function Page() {
  return (
    <div>
      <ForgeButton>This renders on server and client</ForgeButton>
    </div>
  );
}
```

## Migration from Main Package

If you were previously using React integration from `@nexcraft/forge/integrations/react`, migrate to the dedicated package:

```tsx
// Old (deprecated as of v0.8.0)
import { ForgeButton } from '@nexcraft/forge/integrations/react';

// New (recommended)
import { ForgeButton } from '@nexcraft/forge-react';
```

## Peer Dependencies

- `@nexcraft/forge >= 0.7.0`
- `react ^17.0.0 || ^18.0.0 || ^19.0.0`
- `react-dom ^17.0.0 || ^18.0.0 || ^19.0.0`

## Contributing

The React package is part of the Nexcraft Forge monorepo. See the main project's contributing guide for development setup and guidelines.