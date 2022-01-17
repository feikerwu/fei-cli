#!/usr/bin/env node
import sade from 'sade';
import { init } from './scripts/fei-init';

const program = sade('fei');
const pkg = await import('../package.json');
const version = pkg.version;

program.version(version);
program
  .command('init <dir>', 'create a new project', { default: true })
  .action(dir => init(dir));

program.parse(process.argv);
