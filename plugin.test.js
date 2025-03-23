import { expect, stub } from 'lovecraft';
import plugins from 'phantomaton-plugins';
import conversations from 'phantomaton-conversations';
import execution from 'phantomaton-execution';

import plugin from './plugin.js';

describe('POVgoblin Plugin', () => {
  it('should create a plugin with the correct components', () => {
    const installs = plugin({ configuration: {} }).install;

    expect(installs).to.be.an('array');
    expect(installs.length).to.equal(3);

    expect(installs.find(
      c => c.symbol === conversations.user.impl
    )).to.exist;
    expect(installs.find(
      c => c.symbol === execution.command.impl
    )).to.exist;
    expect(installs.find(
      c => c.symbol === plugins.start.impl
    )).to.exist;
  });
});
