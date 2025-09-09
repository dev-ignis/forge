# Forge CLI Tool Implementation Plan

## Overview

The Forge CLI is a comprehensive command-line interface that streamlines development workflows, component generation, theme customization, and project management. This tool transforms @nexcraft/forge from a component library into a complete development platform with intelligent automation and enterprise-grade tooling.

**Duration**: 1 week  
**Complexity**: Medium  
**Priority**: High

## 🎯 Features

### Core Commands
- **Component Generation**: Scaffold new components with templates and best practices
- **Project Initialization**: Set up new projects with Forge integration
- **Build Tools**: Enhanced building, bundling, and optimization
- **Development Server**: Hot-reloading dev server with component preview
- **Theme Management**: CLI-based theme creation and customization
- **Bundle Analysis**: Detailed bundle size analysis and optimization suggestions

### Advanced Commands
- **Migration Tools**: Automated version upgrades and breaking change handling
- **Testing Tools**: Component testing, visual regression, and accessibility testing
- **Performance Auditing**: Component performance analysis and optimization
- **Documentation Generation**: Automated documentation from component metadata
- **Plugin Management**: Plugin installation, updates, and development
- **Deployment Tools**: Production deployment and CDN management

## 🏗️ Architecture

### Command Structure

```typescript
interface CLICommand {
  name: string;
  description: string;
  usage: string;
  options: CLIOption[];
  aliases?: string[];
  examples?: string[];
  
  // Command execution
  execute(args: ParsedArgs, context: CLIContext): Promise<void>;
  
  // Validation
  validate?(args: ParsedArgs): ValidationResult;
  
  // Help and documentation
  getHelp?(): string;
  getExamples?(): CommandExample[];
}

interface CLIOption {
  name: string;
  alias?: string;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'array';
  required?: boolean;
  defaultValue?: unknown;
  choices?: string[];
}

interface CLIContext {
  workingDir: string;
  projectRoot: string;
  configPath: string;
  config: ForgeConfig;
  logger: Logger;
  spinner: Spinner;
  
  // Utilities
  fs: FileSystemUtils;
  git: GitUtils;
  npm: NPMUtils;
  template: TemplateEngine;
}

interface ForgeConfig {
  version: string;
  components: ComponentConfig;
  build: BuildConfig;
  dev: DevConfig;
  theme: ThemeConfig;
  plugins: PluginConfig[];
}
```

### Core Classes

```typescript
export class ForgeCLI {
  private commands = new Map<string, CLICommand>();
  private context: CLIContext;
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
    this.context = this.createContext();
    this.registerCommands();
  }

  async run(args: string[]): Promise<void> {
    try {
      const parsed = this.parseArgs(args);
      const command = this.getCommand(parsed.command);
      
      if (!command) {
        this.showHelp();
        return;
      }

      // Validate arguments
      if (command.validate) {
        const validation = command.validate(parsed);
        if (!validation.valid) {
          this.logger.error(`Invalid arguments: ${validation.errors.join(', ')}`);
          return;
        }
      }

      // Execute command
      await command.execute(parsed, this.context);
      
    } catch (error) {
      this.logger.error(`Command failed: ${error.message}`);
      process.exit(1);
    }
  }

  private registerCommands(): void {
    const commands = [
      new GenerateCommand(),
      new InitCommand(),
      new BuildCommand(),
      new DevCommand(),
      new ThemeCommand(),
      new AnalyzeCommand(),
      new MigrateCommand(),
      new TestCommand(),
      new AuditCommand(),
      new DocsCommand(),
      new PluginCommand(),
      new DeployCommand()
    ];

    commands.forEach(command => {
      this.commands.set(command.name, command);
      
      // Register aliases
      command.aliases?.forEach(alias => {
        this.commands.set(alias, command);
      });
    });
  }

  private createContext(): CLIContext {
    const workingDir = process.cwd();
    const projectRoot = this.findProjectRoot(workingDir);
    const configPath = path.join(projectRoot, 'forge.config.js');
    
    return {
      workingDir,
      projectRoot,
      configPath,
      config: this.loadConfig(configPath),
      logger: this.logger,
      spinner: new Spinner(),
      fs: new FileSystemUtils(),
      git: new GitUtils(),
      npm: new NPMUtils(),
      template: new TemplateEngine()
    };
  }

  private findProjectRoot(startDir: string): string {
    let currentDir = startDir;
    
    while (currentDir !== path.dirname(currentDir)) {
      const configFiles = [
        'forge.config.js',
        'package.json',
        '.git'
      ];
      
      for (const file of configFiles) {
        if (fs.existsSync(path.join(currentDir, file))) {
          return currentDir;
        }
      }
      
      currentDir = path.dirname(currentDir);
    }
    
    return startDir;
  }

  showHelp(): void {
    console.log(`
