import fs from 'fs';
import phantomaton from 'phantomaton';

import plugin from './plugin.js';

export default function povgoblin(request, configuration = {}) {
  const sysprompt = fs.readFileSync('povgoblin.md', 'utf-8');
  return phantomaton(sysprompt, { install: [plugin({ request })] });
}
