import{i as J,x as n}from"./iframe-C-1QsWs8.js";import{n as T,r as K,B as Z,t as tt}from"./BaseElement-DPaqdHne.js";import"./preload-helper-C1FmrZbK.js";var et=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,u=(t,e,o,a)=>{for(var s=a>1?void 0:a?ot(e,o):e,i=t.length-1,r;i>=0;i--)(r=t[i])&&(s=(a?r(e,o,s):r(s))||s);return a&&s&&et(e,o,s),s};let d=class extends Z{constructor(){super(...arguments),this.aiMetadata={purpose:"Toast notification queue management and positioning",context:"notification-system",dataType:"text",criticality:"medium",semanticRole:"region"},this.position="top-right",this.maxToasts=5,this.stackNewest=!0,this.toasts=[],this.toastQueue=[]}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","region"),this.setAttribute("aria-label","Notifications"),this.setAttribute("aria-live","polite"),this.addEventListener("toast-dismissed",this.handleToastDismissed.bind(this)),document.querySelector('forge-toast-container[data-global="true"]')||(this.setAttribute("data-global","true"),window.forgeToastContainer=this)}disconnectedCallback(){super.disconnectedCallback(),window.forgeToastContainer===this&&(window.forgeToastContainer=null)}handleToastDismissed(t){const e=t.detail.toastId;this.removeToast(e),this.processQueue()}addToast(t){const e=t.id||this.generateToastId(),o={id:e,title:t.title,message:t.message,variant:t.variant||"info",duration:t.duration??5e3,dismissible:t.dismissible??!0,persistent:t.persistent??!1,showProgress:t.showProgress??!1};return this.toasts.length>=this.maxToasts?this.toastQueue.push(o):this.createToast(o),e}removeToast(t){const e=this.toasts.find(a=>a.toastId===t);if(e)return e.dismiss(),!0;const o=this.toastQueue.findIndex(a=>a.id===t);return o>=0?(this.toastQueue.splice(o,1),!0):!1}clearAll(){this.toasts.forEach(t=>t.dismiss()),this.toastQueue=[]}getToasts(){return[...this.toasts]}getToastCount(){return{active:this.toasts.length,queued:this.toastQueue.length,total:this.toasts.length+this.toastQueue.length}}createToast(t){var a;const e=document.createElement("forge-toast");e.toastId=t.id,e.title=t.title||"",e.message=t.message,e.variant=t.variant,e.duration=t.duration,e.dismissible=t.dismissible,e.persistent=t.persistent,e.showProgress=t.showProgress,this.stackNewest?this.toasts.unshift(e):this.toasts.push(e);const o=(a=this.shadowRoot)==null?void 0:a.querySelector(".toast-container");o&&(this.stackNewest?o.prepend(e):o.append(e)),this.requestUpdate()}processQueue(){for(this.toasts=this.toasts.filter(t=>t.parentNode);this.toasts.length<this.maxToasts&&this.toastQueue.length>0;){const t=this.toastQueue.shift();t&&this.createToast(t)}this.requestUpdate()}generateToastId(){return`toast-${Date.now()}-${Math.random().toString(36).substr(2,9)}`}render(){return n`
      <div class="toast-container" part="container" role="log" aria-live="polite">
        <div part="stack">
          <!-- Toasts are dynamically added here -->
        </div>
      </div>
    `}explainState(){const t=[],e=this.getToastCount();e.total===0?t.push("empty"):e.queued>0?t.push("queued"):e.active===this.maxToasts?t.push("full"):t.push("active");const o=t.join("-")||"empty";return{currentState:o,possibleStates:["empty","active","full","queued"],stateDescription:this.getStateDescription(o)}}getStateDescription(t){const e=this.getToastCount();return{empty:"Toast container has no active or queued notifications",active:`Toast container showing ${e.active} of ${this.maxToasts} notifications`,full:`Toast container at capacity with ${e.active} active notifications`,queued:`Toast container full with ${e.active} active and ${e.queued} queued notifications`}[t]||`Toast container in ${t} state. Position: ${this.position}`}getPossibleActions(){const t=this.getToastCount();return[{name:"addToast",description:"Add a new toast notification",available:!0},{name:"clearAll",description:"Remove all toast notifications",available:t.total>0},{name:"removeToast",description:"Remove a specific toast by ID",available:t.active>0}]}get aiState(){const t=this.getToastCount();return{...super.aiState,position:this.position,maxToasts:this.maxToasts,stackNewest:this.stackNewest,activeToasts:t.active,queuedToasts:t.queued,totalToasts:t.total,toastIds:this.toasts.map(e=>e.toastId)}}};d.styles=J`
    :host {
      position: fixed;
      pointer-events: none;
      z-index: var(--forge-toast-container-z-index, 9999);
      --forge-toast-stack-gap: var(--space-3, 12px);
    }

    .toast-container {
      display: flex;
      flex-direction: column;
      gap: var(--forge-toast-stack-gap);
      pointer-events: none;
    }

    .toast-container > * {
      pointer-events: auto;
    }

    /* Position variants */
    :host([position="top-left"]) {
      top: var(--forge-spacing-lg, 24px);
      left: var(--forge-spacing-lg, 24px);
    }

    :host([position="top-center"]) {
      top: var(--forge-spacing-lg, 24px);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="top-right"]) {
      top: var(--forge-spacing-lg, 24px);
      right: var(--forge-spacing-lg, 24px);
    }

    :host([position="bottom-left"]) {
      bottom: var(--forge-spacing-lg, 24px);
      left: var(--forge-spacing-lg, 24px);
    }

    :host([position="bottom-center"]) {
      bottom: var(--forge-spacing-lg, 24px);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="bottom-right"]) {
      bottom: var(--forge-spacing-lg, 24px);
      right: var(--forge-spacing-lg, 24px);
    }

    /* Stack ordering for bottom positions */
    :host([position^="bottom"]) .toast-container {
      flex-direction: column-reverse;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
      :host {
        left: var(--forge-spacing-md, 16px) !important;
        right: var(--forge-spacing-md, 16px) !important;
        transform: none !important;
      }

      :host([position="top-center"]),
      :host([position="bottom-center"]) {
        left: var(--forge-spacing-md, 16px);
        right: var(--forge-spacing-md, 16px);
      }

      .toast-container {
        width: 100%;
      }
    }
  `;u([T({reflect:!0})],d.prototype,"position",2);u([T({type:Number,attribute:"max-toasts"})],d.prototype,"maxToasts",2);u([T({type:Boolean,attribute:"stack-newest"})],d.prototype,"stackNewest",2);u([K()],d.prototype,"toasts",2);d=u([tt("forge-toast-container")],d);function l(t){let e=window.forgeToastContainer;return e||(e=document.createElement("forge-toast-container"),e.setAttribute("data-global","true"),document.body.appendChild(e),window.forgeToastContainer=e),e.addToast(t)}const c={info:(t,e)=>l({message:t,title:e,variant:"info"}),success:(t,e)=>l({message:t,title:e,variant:"success"}),warning:(t,e)=>l({message:t,title:e,variant:"warning"}),error:(t,e)=>l({message:t,title:e,variant:"error",persistent:!0}),dismiss:t=>{var e;return(e=window.forgeToastContainer)==null?void 0:e.removeToast(t)},clear:()=>{var t;return(t=window.forgeToastContainer)==null?void 0:t.clearAll()}},nt={title:"Components/Molecules/Toast",component:"forge-toast",parameters:{docs:{description:{component:"Toast notification components for displaying temporary messages to users. Supports auto-dismiss, action buttons, and various notification types with a global container system for queue management."}}},argTypes:{title:{control:{type:"text"},description:"The toast title"},message:{control:{type:"text"},description:"The toast message"},variant:{control:{type:"select"},options:["info","success","warning","error"],description:"Visual variant of the toast"},duration:{control:{type:"number",min:0,max:1e4,step:500},description:"Auto-dismiss duration in milliseconds (0 disables)"},dismissible:{control:{type:"boolean"},description:"Whether the toast can be manually dismissed"},persistent:{control:{type:"boolean"},description:"Whether the toast is persistent (prevents auto-dismiss)"},showProgress:{control:{type:"boolean"},description:"Whether to show a progress bar for timed toasts"}}},p={args:{title:"Notification",message:"This is a default toast notification.",variant:"info",duration:5e3,dismissible:!0,persistent:!1,showProgress:!1},render:t=>n`
    <forge-toast
      title=${t.title}
      message=${t.message}
      variant=${t.variant}
      duration=${t.duration}
      ?dismissible=${t.dismissible}
      ?persistent=${t.persistent}
      ?show-progress=${t.showProgress}
    ></forge-toast>
  `},f={render:()=>n`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <forge-toast
        title="Info Notification"
        message="This is an informational message."
        variant="info"
        persistent
      ></forge-toast>
      
      <forge-toast
        title="Success!"
        message="Your action completed successfully."
        variant="success"
        persistent
      ></forge-toast>
      
      <forge-toast
        title="Warning"
        message="Please review your input before continuing."
        variant="warning"
        persistent
      ></forge-toast>
      
      <forge-toast
        title="Error"
        message="An error occurred while processing your request."
        variant="error"
        persistent
      ></forge-toast>
    </div>
  `},m={render:()=>n`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <forge-toast
        title="Upload in Progress"
        message="Your file is being uploaded..."
        variant="info"
        duration="8000"
        show-progress
      ></forge-toast>
      
      <forge-toast
        title="Processing Data"
        message="Please wait while we process your data."
        variant="warning"
        duration="6000"
        show-progress
      ></forge-toast>
    </div>
  `},h={render:()=>n`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <forge-toast variant="success" duration="10000">
        <span slot="icon">🎉</span>
        <strong>Congratulations!</strong> You've successfully completed the tutorial.
        <forge-button slot="action" size="small" variant="secondary">View Details</forge-button>
      </forge-toast>
      
      <forge-toast variant="warning" persistent>
        <span slot="icon">⚠️</span>
        Your session will expire in 5 minutes. Would you like to extend it?
        <div slot="action" style="display: flex; gap: 8px;">
          <forge-button size="small" variant="primary">Extend</forge-button>
          <forge-button size="small" variant="ghost">Logout</forge-button>
        </div>
      </forge-toast>
    </div>
  `},v={render:()=>{const t=e=>{const o={info:"This is an informational message.",success:"Operation completed successfully!",warning:"Please check your input.",error:"Something went wrong."};l({title:{info:"Information",success:"Success",warning:"Warning",error:"Error"}[e],message:o[e],variant:e,duration:e==="error"?0:5e3,persistent:e==="error"})};return n`
      <div>
        <forge-toast-container position="top-right"></forge-toast-container>
        
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <forge-button @click=${()=>t("info")}>
            Info Toast
          </forge-button>
          <forge-button @click=${()=>t("success")}>
            Success Toast
          </forge-button>
          <forge-button @click=${()=>t("warning")}>
            Warning Toast
          </forge-button>
          <forge-button @click=${()=>t("error")}>
            Error Toast
          </forge-button>
        </div>
        
        <div style="display: flex; gap: 12px;">
          <forge-button @click=${()=>c.clear()} variant="ghost">
            Clear All
          </forge-button>
        </div>
        
        <p style="margin-top: 24px; color: var(--forge-color-text-secondary, #6b7280); font-size: 14px;">
          Click the buttons above to see toasts appear in the top-right corner. 
          Error toasts are persistent and require manual dismissal.
        </p>
      </div>
    `}},b={render:()=>{const t=["top-left","top-center","top-right","bottom-left","bottom-center","bottom-right"];let e=0;return n`
      <div>
        <forge-button @click=${()=>{const a=t[e];e=(e+1)%t.length;const s=document.querySelector('forge-toast-container[data-demo="true"]');s&&s.remove();const i=document.createElement("forge-toast-container");i.position=a,i.setAttribute("data-demo","true"),document.body.appendChild(i),i.addToast({title:`Position: ${a}`,message:`Toast shown at ${a} position`,variant:"info",duration:4e3})}}>
          Demo Container Positions
        </forge-button>
        
        <p style="margin-top: 16px; color: var(--forge-color-text-secondary, #6b7280); font-size: 14px;">
          Click the button to cycle through different toast container positions: 
          ${t.join(" → ")}<br>
          Each toast will appear in a different corner or edge of the screen.
        </p>
      </div>
    `}},x={render:()=>n`
      <div>
        <forge-toast-container position="top-right" max-toasts="3"></forge-toast-container>
        
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <forge-button @click=${()=>{["First toast message","Second toast message","Third toast message","Fourth toast message","Fifth toast message","Sixth toast (queued)","Seventh toast (queued)","Eighth toast (queued)"].forEach((a,s)=>{setTimeout(()=>{l({title:`Toast ${s+1}`,message:a,variant:s%2===0?"info":"success",duration:3e3+s*500})},s*200)})}}>
            Add 8 Timed Toasts (Max 3)
          </forge-button>
          <forge-button @click=${()=>{for(let o=1;o<=7;o++)l({title:`Persistent Toast ${o}`,message:"This toast will not auto-dismiss",variant:o<=3?"warning":"info",persistent:!0})}}>
            Add 7 Persistent Toasts
          </forge-button>
          <forge-button @click=${()=>c.clear()} variant="ghost">
            Clear All
          </forge-button>
        </div>
        
        <div style="background: var(--forge-color-gray-50, #f9fafb); padding: 16px; border-radius: 8px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Queue Management Demo</h4>
          <p style="margin: 0; color: var(--forge-color-text-secondary, #6b7280); font-size: 14px; line-height: 1.4;">
            This container is limited to 3 simultaneous toasts. When you add more, they'll be queued and appear as others are dismissed.
            Try adding 8 timed toasts to see the queue in action, or add persistent toasts to see the queue build up.
          </p>
        </div>
      </div>
    `},y={render:()=>n`
      <div>
        <forge-toast-container position="top-right"></forge-toast-container>
        
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <forge-button @click=${()=>{l({title:"Hover to Pause",message:"Hover over this toast to pause the auto-dismiss timer. Move your mouse away to resume.",variant:"info",duration:8e3,showProgress:!0})}}>
            Hover to Pause Toast
          </forge-button>
          <forge-button @click=${()=>{var a;const o=document.querySelector("forge-toast-container");if(o){const s=document.createElement("forge-toast");s.title="Action Required",s.message="Would you like to save your changes?",s.variant="warning",s.persistent=!0;const i=document.createElement("div");i.slot="action",i.style.cssText="display: flex; gap: 8px; margin-top: 8px;";const r=document.createElement("forge-button");r.textContent="Save",r.size="sm",r.variant="primary",r.addEventListener("click",()=>{s.dismiss(),c.success("Changes saved successfully!")});const g=document.createElement("forge-button");g.textContent="Discard",g.size="sm",g.variant="ghost",g.addEventListener("click",()=>{s.dismiss(),c.info("Changes discarded")}),i.appendChild(r),i.appendChild(g),s.appendChild(i);const P=(a=o.shadowRoot)==null?void 0:a.querySelector(".toast-container");P&&P.appendChild(s)}}}>
            Action Toast
          </forge-button>
        </div>
        
        <div style="background: var(--forge-color-blue-50, #eff6ff); padding: 16px; border-radius: 8px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: var(--forge-color-blue-800, #1e40af);">
            Interactive Features
          </h4>
          <ul style="margin: 0; padding-left: 20px; color: var(--forge-color-blue-700, #1d4ed8); font-size: 14px; line-height: 1.4;">
            <li><strong>Hover to Pause:</strong> Demonstrates timer pause/resume on mouse hover</li>
            <li><strong>Action Buttons:</strong> Shows custom action buttons with toast dismissal</li>
            <li><strong>Progress Bar:</strong> Visual indicator of remaining time</li>
          </ul>
        </div>
      </div>
    `},w={render:()=>n`
    <div>
      <forge-toast-container position="top-right"></forge-toast-container>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 24px;">
        <forge-button @click=${()=>c.info("Information message","Info")}>
          toast.info()
        </forge-button>
        <forge-button @click=${()=>c.success("Success message","Success")}>
          toast.success()
        </forge-button>
        <forge-button @click=${()=>c.warning("Warning message","Warning")}>
          toast.warning()
        </forge-button>
        <forge-button @click=${()=>c.error("Error message","Error")}>
          toast.error()
        </forge-button>
      </div>
      
      <div style="display: flex; gap: 12px;">
        <forge-button @click=${()=>c.clear()} variant="ghost">
          toast.clear()
        </forge-button>
      </div>
      
      <div style="background: var(--forge-color-gray-50, #f9fafb); padding: 16px; border-radius: 8px; margin-top: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Helper Functions</h4>
        <pre style="margin: 0; font-size: 12px; line-height: 1.4; color: var(--forge-color-text-secondary, #6b7280);"><code>// Quick helpers for common toast types
