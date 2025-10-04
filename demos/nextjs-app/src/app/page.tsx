'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  ForgeButton, 
  ForgeCard, 
  ForgeBadge, 
  ForgeIcon,
  ForgeProgress,
  ForgeAlert,
  ForgeNavigationBar,
  ForgeDataTable,
  ForgeTabs,
  ForgeModal,
  ForgeToast,
  ForgeTooltip,
  ForgeDropdown,
  ForgeFormField,
  ForgeMultiSelect,
  ForgeAccordion,
  ForgePagination,
  ForgeTreeView,
  ForgeSkeleton,
  ForgeAspectRatio,
  ForgeSwitch,
  ForgeCheckbox,
  ForgeInput,
  ForgeSelect,
  ForgeDatePicker,
  ForgeProgressCircle,
  ForgeRadioGroup,
  ForgeAvatar
} from '@nexcraft/forge/integrations/react';
// Note: RHF components temporarily disabled due to TypeScript declaration issues
// import { 
//   RHFForgeInput, 
//   RHFForgeSelect, 
//   RHFForgeCheckbox,
//   RHFForgeRadioGroup
// } from '@nexcraft/forge-rhf';

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string[];
  notifications: boolean;
  terms: boolean;
  bio: string;
  birthDate: string;
  experience: string;
  skills: string[];
  newsletter: boolean;
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [toastCount, setToastCount] = useState(0);
  const [activeTab, setActiveTab] = useState('atoms');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showFormSuccess, setShowFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
    defaultValues: {
      notifications: true,
      terms: false,
      newsletter: false,
      skills: [],
      department: []
    }
  });

  const watchedValues = watch();

  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', avatar: 'JS' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Active', avatar: 'BJ' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active', avatar: 'AB' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Pending', avatar: 'CW' },
  ];

  const columns = [
    { key: 'avatar', title: '', render: (value: string, row: any) => <ForgeAvatar initials={row.avatar} size="sm" /> },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
    { 
      key: 'status', 
      title: 'Status',
      render: (value: string) => (
        <ForgeBadge variant={value === 'Active' ? 'success' : value === 'Inactive' ? 'warning' : 'default'}>
          {value}
        </ForgeBadge>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: any, row: any) => (
        <ForgeButton size="sm" variant="ghost" onClick={() => setShowModal(true)}>
          Edit
        </ForgeButton>
      )
    }
  ];

  const skillOptions = [
    { value: 'react', label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' }
  ];

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'product', label: 'Product' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' }
  ];

  const roleOptions = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' },
    { value: 'analyst', label: 'Analyst' },
    { value: 'consultant', label: 'Consultant' }
  ];

  const experienceOptions = [
    { value: 'junior', label: 'Junior (0-2 years)' },
    { value: 'mid', label: 'Mid-level (3-5 years)' },
    { value: 'senior', label: 'Senior (6-10 years)' },
    { value: 'lead', label: 'Lead (10+ years)' }
  ];

  const showToast = () => {
    setToastCount(prev => prev + 1);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowFormSuccess(true);
    setIsSubmitting(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <ForgeNavigationBar
        brand="Forge Showcase"
        items={[
          { id: 'home', label: 'Home', href: '/' },
          { id: 'components', label: 'Components', href: '/components' },
          { id: 'forms', label: 'Forms', href: '/forms-demo' },
          { id: 'performance', label: 'Performance', href: '/performance' }
        ]}
      />

      {/* Theme toggle - standalone since ForgeNavigationBar doesn't support custom actions */}
      <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 1000 }}>
        <ForgeSwitch
          checked={isDarkMode}
          onChange={(checked) => setIsDarkMode(checked)}
          label="Dark Mode"
        />
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            @nexcraft/forge Showcase
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The FIRST AI-Native component library with built-in AI metadata, design token bridge, 
            and real-time performance monitoring. Experience all 27 components in action.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <ForgeBadge variant="success">27 Components</ForgeBadge>
            <ForgeBadge variant="info">AI-Native</ForgeBadge>
            <ForgeBadge variant="warning">Performance Monitored</ForgeBadge>
            <ForgeBadge variant="default">WCAG 2.1 AA</ForgeBadge>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <ForgeCard className="p-6 hover:shadow-lg transition-shadow">
            <ForgeIcon name="components" className="w-8 h-8 mb-4 text-blue-600" />
            <h3 className="text-lg font-semibold mb-2">All Components</h3>
            <p className="text-gray-600 mb-4">Explore all 27 Forge components with interactive examples</p>
            <ForgeButton variant="primary" onClick={() => setActiveTab('components')}>
              View Components
            </ForgeButton>
          </ForgeCard>

          <ForgeCard className="p-6 hover:shadow-lg transition-shadow">
            <ForgeIcon name="form" className="w-8 h-8 mb-4 text-green-600" />
            <h3 className="text-lg font-semibold mb-2">React Hook Form</h3>
            <p className="text-gray-600 mb-4">Complete form integration with validation and type safety</p>
            <ForgeButton variant="secondary" onClick={() => setActiveTab('forms')}>
              Try Forms
            </ForgeButton>
          </ForgeCard>

          <ForgeCard className="p-6 hover:shadow-lg transition-shadow">
            <ForgeIcon name="performance" className="w-8 h-8 mb-4 text-purple-600" />
            <h3 className="text-lg font-semibold mb-2">Performance</h3>
            <p className="text-gray-600 mb-4">Real-time performance monitoring and optimization</p>
            <ForgeButton variant="secondary" onClick={() => setActiveTab('performance')}>
              View Metrics
            </ForgeButton>
          </ForgeCard>

          <ForgeCard className="p-6 hover:shadow-lg transition-shadow">
            <ForgeIcon name="ai" className="w-8 h-8 mb-4 text-orange-600" />
            <h3 className="text-lg font-semibold mb-2">AI Features</h3>
            <p className="text-gray-600 mb-4">Built-in AI metadata and intelligent components</p>
            <ForgeButton variant="ghost" onClick={() => setActiveTab('ai')}>
              Explore AI
            </ForgeButton>
          </ForgeCard>
        </motion.div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <ForgeTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'components', label: 'Components' },
              { id: 'forms', label: 'Forms' },
              { id: 'performance', label: 'Performance' }
            ]}
            className="w-full"
          />

          <div className="mt-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Data Table Demo */}
                <ForgeCard className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Data Table</h3>
                  <ForgeDataTable 
                    data={sampleData}
                    columns={columns}
                    selectable={true}
                    onSelectionChange={setSelectedItems}
                  />
                </ForgeCard>

                {/* Interactive Controls */}
                <ForgeCard className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Interactive Controls</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Progress</label>
                      <ForgeProgress value={75} className="mb-2" />
                      <ForgeProgressCircle value={60} size="lg" className="mx-auto" />
                    </div>
                    
                    <div className="flex gap-4">
                      <ForgeButton variant="primary" onClick={showToast}>
                        Show Toast
                      </ForgeButton>
                      <ForgeButton variant="secondary" onClick={() => setShowModal(true)}>
                        Open Modal
                      </ForgeButton>
                    </div>

                    <div className="flex items-center gap-4">
                      <ForgeSwitch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                      <span>Dark Mode</span>
                    </div>
                  </div>
                </ForgeCard>
              </div>
            )}

            {activeTab === 'components' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Atoms */}
                <ForgeCard className="p-6">
                  <h4 className="font-semibold mb-4">Atoms</h4>
                  <div className="space-y-3">
                    <ForgeButton variant="primary">Primary Button</ForgeButton>
                    <ForgeButton variant="secondary">Secondary Button</ForgeButton>
                    <ForgeInput placeholder="Enter text..." />
                    <ForgeCheckbox label="Checkbox option" />
                    <ForgeBadge variant="success">Success Badge</ForgeBadge>
                    <ForgeSkeleton className="h-4 w-full" />
                  </div>
                </ForgeCard>

                {/* Molecules */}
                <ForgeCard className="p-6">
                  <h4 className="font-semibold mb-4">Molecules</h4>
                  <div className="space-y-3">
                    <ForgeTooltip content="This is a tooltip">
                      <ForgeButton variant="secondary">Hover for tooltip</ForgeButton>
                    </ForgeTooltip>
                    <ForgeFormField label="Form Field">
                      <ForgeInput placeholder="Form input" />
                    </ForgeFormField>
                    <ForgeSelect 
                      options={[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' }
                      ]}
                      placeholder="Select option"
                    />
                    <ForgeAspectRatio ratio="16/9" className="bg-gray-200 rounded">
                      <div className="flex items-center justify-center">16:9</div>
                    </ForgeAspectRatio>
                  </div>
                </ForgeCard>

                {/* Organisms */}
                <ForgeCard className="p-6">
                  <h4 className="font-semibold mb-4">Organisms</h4>
                  <div className="space-y-3">
                    <ForgeAccordion>
                      <ForgeAccordion.Item title="Accordion Item">
                        <p>This is accordion content</p>
                      </ForgeAccordion.Item>
                    </ForgeAccordion>
                    <ForgePagination 
                      currentPage={1}
                      totalPages={10}
                      onPageChange={(page) => console.log('Page:', page)}
                    />
                    <ForgeTreeView 
                      data={[
                        { id: '1', label: 'Node 1', children: [
                          { id: '1-1', label: 'Child 1' }
                        ]}
                      ]}
                    />
                  </div>
                </ForgeCard>
              </div>
            )}

            {activeTab === 'forms' && (
              <ForgeCard className="p-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-6">React Hook Form Integration</h3>
                <form onSubmit={handleSubmit((data) => console.log(data))} className="space-y-6">
                  <ForgeFormField label="Email" error={errors.email?.message}>
                    <ForgeInput
                      type="email"
                      placeholder="Enter email"
                      {...control.register('email', { required: 'Email is required' })}
                    />
                  </ForgeFormField>
                  
                  <ForgeFormField label="Role" error={errors.role?.message}>
                    <ForgeSelect
                      options={[
                        { value: 'admin', label: 'Administrator' },
                        { value: 'user', label: 'User' },
                        { value: 'moderator', label: 'Moderator' }
                      ]}
                      placeholder="Select a role"
                      {...control.register('role', { required: 'Role is required' })}
                    />
                  </ForgeFormField>
                  
                  <ForgeFormField error={errors.terms?.message}>
                    <ForgeCheckbox
                      label="Accept terms and conditions"
                      {...control.register('terms', { required: 'You must accept the terms' })}
                    />
                  </ForgeFormField>
                  
                  <ForgeSwitch
                    label="Enable notifications"
                  />
                  
                  <ForgeButton type="submit" variant="primary" className="w-full">
                    Submit Form
                  </ForgeButton>
                </form>
              </ForgeCard>
            )}

            {activeTab === 'performance' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ForgeCard className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Bundle Size</label>
                      <ForgeProgress value={85} />
                      <p className="text-sm text-gray-600 mt-1">72.64 KB gzipped</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Test Coverage</label>
                      <ForgeProgress value={87} />
                      <p className="text-sm text-gray-600 mt-1">87.2% coverage</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Render Time</label>
                      <ForgeProgress value={95} />
                      <p className="text-sm text-gray-600 mt-1">&lt;1ms average</p>
                    </div>
                  </div>
                </ForgeCard>

                <ForgeCard className="p-6">
                  <h3 className="text-xl font-semibold mb-4">AI Features</h3>
                  <div className="space-y-4">
                    <ForgeAlert severity="info">
                      All components include built-in AI metadata for intelligent assistance
                    </ForgeAlert>
                    <ForgeAlert severity="success">
                      Performance monitoring with real-time optimization
                    </ForgeAlert>
                    <ForgeAlert severity="warning">
                      Design token bridge supports any design system
                    </ForgeAlert>
                  </div>
                </ForgeCard>
              </div>
            )}
          </div>
        </motion.div>

        {/* Modal Demo */}
        <ForgeModal open={showModal} onOpenChange={setShowModal}>
          <ForgeModal.Content className="max-w-md">
            <ForgeModal.Header>
              <ForgeModal.Title>Edit User</ForgeModal.Title>
              <ForgeModal.Description>
                Update user information in the system
              </ForgeModal.Description>
            </ForgeModal.Header>
            <div className="p-6 space-y-4">
              <ForgeInput placeholder="User name" />
              <ForgeInput placeholder="Email address" type="email" />
              <ForgeSelect 
                options={[
                  { value: 'admin', label: 'Administrator' },
                  { value: 'user', label: 'User' }
                ]}
                placeholder="Select role"
              />
            </div>
            <ForgeModal.Footer>
              <ForgeButton variant="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </ForgeButton>
              <ForgeButton variant="primary" onClick={() => setShowModal(false)}>
                Save Changes
              </ForgeButton>
            </ForgeModal.Footer>
          </ForgeModal.Content>
        </ForgeModal>

        {/* Toast Container */}
        <ForgeToast>
          {toastCount > 0 && (
            <ForgeToast.Item
              key={toastCount}
              title="Success!"
              description="Toast notification triggered successfully"
              severity="success"
              duration={3000}
            />
          )}
        </ForgeToast>
      </main>
    </div>
  );
}
