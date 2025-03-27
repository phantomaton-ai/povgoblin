import fs from 'fs';
import path from 'path';
import phantomaton from 'phantomaton';
import { fileURLToPath } from 'url';

import plugin from './plugin.js';

const promptfile = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'povgoblin.md'
);

export default (request, options = {}) => phantomaton(
  fs.readFileSync(promptfile, 'utf-8'),
  { install: [plugin({ ...options, request })] }
);
