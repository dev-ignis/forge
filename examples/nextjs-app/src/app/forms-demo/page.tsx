'use client';

import React from 'react';
// Ensure web components are defined on the client
import '@nexcraft/forge';
import { ForgeCheckbox, ForgeInput, ForgeButton, ForgeCard } from '@nexcraft/forge/integrations/react';

export default function FormsDemo() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    newsletter: false,
    terms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(`Form submitted!\n${JSON.stringify(formData, null, 2)}`);
  };

  const handleInputChange = (field: string) => (e: any) => {
    const value = e.target?.value || '';
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string) => (e: any) => {
    const checked = !!e?.target?.checked;
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Forge Form Demo</h1>

        <ForgeCard>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <ForgeInput
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder="Enter your name"
                  className="w-full"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <ForgeInput
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="Enter your email"
                  className="w-full"
                />
              </div>

              {/* Newsletter Checkbox */}
              <div className="flex items-center gap-3">
                <ForgeCheckbox
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleCheckboxChange('newsletter')}
                />
                <label htmlFor="newsletter" className="text-sm font-medium">
                  Subscribe to newsletter
                </label>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-3">
                <ForgeCheckbox
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleCheckboxChange('terms')}
                />
                <label htmlFor="terms" className="text-sm font-medium">
                  I agree to the terms and conditions *
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <ForgeButton
                  type="submit"
                  variant="primary"
                  disabled={!formData.terms}
                  className="w-full"
                >
                  Submit Form
                </ForgeButton>
              </div>
            </form>

            {/* Form State Display */}
            <div className="mt-6 p-4 bg-gray-50 rounded">
              <h3 className="text-sm font-medium mb-2">Current Form State:</h3>
              <pre className="text-xs text-gray-700">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          </div>
        </ForgeCard>
      </main>
    </div>
  );
}
