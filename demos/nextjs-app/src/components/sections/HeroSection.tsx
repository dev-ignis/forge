'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-neutral-700 font-medium">AI-Native Components</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            Build production apps<br />
            <span className="text-neutral-600">in minutes, not days</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Production-ready web components with built-in AI metadata, performance monitoring,
            and seamless framework integration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link
              href="/components"
              className="px-6 py-3 bg-neutral-900 text-white font-medium rounded-md hover:bg-neutral-800 transition-colors"
            >
              Explore Components
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-md hover:bg-neutral-50 transition-colors"
            >
              View Dashboard
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-neutral-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-neutral-900 mb-2">31+</div>
              <div className="text-sm text-neutral-600">Components</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-neutral-900 mb-2">4</div>
              <div className="text-sm text-neutral-600">Frameworks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-neutral-900 mb-2">50KB</div>
              <div className="text-sm text-neutral-600">Bundle Size</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-neutral-900 mb-2">100%</div>
              <div className="text-sm text-neutral-600">TypeScript</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
