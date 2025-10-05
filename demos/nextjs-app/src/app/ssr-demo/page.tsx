'use client';

/**
 * SSR Test Page - Client Component (correct approach)
 *
 * This demonstrates the CORRECT way to use Forge components:
 * - Add 'use client' to YOUR file (not Forge library files)
 * - Import Forge components normally
 * - Components render as HTML fallbacks during SSR, hydrate to web components on client
 */

import { ForgeButton, ForgeCard, ForgeAlert, ForgeProvider } from '@nexcraft/forge-react';

export default function SSRDemoPage() {
  return (
    <ForgeProvider config={{ theme: 'light' }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">SSR Compatibility Test</h1>

        <ForgeAlert severity="info" className="mb-6">
          This page is a Client Component (has use client at top of THIS file).
          The Forge library does NOT have use client, preventing pollution.
        </ForgeAlert>

        <ForgeCard className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Correct Architecture</h2>
          <div className="space-y-3 text-gray-700">
            <p><strong>✅ Library files:</strong> NO use client directive</p>
            <p><strong>✅ Consumer files:</strong> Add use client when using Forge components</p>
            <p><strong>✅ SSR flow:</strong> Renders HTML fallback → Hydrates to web component</p>
          </div>
        </ForgeCard>

        <ForgeCard className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Components</h2>
          <div className="space-y-4">
            <ForgeButton variant="primary">Primary Button</ForgeButton>
            <ForgeButton variant="secondary">Secondary Button</ForgeButton>
          </div>
        </ForgeCard>

        <ForgeCard className="p-6">
          <h3 className="text-lg font-semibold mb-2">Why This Approach?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Library stays framework-agnostic (no Next.js-specific directives)</li>
            <li>Consumers control client boundaries</li>
            <li>No forced client-side rendering for all consumers</li>
            <li>Matches industry standard (Radix UI, Headless UI pattern)</li>
          </ul>
        </ForgeCard>
      </div>
    </ForgeProvider>
  );
}
