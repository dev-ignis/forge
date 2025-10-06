'use client';

import { motion } from 'framer-motion';
import { ForgeCard, ForgeBadge, ForgeButton } from '@nexcraft/forge/integrations/react';

export function QuickStartSection() {
  const steps = [
    {
      id: 1,
      title: 'Install',
      code: 'npm install @nexcraft/forge',
      description: 'Add Forge to your project with a single command',
    },
    {
      id: 2,
      title: 'Import',
      code: "import '@nexcraft/forge'",
      description: 'Import the components you need',
    },
    {
      id: 3,
      title: 'Use',
      code: '<forge-button>Click me</forge-button>',
      description: 'Start building beautiful UIs immediately',
    },
  ];

  const frameworks = [
    { name: 'React', icon: '⚛️', color: 'blue' },
    { name: 'Vue', icon: '💚', color: 'green' },
    { name: 'Angular', icon: '🅰️', color: 'red' },
    { name: 'Vanilla', icon: '⚡', color: 'yellow' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get Started in Seconds
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Zero configuration required. Works with any framework or vanilla JavaScript.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ForgeCard className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {step.id}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 mb-3">
                  <code className="text-green-400 text-sm font-mono">{step.code}</code>
                </div>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </ForgeCard>
            </motion.div>
          ))}
        </div>

        {/* Framework Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-gray-600 mb-6">WORKS WITH YOUR FAVORITE FRAMEWORK</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {frameworks.map((framework) => (
              <ForgeBadge key={framework.name} variant="default" size="lg">
                <span className="mr-2">{framework.icon}</span>
                {framework.name}
              </ForgeBadge>
            ))}
          </div>
          <div className="mt-8">
            <a
              href="https://github.com/dev-ignis/forge"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ForgeButton variant="primary" size="lg">
                View Documentation →
              </ForgeButton>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
