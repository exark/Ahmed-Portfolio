import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, '../dist/client');
const assetsDir = path.join(clientDir, 'assets');

// Find the main JS and CSS files
const files = fs.readdirSync(assetsDir);
const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
const cssFile = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));

if (!jsFile) {
  console.error('Could not find main JS file');
  process.exit(1);
}

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ahmed Ben Hamouda — Software Engineer & Full-Stack Developer</title>
    <meta
      name="description"
      content="Portfolio of Ahmed Ben Hamouda — Software Engineer, Full-Stack Developer (React, Angular, .NET Core) and IT Support Specialist based in Tunis, Tunisia."
    />
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ''}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsFile}"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(clientDir, 'index.html'), html);
console.log('✓ Generated index.html for static deployment');
