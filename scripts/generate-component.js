#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Template for interface file
const interfaceTemplate = (name, className) => `/**
 * Type definitions for ${className} component
 */

import type { ForgeComponentBase } from '../../../types';

/**
 * ${className} component properties
 */
export interface ${className}Props extends ForgeComponentBase {
  /** Label for the component */
  label?: string;
  /** Size variant of the component */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant of the component */
  variant?: 'primary' | 'secondary' | 'neutral';
}

/**
 * ${className} event detail
 */
export interface ${className}EventDetail {
  value: any;
}

/**
 * ${className} events
 */
export interface ${className}Events {
  'forge-change': CustomEvent<${className}EventDetail>;
}
`;

// Template for component file
const componentTemplate = (name, className) => `import { html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../core/BaseElement';
import type { ${className}Props, ${className}EventDetail } from './${name}.types';

@customElement('forge-${name}')
export class ${className} extends BaseElement implements ${className}Props {
  static styles = css\`
    :host {
      display: block;
      font-family: var(--forge-font-family);
    }

    .${name} {
      padding: var(--forge-spacing-md);
      border: var(--forge-border-width-thin) solid var(--forge-color-neutral-300);
      border-radius: var(--forge-border-radius-md);
      background-color: var(--forge-color-neutral-50);
      transition: all var(--forge-transition-fast);
    }

    .${name}:hover {
      border-color: var(--forge-color-primary-500);
      box-shadow: var(--forge-shadow-sm);
    }

    .${name}--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  \`;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  label = '';

  render() {
    return html\`
      <div class="${name} \${this.disabled ? '${name}--disabled' : ''}">
        <slot></slot>
      </div>
    \`;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    // Component initialization
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-${name}': ${className};
  }
}
`;

// Template for test file
const testTemplate = (name, className) => `import { fixture, expect, html } from '@open-wc/testing';
import './${name}';
import type { ${className} } from './${name}';

describe('${className}', () => {
  describe('Basic Rendering', () => {
    it('should render with default slot content', async () => {
      const el = await fixture<${className}>(html\`
        <forge-${name}>Content</forge-${name}>
      \`);
      
      expect(el).to.exist;
      expect(el.textContent).to.include('Content');
    });

    it('should have default properties', async () => {
      const el = await fixture<${className}>(html\`
        <forge-${name}></forge-${name}>
      \`);
      
      expect(el.disabled).to.be.false;
      expect(el.label).to.equal('');
    });
  });

  describe('Disabled State', () => {
    it('should handle disabled attribute', async () => {
      const el = await fixture<${className}>(html\`
        <forge-${name} disabled></forge-${name}>
      \`);
      
      expect(el.disabled).to.be.true;
      expect(el.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('Styling', () => {
    it('should apply correct CSS classes', async () => {
      const el = await fixture<${className}>(html\`
        <forge-${name}></forge-${name}>
      \`);
      
      const container = el.shadowRoot?.querySelector('.${name}');
      expect(container).to.exist;
    });

    it('should apply disabled class when disabled', async () => {
      const el = await fixture<${className}>(html\`
        <forge-${name} disabled></forge-${name}>
      \`);
      
      const container = el.shadowRoot?.querySelector('.${name}');
      expect(container?.classList.contains('${name}--disabled')).to.be.true;
    });
  });
});
`;

// Template for index file
const indexTemplate = (className) => `export { ${className} } from './${name}';
`;

// Template for story file (if Storybook is installed)
const storyTemplate = (name, className) => `import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './${name}';
import type { ${className} } from './${name}';

const meta: Meta<${className}> = {
  title: 'Components/${className}',
  component: 'forge-${name}',
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the component',
      defaultValue: false,
    },
    label: {
      control: 'text',
      description: 'Label for the component',
      defaultValue: '',
    },
  },
};

export default meta;
type Story = StoryObj<${className}>;

export const Default: Story = {
  args: {
    disabled: false,
    label: 'Default Label',
  },
  render: (args) => html\`
    <forge-${name} 
      ?disabled=\${args.disabled}
      label=\${args.label}
    >
      Component Content
    </forge-${name}>
  \`,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Component',
  },
  render: (args) => html\`
    <forge-${name} 
      ?disabled=\${args.disabled}
      label=\${args.label}
    >
      This component is disabled
    </forge-${name}>
  \`,
};
`;

async function main() {
  console.log('🚀 Forge Component Generator\n');
  
  const name = await question('Component name (lowercase, e.g., "card"): ');
  const type = await question('Component type (atom/molecule/organism) [atom]: ') || 'atom';
  
  // Convert name to different cases
  const kebabCase = name.toLowerCase().replace(/\s+/g, '-');
  const pascalCase = kebabCase
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  const className = `Forge${pascalCase}`;
  
  // Determine component path
  const componentPath = path.join(
    __dirname,
    '..',
    'src',
    'components',
    `${type}s`,
    kebabCase
  );
  
  // Create component directory
  if (!fs.existsSync(componentPath)) {
    fs.mkdirSync(componentPath, { recursive: true });
    console.log(`✅ Created directory: ${componentPath}`);
  } else {
    console.log(`⚠️  Directory already exists: ${componentPath}`);
    const overwrite = await question('Overwrite existing files? (y/n): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Aborted.');
      process.exit(0);
    }
  }
  
  // Write types file
  const typesFile = path.join(componentPath, `${kebabCase}.types.ts`);
  fs.writeFileSync(typesFile, interfaceTemplate(kebabCase, className));
  console.log(`✅ Created types: ${typesFile}`);
  
  // Write component file
  const componentFile = path.join(componentPath, `${kebabCase}.ts`);
  fs.writeFileSync(componentFile, componentTemplate(kebabCase, className));
  console.log(`✅ Created component: ${componentFile}`);
  
  // Write test file
  const testFile = path.join(componentPath, `${kebabCase}.test.ts`);
  fs.writeFileSync(testFile, testTemplate(kebabCase, className));
  console.log(`✅ Created test: ${testFile}`);
  
  // Write index file
  const indexFile = path.join(componentPath, 'index.ts');
  fs.writeFileSync(indexFile, indexTemplate(className).replace('${name}', kebabCase));
  console.log(`✅ Created index: ${indexFile}`);
  
  // Check if Storybook is installed
  const hasStorybook = fs.existsSync(path.join(__dirname, '..', '.storybook'));
  if (hasStorybook) {
    const storyFile = path.join(componentPath, `${kebabCase}.stories.ts`);
    fs.writeFileSync(storyFile, storyTemplate(kebabCase, className));
    console.log(`✅ Created story: ${storyFile}`);
  }
  
  // Update main index.ts
  const mainIndexPath = path.join(__dirname, '..', 'src', 'index.ts');
  if (fs.existsSync(mainIndexPath)) {
    const mainIndex = fs.readFileSync(mainIndexPath, 'utf-8');
    const exportLine = `export { ${className} } from './components/${type}s/${kebabCase}';`;
    
    if (!mainIndex.includes(exportLine)) {
      fs.appendFileSync(mainIndexPath, `\n${exportLine}`);
      console.log(`✅ Updated main index.ts`);
    }
  }
  
  console.log(`
✨ Component "${className}" generated successfully!

Next steps:
1. Review the generated files in ${componentPath}
2. Customize the component implementation
3. Run tests: npm test src/components/${type}s/${kebabCase}/${kebabCase}.test.ts
4. Add to demo page if needed

Remember:
- Use CSS Custom Properties (tokens) for all styling
- Follow the established patterns from Button component
- Add proper TypeScript types
- Write comprehensive tests
`);
  
  rl.close();
}

main().catch(console.error);