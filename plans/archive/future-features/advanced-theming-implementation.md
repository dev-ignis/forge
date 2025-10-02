# Advanced Theming System Implementation Plan

## Overview

The Advanced Theming System transforms @nexcraft/forge from a basic component library into an enterprise-grade design system platform. This comprehensive theming solution provides visual theme customization, design token integration, brand compliance, and runtime theme switching capabilities.

**Duration**: 1.5 weeks  
**Complexity**: Medium  
**Priority**: High

## 🎯 Features

### Core Features
- **Visual Theme Builder**: Interactive theme customization interface
- **Design Token Integration**: Seamless integration with design token systems
- **Brand Compliance**: Automated brand guideline validation
- **Dynamic Themes**: Runtime theme switching without page reload
- **Theme Validation**: Accessibility and contrast validation
- **Theme Inheritance**: Hierarchical theme system with fallbacks

### Advanced Features
- **Multi-brand Support**: Support for multiple brand identities
- **Component Overrides**: Per-component theme customization
- **CSS Variable Generation**: Automatic CSS custom property generation  
- **Theme Presets**: Pre-built theme collections (Material, Fluent, etc.)
- **Import/Export**: Theme sharing and distribution
- **Live Preview**: Real-time theme preview across all components

## 🏗️ Architecture

### Core Interfaces

```typescript
interface EnterpriseTheme {
  // Metadata
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  created: Date;
  updated: Date;
  
  // Core token systems
  colors: ColorSystem;
  typography: TypographySystem;
  spacing: SpacingSystem;
  shadows: ShadowSystem;
  borders: BorderSystem;
  animations: AnimationSystem;
  
  // Brand identity
  brand: BrandIdentity;
  
  // Component-specific overrides
  components: ComponentThemeOverrides;
  
  // Validation and compliance
  validation: ThemeValidationRules;
  accessibility: AccessibilitySettings;
  
  // Advanced features
  modes: ThemeMode[];
  extends?: string; // Parent theme ID
  custom?: Record<string, unknown>;
}

interface ColorSystem {
  // Semantic colors
  primary: ColorPalette;
  secondary: ColorPalette;
  tertiary?: ColorPalette;
  
  // Status colors
  success: ColorPalette;
  warning: ColorPalette;
  error: ColorPalette;
  info: ColorPalette;
  
  // Neutral colors
  neutral: ColorPalette;
  
  // Surface colors
  surface: SurfaceColorSystem;
  
  // Text colors
  text: TextColorSystem;
  
  // Border colors
  border: BorderColorSystem;
}

interface ColorPalette {
  50: string;   // Lightest
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;  // Base color
  600: string;
  700: string;
  800: string;
  900: string;  // Darkest
  
  // Accessibility variants
  contrast: string;        // High contrast version
  'on-color': string;      // Text color for backgrounds
  'on-container': string;  // Text for containers
}

interface TypographySystem {
  // Font families
  families: {
    base: FontFamily;
    heading: FontFamily;
    mono: FontFamily;
    display?: FontFamily;
  };
  
  // Type scale
  scale: TypographyScale;
  
  // Line heights
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
  
  // Letter spacing
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
  };
  
  // Font weights
  weights: {
    thin: number;
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
}

interface BrandIdentity {
  // Logo configuration
  logo: {
    primary: LogoConfig;
    secondary?: LogoConfig;
    monochrome?: LogoConfig;
    symbol?: LogoConfig;
  };
  
  // Brand colors (subset of color system)
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  
  // Typography preferences
  typography: {
    primary: string;  // Font family name
    secondary?: string;
  };
  
  // Voice and tone
  voice?: {
    formal: boolean;
    friendly: boolean;
    professional: boolean;
    playful: boolean;
  };
  
  // Usage guidelines
  guidelines?: {
    logoMinSize: number;
    logoSpacing: number;
    colorUsage: string[];
    typographyRules: string[];
  };
}

interface ComponentThemeOverrides {
  [componentName: string]: ComponentTheme;
}

interface ComponentTheme {
  // Base styling
  base?: CSSProperties;
  
  // State variations
  states?: {
    default?: CSSProperties;
    hover?: CSSProperties;
    focus?: CSSProperties;
    active?: CSSProperties;
    disabled?: CSSProperties;
    loading?: CSSProperties;
  };
  
  // Size variations
  sizes?: {
    xs?: CSSProperties;
    sm?: CSSProperties;
    md?: CSSProperties;
    lg?: CSSProperties;
    xl?: CSSProperties;
  };
  
  // Variant styles
  variants?: {
    [variantName: string]: CSSProperties;
  };
  
  // Custom CSS variables
  variables?: Record<string, string>;
}
```

