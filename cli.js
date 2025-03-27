import povgoblin from './povgoblin.js';

const args = process.argv.slice(2);
const nonflags = args.filter(a => !a.startsWith('-'));
const options = { debug: args.includes('--debug') };

povgoblin(nonflags[0], options).then(console.log).catch(console.error);
