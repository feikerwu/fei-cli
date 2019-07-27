"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs = __importStar(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var ora_1 = __importDefault(require("ora"));
var chalk_1 = __importDefault(require("chalk"));
var utils_1 = require("../utils");
var execa_1 = __importDefault(require("execa"));
var _a = require('enquirer'), Select = _a.Select, Input = _a.Input;
var cwd = process.cwd();
var project = {
    name: '',
    template: ''
};
function init(dir) {
    if (dir) {
        project.name = dir;
    }
    var name = project.name;
    var realProjectPath = path_1["default"].join(cwd, name);
    fs.existsSync(realProjectPath)
        ? handleDirExist()
        : createProject(realProjectPath);
}
exports.init = init;
function createProject(realProjectPath) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt_1, _a, srcDir, destDir, spinner;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!!project.template) return [3 /*break*/, 2];
                    prompt_1 = new Select({
                        message: 'pick a template',
                        choices: fs.readdirSync(path_1["default"].join(__dirname, '../../templates'))
                    });
                    _a = project;
                    return [4 /*yield*/, prompt_1.run()];
                case 1:
                    _a.template = _b.sent();
                    _b.label = 2;
                case 2:
                    srcDir = path_1["default"].resolve(__dirname, '../../templates', project.template);
                    destDir = path_1["default"].resolve(cwd, realProjectPath);
                    spinner = ora_1["default"]({
                        color: 'yellow',
                        text: 'creating project'
                    }).start();
                    fs.copy(srcDir, destDir).then(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    spinner.succeed();
                                    process.chdir(destDir);
                                    spinner.start('install packages');
                                    return [4 /*yield*/, execa_1["default"](utils_1.installCmd)];
                                case 1:
                                    _a.sent();
                                    spinner.succeed();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, function () { return spinner.fail('failed'); });
                    return [2 /*return*/];
            }
        });
    });
}
function handleDirExist() {
    return __awaiter(this, void 0, void 0, function () {
        var anotherDirName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(chalk_1["default"].red('project exist!'));
                    return [4 /*yield*/, new Input({
                            message: 'input another name'
                        }).run()];
                case 1:
                    anotherDirName = _a.sent();
                    project.name = anotherDirName;
                    init();
                    return [2 /*return*/];
            }
        });
    });
}
