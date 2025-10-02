# Plugin Architecture Implementation Plan

## Overview

The Plugin Architecture transforms @nexcraft/forge into an extensible platform where developers can create custom components, extend existing functionality, and integrate third-party services. This system provides a robust foundation for enterprise customization and community contributions.

**Duration**: 2 weeks  
**Complexity**: High  
**Priority**: Medium

## 🎯 Features

### Core Features
- **Plugin Registration**: Dynamic plugin loading and registration system
- **Component Extensions**: Extend existing components with additional functionality
- **Custom Components**: Register entirely new components through plugins
- **Event System**: Plugin communication through events and hooks
- **Lifecycle Management**: Plugin initialization, activation, and cleanup
- **Dependency Management**: Handle plugin dependencies and conflicts

### Advanced Features
- **Hot Reloading**: Development-time plugin hot swapping
- **Plugin Marketplace**: Plugin discovery and installation system
- **Sandboxed Execution**: Secure plugin execution environment
- **Theme Plugins**: Theme-specific functionality extensions
- **Integration Plugins**: Third-party service integrations (Analytics, CRM, etc.)
- **Performance Monitoring**: Plugin performance tracking and optimization

## 🏗️ Architecture

### Core Interfaces

```typescript
interface PluginSystem {
  // Plugin management
  registerPlugin<T extends Plugin>(plugin: T): Promise<void>;
  unregisterPlugin(pluginId: string): Promise<void>;
  getPlugin<T extends Plugin>(id: string): T | null;
  getAllPlugins(): Plugin[];
  getPluginsByType<T extends Plugin>(type: string): T[];
  
  // Lifecycle management
  initializePlugins(): Promise<void>;
  activatePlugin(pluginId: string): Promise<void>;
  deactivatePlugin(pluginId: string): Promise<void>;
  destroyPlugins(): Promise<void>;
  
  // Dependency resolution
  resolveDependencies(plugin: Plugin): Promise<Plugin[]>;
  checkConflicts(plugin: Plugin): PluginConflict[];
  
  // Event system
  emit(event: string, data?: unknown): void;
  on(event: string, handler: EventHandler): void;
  off(event: string, handler: EventHandler): void;
}

interface Plugin {
  // Metadata
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  homepage?: string;
  repository?: string;
  
  // Dependencies and compatibility
  dependencies?: PluginDependency[];
  conflicts?: string[];
  forgeVersion?: string;
  
  // Lifecycle hooks
  install?(forge: ForgeInstance): Promise<void> | void;
  activate?(): Promise<void> | void;
  deactivate?(): Promise<void> | void;
  uninstall?(): Promise<void> | void;
  
  // Feature extensions
  components?: ComponentDefinition[];
  commands?: Command[];
  themes?: ThemeExtension[];
  services?: Service[];
  
  // Configuration
  config?: PluginConfig;
  permissions?: PluginPermission[];
}

interface ComponentPlugin extends Plugin {
  type: 'component';
  components: ComponentDefinition[];
  
  // Component-specific hooks
  beforeComponentRender?(component: string, props: unknown): void;
  afterComponentRender?(component: string, element: HTMLElement): void;
  onComponentMount?(component: string, element: HTMLElement): void;
  onComponentUnmount?(component: string, element: HTMLElement): void;
}

interface ThemePlugin extends Plugin {
  type: 'theme';
  themes: ThemeExtension[];
  
  // Theme-specific functionality
  applyTheme?(theme: string): void;
  customizeComponent?(component: string, theme: string): ComponentTheme;
  generateVariables?(theme: string): Record<string, string>;
}

interface ServicePlugin extends Plugin {
  type: 'service';
  services: Service[];
  
  // Service integration
  initializeServices?(): Promise<void>;
  configureService?(service: string, config: unknown): void;
  handleServiceEvent?(service: string, event: string, data: unknown): void;
}

interface IntegrationPlugin extends Plugin {
  type: 'integration';
  integrations: Integration[];
  
  // External service integration
  connect?(config: ConnectionConfig): Promise<void>;
  disconnect?(): Promise<void>;
  syncData?(data: unknown): Promise<void>;
  handleWebhook?(event: WebhookEvent): void;
}

interface PluginDependency {
  id: string;
  version?: string;
  optional?: boolean;
  reason?: string;
}

interface PluginConfig {
  schema: JSONSchema;
  defaults: Record<string, unknown>;
  ui?: ConfigUIDefinition;
}

interface ComponentDefinition {
  tagName: string;
  className: string;
  properties?: PropertyDefinition[];
  events?: EventDefinition[];
  styles?: string;
  template?: string;
}
```

### Core Classes

