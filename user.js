
const REFERENCE_ATTEMPT = '🪄✨ reference';
const RENDER_ATTEMPT = '🪄✨ render';
const REFERENCE_FAILURE = 'Documentation fetch failed';
const RENDER_FAILURE = 'Render failed';

const BASIC_GUIDANCE = 'You must successfully complete one rendering using the `render` command. Use the `reference` command for help.';
const RENDER_FAILURE_GUIDANCE = 'That render failed. Please use the error message and consult with references as-needed.';
const REFERENCE_FAILURE_GUIDANCE = 'Make sure to use a real path when consulting references. Start with / if you need a starting point.';
const REFERENCE_SUCCESS_GUIDANCE = 'Okay, keep going using the provided references.';

export default class User {
  constructor(options) {
    this.request = options.request || "Generate a POV-Ray scene that explores computational mysticism";
    this.preamble = '';
  }

  async converse(turns) {
    if (turns.length < 1) {
      return this.request;      
    }

    const referenceAttempted = this.preamble.includes(REFERENCE_ATTEMPT);
    const renderAttempted = this.preamble.includes(RENDER_ATTEMPT);
    const referenceFailed = referenceAttempted && this.preamble.includes(REFERENCE_FAILURE);
    const renderFailed = renderAttempted && this.preamble.includes(RENDER_FAILURE);

    if (renderFailed) {
      return RENDER_FAILURE_GUIDANCE;
    }

    if (referenceFailed) {
      return REFERENCE_FAILURE_GUIDANCE;
    }

    if (referenceAttempted) {
      return REFERENCE_SUCCESS_GUIDANCE;
    }

    return BASIC_GUIDANCE;
  }
};
