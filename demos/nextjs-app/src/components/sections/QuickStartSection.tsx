'use client';

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
    { name: 'React', icon: '⚛️' },
    { name: 'Vue', icon: '💚' },
    { name: 'Angular', icon: '🅰️' },
    { name: 'Vanilla', icon: '⚡' },
  ];

  return (
    <section className="border-b border-neutral-200 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Get Started in Seconds
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Zero configuration required. Works with any framework or vanilla JavaScript.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step) => (
            <div key={step.id} className="bg-white border border-neutral-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                  {step.id}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
              </div>
              <div className="bg-neutral-900 rounded p-4 mb-3">
                <code className="text-green-400 text-sm font-mono">{step.code}</code>
              </div>
              <p className="text-neutral-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Framework Support */}
        <div className="text-center">
          <p className="text-sm font-medium text-neutral-600 mb-6 tracking-wider">WORKS WITH YOUR FAVORITE FRAMEWORK</p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {frameworks.map((framework) => (
              <div
                key={framework.name}
                className="px-4 py-2 bg-white border border-neutral-200 rounded-md text-sm font-medium"
              >
                <span className="mr-2">{framework.icon}</span>
                {framework.name}
              </div>
            ))}
          </div>
          <a
            href="https://github.com/dev-ignis/forge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-neutral-900 text-white font-medium rounded-md hover:bg-neutral-800 transition-colors"
          >
            View Documentation →
          </a>
        </div>
      </div>
    </section>
  );
}
