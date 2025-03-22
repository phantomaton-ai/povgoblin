import { expect, stub } from 'lovecraft';

import Manual from './manual.js';
import Renderer from './renderer.js';
import commands from './commands.js';

describe('POVgoblin Commands', () => {
  let mockManual;
  let mockRenderer;
  let commandSet;

  beforeEach(() => {
    mockManual = {
      read: stub().resolves('Mock documentation content')
    };
    mockRenderer = {
      render: stub().resolves('/path/to/rendered/scene.png')
    };

    // Stub the Manual and Renderer constructors
    stub(Manual.prototype, 'constructor').returns(mockManual);
    stub(Renderer.prototype, 'constructor').returns(mockRenderer);

    commandSet = commands({});
  });

  afterEach(() => {
    Manual.prototype.constructor.restore();
    Renderer.prototype.constructor.restore();
  });

  describe('Reference Command', () => {
    const referenceCommand = commandSet.find(cmd => cmd.name === 'reference');

    it('should validate path attribute', () => {
      expect(referenceCommand.validate({ path: '/test' })).to.be.true;
      expect(referenceCommand.validate({})).to.be.false;
    });

    it('should fetch documentation successfully', async () => {
      const result = await referenceCommand.execute({ path: '/test' });
      
      expect(mockManual.read.calledWith('/test')).to.be.true;
      expect(result).to.equal('Mock documentation content');
    });

    it('should handle documentation fetch errors', async () => {
      mockManual.read.rejects(new Error('Network error'));

      const result = await referenceCommand.execute({ path: '/test' });
      
      expect(result).to.include('Documentation fetch failed:');
      expect(result).to.include('Network error');
    });
  });

  describe('Render Command', () => {
    const renderCommand = commandSet.find(cmd => cmd.name === 'render');

    it('should validate body content', () => {
      expect(renderCommand.validate({}, 'scene content')).to.be.true;
      expect(renderCommand.validate({}, '')).to.be.false;
      expect(renderCommand.validate({}, null)).to.be.false;
    });

    it('should render scene successfully', async () => {
      const result = await renderCommand.execute({}, 'mock scene content');
      
      expect(mockRenderer.render.calledWith('mock scene content')).to.be.true;
      expect(result).to.equal('/path/to/rendered/scene.png');
    });

    it('should handle render errors', async () => {
      mockRenderer.render.rejects(new Error('Render process failed'));

      const result = await renderCommand.execute({}, 'mock scene content');
      
      expect(result).to.include('Render failed:');
      expect(result).to.include('Render process failed');
    });
  });
});