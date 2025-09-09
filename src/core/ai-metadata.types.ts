/**
 * AI Metadata Types - ADR-014
 * 
 * Comprehensive type definitions for AI-ready component metadata
 * that enable intelligent interactions with AI systems.
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
  type: 'click' | 'input' | 'select' | 'drag' | 'hover' | 'focus' | 'keyboard' | 'voice' | 'gesture';
  
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
  defaultValue?: any;
  
  /** Allowed values */
  enum?: any[];
  
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
  state: Record<string, any>;
  
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
  data: Record<string, any>;
  
  /** Child components in context */
  children?: string[];
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
    const result: any = {};
    
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
    
    return result;
  },

  /**
   * Validate metadata completeness
   */
  validate(metadata: AIMetadata): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!metadata.purpose) {
      errors.push('Missing required field: purpose');
    }
    
    if (metadata.criticality && !['low', 'medium', 'high', 'critical'].includes(metadata.criticality)) {
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
      errors
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
  }
};