export default class Finisher {
  constructor(configuration = {}) {
    this.home = configuration.home || 'data/scenes';
  }

  finished(conversation) {
    const preamble = conversation.assistant.preamble || '';
    const renderSuccessMatch = preamble.match(/Render successful\. Image generated as (.+\.png)/);
    
    return renderSuccessMatch ? renderSuccessMatch[1] : undefined;
  }
}