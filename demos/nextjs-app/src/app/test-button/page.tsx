'use client';

import { useEffect, useState } from 'react';

export default function TestButtonPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Manually import and register the web component
    import('@nexcraft/forge').then((forge) => {
      if (!customElements.get('forge-button')) {
        customElements.define('forge-button', forge.ForgeButton);
        console.log('✅ Manually registered forge-button');
      }
    });
  }, []);

  if (!mounted) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Test: Single Forge Button</h1>

      <div className="space-y-6">
        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-4">Direct Web Component (should have styles):</h2>
          <forge-button variant="primary">
            Primary Button
          </forge-button>
        </div>

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-4">Regular HTML Button (for comparison):</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Regular Button
          </button>
        </div>
      </div>
    </div>
  );
}
