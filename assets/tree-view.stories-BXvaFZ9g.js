import{x as t}from"./iframe-RyCF64Jj.js";import"./preload-helper-C1FmrZbK.js";const se={title:"Organisms/TreeView",component:"forge-tree-view",parameters:{layout:"centered",docs:{description:{component:"A hierarchical tree view component with expand/collapse functionality, selection, search, and virtual scrolling support."}}},argTypes:{selectable:{control:"boolean",description:"Enable node selection"},selectionMode:{control:{type:"select"},options:["single","multiple"],description:"Selection mode"},showCheckboxes:{control:"boolean",description:"Show checkboxes for selection"},showSearch:{control:"boolean",description:"Show search functionality"}}},n=[{id:"1",label:"Documents",icon:"folder",expanded:!0,children:[{id:"1-1",label:"Projects",icon:"folder",children:[{id:"1-1-1",label:"Project A.docx",icon:"description"},{id:"1-1-2",label:"Project B.pdf",icon:"picture_as_pdf"},{id:"1-1-3",label:"Project C.xlsx",icon:"table_chart"}]},{id:"1-2",label:"Reports",icon:"folder",children:[{id:"1-2-1",label:"Q1 Report.pdf",icon:"picture_as_pdf"},{id:"1-2-2",label:"Q2 Report.pdf",icon:"picture_as_pdf"},{id:"1-2-3",label:"Annual Summary.docx",icon:"description"}]}]},{id:"2",label:"Images",icon:"folder",expanded:!1,children:[{id:"2-1",label:"photo1.jpg",icon:"image"},{id:"2-2",label:"photo2.png",icon:"image"},{id:"2-3",label:"screenshot.png",icon:"image"}]},{id:"3",label:"Videos",icon:"folder",children:[{id:"3-1",label:"presentation.mp4",icon:"video_file"},{id:"3-2",label:"tutorial.mkv",icon:"video_file"}]},{id:"4",label:"readme.txt",icon:"description"}],w=[{id:"org",label:"Acme Corporation",icon:"business",expanded:!0,children:[{id:"eng",label:"Engineering",icon:"engineering",expanded:!0,children:[{id:"frontend",label:"Frontend Team",icon:"web",children:[{id:"dev1",label:"Alice Johnson",icon:"person"},{id:"dev2",label:"Bob Smith",icon:"person"},{id:"dev3",label:"Carol Williams",icon:"person"}]},{id:"backend",label:"Backend Team",icon:"storage",children:[{id:"dev4",label:"David Brown",icon:"person"},{id:"dev5",label:"Eva Davis",icon:"person"}]},{id:"devops",label:"DevOps Team",icon:"cloud",children:[{id:"dev6",label:"Frank Miller",icon:"person"},{id:"dev7",label:"Grace Wilson",icon:"person"}]}]},{id:"design",label:"Design",icon:"palette",children:[{id:"designer1",label:"Henry Taylor",icon:"person"},{id:"designer2",label:"Iris Anderson",icon:"person"}]},{id:"marketing",label:"Marketing",icon:"campaign",children:[{id:"marketer1",label:"Jack Thompson",icon:"person"},{id:"marketer2",label:"Kate Martinez",icon:"person"},{id:"marketer3",label:"Liam Garcia",icon:"person"}]}]}],s={args:{selectable:!0,selectionMode:"single"},render:e=>t`
    <forge-tree-view
      .nodes="${n}"
      ?selectable="${e.selectable}"
      selection-mode="${e.selectionMode}"
      ?show-checkboxes="${e.showCheckboxes}"
      ?show-search="${e.showSearch}"
      @nodeexpand="${o=>console.log("Node expand:",o.detail)}"
      @nodeselect="${o=>console.log("Node select:",o.detail)}"
    ></forge-tree-view>
  `},a={render:()=>t`
    <forge-tree-view
      .nodes="${n}"
      selectable
      show-search
      @nodeexpand="${e=>console.log("Node expand:",e.detail)}"
      @nodeselect="${e=>console.log("Node select:",e.detail)}"
    ></forge-tree-view>
  `},c={render:()=>t`
    <forge-tree-view
      .nodes="${n}"
      selectable
      selection-mode="multiple"
      show-checkboxes
      @nodeexpand="${e=>console.log("Node expand:",e.detail)}"
      @nodeselect="${e=>console.log("Node select:",e.detail)}"
    ></forge-tree-view>
  `},p={render:()=>t`
    <div style="width: 400px;">
      <h4 style="margin-bottom: 16px;">Company Organization</h4>
      <forge-tree-view
        .nodes="${w}"
        selectable
        show-search
        @nodeexpand="${e=>console.log("Org expand:",e.detail)}"
        @nodeselect="${e=>console.log("Person select:",e.detail)}"
      ></forge-tree-view>
    </div>
  `},m={render:()=>t`
      <div style="width: 500px; height: 400px;">
        <h4 style="margin-bottom: 16px;">Large Dataset (1000+ nodes)</h4>
        <forge-tree-view
          .nodes="${(()=>{var l,y;const o=[];for(let i=1;i<=20;i++){const $={id:`dept-${i}`,label:`Department ${i}`,icon:"folder",children:[]};for(let r=1;r<=10;r++){const k={id:`dept-${i}-team-${r}`,label:`Team ${r}`,icon:"group",children:[]};for(let d=1;d<=5;d++)(l=k.children)==null||l.push({id:`dept-${i}-team-${r}-person-${d}`,label:`Person ${d}`,icon:"person"});(y=$.children)==null||y.push(k)}o.push($)}return o})()}"
          selectable
          show-search
          @nodeexpand="${o=>console.log("Large tree expand:",o.detail)}"
          @nodeselect="${o=>console.log("Large tree select:",o.detail)}"
        ></forge-tree-view>
      </div>
    `},g={render:()=>t`
      <forge-tree-view
        .nodes="${[{id:"root",label:"Project Files",icon:"folder",expanded:!0,children:[{id:"src",label:"Source Code",icon:"folder",children:[{id:"main.js",label:"main.js",icon:"code"},{id:"utils.js",label:"utils.js",icon:"code"},{id:"config.js",label:"config.js",icon:"code",disabled:!0}]},{id:"build",label:"Build Output",icon:"folder",disabled:!0,children:[{id:"dist.js",label:"dist.js",icon:"code"},{id:"dist.css",label:"dist.css",icon:"style"}]},{id:"readme",label:"README.md",icon:"description"},{id:"license",label:"LICENSE",icon:"gavel",disabled:!0}]}]}"
        selectable
        show-checkboxes
        @nodeexpand="${o=>console.log("Disabled tree expand:",o.detail)}"
        @nodeselect="${o=>console.log("Disabled tree select:",o.detail)}"
      ></forge-tree-view>
    `},b={render:()=>t`
      <div style="width: 350px;">
        <h4 style="margin-bottom: 16px;">File System Explorer</h4>
        <forge-tree-view
          .nodes="${[{id:"home",label:"Home",icon:"home",expanded:!0,children:[{id:"documents",label:"Documents",icon:"folder",children:[{id:"resume.pdf",label:"Resume.pdf",icon:"picture_as_pdf"},{id:"cover-letter.docx",label:"Cover Letter.docx",icon:"description"}]},{id:"downloads",label:"Downloads",icon:"folder",children:[{id:"installer.exe",label:"installer.exe",icon:"get_app"},{id:"archive.zip",label:"archive.zip",icon:"archive"},{id:"image.png",label:"image.png",icon:"image"}]},{id:"desktop",label:"Desktop",icon:"folder",children:[{id:"shortcut1",label:"Application.lnk",icon:"link"},{id:"notes.txt",label:"Notes.txt",icon:"description"}]}]},{id:"system",label:"System",icon:"computer",children:[{id:"program-files",label:"Program Files",icon:"folder",children:[{id:"app1",label:"Application 1",icon:"apps"},{id:"app2",label:"Application 2",icon:"apps"}]},{id:"windows",label:"Windows",icon:"folder",disabled:!0,children:[{id:"system32",label:"System32",icon:"folder"}]}]}]}"
          selectable
          show-search
          @nodeexpand="${o=>console.log("File system expand:",o.detail)}"
          @nodeselect="${o=>console.log("File selected:",o.detail)}"
        ></forge-tree-view>
      </div>
    `},u={render:()=>t`
    <div style="max-width: 600px;">
      <h3>Interactive Tree View Demo</h3>
      <p>Try different tree view features:</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
        <div>
          <h4 style="margin-bottom: 10px;">Single Selection with Search</h4>
          <forge-tree-view
            .nodes="${n}"
            selectable
            show-search
            @nodeexpand="${e=>{const o=document.getElementById("expand-info");o&&(o.textContent=`Node ${e.detail.expanded?"expanded":"collapsed"}: ${e.detail.nodeId}`)}}"
            @nodeselect="${e=>{const o=document.getElementById("select-info");o&&(o.textContent=`Node ${e.detail.selected?"selected":"deselected"}: ${e.detail.nodeId}`)}}"
          ></forge-tree-view>
        </div>
        
        <div>
          <h4 style="margin-bottom: 10px;">Multiple Selection with Checkboxes</h4>
          <forge-tree-view
            .nodes="${w}"
            selectable
            selection-mode="multiple"
            show-checkboxes
            @nodeselect="${e=>{const o=document.getElementById("multi-select-info");if(o){const l=e.detail.selected?"added to":"removed from";o.textContent=`${e.detail.nodeId} ${l} selection`}}}"
          ></forge-tree-view>
        </div>
      </div>
      
      <div style="margin: 20px 0;">
        <div id="expand-info" style="padding: 8px; background: #f0f9ff; border: 1px solid #bfdbfe; border-radius: 4px; margin-bottom: 8px;">
          <strong>Expand/Collapse:</strong> Click folder icons to expand or collapse nodes
        </div>
        <div id="select-info" style="padding: 8px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; margin-bottom: 8px;">
          <strong>Selection:</strong> Click nodes to select them
        </div>
        <div id="multi-select-info" style="padding: 8px; background: #fef3c7; border: 1px solid #fcd34d; border-radius: 4px;">
          <strong>Multi-Selection:</strong> Use checkboxes for multiple selections
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features to try:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li><kbd>↑</kbd>/<kbd>↓</kbd> - Navigate between nodes</li>
          <li><kbd>→</kbd> - Expand focused node</li>
          <li><kbd>←</kbd> - Collapse focused node</li>
          <li><kbd>Enter</kbd>/<kbd>Space</kbd> - Select node</li>
          <li>Search functionality filters and auto-expands</li>
          <li>Checkboxes for multiple selection mode</li>
          <li>Disabled nodes cannot be selected</li>
        </ul>
      </div>
    </div>
  `},h={render:()=>t`
    <div style="max-width: 500px;">
      <h3>Programmatic Control Demo</h3>
      <p>Use buttons to control the tree view:</p>
      
      <div style="display: flex; gap: 8px; margin: 16px 0; flex-wrap: wrap;">
        <forge-button size="sm" @click="${()=>{const e=document.getElementById("controlled-tree");e==null||e.expandNode("1")}}">
          Expand Documents
        </forge-button>
        <forge-button size="sm" @click="${()=>{const e=document.getElementById("controlled-tree");e==null||e.collapseNode("1")}}">
          Collapse Documents
        </forge-button>
        <forge-button size="sm" @click="${()=>{const e=document.getElementById("controlled-tree");e==null||e.selectNode("1-1-1")}}">
          Select Project A
        </forge-button>
        <forge-button size="sm" @click="${()=>{const e=document.getElementById("controlled-tree");e==null||e.clearSelection()}}">
          Clear Selection
        </forge-button>
      </div>
      
      <forge-tree-view
        id="controlled-tree"
        .nodes="${n}"
        selectable
        @nodeexpand="${e=>console.log("Programmatic expand:",e.detail)}"
        @nodeselect="${e=>console.log("Programmatic select:",e.detail)}"
      ></forge-tree-view>
    </div>
  `},f={render:()=>t`
    <style>
      .custom-tree {
        --forge-primary-color: #10b981;
        --forge-primary-bg-light: rgba(16, 185, 129, 0.1);
        --forge-hover-bg: rgba(16, 185, 129, 0.05);
      }
    </style>
    <div style="width: 350px;">
      <h4 style="margin-bottom: 16px;">Custom Green Theme</h4>
      <forge-tree-view
        class="custom-tree"
        .nodes="${n}"
        selectable
        show-search
      ></forge-tree-view>
    </div>
  `},x={render:()=>t`
    <div style="display: flex; gap: 30px;">
      <div>
        <h4 style="margin-bottom: 16px;">No Nodes</h4>
        <forge-tree-view
          .nodes="${[]}"
          selectable
        ></forge-tree-view>
      </div>
      
      <div>
        <h4 style="margin-bottom: 16px;">No Search Results</h4>
        <forge-tree-view
          .nodes="${n}"
          selectable
          show-search
          search-term="nonexistent"
        ></forge-tree-view>
      </div>
    </div>
  `},v={render:()=>t`
    <forge-tree-view
      .nodes="${w}"
      selectable
      show-search
      semantic-role="navigation"
      ai-context="organizational-structure"
      performance-mode="balanced"
      @nodeexpand="${e=>{console.log("AI-aware tree expansion:",{nodeId:e.detail.nodeId,expanded:e.detail.expanded,context:"organizational-structure",userIntent:"structure-exploration"})}}"
      @nodeselect="${e=>{console.log("AI-aware tree selection:",{nodeId:e.detail.nodeId,selected:e.detail.selected,context:"organizational-structure",userIntent:"item-selection"})}}"
    ></forge-tree-view>
  `};var C,S,E;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    selectable: true,
    selectionMode: 'single'
  },
  render: args => html\`
    <forge-tree-view
      .nodes="\${basicTreeData}"
      ?selectable="\${args.selectable}"
      selection-mode="\${args.selectionMode}"
      ?show-checkboxes="\${args.showCheckboxes}"
      ?show-search="\${args.showSearch}"
      @nodeexpand="\${(e: CustomEvent) => console.log('Node expand:', e.detail)}"
      @nodeselect="\${(e: CustomEvent) => console.log('Node select:', e.detail)}"
    ></forge-tree-view>
  \`
}`,...(E=(S=s.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};var D,I,N;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => html\`
    <forge-tree-view
      .nodes="\${basicTreeData}"
      selectable
      show-search
      @nodeexpand="\${(e: CustomEvent) => console.log('Node expand:', e.detail)}"
      @nodeselect="\${(e: CustomEvent) => console.log('Node select:', e.detail)}"
    ></forge-tree-view>
  \`
}`,...(N=(I=a.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var T,j,z;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => html\`
    <forge-tree-view
      .nodes="\${basicTreeData}"
      selectable
      selection-mode="multiple"
      show-checkboxes
      @nodeexpand="\${(e: CustomEvent) => console.log('Node expand:', e.detail)}"
      @nodeselect="\${(e: CustomEvent) => console.log('Node select:', e.detail)}"
    ></forge-tree-view>
  \`
}`,...(z=(j=c.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var A,P,B;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => html\`
    <div style="width: 400px;">
      <h4 style="margin-bottom: 16px;">Company Organization</h4>
      <forge-tree-view
        .nodes="\${organizationData}"
        selectable
        show-search
        @nodeexpand="\${(e: CustomEvent) => console.log('Org expand:', e.detail)}"
        @nodeselect="\${(e: CustomEvent) => console.log('Person select:', e.detail)}"
      ></forge-tree-view>
    </div>
  \`
}`,...(B=(P=p.parameters)==null?void 0:P.docs)==null?void 0:B.source}}};var L,_,F;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    // Generate a large tree structure for testing virtual scrolling
    const generateLargeTree = (): TreeNode[] => {
      const tree: TreeNode[] = [];
      for (let i = 1; i <= 20; i++) {
        const department: TreeNode = {
          id: \`dept-\${i}\`,
          label: \`Department \${i}\`,
          icon: 'folder',
          children: []
        };
        for (let j = 1; j <= 10; j++) {
          const team: TreeNode = {
            id: \`dept-\${i}-team-\${j}\`,
            label: \`Team \${j}\`,
            icon: 'group',
            children: []
          };
          for (let k = 1; k <= 5; k++) {
            team.children?.push({
              id: \`dept-\${i}-team-\${j}-person-\${k}\`,
              label: \`Person \${k}\`,
              icon: 'person'
            });
          }
          department.children?.push(team);
        }
        tree.push(department);
      }
      return tree;
    };
    return html\`
      <div style="width: 500px; height: 400px;">
        <h4 style="margin-bottom: 16px;">Large Dataset (1000+ nodes)</h4>
        <forge-tree-view
          .nodes="\${generateLargeTree()}"
          selectable
          show-search
          @nodeexpand="\${(e: CustomEvent) => console.log('Large tree expand:', e.detail)}"
          @nodeselect="\${(e: CustomEvent) => console.log('Large tree select:', e.detail)}"
        ></forge-tree-view>
      </div>
    \`;
  }
}`,...(F=(_=m.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var M,W,O;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    const treeWithDisabled: TreeNode[] = [{
      id: 'root',
      label: 'Project Files',
      icon: 'folder',
      expanded: true,
      children: [{
        id: 'src',
        label: 'Source Code',
        icon: 'folder',
        children: [{
          id: 'main.js',
          label: 'main.js',
          icon: 'code'
        }, {
          id: 'utils.js',
          label: 'utils.js',
          icon: 'code'
        }, {
          id: 'config.js',
          label: 'config.js',
          icon: 'code',
          disabled: true
        }]
      }, {
        id: 'build',
        label: 'Build Output',
        icon: 'folder',
        disabled: true,
        children: [{
          id: 'dist.js',
          label: 'dist.js',
          icon: 'code'
        }, {
          id: 'dist.css',
          label: 'dist.css',
          icon: 'style'
        }]
      }, {
        id: 'readme',
        label: 'README.md',
        icon: 'description'
      }, {
        id: 'license',
        label: 'LICENSE',
        icon: 'gavel',
        disabled: true
      }]
    }];
    return html\`
      <forge-tree-view
        .nodes="\${treeWithDisabled}"
        selectable
        show-checkboxes
        @nodeexpand="\${(e: CustomEvent) => console.log('Disabled tree expand:', e.detail)}"
        @nodeselect="\${(e: CustomEvent) => console.log('Disabled tree select:', e.detail)}"
      ></forge-tree-view>
    \`;
  }
}`,...(O=(W=g.parameters)==null?void 0:W.docs)==null?void 0:O.source}}};var R,G,U;b.parameters={...b.parameters,docs:{...(R=b.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => {
    const fileSystemData: TreeNode[] = [{
      id: 'home',
      label: 'Home',
      icon: 'home',
      expanded: true,
      children: [{
        id: 'documents',
        label: 'Documents',
        icon: 'folder',
        children: [{
          id: 'resume.pdf',
          label: 'Resume.pdf',
          icon: 'picture_as_pdf'
        }, {
          id: 'cover-letter.docx',
          label: 'Cover Letter.docx',
          icon: 'description'
        }]
      }, {
        id: 'downloads',
        label: 'Downloads',
        icon: 'folder',
        children: [{
          id: 'installer.exe',
          label: 'installer.exe',
          icon: 'get_app'
        }, {
          id: 'archive.zip',
          label: 'archive.zip',
          icon: 'archive'
        }, {
          id: 'image.png',
          label: 'image.png',
          icon: 'image'
        }]
      }, {
        id: 'desktop',
        label: 'Desktop',
        icon: 'folder',
        children: [{
          id: 'shortcut1',
          label: 'Application.lnk',
          icon: 'link'
        }, {
          id: 'notes.txt',
          label: 'Notes.txt',
          icon: 'description'
        }]
      }]
    }, {
      id: 'system',
      label: 'System',
      icon: 'computer',
      children: [{
        id: 'program-files',
        label: 'Program Files',
        icon: 'folder',
        children: [{
          id: 'app1',
          label: 'Application 1',
          icon: 'apps'
        }, {
          id: 'app2',
          label: 'Application 2',
          icon: 'apps'
        }]
      }, {
        id: 'windows',
        label: 'Windows',
        icon: 'folder',
        disabled: true,
        children: [{
          id: 'system32',
          label: 'System32',
          icon: 'folder'
        }]
      }]
    }];
    return html\`
      <div style="width: 350px;">
        <h4 style="margin-bottom: 16px;">File System Explorer</h4>
        <forge-tree-view
          .nodes="\${fileSystemData}"
          selectable
          show-search
          @nodeexpand="\${(e: CustomEvent) => console.log('File system expand:', e.detail)}"
          @nodeselect="\${(e: CustomEvent) => console.log('File selected:', e.detail)}"
        ></forge-tree-view>
      </div>
    \`;
  }
}`,...(U=(G=b.parameters)==null?void 0:G.docs)==null?void 0:U.source}}};var V,H,J;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => html\`
    <div style="max-width: 600px;">
      <h3>Interactive Tree View Demo</h3>
      <p>Try different tree view features:</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
        <div>
          <h4 style="margin-bottom: 10px;">Single Selection with Search</h4>
          <forge-tree-view
            .nodes="\${basicTreeData}"
            selectable
            show-search
            @nodeexpand="\${(e: CustomEvent) => {
    const info = document.getElementById('expand-info');
    if (info) {
      info.textContent = \`Node \${e.detail.expanded ? 'expanded' : 'collapsed'}: \${e.detail.nodeId}\`;
    }
  }}"
            @nodeselect="\${(e: CustomEvent) => {
    const info = document.getElementById('select-info');
    if (info) {
      info.textContent = \`Node \${e.detail.selected ? 'selected' : 'deselected'}: \${e.detail.nodeId}\`;
    }
  }}"
          ></forge-tree-view>
        </div>
        
        <div>
          <h4 style="margin-bottom: 10px;">Multiple Selection with Checkboxes</h4>
          <forge-tree-view
            .nodes="\${organizationData}"
            selectable
            selection-mode="multiple"
            show-checkboxes
            @nodeselect="\${(e: CustomEvent) => {
    const info = document.getElementById('multi-select-info');
    if (info) {
      const action = e.detail.selected ? 'added to' : 'removed from';
      info.textContent = \`\${e.detail.nodeId} \${action} selection\`;
    }
  }}"
          ></forge-tree-view>
        </div>
      </div>
      
      <div style="margin: 20px 0;">
        <div id="expand-info" style="padding: 8px; background: #f0f9ff; border: 1px solid #bfdbfe; border-radius: 4px; margin-bottom: 8px;">
          <strong>Expand/Collapse:</strong> Click folder icons to expand or collapse nodes
        </div>
        <div id="select-info" style="padding: 8px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; margin-bottom: 8px;">
          <strong>Selection:</strong> Click nodes to select them
        </div>
        <div id="multi-select-info" style="padding: 8px; background: #fef3c7; border: 1px solid #fcd34d; border-radius: 4px;">
          <strong>Multi-Selection:</strong> Use checkboxes for multiple selections
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features to try:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li><kbd>↑</kbd>/<kbd>↓</kbd> - Navigate between nodes</li>
          <li><kbd>→</kbd> - Expand focused node</li>
          <li><kbd>←</kbd> - Collapse focused node</li>
          <li><kbd>Enter</kbd>/<kbd>Space</kbd> - Select node</li>
          <li>Search functionality filters and auto-expands</li>
          <li>Checkboxes for multiple selection mode</li>
          <li>Disabled nodes cannot be selected</li>
        </ul>
      </div>
    </div>
  \`
}`,...(J=(H=u.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var Q,K,q;h.parameters={...h.parameters,docs:{...(Q=h.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => html\`
    <div style="max-width: 500px;">
      <h3>Programmatic Control Demo</h3>
      <p>Use buttons to control the tree view:</p>
      
      <div style="display: flex; gap: 8px; margin: 16px 0; flex-wrap: wrap;">
        <forge-button size="sm" @click="\${() => {
    const tree = document.getElementById('controlled-tree') as any;
    tree?.expandNode('1');
  }}">
          Expand Documents
        </forge-button>
        <forge-button size="sm" @click="\${() => {
    const tree = document.getElementById('controlled-tree') as any;
    tree?.collapseNode('1');
  }}">
          Collapse Documents
        </forge-button>
        <forge-button size="sm" @click="\${() => {
    const tree = document.getElementById('controlled-tree') as any;
    tree?.selectNode('1-1-1');
  }}">
          Select Project A
        </forge-button>
        <forge-button size="sm" @click="\${() => {
    const tree = document.getElementById('controlled-tree') as any;
    tree?.clearSelection();
  }}">
          Clear Selection
        </forge-button>
      </div>
      
      <forge-tree-view
        id="controlled-tree"
        .nodes="\${basicTreeData}"
        selectable
        @nodeexpand="\${(e: CustomEvent) => console.log('Programmatic expand:', e.detail)}"
        @nodeselect="\${(e: CustomEvent) => console.log('Programmatic select:', e.detail)}"
      ></forge-tree-view>
    </div>
  \`
}`,...(q=(K=h.parameters)==null?void 0:K.docs)==null?void 0:q.source}}};var X,Y,Z;f.parameters={...f.parameters,docs:{...(X=f.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => html\`
    <style>
      .custom-tree {
        --forge-primary-color: #10b981;
        --forge-primary-bg-light: rgba(16, 185, 129, 0.1);
        --forge-hover-bg: rgba(16, 185, 129, 0.05);
      }
    </style>
    <div style="width: 350px;">
      <h4 style="margin-bottom: 16px;">Custom Green Theme</h4>
      <forge-tree-view
        class="custom-tree"
        .nodes="\${basicTreeData}"
        selectable
        show-search
      ></forge-tree-view>
    </div>
  \`
}`,...(Z=(Y=f.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,oe,te;x.parameters={...x.parameters,docs:{...(ee=x.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 30px;">
      <div>
        <h4 style="margin-bottom: 16px;">No Nodes</h4>
        <forge-tree-view
          .nodes="\${[]}"
          selectable
        ></forge-tree-view>
      </div>
      
      <div>
        <h4 style="margin-bottom: 16px;">No Search Results</h4>
        <forge-tree-view
          .nodes="\${basicTreeData}"
          selectable
          show-search
          search-term="nonexistent"
        ></forge-tree-view>
      </div>
    </div>
  \`
}`,...(te=(oe=x.parameters)==null?void 0:oe.docs)==null?void 0:te.source}}};var ne,ie,re;v.parameters={...v.parameters,docs:{...(ne=v.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => html\`
    <forge-tree-view
      .nodes="\${organizationData}"
      selectable
      show-search
      semantic-role="navigation"
      ai-context="organizational-structure"
      performance-mode="balanced"
      @nodeexpand="\${(e: CustomEvent) => {
    console.log('AI-aware tree expansion:', {
      nodeId: e.detail.nodeId,
      expanded: e.detail.expanded,
      context: 'organizational-structure',
      userIntent: 'structure-exploration'
    });
  }}"
      @nodeselect="\${(e: CustomEvent) => {
    console.log('AI-aware tree selection:', {
      nodeId: e.detail.nodeId,
      selected: e.detail.selected,
      context: 'organizational-structure',
      userIntent: 'item-selection'
    });
  }}"
    ></forge-tree-view>
  \`
}`,...(re=(ie=v.parameters)==null?void 0:ie.docs)==null?void 0:re.source}}};const ae=["Default","WithSearch","WithCheckboxes","OrganizationChart","LargeDataset","DisabledNodes","FileSystemExplorer","InteractiveDemo","ProgrammaticControl","CustomStyling","EmptyState","AIIntegration"];export{v as AIIntegration,f as CustomStyling,s as Default,g as DisabledNodes,x as EmptyState,b as FileSystemExplorer,u as InteractiveDemo,m as LargeDataset,p as OrganizationChart,h as ProgrammaticControl,c as WithCheckboxes,a as WithSearch,ae as __namedExportsOrder,se as default};
