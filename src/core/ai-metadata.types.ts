/**
 * AI Metadata Types - ADR-014 & ADR-017
 *
 * Comprehensive type definitions for AI-ready component metadata
 * that enable intelligent interactions with AI systems and AI-native development.
 */

export interface AIMetadata {
  /** Primary purpose of the component */
  purpose: string;

  /** Contextual information about component usage */
  context?: string;

  /** Type of data the component handles */
  dataType?: AIDataType;

  /** Criticality level for business operations */
  criticality?: AICriticality;

  /** Semantic role in the UI hierarchy */
  semanticRole?: string;

  /** Supported interaction patterns */
  interactions?: AIInteractionPattern[];

  /** Data validation rules */
  validation?: AIValidationRule[];

  /** Related components or dependencies */
  relations?: AIRelation[];
}

export type AIDataType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'date'
  | 'time'
  | 'datetime'
  | 'email'
  | 'phone'
  | 'url'
  | 'password'
  | 'file'
  | 'image'
  | 'selection'
  | 'multiselection'
  | 'range'
  | 'color'
  | 'json'
  | 'custom';

export type AICriticality = 'low' | 'medium' | 'high' | 'critical';

export interface AIInteractionPattern {
  /** Type of interaction */
  type:
    | 'click'
    | 'input'
    | 'select'
    | 'drag'
    | 'hover'
    | 'focus'
    | 'keyboard'
    | 'voice'
    | 'gesture';

  /** Description of the interaction */
  description: string;

  /** Expected outcome */
  outcome?: string;

  /** Keyboard shortcuts */
  shortcuts?: string[];
}

export interface AIValidationRule {
  /** Rule type */
  type: 'required' | 'pattern' | 'min' | 'max' | 'minLength' | 'maxLength' | 'custom';

  /** Validation value or pattern */
  value?: string | number | boolean | RegExp;

  /** Error message for validation failure */
  message: string;

  /** Whether validation is async */
  async?: boolean;
}

export interface AIRelation {
  /** Type of relationship */
  type: 'parent' | 'child' | 'sibling' | 'controls' | 'controlledBy' | 'updates' | 'updatedBy';

  /** Target component selector or ID */
  target: string;

  /** Description of the relationship */
  description?: string;
}

export interface AIAction {
  /** Action identifier */
  name: string;

  /** Human-readable description */
  description: string;

  /** Whether action is currently available */
  available: boolean;

  /** Required parameters for the action */
  parameters?: AIActionParameter[];

  /** Expected result of the action */
  result?: string;

  /** Side effects of the action */
  sideEffects?: string[];
}

export interface AIActionParameter {
  /** Parameter name */
  name: string;

  /** Parameter type */
  type: AIDataType;

  /** Whether parameter is required */
  required: boolean;

  /** Default value */
  defaultValue?: unknown;

  /** Allowed values */
  enum?: unknown[];

  /** Parameter description */
  description?: string;
}

export interface AIStateExplanation {
  /** Current state identifier */
  currentState: string;

  /** All possible states */
  possibleStates: string[];

  /** Human-readable description of current state */
  stateDescription: string;

  /** Conditions for state transitions */
  transitions?: AIStateTransition[];

  /** Visual indicators of the state */
  visualIndicators?: string[];
}

export interface AIStateTransition {
  /** Source state */
  from: string;

  /** Target state */
  to: string;

  /** Trigger for transition */
  trigger: string;

  /** Conditions that must be met */
  conditions?: string[];
}

export interface AIComponentState {
  /** Component type/tag name */
  component: string;

  /** Semantic role */
  semanticRole?: string;

  /** Current context */
  context?: string;

  /** Accessibility description */
  description?: string | null;

  /** Component metadata */
  metadata: AIMetadata;

  /** Current state values */
  state: Record<string, unknown>;

  /** DOM attributes */
  attributes: Record<string, string | null>;

  /** Available actions */
  possibleActions: AIAction[];

  /** State explanation */
  stateExplanation: AIStateExplanation;

  /** Performance metrics */
  performance?: AIPerformanceMetrics;
}

export interface AIPerformanceMetrics {
  /** Render time in milliseconds */
  renderTime: number;

  /** Number of renders */
  renderCount: number;

  /** Memory usage in bytes */
  memoryUsage?: number;

  /** Event handling time */
  eventHandlingTime?: number;

  /** Performance violations */
  violations: number;

  /** Performance mode */
  mode: 'auto' | 'fast' | 'balanced' | 'quality';
}

