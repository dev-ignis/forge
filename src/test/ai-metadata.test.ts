/**
 * AI Metadata System Tests - ADR-017
 * 
 * Tests for AI-native development metadata functionality
 */

import { expect } from '@open-wc/testing';
import { AIMetadataUtils } from '../core/ai-metadata.types';
import type { AIComponentMetadata } from '../core/ai-metadata.types';
import '../components/atoms/button/button';
import { ForgeButton } from '../components/atoms/button/button';

describe('AI Metadata System', () => {
  describe('AIMetadataUtils', () => {
    let mockMetadata: AIComponentMetadata;

    beforeEach(() => {
      mockMetadata = {
        purpose: 'Test component for AI metadata validation',
        semanticRole: 'button',
        category: 'atom',
        criticality: 'medium',
        usagePatterns: ['form submission', 'navigation'],
        antiPatterns: ['avoid for non-interactive elements'],
        contextualRules: ['ensure proper accessibility'],
        aiPrompts: {
          codeGeneration: 'Generate accessible test component',
          accessibility: 'Include ARIA attributes',
          performance: 'Optimize for speed',
          designSystem: 'Use design tokens'
        },
        codeExamples: {
          react: '<TestComponent />',
          vue: '<test-component />',
          angular: '<test-component></test-component>',
          vanilla: '<test-component></test-component>'
        },
        designTokens: {
          colors: ['--test-color-primary']
        },
        performanceHints: ['lazy load when possible'],
        bundleImpact: 'minimal',
        a11yGuidelines: ['WCAG 2.1 AA compliance'],
        ariaPatterns: ['aria-label for clarity'],
        keyboardInteractions: ['Enter to activate'],
        compositionPatterns: {
          'standalone': 'Use independently'
        },
        childComponents: [],
        parentComponents: ['test-container'],
        testingPatterns: ['test interactions'],
        commonTestCases: ['should render correctly']
      };
    });

    describe('generateTrainingExamples', () => {
      it('should generate training examples from usage patterns', () => {
        const examples = AIMetadataUtils.generateTrainingExamples(mockMetadata);
        
        expect(examples).to.be.an('array');
        expect(examples.length).to.be.greaterThan(0);
        
        const usageExample = examples.find(ex => ex.context === 'form submission');
        expect(usageExample).to.exist;
        expect(usageExample?.goodExample).to.include('TestComponent');
        expect(usageExample?.explanation).to.include('form submission');
        expect(usageExample?.tags).to.include('best-practice');
        expect(usageExample?.tags).to.include('atom');
      });

      it('should generate anti-examples from anti-patterns', () => {
        const examples = AIMetadataUtils.generateTrainingExamples(mockMetadata);
        
        const antiExample = examples.find(ex => ex.context === 'anti-pattern');
        expect(antiExample).to.exist;
        expect(antiExample?.badExample).to.include('Avoid');
        expect(antiExample?.explanation).to.include('avoid for non-interactive elements');
        expect(antiExample?.tags).to.include('anti-pattern');
      });
    });

    describe('validateCompliance', () => {
      let buttonElement: ForgeButton;

      beforeEach(async () => {
        buttonElement = document.createElement('forge-button') as ForgeButton;
        document.body.appendChild(buttonElement);
        await buttonElement.updateComplete;
      });

      afterEach(() => {
        if (buttonElement && buttonElement.parentNode) {
          buttonElement.parentNode.removeChild(buttonElement);
        }
      });

      it('should validate accessibility compliance', () => {
        // Set up element with proper attributes
        buttonElement.setAttribute('role', 'button');
        buttonElement.setAttribute('aria-label', 'Test button');

        const result = AIMetadataUtils.validateCompliance(buttonElement, mockMetadata);
        
        expect(result).to.have.property('score').that.is.a('number');
        expect(result).to.have.property('status');
        expect(result).to.have.property('issues').that.is.an('array');
        expect(result).to.have.property('suggestions').that.is.an('array');
        expect(result).to.have.property('strengths').that.is.an('array');

        // Should have proper semantic role
        expect(result.strengths).to.include('Has proper semantic role');
      });

      it('should identify missing accessibility attributes', () => {
        // Test element without proper attributes
        const result = AIMetadataUtils.validateCompliance(buttonElement, mockMetadata);
        
        // Should identify missing role if semanticRole is defined
        if (mockMetadata.semanticRole) {
          const roleIssue = result.issues.find(issue => 
            issue.description.includes('Missing semantic role')
          );
          expect(roleIssue).to.exist;
          expect(roleIssue?.category).to.equal('accessibility');
          expect(roleIssue?.severity).to.equal('warning');
        }
      });

      it('should provide performance suggestions', () => {
        const result = AIMetadataUtils.validateCompliance(buttonElement, mockMetadata);
        
        if (mockMetadata.performanceHints.length > 0) {
          expect(result.suggestions.length).to.be.greaterThan(0);
        }
      });

      it('should calculate compliance score correctly', () => {
        buttonElement.setAttribute('role', mockMetadata.semanticRole);
        const result = AIMetadataUtils.validateCompliance(buttonElement, mockMetadata);
        
        expect(result.score).to.be.within(0, 100);
        expect(result.status).to.be.oneOf(['compliant', 'partial', 'non-compliant']);
      });
    });

    describe('exportTrainingDataset', () => {
      it('should export comprehensive training dataset', () => {
        const components = new Map<string, AIComponentMetadata>();
        components.set('forge-button', mockMetadata);
        components.set('forge-input', {
          ...mockMetadata,
          purpose: 'Data input field',
          semanticRole: 'textbox',
          usagePatterns: ['form input', 'search']
        });

        const dataset = AIMetadataUtils.exportTrainingDataset(components);
        
        expect(dataset).to.have.property('version');
        expect(dataset).to.have.property('created').that.is.a('date');
        expect(dataset).to.have.property('components').that.is.an('array');
        expect(dataset).to.have.property('globalPatterns').that.is.an('array');
        expect(dataset).to.have.property('frameworkGuidance').that.is.an('object');

        // Check components
        expect(dataset.components).to.have.lengthOf(2);
        const buttonComponent = dataset.components.find(c => c.tagName === 'forge-button');
        expect(buttonComponent).to.exist;
        expect(buttonComponent?.metadata).to.deep.equal(mockMetadata);
        expect(buttonComponent?.examples).to.be.an('array');

        // Check framework guidance
        expect(dataset.frameworkGuidance).to.have.property('react');
        expect(dataset.frameworkGuidance).to.have.property('vue');
        expect(dataset.frameworkGuidance).to.have.property('angular');
        
        const reactGuidance = dataset.frameworkGuidance.react;
        expect(reactGuidance).to.have.property('framework').that.equals('react');
        expect(reactGuidance).to.have.property('importPatterns').that.is.an('array');
        expect(reactGuidance).to.have.property('eventPatterns').that.is.an('object');
        expect(reactGuidance).to.have.property('statePatterns').that.is.an('array');
        expect(reactGuidance).to.have.property('gotchas').that.is.an('array');
      });
    });
  });

  describe('ForgeButton AI Metadata', () => {
    it('should have comprehensive AI metadata defined', () => {
      const metadata = ForgeButton.aiMetadata;
      
      expect(metadata).to.exist;
      expect(metadata).to.have.property('purpose').that.is.a('string');
      expect(metadata).to.have.property('semanticRole').that.equals('button');
      expect(metadata).to.have.property('category').that.equals('atom');
      expect(metadata).to.have.property('usagePatterns').that.is.an('array');
      expect(metadata).to.have.property('antiPatterns').that.is.an('array');
      expect(metadata).to.have.property('contextualRules').that.is.an('array');
      expect(metadata).to.have.property('aiPrompts').that.is.an('object');
      expect(metadata).to.have.property('codeExamples').that.is.an('object');
      expect(metadata).to.have.property('designTokens').that.is.an('object');
      expect(metadata).to.have.property('performanceHints').that.is.an('array');
      expect(metadata).to.have.property('a11yGuidelines').that.is.an('array');
      expect(metadata).to.have.property('ariaPatterns').that.is.an('array');
      expect(metadata).to.have.property('keyboardInteractions').that.is.an('array');
      expect(metadata).to.have.property('compositionPatterns').that.is.an('object');
      expect(metadata).to.have.property('childComponents').that.is.an('array');
      expect(metadata).to.have.property('parentComponents').that.is.an('array');
      expect(metadata).to.have.property('testingPatterns').that.is.an('array');
      expect(metadata).to.have.property('commonTestCases').that.is.an('array');
    });

    it('should have framework-specific code examples', () => {
      const metadata = ForgeButton.aiMetadata;
      const examples = metadata.codeExamples;
      
      expect(examples).to.have.property('react').that.includes('ForgeButton');
      expect(examples).to.have.property('vue').that.includes('forge-button');
      expect(examples).to.have.property('angular').that.includes('forge-button');
      expect(examples).to.have.property('vanilla').that.includes('forge-button');
    });

    it('should have proper AI prompts for code generation', () => {
      const metadata = ForgeButton.aiMetadata;
      const prompts = metadata.aiPrompts;
      
      expect(prompts).to.have.property('codeGeneration').that.is.a('string');
      expect(prompts).to.have.property('accessibility').that.is.a('string');
      expect(prompts).to.have.property('performance').that.is.a('string');
      expect(prompts).to.have.property('designSystem').that.is.a('string');
    });

    it('should have comprehensive usage patterns', () => {
      const metadata = ForgeButton.aiMetadata;
      
      expect(metadata.usagePatterns).to.include('form submission');
      expect(metadata.usagePatterns).to.include('modal triggers');
      expect(metadata.usagePatterns).to.include('navigation actions');
    });

    it('should have clear anti-patterns', () => {
      const metadata = ForgeButton.aiMetadata;
      
      expect(metadata.antiPatterns).to.include('never use primary variant for destructive actions');
      expect(metadata.antiPatterns).to.include('avoid disabled state for async operations - prefer loading state');
    });

    it('should have accessibility guidelines', () => {
      const metadata = ForgeButton.aiMetadata;
      
      expect(metadata.a11yGuidelines.length).to.be.greaterThan(0);
      expect(metadata.ariaPatterns.length).to.be.greaterThan(0);
      expect(metadata.keyboardInteractions.length).to.be.greaterThan(0);
    });

    it('should generate training examples', () => {
      const metadata = ForgeButton.aiMetadata;
      const examples = AIMetadataUtils.generateTrainingExamples(metadata);
      
      expect(examples).to.be.an('array');
      expect(examples.length).to.be.greaterThan(0);
      
      // Should have examples for each usage pattern
      metadata.usagePatterns.forEach(pattern => {
        const example = examples.find(ex => ex.context === pattern);
        expect(example).to.exist;
        expect(example?.component).to.be.a('string');
        expect(example?.goodExample).to.be.a('string');
        expect(example?.explanation).to.be.a('string');
      });
    });
  });

  describe('AI Metadata Validation', () => {
    it('should validate required metadata fields', () => {
      const incompleteMetadata = {
        purpose: 'Test component'
      } as any;
      
      const result = AIMetadataUtils.validate(incompleteMetadata);
      expect(result.valid).to.be.true; // Only purpose is required for basic AIMetadata
    });

    it('should validate AI component metadata completeness', () => {
      const metadata = ForgeButton.aiMetadata;
      
      // All required fields should be present
      expect(metadata.purpose).to.be.a('string').with.length.greaterThan(0);
      expect(metadata.category).to.be.oneOf(['atom', 'molecule', 'organism']);
      expect(metadata.usagePatterns).to.be.an('array').with.length.greaterThan(0);
      expect(metadata.antiPatterns).to.be.an('array').with.length.greaterThan(0);
      expect(metadata.contextualRules).to.be.an('array').with.length.greaterThan(0);
      expect(metadata.aiPrompts).to.be.an('object');
      expect(metadata.codeExamples).to.be.an('object');
    });
  });
});