export default class Finisher {
  constructor(configuration = {}) {
    this.home = configuration.home || 'data/scenes';
  }

  finished(conversation) {
    const preamble = conversation.assistant?.preamble || '';
    
    // Regex to match successful render directive
    const successMatch = preamble.match(/🪄✨ render\(\) {\n([^}]+)\.png\n}/);
    
    // Regex to match render failure directive
    const failureMatch = preamble.includes('Render failed');

    if (successMatch) {
      // Extract and trim the filename
      const filename = successMatch[1].trim().split('/').pop() + '.png';
      return filename;
    }

    return undefined;
  }
}