export interface AISemanticRole {
  /** Primary role */
  role: string;

  /** ARIA role mapping */
  ariaRole?: string;

  /** Landmark type if applicable */
  landmark?: 'banner' | 'navigation' | 'main' | 'complementary' | 'contentinfo' | 'search' | 'form';

  /** Importance level */
  importance: 'primary' | 'secondary' | 'tertiary' | 'supplementary';
}

export interface AIContextProvider {
  /** Context identifier */
  id: string;

  /** Context type */
  type: 'form' | 'list' | 'navigation' | 'content' | 'dialog' | 'toolbar' | 'menu' | 'custom';

  /** Context data */
  data: Record<string, unknown>;

  /** Child components in context */
  children?: string[];
}

/**
 * AI-Native Development Types - ADR-017
 * Extended metadata for AI-assisted development
 */

export interface AIComponentMetadata extends AIMetadata {
  /** Component category for atomic design */
  category: 'atom' | 'molecule' | 'organism';

  /** Common usage patterns for this component */
  usagePatterns: string[];

  /** Anti-patterns to avoid */
  antiPatterns: string[];

  /** Contextual rules for proper usage */
  contextualRules: string[];

  /** AI prompts for code generation */
  aiPrompts: AIPromptSet;

  /** Framework-specific code examples */
  codeExamples: FrameworkExamples;

  /** Design system integration */
  designTokens: Record<string, unknown>;

  /** Performance guidance */
  performanceHints: string[];
  bundleImpact: 'minimal' | 'moderate' | 'significant';

  /** Accessibility guidelines */
  a11yGuidelines: string[];
  ariaPatterns: string[];
  keyboardInteractions: string[];

  /** Component composition patterns */
  compositionPatterns: Record<string, string>;
  childComponents: string[];
  parentComponents: string[];

  /** Testing guidance */
  testingPatterns: string[];
  commonTestCases: string[];
}

export interface AIPromptSet {
  /** Main code generation prompt */
  codeGeneration: string;

  /** Accessibility-focused prompt */
  accessibility: string;

  /** Performance optimization prompt */
  performance: string;

  /** Design system compliance prompt */
  designSystem: string;

  /** Additional context-specific prompts */
  contextual?: Record<string, string>;
}

export interface FrameworkExamples {
  /** React usage example */
  react: string;

  /** Vue usage example */
  vue: string;

  /** Angular usage example */
  angular: string;

  /** Vanilla JavaScript example */
  vanilla: string;

  /** Additional framework examples */
  [key: string]: string;
}

export interface AITrainingExample {
  /** Component tag name */
  component: string;

  /** Usage context */
  context: string;

  /** Good example code */
  goodExample: string;

  /** Bad example (if applicable) */
  badExample?: string;

  /** Explanation of why this is correct/incorrect */
  explanation: string;

  /** Framework this example applies to */
  framework?: string;

  /** Additional metadata */
  tags?: string[];
}

export interface AIComplianceResult {
  /** Overall compliance score (0-100) */
  score: number;

  /** Compliance status */
  status: 'compliant' | 'partial' | 'non-compliant';

  /** Issues found */
  issues: AIComplianceIssue[];

  /** Suggestions for improvement */
  suggestions: string[];

  /** Areas of compliance */
  strengths: string[];
}

export interface AIComplianceIssue {
  /** Issue category */
  category: 'accessibility' | 'performance' | 'semantics' | 'design-system' | 'best-practices';

  /** Issue severity */
  severity: 'error' | 'warning' | 'info';

  /** Issue description */
  description: string;

  /** How to fix the issue */
  fix: string;

  /** Code example of fix */
  example?: string;
}

export interface AITrainingDataset {
  /** Dataset version */
  version: string;

  /** Creation timestamp */
  created: Date;

  /** Component metadata and examples */
  components: AIComponentTrainingData[];

  /** Global patterns and rules */
  globalPatterns: AIGlobalPattern[];

  /** Framework-specific guidance */
  frameworkGuidance: Record<string, AIFrameworkGuidance>;
}

export interface AIComponentTrainingData {
  /** Component tag name */
  tagName: string;

  /** Component metadata */
  metadata: AIComponentMetadata;

  /** Training examples */
  examples: AITrainingExample[];

  /** Anti-examples (what not to do) */
  antiExamples: AITrainingExample[];

  /** Component relationships */
  relationships: AIComponentRelationship[];
}

export interface AIGlobalPattern {
  /** Pattern identifier */
  id: string;

