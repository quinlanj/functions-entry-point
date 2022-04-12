import express from 'express';
import fs from 'fs';
import path from 'path';

// Create an Express object and routes (in order)
const app = express();

// Serve static files of web-build at /
// TODO: should probably use the vercel server
app.use('/', express.static('web-build'));

const FUNCTIONS_DIRNAME = 'functions';
const files = fs.readdirSync(FUNCTIONS_DIRNAME); // cwd of process
for (const file of files) {
  const filenameNoExtension = path.parse(file).name;

  const relativePathToIndex = path.join('../', FUNCTIONS_DIRNAME, filenameNoExtension); // index is one directory down from functions
  const userDefinedModule = require(relativePathToIndex);

  // Mount at route '/functions/moduleName'
  const mountedPath = path.join('/', FUNCTIONS_DIRNAME, filenameNoExtension).toString();
  app.use(mountedPath, userDefinedModule.default);

  console.log('Function mounted at:', mountedPath);
}

// Set our GCF handler to our Express app.
export default app;
