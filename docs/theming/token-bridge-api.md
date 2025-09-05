# Token Bridge API Reference

Complete API documentation for the Token Bridge system.

## Core Classes

### TokenBridge

Main class for managing design tokens.

#### Constructor
```typescript
new TokenBridge()
```

#### Static Methods

##### `fromFigma(figmaTokens: any): TokenBridge`
Import tokens from Figma design tokens format.

```typescript
const figmaTokens = {
  'Brand/Primary/Blue/500': {
    value: '#3b82f6',
    type: 'color',
    description: 'Primary brand color'
  }
};

const bridge = TokenBridge.fromFigma(figmaTokens);
```

**Parameters:**
- `figmaTokens` - Object containing Figma token definitions

**Returns:** New TokenBridge instance with imported tokens

**Throws:** Error if invalid Figma tokens format

---

##### `fromTailwind(tailwindConfig: any): TokenBridge`
Import tokens from Tailwind CSS configuration.

```typescript
const tailwindConfig = {
  theme: {
    colors: {
      blue: { 500: '#3b82f6' }
    },
    spacing: {
      '4': '1rem'
    }
  }
};

const bridge = TokenBridge.fromTailwind(tailwindConfig);
```

**Parameters:**
- `tailwindConfig` - Tailwind configuration object with theme property

**Returns:** New TokenBridge instance with imported tokens

**Throws:** Error if missing theme property

---

##### `fromMaterial(materialTokens: any): TokenBridge`
Import tokens from Material Design token format.

```typescript
const materialTokens = {
  sys: {
    color: {
      primary: '#6750a4'
    }
  }
};

const bridge = TokenBridge.fromMaterial(materialTokens);
```

**Parameters:**
- `materialTokens` - Material Design token object

**Returns:** New TokenBridge instance with imported tokens

---

#### Instance Methods

##### `addToken(token: DesignToken): void`
Add a design token to the collection.

```typescript
bridge.addToken({
  name: 'brand.primary',
  value: '#3b82f6',
  type: 'color',
  category: 'brand',
  description: 'Primary brand color'
});
```

**Parameters:**
- `token` - DesignToken object to add

---

##### `getTokens(): DesignToken[]`
Get all tokens in the collection.

```typescript
const allTokens = bridge.getTokens();
```

**Returns:** Array of all DesignToken objects

---

##### `getTokensByCategory(category: string): DesignToken[]`
Get tokens filtered by category.

```typescript
const brandTokens = bridge.getTokensByCategory('brand');
```

**Parameters:**
- `category` - Category name to filter by

**Returns:** Array of tokens in the specified category

---

##### `getTokensByType(type: TokenType): DesignToken[]`
Get tokens filtered by type.

```typescript
const colorTokens = bridge.getTokensByType('color');
```

**Parameters:**
- `type` - Token type to filter by

**Returns:** Array of tokens of the specified type

---

##### `toCSSProperties(): string`
Generate CSS custom properties from tokens.

```typescript
const css = bridge.toCSSProperties();
// Output: ":root { --forge-brand-primary: #3b82f6; }"
```

**Returns:** CSS string with custom properties

---

##### `toSassVariables(): string`
Generate Sass variables from tokens.

```typescript
const sass = bridge.toSassVariables();
// Output: "$forge-brand-primary: #3b82f6;"
```

**Returns:** Sass string with variable definitions

---

##### `toJSObject(): Record<string, any>`
Generate JavaScript object from tokens.

```typescript
const jsTokens = bridge.toJSObject();
// Output: { brand: { primary: '#3b82f6' } }
```

**Returns:** JavaScript object with nested token structure

---

##### `toJSON(): TokenCollection`
Export as standardized JSON format.

```typescript
const collection = bridge.toJSON();
```

**Returns:** TokenCollection object with metadata

---

### ColorConverter

Utility class for color space conversions.

#### Static Methods

##### `hexToRgb(hex: string): { r: number; g: number; b: number } | null`
Convert hex color to RGB.

```typescript
const rgb = ColorConverter.hexToRgb('#3b82f6');
// { r: 59, g: 130, b: 246 }
```

**Parameters:**
- `hex` - Hex color string (e.g., '#3b82f6')

**Returns:** RGB object or null if invalid

---

##### `rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number }`
Convert RGB to HSL.

```typescript
const hsl = ColorConverter.rgbToHsl(59, 130, 246);
// { h: 217, s: 91, l: 60 }
```

**Parameters:**
- `r` - Red component (0-255)
- `g` - Green component (0-255)
- `b` - Blue component (0-255)

**Returns:** HSL object

---

##### `hexToHsl(hex: string): { h: number; s: number; l: number } | null`
Convert hex color to HSL.

```typescript
const hsl = ColorConverter.hexToHsl('#3b82f6');
// { h: 217, s: 91, l: 60 }
```

**Parameters:**
- `hex` - Hex color string

**Returns:** HSL object or null if invalid

---

## Type Definitions

