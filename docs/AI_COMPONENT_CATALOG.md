# 🤖 AI Component Catalog

**Copy-paste ready code snippets for AI tools and developers**

This catalog provides ready-to-use code examples for every Forge component, organized by use case and framework. Perfect for AI tools like Cursor, GitHub Copilot, and Claude Code.

## 📋 Quick Reference

| Component | Purpose | React Import | Selective Import |
|-----------|---------|-------------|------------------|
| `ForgeButton` | Buttons, CTAs | `@nexcraft/forge/integrations/react` | `@nexcraft/forge/button` |
| `ForgeInput` | Text inputs, forms | `@nexcraft/forge/integrations/react` | `@nexcraft/forge/input` |
| `ForgeCard` | Content containers | `@nexcraft/forge/integrations/react` | `@nexcraft/forge/card` |
| `ForgeAlert` | Messages, notifications | `@nexcraft/forge/integrations/react` | `@nexcraft/forge/alert` |
| `ForgeModal` | Dialogs, popups | `@nexcraft/forge/integrations/react` | `@nexcraft/forge/modal` |
| `ForgeSelect` | Dropdowns, pickers | `@nexcraft/forge/integrations/react` | `@nexcraft/forge/select` |
| `ForgeCheckbox` | Toggle options | `@nexcraft/forge/integrations/react` | `@nexcraft/forge/checkbox` |
| `ForgeDataTable` | Data grids, lists | `@nexcraft/forge/integrations/react` | `@nexcraft/forge/data-table` |

## 🚀 Atoms (Basic Components)

### ForgeButton
**Purpose**: Primary actions, form submissions, navigation triggers

```jsx
// React Examples
import { ForgeButton } from '@nexcraft/forge/integrations/react'

// Primary action button
<ForgeButton variant="primary" size="lg">
  Save Changes
</ForgeButton>

// Secondary button
<ForgeButton variant="secondary" size="md">
  Cancel
</ForgeButton>

// Danger/destructive action
<ForgeButton variant="danger" size="sm">
  Delete Item
</ForgeButton>

// Loading state
<ForgeButton variant="primary" loading={true}>
  Processing...
</ForgeButton>

// Icon button
<ForgeButton variant="ghost" size="sm" icon="edit">
  Edit
</ForgeButton>
```

```html
<!-- Vanilla JS/HTML -->
<forge-button variant="primary" size="lg">Save Changes</forge-button>
<forge-button variant="secondary">Cancel</forge-button>
<forge-button variant="danger" size="sm">Delete</forge-button>
```

### ForgeInput
**Purpose**: Text entry, form fields, user input

```jsx
// React Examples
import { ForgeInput } from '@nexcraft/forge/integrations/react'

// Basic text input
<ForgeInput 
  type="text" 
  label="Full Name" 
  placeholder="Enter your name"
  required
/>

// Email input with validation
<ForgeInput 
  type="email" 
  label="Email Address" 
  placeholder="user@example.com"
  required
  helperText="We'll never share your email"
/>

// Password input
<ForgeInput 
  type="password" 
  label="Password" 
  required
  helperText="Minimum 8 characters"
/>

// Textarea for long text
<ForgeInput 
  type="textarea" 
  label="Message" 
  rows={4}
  placeholder="Enter your message..."
/>

// Input with error state
<ForgeInput 
  type="text" 
  label="Username" 
  value={username}
  error={true}
  helperText="Username is already taken"
/>
```

### ForgeCard
**Purpose**: Content containers, layout sections

```jsx
// React Examples
import { ForgeCard } from '@nexcraft/forge/integrations/react'

// Basic card
<ForgeCard>
  <div className="p-6">
    <h3 className="text-lg font-semibold mb-2">Card Title</h3>
    <p className="text-gray-600">Card content goes here.</p>
  </div>
</ForgeCard>

// Card with header and footer
<ForgeCard>
  <div className="border-b p-4">
    <h3 className="font-semibold">Settings</h3>
  </div>
  <div className="p-4">
    <p>Card body content</p>
  </div>
  <div className="border-t p-4 bg-gray-50">
    <ForgeButton variant="primary">Save</ForgeButton>
  </div>
</ForgeCard>

// Clickable card
<ForgeCard className="cursor-pointer hover:shadow-lg transition-shadow">
  <div className="p-6">
    <h3 className="text-lg font-semibold">Feature Card</h3>
    <p className="text-gray-600">Click to learn more</p>
  </div>
</ForgeCard>
```

### ForgeAlert
**Purpose**: Status messages, notifications, feedback

