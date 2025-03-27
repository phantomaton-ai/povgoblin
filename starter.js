import chalk from 'chalk';
import Finisher from './finisher.js';

export default class Starter {
  constructor(options = {}) {
    this.debug = options.debug;
    this.delay = options.delay || 0.5;
    this.maximum = options.maximum || 30;
    this.rounds = 0;
    this.finisher = new Finisher(options);
  }

  async start(conversation) {
    while (true) {
      if (this.rounds >= this.maximum) {
        throw new Error(`Exceeded maximum tries of ${this.maximum}`);
      }
      
      const { message, reply } = await conversation.advance();
      conversation.user.preamble = conversation.assistant.preamble;
      
      if (this.debug) {
        console.log(chalk.white(message));
        console.log(chalk.green(reply));
        console.log(chalk.magenta(conversation.user.preamble));
      }

      const result = this.finisher.finished(conversation);
      if (result) {
        return result;
      }

      await new Promise(res => setTimeout(res, this.delay * 1000));
      this.rounds += 1;
    }
  }
};
