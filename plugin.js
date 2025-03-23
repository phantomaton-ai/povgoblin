import conversations from 'phantomaton-conversations';
import plugins from 'phantomaton-plugins';
import execution from 'phantomaton-execution';

import commands from './commands.js';
import Starter from './starter.js';
import User from './user.js';

export default plugins.create(({ configuration }) => [
  // Register the User
  plugins.define(conversations.user).as(new User(configuration)),

  // Register render, reference commands
  plugins.define(execution.command).as(commands(configuration)),

  // Define the start plugin
  plugins.define(plugins.start).with(
    conversations.conversation
  ).as((c) => () => new Starter(configuration).start(c()))
]);
