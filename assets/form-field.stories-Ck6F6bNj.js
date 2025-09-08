import{x as r}from"./iframe-C-1QsWs8.js";import"./preload-helper-C1FmrZbK.js";const le={title:"Molecules/FormField",component:"forge-form-field",parameters:{layout:"centered",docs:{description:{component:"A comprehensive form field component with label, validation, help text, and multiple variants including floating labels."}}},argTypes:{label:{control:"text",description:"Field label text"},variant:{control:{type:"select"},options:["default","floating","inline"],description:"Visual style variant"},type:{control:{type:"select"},options:["text","email","password","number","tel","url","search"],description:"Input type"},validationState:{control:{type:"select"},options:["default","error","warning","success"],description:"Validation state"},placeholder:{control:"text",description:"Input placeholder text"},value:{control:"text",description:"Field value"},required:{control:"boolean",description:"Mark field as required"},disabled:{control:"boolean",description:"Disable the field"},readonly:{control:"boolean",description:"Make field read-only"},showOptional:{control:"boolean",description:"Show (optional) indicator for non-required fields"}}},t={args:{label:"Email Address",type:"email",placeholder:"Enter your email"},render:l=>r`
    <forge-form-field
      label="${l.label}"
      type="${l.type}"
      placeholder="${l.placeholder}"
      ?required="${l.required}"
      ?disabled="${l.disabled}"
      ?readonly="${l.readonly}"
      @input="${e=>console.log("Input:",e.detail)}"
      @change="${e=>console.log("Change:",e.detail)}"
    ></forge-form-field>
  `},o={render:()=>r`
    <div style="display: flex; flex-direction: column; gap: 30px; width: 300px;">
      <div>
        <h4 style="margin-bottom: 10px;">Default Variant</h4>
        <forge-form-field
          variant="default"
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
        ></forge-form-field>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Floating Label</h4>
        <forge-form-field
          variant="floating"
          label="Email Address"
          type="email"
        ></forge-form-field>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Inline Variant</h4>
        <forge-form-field
          variant="inline"
          label="Phone"
          placeholder="(555) 123-4567"
          type="tel"
        ></forge-form-field>
      </div>
    </div>
  `},n={render:()=>r`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 350px;">
      <forge-form-field
        label="Default State"
        placeholder="No validation state"
        help-text="This field shows the default appearance"
      ></forge-form-field>
      
      <forge-form-field
        label="Success State"
        validation-state="success"
        success-message="Email format is valid"
        value="user@example.com"
        type="email"
      ></forge-form-field>
      
      <forge-form-field
        label="Warning State"
        validation-state="warning"
        warning-message="This email domain is not commonly used"
        value="user@rare-domain.xyz"
        type="email"
      ></forge-form-field>
      
      <forge-form-field
        label="Error State"
        validation-state="error"
        error-message="Please enter a valid email address"
        value="invalid-email"
        type="email"
      ></forge-form-field>
    </div>
  `},d={render:()=>r`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
      <forge-form-field
        label="Required Field"
        placeholder="This field is required"
        required
        help-text="Please provide this information"
      ></forge-form-field>
      
      <forge-form-field
        label="Optional Field"
        placeholder="This field is optional"
        show-optional
        help-text="You may leave this blank if desired"
      ></forge-form-field>
      
      <forge-form-field
        label="Required with Error"
        placeholder="Required field"
        required
        validation-state="error"
        error-message="This field is required"
      ></forge-form-field>
    </div>
  `},s={render:()=>r`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
      <forge-form-field
        label="Text Input"
        type="text"
        placeholder="Enter text"
      ></forge-form-field>
      
      <forge-form-field
        label="Email Input"
        type="email"
        placeholder="user@example.com"
      ></forge-form-field>
      
      <forge-form-field
        label="Password Input"
        type="password"
        placeholder="Enter password"
      ></forge-form-field>
      
      <forge-form-field
        label="Number Input"
        type="number"
        placeholder="123"
        min="0"
        max="999"
      ></forge-form-field>
      
      <forge-form-field
        label="Phone Input"
        type="tel"
        placeholder="(555) 123-4567"
      ></forge-form-field>
      
      <forge-form-field
        label="URL Input"
        type="url"
        placeholder="https://example.com"
      ></forge-form-field>
    </div>
  `},f={render:()=>r`
    <div style="display: flex; flex-direction: column; gap: 30px; width: 350px;">
      <forge-form-field
        variant="floating"
        label="Empty Field"
        type="text"
      ></forge-form-field>
      
      <forge-form-field
        variant="floating"
        label="Pre-filled Field"
        type="text"
        value="This field has content"
      ></forge-form-field>
      
      <forge-form-field
        variant="floating"
        label="Email Address"
        type="email"
        required
      ></forge-form-field>
      
      <forge-form-field
        variant="floating"
        label="With Validation"
        type="email"
        validation-state="success"
        success-message="Valid email format"
        value="user@example.com"
      ></forge-form-field>
    </div>
  `},m={render:()=>r`
    <div style="display: flex; flex-direction: column; gap: 15px; width: 500px;">
      <forge-form-field
        variant="inline"
        label="First Name"
        placeholder="John"
        type="text"
      ></forge-form-field>
      
      <forge-form-field
        variant="inline"
        label="Last Name"
        placeholder="Doe"
        type="text"
        required
      ></forge-form-field>
      
      <forge-form-field
        variant="inline"
        label="Email"
        placeholder="john@example.com"
        type="email"
        validation-state="success"
        success-message="Valid"
      ></forge-form-field>
      
      <forge-form-field
        variant="inline"
        label="Age"
        placeholder="25"
        type="number"
        min="18"
        max="120"
        help-text="Must be 18 or older"
      ></forge-form-field>
    </div>
  `},p={render:()=>r`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 350px;">
      <forge-form-field
        label="Username"
        type="text"
        placeholder="Enter username"
        min-length="3"
        max-length="20"
        pattern="^[a-zA-Z0-9_]+$"
        help-text="3-20 characters, letters, numbers, and underscores only"
      ></forge-form-field>
      
      <forge-form-field
        label="Age"
        type="number"
        placeholder="Enter your age"
        min="13"
        max="120"
        help-text="Must be between 13 and 120"
        required
      ></forge-form-field>
      
      <forge-form-field
        label="Bio"
        type="text"
        placeholder="Tell us about yourself"
        max-length="500"
        help-text="Maximum 500 characters"
      ></forge-form-field>
    </div>
  `},c={render:()=>r`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
      <forge-form-field
        label="Normal Field"
        placeholder="You can type here"
        type="text"
      ></forge-form-field>
      
      <forge-form-field
        label="Disabled Field"
        placeholder="This field is disabled"
        type="text"
        disabled
        help-text="Cannot be edited"
      ></forge-form-field>
      
      <forge-form-field
        label="Read-only Field"
        value="This value cannot be changed"
        type="text"
        readonly
        help-text="Read-only content"
      ></forge-form-field>
      
      <forge-form-field
        label="Disabled with Value"
        value="Disabled field with content"
        type="text"
        disabled
      ></forge-form-field>
    </div>
  `},g={render:()=>r`
    <form style="max-width: 400px;" @submit="${l=>{l.preventDefault(),console.log("Form submitted")}}">
      <h3 style="margin-top: 0;">User Registration Form</h3>
      
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <forge-form-field
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          required
          min-length="2"
          help-text="As it appears on official documents"
        ></forge-form-field>
        
        <forge-form-field
          label="Email Address"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
          help-text="We'll use this to contact you"
        ></forge-form-field>
        
        <forge-form-field
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          required
          min-length="8"
          help-text="At least 8 characters"
        ></forge-form-field>
        
        <forge-form-field
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="(555) 123-4567"
          show-optional
          help-text="For account verification"
        ></forge-form-field>
        
        <forge-form-field
          variant="inline"
          label="Age"
          name="age"
          type="number"
          placeholder="25"
          min="13"
          required
          help-text="Must be 13 or older"
        ></forge-form-field>
        
        <button 
          type="submit" 
          style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-top: 10px;"
        >
          Create Account
        </button>
      </div>
    </form>
  `},u={render:()=>r`
    <div style="max-width: 500px;">
      <h3>Interactive Form Field Demo</h3>
      <p>Try typing in the fields below to see real-time validation:</p>
      
      <div style="display: flex; flex-direction: column; gap: 25px; margin-top: 20px;">
        <forge-form-field
          label="Email Validation"
          type="email"
          placeholder="Enter email address"
          required
          @input="${l=>{const e=l.target,a=l.detail.value;a?a.includes("@")&&a.includes(".")?(e.validationState="success",e.successMessage="Valid email format",e.errorMessage=""):(e.validationState="error",e.errorMessage="Please enter a valid email address",e.successMessage=""):(e.validationState="default",e.errorMessage="",e.successMessage="")}}"
        ></forge-form-field>
        
        <forge-form-field
          label="Password Strength"
          type="password"
          placeholder="Create password"
          required
          @input="${l=>{const e=l.target,a=l.detail.value;a?a.length<6?(e.validationState="error",e.errorMessage="Password too short (minimum 6 characters)",e.helpText=""):a.length<8?(e.validationState="warning",e.warningMessage="Password could be stronger",e.errorMessage="",e.helpText=""):(e.validationState="success",e.successMessage="Strong password",e.warningMessage="",e.errorMessage="",e.helpText=""):(e.validationState="default",e.helpText="Enter a password")}}"
        ></forge-form-field>
        
        <forge-form-field
          variant="floating"
          label="Character Counter"
          type="text"
          max-length="50"
          @input="${l=>{const e=l.target,a=l.detail.value,i=50-((a==null?void 0:a.length)||0);i<=0?(e.validationState="error",e.errorMessage="Maximum length reached",e.helpText=""):i<=10?(e.validationState="warning",e.warningMessage=`${i} characters remaining`,e.errorMessage="",e.helpText=""):(e.validationState="default",e.helpText=`${i} characters remaining`,e.warningMessage="",e.errorMessage="")}}"
        ></forge-form-field>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features demonstrated:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li>Real-time validation feedback</li>
          <li>Dynamic validation state changes</li>
          <li>Character counting and limits</li>
          <li>Password strength indicators</li>
          <li>Multiple validation states</li>
        </ul>
      </div>
    </div>
  `},h={render:()=>r`
    <forge-form-field
      label="AI-Ready Form Field"
      type="text"
      placeholder="Enter data..."
      semantic-role="form-input"
      ai-context="user-profile"
      performance-mode="balanced"
      @input="${l=>{console.log("AI-aware input:",{value:l.detail.value,context:"user-profile",userIntent:"data-entry"})}}"
      style="width: 300px;"
    ></forge-form-field>
  `};var x,y,v;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email'
  },
  render: args => html\`
    <forge-form-field
      label="\${args.label}"
      type="\${args.type}"
      placeholder="\${args.placeholder}"
      ?required="\${args.required}"
      ?disabled="\${args.disabled}"
      ?readonly="\${args.readonly}"
      @input="\${(e: CustomEvent) => console.log('Input:', e.detail)}"
      @change="\${(e: CustomEvent) => console.log('Change:', e.detail)}"
    ></forge-form-field>
  \`
}`,...(v=(y=t.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var b,w,E;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 30px; width: 300px;">
      <div>
        <h4 style="margin-bottom: 10px;">Default Variant</h4>
        <forge-form-field
          variant="default"
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
        ></forge-form-field>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Floating Label</h4>
        <forge-form-field
          variant="floating"
          label="Email Address"
          type="email"
        ></forge-form-field>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Inline Variant</h4>
        <forge-form-field
          variant="inline"
          label="Phone"
          placeholder="(555) 123-4567"
          type="tel"
        ></forge-form-field>
      </div>
    </div>
  \`
}`,...(E=(w=o.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};var S,M,F;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 350px;">
      <forge-form-field
        label="Default State"
        placeholder="No validation state"
        help-text="This field shows the default appearance"
      ></forge-form-field>
      
      <forge-form-field
        label="Success State"
        validation-state="success"
        success-message="Email format is valid"
        value="user@example.com"
        type="email"
      ></forge-form-field>
      
      <forge-form-field
        label="Warning State"
        validation-state="warning"
        warning-message="This email domain is not commonly used"
        value="user@rare-domain.xyz"
        type="email"
      ></forge-form-field>
      
      <forge-form-field
        label="Error State"
        validation-state="error"
        error-message="Please enter a valid email address"
        value="invalid-email"
        type="email"
      ></forge-form-field>
    </div>
  \`
}`,...(F=(M=n.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var q,T,I;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
      <forge-form-field
        label="Required Field"
        placeholder="This field is required"
        required
        help-text="Please provide this information"
      ></forge-form-field>
      
      <forge-form-field
        label="Optional Field"
        placeholder="This field is optional"
        show-optional
        help-text="You may leave this blank if desired"
      ></forge-form-field>
      
      <forge-form-field
        label="Required with Error"
        placeholder="Required field"
        required
        validation-state="error"
        error-message="This field is required"
      ></forge-form-field>
    </div>
  \`
}`,...(I=(T=d.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var $,A,P;s.parameters={...s.parameters,docs:{...($=s.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
      <forge-form-field
        label="Text Input"
        type="text"
        placeholder="Enter text"
      ></forge-form-field>
      
      <forge-form-field
        label="Email Input"
        type="email"
        placeholder="user@example.com"
      ></forge-form-field>
      
      <forge-form-field
        label="Password Input"
        type="password"
        placeholder="Enter password"
      ></forge-form-field>
      
      <forge-form-field
        label="Number Input"
        type="number"
        placeholder="123"
        min="0"
        max="999"
      ></forge-form-field>
      
      <forge-form-field
        label="Phone Input"
        type="tel"
        placeholder="(555) 123-4567"
      ></forge-form-field>
      
      <forge-form-field
        label="URL Input"
        type="url"
        placeholder="https://example.com"
      ></forge-form-field>
    </div>
  \`
}`,...(P=(A=s.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var D,C,R;f.parameters={...f.parameters,docs:{...(D=f.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 30px; width: 350px;">
      <forge-form-field
        variant="floating"
        label="Empty Field"
        type="text"
      ></forge-form-field>
      
      <forge-form-field
        variant="floating"
        label="Pre-filled Field"
        type="text"
        value="This field has content"
      ></forge-form-field>
      
      <forge-form-field
        variant="floating"
        label="Email Address"
        type="email"
        required
      ></forge-form-field>
      
      <forge-form-field
        variant="floating"
        label="With Validation"
        type="email"
        validation-state="success"
        success-message="Valid email format"
        value="user@example.com"
      ></forge-form-field>
    </div>
  \`
}`,...(R=(C=f.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};var V,N,k;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 15px; width: 500px;">
      <forge-form-field
        variant="inline"
        label="First Name"
        placeholder="John"
        type="text"
      ></forge-form-field>
      
      <forge-form-field
        variant="inline"
        label="Last Name"
        placeholder="Doe"
        type="text"
        required
      ></forge-form-field>
      
      <forge-form-field
        variant="inline"
        label="Email"
        placeholder="john@example.com"
        type="email"
        validation-state="success"
        success-message="Valid"
      ></forge-form-field>
      
      <forge-form-field
        variant="inline"
        label="Age"
        placeholder="25"
        type="number"
        min="18"
        max="120"
        help-text="Must be 18 or older"
      ></forge-form-field>
    </div>
  \`
}`,...(k=(N=m.parameters)==null?void 0:N.docs)==null?void 0:k.source}}};var L,z,W;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 350px;">
      <forge-form-field
        label="Username"
        type="text"
        placeholder="Enter username"
        min-length="3"
        max-length="20"
        pattern="^[a-zA-Z0-9_]+$"
        help-text="3-20 characters, letters, numbers, and underscores only"
      ></forge-form-field>
      
      <forge-form-field
        label="Age"
        type="number"
        placeholder="Enter your age"
        min="13"
        max="120"
        help-text="Must be between 13 and 120"
        required
      ></forge-form-field>
      
      <forge-form-field
        label="Bio"
        type="text"
        placeholder="Tell us about yourself"
        max-length="500"
        help-text="Maximum 500 characters"
      ></forge-form-field>
    </div>
  \`
}`,...(W=(z=p.parameters)==null?void 0:z.docs)==null?void 0:W.source}}};var U,O,Y;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
      <forge-form-field
        label="Normal Field"
        placeholder="You can type here"
        type="text"
      ></forge-form-field>
      
      <forge-form-field
        label="Disabled Field"
        placeholder="This field is disabled"
        type="text"
        disabled
        help-text="Cannot be edited"
      ></forge-form-field>
      
      <forge-form-field
        label="Read-only Field"
        value="This value cannot be changed"
        type="text"
        readonly
        help-text="Read-only content"
      ></forge-form-field>
      
      <forge-form-field
        label="Disabled with Value"
        value="Disabled field with content"
        type="text"
        disabled
      ></forge-form-field>
    </div>
  \`
}`,...(Y=(O=c.parameters)==null?void 0:O.docs)==null?void 0:Y.source}}};var _,j,B;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => html\`
    <form style="max-width: 400px;" @submit="\${(e: Event) => {
    e.preventDefault();
    console.log('Form submitted');
  }}">
      <h3 style="margin-top: 0;">User Registration Form</h3>
      
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <forge-form-field
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          required
          min-length="2"
          help-text="As it appears on official documents"
        ></forge-form-field>
        
        <forge-form-field
          label="Email Address"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
          help-text="We'll use this to contact you"
        ></forge-form-field>
        
        <forge-form-field
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          required
          min-length="8"
          help-text="At least 8 characters"
        ></forge-form-field>
        
        <forge-form-field
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="(555) 123-4567"
          show-optional
          help-text="For account verification"
        ></forge-form-field>
        
        <forge-form-field
          variant="inline"
          label="Age"
          name="age"
          type="number"
          placeholder="25"
          min="13"
          required
          help-text="Must be 13 or older"
        ></forge-form-field>
        
        <button 
          type="submit" 
          style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-top: 10px;"
        >
          Create Account
        </button>
      </div>
    </form>
  \`
}`,...(B=(j=g.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var J,Z,G;u.parameters={...u.parameters,docs:{...(J=u.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => html\`
    <div style="max-width: 500px;">
      <h3>Interactive Form Field Demo</h3>
      <p>Try typing in the fields below to see real-time validation:</p>
      
      <div style="display: flex; flex-direction: column; gap: 25px; margin-top: 20px;">
        <forge-form-field
          label="Email Validation"
          type="email"
          placeholder="Enter email address"
          required
          @input="\${(e: CustomEvent) => {
    const field = e.target as any;
    const value = e.detail.value;
    if (!value) {
      field.validationState = 'default';
      field.errorMessage = '';
      field.successMessage = '';
    } else if (value.includes('@') && value.includes('.')) {
      field.validationState = 'success';
      field.successMessage = 'Valid email format';
      field.errorMessage = '';
    } else {
      field.validationState = 'error';
      field.errorMessage = 'Please enter a valid email address';
      field.successMessage = '';
    }
  }}"
        ></forge-form-field>
        
        <forge-form-field
          label="Password Strength"
          type="password"
          placeholder="Create password"
          required
          @input="\${(e: CustomEvent) => {
    const field = e.target as any;
    const value = e.detail.value;
    if (!value) {
      field.validationState = 'default';
      field.helpText = 'Enter a password';
    } else if (value.length < 6) {
      field.validationState = 'error';
      field.errorMessage = 'Password too short (minimum 6 characters)';
      field.helpText = '';
    } else if (value.length < 8) {
      field.validationState = 'warning';
      field.warningMessage = 'Password could be stronger';
      field.errorMessage = '';
      field.helpText = '';
    } else {
      field.validationState = 'success';
      field.successMessage = 'Strong password';
      field.warningMessage = '';
      field.errorMessage = '';
      field.helpText = '';
    }
  }}"
        ></forge-form-field>
        
        <forge-form-field
          variant="floating"
          label="Character Counter"
          type="text"
          max-length="50"
          @input="\${(e: CustomEvent) => {
    const field = e.target as any;
    const value = e.detail.value;
    const remaining = 50 - (value?.length || 0);
    if (remaining <= 0) {
      field.validationState = 'error';
      field.errorMessage = 'Maximum length reached';
      field.helpText = '';
    } else if (remaining <= 10) {
      field.validationState = 'warning';
      field.warningMessage = \`\${remaining} characters remaining\`;
      field.errorMessage = '';
      field.helpText = '';
    } else {
      field.validationState = 'default';
      field.helpText = \`\${remaining} characters remaining\`;
      field.warningMessage = '';
      field.errorMessage = '';
    }
  }}"
        ></forge-form-field>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features demonstrated:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li>Real-time validation feedback</li>
          <li>Dynamic validation state changes</li>
          <li>Character counting and limits</li>
          <li>Password strength indicators</li>
          <li>Multiple validation states</li>
        </ul>
      </div>
    </div>
  \`
}`,...(G=(Z=u.parameters)==null?void 0:Z.docs)==null?void 0:G.source}}};var H,K,Q;h.parameters={...h.parameters,docs:{...(H=h.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => html\`
    <forge-form-field
      label="AI-Ready Form Field"
      type="text"
      placeholder="Enter data..."
      semantic-role="form-input"
      ai-context="user-profile"
      performance-mode="balanced"
      @input="\${(e: CustomEvent) => {
    console.log('AI-aware input:', {
      value: e.detail.value,
      context: 'user-profile',
      userIntent: 'data-entry'
    });
  }}"
      style="width: 300px;"
    ></forge-form-field>
  \`
}`,...(Q=(K=h.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};const re=["Default","Variants","ValidationStates","RequiredFields","InputTypes","FloatingLabels","InlineLayout","WithConstraints","DisabledAndReadonly","FormExample","InteractiveDemo","AIIntegration"];export{h as AIIntegration,t as Default,c as DisabledAndReadonly,f as FloatingLabels,g as FormExample,m as InlineLayout,s as InputTypes,u as InteractiveDemo,d as RequiredFields,n as ValidationStates,o as Variants,p as WithConstraints,re as __namedExportsOrder,le as default};
