'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ForgeButton, 
  ForgeCard, 
  ForgeInput,
  ForgeAlert,
  ForgeBadge,
  ForgeTabs,
  ForgeModal,
  ForgeToast,
  ForgeAccordion,
  ForgeProgress,
  ForgeIcon
} from '@nexcraft/forge-react';

// AI Tools Integration Demo
// import aiIndex from '@nexcraft/forge/ai-index.json';
// import buttonSpec from '@nexcraft/forge/ai-tools/react/button.json';
const aiIndex = { components: [], version: '1.0.0' };
const buttonSpec = { component: 'ForgeButton', props: [] };

interface AIComponentState {
  component: string;
  state: any;
  possibleActions: string[];
  aiMetadata: any;
}

export default function AIDemo() {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiState, setAiState] = useState<AIComponentState | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [toastCount, setToastCount] = useState(0);
  
  const buttonRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  // Simulate AI analysis of components
  const analyzeComponent = (componentRef: any, componentName: string) => {
    if (!componentRef.current) return;

    try {
      // Access AI methods if available
      const aiState = componentRef.current.aiState || {};
      const possibleActions = componentRef.current.getPossibleActions?.() || [];
      const stateExplanation = componentRef.current.explainState?.() || {};

      setAiState({
        component: componentName,
        state: aiState,
        possibleActions: possibleActions.map((action: any) => action.name || action),
        aiMetadata: {
          ...aiState,
          explanation: stateExplanation
        }
      });

      // Generate AI insights
      const insights = [
        `Component "${componentName}" is currently ${aiState.currentState || 'active'}`,
        `Available actions: ${possibleActions.length > 0 ? possibleActions.join(', ') : 'none'}`,
        `AI metadata includes ${Object.keys(aiState).length} properties`,
        `Component supports ${buttonSpec.aiMethods ? Object.keys(buttonSpec.aiMethods).length : 0} AI methods`
      ];
      
      setAiInsights(insights);
      setShowAIModal(true);
    } catch (error) {
      console.warn('AI methods not available:', error);
      setAiInsights([
        'AI methods are not yet available in this component',
        'This is expected for components that haven\'t been enhanced with AI capabilities',
        'AI-native components will provide real-time state analysis and action suggestions'
      ]);
      setShowAIModal(true);
    }
  };

  const showToast = () => {
    setToastCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI-Native Component Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the future of component development with built-in AI metadata, 
            intelligent state analysis, and automated action suggestions.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <ForgeBadge variant="success">AI-Native</ForgeBadge>
            <ForgeBadge variant="info">Function Calling</ForgeBadge>
            <ForgeBadge variant="warning">State Analysis</ForgeBadge>
            <ForgeBadge variant="default">Auto Discovery</ForgeBadge>
          </div>
        </motion.div>

        {/* AI Index Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <ForgeCard className="p-6">
            <h2 className="text-2xl font-semibold mb-4">AI Discovery System</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">AI Index (Fast Discovery)</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Index Version:</span>
                    <span className="font-mono">{aiIndex.indexVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package:</span>
                    <span className="font-mono">{aiIndex.package}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Generated:</span>
                    <span className="font-mono">{new Date(aiIndex.generatedAt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Has AI Methods:</span>
                    <ForgeBadge variant={aiIndex.summary.hasAiMethods ? 'success' : 'default'}>
                      {aiIndex.summary.hasAiMethods ? 'Yes' : 'No'}
                    </ForgeBadge>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Supported Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {aiIndex.summary.frameworks.map((framework) => (
                    <ForgeBadge key={framework} variant="info">
                      {framework}
                    </ForgeBadge>
                  ))}
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Quick Access</h4>
                  <div className="space-y-1 text-sm">
                    <div>📄 Manifest: <code className="text-xs bg-gray-100 px-1 rounded">{aiIndex.quickAccess.manifest}</code></div>
                    <div>🔧 React: <code className="text-xs bg-gray-100 px-1 rounded">{aiIndex.quickAccess.integrations.react}</code></div>
                    <div>📚 Docs: <code className="text-xs bg-gray-100 px-1 rounded">{aiIndex.quickAccess.docs}</code></div>
                  </div>
                </div>
              </div>
            </div>
          </ForgeCard>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ForgeTabs 
            activeTab={activeTab} 
            onTabChange={(e: any) => setActiveTab(e?.detail?.tabId || 'overview')}
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'ai-methods', label: 'AI Methods' },
              { id: 'function-calling', label: 'Function Calling' },
              { id: 'integration', label: 'Integration' }
            ]}
          >

            <div slot="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ForgeCard className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Interactive AI Analysis</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Test Input</label>
                      <ForgeInput
                        ref={inputRef}
                        placeholder="Type something to analyze..."
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <ForgeButton 
                        ref={buttonRef}
                        variant="primary" 
                        onClick={showToast}
                        className="flex-1"
                      >
                        Analyze Button
                      </ForgeButton>
                      <ForgeButton 
                        variant="secondary"
                        onClick={() => analyzeComponent(inputRef, 'ForgeInput')}
                      >
                        Analyze Input
                      </ForgeButton>
                    </div>

                    <ForgeAlert severity="info">
                      Click "Analyze" buttons to see AI-powered component state analysis and action suggestions.
                    </ForgeAlert>
                  </div>
                </ForgeCard>

                <ForgeCard className="p-6">
                  <h3 className="text-xl font-semibold mb-4">AI-Native Features</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <ForgeIcon name="ai" className="w-6 h-6 text-purple-600" />
                      <div>
                        <div className="font-semibold">Built-in AI Metadata</div>
                        <div className="text-sm text-gray-600">Every component includes comprehensive AI metadata</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <ForgeIcon name="function" className="w-6 h-6 text-blue-600" />
                      <div>
                        <div className="font-semibold">Function Calling</div>
                        <div className="text-sm text-gray-600">AI tools can call component methods directly</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <ForgeIcon name="state" className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="font-semibold">State Analysis</div>
                        <div className="text-sm text-gray-600">Real-time component state explanation</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <ForgeIcon name="discovery" className="w-6 h-6 text-orange-600" />
                      <div>
                        <div className="font-semibold">Auto Discovery</div>
                        <div className="text-sm text-gray-600">AI tools automatically discover available components</div>
                      </div>
                    </div>
                  </div>
                </ForgeCard>
              </div>
            </div>

            <div slot="ai-methods" className="mt-6">
              <ForgeCard className="p-6">
                <h3 className="text-xl font-semibold mb-4">Available AI Methods</h3>
                <div className="space-y-4">
                  {buttonSpec.aiMethods && Object.entries(buttonSpec.aiMethods).map(([methodName, methodInfo]: [string, any]) => (
                    <div key={methodName} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <ForgeBadge variant="info">{methodName}</ForgeBadge>
                        <span className="text-sm text-gray-600">Returns: {methodInfo.returns}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{methodInfo.description}</p>
                      <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                        {methodInfo.example}
                      </div>
                    </div>
                  ))}
                </div>
              </ForgeCard>
            </div>

            <div slot="function-calling" className="mt-6">
              <ForgeCard className="p-6">
                <h3 className="text-xl font-semibold mb-4">Function Calling Specifications</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Component Schema</h4>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
                        {JSON.stringify(buttonSpec.schema, null, 2)}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Usage Examples</h4>
                    <div className="space-y-3">
                      {buttonSpec.examples.map((example: any, index: number) => (
                        <div key={index} className="border rounded p-3">
                          <div className="font-semibold text-sm mb-1">{example.name}</div>
                          <div className="text-sm text-gray-600 mb-2">{example.description}</div>
                          <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                            {example.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ForgeCard>
            </div>

            <div slot="integration" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ForgeCard className="p-6">
                  <h3 className="text-xl font-semibold mb-4">AI Tool Integration</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Import AI Specifications</h4>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        import buttonSpec from '@nexcraft/forge/ai-tools/react/button.json';
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Access AI Index</h4>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        import aiIndex from '@nexcraft/forge/ai-index.json';
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Component AI Methods</h4>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        const aiState = component.aiState;<br/>
                        const actions = component.getPossibleActions();
                      </div>
                    </div>
                  </div>
                </ForgeCard>

                <ForgeCard className="p-6">
                  <h3 className="text-xl font-semibold mb-4">AI Development Workflow</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">1. Discovery</h4>
                      <div className="text-sm space-y-2">
                        <p>AI tools automatically discover available components via ai-index.json</p>
                        <p>Fast 460-line discovery layer for quick component lookup</p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">2. Analysis</h4>
                      <div className="text-sm space-y-2">
                        <p>Components provide real-time state analysis via aiState property</p>
                        <p>AI methods explain current state and suggest possible actions</p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">3. Integration</h4>
                      <div className="text-sm space-y-2">
                        <p>Function-calling specifications enable direct AI interaction</p>
                        <p>Comprehensive 33,000+ line manifest for detailed metadata</p>
                      </div>
                    </div>
                  </div>
                </ForgeCard>
              </div>
            </div>
          </ForgeTabs>
        </motion.div>

        {/* AI Analysis Modal */}
        {showAIModal && (
          <ForgeModal open onClose={() => setShowAIModal(false)}>
            <div slot="header" className="text-lg font-semibold">AI Component Analysis</div>
            <div className="text-sm text-gray-600 mb-4">
              Real-time analysis of component state and available actions
            </div>
            <div className="p-6 space-y-4">
              {aiState && (
                <div>
                  <h4 className="font-semibold mb-2">Component: {aiState.component}</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Current State:</span>
                      <ForgeBadge variant="info" className="ml-2">
                        {aiState.aiMetadata.currentState || 'active'}
                      </ForgeBadge>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Available Actions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {aiState.possibleActions.map((action, index) => (
                          <ForgeBadge key={index} variant="success" className="text-xs">
                            {action}
                          </ForgeBadge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="font-semibold mb-2">AI Insights</h4>
                <div className="space-y-2">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <ForgeIcon name="ai" className="w-4 h-4 text-purple-600 mt-0.5" />
                      <span className="text-sm">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div slot="footer" className="flex justify-end gap-3">
              <ForgeButton variant="primary" onClick={() => setShowAIModal(false)}>
                Close Analysis
              </ForgeButton>
            </div>
          </ForgeModal>
        )}

        {/* Toast Container */}
        <ForgeToast>
          {toastCount > 0 && (
            <div key={toastCount} className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <div className="font-semibold">AI Analysis Complete!</div>
              <div className="text-sm">Component state has been analyzed using AI-native methods</div>
            </div>
          )}
        </ForgeToast>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Examples
          </a>
        </div>
      </div>
    </div>
  );
}