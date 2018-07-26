#!/usr/bin/env node
const program = require('commander')
const path = require('path')
program
    .version('1.0.0', '-v, --version')
    .command('demo <name> [dir]')
    .description('create a demo in dir')
    .action((name, dir) => {
        require('./fei-demo')(name, path.resolve(dir ? dir : './'))
    })

program.parse(process.argv)
