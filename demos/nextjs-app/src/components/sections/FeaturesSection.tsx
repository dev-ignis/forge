'use client';

import Link from 'next/link';

const features = [
  {
    id: 1,
    title: 'All Components',
    description: 'Explore all 31 Forge components with interactive examples',
    href: '/components',
  },
  {
    id: 2,
    title: 'Dashboard Example',
    description: 'Real-world admin dashboard with stats, charts, and data tables',
    href: '/dashboard',
  },
  {
    id: 3,
    title: 'E-Commerce Demo',
    description: 'Complete shopping experience with products, cart, and checkout',
    href: '/ecommerce',
  },
  {
    id: 4,
    title: 'Social Feed',
    description: 'Interactive social platform with posts, comments, and reactions',
    href: '/social',
  },
  {
    id: 5,
    title: 'Kanban Board',
    description: 'Drag-and-drop task management with real-time updates',
    href: '/kanban',
  },
  {
    id: 6,
    title: 'Settings Page',
    description: 'Comprehensive settings interface showcasing all form components',
    href: '/settings',
  },
  {
    id: 7,
    title: 'Theme Customizer',
    description: 'Live theme preview with design token customization',
    href: '/themes',
  },
  {
    id: 8,
    title: 'AI Features',
    description: 'Built-in AI metadata and intelligent component introspection',
    href: '/ai-demo',
  },
];

export function FeaturesSection() {
  return (
    <section className="border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Explore Live Examples
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Production-ready applications showcasing real-world usage patterns
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200">
          {features.map((feature) => (
            <Link
              key={feature.id}
              href={feature.href}
              className="bg-white p-8 hover:bg-neutral-50 transition-colors group"
            >
              <h3 className="text-lg font-semibold mb-2 text-neutral-900">
                {feature.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                {feature.description}
              </p>
              <span className="text-sm text-neutral-900 group-hover:underline">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
