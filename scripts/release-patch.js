const fs = require('fs');
const packageJson = require('../package.json');

const [major, minor, patch] = packageJson.version.split('.');

// Update version as desired
packageJson.version = `${major}.${minor}.${parseInt(patch) + 1}`;

fs.writeFileSync('../package.json', JSON.stringify(packageJson, null, 2));