/**
 * @fileoverview Design Token Bridge - Core converter system for importing design tokens
 * from popular design systems (Figma, Tailwind, Material Design, etc.)
 * 
 * This is a key UVP differentiator for @nexcraft/forge
 */

// Core interfaces for design tokens
export interface DesignToken {
  name: string;
  value: string | number;
  type: TokenType;
  category?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export type TokenType = 
  | 'color' 
  | 'spacing' 
  | 'typography' 
  | 'border' 
  | 'shadow' 
  | 'gradient' 
  | 'opacity' 
  | 'animation';

// Color space conversion utilities
export interface ColorToken extends DesignToken {
  type: 'color';
  value: string;
  formats?: {
    hex?: string;
    rgb?: string;
    hsl?: string;
    oklch?: string;
  };
}

export interface SpacingToken extends DesignToken {
  type: 'spacing';
  value: string;
  units: 'px' | 'rem' | 'em' | '%' | 'vw' | 'vh';
  pxValue?: number;
}

export interface TypographyToken extends Omit<DesignToken, 'value'> {
  type: 'typography';
  value: {
    fontSize: string;
    fontWeight?: string | number;
    lineHeight?: string | number;
    fontFamily?: string;
    letterSpacing?: string;
  };
}

export type AnyDesignToken = DesignToken | TypographyToken;

export interface TokenCollection {
  name: string;
  version?: string;
  tokens: AnyDesignToken[];
  metadata?: {
    source: string;
    generatedAt: string;
    converter: string;
  };
}

// Main TokenBridge class
export class TokenBridge {
  private tokens: Map<string, AnyDesignToken> = new Map();
  private cache: Map<string, any> = new Map();

  constructor() {
    this.clearCache();
  }

  /**
   * Import tokens from Figma design tokens JSON
   */
  static fromFigma(figmaTokens: any): TokenBridge {
    const bridge = new TokenBridge();
    
    if (!figmaTokens || typeof figmaTokens !== 'object') {
      throw new Error('Invalid Figma tokens format');
    }

    // Figma tokens structure: { "token-name": { "value": "...", "type": "..." } }
    Object.entries(figmaTokens).forEach(([name, tokenData]: [string, any]) => {
      if (tokenData && typeof tokenData === 'object' && tokenData.value !== undefined) {
        const token: DesignToken = {
          name: bridge.normalizeName(name),
          value: bridge.normalizeValue(tokenData.value, tokenData.type || 'color'),
          type: bridge.mapFigmaType(tokenData.type || 'color'),
          category: bridge.extractCategory(name),
          description: tokenData.description,
          metadata: {
            source: 'figma',
            originalName: name,
            ...tokenData.metadata
          }
        };
        bridge.addToken(token);
      }
    });

    return bridge;
  }

  /**
   * Import tokens from Tailwind CSS config
   */
  static fromTailwind(tailwindConfig: any): TokenBridge {
    const bridge = new TokenBridge();
    
    if (!tailwindConfig?.theme) {
      throw new Error('Invalid Tailwind config format - missing theme');
    }

    const theme = tailwindConfig.theme;

    // Convert colors
    if (theme.colors) {
      bridge.processTailwindColors(theme.colors);
    }

    // Convert spacing
    if (theme.spacing) {
      bridge.processTailwindSpacing(theme.spacing);
    }

    // Convert typography
    if (theme.fontSize) {
      bridge.processTailwindFontSize(theme.fontSize);
    }

    // Convert border radius
    if (theme.borderRadius) {
      bridge.processTailwindBorderRadius(theme.borderRadius);
    }

    // Convert shadows
    if (theme.boxShadow) {
      bridge.processTailwindShadows(theme.boxShadow);
    }

    return bridge;
  }

  /**
   * Import tokens from Material Design tokens
   */
  static fromMaterial(materialTokens: any): TokenBridge {
    const bridge = new TokenBridge();
    
    // Material Design 3 token structure
    if (materialTokens.sys) {
      bridge.processMaterialSystemTokens(materialTokens.sys);
    }
    
    if (materialTokens.ref) {
      bridge.processMaterialReferenceTokens(materialTokens.ref);
    }

    return bridge;
  }

