import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-mono">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">@nexcraft/forge + Next.js</h1>
          <p className="text-xl text-gray-600 mb-8">
            Example applications demonstrating Forge component integration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* SSR Example */}
          <Link 
            href="/ssr-demo" 
            className="group block p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
              SSR Demo →
            </h2>
            <p className="text-gray-600">
              Server-side rendering with Forge components. Shows semantic HTML fallbacks 
              that progressively enhance to web components.
            </p>
            <div className="mt-3 text-sm text-gray-500">
              ✅ Universal components • ✅ No hydration mismatches
            </div>
          </Link>

          {/* React Hook Form Example */}
          <Link 
            href="/forms-demo" 
            className="group block p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
              React Hook Form →
            </h2>
            <p className="text-gray-600">
              Complete form integration with validation, error handling, and 
              seamless {'{...register()}'} spread syntax.
            </p>
            <div className="mt-3 text-sm text-gray-500">
              ✅ Type-safe • ✅ {'{...register()}'} support • ✅ useForgeReactHookForm hook
            </div>
          </Link>

          {/* Component Showcase */}
          <Link 
            href="/components" 
            className="group block p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
              Component Showcase →
            </h2>
            <p className="text-gray-600">
              Interactive demonstration of all Forge components with proper 
              React integration and event handling.
            </p>
            <div className="mt-3 text-sm text-gray-500">
              ✅ All components • ✅ Event handling • ✅ Theme support
            </div>
          </Link>

          {/* Performance Test */}
          <Link 
            href="/performance" 
            className="group block p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
              Performance Test →
            </h2>
            <p className="text-gray-600">
              Large-scale component rendering and interaction tests to verify 
              performance characteristics and memory usage.
            </p>
            <div className="mt-3 text-sm text-gray-500">
              ✅ Stress testing • ✅ Memory profiling • ✅ Bundle analysis
            </div>
          </Link>
        </div>

        <div className="mt-12 p-4 bg-gray-50 rounded-lg max-w-4xl w-full">
          <h3 className="font-semibold mb-2">🎯 Testing Objectives</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>• Verify SSR compatibility and progressive enhancement</li>
            <li>• Validate React Hook Form integration without type errors</li>
            <li>• Test all Forge components in realistic scenarios</li>
            <li>• Ensure proper event handling and state management</li>
            <li>• Demonstrate best practices for Forge usage</li>
          </ul>
        </div>
      </main>
    </div>
  );
}