### Core Classes

```typescript
export class ThemeManager {
  private themes: Map<string, EnterpriseTheme> = new Map();
  private activeTheme: EnterpriseTheme | null = null;
  private validator: ThemeValidator;
  private generator: CSSGenerator;

  constructor() {
    this.validator = new ThemeValidator();
    this.generator = new CSSGenerator();
    this.loadDefaultThemes();
  }

  // Theme management
  registerTheme(theme: EnterpriseTheme): void {
    const validation = this.validator.validate(theme);
    if (!validation.valid) {
      throw new Error(`Theme validation failed: ${validation.errors.join(', ')}`);
    }
    
    this.themes.set(theme.id, theme);
    this.emit('theme-registered', { theme });
  }

  setActiveTheme(themeId: string): Promise<void> {
    const theme = this.themes.get(themeId);
    if (!theme) {
      throw new Error(`Theme not found: ${themeId}`);
    }

    return this.applyTheme(theme);
  }

  private async applyTheme(theme: EnterpriseTheme): Promise<void> {
    // Generate CSS variables
    const css = await this.generator.generateCSS(theme);
    
    // Apply to document
    this.injectCSS(css);
    
    // Update active theme
    this.activeTheme = theme;
    
    // Notify components
    this.emit('theme-changed', { theme });
    
    // Store preference
    localStorage.setItem('forge-theme', theme.id);
  }

  // Theme customization
  customizeTheme(themeId: string, overrides: Partial<EnterpriseTheme>): EnterpriseTheme {
    const baseTheme = this.themes.get(themeId);
    if (!baseTheme) {
      throw new Error(`Base theme not found: ${themeId}`);
    }

    const customTheme: EnterpriseTheme = {
      ...baseTheme,
      ...overrides,
      id: `${themeId}-custom-${Date.now()}`,
      name: `${baseTheme.name} (Custom)`,
      extends: themeId,
      updated: new Date()
    };

    // Deep merge color systems
    if (overrides.colors) {
      customTheme.colors = this.mergeColorSystems(baseTheme.colors, overrides.colors);
    }

    // Deep merge component overrides
    if (overrides.components) {
      customTheme.components = this.mergeComponentOverrides(
        baseTheme.components || {},
        overrides.components
      );
    }

    return customTheme;
  }
}

export class ThemeBuilder {
  private theme: Partial<EnterpriseTheme> = {};
  private validator: ThemeValidator;

  constructor() {
    this.validator = new ThemeValidator();
    this.initializeDefaults();
  }

  // Color system building
  setPrimaryColor(color: string): this {
    if (!this.theme.colors) this.theme.colors = {} as ColorSystem;
    this.theme.colors.primary = this.generateColorPalette(color);
    return this;
  }

  setSecondaryColor(color: string): this {
    if (!this.theme.colors) this.theme.colors = {} as ColorSystem;
    this.theme.colors.secondary = this.generateColorPalette(color);
    return this;
  }

  // Typography system building
  setFontFamily(family: string, type: 'base' | 'heading' | 'mono' = 'base'): this {
    if (!this.theme.typography) {
      this.theme.typography = {} as TypographySystem;
    }
    if (!this.theme.typography.families) {
      this.theme.typography.families = {} as any;
    }
    
    this.theme.typography.families[type] = {
      name: family,
      fallbacks: this.getFallbackFonts(type),
      webFont: this.isWebFont(family)
    };
    
    return this;
  }

  // Component customization
  customizeComponent(componentName: string, overrides: ComponentTheme): this {
    if (!this.theme.components) {
      this.theme.components = {};
    }
    
    this.theme.components[componentName] = {
      ...this.theme.components[componentName],
      ...overrides
    };
    
    return this;
  }

  // Brand identity
  setBrandLogo(logoConfig: LogoConfig, type: 'primary' | 'secondary' = 'primary'): this {
    if (!this.theme.brand) {
      this.theme.brand = {} as BrandIdentity;
    }
    if (!this.theme.brand.logo) {
      this.theme.brand.logo = {} as any;
    }
    
    this.theme.brand.logo[type] = logoConfig;
    return this;
  }

  // Validation and building
  validate(): ThemeValidationResult {
    return this.validator.validate(this.theme as EnterpriseTheme);
  }

  build(): EnterpriseTheme {
    const validation = this.validate();
    if (!validation.valid) {
      throw new Error(`Theme validation failed: ${validation.errors.join(', ')}`);
    }

    return {
      id: `custom-${Date.now()}`,
      name: 'Custom Theme',
      version: '1.0.0',
      created: new Date(),
      updated: new Date(),
      ...this.theme
    } as EnterpriseTheme;
  }

  private generateColorPalette(baseColor: string): ColorPalette {
    // Generate color palette using color theory
    const hsl = this.hexToHsl(baseColor);
    const palette: ColorPalette = {} as ColorPalette;
    
    // Generate tints and shades
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    steps.forEach((step, index) => {
      const lightness = step === 500 ? hsl.l : 
        step < 500 ? hsl.l + (95 - hsl.l) * ((500 - step) / 450) :
        hsl.l * (1000 - step) / 500;
      
      palette[step as keyof ColorPalette] = this.hslToHex({
        h: hsl.h,
        s: hsl.s,
        l: Math.max(0, Math.min(100, lightness))
      });
    });

    // Generate accessibility colors
    palette.contrast = this.generateContrastColor(baseColor);
    palette['on-color'] = this.generateOnColor(baseColor);
    palette['on-container'] = this.generateOnContainerColor(baseColor);

    return palette;
  }
}

export class CSSGenerator {
  generateCSS(theme: EnterpriseTheme): string {
    const variables: string[] = [];
    
    // Generate color variables
    variables.push(...this.generateColorVariables(theme.colors));
    
    // Generate typography variables
    variables.push(...this.generateTypographyVariables(theme.typography));
    
    // Generate spacing variables
    variables.push(...this.generateSpacingVariables(theme.spacing));
    
    // Generate component variables
    variables.push(...this.generateComponentVariables(theme.components));

    return `:root {\n  ${variables.join(';\n  ')};\n}`;
  }

  private generateColorVariables(colors: ColorSystem): string[] {
    const variables: string[] = [];
    
    Object.entries(colors).forEach(([systemName, system]) => {
      if (typeof system === 'object' && system !== null) {
        Object.entries(system).forEach(([key, value]) => {
          if (typeof value === 'string') {
            variables.push(`--color-${systemName}-${key}: ${value}`);
          }
        });
      }
    });
    
    return variables;
  }

  private generateTypographyVariables(typography: TypographySystem): string[] {
    const variables: string[] = [];
    
    // Font families
    Object.entries(typography.families).forEach(([type, family]) => {
      variables.push(`--font-family-${type}: ${family.name}${family.fallbacks ? `, ${family.fallbacks.join(', ')}` : ''}`);
    });
    
    // Type scale
    Object.entries(typography.scale).forEach(([size, config]) => {
      variables.push(`--text-${size}-size: ${config.fontSize}`);
      variables.push(`--text-${size}-line-height: ${config.lineHeight}`);
      if (config.fontWeight) {
        variables.push(`--text-${size}-weight: ${config.fontWeight}`);
      }
    });
    
    // Line heights
    Object.entries(typography.lineHeights).forEach(([name, value]) => {
      variables.push(`--line-height-${name}: ${value}`);
    });
    
    return variables;
  }
}
```

