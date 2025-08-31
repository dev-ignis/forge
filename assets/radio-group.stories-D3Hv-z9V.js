import{x as b}from"./iframe-DCJe_mAx.js";import"./preload-helper-C1FmrZbK.js";var v=Object.freeze,ne=Object.defineProperty,le=(e,ae)=>v(ne(e,"raw",{value:v(ae||e.slice())})),f;const pe={title:"Atoms/RadioGroup",component:"forge-radio-group",tags:["autodocs"],argTypes:{value:{control:"select",options:["","small","medium","large","xl"],description:"Currently selected value"},orientation:{control:"radio",options:["vertical","horizontal"],description:"Layout orientation of radio options"},labelPosition:{control:"radio",options:["start","end"],description:"Position of labels relative to radio controls"},size:{control:"radio",options:["sm","md","lg"],description:"Size of radio controls"},disabled:{control:"boolean",description:"Disable all radio options"},required:{control:"boolean",description:"Mark field as required"},error:{control:"boolean",description:"Show error state"},errorMessage:{control:"text",description:"Error message to display"},label:{control:"text",description:"Group label"},description:{control:"text",description:"Group description"},devMode:{control:"boolean",description:"Enable developer mode",table:{category:"Developer"}},showMetrics:{control:"boolean",description:"Show performance metrics",table:{category:"Developer"}}},parameters:{docs:{description:{component:`
# ForgeRadioGroup Component

A fully accessible radio group component that allows users to select a single option from multiple choices.

## Features
- **Single Selection**: Enforces one selection at a time
- **Keyboard Navigation**: Full arrow key support with Home/End keys
- **Flexible Layout**: Horizontal and vertical orientations
- **Label Positioning**: Start or end positioning for labels
- **Size Variants**: Small, medium, and large sizes
- **Validation**: Built-in required field validation
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **AI-Ready**: ADR-014 compliant with semantic metadata
- **Performance Monitoring**: Built-in performance tracking

## Usage

\`\`\`javascript
const radioGroup = document.querySelector('forge-radio-group');
radioGroup.options = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' }
];

radioGroup.addEventListener('forge-change', (e) => {
  console.log('Selected:', e.detail.value);
});
\`\`\`

## Keyboard Support
- **Arrow Down/Right**: Select next option
- **Arrow Up/Left**: Select previous option
- **Home**: Select first option
- **End**: Select last option
- **Space/Enter**: Select focused option

## Theming
The component uses CSS custom properties for theming:
- \`--forge-color-primary\`: Primary color for selected state
- \`--forge-color-border\`: Border color for unselected state
- \`--forge-color-error\`: Error state color
- \`--forge-spacing-*\`: Spacing between options
        `}}}},ie=[{value:"small",label:"Small",description:"Compact size for limited space"},{value:"medium",label:"Medium",description:"Default size for most uses"},{value:"large",label:"Large",description:"Larger size for better visibility"},{value:"xl",label:"Extra Large",description:"Maximum size for emphasis",disabled:!0}],o=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"}],te=[{value:"basic",label:"Basic Plan",description:"$9.99/month - Essential features"},{value:"pro",label:"Pro Plan",description:"$19.99/month - Advanced features"},{value:"enterprise",label:"Enterprise",description:"Custom pricing - Full access"}],r={args:{label:"Select Size",options:ie,value:"medium"},render:e=>b`
    <forge-radio-group
      .label="${e.label}"
      .description="${e.description}"
      .options="${e.options}"
      .value="${e.value}"
      .disabled="${e.disabled}"
      .required="${e.required}"
      .error="${e.error}"
      .errorMessage="${e.errorMessage}"
      .orientation="${e.orientation}"
      .labelPosition="${e.labelPosition}"
      .size="${e.size}"
      .devMode="${e.devMode}"
      .showMetrics="${e.showMetrics}"
    ></forge-radio-group>
  `},i={args:{label:"Choose an option",options:o,orientation:"horizontal"}},t={args:{label:"Select a plan",description:"Choose the plan that best fits your needs",options:te,value:"pro"}},a={args:{label:"Required Selection",options:o,required:!0}},n={args:{label:"Select an option",options:o,error:!0,errorMessage:"Please make a selection",required:!0}},l={args:{label:"Disabled Radio Group",options:o,value:"option2",disabled:!0}},s={args:{label:"Label Position Start",options:o,labelPosition:"start"}},d={args:{label:"Small Radio Controls",options:o,size:"sm"}},p={args:{label:"Large Radio Controls",options:o,size:"lg"}},c={args:{label:"Options with mixed states",options:[{value:"available1",label:"Available Option 1"},{value:"available2",label:"Available Option 2"},{value:"disabled",label:"Disabled Option",disabled:!0},{value:"available3",label:"Available Option 3"}]}},u={render:()=>b(f||(f=le([`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <forge-radio-group
        id="interactive-radio"
        label="Interactive Example"
        description="Try different interactions with this radio group"
        .options="`,`"
        required
      ></forge-radio-group>
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button @click="`,`">Select Basic</button>
        
        <button @click="`,`">Select Pro</button>
        
        <button @click="`,`">Validate</button>
        
        <button @click="`,`">Reset</button>
        
        <button @click="`,`">Toggle Disabled</button>
      </div>
      
      <div id="radio-output" style="padding: 12px; background: #f3f4f6; border-radius: 4px; font-family: monospace; font-size: 12px;">
        Selected: none
      </div>
    </div>
    
    <script>
      const radio = document.getElementById('interactive-radio');
      const output = document.getElementById('radio-output');
      
      radio?.addEventListener('forge-change', (e) => {
        const detail = e.detail;
        output.innerHTML = \`Selected: \${detail.value || 'none'}<br>Label: \${detail.option?.label || 'N/A'}\`;
      });
    <\/script>
  `],[`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <forge-radio-group
        id="interactive-radio"
        label="Interactive Example"
        description="Try different interactions with this radio group"
        .options="`,`"
        required
      ></forge-radio-group>
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button @click="`,`">Select Basic</button>
        
        <button @click="`,`">Select Pro</button>
        
        <button @click="`,`">Validate</button>
        
        <button @click="`,`">Reset</button>
        
        <button @click="`,`">Toggle Disabled</button>
      </div>
      
      <div id="radio-output" style="padding: 12px; background: #f3f4f6; border-radius: 4px; font-family: monospace; font-size: 12px;">
        Selected: none
      </div>
    </div>
    
    <script>
      const radio = document.getElementById('interactive-radio');
      const output = document.getElementById('radio-output');
      
      radio?.addEventListener('forge-change', (e) => {
        const detail = e.detail;
        output.innerHTML = \\\`Selected: \\\${detail.value || 'none'}<br>Label: \\\${detail.option?.label || 'N/A'}\\\`;
      });
    <\/script>
  `])),te,()=>{document.getElementById("interactive-radio").selectOption("basic")},()=>{document.getElementById("interactive-radio").selectOption("pro")},()=>{document.getElementById("interactive-radio").validate()},()=>{document.getElementById("interactive-radio").reset()},()=>{const e=document.getElementById("interactive-radio");e.disabled=!e.disabled})},g={render:()=>b`
    <div style="display: flex; flex-direction: column; gap: 32px; max-width: 800px;">
      <div>
        <h3 style="margin-bottom: 16px;">Sizes</h3>
        <div style="display: grid; gap: 16px;">
          <forge-radio-group
            label="Small Size"
            size="sm"
            .options="${o}"
            value="option1"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Medium Size (Default)"
            size="md"
            .options="${o}"
            value="option2"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Large Size"
            size="lg"
            .options="${o}"
            value="option3"
          ></forge-radio-group>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">Orientations</h3>
        <div style="display: grid; gap: 16px;">
          <forge-radio-group
            label="Vertical (Default)"
            orientation="vertical"
            .options="${o}"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Horizontal"
            orientation="horizontal"
            .options="${o}"
          ></forge-radio-group>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">Label Positions</h3>
        <div style="display: grid; gap: 16px;">
          <forge-radio-group
            label="Label End (Default)"
            labelPosition="end"
            .options="${o}"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Label Start"
            labelPosition="start"
            .options="${o}"
          ></forge-radio-group>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">States</h3>
        <div style="display: grid; gap: 16px;">
          <forge-radio-group
            label="Normal State"
            .options="${o}"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Disabled State"
            .options="${o}"
            disabled
            value="option2"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Error State"
            .options="${o}"
            error
            errorMessage="Selection is required"
            required
          ></forge-radio-group>
        </div>
      </div>
    </div>
  `},m={args:{label:"Performance Demo",options:ie,devMode:!0,showMetrics:!0}};var S,y,x;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Select Size',
    options: sizeOptions,
    value: 'medium'
  },
  render: args => html\`
    <forge-radio-group
      .label="\${args.label}"
      .description="\${args.description}"
      .options="\${args.options}"
      .value="\${args.value}"
      .disabled="\${args.disabled}"
      .required="\${args.required}"
      .error="\${args.error}"
      .errorMessage="\${args.errorMessage}"
      .orientation="\${args.orientation}"
      .labelPosition="\${args.labelPosition}"
      .size="\${args.size}"
      .devMode="\${args.devMode}"
      .showMetrics="\${args.showMetrics}"
    ></forge-radio-group>
  \`
}`,...(x=(y=r.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var h,$,z;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Choose an option',
    options: simpleOptions,
    orientation: 'horizontal'
  }
}`,...(z=($=i.parameters)==null?void 0:$.docs)==null?void 0:z.source}}};var O,w,E;t.parameters={...t.parameters,docs:{...(O=t.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    label: 'Select a plan',
    description: 'Choose the plan that best fits your needs',
    options: planOptions,
    value: 'pro'
  }
}`,...(E=(w=t.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};var M,L,P;a.parameters={...a.parameters,docs:{...(M=a.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    label: 'Required Selection',
    options: simpleOptions,
    required: true
  }
}`,...(P=(L=a.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var D,k,A;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'Select an option',
    options: simpleOptions,
    error: true,
    errorMessage: 'Please make a selection',
    required: true
  }
}`,...(A=(k=n.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var R,q,B;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Radio Group',
    options: simpleOptions,
    value: 'option2',
    disabled: true
  }
}`,...(B=(q=l.parameters)==null?void 0:q.docs)==null?void 0:B.source}}};var I,G,C;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'Label Position Start',
    options: simpleOptions,
    labelPosition: 'start'
  }
}`,...(C=(G=s.parameters)==null?void 0:G.docs)==null?void 0:C.source}}};var T,F,H;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    label: 'Small Radio Controls',
    options: simpleOptions,
    size: 'sm'
  }
}`,...(H=(F=d.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var V,_,N;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    label: 'Large Radio Controls',
    options: simpleOptions,
    size: 'lg'
  }
}`,...(N=(_=p.parameters)==null?void 0:_.docs)==null?void 0:N.source}}};var W,j,K;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    label: 'Options with mixed states',
    options: [{
      value: 'available1',
      label: 'Available Option 1'
    }, {
      value: 'available2',
      label: 'Available Option 2'
    }, {
      value: 'disabled',
      label: 'Disabled Option',
      disabled: true
    }, {
      value: 'available3',
      label: 'Available Option 3'
    }]
  }
}`,...(K=(j=c.parameters)==null?void 0:j.docs)==null?void 0:K.source}}};var U,J,Q;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <forge-radio-group
        id="interactive-radio"
        label="Interactive Example"
        description="Try different interactions with this radio group"
        .options="\${planOptions}"
        required
      ></forge-radio-group>
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button @click="\${() => {
    const radio = document.getElementById('interactive-radio') as unknown as ForgeRadioGroup;
    radio.selectOption('basic');
  }}">Select Basic</button>
        
        <button @click="\${() => {
    const radio = document.getElementById('interactive-radio') as unknown as ForgeRadioGroup;
    radio.selectOption('pro');
  }}">Select Pro</button>
        
        <button @click="\${() => {
    const radio = document.getElementById('interactive-radio') as unknown as ForgeRadioGroup;
    radio.validate();
  }}">Validate</button>
        
        <button @click="\${() => {
    const radio = document.getElementById('interactive-radio') as unknown as ForgeRadioGroup;
    radio.reset();
  }}">Reset</button>
        
        <button @click="\${() => {
    const radio = document.getElementById('interactive-radio') as unknown as ForgeRadioGroup;
    radio.disabled = !radio.disabled;
  }}">Toggle Disabled</button>
      </div>
      
      <div id="radio-output" style="padding: 12px; background: #f3f4f6; border-radius: 4px; font-family: monospace; font-size: 12px;">
        Selected: none
      </div>
    </div>
    
    <script>
      const radio = document.getElementById('interactive-radio');
      const output = document.getElementById('radio-output');
      
      radio?.addEventListener('forge-change', (e) => {
        const detail = e.detail;
        output.innerHTML = \\\`Selected: \\\${detail.value || 'none'}<br>Label: \\\${detail.option?.label || 'N/A'}\\\`;
      });
    <\/script>
  \`
}`,...(Q=(J=u.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Y,Z;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 32px; max-width: 800px;">
      <div>
        <h3 style="margin-bottom: 16px;">Sizes</h3>
        <div style="display: grid; gap: 16px;">
          <forge-radio-group
            label="Small Size"
            size="sm"
            .options="\${simpleOptions}"
            value="option1"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Medium Size (Default)"
            size="md"
            .options="\${simpleOptions}"
            value="option2"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Large Size"
            size="lg"
            .options="\${simpleOptions}"
            value="option3"
          ></forge-radio-group>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">Orientations</h3>
        <div style="display: grid; gap: 16px;">
          <forge-radio-group
            label="Vertical (Default)"
            orientation="vertical"
            .options="\${simpleOptions}"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Horizontal"
            orientation="horizontal"
            .options="\${simpleOptions}"
          ></forge-radio-group>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">Label Positions</h3>
        <div style="display: grid; gap: 16px;">
          <forge-radio-group
            label="Label End (Default)"
            labelPosition="end"
            .options="\${simpleOptions}"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Label Start"
            labelPosition="start"
            .options="\${simpleOptions}"
          ></forge-radio-group>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">States</h3>
        <div style="display: grid; gap: 16px;">
          <forge-radio-group
            label="Normal State"
            .options="\${simpleOptions}"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Disabled State"
            .options="\${simpleOptions}"
            disabled
            value="option2"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Error State"
            .options="\${simpleOptions}"
            error
            errorMessage="Selection is required"
            required
          ></forge-radio-group>
        </div>
      </div>
    </div>
  \`
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,oe,re;m.parameters={...m.parameters,docs:{...(ee=m.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    label: 'Performance Demo',
    options: sizeOptions,
    devMode: true,
    showMetrics: true
  }
}`,...(re=(oe=m.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};const ce=["Default","Horizontal","WithDescriptions","Required","ErrorState","Disabled","LabelStart","SmallSize","LargeSize","MixedStates","Interactive","AllVariants","WithPerformanceMetrics"];export{g as AllVariants,r as Default,l as Disabled,n as ErrorState,i as Horizontal,u as Interactive,s as LabelStart,p as LargeSize,c as MixedStates,a as Required,d as SmallSize,t as WithDescriptions,m as WithPerformanceMetrics,ce as __namedExportsOrder,pe as default};