Forge CLI - Component development toolkit

Usage: forge <command> [options]

Commands:
  init         Initialize a new Forge project
  generate     Generate components, themes, or plugins
  dev          Start development server
  build        Build project for production
  theme        Manage themes and design tokens
  analyze      Analyze bundle size and performance
  migrate      Migrate to newer Forge versions
  test         Run component tests
  audit        Performance and accessibility audit
  docs         Generate documentation
  plugin       Manage plugins
  deploy       Deploy to production

Global Options:
  -h, --help     Show help information
  -v, --version  Show version information
  --verbose      Enable verbose logging
  --config       Specify config file path

Examples:
  forge init my-project
  forge generate component Button
  forge dev --port 3000
  forge build --analyze
  forge theme create dark-theme

For more information on a specific command, use:
  forge <command> --help
    `);
  }
}
```

## 📁 File Structure

```
packages/cli/
├── src/
│   ├── index.ts              # CLI entry point
│   ├── cli.ts                # Main CLI class
│   ├── context.ts            # CLI context management
│   ├── parser.ts             # Argument parsing
│   ├── logger.ts             # Logging utilities
│   │
│   ├── commands/
│   │   ├── base-command.ts   # Base command class
│   │   ├── init.ts           # Project initialization
│   │   ├── generate.ts       # Component generation
│   │   ├── dev.ts            # Development server
│   │   ├── build.ts          # Production builds
│   │   ├── theme.ts          # Theme management
│   │   ├── analyze.ts        # Bundle analysis
│   │   ├── migrate.ts        # Version migration
│   │   ├── test.ts           # Testing tools
│   │   ├── audit.ts          # Performance audit
│   │   ├── docs.ts           # Documentation
│   │   ├── plugin.ts         # Plugin management
│   │   └── deploy.ts         # Deployment tools
│   │
│   ├── generators/
│   │   ├── component/        # Component templates
│   │   ├── theme/            # Theme templates
│   │   ├── plugin/           # Plugin templates
│   │   └── project/          # Project templates
│   │
│   ├── utils/
│   │   ├── fs-utils.ts       # File system utilities
│   │   ├── git-utils.ts      # Git operations
│   │   ├── npm-utils.ts      # NPM operations
│   │   ├── template.ts       # Template engine
│   │   ├── spinner.ts        # Progress indicators
│   │   └── validation.ts     # Input validation
│   │
│   └── config/
│       ├── default-config.ts # Default configuration
│       ├── config-loader.ts  # Configuration loading
│       └── schema.ts         # Config schema validation
│
├── templates/                # Code generation templates
├── bin/
│   └── forge                # Executable script
├── package.json
└── README.md
```

## 🚀 Implementation Details

### Core Commands

#### 1. Initialize Command (`forge init`)
```typescript
export class InitCommand implements CLICommand {
  name = 'init';
  description = 'Initialize a new Forge project';
  usage = 'forge init [project-name] [options]';
  
  options: CLIOption[] = [
    {
      name: 'template',
      alias: 't',
      description: 'Project template to use',
      type: 'string',
      choices: ['basic', 'react', 'vue', 'angular', 'lit'],
      defaultValue: 'basic'
    },
    {
      name: 'typescript',
      alias: 'ts',
      description: 'Use TypeScript',
      type: 'boolean',
      defaultValue: true
    },
    {
      name: 'theme',
      description: 'Include theme customization',
      type: 'boolean',
      defaultValue: true
    }
  ];

  async execute(args: ParsedArgs, context: CLIContext): Promise<void> {
    const projectName = args.positional[0] || 'forge-project';
    const template = args.options.template as string;
    const useTypeScript = args.options.typescript as boolean;
    
    context.spinner.start(`Creating project: ${projectName}`);
    
    try {
      // Create project directory
      const projectPath = path.join(context.workingDir, projectName);
      await context.fs.ensureDir(projectPath);
      
      // Generate project from template
      const templatePath = this.getTemplatePath(template);
      await context.template.generate(templatePath, projectPath, {
        projectName,
        useTypeScript,
        timestamp: new Date().toISOString()
      });
      
      // Install dependencies
      await this.installDependencies(projectPath, context);
      
      // Initialize git repository
      await context.git.init(projectPath);
      await context.git.addAll(projectPath);
      await context.git.commit(projectPath, 'Initial commit');
      
      context.spinner.succeed(`Project ${projectName} created successfully!`);
      
      // Show next steps
      this.showNextSteps(projectName);
      
    } catch (error) {
      context.spinner.fail(`Failed to create project: ${error.message}`);
      throw error;
    }
  }

  private async installDependencies(projectPath: string, context: CLIContext): Promise<void> {
    context.spinner.text = 'Installing dependencies...';
    
    const packageManager = await this.detectPackageManager(projectPath);
    await context.npm.install(projectPath, packageManager);
  }

  private async detectPackageManager(projectPath: string): Promise<string> {
    if (await fs.pathExists(path.join(projectPath, 'yarn.lock'))) return 'yarn';
    if (await fs.pathExists(path.join(projectPath, 'pnpm-lock.yaml'))) return 'pnpm';
    return 'npm';
  }

  private showNextSteps(projectName: string): void {
    console.log(`
