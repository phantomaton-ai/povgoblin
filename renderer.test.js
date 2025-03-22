import { expect, stub } from 'lovecraft';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

import Renderer from './renderer.js';

describe('Renderer', () => {
  let mockExec;
  let mockFs;

  beforeEach(() => {
    mockExec = stub(exec);
    mockFs = {
      existsSync: stub(fs, 'existsSync').returns(false),
      mkdirSync: stub(fs, 'mkdirSync'),
      writeFileSync: stub(fs, 'writeFileSync')
    };
  });

  afterEach(() => {
    mockExec.restore();
    mockFs.existsSync.restore();
    mockFs.mkdirSync.restore();
    mockFs.writeFileSync.restore();
  });

  it('should generate unique filenames', async () => {
    const renderer = new Renderer();
    
    mockExec.yields(null, '', '');

    const result = await renderer.render('mock scene content');
    
    expect(result).to.include('scene_')
      .and.to.include('.png');
  });

  it('should handle successful render', async () => {
    const renderer = new Renderer();
    
    mockExec.yields(null, 'Render successful', '');

    const result = await renderer.render('mock scene content');
    
    expect(result).to.include('.png');
  });

  it('should handle render errors', (done) => {
    const renderer = new Renderer();
    
    const mockStderr = 'Parser Options: Some error details';
    mockExec.yields(new Error('Render failed'), '', mockStderr);

    renderer.render('mock scene content')
      .catch(error => {
        expect(error.message).to.include('Some error details');
        done();
      });
  });

  it('should reject if no image is generated', (done) => {
    const renderer = new Renderer();
    
    mockFs.existsSync.restore();
    stub(fs, 'existsSync').returns(false);

    mockExec.yields(null, 'Render completed', '');

    renderer.render('mock scene content')
      .catch(error => {
        expect(error.error.message).to.equal('Render completed but no image was generated');
        done();
      });
  });

  it('should create home directory if it does not exist', () => {
    const mockHome = path.join(process.cwd(), 'data', 'scenes');
    
    const renderer = new Renderer();

    expect(mockFs.mkdirSync.calledWith(mockHome, { recursive: true })).to.be.true;
  });
});