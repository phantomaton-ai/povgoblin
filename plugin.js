import conversations from 'phantomaton-conversations';
import plugins from 'phantomaton-plugins';
import execution from 'phantomaton-execution';
import fs from 'fs';
import { execSync } from 'child_process';
import https from 'https';

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

const renderCommand = {
  name: 'render',
  description: 'Render a POV-Ray scene and return any output or errors',
  example: {
    attributes: {},
    body: '// POV-Ray scene file contents go here'
  },
  validate: (attributes) => true,
  execute: (attributes, body) => {
    try {
      // Write the scene to a file
      fs.writeFileSync('scene.pov', body);

      // Attempt to render the scene
      const renderOutput = execSync('povray scene.pov', { encoding: 'utf-8' });
      
      // Check if image was generated
      if (fs.existsSync('scene.png')) {
        return 'Render successful. Image generated as scene.png';
      } else {
        return 'Render completed, but no image was generated.';
      }
    } catch (error) {
      return `Render failed: ${error.message}`;
    }
  }
};

const referenceCommand = {
  name: 'reference',
  description: 'Fetch POV-Ray documentation from official website',
  example: { attributes: { path: '/' } },
  validate: (attributes) => attributes.path,
  execute: (attributes) => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'www.povray.org',
        path: `/documentation/3.7.0/${attributes.path}`,
        method: 'GET'
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      });

      req.on('error', (error) => {
        reject(`Reference fetch failed: ${error.message}`);
      });

      req.end();
    });
  }
};

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
      const renderResult = renderCommand.execute({}, povrayScene);
      
      if (renderResult.includes('Render successful')) {
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
  
  // Register the render command
  plugins.define(execution.command).as(renderCommand),
  
  // Register the reference command
  plugins.define(execution.command).as(referenceCommand),
  
  // Define the start plugin
  plugins.define(plugins.start).with(
    conversations.conversation
  ).as((c) => () => start(c()))
]);