## 📁 File Structure

```
src/core/theming/
├── theme-manager.ts           # Core theme management
├── theme-builder.ts          # Theme creation utilities
├── theme-validator.ts        # Theme validation
├── css-generator.ts          # CSS variable generation
│
├── systems/
│   ├── color-system.ts       # Color palette management
│   ├── typography-system.ts  # Typography configuration
│   ├── spacing-system.ts     # Spacing scale
│   ├── shadow-system.ts      # Shadow definitions
│   └── animation-system.ts   # Animation presets
│
├── presets/
│   ├── material-theme.ts     # Material Design theme
│   ├── fluent-theme.ts       # Microsoft Fluent theme
│   ├── human-theme.ts        # Human Interface Guidelines
│   └── carbon-theme.ts       # IBM Carbon theme
│
├── utils/
│   ├── color-utils.ts        # Color manipulation utilities
│   ├── contrast-utils.ts     # Accessibility contrast checking
│   ├── font-utils.ts         # Font loading and management
│   └── css-utils.ts          # CSS generation helpers
│
└── components/
    ├── theme-provider.ts     # Theme context provider
    ├── theme-selector.ts     # Theme switching component
    ├── theme-builder-ui.ts   # Visual theme builder
    └── theme-preview.ts      # Live theme preview
```

## 🚀 Implementation Timeline

### Week 1: Core System (Days 1-5)

