const path = require('path');
const fs = require('fs')

test('main index.js file exists', () => {
  const filePath = path.join(__dirname, "index.js")
  expect(fs.existsSync(filePath)).toBeTruthy();
});

test('Dockerfile exists', () => {
  const filePath = path.join(__dirname, "./", "Dockerfile")
  expect(fs.existsSync(filePath)).toBeTruthy();
});

test('.gitignore file exists', () => {
  const filePath = path.join(__dirname, "./", ".gitignore")
  expect(fs.existsSync(filePath)).toBeTruthy();
});
