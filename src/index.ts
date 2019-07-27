#!/usr/bin/env node

import program from 'commander';
import { init } from './scripts/fei-init';

const pkg = require('../package.json');
const version = pkg.version;

program.version(version);
program.command('init <dir>', 'create a new project').action(dir => init(dir));
program.parse(process.argv);