#### Day 1-2: Theme Management Foundation
```typescript
// theme-manager.ts - Core implementation
export class ThemeManager extends EventTarget {
  private static instance: ThemeManager;
  private themes = new Map<string, EnterpriseTheme>();
  private activeThemeId: string | null = null;
  private cssInjected = new Set<string>();

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  private constructor() {
    super();
    this.initializeDefaultThemes();
    this.loadSavedTheme();
  }

  async registerTheme(theme: EnterpriseTheme): Promise<void> {
    // Validate theme
    const validator = new ThemeValidator();
    const validation = validator.validate(theme);
    
    if (!validation.valid) {
      throw new ThemeValidationError(validation.errors);
    }

    // Store theme
    this.themes.set(theme.id, theme);
    
    // Generate CSS if needed
    await this.generateThemeCSS(theme);
    
    this.dispatchEvent(new CustomEvent('theme-registered', {
      detail: { theme }
    }));
  }

  async setTheme(themeId: string, mode?: string): Promise<void> {
    const theme = this.themes.get(themeId);
    if (!theme) {
      throw new Error(`Theme not found: ${themeId}`);
    }

    // Apply CSS variables
    await this.applyThemeCSS(theme, mode);
    
    // Update active theme
    this.activeThemeId = themeId;
    
    // Persist preference
    localStorage.setItem('forge-active-theme', themeId);
    if (mode) {
      localStorage.setItem('forge-theme-mode', mode);
    }

    // Notify listeners
    this.dispatchEvent(new CustomEvent('theme-changed', {
      detail: { theme, mode }
    }));
  }

  private async generateThemeCSS(theme: EnterpriseTheme): Promise<void> {
    const generator = new CSSGenerator();
    
    // Generate main theme CSS
    const mainCSS = generator.generateThemeCSS(theme);
    
    // Generate mode variations
    const modeCSS = theme.modes?.map(mode => 
      generator.generateModeCSS(theme, mode)
    ) || [];

    // Inject CSS into document
    this.injectCSS(`theme-${theme.id}`, mainCSS);
    
    modeCSS.forEach((css, index) => {
      const mode = theme.modes![index];
      this.injectCSS(`theme-${theme.id}-${mode.name}`, css);
    });
  }

  private injectCSS(id: string, css: string): void {
    if (this.cssInjected.has(id)) {
      // Update existing stylesheet
      const existing = document.getElementById(id) as HTMLStyleElement;
      if (existing) {
        existing.textContent = css;
        return;
      }
    }

    // Create new stylesheet
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
    
    this.cssInjected.add(id);
  }

  // Theme customization API
  createCustomTheme(baseThemeId: string, customizations: Partial<EnterpriseTheme>): EnterpriseTheme {
    const baseTheme = this.themes.get(baseThemeId);
    if (!baseTheme) {
      throw new Error(`Base theme not found: ${baseThemeId}`);
    }

    const builder = new ThemeBuilder(baseTheme);
    return builder.apply(customizations).build();
  }

  // Export/Import functionality
  exportTheme(themeId: string): string {
    const theme = this.themes.get(themeId);
    if (!theme) {
      throw new Error(`Theme not found: ${themeId}`);
    }

    return JSON.stringify(theme, null, 2);
  }

  importTheme(themeData: string): Promise<EnterpriseTheme> {
    try {
      const theme = JSON.parse(themeData) as EnterpriseTheme;
      return this.registerTheme(theme).then(() => theme);
    } catch (error) {
      throw new Error('Invalid theme data format');
    }
  }
}
```

