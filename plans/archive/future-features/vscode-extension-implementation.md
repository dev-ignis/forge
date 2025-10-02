# VS Code Extension Implementation Plan

## Overview

The Forge VS Code Extension enhances developer productivity by providing intelligent autocomplete, component snippets, real-time validation, theme preview, and integrated development tools directly within the VS Code editor. This extension bridges the gap between design systems and developer workflows.

**Duration**: 1 week  
**Complexity**: Medium  
**Priority**: Medium

## 🎯 Features

### Core Features
- **IntelliSense & Autocomplete**: Smart completion for component properties and methods
- **Code Snippets**: Pre-built component scaffolding and common patterns
- **Hover Documentation**: Rich hover information with examples and links
- **Error Detection**: Real-time validation and error highlighting
- **Syntax Highlighting**: Enhanced syntax highlighting for Forge components
- **Go to Definition**: Navigate to component definitions and documentation

### Advanced Features
- **Live Theme Preview**: Preview themes directly in the editor
- **Component Explorer**: Browse and search available components
- **Design Token Integration**: Visual design token management
- **Accessibility Checker**: Built-in accessibility validation
- **Performance Hints**: Performance optimization suggestions
- **AI-Powered Suggestions**: Intelligent code completion using AI metadata

## 🏗️ Architecture

### Extension Structure

```typescript
interface ForgeExtension {
  // Core providers
  completionProvider: CompletionItemProvider;
  hoverProvider: HoverProvider;
  definitionProvider: DefinitionProvider;
  diagnosticProvider: DiagnosticProvider;
  
  // Custom providers
  themeProvider: ThemeProvider;
  componentProvider: ComponentProvider;
  snippetProvider: SnippetProvider;
  
  // Views and panels
  componentExplorer: ComponentExplorerProvider;
  themePreview: ThemePreviewPanel;
  designTokens: DesignTokensProvider;
  
  // Commands
  commands: ExtensionCommand[];
  
  // Configuration
  config: ExtensionConfig;
}

interface ExtensionConfig {
  // Feature toggles
  enableIntelliSense: boolean;
  enableThemePreview: boolean;
  enableAccessibilityChecks: boolean;
  enablePerformanceHints: boolean;
  
  // Paths and sources
  componentsPath: string;
  themesPath: string;
  docsUrl: string;
  registryUrl: string;
  
  // AI features
  enableAICompletion: boolean;
  aiModel: string;
  aiApiKey?: string;
}

interface ComponentDefinition {
  name: string;
  tagName: string;
  category: 'atom' | 'molecule' | 'organism';
  description: string;
  
  // Properties
  properties: PropertyInfo[];
  events: EventInfo[];
  methods: MethodInfo[];
  slots: SlotInfo[];
  
  // Documentation
  examples: CodeExample[];
  documentation: string;
  
  // Metadata
  aiMetadata?: AIMetadata;
  deprecated?: boolean;
  since?: string;
}

interface PropertyInfo {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
  examples?: string[];
  deprecated?: boolean;
}
```

### Core Classes

