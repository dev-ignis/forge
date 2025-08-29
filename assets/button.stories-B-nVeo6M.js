import{x as r}from"./iframe-B30buPYR.js";import"./preload-helper-C1FmrZbK.js";const j={title:"Atoms/Button",component:"forge-button",tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["primary","secondary","danger","ghost","link"],description:"Visual variant of the button",defaultValue:"primary"},size:{control:{type:"select"},options:["sm","md","lg"],description:"Size of the button",defaultValue:"md"},disabled:{control:{type:"boolean"},description:"Whether the button is disabled",defaultValue:!1},loading:{control:{type:"boolean"},description:"Whether the button is in a loading state",defaultValue:!1},fullWidth:{control:{type:"boolean"},description:"Whether the button should take full width",defaultValue:!1},type:{control:{type:"select"},options:["button","submit","reset"],description:"Button type attribute",defaultValue:"button"}},parameters:{docs:{description:{component:`
The ForgeButton component is a versatile, accessible button component that follows the design system tokens.

## Features
- Multiple visual variants (primary, secondary, danger, ghost, link)
- Three size options (sm, md, lg)
- Loading and disabled states
- Full keyboard navigation support
- ARIA compliant
- Token-based theming

## Usage

\`\`\`html
<forge-button variant="primary" size="md">Click me</forge-button>
\`\`\`

## Theming

The button component uses CSS Custom Properties for theming:
- \`--forge-color-*\` for colors
- \`--forge-spacing-*\` for padding
- \`--forge-font-*\` for typography
- \`--forge-border-*\` for borders
- \`--forge-shadow-*\` for shadows
- \`--forge-transition-*\` for animations
        `}}}},e={args:{variant:"primary",size:"md",disabled:!1,loading:!1},render:t=>r`
    <forge-button
      variant="${t.variant}"
      size="${t.size}"
      ?disabled="${t.disabled}"
      ?loading="${t.loading}"
      ?full-width="${t.fullWidth}"
      type="${t.type}"
    >
      Primary Button
    </forge-button>
  `},n={args:{variant:"secondary",size:"md"},render:t=>r`
    <forge-button variant="${t.variant}" size="${t.size}">
      Secondary Button
    </forge-button>
  `},a={args:{variant:"danger",size:"md"},render:t=>r`
    <forge-button variant="${t.variant}" size="${t.size}">
      Delete
    </forge-button>
  `},o={args:{variant:"ghost",size:"md"},render:t=>r`
    <forge-button variant="${t.variant}" size="${t.size}">
      Ghost Button
    </forge-button>
  `},i={args:{variant:"link",size:"md"},render:t=>r`
    <forge-button variant="${t.variant}" size="${t.size}">
      Link Button
    </forge-button>
  `},s={render:()=>r`
    <div style="display: flex; gap: 16px; align-items: center;">
      <forge-button size="sm">Small</forge-button>
      <forge-button size="md">Medium</forge-button>
      <forge-button size="lg">Large</forge-button>
    </div>
  `},d={args:{loading:!0,variant:"primary"},render:t=>r`
    <forge-button variant="${t.variant}" ?loading="${t.loading}">
      Loading...
    </forge-button>
  `},g={args:{disabled:!0,variant:"primary"},render:t=>r`
    <forge-button variant="${t.variant}" ?disabled="${t.disabled}">
      Disabled
    </forge-button>
  `},l={args:{fullWidth:!0,variant:"primary"},render:t=>r`
    <div style="width: 400px;">
      <forge-button variant="${t.variant}" ?full-width="${t.fullWidth}">
        Full Width Button
      </forge-button>
    </div>
  `},u={render:()=>r`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary">Primary</forge-button>
        <forge-button variant="secondary">Secondary</forge-button>
        <forge-button variant="danger">Danger</forge-button>
        <forge-button variant="ghost">Ghost</forge-button>
        <forge-button variant="link">Link</forge-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary" disabled>Primary Disabled</forge-button>
        <forge-button variant="secondary" disabled>Secondary Disabled</forge-button>
        <forge-button variant="danger" disabled>Danger Disabled</forge-button>
        <forge-button variant="ghost" disabled>Ghost Disabled</forge-button>
        <forge-button variant="link" disabled>Link Disabled</forge-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary" loading>Loading</forge-button>
        <forge-button variant="secondary" loading>Loading</forge-button>
        <forge-button variant="danger" loading>Loading</forge-button>
        <forge-button variant="ghost" loading>Loading</forge-button>
        <forge-button variant="link" loading>Loading</forge-button>
      </div>
    </div>
  `};var b,f,p;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false
  },
  render: args => html\`
    <forge-button
      variant="\${args.variant}"
      size="\${args.size}"
      ?disabled="\${args.disabled}"
      ?loading="\${args.loading}"
      ?full-width="\${args.fullWidth}"
      type="\${args.type}"
    >
      Primary Button
    </forge-button>
  \`
}`,...(p=(f=e.parameters)==null?void 0:f.docs)==null?void 0:p.source}}};var c,m,v;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md'
  },
  render: args => html\`
    <forge-button variant="\${args.variant}" size="\${args.size}">
      Secondary Button
    </forge-button>
  \`
}`,...(v=(m=n.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var y,h,z;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    size: 'md'
  },
  render: args => html\`
    <forge-button variant="\${args.variant}" size="\${args.size}">
      Delete
    </forge-button>
  \`
}`,...(z=(h=a.parameters)==null?void 0:h.docs)==null?void 0:z.source}}};var $,x,L;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md'
  },
  render: args => html\`
    <forge-button variant="\${args.variant}" size="\${args.size}">
      Ghost Button
    </forge-button>
  \`
}`,...(L=(x=o.parameters)==null?void 0:x.docs)==null?void 0:L.source}}};var S,k,D;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: 'link',
    size: 'md'
  },
  render: args => html\`
    <forge-button variant="\${args.variant}" size="\${args.size}">
      Link Button
    </forge-button>
  \`
}`,...(D=(k=i.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var W,B,w;s.parameters={...s.parameters,docs:{...(W=s.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 16px; align-items: center;">
      <forge-button size="sm">Small</forge-button>
      <forge-button size="md">Medium</forge-button>
      <forge-button size="lg">Large</forge-button>
    </div>
  \`
}`,...(w=(B=s.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};var P,V,G;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    loading: true,
    variant: 'primary'
  },
  render: args => html\`
    <forge-button variant="\${args.variant}" ?loading="\${args.loading}">
      Loading...
    </forge-button>
  \`
}`,...(G=(V=d.parameters)==null?void 0:V.docs)==null?void 0:G.source}}};var F,T,A;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    disabled: true,
    variant: 'primary'
  },
  render: args => html\`
    <forge-button variant="\${args.variant}" ?disabled="\${args.disabled}">
      Disabled
    </forge-button>
  \`
}`,...(A=(T=g.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};var C,M,_;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    fullWidth: true,
    variant: 'primary'
  },
  render: args => html\`
    <div style="width: 400px;">
      <forge-button variant="\${args.variant}" ?full-width="\${args.fullWidth}">
        Full Width Button
      </forge-button>
    </div>
  \`
}`,...(_=(M=l.parameters)==null?void 0:M.docs)==null?void 0:_.source}}};var E,I,O;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary">Primary</forge-button>
        <forge-button variant="secondary">Secondary</forge-button>
        <forge-button variant="danger">Danger</forge-button>
        <forge-button variant="ghost">Ghost</forge-button>
        <forge-button variant="link">Link</forge-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary" disabled>Primary Disabled</forge-button>
        <forge-button variant="secondary" disabled>Secondary Disabled</forge-button>
        <forge-button variant="danger" disabled>Danger Disabled</forge-button>
        <forge-button variant="ghost" disabled>Ghost Disabled</forge-button>
        <forge-button variant="link" disabled>Link Disabled</forge-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary" loading>Loading</forge-button>
        <forge-button variant="secondary" loading>Loading</forge-button>
        <forge-button variant="danger" loading>Loading</forge-button>
        <forge-button variant="ghost" loading>Loading</forge-button>
        <forge-button variant="link" loading>Loading</forge-button>
      </div>
    </div>
  \`
}`,...(O=(I=u.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};const q=["Primary","Secondary","Danger","Ghost","Link","Sizes","Loading","Disabled","FullWidth","AllVariants"];export{u as AllVariants,a as Danger,g as Disabled,l as FullWidth,o as Ghost,i as Link,d as Loading,e as Primary,n as Secondary,s as Sizes,q as __namedExportsOrder,j as default};
