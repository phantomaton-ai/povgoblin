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
povgoblin
```

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

POVgoblin relies upon [Phantomaton configuration](https://github.com/phantomaton-ai/phantomaton?tab=readme-ov-file#configuration-); in particular, you will need an Anthropic API key defined to use `povgoblin`.

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