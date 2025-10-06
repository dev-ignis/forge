'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ForgeCard, ForgeIcon, ForgeButton } from '@nexcraft/forge/integrations/react';

const features = [
  {
    id: 1,
    icon: 'components',
    title: 'All Components',
    description: 'Explore all 31 Forge components with interactive examples',
    color: 'blue',
    href: '/components',
  },
  {
    id: 2,
    icon: 'dashboard',
    title: 'Dashboard Example',
    description: 'Real-world admin dashboard with stats, charts, and data tables',
    color: 'green',
    href: '/dashboard',
  },
  {
    id: 3,
    icon: 'shopping-cart',
    title: 'E-Commerce Demo',
    description: 'Complete shopping experience with products, cart, and checkout',
    color: 'purple',
    href: '/ecommerce',
  },
  {
    id: 4,
    icon: 'users',
    title: 'Social Feed',
    description: 'Interactive social platform with posts, comments, and reactions',
    color: 'pink',
    href: '/social',
  },
  {
    id: 5,
    icon: 'trello',
    title: 'Kanban Board',
    description: 'Drag-and-drop task management with real-time updates',
    color: 'indigo',
    href: '/kanban',
  },
  {
    id: 6,
    icon: 'settings',
    title: 'Settings Page',
    description: 'Comprehensive settings interface showcasing all form components',
    color: 'gray',
    href: '/settings',
  },
  {
    id: 7,
    icon: 'palette',
    title: 'Theme Customizer',
    description: 'Live theme preview with design token customization',
    color: 'orange',
    href: '/themes',
  },
  {
    id: 8,
    icon: 'sparkles',
    title: 'AI Features',
    description: 'Built-in AI metadata and intelligent component introspection',
    color: 'yellow',
    href: '/ai-demo',
  },
];

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Live Examples
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive into production-ready applications showcasing real-world usage patterns
            and best practices
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.id} variants={itemVariants}>
              <Link href={feature.href}>
                <ForgeCard className="p-6 h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-blue-200">
                  <div className={`w-12 h-12 mb-4 rounded-lg bg-${feature.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <ForgeIcon
                      name={feature.icon}
                      className={`w-6 h-6 text-${feature.color}-600`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4">
                    <ForgeButton variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                      Explore →
                    </ForgeButton>
                  </div>
                </ForgeCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
