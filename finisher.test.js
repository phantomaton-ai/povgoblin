import { expect } from 'lovecraft';
import Finisher from './finisher.js';

describe('Finisher', () => {
  describe('finished method', () => {
    it('should return undefined when no render success', () => {
      const finisher = new Finisher();
      const conversation = { 
        assistant: { 
          preamble: 'Some random text' 
        } 
      };

      expect(finisher.finished(conversation)).to.be.undefined;
    });

    it('should return render path when render is successful', () => {
      const finisher = new Finisher();
      const conversation = { 
        assistant: { 
          preamble: 'Render successful. Image generated as scene_2023-06-15.png' 
        } 
      };

      expect(finisher.finished(conversation)).to.equal('scene_2023-06-15.png');
    });

    it('should use custom home directory from configuration', () => {
      const finisher = new Finisher({ home: 'custom/path' });
      expect(finisher.home).to.equal('custom/path');
    });

    it('should handle undefined preamble', () => {
      const finisher = new Finisher();
      const conversation = { 
        assistant: {} 
      };

      expect(finisher.finished(conversation)).to.be.undefined;
    });
  });
});