#### Day 3-4: Color and Typography Systems
```typescript
// systems/color-system.ts
export class ColorSystemBuilder {
  private colors: Partial<ColorSystem> = {};

  setPrimaryPalette(baseColor: string): this {
    this.colors.primary = this.generatePalette(baseColor);
    return this;
  }

  private generatePalette(baseColor: string): ColorPalette {
    const hsl = this.parseColor(baseColor);
    const palette = {} as ColorPalette;

    // Generate tints and shades
    const stops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    
    stops.forEach(stop => {
      const lightness = this.calculateLightness(stop, hsl.l);
      palette[stop as keyof ColorPalette] = this.formatColor({
        h: hsl.h,
        s: hsl.s,
        l: lightness
      });
    });

    // Generate accessibility colors
    palette.contrast = this.generateContrastColor(baseColor);
    palette['on-color'] = this.getOnColor(baseColor);
    palette['on-container'] = this.getOnContainerColor(baseColor);

    return palette;
  }

  private calculateLightness(stop: number, baseLightness: number): number {
    if (stop === 500) return baseLightness;
    
    if (stop < 500) {
      // Tints (lighter)
      const factor = (500 - stop) / 450;
      return baseLightness + (95 - baseLightness) * factor;
    } else {
      // Shades (darker)
      const factor = (stop - 500) / 500;
      return baseLightness * (1 - factor * 0.85);
    }
  }

  private generateContrastColor(color: string): string {
    const contrast = this.getContrastRatio(color, '#ffffff');
    return contrast >= 4.5 ? '#ffffff' : '#000000';
  }

  build(): ColorSystem {
    // Ensure all required colors are present
    if (!this.colors.primary) {
      throw new Error('Primary color is required');
    }

    // Generate default colors if not provided
    if (!this.colors.neutral) {
      this.colors.neutral = this.generatePalette('#6b7280');
    }

    if (!this.colors.success) {
      this.colors.success = this.generatePalette('#10b981');
    }

    if (!this.colors.warning) {
      this.colors.warning = this.generatePalette('#f59e0b');
    }

    if (!this.colors.error) {
      this.colors.error = this.generatePalette('#ef4444');
    }

    return this.colors as ColorSystem;
  }
}

// systems/typography-system.ts
export class TypographySystemBuilder {
  private typography: Partial<TypographySystem> = {
    families: {
      base: { name: 'Inter', fallbacks: ['system-ui', 'sans-serif'] },
      heading: { name: 'Inter', fallbacks: ['system-ui', 'sans-serif'] },
      mono: { name: 'JetBrains Mono', fallbacks: ['Consolas', 'monospace'] }
    },
    weights: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    }
  };

  setBaseFontFamily(family: string, fallbacks: string[] = []): this {
    this.typography.families!.base = {
      name: family,
      fallbacks,
      webFont: this.isWebFont(family)
    };
    return this;
  }

  setTypeScale(scale: TypographyScale): this {
    this.typography.scale = scale;
    return this;
  }

  generateTypeScale(baseSize: number = 16, ratio: number = 1.2): this {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
    const scale: TypographyScale = {} as TypographyScale;

    sizes.forEach((size, index) => {
      const adjustedIndex = index - 2; // md is base (index 2)
      const fontSize = baseSize * Math.pow(ratio, adjustedIndex);
      const lineHeight = this.calculateLineHeight(fontSize);

      scale[size as keyof TypographyScale] = {
        fontSize: `${fontSize / 16}rem`,
        lineHeight: lineHeight.toString(),
        fontWeight: size.includes('xl') ? this.typography.weights!.semibold : 
                   this.typography.weights!.normal
      };
    });

    this.typography.scale = scale;
    return this;
  }

  private calculateLineHeight(fontSize: number): number {
    // Dynamic line height calculation
    if (fontSize <= 14) return 1.5;
    if (fontSize <= 18) return 1.4;
    if (fontSize <= 24) return 1.3;
    return 1.2;
  }

  build(): TypographySystem {
    if (!this.typography.scale) {
      this.generateTypeScale();
    }

    return this.typography as TypographySystem;
  }
}
```

