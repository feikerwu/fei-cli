#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var sade_1 = __importDefault(require("sade"));
var fei_init_1 = require("./scripts/fei-init");
var program = sade_1["default"]('fei');
var pkg = require('../package.json');
var version = pkg.version;
program.version(version);
program
    .command('init <dir>', 'create a new project', { isDefault: true })
    .action(function (dir) { return fei_init_1.init(dir); });
program.parse(process.argv);
