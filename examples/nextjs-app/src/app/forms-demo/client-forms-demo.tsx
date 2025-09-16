'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { ForgeButton, ForgeInput, ForgeCard, ForgeAlert, ForgeCheckbox } from '@nexcraft/forge/integrations/react';
import { RHFForgeInput, RHFForgeCheckbox } from '@nexcraft/forge/integrations/rhf';
import { safeStringify } from '../../lib/safe-json';

interface FormData {
  name: string;
  email: string;
  message: string;
  newsletter: boolean;
  marketing: boolean;
}

export default function ClientFormsDemo() {
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      newsletter: false,
      marketing: false
    }
  });

  const [submitResult, setSubmitResult] = React.useState<string | null>(null);

  // Test different integration approaches
  const nameRegister = register('name', { 
    required: 'Name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' }
  });
  
  const emailRegister = register('email', { 
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  });

  const newsletterRegister = register('newsletter');

  // Optional: Debug RHF register output (enable with NEXT_PUBLIC_DEBUG_RHF=true)
  React.useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_DEBUG_RHF === 'true') {
      // eslint-disable-next-line no-console
      console.warn('Debug nameRegister:', nameRegister);
      // eslint-disable-next-line no-console
      console.warn('Debug nameRegister.onChange:', nameRegister.onChange);
      // eslint-disable-next-line no-console
      console.warn('Debug nameRegister.onChange.length:', nameRegister.onChange?.length);
      // eslint-disable-next-line no-console
      console.warn('Debug nameRegister.onChange.toString():', nameRegister.onChange?.toString());
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitResult('success');
      console.warn('Form submitted successfully:', data);
      console.warn('Email register object:', emailRegister);
      console.warn('Email register onChange length:', emailRegister.onChange?.length);
    } catch (error) {
      setSubmitResult('error');
      console.error('Form submission failed:', error);
    }
  };

  const watchedValues = watch();

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">React Hook Form Integration</h1>
          <p className="text-lg text-gray-700 mb-6">
            Demonstrates seamless integration between Forge components and React Hook Form
            with full TypeScript support and validation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Form */}
          <ForgeCard>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Test 1: Direct register() spread */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <ForgeInput
                    {...nameRegister}
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Test 2: Another direct register() spread with different validation */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <ForgeInput
                    {...emailRegister}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Test 3: RHF adapter component */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <RHFForgeInput
                    name="message"
                    control={control}
                    placeholder="Tell us about your project..."
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Using RHFForgeInput adapter component
                  </p>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Test 4: Direct checkbox register() spread */}
                <div className="flex items-center gap-2">
                  <ForgeCheckbox
                    {...newsletterRegister}
                    id="newsletter"
                  />
                  <label htmlFor="newsletter" className="text-sm font-medium">
                    Subscribe to newsletter
                  </label>
                </div>
                <p className="text-xs text-gray-500 -mt-2">
                  Using direct register() spread with ForgeCheckbox
                </p>

                {/* Test 5: RHF Checkbox adapter component */}
                <div className="flex items-center gap-2">
                  <RHFForgeCheckbox
                    name="marketing"
                    control={control}
                    id="marketing-adapter"
                  />
                  <label htmlFor="marketing-adapter" className="text-sm font-medium">
                    Marketing emails (using RHF adapter)
                  </label>
                </div>
                <p className="text-xs text-gray-500 -mt-2">
                  Using RHFForgeCheckbox adapter component
                </p>

                <div className="flex gap-3">
                  <ForgeButton 
                    type="submit" 
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                  </ForgeButton>
                  
                  <ForgeButton 
                    type="button" 
                    variant="secondary"
                    onClick={() => {
                      reset();
                      setSubmitResult(null);
                    }}
                  >
                    Reset
                  </ForgeButton>
                </div>
              </form>

              {/* Success/Error Messages */}
              {submitResult === 'success' && (
                <ForgeAlert severity="success" className="mt-4">
                  Form submitted successfully! Check console for details.
                </ForgeAlert>
              )}
              
              {submitResult === 'error' && (
                <ForgeAlert severity="error" className="mt-4">
                  Form submission failed. Please try again.
                </ForgeAlert>
              )}
            </div>
          </ForgeCard>

          {/* Integration Status & Live Values */}
          <div className="space-y-6">
            {/* Integration Status */}
            <ForgeCard>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Integration Status</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span>TypeScript compatibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span>{'{...register()}'} spread syntax</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span>RHF adapter components</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span>Form validation & errors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span>Both onChange signatures</span>
                  </div>
                </div>
              </div>
            </ForgeCard>

            {/* Live Form Values */}
            <ForgeCard>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Live Form State</h3>
                <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                  <pre>{safeStringify(watchedValues, 2)}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Updates in real-time as you type
                </p>
              </div>
            </ForgeCard>

            {/* Technical Details */}
            <ForgeCard>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Implementation Notes</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Dual onChange Support:</strong> Components detect function signature and call appropriately</p>
                  <p><strong>Type Safety:</strong> Union types support both Forge and React Hook Form patterns</p>
                  <p><strong>Error Handling:</strong> Full integration with React Hook Form's validation system</p>
                  <p><strong>Performance:</strong> No additional renders or event handler overhead</p>
                </div>
              </div>
            </ForgeCard>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Examples
          </a>
        </div>
      </main>
    </div>
  );
}
