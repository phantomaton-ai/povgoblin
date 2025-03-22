export default class Starter {
  constructor(options = {}) {
    this.delay = options.delay || 0.5;
    this.maximum = options.maximum || 30;
    this.rounds = 0;
  }

  async start(conversation, options) {
    while (true) {
      if (this.rounds >= this.maximum) {
        return Promise.reject(`Exceeded maximum tries of ${this.maximum}`);
      }
      const { message, reply } = await conversation.advance();
      await new Promise(res => setTimeout(res, this.delay * 1000));
      console.log(message);
      console.log(reply);
      console.log(conversation.preamble);
      this.rounds += 1;
    }
  }
};
