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

  it('calls start', async () => {
    await import('./cli.js');
    await new Promise(res => setTimeout(res, 100));
    expect(Starter.prototype.start.called).true;
  });
});
