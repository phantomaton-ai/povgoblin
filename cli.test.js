import { expect } from 'lovecraft';
import { execSync } from 'child_process';
import path from 'path';

describe('POVgoblin CLI', () => {
  it('should run without errors', () => {
    const cliPath = path.join(__dirname, 'cli.js');
    
    try {
      const result = execSync(`node ${cliPath}`, { 
        encoding: 'utf-8',
        timeout: 5000 
      });
      
      // Since we can't predict exact output, just ensure something is logged
      expect(result.trim()).to.not.be.empty;
    } catch (error) {
      expect.fail(`CLI failed to run: ${error.message}`);
    }
  });
});