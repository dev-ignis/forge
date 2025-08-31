import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  // Test files pattern
  files: 'src/**/*.test.ts',
  
  // Node module resolution
  nodeResolve: true,
  
  // Concurrency - reduced to avoid resource contention
  concurrency: 3,
  concurrentBrowsers: 3,
  
  // TypeScript and ES modules support
  plugins: [
    esbuildPlugin({ 
      ts: true, 
      tsconfig: './tsconfig.json',
      target: 'es2020'
    })
  ],
  
  // Browser configuration - start with just Chrome for simplicity
  browsers: [
    playwrightLauncher({ 
      product: 'chromium',
      launchOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
      }
    })
  ],
  
  // Test framework configuration
  testFramework: {
    config: {
      timeout: '10000',
      retries: 0
    }
  },
  
  // Coverage configuration
  coverage: true,
  coverageConfig: {
    threshold: {
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75
    }
  },
  
  // Timeout settings
  testsFinishTimeout: 60000,
  browserStartTimeout: 20000,
  
  // Filter out non-test files
  filterBrowserLogs: (log) => {
    // Filter out Lit dev mode warnings
    if (log.args?.[0]?.includes?.('Lit is in dev mode')) {
      return false;
    }
    return true;
  }
};