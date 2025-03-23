import { expect } from 'lovecraft';
import User from './user.js';

describe('User', () => {
  const REFERENCE_ATTEMPT = '🪄✨ reference';
  const RENDER_ATTEMPT = '🪄✨ render';
  const REFERENCE_FAILURE = 'Documentation fetch failed';
  const RENDER_FAILURE = 'Render failed';

  describe('Initial State', () => {
    it('should return default request when no turns have occurred', async () => {
      const user = new User({});
      const request = await user.converse([]);
      expect(request).to.equal("Generate a POV-Ray scene that explores computational mysticism");
    });
  });

  describe('Basic Guidance', () => {
    it('should provide basic guidance when no attempts have been made', async () => {
      const user = new User({});
      user.preamble = '';
      const guidance = await user.converse([{}]);
      expect(guidance).to.equal('You must successfully complete one rendering using the `render` command. Use the `reference` command for help.');
    });
  });

  describe('Reference Failures', () => {
    it('should provide reference failure guidance when reference attempt fails', async () => {
      const user = new User({});
      user.preamble = `${REFERENCE_ATTEMPT}\n${REFERENCE_FAILURE}`;
      const guidance = await user.converse([{}]);
      expect(guidance).to.equal('Make sure to use a real path when consulting references. Start with / if you need a starting point.');
    });

    it('should provide reference success guidance after successful reference', async () => {
      const user = new User({});
      user.preamble = `${REFERENCE_ATTEMPT}`;
      const guidance = await user.converse([{}]);
      expect(guidance).to.equal('Okay, keep going using the provided references.');
    });
  });

  describe('Render Failures', () => {
    it('should provide render failure guidance when render attempt fails', async () => {
      const user = new User({});
      user.preamble = `${RENDER_ATTEMPT}\n${RENDER_FAILURE}`;
      const guidance = await user.converse([{}]);
      expect(guidance).to.equal('That render failed. Please use the error message and consult with references as-needed.');
    });
  });
});