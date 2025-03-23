import { expect } from 'lovecraft';
import Finisher from './finisher.js';

const SUCCESS = `
🪄✨ render() {
${process.cwd()}/data/scenes/scene-123.png
} render⚡️`;

const FAILURE = `
🪄✨ render() {
  Render failed:

  Parser Options
    Input file: /Users/alw/Projects/phantomaton-ai/data/projects/povgoblin/data/sc
  enes/scene_2025-03-23T18-02-47.617Z_609a3ec8-0858-49fb-a54c-a5ee4cb8ea52.pov
    Remove bounds........On 
    Split unions.........Off
    Library paths:
      /usr/local/Cellar/povray/3.7.0.10_12/share/povray-3.7
      /usr/local/Cellar/povray/3.7.0.10_12/share/povray-3.7/ini
      /usr/local/Cellar/povray/3.7.0.10_12/share/povray-3.7/include
    Clock value:    0.000  (Animation off)
  Image Output Options
    Image resolution.....800 by 600 (rows 1 to 600, columns 1 to 800).
    Output file........../Users/alw/Projects/phantomaton-ai/data/projects/povgobli
  n/data/scenes/scene_2025-03-23T18-02-47.617Z_609a3ec8-0858-49fb-a54c-a5ee4cb8ea5
  2.png, 24 bpp PNG
    Dithering............Off
    Graphic display......On  (gamma: sRGB)
    Mosaic preview.......Off
    Continued trace......Off
  Information Output Options
    All Streams to console..........On 
    Debug Stream to console.........On 
    Fatal Stream to console.........On 
    Render Stream to console........On 
    Statistics Stream to console....On 
    Warning Stream to console.......On 
  ==== [Parsing...] ==========================================================
  File '/Users/alw/Projects/phantomaton-ai/data/projects/povgoblin/data/scenes/sce
  ne_2025-03-23T18-02-47.617Z_609a3ec8-0858-49fb-a54c-a5ee4cb8ea52.pov' line 1:
   Parse Error: Expected 'object or directive', / found instead
  Fatal error in parser: Cannot parse input.
  Render failed
} render⚡️
`;

const OTHER = `
🪄✨ reference(path:/) {
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!--  This file copyright Persistence of Vision Raytracer Pty. Ltd. 2009-2011  -->

<html lang="en">
<head>
<meta http-equiv=Content-Type content="text/html; charset=windows-1252">
<title>Welcome</title>
</head>
<body>
</body>
</html>
`;

describe('Finisher', () => {
  let finisher;

  beforeEach(() => {
    finisher = new Finisher({ home: 'data/scenes' });    
  });

  describe('finished method', () => {
    it('should return undefined when renders fail', () => {
      const conversation = { assistant: { preamble: FAILURE } };
      expect(finisher.finished(conversation)).to.be.undefined;
    });

    it('should return undefined when no render is attempted', () => {
      const conversation = { assistant: { preamble: OTHER } };
      expect(finisher.finished(conversation)).to.be.undefined;
    });

    it('should return undefined when no execution has occurred', () => {
      const conversation = { assistant: { preamble: undefined } };
      expect(finisher.finished(conversation)).to.be.undefined;
    });

    it('should return render path when render is successful', () => {
      const finisher = new Finisher();
      const conversation = { assistant: { preamble: SUCCESS } };
      expect(finisher.finished(conversation)).to.equal('scene-123.png');
    });
  });
});