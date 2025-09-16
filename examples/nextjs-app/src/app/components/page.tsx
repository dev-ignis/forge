'use client';

import React from 'react';
import '@nexcraft/forge';
import {
  ForgeButton,
  ForgeCard,
  ForgeInput,
  ForgeCheckbox,
  ForgeAlert,
  ForgeTooltip,
  ForgeModal,
  ForgeTabs,
} from '@nexcraft/forge/integrations/react';

export default function ComponentsShowcase() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('tab-1');

  return (
    <div className="min-h-screen py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Components Showcase</h1>
        <p className="text-gray-600">Interactive samples for common Forge components</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Buttons */}
        <ForgeCard>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Buttons</h2>
            <div className="flex flex-wrap gap-3">
              <ForgeButton variant="primary">Primary</ForgeButton>
              <ForgeButton variant="secondary">Secondary</ForgeButton>
              <ForgeButton variant="danger">Danger</ForgeButton>
              <ForgeButton variant="ghost">Ghost</ForgeButton>
              <ForgeButton variant="link">Link</ForgeButton>
            </div>
          </div>
        </ForgeCard>

        {/* Inputs */}
        <ForgeCard>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Inputs</h2>
            <div className="space-y-4">
              <ForgeInput
                value={value}
                onChange={(e: any) => setValue(e?.target?.value ?? '')}
                placeholder="Type something..."
                className="w-full"
              />
              <div className="text-sm text-gray-600">Value: <span className="font-mono">{value || '""'}</span></div>
            </div>
          </div>
        </ForgeCard>

        {/* Alerts & Tooltip */}
        <ForgeCard>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Alerts & Tooltip</h2>
            <div className="space-y-3">
              <ForgeAlert severity="success">Operation completed successfully.</ForgeAlert>
              <ForgeAlert severity="warning">This action has side effects.</ForgeAlert>
              <ForgeAlert severity="error">Something went wrong.</ForgeAlert>

              <div className="pt-2">
                <ForgeTooltip content="Hello from Tooltip!">
                  <ForgeButton variant="secondary">Hover me</ForgeButton>
                </ForgeTooltip>
              </div>
            </div>
          </div>
        </ForgeCard>

        {/* Modal & Checkbox */}
        <ForgeCard>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Modal & Checkbox</h2>
            <div className="flex items-center gap-3">
              <ForgeCheckbox
                checked={checked}
                onChange={(e: any) => setChecked(!!e?.target?.checked)}
              />
              <span className="text-sm">Checked: {String(checked)}</span>
            </div>
            <ForgeButton variant="primary" onClick={() => setOpen(true)}>Open Modal</ForgeButton>
            {open && (
              <ForgeModal open onClose={() => setOpen(false)}>
                <div slot="header" className="text-lg font-semibold">Hello Modal</div>
                <div>
                  <p className="text-gray-600">This modal is controlled by React state.</p>
                </div>
                <div slot="footer" className="flex justify-end gap-3">
                  <ForgeButton variant="secondary" onClick={() => setOpen(false)}>Cancel</ForgeButton>
                  <ForgeButton variant="primary" onClick={() => setOpen(false)}>Confirm</ForgeButton>
                </div>
              </ForgeModal>
            )}
          </div>
        </ForgeCard>

        {/* Tabs */}
        <ForgeCard>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Tabs</h2>
            <ForgeTabs
              activeTab={activeTab}
              onTabChange={(e: any) => setActiveTab(e?.detail?.tabId || 'tab-1')}
              tabs={[
                { id: 'tab-1', label: 'Tab 1' },
                { id: 'tab-2', label: 'Tab 2' },
                { id: 'tab-3', label: 'Tab 3' }
              ]}
            >
              <div slot="tab-1" className="text-gray-700">Content for Tab 1</div>
              <div slot="tab-2" className="text-gray-700">Here is Tab 2 content</div>
              <div slot="tab-3" className="text-gray-700">And Tab 3 content</div>
            </ForgeTabs>
          </div>
        </ForgeCard>
      </div>

      <div className="mt-8 text-center">
        <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Examples</a>
      </div>
    </div>
  );
}

