# POVgoblin 🧙‍♂️🖥️

POVgoblin is an AI-powered POV-Ray scene generation assistant that leverages computational creativity to generate and render 3D scenes.

## Overview

POVgoblin combines artificial intelligence with POV-Ray rendering to create unique, algorithmically generated 3D scenes. It provides both command-line and programmatic interfaces for scene generation.

## Installation

```bash
npm install povgoblin
```

## Configuration

POVgoblin uses the [Phantomaton](https://github.com/phantomaton-ai/phantomaton?tab=readme-ov-file#configuration-) framework. Please refer to the Phantomaton configuration documentation for detailed setup instructions.

### Quick Configuration Example

```javascript
{
  // Phantomaton configuration options
  llm: {
    provider: 'anthropic', // or other supported providers
    model: 'claude-2.1'
  },
  povgoblin: {
    home: 'data/scenes',   // Optional: Custom scenes directory
    maximum: 30,           // Optional: Maximum generation attempts
    delay: 0.5             // Optional: Delay between generation attempts
  }
}
```

## Command-Line Usage

Run POVgoblin directly from the command line:

```bash
npx povgoblin
```

This will:
- Generate a POV-Ray scene
- Render the scene
- Output the rendered image path

## Programmatic Usage

```javascript
import povgoblin from 'povgoblin';

async function generateScene() {
  try {
    // Optional: Pass configuration
    const result = await povgoblin({
      // configuration options
    });
    console.log(`Scene rendered: ${result}`);
  } catch (error) {
    console.error('Scene generation failed', error);
  }
}

generateScene();
```

## Available Commands

### `render`
Render a POV-Ray scene from provided content.

### `reference`
Fetch POV-Ray documentation for assistance.

## Features

- 🧙‍♂️ AI-powered scene generation
- 🖥️ Automated POV-Ray rendering
- 📚 Built-in documentation lookup
- 🎨 Computational creativity

## Contributing

Contributions welcome! Please submit issues and pull requests on GitHub.

## License

MIT License