```typescript
export class ForgeExtensionProvider {
  private context: vscode.ExtensionContext;
  private componentRegistry: ComponentRegistry;
  private themeManager: ThemeManager;
  private diagnostics: vscode.DiagnosticCollection;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.componentRegistry = new ComponentRegistry();
    this.themeManager = new ThemeManager();
    this.diagnostics = vscode.languages.createDiagnosticCollection('forge');
    
    this.initialize();
  }

  private async initialize(): Promise<void> {
    // Load component definitions
    await this.componentRegistry.load();
    
    // Register providers
    this.registerCompletionProvider();
    this.registerHoverProvider();
    this.registerDefinitionProvider();
    this.registerDiagnosticProvider();
    
    // Register custom views
    this.registerComponentExplorer();
    this.registerThemePreview();
    
    // Register commands
    this.registerCommands();
    
    // Watch for configuration changes
    this.watchConfiguration();
  }

  private registerCompletionProvider(): void {
    const provider = new ForgeCompletionProvider(this.componentRegistry);
    
    const disposable = vscode.languages.registerCompletionItemProvider(
      [
        { scheme: 'file', language: 'typescript' },
        { scheme: 'file', language: 'javascript' },
        { scheme: 'file', language: 'html' },
        { scheme: 'file', language: 'lit-html' }
      ],
      provider,
      '<', '"', "'", ' ', '='
    );
    
    this.context.subscriptions.push(disposable);
  }

  private registerHoverProvider(): void {
    const provider = new ForgeHoverProvider(this.componentRegistry);
    
    const disposable = vscode.languages.registerHoverProvider(
      [
        { scheme: 'file', language: 'typescript' },
        { scheme: 'file', language: 'javascript' },
        { scheme: 'file', language: 'html' }
      ],
      provider
    );
    
    this.context.subscriptions.push(disposable);
  }
}

export class ForgeCompletionProvider implements vscode.CompletionItemProvider {
  constructor(private componentRegistry: ComponentRegistry) {}

  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): Promise<vscode.CompletionItem[]> {
    const line = document.lineAt(position).text;
    const prefix = line.substring(0, position.character);
    
    // Component tag completion
    if (this.isComponentTagContext(prefix)) {
      return this.getComponentTagCompletions();
    }
    
    // Property completion
    const componentMatch = this.findComponentInLine(line);
    if (componentMatch) {
      return this.getPropertyCompletions(componentMatch.component, prefix);
    }
    
    // Import completion
    if (this.isImportContext(prefix)) {
      return this.getImportCompletions();
    }
    
    return [];
  }

  private getComponentTagCompletions(): vscode.CompletionItem[] {
    return this.componentRegistry.getAllComponents().map(component => {
      const item = new vscode.CompletionItem(
        component.tagName,
        vscode.CompletionItemKind.Class
      );
      
      item.detail = component.name;
      item.documentation = new vscode.MarkdownString(component.description);
      item.insertText = new vscode.SnippetString(this.generateComponentSnippet(component));
      item.sortText = `0-${component.tagName}`;
      
      // Add icon based on category
      switch (component.category) {
        case 'atom':
          item.kind = vscode.CompletionItemKind.Unit;
          break;
        case 'molecule':
          item.kind = vscode.CompletionItemKind.Class;
          break;
        case 'organism':
          item.kind = vscode.CompletionItemKind.Module;
          break;
      }
      
      return item;
    });
  }

  private generateComponentSnippet(component: ComponentDefinition): string {
    const requiredProps = component.properties.filter(p => p.required);
    
    if (requiredProps.length === 0) {
      return `${component.tagName}>\n\t$1\n</${component.tagName}>`;
    }
    
    const props = requiredProps
      .map((prop, index) => `${prop.name}="$${index + 2}"`)
      .join(' ');
    
    return `${component.tagName} ${props}>\n\t$1\n</${component.tagName}>`;
  }

  private getPropertyCompletions(
    component: ComponentDefinition,
    prefix: string
  ): vscode.CompletionItem[] {
    const completions: vscode.CompletionItem[] = [];
    
    // Property completions
    component.properties.forEach(property => {
      const item = new vscode.CompletionItem(
        property.name,
        vscode.CompletionItemKind.Property
      );
      
      item.detail = property.type;
      item.documentation = new vscode.MarkdownString(
        this.formatPropertyDocumentation(property)
      );
      
      // Generate appropriate insertion text
      if (property.type === 'boolean') {
        item.insertText = property.name;
      } else {
        item.insertText = new vscode.SnippetString(`${property.name}="$1"`);
      }
      
      // Add completion metadata
      if (property.required) {
        item.sortText = `0-${property.name}`;
      } else {
        item.sortText = `1-${property.name}`;
      }
      
      if (property.deprecated) {
        item.tags = [vscode.CompletionItemTag.Deprecated];
      }
      
      completions.push(item);
    });
    
    // Event completions
    component.events.forEach(event => {
      const item = new vscode.CompletionItem(
        `@${event.name}`,
        vscode.CompletionItemKind.Event
      );
      
      item.detail = 'Event handler';
      item.documentation = new vscode.MarkdownString(event.description);
      item.insertText = new vscode.SnippetString(`@${event.name}="\${1:handleEvent}"`);
      item.sortText = `2-${event.name}`;
      
      completions.push(item);
    });
    
    return completions;
  }

  private formatPropertyDocumentation(property: PropertyInfo): string {
    let docs = property.description;
    
    if (property.defaultValue) {
      docs += `\n\n**Default:** \`${property.defaultValue}\``;
    }
    
    if (property.examples && property.examples.length > 0) {
      docs += '\n\n**Examples:**\n';
      property.examples.forEach(example => {
        docs += `\n\`\`\`html\n${example}\n\`\`\`\n`;
      });
    }
    
    return docs;
  }

  private isComponentTagContext(prefix: string): boolean {
    return prefix.includes('<') && !prefix.includes('>');
  }

  private findComponentInLine(line: string): { component: ComponentDefinition } | null {
    const components = this.componentRegistry.getAllComponents();
    
    for (const component of components) {
      if (line.includes(`<${component.tagName}`)) {
        return { component };
      }
    }
    
    return null;
  }
}

