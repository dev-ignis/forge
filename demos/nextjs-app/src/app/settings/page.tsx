'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ForgeCard,
  ForgeButton,
  ForgeInput,
  ForgeSelect,
  ForgeSwitch,
  ForgeCheckbox,
  ForgeRadioGroup,
  ForgeDatePicker,
  ForgeAvatar,
  ForgeBadge,
  ForgeAlert,
} from '@nexcraft/forge-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      notifications: true,
      darkMode: false,
      language: 'en',
      timezone: 'UTC',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Settings saved:', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences</p>
        </div>

        {saved && (
          <ForgeAlert severity="success" className="mb-6">
            Settings saved successfully!
          </ForgeAlert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Section */}
          <ForgeCard className="p-6">
            <h2 className="text-xl font-semibold mb-6">Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-6 mb-6">
                <ForgeAvatar initials="JD" size="lg" />
                <div>
                  <ForgeButton variant="secondary" size="sm">Change Avatar</ForgeButton>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <ForgeInput {...register('firstName')} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <ForgeInput {...register('lastName')} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <ForgeInput {...register('email')} type="email" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </ForgeCard>

          {/* Preferences Section */}
          <ForgeCard className="p-6">
            <h2 className="text-xl font-semibold mb-6">Preferences</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <ForgeSelect {...register('language')}>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </ForgeSelect>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <ForgeSelect {...register('timezone')}>
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="CET">Central European Time</option>
                </ForgeSelect>
              </div>

              <div>
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dark Mode</span>
                  <ForgeSwitch {...register('darkMode')} />
                </label>
              </div>

              <div>
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email Notifications</span>
                  <ForgeSwitch {...register('notifications')} />
                </label>
              </div>
            </div>
          </ForgeCard>

          {/* Notifications Section */}
          <ForgeCard className="p-6">
            <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              <ForgeCheckbox label="New messages" checked />
              <ForgeCheckbox label="Project updates" checked />
              <ForgeCheckbox label="Task assignments" checked />
              <ForgeCheckbox label="Weekly digest" />
              <ForgeCheckbox label="Product announcements" />
            </div>
          </ForgeCard>

          {/* Privacy Section */}
          <ForgeCard className="p-6">
            <h2 className="text-xl font-semibold mb-6">Privacy</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3">Who can see your profile?</label>
                <ForgeRadioGroup
                  name="privacy"
                  options={[
                    { value: 'public', label: 'Everyone' },
                    { value: 'team', label: 'Team members only' },
                    { value: 'private', label: 'Only me' },
                  ]}
                />
              </div>
            </div>
          </ForgeCard>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <ForgeButton variant="ghost">Cancel</ForgeButton>
            <ForgeButton variant="primary" type="submit">Save Changes</ForgeButton>
          </div>
        </form>
      </div>
    </div>
  );
}
