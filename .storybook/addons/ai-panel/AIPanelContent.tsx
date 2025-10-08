import React, { useEffect, useState } from 'react';
import { useGlobals, useStorybookApi } from 'storybook/manager-api';
import { styled } from 'storybook/internal/theming';

const PanelWrapper = styled.div({
  padding: '1rem',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  height: '100%',
  overflow: 'auto',
});

const Section = styled.div({
  marginBottom: '1.5rem',
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
});

const SectionTitle = styled.h3({
  margin: '0 0 1rem 0',
  fontSize: '14px',
  fontWeight: 600,
  color: '#1a1a1a',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

const InfoGrid = styled.div({
  display: 'grid',
  gap: '0.75rem',
});

const InfoRow = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '0.5rem',
  backgroundColor: 'white',
  borderRadius: '4px',
  fontSize: '13px',
});

const Label = styled.span({
  fontWeight: 500,
  color: '#666',
  minWidth: '120px',
});

const Value = styled.span({
  color: '#1a1a1a',
  flex: 1,
  textAlign: 'right',
  wordBreak: 'break-word',
});

const CodeBlock = styled.pre({
  margin: '0.5rem 0 0 0',
  padding: '0.75rem',
  backgroundColor: '#1e1e1e',
  color: '#d4d4d4',
  borderRadius: '4px',
  fontSize: '12px',
  overflowX: 'auto',
  fontFamily: 'monospace',
  lineHeight: 1.5,
});

const Button = styled.button({
  padding: '0.5rem 1rem',
  backgroundColor: '#0066ff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: '#0052cc',
  },
  '&:active': {
    backgroundColor: '#0047b3',
  },
});

const ActionRow = styled.div({
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
});

const EmptyState = styled.div({
  padding: '2rem',
  textAlign: 'center',
  color: '#666',
  fontSize: '14px',
});

const Badge = styled.span<{ variant?: 'success' | 'warning' | 'error' | 'info' }>(({ variant = 'info' }) => {
  const colors = {
    success: { bg: '#d4edda', color: '#155724' },
    warning: { bg: '#fff3cd', color: '#856404' },
    error: { bg: '#f8d7da', color: '#721c24' },
    info: { bg: '#d1ecf1', color: '#0c5460' },
  };
  const { bg, color } = colors[variant];
  return {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    backgroundColor: bg,
    color: color,
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 500,
  };
});

interface ComponentAIData {
  explainState?: string;
  possibleActions?: Array<{ name: string; available: boolean; description?: string }>;
  aiState?: Record<string, any>;
  performanceMetrics?: {
    renderTime?: number;
    renderCount?: number;
    lastRenderMs?: number;
  };
}