export class ForgeHoverProvider implements vscode.HoverProvider {
  constructor(private componentRegistry: ComponentRegistry) {}

  async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.Hover | null> {
    const range = document.getWordRangeAtPosition(position);
    if (!range) return null;
    
    const word = document.getText(range);
    const line = document.lineAt(position).text;
    
    // Check if hovering over a component tag
    const component = this.componentRegistry.getComponentByTag(word);
    if (component) {
      return this.createComponentHover(component, range);
    }
    
    // Check if hovering over a property
    const propertyInfo = this.findPropertyInLine(line, word);
    if (propertyInfo) {
      return this.createPropertyHover(propertyInfo.property, range);
    }
    
    return null;
  }

  private createComponentHover(
    component: ComponentDefinition,
    range: vscode.Range
  ): vscode.Hover {
    const markdown = new vscode.MarkdownString();
    markdown.isTrusted = true;
    
    // Component title
    markdown.appendMarkdown(`## ${component.name}\n\n`);
    
    // Description
    markdown.appendMarkdown(`${component.description}\n\n`);
    
    // Category badge
    const categoryColor = this.getCategoryColor(component.category);
    markdown.appendMarkdown(`**Category:** ${component.category}\n\n`);
    
    // Usage example
    if (component.examples && component.examples.length > 0) {
      markdown.appendMarkdown('### Example\n\n');
      markdown.appendCodeblock(component.examples[0].code, 'html');
      markdown.appendMarkdown('\n');
    }
    
    // Properties summary
    if (component.properties.length > 0) {
      markdown.appendMarkdown('### Properties\n\n');
      const requiredProps = component.properties.filter(p => p.required);
      const optionalProps = component.properties.filter(p => !p.required);
      
      if (requiredProps.length > 0) {
        markdown.appendMarkdown('**Required:**\n');
        requiredProps.forEach(prop => {
          markdown.appendMarkdown(`- \`${prop.name}\` (${prop.type})\n`);
        });
        markdown.appendMarkdown('\n');
      }
      
      if (optionalProps.length > 0) {
        markdown.appendMarkdown('**Optional:**\n');
        optionalProps.slice(0, 5).forEach(prop => {
          markdown.appendMarkdown(`- \`${prop.name}\` (${prop.type})\n`);
        });
        if (optionalProps.length > 5) {
          markdown.appendMarkdown(`- ... and ${optionalProps.length - 5} more\n`);
        }
      }
    }
    
    // Documentation link
    markdown.appendMarkdown(`\n[📖 View Documentation](${this.getDocumentationUrl(component)})`);
    
    return new vscode.Hover(markdown, range);
  }

  private createPropertyHover(
    property: PropertyInfo,
    range: vscode.Range
  ): vscode.Hover {
    const markdown = new vscode.MarkdownString();
    
    // Property signature
    markdown.appendMarkdown(`\`${property.name}: ${property.type}\`\n\n`);
    
    // Description
    markdown.appendMarkdown(`${property.description}\n\n`);
    
    // Default value
    if (property.defaultValue) {
      markdown.appendMarkdown(`**Default:** \`${property.defaultValue}\`\n\n`);
    }
    
    // Required indicator
    if (property.required) {
      markdown.appendMarkdown('**Required** ⚠️\n\n');
    }
    
    // Examples
    if (property.examples && property.examples.length > 0) {
      markdown.appendMarkdown('**Examples:**\n\n');
      property.examples.forEach(example => {
        markdown.appendCodeblock(example, 'html');
      });
    }
    
    return new vscode.Hover(markdown, range);
  }

