import Manual from './manual.js';
import Renderer from './renderer.js';

async function tryCatch(call, prefix) {
  try {
    return await call();
  } catch (e) {
    return [prefix, e.message || e.error.message].join('\n\n');
  }
}

const commands = configuration => {
  const manual = new Manual(configuration);
  const renderer = new Renderer(configuration);

  return [
    {
      name: 'reference',
      description: 'Fetch POV-Ray documentation from official website',
      example: { attributes: { path: '/' } },
      validate: (attributes) => !!attributes.path,
      execute: async (attributes) => tryCatch(
        () => manual.read(attributes.path),
        'Documentation fetch failed:'
      )
    },
    {
      name: 'render',
      description: 'Render a POV-Ray scene and return the path to the generated image',
      example: { attributes: {}, body: '// POV-Ray scene description goes here' },
      validate: (attributes, body) => !!body,
      execute: async (attributes, body) => tryCatch(
        () => renderer.render(body),
        'Render failed:'
      )
    }
  ];
};

export default commands;
