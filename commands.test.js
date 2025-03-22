import { expect, stub } from 'lovecraft';

import Manual from './manual.js';
import Renderer from './renderer.js';
import commands from './commands.js';

describe('POVgoblin Commands', () => {
  let mockRead;
  let mockRender;
  let referenceCommand;
  let renderCommand;

  beforeEach(() => {
    mockRead = stub(Manual.prototype, 'read').resolves('Mock documentation content');
    mockRender = stub(Renderer.prototype, 'render').resolves('/path/to/rendered/scene.png');

    const commandSet = commands({});
    referenceCommand = commandSet.find(cmd => cmd.name === 'reference');
    renderCommand = commandSet.find(cmd => cmd.name === 'render');
  });

  afterEach(() => {
    Manual.prototype.read.restore();
    Renderer.prototype.render.restore();
  });

  describe('Reference Command', () => {
    it('should validate path attribute', () => {
      expect(referenceCommand.validate({ path: '/test' })).to.be.true;
      expect(referenceCommand.validate({})).to.be.false;
    });

    it('should fetch documentation successfully', async () => {
      const result = await referenceCommand.execute({ path: '/test' });
      
      expect(mockRead.calledWith('/test')).to.be.true;
      expect(result).to.equal('Mock documentation content');
    });

    it('should handle documentation fetch errors', async () => {
      mockRead.rejects(new Error('Network error'));

      const result = await referenceCommand.execute({ path: '/test' });
      
      expect(result).to.include('Documentation fetch failed:');
      expect(result).to.include('Network error');
    });
  });

  describe('Render Command', () => {
    it('should validate body content', () => {
      expect(renderCommand.validate({}, 'scene content')).to.be.true;
      expect(renderCommand.validate({}, '')).to.be.false;
      expect(renderCommand.validate({}, null)).to.be.false;
    });

    it('should render scene successfully', async () => {
      const result = await renderCommand.execute({}, 'mock scene content');
      
      expect(mockRender.calledWith('mock scene content')).to.be.true;
      expect(result).to.equal('/path/to/rendered/scene.png');
    });

    it('should handle render errors', async () => {
      mockRender.rejects(new Error('Render process failed'));

      const result = await renderCommand.execute({}, 'mock scene content');
      
      expect(result).to.include('Render failed:');
      expect(result).to.include('Render process failed');
    });
  });
});