  /** Pattern description */
  description: string;

  /** When this pattern applies */
  applicability: string[];

  /** Code template */
  template: string;

  /** Variables in the template */
  variables: Record<string, string>;
}

export interface AIFrameworkGuidance {
  /** Framework name */
  framework: string;

  /** Import patterns */
  importPatterns: string[];

  /** Event handling patterns */
  eventPatterns: Record<string, string>;

  /** State management patterns */
  statePatterns: string[];

  /** Common gotchas */
  gotchas: string[];
}

export interface AIComponentRelationship {
  /** Relationship type */
  type: 'contains' | 'uses' | 'extends' | 'implements' | 'conflicts-with';

  /** Target component */
  target: string;

  /** Relationship description */
  description: string;

  /** Usage example */
  example?: string;
}

/**
 * AI Integration helpers
 */
export class AIMetadataBuilder {
  private metadata: Partial<AIMetadata> = {};

  setPurpose(purpose: string): this {
    this.metadata.purpose = purpose;
    return this;
  }

  setContext(context: string): this {
    this.metadata.context = context;
    return this;
  }

  setDataType(dataType: AIDataType): this {
    this.metadata.dataType = dataType;
    return this;
  }

  setCriticality(criticality: AICriticality): this {
    this.metadata.criticality = criticality;
    return this;
  }

  setSemanticRole(role: string): this {
    this.metadata.semanticRole = role;
    return this;
  }

  addInteraction(interaction: AIInteractionPattern): this {
    if (!this.metadata.interactions) {
      this.metadata.interactions = [];
    }
    this.metadata.interactions.push(interaction);
    return this;
  }

  addValidation(rule: AIValidationRule): this {
    if (!this.metadata.validation) {
      this.metadata.validation = [];
    }
    this.metadata.validation.push(rule);
    return this;
  }

  addRelation(relation: AIRelation): this {
    if (!this.metadata.relations) {
      this.metadata.relations = [];
    }
    this.metadata.relations.push(relation);
    return this;
  }

  build(): AIMetadata {
    if (!this.metadata.purpose) {
      throw new Error('AIMetadata must have a purpose');
    }
    return this.metadata as AIMetadata;
  }
}

/**
 * Utility functions for AI metadata
 */