#### Day 5: Theme Builder UI Component
```typescript
// components/theme-builder-ui.ts
export class ForgeThemeBuilder extends BaseElement {
  @property({ type: Object }) baseTheme?: EnterpriseTheme;
  @property({ type: String }) mode: 'colors' | 'typography' | 'components' | 'preview' = 'colors';

  private themeBuilder = new ThemeBuilder();
  private previewTheme?: EnterpriseTheme;

  render() {
    return html`
      <div class="theme-builder">
        <div class="builder-sidebar">
          ${this.renderModeSelector()}
          ${this.renderCurrentMode()}
        </div>
        
        <div class="builder-preview">
          ${this.renderPreview()}
        </div>
        
        <div class="builder-actions">
          ${this.renderActions()}
        </div>
      </div>
    `;
  }

  private renderModeSelector() {
    const modes = [
      { id: 'colors', label: 'Colors', icon: 'palette' },
      { id: 'typography', label: 'Typography', icon: 'type' },
      { id: 'components', label: 'Components', icon: 'layers' },
      { id: 'preview', label: 'Preview', icon: 'eye' }
    ];

    return html`
      <div class="mode-selector">
        ${modes.map(mode => html`
          <button 
            class="mode-button ${this.mode === mode.id ? 'active' : ''}"
            @click=${() => this.setMode(mode.id as any)}
          >
            <forge-icon name=${mode.icon}></forge-icon>
            ${mode.label}
          </button>
        `)}
      </div>
    `;
  }

  private renderCurrentMode() {
    switch (this.mode) {
      case 'colors':
        return this.renderColorEditor();
      case 'typography':
        return this.renderTypographyEditor();
      case 'components':
        return this.renderComponentEditor();
      default:
        return html``;
    }
  }

  private renderColorEditor() {
    return html`
      <div class="color-editor">
        <h3>Color System</h3>
        
        <div class="color-section">
          <h4>Primary Color</h4>
          <div class="color-input-group">
            <forge-input 
              type="color" 
              .value=${this.getCurrentColor('primary')}
              @input=${(e: InputEvent) => this.updatePrimaryColor((e.target as HTMLInputElement).value)}
            ></forge-input>
            <forge-input 
              type="text" 
              .value=${this.getCurrentColor('primary')}
              placeholder="#3b82f6"
            ></forge-input>
          </div>
          ${this.renderColorPalette('primary')}
        </div>

        <div class="color-section">
          <h4>Secondary Color</h4>
          <div class="color-input-group">
            <forge-input 
              type="color" 
              .value=${this.getCurrentColor('secondary')}
              @input=${(e: InputEvent) => this.updateSecondaryColor((e.target as HTMLInputEvent).value)}
            ></forge-input>
            <forge-input 
              type="text" 
              .value=${this.getCurrentColor('secondary')}
              placeholder="#6b7280"
            ></forge-input>
          </div>
          ${this.renderColorPalette('secondary')}
        </div>

        ${this.renderSemanticColors()}
      </div>
    `;
  }

  private renderColorPalette(colorName: string) {
    const palette = this.getCurrentPalette(colorName);
    const stops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

    return html`
      <div class="color-palette">
        ${stops.map(stop => html`
          <div 
            class="color-swatch"
            style="background-color: ${palette[stop as keyof ColorPalette]}"
            title="${colorName}-${stop}: ${palette[stop as keyof ColorPalette]}"
          >
            <span class="swatch-label">${stop}</span>
          </div>
        `)}
      </div>
    `;
  }

  private renderTypographyEditor() {
    return html`
      <div class="typography-editor">
        <h3>Typography System</h3>
        
        <div class="font-section">
          <h4>Base Font Family</h4>
          <forge-select 
            .value=${this.getCurrentFontFamily('base')}
            @change=${(e: CustomEvent) => this.updateFontFamily('base', e.detail.value)}
          >
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Lato">Lato</option>
            <option value="Poppins">Poppins</option>
          </forge-select>
        </div>

        <div class="type-scale-section">
          <h4>Type Scale</h4>
          <div class="scale-controls">
            <label>
              Base Size (px):
              <forge-input 
                type="number" 
                .value=${16}
                min="12" 
                max="20"
                @input=${(e: InputEvent) => this.updateTypeScale()}
              ></forge-input>
            </label>
            <label>
              Scale Ratio:
              <forge-input 
                type="number" 
                .value=${1.25}
                min="1.1" 
                max="1.5" 
                step="0.05"
                @input=${(e: InputEvent) => this.updateTypeScale()}
              ></forge-input>
            </label>
          </div>
          ${this.renderTypeScalePreview()}
        </div>
      </div>
    `;
  }

  private updatePrimaryColor(color: string) {
    this.themeBuilder.setPrimaryColor(color);
    this.updatePreview();
  }

  private updateSecondaryColor(color: string) {
    this.themeBuilder.setSecondaryColor(color);
    this.updatePreview();
  }

  private updatePreview() {
    try {
      this.previewTheme = this.themeBuilder.build();
      this.requestUpdate();
      
      // Apply preview theme
      ThemeManager.getInstance().setTheme(this.previewTheme.id);
    } catch (error) {
      console.warn('Theme preview update failed:', error);
    }
  }

  private renderActions() {
    return html`
      <div class="theme-actions">
        <forge-button variant="secondary" @click=${this.resetTheme}>
          Reset
        </forge-button>
        
        <forge-button variant="secondary" @click=${this.exportTheme}>
          Export
        </forge-button>
        
        <forge-button variant="primary" @click=${this.saveTheme}>
          Save Theme
        </forge-button>
      </div>
    `;
  }

  private async saveTheme() {
    try {
      const theme = this.themeBuilder.build();
      await ThemeManager.getInstance().registerTheme(theme);
      
      this.emit('theme-saved', { theme });
      this.announceToScreenReader('Theme saved successfully');
    } catch (error) {
      this.emit('theme-error', { error });
      this.announceToScreenReader('Failed to save theme');
    }
  }

  protected get aiMetadata(): AIMetadata {
    return {
      purpose: 'Visual theme builder for creating custom design systems',
      context: 'Theme customization interface',
      dataType: 'custom',
      criticality: 'medium',
      semanticRole: 'design-tool'
    };
  }
}
```

### Week 1.5: Advanced Features (Days 6-7)

