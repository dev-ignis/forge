/**
 * @fileoverview Demonstration of unified SSR/client components
 * 
 * Shows how single components work in both environments
 */

import React from 'react';
import { ForgeButton } from '../components/ForgeButton';

// Same component works everywhere!
export function UnifiedExample() {
  return (
    <div>
      <h2>Unified Component Usage</h2>
      
      {/* Works in SSR - renders semantic HTML */}
      {/* Works in client - renders web component */}
      {/* NO separate imports needed! */}
      
      <ForgeButton 
        variant="primary" 
        onClick={() => console.log('Clicked!')}
      >
        Primary Action
      </ForgeButton>
      
      <ForgeButton 
        variant="secondary" 
        disabled
      >
        Disabled Secondary
      </ForgeButton>
      
      <ForgeButton 
        variant="danger" 
        loading
        onClick={() => console.log('Loading...')}
      >
        Loading State
      </ForgeButton>
    </div>
  );
}

// Next.js Page Example
export function NextJSPage() {
  return (
    <div>
      <h1>My Next.js Page</h1>
      
      {/* No ClientOnly wrapper needed! */}
      {/* Automatically works with SSR */}
      <ForgeButton variant="primary">
        Get Started
      </ForgeButton>
    </div>
  );
}

// Client-only app (like Vite/CRA)
export function ClientOnlyApp() {
  return (
    <div>
      <h1>My Client App</h1>
      
      {/* Same component, works in client-only too */}
      <ForgeButton variant="secondary">
        Learn More  
      </ForgeButton>
    </div>
  );
}

export default UnifiedExample;