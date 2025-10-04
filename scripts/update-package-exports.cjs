const fs = require('fs');
const glob = require('glob');

// Read package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Get all component exports
const exportFiles = glob.sync('dist/exports/*.js');
const componentExports = {};

exportFiles.forEach(file => {
  const name = file.match(/dist\/exports\/([^.]+)\.js$/)[1];
  componentExports[`./${name}`] = {
    types: `./dist/exports/${name}.d.ts`,
    import: `./dist/exports/${name}.js`
  };
});

// Update exports while preserving existing special exports
pkg.exports = {
  '.': pkg.exports['.'],
  './dist/*': pkg.exports['./dist/*'],
  './plugin': pkg.exports['./plugin'],
  ...componentExports,  // Add all component exports
  './types/framework-integration': pkg.exports['./types/framework-integration'],
  './custom-elements.json': pkg.exports['./custom-elements.json'],
  './ai-manifest.json': pkg.exports['./ai-manifest.json'],
  './ai-index.json': pkg.exports['./ai-index.json'],
  './ai-tools/*': pkg.exports['./ai-tools/*']
};

// Write back to package.json
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');

console.log(`✅ Updated package.json with ${Object.keys(componentExports).length} component exports`);
