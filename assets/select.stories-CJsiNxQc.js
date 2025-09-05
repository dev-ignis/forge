import{x as v}from"./iframe-RyCF64Jj.js";import"./preload-helper-C1FmrZbK.js";var y=Object.freeze,me=Object.defineProperty,be=(e,ge)=>y(me(e,"raw",{value:y(ge||e.slice())})),x;const Se={title:"Atoms/Select",component:"forge-select",tags:["autodocs"],argTypes:{value:{control:"text",description:"Currently selected value"},placeholder:{control:"text",description:"Placeholder text when no value selected"},size:{control:"radio",options:["sm","md","lg"],description:"Size of the select control"},variant:{control:"radio",options:["default","filled","outlined"],description:"Visual variant of the select"},disabled:{control:"boolean",description:"Disable the select"},required:{control:"boolean",description:"Mark field as required"},searchable:{control:"boolean",description:"Enable search functionality"},loading:{control:"boolean",description:"Show loading state"},open:{control:"boolean",description:"Control dropdown open state"},error:{control:"boolean",description:"Show error state"},errorMessage:{control:"text",description:"Error message to display"},label:{control:"text",description:"Select label"},description:{control:"text",description:"Select description"},devMode:{control:"boolean",description:"Enable developer mode",table:{category:"Developer"}},showMetrics:{control:"boolean",description:"Show performance metrics",table:{category:"Developer"}}},parameters:{docs:{description:{component:`
# ForgeSelect Component

A fully accessible dropdown select component with search, grouping, and keyboard navigation support.

## Features
- **Single Selection**: Select one option from a dropdown list
- **Search/Filter**: Optional search functionality to filter options
- **Option Groups**: Support for grouped options
- **Keyboard Navigation**: Full arrow key support with Escape to close
- **Size Variants**: Small, medium, and large sizes
- **Visual Variants**: Default, filled, and outlined styles
- **Validation**: Built-in required field validation
- **Loading State**: Show loading spinner while fetching options
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **AI-Ready**: ADR-014 compliant with semantic metadata
- **Performance Monitoring**: Built-in performance tracking

## Usage

\`\`\`javascript
const select = document.querySelector('forge-select');
select.options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true }
];

select.addEventListener('forge-change', (e) => {
  console.log('Selected:', e.detail.value);
});
\`\`\`

## Keyboard Support
- **Enter/Space**: Open dropdown or select focused option
- **Escape**: Close dropdown
- **Arrow Down**: Navigate to next option
- **Arrow Up**: Navigate to previous option
- **Home**: Jump to first option
- **End**: Jump to last option

## Theming
The component uses CSS custom properties for theming:
- \`--forge-color-primary\`: Primary color for selected state
- \`--forge-color-border\`: Border color
- \`--forge-color-bg-hover\`: Hover background color
- \`--forge-color-error\`: Error state color
        `}}}},t=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"},{value:"option4",label:"Option 4"}],h=[{value:"us",label:"United States"},{value:"ca",label:"Canada"},{value:"mx",label:"Mexico"},{value:"uk",label:"United Kingdom"},{value:"de",label:"Germany"},{value:"fr",label:"France"},{value:"it",label:"Italy"},{value:"es",label:"Spain"},{value:"jp",label:"Japan"},{value:"cn",label:"China"},{value:"au",label:"Australia"},{value:"br",label:"Brazil"}],S=[{value:"small",label:"Small",group:"Sizes"},{value:"medium",label:"Medium",group:"Sizes"},{value:"large",label:"Large",group:"Sizes"},{value:"xl",label:"Extra Large",group:"Sizes"},{value:"red",label:"Red",group:"Colors"},{value:"blue",label:"Blue",group:"Colors"},{value:"green",label:"Green",group:"Colors"},{value:"yellow",label:"Yellow",group:"Colors"},{value:"purple",label:"Purple",group:"Colors"}],fe=[{value:"active",label:"Active"},{value:"pending",label:"Pending"},{value:"inactive",label:"Inactive",disabled:!0},{value:"archived",label:"Archived"},{value:"deleted",label:"Deleted",disabled:!0}],o={args:{label:"Select Option",placeholder:"Choose an option",options:t,value:""},render:e=>v`
    <forge-select
      .label="${e.label}"
      .description="${e.description}"
      .placeholder="${e.placeholder}"
      .options="${e.options}"
      .value="${e.value}"
      .disabled="${e.disabled}"
      .required="${e.required}"
      .searchable="${e.searchable}"
      .loading="${e.loading}"
      .open="${e.open}"
      .error="${e.error}"
      .errorMessage="${e.errorMessage}"
      .size="${e.size}"
      .variant="${e.variant}"
      .devMode="${e.devMode}"
      .showMetrics="${e.showMetrics}"
    ></forge-select>
  `},l={args:{label:"Select Country",placeholder:"Search for a country...",options:h,searchable:!0}},r={args:{label:"Select Size or Color",description:"Options are grouped by category",options:S,placeholder:"Choose from groups"}},n={args:{label:"Required Selection",options:t,required:!0,placeholder:"This field is required"}},a={args:{label:"Select with Error",options:t,error:!0,errorMessage:"Please make a selection",required:!0}},s={args:{label:"Disabled Select",options:t,value:"option2",disabled:!0}},i={args:{label:"Loading Options",placeholder:"Loading...",loading:!0}},c={args:{label:"Small Select",options:t,size:"sm"}},d={args:{label:"Large Select",options:t,size:"lg"}},p={args:{label:"Filled Style",options:t,variant:"filled"}},u={args:{label:"Outlined Style",options:t,variant:"outlined"}},g={args:{label:"Options with mixed states",description:"Some options are disabled",options:fe,placeholder:"Select status"}},m={render:()=>v(x||(x=be([`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <forge-select
        id="interactive-select"
        label="Interactive Example"
        description="Try different interactions with this select"
        placeholder="Choose an option..."
        .options="`,`"
        searchable
        required
      ></forge-select>
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button @click="`,`">Select Medium</button>
        
        <button @click="`,`">Open Dropdown</button>
        
        <button @click="`,`">Validate</button>
        
        <button @click="`,`">Reset</button>
        
        <button @click="`,`">Toggle Disabled</button>
        
        <button @click="`,`">Toggle Search</button>
      </div>
      
      <div id="select-output" style="padding: 12px; background: #f3f4f6; border-radius: 4px; font-family: monospace; font-size: 12px;">
        Selected: none
      </div>
    </div>
    
    <script>
      const select = document.getElementById('interactive-select');
      const output = document.getElementById('select-output');
      
      select?.addEventListener('forge-change', (e) => {
        const detail = e.detail;
        output.innerHTML = \`Selected: \${detail.value || 'none'}<br>Label: \${detail.option?.label || 'N/A'}\`;
      });
      
      select?.addEventListener('forge-open', () => {
        console.log('Dropdown opened');
      });
      
      select?.addEventListener('forge-close', () => {
        console.log('Dropdown closed');
      });
    <\/script>
  `],[`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <forge-select
        id="interactive-select"
        label="Interactive Example"
        description="Try different interactions with this select"
        placeholder="Choose an option..."
        .options="`,`"
        searchable
        required
      ></forge-select>
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button @click="`,`">Select Medium</button>
        
        <button @click="`,`">Open Dropdown</button>
        
        <button @click="`,`">Validate</button>
        
        <button @click="`,`">Reset</button>
        
        <button @click="`,`">Toggle Disabled</button>
        
        <button @click="`,`">Toggle Search</button>
      </div>
      
      <div id="select-output" style="padding: 12px; background: #f3f4f6; border-radius: 4px; font-family: monospace; font-size: 12px;">
        Selected: none
      </div>
    </div>
    
    <script>
      const select = document.getElementById('interactive-select');
      const output = document.getElementById('select-output');
      
      select?.addEventListener('forge-change', (e) => {
        const detail = e.detail;
        output.innerHTML = \\\`Selected: \\\${detail.value || 'none'}<br>Label: \\\${detail.option?.label || 'N/A'}\\\`;
      });
      
      select?.addEventListener('forge-open', () => {
        console.log('Dropdown opened');
      });
      
      select?.addEventListener('forge-close', () => {
        console.log('Dropdown closed');
      });
    <\/script>
  `])),S,()=>{document.getElementById("interactive-select").selectOption("medium")},()=>{document.getElementById("interactive-select").openDropdown()},()=>{document.getElementById("interactive-select").validate()},()=>{document.getElementById("interactive-select").reset()},()=>{const e=document.getElementById("interactive-select");e.disabled=!e.disabled},()=>{const e=document.getElementById("interactive-select");e.searchable=!e.searchable})},b={render:()=>v`
    <div style="display: flex; flex-direction: column; gap: 32px; max-width: 800px;">
      <div>
        <h3 style="margin-bottom: 16px;">Sizes</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <forge-select
            label="Small Size"
            size="sm"
            .options="${t}"
            placeholder="Small select"
          ></forge-select>
          
          <forge-select
            label="Medium Size (Default)"
            size="md"
            .options="${t}"
            placeholder="Medium select"
          ></forge-select>
          
          <forge-select
            label="Large Size"
            size="lg"
            .options="${t}"
            placeholder="Large select"
          ></forge-select>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">Variants</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <forge-select
            label="Default Variant"
            variant="default"
            .options="${t}"
            placeholder="Default style"
          ></forge-select>
          
          <forge-select
            label="Filled Variant"
            variant="filled"
            .options="${t}"
            placeholder="Filled style"
          ></forge-select>
          
          <forge-select
            label="Outlined Variant"
            variant="outlined"
            .options="${t}"
            placeholder="Outlined style"
          ></forge-select>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">States</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <forge-select
            label="Normal State"
            .options="${t}"
            placeholder="Normal select"
          ></forge-select>
          
          <forge-select
            label="Disabled State"
            .options="${t}"
            disabled
            value="option2"
            placeholder="Disabled select"
          ></forge-select>
          
          <forge-select
            label="Loading State"
            loading
            placeholder="Loading options..."
          ></forge-select>
          
          <forge-select
            label="Error State"
            .options="${t}"
            error
            errorMessage="Selection is required"
            required
            placeholder="Error select"
          ></forge-select>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">Features</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <forge-select
            label="With Search"
            .options="${h}"
            searchable
            placeholder="Search countries..."
          ></forge-select>
          
          <forge-select
            label="With Groups"
            .options="${S}"
            placeholder="Grouped options"
          ></forge-select>
          
          <forge-select
            label="Required Field"
            .options="${t}"
            required
            placeholder="Required selection"
          ></forge-select>
        </div>
      </div>
    </div>
  `},f={args:{label:"Performance Demo",options:h,searchable:!0,devMode:!0,showMetrics:!0}};var $,O,w;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    label: 'Select Option',
    placeholder: 'Choose an option',
    options: simpleOptions,
    value: ''
  },
  render: args => html\`
    <forge-select
      .label="\${args.label}"
      .description="\${args.description}"
      .placeholder="\${args.placeholder}"
      .options="\${args.options}"
      .value="\${args.value}"
      .disabled="\${args.disabled}"
      .required="\${args.required}"
      .searchable="\${args.searchable}"
      .loading="\${args.loading}"
      .open="\${args.open}"
      .error="\${args.error}"
      .errorMessage="\${args.errorMessage}"
      .size="\${args.size}"
      .variant="\${args.variant}"
      .devMode="\${args.devMode}"
      .showMetrics="\${args.showMetrics}"
    ></forge-select>
  \`
}`,...(w=(O=o.parameters)==null?void 0:O.docs)==null?void 0:w.source}}};var E,z,M;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Select Country',
    placeholder: 'Search for a country...',
    options: countryOptions,
    searchable: true
  }
}`,...(M=(z=l.parameters)==null?void 0:z.docs)==null?void 0:M.source}}};var D,L,q;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'Select Size or Color',
    description: 'Options are grouped by category',
    options: groupedOptions,
    placeholder: 'Choose from groups'
  }
}`,...(q=(L=r.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};var k,I,C;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    label: 'Required Selection',
    options: simpleOptions,
    required: true,
    placeholder: 'This field is required'
  }
}`,...(C=(I=n.parameters)==null?void 0:I.docs)==null?void 0:C.source}}};var B,F,V;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    label: 'Select with Error',
    options: simpleOptions,
    error: true,
    errorMessage: 'Please make a selection',
    required: true
  }
}`,...(V=(F=a.parameters)==null?void 0:F.docs)==null?void 0:V.source}}};var A,T,R;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Select',
    options: simpleOptions,
    value: 'option2',
    disabled: true
  }
}`,...(R=(T=s.parameters)==null?void 0:T.docs)==null?void 0:R.source}}};var P,G,N;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    label: 'Loading Options',
    placeholder: 'Loading...',
    loading: true
  }
}`,...(N=(G=i.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};var W,_,H;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    label: 'Small Select',
    options: simpleOptions,
    size: 'sm'
  }
}`,...(H=(_=c.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};var j,U,J;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'Large Select',
    options: simpleOptions,
    size: 'lg'
  }
}`,...(J=(U=d.parameters)==null?void 0:U.docs)==null?void 0:J.source}}};var K,Y,Q;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    label: 'Filled Style',
    options: simpleOptions,
    variant: 'filled'
  }
}`,...(Q=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:Q.source}}};var X,Z,ee;u.parameters={...u.parameters,docs:{...(X=u.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    label: 'Outlined Style',
    options: simpleOptions,
    variant: 'outlined'
  }
}`,...(ee=(Z=u.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,oe,le;g.parameters={...g.parameters,docs:{...(te=g.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    label: 'Options with mixed states',
    description: 'Some options are disabled',
    options: mixedOptions,
    placeholder: 'Select status'
  }
}`,...(le=(oe=g.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var re,ne,ae;m.parameters={...m.parameters,docs:{...(re=m.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <forge-select
        id="interactive-select"
        label="Interactive Example"
        description="Try different interactions with this select"
        placeholder="Choose an option..."
        .options="\${groupedOptions}"
        searchable
        required
      ></forge-select>
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button @click="\${() => {
    const select = document.getElementById('interactive-select') as ForgeSelect;
    select.selectOption('medium');
  }}">Select Medium</button>
        
        <button @click="\${() => {
    const select = document.getElementById('interactive-select') as ForgeSelect;
    select.openDropdown();
  }}">Open Dropdown</button>
        
        <button @click="\${() => {
    const select = document.getElementById('interactive-select') as ForgeSelect;
    select.validate();
  }}">Validate</button>
        
        <button @click="\${() => {
    const select = document.getElementById('interactive-select') as ForgeSelect;
    select.reset();
  }}">Reset</button>
        
        <button @click="\${() => {
    const select = document.getElementById('interactive-select') as ForgeSelect;
    select.disabled = !select.disabled;
  }}">Toggle Disabled</button>
        
        <button @click="\${() => {
    const select = document.getElementById('interactive-select') as ForgeSelect;
    select.searchable = !select.searchable;
  }}">Toggle Search</button>
      </div>
      
      <div id="select-output" style="padding: 12px; background: #f3f4f6; border-radius: 4px; font-family: monospace; font-size: 12px;">
        Selected: none
      </div>
    </div>
    
    <script>
      const select = document.getElementById('interactive-select');
      const output = document.getElementById('select-output');
      
      select?.addEventListener('forge-change', (e) => {
        const detail = e.detail;
        output.innerHTML = \\\`Selected: \\\${detail.value || 'none'}<br>Label: \\\${detail.option?.label || 'N/A'}\\\`;
      });
      
      select?.addEventListener('forge-open', () => {
        console.log('Dropdown opened');
      });
      
      select?.addEventListener('forge-close', () => {
        console.log('Dropdown closed');
      });
    <\/script>
  \`
}`,...(ae=(ne=m.parameters)==null?void 0:ne.docs)==null?void 0:ae.source}}};var se,ie,ce;b.parameters={...b.parameters,docs:{...(se=b.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 32px; max-width: 800px;">
      <div>
        <h3 style="margin-bottom: 16px;">Sizes</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <forge-select
            label="Small Size"
            size="sm"
            .options="\${simpleOptions}"
            placeholder="Small select"
          ></forge-select>
          
          <forge-select
            label="Medium Size (Default)"
            size="md"
            .options="\${simpleOptions}"
            placeholder="Medium select"
          ></forge-select>
          
          <forge-select
            label="Large Size"
            size="lg"
            .options="\${simpleOptions}"
            placeholder="Large select"
          ></forge-select>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">Variants</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <forge-select
            label="Default Variant"
            variant="default"
            .options="\${simpleOptions}"
            placeholder="Default style"
          ></forge-select>
          
          <forge-select
            label="Filled Variant"
            variant="filled"
            .options="\${simpleOptions}"
            placeholder="Filled style"
          ></forge-select>
          
          <forge-select
            label="Outlined Variant"
            variant="outlined"
            .options="\${simpleOptions}"
            placeholder="Outlined style"
          ></forge-select>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">States</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <forge-select
            label="Normal State"
            .options="\${simpleOptions}"
            placeholder="Normal select"
          ></forge-select>
          
          <forge-select
            label="Disabled State"
            .options="\${simpleOptions}"
            disabled
            value="option2"
            placeholder="Disabled select"
          ></forge-select>
          
          <forge-select
            label="Loading State"
            loading
            placeholder="Loading options..."
          ></forge-select>
          
          <forge-select
            label="Error State"
            .options="\${simpleOptions}"
            error
            errorMessage="Selection is required"
            required
            placeholder="Error select"
          ></forge-select>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">Features</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <forge-select
            label="With Search"
            .options="\${countryOptions}"
            searchable
            placeholder="Search countries..."
          ></forge-select>
          
          <forge-select
            label="With Groups"
            .options="\${groupedOptions}"
            placeholder="Grouped options"
          ></forge-select>
          
          <forge-select
            label="Required Field"
            .options="\${simpleOptions}"
            required
            placeholder="Required selection"
          ></forge-select>
        </div>
      </div>
    </div>
  \`
}`,...(ce=(ie=b.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var de,pe,ue;f.parameters={...f.parameters,docs:{...(de=f.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    label: 'Performance Demo',
    options: countryOptions,
    searchable: true,
    devMode: true,
    showMetrics: true
  }
}`,...(ue=(pe=f.parameters)==null?void 0:pe.docs)==null?void 0:ue.source}}};const ye=["Default","WithSearch","GroupedOptions","Required","ErrorState","Disabled","Loading","SmallSize","LargeSize","FilledVariant","OutlinedVariant","MixedStates","Interactive","AllVariants","WithPerformanceMetrics"];export{b as AllVariants,o as Default,s as Disabled,a as ErrorState,p as FilledVariant,r as GroupedOptions,m as Interactive,d as LargeSize,i as Loading,g as MixedStates,u as OutlinedVariant,n as Required,c as SmallSize,f as WithPerformanceMetrics,l as WithSearch,ye as __namedExportsOrder,Se as default};
