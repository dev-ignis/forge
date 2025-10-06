'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ForgeCard,
  ForgeButton,
  ForgeInput,
  ForgeSelect,
  ForgeSwitch,
  ForgeBadge,
  ForgeAlert,
  ForgeProgress,
  ForgeAvatar,
} from '@nexcraft/forge/integrations/react';

export default function ThemesPage() {
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#8b5cf6');
  const [radius, setRadius] = useState('8');
  const [fontSize, setFontSize] = useState('16');
  const [darkMode, setDarkMode] = useState(false);

  const presetThemes = [
    { name: 'Default', primary: '#3b82f6', secondary: '#8b5cf6' },
    { name: 'Forest', primary: '#10b981', secondary: '#059669' },
    { name: 'Sunset', primary: '#f59e0b', secondary: '#ef4444' },
    { name: 'Ocean', primary: '#06b6d4', secondary: '#0284c7' },
    { name: 'Purple', primary: '#a855f7', secondary: '#9333ea' },
  ];

  const applyPreset = (preset: typeof presetThemes[0]) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Theme Customizer
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Customize your design system in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <ForgeCard className="p-6">
              <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>

              {/* Dark Mode Toggle */}
              <div className="mb-6">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dark Mode</span>
                  <ForgeSwitch
                    checked={darkMode}
                    onChange={(checked) => setDarkMode(checked)}
                  />
                </label>
              </div>

              {/* Color Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <ForgeInput
                      value={primaryColor}
                      onChange={(value) => setPrimaryColor(value as string)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Secondary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <ForgeInput
                      value={secondaryColor}
                      onChange={(value) => setSecondaryColor(value as string)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Border Radius (px)</label>
                  <ForgeInput
                    type="number"
                    value={radius}
                    onChange={(value) => setRadius(value as string)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Base Font Size (px)</label>
                  <ForgeInput
                    type="number"
                    value={fontSize}
                    onChange={(value) => setFontSize(value as string)}
                  />
                </div>
              </div>
            </ForgeCard>

            {/* Preset Themes */}
            <ForgeCard className="p-6">
              <h2 className="text-lg font-semibold mb-4">Preset Themes</h2>
              <div className="space-y-2">
                {presetThemes.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium">{preset.name}</span>
                    <div className="flex gap-1">
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: preset.secondary }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </ForgeCard>

            {/* Export */}
            <ForgeCard className="p-6">
              <h2 className="text-lg font-semibold mb-4">Export Theme</h2>
              <ForgeButton variant="primary" className="w-full">
                Copy CSS Variables
              </ForgeButton>
            </ForgeCard>
          </div>

          {/* Preview */}
          <div
            className="lg:col-span-2"
            style={{
              fontSize: `${fontSize}px`,
              '--primary-color': primaryColor,
              '--secondary-color': secondaryColor,
              '--border-radius': `${radius}px`,
            } as any}
          >
            <ForgeCard className="p-6">
              <h2 className="text-xl font-semibold mb-6">Live Preview</h2>

              <div className="space-y-6">
                {/* Buttons */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Buttons</h3>
                  <div className="flex flex-wrap gap-2">
                    <ForgeButton
                      variant="primary"
                      style={{ backgroundColor: primaryColor } as any}
                    >
                      Primary
                    </ForgeButton>
                    <ForgeButton
                      variant="secondary"
                      style={{ backgroundColor: secondaryColor } as any}
                    >
                      Secondary
                    </ForgeButton>
                    <ForgeButton variant="ghost">Ghost</ForgeButton>
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    <ForgeBadge variant="success">Success</ForgeBadge>
                    <ForgeBadge variant="error">Error</ForgeBadge>
                    <ForgeBadge variant="warning">Warning</ForgeBadge>
                    <ForgeBadge variant="info">Info</ForgeBadge>
                  </div>
                </div>

                {/* Alerts */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Alerts</h3>
                  <div className="space-y-2">
                    <ForgeAlert severity="info">
                      This is an informational alert with your custom theme
                    </ForgeAlert>
                    <ForgeAlert severity="success">
                      Success! Your theme looks great
                    </ForgeAlert>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Progress</h3>
                  <ForgeProgress value={75} />
                </div>

                {/* Form Elements */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Form Elements</h3>
                  <div className="space-y-3">
                    <ForgeInput placeholder="Enter text..." />
                    <ForgeSelect>
                      <option>Select an option</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </ForgeSelect>
                  </div>
                </div>

                {/* Cards */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Cards</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <ForgeCard className="p-4">
                      <ForgeAvatar initials="JD" size="md" className="mb-2" />
                      <h4 className="font-semibold">John Doe</h4>
                      <p className="text-sm text-gray-600">Designer</p>
                    </ForgeCard>
                    <ForgeCard className="p-4">
                      <ForgeAvatar initials="JS" size="md" className="mb-2" />
                      <h4 className="font-semibold">Jane Smith</h4>
                      <p className="text-sm text-gray-600">Developer</p>
                    </ForgeCard>
                  </div>
                </div>
              </div>
            </ForgeCard>
          </div>
        </div>
      </div>
    </div>
  );
}
