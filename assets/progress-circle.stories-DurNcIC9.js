import{x as r}from"./iframe-C-1QsWs8.js";import"./preload-helper-C1FmrZbK.js";const R={title:"Components/Atoms/Progress Circle",component:"forge-progress-circle",parameters:{docs:{description:{component:"A circular progress component for showing progress in a compact, circular format. Perfect for upload progress, loading indicators, and completion status."}}},argTypes:{value:{control:{type:"range",min:0,max:100,step:1},description:"The current progress value (0-100)"},max:{control:{type:"number",min:1,max:200,step:1},description:"The maximum progress value"},variant:{control:{type:"select"},options:["primary","secondary","success","warning","danger"],description:"Visual variant of the progress circle"},size:{control:{type:"select"},options:["small","medium","large"],description:"Size of the progress circle"},showLabel:{control:{type:"boolean"},description:"Whether to show the label in the center"},hideLabel:{control:{type:"boolean"},description:"Whether to hide the label (overrides show-label)"},indeterminate:{control:{type:"boolean"},description:"Whether the progress is in indeterminate state (loading without known duration)"},ariaLabel:{control:{type:"text"},description:"Accessible label for the progress circle"}}},a={args:{value:65,max:100,variant:"primary",size:"medium",showLabel:!0,hideLabel:!1,indeterminate:!1,ariaLabel:""},render:e=>r`
    <forge-progress-circle
      value=${e.value}
      max=${e.max}
      variant=${e.variant}
      size=${e.size}
      ?show-label=${e.showLabel}
      ?hide-label=${e.hideLabel}
      ?indeterminate=${e.indeterminate}
      aria-label=${e.ariaLabel||void 0}
    ></forge-progress-circle>
  `},n={args:{value:80,max:100,variant:"success",size:"medium",showLabel:!0,hideLabel:!1,indeterminate:!1},render:e=>r`
    <forge-progress-circle
      value=${e.value}
      max=${e.max}
      variant=${e.variant}
      size=${e.size}
      ?show-label=${e.showLabel}
      ?hide-label=${e.hideLabel}
      ?indeterminate=${e.indeterminate}
    >
      80/100
    </forge-progress-circle>
  `},t={args:{value:45,max:100,variant:"primary",size:"medium",hideLabel:!0,indeterminate:!1},render:e=>r`
    <forge-progress-circle
      value=${e.value}
      max=${e.max}
      variant=${e.variant}
      size=${e.size}
      ?hide-label=${e.hideLabel}
      ?indeterminate=${e.indeterminate}
    ></forge-progress-circle>
  `},o={args:{variant:"primary",size:"medium",indeterminate:!0},render:e=>r`
    <forge-progress-circle
      variant=${e.variant}
      size=${e.size}
      ?indeterminate=${e.indeterminate}
    ></forge-progress-circle>
  `},l={render:()=>r`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <h4>Primary</h4>
        <forge-progress-circle value="50" variant="primary"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Secondary</h4>
        <forge-progress-circle value="60" variant="secondary"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Success</h4>
        <forge-progress-circle value="80" variant="success"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Warning</h4>
        <forge-progress-circle value="40" variant="warning"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Danger</h4>
        <forge-progress-circle value="25" variant="danger"></forge-progress-circle>
      </div>
    </div>
  `},p={render:()=>r`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <h4>Small</h4>
        <forge-progress-circle value="75" size="small"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Medium</h4>
        <forge-progress-circle value="75" size="medium"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Large</h4>
        <forge-progress-circle value="75" size="large"></forge-progress-circle>
      </div>
    </div>
  `},c={render:()=>r`
      <div style="text-align: center; max-width: 300px;">
        <h4>File Upload Progress</h4>
        <forge-progress-circle 
          id="upload-progress-circle"
          value="0" 
          variant="primary"
          size="large"
          aria-label="File upload progress"
        ></forge-progress-circle>
        
        <p style="margin-top: 16px; color: var(--forge-color-text-secondary, #6b7280);">
          Click to simulate upload progress
        </p>
        
        <button 
          @click=${()=>{const i=document.querySelector("#upload-progress-circle");if(i){let s=i.value||0;s+=12,s>100&&(s=0),i.updateProgress(s),s===100?(i.variant="success",i.innerHTML="✓"):(i.variant="primary",i.innerHTML="")}}}
          style="margin-top: 8px; padding: 8px 16px; background: var(--forge-color-primary-500, #3b82f6); color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Start Upload
        </button>
      </div>
    `},g={render:()=>r`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px; max-width: 600px;">
      <div style="text-align: center; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
        <forge-progress-circle value="87" variant="success" size="medium">87%</forge-progress-circle>
        <h4 style="margin: 8px 0 4px 0; font-size: 14px; font-weight: 600;">Test Coverage</h4>
        <p style="margin: 0; font-size: 12px; color: var(--forge-color-text-secondary, #6b7280);">Good</p>
      </div>
      
      <div style="text-align: center; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
        <forge-progress-circle value="92" variant="primary" size="medium">92%</forge-progress-circle>
        <h4 style="margin: 8px 0 4px 0; font-size: 14px; font-weight: 600;">Build Success</h4>
        <p style="margin: 0; font-size: 12px; color: var(--forge-color-text-secondary, #6b7280);">Excellent</p>
      </div>
      
      <div style="text-align: center; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
        <forge-progress-circle value="68" variant="warning" size="medium">68%</forge-progress-circle>
        <h4 style="margin: 8px 0 4px 0; font-size: 14px; font-weight: 600;">Performance</h4>
        <p style="margin: 0; font-size: 12px; color: var(--forge-color-text-secondary, #6b7280);">Needs Work</p>
      </div>
      
      <div style="text-align: center; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
        <forge-progress-circle value="34" variant="danger" size="medium">34%</forge-progress-circle>
        <h4 style="margin: 8px 0 4px 0; font-size: 14px; font-weight: 600;">Security</h4>
        <p style="margin: 0; font-size: 12px; color: var(--forge-color-text-secondary, #6b7280);">Critical</p>
      </div>
    </div>
  `},d={render:()=>r`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <forge-progress-circle value="0" variant="secondary" size="medium">0%</forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Not Started</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="25" variant="warning" size="medium">25%</forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">In Progress</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="75" variant="primary" size="medium">75%</forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Almost Done</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="100" variant="success" size="medium">✓</forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Complete</p>
      </div>
    </div>
  `},m={render:()=>r`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <forge-progress-circle indeterminate variant="primary" size="small"></forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Loading Small</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle indeterminate variant="primary" size="medium"></forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Loading Medium</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle indeterminate variant="primary" size="large"></forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Loading Large</p>
      </div>
    </div>
  `},v={render:()=>r`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <forge-progress-circle value="45" variant="primary" size="large">
          <div style="font-size: 12px; line-height: 1.2;">
            <div style="font-weight: 600;">45</div>
            <div style="font-size: 10px; color: var(--forge-color-text-secondary, #6b7280);">of 100</div>
          </div>
        </forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Multi-line Label</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="100" variant="success" size="large">
          <div style="font-size: 20px;">✓</div>
        </forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Success Icon</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="15" variant="danger" size="large">
          <div style="font-size: 20px;">⚠</div>
        </forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Warning Icon</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="80" variant="primary" size="large">
          <div style="font-size: 10px; text-align: center; line-height: 1.2;">
            <div>4 of 5</div>
            <div>tasks</div>
          </div>
        </forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Task Counter</p>
      </div>
    </div>
  `};var x,f,u;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    value: 65,
    max: 100,
    variant: 'primary',
    size: 'medium',
    showLabel: true,
    hideLabel: false,
    indeterminate: false,
    ariaLabel: ''
  },
  render: args => html\`
    <forge-progress-circle
      value=\${args.value}
      max=\${args.max}
      variant=\${args.variant}
      size=\${args.size}
      ?show-label=\${args.showLabel}
      ?hide-label=\${args.hideLabel}
      ?indeterminate=\${args.indeterminate}
      aria-label=\${args.ariaLabel || undefined}
    ></forge-progress-circle>
  \`
}`,...(u=(f=a.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var y,h,b;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    value: 80,
    max: 100,
    variant: 'success',
    size: 'medium',
    showLabel: true,
    hideLabel: false,
    indeterminate: false
  },
  render: args => html\`
    <forge-progress-circle
      value=\${args.value}
      max=\${args.max}
      variant=\${args.variant}
      size=\${args.size}
      ?show-label=\${args.showLabel}
      ?hide-label=\${args.hideLabel}
      ?indeterminate=\${args.indeterminate}
    >
      80/100
    </forge-progress-circle>
  \`
}`,...(b=(h=n.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var z,w,$;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    value: 45,
    max: 100,
    variant: 'primary',
    size: 'medium',
    hideLabel: true,
    indeterminate: false
  },
  render: args => html\`
    <forge-progress-circle
      value=\${args.value}
      max=\${args.max}
      variant=\${args.variant}
      size=\${args.size}
      ?hide-label=\${args.hideLabel}
      ?indeterminate=\${args.indeterminate}
    ></forge-progress-circle>
  \`
}`,...($=(w=t.parameters)==null?void 0:w.docs)==null?void 0:$.source}}};var L,S,C;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'medium',
    indeterminate: true
  },
  render: args => html\`
    <forge-progress-circle
      variant=\${args.variant}
      size=\${args.size}
      ?indeterminate=\${args.indeterminate}
    ></forge-progress-circle>
  \`
}`,...(C=(S=o.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var P,M,k;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <h4>Primary</h4>
        <forge-progress-circle value="50" variant="primary"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Secondary</h4>
        <forge-progress-circle value="60" variant="secondary"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Success</h4>
        <forge-progress-circle value="80" variant="success"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Warning</h4>
        <forge-progress-circle value="40" variant="warning"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Danger</h4>
        <forge-progress-circle value="25" variant="danger"></forge-progress-circle>
      </div>
    </div>
  \`
}`,...(k=(M=l.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var T,V,W;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <h4>Small</h4>
        <forge-progress-circle value="75" size="small"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Medium</h4>
        <forge-progress-circle value="75" size="medium"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Large</h4>
        <forge-progress-circle value="75" size="large"></forge-progress-circle>
      </div>
    </div>
  \`
}`,...(W=(V=p.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var I,A,D;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const updateProgress = () => {
      const progressCircle = document.querySelector('#upload-progress-circle') as any;
      if (progressCircle) {
        let currentValue = progressCircle.value || 0;
        currentValue += 12;
        if (currentValue > 100) currentValue = 0;
        progressCircle.updateProgress(currentValue);
        if (currentValue === 100) {
          progressCircle.variant = 'success';
          progressCircle.innerHTML = '✓';
        } else if (currentValue === 0) {
          progressCircle.variant = 'primary';
          progressCircle.innerHTML = '';
        } else {
          progressCircle.variant = 'primary';
          progressCircle.innerHTML = '';
        }
      }
    };
    return html\`
      <div style="text-align: center; max-width: 300px;">
        <h4>File Upload Progress</h4>
        <forge-progress-circle 
          id="upload-progress-circle"
          value="0" 
          variant="primary"
          size="large"
          aria-label="File upload progress"
        ></forge-progress-circle>
        
        <p style="margin-top: 16px; color: var(--forge-color-text-secondary, #6b7280);">
          Click to simulate upload progress
        </p>
        
        <button 
          @click=\${updateProgress}
          style="margin-top: 8px; padding: 8px 16px; background: var(--forge-color-primary-500, #3b82f6); color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Start Upload
        </button>
      </div>
    \`;
  }
}`,...(D=(A=c.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var H,N,U;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px; max-width: 600px;">
      <div style="text-align: center; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
        <forge-progress-circle value="87" variant="success" size="medium">87%</forge-progress-circle>
        <h4 style="margin: 8px 0 4px 0; font-size: 14px; font-weight: 600;">Test Coverage</h4>
        <p style="margin: 0; font-size: 12px; color: var(--forge-color-text-secondary, #6b7280);">Good</p>
      </div>
      
      <div style="text-align: center; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
        <forge-progress-circle value="92" variant="primary" size="medium">92%</forge-progress-circle>
        <h4 style="margin: 8px 0 4px 0; font-size: 14px; font-weight: 600;">Build Success</h4>
        <p style="margin: 0; font-size: 12px; color: var(--forge-color-text-secondary, #6b7280);">Excellent</p>
      </div>
      
      <div style="text-align: center; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
        <forge-progress-circle value="68" variant="warning" size="medium">68%</forge-progress-circle>
        <h4 style="margin: 8px 0 4px 0; font-size: 14px; font-weight: 600;">Performance</h4>
        <p style="margin: 0; font-size: 12px; color: var(--forge-color-text-secondary, #6b7280);">Needs Work</p>
      </div>
      
      <div style="text-align: center; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
        <forge-progress-circle value="34" variant="danger" size="medium">34%</forge-progress-circle>
        <h4 style="margin: 8px 0 4px 0; font-size: 14px; font-weight: 600;">Security</h4>
        <p style="margin: 0; font-size: 12px; color: var(--forge-color-text-secondary, #6b7280);">Critical</p>
      </div>
    </div>
  \`
}`,...(U=(N=g.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};var E,F,q;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <forge-progress-circle value="0" variant="secondary" size="medium">0%</forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Not Started</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="25" variant="warning" size="medium">25%</forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">In Progress</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="75" variant="primary" size="medium">75%</forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Almost Done</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="100" variant="success" size="medium">✓</forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Complete</p>
      </div>
    </div>
  \`
}`,...(q=(F=d.parameters)==null?void 0:F.docs)==null?void 0:q.source}}};var B,G,_;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <forge-progress-circle indeterminate variant="primary" size="small"></forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Loading Small</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle indeterminate variant="primary" size="medium"></forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Loading Medium</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle indeterminate variant="primary" size="large"></forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Loading Large</p>
      </div>
    </div>
  \`
}`,...(_=(G=m.parameters)==null?void 0:G.docs)==null?void 0:_.source}}};var O,j,J;v.parameters={...v.parameters,docs:{...(O=v.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <forge-progress-circle value="45" variant="primary" size="large">
          <div style="font-size: 12px; line-height: 1.2;">
            <div style="font-weight: 600;">45</div>
            <div style="font-size: 10px; color: var(--forge-color-text-secondary, #6b7280);">of 100</div>
          </div>
        </forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Multi-line Label</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="100" variant="success" size="large">
          <div style="font-size: 20px;">✓</div>
        </forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Success Icon</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="15" variant="danger" size="large">
          <div style="font-size: 20px;">⚠</div>
        </forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Warning Icon</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="80" variant="primary" size="large">
          <div style="font-size: 10px; text-align: center; line-height: 1.2;">
            <div>4 of 5</div>
            <div>tasks</div>
          </div>
        </forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Task Counter</p>
      </div>
    </div>
  \`
}`,...(J=(j=v.parameters)==null?void 0:j.docs)==null?void 0:J.source}}};const X=["Default","WithCustomLabel","NoLabel","Indeterminate","AllVariants","AllSizes","UploadProgressExample","DashboardMetrics","CompletionStates","IndeterminateStates","CustomContent"];export{p as AllSizes,l as AllVariants,d as CompletionStates,v as CustomContent,g as DashboardMetrics,a as Default,o as Indeterminate,m as IndeterminateStates,t as NoLabel,c as UploadProgressExample,n as WithCustomLabel,X as __namedExportsOrder,R as default};
