/**
 * AI Metadata Export System - ADR-017
 *
 * Comprehensive export system for generating AI training datasets
 * from component metadata for machine learning and AI tool integration.
 */

import type {
  AIComponentMetadata,
  AITrainingDataset,
  AIComponentTrainingData,
  AITrainingExample,
  AIGlobalPattern,
  AIFrameworkGuidance,
  AIComponentRelationship,
} from './ai-metadata.types';
import { AIMetadataValidator } from './ai-metadata-validator';

export class AIMetadataExporter {
  /**
   * Export complete training dataset from component registry
   */
  static exportTrainingDataset(
    components: Map<string, AIComponentMetadata>,
    options: ExportOptions = {},
  ): AITrainingDataset {
    const {
      includeAntiExamples = true,
      includeRelationships = true,
      includeGlobalPatterns = true,
      validateQuality = true,
      minQualityScore = 70,
    } = options;

    const componentData: AIComponentTrainingData[] = [];

    components.forEach((metadata, tagName) => {
      // Validate quality if required
      if (validateQuality) {
        const validation = AIMetadataValidator.validateComponentMetadata(metadata);
        if (validation.score < minQualityScore) {
          console.warn(`Skipping ${tagName} due to low quality score: ${validation.score}`);
          return;
        }
      }

      const trainingData = this.generateComponentTrainingData(tagName, metadata, {
        includeAntiExamples,
        includeRelationships,
      });

      componentData.push(trainingData);
    });

    return {
      version: this.generateVersion(),
      created: new Date(),
      components: componentData,
      globalPatterns: includeGlobalPatterns ? this.generateGlobalPatterns(components) : [],
      frameworkGuidance: this.generateFrameworkGuidance(),
    };
  }

  /**
   * Export dataset in specific format for AI tools
   */
  static exportForAITool(
    components: Map<string, AIComponentMetadata>,
    format: AIToolFormat,
    options: ExportOptions = {},
  ): string {
    const dataset = this.exportTrainingDataset(components, options);

    switch (format) {
      case 'github-copilot':
        return this.formatForGitHubCopilot(dataset);
      case 'cursor-ide':
        return this.formatForCursorIDE(dataset);
      case 'claude-artifacts':
        return this.formatForClaudeArtifacts(dataset);
      case 'openai-gpt':
        return this.formatForOpenAIGPT(dataset);
      case 'json-schema':
        return this.formatAsJSONSchema(dataset);
      default:
        return JSON.stringify(dataset, null, 2);
    }
  }

  /**
   * Export component-specific training data
   */
  static exportComponentTraining(
    tagName: string,
    metadata: AIComponentMetadata,
    format: 'json' | 'markdown' | 'yaml' = 'json',
  ): string {
    const trainingData = this.generateComponentTrainingData(tagName, metadata);

    switch (format) {
      case 'markdown':
        return this.formatComponentAsMarkdown(trainingData);
      case 'yaml':
        return this.formatComponentAsYAML(trainingData);
      default:
        return JSON.stringify(trainingData, null, 2);
    }
  }

