import { expect, stub } from 'lovecraft';

import Starter from './starter.js';

describe('POVgoblin CLI', () => {
  beforeEach(() => {
    stub(Starter.prototype, 'start').resolves('test.png');
    stub(console, 'error');
    stub(console, 'log');
  });

  afterEach(() => {
    Starter.prototype.start.restore();
    console.error.restore();
    console.log.restore();
  });

  it('should print result on success', async () => {
    await import('./cli.js');
    await new Promise(res => setTimeout(res, 1));
    expect(console.log.calledOnce).true;
    expect(console.error.notCalled).true;
  });

  it('should run without errors', async () => {
    Starter.prototype.start.rejects('oops');
    await import('./cli.js');
    await new Promise(res => setTimeout(res, 1));
    expect(console.log.notCalled).true;
    expect(console.error.calledOnce).true;
  });
});
