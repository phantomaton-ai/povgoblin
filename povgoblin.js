import fs from 'fs';
import phantomaton from 'phantomaton';

import plugin from './plugin.js';

export default function povgoblin(request, options = {}) {
  const sysprompt = fs.readFileSync('povgoblin.md', 'utf-8');
  const install = [plugin({ ...options, request })];
  return phantomaton(sysprompt, { install });
}