  private getCategoryColor(category: string): string {
    const colors = {
      atom: '#22c55e',      // Green
      molecule: '#3b82f6',  // Blue
      organism: '#8b5cf6'   // Purple
    };
    return colors[category as keyof typeof colors] || '#6b7280';
  }

  private getDocumentationUrl(component: ComponentDefinition): string {
    return `https://forge.nexcraft.io/components/${component.category}s/${component.tagName.replace('forge-', '')}`;
  }
}
```

## 📁 File Structure

```
forge-vscode-extension/
├── src/
│   ├── extension.ts          # Main extension entry point
│   ├── providers/
│   │   ├── completion.ts     # IntelliSense provider
│   │   ├── hover.ts          # Hover information provider
│   │   ├── definition.ts     # Go-to-definition provider
│   │   ├── diagnostic.ts     # Error detection provider
│   │   └── snippet.ts        # Code snippets provider
│   │
│   ├── views/
│   │   ├── component-explorer.ts  # Component browser panel
│   │   ├── theme-preview.ts       # Theme preview panel
│   │   └── design-tokens.ts       # Design tokens manager
│   │
│   ├── commands/
│   │   ├── generate.ts       # Component generation commands
│   │   ├── theme.ts          # Theme management commands
│   │   └── validation.ts     # Validation commands
│   │
│   ├── utils/
│   │   ├── component-registry.ts  # Component definitions
│   │   ├── theme-manager.ts       # Theme management
│   │   ├── parser.ts              # Code parsing utilities
│   │   └── ai-integration.ts      # AI-powered features
│   │
│   └── test/
│       ├── suite/            # Test suites
│       └── runTest.ts        # Test runner
│
├── snippets/
│   ├── forge-components.json # Component snippets
│   └── forge-patterns.json   # Common patterns
│
├── syntaxes/
│   └── forge-lit.tmLanguage.json # Syntax highlighting
│
├── themes/
│   └── forge-dark.json       # Extension theme
│
├── images/
│   ├── icon.png             # Extension icon
│   └── components/          # Component icons
│
├── package.json             # Extension manifest
├── README.md
└── CHANGELOG.md
```

## 🚀 Implementation Details

### Component Explorer View

```typescript
export class ComponentExplorerProvider implements vscode.TreeDataProvider<ComponentItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<ComponentItem | undefined | null>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  constructor(private componentRegistry: ComponentRegistry) {}

  getTreeItem(element: ComponentItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: ComponentItem): ComponentItem[] {
    if (!element) {
      // Root categories
      return [
        new CategoryItem('Atoms', 'atom', vscode.TreeItemCollapsibleState.Expanded),
        new CategoryItem('Molecules', 'molecule', vscode.TreeItemCollapsibleState.Expanded),
        new CategoryItem('Organisms', 'organism', vscode.TreeItemCollapsibleState.Expanded)
      ];
    }

    if (element instanceof CategoryItem) {
      // Components in category
      return this.componentRegistry
        .getComponentsByCategory(element.category)
        .map(component => new ComponentTreeItem(component));
    }

    return [];
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }
}

class ComponentTreeItem extends vscode.TreeItem {
  constructor(private component: ComponentDefinition) {
    super(component.name, vscode.TreeItemCollapsibleState.None);
    
    this.description = component.description;
    this.tooltip = this.createTooltip();
    this.contextValue = 'forgeComponent';
    
    // Add command to insert component
    this.command = {
      command: 'forge.insertComponent',
      title: 'Insert Component',
      arguments: [component]
    };
    
    // Set icon
    this.iconPath = this.getIconPath();
  }

  private createTooltip(): vscode.MarkdownString {
    const tooltip = new vscode.MarkdownString();
    tooltip.appendMarkdown(`**${this.component.name}**\n\n`);
    tooltip.appendMarkdown(`${this.component.description}\n\n`);
    tooltip.appendMarkdown(`**Tag:** \`${this.component.tagName}\`\n`);
    tooltip.appendMarkdown(`**Properties:** ${this.component.properties.length}\n`);
    return tooltip;
  }

