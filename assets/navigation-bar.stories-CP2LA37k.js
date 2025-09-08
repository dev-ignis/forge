import{x as n}from"./iframe-C-1QsWs8.js";import"./preload-helper-C1FmrZbK.js";const q={title:"Organisms/NavigationBar",component:"forge-navigation-bar",parameters:{layout:"fullscreen",docs:{description:{component:"A responsive navigation bar component with logo, menu items, user actions, and mobile drawer support."}}},argTypes:{variant:{control:{type:"select"},options:["default","transparent","minimal"],description:"Navigation bar visual style"},position:{control:{type:"select"},options:["static","sticky","fixed"],description:"Navigation bar positioning"},showLogo:{control:"boolean",description:"Show logo/brand in navigation"},showSearch:{control:"boolean",description:"Show search functionality"},showThemeToggle:{control:"boolean",description:"Show theme toggle button"},showUserMenu:{control:"boolean",description:"Show user menu dropdown"}}},o=[{label:"Dashboard",href:"/dashboard",active:!0},{label:"Components",href:"/components"},{label:"Documentation",href:"/docs"},{label:"Examples",href:"/examples"},{label:"Support",href:"/support"}],J=[{label:"Profile",icon:"user",href:"/profile"},{label:"Settings",icon:"settings",href:"/settings"},{label:"Help",icon:"help",href:"/help"},{type:"divider"},{label:"Sign Out",icon:"logout",href:"/logout"}],t={render:()=>n`
    <forge-navigation-bar
      .navigationItems="${o}"
      .userMenuItems="${J}"
      show-logo
      show-search
      show-theme-toggle
      show-user-menu
    >
      <div slot="logo">
        <img src="/logo.svg" alt="Forge" width="32" height="32" style="margin-right: 8px;">
        <span style="font-weight: 600; font-size: 18px;">Forge</span>
      </div>
      <div slot="user-info">
        <img src="/avatar.jpg" alt="User" width="32" height="32" style="border-radius: 50%; margin-right: 8px;">
        <span>John Doe</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px; height: 500px;">
      <h1>Page Content</h1>
      <p>Navigation bar content appears above this content.</p>
    </div>
  `},a={args:{variant:"minimal"},render:e=>n`
    <forge-navigation-bar
      variant="${e.variant}"
      .navigationItems="${o.slice(0,3)}"
      show-logo
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">Minimal</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px; height: 400px;">
      <h1>Minimal Navigation</h1>
      <p>Clean and simple navigation with only essential items.</p>
    </div>
  `},i={args:{variant:"transparent"},render:e=>n`
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 500px;">
      <forge-navigation-bar
        variant="${e.variant}"
        .navigationItems="${o}"
        show-logo
        show-theme-toggle
      >
        <div slot="logo">
          <span style="font-weight: 600; font-size: 18px; color: white;">Transparent</span>
        </div>
      </forge-navigation-bar>
      <div style="padding: 40px 20px; color: white;">
        <h1>Hero Section</h1>
        <p>Transparent navigation overlays beautifully on hero sections and full-screen backgrounds.</p>
      </div>
    </div>
  `},s={render:()=>n`
    <forge-navigation-bar
      .navigationItems="${o}"
      show-logo
      show-search
      show-user-menu
      @search="${e=>console.log("Search:",e.detail)}"
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">🔍 Search Demo</span>
      </div>
      <div slot="user-info">
        <span>Search User</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Search-Enabled Navigation</h1>
      <p>Use the search bar in the navigation to find content. Search events are logged to the console.</p>
    </div>
  `},r={parameters:{viewport:{defaultViewport:"mobile1"}},render:()=>n`
    <forge-navigation-bar
      .navigationItems="${o}"
      .userMenuItems="${J}"
      show-logo
      show-search
      show-theme-toggle
      show-user-menu
      mobile-breakpoint="768"
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">📱 Mobile</span>
      </div>
      <div slot="user-info">
        <span>Mobile User</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Mobile Navigation</h1>
      <p>Resize the viewport or use mobile device simulation to see the responsive behavior.</p>
      <p>On mobile, navigation items collapse into a hamburger menu.</p>
    </div>
  `},l={render:()=>n`
      <forge-navigation-bar
        .navigationItems="${[{label:"Dashboard",href:"/dashboard",active:!0},{label:"Components",children:[{label:"Atoms",href:"/components/atoms"},{label:"Molecules",href:"/components/molecules"},{label:"Organisms",href:"/components/organisms"}]},{label:"Resources",children:[{label:"Documentation",href:"/docs"},{label:"Examples",href:"/examples"},{label:"Tutorials",href:"/tutorials"},{type:"divider"},{label:"GitHub",href:"https://github.com",external:!0}]},{label:"Support",href:"/support"}]}"
        show-logo
        show-user-menu
        @navigation-click="${c=>console.log("Navigation click:",c.detail)}"
      >
        <div slot="logo">
          <span style="font-weight: 600; font-size: 18px;">🌲 Submenus</span>
        </div>
        <div slot="user-info">
          <span>Admin User</span>
        </div>
      </forge-navigation-bar>
      <div style="padding: 20px;">
        <h1>Navigation with Submenus</h1>
        <p>Hover over "Components" and "Resources" to see dropdown submenus.</p>
      </div>
    `},g={args:{position:"sticky"},render:e=>n`
    <forge-navigation-bar
      position="${e.position}"
      .navigationItems="${o}"
      show-logo
      show-search
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">📌 Sticky Nav</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Sticky Navigation Demo</h1>
      <p>Scroll down to see the sticky navigation behavior.</p>
      ${Array.from({length:20},(c,V)=>n`
        <div style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <h3>Content Section ${V+1}</h3>
          <p>This is sample content to demonstrate scrolling behavior with sticky navigation.</p>
        </div>
      `)}
    </div>
  `},p={render:()=>n`
    <forge-navigation-bar
      .navigationItems="${o}"
      show-logo
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">⚡ Custom Actions</span>
      </div>
      <div slot="actions">
        <forge-button variant="outline" size="small" @click="${()=>console.log("Notifications")}">
          🔔 Notifications
          <forge-badge variant="danger" size="small">3</forge-badge>
        </forge-button>
        <forge-button variant="primary" size="small" @click="${()=>console.log("Create")}">
          ➕ Create
        </forge-button>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Custom Actions</h1>
      <p>Navigation bar with custom action buttons in the actions slot.</p>
    </div>
  `},d={render:()=>n`
    <forge-navigation-bar
      .navigationItems="${o}"
      show-logo
      show-theme-toggle
      @theme-change="${e=>{console.log("Theme changed to:",e.detail.theme),document.body.setAttribute("data-theme",e.detail.theme)}}"
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">🌓 Theme Toggle</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Theme Toggle Demo</h1>
      <p>Click the theme toggle button to switch between light and dark modes.</p>
      <p>Theme changes are logged to the console and applied to the document body.</p>
    </div>
  `},h={render:()=>n`
    <forge-navigation-bar
      .navigationItems="${o}"
      show-logo
      show-search
      show-user-menu
      semantic-role="main-navigation"
      ai-context="application-header"
      performance-mode="balanced"
      @navigation-click="${e=>{console.log("AI-aware navigation:",{item:e.detail,context:"main-navigation",userIntent:"page-navigation"})}}"
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">🤖 AI-Ready Nav</span>
      </div>
      <div slot="user-info">
        <span>AI User</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>AI-Ready Navigation</h1>
      <p>This navigation includes AI metadata for intelligent interactions:</p>
      <ul>
        <li><strong>Semantic Role:</strong> main-navigation</li>
        <li><strong>AI Context:</strong> application-header</li>
        <li><strong>Performance Mode:</strong> balanced</li>
      </ul>
      <p>Navigation interactions provide rich context for AI agents.</p>
    </div>
  `};var v,m,u;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => html\`
    <forge-navigation-bar
      .navigationItems="\${navigationItems}"
      .userMenuItems="\${userMenuItems}"
      show-logo
      show-search
      show-theme-toggle
      show-user-menu
    >
      <div slot="logo">
        <img src="/logo.svg" alt="Forge" width="32" height="32" style="margin-right: 8px;">
        <span style="font-weight: 600; font-size: 18px;">Forge</span>
      </div>
      <div slot="user-info">
        <img src="/avatar.jpg" alt="User" width="32" height="32" style="border-radius: 50%; margin-right: 8px;">
        <span>John Doe</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px; height: 500px;">
      <h1>Page Content</h1>
      <p>Navigation bar content appears above this content.</p>
    </div>
  \`
}`,...(u=(m=t.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var b,f,w;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    variant: 'minimal'
  },
  render: args => html\`
    <forge-navigation-bar
      variant="\${args.variant}"
      .navigationItems="\${navigationItems.slice(0, 3)}"
      show-logo
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">Minimal</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px; height: 400px;">
      <h1>Minimal Navigation</h1>
      <p>Clean and simple navigation with only essential items.</p>
    </div>
  \`
}`,...(w=(f=a.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var y,x,I;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'transparent'
  },
  render: args => html\`
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 500px;">
      <forge-navigation-bar
        variant="\${args.variant}"
        .navigationItems="\${navigationItems}"
        show-logo
        show-theme-toggle
      >
        <div slot="logo">
          <span style="font-weight: 600; font-size: 18px; color: white;">Transparent</span>
        </div>
      </forge-navigation-bar>
      <div style="padding: 40px 20px; color: white;">
        <h1>Hero Section</h1>
        <p>Transparent navigation overlays beautifully on hero sections and full-screen backgrounds.</p>
      </div>
    </div>
  \`
}`,...(I=(x=i.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};var S,$,k;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => html\`
    <forge-navigation-bar
      .navigationItems="\${navigationItems}"
      show-logo
      show-search
      show-user-menu
      @search="\${(e: CustomEvent) => console.log('Search:', e.detail)}"
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">🔍 Search Demo</span>
      </div>
      <div slot="user-info">
        <span>Search User</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Search-Enabled Navigation</h1>
      <p>Use the search bar in the navigation to find content. Search events are logged to the console.</p>
    </div>
  \`
}`,...(k=($=s.parameters)==null?void 0:$.docs)==null?void 0:k.source}}};var A,N,T;r.parameters={...r.parameters,docs:{...(A=r.parameters)==null?void 0:A.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => html\`
    <forge-navigation-bar
      .navigationItems="\${navigationItems}"
      .userMenuItems="\${userMenuItems}"
      show-logo
      show-search
      show-theme-toggle
      show-user-menu
      mobile-breakpoint="768"
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">📱 Mobile</span>
      </div>
      <div slot="user-info">
        <span>Mobile User</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Mobile Navigation</h1>
      <p>Resize the viewport or use mobile device simulation to see the responsive behavior.</p>
      <p>On mobile, navigation items collapse into a hamburger menu.</p>
    </div>
  \`
}`,...(T=(N=r.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var C,z,M;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => {
    const itemsWithSubmenus = [{
      label: 'Dashboard',
      href: '/dashboard',
      active: true
    }, {
      label: 'Components',
      children: [{
        label: 'Atoms',
        href: '/components/atoms'
      }, {
        label: 'Molecules',
        href: '/components/molecules'
      }, {
        label: 'Organisms',
        href: '/components/organisms'
      }]
    }, {
      label: 'Resources',
      children: [{
        label: 'Documentation',
        href: '/docs'
      }, {
        label: 'Examples',
        href: '/examples'
      }, {
        label: 'Tutorials',
        href: '/tutorials'
      }, {
        type: 'divider'
      }, {
        label: 'GitHub',
        href: 'https://github.com',
        external: true
      }]
    }, {
      label: 'Support',
      href: '/support'
    }];
    return html\`
      <forge-navigation-bar
        .navigationItems="\${itemsWithSubmenus}"
        show-logo
        show-user-menu
        @navigation-click="\${(e: CustomEvent) => console.log('Navigation click:', e.detail)}"
      >
        <div slot="logo">
          <span style="font-weight: 600; font-size: 18px;">🌲 Submenus</span>
        </div>
        <div slot="user-info">
          <span>Admin User</span>
        </div>
      </forge-navigation-bar>
      <div style="padding: 20px;">
        <h1>Navigation with Submenus</h1>
        <p>Hover over "Components" and "Resources" to see dropdown submenus.</p>
      </div>
    \`;
  }
}`,...(M=(z=l.parameters)==null?void 0:z.docs)==null?void 0:M.source}}};var D,R,U;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    position: 'sticky'
  },
  render: args => html\`
    <forge-navigation-bar
      position="\${args.position}"
      .navigationItems="\${navigationItems}"
      show-logo
      show-search
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">📌 Sticky Nav</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Sticky Navigation Demo</h1>
      <p>Scroll down to see the sticky navigation behavior.</p>
      \${Array.from({
    length: 20
  }, (_, i) => html\`
        <div style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <h3>Content Section \${i + 1}</h3>
          <p>This is sample content to demonstrate scrolling behavior with sticky navigation.</p>
        </div>
      \`)}
    </div>
  \`
}`,...(U=(R=g.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var E,W,H;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => html\`
    <forge-navigation-bar
      .navigationItems="\${navigationItems}"
      show-logo
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">⚡ Custom Actions</span>
      </div>
      <div slot="actions">
        <forge-button variant="outline" size="small" @click="\${() => console.log('Notifications')}">
          🔔 Notifications
          <forge-badge variant="danger" size="small">3</forge-badge>
        </forge-button>
        <forge-button variant="primary" size="small" @click="\${() => console.log('Create')}">
          ➕ Create
        </forge-button>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Custom Actions</h1>
      <p>Navigation bar with custom action buttons in the actions slot.</p>
    </div>
  \`
}`,...(H=(W=p.parameters)==null?void 0:W.docs)==null?void 0:H.source}}};var O,P,F;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => html\`
    <forge-navigation-bar
      .navigationItems="\${navigationItems}"
      show-logo
      show-theme-toggle
      @theme-change="\${(e: CustomEvent) => {
    console.log('Theme changed to:', e.detail.theme);
    document.body.setAttribute('data-theme', e.detail.theme);
  }}"
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">🌓 Theme Toggle</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Theme Toggle Demo</h1>
      <p>Click the theme toggle button to switch between light and dark modes.</p>
      <p>Theme changes are logged to the console and applied to the document body.</p>
    </div>
  \`
}`,...(F=(P=d.parameters)==null?void 0:P.docs)==null?void 0:F.source}}};var _,j,G;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => html\`
    <forge-navigation-bar
      .navigationItems="\${navigationItems}"
      show-logo
      show-search
      show-user-menu
      semantic-role="main-navigation"
      ai-context="application-header"
      performance-mode="balanced"
      @navigation-click="\${(e: CustomEvent) => {
    console.log('AI-aware navigation:', {
      item: e.detail,
      context: 'main-navigation',
      userIntent: 'page-navigation'
    });
  }}"
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">🤖 AI-Ready Nav</span>
      </div>
      <div slot="user-info">
        <span>AI User</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>AI-Ready Navigation</h1>
      <p>This navigation includes AI metadata for intelligent interactions:</p>
      <ul>
        <li><strong>Semantic Role:</strong> main-navigation</li>
        <li><strong>AI Context:</strong> application-header</li>
        <li><strong>Performance Mode:</strong> balanced</li>
      </ul>
      <p>Navigation interactions provide rich context for AI agents.</p>
    </div>
  \`
}`,...(G=(j=h.parameters)==null?void 0:j.docs)==null?void 0:G.source}}};const K=["Default","Minimal","Transparent","WithSearch","MobileResponsive","WithSubmenus","StickyPosition","CustomActions","ThemeToggleDemo","AIIntegration"];export{h as AIIntegration,p as CustomActions,t as Default,a as Minimal,r as MobileResponsive,g as StickyPosition,d as ThemeToggleDemo,i as Transparent,s as WithSearch,l as WithSubmenus,K as __namedExportsOrder,q as default};