```typescript
export class ForgePluginSystem extends EventTarget implements PluginSystem {
  private plugins = new Map<string, PluginInstance>();
  private componentRegistry = new Map<string, ComponentDefinition>();
  private serviceRegistry = new Map<string, Service>();
  private commandRegistry = new Map<string, Command>();
  private dependencyGraph = new DependencyGraph();
  
  constructor(private forge: ForgeInstance) {
    super();
    this.setupEventHandlers();
  }

  async registerPlugin<T extends Plugin>(plugin: T): Promise<void> {
    // Validate plugin
    this.validatePlugin(plugin);
    
    // Check dependencies
    const dependencies = await this.resolveDependencies(plugin);
    const conflicts = this.checkConflicts(plugin);
    
    if (conflicts.length > 0) {
      throw new PluginConflictError(conflicts);
    }
    
    // Create plugin instance
    const instance = new PluginInstance(plugin, dependencies);
    
    // Register plugin components
    if (plugin.components) {
      await this.registerComponents(plugin.components, plugin.id);
    }
    
    // Register plugin services
    if (plugin.services) {
      await this.registerServices(plugin.services, plugin.id);
    }
    
    // Store plugin
    this.plugins.set(plugin.id, instance);
    this.dependencyGraph.addNode(plugin.id, dependencies.map(d => d.id));
    
    // Run install hook
    if (plugin.install) {
      await plugin.install(this.forge);
    }
    
    this.dispatchEvent(new CustomEvent('plugin-registered', {
      detail: { plugin: instance }
    }));
  }

  async activatePlugin(pluginId: string): Promise<void> {
    const instance = this.plugins.get(pluginId);
    if (!instance) {
      throw new Error(`Plugin not found: ${pluginId}`);
    }
    
    if (instance.state === 'active') {
      return;
    }
    
    // Activate dependencies first
    const dependencies = this.dependencyGraph.getDependencies(pluginId);
    for (const depId of dependencies) {
      await this.activatePlugin(depId);
    }
    
    // Activate plugin
    instance.state = 'activating';
    
    try {
      if (instance.plugin.activate) {
        await instance.plugin.activate();
      }
      
      // Enable plugin components
      this.enablePluginComponents(pluginId);
      
      instance.state = 'active';
      instance.activatedAt = new Date();
      
      this.dispatchEvent(new CustomEvent('plugin-activated', {
        detail: { pluginId, instance }
      }));
    } catch (error) {
      instance.state = 'error';
      instance.error = error as Error;
      throw error;
    }
  }

  async deactivatePlugin(pluginId: string): Promise<void> {
    const instance = this.plugins.get(pluginId);
    if (!instance || instance.state !== 'active') {
      return;
    }
    
    // Deactivate dependents first
    const dependents = this.dependencyGraph.getDependents(pluginId);
    for (const depId of dependents) {
      await this.deactivatePlugin(depId);
    }
    
    instance.state = 'deactivating';
    
    try {
      // Disable plugin components
      this.disablePluginComponents(pluginId);
      
      if (instance.plugin.deactivate) {
        await instance.plugin.deactivate();
      }
      
      instance.state = 'inactive';
      
      this.dispatchEvent(new CustomEvent('plugin-deactivated', {
        detail: { pluginId, instance }
      }));
    } catch (error) {
      instance.state = 'error';
      instance.error = error as Error;
      throw error;
    }
  }

  private async registerComponents(components: ComponentDefinition[], pluginId: string): Promise<void> {
    for (const component of components) {
      // Validate component definition
      this.validateComponentDefinition(component);
      
      // Check for conflicts
      if (this.componentRegistry.has(component.tagName)) {
        throw new Error(`Component ${component.tagName} already registered`);
      }
      
      // Create and register component class
      const ComponentClass = this.createComponentClass(component);
      
      // Register custom element
      if (!customElements.get(component.tagName)) {
        customElements.define(component.tagName, ComponentClass);
      }
      
      // Store component definition
      this.componentRegistry.set(component.tagName, {
        ...component,
        pluginId
      });
    }
  }

  private createComponentClass(definition: ComponentDefinition): typeof BaseElement {
    const { className, properties = [], events = [], styles, template } = definition;
    
    // Dynamic component class creation
    class DynamicComponent extends BaseElement {
      static styles = [
        BaseElement.styles,
        styles ? css`${unsafeCSS(styles)}` : css``
      ];

      constructor() {
        super();
        
        // Set up properties
        properties.forEach(prop => {
          this.setupProperty(prop);
        });
        
        // Set up AI metadata
        this.aiMetadata = {
          purpose: definition.description || `Dynamic component: ${definition.tagName}`,
          context: 'Plugin-generated component',
          dataType: 'custom',
          criticality: 'medium'
        };
      }

      render() {
        if (template) {
          return html`${unsafeHTML(template)}`;
        }
        return html`<slot></slot>`;
      }

      private setupProperty(prop: PropertyDefinition) {
        const descriptor = {
          get(this: DynamicComponent) {
            return this.getProperty(prop.name);
          },
          set(this: DynamicComponent, value: unknown) {
            this.setProperty(prop.name, value);
          },
          configurable: true,
          enumerable: true
        };
        
        Object.defineProperty(this, prop.name, descriptor);
      }
    }

    // Set class name for debugging
    Object.defineProperty(DynamicComponent, 'name', { value: className });
    
    return DynamicComponent;
  }

  // Plugin discovery and marketplace
  async discoverPlugins(registry = 'https://registry.nexcraft.io'): Promise<PluginManifest[]> {
    try {
      const response = await fetch(`${registry}/api/plugins`);
      const plugins = await response.json();
      
      return plugins.filter((plugin: PluginManifest) => 
        this.isCompatible(plugin.forgeVersion)
      );
    } catch (error) {
      console.error('Failed to discover plugins:', error);
      return [];
    }
  }

  async installPlugin(manifest: PluginManifest): Promise<void> {
    const { id, version, source } = manifest;
    
    // Download plugin
    const plugin = await this.downloadPlugin(source);
    
    // Verify plugin integrity
    if (!this.verifyPlugin(plugin, manifest.checksum)) {
      throw new Error('Plugin verification failed');
    }
    
    // Register plugin
    await this.registerPlugin(plugin);
    
    // Store installation record
    this.storePluginInstallation(manifest);
  }

  private async downloadPlugin(source: string): Promise<Plugin> {
    // Support multiple source types
    if (source.startsWith('http')) {
      // Download from URL
      const response = await fetch(source);
      return await response.json();
    } else if (source.startsWith('npm:')) {
      // Install from NPM
      const packageName = source.replace('npm:', '');
      return await this.installFromNpm(packageName);
    } else {
      throw new Error(`Unsupported plugin source: ${source}`);
    }
  }

  // Plugin sandboxing and security
  private createSandbox(plugin: Plugin): PluginSandbox {
    const sandbox = new PluginSandbox({
      plugin,
      permissions: plugin.permissions || [],
      apiWhitelist: this.getApiWhitelist(plugin),
      memoryLimit: this.getMemoryLimit(plugin),
      timeoutMs: this.getTimeoutLimit(plugin)
    });
    
    return sandbox;
  }
}

export class PluginSandbox {
  private context: Record<string, unknown>;
  private apiProxy: ProxyHandler<unknown>;
  
  constructor(private config: SandboxConfig) {
    this.context = this.createContext();
    this.apiProxy = this.createApiProxy();
  }

  execute<T>(code: string): T {
    // Create isolated execution context
    const vm = new VMContext(this.context);
    
    try {
      return vm.run(code, {
        timeout: this.config.timeoutMs,
        memoryLimit: this.config.memoryLimit
      });
    } catch (error) {
      this.handleExecutionError(error);
      throw error;
    }
  }

  private createContext(): Record<string, unknown> {
    const context: Record<string, unknown> = {
      // Allowed globals
      console: this.createSafeConsole(),
      setTimeout: this.createSafeTimeout(),
      clearTimeout: clearTimeout,
      
      // Plugin-specific APIs
      forge: this.createForgeAPI(),
      
      // Restricted globals
      window: undefined,
      document: undefined,
      global: undefined,
      process: undefined
    };

    return new Proxy(context, this.apiProxy);
  }

  private createForgeAPI(): Partial<ForgeInstance> {
    const allowedMethods = this.config.apiWhitelist;
    const api: Partial<ForgeInstance> = {};

    allowedMethods.forEach(method => {
      if (method === 'components.register') {
        api.registerComponent = this.createSafeRegisterComponent();
      } else if (method === 'events.emit') {
        api.emit = this.createSafeEmit();
      }
      // Add more API methods as needed
    });

    return api;
  }

  private handleExecutionError(error: Error): void {
    console.error(`Plugin execution error for ${this.config.plugin.id}:`, error);
    
    // Report error to plugin system
    this.config.onError?.(error);
  }
}

export class PluginMarketplace {
  private registry: string;
  private plugins = new Map<string, PluginManifest>();

  constructor(registry = 'https://registry.nexcraft.io') {
    this.registry = registry;
  }

  async search(query: string, filters?: PluginSearchFilters): Promise<PluginManifest[]> {
    const params = new URLSearchParams({
      q: query,
      ...this.buildFilterParams(filters)
    });

    const response = await fetch(`${this.registry}/api/search?${params}`);
    return await response.json();
  }

  async getPlugin(id: string): Promise<PluginManifest | null> {
    try {
      const response = await fetch(`${this.registry}/api/plugins/${id}`);
      return await response.json();
    } catch {
      return null;
    }
  }

  async getPopularPlugins(limit = 20): Promise<PluginManifest[]> {
    const response = await fetch(`${this.registry}/api/popular?limit=${limit}`);
    return await response.json();
  }

  async getRecentPlugins(limit = 20): Promise<PluginManifest[]> {
    const response = await fetch(`${this.registry}/api/recent?limit=${limit}`);
    return await response.json();
  }

  async ratePlugin(id: string, rating: number, review?: string): Promise<void> {
    await fetch(`${this.registry}/api/plugins/${id}/rating`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, review })
    });
  }
}
```

