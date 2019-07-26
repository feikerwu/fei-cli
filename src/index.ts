#!/usr/bin/env ts-node

import program from 'commander';

import { init } from './scripts/fei-init';

// import { Select } from 'enquirer';

const pkg = require('../package.json');
const version = pkg.version;

program
  .version(version)
  .option('-C', '--create <template>', 'create a new project');

program.command('init <dir>').action(dir => init(dir));

program.parse(process.argv);
