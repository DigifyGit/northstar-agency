const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function checkNodeVersion() {
  const major = Number(process.versions.node.split('.')[0]);
  assert(major >= 20, `Node.js >=20 required, got ${process.versions.node}`);
}

function checkPackageScripts(projectRoot) {
  const pkgPath = path.join(projectRoot, 'package.json');
  const pkg = readJson(pkgPath);
  const requiredScripts = [
    'scrape',
    'report',
    'winner:today',
    'dossier',
    'track',
    'daily',
    'ci:smoke',
    'nightly:update'
  ];

  for (const name of requiredScripts) {
    assert(pkg.scripts && pkg.scripts[name], `Missing npm script: ${name}`);
  }
}

function checkConfigJson(projectRoot) {
  const configDir = path.join(projectRoot, 'config');
  if (!fs.existsSync(configDir)) return;

  const files = fs.readdirSync(configDir).filter((name) => name.endsWith('.json'));
  for (const file of files) {
    readJson(path.join(configDir, file));
  }
}

function main() {
  const projectRoot = process.cwd();
  checkNodeVersion();
  checkPackageScripts(projectRoot);
  checkConfigJson(projectRoot);
  console.log('Smoke checks passed: Node version, package scripts, and config JSON validity.');
}

main();
