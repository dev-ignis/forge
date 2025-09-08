import{x as t}from"./iframe-C-1QsWs8.js";import"./preload-helper-C1FmrZbK.js";const le={title:"Molecules/DatePicker",component:"forge-date-picker",parameters:{layout:"centered",docs:{description:{component:"A comprehensive date picker component with calendar interface, range selection, validation, and localization support."}}},argTypes:{value:{control:"date",description:"Selected date value"},placeholder:{control:"text",description:"Input placeholder text"},format:{control:{type:"select"},options:["MM/DD/YYYY","DD/MM/YYYY","YYYY-MM-DD"],description:"Date format display"},disabled:{control:"boolean",description:"Disable the date picker"},required:{control:"boolean",description:"Make the field required"},readonly:{control:"boolean",description:"Make the input read-only"},rangeMode:{control:"boolean",description:"Enable date range selection"},clearButton:{control:"boolean",description:"Show clear button"},weekStartMonday:{control:"boolean",description:"Start week on Monday instead of Sunday"}}},n={args:{placeholder:"Select date"},render:e=>t`
    <forge-date-picker
      placeholder="${e.placeholder}"
      ?disabled="${e.disabled}"
      ?required="${e.required}"
      ?readonly="${e.readonly}"
      @forge-change="${a=>console.log("Date changed:",a.detail)}"
    ></forge-date-picker>
  `},o={render:()=>t`
      <forge-date-picker
        .value="${new Date("2024-06-15")}"
        placeholder="Pre-selected date"
      ></forge-date-picker>
    `},l={render:()=>t`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">US Format (MM/DD/YYYY)</label>
        <forge-date-picker
          format="MM/DD/YYYY"
          placeholder="12/31/2024"
        ></forge-date-picker>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">European Format (DD/MM/YYYY)</label>
        <forge-date-picker
          format="DD/MM/YYYY"
          placeholder="31/12/2024"
        ></forge-date-picker>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">ISO Format (YYYY-MM-DD)</label>
        <forge-date-picker
          format="YYYY-MM-DD"
          placeholder="2024-12-31"
        ></forge-date-picker>
      </div>
    </div>
  `},i={render:()=>t`
    <div style="width: 350px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 600;">Select Date Range</label>
      <forge-date-picker
        range-mode
        placeholder="Select start and end dates"
        @forge-change="${e=>{console.log("Range changed:",e.detail),e.detail.range&&(console.log("Start:",e.detail.range.start),console.log("End:",e.detail.range.end))}}"
      ></forge-date-picker>
      <p style="margin-top: 8px; font-size: 14px; color: #666;">
        Click to select start date, then click again to select end date.
      </p>
    </div>
  `},d={render:()=>{const e=new Date;e.setDate(e.getDate()-30);const a=new Date;return a.setDate(a.getDate()+30),t`
      <div style="width: 300px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Date with Min/Max Validation</label>
        <forge-date-picker
          .min="${e}"
          .max="${a}"
          placeholder="Select date within range"
          required
        ></forge-date-picker>
        <p style="margin-top: 8px; font-size: 12px; color: #666;">
          Valid range: ${e.toLocaleDateString()} to ${a.toLocaleDateString()}
        </p>
      </div>
    `}},s={render:()=>{const e=new Date,a=[new Date(e.getFullYear(),e.getMonth(),e.getDate()+1),new Date(e.getFullYear(),e.getMonth(),e.getDate()+5),new Date(e.getFullYear(),e.getMonth(),e.getDate()+10)];return t`
      <div style="width: 300px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Calendar with Disabled Dates</label>
        <forge-date-picker
          .disabledDates="${a}"
          placeholder="Some dates are disabled"
        ></forge-date-picker>
        <p style="margin-top: 8px; font-size: 12px; color: #666;">
          Tomorrow, +5 days, and +10 days are disabled.
        </p>
      </div>
    `}},c={render:()=>t`
    <div style="display: flex; gap: 30px;">
      <div style="width: 300px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Week Starts Sunday (Default)</label>
        <forge-date-picker
          placeholder="Sunday first"
        ></forge-date-picker>
      </div>
      
      <div style="width: 300px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Week Starts Monday</label>
        <forge-date-picker
          week-start-monday
          placeholder="Monday first"
        ></forge-date-picker>
      </div>
    </div>
  `},p={render:()=>t`
    <div style="width: 300px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 600;">No Clear Button</label>
      <forge-date-picker
        .clearButton="${!1}"
        placeholder="Cannot be cleared"
      ></forge-date-picker>
    </div>
  `},g={render:()=>{const e=new Date("2024-07-04");return t`
      <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Read-Only Date Picker</label>
          <forge-date-picker
            .value="${e}"
            readonly
            placeholder="Read-only date"
          ></forge-date-picker>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Disabled Date Picker</label>
          <forge-date-picker
            .value="${e}"
            disabled
            placeholder="Disabled date"
          ></forge-date-picker>
        </div>
      </div>
    `}},m={render:()=>t`
    <div style="max-width: 600px;">
      <h3>Interactive Date Picker Demo</h3>
      <p>Try different interactions with the date picker:</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">📅 Standard Date Picker</label>
          <forge-date-picker
            placeholder="Click to open calendar"
            @forge-change="${e=>{const r=e.target.nextElementSibling;r&&(r.textContent=e.detail.value?`Selected: ${e.detail.value.toLocaleDateString()}`:"No date selected")}}"
          ></forge-date-picker>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No date selected</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">📊 Range Picker</label>
          <forge-date-picker
            range-mode
            placeholder="Select date range"
            @forge-change="${e=>{const r=e.target.nextElementSibling;if(r)if(e.detail.range&&e.detail.range.start&&e.detail.range.end){const ae=e.detail.range.start.toLocaleDateString(),re=e.detail.range.end.toLocaleDateString();r.textContent=`Range: ${ae} - ${re}`}else r.textContent="No range selected"}}"
          ></forge-date-picker>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No range selected</p>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features to try:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li>Click the input field or calendar icon to open</li>
          <li>Navigate months using arrow buttons</li>
          <li>Use month/year dropdowns for quick navigation</li>
          <li>Click "Today" button to jump to current date</li>
          <li>Use clear button (×) to reset selection</li>
          <li>For range mode: click start date, then end date</li>
        </ul>
      </div>
    </div>
  `},f={render:()=>t`
    <form style="max-width: 400px;" @submit="${e=>{e.preventDefault();const a=new FormData(e.target);console.log("Form submitted:",Object.fromEntries(a.entries()))}}">
      <h3>Date Picker in Form</h3>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">
          Event Date *
        </label>
        <forge-date-picker
          name="eventDate"
          placeholder="Select event date"
          required
        ></forge-date-picker>
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">
          Registration Period
        </label>
        <forge-date-picker
          name="registrationPeriod"
          range-mode
          placeholder="Select registration period"
        ></forge-date-picker>
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">
          Birth Date
        </label>
        <forge-date-picker
          name="birthDate"
          placeholder="MM/DD/YYYY"
          format="MM/DD/YYYY"
        ></forge-date-picker>
      </div>
      
      <button type="submit" style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Submit Form
      </button>
    </form>
  `},b={render:()=>t`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">English (US)</label>
        <forge-date-picker
          locale="en-US"
          format="MM/DD/YYYY"
          placeholder="MM/DD/YYYY"
        ></forge-date-picker>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">German (DE)</label>
        <forge-date-picker
          locale="de-DE"
          format="DD/MM/YYYY"
          placeholder="TT/MM/JJJJ"
          week-start-monday
        ></forge-date-picker>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Japanese (JP)</label>
        <forge-date-picker
          locale="ja-JP"
          format="YYYY-MM-DD"
          placeholder="YYYY-MM-DD"
        ></forge-date-picker>
      </div>
    </div>
  `},y={render:()=>t`
    <forge-date-picker
      placeholder="AI-ready date picker"
      semantic-role="date-picker"
      ai-context="event-scheduling"
      performance-mode="balanced"
      @forge-change="${e=>{console.log("AI-aware date selection:",{value:e.detail.value,context:"event-scheduling",userIntent:"date-selection"})}}"
      style="width: 300px;"
    ></forge-date-picker>
  `};var h,D,k;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select date'
  },
  render: args => html\`
    <forge-date-picker
      placeholder="\${args.placeholder}"
      ?disabled="\${args.disabled}"
      ?required="\${args.required}"
      ?readonly="\${args.readonly}"
      @forge-change="\${(e: CustomEvent) => console.log('Date changed:', e.detail)}"
    ></forge-date-picker>
  \`
}`,...(k=(D=n.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};var u,x,v;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    const initialDate = new Date('2024-06-15');
    return html\`
      <forge-date-picker
        .value="\${initialDate}"
        placeholder="Pre-selected date"
      ></forge-date-picker>
    \`;
  }
}`,...(v=(x=o.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var Y,w,M;l.parameters={...l.parameters,docs:{...(Y=l.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">US Format (MM/DD/YYYY)</label>
        <forge-date-picker
          format="MM/DD/YYYY"
          placeholder="12/31/2024"
        ></forge-date-picker>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">European Format (DD/MM/YYYY)</label>
        <forge-date-picker
          format="DD/MM/YYYY"
          placeholder="31/12/2024"
        ></forge-date-picker>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">ISO Format (YYYY-MM-DD)</label>
        <forge-date-picker
          format="YYYY-MM-DD"
          placeholder="2024-12-31"
        ></forge-date-picker>
      </div>
    </div>
  \`
}`,...(M=(w=l.parameters)==null?void 0:w.docs)==null?void 0:M.source}}};var S,$,C;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => html\`
    <div style="width: 350px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 600;">Select Date Range</label>
      <forge-date-picker
        range-mode
        placeholder="Select start and end dates"
        @forge-change="\${(e: CustomEvent) => {
    console.log('Range changed:', e.detail);
    if (e.detail.range) {
      console.log('Start:', e.detail.range.start);
      console.log('End:', e.detail.range.end);
    }
  }}"
      ></forge-date-picker>
      <p style="margin-top: 8px; font-size: 14px; color: #666;">
        Click to select start date, then click again to select end date.
      </p>
    </div>
  \`
}`,...(C=($=i.parameters)==null?void 0:$.docs)==null?void 0:C.source}}};var F,E,P;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 30); // 30 days ago
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // 30 days from now

    return html\`
      <div style="width: 300px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Date with Min/Max Validation</label>
        <forge-date-picker
          .min="\${minDate}"
          .max="\${maxDate}"
          placeholder="Select date within range"
          required
        ></forge-date-picker>
        <p style="margin-top: 8px; font-size: 12px; color: #666;">
          Valid range: \${minDate.toLocaleDateString()} to \${maxDate.toLocaleDateString()}
        </p>
      </div>
    \`;
  }
}`,...(P=(E=d.parameters)==null?void 0:E.docs)==null?void 0:P.source}}};var I,R,z;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const today = new Date();
    const disabledDates = [new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5), new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10)];
    return html\`
      <div style="width: 300px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Calendar with Disabled Dates</label>
        <forge-date-picker
          .disabledDates="\${disabledDates}"
          placeholder="Some dates are disabled"
        ></forge-date-picker>
        <p style="margin-top: 8px; font-size: 12px; color: #666;">
          Tomorrow, +5 days, and +10 days are disabled.
        </p>
      </div>
    \`;
  }
}`,...(z=(R=s.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};var J,L,q;c.parameters={...c.parameters,docs:{...(J=c.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 30px;">
      <div style="width: 300px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Week Starts Sunday (Default)</label>
        <forge-date-picker
          placeholder="Sunday first"
        ></forge-date-picker>
      </div>
      
      <div style="width: 300px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Week Starts Monday</label>
        <forge-date-picker
          week-start-monday
          placeholder="Monday first"
        ></forge-date-picker>
      </div>
    </div>
  \`
}`,...(q=(L=c.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};var N,T,W;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => html\`
    <div style="width: 300px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 600;">No Clear Button</label>
      <forge-date-picker
        .clearButton="\${false}"
        placeholder="Cannot be cleared"
      ></forge-date-picker>
    </div>
  \`
}`,...(W=(T=p.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};var U,A,B;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => {
    const presetDate = new Date('2024-07-04');
    return html\`
      <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Read-Only Date Picker</label>
          <forge-date-picker
            .value="\${presetDate}"
            readonly
            placeholder="Read-only date"
          ></forge-date-picker>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Disabled Date Picker</label>
          <forge-date-picker
            .value="\${presetDate}"
            disabled
            placeholder="Disabled date"
          ></forge-date-picker>
        </div>
      </div>
    \`;
  }
}`,...(B=(A=g.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var O,V,j;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => html\`
    <div style="max-width: 600px;">
      <h3>Interactive Date Picker Demo</h3>
      <p>Try different interactions with the date picker:</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">📅 Standard Date Picker</label>
          <forge-date-picker
            placeholder="Click to open calendar"
            @forge-change="\${(e: CustomEvent) => {
    const target = e.target as any;
    const info = target.nextElementSibling;
    if (info) {
      info.textContent = e.detail.value ? \`Selected: \${e.detail.value.toLocaleDateString()}\` : 'No date selected';
    }
  }}"
          ></forge-date-picker>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No date selected</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">📊 Range Picker</label>
          <forge-date-picker
            range-mode
            placeholder="Select date range"
            @forge-change="\${(e: CustomEvent) => {
    const target = e.target as any;
    const info = target.nextElementSibling;
    if (info) {
      if (e.detail.range && e.detail.range.start && e.detail.range.end) {
        const start = e.detail.range.start.toLocaleDateString();
        const end = e.detail.range.end.toLocaleDateString();
        info.textContent = \`Range: \${start} - \${end}\`;
      } else {
        info.textContent = 'No range selected';
      }
    }
  }}"
          ></forge-date-picker>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No range selected</p>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features to try:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li>Click the input field or calendar icon to open</li>
          <li>Navigate months using arrow buttons</li>
          <li>Use month/year dropdowns for quick navigation</li>
          <li>Click "Today" button to jump to current date</li>
          <li>Use clear button (×) to reset selection</li>
          <li>For range mode: click start date, then end date</li>
        </ul>
      </div>
    </div>
  \`
}`,...(j=(V=m.parameters)==null?void 0:V.docs)==null?void 0:j.source}}};var G,_,H;f.parameters={...f.parameters,docs:{...(G=f.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => html\`
    <form style="max-width: 400px;" @submit="\${(e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log('Form submitted:', Object.fromEntries(formData.entries()));
  }}">
      <h3>Date Picker in Form</h3>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">
          Event Date *
        </label>
        <forge-date-picker
          name="eventDate"
          placeholder="Select event date"
          required
        ></forge-date-picker>
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">
          Registration Period
        </label>
        <forge-date-picker
          name="registrationPeriod"
          range-mode
          placeholder="Select registration period"
        ></forge-date-picker>
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">
          Birth Date
        </label>
        <forge-date-picker
          name="birthDate"
          placeholder="MM/DD/YYYY"
          format="MM/DD/YYYY"
        ></forge-date-picker>
      </div>
      
      <button type="submit" style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Submit Form
      </button>
    </form>
  \`
}`,...(H=(_=f.parameters)==null?void 0:_.docs)==null?void 0:H.source}}};var K,Q,X;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">English (US)</label>
        <forge-date-picker
          locale="en-US"
          format="MM/DD/YYYY"
          placeholder="MM/DD/YYYY"
        ></forge-date-picker>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">German (DE)</label>
        <forge-date-picker
          locale="de-DE"
          format="DD/MM/YYYY"
          placeholder="TT/MM/JJJJ"
          week-start-monday
        ></forge-date-picker>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Japanese (JP)</label>
        <forge-date-picker
          locale="ja-JP"
          format="YYYY-MM-DD"
          placeholder="YYYY-MM-DD"
        ></forge-date-picker>
      </div>
    </div>
  \`
}`,...(X=(Q=b.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,te;y.parameters={...y.parameters,docs:{...(Z=y.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => html\`
    <forge-date-picker
      placeholder="AI-ready date picker"
      semantic-role="date-picker"
      ai-context="event-scheduling"
      performance-mode="balanced"
      @forge-change="\${(e: CustomEvent) => {
    console.log('AI-aware date selection:', {
      value: e.detail.value,
      context: 'event-scheduling',
      userIntent: 'date-selection'
    });
  }}"
      style="width: 300px;"
    ></forge-date-picker>
  \`
}`,...(te=(ee=y.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const ie=["Default","WithInitialValue","DateFormats","RangeSelection","WithValidation","DisabledDates","WeekStartMonday","WithoutClearButton","ReadOnlyAndDisabled","InteractiveDemo","FormIntegration","CustomLocalization","AIIntegration"];export{y as AIIntegration,b as CustomLocalization,l as DateFormats,n as Default,s as DisabledDates,f as FormIntegration,m as InteractiveDemo,i as RangeSelection,g as ReadOnlyAndDisabled,c as WeekStartMonday,o as WithInitialValue,d as WithValidation,p as WithoutClearButton,ie as __namedExportsOrder,le as default};