  /**
   * Format component training data as markdown
   */
  private static formatComponentAsMarkdown(data: AIComponentTrainingData): string {
    return `# ${data.tagName} Training Data

## Purpose
${data.metadata.purpose}

## Usage Patterns
${data.metadata.usagePatterns.map((p) => `- ${p}`).join('\n')}

## Examples
${data.examples
  .map(
    (ex) => `
### ${ex.context}
\`\`\`${ex.framework || 'html'}
${ex.goodExample}
\`\`\`
${ex.explanation}
`,
  )
  .join('\n')}`;
  }

  /**
   * Format component training data as YAML
   */
  private static formatComponentAsYAML(data: AIComponentTrainingData): string {
    const yamlContent = {
      tagName: data.tagName,
      metadata: data.metadata,
      examples: data.examples,
      antiExamples: data.antiExamples,
      relationships: data.relationships,
    };

    // Simple YAML serialization (for basic cases)
    return JSON.stringify(yamlContent, null, 2).replace(/"/g, '').replace(/,$/gm, '');
  }

  /**
   * Generate AI prompt templates for code generation
   */
  static generateAIPrompts(components: Map<string, AIComponentMetadata>): AIPromptCollection {
    const prompts: AIPromptCollection = {
      system: this.generateSystemPrompt(),
      components: new Map(),
      patterns: this.generatePatternPrompts(components),
      frameworks: this.generateFrameworkPrompts(),
    };

    components.forEach((metadata, tagName) => {
      prompts.components.set(tagName, {
        generation: this.generateComponentPrompt(tagName, metadata),
        examples: this.generateExamplePrompts(metadata),
        validation: this.generateValidationPrompts(metadata),
      });
    });

    return prompts;
  }

  // Private methods for data generation

  private static generateComponentTrainingData(
    tagName: string,
    metadata: AIComponentMetadata,
    options: { includeAntiExamples?: boolean; includeRelationships?: boolean } = {},
  ): AIComponentTrainingData {
    const { includeAntiExamples = true, includeRelationships = true } = options;

    return {
      tagName,
      metadata,
      examples: this.generateTrainingExamples(tagName, metadata),
      antiExamples: includeAntiExamples ? this.generateAntiExamples(tagName, metadata) : [],
      relationships: includeRelationships ? this.generateRelationships(metadata) : [],
    };
  }

  private static generateTrainingExamples(
    tagName: string,
    metadata: AIComponentMetadata,
  ): AITrainingExample[] {
    const examples: AITrainingExample[] = [];

    // Generate examples from usage patterns
    metadata.usagePatterns.forEach((pattern, index) => {
      const frameworks = ['react', 'vue', 'angular', 'vanilla'] as const;
      const framework = frameworks[index % frameworks.length];

      examples.push({
        component: tagName,
        context: pattern,
        goodExample: metadata.codeExamples[framework] || metadata.codeExamples.vanilla,
        explanation: `Best practice implementation for ${pattern} use case`,
        framework,
        tags: ['best-practice', metadata.category, pattern.replace(/\s+/g, '-')],
      });
    });

    // Generate accessibility examples
    metadata.a11yGuidelines.forEach((guideline) => {
      examples.push({
        component: tagName,
        context: 'accessibility',
        goodExample: this.generateAccessibilityExample(tagName, guideline),
        explanation: `Implementation following ${guideline}`,
        tags: ['accessibility', 'wcag', metadata.category],
      });
    });

    // Generate performance examples
    metadata.performanceHints.forEach((hint) => {
      examples.push({
        component: tagName,
        context: 'performance',
        goodExample: this.generatePerformanceExample(tagName, hint),
        explanation: `Performance optimized implementation: ${hint}`,
        tags: ['performance', 'optimization', metadata.category],
      });
    });

    return examples;
  }

  private static generateAntiExamples(
    tagName: string,
    metadata: AIComponentMetadata,
  ): AITrainingExample[] {
    const antiExamples: AITrainingExample[] = [];

    metadata.antiPatterns.forEach((antiPattern) => {
      antiExamples.push({
        component: tagName,
        context: 'anti-pattern',
        badExample: this.generateBadExample(tagName, antiPattern),
        goodExample: metadata.codeExamples.vanilla,
        explanation: `Avoid this pattern: ${antiPattern}`,
        tags: ['anti-pattern', 'avoid', metadata.category],
      });
    });

    return antiExamples;
  }

  private static generateRelationships(metadata: AIComponentMetadata): AIComponentRelationship[] {
    const relationships: AIComponentRelationship[] = [];

    // Parent-child relationships
    metadata.parentComponents.forEach((parent) => {
      relationships.push({
        type: 'contains',
        target: parent,
        description: `Can be contained within ${parent}`,
        example: `<${parent}><${metadata.purpose.toLowerCase().replace(/\s+/g, '-')} /></${parent}>`,
      });
    });

    metadata.childComponents.forEach((child) => {
      relationships.push({
        type: 'uses',
        target: child,
        description: `Can contain ${child} as child component`,
        example: `<component><${child} /></component>`,
      });
    });

    return relationships;
  }

  private static generateGlobalPatterns(
    components: Map<string, AIComponentMetadata>,
  ): AIGlobalPattern[] {
    const patterns: AIGlobalPattern[] = [];

    // Form patterns
    const formComponents = Array.from(components.entries()).filter(([_, metadata]) =>
      metadata.usagePatterns.includes('form submission'),
    );

    if (formComponents.length > 0) {
      patterns.push({
        id: 'form-composition',
        description: 'Standard form composition pattern with validation',
        applicability: ['forms', 'data-entry', 'user-input'],
        template: `<form>
  <${formComponents[0][0]} type="text" required />
  <${formComponents.find(([_, m]) => m.semanticRole === 'button')?.[0] || 'forge-button'} type="submit">Submit</forge-button>
