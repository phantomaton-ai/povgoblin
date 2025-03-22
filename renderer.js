import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

const execAsync = promisify(exec);

class Renderer {
  constructor(options = {}) {
    this.home = options.home || path.join(process.cwd(), 'data', 'scenes');
    
    // Ensure home directory exists
    if (!fs.existsSync(this.home)) {
      fs.mkdirSync(this.home, { recursive: true });
    }
  }

  render(sceneContent) {
    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const uuid = uuidv4();
    const baseFilename = `scene_${timestamp}_${uuid}`;
    const povFile = path.join(this.home, `${baseFilename}.pov`);
    const imageFile = path.join(this.home, `${baseFilename}.png`);

    // Write scene content to file
    fs.writeFileSync(povFile, sceneContent);

    // Return a promise that resolves with the image path or rejects with error
    return new Promise((resolve, reject) => {
      const command = `povray ${povFile} +O${imageFile}`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          const messageIndex = stderr.indexOf('Parser Options');
          const message = stderr.slice(messageIndex);
          reject({
            error,
            message,
            stdout,
            stderr,
            sourceFile: povFile
          });
        } else if (fs.existsSync(imageFile)) {
          resolve(imageFile);
        } else {
          reject({
            error: new Error('Render completed but no image was generated'),
            stdout,
            stderr,
            sourceFile: povFile
          });
        }
      });
    });
  }
}

export default Renderer;