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

// Plugin for any remaining build tasks
function forgeBuildPlugin() {
  return {
    name: 'forge-build',
    writeBundle() {
      console.log('✅ Pure web components build completed successfully!');
      console.log('📦 Framework integrations available as separate packages:');
      console.log('   - @nexcraft/forge-react');
      console.log('   - @nexcraft/forge-vue');
      console.log('   - @nexcraft/forge-angular');
      console.log('   - @nexcraft/forge-rhf');
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
  plugins: [forgeBuildPlugin()],
  server: {
    open: '/demo/index.html'
  }
});