  private getIconPath(): vscode.ThemeIcon {
    switch (this.component.category) {
      case 'atom':
        return new vscode.ThemeIcon('symbol-unit');
      case 'molecule':
        return new vscode.ThemeIcon('symbol-class');
      case 'organism':
        return new vscode.ThemeIcon('symbol-module');
      default:
        return new vscode.ThemeIcon('symbol-misc');
    }
  }
}
```

### Theme Preview Panel

```typescript
export class ThemePreviewPanel {
  public static currentPanel: ThemePreviewPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri): void {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (ThemePreviewPanel.currentPanel) {
      ThemePreviewPanel.currentPanel._panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'forgeThemePreview',
      'Forge Theme Preview',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, 'media'),
          vscode.Uri.joinPath(extensionUri, 'out/compiled')
        ]
      }
    );

    ThemePreviewPanel.currentPanel = new ThemePreviewPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    
    this._update();
    
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    
    this._panel.webview.onDidReceiveMessage(
      message => this.handleMessage(message),
      null,
      this._disposables
    );
  }

  private _update(): void {
    const webview = this._panel.webview;
    
    this._panel.title = 'Forge Theme Preview';
    this._panel.webview.html = this._getHtmlForWebview(webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'out', 'compiled/themePreview.js')
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'out', 'compiled/themePreview.css')
    );

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleUri}" rel="stylesheet">
    <title>Theme Preview</title>
</head>
<body>
    <div id="app">
        <div class="theme-selector">
            <select id="themeSelect">
                <option value="default">Default Theme</option>
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
            </select>
        </div>
        
        <div class="component-showcase">
            <h2>Component Showcase</h2>
            
            <div class="component-section">
                <h3>Buttons</h3>
                <forge-button variant="primary">Primary Button</forge-button>
                <forge-button variant="secondary">Secondary Button</forge-button>
                <forge-button variant="outline">Outline Button</forge-button>
            </div>
            
            <div class="component-section">
                <h3>Form Elements</h3>
                <forge-input label="Text Input" placeholder="Enter text"></forge-input>
                <forge-select label="Select Option">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </forge-select>
                <forge-checkbox>Checkbox Option</forge-checkbox>
            </div>
            
            <div class="component-section">
                <h3>Feedback</h3>
                <forge-alert variant="success">Success message</forge-alert>
                <forge-alert variant="warning">Warning message</forge-alert>
                <forge-alert variant="error">Error message</forge-alert>
            </div>
        </div>
        
        <div class="design-tokens">
            <h2>Design Tokens</h2>
            
            <div class="token-group">
                <h3>Colors</h3>
                <div class="color-palette" id="colorPalette"></div>
            </div>
            
            <div class="token-group">
                <h3>Typography</h3>
                <div class="typography-scale" id="typographyScale"></div>
            </div>
            
            <div class="token-group">
                <h3>Spacing</h3>
                <div class="spacing-scale" id="spacingScale"></div>
            </div>
        </div>
    </div>
    
    <script src="${scriptUri}"></script>
</body>
</html>`;
  }

  private handleMessage(message: any): void {
    switch (message.command) {
      case 'themeChanged':
        this.applyTheme(message.theme);
        break;
      case 'exportTheme':
        this.exportTheme(message.theme);
        break;
    }
  }

  private applyTheme(themeId: string): void {
    // Apply theme to webview and notify user
    vscode.window.showInformationMessage(`Applied theme: ${themeId}`);
  }

  private async exportTheme(theme: any): Promise<void> {
    const uri = await vscode.window.showSaveDialog({
      defaultUri: vscode.Uri.file('theme.json'),
      filters: {
        'JSON': ['json']
      }
    });

    if (uri) {
      await vscode.workspace.fs.writeFile(
        uri,
        Buffer.from(JSON.stringify(theme, null, 2))
      );
      vscode.window.showInformationMessage(`Theme exported to ${uri.fsPath}`);
    }
  }

  public dispose(): void {
    ThemePreviewPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
```

### AI-Powered Code Completion

