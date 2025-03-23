import Finisher from './finisher.js';

export default class Starter {
  constructor(options = {}) {
    this.delay = options.delay || 0.5;
    this.maximum = options.maximum || 30;
    this.rounds = 0;
    this.finisher = new Finisher(options);
  }

  async start(conversation, options) {
    while (true) {
      if (this.rounds >= this.maximum) {
        return Promise.reject(`Exceeded maximum tries of ${this.maximum}`);
      }
      const { message, reply } = await conversation.advance();
      conversation.user.preamble = conversation.assistant.preamble;
      
      const result = this.finisher.finished(conversation);
      if (result) {
        return result;
      }

      await new Promise(res => setTimeout(res, this.delay * 1000));
      this.rounds += 1;
    }
  }
};