import{x as e}from"./iframe-C-1QsWs8.js";import"./preload-helper-C1FmrZbK.js";const O={title:"Molecules/Card",component:"forge-card",parameters:{layout:"centered",docs:{description:{component:"A flexible card container component with multiple variants, elevation levels, and media support."}}},argTypes:{variant:{control:{type:"select"},options:["default","elevated","outlined","filled","interactive"],description:"Card visual style variant"},elevation:{control:{type:"select"},options:["0","1","2","3","4","5"],description:"Shadow elevation level (0-5)"},padding:{control:{type:"select"},options:["none","small","medium","large"],description:"Internal padding size"},clickable:{control:"boolean",description:"Make entire card clickable"}}},a={render:()=>e`
    <forge-card style="width: 300px;">
      <h3 slot="header">Default Card</h3>
      <p>This is a basic card with default styling. It contains a header and body content.</p>
      <div slot="footer">
        <forge-button size="small">Action</forge-button>
      </div>
    </forge-card>
  `},i={render:()=>e`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; max-width: 1000px;">
      <forge-card variant="default">
        <h4 slot="header">Default</h4>
        <p>Standard card with subtle styling.</p>
      </forge-card>
      
      <forge-card variant="elevated">
        <h4 slot="header">Elevated</h4>
        <p>Card with enhanced shadow elevation.</p>
      </forge-card>
      
      <forge-card variant="outlined">
        <h4 slot="header">Outlined</h4>
        <p>Card with visible border outline.</p>
      </forge-card>
      
      <forge-card variant="filled">
        <h4 slot="header">Filled</h4>
        <p>Card with background fill color.</p>
      </forge-card>
      
      <forge-card variant="interactive" clickable>
        <h4 slot="header">Interactive</h4>
        <p>Clickable card with hover effects.</p>
      </forge-card>
    </div>
  `},r={render:()=>e`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 800px;">
      ${Array.from({length:6},(G,t)=>e`
        <forge-card elevation="${t}" style="text-align: center; padding: 20px;">
          <h4>Elevation ${t}</h4>
          <p>Shadow depth level ${t}</p>
        </forge-card>
      `)}
    </div>
  `},n={render:()=>e`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
      <forge-card variant="elevated">
        <img slot="media" 
             src="https://picsum.photos/400/200?random=1" 
             alt="Card media"
             style="width: 100%; height: 200px; object-fit: cover;">
        <h3 slot="header">Card with Image</h3>
        <p>This card includes a media slot with an image at the top.</p>
        <div slot="footer" style="display: flex; gap: 8px;">
          <forge-button size="small" variant="outline">Share</forge-button>
          <forge-button size="small">Learn More</forge-button>
        </div>
      </forge-card>
      
      <forge-card variant="elevated">
        <div slot="media" style="height: 200px; background: linear-gradient(45deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white;">
          <h2>Custom Media</h2>
        </div>
        <h3 slot="header">Custom Media Slot</h3>
        <p>The media slot can contain any content, not just images.</p>
        <div slot="footer">
          <forge-badge variant="primary">New</forge-badge>
        </div>
      </forge-card>
    </div>
  `},o={render:()=>e`
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 600px;">
      <forge-card padding="none" variant="outlined">
        <h4 style="margin: 0; padding: 16px; background: #f5f5f5;">No Padding</h4>
        <p style="margin: 0; padding: 16px;">Content needs manual padding when padding="none".</p>
      </forge-card>
      
      <forge-card padding="small" variant="outlined">
        <h4 slot="header">Small Padding</h4>
        <p>Compact spacing for dense layouts.</p>
      </forge-card>
      
      <forge-card padding="medium" variant="outlined">
        <h4 slot="header">Medium Padding</h4>
        <p>Default comfortable spacing.</p>
      </forge-card>
      
      <forge-card padding="large" variant="outlined">
        <h4 slot="header">Large Padding</h4>
        <p>Generous spacing for emphasis.</p>
      </forge-card>
    </div>
  `},d={render:()=>e`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
      <forge-card 
        variant="interactive" 
        clickable 
        @click="${()=>alert("Card clicked!")}"
      >
        <h3 slot="header">🎯 Clickable Card</h3>
        <p>This entire card is clickable. Click anywhere to trigger the action.</p>
        <div slot="footer">
          <small>Click me!</small>
        </div>
      </forge-card>
      
      <forge-card variant="interactive" clickable>
        <forge-icon slot="media" name="analytics" style="font-size: 48px; padding: 20px; text-align: center; color: #667eea;"></forge-icon>
        <h3 slot="header">Analytics Dashboard</h3>
        <p>View detailed analytics and performance metrics.</p>
        <div slot="footer" style="display: flex; justify-content: space-between; align-items: center;">
          <forge-badge variant="info">Updated</forge-badge>
          <small>Click to open →</small>
        </div>
      </forge-card>
    </div>
  `},l={render:()=>e`
    <div style="max-width: 400px;">
      <forge-card variant="elevated" elevation="3">
        <div slot="media" style="position: relative;">
          <img src="https://picsum.photos/400/250?random=2" 
               alt="Product image" 
               style="width: 100%; height: 250px; object-fit: cover;">
          <forge-badge 
            variant="danger" 
            style="position: absolute; top: 12px; right: 12px;">
            Sale
          </forge-badge>
        </div>
        
        <div slot="header" style="display: flex; justify-content: space-between; align-items: start;">
          <div>
            <h3 style="margin: 0 0 4px 0;">Premium Widget</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">SKU: PWD-001</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 24px; font-weight: bold; color: #e74c3c;">$99.99</div>
            <div style="font-size: 14px; color: #666; text-decoration: line-through;">$149.99</div>
          </div>
        </div>
        
        <p>High-quality premium widget with advanced features and excellent build quality. Perfect for professional use.</p>
        
        <div style="margin: 16px 0;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-size: 20px;">⭐⭐⭐⭐⭐</span>
            <small>(142 reviews)</small>
          </div>
          <div style="display: flex; gap: 8px;">
            <forge-badge variant="success" size="small">In Stock</forge-badge>
            <forge-badge variant="info" size="small">Free Shipping</forge-badge>
          </div>
        </div>
        
        <div slot="footer" style="display: flex; gap: 8px;">
          <forge-button variant="outline" size="small" style="flex: 1;">
            Add to Wishlist
          </forge-button>
          <forge-button variant="primary" size="small" style="flex: 2;">
            Add to Cart
          </forge-button>
        </div>
      </forge-card>
    </div>
  `},s={render:()=>e`
    <forge-card variant="elevated" style="width: 300px;">
      <div slot="media" style="height: 200px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
        <div style="animation: pulse 1.5s ease-in-out infinite;">📸 Loading...</div>
      </div>
      <div slot="header">
        <div style="height: 24px; background: #e0e0e0; border-radius: 4px; margin-bottom: 8px; animation: pulse 1.5s ease-in-out infinite;"></div>
        <div style="height: 16px; background: #f0f0f0; border-radius: 4px; width: 60%; animation: pulse 1.5s ease-in-out infinite;"></div>
      </div>
      <div style="space-y: 8px;">
        <div style="height: 16px; background: #f0f0f0; border-radius: 4px; margin-bottom: 8px; animation: pulse 1.5s ease-in-out infinite;"></div>
        <div style="height: 16px; background: #f0f0f0; border-radius: 4px; width: 80%; animation: pulse 1.5s ease-in-out infinite;"></div>
      </div>
    </forge-card>
    
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    </style>
  `},c={render:()=>e`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; max-width: 1200px;">
      ${Array.from({length:6},(G,t)=>e`
        <forge-card variant="elevated" clickable>
          <div slot="media" style="height: 160px; background: linear-gradient(135deg, hsl(${t*60}, 70%, 60%), hsl(${t*60+30}, 70%, 70%)); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">
            Item ${t+1}
          </div>
          <h3 slot="header">Card Title ${t+1}</h3>
          <p>Description for card ${t+1}. This demonstrates how cards work in a grid layout.</p>
          <div slot="footer" style="display: flex; justify-content: space-between; align-items: center;">
            <forge-badge variant="${["primary","success","warning","danger","info"][t%5]}" size="small">
              ${["New","Active","Pending","Archive","Draft"][t%5]}
            </forge-badge>
            <forge-button size="small" variant="outline">View</forge-button>
          </div>
        </forge-card>
      `)}
    </div>
  `},p={render:()=>e`
    <forge-card 
      variant="interactive"
      clickable
      semantic-role="content-card"
      ai-context="product-showcase"
      performance-mode="balanced"
      @click="${()=>{console.log("AI-aware card interaction:",{context:"product-showcase",userIntent:"product-view",cardType:"interactive"})}}"
      style="width: 350px;"
    >
      <div slot="media" style="background: linear-gradient(135deg, #667eea, #764ba2); height: 200px; display: flex; align-items: center; justify-content: center; color: white;">
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 8px;">🤖</div>
          <h3 style="margin: 0;">AI-Ready Card</h3>
        </div>
      </div>
      
      <h3 slot="header">Intelligent Component</h3>
      <p>This card includes AI metadata for intelligent interactions:</p>
      <ul style="margin: 16px 0; padding-left: 20px; font-size: 14px;">
        <li><strong>Semantic Role:</strong> content-card</li>
        <li><strong>AI Context:</strong> product-showcase</li>
        <li><strong>Performance Mode:</strong> balanced</li>
      </ul>
      
      <div slot="footer" style="display: flex; justify-content: space-between; align-items: center;">
        <forge-badge variant="primary" size="small">AI-Enhanced</forge-badge>
        <small>Click for AI context →</small>
      </div>
    </forge-card>
  `};var g,f,m;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => html\`
    <forge-card style="width: 300px;">
      <h3 slot="header">Default Card</h3>
      <p>This is a basic card with default styling. It contains a header and body content.</p>
      <div slot="footer">
        <forge-button size="small">Action</forge-button>
      </div>
    </forge-card>
  \`
}`,...(m=(f=a.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};var h,v,u;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; max-width: 1000px;">
      <forge-card variant="default">
        <h4 slot="header">Default</h4>
        <p>Standard card with subtle styling.</p>
      </forge-card>
      
      <forge-card variant="elevated">
        <h4 slot="header">Elevated</h4>
        <p>Card with enhanced shadow elevation.</p>
      </forge-card>
      
      <forge-card variant="outlined">
        <h4 slot="header">Outlined</h4>
        <p>Card with visible border outline.</p>
      </forge-card>
      
      <forge-card variant="filled">
        <h4 slot="header">Filled</h4>
        <p>Card with background fill color.</p>
      </forge-card>
      
      <forge-card variant="interactive" clickable>
        <h4 slot="header">Interactive</h4>
        <p>Clickable card with hover effects.</p>
      </forge-card>
    </div>
  \`
}`,...(u=(v=i.parameters)==null?void 0:v.docs)==null?void 0:u.source}}};var y,x,b;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 800px;">
      \${Array.from({
    length: 6
  }, (_, i) => html\`
        <forge-card elevation="\${i}" style="text-align: center; padding: 20px;">
          <h4>Elevation \${i}</h4>
          <p>Shadow depth level \${i}</p>
        </forge-card>
      \`)}
    </div>
  \`
}`,...(b=(x=r.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var w,k,C;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
      <forge-card variant="elevated">
        <img slot="media" 
             src="https://picsum.photos/400/200?random=1" 
             alt="Card media"
             style="width: 100%; height: 200px; object-fit: cover;">
        <h3 slot="header">Card with Image</h3>
        <p>This card includes a media slot with an image at the top.</p>
        <div slot="footer" style="display: flex; gap: 8px;">
          <forge-button size="small" variant="outline">Share</forge-button>
          <forge-button size="small">Learn More</forge-button>
        </div>
      </forge-card>
      
      <forge-card variant="elevated">
        <div slot="media" style="height: 200px; background: linear-gradient(45deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white;">
          <h2>Custom Media</h2>
        </div>
        <h3 slot="header">Custom Media Slot</h3>
        <p>The media slot can contain any content, not just images.</p>
        <div slot="footer">
          <forge-badge variant="primary">New</forge-badge>
        </div>
      </forge-card>
    </div>
  \`
}`,...(C=(k=n.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var z,S,$;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 600px;">
      <forge-card padding="none" variant="outlined">
        <h4 style="margin: 0; padding: 16px; background: #f5f5f5;">No Padding</h4>
        <p style="margin: 0; padding: 16px;">Content needs manual padding when padding="none".</p>
      </forge-card>
      
      <forge-card padding="small" variant="outlined">
        <h4 slot="header">Small Padding</h4>
        <p>Compact spacing for dense layouts.</p>
      </forge-card>
      
      <forge-card padding="medium" variant="outlined">
        <h4 slot="header">Medium Padding</h4>
        <p>Default comfortable spacing.</p>
      </forge-card>
      
      <forge-card padding="large" variant="outlined">
        <h4 slot="header">Large Padding</h4>
        <p>Generous spacing for emphasis.</p>
      </forge-card>
    </div>
  \`
}`,...($=(S=o.parameters)==null?void 0:S.docs)==null?void 0:$.source}}};var A,I,j;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
      <forge-card 
        variant="interactive" 
        clickable 
        @click="\${() => alert('Card clicked!')}"
      >
        <h3 slot="header">🎯 Clickable Card</h3>
        <p>This entire card is clickable. Click anywhere to trigger the action.</p>
        <div slot="footer">
          <small>Click me!</small>
        </div>
      </forge-card>
      
      <forge-card variant="interactive" clickable>
        <forge-icon slot="media" name="analytics" style="font-size: 48px; padding: 20px; text-align: center; color: #667eea;"></forge-icon>
        <h3 slot="header">Analytics Dashboard</h3>
        <p>View detailed analytics and performance metrics.</p>
        <div slot="footer" style="display: flex; justify-content: space-between; align-items: center;">
          <forge-badge variant="info">Updated</forge-badge>
          <small>Click to open →</small>
        </div>
      </forge-card>
    </div>
  \`
}`,...(j=(I=d.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var P,T,D;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => html\`
    <div style="max-width: 400px;">
      <forge-card variant="elevated" elevation="3">
        <div slot="media" style="position: relative;">
          <img src="https://picsum.photos/400/250?random=2" 
               alt="Product image" 
               style="width: 100%; height: 250px; object-fit: cover;">
          <forge-badge 
            variant="danger" 
            style="position: absolute; top: 12px; right: 12px;">
            Sale
          </forge-badge>
        </div>
        
        <div slot="header" style="display: flex; justify-content: space-between; align-items: start;">
          <div>
            <h3 style="margin: 0 0 4px 0;">Premium Widget</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">SKU: PWD-001</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 24px; font-weight: bold; color: #e74c3c;">$99.99</div>
            <div style="font-size: 14px; color: #666; text-decoration: line-through;">$149.99</div>
          </div>
        </div>
        
        <p>High-quality premium widget with advanced features and excellent build quality. Perfect for professional use.</p>
        
        <div style="margin: 16px 0;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-size: 20px;">⭐⭐⭐⭐⭐</span>
            <small>(142 reviews)</small>
          </div>
          <div style="display: flex; gap: 8px;">
            <forge-badge variant="success" size="small">In Stock</forge-badge>
            <forge-badge variant="info" size="small">Free Shipping</forge-badge>
          </div>
        </div>
        
        <div slot="footer" style="display: flex; gap: 8px;">
          <forge-button variant="outline" size="small" style="flex: 1;">
            Add to Wishlist
          </forge-button>
          <forge-button variant="primary" size="small" style="flex: 2;">
            Add to Cart
          </forge-button>
        </div>
      </forge-card>
    </div>
  \`
}`,...(D=(T=l.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var M,L,E;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => html\`
    <forge-card variant="elevated" style="width: 300px;">
      <div slot="media" style="height: 200px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
        <div style="animation: pulse 1.5s ease-in-out infinite;">📸 Loading...</div>
      </div>
      <div slot="header">
        <div style="height: 24px; background: #e0e0e0; border-radius: 4px; margin-bottom: 8px; animation: pulse 1.5s ease-in-out infinite;"></div>
        <div style="height: 16px; background: #f0f0f0; border-radius: 4px; width: 60%; animation: pulse 1.5s ease-in-out infinite;"></div>
      </div>
      <div style="space-y: 8px;">
        <div style="height: 16px; background: #f0f0f0; border-radius: 4px; margin-bottom: 8px; animation: pulse 1.5s ease-in-out infinite;"></div>
        <div style="height: 16px; background: #f0f0f0; border-radius: 4px; width: 80%; animation: pulse 1.5s ease-in-out infinite;"></div>
      </div>
    </forge-card>
    
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    </style>
  \`
}`,...(E=(L=s.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};var V,W,N;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; max-width: 1200px;">
      \${Array.from({
    length: 6
  }, (_, i) => html\`
        <forge-card variant="elevated" clickable>
          <div slot="media" style="height: 160px; background: linear-gradient(135deg, hsl(\${i * 60}, 70%, 60%), hsl(\${i * 60 + 30}, 70%, 70%)); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">
            Item \${i + 1}
          </div>
          <h3 slot="header">Card Title \${i + 1}</h3>
          <p>Description for card \${i + 1}. This demonstrates how cards work in a grid layout.</p>
          <div slot="footer" style="display: flex; justify-content: space-between; align-items: center;">
            <forge-badge variant="\${['primary', 'success', 'warning', 'danger', 'info'][i % 5]}" size="small">
              \${['New', 'Active', 'Pending', 'Archive', 'Draft'][i % 5]}
            </forge-badge>
            <forge-button size="small" variant="outline">View</forge-button>
          </div>
        </forge-card>
      \`)}
    </div>
  \`
}`,...(N=(W=c.parameters)==null?void 0:W.docs)==null?void 0:N.source}}};var _,q,F;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => html\`
    <forge-card 
      variant="interactive"
      clickable
      semantic-role="content-card"
      ai-context="product-showcase"
      performance-mode="balanced"
      @click="\${() => {
    console.log('AI-aware card interaction:', {
      context: 'product-showcase',
      userIntent: 'product-view',
      cardType: 'interactive'
    });
  }}"
      style="width: 350px;"
    >
      <div slot="media" style="background: linear-gradient(135deg, #667eea, #764ba2); height: 200px; display: flex; align-items: center; justify-content: center; color: white;">
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 8px;">🤖</div>
          <h3 style="margin: 0;">AI-Ready Card</h3>
        </div>
      </div>
      
      <h3 slot="header">Intelligent Component</h3>
      <p>This card includes AI metadata for intelligent interactions:</p>
      <ul style="margin: 16px 0; padding-left: 20px; font-size: 14px;">
        <li><strong>Semantic Role:</strong> content-card</li>
        <li><strong>AI Context:</strong> product-showcase</li>
        <li><strong>Performance Mode:</strong> balanced</li>
      </ul>
      
      <div slot="footer" style="display: flex; justify-content: space-between; align-items: center;">
        <forge-badge variant="primary" size="small">AI-Enhanced</forge-badge>
        <small>Click for AI context →</small>
      </div>
    </forge-card>
  \`
}`,...(F=(q=p.parameters)==null?void 0:q.docs)==null?void 0:F.source}}};const H=["Default","Variants","ElevationLevels","WithMedia","PaddingVariants","ClickableCard","ComplexLayout","LoadingState","CardGrid","AIIntegration"];export{p as AIIntegration,c as CardGrid,d as ClickableCard,l as ComplexLayout,a as Default,r as ElevationLevels,s as LoadingState,o as PaddingVariants,i as Variants,n as WithMedia,H as __namedExportsOrder,O as default};
