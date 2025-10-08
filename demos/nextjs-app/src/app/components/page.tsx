'use client';

import React from 'react';
import Link from 'next/link';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'forge-button': any;
      'forge-card': any;
      'forge-input': any;
      'forge-checkbox': any;
      'forge-alert': any;
      'forge-badge': any;
      'forge-switch': any;
      'forge-radio-group': any;
      'forge-select': any;
      'forge-progress': any;
      'forge-skeleton': any;
      'forge-avatar': any;
      'forge-tabs': any;
      'forge-modal': any;
      'forge-tooltip': any;
    }
  }
}

export default function ComponentsShowcase() {
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [switchOn, setSwitchOn] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('tab-1');
  const [selectedRadio, setSelectedRadio] = React.useState('option-1');

  React.useEffect(() => {
    // Register all components
    import('@nexcraft/forge').then((forge) => {
      const components = [
        ['forge-button', forge.ForgeButton],
        ['forge-card', forge.ForgeCard],
        ['forge-input', forge.ForgeInput],
        ['forge-checkbox', forge.ForgeCheckbox],
        ['forge-alert', forge.ForgeAlert],
        ['forge-badge', forge.ForgeBadge],
        ['forge-switch', forge.ForgeSwitch],
        ['forge-radio-group', forge.ForgeRadioGroup],
        ['forge-select', forge.ForgeSelect],
        ['forge-progress', forge.ForgeProgress],
        ['forge-skeleton', forge.ForgeSkeleton],
        ['forge-avatar', forge.ForgeAvatar],
        ['forge-tabs', forge.ForgeTabs],
        ['forge-modal', forge.ForgeModal],
        ['forge-tooltip', forge.ForgeTooltip],
      ] as const;

      components.forEach(([name, component]) => {
        if (!customElements.get(name) && component) {
          customElements.define(name, component);
        }
      });

      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return <div className="p-8">Loading components...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Radix Style */}
      <section className="border-b border-neutral-200">
        <div className="container mx-auto px-6 py-24 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-neutral-900 tracking-tight">
              Components
            </h1>
            <p className="text-2xl text-neutral-600 leading-relaxed">
              Unstyled, accessible components for building high-quality web applications with React.
            </p>
          </div>
        </div>
      </section>

      {/* Component Grid - Radix Style */}
      <section className="border-b border-neutral-200">
        <div className="container mx-auto px-6 py-16 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">

            {/* Button */}
            <div className="bg-white p-8 hover:bg-neutral-50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Button</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                Trigger actions and events with accessible button components.
              </p>
              <div className="flex flex-wrap gap-3">
                <forge-button variant="primary">Primary</forge-button>
                <forge-button variant="secondary">Secondary</forge-button>
                <forge-button variant="ghost">Ghost</forge-button>
              </div>
            </div>

            {/* Input */}
            <div className="bg-white p-8 hover:bg-neutral-50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Input</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                Capture user input with accessible text field components.
              </p>
              <forge-input
                value={value}
                placeholder="Enter text..."
              />
            </div>

            {/* Checkbox */}
            <div className="bg-white p-8 hover:bg-neutral-50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Checkbox</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                Binary selection input with accessible checked state.
              </p>
              <div className="flex items-center gap-3">
                <forge-checkbox checked={checked} />
                <span className="text-sm text-neutral-700">Accept terms</span>
              </div>
            </div>

            {/* Switch */}
            <div className="bg-white p-8 hover:bg-neutral-50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Switch</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                Toggle between two states with accessible switch control.
              </p>
              <div className="flex items-center gap-3">
                <forge-switch checked={switchOn} />
                <span className="text-sm text-neutral-700">Enable feature</span>
              </div>
            </div>

            {/* Badge */}
            <div className="bg-white p-8 hover:bg-neutral-50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Badge</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                Display status indicators and small labels.
              </p>
              <div className="flex flex-wrap gap-2">
                <forge-badge variant="primary">Primary</forge-badge>
                <forge-badge variant="success">Success</forge-badge>
                <forge-badge variant="warning">Warning</forge-badge>
              </div>
            </div>

            {/* Avatar */}
            <div className="bg-white p-8 hover:bg-neutral-50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Avatar</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                Display user profile pictures or initials.
              </p>
              <div className="flex items-center gap-3">
                <forge-avatar size="sm" initials="AB" />
                <forge-avatar size="md" initials="CD" />
                <forge-avatar size="lg" initials="EF" />
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white p-8 hover:bg-neutral-50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Progress</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                Visual indicator for task completion and loading states.
              </p>
              <div className="space-y-3">
                <forge-progress value="75" max="100" />
                <forge-progress value="45" max="100" />
              </div>
            </div>

            {/* Skeleton */}
            <div className="bg-white p-8 hover:bg-neutral-50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Skeleton</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                Placeholder for content that is still loading.
              </p>
              <div className="space-y-2">
                <forge-skeleton width="100%" height="20px" />
                <forge-skeleton width="80%" height="20px" />
                <forge-skeleton width="60%" height="20px" />
              </div>
            </div>

            {/* Alert */}
            <div className="bg-white p-8 hover:bg-neutral-50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Alert</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                Display important messages and feedback to users.
              </p>
              <div className="space-y-3">
                <forge-alert severity="success">Success message</forge-alert>
                <forge-alert severity="error">Error message</forge-alert>
              </div>
            </div>

            {/* Card */}
            <div className="bg-white p-8 hover:bg-neutral-50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Card</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                Container for grouping related content and actions.
              </p>
              <forge-card className="p-4 border border-neutral-200">
                <p className="text-sm">Card content goes here</p>
              </forge-card>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              ← Back to Home
            </Link>
            <p className="text-sm text-neutral-500">
              Built with Forge UI
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Dialog */}
      {open && (
        <forge-modal open onClose={() => setOpen(false)}>
          <div slot="header">
            <h2 className="text-xl font-semibold text-neutral-900">Modal Example</h2>
          </div>
          <div className="py-6">
            <p className="text-neutral-700 mb-4">
              This is a modal dialog component that overlays the main content.
            </p>
            <p className="text-sm text-neutral-600">
              Click outside, press ESC, or use the buttons below to close.
            </p>
          </div>
          <div slot="footer" className="flex gap-3 justify-end">
            <forge-button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </forge-button>
            <forge-button variant="primary" onClick={() => setOpen(false)}>
              Confirm
            </forge-button>
          </div>
        </forge-modal>
      )}
    </div>
  );
}