Next steps:
  1. cd ${projectName}
  2. forge dev              # Start development server
  3. forge generate component MyComponent  # Generate a component
  4. forge build            # Build for production

Happy coding! 🚀
    `);
  }
}
```

#### 2. Generate Command (`forge generate`)
```typescript
export class GenerateCommand implements CLICommand {
  name = 'generate';
  description = 'Generate components, themes, or plugins';
  usage = 'forge generate <type> <name> [options]';
  aliases = ['g'];

  options: CLIOption[] = [
    {
      name: 'category',
      alias: 'c',
      description: 'Component category (atom, molecule, organism)',
      type: 'string',
      choices: ['atom', 'molecule', 'organism'],
      defaultValue: 'atom'
    },
    {
      name: 'typescript',
      alias: 'ts',
      description: 'Generate TypeScript files',
      type: 'boolean',
      defaultValue: true
    },
    {
      name: 'tests',
      description: 'Generate test files',
      type: 'boolean',
      defaultValue: true
    },
    {
      name: 'stories',
      description: 'Generate Storybook stories',
      type: 'boolean',
      defaultValue: true
    },
    {
      name: 'docs',
      description: 'Generate documentation',
      type: 'boolean',
      defaultValue: true
    }
  ];

  async execute(args: ParsedArgs, context: CLIContext): Promise<void> {
    const type = args.positional[0];
    const name = args.positional[1];
    
    if (!type || !name) {
      context.logger.error('Type and name are required');
      this.showUsage();
      return;
    }

    const generator = this.getGenerator(type);
    if (!generator) {
      context.logger.error(`Unknown generator type: ${type}`);
      this.showAvailableGenerators();
      return;
    }

    context.spinner.start(`Generating ${type}: ${name}`);
    
    try {
      await generator.generate(name, args.options, context);
      context.spinner.succeed(`${type} ${name} generated successfully!`);
      
      // Show generated files
      const files = await generator.getGeneratedFiles();
      this.showGeneratedFiles(files);
      
    } catch (error) {
      context.spinner.fail(`Failed to generate ${type}: ${error.message}`);
      throw error;
    }
  }

  private getGenerator(type: string): Generator | null {
    const generators = {
      component: new ComponentGenerator(),
      theme: new ThemeGenerator(),
      plugin: new PluginGenerator(),
      service: new ServiceGenerator()
    };

    return generators[type as keyof typeof generators] || null;
  }

  private showGeneratedFiles(files: string[]): void {
    console.log('\nGenerated files:');
    files.forEach(file => {
      console.log(`  ✓ ${file}`);
    });
  }

  private showAvailableGenerators(): void {
    console.log(`
Available generators:
  component    Generate a new component
  theme        Generate a new theme
  plugin       Generate a new plugin
  service      Generate a new service