### DesignToken
```typescript
interface DesignToken {
  name: string;                    // Token name (e.g., 'brand.primary')
  value: string | number;          // Token value (e.g., '#3b82f6', 16)
  type: TokenType;                 // Token type
  category?: string;               // Token category (e.g., 'brand')
  description?: string;            // Human-readable description
  metadata?: Record<string, any>;  // Additional metadata
}
```

### TokenType
```typescript
type TokenType = 
  | 'color'      // Color values
  | 'spacing'    // Spacing/dimension values
  | 'typography' // Font-related values
  | 'border'     // Border-related values
  | 'shadow'     // Shadow values
  | 'gradient'   // Gradient values
  | 'opacity'    // Opacity values
  | 'animation'; // Animation values
```

### ColorToken
```typescript
interface ColorToken extends DesignToken {
  type: 'color';
  value: string;
  formats?: {
    hex?: string;
    rgb?: string;
    hsl?: string;
    oklch?: string;
  };
}
```

### SpacingToken
```typescript
interface SpacingToken extends DesignToken {
  type: 'spacing';
  value: string;
  units: 'px' | 'rem' | 'em' | '%' | 'vw' | 'vh';
  pxValue?: number;  // Computed pixel value
}
```

### TypographyToken
```typescript
interface TypographyToken extends DesignToken {
  type: 'typography';
  value: {
    fontSize: string;
    fontWeight?: string | number;
    lineHeight?: string | number;
    fontFamily?: string;
    letterSpacing?: string;
  };
}
```

### TokenCollection
```typescript
interface TokenCollection {
  name: string;           // Collection name
  version?: string;       // Version identifier
  tokens: DesignToken[];  // Array of tokens
  metadata?: {
    source: string;       // Source identifier
    generatedAt: string;  // ISO timestamp
    converter: string;    // Converter identifier
  };
}
```

---

## Error Handling

### Common Errors

#### InvalidFigmaTokensError
```typescript
try {
  const bridge = TokenBridge.fromFigma(null);
} catch (error) {
  console.error('Invalid Figma tokens format');
}
```

#### InvalidTailwindConfigError
```typescript
try {
  const bridge = TokenBridge.fromTailwind({});
} catch (error) {
  console.error('Invalid Tailwind config format - missing theme');
}
```

---

## Usage Examples

### Basic Token Management
```typescript
import { TokenBridge, type DesignToken } from '@nexcraft/forge/utils';

// Create new bridge
const bridge = new TokenBridge();

// Add tokens
const token: DesignToken = {
  name: 'brand.primary',
  value: '#3b82f6',
  type: 'color',
  category: 'brand'
};

bridge.addToken(token);

// Query tokens
const allTokens = bridge.getTokens();
const colorTokens = bridge.getTokensByType('color');
const brandTokens = bridge.getTokensByCategory('brand');

// Generate outputs
const css = bridge.toCSSProperties();
const sass = bridge.toSassVariables();
const js = bridge.toJSObject();
```

### Color Conversions
```typescript
import { ColorConverter } from '@nexcraft/forge/utils';

// Hex to RGB
const rgb = ColorConverter.hexToRgb('#3b82f6');
if (rgb) {
  console.log(`RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`);
}

// RGB to HSL
const hsl = ColorConverter.rgbToHsl(59, 130, 246);
console.log(`HSL: ${hsl.h}°, ${hsl.s}%, ${hsl.l}%`);

// Direct hex to HSL
const hsl2 = ColorConverter.hexToHsl('#3b82f6');
if (hsl2) {
  console.log(`HSL: ${hsl2.h}°, ${hsl2.s}%, ${hsl2.l}%`);
}
```

### Advanced Token Processing
```typescript
// Combine multiple sources
const figmaBridge = TokenBridge.fromFigma(figmaTokens);
const tailwindBridge = TokenBridge.fromTailwind(tailwindConfig);

const masterBridge = new TokenBridge();

// Merge tokens
figmaBridge.getTokens().forEach(token => {
  masterBridge.addToken(token);
});

tailwindBridge.getTokens().forEach(token => {
  masterBridge.addToken(token);
});

// Filter and organize
const brandColors = masterBridge.getTokens().filter(token =>
  token.type === 'color' && token.category === 'brand'
);

// Generate multiple formats
const outputs = {
  css: masterBridge.toCSSProperties(),
  sass: masterBridge.toSassVariables(),
  js: masterBridge.toJSObject(),
  json: masterBridge.toJSON()
};
```

---

## Performance Characteristics

### Time Complexity
- Token import: O(n) where n is number of tokens
- Token query: O(n) for filtering, O(1) for direct access
- Output generation: O(n) with automatic caching

### Memory Usage
- ~10 bytes per token for basic storage
- ~100 bytes per token with full metadata
- Automatic cache cleanup prevents memory leaks

### Caching Behavior
- Output generation is cached until tokens change
- Cache is automatically invalidated when tokens are added/modified
- Manual cache clearing available via internal methods

---

*This API reference covers all public methods and interfaces for the Token Bridge system. For implementation examples and usage patterns, see the [Token Bridge Guide](./token-bridge-guide.md).*