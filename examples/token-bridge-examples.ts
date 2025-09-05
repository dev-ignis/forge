/**
 * @fileoverview Token Bridge Usage Examples
 * 
 * This file demonstrates how to use the Design Token Bridge to convert
 * tokens from popular design systems into @nexcraft/forge format.
 */

import { TokenBridge } from '../src/utils/token-bridge';

// Example 1: Import from Figma Design Tokens
export function figmaExample() {
  console.log('=== Figma Token Import Example ===');
  
  const figmaTokens = {
    'Brand/Primary/Blue/500': {
      value: '#3b82f6',
      type: 'color',
      description: 'Primary brand color for buttons and links'
    },
    'Brand/Primary/Blue/600': {
      value: '#2563eb',
      type: 'color',
      description: 'Darker shade for hover states'
    },
    'Semantic/Success/Background': {
      value: '#dcfce7',
      type: 'color',
      description: 'Success message background'
    },
    'Layout/Spacing/Component/Padding/Small': {
      value: '8px',
      type: 'dimension',
      description: 'Small component padding'
    }
  };

  const bridge = TokenBridge.fromFigma(figmaTokens);
  
  console.log('Imported tokens:', bridge.getTokens().length);
  console.log('Color tokens:', bridge.getTokensByType('color').length);
  console.log('Spacing tokens:', bridge.getTokensByType('spacing').length);
  
  // Generate CSS custom properties
  console.log('\nGenerated CSS:');
  console.log(bridge.toCSSProperties());
  
  return bridge;
}

// Example 2: Import from Tailwind CSS config
export function tailwindExample() {
  console.log('\n=== Tailwind Config Import Example ===');
  
  const tailwindConfig = {
    theme: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000000',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        }
      },
      spacing: {
        px: '1px',
        0: '0px',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem'
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }]
      }
    }
  };

  const bridge = TokenBridge.fromTailwind(tailwindConfig);
  
  console.log('Imported tokens:', bridge.getTokens().length);
  console.log('Color tokens:', bridge.getTokensByType('color').length);
  console.log('Spacing tokens:', bridge.getTokensByType('spacing').length);
  console.log('Typography tokens:', bridge.getTokensByType('typography').length);
  
  // Generate different output formats
  console.log('\nCSS Custom Properties:');
  console.log(bridge.toCSSProperties().substring(0, 200) + '...');
  
  console.log('\nSass Variables:');
  console.log(bridge.toSassVariables().split('\n').slice(0, 5).join('\n') + '...');
  
  console.log('\nJavaScript Object (partial):');
  const jsObj = bridge.toJSObject();
  console.log('Blue colors:', jsObj.blue);
  console.log('Spacing samples:', {
    small: jsObj.spacing['2'],
    medium: jsObj.spacing['4'],
    large: jsObj.spacing['8']
  });
  
  return bridge;
}

// Example 3: Import from Material Design tokens
export function materialExample() {
  console.log('\n=== Material Design Import Example ===');
  
  const materialTokens = {
    sys: {
      color: {
        primary: '#6750a4',
        'on-primary': '#ffffff',
        'primary-container': '#eaddff',
        'on-primary-container': '#21005d',
        secondary: '#625b71',
        'on-secondary': '#ffffff',
        'secondary-container': '#e8def8',
        'on-secondary-container': '#1d192b',
        tertiary: '#7d5260',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#ffd8e4',
        'on-tertiary-container': '#31111d',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#410002',
        background: '#fffbfe',
        'on-background': '#1c1b1f',
        surface: '#fffbfe',
        'on-surface': '#1c1b1f'
      }
    },
    ref: {
      palette: {
        primary: {
          0: '#000000',
          10: '#21005d',
          20: '#381e72',
          30: '#4f378b',
          40: '#6750a4',
          50: '#7f67be',
          60: '#9a82db',
          70: '#b69df8',
          80: '#d0bcff',
          90: '#eaddff',
          95: '#f6edff',
          99: '#fffbfe',
          100: '#ffffff'
        },
        secondary: {
          0: '#000000',
          10: '#1d192b',
          20: '#332d41',
          30: '#4a4458',
          40: '#625b71',
          50: '#7a7289',
          60: '#958da5',
          70: '#b0a7c0',
          80: '#ccc2dc',
          90: '#e8def8',
          95: '#f6edff',
          99: '#fffbfe',
          100: '#ffffff'
        }
      }
    }
  };

  const bridge = TokenBridge.fromMaterial(materialTokens);
  
  console.log('Imported tokens:', bridge.getTokens().length);
  console.log('System color tokens:', bridge.getTokensByCategory('system.colors').length);
  console.log('Reference palette tokens:', bridge.getTokensByCategory('reference.palette').length);
  
  // Show some specific tokens
  console.log('\nSystem Color Tokens:');
  const systemColors = bridge.getTokensByCategory('system.colors').slice(0, 5);
  systemColors.forEach(token => {
    console.log(`  ${token.name}: ${token.value}`);
  });
  
  console.log('\nReference Palette Tokens (Primary):');
  const primaryPalette = bridge.getTokens().filter(t => t.name.includes('ref.palette.primary')).slice(0, 5);
  primaryPalette.forEach(token => {
    console.log(`  ${token.name}: ${token.value}`);
  });
  
  return bridge;
}

