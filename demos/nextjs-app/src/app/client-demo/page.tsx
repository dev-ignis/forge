'use client';

import { useEffect, useState } from 'react';
import { ForgeButton, ForgeBadge, ForgeCard } from '@nexcraft/forge-react';

export default function ClientDemo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load web components
    import('@nexcraft/forge').then(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return <div className="p-8">Loading components...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Forge Components - Client Only Demo</h1>

      <div className="space-y-8">
        <ForgeCard>
          <h2 className="text-2xl font-bold mb-4">Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <ForgeButton variant="primary">Primary Button</ForgeButton>
            <ForgeButton variant="secondary">Secondary Button</ForgeButton>
            <ForgeButton variant="success">Success Button</ForgeButton>
            <ForgeButton variant="danger">Danger Button</ForgeButton>
            <ForgeButton variant="ghost">Ghost Button</ForgeButton>
          </div>
        </ForgeCard>

        <ForgeCard>
          <h2 className="text-2xl font-bold mb-4">Badges</h2>
          <div className="flex gap-4 flex-wrap">
            <ForgeBadge variant="default">Default</ForgeBadge>
            <ForgeBadge variant="primary">Primary</ForgeBadge>
            <ForgeBadge variant="success">Success</ForgeBadge>
            <ForgeBadge variant="warning">Warning</ForgeBadge>
            <ForgeBadge variant="danger">Danger</ForgeBadge>
            <ForgeBadge variant="info">Info</ForgeBadge>
          </div>
        </ForgeCard>

        <ForgeCard>
          <h2 className="text-2xl font-bold mb-4">Styled Card</h2>
          <p className="text-gray-600">
            This is a Forge Card component with full Shadow DOM styling!
          </p>
        </ForgeCard>
      </div>
    </div>
  );
}