```jsx
// React Examples
import { ForgeAlert } from '@nexcraft/forge/integrations/react'

// Success alert
<ForgeAlert severity="success" variant="filled">
  Your changes have been saved successfully!
</ForgeAlert>

// Error alert with close button
<ForgeAlert 
  severity="error" 
  variant="standard" 
  closable={true}
  title="Error"
  message="Failed to save changes. Please try again."
/>

// Warning alert
<ForgeAlert severity="warning" variant="outlined">
  Your session will expire in 5 minutes.
</ForgeAlert>

// Info alert with custom action
<ForgeAlert severity="info" variant="standard">
  <span>New features available!</span>
  <ForgeButton size="sm" variant="ghost" slot="actions">
    Learn More
  </ForgeButton>
</ForgeAlert>
```

## 🧩 Molecules (Composite Components)

### ForgeModal
**Purpose**: Dialogs, confirmations, forms in overlays

```jsx
// React Examples
import { ForgeModal } from '@nexcraft/forge/integrations/react'

// Basic modal
<ForgeModal open={isOpen} onClose={() => setIsOpen(false)}>
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
    <p className="mb-6">Are you sure you want to continue?</p>
    <div className="flex gap-3 justify-end">
      <ForgeButton variant="secondary" onClick={() => setIsOpen(false)}>
        Cancel
      </ForgeButton>
      <ForgeButton variant="primary" onClick={handleConfirm}>
        Confirm
      </ForgeButton>
    </div>
  </div>
</ForgeModal>

// Form modal
<ForgeModal open={showForm} onClose={() => setShowForm(false)}>
  <div className="p-6 w-full max-w-md">
    <h2 className="text-xl font-bold mb-6">Add User</h2>
    <form className="space-y-4">
      <ForgeInput label="Name" required />
      <ForgeInput type="email" label="Email" required />
      <ForgeSelect label="Role" options={roleOptions} />
      <div className="flex gap-3 pt-4">
        <ForgeButton 
          type="button" 
          variant="secondary" 
          onClick={() => setShowForm(false)}
        >
          Cancel
        </ForgeButton>
        <ForgeButton type="submit" variant="primary">
          Add User
        </ForgeButton>
      </div>
    </form>
  </div>
</ForgeModal>
```

### ForgeSelect
**Purpose**: Dropdown selections, option pickers

```jsx
// React Examples
import { ForgeSelect } from '@nexcraft/forge/integrations/react'

// Basic select
<ForgeSelect 
  label="Country" 
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' }
  ]}
  placeholder="Select a country"
/>

// Multi-select
<ForgeSelect 
  label="Skills" 
  multiple={true}
  options={skillOptions}
  placeholder="Select your skills"
/>

// Select with search
<ForgeSelect 
  label="City" 
  searchable={true}
  options={cityOptions}
  placeholder="Search for a city"
/>
```

## 🏗️ Organisms (Complex Components)

### ForgeDataTable
**Purpose**: Data grids, lists with actions, sortable tables

```jsx
// React Examples
import { ForgeDataTable } from '@nexcraft/forge/integrations/react'

// Basic data table
const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email' },
  { key: 'role', title: 'Role' },
  {
    key: 'actions',
    title: 'Actions',
    render: (_, row) => (
      <div className="flex gap-2">
        <ForgeButton size="sm" variant="ghost" icon="edit">
          Edit
        </ForgeButton>
        <ForgeButton size="sm" variant="ghost" icon="trash">
          Delete
        </ForgeButton>
      </div>
    )
  }
]

<ForgeDataTable 
  data={users}
  columns={columns}
  pagination={true}
  pageSize={10}
  selectable={true}
/>

// Data table with custom cells
const advancedColumns = [
  { key: 'name', title: 'Name' },
  { 
    key: 'status', 
    title: 'Status',
    render: (status) => (
      <ForgeBadge variant={status === 'active' ? 'success' : 'warning'}>
        {status}
      </ForgeBadge>
    )
  },
  {
    key: 'progress',
    title: 'Progress',
    render: (progress) => (
      <ForgeProgress value={progress} max={100} />
    )
  }
]
```

## 🎨 Framework Patterns

### React Hook Form Integration

```jsx
import { useForm } from 'react-hook-form'
import { RHFForgeInput, RHFForgeSelect } from '@nexcraft/forge/integrations/rhf'

function UserForm() {
  const { control, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <RHFForgeInput 
        name="firstName"
        label="First Name"
        control={control}
        rules={{ required: 'First name is required' }}
      />
      
      <RHFForgeInput 
        name="email"
        type="email"
        label="Email"
        control={control}
        rules={{ 
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address'
          }
        }}
      />
      
      <RHFForgeSelect 
        name="role"
        label="Role"
        control={control}
        options={[
          { value: 'admin', label: 'Administrator' },
          { value: 'user', label: 'User' }
        ]}
      />
      
      <ForgeButton type="submit" variant="primary">
        Submit
      </ForgeButton>
    </form>
  )
}
```