  /**
   * Add a design token to the collection
   */
  addToken(token: AnyDesignToken): void {
    this.tokens.set(token.name, token);
    this.clearCache(); // Invalidate cache when tokens change
  }

  /**
   * Get all tokens
   */
  getTokens(): AnyDesignToken[] {
    return Array.from(this.tokens.values());
  }

  /**
   * Get tokens by category
   */
  getTokensByCategory(category: string): AnyDesignToken[] {
    return this.getTokens().filter(token => token.category === category);
  }

  /**
   * Get tokens by type
   */
  getTokensByType(type: TokenType): AnyDesignToken[] {
    return this.getTokens().filter(token => token.type === type);
  }

  /**
   * Convert to CSS Custom Properties
   */
  toCSSProperties(): string {
    const cacheKey = 'css-properties';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const css = [':root {'];
    
    this.getTokens().forEach(token => {
      const cssName = this.toCSSVariableName(token.name);
      const cssValue = this.toCSSValue(token);
      css.push(`  ${cssName}: ${cssValue};`);
    });
    
    css.push('}');
    
    const result = css.join('\n');
    this.cache.set(cacheKey, result);
    return result;
  }

  /**
   * Convert to JavaScript object
   */
  toJSObject(): Record<string, any> {
    const cacheKey = 'js-object';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const obj: Record<string, any> = {};
    
    this.getTokens().forEach(token => {
      const path = token.name.split('.');
      let current = obj;
      
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {};
        }
        current = current[key];
      }
      
      const finalKey = path[path.length - 1];
      current[finalKey] = token.value;
    });

