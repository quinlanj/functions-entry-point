"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Create an Express object and routes (in order)
const app = (0, express_1.default)();
// Serve static files of web-build at /
// TODO: should probably use the vercel server
app.use('/', express_1.default.static('web-build'));
const FUNCTIONS_DIRNAME = 'functions';
const files = fs_1.default.readdirSync(FUNCTIONS_DIRNAME); // cwd of process
for (const file of files) {
    const filenameNoExtension = path_1.default.parse(file).name;
    if (filenameNoExtension === '.gitignore') {
        continue;
    }
    const relativePathToIndex = path_1.default.join('../', FUNCTIONS_DIRNAME, filenameNoExtension); // index is one directory down from functions
    const userDefinedModule = require(relativePathToIndex);
    // Mount at route '/functions/moduleName'
    const mountedPath = path_1.default.join('/', FUNCTIONS_DIRNAME, filenameNoExtension).toString();
    app.use(mountedPath, userDefinedModule.default);
    console.log('Function mounted at:', mountedPath);
}
// Set our GCF handler to our Express app.
exports.default = app;
