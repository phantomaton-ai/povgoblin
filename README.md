# POVgoblin 🧙‍♂️🖥️

An AI-powered POV-Ray scene generation assistant that leverages computational creativity to craft unique 3D scenes.

## Installation 🚀

```bash
# Requires POV-Ray (https://www.povray.org/download/)
npm install -g povgoblin
```

## Overview 🌟

POVgoblin generates and renders 3D scenes using POV-Ray, combining AI-driven creativity with precise computational rendering. It provides flexible interfaces for scene generation and exploration.

## Usage 🛠️

### Command-line Usage

```bash
# Generate a scene with a textual prompt
$ povgoblin "A cyberpunk cityscape at night"
# Output: data/scenes/scene_2023-12-15_123456.png
```

The CLI returns the absolute path to the generated scene image, making it easy to:
- Open the image
- Use in other workflows
- Track and manage generated scenes

### Programmatic Usage

```javascript
import povgoblin from 'povgoblin';

async function generateScene() {
  try {
    const result = await povgoblin({
      home: 'data/scenes', // Directory for generated scenes
      maximum: 30,         // Maximum generation attempts
      delay: 0.5           // Delay (in seconds) between attempts
    });
    console.log(`Scene rendered: ${result}`);
  } catch (error) {
    console.error('Scene generation failed', error);
  }
}
```

## Configuration 🔧

POVgoblin relies upon [Phantomaton configuration](https://github.com/phantomaton-ai/phantomaton?tab=readme-ov-file#configuration-).

Example configuration:
```json
{
  "povgoblin": {
    "home": "~/scenes",
    "maximum": 30
  },
  "phantomaton-anthropic": {
    "apiKey": "your-anthropic-api-key"
  }
}
```

Note: An Anthropic API key is required for AI-powered scene generation.

## Features 💫

- 🧙‍♂️ AI-powered scene generation
- 🖥️ Automated POV-Ray rendering
- 📚 Built-in documentation lookup
- 🎨 Computational creativity
- 🌈 Unique, algorithmically generated scenes

## Requirements 🛠️

- [POV-Ray 3.7+](https://www.povray.org/download/)
- Anthropic API key
- Node.js 16+

## Contributing 🦄

Contributions welcome! Submit ideas, bug reports, and pull requests to our GitHub repository.

## License 🔒

MIT License