import{x as t}from"./iframe-C-1QsWs8.js";import"./preload-helper-C1FmrZbK.js";const ce={title:"Molecules/Dropdown",component:"forge-dropdown",parameters:{layout:"centered",docs:{description:{component:"A flexible dropdown component with customizable options, multi-select, keyboard navigation, and nested menus."}}},argTypes:{label:{control:"text",description:"Button label text"},position:{control:{type:"select"},options:["bottom-start","bottom-end","top-start","top-end","left","right","auto"],description:"Dropdown menu position"},variant:{control:{type:"select"},options:["default","primary","secondary","minimal"],description:"Visual style variant"},size:{control:{type:"select"},options:["small","medium","large"],description:"Component size"},disabled:{control:"boolean",description:"Disable the dropdown"},closeOnSelect:{control:"boolean",description:"Close dropdown when item is selected"},multiSelect:{control:"boolean",description:"Allow multiple item selection"}}},o=[{id:"1",label:"Dashboard",icon:"🏠"},{id:"2",label:"Analytics",icon:"📊",badge:"5"},{id:"3",label:"Settings",icon:"⚙️"},{id:"divider1",label:"",divider:!0},{id:"4",label:"Help Center",icon:"❓"},{id:"5",label:"Sign Out",icon:"🚪"}],ae=[{id:"create",label:"New Document",icon:"📄",group:"Create"},{id:"folder",label:"New Folder",icon:"📁",group:"Create"},{id:"template",label:"From Template",icon:"📋",group:"Create"},{id:"copy",label:"Copy",icon:"📋",group:"Edit"},{id:"paste",label:"Paste",icon:"📌",group:"Edit"},{id:"delete",label:"Delete",icon:"🗑️",group:"Edit"},{id:"share",label:"Share",icon:"🔗",group:"Share"},{id:"export",label:"Export",icon:"📤",group:"Share"}],n={args:{label:"Options"},render:e=>t`
    <forge-dropdown
      label="${e.label}"
      .items="${o}"
      @forge-select="${l=>console.log("Selected:",l.detail)}"
    ></forge-dropdown>
  `},r={render:()=>t`
    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
      <forge-dropdown
        variant="default"
        label="Default"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        variant="primary"
        label="Primary"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        variant="secondary"
        label="Secondary"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        variant="minimal"
        label="Minimal"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
    </div>
  `},a={render:()=>t`
    <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
      <forge-dropdown
        size="small"
        label="Small"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        size="medium"
        label="Medium"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        size="large"
        label="Large"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
    </div>
  `},d={render:()=>t`
    <forge-dropdown
      label="Actions"
      .items="${[{id:"edit",label:"Edit Document",icon:"✏️"},{id:"share",label:"Share",icon:"🔗",badge:"3"},{id:"download",label:"Download",icon:"⬇️"},{id:"print",label:"Print",icon:"🖨️"},{id:"divider",label:"",divider:!0},{id:"archive",label:"Archive",icon:"📦"},{id:"delete",label:"Delete",icon:"🗑️"}]}"
      @forge-select="${e=>console.log("Action selected:",e.detail)}"
    ></forge-dropdown>
  `},s={render:()=>t`
    <forge-dropdown
      label="File Menu"
      .items="${ae}"
      @forge-select="${e=>console.log("Menu item selected:",e.detail)}"
    ></forge-dropdown>
  `},c={render:()=>t`
    <forge-dropdown
      label="Select Features"
      multi-select
      close-on-select="false"
      .items="${[{id:"notifications",label:"Email Notifications",type:"checkbox"},{id:"newsletter",label:"Newsletter",type:"checkbox"},{id:"updates",label:"Product Updates",type:"checkbox"},{id:"marketing",label:"Marketing Emails",type:"checkbox"},{id:"security",label:"Security Alerts",type:"checkbox"}]}"
      @forge-select="${e=>{console.log("Multi-selection changed:",e.detail),console.log("Currently selected:",e.detail.selected)}}"
    ></forge-dropdown>
  `},p={render:()=>t`
    <forge-dropdown
      label="Choose Theme"
      .items="${[{id:"light",label:"Light Mode",type:"radio",icon:"☀️"},{id:"dark",label:"Dark Mode",type:"radio",icon:"🌙"},{id:"auto",label:"Auto (System)",type:"radio",icon:"🔄"}]}"
      @forge-select="${e=>console.log("Theme selected:",e.detail)}"
    ></forge-dropdown>
  `},m={render:()=>t`
    <forge-dropdown
      label="User Actions"
      .items="${[{id:"profile",label:"View Profile",icon:"👤"},{id:"settings",label:"Account Settings",icon:"⚙️"},{id:"billing",label:"Billing",icon:"💳",disabled:!0},{id:"admin",label:"Admin Panel",icon:"🔐",disabled:!0},{id:"divider",label:"",divider:!0},{id:"help",label:"Help & Support",icon:"❓"},{id:"logout",label:"Sign Out",icon:"🚪"}]}"
      @forge-select="${e=>console.log("User action:",e.detail)}"
    ></forge-dropdown>
  `},g={render:()=>t`
    <forge-dropdown
      label="Navigation"
      .items="${[{id:"home",label:"Home",icon:"🏠"},{id:"products",label:"Products",icon:"📦",items:[{id:"web-apps",label:"Web Applications"},{id:"mobile-apps",label:"Mobile Applications"},{id:"desktop-apps",label:"Desktop Applications"}]},{id:"services",label:"Services",icon:"🔧",items:[{id:"consulting",label:"Consulting"},{id:"development",label:"Development"},{id:"support",label:"Support"}]},{id:"about",label:"About Us",icon:"ℹ️"},{id:"contact",label:"Contact",icon:"📞"}]}"
      @forge-select="${e=>console.log("Navigation:",e.detail)}"
    ></forge-dropdown>
  `},b={render:()=>t`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 100px; padding: 50px; min-height: 400px;">
      <forge-dropdown
        position="top-start"
        label="Top Start"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="top-end"
        label="Top End"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="right"
        label="Right"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="bottom-start"
        label="Bottom Start"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="auto"
        label="Auto Position"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="left"
        label="Left"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
    </div>
  `},f={render:()=>t`
    <div style="display: flex; gap: 20px;">
      <forge-dropdown
        label="Enabled Dropdown"
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        label="Disabled Dropdown"
        disabled
        .items="${o.slice(0,3)}"
      ></forge-dropdown>
    </div>
  `},u={render:()=>t`
    <div style="max-width: 600px;">
      <h3>Interactive Dropdown Demo</h3>
      <p>Try different interactions with the dropdowns below:</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">🎯 Single Select</label>
          <forge-dropdown
            label="Choose Option"
            .items="${[{id:"option1",label:"Option 1",icon:"1️⃣"},{id:"option2",label:"Option 2",icon:"2️⃣"},{id:"option3",label:"Option 3",icon:"3️⃣"}]}"
            @forge-select="${e=>{const i=e.target.nextElementSibling;i&&(i.textContent=`Selected: ${e.detail.item.label}`)}}"
          ></forge-dropdown>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No selection</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">☑️ Multi Select</label>
          <forge-dropdown
            label="Select Multiple"
            multi-select
            close-on-select="false"
            .items="${[{id:"feature1",label:"Feature A",type:"checkbox"},{id:"feature2",label:"Feature B",type:"checkbox"},{id:"feature3",label:"Feature C",type:"checkbox"}]}"
            @forge-select="${e=>{const i=e.target.nextElementSibling;i&&(i.textContent=`Selected: ${e.detail.selected.length} items`)}}"
          ></forge-dropdown>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">0 selected</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">🔘 Radio Select</label>
          <forge-dropdown
            label="Pick One"
            .items="${[{id:"size-s",label:"Small",type:"radio"},{id:"size-m",label:"Medium",type:"radio"},{id:"size-l",label:"Large",type:"radio"}]}"
            @forge-select="${e=>{const i=e.target.nextElementSibling;i&&(i.textContent=`Selected: ${e.detail.item.label}`)}}"
          ></forge-dropdown>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No selection</p>
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Keyboard Navigation:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Open/select item</li>
          <li><kbd>Escape</kbd> - Close dropdown</li>
          <li><kbd>↑</kbd>/<kbd>↓</kbd> - Navigate items</li>
          <li><kbd>Home</kbd>/<kbd>End</kbd> - First/last item</li>
        </ul>
      </div>
    </div>
  `},w={render:()=>{const e=Array.from({length:50},(l,i)=>({id:`item-${i+1}`,label:`Item ${i+1}`,icon:i%10===0?"⭐":void 0,badge:i%15===0?"New":void 0}));return t`
      <forge-dropdown
        label="Long List (50 items)"
        .items="${e}"
        @forge-select="${l=>console.log("Selected from long list:",l.detail)}"
      ></forge-dropdown>
    `}},y={render:()=>t`
    <forge-dropdown
      label="AI-Ready Dropdown"
      semantic-role="menu"
      ai-context="user-actions"
      performance-mode="balanced"
      .items="${[{id:"ai-assist",label:"AI Assistant",icon:"🤖"},{id:"generate",label:"Generate Content",icon:"✨"},{id:"analyze",label:"Analyze Data",icon:"📊"},{id:"optimize",label:"Optimize Performance",icon:"⚡"}]}"
      @forge-select="${e=>{console.log("AI-aware selection:",{item:e.detail.item,context:"user-actions",userIntent:"action-selection"})}}"
    ></forge-dropdown>
  `};var h,x,v;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Options'
  },
  render: args => html\`
    <forge-dropdown
      label="\${args.label}"
      .items="\${basicItems}"
      @forge-select="\${(e: CustomEvent) => console.log('Selected:', e.detail)}"
    ></forge-dropdown>
  \`
}`,...(v=(x=n.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var $,S,k;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
      <forge-dropdown
        variant="default"
        label="Default"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        variant="primary"
        label="Primary"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        variant="secondary"
        label="Secondary"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        variant="minimal"
        label="Minimal"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
    </div>
  \`
}`,...(k=(S=r.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var A,I,D;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
      <forge-dropdown
        size="small"
        label="Small"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        size="medium"
        label="Medium"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        size="large"
        label="Large"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
    </div>
  \`
}`,...(D=(I=a.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};var C,E,z;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => html\`
    <forge-dropdown
      label="Actions"
      .items="\${[{
    id: 'edit',
    label: 'Edit Document',
    icon: '✏️'
  }, {
    id: 'share',
    label: 'Share',
    icon: '🔗',
    badge: '3'
  }, {
    id: 'download',
    label: 'Download',
    icon: '⬇️'
  }, {
    id: 'print',
    label: 'Print',
    icon: '🖨️'
  }, {
    id: 'divider',
    label: '',
    divider: true
  }, {
    id: 'archive',
    label: 'Archive',
    icon: '📦'
  }, {
    id: 'delete',
    label: 'Delete',
    icon: '🗑️'
  }]}"
      @forge-select="\${(e: CustomEvent) => console.log('Action selected:', e.detail)}"
    ></forge-dropdown>
  \`
}`,...(z=(E=d.parameters)==null?void 0:E.docs)==null?void 0:z.source}}};var M,N,O;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => html\`
    <forge-dropdown
      label="File Menu"
      .items="\${groupedItems}"
      @forge-select="\${(e: CustomEvent) => console.log('Menu item selected:', e.detail)}"
    ></forge-dropdown>
  \`
}`,...(O=(N=s.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};var P,L,F;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => html\`
    <forge-dropdown
      label="Select Features"
      multi-select
      close-on-select="false"
      .items="\${[{
    id: 'notifications',
    label: 'Email Notifications',
    type: 'checkbox'
  }, {
    id: 'newsletter',
    label: 'Newsletter',
    type: 'checkbox'
  }, {
    id: 'updates',
    label: 'Product Updates',
    type: 'checkbox'
  }, {
    id: 'marketing',
    label: 'Marketing Emails',
    type: 'checkbox'
  }, {
    id: 'security',
    label: 'Security Alerts',
    type: 'checkbox'
  }]}"
      @forge-select="\${(e: CustomEvent) => {
    console.log('Multi-selection changed:', e.detail);
    console.log('Currently selected:', e.detail.selected);
  }}"
    ></forge-dropdown>
  \`
}`,...(F=(L=c.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var T,R,U;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => html\`
    <forge-dropdown
      label="Choose Theme"
      .items="\${[{
    id: 'light',
    label: 'Light Mode',
    type: 'radio',
    icon: '☀️'
  }, {
    id: 'dark',
    label: 'Dark Mode',
    type: 'radio',
    icon: '🌙'
  }, {
    id: 'auto',
    label: 'Auto (System)',
    type: 'radio',
    icon: '🔄'
  }]}"
      @forge-select="\${(e: CustomEvent) => console.log('Theme selected:', e.detail)}"
    ></forge-dropdown>
  \`
}`,...(U=(R=p.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var B,H,W;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => html\`
    <forge-dropdown
      label="User Actions"
      .items="\${[{
    id: 'profile',
    label: 'View Profile',
    icon: '👤'
  }, {
    id: 'settings',
    label: 'Account Settings',
    icon: '⚙️'
  }, {
    id: 'billing',
    label: 'Billing',
    icon: '💳',
    disabled: true
  }, {
    id: 'admin',
    label: 'Admin Panel',
    icon: '🔐',
    disabled: true
  }, {
    id: 'divider',
    label: '',
    divider: true
  }, {
    id: 'help',
    label: 'Help & Support',
    icon: '❓'
  }, {
    id: 'logout',
    label: 'Sign Out',
    icon: '🚪'
  }]}"
      @forge-select="\${(e: CustomEvent) => console.log('User action:', e.detail)}"
    ></forge-dropdown>
  \`
}`,...(W=(H=m.parameters)==null?void 0:H.docs)==null?void 0:W.source}}};var V,G,_;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => html\`
    <forge-dropdown
      label="Navigation"
      .items="\${[{
    id: 'home',
    label: 'Home',
    icon: '🏠'
  }, {
    id: 'products',
    label: 'Products',
    icon: '📦',
    items: [{
      id: 'web-apps',
      label: 'Web Applications'
    }, {
      id: 'mobile-apps',
      label: 'Mobile Applications'
    }, {
      id: 'desktop-apps',
      label: 'Desktop Applications'
    }]
  }, {
    id: 'services',
    label: 'Services',
    icon: '🔧',
    items: [{
      id: 'consulting',
      label: 'Consulting'
    }, {
      id: 'development',
      label: 'Development'
    }, {
      id: 'support',
      label: 'Support'
    }]
  }, {
    id: 'about',
    label: 'About Us',
    icon: 'ℹ️'
  }, {
    id: 'contact',
    label: 'Contact',
    icon: '📞'
  }]}"
      @forge-select="\${(e: CustomEvent) => console.log('Navigation:', e.detail)}"
    ></forge-dropdown>
  \`
}`,...(_=(G=g.parameters)==null?void 0:G.docs)==null?void 0:_.source}}};var K,j,q;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 100px; padding: 50px; min-height: 400px;">
      <forge-dropdown
        position="top-start"
        label="Top Start"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="top-end"
        label="Top End"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="right"
        label="Right"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="bottom-start"
        label="Bottom Start"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="auto"
        label="Auto Position"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="left"
        label="Left"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
    </div>
  \`
}`,...(q=(j=b.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};var J,Q,X;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 20px;">
      <forge-dropdown
        label="Enabled Dropdown"
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        label="Disabled Dropdown"
        disabled
        .items="\${basicItems.slice(0, 3)}"
      ></forge-dropdown>
    </div>
  \`
}`,...(X=(Q=f.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;u.parameters={...u.parameters,docs:{...(Y=u.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => html\`
    <div style="max-width: 600px;">
      <h3>Interactive Dropdown Demo</h3>
      <p>Try different interactions with the dropdowns below:</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">🎯 Single Select</label>
          <forge-dropdown
            label="Choose Option"
            .items="\${[{
    id: 'option1',
    label: 'Option 1',
    icon: '1️⃣'
  }, {
    id: 'option2',
    label: 'Option 2',
    icon: '2️⃣'
  }, {
    id: 'option3',
    label: 'Option 3',
    icon: '3️⃣'
  }]}"
            @forge-select="\${(e: CustomEvent) => {
    const target = e.target as any;
    const info = target.nextElementSibling;
    if (info) {
      info.textContent = \`Selected: \${e.detail.item.label}\`;
    }
  }}"
          ></forge-dropdown>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No selection</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">☑️ Multi Select</label>
          <forge-dropdown
            label="Select Multiple"
            multi-select
            close-on-select="false"
            .items="\${[{
    id: 'feature1',
    label: 'Feature A',
    type: 'checkbox'
  }, {
    id: 'feature2',
    label: 'Feature B',
    type: 'checkbox'
  }, {
    id: 'feature3',
    label: 'Feature C',
    type: 'checkbox'
  }]}"
            @forge-select="\${(e: CustomEvent) => {
    const target = e.target as any;
    const info = target.nextElementSibling;
    if (info) {
      info.textContent = \`Selected: \${e.detail.selected.length} items\`;
    }
  }}"
          ></forge-dropdown>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">0 selected</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">🔘 Radio Select</label>
          <forge-dropdown
            label="Pick One"
            .items="\${[{
    id: 'size-s',
    label: 'Small',
    type: 'radio'
  }, {
    id: 'size-m',
    label: 'Medium',
    type: 'radio'
  }, {
    id: 'size-l',
    label: 'Large',
    type: 'radio'
  }]}"
            @forge-select="\${(e: CustomEvent) => {
    const target = e.target as any;
    const info = target.nextElementSibling;
    if (info) {
      info.textContent = \`Selected: \${e.detail.item.label}\`;
    }
  }}"
          ></forge-dropdown>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No selection</p>
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Keyboard Navigation:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Open/select item</li>
          <li><kbd>Escape</kbd> - Close dropdown</li>
          <li><kbd>↑</kbd>/<kbd>↓</kbd> - Navigate items</li>
          <li><kbd>Home</kbd>/<kbd>End</kbd> - First/last item</li>
        </ul>
      </div>
    </div>
  \`
}`,...(ee=(Z=u.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var oe,te,ie;w.parameters={...w.parameters,docs:{...(oe=w.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => {
    const longList: DropdownItem[] = Array.from({
      length: 50
    }, (_, i) => ({
      id: \`item-\${i + 1}\`,
      label: \`Item \${i + 1}\`,
      icon: i % 10 === 0 ? '⭐' : undefined,
      badge: i % 15 === 0 ? 'New' : undefined
    }));
    return html\`
      <forge-dropdown
        label="Long List (50 items)"
        .items="\${longList}"
        @forge-select="\${(e: CustomEvent) => console.log('Selected from long list:', e.detail)}"
      ></forge-dropdown>
    \`;
  }
}`,...(ie=(te=w.parameters)==null?void 0:te.docs)==null?void 0:ie.source}}};var le,ne,re;y.parameters={...y.parameters,docs:{...(le=y.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: () => html\`
    <forge-dropdown
      label="AI-Ready Dropdown"
      semantic-role="menu"
      ai-context="user-actions"
      performance-mode="balanced"
      .items="\${[{
    id: 'ai-assist',
    label: 'AI Assistant',
    icon: '🤖'
  }, {
    id: 'generate',
    label: 'Generate Content',
    icon: '✨'
  }, {
    id: 'analyze',
    label: 'Analyze Data',
    icon: '📊'
  }, {
    id: 'optimize',
    label: 'Optimize Performance',
    icon: '⚡'
  }]}"
      @forge-select="\${(e: CustomEvent) => {
    console.log('AI-aware selection:', {
      item: e.detail.item,
      context: 'user-actions',
      userIntent: 'action-selection'
    });
  }}"
    ></forge-dropdown>
  \`
}`,...(re=(ne=y.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};const pe=["Default","Variants","Sizes","WithIcons","GroupedItems","MultiSelect","RadioSelection","WithDisabledItems","NestedMenus","Positions","DisabledState","InteractiveDemo","LongList","AIIntegration"];export{y as AIIntegration,n as Default,f as DisabledState,s as GroupedItems,u as InteractiveDemo,w as LongList,c as MultiSelect,g as NestedMenus,b as Positions,p as RadioSelection,a as Sizes,r as Variants,m as WithDisabledItems,d as WithIcons,pe as __namedExportsOrder,ce as default};
