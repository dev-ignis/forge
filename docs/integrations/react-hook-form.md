# React Hook Form Integration

This guide covers how to integrate @nexcraft/forge components with React Hook Form for powerful form management in React applications.

## Installation

First, install both packages:

```bash
npm install @nexcraft/forge react-hook-form
```

For Next.js projects, add @nexcraft/forge to your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nexcraft/forge']
};

export default nextConfig;
```

## Integration Patterns

@nexcraft/forge provides two ways to integrate with React Hook Form:

### 1. Direct Spread Pattern (Recommended)

The simplest approach using the `{...register()}` spread syntax:

```tsx
import { useForm } from 'react-hook-form';
import { ForgeInput, ForgeCheckbox } from '@nexcraft/forge/integrations/react';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ForgeInput
        {...register('email', { required: 'Email is required' })}
        placeholder="Enter your email"
        type="email"
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <ForgeCheckbox
        {...register('newsletter')}
        label="Subscribe to newsletter"
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 2. RHF Adapter Components

For more complex scenarios, use dedicated adapter components:

```tsx
import { useForm } from 'react-hook-form';
import { 
  RHFForgeInput, 
  RHFForgeSelect, 
  RHFForgeCheckbox,
  RHFForgeRadioGroup 
} from '@nexcraft/forge/integrations/rhf';

function AdvancedForm() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFForgeInput
        name="email"
        control={control}
        placeholder="Enter email"
        rules={{ required: 'Email is required' }}
      />
      
      <RHFForgeSelect
        name="country"
        control={control}
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' }
        ]}
        rules={{ required: 'Please select a country' }}
      />
      
      <RHFForgeCheckbox
        name="terms"
        control={control}
        label="I agree to the terms and conditions"
        rules={{ required: 'You must accept the terms' }}
      />
      
      <RHFForgeRadioGroup
        name="plan"
        control={control}
        options={[
          { value: 'basic', label: 'Basic Plan' },
          { value: 'pro', label: 'Pro Plan' },
          { value: 'enterprise', label: 'Enterprise Plan' }
        ]}
        rules={{ required: 'Please select a plan' }}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Component Reference

### RHFForgeInput

Adapter for `ForgeInput` with React Hook Form integration.

```tsx
<RHFForgeInput
  name="fieldName"
  control={control}
  rules={{ required: 'This field is required' }}
  placeholder="Enter value..."
  type="text"
  // ... other ForgeInput props
/>
```

**Props:**
- `name` (string): Field name for React Hook Form
- `control` (Control): React Hook Form control object
- `rules` (object): Validation rules
- All other `ForgeInput` props are supported

### RHFForgeSelect

Adapter for `ForgeSelect` with React Hook Form integration.

```tsx
<RHFForgeSelect
  name="selection"
  control={control}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  rules={{ required: 'Please make a selection' }}
/>
```

**Props:**
- `name` (string): Field name for React Hook Form
- `control` (Control): React Hook Form control object
- `options` (array): Array of option objects with `value` and `label`
- `rules` (object): Validation rules
- All other `ForgeSelect` props are supported

### RHFForgeCheckbox

Adapter for `ForgeCheckbox` with React Hook Form integration.

```tsx
<RHFForgeCheckbox
  name="agreement"
  control={control}
  label="I agree to the terms"
  rules={{ required: 'Agreement is required' }}
/>
```

**Props:**
- `name` (string): Field name for React Hook Form
- `control` (Control): React Hook Form control object
- `label` (string): Checkbox label
- `rules` (object): Validation rules
- All other `ForgeCheckbox` props are supported

### RHFForgeRadioGroup

Adapter for `ForgeRadioGroup` with React Hook Form integration.

```tsx
<RHFForgeRadioGroup
  name="choice"
  control={control}
  options={[
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]}
  rules={{ required: 'Please make a choice' }}
/>
```

**Props:**
- `name` (string): Field name for React Hook Form
- `control` (Control): React Hook Form control object  
- `options` (array): Array of option objects with `value` and `label`
- `rules` (object): Validation rules
- All other `ForgeRadioGroup` props are supported

## Next.js + Turbopack Compatibility

@nexcraft/forge is fully compatible with Next.js and Turbopack. The key is ensuring proper transpilation:

1. **Add to transpilePackages** in your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nexcraft/forge']
};

export default nextConfig;
```

2. **Use static imports** (no dynamic requires):

```tsx
// ✅ Good - Static imports
import { RHFForgeInput } from '@nexcraft/forge/integrations/rhf';

// ❌ Avoid - Dynamic imports for RHF components
const RHFForgeInput = await import('@nexcraft/forge/integrations/rhf');
```

## TypeScript Support

All RHF adapter components include full TypeScript support:

```tsx
import type { 
  RHFForgeInputProps,
  RHFForgeSelectProps,
  RHFForgeCheckboxProps,
  RHFForgeRadioGroupProps 
} from '@nexcraft/forge/integrations/rhf';

// Type-safe component usage
const inputProps: RHFForgeInputProps = {
  name: 'email',
  control,
  rules: { required: 'Email is required' },
  type: 'email'
};
```

## Architecture & Design Decisions