```typescript
export class AICompletionProvider {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  async provideAICompletions(
    document: vscode.TextDocument,
    position: vscode.Position,
    context: vscode.CompletionContext
  ): Promise<vscode.CompletionItem[]> {
    const config = vscode.workspace.getConfiguration('forge');
    if (!config.get('enableAICompletion')) {
      return [];
    }

    const textBeforeCursor = document.getText(
      new vscode.Range(
        new vscode.Position(Math.max(0, position.line - 10), 0),
        position
      )
    );

    try {
      const suggestions = await this.aiService.getCompletionSuggestions({
        code: textBeforeCursor,
        language: document.languageId,
        cursor: position,
        components: this.getAvailableComponents(document)
      });

      return suggestions.map(suggestion => {
        const item = new vscode.CompletionItem(
          suggestion.text,
          vscode.CompletionItemKind.AI
        );
        
        item.detail = suggestion.description;
        item.documentation = new vscode.MarkdownString(suggestion.explanation);
        item.insertText = new vscode.SnippetString(suggestion.snippet);
        item.sortText = '00-ai-' + suggestion.confidence;
        
        return item;
      });
    } catch (error) {
      console.error('AI completion failed:', error);
      return [];
    }
  }

  private getAvailableComponents(document: vscode.TextDocument): ComponentDefinition[] {
    // Analyze imports and available components in the current file
    const text = document.getText();
    const importRegex = /import.*from\s+['"]([^'"]+)['"]/g;
    const imports = [];
    let match;
    
    while ((match = importRegex.exec(text)) !== null) {
      imports.push(match[1]);
    }
    
    // Return components based on imports
    return this.componentRegistry.getComponentsByImports(imports);
  }
}

class AIService {
  async getCompletionSuggestions(request: AICompletionRequest): Promise<AISuggestion[]> {
    const config = vscode.workspace.getConfiguration('forge');
    const apiKey = config.get<string>('aiApiKey');
    
    if (!apiKey) {
      return [];
    }

    const response = await fetch('https://api.forge.nexcraft.io/ai/complete', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: request.code,
        language: request.language,
        components: request.components.map(c => ({
          name: c.name,
          tagName: c.tagName,
          properties: c.properties,
          aiMetadata: c.aiMetadata
        }))
      })
    });

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    return await response.json();
  }
}
```

### Extension Commands

```typescript
export class ExtensionCommands {
  static register(context: vscode.ExtensionContext): void {
    // Component insertion
    context.subscriptions.push(
      vscode.commands.registerCommand('forge.insertComponent', (component: ComponentDefinition) => {
        this.insertComponent(component);
      })
    );

    // Generate component
    context.subscriptions.push(
      vscode.commands.registerCommand('forge.generateComponent', () => {
        this.showGenerateComponentDialog();
      })
    );

    // Theme commands
    context.subscriptions.push(
      vscode.commands.registerCommand('forge.previewTheme', () => {
        ThemePreviewPanel.createOrShow(context.extensionUri);
      })
    );

    // Validation commands
    context.subscriptions.push(
      vscode.commands.registerCommand('forge.validateComponent', () => {
        this.validateCurrentComponent();
      })
    );

    // Documentation commands
    context.subscriptions.push(
      vscode.commands.registerCommand('forge.openDocs', (component?: ComponentDefinition) => {
        this.openDocumentation(component);
      })
    );
  }

  private static insertComponent(component: ComponentDefinition): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const snippet = this.generateComponentSnippet(component);
    editor.insertSnippet(new vscode.SnippetString(snippet));
  }

  private static async showGenerateComponentDialog(): Promise<void> {
    const name = await vscode.window.showInputBox({
      prompt: 'Enter component name',
      placeholder: 'MyComponent'
    });

    if (!name) return;

    const category = await vscode.window.showQuickPick(
      ['atom', 'molecule', 'organism'],
      { placeHolder: 'Select component category' }
    );

    if (!category) return;

    // Generate component using CLI
    const terminal = vscode.window.createTerminal('Forge Generate');
    terminal.sendText(`forge generate component ${name} --category ${category}`);
    terminal.show();
  }

  private static async validateCurrentComponent(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const validator = new ComponentValidator();
    
    const issues = await validator.validate(document.getText());
    
    // Show validation results
    if (issues.length === 0) {
      vscode.window.showInformationMessage('✅ No validation issues found');
    } else {
      const diagnostics = issues.map(issue => {
        const diagnostic = new vscode.Diagnostic(
          issue.range,
          issue.message,
          issue.severity
        );
        diagnostic.source = 'forge';
        return diagnostic;
      });
      
      vscode.languages.getDiagnostics().set(document.uri, diagnostics);
      vscode.window.showWarningMessage(`⚠️ Found ${issues.length} validation issues`);
    }
  }

  private static openDocumentation(component?: ComponentDefinition): void {
    let url = 'https://forge.nexcraft.io/docs';
    
    if (component) {
      url += `/components/${component.category}s/${component.tagName.replace('forge-', '')}`;
    }
    
    vscode.env.openExternal(vscode.Uri.parse(url));
  }
}
```

