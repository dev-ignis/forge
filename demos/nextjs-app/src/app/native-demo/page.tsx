'use client';

import { useEffect, useState } from 'react';

export default function NativeDemo() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load web components
    import('@nexcraft/forge').then(() => {
      console.log('Forge loaded');
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Native Web Components Test</h1>

      <div className="space-y-8">
        <div className="p-4 bg-white rounded">
          <h2 className="text-2xl font-bold mb-4">Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <forge-button variant="primary">Primary Button</forge-button>
            <forge-button variant="secondary">Secondary Button</forge-button>
            <forge-button variant="success">Success Button</forge-button>
            <forge-button variant="danger">Danger Button</forge-button>
          </div>
        </div>

        <div className="p-4 bg-white rounded">
          <h2 className="text-2xl font-bold mb-4">Badges</h2>
          <div className="flex gap-4 flex-wrap">
            <forge-badge variant="primary">Primary</forge-badge>
            <forge-badge variant="success">Success</forge-badge>
            <forge-badge variant="warning">Warning</forge-badge>
            <forge-badge variant="danger">Danger</forge-badge>
          </div>
        </div>

        <forge-card>
          <h2 className="text-2xl font-bold mb-4">Native Card</h2>
          <p>This is a native web component card with Shadow DOM styling.</p>
        </forge-card>
      </div>
    </div>
  );
}