## 📁 File Structure

```
src/core/plugins/
├── plugin-system.ts          # Core plugin system
├── plugin-instance.ts        # Plugin instance management
├── plugin-registry.ts        # Plugin registration and discovery
├── plugin-sandbox.ts         # Secure plugin execution
├── dependency-graph.ts       # Plugin dependency management
│
├── types/
│   ├── plugin.types.ts       # Core plugin interfaces
│   ├── component-plugin.ts   # Component plugin types
│   ├── theme-plugin.ts       # Theme plugin types
│   ├── service-plugin.ts     # Service plugin types
│   └── integration-plugin.ts # Integration plugin types
│
├── marketplace/
│   ├── marketplace.ts        # Plugin marketplace client
│   ├── installer.ts          # Plugin installation
│   ├── updater.ts           # Plugin update management
│   └── security.ts          # Plugin security validation
│
├── builtin/
│   ├── analytics-plugin.ts   # Built-in analytics integration
│   ├── performance-plugin.ts # Performance monitoring
│   ├── a11y-plugin.ts       # Accessibility enhancements
│   └── dev-tools-plugin.ts   # Development tools
│
└── utils/
    ├── plugin-utils.ts       # Plugin utilities
    ├── validation.ts         # Plugin validation
    ├── security-utils.ts     # Security utilities
    └── version-utils.ts      # Version compatibility
```

## 🚀 Implementation Timeline

### Week 1: Core Architecture (Days 1-5)

#### Day 1-2: Plugin System Foundation
```typescript
// plugin-system.ts - Core implementation
export class ForgePluginSystem extends EventTarget {
  private plugins = new Map<string, PluginInstance>();
  private config: PluginSystemConfig;
  private security: PluginSecurity;

  constructor(config: PluginSystemConfig = {}) {
    super();
    this.config = {
      enableSandbox: true,
      allowRemotePlugins: false,
      maxPlugins: 50,
      ...config
    };
    this.security = new PluginSecurity();
  }

  async registerPlugin(plugin: Plugin): Promise<void> {
    // Validate plugin structure
    const validation = this.validatePlugin(plugin);
    if (!validation.valid) {
      throw new PluginValidationError(validation.errors);
    }

    // Security check
    const securityCheck = await this.security.scanPlugin(plugin);
    if (!securityCheck.safe) {
      throw new PluginSecurityError(securityCheck.issues);
    }

    // Check for conflicts
    const conflicts = this.detectConflicts(plugin);
    if (conflicts.length > 0) {
      throw new PluginConflictError(conflicts);
    }

    // Create plugin instance
    const instance = new PluginInstance(plugin, {
      sandbox: this.config.enableSandbox,
      permissions: plugin.permissions || []
    });

    // Install plugin
    await this.installPlugin(instance);
    
    // Store plugin
    this.plugins.set(plugin.id, instance);
    
    this.dispatchEvent(new CustomEvent('plugin-registered', {
      detail: { plugin: instance }
    }));
  }

  private async installPlugin(instance: PluginInstance): Promise<void> {
    const { plugin } = instance;
    
    try {
      // Run install hook
      if (plugin.install) {
        await this.executeInSandbox(instance, () => plugin.install!(this.createForgeAPI()));
      }

      // Register components
      if (plugin.components) {
        await this.registerComponents(plugin.components, plugin.id);
      }

      // Register services
      if (plugin.services) {
        await this.registerServices(plugin.services, plugin.id);
      }

      // Register commands
      if (plugin.commands) {
        this.registerCommands(plugin.commands, plugin.id);
      }

      instance.state = 'installed';
    } catch (error) {
      instance.state = 'error';
      instance.error = error as Error;
      throw error;
    }
  }

  private async executeInSandbox<T>(
    instance: PluginInstance, 
    operation: () => T | Promise<T>
  ): Promise<T> {
    if (!this.config.enableSandbox) {
      return await operation();
    }

    const sandbox = new PluginSandbox({
      plugin: instance.plugin,
      permissions: instance.permissions,
      timeoutMs: 5000,
      memoryLimit: 64 * 1024 * 1024 // 64MB
    });

    return await sandbox.execute(operation);
  }

  getPlugin<T extends Plugin = Plugin>(id: string): T | null {
    const instance = this.plugins.get(id);
    return instance ? (instance.plugin as T) : null;
  }

  getActivePlugins(): Plugin[] {
    return Array.from(this.plugins.values())
      .filter(instance => instance.state === 'active')
      .map(instance => instance.plugin);
  }

  async unregisterPlugin(pluginId: string): Promise<void> {
    const instance = this.plugins.get(pluginId);
    if (!instance) return;

    // Deactivate first
    if (instance.state === 'active') {
      await this.deactivatePlugin(pluginId);
    }

    // Run uninstall hook
    if (instance.plugin.uninstall) {
      await this.executeInSandbox(instance, () => instance.plugin.uninstall!());
    }

    // Clean up registrations
    this.unregisterComponents(pluginId);
    this.unregisterServices(pluginId);
    this.unregisterCommands(pluginId);

    // Remove from registry
    this.plugins.delete(pluginId);

    this.dispatchEvent(new CustomEvent('plugin-unregistered', {
      detail: { pluginId }
    }));
  }
}

// plugin-instance.ts
export class PluginInstance {
  public state: PluginState = 'registered';
  public error?: Error;
  public installedAt = new Date();
  public activatedAt?: Date;
  public performance = new PluginPerformanceTracker();

  constructor(
    public readonly plugin: Plugin,
    public readonly permissions: PluginPermission[] = []
  ) {}

  getMetrics(): PluginMetrics {
    return {
      id: this.plugin.id,
      state: this.state,
      installedAt: this.installedAt,
      activatedAt: this.activatedAt,
      performance: this.performance.getMetrics(),
      error: this.error?.message
    };
  }
}

export class PluginPerformanceTracker {
  private initTime = 0;
  private activationTime = 0;
  private memoryUsage = 0;
  private operationTimes = new Map<string, number[]>();

  recordOperation(name: string, duration: number): void {
    if (!this.operationTimes.has(name)) {
      this.operationTimes.set(name, []);
    }
    this.operationTimes.get(name)!.push(duration);
  }

  getMetrics(): PerformanceMetrics {
    return {
      initTime: this.initTime,
      activationTime: this.activationTime,
      memoryUsage: this.memoryUsage,
      operationTimes: Object.fromEntries(
        Array.from(this.operationTimes.entries()).map(([name, times]) => [
          name,
          {
            count: times.length,
            average: times.reduce((a, b) => a + b, 0) / times.length,
            min: Math.min(...times),
            max: Math.max(...times)
          }
        ])
      )
    };
  }
}
```

