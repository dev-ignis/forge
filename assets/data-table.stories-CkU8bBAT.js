import{x as a}from"./iframe-RyCF64Jj.js";import"./preload-helper-C1FmrZbK.js";const le={title:"Organisms/DataTable",component:"forge-data-table",parameters:{layout:"padded",docs:{description:{component:"A powerful data table component with sorting, filtering, pagination, and selection capabilities. Optimized for performance with virtual scrolling."}}},argTypes:{selectable:{control:"boolean",description:"Enable row selection with checkboxes"},sortable:{control:"boolean",description:"Enable column sorting"},filterable:{control:"boolean",description:"Enable column filtering"},paginated:{control:"boolean",description:"Enable pagination"},pageSize:{control:{type:"number",min:5,max:100},description:"Number of rows per page"},variant:{control:{type:"select"},options:["default","striped","bordered","compact"],description:"Visual style variant"}}},n=[{id:1,name:"Alice Johnson",email:"alice@example.com",role:"Admin",status:"Active",lastLogin:"2024-01-15"},{id:2,name:"Bob Smith",email:"bob@example.com",role:"User",status:"Active",lastLogin:"2024-01-14"},{id:3,name:"Carol Davis",email:"carol@example.com",role:"Editor",status:"Inactive",lastLogin:"2024-01-10"},{id:4,name:"David Wilson",email:"david@example.com",role:"User",status:"Active",lastLogin:"2024-01-16"},{id:5,name:"Emma Brown",email:"emma@example.com",role:"Admin",status:"Active",lastLogin:"2024-01-16"},{id:6,name:"Frank Miller",email:"frank@example.com",role:"User",status:"Pending",lastLogin:"2024-01-12"},{id:7,name:"Grace Lee",email:"grace@example.com",role:"Editor",status:"Active",lastLogin:"2024-01-15"},{id:8,name:"Henry Taylor",email:"henry@example.com",role:"User",status:"Active",lastLogin:"2024-01-13"}],t=[{key:"name",title:"Name",sortable:!0,filterable:!0},{key:"email",title:"Email",sortable:!0,filterable:!0},{key:"role",title:"Role",sortable:!0,filterable:!0},{key:"status",title:"Status",sortable:!0,filterable:!0},{key:"lastLogin",title:"Last Login",sortable:!0,type:"date"}],l={render:()=>a`
    <forge-data-table
      .columns="${t}"
      .data="${n}"
    ></forge-data-table>
  `},s={args:{selectable:!0},render:e=>a`
    <forge-data-table
      .columns="${t}"
      .data="${n}"
      ?selectable="${e.selectable}"
      @selection-change="${r=>console.log("Selected rows:",r.detail)}"
    ></forge-data-table>
  `},i={args:{sortable:!0},render:e=>a`
    <forge-data-table
      .columns="${t}"
      .data="${n}"
      ?sortable="${e.sortable}"
      @sort-change="${r=>console.log("Sort changed:",r.detail)}"
    ></forge-data-table>
  `},c={args:{filterable:!0},render:e=>a`
    <forge-data-table
      .columns="${t}"
      .data="${n}"
      ?filterable="${e.filterable}"
      @filter-change="${r=>console.log("Filter changed:",r.detail)}"
    ></forge-data-table>
  `},d={args:{paginated:!0,pageSize:5},render:e=>a`
    <forge-data-table
      .columns="${t}"
      .data="${n}"
      ?paginated="${e.paginated}"
      page-size="${e.pageSize}"
      @page-change="${r=>console.log("Page changed:",r.detail)}"
    ></forge-data-table>
  `},g={args:{variant:"striped"},render:e=>a`
    <forge-data-table
      .columns="${t}"
      .data="${n}"
      variant="${e.variant}"
    ></forge-data-table>
  `},m={args:{variant:"compact"},render:e=>a`
    <forge-data-table
      .columns="${t}"
      .data="${n}"
      variant="${e.variant}"
    ></forge-data-table>
  `},u={render:()=>a`
    <forge-data-table
      .columns="${t}"
      .data="${n}"
      selectable
      sortable
      filterable
      paginated
      page-size="4"
      variant="bordered"
      @selection-change="${e=>console.log("Selection:",e.detail)}"
      @sort-change="${e=>console.log("Sort:",e.detail)}"
      @filter-change="${e=>console.log("Filter:",e.detail)}"
      @page-change="${e=>console.log("Page:",e.detail)}"
    ></forge-data-table>
  `},b={render:()=>a`
    <forge-data-table
      .columns="${[{key:"name",title:"Name",sortable:!0},{key:"email",title:"Email",sortable:!0},{key:"role",title:"Role",sortable:!0},{key:"status",title:"Status",sortable:!0,template:e=>a`
            <forge-badge 
              variant="${e==="Active"?"success":e==="Pending"?"warning":"default"}"
            >
              ${e}
            </forge-badge>
          `},{key:"actions",title:"Actions",template:(e,r)=>a`
            <forge-button size="small" variant="outline" @click="${()=>console.log("Edit:",r)}">
              Edit
            </forge-button>
            <forge-button size="small" variant="danger-outline" @click="${()=>console.log("Delete:",r)}">
              Delete
            </forge-button>
          `}]}"
      .data="${n}"
    ></forge-data-table>
  `},p={render:()=>{const e=Array.from({length:1e3},(r,o)=>({id:o+1,name:`User ${o+1}`,email:`user${o+1}@example.com`,role:["Admin","User","Editor"][o%3],status:["Active","Inactive","Pending"][o%3],lastLogin:new Date(2024,0,o%30+1).toISOString().split("T")[0]}));return a`
      <div style="height: 400px;">
        <forge-data-table
          .columns="${t}"
          .data="${e}"
          selectable
          sortable
          filterable
          paginated
          page-size="20"
          virtual-scrolling
        ></forge-data-table>
      </div>
    `}},f={render:()=>a`
    <forge-data-table
      .columns="${t}"
      .data="${[]}"
      empty-message="No users found. Try adjusting your search criteria."
    ></forge-data-table>
  `},$={render:()=>a`
    <forge-data-table
      .columns="${t}"
      .data="${[]}"
      loading
      loading-message="Loading user data..."
    ></forge-data-table>
  `},h={render:()=>a`
    <forge-data-table
      .columns="${t}"
      .data="${n}"
      selectable
      sortable
      filterable
      semantic-role="user-management-table"
      ai-context="administrative-dashboard"
      performance-mode="balanced"
      @selection-change="${e=>{console.log("AI-aware selection change:",{selectedRows:e.detail,context:"user-management",action:"bulk-operations-available"})}}"
    ></forge-data-table>
  `};var v,S,y;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => html\`
    <forge-data-table
      .columns="\${tableColumns}"
      .data="\${sampleUsers}"
    ></forge-data-table>
  \`
}`,...(y=(S=l.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var C,E,k;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    selectable: true
  },
  render: args => html\`
    <forge-data-table
      .columns="\${tableColumns}"
      .data="\${sampleUsers}"
      ?selectable="\${args.selectable}"
      @selection-change="\${(e: CustomEvent) => console.log('Selected rows:', e.detail)}"
    ></forge-data-table>
  \`
}`,...(k=(E=s.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};var A,x,L;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    sortable: true
  },
  render: args => html\`
    <forge-data-table
      .columns="\${tableColumns}"
      .data="\${sampleUsers}"
      ?sortable="\${args.sortable}"
      @sort-change="\${(e: CustomEvent) => console.log('Sort changed:', e.detail)}"
    ></forge-data-table>
  \`
}`,...(L=(x=i.parameters)==null?void 0:x.docs)==null?void 0:L.source}}};var w,U,z;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    filterable: true
  },
  render: args => html\`
    <forge-data-table
      .columns="\${tableColumns}"
      .data="\${sampleUsers}"
      ?filterable="\${args.filterable}"
      @filter-change="\${(e: CustomEvent) => console.log('Filter changed:', e.detail)}"
    ></forge-data-table>
  \`
}`,...(z=(U=c.parameters)==null?void 0:U.docs)==null?void 0:z.source}}};var D,F,I;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    paginated: true,
    pageSize: 5
  },
  render: args => html\`
    <forge-data-table
      .columns="\${tableColumns}"
      .data="\${sampleUsers}"
      ?paginated="\${args.paginated}"
      page-size="\${args.pageSize}"
      @page-change="\${(e: CustomEvent) => console.log('Page changed:', e.detail)}"
    ></forge-data-table>
  \`
}`,...(I=(F=d.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};var P,T,N;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    variant: 'striped'
  },
  render: args => html\`
    <forge-data-table
      .columns="\${tableColumns}"
      .data="\${sampleUsers}"
      variant="\${args.variant}"
    ></forge-data-table>
  \`
}`,...(N=(T=g.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var _,O,R;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    variant: 'compact'
  },
  render: args => html\`
    <forge-data-table
      .columns="\${tableColumns}"
      .data="\${sampleUsers}"
      variant="\${args.variant}"
    ></forge-data-table>
  \`
}`,...(R=(O=m.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var V,W,j;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => html\`
    <forge-data-table
      .columns="\${tableColumns}"
      .data="\${sampleUsers}"
      selectable
      sortable
      filterable
      paginated
      page-size="4"
      variant="bordered"
      @selection-change="\${(e: CustomEvent) => console.log('Selection:', e.detail)}"
      @sort-change="\${(e: CustomEvent) => console.log('Sort:', e.detail)}"
      @filter-change="\${(e: CustomEvent) => console.log('Filter:', e.detail)}"
      @page-change="\${(e: CustomEvent) => console.log('Page:', e.detail)}"
    ></forge-data-table>
  \`
}`,...(j=(W=u.parameters)==null?void 0:W.docs)==null?void 0:j.source}}};var B,G,H;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => html\`
    <forge-data-table
      .columns="\${[{
    key: 'name',
    title: 'Name',
    sortable: true
  }, {
    key: 'email',
    title: 'Email',
    sortable: true
  }, {
    key: 'role',
    title: 'Role',
    sortable: true
  }, {
    key: 'status',
    title: 'Status',
    sortable: true,
    template: (value: string) => html\`
            <forge-badge 
              variant="\${value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'default'}"
            >
              \${value}
            </forge-badge>
          \`
  }, {
    key: 'actions',
    title: 'Actions',
    template: (_: any, row: any) => html\`
            <forge-button size="small" variant="outline" @click="\${() => console.log('Edit:', row)}">
              Edit
            </forge-button>
            <forge-button size="small" variant="danger-outline" @click="\${() => console.log('Delete:', row)}">
              Delete
            </forge-button>
          \`
  }]}"
      .data="\${sampleUsers}"
    ></forge-data-table>
  \`
}`,...(H=(G=b.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var J,M,q;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => {
    // Generate larger dataset to demonstrate virtual scrolling
    const largeDataset = Array.from({
      length: 1000
    }, (_, i) => ({
      id: i + 1,
      name: \`User \${i + 1}\`,
      email: \`user\${i + 1}@example.com\`,
      role: ['Admin', 'User', 'Editor'][i % 3],
      status: ['Active', 'Inactive', 'Pending'][i % 3],
      lastLogin: new Date(2024, 0, i % 30 + 1).toISOString().split('T')[0]
    }));
    return html\`
      <div style="height: 400px;">
        <forge-data-table
          .columns="\${tableColumns}"
          .data="\${largeDataset}"
          selectable
          sortable
          filterable
          paginated
          page-size="20"
          virtual-scrolling
        ></forge-data-table>
      </div>
    \`;
  }
}`,...(q=(M=p.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var K,Q,X;f.parameters={...f.parameters,docs:{...(K=f.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => html\`
    <forge-data-table
      .columns="\${tableColumns}"
      .data="\${[]}"
      empty-message="No users found. Try adjusting your search criteria."
    ></forge-data-table>
  \`
}`,...(X=(Q=f.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;$.parameters={...$.parameters,docs:{...(Y=$.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => html\`
    <forge-data-table
      .columns="\${tableColumns}"
      .data="\${[]}"
      loading
      loading-message="Loading user data..."
    ></forge-data-table>
  \`
}`,...(ee=(Z=$.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ae,te,re;h.parameters={...h.parameters,docs:{...(ae=h.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => html\`
    <forge-data-table
      .columns="\${tableColumns}"
      .data="\${sampleUsers}"
      selectable
      sortable
      filterable
      semantic-role="user-management-table"
      ai-context="administrative-dashboard"
      performance-mode="balanced"
      @selection-change="\${(e: CustomEvent) => {
    console.log('AI-aware selection change:', {
      selectedRows: e.detail,
      context: 'user-management',
      action: 'bulk-operations-available'
    });
  }}"
    ></forge-data-table>
  \`
}`,...(re=(te=h.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};const se=["Default","WithSelection","Sortable","WithFiltering","Paginated","StripedVariant","CompactVariant","FullFeatured","CustomColumnTemplate","LargeDataset","EmptyState","LoadingState","AIIntegration"];export{h as AIIntegration,m as CompactVariant,b as CustomColumnTemplate,l as Default,f as EmptyState,u as FullFeatured,p as LargeDataset,$ as LoadingState,d as Paginated,i as Sortable,g as StripedVariant,c as WithFiltering,s as WithSelection,se as __namedExportsOrder,le as default};
