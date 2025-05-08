import { defineConfig } from 'vite';
import FullReload from 'vite-plugin-full-reload';
import injectHTML from 'vite-plugin-html-inject';
import { globSync } from 'glob';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/goit-js-hw-09/' : '/',
  root: '.', // HTML-файли в корені
  build: {
    outDir: 'dist',
    sourcemap: false, // можна увімкнути true для налагодження
    emptyOutDir: true,
    rollupOptions: {
      input: globSync('./*.html'),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  plugins: [
    injectHTML(),
    FullReload(['./*.html']),
  ],
}));