Examples:
  forge generate component Button
  forge generate theme dark-theme
  forge generate plugin analytics
    `);
  }
}

// Component generator implementation
export class ComponentGenerator implements Generator {
  async generate(name: string, options: GenerateOptions, context: CLIContext): Promise<void> {
    const componentName = this.formatComponentName(name);
    const tagName = this.formatTagName(name);
    const category = options.category as string;
    
    const templateData = {
      componentName,
      tagName,
      category,
      className: `Forge${componentName}`,
      timestamp: new Date().toISOString(),
      useTypeScript: options.typescript,
      withTests: options.tests,
      withStories: options.stories,
      withDocs: options.docs
    };

    const outputDir = path.join(
      context.projectRoot,
      'src/components',
      `${category}s`,
      this.kebabCase(name)
    );

    await context.fs.ensureDir(outputDir);

    // Generate main component file
    await this.generateComponentFile(outputDir, templateData, context);
    
    // Generate test file
    if (options.tests) {
      await this.generateTestFile(outputDir, templateData, context);
    }
    
    // Generate Storybook stories
    if (options.stories) {
      await this.generateStoriesFile(outputDir, templateData, context);
    }
    
    // Generate documentation
    if (options.docs) {
      await this.generateDocsFile(outputDir, templateData, context);
    }
    
    // Update barrel exports
    await this.updateBarrelExports(category, componentName, context);
  }

  private async generateComponentFile(
    outputDir: string, 
    data: TemplateData, 
    context: CLIContext
  ): Promise<void> {
    const templatePath = path.join(__dirname, '../templates/component/component.ts.hbs');
    const outputPath = path.join(outputDir, `${this.kebabCase(data.componentName)}.ts`);
    
    await context.template.renderFile(templatePath, outputPath, data);
  }

  private async generateTestFile(
    outputDir: string, 
    data: TemplateData, 
    context: CLIContext
  ): Promise<void> {
    const templatePath = path.join(__dirname, '../templates/component/component.test.ts.hbs');
    const outputPath = path.join(outputDir, `${this.kebabCase(data.componentName)}.test.ts`);
    
    await context.template.renderFile(templatePath, outputPath, data);
  }

  private formatComponentName(name: string): string {
    return name
      .split(/[-_\s]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('');
  }

  private formatTagName(name: string): string {
    return `forge-${this.kebabCase(name)}`;
  }

  private kebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }
}
```

#### 3. Development Server Command (`forge dev`)
```typescript
export class DevCommand implements CLICommand {
  name = 'dev';
  description = 'Start development server with hot reloading';
  usage = 'forge dev [options]';

  options: CLIOption[] = [
    {
      name: 'port',
      alias: 'p',
      description: 'Port number',
      type: 'number',
      defaultValue: 3000
    },
    {
      name: 'host',
      alias: 'h',
      description: 'Host address',
      type: 'string',
      defaultValue: 'localhost'
    },
    {
      name: 'open',
      alias: 'o',
      description: 'Open browser automatically',
      type: 'boolean',
      defaultValue: true
    },
    {
      name: 'storybook',
      description: 'Start with Storybook',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'https',
      description: 'Use HTTPS',
      type: 'boolean',
      defaultValue: false
    }
  ];

  async execute(args: ParsedArgs, context: CLIContext): Promise<void> {
    const port = args.options.port as number;
    const host = args.options.host as string;
    const openBrowser = args.options.open as boolean;
    const withStorybook = args.options.storybook as boolean;
    
    context.logger.info('Starting Forge development server...');
    
    try {
      const server = new DevServer({
        port,
        host,
        https: args.options.https as boolean,
        root: context.projectRoot,
        config: context.config
      });

      // Setup hot module replacement
      server.setupHMR();
      
      // Setup component preview
      server.setupComponentPreview();
      
      // Start Storybook if requested
      if (withStorybook) {
        await this.startStorybook(context);
      }
      
      // Start server
      await server.start();
      
      const protocol = args.options.https ? 'https' : 'http';
      const url = `${protocol}://${host}:${port}`;
      
      context.logger.success(`Development server running at ${url}`);
      
      if (openBrowser) {
        await this.openBrowser(url);
      }
      
      // Watch for file changes
      this.watchForChanges(server, context);
      
      // Handle graceful shutdown
      this.setupShutdownHandler(server);
      
    } catch (error) {
      context.logger.error(`Failed to start dev server: ${error.message}`);
      throw error;
    }
  }

  private async startStorybook(context: CLIContext): Promise<void> {
    const storybookPort = 6006;
    const storybookProcess = spawn('npm', ['run', 'storybook'], {
      cwd: context.projectRoot,
      stdio: 'inherit'
    });
    
    context.logger.info(`Storybook starting at http://localhost:${storybookPort}`);
    
    // Store process for cleanup
    process.on('exit', () => {
      storybookProcess.kill();
    });
  }

  private watchForChanges(server: DevServer, context: CLIContext): void {
    const watcher = chokidar.watch([
      'src/**/*.{ts,js,css,scss}',
      'themes/**/*.{css,scss,json}',
      'forge.config.js'
    ], {
      cwd: context.projectRoot,
      ignoreInitial: true
    });

    watcher.on('change', async (filePath) => {
      context.logger.info(`File changed: ${filePath}`);
      
      if (filePath.includes('forge.config.js')) {
        // Reload configuration
        context.config = this.reloadConfig(context.configPath);
        await server.reloadConfig(context.config);
      }
      
      // Trigger hot reload
      server.reload(filePath);
    });

    watcher.on('add', (filePath) => {
      context.logger.info(`File added: ${filePath}`);
      server.reload(filePath);
    });

    watcher.on('unlink', (filePath) => {
      context.logger.info(`File removed: ${filePath}`);
      server.reload(filePath);
    });
  }

  private setupShutdownHandler(server: DevServer): void {
    const shutdown = async () => {
      console.log('\nShutting down development server...');
      await server.stop();
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  }

  private async openBrowser(url: string): Promise<void> {
    const open = await import('open');
    try {
      await open.default(url);
    } catch (error) {
      // Silently fail if browser cannot be opened
    }
  }
}
```

#### 4. Build Command (`forge build`)
```typescript
export class BuildCommand implements CLICommand {
  name = 'build';
  description = 'Build project for production';
  usage = 'forge build [options]';