#### Day 6-7: Theme Validation & Accessibility
```typescript
// theme-validator.ts
export class ThemeValidator {
  validate(theme: Partial<EnterpriseTheme>): ThemeValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!theme.id) errors.push('Theme ID is required');
    if (!theme.name) errors.push('Theme name is required');
    if (!theme.colors) errors.push('Color system is required');

    // Color system validation
    if (theme.colors) {
      const colorErrors = this.validateColorSystem(theme.colors);
      errors.push(...colorErrors.errors);
      warnings.push(...colorErrors.warnings);
    }

    // Typography validation
    if (theme.typography) {
      const typographyErrors = this.validateTypography(theme.typography);
      errors.push(...typographyErrors.errors);
      warnings.push(...typographyErrors.warnings);
    }

    // Accessibility validation
    if (theme.colors) {
      const a11yErrors = this.validateAccessibility(theme);
      warnings.push(...a11yErrors);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  private validateColorSystem(colors: ColorSystem): ValidationErrors {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required palettes
    if (!colors.primary) errors.push('Primary color palette is required');
    if (!colors.neutral) errors.push('Neutral color palette is required');

    // Validate each palette
    Object.entries(colors).forEach(([name, palette]) => {
      if (this.isPalette(palette)) {
        const paletteErrors = this.validatePalette(name, palette);
        errors.push(...paletteErrors.errors);
        warnings.push(...paletteErrors.warnings);
      }
    });

    return { errors, warnings };
  }

  private validatePalette(name: string, palette: ColorPalette): ValidationErrors {
    const errors: string[] = [];
    const warnings: string[] = [];
    const requiredStops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

    // Check for missing stops
    requiredStops.forEach(stop => {
      if (!palette[stop as keyof ColorPalette]) {
        errors.push(`${name} palette missing ${stop} stop`);
      }
    });

    // Validate color format
    Object.entries(palette).forEach(([stop, color]) => {
      if (typeof color === 'string' && !this.isValidColor(color)) {
        errors.push(`Invalid color format in ${name}-${stop}: ${color}`);
      }
    });

    // Check color progression (lighter to darker)
    const progression = this.analyzeColorProgression(palette);
    if (!progression.valid) {
      warnings.push(`${name} palette may not have proper light-to-dark progression`);
    }

    return { errors, warnings };
  }

  private validateAccessibility(theme: Partial<EnterpriseTheme>): string[] {
    const warnings: string[] = [];

    if (!theme.colors) return warnings;

    // Check contrast ratios for primary combinations
    const contrastChecks = [
      { bg: theme.colors.primary?.[500], fg: theme.colors.primary?.['on-color'] },
      { bg: theme.colors.surface?.primary, fg: theme.colors.text?.primary },
      { bg: theme.colors.primary?.[100], fg: theme.colors.primary?.[700] }
    ];

    contrastChecks.forEach(({ bg, fg }, index) => {
      if (bg && fg) {
        const ratio = this.getContrastRatio(bg, fg);
        if (ratio < 4.5) {
          warnings.push(`Insufficient contrast ratio (${ratio.toFixed(2)}:1) for color combination ${index + 1}`);
        }
      }
    });

    // Check for potential accessibility issues
    if (theme.colors.error && theme.colors.success) {
      const errorColor = theme.colors.error[500];
      const successColor = theme.colors.success[500];
      
      if (errorColor && successColor) {
        const colorBlindSafe = this.checkColorBlindness(errorColor, successColor);
        if (!colorBlindSafe) {
          warnings.push('Error and success colors may not be distinguishable for color-blind users');
        }
      }
    }

    return warnings;
  }

  private getContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    const l1 = this.getRelativeLuminance(rgb1);
    const l2 = this.getRelativeLuminance(rgb2);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  private checkColorBlindness(color1: string, color2: string): boolean {
    // Simulate deuteranopia (green color blindness)
    const deuteranopia1 = this.simulateDeuteranopia(color1);
    const deuteranopia2 = this.simulateDeuteranopia(color2);
    
    const contrast = this.getContrastRatio(deuteranopia1, deuteranopia2);
    return contrast >= 3; // Minimum for color distinction
  }
}
```

## 🧪 Testing Strategy

