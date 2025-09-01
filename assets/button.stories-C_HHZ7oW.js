import{x as r}from"./iframe-ppHbX3S9.js";import"./preload-helper-C1FmrZbK.js";const ie={title:"Atoms/Button",component:"forge-button",tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["primary","secondary","danger","ghost","link"],description:"Visual variant of the button",defaultValue:"primary"},size:{control:{type:"select"},options:["sm","md","lg"],description:"Size of the button",defaultValue:"md"},disabled:{control:{type:"boolean"},description:"Whether the button is disabled",defaultValue:!1},loading:{control:{type:"boolean"},description:"Whether the button is in a loading state",defaultValue:!1},fullWidth:{control:{type:"boolean"},description:"Whether the button should take full width",defaultValue:!1},type:{control:{type:"select"},options:["button","submit","reset"],description:"Button type attribute",defaultValue:"button"},semanticRole:{control:{type:"text"},description:"Semantic role for AI understanding"},aiContext:{control:{type:"text"},description:"Context for AI assistants"},ariaDescription:{control:{type:"text"},description:"Enhanced description for screen readers and AI"},maxRenderMs:{control:{type:"number"},description:"Maximum render time in milliseconds",defaultValue:16},warnOnViolation:{control:{type:"boolean"},description:"Warn on performance violations",defaultValue:!1},performanceMode:{control:{type:"select"},options:["auto","fast","normal"],description:"Performance mode setting",defaultValue:"auto"},devMode:{control:{type:"boolean"},description:"Enable development mode",defaultValue:!1},showMetrics:{control:{type:"boolean"},description:"Show performance metrics overlay",defaultValue:!1}},parameters:{docs:{description:{component:`
The ForgeButton component is a versatile, accessible button component that follows the design system tokens.

## Features
- Multiple visual variants (primary, secondary, danger, ghost, link)
- Three size options (sm, md, lg)
- Loading and disabled states
- Full keyboard navigation support
- ARIA compliant
- Token-based theming
- **AI-Ready**: Semantic roles and context for AI assistants
- **Performance Monitoring**: Self-monitoring with budget enforcement
- **Developer Mode**: Built-in metrics and debugging

## Usage

### Basic Usage
\`\`\`html
<forge-button variant="primary" size="md">Click me</forge-button>
\`\`\`

### AI-Ready Usage
\`\`\`html
<forge-button 
  semantic-role="submit-action"
  ai-context="form-submission"
  aria-description="Submit the payment form">
  Submit Payment
</forge-button>
\`\`\`

### Performance Monitoring
\`\`\`html
<forge-button 
  max-render-ms="8"
  warn-on-violation
  performance-mode="fast">
  Fast Button
</forge-button>
\`\`\`

### Developer Mode
\`\`\`html
<forge-button 
  dev-mode
  show-metrics>
  Debug Button
</forge-button>
\`\`\`

## Theming

The button component uses CSS Custom Properties for theming:
- \`--forge-color-*\` for colors
- \`--forge-spacing-*\` for padding
- \`--forge-font-*\` for typography
- \`--forge-border-*\` for borders
- \`--forge-shadow-*\` for shadows
- \`--forge-transition-*\` for animations
        `}}}},t={args:{variant:"primary",size:"md",disabled:!1,loading:!1},render:e=>r`
    <forge-button
      variant="${e.variant}"
      size="${e.size}"
      ?disabled="${e.disabled}"
      ?loading="${e.loading}"
      ?full-width="${e.fullWidth}"
      type="${e.type}"
    >
      Primary Button
    </forge-button>
  `},n={args:{variant:"secondary",size:"md"},render:e=>r`
    <forge-button variant="${e.variant}" size="${e.size}">
      Secondary Button
    </forge-button>
  `},o={args:{variant:"danger",size:"md"},render:e=>r`
    <forge-button variant="${e.variant}" size="${e.size}">
      Delete
    </forge-button>
  `},a={args:{variant:"ghost",size:"md"},render:e=>r`
    <forge-button variant="${e.variant}" size="${e.size}">
      Ghost Button
    </forge-button>
  `},i={args:{variant:"link",size:"md"},render:e=>r`
    <forge-button variant="${e.variant}" size="${e.size}">
      Link Button
    </forge-button>
  `},s={render:()=>r`
    <div style="display: flex; gap: 16px; align-items: center;">
      <forge-button size="sm">Small</forge-button>
      <forge-button size="md">Medium</forge-button>
      <forge-button size="lg">Large</forge-button>
    </div>
  `},d={args:{loading:!0,variant:"primary"},render:e=>r`
    <forge-button variant="${e.variant}" ?loading="${e.loading}">
      Loading...
    </forge-button>
  `},g={args:{disabled:!0,variant:"primary"},render:e=>r`
    <forge-button variant="${e.variant}" ?disabled="${e.disabled}">
      Disabled
    </forge-button>
  `},l={args:{fullWidth:!0,variant:"primary"},render:e=>r`
    <div style="width: 400px;">
      <forge-button variant="${e.variant}" ?full-width="${e.fullWidth}">
        Full Width Button
      </forge-button>
    </div>
  `},m={render:()=>r`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary">Primary</forge-button>
        <forge-button variant="secondary">Secondary</forge-button>
        <forge-button variant="danger">Danger</forge-button>
        <forge-button variant="ghost">Ghost</forge-button>
        <forge-button variant="link">Link</forge-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary" disabled>Primary Disabled</forge-button>
        <forge-button variant="secondary" disabled>Secondary Disabled</forge-button>
        <forge-button variant="danger" disabled>Danger Disabled</forge-button>
        <forge-button variant="ghost" disabled>Ghost Disabled</forge-button>
        <forge-button variant="link" disabled>Link Disabled</forge-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary" loading>Loading</forge-button>
        <forge-button variant="secondary" loading>Loading</forge-button>
        <forge-button variant="danger" loading>Loading</forge-button>
        <forge-button variant="ghost" loading>Loading</forge-button>
        <forge-button variant="link" loading>Loading</forge-button>
      </div>
    </div>
  `},c={name:"AI-Ready Button",args:{variant:"primary",semanticRole:"submit-payment",aiContext:"checkout-flow",ariaDescription:"Submit payment form with validated credit card information"},render:e=>r`
    <forge-button 
      variant="${e.variant}"
      semantic-role="${e.semanticRole}"
      ai-context="${e.aiContext}"
      aria-description="${e.ariaDescription}">
      Submit Payment
    </forge-button>
    <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata:</strong><br>
      Semantic Role: ${e.semanticRole}<br>
      AI Context: ${e.aiContext}<br>
      ARIA Description: ${e.ariaDescription}
    </div>
  `,parameters:{docs:{description:{story:"Demonstrates AI-ready features with semantic metadata for AI assistants and screen readers."}}}},u={name:"Performance Monitoring",args:{variant:"primary",maxRenderMs:8,warnOnViolation:!0,performanceMode:"auto",devMode:!0,showMetrics:!0},render:e=>r`
    <forge-button 
      variant="${e.variant}"
      max-render-ms="${e.maxRenderMs}"
      ?warn-on-violation="${e.warnOnViolation}"
      performance-mode="${e.performanceMode}"
      ?dev-mode="${e.devMode}"
      ?show-metrics="${e.showMetrics}">
      Performance Monitored
    </forge-button>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: ${e.maxRenderMs}ms<br>
      Warn on Violation: ${e.warnOnViolation}<br>
      Performance Mode: ${e.performanceMode}<br>
      <em>Check console for performance warnings if render exceeds budget</em>
    </div>
  `,parameters:{docs:{description:{story:"Shows performance monitoring with budget enforcement and developer metrics."}}}},p={name:"Developer Mode",args:{variant:"primary",devMode:!0,showMetrics:!0},render:e=>r`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <forge-button 
        variant="primary"
        ?dev-mode="${e.devMode}"
        ?show-metrics="${e.showMetrics}">
        With Metrics
      </forge-button>
      <forge-button 
        variant="secondary"
        size="lg"
        ?dev-mode="${e.devMode}"
        ?show-metrics="${e.showMetrics}">
        Large Button
      </forge-button>
      <forge-button 
        variant="danger"
        loading
        ?dev-mode="${e.devMode}"
        ?show-metrics="${e.showMetrics}">
        Loading
      </forge-button>
    </div>
    <div style="margin-top: 20px; padding: 16px; background: #ede9fe; border-radius: 8px; font-size: 14px;">
      <strong>Developer Mode Active:</strong><br>
      • Performance metrics overlay visible<br>
      • Console debugging enabled<br>
      • Component state logged<br>
      <em>Open DevTools console to see detailed component state</em>
    </div>
  `,parameters:{docs:{description:{story:"Developer mode with performance metrics overlay and debugging features."}}}},f={name:"Form Integration",render:()=>r`
    <form @submit="${e=>{e.preventDefault(),alert("Form submitted!")}}" style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <input type="text" placeholder="Enter your name" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      <input type="email" placeholder="Enter your email" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      <div style="display: flex; gap: 8px;">
        <forge-button 
          type="submit" 
          variant="primary"
          semantic-role="form-submit"
          ai-context="contact-form">
          Submit
        </forge-button>
        <forge-button 
          type="reset" 
          variant="secondary"
          semantic-role="form-reset"
          ai-context="contact-form">
          Reset
        </forge-button>
      </div>
    </form>
  `,parameters:{docs:{description:{story:"Demonstrates form integration with submit and reset button types, including AI metadata."}}}};var b,v,y;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false
  },
  render: args => html\`
    <forge-button
      variant="\${args.variant}"
      size="\${args.size}"
      ?disabled="\${args.disabled}"
      ?loading="\${args.loading}"
      ?full-width="\${args.fullWidth}"
      type="\${args.type}"
    >
      Primary Button
    </forge-button>
  \`
}`,...(y=(v=t.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var h,x,$;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md'
  },
  render: args => html\`
    <forge-button variant="\${args.variant}" size="\${args.size}">
      Secondary Button
    </forge-button>
  \`
}`,...($=(x=n.parameters)==null?void 0:x.docs)==null?void 0:$.source}}};var M,w,z;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    size: 'md'
  },
  render: args => html\`
    <forge-button variant="\${args.variant}" size="\${args.size}">
      Delete
    </forge-button>
  \`
}`,...(z=(w=o.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var D,S,k;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md'
  },
  render: args => html\`
    <forge-button variant="\${args.variant}" size="\${args.size}">
      Ghost Button
    </forge-button>
  \`
}`,...(k=(S=a.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var A,L,R;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    variant: 'link',
    size: 'md'
  },
  render: args => html\`
    <forge-button variant="\${args.variant}" size="\${args.size}">
      Link Button
    </forge-button>
  \`
}`,...(R=(L=i.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var I,P,B;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 16px; align-items: center;">
      <forge-button size="sm">Small</forge-button>
      <forge-button size="md">Medium</forge-button>
      <forge-button size="lg">Large</forge-button>
    </div>
  \`
}`,...(B=(P=s.parameters)==null?void 0:P.docs)==null?void 0:B.source}}};var V,C,W;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    loading: true,
    variant: 'primary'
  },
  render: args => html\`
    <forge-button variant="\${args.variant}" ?loading="\${args.loading}">
      Loading...
    </forge-button>
  \`
}`,...(W=(C=d.parameters)==null?void 0:C.docs)==null?void 0:W.source}}};var F,O,E;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    disabled: true,
    variant: 'primary'
  },
  render: args => html\`
    <forge-button variant="\${args.variant}" ?disabled="\${args.disabled}">
      Disabled
    </forge-button>
  \`
}`,...(E=(O=g.parameters)==null?void 0:O.docs)==null?void 0:E.source}}};var G,T,U;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    fullWidth: true,
    variant: 'primary'
  },
  render: args => html\`
    <div style="width: 400px;">
      <forge-button variant="\${args.variant}" ?full-width="\${args.fullWidth}">
        Full Width Button
      </forge-button>
    </div>
  \`
}`,...(U=(T=l.parameters)==null?void 0:T.docs)==null?void 0:U.source}}};var _,j,q;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary">Primary</forge-button>
        <forge-button variant="secondary">Secondary</forge-button>
        <forge-button variant="danger">Danger</forge-button>
        <forge-button variant="ghost">Ghost</forge-button>
        <forge-button variant="link">Link</forge-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary" disabled>Primary Disabled</forge-button>
        <forge-button variant="secondary" disabled>Secondary Disabled</forge-button>
        <forge-button variant="danger" disabled>Danger Disabled</forge-button>
        <forge-button variant="ghost" disabled>Ghost Disabled</forge-button>
        <forge-button variant="link" disabled>Link Disabled</forge-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary" loading>Loading</forge-button>
        <forge-button variant="secondary" loading>Loading</forge-button>
        <forge-button variant="danger" loading>Loading</forge-button>
        <forge-button variant="ghost" loading>Loading</forge-button>
        <forge-button variant="link" loading>Loading</forge-button>
      </div>
    </div>
  \`
}`,...(q=(j=m.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};var H,J,K;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: 'AI-Ready Button',
  args: {
    variant: 'primary',
    semanticRole: 'submit-payment',
    aiContext: 'checkout-flow',
    ariaDescription: 'Submit payment form with validated credit card information'
  },
  render: args => html\`
    <forge-button 
      variant="\${args.variant}"
      semantic-role="\${args.semanticRole}"
      ai-context="\${args.aiContext}"
      aria-description="\${args.ariaDescription}">
      Submit Payment
    </forge-button>
    <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata:</strong><br>
      Semantic Role: \${args.semanticRole}<br>
      AI Context: \${args.aiContext}<br>
      ARIA Description: \${args.ariaDescription}
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates AI-ready features with semantic metadata for AI assistants and screen readers.'
      }
    }
  }
}`,...(K=(J=c.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var N,Q,X;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'Performance Monitoring',
  args: {
    variant: 'primary',
    maxRenderMs: 8,
    warnOnViolation: true,
    performanceMode: 'auto',
    devMode: true,
    showMetrics: true
  },
  render: args => html\`
    <forge-button 
      variant="\${args.variant}"
      max-render-ms="\${args.maxRenderMs}"
      ?warn-on-violation="\${args.warnOnViolation}"
      performance-mode="\${args.performanceMode}"
      ?dev-mode="\${args.devMode}"
      ?show-metrics="\${args.showMetrics}">
      Performance Monitored
    </forge-button>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: \${args.maxRenderMs}ms<br>
      Warn on Violation: \${args.warnOnViolation}<br>
      Performance Mode: \${args.performanceMode}<br>
      <em>Check console for performance warnings if render exceeds budget</em>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Shows performance monitoring with budget enforcement and developer metrics.'
      }
    }
  }
}`,...(X=(Q=u.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;p.parameters={...p.parameters,docs:{...(Y=p.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: 'Developer Mode',
  args: {
    variant: 'primary',
    devMode: true,
    showMetrics: true
  },
  render: args => html\`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <forge-button 
        variant="primary"
        ?dev-mode="\${args.devMode}"
        ?show-metrics="\${args.showMetrics}">
        With Metrics
      </forge-button>
      <forge-button 
        variant="secondary"
        size="lg"
        ?dev-mode="\${args.devMode}"
        ?show-metrics="\${args.showMetrics}">
        Large Button
      </forge-button>
      <forge-button 
        variant="danger"
        loading
        ?dev-mode="\${args.devMode}"
        ?show-metrics="\${args.showMetrics}">
        Loading
      </forge-button>
    </div>
    <div style="margin-top: 20px; padding: 16px; background: #ede9fe; border-radius: 8px; font-size: 14px;">
      <strong>Developer Mode Active:</strong><br>
      • Performance metrics overlay visible<br>
      • Console debugging enabled<br>
      • Component state logged<br>
      <em>Open DevTools console to see detailed component state</em>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Developer mode with performance metrics overlay and debugging features.'
      }
    }
  }
}`,...(ee=(Z=p.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var re,te,ne;f.parameters={...f.parameters,docs:{...(re=f.parameters)==null?void 0:re.docs,source:{originalSource:`{
  name: 'Form Integration',
  render: () => html\`
    <form @submit="\${(e: Event) => {
    e.preventDefault();
    alert('Form submitted!');
  }}" style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <input type="text" placeholder="Enter your name" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      <input type="email" placeholder="Enter your email" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      <div style="display: flex; gap: 8px;">
        <forge-button 
          type="submit" 
          variant="primary"
          semantic-role="form-submit"
          ai-context="contact-form">
          Submit
        </forge-button>
        <forge-button 
          type="reset" 
          variant="secondary"
          semantic-role="form-reset"
          ai-context="contact-form">
          Reset
        </forge-button>
      </div>
    </form>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates form integration with submit and reset button types, including AI metadata.'
      }
    }
  }
}`,...(ne=(te=f.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};const se=["Primary","Secondary","Danger","Ghost","Link","Sizes","Loading","Disabled","FullWidth","AllVariants","AIReadyButton","PerformanceMonitoring","DeveloperMode","FormIntegration"];export{c as AIReadyButton,m as AllVariants,o as Danger,p as DeveloperMode,g as Disabled,f as FormIntegration,l as FullWidth,a as Ghost,i as Link,d as Loading,u as PerformanceMonitoring,t as Primary,n as Secondary,s as Sizes,se as __namedExportsOrder,ie as default};
