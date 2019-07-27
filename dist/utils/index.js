"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var execa_1 = __importDefault(require("execa"));
exports.curPkgTool = getPkgTool();
function getPkgTool() {
    try {
        execa_1["default"].sync('yarn', ['--version']);
        return 'yarn';
    }
    catch (_a) {
        return 'npm';
    }
}
exports.installCmd = exports.curPkgTool === 'yarn' ? 'yarn' : 'npm i';
