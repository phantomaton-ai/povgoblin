import fs from 'fs';
import phantomaton from 'phantomaton';

export default function povgoblin(configuration = {}) {
  const sysprompt = fs.readFileSync('povgoblin.md', 'utf-8');
  return phantomaton(sysprompt, process.cwd(), configuration);
}