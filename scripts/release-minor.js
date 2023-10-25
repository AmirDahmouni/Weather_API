const fs = require('fs');
const packageJson = require('../package.json');

const [major, minor, patch] = packageJson.version.split('.');

// Update version as desired
packageJson.version = `${major}.${parseInt(minor) + 1}.${patch}`;

fs.writeFileSync('../package.json', JSON.stringify(packageJson, null, 2));