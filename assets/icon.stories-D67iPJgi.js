import{E as C,T as ce,x as i,i as le}from"./iframe-C-1QsWs8.js";import{B as pe,n as s,r as d,t as de}from"./BaseElement-DPaqdHne.js";import"./preload-helper-C1FmrZbK.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge={CHILD:2},me=e=>(...n)=>({_$litDirective$:e,values:n});class fe{constructor(n){}get _$AU(){return this._$AM._$AU}_$AT(n,r,a){this._$Ct=n,this._$AM=r,this._$Ci=a}_$AS(n,r){return this.update(n,r)}update(n,r){return this.render(...r)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class M extends fe{constructor(n){if(super(n),this.it=C,n.type!==ge.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(n){if(n===C||n==null)return this._t=void 0,this.it=n;if(n===ce)return n;if(typeof n!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(n===this.it)return this._t;this.it=n;const r=[n];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}}M.directiveName="unsafeHTML",M.resultType=1;const he=me(M);var xe=Object.defineProperty,ue=Object.getOwnPropertyDescriptor,t=(e,n,r,a)=>{for(var c=a>1?void 0:a?ue(n,r):n,l=e.length-1,p;l>=0;l--)(p=e[l])&&(c=(a?p(n,r,c):p(c))||c);return a&&c&&xe(n,r,c),c};let o=class extends pe{constructor(){super(...arguments),this.size="md",this.spin=!1,this.pulse=!1,this.ariaDescription=null,this.maxRenderMs=16,this.warnOnViolation=!1,this.performanceMode="auto",this.devMode=!1,this.showMetrics=!1,this.loading=!1,this.error=!1,this.renderTime=0,this.renderCount=0}static registerIcon(e,n,r){this.iconRegistry.set(e,{svg:n,viewBox:r})}static registerIcons(e){Object.entries(e).forEach(([n,r])=>{typeof r=="string"?this.registerIcon(n,r):this.registerIcon(n,r.svg,r.viewBox)})}static async loadIconSet(e){try{const r=await(await fetch(e)).json();this.registerIcons(r)}catch(n){throw console.error("Failed to load icon set:",n),n}}connectedCallback(){super.connectedCallback(),this.updateAria()}firstUpdated(){const e=performance.now();if(this.name&&o.iconRegistry.has(this.name)){this.iconData=o.iconRegistry.get(this.name),this.error=!1,this.trackRenderPerformance(e);return}this.name||this.src?this.loadIcon():this.trackRenderPerformance(e)}updated(e){super.updated(e);const n=e.has("name"),r=e.has("src");if(!(e.has("name")&&e.get("name")===void 0||e.has("src")&&e.get("src")===void 0)&&(n||r))if(this.name&&o.iconRegistry.has(this.name)){const c=performance.now();this.iconData=o.iconRegistry.get(this.name),this.error=!1,this.trackRenderPerformance(c)}else(this.name||this.src)&&this.loadIcon();(e.has("label")||e.has("semanticRole")||e.has("aiContext"))&&this.updateAria()}async loadIcon(){const e=performance.now();if(this.name){const n=o.iconRegistry.get(this.name);if(n){this.iconData=n,this.error=!1,this.trackRenderPerformance(e);return}this.src?await this.loadFromUrl(this.src):(this.error=!0,console.warn(`Icon "${this.name}" not found in registry`))}else this.src&&await this.loadFromUrl(this.src);this.trackRenderPerformance(e)}async loadFromUrl(e){const n=o.loadingIcons.get(e);if(n)try{this.iconData=await n,this.error=!1;return}catch{this.error=!0;return}const r=this.fetchIcon(e);o.loadingIcons.set(e,r);try{this.loading=!0,this.iconData=await r,this.error=!1,this.name&&o.iconRegistry.set(this.name,this.iconData)}catch(a){this.error=!0,console.error("Failed to load icon:",a)}finally{this.loading=!1,o.loadingIcons.delete(e)}}async fetchIcon(e){const n=await fetch(e);if(!n.ok)throw new Error(`Failed to fetch icon: ${n.statusText}`);const r=await n.text(),l=new DOMParser().parseFromString(r,"image/svg+xml").querySelector("svg");if(!l)throw new Error("Invalid SVG file");const p=l.getAttribute("viewBox")||void 0;return{svg:l.innerHTML,viewBox:p}}updateAria(){const e=this.label?"img":"presentation";this.setAttribute("role",e),this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"),this.ariaDescription&&this.setAttribute("aria-description",this.ariaDescription),this.semanticRole&&this.setAttribute("data-semantic-role",this.semanticRole),this.aiContext&&this.setAttribute("data-ai-context",this.aiContext)}trackRenderPerformance(e){const n=performance.now();if(this.renderTime=n-e,this.renderCount++,this.renderTime>this.maxRenderMs){const r=`Icon render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;this.warnOnViolation&&console.warn(r,{component:"forge-icon",name:this.name,renderTime:this.renderTime,maxRenderMs:this.maxRenderMs,renderCount:this.renderCount}),this.performanceMode==="auto"&&this.applyPerformanceDegradation()}this.devMode&&console.log("Icon render metrics:",{component:"forge-icon",name:this.name,renderTime:this.renderTime,renderCount:this.renderCount,cacheHit:!!o.iconRegistry.get(this.name||"")})}applyPerformanceDegradation(){this.spin=!1,this.pulse=!1}render(){const e=this.renderIcon(),n=this.showMetrics?this.renderMetrics():null;return i`
      ${n}
      ${e}
    `}renderIcon(){if(this.loading)return this.renderLoading();if(this.error||!this.iconData)return this.renderError();const e=this.iconData.viewBox||"0 0 24 24";return i`
      <svg 
        viewBox="${e}"
        xmlns="http://www.w3.org/2000/svg"
        part="svg">
        ${he(this.iconData.svg)}
      </svg>
    `}renderLoading(){return i`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" part="svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
        <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" stroke-width="2" fill="none">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="1s"
            repeatCount="indefinite"/>
        </path>
      </svg>
    `}renderError(){return i`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" part="svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
      </svg>
    `}renderMetrics(){const e=this.renderTime>this.maxRenderMs?"error":this.renderTime>this.maxRenderMs*.75?"warning":"";return i`
      <div class="performance-overlay ${e}">
        Icon: ${this.name||"custom"}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}<br>
        Cache: ${o.iconRegistry.size} icons
      </div>
    `}};o.styles=le`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: currentColor;
        fill: currentColor;
        line-height: 1;
        flex-shrink: 0;
        max-width: 100%;
        vertical-align: middle;
      }

      :host([hidden]) {
        display: none !important;
      }

      svg {
        width: 100%;
        height: 100%;
        display: block;
        fill: currentColor;
        stroke: currentColor;
      }

      /* Size variants */
      :host([size="xs"]) {
        width: 16px;
        height: 16px;
      }

      :host([size="sm"]) {
        width: 20px;
        height: 20px;
      }

      :host([size="md"]) {
        width: 24px;
        height: 24px;
      }

      :host([size="lg"]) {
        width: 32px;
        height: 32px;
      }

      :host([size="xl"]) {
        width: 40px;
        height: 40px;
      }

      /* Spin animation */
      :host([spin]) svg {
        animation: forge-icon-spin 1s linear infinite;
      }

      @keyframes forge-icon-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      /* Pulse animation */
      :host([pulse]) svg {
        animation: forge-icon-pulse 2s ease-in-out infinite;
      }

      @keyframes forge-icon-pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      /* Performance overlay */
      .performance-overlay {
        position: fixed;
        top: 4px;
        left: 4px;
        background: rgba(0, 0, 0, 0.8);
        color: #00ff00;
        padding: 4px 8px;
        font-family: monospace;
        font-size: 10px;
        border-radius: 4px;
        z-index: 10000;
        pointer-events: none;
      }

      .performance-overlay.warning {
        color: #ffff00;
      }

      .performance-overlay.error {
        color: #ff0000;
      }
    `;o.iconRegistry=new Map;o.loadingIcons=new Map;t([s({type:String})],o.prototype,"name",2);t([s({type:String})],o.prototype,"src",2);t([s({type:String})],o.prototype,"size",2);t([s({type:Boolean})],o.prototype,"spin",2);t([s({type:Boolean})],o.prototype,"pulse",2);t([s({type:String})],o.prototype,"label",2);t([s({type:String,attribute:"semantic-role"})],o.prototype,"semanticRole",2);t([s({type:String,attribute:"ai-context"})],o.prototype,"aiContext",2);t([s({type:String,attribute:"aria-description"})],o.prototype,"ariaDescription",2);t([s({type:Number,attribute:"max-render-ms"})],o.prototype,"maxRenderMs",2);t([s({type:Boolean,attribute:"warn-on-violation"})],o.prototype,"warnOnViolation",2);t([s({type:String,attribute:"performance-mode"})],o.prototype,"performanceMode",2);t([s({type:Boolean,attribute:"dev-mode"})],o.prototype,"devMode",2);t([s({type:Boolean,attribute:"show-metrics"})],o.prototype,"showMetrics",2);t([d()],o.prototype,"iconData",2);t([d()],o.prototype,"loading",2);t([d()],o.prototype,"error",2);t([d()],o.prototype,"renderTime",2);t([d()],o.prototype,"renderCount",2);o=t([de("forge-icon")],o);const ye={"chevron-down":'<path d="M6 9l6 6 6-6"/>',"chevron-up":'<path d="M18 15l-6-6-6 6"/>',"chevron-left":'<path d="M15 18l-6-6 6-6"/>',"chevron-right":'<path d="M9 18l6-6-6-6"/>',check:'<path d="M20 6L9 17l-5-5"/>',close:'<path d="M18 6L6 18M6 6l12 12"/>',menu:'<path d="M3 12h18M3 6h18M3 18h18"/>',search:'<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 7.54l4.24 4.24m12.68 0l4.24 4.24M1.54 16.46l4.24-4.24"/>',"alert-circle":'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',warning:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',heart:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',minus:'<line x1="5" y1="12" x2="19" y2="12"/>',"arrow-left":'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',"arrow-right":'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',"arrow-up":'<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',"arrow-down":'<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',expand_less:'<polyline points="18 15 12 9 6 15"/>',expand_more:'<polyline points="6 9 12 15 18 9"/>',folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',file:'<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',"chevron-double-left":'<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>',"chevron-double-right":'<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',image:'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>'};o.registerIcons(ye);const Ie={title:"Atoms/Icon",component:"forge-icon",tags:["autodocs"],argTypes:{name:{control:{type:"select"},options:["chevron-down","chevron-up","chevron-left","chevron-right","check","close","menu","search","user","home","settings","alert-circle","info","warning","star","heart","trash","edit","copy","download","upload","plus","minus","arrow-left","arrow-right","arrow-up","arrow-down"],description:"Icon name from registry"},size:{control:{type:"select"},options:["xs","sm","md","lg","xl"],description:"Icon size",defaultValue:"md"},spin:{control:{type:"boolean"},description:"Apply spin animation",defaultValue:!1},pulse:{control:{type:"boolean"},description:"Apply pulse animation",defaultValue:!1},label:{control:{type:"text"},description:"Accessibility label"},src:{control:{type:"text"},description:"External SVG URL"},semanticRole:{control:{type:"text"},description:"Semantic role for AI understanding"},aiContext:{control:{type:"text"},description:"Context for AI assistants"},maxRenderMs:{control:{type:"number"},description:"Maximum render time in milliseconds",defaultValue:16},warnOnViolation:{control:{type:"boolean"},description:"Warn on performance violations",defaultValue:!1},performanceMode:{control:{type:"select"},options:["auto","fast","normal"],description:"Performance mode setting",defaultValue:"auto"},devMode:{control:{type:"boolean"},description:"Enable development mode",defaultValue:!1},showMetrics:{control:{type:"boolean"},description:"Show performance metrics",defaultValue:!1}},parameters:{docs:{description:{component:`
