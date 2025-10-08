'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { label: 'Components', href: '/components' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Themes', href: '/themes' },
      { label: 'AI Features', href: '/ai-demo' },
    ],
    examples: [
      { label: 'E-Commerce', href: '/ecommerce' },
      { label: 'Social Feed', href: '/social' },
      { label: 'Kanban Board', href: '/kanban' },
      { label: 'Settings', href: '/settings' },
    ],
    resources: [
      { label: 'Documentation', href: 'https://github.com/dev-ignis/forge' },
      { label: 'GitHub', href: 'https://github.com/dev-ignis/forge' },
      { label: 'npm Package', href: 'https://www.npmjs.com/package/@nexcraft/forge' },
      { label: 'Issues', href: 'https://github.com/dev-ignis/forge/issues' },
    ],
  };

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-neutral-900 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-lg font-semibold text-neutral-900">Forge</span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Production-ready web components with built-in AI metadata.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Product</h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Examples Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Examples</h3>
            <ul className="space-y-2">
              {links.examples.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-600">
            © {currentYear} Ignis Team. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/dev-ignis/forge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@nexcraft/forge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              npm
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