#### Day 3-4: Component Plugin System
```typescript
// types/component-plugin.ts
export interface ComponentPlugin extends Plugin {
  type: 'component';
  components: ComponentDefinition[];
  
  // Component lifecycle hooks
  beforeComponentCreate?(tagName: string, definition: ComponentDefinition): void;
  afterComponentCreate?(tagName: string, ComponentClass: typeof BaseElement): void;
  onComponentMount?(element: BaseElement): void;
  onComponentUnmount?(element: BaseElement): void;
  
  // Property and event extensions
  extendProperties?(tagName: string): PropertyDefinition[];
  extendEvents?(tagName: string): EventDefinition[];
  extendMethods?(tagName: string): MethodDefinition[];
}

export interface ComponentDefinition {
  tagName: string;
  className: string;
  extends?: string; // Base class to extend
  
  // Component structure
  properties?: PropertyDefinition[];
  events?: EventDefinition[];
  methods?: MethodDefinition[];
  styles?: string;
  template?: string;
  
  // AI integration
  aiMetadata?: Partial<AIMetadata>;
  
  // Documentation
  documentation?: ComponentDocumentation;
}

export interface PropertyDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required?: boolean;
  defaultValue?: unknown;
  validator?: (value: unknown) => boolean;
  description?: string;
  
  // Property attributes
  reflect?: boolean;
  attribute?: string | false;
  converter?: PropertyConverter;
}

// Component factory implementation
export class ComponentFactory {
  private baseComponents = new Map<string, typeof BaseElement>();

  constructor() {
    // Register base components
    this.baseComponents.set('BaseElement', BaseElement);
  }

  createComponent(definition: ComponentDefinition, pluginId: string): typeof BaseElement {
    const BaseClass = this.getBaseClass(definition.extends);
    
    class PluginComponent extends BaseClass {
      static tagName = definition.tagName;
      static pluginId = pluginId;
      
      static styles = [
        BaseClass.styles,
        definition.styles ? css`${unsafeCSS(definition.styles)}` : css``
      ];

      constructor() {
        super();
        
        // Set AI metadata
        if (definition.aiMetadata) {
          this.aiMetadata = {
            ...this.aiMetadata,
            ...definition.aiMetadata
          };
        }
        
        // Initialize properties
        this.initializeProperties(definition.properties || []);
        
        // Setup event handlers
        this.setupEventHandlers(definition.events || []);
      }

      render() {
        if (definition.template) {
          return this.renderTemplate(definition.template);
        }
        return html`<slot></slot>`;
      }

      private initializeProperties(properties: PropertyDefinition[]): void {
        properties.forEach(prop => {
          // Create property descriptor
          const descriptor = this.createPropertyDescriptor(prop);
          Object.defineProperty(this, prop.name, descriptor);
          
          // Set default value
          if (prop.defaultValue !== undefined) {
            (this as any)[prop.name] = prop.defaultValue;
          }
        });
      }

      private createPropertyDescriptor(prop: PropertyDefinition): PropertyDescriptor {
        const privateKey = `_${prop.name}`;
        
        return {
          get() {
            return (this as any)[privateKey];
          },
          set(value: unknown) {
            // Validate value
            if (prop.validator && !prop.validator(value)) {
              throw new Error(`Invalid value for property ${prop.name}: ${value}`);
            }
            
            const oldValue = (this as any)[privateKey];
            (this as any)[privateKey] = value;
            
            // Trigger update
            this.requestUpdate(prop.name, oldValue);
            
            // Emit property change event
            this.emit(`${prop.name}-changed`, { value, oldValue });
          },
          configurable: true,
          enumerable: true
        };
      }

      private renderTemplate(template: string): TemplateResult {
        // Simple template processing
        // In a full implementation, this would support more complex templating
        const processedTemplate = template.replace(
          /\{\{(\w+)\}\}/g,
          (match, prop) => (this as any)[prop] || ''
        );
        
        return html`${unsafeHTML(processedTemplate)}`;
      }

      // Plugin component methods
      getPluginId(): string {
        return (this.constructor as any).pluginId;
      }

      getDefinition(): ComponentDefinition {
        return definition;
      }
    }

    // Set component name for debugging
    Object.defineProperty(PluginComponent, 'name', {
      value: definition.className
    });

    // Add custom methods from definition
    if (definition.methods) {
      definition.methods.forEach(method => {
        PluginComponent.prototype[method.name] = method.implementation;
      });
    }

    return PluginComponent;
  }

  private getBaseClass(extendsClass?: string): typeof BaseElement {
    if (!extendsClass) return BaseElement;
    
    const BaseClass = this.baseComponents.get(extendsClass);
    if (!BaseClass) {
      throw new Error(`Base class not found: ${extendsClass}`);
    }
    
    return BaseClass;
  }

  registerBaseComponent(name: string, ComponentClass: typeof BaseElement): void {
    this.baseComponents.set(name, ComponentClass);
  }
}

// Plugin component example
export const ExampleComponentPlugin: ComponentPlugin = {
  id: 'example-component-plugin',
  name: 'Example Components',
  version: '1.0.0',
  type: 'component',
  
  components: [{
    tagName: 'example-card',
    className: 'ExampleCard',
    properties: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: 'Card title'
      },
      {
        name: 'elevated',
        type: 'boolean',
        defaultValue: false,
        description: 'Whether the card is elevated'
      }
    ],
    events: [
      {
        name: 'card-click',
        description: 'Fired when card is clicked',
        detail: { type: 'object' }
      }
    ],
    styles: `
      :host {
        display: block;
        border-radius: var(--radius-md);
        background: var(--color-surface-primary);
        border: 1px solid var(--color-border-subtle);
        padding: var(--spacing-md);
      }
      
      :host([elevated]) {
        box-shadow: var(--shadow-lg);
      }
      
      .card-title {
        font-size: var(--text-lg);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--spacing-sm);
      }
    `,
    template: `
      <div class="card-title">{{title}}</div>
      <div class="card-content">
        <slot></slot>
      </div>
    `,
    aiMetadata: {
      purpose: 'Display content in card format',
      context: 'Content presentation',
      dataType: 'custom',
      criticality: 'low'
    }
  }],
  
  async install(forge) {
    console.log('Example component plugin installed');
  },
  
  onComponentMount(element) {
    if (element.tagName.toLowerCase() === 'example-card') {
      element.addEventListener('click', () => {
        element.emit('card-click', { timestamp: Date.now() });
      });
    }
  }
};
```