// Example 4: Advanced usage with custom processing
export function advancedExample() {
  console.log('\n=== Advanced Usage Example ===');
  
  // Create empty bridge
  const bridge = new TokenBridge();
  
  // Add custom tokens
  bridge.addToken({
    name: 'brand.primary',
    value: '#6366f1',
    type: 'color',
    category: 'brand',
    description: 'Primary brand color'
  });
  
  bridge.addToken({
    name: 'brand.secondary',
    value: '#8b5cf6',
    type: 'color',
    category: 'brand',
    description: 'Secondary brand color'
  });
  
  bridge.addToken({
    name: 'layout.header.height',
    value: '64px',
    type: 'spacing',
    category: 'layout',
    description: 'Header height'
  });
  
  // Filter and organize tokens
  const brandColors = bridge.getTokensByCategory('brand');
  const layoutTokens = bridge.getTokensByCategory('layout');
  
  console.log('Brand colors:', brandColors.length);
  console.log('Layout tokens:', layoutTokens.length);
  
  // Generate complete token collection
  const collection = bridge.toJSON();
  console.log('\nToken Collection:');
  console.log(`Name: ${collection.name}`);
  console.log(`Version: ${collection.version}`);
  console.log(`Generated: ${collection.metadata?.generatedAt}`);
  console.log(`Converter: ${collection.metadata?.converter}`);
  
  return bridge;
}

// Example 5: Real-world integration example
export function integrationExample() {
  console.log('\n=== Real-world Integration Example ===');
  
  // Simulate loading tokens from different sources
  const figmaTokens = {
    'Brand/Primary': { value: '#6366f1', type: 'color' },
    'Brand/Secondary': { value: '#8b5cf6', type: 'color' },
  };
  
  const tailwindSpacing = {
    theme: {
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem'
      }
    }
  };
  
  // Create bridges for different sources
  const figmaBridge = TokenBridge.fromFigma(figmaTokens);
  const tailwindBridge = TokenBridge.fromTailwind(tailwindSpacing);
  
  // Combine tokens into a master bridge
  const masterBridge = new TokenBridge();
  
  // Add all tokens from different sources
  figmaBridge.getTokens().forEach(token => masterBridge.addToken(token));
  tailwindBridge.getTokens().forEach(token => masterBridge.addToken(token));
  
  // Add some custom tokens
  masterBridge.addToken({
    name: 'component.button.padding',
    value: '0.5rem 1rem',
    type: 'spacing',
    category: 'component'
  });
  
  console.log('Combined tokens:', masterBridge.getTokens().length);
  
  // Export for different use cases
  const cssOutput = masterBridge.toCSSProperties();
  const jsOutput = masterBridge.toJSObject();
  const sassOutput = masterBridge.toSassVariables();
  
  console.log('\nExport options available:');
  console.log('- CSS Custom Properties (' + cssOutput.split('\n').length + ' lines)');
  console.log('- JavaScript Object (' + Object.keys(jsOutput).length + ' root keys)');
  console.log('- Sass Variables (' + sassOutput.split('\n').length + ' variables)');
  
  // Show practical usage
  console.log('\nPractical Usage:');
  console.log('1. Save CSS to: tokens.css');
  console.log('2. Save JS to: tokens.js');
  console.log('3. Save Sass to: _tokens.scss');
  console.log('4. Import in your app and use: var(--forge-brand-primary)');
  
  return {
    bridge: masterBridge,
    css: cssOutput,
    js: jsOutput,
    sass: sassOutput
  };
}

// Run all examples
if (typeof require !== 'undefined' && require.main === module) {
  figmaExample();
  tailwindExample();
  materialExample();
  advancedExample();
  integrationExample();
}