    this.cache.set(cacheKey, obj);
    return obj;
  }

  /**
   * Convert to Sass variables
   */
  toSassVariables(): string {
    const cacheKey = 'sass-variables';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const sass: string[] = [];
    
    this.getTokens().forEach(token => {
      const sassName = this.toSassVariableName(token.name);
      const sassValue = this.toCSSValue(token);
      sass.push(`${sassName}: ${sassValue};`);
    });

    const result = sass.join('\n');
    this.cache.set(cacheKey, result);
    return result;
  }

  /**
   * Export as standardized JSON format
   */
  toJSON(): TokenCollection {
    return {
      name: 'Converted Design Tokens',
      version: '1.0.0',
      tokens: this.getTokens(),
      metadata: {
        source: 'token-bridge',
        generatedAt: new Date().toISOString(),
        converter: '@nexcraft/forge/token-bridge'
      }
    };
  }

  // Private utility methods
  private normalizeName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '.')
      .replace(/\.+/g, '.')
      .replace(/^\.|\.$/, '');
  }

  private normalizeValue(value: any, _type: string): string | number {
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'object' && value.value !== undefined) {
      return value.value;
    }
    return String(value);
  }

  private mapFigmaType(figmaType: string): TokenType {
    const typeMap: Record<string, TokenType> = {
      'color': 'color',
      'dimension': 'spacing',
      'fontFamilies': 'typography',
      'fontSizes': 'typography',
      'fontWeights': 'typography',
      'lineHeights': 'typography',
      'borderRadius': 'border',
      'boxShadow': 'shadow',
      'opacity': 'opacity'
    };
    
    return typeMap[figmaType] || 'color';
  }

  private extractCategory(name: string): string {
    const parts = name.split(/[.\-_/]/);
    return parts[0]?.toLowerCase() || 'general';
  }

  private processTailwindColors(colors: any, prefix: string = ''): void {
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        // Simple color value
        const token: ColorToken = {
          name: prefix ? `${prefix}.${key}` : key,
          value: value as string,
          type: 'color',
          category: 'colors',
          metadata: {
            source: 'tailwind',
            originalKey: key
          }
        };
        this.addToken(token);
      } else if (typeof value === 'object' && value !== null) {
        // Nested color scale (e.g., blue.100, blue.200)
        const categoryName = prefix ? `${prefix}.${key}` : key;
        this.processTailwindColors(value, categoryName);
      }
    });
  }

  private processTailwindSpacing(spacing: any): void {
    Object.entries(spacing).forEach(([key, value]) => {
      const token: SpacingToken = {
        name: `spacing.${key}`,
        value: value as string,
        type: 'spacing',
        category: 'spacing',
        units: this.extractUnits(value as string),
        pxValue: this.convertToPx(value as string),
        metadata: {
          source: 'tailwind',
          originalKey: key
        }
      };
      this.addToken(token);
    });
  }

  private processTailwindFontSize(fontSize: any): void {
    Object.entries(fontSize).forEach(([key, value]) => {
      let typographyValue: any;
      
      if (typeof value === 'string') {
        typographyValue = { fontSize: value };
      } else if (Array.isArray(value)) {
        typographyValue = {
          fontSize: value[0],
          lineHeight: value[1]?.lineHeight || value[1]
        };
      } else if (typeof value === 'object') {
        typographyValue = value;
      }

      const token: TypographyToken = {
        name: `typography.${key}`,
        value: typographyValue,
        type: 'typography',
        category: 'typography',
        metadata: {
          source: 'tailwind',
          originalKey: key
        }
      };
      this.addToken(token);
    });
  }

  private processTailwindBorderRadius(borderRadius: any): void {
    Object.entries(borderRadius).forEach(([key, value]) => {
      const token: DesignToken = {
        name: `border.radius.${key}`,
        value: value as string,
        type: 'border',
        category: 'border',
        metadata: {
          source: 'tailwind',
          originalKey: key
        }
      };
      this.addToken(token);
    });
  }

  private processTailwindShadows(shadows: any): void {
    Object.entries(shadows).forEach(([key, value]) => {
      const token: DesignToken = {
        name: `shadow.${key}`,
        value: value as string,
        type: 'shadow',
        category: 'shadow',
        metadata: {
          source: 'tailwind',
          originalKey: key
        }
      };
      this.addToken(token);
    });
  }

  private processMaterialSystemTokens(sysTokens: any): void {
    // Material Design system tokens processing
    if (sysTokens.color) {
      Object.entries(sysTokens.color).forEach(([key, value]) => {
        const token: ColorToken = {
          name: `sys.color.${key}`,
          value: value as string,
          type: 'color',
          category: 'system.colors',
          metadata: {
            source: 'material',
            tokenSet: 'sys'
          }
        };
        this.addToken(token);
      });
    }
  }

  private processMaterialReferenceTokens(refTokens: any): void {
    // Material Design reference tokens processing
    if (refTokens.palette) {
      Object.entries(refTokens.palette).forEach(([key, colorScale]) => {
        if (typeof colorScale === 'object') {
          Object.entries(colorScale as any).forEach(([shade, value]) => {
            const token: ColorToken = {
              name: `ref.palette.${key}.${shade}`,
              value: value as string,
              type: 'color',
              category: 'reference.palette',
              metadata: {
                source: 'material',
                tokenSet: 'ref'
              }
            };
            this.addToken(token);
          });
        }
      });
    }
  }

  private extractUnits(value: string): SpacingToken['units'] {
    if (value.includes('rem')) return 'rem';
    if (value.includes('em')) return 'em';
    if (value.includes('%')) return '%';
    if (value.includes('vw')) return 'vw';
    if (value.includes('vh')) return 'vh';
    return 'px';
  }

  private convertToPx(value: string): number {
    const num = parseFloat(value);
    if (value.includes('rem')) {
      return num * 16; // Assuming 1rem = 16px
    }
    return num;
  }

  private toCSSVariableName(name: string): string {
    return `--forge-${name.replace(/\./g, '-')}`;
  }

  private toSassVariableName(name: string): string {
    return `$forge-${name.replace(/\./g, '-')}`;
  }

  private toCSSValue(token: AnyDesignToken): string {
    if (token.type === 'typography' && typeof token.value === 'object') {
      const typo = token.value as any;
      return typo.fontSize || String(token.value);
    }
    return String(token.value);
  }

  private clearCache(): void {
    this.cache.clear();
  }
}

// Utility functions for color space conversions
export class ColorConverter {
  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  static rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  static hexToHsl(hex: string): { h: number; s: number; l: number } | null {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return null;
    return this.rgbToHsl(rgb.r, rgb.g, rgb.b);
  }
}

// Export default instance for convenience
export default TokenBridge;