'use client';
// SSR Demo - Client components with SSR fallback testing
import { ForgeButton, ForgeCard, ForgeInput, ForgeAlert } from '@nexcraft/forge/integrations/react';

export default function SSRDemo() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">SSR Demo</h1>
          <p className="text-lg text-gray-700 mb-6">
            This page demonstrates server-side rendering of Forge components. 
            View page source to see semantic HTML fallbacks that progressively enhance to web components.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Basic Components */}
          <ForgeCard>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Basic Components (SSR)</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Text Input (SSR)</label>
                  <ForgeInput
                    placeholder="This renders as &lt;input&gt; during SSR"
                    className="w-full"
                  />
                </div>

                <div className="flex gap-3">
                  <ForgeButton variant="primary">Primary Button</ForgeButton>
                  <ForgeButton variant="secondary">Secondary Button</ForgeButton>
                </div>

                <ForgeAlert severity="info">
                  This alert is rendered server-side as semantic HTML with proper accessibility attributes.
                </ForgeAlert>
              </div>
            </div>
          </ForgeCard>

          {/* SSR Testing Instructions */}
          <ForgeCard>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">SSR Validation Steps</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">1</span>
                  <div>
                    <strong>View Page Source</strong> - Right-click → "View Page Source" to see the rendered HTML
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">2</span>
                  <div>
                    <strong>Check Semantic HTML</strong> - Components should render as standard HTML elements (&lt;input&gt;, &lt;button&gt;, etc.)
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">3</span>
                  <div>
                    <strong>Verify Accessibility</strong> - Proper ARIA attributes and semantic structure
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">4</span>
                  <div>
                    <strong>Test Progressive Enhancement</strong> - Components upgrade to web components after JavaScript loads
                  </div>
                </div>
              </div>
            </div>
          </ForgeCard>

          {/* Technical Details */}
          <ForgeCard>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Technical Implementation</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  The unified architecture ensures components work seamlessly in all environments:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>SSR Phase:</strong> Components render as semantic HTML with proper styling</li>
                  <li><strong>Hydration:</strong> Client-side JavaScript progressively enhances HTML to web components</li>
                  <li><strong>No Mismatches:</strong> suppressHydrationWarning prevents React hydration conflicts</li>
                  <li><strong>Fallback Support:</strong> Works even if JavaScript fails to load</li>
                </ul>
              </div>
            </div>
          </ForgeCard>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Examples
          </a>
        </div>
      </main>
    </div>
  );
}