#### Day 5: Service and Integration Plugins
```typescript
// types/service-plugin.ts
export interface ServicePlugin extends Plugin {
  type: 'service';
  services: ServiceDefinition[];
  
  // Service lifecycle
  initializeServices?(): Promise<void>;
  startServices?(): Promise<void>;
  stopServices?(): Promise<void>;
  
  // Service management
  configureService?(serviceId: string, config: unknown): void;
  getServiceStatus?(serviceId: string): ServiceStatus;
  restartService?(serviceId: string): Promise<void>;
}

export interface ServiceDefinition {
  id: string;
  name: string;
  description?: string;
  
  // Service implementation
  implementation: ServiceImplementation;
  
  // Configuration
  config?: ServiceConfig;
  dependencies?: string[];
  
  // Health check
  healthCheck?: () => Promise<boolean>;
  
  // Metrics
  metrics?: ServiceMetrics;
}

export abstract class ServiceImplementation {
  protected config: Record<string, unknown> = {};
  protected status: ServiceStatus = 'stopped';

  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
  abstract restart(): Promise<void>;
  
  configure(config: Record<string, unknown>): void {
    this.config = { ...this.config, ...config };
  }

  getStatus(): ServiceStatus {
    return this.status;
  }

  async healthCheck(): Promise<boolean> {
    return this.status === 'running';
  }
}

// Analytics service plugin example
export class AnalyticsService extends ServiceImplementation {
  private client?: AnalyticsClient;
  private queue: AnalyticsEvent[] = [];

  async start(): Promise<void> {
    const apiKey = this.config.apiKey as string;
    if (!apiKey) {
      throw new Error('Analytics API key not configured');
    }

    this.client = new AnalyticsClient({
      apiKey,
      endpoint: this.config.endpoint as string || 'https://analytics.example.com'
    });

    await this.client.connect();
    this.status = 'running';
    
    // Process queued events
    this.processQueue();
  }

  async stop(): Promise<void> {
    if (this.client) {
      await this.client.disconnect();
      this.client = undefined;
    }
    this.status = 'stopped';
  }

  async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }

  trackEvent(event: AnalyticsEvent): void {
    if (this.status === 'running' && this.client) {
      this.client.track(event);
    } else {
      this.queue.push(event);
    }
  }

  private processQueue(): void {
    if (this.client && this.queue.length > 0) {
      this.queue.forEach(event => this.client!.track(event));
      this.queue = [];
    }
  }
}

export const AnalyticsPlugin: ServicePlugin = {
  id: 'analytics-service',
  name: 'Analytics Service',
  version: '1.0.0',
  type: 'service',
  
  services: [{
    id: 'analytics',
    name: 'Analytics Tracking',
    description: 'Track user interactions and component usage',
    implementation: new AnalyticsService(),
    config: {
      schema: {
        type: 'object',
        properties: {
          apiKey: { type: 'string', required: true },
          endpoint: { type: 'string' },
          trackClicks: { type: 'boolean', default: true },
          trackPageViews: { type: 'boolean', default: true }
        }
      }
    }
  }],
  
  async install(forge) {
    // Set up automatic event tracking
    forge.on('component-mounted', (event) => {
      const analytics = forge.getService('analytics') as AnalyticsService;
      analytics.trackEvent({
        type: 'component_mount',
        component: event.detail.tagName,
        timestamp: Date.now()
      });
    });
    
    // Track button clicks
    forge.on('button-click', (event) => {
      const analytics = forge.getService('analytics') as AnalyticsService;
      analytics.trackEvent({
        type: 'button_click',
        button: event.detail.id || 'unnamed',
        timestamp: Date.now()
      });
    });
  }
};

// Integration plugin for CRM systems
export const CRMIntegrationPlugin: IntegrationPlugin = {
  id: 'crm-integration',
  name: 'CRM Integration',
  version: '1.0.0',
  type: 'integration',
  
  integrations: [{
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Connect with Salesforce CRM',
    endpoints: {
      auth: '/oauth/token',
      contacts: '/services/data/v52.0/sobjects/Contact',
      leads: '/services/data/v52.0/sobjects/Lead'
    }
  }],
  
  async connect(config: ConnectionConfig) {
    const { clientId, clientSecret, instanceUrl } = config;
    
    // OAuth authentication flow
    const authResponse = await fetch(`${instanceUrl}/services/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      })
    });
    
    if (!authResponse.ok) {
      throw new Error('CRM authentication failed');
    }
    
    const authData = await authResponse.json();
    this.accessToken = authData.access_token;
    this.instanceUrl = instanceUrl;
  },
  
  async syncData(data: CRMSyncData) {
    if (!this.accessToken) {
      throw new Error('CRM not connected');
    }
    
    const response = await fetch(`${this.instanceUrl}/services/data/v52.0/sobjects/Contact`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    return await response.json();
  }
};
```

### Week 2: Advanced Features (Days 6-10)

#### Day 6-7: Plugin Marketplace and Security
```typescript
// marketplace/marketplace.ts
export class PluginMarketplace {
  private cache = new Map<string, PluginManifest>();
  private security = new PluginSecurity();

