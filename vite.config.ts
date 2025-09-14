import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { execSync } from 'child_process';
import { join, extname } from 'path';

// ES module import fixer functions
function findJsFiles(dir) {
  const files = [];
  
  function walk(currentPath) {
    if (!existsSync(currentPath)) return;
    const items = readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = join(currentPath, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (extname(item) === '.js') {
        files.push(fullPath);
      }
    }
  }
  
  walk(dir);
  return files;
}

function fixImportsInFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  let modified = false;
  
  const fixedContent = content.replace(
    /from\s+['"](\.[^'"]*?)['"](?!\.js|\.ts|\.d\.ts)/g, 
    (match, importPath) => {
      if (importPath.includes('.js') || importPath.includes('.ts') || !importPath.startsWith('.')) {
        return match;
      }
      modified = true;
      return match.replace(importPath, `${importPath}.js`);
    }
  ).replace(
    /import\s+['"](\.[^'"]*?)['"](?!\.js|\.ts|\.d\.ts)/g,
    (match, importPath) => {
      if (importPath.includes('.js') || importPath.includes('.ts') || !importPath.startsWith('.')) {
        return match;
      }
      modified = true;
      return match.replace(importPath, `${importPath}.js`);
    }
  ).replace(
    /export\s+\{[^}]*\}\s+from\s+['"](\.[^'"]*?)['"](?!\.js|\.ts|\.d\.ts)/g,
    (match, importPath) => {
      if (importPath.includes('.js') || importPath.includes('.ts') || !importPath.startsWith('.')) {
        return match;
      }
      modified = true;
      return match.replace(importPath, `${importPath}.js`);
    }
  );
  
  if (modified) {
    writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`✅ Fixed imports in: ${filePath.replace(process.cwd(), '.')}`);
    return true;
  }
  
  return false;
}

// Plugin to handle all framework integrations
function forgeIntegrationsPlugin() {
  return {
    name: 'forge-integrations',
    writeBundle() {
      console.log('🔧 Processing framework integrations...');
      
      // Ensure integrations directory exists
      mkdirSync('dist/integrations', { recursive: true });
      
      // Copy Vue and Angular files (they don't need compilation)
      const integrationFiles = [
        { src: 'src/integrations/vue.ts', dest: 'dist/integrations/vue.js' },
        { src: 'src/integrations/angular.ts', dest: 'dist/integrations/angular.js' }
      ];
      
      // Copy plugin and exports files
      const additionalFiles = [
        { src: 'src/plugin/index.ts', dest: 'dist/plugin/index.js' },
        { src: 'src/exports/button.ts', dest: 'dist/exports/button.js' },
        { src: 'src/exports/input.ts', dest: 'dist/exports/input.js' },
        { src: 'src/exports/checkbox.ts', dest: 'dist/exports/checkbox.js' },
        { src: 'src/exports/select.ts', dest: 'dist/exports/select.js' },
        { src: 'src/exports/alert.ts', dest: 'dist/exports/alert.js' },
        { src: 'src/exports/card.ts', dest: 'dist/exports/card.js' },
        { src: 'src/exports/modal.ts', dest: 'dist/exports/modal.js' }
      ];
      
      // Create necessary directories
      mkdirSync('dist/plugin', { recursive: true });
      mkdirSync('dist/exports', { recursive: true });
      
      // Copy integration files
      integrationFiles.forEach(({ src, dest }) => {
        if (existsSync(src)) {
          console.log(`📦 Copying ${src} → ${dest}`);
          copyFileSync(src, dest);
        }
      });
      
      // Copy additional files (plugin and exports)
      additionalFiles.forEach(({ src, dest }) => {
        if (existsSync(src)) {
          console.log(`📦 Copying ${src} → ${dest}`);
          copyFileSync(src, dest);
        }
      });
      
      // Build React integration with proper JSX/TS handling
      try {
        console.log('⚛️ Building React integration...');
        execSync('tsc -p tsconfig.react.json', { stdio: 'inherit' });
        
        // Fix ES module imports directly in the output location
        console.log('🔧 Fixing React ES module imports...');
        const reactDistPath = join(process.cwd(), 'dist', 'integrations', 'react');
        const jsFiles = findJsFiles(reactDistPath);
        let fixedFiles = 0;
        
        for (const file of jsFiles) {
          if (fixImportsInFile(file)) {
            fixedFiles++;
          }
        }
        
        console.log(`\n🎉 Fixed ${fixedFiles} files out of ${jsFiles.length} total JavaScript files`);
        console.log('✅ React integration imports should now work correctly');
        console.log('✅ All framework integrations processed successfully!');
      } catch (error) {
        console.warn('⚠️ React integration build failed, continuing...');
        console.error(error);
      }
    }
  };
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'NexcraftForge',
      formats: ['es', 'umd'],
      fileName: (format) => `nexcraft-forge.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  },
  plugins: [forgeIntegrationsPlugin()],
  server: {
    open: '/demo/index.html'
  }
});