#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var commander_1 = __importDefault(require("commander"));
var fei_init_1 = require("./scripts/fei-init");
var pkg = require('../package.json');
var version = pkg.version;
commander_1["default"].version(version);
commander_1["default"].command('init <dir>', 'create a new project').action(function (dir) { return fei_init_1.init(dir); });
commander_1["default"].parse(process.argv);
