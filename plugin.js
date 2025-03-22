import conversations from 'phantomaton-conversations';
import plugins from 'phantomaton-plugins';
import execution from 'phantomaton-execution';

import commands from './commands';

class User {
  constructor(options) {
    this.request = options.request || "Generate a POV-Ray scene that explores computational mysticism";
    this.iterations = 0;
  }

  async converse(turns) {
    this.iterations++;
    if (this.iterations > 5) {
      return "Stop and provide a final assessment of the scene generation process.";
    }
    return this.request;
  }
}

async function start(conversation) {
  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    const { message, reply } = await conversation.advance();
    
    // Extract POV-Ray scene from reply
    const start = '```povray\n';
    const end = '```\n';

    try {
      const startIndex = reply.indexOf(start);
      const endIndex = reply.indexOf(end, startIndex);

      if (startIndex === -1 || endIndex === -1) {
        throw new Error('Invalid POV-Ray scene format');
      }

      const povrayScene = reply.slice(startIndex + start.length, endIndex);
      
      // Basic validation
      if (povrayScene.trim().length < 50) {
        throw new Error('Scene too short');
      }

      // Attempt to render the scene
      const renderResult = await renderCommand.execute({}, povrayScene);
      
      if (renderResult.includes('.png')) {
        console.log('Successfully generated and rendered POV-Ray scene!');
        process.exit(0);
      } else {
        throw new Error(renderResult);
      }
    } catch (error) {
      console.warn(`Attempt ${attempts + 1} failed: ${error.message}`);
      attempts++;
    }
  }

  console.error('Failed to generate a valid POV-Ray scene');
  process.exit(1);
}

export default plugins.create(configuration => [
  // Register the User
  plugins.define(conversations.user).as(new User(configuration)),
  
  // Register render, reference commands
  plugins.define(execution.command).as(commands(configuration)),
  
  // Define the start plugin
  plugins.define(plugins.start).with(
    conversations.conversation
  ).as((c) => () => start(c()))
]);