  constructor(private registry = 'https://registry.nexcraft.io') {}

  async search(query: SearchQuery): Promise<SearchResult> {
    const params = new URLSearchParams({
      q: query.text,
      category: query.category || '',
      tags: query.tags?.join(',') || '',
      sort: query.sort || 'relevance',
      page: query.page?.toString() || '1',
      limit: query.limit?.toString() || '20'
    });

    const response = await this.apiRequest(`/search?${params}`);
    const results = await response.json();

    // Cache results
    results.plugins.forEach((plugin: PluginManifest) => {
      this.cache.set(plugin.id, plugin);
    });

    return results;
  }

  async getPlugin(id: string, version?: string): Promise<PluginManifest | null> {
    const cacheKey = version ? `${id}@${version}` : id;
    const cached = this.cache.get(cacheKey);
    
    if (cached) return cached;

    try {
      const endpoint = version ? `/plugins/${id}/${version}` : `/plugins/${id}`;
      const response = await this.apiRequest(endpoint);
      const plugin = await response.json();
      
      this.cache.set(cacheKey, plugin);
      return plugin;
    } catch {
      return null;
    }
  }

  async installPlugin(id: string, version?: string): Promise<Plugin> {
    const manifest = await this.getPlugin(id, version);
    if (!manifest) {
      throw new Error(`Plugin not found: ${id}`);
    }

    // Security verification
    const securityCheck = await this.security.verifyPlugin(manifest);
    if (!securityCheck.trusted) {
      throw new PluginSecurityError(securityCheck.issues);
    }

    // Download plugin
    const plugin = await this.downloadPlugin(manifest);
    
    // Verify integrity
    if (!this.verifyIntegrity(plugin, manifest.checksum)) {
      throw new Error('Plugin integrity verification failed');
    }

    return plugin;
  }

  private async downloadPlugin(manifest: PluginManifest): Promise<Plugin> {
    const response = await fetch(manifest.downloadUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to download plugin: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      return await response.json();
    } else if (contentType?.includes('application/javascript')) {
      // Handle ES module plugins
      const code = await response.text();
      return this.loadModulePlugin(code);
    } else {
      throw new Error('Unsupported plugin format');
    }
  }

