/**
 * @fileoverview Tests for Design Token Bridge system
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { TokenBridge, ColorConverter, type DesignToken } from './token-bridge';

describe('TokenBridge', () => {
  let bridge: TokenBridge;

  beforeEach(() => {
    bridge = new TokenBridge();
  });

  describe('Basic Token Management', () => {
    it('should add and retrieve tokens', () => {
      const token: DesignToken = {
        name: 'primary.500',
        value: '#3b82f6',
        type: 'color',
        category: 'colors'
      };

      bridge.addToken(token);
      const tokens = bridge.getTokens();

      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toEqual(token);
    });

    it('should filter tokens by category', () => {
      bridge.addToken({
        name: 'primary.500',
        value: '#3b82f6',
        type: 'color',
        category: 'colors'
      });

      bridge.addToken({
        name: 'spacing.4',
        value: '1rem',
        type: 'spacing',
        category: 'spacing'
      });

      const colorTokens = bridge.getTokensByCategory('colors');
      const spacingTokens = bridge.getTokensByCategory('spacing');

      expect(colorTokens).toHaveLength(1);
      expect(spacingTokens).toHaveLength(1);
      expect(colorTokens[0].name).toBe('primary.500');
      expect(spacingTokens[0].name).toBe('spacing.4');
    });

    it('should filter tokens by type', () => {
      bridge.addToken({
        name: 'primary.500',
        value: '#3b82f6',
        type: 'color',
        category: 'colors'
      });

      bridge.addToken({
        name: 'secondary.300',
        value: '#a855f7',
        type: 'color',
        category: 'colors'
      });

      bridge.addToken({
        name: 'spacing.4',
        value: '1rem',
        type: 'spacing',
        category: 'spacing'
      });

      const colorTokens = bridge.getTokensByType('color');
      const spacingTokens = bridge.getTokensByType('spacing');

      expect(colorTokens).toHaveLength(2);
      expect(spacingTokens).toHaveLength(1);
    });
  });

  describe('Figma Token Import', () => {
    it('should import basic Figma tokens', () => {
      const figmaTokens = {
        'primary-500': {
          value: '#3b82f6',
          type: 'color',
          description: 'Primary blue color'
        },
        'spacing-md': {
          value: '16px',
          type: 'dimension',
          description: 'Medium spacing'
        }
      };

      const bridge = TokenBridge.fromFigma(figmaTokens);
      const tokens = bridge.getTokens();

      expect(tokens).toHaveLength(2);
      
      const primaryColor = tokens.find(t => t.name === 'primary.500');
      expect(primaryColor).toBeDefined();
      expect(primaryColor?.value).toBe('#3b82f6');
      expect(primaryColor?.type).toBe('color');
      expect(primaryColor?.description).toBe('Primary blue color');

      const spacing = tokens.find(t => t.name === 'spacing.md');
      expect(spacing).toBeDefined();
      expect(spacing?.value).toBe('16px');
      expect(spacing?.type).toBe('spacing');
    });

    it('should handle invalid Figma tokens gracefully', () => {
      expect(() => TokenBridge.fromFigma(null)).toThrow('Invalid Figma tokens format');
      expect(() => TokenBridge.fromFigma('invalid')).toThrow('Invalid Figma tokens format');
      expect(() => TokenBridge.fromFigma({})).not.toThrow();
    });

    it('should normalize Figma token names correctly', () => {
      const figmaTokens = {
        'Primary/Blue/500': {
          value: '#3b82f6',
          type: 'color'
        },
        'spacing-extra-large': {
          value: '32px',
          type: 'dimension'
        }
      };

      const bridge = TokenBridge.fromFigma(figmaTokens);
      const tokens = bridge.getTokens();

      expect(tokens.some(t => t.name === 'primary.blue.500')).toBe(true);
      expect(tokens.some(t => t.name === 'spacing.extra.large')).toBe(true);
    });
  });

  describe('Tailwind Config Import', () => {
    it('should import Tailwind colors', () => {
      const tailwindConfig = {
        theme: {
          colors: {
            blue: {
              500: '#3b82f6',
              600: '#2563eb'
            },
            red: '#ef4444'
          }
        }
      };

      const bridge = TokenBridge.fromTailwind(tailwindConfig);
      const colorTokens = bridge.getTokensByType('color');

      expect(colorTokens).toHaveLength(3);
      expect(colorTokens.some(t => t.name === 'blue.500')).toBe(true);
      expect(colorTokens.some(t => t.name === 'blue.600')).toBe(true);
      expect(colorTokens.some(t => t.name === 'red')).toBe(true);
    });

    it('should import Tailwind spacing', () => {
      const tailwindConfig = {
        theme: {
          spacing: {
            '4': '1rem',
            '8': '2rem',
            'xl': '36px'
          }
        }
      };

      const bridge = TokenBridge.fromTailwind(tailwindConfig);
      const spacingTokens = bridge.getTokensByType('spacing');

      expect(spacingTokens).toHaveLength(3);
      
      const spacing4 = spacingTokens.find(t => t.name === 'spacing.4');
      expect(spacing4?.value).toBe('1rem');
      expect((spacing4 as any).units).toBe('rem');
      expect((spacing4 as any).pxValue).toBe(16);
    });

    it('should import Tailwind typography', () => {
      const tailwindConfig = {
        theme: {
          fontSize: {
            'sm': '0.875rem',
            'base': ['1rem', { lineHeight: '1.5' }],
            'lg': ['1.125rem', '1.75rem']
          }
        }
      };

      const bridge = TokenBridge.fromTailwind(tailwindConfig);
      const typographyTokens = bridge.getTokensByType('typography');

      expect(typographyTokens).toHaveLength(3);
      
      const baseFontSize = typographyTokens.find(t => t.name === 'typography.base');
      expect(baseFontSize?.value).toEqual({
        fontSize: '1rem',
        lineHeight: '1.5'
      });
    });

    it('should handle invalid Tailwind config', () => {
      expect(() => TokenBridge.fromTailwind({})).toThrow('Invalid Tailwind config format - missing theme');
      expect(() => TokenBridge.fromTailwind({ theme: {} })).not.toThrow();
    });
  });

  describe('Material Design Import', () => {
    it('should import Material Design system tokens', () => {
      const materialTokens = {
        sys: {
          color: {
            primary: '#6750a4',
            secondary: '#625b71',
            error: '#ba1a1a'
          }
        }
      };

      const bridge = TokenBridge.fromMaterial(materialTokens);
      const colorTokens = bridge.getTokensByType('color');

      expect(colorTokens).toHaveLength(3);
      expect(colorTokens.some(t => t.name === 'sys.color.primary')).toBe(true);
      expect(colorTokens.some(t => t.name === 'sys.color.secondary')).toBe(true);
      expect(colorTokens.some(t => t.name === 'sys.color.error')).toBe(true);
    });

    it('should import Material Design reference tokens', () => {
      const materialTokens = {
        ref: {
          palette: {
            primary: {
              '0': '#000000',
              '10': '#21005d',
              '20': '#381e72'
            }
          }
        }
      };

      const bridge = TokenBridge.fromMaterial(materialTokens);
      const colorTokens = bridge.getTokensByType('color');

      expect(colorTokens).toHaveLength(3);
      expect(colorTokens.some(t => t.name === 'ref.palette.primary.0')).toBe(true);
      expect(colorTokens.some(t => t.name === 'ref.palette.primary.10')).toBe(true);
      expect(colorTokens.some(t => t.name === 'ref.palette.primary.20')).toBe(true);
    });
  });

  describe('Output Generation', () => {
    beforeEach(() => {
      bridge.addToken({
        name: 'primary.500',
        value: '#3b82f6',
        type: 'color',
        category: 'colors'
      });

      bridge.addToken({
        name: 'spacing.md',
        value: '1rem',
        type: 'spacing',
        category: 'spacing'
      });
    });

    it('should generate CSS custom properties', () => {
      const css = bridge.toCSSProperties();
      
      expect(css).toContain(':root {');
      expect(css).toContain('--forge-primary-500: #3b82f6;');
      expect(css).toContain('--forge-spacing-md: 1rem;');
      expect(css).toContain('}');
    });

    it('should generate Sass variables', () => {
      const sass = bridge.toSassVariables();
      
      expect(sass).toContain('$forge-primary-500: #3b82f6;');
      expect(sass).toContain('$forge-spacing-md: 1rem;');
    });

    it('should generate JavaScript object', () => {
      const jsObj = bridge.toJSObject();
      
      expect(jsObj.primary['500']).toBe('#3b82f6');
      expect(jsObj.spacing.md).toBe('1rem');
    });

    it('should generate JSON format', () => {
      const json = bridge.toJSON();
      
      expect(json.name).toBe('Converted Design Tokens');
      expect(json.version).toBe('1.0.0');
      expect(json.tokens).toHaveLength(2);
      expect(json.metadata?.source).toBe('token-bridge');
      expect(json.metadata?.converter).toBe('@nexcraft/forge/token-bridge');
    });

    it('should cache output generation results', () => {
      // First call
      const css1 = bridge.toCSSProperties();
      // Second call should return cached result
      const css2 = bridge.toCSSProperties();
      
      expect(css1).toBe(css2);
      
      // Adding token should invalidate cache
      bridge.addToken({
        name: 'secondary.300',
        value: '#a855f7',
        type: 'color',
        category: 'colors'
      });
      
      const css3 = bridge.toCSSProperties();
      expect(css3).not.toBe(css1);
      expect(css3).toContain('--forge-secondary-300: #a855f7;');
    });
  });

  describe('TokenCollection', () => {
    it('should create a complete token collection', () => {
      bridge.addToken({
        name: 'primary.500',
        value: '#3b82f6',
        type: 'color',
        category: 'colors'
      });

      const collection = bridge.toJSON();
      
      expect(collection.name).toBe('Converted Design Tokens');
      expect(collection.tokens).toHaveLength(1);
      expect(collection.metadata?.source).toBe('token-bridge');
    });
  });
});

describe('ColorConverter', () => {
  describe('hexToRgb', () => {
    it('should convert hex to RGB correctly', () => {
      const rgb = ColorConverter.hexToRgb('#3b82f6');
      expect(rgb).toEqual({ r: 59, g: 130, b: 246 });
      
      const rgbShort = ColorConverter.hexToRgb('#fff');
      expect(rgbShort).toBeNull(); // Short format not supported
      
      const invalid = ColorConverter.hexToRgb('invalid');
      expect(invalid).toBeNull();
    });
  });

  describe('rgbToHsl', () => {
    it('should convert RGB to HSL correctly', () => {
      const hsl = ColorConverter.rgbToHsl(59, 130, 246);
      expect(hsl.h).toBeCloseTo(217, 0);
      expect(hsl.s).toBeCloseTo(91, 0);
      expect(hsl.l).toBeCloseTo(60, 0);
    });
  });

  describe('hexToHsl', () => {
    it('should convert hex to HSL correctly', () => {
      const hsl = ColorConverter.hexToHsl('#3b82f6');
      expect(hsl?.h).toBeCloseTo(217, 0);
      expect(hsl?.s).toBeCloseTo(91, 0);
      expect(hsl?.l).toBeCloseTo(60, 0);
      
      const invalid = ColorConverter.hexToHsl('invalid');
      expect(invalid).toBeNull();
    });
  });
});

describe('Integration Tests', () => {
  it('should handle complex real-world Tailwind config', () => {
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
            900: '#111827'
          },
          blue: {
            500: '#3b82f6',
            600: '#2563eb'
          }
        },
        spacing: {
          px: '1px',
          0: '0px',
          0.5: '0.125rem',
          1: '0.25rem',
          96: '24rem'
        },
        fontSize: {
          xs: ['0.75rem', { lineHeight: '1rem' }],
          sm: ['0.875rem', { lineHeight: '1.25rem' }],
          base: ['1rem', { lineHeight: '1.5rem' }],
          xl: ['1.25rem', { lineHeight: '1.75rem' }]
        }
      }
    };

    const bridge = TokenBridge.fromTailwind(tailwindConfig);
    const tokens = bridge.getTokens();

    // Should have imported all tokens
    expect(tokens.length).toBeGreaterThan(10);
    
    // Check specific tokens
    expect(bridge.getTokensByType('color').length).toBeGreaterThan(5);
    expect(bridge.getTokensByType('spacing').length).toBe(5);
    expect(bridge.getTokensByType('typography').length).toBe(4);

    // Verify output generation works
    const css = bridge.toCSSProperties();
    expect(css).toContain('--forge-blue-500: #3b82f6');
    expect(css).toContain('--forge-spacing-px: 1px');
    
    const jsObj = bridge.toJSObject();
    expect(jsObj.blue['500']).toBe('#3b82f6');
    expect(jsObj.spacing.px).toBe('1px');
  });

  it('should handle complex Figma token structure', () => {
    const figmaTokens = {
      'Brand/Primary/Blue/500': {
        value: '#3b82f6',
        type: 'color',
        description: 'Primary brand color'
      },
      'Semantic/Success/Background': {
        value: '#dcfce7',
        type: 'color',
        description: 'Success background'
      },
      'Layout/Spacing/Component/Padding/Small': {
        value: '8px',
        type: 'dimension',
        description: 'Small component padding'
      }
    };

    const bridge = TokenBridge.fromFigma(figmaTokens);
    const tokens = bridge.getTokens();

    expect(tokens).toHaveLength(3);
    
    const primaryBlue = tokens.find(t => t.name === 'brand.primary.blue.500');
    expect(primaryBlue?.value).toBe('#3b82f6');
    expect(primaryBlue?.category).toBe('brand');
    
    const successBg = tokens.find(t => t.name === 'semantic.success.background');
    expect(successBg?.value).toBe('#dcfce7');
    expect(successBg?.category).toBe('semantic');
    
    const padding = tokens.find(t => t.name === 'layout.spacing.component.padding.small');
    expect(padding?.value).toBe('8px');
    expect(padding?.category).toBe('layout');
  });
});