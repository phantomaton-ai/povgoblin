import { expect, stub } from 'lovecraft';
import plugins from 'phantomaton-plugins';
import conversations from 'phantomaton-conversations';
import execution from 'phantomaton-execution';

import plugin from './plugin.js';

describe('POVgoblin Plugin', () => {
  it('should create a plugin with the correct components', () => {
    const pluginInstance = plugin({ configuration: {} });

    expect(pluginInstance).to.be.an('array');
    expect(pluginInstance.length).to.equal(3);

    // Check User registration
    const userPlugin = pluginInstance.find(p => 
      p.type === conversations.user
    );
    expect(userPlugin).to.exist;

    // Check Command registration
    const commandPlugin = pluginInstance.find(p => 
      p.type === execution.command
    );
    expect(commandPlugin).to.exist;

    // Check Start plugin
    const startPlugin = pluginInstance.find(p => 
      p.type === plugins.start
    );
    expect(startPlugin).to.exist;
  });
});