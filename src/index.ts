#!/usr/bin/env node

import sade from 'sade';
import { init } from './scripts/fei-init';

const program = sade('fei');
const pkg = require('../package.json');
const version = pkg.version;

program.version(version);
program
  .command('init <dir>', 'create a new project', { isDefault: true })
  .action(dir => init(dir));
program.parse(process.argv);
