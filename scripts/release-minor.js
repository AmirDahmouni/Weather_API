const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = require(packageJsonPath);

const [major, minor, patch] = packageJson.version.split('.');

// Update version as desired
packageJson.version = `${major}.${parseInt(minor) + 1}.${patch}`;

try {
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('Updated package.json successfully');
} catch (error) {
  console.error('Error updating package.json:', error);
}