# POVgoblin 🧙‍♂️🖥️

An AI-powered POV-Ray scene generation assistant that leverages computational creativity to craft unique 3D scenes.

## Quickstart 🚀

1. **Install**:
   ```bash
   npm install -g povgoblin
   ```

2. **Configure**:
   ```json
   # ~/.phantomaton/configuration.json
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

3. **Run**:
   ```bash
   povgoblin
   ```

## Overview 🌟

POVgoblin generates and renders 3D scenes using POV-Ray, combining AI-driven creativity with precise computational rendering. It provides flexible interfaces for scene generation and exploration.

## Usage 🛠️

### Command-line Usage

```bash
# Generate a scene with default configuration
povgoblin

# Optionally specify custom configuration
povgoblin path/to/custom/configuration.json
```

### Programmatic Usage

```javascript
import povgoblin from 'povgoblin';

async function generateScene() {
  try {
    const result = await povgoblin({
      // Optional configuration
    });
    console.log(`Scene rendered: ${result}`);
  } catch (error) {
    console.error('Scene generation failed', error);
  }
}
```

## Configuration 🔧

POVgoblin uses [Phantomaton configuration](https://github.com/phantomaton-ai/phantomaton?tab=readme-ov-file#configuration-), with the following key options:

- `povgoblin.home`: Directory for generated scenes
- `povgoblin.maximum`: Maximum generation attempts
- `povgoblin.delay`: Delay between generation attempts
- `phantomaton-anthropic.apiKey`: Required AI provider configuration

## Commands 📦

### `render`
Render a POV-Ray scene from provided content.

### `reference`
Fetch POV-Ray documentation for scene generation assistance.

## Features 💫

- 🧙‍♂️ AI-powered scene generation
- 🖥️ Automated POV-Ray rendering
- 📚 Built-in documentation lookup
- 🎨 Computational creativity
- 🌈 Unique, algorithmically generated scenes

## Extensibility 🔮

Extend POVgoblin's capabilities through [Phantomaton Plugins](https://github.com/phantomaton-ai/phantomaton-plugins).

## Contributing 🦄

Contributions welcome! Submit ideas, bug reports, and pull requests to our GitHub repository.

## License 🔒

MIT License