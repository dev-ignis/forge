import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { BaseElement } from './BaseElement';
import { AIMetadataUtils, AIMetadataBuilder } from './ai-metadata.types';
import type { AIMetadata, AIComponentState } from './ai-metadata.types';
import '../components/atoms/button/button';
import '../components/atoms/input/input';

// Test component for AI metadata validation
class TestAIComponent extends BaseElement {
  protected aiMetadata: AIMetadata = {
    purpose: 'Test component for AI validation',
    context: 'testing',
    dataType: 'text',
    criticality: 'low',
    semanticRole: 'test'
  };

  connectedCallback() {
    super.connectedCallback();
    this.updateComponentState('testValue', 'initial');
  }

  getPossibleActions() {
    return [
      { name: 'test', description: 'Test action', available: true }
    ];
  }

  explainState() {
    return {
      currentState: 'test',
      possibleStates: ['test', 'active'],
      stateDescription: 'Component in test state'
    };
  }
}

customElements.define('test-ai-component', TestAIComponent);

describe('AI Metadata System', () => {
  describe('AIMetadataBuilder', () => {
    it('should build valid metadata', () => {
      const metadata = new AIMetadataBuilder()
        .setPurpose('User input')
        .setContext('form')
        .setDataType('text')
        .setCriticality('medium')
        .setSemanticRole('textbox')
        .build();

      expect(metadata.purpose).toBe('User input');
      expect(metadata.context).toBe('form');
      expect(metadata.dataType).toBe('text');
      expect(metadata.criticality).toBe('medium');
      expect(metadata.semanticRole).toBe('textbox');
    });

    it('should throw error when purpose is missing', () => {
      const builder = new AIMetadataBuilder()
        .setContext('form')
        .setDataType('text');

      expect(() => builder.build()).toThrow('AIMetadata must have a purpose');
    });

    it('should add interactions correctly', () => {
      const metadata = new AIMetadataBuilder()
        .setPurpose('Interactive element')
        .addInteraction({
          type: 'click',
          description: 'Click to activate',
          outcome: 'Opens dialog'
        })
        .addInteraction({
          type: 'keyboard',
          description: 'Keyboard navigation',
          shortcuts: ['Enter', 'Space']
        })
        .build();

      expect(metadata.interactions).toHaveLength(2);
      expect(metadata.interactions![0].type).toBe('click');
      expect(metadata.interactions![1].shortcuts).toEqual(['Enter', 'Space']);
    });

    it('should add validation rules', () => {
      const metadata = new AIMetadataBuilder()
        .setPurpose('Email input')
        .addValidation({
          type: 'required',
          message: 'Email is required'
        })
        .addValidation({
          type: 'pattern',
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Invalid email format'
        })
        .build();

      expect(metadata.validation).toHaveLength(2);
      expect(metadata.validation![0].type).toBe('required');
      expect(metadata.validation![1].type).toBe('pattern');
    });
  });

  describe('BaseElement AI Methods', () => {
    let element: TestAIComponent;

    beforeEach(async () => {
      element = await fixture<TestAIComponent>(html`
        <test-ai-component 
          semantic-role="test-role"
          ai-context="test-context"
          performance-mode="auto"
        ></test-ai-component>
      `);
    });

    describe('getSemanticAttributes', () => {
      it('should return semantic attributes for AI', () => {
        const attrs = element['getSemanticAttributes']();
        
        expect(attrs['data-semantic-role']).to.equal('test-role');
        expect(attrs['data-ai-context']).to.equal('test-context');
        expect(attrs['data-type']).to.equal('text');
      });

      it('should exclude low criticality', () => {
        element['aiMetadata'].criticality = 'low';
        const attrs = element['getSemanticAttributes']();
        
        expect(attrs['data-criticality']).to.be.undefined;
      });

      it('should include high criticality', () => {
        element['aiMetadata'].criticality = 'high';
        const attrs = element['getSemanticAttributes']();
        
        expect(attrs['data-criticality']).to.equal('high');
      });

      it('should handle missing optional fields', () => {
        element.semanticRole = '';
        element.aiContext = '';
        element['aiMetadata'].dataType = undefined;
        
        const attrs = element['getSemanticAttributes']();
        
        expect(Object.keys(attrs).length).to.equal(0);
      });
    });

    describe('Performance Mode Adjustments', () => {
      it('should apply fast mode performance settings', async () => {
        element.performanceMode = 'fast';
        await element.updateComplete;
        
        expect(element.performanceMode).to.equal('fast');
      });

      it('should apply balanced mode performance settings', async () => {
        element.performanceMode = 'balanced';
        await element.updateComplete;
        
        expect(element.performanceMode).to.equal('balanced');
      });

      it('should apply quality mode performance settings', async () => {
        element.performanceMode = 'quality';
        await element.updateComplete;
        
        expect(element.performanceMode).to.equal('quality');
      });

      it('should handle auto mode with violations', async () => {
        element.performanceMode = 'auto';
        element.maxRenderMs = 0.001;
        element.warnOnViolation = false;
        
        // Trigger a render
        element.requestUpdate();
        await element.updateComplete;
        
        // Auto mode should track violations
        expect(element.performanceMode).to.equal('auto');
      });
    });

    describe('AI State Change Events', () => {
      it('should emit ai-state-change event on state update', async () => {
        let eventDetail: any = null;
        
        element.addEventListener('ai-state-change', (e: Event) => {
          eventDetail = (e as CustomEvent).detail;
        });
        
        element['updateComponentState']('newKey', 'newValue');
        
        expect(eventDetail).to.not.be.null;
        expect(eventDetail.key).to.equal('newKey');
        expect(eventDetail.value).to.equal('newValue');
        expect(eventDetail.fullState).to.exist;
      });

      it('should include full AI state in event', async () => {
        let eventDetail: any = null;
        
        element.addEventListener('ai-state-change', (e: Event) => {
          eventDetail = (e as CustomEvent).detail;
        });
        
        element['updateComponentState']('status', 'active');
        
        expect(eventDetail.fullState.component).to.equal('test-ai-component');
        expect(eventDetail.fullState.metadata).to.exist;
        expect(eventDetail.fullState.possibleActions).to.be.an('array');
        expect(eventDetail.fullState.stateExplanation).to.exist;
      });

      it('should update multiple states and emit events', async () => {
        const events: any[] = [];
        
        element.addEventListener('ai-state-change', (e: Event) => {
          events.push((e as CustomEvent).detail);
        });
        
        element['updateComponentState']('field1', 'value1');
        element['updateComponentState']('field2', 'value2');
        element['updateComponentState']('field3', 'value3');
        
        expect(events).to.have.length(3);
        expect(events[0].key).to.equal('field1');
        expect(events[1].key).to.equal('field2');
        expect(events[2].key).to.equal('field3');
      });
    });

    describe('aiState Getter', () => {
      it('should aggregate all AI-related information', () => {
        const aiState = element.aiState;
        
        expect(aiState.component).to.equal('test-ai-component');
        expect(aiState.semanticRole).to.equal('test-role');
        expect(aiState.context).to.equal('test-context');
        expect(aiState.metadata).to.deep.equal(element['aiMetadata']);
        expect(aiState.state).to.exist;
        expect(aiState.attributes).to.exist;
        expect(aiState.possibleActions).to.be.an('array');
        expect(aiState.stateExplanation).to.exist;
        expect(aiState.performance).to.exist;
      });

      it('should include performance metrics', () => {
        const aiState = element.aiState;
        
        expect(aiState.performance?.renderTime).to.be.a('number');
        expect(aiState.performance?.renderCount).to.be.a('number');
        expect(aiState.performance?.violations).to.equal(0);
        expect(aiState.performance?.mode).to.equal('auto');
      });

      it('should reflect component state updates', () => {
        element['updateComponentState']('customField', 'customValue');
        
        const aiState = element.aiState;
        
        expect(aiState.state.customField).to.equal('customValue');
        expect(aiState.state.testValue).to.equal('initial');
      });
    });
  });

  describe('AIMetadataUtils', () => {
    it('should merge metadata objects correctly', () => {
      const base: Partial<AIMetadata> = {
        purpose: 'Base component',
        criticality: 'low'
      };

      const override: Partial<AIMetadata> = {
        context: 'form',
        criticality: 'high',
        dataType: 'email'
      };

      const merged = AIMetadataUtils.merge(base, override);

      expect(merged.purpose).toBe('Base component');
      expect(merged.context).toBe('form');
      expect(merged.criticality).toBe('high'); // Override value
      expect(merged.dataType).toBe('email');
    });

    it('should validate metadata completeness', () => {
      const validMetadata: AIMetadata = {
        purpose: 'Test component',
        criticality: 'medium'
      };

      const invalidMetadata: AIMetadata = {
        purpose: '',
        criticality: 'invalid' as any
      };

      const validResult = AIMetadataUtils.validate(validMetadata);
      expect(validResult.valid).toBe(true);
      expect(validResult.errors).toHaveLength(0);

      const invalidResult = AIMetadataUtils.validate(invalidMetadata);
      expect(invalidResult.valid).toBe(false);
      expect(invalidResult.errors).toContain('Missing required field: purpose');
      expect(invalidResult.errors).toContain('Invalid criticality level');
    });

    it('should merge with empty metadata', () => {
      const base: Partial<AIMetadata> = {
        purpose: 'Base component'
      };
      
      const empty: Partial<AIMetadata> = {};
      
      const merged = AIMetadataUtils.merge(base, empty);
      
      expect(merged.purpose).to.equal('Base component');
    });

    it('should merge with null/undefined fields', () => {
      const base: Partial<AIMetadata> = {
        purpose: 'Base component',
        context: 'form'
      };
      
      const override: Partial<AIMetadata> = {
        context: undefined,
        dataType: 'text'
      };
      
      const merged = AIMetadataUtils.merge(base, override);
      
      expect(merged.purpose).to.equal('Base component');
      expect(merged.context).to.be.undefined;
      expect(merged.dataType).to.equal('text');
    });

    it('should merge arrays correctly', () => {
      const base: Partial<AIMetadata> = {
        purpose: 'Base',
        interactions: [
          { type: 'click', description: 'Click action', outcome: 'Opens menu' }
        ],
        validation: [
          { type: 'required', message: 'Required field' }
        ]
      };
      
      const additional: Partial<AIMetadata> = {
        interactions: [
          { type: 'keyboard', description: 'Keyboard nav', shortcuts: ['Enter'] }
        ],
        validation: [
          { type: 'minLength', value: 5, message: 'Min 5 chars' }
        ]
      };
      
      const merged = AIMetadataUtils.merge(base, additional);
      
      expect(merged.interactions).to.have.length(2);
      expect(merged.validation).to.have.length(2);
    });

    it('should handle validation edge cases', () => {
      // Empty purpose
      const invalidMetadata1: AIMetadata = {
        purpose: '',
        criticality: 'medium'
      };
      
      const result1 = AIMetadataUtils.validate(invalidMetadata1);
      expect(result1.valid).to.be.false;
      expect(result1.errors).to.include('Missing required field: purpose');
      
      // Invalid validation rule
      const invalidMetadata2: AIMetadata = {
        purpose: 'Test',
        validation: [
          { type: '', message: '' } as any
        ]
      };
      
      const result2 = AIMetadataUtils.validate(invalidMetadata2);
      expect(result2.valid).to.be.false;
      expect(result2.errors).to.include('Invalid validation rule');
      
      // Multiple validation rules with one invalid
      const invalidMetadata3: AIMetadata = {
        purpose: 'Test',
        validation: [
          { type: 'required', message: 'Required' },
          { type: 'pattern', value: /test/, message: '' } as any
        ]
      };
      
      const result3 = AIMetadataUtils.validate(invalidMetadata3);
      expect(result3.valid).to.be.false;
      expect(result3.errors).to.include('Invalid validation rule');
    });

    it('should describe with minimal metadata', () => {
      const minimal: AIMetadata = {
        purpose: 'Simple component'
      };
      
      const description = AIMetadataUtils.describe(minimal);
      expect(description).to.equal('Simple component');
    });

    it('should describe with empty optional fields', () => {
      const metadata: AIMetadata = {
        purpose: 'Component',
        context: '',
        dataType: undefined,
        criticality: 'low',
        semanticRole: ''
      };
      
      const description = AIMetadataUtils.describe(metadata);
      expect(description).to.equal('Component');
      expect(description).to.not.include('context');
      expect(description).to.not.include('data');
      expect(description).to.not.include('criticality');
      expect(description).to.not.include('serving');
    });

    it('should generate AI-friendly descriptions', () => {
      const metadata: AIMetadata = {
        purpose: 'User authentication',
        context: 'login form',
        dataType: 'password',
        criticality: 'critical',
        semanticRole: 'password input'
      };

      const description = AIMetadataUtils.describe(metadata);
      expect(description).toContain('User authentication');
      expect(description).toContain('login form context');
      expect(description).toContain('password data');
      expect(description).toContain('critical criticality');
      expect(description).toContain('password input');
    });
  });

  describe('BaseElement AI Integration', () => {
    let element: TestAIComponent;

    beforeEach(async () => {
      element = await fixture<TestAIComponent>(html`
        <test-ai-component 
          semantic-role="test-role"
          ai-context="test-context"
        ></test-ai-component>
      `);
    });

    it('should expose AI state', () => {
      const aiState = element.aiState;

      expect(aiState.component).toBe('test-ai-component');
      expect(aiState.semanticRole).toBe('test-role');
      expect(aiState.context).toBe('test-context');
      expect(aiState.metadata.purpose).toBe('Test component for AI validation');
      expect(aiState.state.testValue).toBe('initial');
    });

    it('should track component state changes', async () => {
      let stateChangeEvent: CustomEvent | null = null;
      
      element.addEventListener('ai-state-change', (e: Event) => {
        stateChangeEvent = e as CustomEvent;
      });

      element['updateComponentState']('testValue', 'updated');

      expect(stateChangeEvent).not.toBeNull();
      expect(stateChangeEvent!.detail.key).toBe('testValue');
      expect(stateChangeEvent!.detail.value).toBe('updated');
      expect(stateChangeEvent!.detail.fullState).toBeDefined();
    });

    it('should provide possible actions', () => {
      const actions = element.getPossibleActions();

      expect(actions).toHaveLength(1);
      expect(actions[0].name).toBe('test');
      expect(actions[0].available).toBe(true);
    });

    it('should explain component state', () => {
      const explanation = element.explainState();

      expect(explanation.currentState).toBe('test');
      expect(explanation.possibleStates).toContain('test');
      expect(explanation.possibleStates).toContain('active');
      expect(explanation.stateDescription).toBe('Component in test state');
    });

    it('should generate AI description', () => {
      const description = element.getAIDescription();

      expect(description).toContain('test-ai-component');
      expect(description).toContain('AI validation');
      expect(description).toContain('test-role');
      expect(description).toContain('test-context');
    });

    it('should provide semantic attributes', () => {
      const attrs = element['getSemanticAttributes']();

      expect(attrs['data-semantic-role']).toBe('test-role');
      expect(attrs['data-ai-context']).toBe('test-context');
      expect(attrs['data-criticality']).toBeUndefined(); // Low criticality not included
    });

    it('should include performance metrics in AI state', () => {
      const aiState = element.aiState;

      expect(aiState.performance).toBeDefined();
      expect(aiState.performance!.renderTime).toBeDefined();
      expect(aiState.performance!.renderCount).toBeDefined();
      expect(aiState.performance!.mode).toBe('auto');
    });
  });

  describe('AI Metadata Validation for Components', () => {
    it('should validate button component AI metadata', async () => {
      const button = await fixture(html`
        <forge-button variant="primary">Test Button</forge-button>
      `);

      // Check if button has aiState getter
      expect(button).toHaveProperty('aiState');
      const aiState = (button as any).aiState as AIComponentState;

      // Validate required fields
      expect(aiState.component).toBe('forge-button');
      expect(aiState.metadata.purpose).toBeDefined();
      expect(aiState.possibleActions).toBeDefined();
      expect(aiState.stateExplanation).toBeDefined();

      // Validate actions include expected button actions
      const actionNames = aiState.possibleActions.map(a => a.name);
      expect(actionNames).toContain('click');
      expect(actionNames).toContain('focus');
    });

    it('should validate input component AI metadata', async () => {
      const input = await fixture(html`
        <forge-input type="email" placeholder="Enter email"></forge-input>
      `);

      // Check if input has aiState getter
      expect(input).toHaveProperty('aiState');
      const aiState = (input as any).aiState as AIComponentState;

      // Validate data type mapping
      expect(aiState.metadata.dataType).toBe('email');
      expect(aiState.metadata.purpose).toContain('data entry');

      // Validate input-specific actions
      const actionNames = aiState.possibleActions.map(a => a.name);
      expect(actionNames).toContain('input');
      expect(actionNames).toContain('clear');
      expect(actionNames).toContain('validate');
    });
  });
});

