const fs = require('fs');
const packageJson = require('../package.json');

const [major, minor, patch] = packageJson.version.split('.');

// Update version as desired
packageJson.version = `${parseInt(major) + 1}.${minor}.${patch}`;

fs.writeFileSync('../package.json', JSON.stringify(packageJson, null, 2));