import { expect, stub } from 'lovecraft';
import Starter from './starter.js';
import Finisher from './finisher.js';

describe('Starter', () => {
  let mockFinisher;
  let mockConversation;

  beforeEach(() => {
    mockFinisher = {
      finished: stub(Finisher.prototype, 'finished')
    };
    mockConversation = {
      advance: stub(),
      user: {},
      assistant: {}
    };
  });

  afterEach(() => {
    Finisher.prototype.finished.restore();
  });

  it('should propagate preamble to user', async () => {
    mockConversation.advance.resolves({ 
      message: 'test', 
      reply: 'test reply' 
    });
    mockConversation.assistant.preamble = 'test preamble';
    mockFinisher.finished.returns('foo.png');

    const starter = new Starter();
    
    await starter.start(mockConversation);
    
    expect(mockConversation.user.preamble).to.equal('test preamble');
  });

  it('should return result when finisher detects success', async () => {
    mockConversation.advance.resolves({ 
      message: 'test', 
      reply: 'test reply' 
    });
    mockFinisher.finished.returns('scene-123.png');

    const starter = new Starter({});
    
    const result = await starter.start(mockConversation);
    
    expect(result).to.equal('scene-123.png');
  });

  it('should reject when maximum rounds are exceeded', async () => {
    mockConversation.advance.resolves({ 
      message: 'test', 
      reply: 'test reply' 
    });
    mockFinisher.finished.returns(undefined);

    const starter = new Starter({ maximum: 1, delay: 0.001 });
    
    try {
      await starter.start(mockConversation);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.include('Exceeded maximum tries');
    }
  });
});
