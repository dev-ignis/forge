/**
 * AI Metadata Validation System - ADR-017
 * 
 * Comprehensive validation system for AI-native development metadata
 * ensuring quality and completeness of AI training data.
 */

import type { 
  AIComponentMetadata, 
  AIComplianceResult, 
  AIComplianceIssue,
  AITrainingDataset
} from './ai-metadata.types';

export class AIMetadataValidator {
  /**
   * Validate complete AI component metadata
   */
  static validateComponentMetadata(metadata: AIComponentMetadata): AIMetadataValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Required fields validation
    this.validateRequiredFields(metadata, errors);
    
    // Content quality validation
    this.validateContentQuality(metadata, warnings, suggestions);
    
    // Framework examples validation
    this.validateFrameworkExamples(metadata, errors, warnings);
    
    // Accessibility validation
    this.validateAccessibilityMetadata(metadata, warnings, suggestions);
    
    // Performance metadata validation
    this.validatePerformanceMetadata(metadata, suggestions);

    const score = this.calculateMetadataScore(metadata, errors, warnings);
    
    return {
      valid: errors.length === 0,
      score,
      quality: this.determineQuality(score),
      errors,
      warnings,
      suggestions,
      completeness: this.calculateCompleteness(metadata)
    };
  }

  /**
   * Validate AI component implementation against its metadata
   */
  static validateComponentImplementation(
    element: Element, 
    metadata: AIComponentMetadata
  ): AIComplianceResult {
    const issues: AIComplianceIssue[] = [];
    const strengths: string[] = [];
    const suggestions: string[] = [];

    // Semantic role validation
    this.validateSemanticRole(element, metadata, issues, strengths);
    
    // Accessibility implementation validation
    this.validateAccessibilityImplementation(element, metadata, issues, suggestions);
    
    // ARIA patterns validation
    this.validateAriaPatterns(element, metadata, issues, strengths);
    
    // Performance implementation validation
    this.validatePerformanceImplementation(element, metadata, suggestions);

    const score = this.calculateComplianceScore(issues, metadata);
    
    return {
      score,
      status: this.determineComplianceStatus(score),
      issues,
      suggestions,
      strengths
    };
  }

  /**
   * Validate training dataset quality
   */
  static validateTrainingDataset(dataset: AITrainingDataset): AIDatasetValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Dataset structure validation
    if (!dataset.version || !dataset.created || !dataset.components) {
      errors.push('Dataset missing required structure (version, created, components)');
    }

    // Component coverage validation
    const componentCount = dataset.components.length;
    if (componentCount < 5) {
      warnings.push(`Low component coverage: ${componentCount} components (recommend 10+)`);
    }

    // Framework guidance validation
    this.validateFrameworkGuidance(dataset, warnings, suggestions);
    
    // Example quality validation
    this.validateExampleQuality(dataset, warnings, suggestions);

    return {
      valid: errors.length === 0,
      quality: componentCount >= 20 ? 'high' : componentCount >= 10 ? 'medium' : 'low',
      componentCount,
      exampleCount: dataset.components.reduce((sum, c) => sum + c.examples.length, 0),
      frameworkCoverage: Object.keys(dataset.frameworkGuidance).length,
      errors,
      warnings,
      suggestions
    };
  }

  /**
   * Generate AI metadata quality report
   */
  static generateQualityReport(
    components: Map<string, AIComponentMetadata>
  ): AIQualityReport {
    const componentReports: ComponentQualityReport[] = [];
    let totalScore = 0;
    let totalErrors = 0;
    let totalWarnings = 0;

    components.forEach((metadata, tagName) => {
      const validation = this.validateComponentMetadata(metadata);
      componentReports.push({
        tagName,
        validation,
        recommendedImprovements: this.getRecommendedImprovements(validation)
      });

      totalScore += validation.score;
      totalErrors += validation.errors.length;
      totalWarnings += validation.warnings.length;
    });

    const averageScore = components.size > 0 ? totalScore / components.size : 0;
    
    return {
      overallScore: averageScore,
      overallQuality: this.determineQuality(averageScore),
      componentCount: components.size,
      totalErrors,
      totalWarnings,
      components: componentReports,
      recommendations: this.generateGlobalRecommendations(componentReports),
      readinessForAI: this.assessAIReadiness(averageScore, totalErrors)
    };
  }

  // Private validation methods

  private static validateRequiredFields(metadata: AIComponentMetadata, errors: string[]): void {
    const requiredFields: Array<keyof AIComponentMetadata> = [
      'purpose', 'semanticRole', 'category', 'usagePatterns', 'antiPatterns', 
      'contextualRules', 'aiPrompts', 'codeExamples'
    ];

    requiredFields.forEach(field => {
      if (!metadata[field]) {
        errors.push(`Missing required field: ${field}`);
      } else if (Array.isArray(metadata[field]) && (metadata[field] as any[]).length === 0) {
        errors.push(`Empty required array field: ${field}`);
      }
    });
  }

  private static validateContentQuality(
    metadata: AIComponentMetadata, 
    warnings: string[], 
    suggestions: string[]
  ): void {
    // Purpose quality
    if (metadata.purpose && metadata.purpose.length < 10) {
      warnings.push('Purpose description is too brief (recommend 10+ characters)');
    }

    // Usage patterns quality
    if (metadata.usagePatterns.length < 3) {
      suggestions.push('Consider adding more usage patterns (recommend 3+ patterns)');
    }

    // Anti-patterns quality
    if (metadata.antiPatterns.length < 2) {
      suggestions.push('Consider adding more anti-patterns for better AI guidance');
    }

    // Contextual rules quality
    if (metadata.contextualRules.length < 3) {
      suggestions.push('Consider adding more contextual rules for AI decision making');
    }
  }

  private static validateFrameworkExamples(
    metadata: AIComponentMetadata,
    errors: string[],
    warnings: string[]
  ): void {
    const requiredFrameworks = ['react', 'vue', 'angular', 'vanilla'];
    
    requiredFrameworks.forEach(framework => {
      if (!metadata.codeExamples[framework]) {
        warnings.push(`Missing code example for ${framework} framework`);
      } else if (metadata.codeExamples[framework].length < 20) {
        warnings.push(`${framework} code example is too brief`);
      }
    });
  }

  private static validateAccessibilityMetadata(
    metadata: AIComponentMetadata,
    warnings: string[],
    suggestions: string[]
  ): void {
    if (metadata.a11yGuidelines.length === 0) {
      warnings.push('No accessibility guidelines specified');
    }

    if (metadata.ariaPatterns.length === 0) {
      suggestions.push('Consider adding ARIA patterns for better accessibility guidance');
    }

    if (metadata.keyboardInteractions.length === 0) {
      suggestions.push('Consider documenting keyboard interactions');
    }
  }

  private static validatePerformanceMetadata(
    metadata: AIComponentMetadata,
    suggestions: string[]
  ): void {
    if (metadata.performanceHints.length < 2) {
      suggestions.push('Consider adding more performance optimization hints');
    }

    if (!metadata.bundleImpact) {
      suggestions.push('Consider documenting bundle size impact');
    }
  }

  private static validateSemanticRole(
    element: Element,
    metadata: AIComponentMetadata,
    issues: AIComplianceIssue[],
    strengths: string[]
  ): void {
    const actualRole = element.getAttribute('role');
    const expectedRole = metadata.semanticRole;

    if (!actualRole && expectedRole) {
      issues.push({
        category: 'semantics',
        severity: 'warning',
        description: 'Missing semantic role attribute',
        fix: `Add role="${expectedRole}" attribute`,
        example: `<${element.tagName.toLowerCase()} role="${expectedRole}">...</${element.tagName.toLowerCase()}>`
      });
    } else if (actualRole === expectedRole) {
      strengths.push('Correct semantic role implementation');
    } else if (actualRole && expectedRole && actualRole !== expectedRole) {
      issues.push({
        category: 'semantics',
        severity: 'error',
        description: `Incorrect semantic role: expected "${expectedRole}", got "${actualRole}"`,
        fix: `Change role to "${expectedRole}"`,
        example: `<${element.tagName.toLowerCase()} role="${expectedRole}">...</${element.tagName.toLowerCase()}>`
      });
    }
  }

  private static validateAccessibilityImplementation(
    element: Element,
    metadata: AIComponentMetadata,
    issues: AIComplianceIssue[],
    suggestions: string[]
  ): void {
    // Check for aria-label if specified in patterns
    if (metadata.ariaPatterns.some(pattern => pattern.includes('aria-label'))) {
      if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
        issues.push({
          category: 'accessibility',
          severity: 'warning',
          description: 'Missing aria-label or aria-labelledby',
          fix: 'Add appropriate ARIA labeling',
          example: '<element aria-label="Descriptive label">...</element>'
        });
      }
    }

    // Check keyboard interaction support
    if (metadata.keyboardInteractions.length > 0) {
      const tabIndex = element.getAttribute('tabindex');
      if (!tabIndex && element.tagName !== 'BUTTON' && element.tagName !== 'A') {
        suggestions.push('Consider adding tabindex for keyboard accessibility');
      }
    }
  }

  private static validateAriaPatterns(
    element: Element,
    metadata: AIComponentMetadata,
    issues: AIComplianceIssue[],
    strengths: string[]
  ): void {
    metadata.ariaPatterns.forEach(pattern => {
      if (pattern.includes('aria-expanded')) {
        const ariaExpanded = element.getAttribute('aria-expanded');
        if (ariaExpanded) {
          strengths.push('Proper aria-expanded implementation');
        }
      }
      
      if (pattern.includes('aria-controls')) {
        const ariaControls = element.getAttribute('aria-controls');
        if (ariaControls) {
          strengths.push('Proper aria-controls implementation');
        }
      }
    });
  }

  private static validatePerformanceImplementation(
    element: Element,
    metadata: AIComponentMetadata,
    suggestions: string[]
  ): void {
    metadata.performanceHints.forEach(hint => {
      if (hint.includes('lazy load') && !element.hasAttribute('loading')) {
        suggestions.push('Consider implementing lazy loading for performance');
      }
      
      if (hint.includes('debounce') && element.tagName === 'FORGE-BUTTON') {
        suggestions.push('Ensure click event debouncing is implemented');
      }
    });
  }

  private static validateFrameworkGuidance(
    dataset: AITrainingDataset,
    warnings: string[],
    suggestions: string[]
  ): void {
    const requiredFrameworks = ['react', 'vue', 'angular'];
    const availableFrameworks = Object.keys(dataset.frameworkGuidance);

    requiredFrameworks.forEach(framework => {
      if (!availableFrameworks.includes(framework)) {
        warnings.push(`Missing framework guidance for ${framework}`);
      } else {
        const guidance = dataset.frameworkGuidance[framework];
        if (!guidance.importPatterns.length) {
          suggestions.push(`Add import patterns for ${framework}`);
        }
        if (!guidance.eventPatterns || Object.keys(guidance.eventPatterns).length === 0) {
          suggestions.push(`Add event handling patterns for ${framework}`);
        }
      }
    });
  }

  private static validateExampleQuality(
    dataset: AITrainingDataset,
    warnings: string[],
    suggestions: string[]
  ): void {
    const componentsWithFewExamples = dataset.components.filter(c => c.examples.length < 3);
    
    if (componentsWithFewExamples.length > 0) {
      warnings.push(`${componentsWithFewExamples.length} components have fewer than 3 training examples`);
    }

    const totalAntiExamples = dataset.components.reduce((sum, c) => sum + c.antiExamples.length, 0);
    if (totalAntiExamples < dataset.components.length) {
      suggestions.push('Consider adding anti-examples for better AI training');
    }
  }

  private static calculateMetadataScore(
    metadata: AIComponentMetadata,
    errors: string[],
    warnings: string[]
  ): number {
    let score = 100;
    
    // Deduct points for errors and warnings
    score -= errors.length * 15;
    score -= warnings.length * 5;
    
    // Add points for completeness
    const completeness = this.calculateCompleteness(metadata);
    score = Math.min(score, completeness);
    
    return Math.max(0, score);
  }

  private static calculateCompleteness(metadata: AIComponentMetadata): number {
    let completed = 0;
    let total = 0;

    // Count completed fields
    const fields = [
      metadata.purpose, metadata.semanticRole, metadata.category,
      metadata.usagePatterns?.length, metadata.antiPatterns?.length,
      metadata.contextualRules?.length, metadata.aiPrompts,
      metadata.codeExamples, metadata.a11yGuidelines?.length,
      metadata.performanceHints?.length
    ];

    fields.forEach(field => {
      total++;
      if (field) completed++;
    });

    return Math.round((completed / total) * 100);
  }

  private static calculateComplianceScore(
    issues: AIComplianceIssue[],
    _metadata: AIComponentMetadata
  ): number {
    let score = 100;
    
    issues.forEach(issue => {
      switch (issue.severity) {
        case 'error':
          score -= 20;
          break;
        case 'warning':
          score -= 10;
          break;
        case 'info':
          score -= 2;
          break;
      }
    });

    return Math.max(0, score);
  }

  private static determineQuality(score: number): 'high' | 'medium' | 'low' {
    if (score >= 90) return 'high';
    if (score >= 70) return 'medium';
    return 'low';
  }

  private static determineComplianceStatus(score: number): 'compliant' | 'partial' | 'non-compliant' {
    if (score >= 90) return 'compliant';
    if (score >= 70) return 'partial';
    return 'non-compliant';
  }

  private static getRecommendedImprovements(validation: AIMetadataValidationResult): string[] {
    const improvements: string[] = [];
    
    if (validation.score < 70) {
      improvements.push('Critical: Address all errors before AI training');
    }
    
    if (validation.completeness < 80) {
      improvements.push('Improve metadata completeness (target 80%+)');
    }

    validation.suggestions.forEach(suggestion => {
      improvements.push(suggestion);
    });

    return improvements;
  }

  private static generateGlobalRecommendations(reports: ComponentQualityReport[]): string[] {
    const recommendations: string[] = [];
    
    const lowQualityComponents = reports.filter(r => r.validation.quality === 'low').length;
    if (lowQualityComponents > 0) {
      recommendations.push(`${lowQualityComponents} components need quality improvements`);
    }

    const totalErrors = reports.reduce((sum, r) => sum + r.validation.errors.length, 0);
    if (totalErrors > 0) {
      recommendations.push(`Resolve ${totalErrors} critical errors across all components`);
    }

    return recommendations;
  }

  private static assessAIReadiness(averageScore: number, totalErrors: number): AIReadinessLevel {
    if (totalErrors > 0) return 'not-ready';
    if (averageScore >= 90) return 'production-ready';
    if (averageScore >= 70) return 'development-ready';
    return 'needs-improvement';
  }
}

// Type definitions for validation results

export interface AIMetadataValidationResult {
  valid: boolean;
  score: number;
  quality: 'high' | 'medium' | 'low';
  errors: string[];
  warnings: string[];
  suggestions: string[];
  completeness: number;
}

export interface AIDatasetValidationResult {
  valid: boolean;
  quality: 'high' | 'medium' | 'low';
  componentCount: number;
  exampleCount: number;
  frameworkCoverage: number;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface ComponentQualityReport {
  tagName: string;
  validation: AIMetadataValidationResult;
  recommendedImprovements: string[];
}

export interface AIQualityReport {
  overallScore: number;
  overallQuality: 'high' | 'medium' | 'low';
  componentCount: number;
  totalErrors: number;
  totalWarnings: number;
  components: ComponentQualityReport[];
  recommendations: string[];
  readinessForAI: AIReadinessLevel;
}

export type AIReadinessLevel = 'production-ready' | 'development-ready' | 'needs-improvement' | 'not-ready';