This integration follows several key architectural principles:

### Static Imports Only

No runtime detection or dynamic requires are used. This ensures:
- ✅ Full Next.js + Turbopack compatibility
- ✅ Better tree-shaking and bundle optimization
- ✅ Predictable module resolution

### Subpath Exports

RHF adapters are available via dedicated subpath:
- Core components: `@nexcraft/forge/integrations/react`
- RHF adapters: `@nexcraft/forge/integrations/rhf`

This keeps the core package clean while providing optional RHF integration.

### Peer Dependencies

`react-hook-form` is an optional peer dependency, meaning:
- ✅ Core @nexcraft/forge works without RHF
- ✅ RHF adapters require explicit RHF installation
- ✅ No bundle bloat for non-RHF users

## Migration from Previous Versions

If you were using the old `ReactHookFormAdapters` from the main React integration:

**Before (v0.5.2-beta.19 and earlier):**
```tsx
import { RHFForgeInput } from '@nexcraft/forge/integrations/react';
```

**After (v0.5.2-beta.20+):**
```tsx
import { RHFForgeInput } from '@nexcraft/forge/integrations/rhf';
```

The API remains the same, only the import path has changed.

## Examples

### Basic Contact Form

```tsx
import { useForm } from 'react-hook-form';
import { ForgeInput, ForgeButton } from '@nexcraft/forge/integrations/react';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ForgeInput
        {...register('name', { required: 'Name is required' })}
        placeholder="Your name"
        label="Name"
      />
      {errors.name && <span className="error">{errors.name.message}</span>}

      <ForgeInput
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        type="email"
        placeholder="your@email.com"
        label="Email"
      />
      {errors.email && <span className="error">{errors.email.message}</span>}

      <ForgeInput
        {...register('message', { required: 'Message is required' })}
        type="textarea"
        placeholder="Your message..."
        label="Message"
      />
      {errors.message && <span className="error">{errors.message.message}</span>}

      <ForgeButton type="submit" variant="primary">
        Send Message
      </ForgeButton>
    </form>
  );
}
```

### Advanced Registration Form

```tsx
import { useForm } from 'react-hook-form';
import { 
  RHFForgeInput,
  RHFForgeSelect,
  RHFForgeCheckbox,
  RHFForgeRadioGroup
} from '@nexcraft/forge/integrations/rhf';

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  plan: string;
  newsletter: boolean;
  terms: boolean;
}

function RegistrationForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<RegistrationForm>();

  const onSubmit = (data: RegistrationForm) => {
    console.log('Registration data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <RHFForgeInput
          name="firstName"
          control={control}
          placeholder="First name"
          label="First Name"
          rules={{ required: 'First name is required' }}
        />
        
        <RHFForgeInput
          name="lastName"
          control={control}
          placeholder="Last name"
          label="Last Name"
          rules={{ required: 'Last name is required' }}
        />
      </div>

      <RHFForgeInput
        name="email"
        control={control}
        type="email"
        placeholder="your@email.com"
        label="Email"
        rules={{ 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }}
      />

      <RHFForgeSelect
        name="country"
        control={control}
        label="Country"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'de', label: 'Germany' },
          { value: 'fr', label: 'France' }
        ]}
        rules={{ required: 'Please select your country' }}
      />

      <RHFForgeRadioGroup
        name="plan"
        control={control}
        label="Choose your plan"
        options={[
          { value: 'free', label: 'Free - $0/month' },
          { value: 'pro', label: 'Pro - $9/month' },
          { value: 'enterprise', label: 'Enterprise - Contact us' }
        ]}
        rules={{ required: 'Please select a plan' }}
      />

      <RHFForgeCheckbox
        name="newsletter"
        control={control}
        label="Subscribe to our newsletter for updates"
      />

      <RHFForgeCheckbox
        name="terms"
        control={control}
        label="I agree to the Terms of Service and Privacy Policy"
        rules={{ required: 'You must accept the terms to continue' }}
      />

      <button type="submit">Create Account</button>
    </form>
  );
}
```

## Best Practices

1. **Use Direct Spread for Simple Forms**: The `{...register()}` pattern is simpler and more performant for basic forms.

2. **Use Adapters for Complex Logic**: RHF adapters are better when you need custom validation, transformations, or complex field interactions.

3. **Type Your Forms**: Always use TypeScript interfaces for your form data to ensure type safety.

4. **Handle Errors Consistently**: Display validation errors consistently across your application.

5. **Optimize Bundle Size**: Only import the RHF integration if you're actually using React Hook Form.

## Troubleshooting

### Module Resolution Issues

If you encounter import errors:

1. Ensure `@nexcraft/forge` is in `transpilePackages` for Next.js
2. Check that you're using the correct import paths
3. Verify `react-hook-form` is installed as a dependency

### TypeScript Errors

If you get TypeScript errors:

1. Make sure you have the latest `@types/react` and `@types/react-dom`
2. Update your TypeScript configuration to include proper module resolution
3. Use explicit type annotations for complex forms

### Performance Issues

If forms feel slow:

1. Use `React.memo()` for form components
2. Consider splitting large forms into smaller components
3. Use `useCallback()` for event handlers