/**
 * AI Metadata Test Utilities
 */
export class AIMetadataTestUtils {
  /**
   * Validate that a component has complete AI metadata
   */
  static validateComponentMetadata(element: BaseElement): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const aiState = element.aiState;

    // Check required fields
    if (!aiState.component) {
      errors.push('Missing component name');
    }

    if (!aiState.metadata?.purpose) {
      errors.push('Missing metadata purpose');
    }

    if (!aiState.possibleActions || aiState.possibleActions.length === 0) {
      errors.push('No possible actions defined');
    }

    if (!aiState.stateExplanation) {
      errors.push('Missing state explanation');
    }

    // Validate action structure
    aiState.possibleActions?.forEach((action, index) => {
      if (!action.name) {
        errors.push(`Action ${index} missing name`);
      }
      if (!action.description) {
        errors.push(`Action ${index} missing description`);
      }
      if (action.available === undefined) {
        errors.push(`Action ${index} missing availability`);
      }
    });

    // Validate state explanation
    if (aiState.stateExplanation) {
      if (!aiState.stateExplanation.currentState) {
        errors.push('Missing current state');
      }
      if (!aiState.stateExplanation.possibleStates || 
          aiState.stateExplanation.possibleStates.length === 0) {
        errors.push('No possible states defined');
      }
      if (!aiState.stateExplanation.stateDescription) {
        errors.push('Missing state description');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Generate AI integration report for a component
   */
  static generateAIReport(element: BaseElement): string {
    const aiState = element.aiState;
    const validation = this.validateComponentMetadata(element);

    const report = [
      `AI Metadata Report for ${aiState.component}`,
      '=' .repeat(50),
      '',
      'Metadata:',
      `  Purpose: ${aiState.metadata?.purpose || 'Not defined'}`,
      `  Context: ${aiState.metadata?.context || 'Not defined'}`,
      `  Data Type: ${aiState.metadata?.dataType || 'Not defined'}`,
      `  Criticality: ${aiState.metadata?.criticality || 'Not defined'}`,
      `  Semantic Role: ${aiState.metadata?.semanticRole || 'Not defined'}`,
      '',
      'Current State:',
      `  ${aiState.stateExplanation?.currentState || 'Unknown'}`,
      `  Description: ${aiState.stateExplanation?.stateDescription || 'Not available'}`,
      '',
      'Available Actions:',
      ...(aiState.possibleActions?.map(a => 
        `  - ${a.name}: ${a.description} [${a.available ? 'Available' : 'Unavailable'}]`
      ) || ['  None defined']),
      '',
      'Validation Status:',
      `  Valid: ${validation.valid ? 'Yes' : 'No'}`,
      ...(validation.errors.length > 0 ? [
        '  Errors:',
        ...validation.errors.map(e => `    - ${e}`)
      ] : []),
      '',
      'Performance:',
      `  Render Time: ${aiState.performance?.renderTime || 0}ms`,
      `  Render Count: ${aiState.performance?.renderCount || 0}`,
      `  Mode: ${aiState.performance?.mode || 'auto'}`
    ];

    return report.join('\n');
  }
}