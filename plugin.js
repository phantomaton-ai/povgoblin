import conversations from 'phantomaton-conversations';
import plugins from 'phantomaton-plugins';
import fs from 'fs';

class User {
  constructor(options) {
    this.request = options.request || "Generate a haunting POV-Ray scene that reveals the hidden mathematics of reality";
  }

  async converse(turns) {
    return this.request;
  }
}

async function start(conversation) {
  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    const { message, reply } = await conversation.advance();
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

      // Write scene to file
      fs.writeFileSync('generated_scene.pov', povrayScene);
      
      console.log('Successfully generated POV-Ray scene!');
      process.exit(0);
    } catch (error) {
      console.warn(`Attempt ${attempts + 1} failed: ${error.message}`);
      attempts++;
    }
  }

  console.error('Failed to generate a valid POV-Ray scene');
  process.exit(1);
}

export default plugins.create(configuration => [
  plugins.define(conversations.user).as(new User(configuration)),
  plugins.define(plugins.start).with(
    conversations.conversation
  ).as((c) => () => start(c()))
]);