The ForgeIcon component is a flexible, performant icon system with built-in icon registry, lazy loading, and AI-ready metadata.

## Features
- SVG-based with optimal rendering
- Built-in icon registry with 25+ common icons
- Lazy loading for external icons
- Five size variants (xs, sm, md, lg, xl)
- Spin and pulse animations
- Color inheritance from parent
- **AI-Ready**: Semantic roles and context for AI assistants
- **Performance Monitoring**: Self-monitoring with auto-degradation
- **Developer Mode**: Built-in metrics and debugging

## Usage

### Basic Usage
\`\`\`html
<forge-icon name="home"></forge-icon>
<forge-icon name="user" size="lg"></forge-icon>
<forge-icon name="settings" spin></forge-icon>
\`\`\`

### With Custom SVG
\`\`\`html
<forge-icon src="/assets/custom-icon.svg"></forge-icon>
\`\`\`

### AI-Ready Icon
\`\`\`html
<forge-icon 
  name="menu"
  semantic-role="navigation-toggle"
  ai-context="main-header"
  label="Open navigation menu">
</forge-icon>
\`\`\`

### Register Custom Icons
\`\`\`javascript
import { ForgeIcon } from '@nexcraft/forge';

// Register single icon
ForgeIcon.registerIcon('custom', '<path d="..."/>');

// Register multiple icons
ForgeIcon.registerIcons({
  icon1: '<path d="..."/>',
  icon2: { svg: '<path d="..."/>', viewBox: '0 0 100 100' }
});

// Load icon set from URL
await ForgeIcon.loadIconSet('/assets/icons.json');
\`\`\`
        `}}}},g={render:e=>i`
    <forge-icon
      name="${e.name||"home"}"
      size="${e.size}"
      ?spin="${e.spin}"
      ?pulse="${e.pulse}"
      label="${e.label||""}"
      src="${e.src||""}"
    ></forge-icon>
  `},m={render:()=>i`
    <div style="display: flex; align-items: center; gap: 16px;">
      <forge-icon name="star" size="xs"></forge-icon>
      <forge-icon name="star" size="sm"></forge-icon>
      <forge-icon name="star" size="md"></forge-icon>
      <forge-icon name="star" size="lg"></forge-icon>
      <forge-icon name="star" size="xl"></forge-icon>
    </div>
  `},f={render:()=>i`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px; padding: 20px;">
      ${["chevron-down","chevron-up","chevron-left","chevron-right","check","close","menu","search","user","home","settings","alert-circle","info","warning","star","heart","trash","edit","copy","download","upload","plus","minus","arrow-left","arrow-right","arrow-up","arrow-down"].map(e=>i`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <forge-icon name="${e}" size="lg"></forge-icon>
          <span style="font-size: 12px; color: #666;">${e}</span>
        </div>
      `)}
    </div>
  `},h={render:()=>i`
    <div style="display: flex; gap: 32px; align-items: center;">
      <div style="text-align: center;">
        <forge-icon name="settings" size="lg" spin></forge-icon>
        <div style="margin-top: 8px; font-size: 14px;">Spin</div>
      </div>
      <div style="text-align: center;">
        <forge-icon name="heart" size="lg" pulse></forge-icon>
        <div style="margin-top: 8px; font-size: 14px;">Pulse</div>
      </div>
    </div>
  `},x={render:()=>i`
    <div style="display: flex; gap: 16px;">
      <forge-icon name="star" size="lg" style="color: #3b82f6;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #ef4444;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #10b981;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #f59e0b;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #8b5cf6;"></forge-icon>
    </div>
  `},u={render:()=>i`
    <div style="display: flex; gap: 24px;">
      <forge-icon name="home" label="Home page"></forge-icon>
      <forge-icon name="user" label="User profile"></forge-icon>
      <forge-icon name="settings" label="Settings menu"></forge-icon>
    </div>
  `},y={render:()=>i`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <forge-button variant="primary">
        <forge-icon name="download" size="sm" style="margin-right: 8px;"></forge-icon>
        Download
      </forge-button>
      
      <forge-button variant="secondary">
        <forge-icon name="upload" size="sm" style="margin-right: 8px;"></forge-icon>
        Upload
      </forge-button>
      
      <forge-button variant="danger">
        <forge-icon name="trash" size="sm" style="margin-right: 8px;"></forge-icon>
        Delete
      </forge-button>
      
      <forge-button variant="ghost" size="sm">
        <forge-icon name="menu"></forge-icon>
      </forge-button>
    </div>
  `},v={render:()=>i`
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <forge-icon src="/loading-test.svg"></forge-icon>
        <div style="margin-top: 8px; font-size: 14px;">Loading</div>
      </div>
      <div style="text-align: center;">
        <forge-icon name="non-existent"></forge-icon>
        <div style="margin-top: 8px; font-size: 14px;">Error</div>
      </div>
    </div>
  `},b={name:"AI-Ready Icon",render:()=>i`
    <forge-icon 
      name="menu"
      size="lg"
      semantic-role="navigation-toggle"
      ai-context="main-header"
      aria-description="Toggle button for main navigation menu"
      label="Open navigation">
    </forge-icon>
    <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata:</strong><br>
      Semantic Role: navigation-toggle<br>
      AI Context: main-header<br>
      ARIA Description: Toggle button for main navigation menu<br>
      Label: Open navigation
    </div>
  `},w={name:"Performance Monitoring",render:()=>i`
    <forge-icon 
      name="settings"
      size="lg"
      spin
      max-render-ms="8"
      warn-on-violation
      performance-mode="auto"
      dev-mode
      show-metrics>
    </forge-icon>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: 8ms<br>
      Warnings: Enabled<br>
      Mode: Auto-degradation (animations disabled if slow)<br>
      <em>Check console for performance logs</em>
    </div>
  `},z={name:"Icon Grid Example",render:()=>i`
    <div style="background: #f9fafb; padding: 24px; border-radius: 8px;">
      <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 16px; font-weight: 600;">Navigation Icons</h3>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
        <button style="display: flex; flex-direction: column; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
          <forge-icon name="home" size="lg" semantic-role="nav-home"></forge-icon>
          <span style="margin-top: 8px; font-size: 12px;">Home</span>
        </button>
        <button style="display: flex; flex-direction: column; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
          <forge-icon name="search" size="lg" semantic-role="nav-search"></forge-icon>
          <span style="margin-top: 8px; font-size: 12px;">Search</span>
        </button>
        <button style="display: flex; flex-direction: column; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
          <forge-icon name="user" size="lg" semantic-role="nav-profile"></forge-icon>
          <span style="margin-top: 8px; font-size: 12px;">Profile</span>
        </button>
        <button style="display: flex; flex-direction: column; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
          <forge-icon name="settings" size="lg" semantic-role="nav-settings"></forge-icon>
          <span style="margin-top: 8px; font-size: 12px;">Settings</span>
        </button>
      </div>
      
      <h3 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">Action Icons</h3>
      <div style="display: flex; gap: 8px;">
        <button style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
          <forge-icon name="plus" size="sm"></forge-icon>
          Add New
        </button>
        <button style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: white; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer;">
          <forge-icon name="edit" size="sm"></forge-icon>
          Edit
        </button>
        <button style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: white; border: 1px solid #ef4444; color: #ef4444; border-radius: 6px; cursor: pointer;">
          <forge-icon name="trash" size="sm"></forge-icon>
          Delete
        </button>
      </div>
    </div>
  `},I={name:"Custom Icon Registration",render:()=>(o.registerIcon("custom-logo",`
      <g>
        <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="currentColor"/>
      </g>
    `),i`
      <div style="display: flex; gap: 24px; align-items: center;">
        <forge-icon name="custom-logo" size="xl"></forge-icon>
        <div>
          <div style="font-weight: 600;">Custom Registered Icon</div>
          <div style="font-size: 14px; color: #666; margin-top: 4px;">
            Registered using ForgeIcon.registerIcon()
          </div>
        </div>
      </div>
    `)};var R,S,k;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: args => html\`
    <forge-icon
      name="\${args.name || 'home'}"
      size="\${args.size}"
      ?spin="\${args.spin}"
      ?pulse="\${args.pulse}"
      label="\${args.label || ''}"
      src="\${args.src || ''}"
    ></forge-icon>
  \`
}`,...(k=(S=g.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var A,$,D;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; align-items: center; gap: 16px;">
      <forge-icon name="star" size="xs"></forge-icon>
      <forge-icon name="star" size="sm"></forge-icon>
      <forge-icon name="star" size="md"></forge-icon>
      <forge-icon name="star" size="lg"></forge-icon>
      <forge-icon name="star" size="xl"></forge-icon>
    </div>
  \`
}`,...(D=($=m.parameters)==null?void 0:$.docs)==null?void 0:D.source}}};var T,L,_;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px; padding: 20px;">
      \${['chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'check', 'close', 'menu', 'search', 'user', 'home', 'settings', 'alert-circle', 'info', 'warning', 'star', 'heart', 'trash', 'edit', 'copy', 'download', 'upload', 'plus', 'minus', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down'].map(name => html\`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <forge-icon name="\${name}" size="lg"></forge-icon>
          <span style="font-size: 12px; color: #666;">\${name}</span>
        </div>
      \`)}
    </div>
  \`
}`,...(_=(L=f.parameters)==null?void 0:L.docs)==null?void 0:_.source}}};var F,B,V;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 32px; align-items: center;">
      <div style="text-align: center;">
        <forge-icon name="settings" size="lg" spin></forge-icon>
        <div style="margin-top: 8px; font-size: 14px;">Spin</div>
      </div>
      <div style="text-align: center;">
        <forge-icon name="heart" size="lg" pulse></forge-icon>
        <div style="margin-top: 8px; font-size: 14px;">Pulse</div>
      </div>
    </div>
  \`
}`,...(V=(B=h.parameters)==null?void 0:B.docs)==null?void 0:V.source}}};var E,H,P;x.parameters={...x.parameters,docs:{...(E=x.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 16px;">
      <forge-icon name="star" size="lg" style="color: #3b82f6;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #ef4444;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #10b981;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #f59e0b;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #8b5cf6;"></forge-icon>
    </div>
  \`
}`,...(P=(H=x.parameters)==null?void 0:H.docs)==null?void 0:P.source}}};var O,U,N;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 24px;">
      <forge-icon name="home" label="Home page"></forge-icon>
      <forge-icon name="user" label="User profile"></forge-icon>
      <forge-icon name="settings" label="Settings menu"></forge-icon>
    </div>
  \`
}`,...(N=(U=u.parameters)==null?void 0:U.docs)==null?void 0:N.source}}};var G,j,W;y.parameters={...y.parameters,docs:{...(G=y.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <forge-button variant="primary">
        <forge-icon name="download" size="sm" style="margin-right: 8px;"></forge-icon>
        Download
      </forge-button>
      
      <forge-button variant="secondary">
        <forge-icon name="upload" size="sm" style="margin-right: 8px;"></forge-icon>
        Upload
      </forge-button>
      
      <forge-button variant="danger">
        <forge-icon name="trash" size="sm" style="margin-right: 8px;"></forge-icon>
        Delete
      </forge-button>
      
      <forge-button variant="ghost" size="sm">
        <forge-icon name="menu"></forge-icon>
      </forge-button>
    </div>
  \`
}`,...(W=(j=y.parameters)==null?void 0:j.docs)==null?void 0:W.source}}};var q,J,K;v.parameters={...v.parameters,docs:{...(q=v.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <forge-icon src="/loading-test.svg"></forge-icon>
        <div style="margin-top: 8px; font-size: 14px;">Loading</div>
      </div>
      <div style="text-align: center;">
        <forge-icon name="non-existent"></forge-icon>
        <div style="margin-top: 8px; font-size: 14px;">Error</div>
      </div>
    </div>
  \`
}`,...(K=(J=v.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Y;b.parameters={...b.parameters,docs:{...(Q=b.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  name: 'AI-Ready Icon',
  render: () => html\`
    <forge-icon 
      name="menu"
      size="lg"
      semantic-role="navigation-toggle"
      ai-context="main-header"
      aria-description="Toggle button for main navigation menu"
      label="Open navigation">
    </forge-icon>
    <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata:</strong><br>
      Semantic Role: navigation-toggle<br>
      AI Context: main-header<br>
      ARIA Description: Toggle button for main navigation menu<br>
      Label: Open navigation
    </div>
  \`
}`,...(Y=(X=b.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,ne;w.parameters={...w.parameters,docs:{...(Z=w.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  name: 'Performance Monitoring',
  render: () => html\`
    <forge-icon 
      name="settings"
      size="lg"
      spin
      max-render-ms="8"
      warn-on-violation
      performance-mode="auto"
      dev-mode
      show-metrics>
    </forge-icon>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: 8ms<br>
      Warnings: Enabled<br>
      Mode: Auto-degradation (animations disabled if slow)<br>
      <em>Check console for performance logs</em>
    </div>
  \`
}`,...(ne=(ee=w.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var oe,re,te;z.parameters={...z.parameters,docs:{...(oe=z.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  name: 'Icon Grid Example',
  render: () => html\`
    <div style="background: #f9fafb; padding: 24px; border-radius: 8px;">
      <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 16px; font-weight: 600;">Navigation Icons</h3>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
        <button style="display: flex; flex-direction: column; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
          <forge-icon name="home" size="lg" semantic-role="nav-home"></forge-icon>
          <span style="margin-top: 8px; font-size: 12px;">Home</span>
        </button>
        <button style="display: flex; flex-direction: column; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
          <forge-icon name="search" size="lg" semantic-role="nav-search"></forge-icon>
          <span style="margin-top: 8px; font-size: 12px;">Search</span>
        </button>
        <button style="display: flex; flex-direction: column; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
          <forge-icon name="user" size="lg" semantic-role="nav-profile"></forge-icon>
          <span style="margin-top: 8px; font-size: 12px;">Profile</span>
        </button>
        <button style="display: flex; flex-direction: column; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
          <forge-icon name="settings" size="lg" semantic-role="nav-settings"></forge-icon>
          <span style="margin-top: 8px; font-size: 12px;">Settings</span>
        </button>
      </div>
      
      <h3 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">Action Icons</h3>
      <div style="display: flex; gap: 8px;">
        <button style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
          <forge-icon name="plus" size="sm"></forge-icon>
          Add New
        </button>
        <button style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: white; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer;">
          <forge-icon name="edit" size="sm"></forge-icon>
          Edit
        </button>
        <button style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: white; border: 1px solid #ef4444; color: #ef4444; border-radius: 6px; cursor: pointer;">
          <forge-icon name="trash" size="sm"></forge-icon>
          Delete
        </button>
      </div>
    </div>
  \`
}`,...(te=(re=z.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var ie,se,ae;I.parameters={...I.parameters,docs:{...(ie=I.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  name: 'Custom Icon Registration',
  render: () => {
    // Register a custom icon for this story
    ForgeIcon.registerIcon('custom-logo', \`
      <g>
        <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="currentColor"/>
      </g>
    \`);
    return html\`
      <div style="display: flex; gap: 24px; align-items: center;">
        <forge-icon name="custom-logo" size="xl"></forge-icon>
        <div>
          <div style="font-weight: 600;">Custom Registered Icon</div>
          <div style="font-size: 14px; color: #666; margin-top: 4px;">
            Registered using ForgeIcon.registerIcon()
          </div>
        </div>
      </div>
    \`;
  }
}`,...(ae=(se=I.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};const Me=["Default","AllSizes","CommonIcons","Animations","Colors","WithLabels","InButtons","LoadingStates","AIReadyIcon","PerformanceMonitoring","IconGrid","CustomIconRegistration"];export{b as AIReadyIcon,m as AllSizes,h as Animations,x as Colors,f as CommonIcons,I as CustomIconRegistration,g as Default,z as IconGrid,y as InButtons,v as LoadingStates,w as PerformanceMonitoring,u as WithLabels,Me as __namedExportsOrder,Ie as default};
