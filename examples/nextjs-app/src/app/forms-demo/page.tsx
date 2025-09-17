'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  ForgeButton, 
  ForgeCard, 
  ForgeInput,
  ForgeSelect,
  ForgeCheckbox,
  ForgeSwitch,
  ForgeDatePicker,
  ForgeMultiSelect,
  ForgeFormField,
  ForgeAlert,
  ForgeBadge,
  ForgeProgress,
  ForgeModal,
  ForgeToast,
  ForgeTabs,
  ForgeAccordion,
  ForgeRadioGroup
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

export default function FormsDemo() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFormData(data);
    setShowSuccess(true);
    setIsSubmitting(false);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            React Hook Form Integration
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Complete form integration with validation, error handling, and seamless 
            {'{...register()}'} spread syntax using @nexcraft/forge-rhf
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <ForgeBadge variant="success">Type-safe</ForgeBadge>
            <ForgeBadge variant="info">Validation</ForgeBadge>
            <ForgeBadge variant="warning">Error Handling</ForgeBadge>
            <ForgeBadge variant="default">React Hook Form</ForgeBadge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ForgeCard className="p-8">
              <ForgeTabs value={activeTab} onValueChange={setActiveTab}>
                <ForgeTabs.List className="grid w-full grid-cols-3 mb-8">
                  <ForgeTabs.Trigger value="basic">Basic Info</ForgeTabs.Trigger>
                  <ForgeTabs.Trigger value="professional">Professional</ForgeTabs.Trigger>
                  <ForgeTabs.Trigger value="preferences">Preferences</ForgeTabs.Trigger>
                </ForgeTabs.List>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <ForgeTabs.Content value="basic">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ForgeFormField label="First Name" error={errors.firstName?.message}>
                          <ForgeInput
                            placeholder="Enter first name"
                            {...control.register('firstName', { required: 'First name is required' })}
                          />
                        </ForgeFormField>
                        
                        <ForgeFormField label="Last Name" error={errors.lastName?.message}>
                          <ForgeInput
                            placeholder="Enter last name"
                            {...control.register('lastName', { required: 'Last name is required' })}
                          />
                        </ForgeFormField>
                      </div>

                      <ForgeFormField label="Email Address" error={errors.email?.message}>
                        <ForgeInput
                          type="email"
                          placeholder="Enter email address"
                          {...control.register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                        />
                      </ForgeFormField>

                      <ForgeFormField label="Password" error={errors.password?.message}>
                        <ForgeInput
                          type="password"
                          placeholder="Enter password"
                          {...control.register('password', { 
                            required: 'Password is required',
                            minLength: {
                              value: 8,
                              message: 'Password must be at least 8 characters'
                            }
                          })}
                        />
                      </ForgeFormField>

                      <ForgeDatePicker
                        placeholder="Select birth date"
                        label="Birth Date"
                      />

                      <ForgeInput
                        placeholder="Tell us about yourself..."
                        multiline
                        rows={4}
                      />
                    </div>
                  </ForgeTabs.Content>

                  <ForgeTabs.Content value="professional">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4">Professional Information</h3>
                      
                      <ForgeFormField label="Role" error={errors.role?.message}>
                        <ForgeSelect
                          options={roleOptions}
                          placeholder="Select a role"
                          {...control.register('role', { required: 'Role is required' })}
                        />
                      </ForgeFormField>

                      <ForgeMultiSelect
                        options={departmentOptions}
                        placeholder="Select departments..."
                      />

                      <ForgeFormField label="Experience Level" error={errors.experience?.message}>
                        <ForgeRadioGroup
                          options={experienceOptions}
                          {...control.register('experience', { required: 'Experience level is required' })}
                        />
                      </ForgeFormField>

                      <ForgeMultiSelect
                        options={skillOptions}
                        placeholder="Select your skills..."
                      />
                    </div>
                  </ForgeTabs.Content>

                  <ForgeTabs.Content value="preferences">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4">Preferences</h3>
                      
                      <ForgeSwitch
                        label="Email Notifications"
                        description="Receive updates about your account and new features"
                      />

                      <ForgeSwitch
                        label="Newsletter Subscription"
                        description="Get weekly updates about industry trends and best practices"
                      />

                      <ForgeFormField error={errors.terms?.message}>
                        <ForgeCheckbox
                          label="I agree to the Terms of Service and Privacy Policy"
                          {...control.register('terms', { required: 'You must accept the terms' })}
                        />
                      </ForgeFormField>
                    </div>
                  </ForgeTabs.Content>

                  <div className="pt-6 border-t">
                    <div className="flex gap-4">
                      <ForgeButton 
                        type="button" 
                        variant="ghost" 
                        onClick={() => reset()}
                        disabled={isSubmitting}
                      >
                        Reset Form
                      </ForgeButton>
                      <ForgeButton 
                        type="submit" 
                        variant="primary" 
                        loading={isSubmitting}
                        className="flex-1"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </ForgeButton>
                    </div>
                  </div>
                </form>
              </ForgeTabs>
            </ForgeCard>
          </motion.div>

          {/* Live Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Form Progress */}
            <ForgeCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Form Progress</h3>
              <ForgeProgress 
                value={Object.keys(watchedValues).filter(key => 
                  watchedValues[key as keyof FormData] && 
                  watchedValues[key as keyof FormData] !== '' &&
                  watchedValues[key as keyof FormData] !== false
                ).length * 6.25} 
                className="mb-2"
              />
              <p className="text-sm text-gray-600">
                {Object.keys(watchedValues).filter(key => 
                  watchedValues[key as keyof FormData] && 
                  watchedValues[key as keyof FormData] !== '' &&
                  watchedValues[key as keyof FormData] !== false
                ).length} of 16 fields completed
              </p>
            </ForgeCard>

            {/* Live Values */}
            <ForgeCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Live Form Values</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-mono">{watchedValues.email || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Role:</span>
                  <span className="font-mono">{watchedValues.role || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Skills:</span>
                  <span className="font-mono">
                    {watchedValues.skills?.length || 0} selected
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Notifications:</span>
                  <ForgeBadge variant={watchedValues.notifications ? 'success' : 'default'}>
                    {watchedValues.notifications ? 'Enabled' : 'Disabled'}
                  </ForgeBadge>
                </div>
              </div>
            </ForgeCard>

            {/* Form Features */}
            <ForgeAccordion>
              <ForgeAccordion.Item title="Form Features">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <ForgeBadge variant="success">✓</ForgeBadge>
                    <span>Type-safe form handling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ForgeBadge variant="success">✓</ForgeBadge>
                    <span>Real-time validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ForgeBadge variant="success">✓</ForgeBadge>
                    <span>Error handling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ForgeBadge variant="success">✓</ForgeBadge>
                    <span>Multi-step forms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ForgeBadge variant="success">✓</ForgeBadge>
                    <span>Live preview</span>
                  </div>
                </div>
              </ForgeAccordion.Item>
            </ForgeAccordion>
          </motion.div>
        </div>

        {/* Success Modal */}
        <ForgeModal open={showSuccess} onOpenChange={setShowSuccess}>
          <ForgeModal.Content className="max-w-md">
            <ForgeModal.Header>
              <ForgeModal.Title>Application Submitted!</ForgeModal.Title>
              <ForgeModal.Description>
                Your application has been successfully submitted.
              </ForgeModal.Description>
            </ForgeModal.Header>
            <div className="p-6">
              <ForgeAlert severity="success" className="mb-4">
                Thank you for your application! We'll review it and get back to you soon.
              </ForgeAlert>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span>{formData?.firstName} {formData?.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{formData?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Role:</span>
                  <span>{formData?.role}</span>
                </div>
              </div>
            </div>
            <ForgeModal.Footer>
              <ForgeButton variant="primary" onClick={() => setShowSuccess(false)}>
                Close
              </ForgeButton>
            </ForgeModal.Footer>
          </ForgeModal.Content>
        </ForgeModal>

        {/* Toast Container */}
        <ForgeToast>
          {showSuccess && (
            <ForgeToast.Item
              title="Success!"
              description="Form submitted successfully"
              severity="success"
              duration={5000}
            />
          )}
        </ForgeToast>
      </div>
    </div>
  );
}
