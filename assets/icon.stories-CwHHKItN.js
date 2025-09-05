import{f as fe,u as he,i as ue,a as me,E as T,T as xe,x as l}from"./iframe-RyCF64Jj.js";import"./preload-helper-C1FmrZbK.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ye=t=>(e,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ve={attribute:!0,type:String,converter:he,reflect:!1,hasChanged:fe},be=(t=ve,e,n)=>{const{kind:i,metadata:o}=n;let s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(n.name,t),i==="accessor"){const{name:d}=n;return{set(g){const R=e.get.call(this);e.set.call(this,g),this.requestUpdate(d,R,t)},init(g){return g!==void 0&&this.C(d,void 0,t,g),g}}}if(i==="setter"){const{name:d}=n;return function(g){const R=this[d];e.call(this,g),this.requestUpdate(d,R,t)}}throw Error("Unsupported decorator location: "+i)};function a(t){return(e,n)=>typeof n=="object"?be(t,e,n):((i,o,s)=>{const d=o.hasOwnProperty(s);return o.constructor.createProperty(s,i),d?Object.getOwnPropertyDescriptor(o,s):void 0})(t,e,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function f(t){return a({...t,state:!0,attribute:!1})}var we=Object.defineProperty,m=(t,e,n,i)=>{for(var o=void 0,s=t.length-1,d;s>=0;s--)(d=t[s])&&(o=d(e,n,o)||o);return o&&we(e,n,o),o};const A=class A extends ue{constructor(){super(),this.ariaDescription=null,this.maxRenderMs=16,this.warnOnViolation=!1,this.performanceMode="auto",this.devMode=!1,this.showMetrics=!1,this.renderTime=0,this.renderCount=0,this.performanceStartTime=0,this.aiMetadata={purpose:"UI Component",criticality:"low"},this.componentState=new Map,this.performanceStartTime=globalThis.performance.now()}checkPerformance(e){const n=globalThis.performance.now();if(this.renderTime=n-e,this.renderCount++,this.renderTime>this.maxRenderMs){const i=`${this.tagName} render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;this.warnOnViolation&&console.warn(i,{component:this.tagName.toLowerCase(),renderTime:this.renderTime,maxRenderMs:this.maxRenderMs,renderCount:this.renderCount,performanceMode:this.performanceMode}),this.performanceMode==="auto"&&this.applyPerformanceDegradation()}this.devMode&&console.log(`${this.tagName} render metrics:`,{component:this.tagName.toLowerCase(),renderTime:this.renderTime,renderCount:this.renderCount,totalTime:n-this.performanceStartTime})}applyPerformanceDegradation(){}get aiState(){const e={};this.componentState.forEach((i,o)=>{e[o]=i});const n={renderTime:this.renderTime,renderCount:this.renderCount,violations:0,mode:this.performanceMode};return{component:this.tagName.toLowerCase(),semanticRole:this.semanticRole,context:this.aiContext,description:this.ariaDescription,metadata:this.aiMetadata,state:e,attributes:this.getAttributeNames().reduce((i,o)=>(i[o]=this.getAttribute(o),i),{}),possibleActions:this.getPossibleActions(),stateExplanation:this.explainState(),performance:n}}getAIDescription(){const e=`${this.tagName.toLowerCase()} component`,n=this.aiMetadata.purpose||"UI interaction",i=this.semanticRole?` with role ${this.semanticRole}`:"",o=this.aiContext?` in ${this.aiContext} context`:"";return`${e} for ${n}${i}${o}`}getPossibleActions(){return[]}explainState(){return{currentState:"default",possibleStates:["default"],stateDescription:"Component in default state"}}updateComponentState(e,n){this.componentState.set(e,n),this.emit("ai-state-change",{key:e,value:n,fullState:this.aiState})}getSemanticAttributes(){const e={};return this.semanticRole&&(e["data-semantic-role"]=this.semanticRole),this.aiContext&&(e["data-ai-context"]=this.aiContext),this.aiMetadata.criticality&&this.aiMetadata.criticality!=="low"&&(e["data-criticality"]=this.aiMetadata.criticality),this.aiMetadata.dataType&&(e["data-type"]=this.aiMetadata.dataType),e}emit(e,n,i){const o=new CustomEvent(e,{detail:n,bubbles:!0,composed:!0,cancelable:!0,...i});return this.dispatchEvent(o)}announceToScreenReader(e){const n=document.createElement("div");n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.style.position="absolute",n.style.left="-10000px",n.style.width="1px",n.style.height="1px",n.style.overflow="hidden",n.textContent=e,document.body.appendChild(n),setTimeout(()=>document.body.removeChild(n),1e3)}firstUpdated(e){super.firstUpdated(e),this.setAttribute("data-ready","true")}trapFocus(e=this){const n=e.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'),i=n[0],o=n[n.length-1];e.addEventListener("keydown",s=>{s.key==="Tab"&&(s.shiftKey&&document.activeElement===i?(s.preventDefault(),o==null||o.focus()):!s.shiftKey&&document.activeElement===o&&(s.preventDefault(),i==null||i.focus()))})}};A.styles=me`
    :host {
      box-sizing: border-box;
    }
    
    *, *::before, *::after {
      box-sizing: inherit;
    }
  `;let p=A;m([a({type:String,attribute:"semantic-role"})],p.prototype,"semanticRole");m([a({type:String,attribute:"ai-context"})],p.prototype,"aiContext");m([a({type:String,attribute:"aria-description"})],p.prototype,"ariaDescription");m([a({type:Number,attribute:"max-render-ms"})],p.prototype,"maxRenderMs");m([a({type:Boolean,attribute:"warn-on-violation"})],p.prototype,"warnOnViolation");m([a({type:String,attribute:"performance-mode"})],p.prototype,"performanceMode");m([a({type:Boolean,attribute:"dev-mode"})],p.prototype,"devMode");m([a({type:Boolean,attribute:"show-metrics"})],p.prototype,"showMetrics");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ze={CHILD:2},Me=t=>(...e)=>({_$litDirective$:t,values:e});class Ie{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,n,i){this._$Ct=e,this._$AM=n,this._$Ci=i}_$AS(e,n){return this.update(e,n)}update(e,n){return this.render(...n)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class $ extends Ie{constructor(e){if(super(e),this.it=T,e.type!==ze.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===T||e==null)return this._t=void 0,this.it=e;if(e===xe)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const n=[e];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}$.directiveName="unsafeHTML",$.resultType=1;const Ce=Me($);var Se=Object.defineProperty,Re=Object.getOwnPropertyDescriptor,c=(t,e,n,i)=>{for(var o=i>1?void 0:i?Re(e,n):e,s=t.length-1,d;s>=0;s--)(d=t[s])&&(o=(i?d(e,n,o):d(o))||o);return i&&o&&Se(e,n,o),o};let r=class extends p{constructor(){super(...arguments),this.size="md",this.spin=!1,this.pulse=!1,this.ariaDescription=null,this.maxRenderMs=16,this.warnOnViolation=!1,this.performanceMode="auto",this.devMode=!1,this.showMetrics=!1,this.loading=!1,this.error=!1,this.renderTime=0,this.renderCount=0}static registerIcon(t,e,n){this.iconRegistry.set(t,{svg:e,viewBox:n})}static registerIcons(t){Object.entries(t).forEach(([e,n])=>{typeof n=="string"?this.registerIcon(e,n):this.registerIcon(e,n.svg,n.viewBox)})}static async loadIconSet(t){try{const n=await(await fetch(t)).json();this.registerIcons(n)}catch(e){throw console.error("Failed to load icon set:",e),e}}connectedCallback(){super.connectedCallback(),this.updateAria()}firstUpdated(){const t=performance.now();if(this.name&&r.iconRegistry.has(this.name)){this.iconData=r.iconRegistry.get(this.name),this.error=!1,this.trackRenderPerformance(t);return}this.name||this.src?this.loadIcon():this.trackRenderPerformance(t)}updated(t){super.updated(t);const e=t.has("name"),n=t.has("src");if(!(t.has("name")&&t.get("name")===void 0||t.has("src")&&t.get("src")===void 0)&&(e||n))if(this.name&&r.iconRegistry.has(this.name)){const o=performance.now();this.iconData=r.iconRegistry.get(this.name),this.error=!1,this.trackRenderPerformance(o)}else(this.name||this.src)&&this.loadIcon();(t.has("label")||t.has("semanticRole")||t.has("aiContext"))&&this.updateAria()}async loadIcon(){const t=performance.now();if(this.name){const e=r.iconRegistry.get(this.name);if(e){this.iconData=e,this.error=!1,this.trackRenderPerformance(t);return}this.src?await this.loadFromUrl(this.src):(this.error=!0,console.warn(`Icon "${this.name}" not found in registry`))}else this.src&&await this.loadFromUrl(this.src);this.trackRenderPerformance(t)}async loadFromUrl(t){const e=r.loadingIcons.get(t);if(e)try{this.iconData=await e,this.error=!1;return}catch{this.error=!0;return}const n=this.fetchIcon(t);r.loadingIcons.set(t,n);try{this.loading=!0,this.iconData=await n,this.error=!1,this.name&&r.iconRegistry.set(this.name,this.iconData)}catch(i){this.error=!0,console.error("Failed to load icon:",i)}finally{this.loading=!1,r.loadingIcons.delete(t)}}async fetchIcon(t){const e=await fetch(t);if(!e.ok)throw new Error(`Failed to fetch icon: ${e.statusText}`);const n=await e.text(),s=new DOMParser().parseFromString(n,"image/svg+xml").querySelector("svg");if(!s)throw new Error("Invalid SVG file");const d=s.getAttribute("viewBox")||void 0;return{svg:s.innerHTML,viewBox:d}}updateAria(){const t=this.label?"img":"presentation";this.setAttribute("role",t),this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"),this.ariaDescription&&this.setAttribute("aria-description",this.ariaDescription),this.semanticRole&&this.setAttribute("data-semantic-role",this.semanticRole),this.aiContext&&this.setAttribute("data-ai-context",this.aiContext)}trackRenderPerformance(t){const e=performance.now();if(this.renderTime=e-t,this.renderCount++,this.renderTime>this.maxRenderMs){const n=`Icon render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;this.warnOnViolation&&console.warn(n,{component:"forge-icon",name:this.name,renderTime:this.renderTime,maxRenderMs:this.maxRenderMs,renderCount:this.renderCount}),this.performanceMode==="auto"&&this.applyPerformanceDegradation()}this.devMode&&console.log("Icon render metrics:",{component:"forge-icon",name:this.name,renderTime:this.renderTime,renderCount:this.renderCount,cacheHit:!!r.iconRegistry.get(this.name||"")})}applyPerformanceDegradation(){this.spin=!1,this.pulse=!1}render(){const t=this.renderIcon(),e=this.showMetrics?this.renderMetrics():null;return l`
      ${e}
      ${t}
    `}renderIcon(){if(this.loading)return this.renderLoading();if(this.error||!this.iconData)return this.renderError();const t=this.iconData.viewBox||"0 0 24 24";return l`
      <svg 
        viewBox="${t}"
        xmlns="http://www.w3.org/2000/svg"
        part="svg">
        ${Ce(this.iconData.svg)}
      </svg>
    `}renderLoading(){return l`
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
    `}renderError(){return l`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" part="svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
      </svg>
    `}renderMetrics(){const t=this.renderTime>this.maxRenderMs?"error":this.renderTime>this.maxRenderMs*.75?"warning":"";return l`
      <div class="performance-overlay ${t}">
        Icon: ${this.name||"custom"}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}<br>
        Cache: ${r.iconRegistry.size} icons
      </div>
    `}};r.styles=me`
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
    `;r.iconRegistry=new Map;r.loadingIcons=new Map;c([a({type:String})],r.prototype,"name",2);c([a({type:String})],r.prototype,"src",2);c([a({type:String})],r.prototype,"size",2);c([a({type:Boolean})],r.prototype,"spin",2);c([a({type:Boolean})],r.prototype,"pulse",2);c([a({type:String})],r.prototype,"label",2);c([a({type:String,attribute:"semantic-role"})],r.prototype,"semanticRole",2);c([a({type:String,attribute:"ai-context"})],r.prototype,"aiContext",2);c([a({type:String,attribute:"aria-description"})],r.prototype,"ariaDescription",2);c([a({type:Number,attribute:"max-render-ms"})],r.prototype,"maxRenderMs",2);c([a({type:Boolean,attribute:"warn-on-violation"})],r.prototype,"warnOnViolation",2);c([a({type:String,attribute:"performance-mode"})],r.prototype,"performanceMode",2);c([a({type:Boolean,attribute:"dev-mode"})],r.prototype,"devMode",2);c([a({type:Boolean,attribute:"show-metrics"})],r.prototype,"showMetrics",2);c([f()],r.prototype,"iconData",2);c([f()],r.prototype,"loading",2);c([f()],r.prototype,"error",2);c([f()],r.prototype,"renderTime",2);c([f()],r.prototype,"renderCount",2);r=c([ye("forge-icon")],r);const $e={"chevron-down":'<path d="M6 9l6 6 6-6"/>',"chevron-up":'<path d="M18 15l-6-6-6 6"/>',"chevron-left":'<path d="M15 18l-6-6 6-6"/>',"chevron-right":'<path d="M9 18l6-6-6-6"/>',check:'<path d="M20 6L9 17l-5-5"/>',close:'<path d="M18 6L6 18M6 6l12 12"/>',menu:'<path d="M3 12h18M3 6h18M3 18h18"/>',search:'<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 7.54l4.24 4.24m12.68 0l4.24 4.24M1.54 16.46l4.24-4.24"/>',"alert-circle":'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',warning:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',heart:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',minus:'<line x1="5" y1="12" x2="19" y2="12"/>',"arrow-left":'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',"arrow-right":'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',"arrow-up":'<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',"arrow-down":'<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>'};r.registerIcons($e);const ke={title:"Atoms/Icon",component:"forge-icon",tags:["autodocs"],argTypes:{name:{control:{type:"select"},options:["chevron-down","chevron-up","chevron-left","chevron-right","check","close","menu","search","user","home","settings","alert-circle","info","warning","star","heart","trash","edit","copy","download","upload","plus","minus","arrow-left","arrow-right","arrow-up","arrow-down"],description:"Icon name from registry"},size:{control:{type:"select"},options:["xs","sm","md","lg","xl"],description:"Icon size",defaultValue:"md"},spin:{control:{type:"boolean"},description:"Apply spin animation",defaultValue:!1},pulse:{control:{type:"boolean"},description:"Apply pulse animation",defaultValue:!1},label:{control:{type:"text"},description:"Accessibility label"},src:{control:{type:"text"},description:"External SVG URL"},semanticRole:{control:{type:"text"},description:"Semantic role for AI understanding"},aiContext:{control:{type:"text"},description:"Context for AI assistants"},maxRenderMs:{control:{type:"number"},description:"Maximum render time in milliseconds",defaultValue:16},warnOnViolation:{control:{type:"boolean"},description:"Warn on performance violations",defaultValue:!1},performanceMode:{control:{type:"select"},options:["auto","fast","normal"],description:"Performance mode setting",defaultValue:"auto"},devMode:{control:{type:"boolean"},description:"Enable development mode",defaultValue:!1},showMetrics:{control:{type:"boolean"},description:"Show performance metrics",defaultValue:!1}},parameters:{docs:{description:{component:`
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
        `}}}},h={render:t=>l`
    <forge-icon
      name="${t.name||"home"}"
      size="${t.size}"
      ?spin="${t.spin}"
      ?pulse="${t.pulse}"
      label="${t.label||""}"
      src="${t.src||""}"
    ></forge-icon>
  `},u={render:()=>l`
    <div style="display: flex; align-items: center; gap: 16px;">
      <forge-icon name="star" size="xs"></forge-icon>
      <forge-icon name="star" size="sm"></forge-icon>
      <forge-icon name="star" size="md"></forge-icon>
      <forge-icon name="star" size="lg"></forge-icon>
      <forge-icon name="star" size="xl"></forge-icon>
    </div>
  `},x={render:()=>l`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px; padding: 20px;">
      ${["chevron-down","chevron-up","chevron-left","chevron-right","check","close","menu","search","user","home","settings","alert-circle","info","warning","star","heart","trash","edit","copy","download","upload","plus","minus","arrow-left","arrow-right","arrow-up","arrow-down"].map(t=>l`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <forge-icon name="${t}" size="lg"></forge-icon>
          <span style="font-size: 12px; color: #666;">${t}</span>
        </div>
      `)}
    </div>
  `},y={render:()=>l`
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
  `},v={render:()=>l`
    <div style="display: flex; gap: 16px;">
      <forge-icon name="star" size="lg" style="color: #3b82f6;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #ef4444;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #10b981;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #f59e0b;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #8b5cf6;"></forge-icon>
    </div>
  `},b={render:()=>l`
    <div style="display: flex; gap: 24px;">
      <forge-icon name="home" label="Home page"></forge-icon>
      <forge-icon name="user" label="User profile"></forge-icon>
      <forge-icon name="settings" label="Settings menu"></forge-icon>
    </div>
  `},w={render:()=>l`
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
  `},z={render:()=>l`
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
  `},M={name:"AI-Ready Icon",render:()=>l`
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
  `},I={name:"Performance Monitoring",render:()=>l`
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
  `},C={name:"Icon Grid Example",render:()=>l`
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
  `},S={name:"Custom Icon Registration",render:()=>(r.registerIcon("custom-logo",`
      <g>
        <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="currentColor"/>
      </g>
    `),l`
      <div style="display: flex; gap: 24px; align-items: center;">
        <forge-icon name="custom-logo" size="xl"></forge-icon>
        <div>
          <div style="font-weight: 600;">Custom Registered Icon</div>
          <div style="font-size: 14px; color: #666; margin-top: 4px;">
            Registered using ForgeIcon.registerIcon()
          </div>
        </div>
      </div>
    `)};var k,D,L;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(L=(D=h.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var P,E,O;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; align-items: center; gap: 16px;">
      <forge-icon name="star" size="xs"></forge-icon>
      <forge-icon name="star" size="sm"></forge-icon>
      <forge-icon name="star" size="md"></forge-icon>
      <forge-icon name="star" size="lg"></forge-icon>
      <forge-icon name="star" size="xl"></forge-icon>
    </div>
  \`
}`,...(O=(E=u.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var _,U,F;x.parameters={...x.parameters,docs:{...(_=x.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(F=(U=x.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};var V,B,N;y.parameters={...y.parameters,docs:{...(V=y.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(N=(B=y.parameters)==null?void 0:B.docs)==null?void 0:N.source}}};var H,j,G;v.parameters={...v.parameters,docs:{...(H=v.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 16px;">
      <forge-icon name="star" size="lg" style="color: #3b82f6;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #ef4444;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #10b981;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #f59e0b;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #8b5cf6;"></forge-icon>
    </div>
  \`
}`,...(G=(j=v.parameters)==null?void 0:j.docs)==null?void 0:G.source}}};var W,q,K;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 24px;">
      <forge-icon name="home" label="Home page"></forge-icon>
      <forge-icon name="user" label="User profile"></forge-icon>
      <forge-icon name="settings" label="Settings menu"></forge-icon>
    </div>
  \`
}`,...(K=(q=b.parameters)==null?void 0:q.docs)==null?void 0:K.source}}};var J,Q,X;w.parameters={...w.parameters,docs:{...(J=w.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(X=(Q=w.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;z.parameters={...z.parameters,docs:{...(Y=z.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(ee=(Z=z.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,ne,oe;M.parameters={...M.parameters,docs:{...(te=M.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(oe=(ne=M.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var re,ie,se;I.parameters={...I.parameters,docs:{...(re=I.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(se=(ie=I.parameters)==null?void 0:ie.docs)==null?void 0:se.source}}};var ae,ce,le;C.parameters={...C.parameters,docs:{...(ae=C.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
}`,...(le=(ce=C.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};var de,pe,ge;S.parameters={...S.parameters,docs:{...(de=S.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
}`,...(ge=(pe=S.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};const De=["Default","AllSizes","CommonIcons","Animations","Colors","WithLabels","InButtons","LoadingStates","AIReadyIcon","PerformanceMonitoring","IconGrid","CustomIconRegistration"];export{M as AIReadyIcon,u as AllSizes,y as Animations,v as Colors,x as CommonIcons,S as CustomIconRegistration,h as Default,C as IconGrid,w as InButtons,z as LoadingStates,I as PerformanceMonitoring,b as WithLabels,De as __namedExportsOrder,ke as default};