</form>`,
        variables: {
          inputComponent: 'Form input component',
          submitButton: 'Form submission button',
        },
      });
    }

    // Modal patterns
    const modalComponents = Array.from(components.entries()).filter(([_, metadata]) =>
      metadata.usagePatterns.includes('modal triggers'),
    );

    if (modalComponents.length > 0) {
      patterns.push({
        id: 'modal-trigger',
        description: 'Modal trigger and content pattern',
        applicability: ['modals', 'dialogs', 'overlays'],
        template: `<${modalComponents[0][0]} @click="openModal">Open Modal</forge-button>
<forge-modal :open="isOpen" @close="closeModal">
  <h2>Modal Title</h2>
  <p>Modal content...</p>
</forge-modal>`,
        variables: {
          triggerButton: 'Button that triggers modal',
          modalContent: 'Modal component content',
        },
      });
    }

    return patterns;
  }

  private static generateFrameworkGuidance(): Record<string, AIFrameworkGuidance> {
    return {
      react: {
        framework: 'react',
        importPatterns: [
          'import { ComponentName } from "@nexcraft/forge/integrations/react"',
          'import type { ComponentNameProps } from "@nexcraft/forge/integrations/react"',
        ],
        eventPatterns: {
          onClick: 'onClick={(event) => handleClick(event)}',
          onChange: 'onChange={(value) => handleChange(value)}',
          onInput: 'onInput={(event) => handleInput(event.target.value)}',
          onFocus: 'onFocus={() => handleFocus()}',
          onBlur: 'onBlur={() => handleBlur()}',
        },
        statePatterns: [
          'const [value, setValue] = useState(initialValue)',
          'const [loading, setLoading] = useState(false)',
          'const [error, setError] = useState<string | null>(null)',
        ],
        gotchas: [
          'Use React synthetic events, not native DOM events',
          'Remember to handle controlled vs uncontrolled components',
          'Use proper TypeScript types for event handlers',
          'Consider useCallback for event handlers to prevent re-renders',
        ],
      },
      vue: {
        framework: 'vue',
        importPatterns: [
          'import { ComponentName } from "@nexcraft/forge/integrations/vue"',
          'import type { ComponentNameProps } from "@nexcraft/forge"',
        ],
        eventPatterns: {
          click: '@click="handleClick"',
          change: '@change="handleChange"',
          input: '@input="handleInput"',
          focus: '@focus="handleFocus"',
          blur: '@blur="handleBlur"',
        },
        statePatterns: [
          'const value = ref(initialValue)',
          'const loading = ref(false)',
          'const error = ref<string | null>(null)',
          'const { value, loading } = reactive({ value: "", loading: false })',
        ],
        gotchas: [
          'Use kebab-case for component names in templates',
          'Remember to use v-model for two-way binding',
          'Use .value when accessing refs in script setup',
          'Consider using computed for derived state',
        ],
      },
      angular: {
        framework: 'angular',
        importPatterns: [
          'import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"',
          'import "@nexcraft/forge"',
        ],
        eventPatterns: {
          click: '(click)="handleClick($event)"',
          change: '(change)="handleChange($event)"',
          input: '(input)="handleInput($event)"',
          focus: '(focus)="handleFocus()"',
          blur: '(blur)="handleBlur()"',
        },
        statePatterns: [
          'public value = signal(initialValue)',
          'public loading = signal(false)',
          'public error = signal<string | null>(null)',
          'private fb = inject(FormBuilder)',
        ],
        gotchas: [
          'Import CUSTOM_ELEMENTS_SCHEMA in your module',
          'Use Angular signals for reactive state',
          'Consider using Angular Forms for complex form handling',
          'Web component events may need explicit type casting',
        ],
      },
    };
  }

  // Format-specific export methods

  private static formatForGitHubCopilot(dataset: AITrainingDataset): string {
    const copilotData = {
      name: '@nexcraft/forge',
      description: 'AI-native web component library training data',
      version: dataset.version,
      components: dataset.components.map((comp) => ({
        name: comp.tagName,
        description: comp.metadata.purpose,
        usage_patterns: comp.metadata.usagePatterns,
        examples: comp.examples.map((ex) => ({
          context: ex.context,
          code: ex.goodExample,
          framework: ex.framework,
        })),
      })),
    };

    return JSON.stringify(copilotData, null, 2);
  }

  private static formatForCursorIDE(dataset: AITrainingDataset): string {
    return `# Forge UI Components - AI Training Data