toast.info('Message', 'Optional Title');
toast.success('Message', 'Optional Title');  
toast.warning('Message', 'Optional Title');
toast.error('Message', 'Optional Title');     // Persistent by default

// Management
toast.clear();                                // Clear all toasts
toast.dismiss('toast-id');                   // Dismiss specific toast

// Advanced usage
showToast({
  title: 'Custom Toast',
  message: 'With full options',
  variant: 'info',
  duration: 5000,
  persistent: false,
  showProgress: true
});</code></pre>
      </div>
    </div>
  `};var $,k,C;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    title: 'Notification',
    message: 'This is a default toast notification.',
    variant: 'info',
    duration: 5000,
    dismissible: true,
    persistent: false,
    showProgress: false
  },
  render: args => html\`
    <forge-toast
      title=\${args.title}
      message=\${args.message}
      variant=\${args.variant}
      duration=\${args.duration}
      ?dismissible=\${args.dismissible}
      ?persistent=\${args.persistent}
      ?show-progress=\${args.showProgress}
    ></forge-toast>
  \`
}`,...(C=(k=p.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var E,S,q;f.parameters={...f.parameters,docs:{...(E=f.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <forge-toast
        title="Info Notification"
        message="This is an informational message."
        variant="info"
        persistent
      ></forge-toast>
      
      <forge-toast
        title="Success!"
        message="Your action completed successfully."
        variant="success"
        persistent
      ></forge-toast>
      
      <forge-toast
        title="Warning"
        message="Please review your input before continuing."
        variant="warning"
        persistent
      ></forge-toast>
      
      <forge-toast
        title="Error"
        message="An error occurred while processing your request."
        variant="error"
        persistent
      ></forge-toast>
    </div>
  \`
}`,...(q=(S=f.parameters)==null?void 0:S.docs)==null?void 0:q.source}}};var A,D,z;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <forge-toast
        title="Upload in Progress"
        message="Your file is being uploaded..."
        variant="info"
        duration="8000"
        show-progress
      ></forge-toast>
      
      <forge-toast
        title="Processing Data"
        message="Please wait while we process your data."
        variant="warning"
        duration="6000"
        show-progress
      ></forge-toast>
    </div>
  \`
}`,...(z=(D=m.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};var I,M,W;h.parameters={...h.parameters,docs:{...(I=h.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <forge-toast variant="success" duration="10000">
        <span slot="icon">🎉</span>
        <strong>Congratulations!</strong> You've successfully completed the tutorial.
        <forge-button slot="action" size="small" variant="secondary">View Details</forge-button>
      </forge-toast>
      
      <forge-toast variant="warning" persistent>
        <span slot="icon">⚠️</span>
        Your session will expire in 5 minutes. Would you like to extend it?
        <div slot="action" style="display: flex; gap: 8px;">
          <forge-button size="small" variant="primary">Extend</forge-button>
          <forge-button size="small" variant="ghost">Logout</forge-button>
        </div>
      </forge-toast>
    </div>
  \`
}`,...(W=(M=h.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};var B,Q,H;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const showToastExample = (variant: 'info' | 'success' | 'warning' | 'error') => {
      const messages = {
        info: 'This is an informational message.',
        success: 'Operation completed successfully!',
        warning: 'Please check your input.',
        error: 'Something went wrong.'
      };
      const titles = {
        info: 'Information',
        success: 'Success',
        warning: 'Warning',
        error: 'Error'
      };
      showToast({
        title: titles[variant],
        message: messages[variant],
        variant,
        duration: variant === 'error' ? 0 : 5000,
        persistent: variant === 'error'
      });
    };
    return html\`
      <div>
        <forge-toast-container position="top-right"></forge-toast-container>
        
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <forge-button @click=\${() => showToastExample('info')}>
            Info Toast
          </forge-button>
          <forge-button @click=\${() => showToastExample('success')}>
            Success Toast
          </forge-button>
          <forge-button @click=\${() => showToastExample('warning')}>
            Warning Toast
          </forge-button>
          <forge-button @click=\${() => showToastExample('error')}>
            Error Toast
          </forge-button>
        </div>
        
        <div style="display: flex; gap: 12px;">
          <forge-button @click=\${() => toast.clear()} variant="ghost">
            Clear All
          </forge-button>
        </div>
        
        <p style="margin-top: 24px; color: var(--forge-color-text-secondary, #6b7280); font-size: 14px;">
          Click the buttons above to see toasts appear in the top-right corner. 
          Error toasts are persistent and require manual dismissal.
        </p>
      </div>
    \`;
  }
}`,...(H=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:H.source}}};var F,O,N;b.parameters={...b.parameters,docs:{...(F=b.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => {
    const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const;
    let currentPosition = 0;
    const showPositionDemo = () => {
      const position = positions[currentPosition];
      currentPosition = (currentPosition + 1) % positions.length;

      // Remove existing container
      const existing = document.querySelector('forge-toast-container[data-demo="true"]');
      if (existing) existing.remove();

      // Create new container at position
      const container = document.createElement('forge-toast-container');
      container.position = position;
      container.setAttribute('data-demo', 'true');
      document.body.appendChild(container);

      // Add toast to show the position
      container.addToast({
        title: \`Position: \${position}\`,
        message: \`Toast shown at \${position} position\`,
        variant: 'info',
        duration: 4000
      });
    };
    return html\`
      <div>
        <forge-button @click=\${showPositionDemo}>
          Demo Container Positions
        </forge-button>
        
        <p style="margin-top: 16px; color: var(--forge-color-text-secondary, #6b7280); font-size: 14px;">
          Click the button to cycle through different toast container positions: 
          \${positions.join(' → ')}<br>
          Each toast will appear in a different corner or edge of the screen.
        </p>
      </div>
    \`;
  }
}`,...(N=(O=b.parameters)==null?void 0:O.docs)==null?void 0:N.source}}};var R,Y,_;x.parameters={...x.parameters,docs:{...(R=x.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => {
    const addMultipleToasts = () => {
      const messages = ['First toast message', 'Second toast message', 'Third toast message', 'Fourth toast message', 'Fifth toast message', 'Sixth toast (queued)', 'Seventh toast (queued)', 'Eighth toast (queued)'];
      messages.forEach((message, index) => {
        setTimeout(() => {
          showToast({
            title: \`Toast \${index + 1}\`,
            message,
            variant: index % 2 === 0 ? 'info' : 'success',
            duration: 3000 + index * 500 // Staggered durations
          });
        }, index * 200); // Staggered creation
      });
    };
    const addPersistentToasts = () => {
      for (let i = 1; i <= 7; i++) {
        showToast({
          title: \`Persistent Toast \${i}\`,
          message: \`This toast will not auto-dismiss\`,
          variant: i <= 3 ? 'warning' : 'info',
          persistent: true
        });
      }
    };
    return html\`
      <div>
        <forge-toast-container position="top-right" max-toasts="3"></forge-toast-container>
        
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <forge-button @click=\${addMultipleToasts}>
            Add 8 Timed Toasts (Max 3)
          </forge-button>
          <forge-button @click=\${addPersistentToasts}>
            Add 7 Persistent Toasts
          </forge-button>
          <forge-button @click=\${() => toast.clear()} variant="ghost">
            Clear All
          </forge-button>
        </div>
        
        <div style="background: var(--forge-color-gray-50, #f9fafb); padding: 16px; border-radius: 8px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Queue Management Demo</h4>
          <p style="margin: 0; color: var(--forge-color-text-secondary, #6b7280); font-size: 14px; line-height: 1.4;">
            This container is limited to 3 simultaneous toasts. When you add more, they'll be queued and appear as others are dismissed.
            Try adding 8 timed toasts to see the queue in action, or add persistent toasts to see the queue build up.
          </p>
        </div>
      </div>
    \`;
  }
}`,...(_=(Y=x.parameters)==null?void 0:Y.docs)==null?void 0:_.source}}};var L,V,j;y.parameters={...y.parameters,docs:{...(L=y.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    const showHoverToast = () => {
      showToast({
        title: 'Hover to Pause',
        message: 'Hover over this toast to pause the auto-dismiss timer. Move your mouse away to resume.',
        variant: 'info',
        duration: 8000,
        showProgress: true
      });
    };
    const showActionToast = () => {
      const container = document.querySelector('forge-toast-container') as any;
      if (container) {
        const toastElement = document.createElement('forge-toast');
        toastElement.title = 'Action Required';
        toastElement.message = 'Would you like to save your changes?';
        toastElement.variant = 'warning';
        toastElement.persistent = true;

        // Add action buttons
        const actionDiv = document.createElement('div');
        actionDiv.slot = 'action';
        actionDiv.style.cssText = 'display: flex; gap: 8px; margin-top: 8px;';
        const saveBtn = document.createElement('forge-button');
        saveBtn.textContent = 'Save';
        saveBtn.size = 'sm';
        saveBtn.variant = 'primary';
        saveBtn.addEventListener('click', () => {
          toastElement.dismiss();
          toast.success('Changes saved successfully!');
        });
        const discardBtn = document.createElement('forge-button');
        discardBtn.textContent = 'Discard';
        discardBtn.size = 'sm';
        discardBtn.variant = 'ghost';
        discardBtn.addEventListener('click', () => {
          toastElement.dismiss();
          toast.info('Changes discarded');
        });
        actionDiv.appendChild(saveBtn);
        actionDiv.appendChild(discardBtn);
        toastElement.appendChild(actionDiv);
        const containerEl = container.shadowRoot?.querySelector('.toast-container');
        if (containerEl) {
          containerEl.appendChild(toastElement);
        }
      }
    };
    return html\`
      <div>
        <forge-toast-container position="top-right"></forge-toast-container>
        
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <forge-button @click=\${showHoverToast}>
            Hover to Pause Toast
          </forge-button>
          <forge-button @click=\${showActionToast}>
            Action Toast
          </forge-button>
        </div>
        
        <div style="background: var(--forge-color-blue-50, #eff6ff); padding: 16px; border-radius: 8px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: var(--forge-color-blue-800, #1e40af);">
            Interactive Features
          </h4>
          <ul style="margin: 0; padding-left: 20px; color: var(--forge-color-blue-700, #1d4ed8); font-size: 14px; line-height: 1.4;">
            <li><strong>Hover to Pause:</strong> Demonstrates timer pause/resume on mouse hover</li>
            <li><strong>Action Buttons:</strong> Shows custom action buttons with toast dismissal</li>
            <li><strong>Progress Bar:</strong> Visual indicator of remaining time</li>
          </ul>
        </div>
      </div>
    \`;
  }
}`,...(j=(V=y.parameters)==null?void 0:V.docs)==null?void 0:j.source}}};var U,X,G;w.parameters={...w.parameters,docs:{...(U=w.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => html\`
    <div>
      <forge-toast-container position="top-right"></forge-toast-container>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 24px;">
        <forge-button @click=\${() => toast.info('Information message', 'Info')}>
          toast.info()
        </forge-button>
        <forge-button @click=\${() => toast.success('Success message', 'Success')}>
          toast.success()
        </forge-button>
        <forge-button @click=\${() => toast.warning('Warning message', 'Warning')}>
          toast.warning()
        </forge-button>
        <forge-button @click=\${() => toast.error('Error message', 'Error')}>
          toast.error()
        </forge-button>
      </div>
      
      <div style="display: flex; gap: 12px;">
        <forge-button @click=\${() => toast.clear()} variant="ghost">
          toast.clear()
        </forge-button>
      </div>
      
      <div style="background: var(--forge-color-gray-50, #f9fafb); padding: 16px; border-radius: 8px; margin-top: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Helper Functions</h4>
        <pre style="margin: 0; font-size: 12px; line-height: 1.4; color: var(--forge-color-text-secondary, #6b7280);"><code>// Quick helpers for common toast types
toast.info('Message', 'Optional Title');
toast.success('Message', 'Optional Title');  
toast.warning('Message', 'Optional Title');
toast.error('Message', 'Optional Title');     // Persistent by default

// Management
toast.clear();                                // Clear all toasts
toast.dismiss('toast-id');                   // Dismiss specific toast

// Advanced usage
showToast({
  title: 'Custom Toast',
  message: 'With full options',
  variant: 'info',
  duration: 5000,
  persistent: false,
  showProgress: true
});</code></pre>
      </div>
    </div>
  \`
}`,...(G=(X=w.parameters)==null?void 0:X.docs)==null?void 0:G.source}}};const rt=["Default","AllVariants","WithProgress","WithCustomContent","ToastContainer","ContainerPositions","QueueManagement","InteractiveFeatures","HelperFunctions"];export{f as AllVariants,b as ContainerPositions,p as Default,w as HelperFunctions,y as InteractiveFeatures,x as QueueManagement,v as ToastContainer,h as WithCustomContent,m as WithProgress,rt as __namedExportsOrder,nt as default};