export const AIMetadataUtils = {
  /**
   * Merge multiple metadata objects with priority
   */
  merge(...metadataList: Partial<AIMetadata>[]): AIMetadata {
    const result: Partial<AIMetadata> = {};

    for (const metadata of metadataList) {
      Object.assign(result, metadata);

      // Merge arrays instead of replacing
      if (metadata.interactions && result.interactions) {
        result.interactions = [...result.interactions, ...metadata.interactions];
      }
      if (metadata.validation && result.validation) {
        result.validation = [...result.validation, ...metadata.validation];
      }
      if (metadata.relations && result.relations) {
        result.relations = [...result.relations, ...metadata.relations];
      }
    }

    return result as AIMetadata;
  },

  /**
   * Validate metadata completeness
   */
  validate(metadata: AIMetadata): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!metadata.purpose) {
      errors.push('Missing required field: purpose');
    }

    if (
      metadata.criticality &&
      !['low', 'medium', 'high', 'critical'].includes(metadata.criticality)
    ) {
      errors.push('Invalid criticality level');
    }

    if (metadata.validation) {
      for (const rule of metadata.validation) {
        if (!rule.type || !rule.message) {
          errors.push('Invalid validation rule');
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Generate AI-friendly description from metadata
   */
  describe(metadata: AIMetadata): string {
    const parts = [metadata.purpose];

    if (metadata.context) {
      parts.push(`in ${metadata.context} context`);
    }

    if (metadata.dataType) {
      parts.push(`handling ${metadata.dataType} data`);
    }

    if (metadata.criticality && metadata.criticality !== 'low') {
      parts.push(`with ${metadata.criticality} criticality`);
    }

    if (metadata.semanticRole) {
      parts.push(`serving as ${metadata.semanticRole}`);
    }

    return parts.join(' ');
  },

  /**
   * Generate training examples from AI component metadata
   */
  generateTrainingExamples(metadata: AIComponentMetadata): AITrainingExample[] {
    const examples: AITrainingExample[] = [];

    // Generate examples from usage patterns
    metadata.usagePatterns.forEach((pattern, index) => {
      const frameworks = ['react', 'vue', 'angular', 'vanilla'] as const;
      const framework = frameworks[index % frameworks.length];
      examples.push({
        component: metadata.purpose.toLowerCase().replace(/\s+/g, '-'),
        context: pattern,
        goodExample: metadata.codeExamples[framework] || metadata.codeExamples.vanilla,
        explanation: `Proper usage for ${pattern} context`,
        framework,
        tags: ['best-practice', metadata.category],
      });
    });

    // Generate anti-examples from anti-patterns
    metadata.antiPatterns.forEach((antiPattern) => {
      examples.push({
        component: metadata.purpose.toLowerCase().replace(/\s+/g, '-'),
        context: 'anti-pattern',
        goodExample: metadata.codeExamples.vanilla,
        badExample: `<!-- Avoid: ${antiPattern} -->`,
        explanation: `Avoid this pattern: ${antiPattern}`,
        tags: ['anti-pattern', metadata.category],
      });
    });

    return examples;
  },

  /**
   * Validate AI component compliance
   */
  validateCompliance(element: Element, metadata: AIComponentMetadata): AIComplianceResult {
    const issues: AIComplianceIssue[] = [];
    const strengths: string[] = [];
    const suggestions: string[] = [];

    // Check accessibility compliance
    if (metadata.a11yGuidelines.length > 0) {
      if (!element.getAttribute('role') && metadata.semanticRole) {
        issues.push({
          category: 'accessibility',
          severity: 'warning',
          description: 'Missing semantic role attribute',
          fix: `Add role="${metadata.semanticRole}" attribute`,
          example: `<${element.tagName.toLowerCase()} role="${metadata.semanticRole}">...</${element.tagName.toLowerCase()}>`,
        });
      } else if (element.getAttribute('role')) {
        strengths.push('Has proper semantic role');
      }

      // Check ARIA patterns
      metadata.ariaPatterns.forEach((pattern) => {
        if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
          suggestions.push(`Consider adding ${pattern} for better accessibility`);
        }
      });
    }

    // Check performance compliance
    if (metadata.performanceHints.length > 0) {
      metadata.performanceHints.forEach((hint) => {
        if (hint.includes('lazy load') && !element.hasAttribute('loading')) {
          suggestions.push('Consider adding lazy loading for performance');
        }
      });
    }

    // Calculate compliance score
    const totalChecks =
      metadata.a11yGuidelines.length +
      metadata.performanceHints.length +
      metadata.contextualRules.length;
    const passedChecks = totalChecks - issues.filter((i) => i.severity === 'error').length;
    const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;

    return {
      score,
      status: score >= 90 ? 'compliant' : score >= 70 ? 'partial' : 'non-compliant',
      issues,
      suggestions,
      strengths,
    };
  },

  /**
   * Export AI training dataset
   */
  exportTrainingDataset(components: Map<string, AIComponentMetadata>): AITrainingDataset {
    const componentData: AIComponentTrainingData[] = [];

    components.forEach((metadata, tagName) => {
      componentData.push({
        tagName,
        metadata,
        examples: this.generateTrainingExamples(metadata),
        antiExamples: [], // Could be expanded
        relationships: [], // Could be expanded
      });
    });

    return {
      version: '1.0.0',
      created: new Date(),
      components: componentData,
      globalPatterns: [],
      frameworkGuidance: {
        react: {
          framework: 'react',
          importPatterns: ['import { ComponentName } from "@nexcraft/forge/integrations/react"'],
          eventPatterns: {
            onClick: 'onClick={(e) => handleClick(e)}',
            onChange: 'onChange={(value) => handleChange(value)}',
          },
          statePatterns: ['controlled components', 'uncontrolled with refs'],
          gotchas: ['Remember to handle synthetic events', 'Use proper TypeScript types'],
        },
        vue: {
          framework: 'vue',
          importPatterns: ['import { ComponentName } from "@nexcraft/forge/integrations/vue"'],
          eventPatterns: {
            click: '@click="handleClick"',
            change: '@change="handleChange"',
          },
          statePatterns: ['v-model', 'reactive refs'],
          gotchas: ['Use kebab-case for component names in templates'],
        },
        angular: {
          framework: 'angular',
          importPatterns: ['import { NgxForgeModule } from "@nexcraft/forge/integrations/angular"'],
          eventPatterns: {
            click: '(click)="handleClick($event)"',
            change: '(change)="handleChange($event)"',
          },
          statePatterns: ['two-way binding', 'reactive forms'],
          gotchas: ['Import CUSTOM_ELEMENTS_SCHEMA for web components'],
        },
      },
    };
  },
};
