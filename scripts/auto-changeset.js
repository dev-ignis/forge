#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

/**
 * Simple conventional commit parser
 */
function parseConventionalCommit(message) {
  const conventionalCommitRegex = /^(\w+)(\(.+\))?\!?:\s*(.+)$/;
  const lines = message.trim().split('\n');
  const firstLine = lines[0];
  
  const match = firstLine.match(conventionalCommitRegex);
  if (!match) return null;
  
  const [, type, scope, subject] = match;
  const body = lines.slice(1).join('\n').trim();
  
  return {
    type,
    scope: scope ? scope.slice(1, -1) : null, // Remove parentheses
    subject,
    body,
    breaking: firstLine.includes('!') || body.includes('BREAKING CHANGE')
  };
}

/**
 * Auto-generate changesets from conventional commits since last release
 */
async function generateChangesets() {
  try {
    // Check if there are already pending changesets
    const existingChangesets = execSync('find .changeset -name "*.md" -not -name "README.md" | wc -l', { encoding: 'utf8' }).trim();
    if (parseInt(existingChangesets) > 0) {
      console.log('✅ Existing changesets found - skipping auto-generation');
      return;
    }

    // Get the last release tag
    let lastTag;
    try {
      lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    } catch {
      // If no tags exist, use initial commit
      lastTag = execSync('git rev-list --max-parents=0 HEAD', { encoding: 'utf8' }).trim();
    }

    console.log(`📍 Generating changesets since: ${lastTag}`);

    // Get commits since last tag
    const commits = execSync(`git log ${lastTag}..HEAD --pretty=format:"%H|%s"`, { 
      encoding: 'utf8' 
    }).trim();

    if (!commits) {
      console.log('✅ No new commits found since last release');
      return;
    }

    const commitLines = commits.split('\n');
    const changesets = new Map();

    // Parse each commit
    for (const line of commitLines) {
      const [hash, subject] = line.split('|');
      
      const parsed = parseConventionalCommit(subject);
      if (!parsed) continue;

      // Determine version bump
      let bump = null;
      if (parsed.breaking) {
        bump = 'major';
      } else if (parsed.type === 'feat') {
        bump = 'minor';
      } else if (parsed.type === 'fix') {
        bump = 'patch';
      }

      if (!bump) continue; // Skip non-release commits

      // Determine affected packages
      const packages = determineAffectedPackages(hash);
      
      for (const pkg of packages) {
        if (!changesets.has(pkg)) {
          changesets.set(pkg, {
            bump,
            changes: []
          });
        }
        
        // Use highest bump level if multiple commits affect same package
        const current = changesets.get(pkg);
        if (getBumpPriority(bump) > getBumpPriority(current.bump)) {
          current.bump = bump;
        }
        
        current.changes.push({
          type: parsed.type,
          subject: parsed.subject,
          hash: hash.substring(0, 7)
        });
      }
    }

    // Generate changeset files
    if (changesets.size === 0) {
      console.log('✅ No release-worthy commits found');
      return;
    }

    // Ensure .changeset directory exists
    if (!existsSync('.changeset')) {
      mkdirSync('.changeset');
    }

    for (const [pkg, data] of changesets) {
      const filename = `${generateId(8)}.md`;
      const filepath = `.changeset/${filename}`;
      
      const changesetContent = `---
"${pkg}": ${data.bump}
---

${data.changes.map(change => `- **${change.type}**: ${change.subject} (${change.hash})`).join('\n')}
`;

      writeFileSync(filepath, changesetContent);
      console.log(`✅ Created changeset: ${filepath} (${pkg}: ${data.bump})`);
    }

    console.log(`🎉 Generated ${changesets.size} changeset(s)`);

  } catch (error) {
    console.error('❌ Error generating changesets:', error.message);
    process.exit(1);
  }
}

/**
 * Determine which packages are affected by a commit
 */
function determineAffectedPackages(hash) {
  try {
    const changedFiles = execSync(`git diff-tree --no-commit-id --name-only -r ${hash}`, {
      encoding: 'utf8'
    }).trim().split('\n').filter(Boolean);

    const packages = new Set();
    
    for (const file of changedFiles) {
      if (file.startsWith('packages/forge-rhf/')) {
        packages.add('@nexcraft/forge-rhf');
      } else if (file.startsWith('src/') || file.includes('package.json')) {
        packages.add('@nexcraft/forge');
      }
    }

    // If no specific package detected, assume main package
    if (packages.size === 0) {
      packages.add('@nexcraft/forge');
    }

    return Array.from(packages);
  } catch {
    return ['@nexcraft/forge'];
  }
}

/**
 * Get numeric priority for bump types (higher = more important)
 */
function getBumpPriority(bump) {
  switch (bump) {
    case 'patch': return 1;
    case 'minor': return 2;
    case 'major': return 3;
    default: return 0;
  }
}

// Generate random ID for changeset files
function generateId(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

generateChangesets();