export const AIPanelContent: React.FC = () => {
  const api = useStorybookApi();
  const [globals] = useGlobals();
  const [componentData, setComponentData] = useState<ComponentAIData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchComponentData = () => {
      try {
        // Get the canvas iframe
        const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement;
        if (!iframe || !iframe.contentWindow) {
          setError('Canvas iframe not found');
          return;
        }

        // Find the first Forge component in the story
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const forgeComponents = doc.querySelectorAll('[data-forge-component], forge-button, forge-input, forge-card, forge-alert, forge-badge, forge-avatar, forge-checkbox, forge-switch, forge-select, forge-radio-group, forge-progress, forge-skeleton, forge-tabs, forge-modal, forge-tooltip, forge-toast');

        if (forgeComponents.length === 0) {
          setComponentData(null);
          setError(null);
          return;
        }

        const component = forgeComponents[0] as any;

        const data: ComponentAIData = {};

        // Get AI methods
        if (typeof component.explainState === 'function') {
          try {
            data.explainState = component.explainState();
          } catch (e) {
            console.error('Error calling explainState:', e);
          }
        }

        if (typeof component.getPossibleActions === 'function') {
          try {
            data.possibleActions = component.getPossibleActions();
          } catch (e) {
            console.error('Error calling getPossibleActions:', e);
          }
        }

        // Get aiState property
        if (component.aiState) {
          data.aiState = component.aiState;
        }

        // Get performance metrics
        if (component.performanceMetrics || component._performanceMetrics) {
          data.performanceMetrics = component.performanceMetrics || component._performanceMetrics;
        }

        setComponentData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setComponentData(null);
      }
    };

    fetchComponentData();

    // Auto-refresh every 2 seconds for live monitoring
    const interval = setInterval(fetchComponentData, 2000);

    return () => clearInterval(interval);
  }, [api, globals, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (error) {
    return (
      <PanelWrapper>
        <EmptyState>
          <div style={{ color: '#dc3545', marginBottom: '0.5rem' }}>⚠️ Error</div>
          <div>{error}</div>
        </EmptyState>
      </PanelWrapper>
    );
  }

  if (!componentData) {
    return (
      <PanelWrapper>
        <EmptyState>
          <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🤖</div>
          <div style={{ marginBottom: '0.5rem' }}>No Forge component detected in the current story</div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            Add a Forge component to your story to see AI metadata
          </div>
        </EmptyState>
      </PanelWrapper>
    );
  }

  return (
    <PanelWrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>🤖 AI Metadata Inspector</h2>
        <Button onClick={handleRefresh}>↻ Refresh</Button>
      </div>

      {/* Component State Explanation */}
      {componentData.explainState && (
        <Section>
          <SectionTitle>💬 Component State</SectionTitle>
          <div style={{
            padding: '0.75rem',
            backgroundColor: 'white',
            borderRadius: '4px',
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#1a1a1a',
          }}>
            {componentData.explainState}
          </div>
        </Section>
      )}

      {/* Possible Actions */}
      {componentData.possibleActions && componentData.possibleActions.length > 0 && (
        <Section>
          <SectionTitle>⚡ Possible Actions</SectionTitle>
          <InfoGrid>
            {componentData.possibleActions.map((action, index) => (
              <div key={index} style={{
                padding: '0.75rem',
                backgroundColor: 'white',
                borderRadius: '4px',
                border: `1px solid ${action.available ? '#28a745' : '#dc3545'}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: '13px' }}>{action.name}</strong>
                  <Badge variant={action.available ? 'success' : 'error'}>
                    {action.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
                {action.description && (
                  <div style={{ fontSize: '12px', color: '#666' }}>{action.description}</div>
                )}
              </div>
            ))}
          </InfoGrid>
        </Section>
      )}

      {/* AI State */}
      {componentData.aiState && (
        <Section>
          <SectionTitle>🧠 AI State</SectionTitle>
          <InfoGrid>
            {Object.entries(componentData.aiState).map(([key, value]) => (
              <InfoRow key={key}>
                <Label>{key}:</Label>
                <Value>{typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}</Value>
              </InfoRow>
            ))}
          </InfoGrid>
          <CodeBlock>{JSON.stringify(componentData.aiState, null, 2)}</CodeBlock>
        </Section>
      )}

      {/* Performance Metrics */}
      {componentData.performanceMetrics && (
        <Section>
          <SectionTitle>⚡ Performance Metrics</SectionTitle>
          <InfoGrid>
            {componentData.performanceMetrics.lastRenderMs !== undefined && (
              <InfoRow>
                <Label>Last Render Time:</Label>
                <Value>
                  {componentData.performanceMetrics.lastRenderMs.toFixed(2)}ms
                  {componentData.performanceMetrics.lastRenderMs < 16 ? (
                    <Badge variant="success" style={{ marginLeft: '0.5rem' }}>Fast</Badge>
                  ) : componentData.performanceMetrics.lastRenderMs < 50 ? (
                    <Badge variant="warning" style={{ marginLeft: '0.5rem' }}>OK</Badge>
                  ) : (
                    <Badge variant="error" style={{ marginLeft: '0.5rem' }}>Slow</Badge>
                  )}
                </Value>
              </InfoRow>
            )}
            {componentData.performanceMetrics.renderCount !== undefined && (
              <InfoRow>
                <Label>Render Count:</Label>
                <Value>{componentData.performanceMetrics.renderCount}</Value>
              </InfoRow>
            )}
            {componentData.performanceMetrics.renderTime !== undefined && (
              <InfoRow>
                <Label>Total Render Time:</Label>
                <Value>{componentData.performanceMetrics.renderTime.toFixed(2)}ms</Value>
              </InfoRow>
            )}
          </InfoGrid>
        </Section>
      )}

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#e7f3ff',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#004085',
      }}>
        <strong>ℹ️ Live Monitoring:</strong> This panel auto-refreshes every 2 seconds to show real-time component state.
      </div>
    </PanelWrapper>
  );
};