### Next.js SSR Pattern

```jsx
// pages/users.js
import { ForgeCard, ForgeButton } from '@nexcraft/forge/integrations/react'

export default function UsersPage({ users }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="grid gap-4">
        {users.map(user => (
          <ForgeCard key={user.id}>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <ForgeButton variant="secondary" size="sm">
                View Profile
              </ForgeButton>
            </div>
          </ForgeCard>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  // Components render semantic HTML during SSR
  const users = await fetchUsers()
  return { props: { users } }
}
```

### Tailwind CSS Integration

```jsx
// With Tailwind plugin
import forgePlugin from '@nexcraft/forge/plugin'

// tailwind.config.js
export default {
  plugins: [forgePlugin],
  theme: {
    extend: {
      colors: {
        'brand': '#3b82f6' // Maps to forge-primary
      }
    }
  }
}

// Usage with Tailwind classes
<ForgeButton className="bg-brand hover:bg-brand/90 text-white">
  Custom Styled Button
</ForgeButton>

<ForgeCard className="shadow-lg border-2 border-brand/20">
  <div className="p-6 space-y-4">
    <h3 className="text-brand font-bold text-xl">Branded Card</h3>
    <p className="text-gray-600">Content with Tailwind styling</p>
  </div>
</ForgeCard>
```

## 🔧 Common Use Cases

### Authentication Forms

```jsx
// Login Form
function LoginForm() {
  return (
    <ForgeCard className="max-w-md mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form className="space-y-4">
          <ForgeInput 
            type="email" 
            label="Email" 
            placeholder="Enter your email"
            required 
          />
          <ForgeInput 
            type="password" 
            label="Password" 
            placeholder="Enter your password"
            required 
          />
          <ForgeButton type="submit" variant="primary" className="w-full">
            Sign In
          </ForgeButton>
        </form>
      </div>
    </ForgeCard>
  )
}

// Registration Form
function RegisterForm() {
  return (
    <ForgeCard className="max-w-md mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ForgeInput label="First Name" required />
            <ForgeInput label="Last Name" required />
          </div>
          <ForgeInput type="email" label="Email" required />
          <ForgeInput type="password" label="Password" required />
          <ForgeInput type="password" label="Confirm Password" required />
          <ForgeCheckbox label="I agree to the terms and conditions" required />
          <ForgeButton type="submit" variant="primary" className="w-full">
            Create Account
          </ForgeButton>
        </form>
      </div>
    </ForgeCard>
  )
}
```

### Dashboard Layouts

```jsx
// Metrics Dashboard
function MetricsDashboard({ metrics }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ForgeButton variant="primary" icon="refresh">
          Refresh Data
        </ForgeButton>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ForgeCard>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{metrics.users}</p>
            <ForgeBadge variant="success">+12%</ForgeBadge>
          </div>
        </ForgeCard>
        
        <ForgeCard>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Revenue</h3>
            <p className="text-3xl font-bold text-green-600">${metrics.revenue}</p>
            <ForgeProgress value={75} className="mt-2" />
          </div>
        </ForgeCard>
        
        <ForgeCard>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Orders</h3>
            <p className="text-3xl font-bold text-purple-600">{metrics.orders}</p>
            <ForgeBadge variant="warning">-3%</ForgeBadge>
          </div>
        </ForgeCard>
        
        <ForgeCard>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Conversion</h3>
            <p className="text-3xl font-bold text-orange-600">{metrics.conversion}%</p>
            <ForgeBadge variant="info">Stable</ForgeBadge>
          </div>
        </ForgeCard>
      </div>

      {/* Data Table */}
      <ForgeCard>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <ForgeDataTable 
            data={metrics.recentOrders}
            columns={[
              { key: 'id', title: 'Order ID' },
              { key: 'customer', title: 'Customer' },
              { key: 'amount', title: 'Amount' },
              { key: 'status', title: 'Status' },
              { key: 'actions', title: 'Actions' }
            ]}
          />
        </div>
      </ForgeCard>
    </div>
  )
}
```

---

## 💡 AI Tool Tips

1. **Import Strategy**: Use React integrations for better TypeScript support
2. **Styling**: Combine built-in variants with Tailwind classes
3. **Forms**: Use React Hook Form integration for validation
4. **Performance**: Use selective imports for smaller bundles
5. **Accessibility**: Components include ARIA attributes automatically
6. **SSR**: All components work with Next.js and other SSR frameworks

## 📚 More Resources

- [Component Documentation](./docs/components/)
- [Integration Guides](./docs/guides/)
- [Tailwind Plugin Guide](./docs/guides/tailwind-plugin.md)
- [Selective Imports Guide](./docs/guides/selective-imports.md)