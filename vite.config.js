import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On the web host, .htaccess lets people leave off ".html" (for example /timer).
// This small plugin does the same for `npm run dev` and `npm run preview`,
// so the links on the home page also work on your own computer.
function extensionlessUrls() {
  const rewrite = (dirs) => (req, res, next) => {
    const [pathname, query] = req.url.split('?');
    if (pathname !== '/' && !path.extname(pathname)) {
      const name = pathname.replace(/^\/+|\/+$/g, '');
      if (dirs.some((dir) => fs.existsSync(path.join(dir, name + '.html')))) {
        req.url = '/' + name + '.html' + (query ? '?' + query : '');
      }
    }
    next();
  };
  return {
    name: 'extensionless-urls',
    configureServer(server) {
      server.middlewares.use(rewrite([server.config.root, server.config.publicDir]));
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite([path.resolve(server.config.root, server.config.build.outDir)]));
    },
  };
}

// Multi-page build: each HTML file in this folder is its own entry point.
//   index.html     -> the home page (tool cards from src/tools.js)
//   breathing.html -> Calm Breathing Bubble
// Pages in public/ (timer.html, pushup-coach.html) are copied as they are.
// base: './' makes asset URLs relative so the built files work whether they
// live at the domain root or in any subfolder of a static host.
export default defineConfig({
  base: './',
  plugins: [react(), extensionlessUrls()],
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        breathing: 'breathing.html',
      },
    },
  },
});
