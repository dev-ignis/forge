import{x as t}from"./iframe-C-1QsWs8.js";import"./preload-helper-C1FmrZbK.js";const ge={title:"Molecules/MultiSelect",component:"forge-multi-select",parameters:{layout:"centered",docs:{description:{component:"A comprehensive multi-select component with search, keyboard navigation, grouping, and accessibility features."}}},argTypes:{placeholder:{control:"text",description:"Placeholder text when no items selected"},searchPlaceholder:{control:"text",description:"Search input placeholder text"},disabled:{control:"boolean",description:"Disable the multi-select"},showSearch:{control:"boolean",description:"Show search functionality"},showActions:{control:"boolean",description:"Show action buttons (All, None, Invert)"},maxSelections:{control:"number",description:"Maximum number of selections allowed"},groupBy:{control:"boolean",description:"Group options by category"}}},a=[{value:"js",label:"JavaScript"},{value:"ts",label:"TypeScript"},{value:"py",label:"Python"},{value:"java",label:"Java"},{value:"cpp",label:"C++"},{value:"cs",label:"C#"},{value:"go",label:"Go"},{value:"rust",label:"Rust"},{value:"php",label:"PHP"},{value:"ruby",label:"Ruby"}],S=[{value:"js",label:"JavaScript",group:"Frontend"},{value:"ts",label:"TypeScript",group:"Frontend"},{value:"react",label:"React",group:"Frontend"},{value:"vue",label:"Vue.js",group:"Frontend"},{value:"angular",label:"Angular",group:"Frontend"},{value:"node",label:"Node.js",group:"Backend"},{value:"py",label:"Python",group:"Backend"},{value:"java",label:"Java",group:"Backend"},{value:"php",label:"PHP",group:"Backend"},{value:"go",label:"Go",group:"Backend"},{value:"mysql",label:"MySQL",group:"Database"},{value:"postgres",label:"PostgreSQL",group:"Database"},{value:"mongo",label:"MongoDB",group:"Database"},{value:"redis",label:"Redis",group:"Database"}],i={args:{placeholder:"Select programming languages..."},render:e=>t`
    <forge-multi-select
      .options="${a}"
      placeholder="${e.placeholder}"
      ?disabled="${e.disabled}"
      ?show-search="${e.showSearch}"
      ?show-actions="${e.showActions}"
      @change="${l=>console.log("Selection changed:",l.detail)}"
    ></forge-multi-select>
  `},r={render:()=>t`
    <forge-multi-select
      .options="${a}"
      .value="${["js","ts","py"]}"
      placeholder="Select languages..."
      @change="${e=>console.log("Selection changed:",e.detail)}"
    ></forge-multi-select>
  `},s={render:()=>t`
    <forge-multi-select
      .options="${a}"
      placeholder="Search and select languages..."
      show-search
      search-placeholder="Type to search languages..."
      @change="${e=>console.log("Selection changed:",e.detail)}"
    ></forge-multi-select>
  `},c={render:()=>t`
    <forge-multi-select
      .options="${S}"
      placeholder="Select technologies..."
      group-by
      show-search
      @change="${e=>console.log("Selection changed:",e.detail)}"
    ></forge-multi-select>
  `},u={render:()=>t`
    <forge-multi-select
      .options="${a}"
      placeholder="Select up to 3 languages..."
      max-selections="3"
      @change="${e=>{console.log("Selection changed:",e.detail),e.detail.value.length>=3&&console.log("Maximum selections reached!")}}"
    ></forge-multi-select>
  `},p={render:()=>t`
      <forge-multi-select
        .options="${[{value:"js",label:"JavaScript"},{value:"ts",label:"TypeScript"},{value:"py",label:"Python",disabled:!0},{value:"java",label:"Java"},{value:"cpp",label:"C++",disabled:!0},{value:"cs",label:"C#"},{value:"go",label:"Go"},{value:"rust",label:"Rust",disabled:!0}]}"
        placeholder="Some options are disabled..."
        @change="${l=>console.log("Selection changed:",l.detail)}"
      ></forge-multi-select>
    `},d={render:()=>t`
    <forge-multi-select
      .options="${a}"
      placeholder="No action buttons..."
      show-search="${!1}"
      show-actions="${!1}"
      @change="${e=>console.log("Selection changed:",e.detail)}"
    ></forge-multi-select>
  `},g={render:()=>t`
      <forge-multi-select
        .options="${[{value:"us",label:"United States",group:"North America"},{value:"ca",label:"Canada",group:"North America"},{value:"mx",label:"Mexico",group:"North America"},{value:"uk",label:"United Kingdom",group:"Europe"},{value:"de",label:"Germany",group:"Europe"},{value:"fr",label:"France",group:"Europe"},{value:"it",label:"Italy",group:"Europe"},{value:"es",label:"Spain",group:"Europe"},{value:"nl",label:"Netherlands",group:"Europe"},{value:"se",label:"Sweden",group:"Europe"},{value:"no",label:"Norway",group:"Europe"},{value:"dk",label:"Denmark",group:"Europe"},{value:"jp",label:"Japan",group:"Asia"},{value:"cn",label:"China",group:"Asia"},{value:"kr",label:"South Korea",group:"Asia"},{value:"in",label:"India",group:"Asia"},{value:"sg",label:"Singapore",group:"Asia"},{value:"th",label:"Thailand",group:"Asia"},{value:"my",label:"Malaysia",group:"Asia"},{value:"id",label:"Indonesia",group:"Asia"},{value:"au",label:"Australia",group:"Oceania"},{value:"nz",label:"New Zealand",group:"Oceania"},{value:"br",label:"Brazil",group:"South America"},{value:"ar",label:"Argentina",group:"South America"},{value:"cl",label:"Chile",group:"South America"},{value:"co",label:"Colombia",group:"South America"},{value:"za",label:"South Africa",group:"Africa"},{value:"eg",label:"Egypt",group:"Africa"},{value:"ng",label:"Nigeria",group:"Africa"},{value:"ke",label:"Kenya",group:"Africa"}]}"
        placeholder="Select countries..."
        group-by
        show-search
        search-placeholder="Search countries..."
        @change="${l=>console.log("Countries selected:",l.detail.value)}"
      ></forge-multi-select>
    `},m={render:()=>t`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Enabled Multi-Select</label>
        <forge-multi-select
          .options="${a.slice(0,5)}"
          placeholder="You can interact with this"
        ></forge-multi-select>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Disabled Multi-Select</label>
        <forge-multi-select
          .options="${a.slice(0,5)}"
          .value="${["js","ts"]}"
          placeholder="This is disabled"
          disabled
        ></forge-multi-select>
      </div>
    </div>
  `},b={render:()=>t`
    <style>
      .custom-multi-select {
        --forge-primary-color: #10b981;
        --forge-border-color: #d1fae5;
        --forge-tag-bg: #ecfdf5;
        --forge-hover-bg: #f0fdf4;
      }
    </style>
    <forge-multi-select
      class="custom-multi-select"
      .options="${a}"
      .value="${["js","py"]}"
      placeholder="Custom green theme..."
    ></forge-multi-select>
  `},h={render:()=>t`
    <form @submit="${e=>{e.preventDefault(),new FormData(e.target),console.log("Form submitted with multi-select data")}}">
      <div style="display: flex; flex-direction: column; gap: 20px; width: 400px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">
            Programming Skills *
          </label>
          <forge-multi-select
            .options="${a}"
            placeholder="Select your skills..."
            @change="${e=>{const l=document.getElementById("skills-input");l&&(l.value=JSON.stringify(e.detail.value))}}"
          ></forge-multi-select>
          <input type="hidden" id="skills-input" name="skills" required />
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">
            Preferred Technologies
          </label>
          <forge-multi-select
            .options="${S}"
            placeholder="Optional selections..."
            group-by
            max-selections="5"
            @change="${e=>{const l=document.getElementById("tech-input");l&&(l.value=JSON.stringify(e.detail.value))}}"
          ></forge-multi-select>
          <input type="hidden" id="tech-input" name="technologies" />
        </div>
        
        <button type="submit" style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Submit Form
        </button>
      </div>
    </form>
  `},f={render:()=>t`
    <div style="max-width: 600px;">
      <h3>Interactive Multi-Select Demo</h3>
      <p>Try different features of the multi-select component:</p>
      
      <div style="display: flex; flex-direction: column; gap: 25px; margin: 20px 0;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">🔍 With Search</label>
          <forge-multi-select
            .options="${a}"
            placeholder="Type to search languages..."
            show-search
            @change="${e=>{const o=e.target.nextElementSibling;if(o){const n=e.detail.value.length;o.textContent=n>0?`Selected ${n} language${n!==1?"s":""}`:"No languages selected"}}}"
          ></forge-multi-select>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No languages selected</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">📚 Grouped Options</label>
          <forge-multi-select
            .options="${S}"
            placeholder="Select by category..."
            group-by
            show-search
            @change="${e=>{const o=e.target.nextElementSibling;if(o){const n=e.detail.value;if(n.length>0){const x=S.filter($=>n.includes($.value)).map($=>$.label);o.textContent=`Selected: ${x.join(", ")}`}else o.textContent="No technologies selected"}}}"
          ></forge-multi-select>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No technologies selected</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">🚦 Limited Selection (Max 3)</label>
          <forge-multi-select
            .options="${a}"
            placeholder="Choose up to 3..."
            max-selections="3"
            @change="${e=>{const o=e.target.nextElementSibling;if(o){const n=e.detail.value.length,x=Math.max(0,3-n);n===0?o.textContent="Select up to 3 languages":n===3?(o.textContent="Maximum selections reached",o.style.color="#dc2626"):(o.textContent=`${n} selected, ${x} remaining`,o.style.color="#6b7280")}}}"
          ></forge-multi-select>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">Select up to 3 languages</p>
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features demonstrated:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li><kbd>↑</kbd>/<kbd>↓</kbd> - Navigate options</li>
          <li><kbd>Enter</kbd>/<kbd>Space</kbd> - Select option</li>
          <li><kbd>Escape</kbd> - Close dropdown</li>
          <li>Search to filter options</li>
          <li>Click tag × to remove selection</li>
          <li>All/None/Invert action buttons</li>
          <li>Grouped display with categories</li>
          <li>Selection limits and validation</li>
        </ul>
      </div>
    </div>
  `},v={render:()=>t`
    <div style="max-width: 500px;">
      <h3>Accessibility Features</h3>
      <p>This multi-select component includes comprehensive accessibility support:</p>
      
      <forge-multi-select
        .options="${a}"
        placeholder="Try keyboard navigation..."
        show-search
        @change="${e=>console.log("Accessible selection:",e.detail)}"
      ></forge-multi-select>
      
      <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border: 1px solid #bfdbfe; border-radius: 6px;">
        <h4 style="margin-top: 0; color: #1e40af;">Accessibility Features:</h4>
        <ul style="margin-bottom: 0; font-size: 14px; color: #1e40af;">
          <li><strong>ARIA Roles:</strong> combobox, listbox, option</li>
          <li><strong>Keyboard Navigation:</strong> Full arrow key support</li>
          <li><strong>Screen Reader:</strong> Live announcements for changes</li>
          <li><strong>Focus Management:</strong> Proper focus indicators</li>
          <li><strong>High Contrast:</strong> Visible in high contrast mode</li>
          <li><strong>Semantic HTML:</strong> Proper form integration</li>
        </ul>
      </div>
    </div>
  `},y={render:()=>t`
    <forge-multi-select
      .options="${a}"
      placeholder="AI-ready multi-select..."
      semantic-role="multi-select"
      ai-context="skill-selection"
      performance-mode="balanced"
      @change="${e=>{console.log("AI-aware multi-selection:",{values:e.detail.value,count:e.detail.value.length,context:"skill-selection",userIntent:"preference-specification"})}}"
    ></forge-multi-select>
  `};var k,w,A;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select programming languages...'
  },
  render: args => html\`
    <forge-multi-select
      .options="\${basicOptions}"
      placeholder="\${args.placeholder}"
      ?disabled="\${args.disabled}"
      ?show-search="\${args.showSearch}"
      ?show-actions="\${args.showActions}"
      @change="\${(e: CustomEvent) => console.log('Selection changed:', e.detail)}"
    ></forge-multi-select>
  \`
}`,...(A=(w=i.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var E,C,O;r.parameters={...r.parameters,docs:{...(E=r.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => html\`
    <forge-multi-select
      .options="\${basicOptions}"
      .value="\${['js', 'ts', 'py']}"
      placeholder="Select languages..."
      @change="\${(e: CustomEvent) => console.log('Selection changed:', e.detail)}"
    ></forge-multi-select>
  \`
}`,...(O=(C=r.parameters)==null?void 0:C.docs)==null?void 0:O.source}}};var N,I,M;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => html\`
    <forge-multi-select
      .options="\${basicOptions}"
      placeholder="Search and select languages..."
      show-search
      search-placeholder="Type to search languages..."
      @change="\${(e: CustomEvent) => console.log('Selection changed:', e.detail)}"
    ></forge-multi-select>
  \`
}`,...(M=(I=s.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var D,F,T;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => html\`
    <forge-multi-select
      .options="\${groupedOptions}"
      placeholder="Select technologies..."
      group-by
      show-search
      @change="\${(e: CustomEvent) => console.log('Selection changed:', e.detail)}"
    ></forge-multi-select>
  \`
}`,...(T=(F=c.parameters)==null?void 0:F.docs)==null?void 0:T.source}}};var j,P,z;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => html\`
    <forge-multi-select
      .options="\${basicOptions}"
      placeholder="Select up to 3 languages..."
      max-selections="3"
      @change="\${(e: CustomEvent) => {
    console.log('Selection changed:', e.detail);
    if (e.detail.value.length >= 3) {
      console.log('Maximum selections reached!');
    }
  }}"
    ></forge-multi-select>
  \`
}`,...(z=(P=u.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};var W,J,B;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => {
    const optionsWithDisabled: MultiSelectOption[] = [{
      value: 'js',
      label: 'JavaScript'
    }, {
      value: 'ts',
      label: 'TypeScript'
    }, {
      value: 'py',
      label: 'Python',
      disabled: true
    }, {
      value: 'java',
      label: 'Java'
    }, {
      value: 'cpp',
      label: 'C++',
      disabled: true
    }, {
      value: 'cs',
      label: 'C#'
    }, {
      value: 'go',
      label: 'Go'
    }, {
      value: 'rust',
      label: 'Rust',
      disabled: true
    }];
    return html\`
      <forge-multi-select
        .options="\${optionsWithDisabled}"
        placeholder="Some options are disabled..."
        @change="\${(e: CustomEvent) => console.log('Selection changed:', e.detail)}"
      ></forge-multi-select>
    \`;
  }
}`,...(B=(J=p.parameters)==null?void 0:J.docs)==null?void 0:B.source}}};var G,L,R;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => html\`
    <forge-multi-select
      .options="\${basicOptions}"
      placeholder="No action buttons..."
      show-search="\${false}"
      show-actions="\${false}"
      @change="\${(e: CustomEvent) => console.log('Selection changed:', e.detail)}"
    ></forge-multi-select>
  \`
}`,...(R=(L=d.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var H,K,U;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => {
    const countries: MultiSelectOption[] = [{
      value: 'us',
      label: 'United States',
      group: 'North America'
    }, {
      value: 'ca',
      label: 'Canada',
      group: 'North America'
    }, {
      value: 'mx',
      label: 'Mexico',
      group: 'North America'
    }, {
      value: 'uk',
      label: 'United Kingdom',
      group: 'Europe'
    }, {
      value: 'de',
      label: 'Germany',
      group: 'Europe'
    }, {
      value: 'fr',
      label: 'France',
      group: 'Europe'
    }, {
      value: 'it',
      label: 'Italy',
      group: 'Europe'
    }, {
      value: 'es',
      label: 'Spain',
      group: 'Europe'
    }, {
      value: 'nl',
      label: 'Netherlands',
      group: 'Europe'
    }, {
      value: 'se',
      label: 'Sweden',
      group: 'Europe'
    }, {
      value: 'no',
      label: 'Norway',
      group: 'Europe'
    }, {
      value: 'dk',
      label: 'Denmark',
      group: 'Europe'
    }, {
      value: 'jp',
      label: 'Japan',
      group: 'Asia'
    }, {
      value: 'cn',
      label: 'China',
      group: 'Asia'
    }, {
      value: 'kr',
      label: 'South Korea',
      group: 'Asia'
    }, {
      value: 'in',
      label: 'India',
      group: 'Asia'
    }, {
      value: 'sg',
      label: 'Singapore',
      group: 'Asia'
    }, {
      value: 'th',
      label: 'Thailand',
      group: 'Asia'
    }, {
      value: 'my',
      label: 'Malaysia',
      group: 'Asia'
    }, {
      value: 'id',
      label: 'Indonesia',
      group: 'Asia'
    }, {
      value: 'au',
      label: 'Australia',
      group: 'Oceania'
    }, {
      value: 'nz',
      label: 'New Zealand',
      group: 'Oceania'
    }, {
      value: 'br',
      label: 'Brazil',
      group: 'South America'
    }, {
      value: 'ar',
      label: 'Argentina',
      group: 'South America'
    }, {
      value: 'cl',
      label: 'Chile',
      group: 'South America'
    }, {
      value: 'co',
      label: 'Colombia',
      group: 'South America'
    }, {
      value: 'za',
      label: 'South Africa',
      group: 'Africa'
    }, {
      value: 'eg',
      label: 'Egypt',
      group: 'Africa'
    }, {
      value: 'ng',
      label: 'Nigeria',
      group: 'Africa'
    }, {
      value: 'ke',
      label: 'Kenya',
      group: 'Africa'
    }];
    return html\`
      <forge-multi-select
        .options="\${countries}"
        placeholder="Select countries..."
        group-by
        show-search
        search-placeholder="Search countries..."
        @change="\${(e: CustomEvent) => console.log('Countries selected:', e.detail.value)}"
      ></forge-multi-select>
    \`;
  }
}`,...(U=(K=g.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var q,V,Q;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Enabled Multi-Select</label>
        <forge-multi-select
          .options="\${basicOptions.slice(0, 5)}"
          placeholder="You can interact with this"
        ></forge-multi-select>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Disabled Multi-Select</label>
        <forge-multi-select
          .options="\${basicOptions.slice(0, 5)}"
          .value="\${['js', 'ts']}"
          placeholder="This is disabled"
          disabled
        ></forge-multi-select>
      </div>
    </div>
  \`
}`,...(Q=(V=m.parameters)==null?void 0:V.docs)==null?void 0:Q.source}}};var Y,Z,_;b.parameters={...b.parameters,docs:{...(Y=b.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => html\`
    <style>
      .custom-multi-select {
        --forge-primary-color: #10b981;
        --forge-border-color: #d1fae5;
        --forge-tag-bg: #ecfdf5;
        --forge-hover-bg: #f0fdf4;
      }
    </style>
    <forge-multi-select
      class="custom-multi-select"
      .options="\${basicOptions}"
      .value="\${['js', 'py']}"
      placeholder="Custom green theme..."
    ></forge-multi-select>
  \`
}`,...(_=(Z=b.parameters)==null?void 0:Z.docs)==null?void 0:_.source}}};var X,ee,le;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => html\`
    <form @submit="\${(e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log('Form submitted with multi-select data');
  }}">
      <div style="display: flex; flex-direction: column; gap: 20px; width: 400px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">
            Programming Skills *
          </label>
          <forge-multi-select
            .options="\${basicOptions}"
            placeholder="Select your skills..."
            @change="\${(e: CustomEvent) => {
    const input = document.getElementById('skills-input') as HTMLInputElement;
    if (input) {
      input.value = JSON.stringify(e.detail.value);
    }
  }}"
          ></forge-multi-select>
          <input type="hidden" id="skills-input" name="skills" required />
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">
            Preferred Technologies
          </label>
          <forge-multi-select
            .options="\${groupedOptions}"
            placeholder="Optional selections..."
            group-by
            max-selections="5"
            @change="\${(e: CustomEvent) => {
    const input = document.getElementById('tech-input') as HTMLInputElement;
    if (input) {
      input.value = JSON.stringify(e.detail.value);
    }
  }}"
          ></forge-multi-select>
          <input type="hidden" id="tech-input" name="technologies" />
        </div>
        
        <button type="submit" style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Submit Form
        </button>
      </div>
    </form>
  \`
}`,...(le=(ee=h.parameters)==null?void 0:ee.docs)==null?void 0:le.source}}};var te,oe,ae;f.parameters={...f.parameters,docs:{...(te=f.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => html\`
    <div style="max-width: 600px;">
      <h3>Interactive Multi-Select Demo</h3>
      <p>Try different features of the multi-select component:</p>
      
      <div style="display: flex; flex-direction: column; gap: 25px; margin: 20px 0;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">🔍 With Search</label>
          <forge-multi-select
            .options="\${basicOptions}"
            placeholder="Type to search languages..."
            show-search
            @change="\${(e: CustomEvent) => {
    const target = e.target as any;
    const info = target.nextElementSibling;
    if (info) {
      const count = e.detail.value.length;
      info.textContent = count > 0 ? \`Selected \${count} language\${count !== 1 ? 's' : ''}\` : 'No languages selected';
    }
  }}"
          ></forge-multi-select>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No languages selected</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">📚 Grouped Options</label>
          <forge-multi-select
            .options="\${groupedOptions}"
            placeholder="Select by category..."
            group-by
            show-search
            @change="\${(e: CustomEvent) => {
    const target = e.target as any;
    const info = target.nextElementSibling;
    if (info) {
      const selected = e.detail.value;
      if (selected.length > 0) {
        const labels = groupedOptions.filter(opt => selected.includes(opt.value)).map(opt => opt.label);
        info.textContent = \`Selected: \${labels.join(', ')}\`;
      } else {
        info.textContent = 'No technologies selected';
      }
    }
  }}"
          ></forge-multi-select>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No technologies selected</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">🚦 Limited Selection (Max 3)</label>
          <forge-multi-select
            .options="\${basicOptions}"
            placeholder="Choose up to 3..."
            max-selections="3"
            @change="\${(e: CustomEvent) => {
    const target = e.target as any;
    const info = target.nextElementSibling;
    if (info) {
      const count = e.detail.value.length;
      const remaining = Math.max(0, 3 - count);
      if (count === 0) {
        info.textContent = 'Select up to 3 languages';
      } else if (count === 3) {
        info.textContent = 'Maximum selections reached';
        info.style.color = '#dc2626';
      } else {
        info.textContent = \`\${count} selected, \${remaining} remaining\`;
        info.style.color = '#6b7280';
      }
    }
  }}"
          ></forge-multi-select>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">Select up to 3 languages</p>
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features demonstrated:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li><kbd>↑</kbd>/<kbd>↓</kbd> - Navigate options</li>
          <li><kbd>Enter</kbd>/<kbd>Space</kbd> - Select option</li>
          <li><kbd>Escape</kbd> - Close dropdown</li>
          <li>Search to filter options</li>
          <li>Click tag × to remove selection</li>
          <li>All/None/Invert action buttons</li>
          <li>Grouped display with categories</li>
          <li>Selection limits and validation</li>
        </ul>
      </div>
    </div>
  \`
}`,...(ae=(oe=f.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};var ne,ie,re;v.parameters={...v.parameters,docs:{...(ne=v.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => html\`
    <div style="max-width: 500px;">
      <h3>Accessibility Features</h3>
      <p>This multi-select component includes comprehensive accessibility support:</p>
      
      <forge-multi-select
        .options="\${basicOptions}"
        placeholder="Try keyboard navigation..."
        show-search
        @change="\${(e: CustomEvent) => console.log('Accessible selection:', e.detail)}"
      ></forge-multi-select>
      
      <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border: 1px solid #bfdbfe; border-radius: 6px;">
        <h4 style="margin-top: 0; color: #1e40af;">Accessibility Features:</h4>
        <ul style="margin-bottom: 0; font-size: 14px; color: #1e40af;">
          <li><strong>ARIA Roles:</strong> combobox, listbox, option</li>
          <li><strong>Keyboard Navigation:</strong> Full arrow key support</li>
          <li><strong>Screen Reader:</strong> Live announcements for changes</li>
          <li><strong>Focus Management:</strong> Proper focus indicators</li>
          <li><strong>High Contrast:</strong> Visible in high contrast mode</li>
          <li><strong>Semantic HTML:</strong> Proper form integration</li>
        </ul>
      </div>
    </div>
  \`
}`,...(re=(ie=v.parameters)==null?void 0:ie.docs)==null?void 0:re.source}}};var se,ce,ue;y.parameters={...y.parameters,docs:{...(se=y.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: () => html\`
    <forge-multi-select
      .options="\${basicOptions}"
      placeholder="AI-ready multi-select..."
      semantic-role="multi-select"
      ai-context="skill-selection"
      performance-mode="balanced"
      @change="\${(e: CustomEvent) => {
    console.log('AI-aware multi-selection:', {
      values: e.detail.value,
      count: e.detail.value.length,
      context: 'skill-selection',
      userIntent: 'preference-specification'
    });
  }}"
    ></forge-multi-select>
  \`
}`,...(ue=(ce=y.parameters)==null?void 0:ce.docs)==null?void 0:ue.source}}};const me=["Default","WithInitialSelection","WithSearch","GroupedOptions","WithMaxSelections","WithDisabledOptions","WithoutActions","LargeDataset","DisabledState","CustomStyling","FormIntegration","InteractiveDemo","AccessibilityShowcase","AIIntegration"];export{y as AIIntegration,v as AccessibilityShowcase,b as CustomStyling,i as Default,m as DisabledState,h as FormIntegration,c as GroupedOptions,f as InteractiveDemo,g as LargeDataset,p as WithDisabledOptions,r as WithInitialSelection,u as WithMaxSelections,s as WithSearch,d as WithoutActions,me as __namedExportsOrder,ge as default};