  options: CLIOption[] = [
    {
      name: 'analyze',
      description: 'Analyze bundle size',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'minify',
      description: 'Minify output',
      type: 'boolean',
      defaultValue: true
    },
    {
      name: 'sourcemap',
      description: 'Generate source maps',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'output',
      alias: 'o',
      description: 'Output directory',
      type: 'string',
      defaultValue: 'dist'
    },
    {
      name: 'target',
      description: 'Build target',
      type: 'string',
      choices: ['web', 'node', 'universal'],
      defaultValue: 'web'
    }
  ];

  async execute(args: ParsedArgs, context: CLIContext): Promise<void> {
    const outputDir = args.options.output as string;
    const analyze = args.options.analyze as boolean;
    
    context.spinner.start('Building project...');
    
    try {
      const builder = new ProductionBuilder({
        root: context.projectRoot,
        output: path.join(context.projectRoot, outputDir),
        config: context.config,
        minify: args.options.minify as boolean,
        sourcemap: args.options.sourcemap as boolean,
        target: args.options.target as string
      });

      // Clean output directory
      await context.fs.emptyDir(path.join(context.projectRoot, outputDir));
      
      // Build project
      const result = await builder.build();
      
      context.spinner.succeed('Build completed successfully!');
      
      // Show build stats
      this.showBuildStats(result);
      
      // Run bundle analysis if requested
      if (analyze) {
        await this.analyzeBundles(result, context);
      }
      
    } catch (error) {
      context.spinner.fail(`Build failed: ${error.message}`);
      throw error;
    }
  }

  private showBuildStats(result: BuildResult): void {
    console.log('\nBuild Summary:');
    console.log(`  Total files: ${result.files.length}`);
    console.log(`  Total size: ${this.formatSize(result.totalSize)}`);
    console.log(`  Gzipped: ${this.formatSize(result.gzipSize)}`);
    console.log(`  Build time: ${result.buildTime}ms`);
    
    if (result.chunks.length > 0) {
      console.log('\nChunks:');
      result.chunks.forEach(chunk => {
        console.log(`  ${chunk.name}: ${this.formatSize(chunk.size)}`);
      });
    }
  }

  private async analyzeBundles(result: BuildResult, context: CLIContext): Promise<void> {
    context.spinner.start('Analyzing bundles...');
    
    const analyzer = new BundleAnalyzer(result);
    const analysis = await analyzer.analyze();
    
    context.spinner.succeed('Bundle analysis complete!');
    
    // Show analysis results
    console.log('\nBundle Analysis:');
    console.log(`  Largest files:`);
    analysis.largestFiles.slice(0, 10).forEach(file => {
      console.log(`    ${file.name}: ${this.formatSize(file.size)} (${file.percentage}%)`);
    });
    
    if (analysis.duplicates.length > 0) {
      console.log('\n  Duplicate dependencies:');
      analysis.duplicates.forEach(dup => {
        console.log(`    ${dup.name}: ${dup.versions.join(', ')}`);
      });
    }
    
    // Generate detailed report
    const reportPath = path.join(context.projectRoot, 'bundle-report.html');
    await analyzer.generateReport(reportPath);
    
    console.log(`\nDetailed report: ${reportPath}`);
  }