## Component Library
- **Name**: @nexcraft/forge
- **Version**: ${dataset.version}
- **Type**: Web Components with Framework Integrations

${dataset.components
  .map(
    (comp) => `
## ${comp.tagName}
**Purpose**: ${comp.metadata.purpose}
**Category**: ${comp.metadata.category}
**Semantic Role**: ${comp.metadata.semanticRole}

### Usage Patterns
${comp.metadata.usagePatterns.map((pattern) => `- ${pattern}`).join('\n')}

### Anti-Patterns (Avoid)
${comp.metadata.antiPatterns.map((pattern) => `- ${pattern}`).join('\n')}

### Code Examples
${Object.entries(comp.metadata.codeExamples)
  .map(
    ([framework, code]) => `
#### ${framework.toUpperCase()}
\`\`\`${framework === 'vanilla' ? 'html' : framework}
${code}
\`\`\`
`,
  )
  .join('')}
`,
  )
  .join('\n')}`;
  }

  private static formatForClaudeArtifacts(dataset: AITrainingDataset): string {
    const claudeData = {
      library: {
        name: '@nexcraft/forge',
        description: 'AI-native web component library',
        version: dataset.version,
        ai_optimized: true,
      },
      components: dataset.components.reduce(
        (acc, comp) => {
          acc[comp.tagName] = {
            metadata: comp.metadata,
            ai_prompts: comp.metadata.aiPrompts,
            examples: comp.examples,
            best_practices: comp.metadata.contextualRules,
          };
          return acc;
        },
        {} as Record<string, unknown>,
      ),
      global_guidance: dataset.frameworkGuidance,
    };

    return JSON.stringify(claudeData, null, 2);
  }

  private static formatForOpenAIGPT(dataset: AITrainingDataset): string {
    const gptData = {
      fine_tuning_data: dataset.components.flatMap((comp) =>
        comp.examples.map((example) => ({
          messages: [
            {
              role: 'system',
              content: `You are an expert web developer using @nexcraft/forge component library. Generate clean, accessible, and performant code.`,
            },
            {
              role: 'user',
              content: `Create a ${comp.tagName} component for ${example.context}`,
            },
            {
              role: 'assistant',
              content: example.goodExample,
            },
          ],
        })),
      ),
    };

    return JSON.stringify(gptData, null, 2);
  }

  private static formatAsJSONSchema(_dataset: AITrainingDataset): string {
    const schema = {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: 'Forge UI Components Training Dataset',
      type: 'object',
      properties: {
        version: { type: 'string' },
        created: { type: 'string', format: 'date-time' },
        components: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              tagName: { type: 'string' },
              metadata: { $ref: '#/definitions/AIComponentMetadata' },
              examples: {
                type: 'array',
                items: { $ref: '#/definitions/AITrainingExample' },
              },
            },
          },
        },
      },
      definitions: {
        AIComponentMetadata: {
          type: 'object',
          required: ['purpose', 'semanticRole', 'category'],
          properties: {
            purpose: { type: 'string' },
            semanticRole: { type: 'string' },
            category: { enum: ['atom', 'molecule', 'organism'] },
          },
        },
        AITrainingExample: {
          type: 'object',
          required: ['component', 'context', 'goodExample'],
          properties: {
            component: { type: 'string' },
            context: { type: 'string' },
            goodExample: { type: 'string' },
            explanation: { type: 'string' },
          },
        },
      },
    };

    return JSON.stringify(schema, null, 2);
  }

  // Helper methods

  private static generateVersion(): string {
    const now = new Date();
    return `1.0.${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
  }

  private static generateSystemPrompt(): string {
    return `You are an AI assistant specialized in using the @nexcraft/forge component library. 
This library provides AI-native web components with comprehensive metadata for intelligent code generation.

Key principles:
1. Always use semantic HTML and proper ARIA attributes
2. Follow WCAG 2.1 AA accessibility guidelines
3. Implement performance best practices
4. Use design tokens for consistent styling
5. Provide proper TypeScript types
6. Follow framework-specific patterns for React, Vue, and Angular

When generating code, consider the component's:
- Usage patterns and contexts
- Accessibility requirements
- Performance implications
- Design system integration
- Framework-specific best practices`;
  }

  private static generateComponentPrompt(tagName: string, metadata: AIComponentMetadata): string {
    return `Generate ${tagName} component code following these guidelines:

Purpose: ${metadata.purpose}
Semantic Role: ${metadata.semanticRole}
Category: ${metadata.category}

Usage Patterns:
${metadata.usagePatterns.map((p) => `- ${p}`).join('\n')}

Avoid These Anti-Patterns:
${metadata.antiPatterns.map((p) => `- ${p}`).join('\n')}

Accessibility Requirements:
${metadata.a11yGuidelines.map((g) => `- ${g}`).join('\n')}

Performance Considerations:
${metadata.performanceHints.map((h) => `- ${h}`).join('\n')}

Always include proper ARIA attributes, keyboard navigation support, and follow the design system tokens.`;
  }

  private static generateExamplePrompts(metadata: AIComponentMetadata): Record<string, string> {
    const prompts: Record<string, string> = {};

    Object.entries(metadata.codeExamples).forEach(([framework, example]) => {
      prompts[framework] = `Here's a ${framework} example of proper usage:\n\n${example}`;
    });

    return prompts;
  }

  private static generateValidationPrompts(metadata: AIComponentMetadata): string[] {
    return [
      `Ensure the component has proper semantic role: ${metadata.semanticRole}`,
      'Verify WCAG 2.1 AA accessibility compliance',
      'Check that all interactive elements are keyboard accessible',
      'Validate proper ARIA attributes are included',
      'Confirm performance optimizations are implemented',
    ];
  }

  private static generatePatternPrompts(
    components: Map<string, AIComponentMetadata>,
  ): Record<string, string> {
    const patterns: Record<string, string> = {};

    patterns.form = `When creating forms, use these component combinations:
${Array.from(components.entries())
  .filter(([_, metadata]) => metadata.usagePatterns.includes('form submission'))
  .map(([tagName]) => `- ${tagName}`)
  .join('\n')}`;

    patterns.navigation = `For navigation interfaces, consider:
${Array.from(components.entries())
  .filter(([_, metadata]) => metadata.usagePatterns.includes('navigation actions'))
  .map(([tagName]) => `- ${tagName}`)
  .join('\n')}`;

    return patterns;
  }

  private static generateFrameworkPrompts(): Record<string, string> {
    return {
      react:
        'For React integration, import from "@nexcraft/forge/integrations/react" and use standard React patterns for props and events.',
      vue: 'For Vue integration, use kebab-case component names and Vue event syntax with @ symbols.',
      angular:
        'For Angular integration, import CUSTOM_ELEMENTS_SCHEMA and use Angular event binding syntax.',
    };
  }

  private static generateAccessibilityExample(tagName: string, guideline: string): string {
    return `<${tagName} 
  role="button" 
  aria-label="Descriptive label"
  tabindex="0"
  @keydown="handleKeydown"
>
  <!-- Implementation following: ${guideline} -->
</${tagName}>`;
  }

  private static generatePerformanceExample(tagName: string, hint: string): string {
    return `<!-- Performance optimized ${tagName} -->
<!-- ${hint} -->
<${tagName} 
  loading="lazy"
  @click="debouncedHandler"
>
  Content
</${tagName}>`;
  }

  private static generateBadExample(tagName: string, antiPattern: string): string {
    return `<!-- BAD: ${antiPattern} -->
<${tagName} class="incorrect-usage">
  <!-- This example violates the anti-pattern -->
</${tagName}>`;
  }
}

// Type definitions for export system

export interface ExportOptions {
  includeAntiExamples?: boolean;
  includeRelationships?: boolean;
  includeGlobalPatterns?: boolean;
  validateQuality?: boolean;
  minQualityScore?: number;
}

export type AIToolFormat =
  | 'github-copilot'
  | 'cursor-ide'
  | 'claude-artifacts'
  | 'openai-gpt'
  | 'json-schema'
  | 'standard';

export interface AIPromptCollection {
  system: string;
  components: Map<string, ComponentPrompts>;
  patterns: Record<string, string>;
  frameworks: Record<string, string>;
}

export interface ComponentPrompts {
  generation: string;
  examples: Record<string, string>;
  validation: string[];
}
