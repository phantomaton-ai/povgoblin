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
      conversation.user.preamble = conversation.assistant.preamble;
      console.log('\n\n====== MESSAGE ======\n\n');
      console.log(message);
      console.log('\n\n====== REPLY ======\n\n');
      console.log(reply);
      console.log('\n\n====== PREAMBLE ======\n\n');
      console.log(conversation.assistant.preamble);
      this.rounds += 1;
    }
  }
};