  private async loadModulePlugin(code: string): Promise<Plugin> {
    // Create a module from the plugin code
    const blob = new Blob([code], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    
    try {
      const module = await import(url);
      return module.default || module;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  private verifyIntegrity(plugin: Plugin, expectedChecksum: string): boolean {
    // Implement checksum verification
    const pluginString = JSON.stringify(plugin);
    const actualChecksum = this.calculateChecksum(pluginString);
    return actualChecksum === expectedChecksum;
  }

  private calculateChecksum(content: string): string {
    // Simple checksum implementation
    // In production, use a proper hashing algorithm
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }

  private async apiRequest(endpoint: string): Promise<Response> {
    const response = await fetch(`${this.registry}/api${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Forge-Plugin-System/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response;
  }
}

// security/plugin-security.ts
export class PluginSecurity {
  private trustedSources = new Set([
    'https://registry.nexcraft.io',
    'https://npmjs.org',
    'https://unpkg.com'
  ]);

  async verifyPlugin(manifest: PluginManifest): Promise<SecurityCheckResult> {
    const issues: SecurityIssue[] = [];
    let trusted = true;

    // Check source trustworthiness
    if (!this.isTrustedSource(manifest.downloadUrl)) {
      issues.push({
        severity: 'warning',
        type: 'untrusted-source',
        message: 'Plugin source is not in the trusted registry'
      });
      trusted = false;
    }

    // Check permissions
    if (manifest.permissions) {
      const dangerousPerms = this.checkDangerousPermissions(manifest.permissions);
      if (dangerousPerms.length > 0) {
        issues.push({
          severity: 'high',
          type: 'dangerous-permissions',
          message: `Plugin requests dangerous permissions: ${dangerousPerms.join(', ')}`
        });
      }
    }

    // Check for known malicious patterns
    const codeAnalysis = await this.analyzePluginCode(manifest);
    issues.push(...codeAnalysis.issues);

    return {
      trusted: trusted && issues.filter(i => i.severity === 'high').length === 0,
      issues
    };
  }

  private isTrustedSource(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return Array.from(this.trustedSources).some(source => {
        const sourceObj = new URL(source);
        return urlObj.hostname === sourceObj.hostname;
      });
    } catch {
      return false;
    }
  }

  private checkDangerousPermissions(permissions: string[]): string[] {
    const dangerous = [
      'file-system-write',
      'network-unrestricted',
      'eval',
      'native-code',
      'system-commands'
    ];

    return permissions.filter(perm => dangerous.includes(perm));
  }

  private async analyzePluginCode(manifest: PluginManifest): Promise<CodeAnalysisResult> {
    // Static code analysis for malicious patterns
    const issues: SecurityIssue[] = [];

    // This would be a more sophisticated analysis in practice
    const suspiciousPatterns = [
      /eval\s*\(/,
      /Function\s*\(/,
      /document\.write/,
      /innerHTML\s*=/,
      /outerHTML\s*=/,
      /setTimeout\s*\(\s*['"].*['"].*\)/,
      /setInterval\s*\(\s*['"].*['"].*\)/
    ];

    // Download and analyze code (simplified)
    try {
      const response = await fetch(manifest.downloadUrl);
      const code = await response.text();

      suspiciousPatterns.forEach(pattern => {
        if (pattern.test(code)) {
          issues.push({
            severity: 'medium',
            type: 'suspicious-code',
            message: `Suspicious pattern found: ${pattern.source}`
          });
        }
      });
    } catch (error) {
      issues.push({
        severity: 'low',
        type: 'analysis-error',
        message: 'Could not analyze plugin code'
      });
    }

    return { issues };
  }

  createSandboxedContext(plugin: Plugin): PluginContext {
    const allowedGlobals = new Set([
      'console',
      'setTimeout',
      'clearTimeout',
      'setInterval',
      'clearInterval',
      'Promise',
      'Array',
      'Object',
      'String',
      'Number',
      'Boolean',
      'Date',
      'Math',
      'JSON'
    ]);

    const context = Object.create(null);
    
    // Add allowed globals
    allowedGlobals.forEach(name => {
      context[name] = (globalThis as any)[name];
    });

    // Add restricted APIs
    context.fetch = this.createRestrictedFetch(plugin);
    context.localStorage = this.createRestrictedStorage(plugin);

    return context;
  }

  private createRestrictedFetch(plugin: Plugin): typeof fetch {
    return async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
      const url = typeof input === 'string' ? input : input.url;
      
      // Check if URL is allowed
      if (!this.isUrlAllowed(url, plugin.permissions || [])) {
        throw new Error(`Network access denied: ${url}`);
      }

      return fetch(input, init);
    };
  }

  private isUrlAllowed(url: string, permissions: string[]): boolean {
    if (permissions.includes('network-unrestricted')) {
      return true;
    }

    // Only allow HTTPS and same-origin requests by default
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:' || urlObj.origin === window.location.origin;
    } catch {
      return false;
    }
  }
}
```

#### Day 8-10: Plugin Development Tools
```typescript
// dev-tools/plugin-dev-server.ts
export class PluginDevServer {
  private server: DevServer;
  private watcher: FileWatcher;
  private loadedPlugins = new Map<string, Plugin>();

  constructor(private config: DevServerConfig) {
    this.server = new DevServer(config.port || 3001);
    this.watcher = new FileWatcher(config.pluginDir || './plugins');
  }

  async start(): Promise<void> {
    // Start development server
    await this.server.start();
    
    // Start file watching
    this.watcher.on('change', this.handleFileChange.bind(this));
    this.watcher.on('add', this.handleFileAdd.bind(this));
    this.watcher.on('unlink', this.handleFileRemove.bind(this));
    
    console.log(`Plugin dev server running on port ${this.config.port || 3001}`);
  }

  private async handleFileChange(filePath: string): Promise<void> {
    if (filePath.endsWith('.plugin.js') || filePath.endsWith('.plugin.ts')) {
      await this.reloadPlugin(filePath);
    }
  }

  private async reloadPlugin(filePath: string): Promise<void> {
    try {
      // Unload existing plugin
      const pluginId = this.getPluginIdFromPath(filePath);
      if (this.loadedPlugins.has(pluginId)) {
        await this.unloadPlugin(pluginId);
      }

      // Load updated plugin
      const plugin = await this.loadPluginFromFile(filePath);
      await this.registerPlugin(plugin);
      
      // Notify clients of hot reload
      this.server.broadcast({
        type: 'plugin-reloaded',
        plugin: plugin.id
      });

      console.log(`Plugin reloaded: ${plugin.id}`);
    } catch (error) {
      console.error(`Failed to reload plugin ${filePath}:`, error);
      
      this.server.broadcast({
        type: 'plugin-error',
        error: error.message
      });
    }
  }

  private async loadPluginFromFile(filePath: string): Promise<Plugin> {
    // Clear module cache for hot reload
    delete require.cache[require.resolve(filePath)];
    
    // Load plugin module
    const module = await import(filePath);
    const plugin = module.default || module;
    
    // Validate plugin
    this.validatePluginStructure(plugin);
    
    return plugin;
  }

  private validatePluginStructure(plugin: any): void {
    const required = ['id', 'name', 'version'];
    const missing = required.filter(field => !plugin[field]);
    
    if (missing.length > 0) {
      throw new Error(`Plugin missing required fields: ${missing.join(', ')}`);
    }
  }
}

// Plugin testing utilities
export class PluginTester {
  private testEnvironment: TestEnvironment;
  private mockForgeInstance: MockForgeInstance;

  constructor() {
    this.testEnvironment = new TestEnvironment();
    this.mockForgeInstance = new MockForgeInstance();
  }

  async testPlugin(plugin: Plugin): Promise<PluginTestResult> {
    const results: TestResult[] = [];
    
    try {
      // Test plugin registration
      results.push(await this.testRegistration(plugin));
      
      // Test component creation (if applicable)
      if (plugin.type === 'component') {
        results.push(...await this.testComponents(plugin as ComponentPlugin));
      }
      
      // Test service functionality (if applicable)
      if (plugin.type === 'service') {
        results.push(...await this.testServices(plugin as ServicePlugin));
      }
      
      // Test plugin lifecycle
      results.push(...await this.testLifecycle(plugin));
      
    } catch (error) {
      results.push({
        name: 'Plugin Test Error',
        passed: false,
        error: error.message
      });
    }

    return {
      plugin: plugin.id,
      passed: results.every(r => r.passed),
      results,
      coverage: this.calculateCoverage(plugin, results)
    };
  }

  private async testRegistration(plugin: Plugin): Promise<TestResult> {
    try {
      // Test that plugin can be registered without errors
      await this.mockForgeInstance.registerPlugin(plugin);
      
      return {
        name: 'Plugin Registration',
        passed: true,
        message: 'Plugin registered successfully'
      };
    } catch (error) {
      return {
        name: 'Plugin Registration',
        passed: false,
        error: error.message
      };
    }
  }

  private async testComponents(plugin: ComponentPlugin): Promise<TestResult[]> {
    const results: TestResult[] = [];
    
    for (const component of plugin.components || []) {
      try {
        // Test component creation
        const ComponentClass = this.createTestComponent(component);
        const instance = new ComponentClass();
        
        // Test rendering
        await instance.updateComplete;
        
        results.push({
          name: `Component: ${component.tagName}`,
          passed: true,
          message: 'Component created and rendered successfully'
        });
        
      } catch (error) {
        results.push({
          name: `Component: ${component.tagName}`,
          passed: false,
          error: error.message
        });
      }
    }
    
    return results;
  }

  private createTestComponent(definition: ComponentDefinition): typeof BaseElement {
    // Simplified component creation for testing
    class TestComponent extends BaseElement {
      render() {
        return html`<div>Test Component</div>`;
      }
    }
    
    return TestComponent;
  }
}

// Plugin documentation generator
export class PluginDocGenerator {
  generateDocs(plugin: Plugin): PluginDocumentation {
    return {
      plugin: {
        id: plugin.id,
        name: plugin.name,
        version: plugin.version,
        description: plugin.description || '',
        author: plugin.author || '',
        type: plugin.type || 'generic'
      },
      
      installation: this.generateInstallationDocs(plugin),
      configuration: this.generateConfigurationDocs(plugin),
      api: this.generateApiDocs(plugin),
      examples: this.generateExamples(plugin),
      troubleshooting: this.generateTroubleshooting(plugin)
    };
  }

  private generateInstallationDocs(plugin: Plugin): InstallationDoc {
    return {
      package: plugin.id,
      npm: `npm install ${plugin.id}`,
      cdn: `https://cdn.nexcraft.io/plugins/${plugin.id}@${plugin.version}/index.js`,
      
      registration: `
import { ${plugin.name.replace(/\s+/g, '')}Plugin } from '${plugin.id}';
import { PluginSystem } from '@nexcraft/forge';

const pluginSystem = new PluginSystem();
await pluginSystem.registerPlugin(${plugin.name.replace(/\s+/g, '')}Plugin);
      `.trim()
    };
  }

  private generateApiDocs(plugin: Plugin): ApiDoc[] {
    const docs: ApiDoc[] = [];
    
    if (plugin.type === 'component') {
      const componentPlugin = plugin as ComponentPlugin;
      componentPlugin.components?.forEach(component => {
        docs.push(this.generateComponentApiDoc(component));
      });
    }
    
    return docs;
  }

  private generateComponentApiDoc(component: ComponentDefinition): ApiDoc {
    return {
      name: component.tagName,
      description: component.documentation?.description || '',
      
      properties: component.properties?.map(prop => ({
        name: prop.name,
        type: prop.type,
        required: prop.required || false,
        default: prop.defaultValue,
        description: prop.description || ''
      })) || [],
      
      events: component.events?.map(event => ({
        name: event.name,
        description: event.description || '',
        detail: event.detail?.type || 'unknown'
      })) || [],
      
      methods: component.methods?.map(method => ({
        name: method.name,
        description: method.description || '',
        parameters: method.parameters || [],
        returns: method.returns || 'void'
      })) || []
    };
  }
}
```

## 🧪 Testing Strategy

```typescript
// plugin-system.test.ts
describe('Plugin System', () => {
  let pluginSystem: ForgePluginSystem;

  beforeEach(() => {
    pluginSystem = new ForgePluginSystem();
  });

  describe('Plugin Registration', () => {
    it('should register valid plugins', async () => {
      const plugin = createTestPlugin();
      
      await pluginSystem.registerPlugin(plugin);
      
      expect(pluginSystem.getPlugin(plugin.id)).to.equal(plugin);
    });

    it('should reject invalid plugins', async () => {
      const invalidPlugin = { name: 'Invalid' }; // Missing required fields
      
      await expect(pluginSystem.registerPlugin(invalidPlugin as any))
        .to.be.rejectedWith('Plugin validation failed');
    });

    it('should detect plugin conflicts', async () => {
      const plugin1 = createTestPlugin({ id: 'test-1' });
      const plugin2 = createTestPlugin({ 
        id: 'test-2',
        conflicts: ['test-1']
      });
      
      await pluginSystem.registerPlugin(plugin1);
      
      await expect(pluginSystem.registerPlugin(plugin2))
        .to.be.rejectedWith('Plugin conflicts detected');
    });
  });

  describe('Component Plugins', () => {
    it('should create custom components', async () => {
      const componentPlugin = createComponentPlugin();
      
      await pluginSystem.registerPlugin(componentPlugin);
      
      const component = document.createElement('test-component');
      expect(component).to.be.instanceof(HTMLElement);
    });

    it('should handle component properties correctly', async () => {
      const componentPlugin = createComponentPlugin({
        properties: [
          { name: 'title', type: 'string', required: true }
        ]
      });
      
      await pluginSystem.registerPlugin(componentPlugin);
      
      const component = document.createElement('test-component') as any;
      component.title = 'Test Title';
      
      expect(component.title).to.equal('Test Title');
    });
  });

  describe('Plugin Lifecycle', () => {
    it('should activate plugins correctly', async () => {
      const plugin = createTestPlugin();
      const activateSpy = sinon.spy();
      plugin.activate = activateSpy;
      
      await pluginSystem.registerPlugin(plugin);
      await pluginSystem.activatePlugin(plugin.id);
      
      expect(activateSpy).to.have.been.called;
      expect(pluginSystem.getPlugin(plugin.id)?.state).to.equal('active');
    });

    it('should handle plugin dependencies', async () => {
      const dependency = createTestPlugin({ id: 'dependency' });
      const dependent = createTestPlugin({
        id: 'dependent',
        dependencies: [{ id: 'dependency', version: '1.0.0' }]
      });
      
      await pluginSystem.registerPlugin(dependency);
      await pluginSystem.registerPlugin(dependent);
      
      await pluginSystem.activatePlugin('dependent');
      
      expect(pluginSystem.getPlugin('dependency')?.state).to.equal('active');
      expect(pluginSystem.getPlugin('dependent')?.state).to.equal('active');
    });
  });
});
```

## 📋 Completion Checklist

### Core Architecture
- [ ] Plugin system with registration and lifecycle management
- [ ] Component plugin support with dynamic component creation
- [ ] Service plugin architecture
- [ ] Integration plugin system
- [ ] Dependency resolution and conflict detection
- [ ] Plugin sandboxing and security

### Advanced Features
- [ ] Plugin marketplace with search and installation
- [ ] Hot reloading for development
- [ ] Plugin performance monitoring
- [ ] Security scanning and validation
- [ ] Plugin documentation generation
- [ ] Plugin testing utilities

### Developer Experience
- [ ] Plugin development server
- [ ] Plugin scaffolding tools
- [ ] Comprehensive documentation
- [ ] Example plugins and templates
- [ ] Plugin debugging tools
- [ ] Migration utilities

### Quality & Testing
- [ ] Comprehensive test suite (>90% coverage)
- [ ] Security testing and validation
- [ ] Performance testing for plugin system
- [ ] Cross-browser compatibility
- [ ] Plugin compatibility testing
- [ ] Documentation coverage

This plugin architecture provides a robust foundation for extending @nexcraft/forge with custom functionality while maintaining security and performance standards.