```typescript
// advanced-theming.test.ts
describe('Advanced Theming System', () => {
  describe('ThemeManager', () => {
    let themeManager: ThemeManager;

    beforeEach(() => {
      themeManager = new ThemeManager();
    });

    it('should register and apply themes correctly', async () => {
      const theme = createTestTheme();
      
      await themeManager.registerTheme(theme);
      await themeManager.setTheme(theme.id);
      
      expect(themeManager.getActiveTheme()).to.equal(theme);
      
      // Check CSS variables are applied
      const rootStyles = getComputedStyle(document.documentElement);
      expect(rootStyles.getPropertyValue('--color-primary-500')).to.equal(theme.colors.primary[500]);
    });

    it('should validate themes before registration', async () => {
      const invalidTheme = { id: 'invalid' }; // Missing required fields
      
      await expect(themeManager.registerTheme(invalidTheme as any))
        .to.be.rejectedWith('Theme validation failed');
    });

    it('should support theme customization', () => {
      const baseTheme = createTestTheme();
      const customizations = {
        colors: {
          primary: generateColorPalette('#ff6b35')
        }
      };

      const customTheme = themeManager.customizeTheme(baseTheme.id, customizations);
      
      expect(customTheme.colors.primary[500]).to.equal('#ff6b35');
      expect(customTheme.extends).to.equal(baseTheme.id);
    });
  });

  describe('ThemeBuilder', () => {
    it('should build valid themes', () => {
      const builder = new ThemeBuilder();
      
      const theme = builder
        .setPrimaryColor('#3b82f6')
        .setSecondaryColor('#6b7280')
        .setFontFamily('Inter')
        .build();

      expect(theme).to.be.instanceOf(Object);
      expect(theme.colors.primary[500]).to.equal('#3b82f6');
    });

    it('should generate proper color palettes', () => {
      const builder = new ThemeBuilder();
      const theme = builder.setPrimaryColor('#3b82f6').build();
      
      const palette = theme.colors.primary;
      
      // Check all stops are present
      [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].forEach(stop => {
        expect(palette[stop as keyof ColorPalette]).to.be.a('string');
      });

      // Check progression (50 should be lighter than 900)
      const color50 = hexToHsl(palette[50]);
      const color900 = hexToHsl(palette[900]);
      expect(color50.l).to.be.greaterThan(color900.l);
    });
  });

  describe('Theme Validation', () => {
    it('should validate color contrast ratios', () => {
      const validator = new ThemeValidator();
      const theme = createTestTheme();
      
      // Set poor contrast colors
      theme.colors.primary['on-color'] = '#ffff00'; // Yellow on blue
      
      const result = validator.validate(theme);
      
      expect(result.warnings).to.include.something.that.includes('contrast ratio');
    });

    it('should check for color-blind accessibility', () => {
      const validator = new ThemeValidator();
      const theme = createTestTheme();
      
      // Set colors that may be problematic for color-blind users
      theme.colors.error = generateColorPalette('#ff0000');
      theme.colors.success = generateColorPalette('#00ff00');
      
      const result = validator.validate(theme);
      
      expect(result.warnings).to.include.something.that.includes('color-blind');
    });
  });

  describe('CSS Generation', () => {
    it('should generate proper CSS variables', () => {
      const generator = new CSSGenerator();
      const theme = createTestTheme();
      
      const css = generator.generateCSS(theme);
      
      expect(css).to.include('--color-primary-500');
      expect(css).to.include('--font-family-base');
      expect(css).to.include(':root {');
    });

    it('should handle theme modes correctly', () => {
      const generator = new CSSGenerator();
      const theme = createTestTheme();
      theme.modes = [{ name: 'dark', colors: { primary: generateColorPalette('#60a5fa') } }];
      
      const css = generator.generateModeCSS(theme, theme.modes[0]);
      
      expect(css).to.include('[data-theme-mode="dark"]');
      expect(css).to.include('--color-primary-500: #60a5fa');
    });
  });
});
```

## 📋 Completion Checklist

### Core Implementation
- [ ] Theme manager with registration and application
- [ ] Theme builder with visual interface
- [ ] Color system with palette generation
- [ ] Typography system with font management
- [ ] CSS variable generation and injection
- [ ] Theme validation and accessibility checking

### Advanced Features
- [ ] Multi-brand support
- [ ] Theme inheritance and customization
- [ ] Component-specific theme overrides
- [ ] Theme modes (light/dark/auto)
- [ ] Import/export functionality
- [ ] Live preview capabilities

### Quality & Testing
- [ ] Comprehensive test suite (>90% coverage)
- [ ] Accessibility compliance validation
- [ ] Color contrast ratio checking
- [ ] Color-blind user testing
- [ ] Performance optimization
- [ ] Cross-browser compatibility

### Documentation & Integration
- [ ] Theme builder user guide
- [ ] API documentation
- [ ] Migration guide from basic theming
- [ ] Storybook integration
- [ ] Framework integration examples

This comprehensive theming system will establish @nexcraft/forge as a true enterprise-grade design system platform with advanced customization capabilities.