## 🧪 Testing Strategy

```typescript
// extension.test.ts
describe('Forge VS Code Extension', () => {
  let extension: vscode.Extension<any>;

  before(async () => {
    extension = vscode.extensions.getExtension('nexcraft.forge-vscode')!;
    await extension.activate();
  });

  describe('Completion Provider', () => {
    it('should provide component completions', async () => {
      const document = await vscode.workspace.openTextDocument({
        content: '<forge-',
        language: 'html'
      });
      
      const position = new vscode.Position(0, 7);
      const completions = await vscode.commands.executeCommand(
        'vscode.executeCompletionItemProvider',
        document.uri,
        position
      );
      
      expect(completions).to.be.an('array');
      expect(completions.some(item => item.label === 'forge-button')).to.be.true;
    });

    it('should provide property completions', async () => {
      const document = await vscode.workspace.openTextDocument({
        content: '<forge-button ',
        language: 'html'
      });
      
      const position = new vscode.Position(0, 14);
      const completions = await vscode.commands.executeCommand(
        'vscode.executeCompletionItemProvider',
        document.uri,
        position
      );
      
      expect(completions.some(item => item.label === 'variant')).to.be.true;
    });
  });

  describe('Hover Provider', () => {
    it('should provide hover information', async () => {
      const document = await vscode.workspace.openTextDocument({
        content: '<forge-button>Click me</forge-button>',
        language: 'html'
      });
      
      const position = new vscode.Position(0, 8);
      const hovers = await vscode.commands.executeCommand(
        'vscode.executeHoverProvider',
        document.uri,
        position
      );
      
      expect(hovers).to.be.an('array');
      expect(hovers[0].contents[0]).to.include('Button component');
    });
  });

  describe('Commands', () => {
    it('should register all commands', () => {
      const commands = [
        'forge.insertComponent',
        'forge.generateComponent',
        'forge.previewTheme',
        'forge.validateComponent',
        'forge.openDocs'
      ];
      
      commands.forEach(command => {
        expect(vscode.commands.getCommands().then(all => 
          all.includes(command)
        )).to.eventually.be.true;
      });
    });
  });
});
```

## 📋 Completion Checklist

### Core Features
- [ ] IntelliSense with component and property completion
- [ ] Hover documentation with examples
- [ ] Error detection and validation
- [ ] Code snippets for common patterns
- [ ] Go-to-definition navigation
- [ ] Syntax highlighting enhancements

### Advanced Features
- [ ] Component Explorer tree view
- [ ] Live theme preview panel
- [ ] Design token management
- [ ] AI-powered code suggestions
- [ ] Accessibility validation
- [ ] Performance hints and optimization

### Developer Experience
- [ ] Comprehensive configuration options
- [ ] Command palette integration
- [ ] Keyboard shortcuts
- [ ] Context menu actions
- [ ] Status bar information
- [ ] Progress indicators

### Quality & Testing
- [ ] Comprehensive test suite (>90% coverage)
- [ ] Extension API testing
- [ ] Performance testing
- [ ] Cross-platform compatibility
- [ ] VS Code version compatibility
- [ ] Error handling and recovery

The Forge VS Code Extension transforms the editor into a powerful design system development environment, bridging the gap between design tokens and implementation.