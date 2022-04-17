#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const args = process.argv.slice(2);

let script = args[0];

if (script === 'tsconfig') {
  const createTsconfigPath = path.join(__dirname, 'make-tsconfig/index.mjs');
  spawn(`zx`, [createTsconfigPath]);
}
