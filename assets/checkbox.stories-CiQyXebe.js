import{x as o}from"./iframe-DiJym064.js";import"./preload-helper-C1FmrZbK.js";const le={title:"Atoms/Checkbox",component:"forge-checkbox",tags:["autodocs"],argTypes:{checked:{control:{type:"boolean"},description:"Checked state",defaultValue:!1},indeterminate:{control:{type:"boolean"},description:"Indeterminate state",defaultValue:!1},disabled:{control:{type:"boolean"},description:"Disabled state",defaultValue:!1},required:{control:{type:"boolean"},description:"Required field",defaultValue:!1},error:{control:{type:"boolean"},description:"Error state",defaultValue:!1},label:{control:{type:"text"},description:"Checkbox label"},description:{control:{type:"text"},description:"Helper text below label"},size:{control:{type:"select"},options:["sm","md","lg"],description:"Checkbox size",defaultValue:"md"},variant:{control:{type:"select"},options:["default","filled","outlined"],description:"Visual variant",defaultValue:"default"},labelPosition:{control:{type:"select"},options:["start","end"],description:"Label position relative to checkbox",defaultValue:"end"},name:{control:{type:"text"},description:"Form field name"},value:{control:{type:"text"},description:"Form field value when checked",defaultValue:"on"},semanticRole:{control:{type:"text"},description:"Semantic role for AI understanding"},aiContext:{control:{type:"text"},description:"Context for AI assistants"},maxRenderMs:{control:{type:"number"},description:"Maximum render time in milliseconds",defaultValue:16},warnOnViolation:{control:{type:"boolean"},description:"Warn on performance violations",defaultValue:!1},performanceMode:{control:{type:"select"},options:["auto","fast","normal"],description:"Performance mode setting",defaultValue:"auto"},devMode:{control:{type:"boolean"},description:"Enable development mode",defaultValue:!1},showMetrics:{control:{type:"boolean"},description:"Show performance metrics",defaultValue:!1}},parameters:{docs:{description:{component:`
The ForgeCheckbox component is a customizable checkbox with support for indeterminate state, validation, and multiple visual variants.

## Features
- Three states: unchecked, checked, indeterminate
- Three visual variants (default, filled, outlined)
- Three sizes (sm, md, lg)
- Label positioning (start/end)
- Helper text support
- Error state for validation
- Required field indicator
- Keyboard navigation (Space/Enter)
- **AI-Ready**: Semantic roles and context for AI assistants
- **Performance Monitoring**: Self-monitoring with budget enforcement
- **Developer Mode**: Built-in metrics and debugging
- **Accessibility**: ARIA attributes, keyboard support

## Usage

### Basic Usage
\`\`\`html
<forge-checkbox label="I agree to the terms"></forge-checkbox>
\`\`\`

### With Description
\`\`\`html
<forge-checkbox 
  label="Subscribe to newsletter"
  description="Get weekly updates about new features">
</forge-checkbox>
\`\`\`

### Indeterminate State
\`\`\`html
<forge-checkbox 
  label="Select all"
  indeterminate>
</forge-checkbox>
\`\`\`

### Form Integration
\`\`\`html
<form>
  <forge-checkbox 
    name="terms"
    value="accepted"
    required
    label="Accept terms and conditions">
  </forge-checkbox>
</form>
\`\`\`

### AI-Ready Checkbox
\`\`\`html
<forge-checkbox 
  label="Marketing consent"
  semantic-role="marketing-opt-in"
  ai-context="user-preferences">
</forge-checkbox>
\`\`\`
        `}}}},a={render:e=>o`
    <forge-checkbox
      ?checked="${e.checked}"
      ?indeterminate="${e.indeterminate}"
      ?disabled="${e.disabled}"
      ?required="${e.required}"
      ?error="${e.error}"
      label="${e.label||"Checkbox label"}"
      description="${e.description||""}"
      size="${e.size}"
      variant="${e.variant}"
      label-position="${e.labelPosition}"
      name="${e.name||""}"
      value="${e.value}"
    ></forge-checkbox>
  `},l={render:()=>o`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-checkbox label="Unchecked"></forge-checkbox>
      <forge-checkbox label="Checked" checked></forge-checkbox>
      <forge-checkbox label="Indeterminate" indeterminate></forge-checkbox>
      <forge-checkbox label="Disabled" disabled></forge-checkbox>
      <forge-checkbox label="Disabled Checked" disabled checked></forge-checkbox>
      <forge-checkbox label="Error state" error></forge-checkbox>
    </div>
  `},i={render:()=>o`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-checkbox size="sm" label="Small checkbox"></forge-checkbox>
      <forge-checkbox size="md" label="Medium checkbox (default)"></forge-checkbox>
      <forge-checkbox size="lg" label="Large checkbox"></forge-checkbox>
    </div>
  `},s={render:()=>o`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Default Variant</h3>
        <div style="display: flex; gap: 16px;">
          <forge-checkbox variant="default" label="Unchecked"></forge-checkbox>
          <forge-checkbox variant="default" label="Checked" checked></forge-checkbox>
          <forge-checkbox variant="default" label="Indeterminate" indeterminate></forge-checkbox>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Filled Variant</h3>
        <div style="display: flex; gap: 16px;">
          <forge-checkbox variant="filled" label="Unchecked"></forge-checkbox>
          <forge-checkbox variant="filled" label="Checked" checked></forge-checkbox>
          <forge-checkbox variant="filled" label="Indeterminate" indeterminate></forge-checkbox>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Outlined Variant</h3>
        <div style="display: flex; gap: 16px;">
          <forge-checkbox variant="outlined" label="Unchecked"></forge-checkbox>
          <forge-checkbox variant="outlined" label="Checked" checked></forge-checkbox>
          <forge-checkbox variant="outlined" label="Indeterminate" indeterminate></forge-checkbox>
        </div>
      </div>
    </div>
  `},d={render:()=>o`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <forge-checkbox 
        label="Enable notifications"
        description="Receive email updates about your account">
      </forge-checkbox>
      
      <forge-checkbox 
        label="Auto-save"
        description="Automatically save your work every 5 minutes"
        checked>
      </forge-checkbox>
      
      <forge-checkbox 
        label="Developer mode"
        description="Enable advanced features and debugging tools">
      </forge-checkbox>
    </div>
  `},b={render:()=>o`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-checkbox 
        label="Label on the right (default)"
        label-position="end">
      </forge-checkbox>
      
      <forge-checkbox 
        label="Label on the left"
        label-position="start">
      </forge-checkbox>
      
      <forge-checkbox 
        label="With description on the left"
        description="Additional information"
        label-position="start">
      </forge-checkbox>
    </div>
  `},h={render:()=>o`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-checkbox 
        label="I accept the terms and conditions"
        required>
      </forge-checkbox>
      
      <forge-checkbox 
        label="I agree to receive marketing emails"
        description="You can unsubscribe at any time"
        required>
      </forge-checkbox>
    </div>
  `},f={name:"Checkbox Group",render:()=>o`
    <fieldset style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
      <legend style="padding: 0 8px; font-weight: 600;">Select your interests</legend>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <forge-checkbox 
          name="interests"
          value="technology"
          label="Technology"
          semantic-role="interest-selection"
          ai-context="user-preferences">
        </forge-checkbox>
        <forge-checkbox 
          name="interests"
          value="design"
          label="Design"
          semantic-role="interest-selection"
          ai-context="user-preferences">
        </forge-checkbox>
        <forge-checkbox 
          name="interests"
          value="business"
          label="Business"
          semantic-role="interest-selection"
          ai-context="user-preferences">
        </forge-checkbox>
        <forge-checkbox 
          name="interests"
          value="marketing"
          label="Marketing"
          semantic-role="interest-selection"
          ai-context="user-preferences">
        </forge-checkbox>
      </div>
    </fieldset>
  `},x={name:"Indeterminate State (Select All)",render:()=>{const e=n=>{const r=n.target,t=document.querySelectorAll(".child-checkbox");r.indeterminate&&(r.indeterminate=!1,r.checked=!0),t.forEach(k=>{k.checked=r.checked})},c=()=>{const n=document.querySelector(".select-all"),r=document.querySelectorAll(".child-checkbox"),t=Array.from(r).filter(k=>k.checked).length;t===0?(n.checked=!1,n.indeterminate=!1):t===r.length?(n.checked=!0,n.indeterminate=!1):(n.checked=!1,n.indeterminate=!0)};return o`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <forge-checkbox 
          class="select-all"
          label="Select all"
          @change="${e}">
        </forge-checkbox>
        <div style="margin-left: 24px; display: flex; flex-direction: column; gap: 8px;">
          <forge-checkbox 
            class="child-checkbox"
            label="Option 1"
            @change="${c}">
          </forge-checkbox>
          <forge-checkbox 
            class="child-checkbox"
            label="Option 2"
            @change="${c}">
          </forge-checkbox>
          <forge-checkbox 
            class="child-checkbox"
            label="Option 3"
            @change="${c}">
          </forge-checkbox>
        </div>
      </div>
    `}},p={name:"Form Integration",render:()=>o`
    <form @submit="${e=>{e.preventDefault(),alert("Form submitted!")}}" 
          style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <h3 style="margin: 0;">User Preferences</h3>
      
      <forge-checkbox 
        name="newsletter"
        value="yes"
        label="Subscribe to newsletter"
        description="Get updates about new features and products">
      </forge-checkbox>
      
      <forge-checkbox 
        name="marketing"
        value="yes"
        label="Marketing communications"
        description="Receive promotional offers and discounts">
      </forge-checkbox>
      
      <forge-checkbox 
        name="analytics"
        value="yes"
        label="Help improve our services"
        description="Share anonymous usage data"
        checked>
      </forge-checkbox>
      
      <forge-checkbox 
        name="terms"
        value="accepted"
        label="I accept the terms and conditions"
        required
        error>
      </forge-checkbox>
      
      <forge-button type="submit" variant="primary">
        Save Preferences
      </forge-button>
    </form>
  `},g={name:"AI-Ready Checkbox",render:()=>o`
    <forge-checkbox 
      label="Enable AI assistance"
      description="Allow AI to help with form completion and suggestions"
      semantic-role="ai-consent"
      ai-context="user-settings"
      aria-description="Checkbox to enable or disable AI-powered features"
      checked>
    </forge-checkbox>
    <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata:</strong><br>
      Semantic Role: ai-consent<br>
      AI Context: user-settings<br>
      ARIA Description: Checkbox to enable or disable AI-powered features
    </div>
  `},m={name:"Performance Monitoring",render:()=>o`
    <forge-checkbox 
      label="Performance monitored checkbox"
      description="This checkbox tracks render performance"
      max-render-ms="8"
      warn-on-violation
      performance-mode="auto"
      dev-mode
      show-metrics>
    </forge-checkbox>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: 8ms<br>
      Warnings: Enabled<br>
      Mode: Auto<br>
      <em>Check console for performance logs</em>
    </div>
  `},u={name:"Interactive Demo",render:()=>{const e=c=>{const n=c.detail,r=document.querySelector("#output");r&&(r.textContent=JSON.stringify(n,null,2))};return o`
      <div style="display: flex; gap: 40px;">
        <div style="flex: 1;">
          <h3 style="margin-top: 0;">Try the checkboxes</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <forge-checkbox 
              label="Option A"
              value="a"
              @change="${e}">
            </forge-checkbox>
            <forge-checkbox 
              label="Option B"
              value="b"
              @change="${e}">
            </forge-checkbox>
            <forge-checkbox 
              label="Option C"
              value="c"
              @change="${e}">
            </forge-checkbox>
          </div>
        </div>
        <div style="flex: 1;">
          <h3 style="margin-top: 0;">Event Output</h3>
          <pre id="output" style="background: #f3f4f6; padding: 12px; border-radius: 4px; min-height: 100px;">
// Click a checkbox to see event data
          </pre>
        </div>
      </div>
    `}};var v,y,A;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => html\`
    <forge-checkbox
      ?checked="\${args.checked}"
      ?indeterminate="\${args.indeterminate}"
      ?disabled="\${args.disabled}"
      ?required="\${args.required}"
      ?error="\${args.error}"
      label="\${args.label || 'Checkbox label'}"
      description="\${args.description || ''}"
      size="\${args.size}"
      variant="\${args.variant}"
      label-position="\${args.labelPosition}"
      name="\${args.name || ''}"
      value="\${args.value}"
    ></forge-checkbox>
  \`
}`,...(A=(y=a.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var C,S,I;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-checkbox label="Unchecked"></forge-checkbox>
      <forge-checkbox label="Checked" checked></forge-checkbox>
      <forge-checkbox label="Indeterminate" indeterminate></forge-checkbox>
      <forge-checkbox label="Disabled" disabled></forge-checkbox>
      <forge-checkbox label="Disabled Checked" disabled checked></forge-checkbox>
      <forge-checkbox label="Error state" error></forge-checkbox>
    </div>
  \`
}`,...(I=(S=l.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var w,$,E;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-checkbox size="sm" label="Small checkbox"></forge-checkbox>
      <forge-checkbox size="md" label="Medium checkbox (default)"></forge-checkbox>
      <forge-checkbox size="lg" label="Large checkbox"></forge-checkbox>
    </div>
  \`
}`,...(E=($=i.parameters)==null?void 0:$.docs)==null?void 0:E.source}}};var z,D,q;s.parameters={...s.parameters,docs:{...(z=s.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Default Variant</h3>
        <div style="display: flex; gap: 16px;">
          <forge-checkbox variant="default" label="Unchecked"></forge-checkbox>
          <forge-checkbox variant="default" label="Checked" checked></forge-checkbox>
          <forge-checkbox variant="default" label="Indeterminate" indeterminate></forge-checkbox>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Filled Variant</h3>
        <div style="display: flex; gap: 16px;">
          <forge-checkbox variant="filled" label="Unchecked"></forge-checkbox>
          <forge-checkbox variant="filled" label="Checked" checked></forge-checkbox>
          <forge-checkbox variant="filled" label="Indeterminate" indeterminate></forge-checkbox>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Outlined Variant</h3>
        <div style="display: flex; gap: 16px;">
          <forge-checkbox variant="outlined" label="Unchecked"></forge-checkbox>
          <forge-checkbox variant="outlined" label="Checked" checked></forge-checkbox>
          <forge-checkbox variant="outlined" label="Indeterminate" indeterminate></forge-checkbox>
        </div>
      </div>
    </div>
  \`
}`,...(q=(D=s.parameters)==null?void 0:D.docs)==null?void 0:q.source}}};var M,V,R;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <forge-checkbox 
        label="Enable notifications"
        description="Receive email updates about your account">
      </forge-checkbox>
      
      <forge-checkbox 
        label="Auto-save"
        description="Automatically save your work every 5 minutes"
        checked>
      </forge-checkbox>
      
      <forge-checkbox 
        label="Developer mode"
        description="Enable advanced features and debugging tools">
      </forge-checkbox>
    </div>
  \`
}`,...(R=(V=d.parameters)==null?void 0:V.docs)==null?void 0:R.source}}};var O,P,F;b.parameters={...b.parameters,docs:{...(O=b.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-checkbox 
        label="Label on the right (default)"
        label-position="end">
      </forge-checkbox>
      
      <forge-checkbox 
        label="Label on the left"
        label-position="start">
      </forge-checkbox>
      
      <forge-checkbox 
        label="With description on the left"
        description="Additional information"
        label-position="start">
      </forge-checkbox>
    </div>
  \`
}`,...(F=(P=b.parameters)==null?void 0:P.docs)==null?void 0:F.source}}};var L,U,T;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-checkbox 
        label="I accept the terms and conditions"
        required>
      </forge-checkbox>
      
      <forge-checkbox 
        label="I agree to receive marketing emails"
        description="You can unsubscribe at any time"
        required>
      </forge-checkbox>
    </div>
  \`
}`,...(T=(U=h.parameters)==null?void 0:U.docs)==null?void 0:T.source}}};var W,G,B;f.parameters={...f.parameters,docs:{...(W=f.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: 'Checkbox Group',
  render: () => html\`
    <fieldset style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
      <legend style="padding: 0 8px; font-weight: 600;">Select your interests</legend>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <forge-checkbox 
          name="interests"
          value="technology"
          label="Technology"
          semantic-role="interest-selection"
          ai-context="user-preferences">
        </forge-checkbox>
        <forge-checkbox 
          name="interests"
          value="design"
          label="Design"
          semantic-role="interest-selection"
          ai-context="user-preferences">
        </forge-checkbox>
        <forge-checkbox 
          name="interests"
          value="business"
          label="Business"
          semantic-role="interest-selection"
          ai-context="user-preferences">
        </forge-checkbox>
        <forge-checkbox 
          name="interests"
          value="marketing"
          label="Marketing"
          semantic-role="interest-selection"
          ai-context="user-preferences">
        </forge-checkbox>
      </div>
    </fieldset>
  \`
}`,...(B=(G=f.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};var H,N,J;x.parameters={...x.parameters,docs:{...(H=x.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: 'Indeterminate State (Select All)',
  render: () => {
    const handleSelectAll = (e: Event) => {
      const selectAll = e.target as ForgeCheckbox;
      const checkboxes = document.querySelectorAll('.child-checkbox') as NodeListOf<ForgeCheckbox>;
      if (selectAll.indeterminate) {
        selectAll.indeterminate = false;
        selectAll.checked = true;
      }
      checkboxes.forEach(cb => {
        cb.checked = selectAll.checked;
      });
    };
    const handleChildChange = () => {
      const selectAll = document.querySelector('.select-all') as ForgeCheckbox;
      const checkboxes = document.querySelectorAll('.child-checkbox') as NodeListOf<ForgeCheckbox>;
      const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
      if (checkedCount === 0) {
        selectAll.checked = false;
        selectAll.indeterminate = false;
      } else if (checkedCount === checkboxes.length) {
        selectAll.checked = true;
        selectAll.indeterminate = false;
      } else {
        selectAll.checked = false;
        selectAll.indeterminate = true;
      }
    };
    return html\`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <forge-checkbox 
          class="select-all"
          label="Select all"
          @change="\${handleSelectAll}">
        </forge-checkbox>
        <div style="margin-left: 24px; display: flex; flex-direction: column; gap: 8px;">
          <forge-checkbox 
            class="child-checkbox"
            label="Option 1"
            @change="\${handleChildChange}">
          </forge-checkbox>
          <forge-checkbox 
            class="child-checkbox"
            label="Option 2"
            @change="\${handleChildChange}">
          </forge-checkbox>
          <forge-checkbox 
            class="child-checkbox"
            label="Option 3"
            @change="\${handleChildChange}">
          </forge-checkbox>
        </div>
      </div>
    \`;
  }
}`,...(J=(N=x.parameters)==null?void 0:N.docs)==null?void 0:J.source}}};var Y,_,K;p.parameters={...p.parameters,docs:{...(Y=p.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: 'Form Integration',
  render: () => html\`
    <form @submit="\${(e: Event) => {
    e.preventDefault();
    alert('Form submitted!');
  }}" 
          style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <h3 style="margin: 0;">User Preferences</h3>
      
      <forge-checkbox 
        name="newsletter"
        value="yes"
        label="Subscribe to newsletter"
        description="Get updates about new features and products">
      </forge-checkbox>
      
      <forge-checkbox 
        name="marketing"
        value="yes"
        label="Marketing communications"
        description="Receive promotional offers and discounts">
      </forge-checkbox>
      
      <forge-checkbox 
        name="analytics"
        value="yes"
        label="Help improve our services"
        description="Share anonymous usage data"
        checked>
      </forge-checkbox>
      
      <forge-checkbox 
        name="terms"
        value="accepted"
        label="I accept the terms and conditions"
        required
        error>
      </forge-checkbox>
      
      <forge-button type="submit" variant="primary">
        Save Preferences
      </forge-button>
    </form>
  \`
}`,...(K=(_=p.parameters)==null?void 0:_.docs)==null?void 0:K.source}}};var j,Q,X;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: 'AI-Ready Checkbox',
  render: () => html\`
    <forge-checkbox 
      label="Enable AI assistance"
      description="Allow AI to help with form completion and suggestions"
      semantic-role="ai-consent"
      ai-context="user-settings"
      aria-description="Checkbox to enable or disable AI-powered features"
      checked>
    </forge-checkbox>
    <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata:</strong><br>
      Semantic Role: ai-consent<br>
      AI Context: user-settings<br>
      ARIA Description: Checkbox to enable or disable AI-powered features
    </div>
  \`
}`,...(X=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,oe;m.parameters={...m.parameters,docs:{...(Z=m.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  name: 'Performance Monitoring',
  render: () => html\`
    <forge-checkbox 
      label="Performance monitored checkbox"
      description="This checkbox tracks render performance"
      max-render-ms="8"
      warn-on-violation
      performance-mode="auto"
      dev-mode
      show-metrics>
    </forge-checkbox>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: 8ms<br>
      Warnings: Enabled<br>
      Mode: Auto<br>
      <em>Check console for performance logs</em>
    </div>
  \`
}`,...(oe=(ee=m.parameters)==null?void 0:ee.docs)==null?void 0:oe.source}}};var ne,re,ce;u.parameters={...u.parameters,docs:{...(ne=u.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  name: 'Interactive Demo',
  render: () => {
    const handleChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const output = document.querySelector('#output');
      if (output) {
        output.textContent = JSON.stringify(detail, null, 2);
      }
    };
    return html\`
      <div style="display: flex; gap: 40px;">
        <div style="flex: 1;">
          <h3 style="margin-top: 0;">Try the checkboxes</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <forge-checkbox 
              label="Option A"
              value="a"
              @change="\${handleChange}">
            </forge-checkbox>
            <forge-checkbox 
              label="Option B"
              value="b"
              @change="\${handleChange}">
            </forge-checkbox>
            <forge-checkbox 
              label="Option C"
              value="c"
              @change="\${handleChange}">
            </forge-checkbox>
          </div>
        </div>
        <div style="flex: 1;">
          <h3 style="margin-top: 0;">Event Output</h3>
          <pre id="output" style="background: #f3f4f6; padding: 12px; border-radius: 4px; min-height: 100px;">
// Click a checkbox to see event data
          </pre>
        </div>
      </div>
    \`;
  }
}`,...(ce=(re=u.parameters)==null?void 0:re.docs)==null?void 0:ce.source}}};const ie=["Default","States","Sizes","Variants","WithDescription","LabelPosition","Required","CheckboxGroup","IndeterminateExample","FormExample","AIReadyCheckbox","PerformanceMonitoring","InteractiveDemo"];export{g as AIReadyCheckbox,f as CheckboxGroup,a as Default,p as FormExample,x as IndeterminateExample,u as InteractiveDemo,b as LabelPosition,m as PerformanceMonitoring,h as Required,i as Sizes,l as States,s as Variants,d as WithDescription,ie as __namedExportsOrder,le as default};