  private formatSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }
}
```

### Advanced Commands

#### Theme Command (`forge theme`)
```typescript
export class ThemeCommand implements CLICommand {
  name = 'theme';
  description = 'Manage themes and design tokens';
  usage = 'forge theme <action> [options]';

  async execute(args: ParsedArgs, context: CLIContext): Promise<void> {
    const action = args.positional[0];
    
    switch (action) {
      case 'create':
        await this.createTheme(args, context);
        break;
      case 'build':
        await this.buildThemes(args, context);
        break;
      case 'validate':
        await this.validateThemes(args, context);
        break;
      case 'export':
        await this.exportTheme(args, context);
        break;
      case 'import':
        await this.importTheme(args, context);
        break;
      default:
        this.showThemeHelp();
    }
  }

  private async createTheme(args: ParsedArgs, context: CLIContext): Promise<void> {
    const themeName = args.positional[1];
    if (!themeName) {
      context.logger.error('Theme name is required');
      return;
    }

    const themeGenerator = new ThemeGenerator();
    await themeGenerator.generateInteractive(themeName, context);
  }

  private showThemeHelp(): void {
    console.log(`
Theme Management:
  create <name>     Create a new theme
  build            Build all themes
  validate         Validate theme files
  export <name>    Export theme to file
  import <file>    Import theme from file

Examples:
  forge theme create dark-theme
  forge theme build --watch
  forge theme export my-theme --format css
    `);
  }
}
```

## 🧪 Testing Strategy

```typescript
// cli.test.ts
describe('Forge CLI', () => {
  let cli: ForgeCLI;
  let mockContext: CLIContext;

  beforeEach(() => {
    cli = new ForgeCLI();
    mockContext = createMockContext();
  });

  describe('init command', () => {
    it('should create a new project', async () => {
      const args = ['init', 'test-project', '--template', 'basic'];
      
      await cli.run(args);
      
      expect(fs.existsSync('test-project/package.json')).to.be.true;
      expect(fs.existsSync('test-project/src/index.ts')).to.be.true;
    });

    it('should handle different templates', async () => {
      const args = ['init', 'react-project', '--template', 'react'];
      
      await cli.run(args);
      
      const packageJson = JSON.parse(fs.readFileSync('react-project/package.json', 'utf8'));
      expect(packageJson.dependencies).to.include.keys('react');
    });
  });

  describe('generate command', () => {
    it('should generate a component', async () => {
      const args = ['generate', 'component', 'TestButton'];
      
      await cli.run(args);
      
      expect(fs.existsSync('src/components/atoms/test-button/test-button.ts')).to.be.true;
      expect(fs.existsSync('src/components/atoms/test-button/test-button.test.ts')).to.be.true;
    });

    it('should generate with correct category', async () => {
      const args = ['generate', 'component', 'TestCard', '--category', 'molecule'];
      
      await cli.run(args);
      
      expect(fs.existsSync('src/components/molecules/test-card/test-card.ts')).to.be.true;
    });
  });

  describe('build command', () => {
    it('should build project successfully', async () => {
      const args = ['build', '--output', 'test-dist'];
      
      await cli.run(args);
      
      expect(fs.existsSync('test-dist/index.js')).to.be.true;
      expect(fs.existsSync('test-dist/style.css')).to.be.true;
    });

    it('should analyze bundle when requested', async () => {
      const args = ['build', '--analyze'];
      
      await cli.run(args);
      
      expect(fs.existsSync('bundle-report.html')).to.be.true;
    });
  });
});
```

## 📋 Completion Checklist

### Core Commands
- [ ] Project initialization with templates
- [ ] Component generation with scaffolding
- [ ] Development server with hot reload
- [ ] Production build with optimization
- [ ] Theme management and creation
- [ ] Bundle analysis and reporting

### Advanced Commands
- [ ] Version migration tools
- [ ] Automated testing integration
- [ ] Performance auditing
- [ ] Documentation generation
- [ ] Plugin management
- [ ] Deployment automation

### Developer Experience
- [ ] Interactive prompts and wizards
- [ ] Rich help system with examples
- [ ] Progress indicators and spinners
- [ ] Error handling and recovery
- [ ] Configuration file support
- [ ] Cross-platform compatibility

### Quality & Testing
- [ ] Comprehensive test suite (>90% coverage)
- [ ] Command integration testing
- [ ] Template validation
- [ ] Error scenario testing
- [ ] Performance testing
- [ ] Cross-platform testing

The Forge CLI transforms component development from manual processes into an automated, intelligent workflow that scales from individual developers to enterprise teams.